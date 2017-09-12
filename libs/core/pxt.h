#ifndef __PXT_H
#define __PXT_H

#include <stdint.h>
void errorCondition(void);
void unimplemented(const char *s);
void panic(const char *s);
void error(uint32_t code, int subcode);

#ifdef ENABLE_CHECKS
#define assert(cond, msg)                 \
  do                                      \
  {                                       \
    if (!(cond))                          \
    {                                     \
      printf("Check failed: %%s\n", msg); \
      errorCondition();                   \
    }                                     \
  } while (0)
#define check(cond, code, subcode)                      \
  do                                                    \
  {                                                     \
    if (!(cond))                                        \
    {                                                   \
      printf("Check failed: %d - %d\n", code, subcode); \
      errorCondition();                                 \
    }                                                   \
  } while (0)
#else /* !ENABLE_CHECKS */
#define check(cond, code, subcode)
#define assert(cond, msg)
#endif

#ifdef PXT_FNPTR
#undef PXT_FNPTR
#endif
#define PXT_FNPTR(x) (uint32_t)(void *) x

#include <string.h>
#include <stdint.h>
#include "RefCounted.h"

#ifdef __cplusplus
extern "C" {
#endif

extern const uint32_t functionsAndBytecode[];
extern uint32_t *globals;
extern uint16_t *bytecode;
typedef uint32_t Action;
typedef uint32_t ImageLiteral;

uint32_t *allocate(uint16_t sz);
long int strtol(const char *nptr, char **endptr, int base);

struct StringData
{
    uint16_t bogus;
    uint16_t len;
    char data[0];
};

/* Define an empty PXT_MAIN.  This prevents PXT from making a main() function.*/
#define PXT_MAIN

typedef enum {
  ERR_INVALID_BINARY_HEADER = 5,
  ERR_OUT_OF_BOUNDS = 8,
  ERR_REF_DELETED = 7,
  ERR_SIZE = 9,
} ERROR;

#ifdef __cplusplus
};

namespace pxt
{
// Utility functions
uint32_t runAction3(Action a, int arg0, int arg1, int arg2);
uint32_t runAction2(Action a, int arg0, int arg1);
uint32_t runAction1(Action a, int arg0);
uint32_t runAction0(Action a);
Action mkAction(int reflen, int totallen, int startptr);

class RefRecord;
RefRecord *mkClassInstance(int vtableOffset);

void *ptrOfLiteral(int offset);
int getNumGlobals(void);

// The standard calling convention is:
//   - when a pointer is loaded from a local/global/field etc, and incr()ed
//     (in other words, its presence on stack counts as a reference)
//   - after a function call, all pointers are popped off the stack and decr()ed
// This does not apply to the RefRecord and st/ld(ref) methods - they unref()
// the RefRecord* this.
int incr(uint32_t e);
void decr(uint32_t e);

// Checks if object has a VTable, or if its RefCounted* from the runtime.
bool hasVTable(uint32_t e);

class RefObject;

typedef void (*RefObjectMethod)(RefObject *self);
typedef void *PVoid;
typedef void **PPVoid;

const PPVoid RefMapMarker = (PPVoid)(void *)43;

struct VTable
{
  uint16_t numbytes; // in the entire object, including the vtable pointer
  uint16_t userdata;
  PVoid *ifaceTable;
  PVoid methods[2]; // we only use up to two methods here; pxt will generate more
  // refmask sits at &methods[nummethods]
};

}

/* Import pxt:: into pointers.cpp */
using namespace pxt;

#endif /* __cplusplus */

/* The ARM Thumb generator in the JavaScript code is parsing
 * the hex file and looks for the magic numbers as present here.
 *
 * Then it fetches function pointer addresses from there.
 *
 * These shims are used in cpp.ts as part of generated code, and not in
 * this core directory.
 */

#define PXT_SHIMS_BEGIN                                                                            \
  extern "C" const uint32_t functionsAndBytecode[] __attribute__((used, section(".bytecode"))) = { \
      0x08010801, 0x42424242, 0x08010801, 0x8de9d83e,

#define PXT_SHIMS_END \
  }                   \
  ;

#pragma GCC diagnostic ignored "-Wpmf-conversions"

#define PXT_VTABLE_TO_INT(vt) ((uint32_t)(vt) >> vtableShift)
#define PXT_VTABLE_BEGIN(classname, flags, iface)    \
  const VTable classname##_vtable                    \
      __attribute__((aligned(1 << vtableShift))) = { \
          sizeof(classname),                         \
          flags,                                     \
          iface,                                     \
          {(void *)&classname::destroy,              \
           (void *)&classname::print,

#define PXT_VTABLE_END \
  }                    \
  }                    \
  ;

#define PXT_VTABLE_INIT(classname) \
  RefObject(PXT_VTABLE_TO_INT(&classname##_vtable))

#define PXT_VTABLE_CTOR(classname)  \
  PXT_VTABLE_BEGIN(classname, 0, 0) \
  PXT_VTABLE_END                    \
  classname::classname() : PXT_VTABLE_INIT(classname)

#endif /* __PXT_H */

// vim: ts=2 sw=2 expandtab

#ifndef __PXT_H
#define __PXT_H

// #define intcheck(...) check(__VA_ARGS__)
#define intcheck(...) \
  do                  \
  {                   \
  } while (0)

#ifdef PXT_FNPTR
#undef PXT_FNPTR
#endif
#define PXT_FNPTR(x) (uint32_t)(void *) x

#include <string.h>
#include <stdint.h>
#include "utvector.h"
#include "RefCounted.h"

#ifdef __cplusplus
extern "C" {
#endif

extern const uint32_t functionsAndBytecode[];
extern uint32_t *globals;
extern uint16_t *bytecode;
typedef uint32_t Action;
typedef uint32_t ImageLiteral;

/* Define an empty PXT_MAIN.  This prevents PXT from making a main() function.*/
#define PXT_MAIN

typedef enum {
  ERR_INVALID_BINARY_HEADER = 5,
  ERR_OUT_OF_BOUNDS = 8,
  ERR_REF_DELETED = 7,
  ERR_SIZE = 9,
} ERROR;

void error(ERROR code, int subcode
#ifdef __cplusplus
                       = 0
#endif
           );
void panic(const char *str);

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

inline void *ptrOfLiteral(int offset)
{
  return &bytecode[offset];
}

// The standard calling convention is:
//   - when a pointer is loaded from a local/global/field etc, and incr()ed
//     (in other words, its presence on stack counts as a reference)
//   - after a function call, all pointers are popped off the stack and decr()ed
// This does not apply to the RefRecord and st/ld(ref) methods - they unref()
// the RefRecord* this.
int incr(uint32_t e);
void decr(uint32_t e);

// Checks if object has a VTable, or if its RefCounted* from the runtime.
inline bool hasVTable(uint32_t e)
{
  return (*((uint32_t *)e) & 1) == 0;
}

inline void check(int cond, ERROR code, int subcode = 0)
{
  if (!cond)
    error(code, subcode);
}

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

const int vtableShift = 2;

// A base abstract class for ref-counted objects.
class RefObject
{
public:
  uint16_t refcnt;
  uint16_t vtable;

  RefObject(uint16_t vt)
  {
    refcnt = 2;
    vtable = vt;
  }

  inline VTable *getVTable()
  {
    return (VTable *)(vtable << vtableShift);
  }

  void destroy();
  void print();

  // Call to disable pointer tracking on the current instance (in destructor or some other hack)
  inline void untrack()
  {
  }

  // Increment/decrement the ref-count. Decrementing to zero deletes the current object.
  inline void ref()
  {
    check(refcnt > 0, ERR_REF_DELETED);
    //printf("INCR "); this->print();
    refcnt += 2;
  }

  inline void unref()
  {
    //printf("DECR "); this->print();
    refcnt -= 2;
    if (refcnt == 0)
    {
      destroy();
    }
  }
};

// A ref-counted collection of either primitive or ref-counted objects (String, Image,
// user-defined record, another collection)
class RefCollection
    : public RefObject
{
public:
  // 1 - collection of refs (need decr)
  // 2 - collection of strings (in fact we always have 3, never 2 alone)
  inline uint32_t getFlags() { return getVTable()->userdata; }
  inline bool isRef() { return getFlags() & 1; }
  inline bool isString() { return getFlags() & 2; }

  UT_vector *data;

  RefCollection(uint16_t f);

  inline bool in_range(int x)
  {
    return (0 <= x && x < (int)utvector_len(data));
  }

  inline int length() { return utvector_len(data); }

  void destroy();
  void print();

  void push(uint32_t x);
  uint32_t pop(void);
  void setLength(int newLength);
  uint32_t getAt(int x);
  uint32_t removeAt(int x);
  void setAt(int x, uint32_t y);
  void insertAt(int x, uint32_t y);
  int indexOf(uint32_t x, int start);
  int removeElement(uint32_t x);
};

struct MapEntry
{
  uint32_t key;
  uint32_t val;
};

class RefMap
    : public RefObject
{
public:
  UT_vector *data;

  RefMap();
  void destroy();
  void print();
  int findIdx(uint32_t key);
};

// A ref-counted, user-defined JS object.
class RefRecord
    : public RefObject
{
public:
  // The object is allocated, so that there is space at the end for the fields.
  uint32_t fields[];

  RefRecord(uint16_t v) : RefObject(v) {}

  uint32_t ld(int idx);
  uint32_t ldref(int idx);
  void st(int idx, uint32_t v);
  void stref(int idx, uint32_t v);
};

// these are needed when constructing vtables for user-defined classes
void RefRecord_destroy(RefRecord *r);
void RefRecord_print(RefRecord *r);

class RefAction;
typedef uint32_t (*ActionCB)(uint32_t *captured, uint32_t arg0, uint32_t arg1, uint32_t arg2);

// Ref-counted function pointer. It's currently always a ()=>void procedure pointer.
class RefAction
    : public RefObject
{
public:
  // This is the same as for RefRecord.
  uint8_t len;
  uint8_t reflen;
  ActionCB func; // The function pointer
  // fields[] contain captured locals
  uint32_t fields[];

  void destroy();
  void print();

  RefAction();

  inline void stCore(int idx, uint32_t v)
  {
    //printf("ST [%d] = %d ", idx, v); this->print();
    intcheck(0 <= idx && idx < len, ERR_OUT_OF_BOUNDS, 10);
    intcheck(fields[idx] == 0, ERR_OUT_OF_BOUNDS, 11); // only one assignment permitted
    fields[idx] = v;
  }

  inline uint32_t runCore(int arg0, int arg1, int arg2) // internal; use runAction*() functions
  {
    this->ref();
    uint32_t r = this->func(&this->fields[0], arg0, arg1, arg2);
    this->unref();
    return r;
  }
};

// These two are used to represent locals written from inside inline functions
class RefLocal
    : public RefObject
{
public:
  uint32_t v;
  void destroy();
  void print();
  RefLocal();
};

class RefRefLocal
    : public RefObject
{
public:
  uint32_t v;
  void destroy();
  void print();
  RefRefLocal();
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

#define PXT_SHIMS_BEGIN                                                                                    \
  extern "C" const uint32_t functionsAndBytecode[] __attribute__((aligned(0x20), section(".dataend"))) = { \
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

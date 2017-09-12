#include "pxt.h"
#include "RefObject.h"
#include "RefAction.h"
#include "RefRecord.h"

namespace pxt
{
int incr(uint32_t e)
{
  if (e)
  {
    if (hasVTable(e))
      ((RefObject *)e)->ref();
    else
      ((RefCounted *)e)->incr();
  }
  return e;
}

void decr(uint32_t e)
{
  if (e)
  {
    if (hasVTable(e))
      ((RefObject *)e)->unref();
    else
      ((RefCounted *)e)->decr();
  }
}

// Checks if object has a VTable, or if its RefCounted* from the runtime.
bool hasVTable(uint32_t e)
{
  return (*((uint32_t *)e) & 1) == 0;
}

Action mkAction(int reflen, int totallen, int startptr)
{
  check(0 <= reflen && reflen <= totallen, ERR_SIZE, 1);
  check(reflen <= totallen && totallen <= 255, ERR_SIZE, 2);
  check(bytecode[startptr] == 0xffff, ERR_INVALID_BINARY_HEADER, 3);
  check(bytecode[startptr + 1] == 0, ERR_INVALID_BINARY_HEADER, 4);

  uint32_t tmp = (uint32_t)&bytecode[startptr];

  if (totallen == 0)
  {
    return tmp; // no closure needed
  }

  void *ptr = ::operator new(sizeof(RefAction) + totallen * sizeof(uint32_t));
  RefAction *r = new (ptr) RefAction();
  r->len = totallen;
  r->reflen = reflen;
  r->func = (ActionCB)((tmp + 4) | 1);
  memset(r->fields, 0, r->len * sizeof(uint32_t));

  return (Action)r;
}

uint32_t runAction3(Action a, int arg0, int arg1, int arg2)
{
  if (hasVTable(a))
    return ((RefAction *)a)->runCore(arg0, arg1, arg2);
  else
  {
    check(*(uint16_t *)a == 0xffff, ERR_INVALID_BINARY_HEADER, 4);
    return ((ActionCB)((a + 4) | 1))(NULL, arg0, arg1, arg2);
  }
}

uint32_t runAction2(Action a, int arg0, int arg1)
{
  return runAction3(a, arg0, arg1, 0);
}

uint32_t runAction1(Action a, int arg0)
{
  return runAction3(a, arg0, 0, 0);
}

uint32_t runAction0(Action a)
{
  return runAction3(a, 0, 0, 0);
}

// Turns a PXT object into a C++-addressable object
RefRecord *mkClassInstance(int vtableOffset)
{
  VTable *vtable = (VTable *)&bytecode[vtableOffset];

  check(vtable->methods[0] == &RefRecord_destroy, ERR_SIZE, 3);
  check(vtable->methods[1] == &RefRecord_print, ERR_SIZE, 4);

  void *ptr = (void *) allocate(vtable->numbytes);
  RefRecord *r = new (ptr) RefRecord(PXT_VTABLE_TO_INT(vtable));
  return r;
}

void *ptrOfLiteral(int offset)
{
  return &bytecode[offset];
}

int getNumGlobals(void)
{
  return bytecode[16];
}
}

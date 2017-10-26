#include "pxt.h"
#include "RefAction.h"

namespace pxt
{
PXT_VTABLE_CTOR(RefAction) {}

// fields[] contain captured locals
void RefAction::destroy()
{
  for (int i = 0; i < this->reflen; ++i)
  {
    decr(fields[i]);
    fields[i] = 0;
  }
}

void RefAction::print()
{
  //printf("RefAction %p r=%d pc=0x%lx size=%d (%d refs)\n", this, refcnt, (const uint8_t *)func - (const uint8_t *)bytecode, len, reflen);
}
}
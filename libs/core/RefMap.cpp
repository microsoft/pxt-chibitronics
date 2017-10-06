#include "pxt.h"
#include "RefMap.h"

namespace pxt {

struct MapEntry
{
  uint32_t key;
  uint32_t val;
};

PXT_VTABLE_BEGIN(RefMap, 0, RefMapMarker)
PXT_VTABLE_END
RefMap::RefMap() : PXT_VTABLE_INIT(RefMap)
{
  unimplemented(__func__);
}

void RefMap::destroy()
{
  unimplemented(__func__);
}

int RefMap::findIdx(uint32_t /*key*/)
{
  unimplemented(__func__);
  return -1;
}

void RefMap::print()
{
}

}
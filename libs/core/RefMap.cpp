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
  //  data = utvector_new(utmm_uint64);
}

void RefMap::destroy()
{
  unimplemented(__func__);
#if 0
  for (unsigned i = 0; i < utvector_len(data); ++i)
  {
    if (((struct MapEntry *)utvector_elt(data, i))->key & 1)
    {
      decr(((struct MapEntry *)utvector_elt(data, i))->val);
    }
    ((struct MapEntry *)utvector_elt(data, i))->val = 0;
  }
  utvector_clear(data);
#endif
}

int RefMap::findIdx(uint32_t key)
{
  unimplemented(__func__);
#if 0
  for (unsigned i = 0; i < utvector_len(data); ++i)
  {
    if (((struct MapEntry *)utvector_elt(data, i))->key >> 1 == key)
      return i;
  }
#endif
  return -1;
}

void RefMap::print()
{
  //printf("RefMap %p r=%d size=%d\n", this, refcnt, utvector_len(data));
}

}
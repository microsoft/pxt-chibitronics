#include "pxt.h"
#include "RefRecord.h"

namespace pxt {
uint32_t RefRecord::ld(int idx)
{
  check((reflen == 255 ? 0 : reflen) <= idx && idx < len, ERR_OUT_OF_BOUNDS, 1);
  return fields[idx];
}

uint32_t RefRecord::ldref(int idx)
{
  //printf("LD %p len=%d reflen=%d idx=%d\n", this, len, reflen, idx);
  check(0 <= idx && idx < reflen, ERR_OUT_OF_BOUNDS, 2);
  uint32_t tmp = fields[idx];
  incr(tmp);
  return tmp;
}

void RefRecord::st(int idx, uint32_t v)
{
  check((reflen == 255 ? 0 : reflen) <= idx && idx < len, ERR_OUT_OF_BOUNDS, 3);
  fields[idx] = v;
}

void RefRecord::stref(int idx, uint32_t v)
{
  //printf("ST %p len=%d reflen=%d idx=%d\n", this, len, reflen, idx);
  check(0 <= idx && idx < reflen, ERR_OUT_OF_BOUNDS, 4);
  decr(fields[idx]);
  fields[idx] = v;
}

void RefObject::destroy()
{
  ((RefObjectMethod)getVTable()->methods[0])(this);
  delete this;
}

void RefObject::print()
{
  ((RefObjectMethod)getVTable()->methods[1])(this);
}

void RefRecord_destroy(RefRecord *r)
{
  auto tbl = r->getVTable();
  uint8_t *refmask = (uint8_t *)&tbl->methods[tbl->userdata & 0xff];
  int len = (tbl->numbytes >> 2) - 1;
  for (int i = 0; i < len; ++i)
  {
    if (refmask[i])
      decr(r->fields[i]);
    r->fields[i] = 0;
  }
}

void RefRecord_print(RefRecord *r)
{
    printf("RefRecord %p r=%d size=%d bytes\n", r, r->refcnt, r->getVTable()->numbytes);
}
}
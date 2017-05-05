#include "pxt.h"
#ifdef printf
#undef printf
#define printf(...)
#endif

static const UT_mm _utmm_uint64 = {.sz = sizeof(struct pxt::MapEntry), 0, 0, 0, 0};
const UT_mm* utmm_uint64 = &_utmm_uint64;

namespace pxt {
    int incr(uint32_t e)
    {
      if (e) {
        if (hasVTable(e))
          ((RefObject*)e)->ref();
        else
          ((RefCounted*)e)->incr();
      }
      return e;
    }

    void decr(uint32_t e)
    {
      if (e) {
        if (hasVTable(e))
          ((RefObject*)e)->unref();
        else
          ((RefCounted*)e)->decr();
      }
    }

    Action mkAction(int reflen, int totallen, int startptr)
    {
      check(0 <= reflen && reflen <= totallen, ERR_SIZE, 1);
      check(reflen <= totallen && totallen <= 255, ERR_SIZE, 2);
      check(bytecode[startptr] == 0xffff, ERR_INVALID_BINARY_HEADER, 3);
      check(bytecode[startptr + 1] == 0, ERR_INVALID_BINARY_HEADER, 4);

      uint32_t tmp = (uint32_t)&bytecode[startptr];

      if (totallen == 0) {
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
        return ((RefAction*)a)->runCore(arg0, arg1, arg2);
      else {
        check(*(uint16_t*)a == 0xffff, ERR_INVALID_BINARY_HEADER, 4);
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

    RefRecord* mkClassInstance(int vtableOffset)
    {
      VTable *vtable = (VTable*)&bytecode[vtableOffset];

      intcheck(vtable->methods[0] == &RefRecord_destroy, ERR_SIZE, 3);
      intcheck(vtable->methods[1] == &RefRecord_print, ERR_SIZE, 4);

      void *ptr = ::operator new(vtable->numbytes);
      RefRecord *r = new (ptr) RefRecord(PXT_VTABLE_TO_INT(vtable));
      memset(r->fields, 0, vtable->numbytes - sizeof(RefRecord));
      return r;
    }

    uint32_t RefRecord::ld(int idx)
    {
      //intcheck((reflen == 255 ? 0 : reflen) <= idx && idx < len, ERR_OUT_OF_BOUNDS, 1);
      return fields[idx];
    }

    uint32_t RefRecord::ldref(int idx)
    {
      //printf("LD %p len=%d reflen=%d idx=%d\n", this, len, reflen, idx);
      //intcheck(0 <= idx && idx < reflen, ERR_OUT_OF_BOUNDS, 2);
      uint32_t tmp = fields[idx];
      incr(tmp);
      return tmp;
    }

    void RefRecord::st(int idx, uint32_t v)
    {
      //intcheck((reflen == 255 ? 0 : reflen) <= idx && idx < len, ERR_OUT_OF_BOUNDS, 3);
      fields[idx] = v;
    }

    void RefRecord::stref(int idx, uint32_t v)
    {
      //printf("ST %p len=%d reflen=%d idx=%d\n", this, len, reflen, idx);
      //intcheck(0 <= idx && idx < reflen, ERR_OUT_OF_BOUNDS, 4);
      decr(fields[idx]);
      fields[idx] = v;
    }

    void RefObject::destroy() {
      ((RefObjectMethod)getVTable()->methods[0])(this);
      delete this;
    }


    void RefObject::print() {
      ((RefObjectMethod)getVTable()->methods[1])(this);
    }

    void RefRecord_destroy(RefRecord *r) {
        auto tbl = r->getVTable();
        uint8_t *refmask = (uint8_t*)&tbl->methods[tbl->userdata & 0xff];
        int len = (tbl->numbytes >> 2) - 1;
        for (int i = 0; i < len; ++i) {
          if (refmask[i]) decr(r->fields[i]);
          r->fields[i] = 0;
        }
    }

    void RefRecord_print(RefRecord *r)
    {
      printf("RefRecord %p r=%d size=%d bytes\n", r, r->refcnt, r->getVTable()->numbytes);
    }

    void RefCollection::push(uint32_t x) {
      if (isRef()) incr(x);
      utvector_push(data, &x);
    }

    void RefCollection::setLength(int newLength) {
      utvector_reserve(data, newLength);
    }

    uint32_t RefCollection::pop(void) {
      return removeElement(length() - 1);
    }

    uint32_t RefCollection::getAt(int x) {
      if (in_range(x)) {
        uint32_t tmp = *(uint32_t *)utvector_elt(data, (unsigned)x);
        if (isRef()) incr(tmp);
        return tmp;
      }
      else {
        error(ERR_OUT_OF_BOUNDS);
        return 0;
      }
    }

    uint32_t RefCollection::removeAt(int x) {
      uint32_t *ep = (uint32_t *)utvector_elt(data, x);
      if (!in_range(x))
        return 0;

      if (!ep)
        return 0;

      uint32_t e = *ep;

      if (isRef()) decr(e);
      utvector_erase(data, x);
      return e;
    }

    void RefCollection::setAt(int x, uint32_t y) {
      if (!in_range(x))
        return;

      if (isRef()) {
        decr(*(uint32_t *)utvector_elt(data, (unsigned)x));
        incr(y);
      }
      *(uint32_t *)utvector_elt(data, (unsigned)x) = y;
    }

    void RefCollection::insertAt(int x, uint32_t y) {
      if (x == length()) {
        push(y);
        return;
      }

      if (!in_range(x))
        return;

      push(0);
      int i;
      for (i = length(); i < x; i--)
        *(uint32_t *)utvector_elt(data, i) = *(uint32_t *)utvector_elt(data, i - 1);
      if (isRef()) {
        incr(y);
      }
      *(uint32_t *)utvector_elt(data, x) = y;
    }

    int RefCollection::indexOf(uint32_t x, int start) {
      if (!in_range(start))
        return -1;

      if (isString()) {
/*
        StringData *xx = (StringData*)x;
        for (uint32_t i = start; i < data.size(); ++i) {
          StringData *ee = (StringData*)data.at(i);
          if (xx->len == ee->len && memcmp(xx->data, ee->data, xx->len) == 0)
            return (int)i;
        }
*/
      } else {
        for (uint32_t i = start; i < utvector_len(data); ++i)
          if (*((uint32_t *)utvector_elt(data, i)) == x)
            return (int)i;
      }

      return -1;
    }

    int RefCollection::removeElement(uint32_t x) {
      int idx = indexOf(x, 0);
      if (idx >= 0) {
        removeAt(idx);
        return 1;
      }
      return 0;
    }

    namespace Coll0 {
      PXT_VTABLE_BEGIN(RefCollection, 0, 0)
      PXT_VTABLE_END
    }
    namespace Coll1 {
      PXT_VTABLE_BEGIN(RefCollection, 1, 0)
      PXT_VTABLE_END
    }
    namespace Coll3 {
      PXT_VTABLE_BEGIN(RefCollection, 3, 0)
      PXT_VTABLE_END
    }

    RefCollection::RefCollection(uint16_t flags) : RefObject(0) {

      data = utvector_new(utmm_int);
      switch (flags) {
        case 0:
          vtable = PXT_VTABLE_TO_INT(&Coll0::RefCollection_vtable);
          break;
        case 1:
          vtable = PXT_VTABLE_TO_INT(&Coll1::RefCollection_vtable);
          break;
        case 3:
          vtable = PXT_VTABLE_TO_INT(&Coll3::RefCollection_vtable);
          break;
        default:
          error(ERR_SIZE);
          break;
      }
    }

    void RefCollection::destroy()
    {
      if (this->isRef())
        for (uint32_t i = 0; i < utvector_len(this->data); ++i) {
          decr(*(uint32_t *)utvector_elt(this->data, i));
        }
      utvector_clear(this->data);
    }

    void RefCollection::print()
    {
      printf("RefCollection %p r=%d flags=%d size=%d [%p, ...]\n", this, refcnt, getFlags(), utvector_len(data), utvector_len(data) > 0 ? utvector_elt(data, 0) : 0);
    }

    PXT_VTABLE_CTOR(RefAction) {}

    // fields[] contain captured locals
    void RefAction::destroy()
    {
      for (int i = 0; i < this->reflen; ++i) {
        decr(fields[i]);
        fields[i] = 0;
      }
    }

    void RefAction::print()
    {
      printf("RefAction %p r=%d pc=0x%lx size=%d (%d refs)\n", this, refcnt, (const uint8_t*)func - (const uint8_t*)bytecode, len, reflen);
    }

    void RefLocal::print()
    {
      printf("RefLocal %p r=%d v=%d\n", this, refcnt, v);
    }

    void RefLocal::destroy()
    {
    }

    PXT_VTABLE_CTOR(RefLocal) {
      v = 0;
    }

    PXT_VTABLE_CTOR(RefRefLocal) {
      v = 0;
    }

    PXT_VTABLE_BEGIN(RefMap, 0, RefMapMarker)
    PXT_VTABLE_END
    RefMap::RefMap() : PXT_VTABLE_INIT(RefMap) {
      data = utvector_new(utmm_uint64);
    }

    void RefMap::destroy() {
      for (unsigned i = 0; i < utvector_len(data); ++i) {
        if (((struct MapEntry *)utvector_elt(data, i))->key & 1) {
          decr(((struct MapEntry *)utvector_elt(data, i))->val);
        }
        ((struct MapEntry *)utvector_elt(data, i))->val = 0;
      }
      utvector_clear(data);
    }

    int RefMap::findIdx(uint32_t key) {
      for (unsigned i = 0; i < utvector_len(data); ++i) {
        if (((struct MapEntry *)utvector_elt(data, i))->key >> 1 == key)
          return i;
      }
      return -1;
    }

    void RefMap::print()
    {
      printf("RefMap %p r=%d size=%d\n", this, refcnt, utvector_len(data));
    }

    void debugMemLeaks() {}

    uint32_t *allocate(uint16_t sz) {
      uint32_t *arr;

      arr = (uint32_t *) malloc(sz * sizeof(*arr));
      memset((void *)arr, 0, sz * sizeof(*arr));

      return arr;
    }

    int templateHash()
    {
      return ((int*)bytecode)[4];
    }

    int programHash()
    {
      return ((int*)bytecode)[6];
    }

    int getNumGlobals()
    {
      return bytecode[16];
    }
}

#include "pxt.h"
#include "ltc.h"

#include "RefCollection.h"

namespace pxt {

void RefCollection::push(uint32_t x)
{
    if (isRef())
        incr(x);

    data_length++;
    data_storage = (uint32_t *)realloc((void *)data_storage, data_length * sizeof(*data_storage));
    data_storage[data_length - 1] = x;
}

void RefCollection::setLength(int newLength)
{
    while (data_length > newLength)
        (void)pop();
}

uint32_t RefCollection::pop(void)
{
    uint32_t e;
    if (data_length == 0)
    {
        panic("oob");
    }

    data_length--;
    e = data_storage[data_length];

    if (isRef())
        decr(e);

    return e;
}

uint32_t RefCollection::getAt(int x)
{
    if (!in_range(x))
    {
        panic("oob");
        return 0;
    }

    uint32_t e = data_storage[x];
    if (isRef())
        incr(e);
    return e;
}

uint32_t RefCollection::removeAt(int x)
{
    if (!in_range(x))
        return 0;

    uint32_t e = data_storage[x];

    if (isRef())
        decr(e);

    // Remove the old item from the data array
    data_length--;
    for (int i = x; i < data_length; i++)
        data_storage[i] = data_storage[i + 1];

        return e;
}

void RefCollection::setAt(int idx, uint32_t y)
{
    if (!in_range(idx))
        return;

    if (isRef())
    {
        decr(data_storage[idx]);
        incr(y);
    }
    data_storage[idx] = y;
}

void RefCollection::insertAt(int idx, uint32_t y)
{
    // Special case: If we're inserting at the end, turn it into a push()
    if (idx == length())
    {
        push(y);
        return;
    }

    // If it's out of bounds, we can't do anything.
    if (!in_range(idx))
        return;

    // Append a dummy value to the end, and shift everything down.
    data_length++;
    data_storage = (uint32_t *)realloc((void *)data_storage, data_length);

    for (int i = data_length - 1; i >= idx; i--)
        data_storage[i] = data_storage[i - 1];

    if (isRef())
        incr(y);
}

int RefCollection::indexOf(uint32_t x, int start)
{
    if (!in_range(start))
        return -1;

    if (isString())
    {
      StringData *xx = (StringData*)x;
      for (int i = start; i < data_length; ++i) {
        StringData *ee = (StringData*)data_storage[i];
        if (xx->len == ee->len && strncmp(xx->data, ee->data, xx->len) == 0)
          return (int)i;
      }
    }
    else
    {
        for (int i = start; i < data_length; ++i) {
            if ((uint32_t)data_storage[i] == x) {
                return (int)i;
            }
        }
    }

    return -1;
}

int RefCollection::removeElement(uint32_t x)
{
    int idx = indexOf(x, 0);
    if (idx >= 0)
    {
        removeAt(idx);
        return 1;
    }
    return 0;
}

namespace Coll0
{
PXT_VTABLE_BEGIN(RefCollection, 0, 0)
PXT_VTABLE_END
}
namespace Coll1
{
PXT_VTABLE_BEGIN(RefCollection, 1, 0)
PXT_VTABLE_END
}
namespace Coll3
{
PXT_VTABLE_BEGIN(RefCollection, 3, 0)
PXT_VTABLE_END
}

RefCollection::RefCollection(uint16_t flags) : RefObject(0)
{

    data_storage = NULL;
    data_length = 0;

    switch (flags)
    {
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
        panic("size");
        break;
    }
}

void RefCollection::destroy()
{
    if (this->isRef())
    {
        for (int i = 0; i < data_length; ++i)
        {
            decr(data_storage[i]);
        }
    }
}

void RefCollection::print()
{
    //printf("RefCollection %p r=%d flags=%d size=%d [%p, ...]\n", this, refcnt, getFlags(), utvector_len(data), utvector_len(data) > 0 ? utvector_elt(data, 0) : 0);
}
}
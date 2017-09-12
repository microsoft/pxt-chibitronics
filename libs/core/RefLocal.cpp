#include "pxt.h"
#include "RefLocal.h"

namespace pxt
{
void RefLocal::print()
{
    //printf("RefLocal %p r=%d v=%d\n", this, refcnt, v);
}

void RefLocal::destroy()
{
}

PXT_VTABLE_CTOR(RefLocal)
{
    v = 0;
}
}
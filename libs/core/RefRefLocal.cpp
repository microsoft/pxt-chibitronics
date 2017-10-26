#include "pxt.h"
#include "RefRefLocal.h"

namespace pxt
{
PXT_VTABLE_CTOR(RefRefLocal)
{
    v = 0;
}
}
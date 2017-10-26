#include "pxt.h"
#include "RefRecord.h"

namespace pxt {
    
void RefObject::destroy()
{
  ((RefObjectMethod)getVTable()->methods[0])(this);
  delete this;
}

void RefObject::print()
{
  ((RefObjectMethod)getVTable()->methods[1])(this);
}

}
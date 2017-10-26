#include "pxt.h"
#include "ltc.h"
#include "RefCollection.h"

namespace Array_
{
using namespace pxt;
//%
RefCollection *mk(uint32_t flags)
{
  return new RefCollection(flags);
}
//%
int length(RefCollection *c)
{
  return c->length();
}
//%
void setLength(RefCollection *c, int newLength)
{
  c->setLength(newLength);
}
//%
void push(RefCollection *c, uint32_t x)
{
  c->push(x);
}
//%
uint32_t pop(RefCollection *c)
{
  return c->pop();
}
//%
uint32_t getAt(RefCollection *c, int x)
{
  return c->getAt(x);
}
//%
void setAt(RefCollection *c, int x, uint32_t y)
{
  c->setAt(x, y);
}
//%
uint32_t removeAt(RefCollection *c, int x)
{
  return c->removeAt(x);
}
//%
void insertAt(RefCollection *c, int x, uint32_t value)
{
  c->insertAt(x, value);
}
//%
int indexOf(RefCollection *c, uint32_t x, int start)
{
  return c->indexOf(x, start);
}
//%
int removeElement(RefCollection *c, uint32_t x)
{
  return c->removeElement(x);
}
}
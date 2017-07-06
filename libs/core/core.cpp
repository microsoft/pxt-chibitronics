#include "pxt.h"
#include "ltc.h"

extern "C" long int strtol(const char *nptr, char **endptr, int base);

void errorCondition(void)
{
  asm("svc #164");
}

void unimplemented(const char *s)
{
  printf("Unimplemented: %s\n", s);
  errorCondition();
}

void panic(const char *s)
{
  printf("Panic: %s\n", s);
  errorCondition();
}

void error(ERROR code, int subcode)
{
  printf("Error: %d - %d\n", code, subcode);
  error(code, subcode);
}

namespace Number_
{
//%
char *toString(int n)
{
  char *newstr = (char *)malloc(12);
  snprintf(newstr, 11, "%d", n);
  return newstr;
}

// +, - and friends are handled directly by assembly instructions
// The comparisons are here as they are more code-size efficient

//%
bool lt(int x, int y) { return x < y; }
//%
bool le(int x, int y) { return x <= y; }
//%
bool neq(int x, int y) { return x != y; }
//%
bool eq(int x, int y) { return x == y; }
//%
bool gt(int x, int y) { return x > y; }
//%
bool ge(int x, int y) { return x >= y; }

// These in fact call into C runtime on Cortex-M0
//%
int div(int x, int y) { return x / y; }
//%
int mod(int x, int y) { return x % y; }
}

namespace Math_
{
//%
int pow(int x, int y)
{
  if (y < 0)
    return 0;
  int r = 1;
  while (y)
  {
    if (y & 1)
      r *= x;
    y >>= 1;
    x *= x;
  }
  return r;
}

//%
int random(int max)
{
  return ::random(0, max);
}

//%
int sqrt(int x)
{
  return ::sqrt(x);
}
}

namespace Array_
{
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

// Import some stuff directly
namespace pxt
{
//%
int incr(uint32_t e);
//%
void decr(uint32_t e);
//%
uint32_t runAction3(Action a, int arg0, int arg1, int arg2);
//%
uint32_t runAction2(Action a, int arg0, int arg1);
//%
uint32_t runAction1(Action a, int arg0);
//%
uint32_t runAction0(Action a);
//%
Action mkAction(int reflen, int totallen, int startptr);
//%
RefRecord *mkClassInstance(int offset);
//%
void RefRecord_destroy(RefRecord *r);
//%
void RefRecord_print(RefRecord *r);
//%
void debugMemLeaks();
//%
int incr(uint32_t e);
//%
void decr(uint32_t e);
//%
uint32_t *allocate(uint16_t sz);
//%
int templateHash();
//%
int programHash();
//%
int getNumGlobals();
//%
void *ptrOfLiteral(int offset);
}

namespace pxtrt
{
//%
void *getGlobalsPtr()
{
  return ::globals;
}
//%
int ptrToBool(uint32_t p)
{
  if (p)
  {
    pxt::decr(p);
    return 1;
  }
  else
  {
    return 0;
  }
}
}

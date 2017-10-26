#include <stdint.h>
#include "pxt.h"
#include "ChibiOS.h"

uint16_t *bytecode;
uint32_t *globals;

void *malloc(size_t size);
void *memset(void *s, int c, size_t n);

static void exec_binary(int32_t *pc)
{
  assert(*pc == 0x4209, ":( Bad runtime version");
  pc++;

  bytecode = *((uint16_t **)pc++); // the actual bytecode is here
  globals = allocate(pxt::getNumGlobals());

  // just compare the first word
  assert(((uint32_t *)bytecode)[0] == 0x923B8E70 &&
             pxt::templateHash() == *pc,
         ":( Failed partial flash");

  uint32_t startptr = (uint32_t)bytecode;
  startptr += 48; // header
  startptr |= 1;  // Thumb state

  ((uint32_t(*)())startptr)();

  return;
}

int main(int argc, char **argv)
{
  (void)argc;
  (void)argv;
  exec_binary((int32_t *)functionsAndBytecode);
  exitThread(0);
  return 0;
}

// vim: ts=2 sw=2 expandtab

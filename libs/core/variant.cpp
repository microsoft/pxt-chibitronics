/*
The MIT License (MIT)
Copyright (c) 2016 British Broadcasting Corporation.
This software is provided by Lancaster University by arrangement with the BBC.
Modifications Copyright (c) 2016 Calliope GbR
Modifications are provided by DELTA Systems (Georg Sommer) - Thomas Kern
und Björn Eberhardt GbR by arrangement with Calliope GbR. 
Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

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

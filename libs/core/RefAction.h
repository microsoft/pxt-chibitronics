/*
The MIT License (MIT)
 
Copyright (c) 2016 British Broadcasting Corporation.
This software is provided by Lancaster University by arrangement with the BBC.
 
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

#ifndef __REFACTION_H
#define __REFACTION_H

#include <stdint.h>
#include "RefObject.h"

#ifdef __cplusplus

namespace pxt {
typedef uint32_t (*ActionCB)(uint32_t *captured, uint32_t arg0, uint32_t arg1, uint32_t arg2);

// Ref-counted function pointer. It's currently always a ()=>void procedure pointer.
class RefAction
    : public RefObject
{
public:
  // This is the same as for RefRecord.
  uint8_t len;
  uint8_t reflen;
  ActionCB func; // The function pointer
  // fields[] contain captured locals
  uint32_t fields[];

  void destroy();
  void print();

  RefAction();

  inline void stCore(int idx, uint32_t v)
  {
    //printf("ST [%d] = %d ", idx, v); this->print();
    check(0 <= idx && idx < len, ERR_OUT_OF_BOUNDS, 10);
    check(fields[idx] == 0, ERR_OUT_OF_BOUNDS, 11); // only one assignment permitted
    fields[idx] = v;
  }

  inline uint32_t runCore(int arg0, int arg1, int arg2) // internal; use runAction*() functions
  {
    this->ref();
    uint32_t r = this->func(&this->fields[0], arg0, arg1, arg2);
    this->unref();
    return r;
  }
};
}

#endif /* __cplusplus */
#endif /* __REFACTION_H */
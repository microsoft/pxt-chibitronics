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

#ifndef __REFCOLLETION_H
#define __REFCOLLETION_H

#include <stdint.h>
#include "RefObject.h"

#ifdef __cplusplus

namespace pxt {
    
// A ref-counted collection of either primitive or ref-counted objects (String, Image,
// user-defined record, another collection)
class RefCollection
    : public RefObject
{
  public:
    // 1 - collection of refs (need decr)
    // 2 - collection of strings (in fact we always have 3, never 2 alone)
    uint32_t getFlags() { return getVTable()->userdata; }
    bool isRef() { return getFlags() & 1; }
    bool isString() { return getFlags() & 2; }

    RefCollection(uint16_t f);

    uint32_t *data_storage;
    int data_length;

    bool in_range(int x)
    {
        return (0 <= x) && (x <= data_length);
    }

    inline int length()
    {
        return data_length;
    }

    void destroy();
    void print();

    void push(uint32_t x);
    uint32_t pop(void);
    void setLength(int newLength);
    uint32_t getAt(int x);
    uint32_t removeAt(int x);
    void setAt(int x, uint32_t y);
    void insertAt(int x, uint32_t y);
    int indexOf(uint32_t x, int start);
    int removeElement(uint32_t x);
};
}

#endif /* __cplusplus */

#endif /* __REFCOLLETION_H */
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

#ifndef __REFRECORD_H
#define __REFRECORD_H

#include <stdint.h>
#include "RefObject.h"

#ifdef __cplusplus

namespace pxt {
// A ref-counted, user-defined JS object.
class RefRecord
    : public RefObject
{
  public:
    // The object is allocated, so that there is space at the end for the fields.
    uint32_t fields[];

    RefRecord(uint16_t v) : RefObject(v) {}

    uint32_t ld(int idx);
    uint32_t ldref(int idx);
    void st(int idx, uint32_t v);
    void stref(int idx, uint32_t v);
};

// these are needed when constructing vtables for user-defined classes
void RefRecord_destroy(RefRecord *r);
void RefRecord_print(RefRecord *r);
}

#endif /* __cplusplus */

#endif /* __REFRECORD_H */
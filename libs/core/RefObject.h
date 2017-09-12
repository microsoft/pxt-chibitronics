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

#ifndef __REFOBJECT_H
#define __REFOBJECT_H

#include <stdint.h>

#ifdef __cplusplus

namespace pxt {
const int vtableShift = 2;

// A base abstract class for ref-counted objects.
class RefObject
{
  public:
    uint16_t refcnt;
    uint16_t vtable;

    RefObject(uint16_t vt)
    {
        refcnt = 2;
        vtable = vt;
    }

    inline VTable *getVTable()
    {
        return (VTable *)(vtable << vtableShift);
    }

    void destroy();
    void print();

    // Call to disable pointer tracking on the current instance (in destructor or some other hack)
    inline void untrack()
    {
    }

    // Increment/decrement the ref-count. Decrementing to zero deletes the current object.
    inline void ref()
    {
        check(refcnt > 0, ERR_REF_DELETED, 0);
        //printf("INCR "); this->print();
        refcnt += 2;
    }

    inline void unref()
    {
        //printf("DECR "); this->print();
        refcnt -= 2;
        if (refcnt == 0)
        {
            destroy();
        }
    }
};
}

#endif /* __cplusplus */

#endif /* __REFOBJECT_H */
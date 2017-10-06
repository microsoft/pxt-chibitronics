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
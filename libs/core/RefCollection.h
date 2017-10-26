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
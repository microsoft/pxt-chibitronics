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
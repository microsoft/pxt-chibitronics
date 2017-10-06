#ifndef REFLOCAL_H
#define REFLOCAL_H

#include <stdint.h>
#include "RefObject.h"

#ifdef __cplusplus

namespace pxt {

// These two are used to represent locals written from inside inline functions
class RefLocal
    : public RefObject
{
  public:
    uint32_t v;
    void destroy();
    void print();
    RefLocal();
};

}

#endif /* __cplusplus */
#endif /* __REFLOCAL_H */
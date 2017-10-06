#ifndef REFREFLOCAL_H
#define REFREFLOCAL_H

#include <stdint.h>
#include "RefObject.h"

#ifdef __cplusplus

namespace pxt
{
class RefRefLocal
    : public RefObject
{
  public:
    uint32_t v;
    void destroy();
    void print();
    RefRefLocal();
};
}

#endif /* __cplusplus */
#endif /* REFREFLOCAL_H */
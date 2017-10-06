#ifndef __REFMAP_H
#define __REFMAP_H

#include <stdint.h>
#include "RefObject.h"

#ifdef __cplusplus

namespace pxt {
class RefMap
    : public RefObject
{
  public:
    RefMap();
    void destroy();
    void print();
    int findIdx(uint32_t key);
};
}

#endif /* __cplusplus */

#endif /* __REFMAP_H */
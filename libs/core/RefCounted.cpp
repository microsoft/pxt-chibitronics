/**
  * Base class for payload for ref-counted objects.
  * There is no constructor, as this struct is typically malloc()ed.
  */
#include "pxt.h"
#include "RefCounted.h"
 
/**
  * Initializes for one outstanding reference.
  */
void RefCounted::init()
{
    // Initialize to one reference (lowest bit set to 1)
    refCount = 3;
}
 
/**
  * Checks if the object resides in flash memory.
  *
  * @param t the object to check.
  *
  * @return true if the object resides in flash memory, false otherwise.
  */
static bool isReadOnlyInline(RefCounted *t)
{
    uint32_t refCount = t->refCount;
 
    if (refCount == 0xffff)
        return true; // object in flash
 
    // Do some sanity checking while we're here
    assert((refCount != 1) &&   // object should have been deleted
     ((refCount & 1) != 0), // refCount doesn't look right
        "object should have been deleted");
 
    // Not read only
    return false;
}
 
/**
  * Checks if the object resides in flash memory.
  *
  * @return true if the object resides in flash memory, false otherwise.
  */
bool RefCounted::isReadOnly()
{
    return isReadOnlyInline(this);
}
 
/**
  * Increment reference count.
  */
void RefCounted::incr()
{
    if (!isReadOnlyInline(this))
        refCount += 2;
}
 
/**
  * Decrement reference count.
  */
void RefCounted::decr()
{
    if (isReadOnlyInline(this))
        return;
 
    refCount -= 2;
    if (refCount == 1) {
        free(this);
    }
}
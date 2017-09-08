#include "pxt.h"
#include "ltc.h"

namespace String_
{
//%
StringData *charAt(StringData *s, int pos)
{
    StringData *c = (StringData *)allocate(sizeof(StringData) + 2);
    c->len = 1;
    c->data[0] = s->data[pos];
    c->data[1] = '\0';
    return c;
}

//%
int charCodeAt(StringData *s, int index)
{
    return s->data[index];
}

//%
StringData *concat(StringData *s, StringData *other)
{
    StringData *newstr = (StringData *)allocate(sizeof(StringData) + s->len + other->len + 1);
    memcpy(newstr->data, s->data, s->len);
    memcpy(newstr->data + s->len, other->data, other->len);
    newstr->len = strlen(newstr->data);
    return newstr;
}

//%
int compare(StringData *s, StringData *that)
{
    return strcmp(s->data, that->data);
}

//%
int length(StringData *s)
{
    return s->len;
}

//%
StringData *fromCharCode(int code)
{
    // XXX NOT UTF-8!
    StringData *newstr = (StringData *)allocate(sizeof(StringData) + 2);
    newstr->len = 1;
    newstr->data[0] = code;
    return newstr;
}

//%
int toNumber(StringData *s)
{
    return strtol(s->data, NULL, 0);
}

//%
StringData *mkEmpty()
{
    StringData *c = (StringData *)allocate(sizeof(StringData) + 1);
    c->len = 0;
    c->data[0] = '\0';
    return c;
}

//%
StringData *substr(StringData *s, int start, int length)
{
    if (length <= 0)
        return mkEmpty();
    if (start < 0)
        start = max(strlen(s->data) + start, 0);
    length = min(length, strlen(s->data) - start);

    StringData *newstr = (StringData *)malloc(sizeof(StringData) + length + 1);
    memcpy(newstr->data, s + start, length);
    return newstr;
}
}

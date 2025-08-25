let i = 0;

const AlphaMode =
{
   AUTO:   i ++, // Must be zero!
   OPAQUE: i ++,
   MASK:   i ++,
   BLEND:  i ++,
};

export default Object .assign (new Map (Object .entries (AlphaMode)), AlphaMode);

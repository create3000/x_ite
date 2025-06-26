let i = 0;

const PrimitiveQuality =
{
   LOW:    i ++,
   MEDIUM: i ++,
   HIGH:   i ++,
};

export default Object .assign (new Map (Object .entries (PrimitiveQuality)), PrimitiveQuality);

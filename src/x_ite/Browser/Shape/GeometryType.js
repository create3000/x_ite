let i = 0;

const GeometryType = {
   POINT:    i ++,
   LINE:     i ++,
   TRIANGLE: i ++,
   QUAD:     i ++,
   SPRITE:   i ++,
   GEOMETRY: i ++,
};

export default Object .assign (new Map (Object .entries (GeometryType)), GeometryType);

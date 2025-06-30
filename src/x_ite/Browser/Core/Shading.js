let i = 0;

const Shading =
{
   POINT:     i ++,
   WIREFRAME: i ++,
   FLAT:      i ++,
   GOURAUD:   i ++,
   PHONG:     i ++,
};

export default Object .assign (new Map (Object .entries (Shading)), Shading);

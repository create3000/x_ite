
import inferType      from "./infer-type.js";
import createVariable from "./variable.js";

const properties = [".x", ".y", ".z", ".w"];

function wrapAccessor (callback)
{
   return function (i, period)
   {
      if (i !== undefined && ! Array .isArray(i))
         i = [i];

      const dimAccessors = [ ];

      for (let j = 0; j < i .length; j ++)
         dimAccessors .push (createVariable .sum (i [j]));

      if (period)
      {
         for (i = 0; i < dimAccessors .length; i++)
         {
            if (period [i] === undefined)
               continue;

            dimAccessors [i] = "(" + dimAccessors [i] + " + " + period [i] + ") % " + period [i];
         }
      }
      return callback (dimAccessors);
   };
}

function createAccessor (name, data)
{
   if (! data)
      return undefined;

   switch (inferType(data))
   {
      case inferType .ARRAY_OF_OBJECTS:
      {
         return wrapAccessor (accessors =>
         {
            const e = accessors .pop ();

            return name + "[" + accessors .join ("][") + "]" + properties [e];
         });
      }
      case inferType .ARRAY_OF_ARRAYS:
      {
         return wrapAccessor (accessors =>
         {
            return name + "[" + accessors .join ("][") + "]";
         });
      }
      case inferType .GENERIC_NDARRAY:
      {
         return wrapAccessor (accessors =>
         {
            return name + ".get(" + accessors.join(",") + ")";
         });
      }
      case inferType .NDARRAY:
      {
         return wrapAccessor (accessors =>
         {
            const code = [name + "Offset"];

            for (let i = 0; i < accessors.length; i++)
            {
               code.push(name + "Stride" + i + " * (" + accessors[i] + ")");
            }

            return name + "[" + code.join(" + ") + "]";
         });
      }
      case inferType.PACKED:
      default:
         return undefined;
   }
}

export default function (nurbs)
{
   const accessors = { };

   let accessor = createAccessor ("x", nurbs .points);

   if (accessor)
      accessors .point = accessor;

   accessor = createAccessor ("w", nurbs .weights);

   if (accessor)
      accessors .weight = accessor;

   accessor = createAccessor ("k", nurbs .knots);

   if (accessor)
      accessors .knot = accessor;

   return accessors;
};

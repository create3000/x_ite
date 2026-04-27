import X3DField     from "../Base/X3DField.js";
import X3DConstants from "../Base/X3DConstants.js";

function SFMatrixPrototypeTemplate (Constructor, TypeName, Matrix, double, properties = { })
{
   const _formatter = double ? "DoubleFormat" : "FloatFormat";

   X3DField .addStaticProperties (Constructor, TypeName);

   Object .assign (Object .setPrototypeOf (Constructor .prototype, X3DField .prototype),
   {
      *[Symbol .iterator] ()
      {
         yield* this .getValue ();
      },
      copy ()
      {
         return Constructor .fromValue (this .getValue () .copy ());
      },
      equals (matrix)
      {
         return this .getValue () .equals (matrix .getValue ());
      },
      isDefaultValue ()
      {
         return this .getValue () .equals (Matrix .IDENTITY);
      },
      set (value)
      {
         this .getValue () .assign (value);
      },
      setTransform: (() =>
      {
         const args = [ ];

         return function (translation, rotation, scale, scaleOrientation, center)
         {
            args .push (translation      ?.getValue (),
                        rotation         ?.getValue (),
                        scale            ?.getValue (),
                        scaleOrientation ?.getValue (),
                        center           ?.getValue ());

            for (let i = args .length - 1; i > -1; -- i)
            {
               if (args [i])
                  break;

               args .pop ();
            }

            this .getValue () .set (... args);

            args .length = 0;
         };
      })(),
      getTransform: (() =>
      {
         const args = [ ];

         return function (translation, rotation, scale, scaleOrientation, center)
         {
            args .push (translation      ?.getValue (),
                        rotation         ?.getValue (),
                        scale            ?.getValue (),
                        scaleOrientation ?.getValue (),
                        center           ?.getValue ());

            for (let i = args .length - 1; i > -1; -- i)
            {
               if (args [i])
                  break;

               args .pop ();
            }

            this .getValue () .get (... args);

            translation      ?.addEvent ();
            rotation         ?.addEvent ();
            scale            ?.addEvent ();
            scaleOrientation ?.addEvent ();

            args .length = 0;
         };
      })(),
      determinant ()
      {
         return this .getValue () .determinant ();
      },
      transpose ()
      {
         return Constructor .fromValue (this .getValue () .copy () .transpose ());
      },
      inverse ()
      {
         return Constructor .fromValue (this .getValue () .copy () .inverse ());
      },
      multLeft (matrix)
      {
         return Constructor .fromValue (this .getValue () .copy () .multLeft (matrix .getValue ()));
      },
      multRight (matrix)
      {
         return Constructor .fromValue (this .getValue () .copy () .multRight (matrix .getValue ()));
      },
      multVecMatrix (vector)
      {
         return new (vector .constructor) (this .getValue () .multVecMatrix (vector .getValue () .copy ()));
      },
      multMatrixVec (vector)
      {
         return new (vector .constructor) (this .getValue () .multMatrixVec (vector .getValue () .copy ()));
      },
      multDirMatrix (vector)
      {
         return new (vector .constructor) (this .getValue () .multDirMatrix (vector .getValue () .copy ()));
      },
      multMatrixDir (vector)
      {
         return new (vector .constructor) (this .getValue () .multMatrixDir (vector .getValue () .copy ()));
      },
      translate (translation)
      {
         return Constructor .fromValue (this .getValue () .copy () .translate (translation .getValue ()));
      },
      rotate (rotation)
      {
         return Constructor .fromValue (this .getValue () .copy () .rotate (rotation .getValue ()));
      },
      scale (scale)
      {
         return Constructor .fromValue (this .getValue () .copy () .scale (scale .getValue ()));
      },
      toStream (generator)
      {
         const
            value = this .getValue (),
            last  = value .length - 1;

         for (let i = 0; i < last; ++ i)
         {
            generator .string += generator [_formatter] (value [i]);
            generator .Space ();
         }

         generator .string += generator [_formatter] (value [last]);
      },
      toVRMLStream (generator)
      {
         this .toStream (generator);
      },
      toXMLStream (generator)
      {
         this .toStream (generator);
      },
      toJSONStream (generator)
      {
         generator .string += '[';
         generator .TidySpace ();

         this .toJSONStreamValue (generator);

         generator .TidySpace ();
         generator .string += ']';
      },
      toJSONStreamValue (generator)
      {
         const
            value = this .getValue (),
            last  = value .length - 1;

         for (let i = 0; i < last; ++ i)
         {
            generator .string += generator .Number (generator [_formatter] (value [i]));
            generator .string += ',';
            generator .TidySpace ();
         }

         generator .string += generator .Number (generator [_formatter] (value [last]));
      },
   },
   properties);

   for (const key of Object .keys (Constructor .prototype))
      Object .defineProperty (Constructor .prototype, key, { enumerable: false });

   function defineProperty (i)
   {
      Object .defineProperty (Constructor .prototype, i,
      {
         get ()
         {
            return this .getValue () [i];
         },
         set (value)
         {
            this .getValue () [i] = +value;
            this .addEvent ();
         },
         enumerable: true,
      });
   }

   for (let i = 0; i < Matrix .prototype .length; ++ i)
      defineProperty (i);

   Object .defineProperties (Constructor,
   {
      ZERO:
      {
         value: Constructor .fromValue (Matrix .ZERO),
         enumerable: true,
      },
      IDENTITY:
      {
         value: Constructor .fromValue (Matrix .IDENTITY),
         enumerable: true,
      },
   });

   return Constructor;
}

export default SFMatrixPrototypeTemplate;

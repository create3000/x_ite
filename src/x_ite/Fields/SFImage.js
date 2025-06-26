import X3DField    from "../Base/X3DField.js";
import ArrayFields from "./ArrayFields.js";
import Algorithm   from "../../standard/Math/Algorithm.js";

const MFInt32 = ArrayFields .MFInt32;

/*
 *  Image
 */

function Image (width, height, comp, array)
{
   this .width  = Math .max (width|0, 0);
   this .height = Math .max (height|0, 0);
   this .comp   = Algorithm .clamp (comp|0, 0, 4);
   this .array  = new MFInt32 ();
   this .array .setValue (array);
   this .array .length = this .width * this .height;
}

Object .assign (Image .prototype,
{
   copy ()
   {
      return new Image (this .width, this .height, this .comp, this .array);
   },
   equals (image)
   {
      return this .width  === image .width &&
             this .height === image .height &&
             this .comp   === image .comp &&
             this .array .equals (image .array);
   },
   assign (image)
   {
      this .width  = image .width;
      this .height = image .height;
      this .comp   = image .comp;
      this .array .assign (image .array);
   },
   set (width, height, comp, array)
   {
      this .width  = width|0;
      this .height = height|0;
      this .comp   = comp|0;
      this .array .assign (array);
   },
   setWidth (value)
   {
      this .width = Math .max (value|0, 0);
      this .array .length = this .width * this .height;
   },
   getWidth ()
   {
      return this .width;
   },
   setHeight (value)
   {
      this .height = Math .max (value|0, 0);
      this .array .length = this .width * this .height;
   },
   getHeight ()
   {
      return this .height;
   },
   setComp (value)
   {
      this .comp = Algorithm .clamp (value|0, 0, 4);
   },
   getComp ()
   {
      return this .comp;
   },
   setArray (value)
   {
      this .array .setValue (value);
      this .array .length = this .width * this .height;
   },
   getArray ()
   {
      return this .array;
   },
});

/*
 *  SFImage
 */

const _set_size = Symbol ();

function SFImage (width, height, comp, array)
{
   switch (arguments .length)
   {
      case 0:
         X3DField .call (this, new Image (0, 0, 0, new MFInt32 ()));
         break;

      case 1:
         X3DField .call (this, arguments [0]);
         break;

      case 3:
         X3DField .call (this, new Image (width, height, comp, new MFInt32 ()));
         break;

      case 4:
         X3DField .call (this, new Image (width, height, comp, array));
         break;

      default:
         throw new Error ("Invalid arguments.");
   }

   this .getValue () .getArray () .addParent (this);
   this .addInterest (_set_size, this);
}

Object .assign (Object .setPrototypeOf (SFImage .prototype, X3DField .prototype),
{
   [_set_size] ()
   {
      this .getValue () .getArray () .length = this .width * this .height;
   },
   *[Symbol .iterator] ()
   {
      yield  this .width;
      yield  this .height;
      yield  this .comp;
      yield* this .array;
   },
   copy ()
   {
      return new SFImage (this .getValue () .copy ());
   },
   equals (image)
   {
      return this .getValue () .equals (image .getValue ());
   },
   isDefaultValue ()
   {
      return (
         this .width  === 0 &&
         this .height === 0 &&
         this .comp   === 0);
   },
   set (image)
   {
      this .getValue () .assign (image);
   },
   toStream (generator)
   {
      const
         width  = this .width,
         height = this .height,
         array  = new Uint32Array (this .array .getValue () .buffer);

      generator .string += width;
      generator .string += generator .Space ();
      generator .string += height;
      generator .string += generator .Space ();
      generator .string += this .comp;
      generator .string += generator .AttribBreak ();

      generator .IncIndent ();

      for (let y = 0; y < height; ++ y)
      {
         generator .string += generator .ListIndent ();

         const s = y * width;

         for (let x = 0; x < width; ++ x)
         {
            generator .string += "0x";
            generator .string += array [x + s] .toString (16);

            if (x !== width - 1)
               generator .string += generator .Space ();
         }

         if (y !== height - 1)
            generator .string += generator .AttribBreak ();
      }

      generator .DecIndent ();
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
      generator .string += generator .ListBreak ();
      generator .string += generator .IncIndent ();
      generator .string += generator .ListIndent ();

      this .toJSONStreamValue (generator);

      generator .string += generator .DecIndent ();
      generator .string += generator .ListBreak ();
      generator .string += generator .ListIndent ();
      generator .string += ']';
   },
   toJSONStreamValue (generator)
   {
      const
         width  = this .width,
         height = this .height,
         array  = new Uint32Array (this .array .getValue () .buffer),
         length = this .array .length;

      generator .string += width;
      generator .string += ',';
      generator .string += generator .TidySpace ();
      generator .string += height;
      generator .string += ',';
      generator .string += generator .TidySpace ();
      generator .string += this .comp;
      generator .string += ',';

      if (width && height)
      {
         generator .string += generator .ListBreak ();
         generator .string += generator .IncIndent ();

         for (let y = 0; y < height; ++ y)
         {
            generator .string += generator .ListIndent ();

            const s = y * width;

            for (let x = 0; x < width; ++ x)
            {
               generator .string += array [x + s];

               if (x + s !== length - 1)
                  generator .string += ',';

               if (x !== width - 1)
                  generator .string += generator .TidySpace ();
            }

            if (y !== height - 1)
               generator .string += generator .ListBreak ();
         }

         generator .string += generator .DecIndent ();
      }
   },
});

for (const key of Object .keys (SFImage .prototype))
   Object .defineProperty (SFImage .prototype, key, { enumerable: false });

const width = {
   get ()
   {
      return this .getValue () .getWidth ();
   },
   set (value)
   {
      this .getValue () .setWidth (value);
      this .addEvent ();
   },
};

const height = {
   get ()
   {
      return this .getValue () .getHeight ();
   },
   set (value)
   {
      this .getValue () .setHeight (value);
      this .addEvent ();
   },
};

const comp = {
   get ()
   {
      return this .getValue () .getComp ();
   },
   set (value)
   {
      this .getValue () .setComp (value);
      this .addEvent ();
   },
};

const array = {
   get ()
   {
      return this .getValue () .getArray ();
   },
   set (value)
   {
      this .getValue () .setArray (value);
      this .addEvent ();
   },
};

Object .defineProperties (SFImage .prototype,
{
   x: width,
   y: height,
   width:  Object .assign ({ enumerable: true }, width),
   height: Object .assign ({ enumerable: true }, height),
   comp:   Object .assign ({ enumerable: true }, comp),
   array:  Object .assign ({ enumerable: true }, array),
});

Object .defineProperties (SFImage,
{
   typeName:
   {
      value: "SFImage",
      enumerable: true,
   },
});

export default SFImage;

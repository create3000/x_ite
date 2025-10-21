import X3DParser   from "./X3DParser.js";
import Expressions from "./Expressions.js";
import Quaternion  from "../../standard/Math/Numbers/Quaternion.js";
import Rotation4   from "../../standard/Math/Numbers/Rotation4.js";

/*
 *  Grammar
 */

// Lexical elements
const Grammar = Expressions ({
   // General
   whitespaces: /[\x20\n\t\r,]+/gy,
   whitespacesNoLineTerminator: /[\x20\t]+/gy,
   untilEndOfLine: /[^\r\n]+/gy,
   line: /.*?\r?\n/gy,

   // Keywords
   ply: /ply/gy,
   format: /format ascii 1.0/gy,
   comment: /\bcomment\b/gy,
   element: /\belement\b/gy,
   elementName: /\b\S+\b/gy,
   property: /\bproperty\b/gy,
   propertyList: /\blist\b/gy,
   propertyType: /\b(?:char|uchar|short|ushort|int|uint|float|double|int8|uint8|int16|uint16|int32|uint32|float32|float64)\b/gy,
   propertyName: /\b\S+\b/gy,
   endHeader: /\bend_header\b/gy,

   double: /[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/gy,
   int32:  /(?:0[xX][\da-fA-F]+)|(?:[+-]?\d+)/gy,
});

/*
 * Parser
 */

function PLYAParser (scene)
{
   X3DParser .call (this, scene);

   this .comments = [ ];

   this .typeMapping = new Map ([
      ["char",    this .int32],
      ["uchar",   this .int32],
      ["short",   this .int32],
      ["ushort",  this .int32],
      ["int",     this .int32],
      ["uint",    this .int32],
      ["float",   this .double],
      ["double",  this .double],
      ["int8",    this .int32],
      ["uint8",   this .int32],
      ["int16",   this .int32],
      ["uint16",  this .int32],
      ["int32",   this .int32],
      ["uint32",  this .int32],
      ["float32", this .double],
      ["float64", this .double],
   ]);
}

Object .assign (Object .setPrototypeOf (PLYAParser .prototype, X3DParser .prototype),
{
   getEncoding ()
   {
      return "STRING";
   },
   setInput (input)
   {
      this .input = input;
   },
   isValid ()
   {
      return this .input .match (/^ply\r?\nformat ascii 1.0/);
   },
   parseIntoScene (resolve, reject)
   {
      this .ply ()
         .then (resolve)
         .catch (reject);
   },
   async ply ()
   {
      // Set profile and components.

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("PLY");
      scene .setProfile (browser .getProfile ("Interchange"));

      await browser .loadComponents (scene);

      await this .processElements (this .header ([ ]))

      // Create nodes.

      return this .getScene ();
   },
   whitespacesOrComments ()
   {
      while (this .whitespaces () || this .comment ())
         ;
   },
   whitespaces ()
   {
      return Grammar .whitespaces .parse (this);
   },
   whitespacesNoLineTerminator ()
   {
      Grammar .whitespacesNoLineTerminator .parse (this);
   },
   comment ()
   {
      if (Grammar .comment .parse (this) && Grammar .untilEndOfLine .parse (this))
      {
         this .comments .push (this .result [0] .trim ());
         return true;
      }

      return false;
   },
   double ()
   {
      this .whitespacesNoLineTerminator ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [0]);

         return true;
      }

      return false;
   },
   int32 ()
   {
      this .whitespacesNoLineTerminator ();

      if (Grammar .int32 .parse (this))
      {
         this .value = parseInt (this .result [0]);

         return true;
      }

      return false;
   },
   convertColor (value, type)
   {
      switch (type)
      {
         case "uchar":
         case "uint8":
            return value / 0xff;
         case "ushort":
         case "uint16":
            return value / 0xfffff;
         case "uint":
         case "uint32":
            return value / 0xffffffff;
         case "float":
         case "float32":
         case "double":
         case "float64":
            return value;
      }
   },
   convertFDC (f_dc)
   {
      // https://github.com/graphdeco-inria/gaussian-splatting/issues/485

      const C0 = 0.28209479177387814;

      return 0.5 + C0 * f_dc;
   },
   header (elements)
   {
      Grammar .ply .parse (this);
      Grammar .whitespaces .parse (this);
      Grammar .format .parse (this);

      this .headings (elements);

      const
         scene     = this .getScene (),
         worldInfo = scene .createNode ("WorldInfo"),
         url       = new URL (scene .worldURL);

      worldInfo .title = url .protocol === "data:" ? "PLY Model" : url .pathname .split ('/') .at (-1);
      worldInfo .info  = this .comments;

      scene .rootNodes .push (worldInfo);

      return elements;
   },
   headings (elements)
   {
      while (this .head (elements))
         ;
   },
   head (elements)
   {
      if (this .element (elements))
         return true;

      if (Grammar .endHeader .parse (this))
         return false;

      if (Grammar .untilEndOfLine .parse (this))
         return true;

      return false;
   },
   element (elements)
   {
      this .whitespacesOrComments ();

      if (Grammar .element .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .elementName .parse (this))
         {
            const name = this .result [0];

            if (this .int32 ())
            {
               const element =
               {
                  name: name,
                  count: this .value,
                  properties: [ ],
               };

               this .properties (element .properties);

               elements .push (element);
               return true;
            }
         }
      }

      return false;
   },
   properties (properties)
   {
      while (this .property (properties))
         ;
   },
   property (properties)
   {
      this .whitespacesOrComments ();

      if (Grammar .property .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .propertyType .parse (this))
         {
            const
               type  = this .result [0],
               value = this .typeMapping .get (type);

            this .whitespacesNoLineTerminator ();

            if (Grammar .propertyName .parse (this))
            {
               const name = this .result [0];

               properties .push ({ type, value, name });
               return true;
            }
         }

         if (Grammar .propertyList .parse (this))
         {
            this .whitespacesNoLineTerminator ();

            if (Grammar .propertyType .parse (this))
            {
               const count = this .typeMapping .get (this .result [0]);

               this .whitespacesNoLineTerminator ();

               if (Grammar .propertyType .parse (this))
               {
                  const
                     type  = this .result [0],
                     value = this .typeMapping .get (type);

                  this .whitespacesNoLineTerminator ();

                  if (Grammar .propertyName .parse (this))
                  {
                     const name = this .result [0];

                     properties .push ({ count, type, value, name });
                     return true;
                  }
               }
            }
         }
      }

      return false;
   },
   async processElements (elements)
   {
      // console .log (elements)

      for (const element of elements)
         this .processElement (element);

      if (!this .points ?.length)
         return;

      const scene = this .getScene ();

      if (this .quaternions ?.length && this .scales ?.length)
      {
         scene .addComponent (this .getBrowser () .getComponent ("X_ITE"));

         await this .getBrowser () .loadComponents (scene);

         const
            node           = scene .createNode ("GaussianSplats"),
            quaternions    = this .quaternions,
            numQuaternions = quaternions .length,
            quaternion     = new Quaternion (),
            rotation       = new Rotation4 (),
            rotations      = [ ];

         for (let i = 0; i < numQuaternions; i += 4)
         {
            quaternion .set (quaternions [i], quaternions [i + 1], quaternions [i + 2], quaternions [i + 3]);
            rotation .setQuaternion (quaternion);
            rotations .push (... rotation);
         }

         node .translations = this .points;
         node .rotations    = rotations;
         node .scales       = this .scales;

         if (this .colors ?.length)
            node .color = this .createColor ();

         scene .rootNodes .push (node);
      }
      else if (this .coordIndex) // IndexedFaceSet
      {
         const
            hasNormals = this .normals ?.some (v => v !== 0),
            shape      = scene .createNode ("Shape"),
            appearance = scene .createNode ("Appearance"),
            material   = scene .createNode ("Material"),
            geometry   = scene .createNode ("IndexedFaceSet"),
            coordinate = scene .createNode ("Coordinate");

         geometry .solid      = false;
         geometry .coordIndex = this .coordIndex;

         if (this .colors ?.length)
            geometry .color = this .createColor ();

         if (this .texCoords ?.length)
         {
            // TextureTransform

            const textureTransform = scene .createNode ("TextureTransform");

            textureTransform .translation .y = -1;
            textureTransform .scale .y       = -1;

            appearance .textureTransform = textureTransform;

            // TextureCoordinate

            const texCoord = scene .createNode ("TextureCoordinate");

            texCoord .point    = this .texCoords;
            geometry .texCoord = texCoord;

            // Index

            if (this .texCoordIndex ?.length)
               geometry .texCoordIndex = this .texCoordIndex;
         }

         if (hasNormals)
         {
            const normal = scene .createNode ("Normal");

            normal .vector   = this .normals;
            geometry .normal = normal;
         }

         coordinate .point = this .points;
         geometry .coord   = coordinate;

         appearance .material = material;
         shape .appearance    = appearance;
         shape .geometry      = geometry;

         scene .rootNodes .push (shape);
      }
      else // PointSet
      {
         const
            hasNormals = this .normals ?.some (v => v !== 0),
            shape      = scene .createNode ("Shape"),
            appearance = scene .createNode ("Appearance"),
            material   = scene .createNode (hasNormals ? "Material" : "UnlitMaterial"),
            geometry   = scene .createNode ("PointSet"),
            coordinate = scene .createNode ("Coordinate");

         if (this .colors ?.length)
            geometry .color = this .createColor ();

         if (hasNormals)
         {
            const normal = scene .createNode ("Normal");

            normal .vector   = this .normals;
            geometry .normal = normal;
         }

         coordinate .point = this .points;
         geometry .coord   = coordinate;

         appearance .material = material;
         shape .appearance    = appearance;
         shape .geometry      = geometry;

         scene .rootNodes .push (shape);
      }
   },
   createColor ()
   {
      const
         alpha = this .alpha && this .colors .some ((v, i) => i % 4 === 3 && v < 1),
         color = this .getScene () .createNode (alpha ? "ColorRGBA" : "Color");

      color .color = alpha || !this .alpha ? this .colors : this .colors .filter ((v, i) => i % 4 !== 3);

      return color;
   },
   processElement (element)
   {
      switch (element .name)
      {
         case "vertex":
            this .parseVertices (element);
            break;
         case "face":
            this .parseFaces (element);
            break;
         case "multi_texture_vertex":
            this .parseMultiTextureVertices (element);
            break;
         case "multi_texture_face":
            this .parseMultiTextureFaces (element);
            break;
         default:
            this .parseUnknown (element);
            break;
      }
   },
   parseVertices ({ count, properties })
   {
      const
         scales      = [ ],
         quaternions = [ ],
         colors      = [ ],
         texCoords   = [ ],
         normals     = [ ],
         points      = [ ];

      // console .time ("vertices")

      for (let i = 0; i < count; ++ i)
      {
         this .whitespaces ();

         for (const { value, name, type } of properties)
         {
            if (!value .call (this))
               throw new Error (`Couldn't parse value for property ${name}.`);

            switch (name)
            {
               case "rot_0": case "rot_1": case "rot_2": case "rot_3":
                  quaternions .push (this .value);
                  break;
               case "scale_0": case "scale_1": case "scale_2":
                  scales .push (Math .exp (this .value));
                  break;
               case "red": case "green": case "blue": case "alpha":
               case "r": case "g": case "b": case "a":
                  colors .push (this .convertColor (this .value, type));
                  break;
               case "f_dc_0": case "f_dc_1": case "f_dc_2":
                  colors .push (this .convertFDC (this .convertColor (this .value, type)));
                  break;
               case "opacity":
                  // https://github.com/antimatter15/splat/blob/main/convert.py
                  colors .push (1 / (1 + Math .exp (-this .value)));
                  break;
               case "s": case "t":
               case "u": case "v":
                  texCoords .push (this .value);
                  break;
               case "nx": case "ny": case "nz":
                  normals .push (this .value);
                  break;
               case "x": case "y": case "z":
                  points .push (this .value);
                  break;
            }
         }
      }

      // console .timeEnd ("vertices")

      // Geometric properties

      this .quaternions = quaternions;
      this .scales      = scales;
      this .alpha       = properties .some (p => p .name .match (/^(?:alpha|a|opacity)$/));
      this .colors      = colors;
      this .texCoords   = texCoords;
      this .normals     = normals;
      this .points      = points;
   },
   parseFaces ({ count, properties })
   {
      const coordIndex = [ ];

      for (let i = 0; i < count; ++ i)
      {
         this .whitespaces ();

         for (const { count, value, name } of properties)
         {
            if (!count .call (this))
               throw new Error (`Couldn't parse property count for ${name}.`);

            const length = this .value;

            for (let i = 0; i < length; ++ i)
            {
               if (!value .call (this))
                  throw new Error (`Couldn't parse a property value for ${name}.`);

               coordIndex .push (this .value);
            }

            coordIndex .push (-1);
         }
      }

      this .coordIndex = coordIndex;
   },
   parseMultiTextureVertices ({ count, properties })
   {
      const texCoords = [ ];

      for (let i = 0; i < count; ++ i)
      {
         this .whitespaces ();

         for (const { value, name } of properties)
         {
            if (!value .call (this))
               throw new Error (`Couldn't parse value for property ${name}.`);

            switch (name)
            {
               case "s": case "t":
               case "u": case "v":
                  texCoords .push (this .value);
                  break;
            }
         }
      }

      this .texCoords = texCoords;
   },
   parseMultiTextureFaces ({ count, properties })
   {
      const texCoordIndex = [ ];

      for (let i = 0; i < count; ++ i)
      {
         for (const { count, value, name } of properties)
         {
            if (count)
            {
               if (!count .call (this))
                  throw new Error (`Couldn't parse property count for ${name}.`);

               const length = this .value;

               for (let i = 0; i < length; ++ i)
               {
                  if (!value .call (this))
                     throw new Error (`Couldn't parse value for property ${name}.`);

                  texCoordIndex .push (this .value);
               }

               texCoordIndex .push (-1);
            }
            else
            {
               if (!value .call (this))
                  throw new Error (`Couldn't parse value for property ${name}.`);
            }
         }
      }

      this .texCoordIndex = texCoordIndex;
   },
   parseUnknown ({ count })
   {
      this .whitespaces ();

      for (let i = 0; i < count; ++ i)
         Grammar .line .parse (this);
   },
});

export default PLYAParser;

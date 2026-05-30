import X3DParser   from "./X3DParser.js";
import Expressions from "./Expressions.js";
import Rotation4   from "../../standard/Math/Numbers/Rotation4.js";

/*
 *  Grammar
 */

// Lexical elements
const Grammar = Expressions ({
   // General
   whitespaces: /[\x20\n\t\r,]+/y,
   whitespacesNoLineTerminator: /[\x20\t]+/y,
   untilEndOfLine: /[^\r\n]+/y,
   line: /[^\r\n]*\r?\n/y,

   // Keywords
   ply: /ply/y,
   format: /format ascii 1.0/y,
   comment: /\bcomment\b/y,
   element: /\belement\b/y,
   elementName: /\b\S+\b/y,
   property: /\bproperty\b/y,
   propertyList: /\blist\b/y,
   propertyType: /\b(?:char|uchar|short|ushort|int|uint|float|double|int8|uint8|int16|uint16|int32|uint32|float32|float64)\b/y,
   propertyName: /\b\S+\b/y,
   endHeader: /\bend_header\b/y,

   double: /[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/y,
   int32:  /(?:0[xX][\da-fA-F]+)|(?:[+-]?\d+)/y,
});

/*
 * Parser
 */

function PLYAParser (scene)
{
   X3DParser .call (this, scene);

   this .triangles = true;
   this .comments  = [ ];

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

      await this .processElements (this .header ([ ]));

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
         const value = this .result [0] .trim ();

         this .comments .push (value);

         this .mustRotateAxes ||= !! value .match (/\b(?:Blender|Artec|Polycam)\b/i);

         return true;
      }

      return false;
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

      worldInfo .title = url .protocol === "data:" ? "PLY Model" : decodeURIComponent (url .pathname .split ('/') .at (-1));
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
      for (const element of elements)
         this .processElement (element);

      if (!this .points ?.length)
         return;

      const scene = this .getScene ();

      if (this .sphericalHarmonics0)
      {
         scene .addComponent (this .getBrowser () .getComponent ("X_ITE"));

         await this .getBrowser () .loadComponents (scene);

         const
            transform      = scene .createNode ("Transform"),
            gaussianSplats = scene .createNode ("GaussianSplats"),
            quaternions    = this .quaternions,
            numQuaternions = quaternions .length,
            orientations   = [ ];

         // Quaternion elements must be rotated from wxyz to xyzw,
         // and quaternion must be inverted for some reason.
         // https://www.kaggle.com/code/stpeteishii/creatures-ply-to-gaussian-splat
         for (let i = 0; i < numQuaternions; i += 4)
            orientations .push (quaternions [i + 1], quaternions [i + 2], quaternions [i + 3], -quaternions [i]);

         gaussianSplats .positions           = this .points;
         gaussianSplats .orientations        = orientations;
         gaussianSplats .scales              = this .scales;
         gaussianSplats .opacities           = this .opacities;
         gaussianSplats .sphericalHarmonics0 = this .sphericalHarmonics0;
         gaussianSplats .sphericalHarmonics1 = this .sphericalHarmonics1;
         gaussianSplats .sphericalHarmonics2 = this .sphericalHarmonics2;
         gaussianSplats .sphericalHarmonics3 = this .sphericalHarmonics3;

         transform .rotation = new Rotation4 (1, 0, 0, Math .PI);
         transform .children .push (gaussianSplats);

         scene .rootNodes .push (transform);
      }
      else if (this .coordIndex) // IndexedFaceSet
      {
         const
            hasNormals = this .normals ?.some (v => v !== 0),
            triangles  = this .triangles && !this .texCoordIndex ?.length,
            shape      = scene .createNode ("Shape"),
            appearance = scene .createNode ("Appearance"),
            material   = scene .createNode ("Material"),
            geometry   = scene .createNode (triangles ? "IndexedTriangleSet" : "IndexedFaceSet"),
            coordinate = scene .createNode ("Coordinate");

         if (triangles)
            geometry .index = this .coordIndex .filter (v => v !== -1);
         else
            geometry .coordIndex = this .coordIndex;

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

            if (this .mustRotateAxes)
               this .rotateAxes90 (this .normals);

            normal .vector   = this .normals;
            geometry .normal = normal;
         }

         if (this .mustRotateAxes)
            this .rotateAxes90 (this .points);

         coordinate .point = this .points;
         geometry .coord   = coordinate;

         appearance .material = material;
         shape .appearance    = appearance;
         shape .geometry      = geometry;

         scene .getRootNodes () .push (shape);
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

         geometry .color = this .createColor ();

         if (hasNormals)
         {
            const normal = scene .createNode ("Normal");

            if (this .mustRotateAxes)
               this .rotateAxes90 (this .normals);

            normal .vector   = this .normals;
            geometry .normal = normal;
         }

         if (this .mustRotateAxes)
            this .rotateAxes90 (this .points);

         coordinate .point = this .points;
         geometry .coord   = coordinate;

         appearance .material = material;
         shape .appearance    = appearance;
         shape .geometry      = geometry;

         scene .getRootNodes () .push (shape);
      }
   },
   createColor ()
   {
      if (!this .colors ?.length)
         return null;

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
      // Geometry

      const
         colors    = [ ],
         texCoords = [ ],
         normals   = [ ],
         points    = [ ];

      // Gaussian Splats

      const
         scales      = [ ],
         quaternions = [ ],
         opacities   = [ ],
         sh0         = [ ], // Degree 0
         rest        = Array .from ({ length: 45 }, () => [ ]),
         restIndex   = new Map (Array .from ({ length: 45 }, (v, i) => [`f_rest_${i}`, i]));

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
               case "red": case "green": case "blue": case "alpha":
               case "r": case "g": case "b": case "a":
                  colors .push (this .convertColor (this .value, type));
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
               // Gaussian Splats
               // https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/ply/
               case "rot_0": case "rot_1": case "rot_2": case "rot_3":
                  quaternions .push (this .value);
                  break;
               // https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat-io-gsplat/src/main/java/de/javagl/jsplat/io/gsplat/GsplatSplatWriter.java#L106
               case "scale_0": case "scale_1": case "scale_2":
                  scales .push (Math .exp (this .value));
                  break;
               case "opacity":
                  // https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat/src/main/java/de/javagl/jsplat/Splats.java#L244
                  opacities .push (1 / (1 + Math .exp (-this .value)));
                  break;
               // Degree 0
               case "f_dc_0": case "f_dc_1": case "f_dc_2":
                  sh0 .push (this .convertColor (this .value, type));
                  break;
               // Degree 1,2,3
               case "f_rest_0":  case "f_rest_1":  case "f_rest_2":
               case "f_rest_3":  case "f_rest_4":  case "f_rest_5":
               case "f_rest_6":  case "f_rest_7":  case "f_rest_8":
               case "f_rest_9":  case "f_rest_10": case "f_rest_11":
               case "f_rest_12": case "f_rest_13": case "f_rest_14":
               case "f_rest_15": case "f_rest_16": case "f_rest_17":
               case "f_rest_18": case "f_rest_19": case "f_rest_20":
               case "f_rest_21": case "f_rest_22": case "f_rest_23":
               case "f_rest_24": case "f_rest_25": case "f_rest_26":
               case "f_rest_27": case "f_rest_28": case "f_rest_29":
               case "f_rest_30": case "f_rest_31": case "f_rest_32":
               case "f_rest_33": case "f_rest_34": case "f_rest_35":
               case "f_rest_36": case "f_rest_37": case "f_rest_38":
               case "f_rest_39": case "f_rest_40": case "f_rest_41":
               case "f_rest_42": case "f_rest_43": case "f_rest_44":
                  rest [restIndex .get (name)] .push (this .convertColor (this .value, type));
                  break;
            }
         }
      }

      // console .timeEnd ("vertices")

      // Geometric properties

      this .alpha     = properties .some (p => p .name .match (/^(?:alpha|a)$/));
      this .colors    = colors;
      this .texCoords = texCoords;
      this .normals   = normals;
      this .points    = points;

      if (sh0 .length)
      {
         // Gaussian Splats
         // https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat-io-ply/src/main/java/de/javagl/jsplat/io/ply/PlySplatReader.java#L121

         const
            numSplats     = points .length / 3,
            shDegree      = this .getSphericalHarmonicsDegree (rest),
            shDimensions1 = this .getDimensionsForDegree (shDegree) - 1,
            shDimensions2 = shDimensions1 * 2,
            shs           = Array .from ({ length: 15 }, () => [ ]);

         for (let d = 0; d < shDimensions1; ++ d)
         {
            const
               rx = rest [d],
               ry = rest [shDimensions1 + d],
               rz = rest [shDimensions2 + d],
               sh = shs [d];

            for (let s = 0; s < numSplats; ++ s)
               sh .push (rx [s], ry [s], rz [s]);
         }

         this .quaternions         = quaternions;
         this .scales              = scales;
         this .opacities           = opacities;
         this .sphericalHarmonics0 = sh0;
         this .sphericalHarmonics1 = shs [0] .concat (shs [1], shs [2]);
         this .sphericalHarmonics2 = shs [3] .concat (shs [4], shs [5], shs [6], shs [7]);
         this .sphericalHarmonics3 = shs [8] .concat (shs [9], shs [10], shs [11], shs [12], shs [13], shs [14]);
      }
   },
   getSphericalHarmonicsDegree (rest)
   {
      if (rest [44] .length)
         return 3;

      if (rest [23] .length)
         return 2;

      if (rest [8] .length)
         return 1;

      return 0;
   },
   getDimensionsForDegree (shDegree)
   {
      return (shDegree + 1) ** 2;
   },
   parseFaces ({ count, properties })
   {
      const coordIndex = [ ];

      for (let i = 0; i < count; ++ i)
      {
         this .whitespaces ();

         for (const { count, value, name } of properties)
         {
            if (!count)
            {
               if (!value .call (this))
                  throw new Error (`Couldn't parse a property value for ${name}.`);

               continue;
            }

            if (!count .call (this))
               throw new Error (`Couldn't parse property count for ${name}.`);

            const length = this .value;

            this .triangles &&= length === 3;

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
});

export default PLYAParser;

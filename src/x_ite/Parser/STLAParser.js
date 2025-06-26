import X3DParser   from "./X3DParser.js";
import Expressions from "./Expressions.js";
import Color3      from "../../standard/Math/Numbers/Color3.js";

// http://paulbourke.net/dataformats/stl/
// https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html

/*
 *  Grammar
 */

// Lexical elements
const Grammar = Expressions ({
   // General
   whitespaces: /[\x20\n\t\r,]+/gy,
   whitespacesNoLineTerminator: /[\x20\t]+/gy,
   comment: /;.*?(?=[\n\r]|$)/gy,
   untilEndOfLine: /[^\r\n]+/gy,

   // Keywords
   solid: /solid/gy,
   facet: /facet/gy,
   normal: /normal/gy,
   outer: /outer/gy,
   loop: /loop/gy,
   vertex: /vertex/gy,
   endloop: /endloop/gy,
   endfacet: /endfacet/gy,
   endsolid: /endsolid/gy,

   // Values
   name: /\w+/gy,
   double: /[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/gy,
   constants: /([+-])((?:NAN|INF|INFINITY))/igy,
});

/*
 * Parser
 */

function STLAParser (scene)
{
   X3DParser .call (this, scene);
}

Object .assign (Object .setPrototypeOf (STLAParser .prototype, X3DParser .prototype),
{
   CONSTANTS: new Map ([
      ["NAN", NaN],
      ["INF", Infinity],
      ["INFINITY", Infinity],
   ]),
   getEncoding ()
   {
      return "STRING";
   },
   setInput (string)
   {
      this .input = string;
   },
   isValid ()
   {
      if (!(typeof this .input === "string"))
         return false;

      return !! this .input .match (/^(?:[\x20\n\t\r]+|;.*?[\r\n])*\b(?:solid)\b/);
   },
   parseIntoScene (resolve, reject)
   {
      this .stl ()
         .then (resolve)
         .catch (reject);
   },
   async stl ()
   {
      // Set profile and components.

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("STL");
      scene .setProfile (browser .getProfile ("Interchange"));

      await browser .loadComponents (scene);

      // Create nodes.

      this .material   = scene .createNode ("Material");
      this .appearance = scene .createNode ("Appearance");

      this .material .diffuseColor = Color3 .White;
      this .appearance .material   = this .material;

      // Parse scene.

      this .statements ();

      return this .getScene ();
   },
   comments ()
   {
      while (this .comment ())
         ;
   },
   comment ()
   {
      this .whitespaces ();

      if (Grammar .comment .parse (this))
         return true;

      return false;
   },
   whitespaces ()
   {
      Grammar .whitespaces .parse (this);
   },
   whitespacesNoLineTerminator ()
   {
      Grammar .whitespacesNoLineTerminator .parse (this);
   },
   statements ()
   {
      while (this .solid ())
         ;
   },
   solid ()
   {
      this .comments ();

      if (Grammar .solid .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         const
            scene      = this .getExecutionContext (),
            shape      = scene .createNode ("Shape"),
            geometry   = scene .createNode ("TriangleSet"),
            normal     = scene .createNode ("Normal"),
            coordinate = scene .createNode ("Coordinate"),
            name       = this .sanitizeName (Grammar .name .parse (this) ? this .result [0] : "");

         Grammar .untilEndOfLine .parse (this);

         this .facets ();

         shape .appearance         = this .appearance;
         shape .geometry           = geometry;
         geometry .normalPerVertex = false;
         geometry .normal          = normal;
         geometry .coord           = coordinate;
         normal .vector            = this .normals;
         coordinate .point         = this .vertices;

         if (name)
         {
            scene .addNamedNode (scene .getUniqueName (name), shape);
            scene .addExportedNode (scene .getUniqueExportName (name), shape);
         }

         scene .getRootNodes () .push (shape);

         this .comments ();

         if (Grammar .endsolid .parse (this))
            return true;

         throw new Error ("Expected 'endsolid' statement.");
      }

      return false;
   },
   facets ()
   {
      this .normals  = [ ];
      this .vertices = [ ];

      while (this .facet (this .normals, this .vertices))
         ;
   },
   facet (normals, vertices)
   {
      this .comments ()

      if (Grammar .facet .parse (this))
      {
         if (this .normal (normals))
         {
            if (this .loop (vertices))
            {
               this .comments ();

               if (Grammar .endfacet .parse (this))
                  return true;

               throw new Error ("Expected 'endfacet' statement.");
            }
         }
      }

      return false;
   },
   normal (normals)
   {
      this .whitespacesNoLineTerminator ();

      if (Grammar .normal .parse (this))
      {
         if (this .double ())
         {
            const x = this .value;

            if (this .double ())
            {
               const y = this .value;

               if (this .double ())
               {
                  const z = this .value;

                  normals .push (x, y, z);
                  return true;
               }

               throw new Error ("Expected a double.");
            }

            throw new Error ("Expected a double.");
         }

         throw new Error ("Expected a double.");
      }

      throw new Error ("Expected 'normal' statement.");
   },
   loop (vertices)
   {
      this .comments ();

      if (Grammar .outer .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .loop .parse (this))
         {
            if (this .vertex (vertices))
            {
               if (this .vertex (vertices))
               {
                  if (this .vertex (vertices))
                  {
                     this .comments ();

                     if (Grammar .endloop .parse (this))
                        return true;

                     throw new Error ("Expected 'endloop' statement.");
                  }
               }
            }
         }

         throw new Error ("Expected 'loop' statement.");
      }

      throw new Error ("Expected 'outer' statement.");
   },
   vertex (vertices)
   {
      this .comments ();

      if (Grammar .vertex .parse (this))
      {
         if (this .double ())
         {
            const x = this .value;

            if (this .double ())
            {
               const y = this .value;

               if (this .double ())
               {
                  const z = this .value;

                  vertices .push (x, y, z);
                  return true;
               }

               throw new Error ("Expected a double.");
            }

            throw new Error ("Expected a double.");
         }

         throw new Error ("Expected a double.");
      }

      throw new Error ("Expected 'vertex' statement.");
   },
   double ()
   {
      this .whitespacesNoLineTerminator ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [0]);

         return true;
      }

      if (Grammar .constants .parse (this))
      {
         this .value = this .CONSTANTS .get (this .result [2] .toUpperCase ());

         if (this .result [1] === "-")
            this .value = - this .value;

         return true;
      }

      return false;
   },
});

export default STLAParser;

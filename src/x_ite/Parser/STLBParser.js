import X3DParser from "./X3DParser.js";
import Color3    from "../../standard/Math/Numbers/Color3.js";

// http://paulbourke.net/dataformats/stl/
// https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html

/*
 * Parser
 */

function STLBParser (scene)
{
   X3DParser .call (this, scene);
}

Object .assign (Object .setPrototypeOf (STLBParser .prototype, X3DParser .prototype),
{
   getEncoding ()
   {
      return "ARRAY_BUFFER";
   },
   setInput (input)
   {
      this .arrayBuffer = input;
      this .dataView    = new DataView (input);
   },
   isValid ()
   {
      if (!(this .arrayBuffer instanceof ArrayBuffer))
         return false;

      if (this .dataView .byteLength < 84)
         return false;

      const
         numFaces   = this .dataView .getUint32 (80, true),
         byteLength = numFaces * 50 + 84;

      return byteLength === this .dataView .byteLength;
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

      this .shape ();

      return this .getScene ();
   },
   shape ()
   {
      const
         scene      = this .getExecutionContext (),
         shape      = scene .createNode ("Shape"),
         geometry   = scene .createNode ("TriangleSet"),
         normal     = scene .createNode ("Normal"),
         coordinate = scene .createNode ("Coordinate"),
         dataView   = this .dataView,
         byteLength = this .dataView .byteLength,
         vector     = [ ],
         point      = [ ];

      for (let i = 84; i < byteLength; i += 50)
      {
         for (let f = 0; f < 3; ++ f)
            vector .push (dataView .getFloat32 (i + f * 4, true));

         for (let f = 3; f < 12; ++ f)
            point .push (dataView .getFloat32 (i + f * 4, true));
      }

      shape .appearance         = this .appearance;
      shape .geometry           = geometry;
      geometry .normalPerVertex = false;
      geometry .normal          = normal;
      geometry .coord           = coordinate;
      normal .vector            = vector;
      coordinate .point         = point;

      scene .getRootNodes () .push (shape);
   },
});

export default STLBParser;

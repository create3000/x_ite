import X3DParser from "./X3DParser.js";
import Color3    from "../../standard/Math/Numbers/Color3.js";
import Rotation4 from "../../standard/Math/Numbers/Rotation4.js";

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

      this .material .diffuseColor = Color3 .WHITE;
      this .appearance .material   = this .material;

      // Parse scene.

      this .shape ();

      return this .getScene ();
   },
   shape ()
   {
      const
         scene      = this .getExecutionContext (),
         transform  = scene .createNode ("Transform"),
         shape      = scene .createNode ("Shape"),
         geometry   = scene .createNode ("TriangleSet"),
         coordinate = scene .createNode ("Coordinate"),
         dataView   = this .dataView,
         byteLength = this .dataView .byteLength,
         normals    = [ ],
         point      = [ ];

      for (let i = 84; i < byteLength; i += 50)
      {
         for (let f = 0; f < 3; ++ f)
            normals .push (dataView .getFloat32 (i + f * 4, true));

         for (let f = 3; f < 12; ++ f)
            point .push (dataView .getFloat32 (i + f * 4, true));
      }

      shape .appearance         = this .appearance;
      shape .geometry           = geometry;
      coordinate .point         = point;
      geometry .normalPerVertex = false;
      geometry .coord           = coordinate;

      if (normals .some (v => v !== 0))
      {
         const normal = scene .createNode ("Normal");

         normal .vector   = normals;
         geometry .normal = normal;
      }

      transform .rotation = new Rotation4 (-1, 0, 0, Math .PI / 2);

      transform .children .push (shape);

      scene .getRootNodes () .push (transform);
   },
});

export default STLBParser;

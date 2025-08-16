import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DShapeNode         from "../Shape/X3DShapeNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import VertexArray          from "../../Rendering/VertexArray.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function InstancedShape (executionContext)
{
   X3DShapeNode .call (this, executionContext);

   this .addType (X3DConstants .InstancedShape);

   this .addChildObjects (X3DConstants .outputOnly, "matrices", new Fields .SFTime ());

   // Units

   this ._translations .setUnit ("length");
   this ._centers      .setUnit ("length");

   // Private properties

   this .numInstances       = 0;
   this .instancesStride    = Float32Array .BYTES_PER_ELEMENT * (16 + 9); // mat4 + mat3
   this .matrixOffset       = 0;
   this .normalMatrixOffset = Float32Array .BYTES_PER_ELEMENT * 16;
   this .matrices           = [ ];
}

Object .assign (Object .setPrototypeOf (InstancedShape .prototype, X3DShapeNode .prototype),
{
   initialize ()
   {
      X3DShapeNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .instances = Object .assign (gl .createBuffer (),
      {
         vertexArrayObject: new VertexArray (gl),
         thickLinesVertexArrayObject: new VertexArray (gl),
      });

      this ._translations      .addInterest ("set_transform__", this);
      this ._rotations         .addInterest ("set_transform__", this);
      this ._scales            .addInterest ("set_transform__", this);
      this ._scaleOrientations .addInterest ("set_transform__", this);
      this ._centers           .addInterest ("set_transform__", this);
      this ._matrices          .addInterest ("set_matrices__",  this);

      this .set_matrices__ ();
   },
   getShapeKey ()
   {
      return 3;
   },
   getNumInstances ()
   {
      return this .numInstances;
   },
   getInstances ()
   {
      return this .instances;
   },
   set_bbox__: (() =>
   {
      const bbox = new Box3 ();

      return function ()
      {
         if (this .isDefaultBBoxSize ())
         {
            if (this .getGeometry ())
            {
               this .bbox .set ();

               const geometryBBox = this .getGeometry () .getBBox ();

               for (const matrix of this .matrices)
                  this .bbox .add (bbox .assign (geometryBBox) .multRight (matrix));
            }
            else
            {
               this .bbox .set ();
            }
         }
         else
         {
            this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
         }

         this .getBBoxSize ()   .assign (this .bbox .size);
         this .getBBoxCenter () .assign (this .bbox .center);
      };
   })(),
   set_transform__ ()
   {
      this ._matrices = this .getBrowser () .getCurrentTime ();
   },
   set_matrices__ ()
   {
      const
         browser              = this .getBrowser (),
         gl                   = browser .getContext (),
         translations         = this ._translations,
         rotations            = this ._rotations,
         scales               = this ._scales,
         scaleOrientations    = this ._scaleOrientations,
         centers              = this ._centers,
         numTranslations      = translations .length,
         numRotations         = rotations .length,
         numScales            = scales .length,
         numScaleOrientations = scaleOrientations .length,
         numCenters           = centers .length,
         numInstances         = Math .max (numTranslations, numRotations, numScales, numScaleOrientations, numCenters),
         stride               = this .instancesStride / Float32Array .BYTES_PER_ELEMENT,
         length               = this .instancesStride * numInstances,
         data                 = new Float32Array (length);

      this .numInstances = numInstances;

      for (let i = 0, o = 0; i < numInstances; ++ i, o += stride)
      {
         const matrix = this .matrices [i] ??= new Matrix4 ();

         matrix .set (numTranslations      ? translations      [Math .min (i, numTranslations      - 1)] .getValue () : null,
                      numRotations         ? rotations         [Math .min (i, numRotations         - 1)] .getValue () : null,
                      numScales            ? scales            [Math .min (i, numScales            - 1)] .getValue () : null,
                      numScaleOrientations ? scaleOrientations [Math .min (i, numScaleOrientations - 1)] .getValue () : null,
                      numCenters           ? centers           [Math .min (i, numCenters           - 1)] .getValue () : null);

         data .set (matrix, o);
         data .set (matrix .submatrix .transpose () .inverse (), o + 16);
      }

      this .matrices .length = numInstances;

      gl .bindBuffer (gl .ARRAY_BUFFER, this .instances);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);

      this .set_bbox__ ();
      this .set_objects__ ();
   },
   intersectsBox (box, clipPlanes, modelViewMatrix)
   { },
   displaySimple (gl, renderContext, shaderNode)
   {
      this .getGeometry () .displaySimpleInstanced (gl, shaderNode, this);
   },
   display (gl, renderContext)
   {
      this .getGeometry () .displayInstanced (gl, renderContext, this);
   },
});

Object .defineProperties (InstancedShape,
{
   ... X3DNode .getStaticProperties ("InstancedShape", "X_ITE", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translations",      new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotations",         new Fields .MFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scales",            new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientations", new Fields .MFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "centers",           new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pointerEvents",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",          new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default InstancedShape;

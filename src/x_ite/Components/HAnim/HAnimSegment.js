import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DCoordinateNode    from "../Rendering/X3DCoordinateNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

const _hAnimNodes = Symbol .for ("X_ITE.HAnim.hAnimNodes");

function HAnimSegment (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .HAnimSegment);

   this .addAllowedTypes (X3DConstants .HAnimSite, X3DConstants .Inline, X3DConstants .Shape, X3DConstants .X3DGroupingNode);

   // Units

   this ._mass .setUnit ("mass");

   // Private properties

   this .displacerNodes = [ ];
   this .jointMatrix    = new Matrix4 ();

   // Legacy

   if (executionContext .getSpecificationVersion () <= 4.0)
      this .addAllowedTypes (X3DConstants .X3DChildNode);
}

Object .assign (Object .setPrototypeOf (HAnimSegment .prototype, X3DGroupingNode .prototype),
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);

      // Events

      this ._displacers .addInterest ("set_displacers__", this);
      this ._coord      .addInterest ("set_coord__",      this);

      this .set_displacers__ ();
      this .set_coord__ ();
   },
   getHAnimKey ()
   {
      return this .coordNode .getHAnimKey ();
   },
   getDisplacers ()
   {
      return this .displacerNodes;
   },
   getJointMatrix ()
   {
      return this .jointMatrix;
   },
   set_displacers__ ()
   {
      const displacerNodes = this .displacerNodes;

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .removeInterest ("set_displacementsTexture__",       this);
         displacerNode ._displacements .removeInterest ("set_displacementsTexture__",       this);
         displacerNode ._coordIndex    .removeInterest ("set_displacementWeightsTexture__", this);
         displacerNode ._weight        .removeInterest ("set_displacementWeightsTexture__", this);
      }

      displacerNodes .length = 0;

      for (const node of this ._displacers)
      {
         const displacerNode = X3DCast (X3DConstants .HAnimDisplacer, node);

         if (displacerNode)
            displacerNodes .push (displacerNode);
      }

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .addInterest ("set_displacementsTexture__",       this);
         displacerNode ._displacements .addInterest ("set_displacementsTexture__",       this);
         displacerNode ._coordIndex    .addInterest ("set_displacementWeightsTexture__", this);
         displacerNode ._weight        .addInterest ("set_displacementWeightsTexture__", this);
      }

      this .set_displacementsTexture__ ();
      this .set_displacementWeightsTexture__ ();
   },
   set_displacementsTexture__ ()
   {
      this .coordNode ?._displacementsTexture .addEvent ();
   },
   set_displacementWeightsTexture__ ()
   {
      this .coordNode ?._displacementWeightsTexture .addEvent ();
   },
   set_coord__ ()
   {
      this .coordNode ?.removeHAnimDisplacers (this);

      this .coordNode = X3DCast (X3DConstants .Coordinate, this ._coord)
         ?? X3DCast (X3DConstants .CoordinateDouble, this ._coord);

      this .coordNode ?.addHAnimDisplacers (this);

      this .set_displacementsTexture__ ();
      this .set_displacementWeightsTexture__ ();
   },
   traverse (type, renderObject)
   {
      if (this .coordNode ?.getNumDisplacements ())
      {
         if (type === TraverseType .DISPLAY)
         {
            const invHumanoidMatrix = renderObject .getInvHumanoidMatrix () .get ();

            this .jointMatrix
               .assign (renderObject .getModelViewMatrix () .get ())
               .multRight (invHumanoidMatrix);

            this .coordNode .updateSkin ();
         }

         const hAnimNodes = this .coordNode [_hAnimNodes] ??= [ ];

         hAnimNodes .push (this);

         X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

         hAnimNodes .pop ();
      }
      else
      {
         X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
      }
   },
   getShaderOptions (options)
   {
      this .coordNode .getHAnimShaderOptions (options);
   },
   setShaderUniforms (gl, shaderObject)
   {
      this .coordNode .setHAnimShaderUniforms (gl, shaderObject);
   },
});

Object .defineProperties (HAnimSegment,
{
   ... X3DNode .getStaticProperties ("HAnimSegment", "HAnim", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "mass",             new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "centerOfMass",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "momentsOfInertia", new Fields .MFFloat (0, 0, 0, 0, 0, 0, 0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "displacers",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default HAnimSegment;

Object .assign (X3DCoordinateNode .prototype,
{
   getHAnimKey ()
   {
      return this .humanoidKey;
   },
   set_humanoidKey__ ()
   {
      this .humanoidKey = `[${this .numJoints}.${this .numDisplacements}]`;
   },
   getNumDisplacements ()
   {
      return this .numDisplacements;
   },
   initHAnimDisplacers ()
   {
      this .addChildObjects (X3DConstants .outputOnly, "displacementsTexture",       new Fields .SFTime (),
                             X3DConstants .outputOnly, "displacementWeightsTexture", new Fields .SFTime ());

      // Private properties

      this .jointNodes = new Set (); // HAnimSegment, HAnimSite

      this .numJoints           = 0;
      this .numDisplacements    = 0;
      this .displacementWeights = [ ];

      // Textures

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .displacementsTexture       = gl .createTexture ();
      this .displacementWeightsTexture = gl .createTexture ();
      this .jointMatricesTexture       = gl .createTexture ();

      for (const texture of [this .displacementsTexture, this .displacementWeightsTexture, this .jointMatricesTexture])
      {
         gl .bindTexture (gl .TEXTURE_2D, texture);

         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
      }

      this ._displacementsTexture       .addInterest ("set_displacementsTexture__",       this);
      this ._displacementWeightsTexture .addInterest ("set_displacementWeightsTexture__", this);
   },
   addHAnimDisplacers (hAnimNode)
   {
      if (!this .jointNodes)
         this .initHAnimDisplacers ();

      this .jointNodes .add (hAnimNode);

      const size = Math .ceil (Math .sqrt (this .jointNodes .size * 8));

      this .jointMatricesArray = new Float32Array (size * size * 4);

      if (this .jointNodes .size === 1)
      {
         this .addInterest ("addEvent", this ._displacementsTexture);
         this .addInterest ("addEvent", this ._displacementWeightsTexture);
      }

      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   removeHAnimDisplacers (hAnimNode)
   {
      this .jointNodes .delete (hAnimNode);

      const size = Math .ceil (Math .sqrt (this .jointNodes .size * 8));

      this .jointMatricesArray = new Float32Array (size * size * 4);

      if (!this .jointNodes .size)
      {
         this .removeInterest ("addEvent", this ._displacementsTexture);
         this .removeInterest ("addEvent", this ._displacementWeightsTexture);
      }

      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   set_displacementsTexture__ ()
   {
      // Create array.

      const
         length        = this ._point .length || 1,
         displacements = Array .from ({ length }, () => [ ]);

      let jointIndex = 0, displacer = 0;

      this .displacementWeights .length = 0;

      for (const jointNode of this .jointNodes)
      {
         for (const { _weight, _coordIndex, _displacements } of jointNode .getDisplacers ())
         {
            if (!_coordIndex .length)
               continue;

            // Store reference to weight SFFloat.
            this .displacementWeights .push (_weight, 0, 0, 0);

            for (const [i, index] of _coordIndex .entries ())
               displacements [index] ?.push (... _displacements [i], jointIndex, displacer, 0, 0, 0);

            ++ displacer;
         }

         ++ jointIndex;
      }

      const
         numDisplacements   = displacements .reduce ((p, n) => Math .max (p, n .length), 0) / 8,
         numElements        = numDisplacements * 8,
         size               = Math .ceil (Math .sqrt (length * numDisplacements * 2)) || 1,
         displacementsArray = new Float32Array (size * size * 4);

      for (let i = 0; i < length; ++ i)
         displacementsArray .set (displacements [i], i * numElements);

      // Number of displacements per coord index.
      this .numDisplacements = numDisplacements;

      // Upload texture.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, displacementsArray);

      // Weights

      this .displacementWeightsSize  = Math .ceil (Math .sqrt (displacer));
      this .displacementWeightsArray = new Float32Array (this .displacementWeightsSize * this .displacementWeightsSize * 4);

      // Trigger update.

      this .set_humanoidKey__ ();
   },
   set_displacementWeightsTexture__ ()
   {
      // Upload texture.

      const
         gl    = this .getBrowser () .getContext (),
         size  = this .displacementWeightsSize,
         array = this .displacementWeightsArray;

      array .set (this .displacementWeights);

      gl .bindTexture (gl .TEXTURE_2D, this .displacementWeightsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, array);
   },
   getHAnimShaderOptions (options)
   {
      options .push ("X3D_SKINNING");
      options .push (`X3D_NUM_JOINT_SETS ${this .numJoints / 4}`);
      options .push (`X3D_NUM_DISPLACEMENTS ${this .numDisplacements}`);
   },
   setHAnimShaderUniforms (gl, shaderObject)
   {
      const
         browser                               = this .getBrowser (),
         jointMatricesTextureUnit              = browser .popTextureUnit (),
         displacementsTextureTextureUnit       = browser .popTextureUnit (),
         displacementWeightsTextureTextureUnit = browser .popTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + jointMatricesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
      gl .uniform1i (shaderObject .x3d_JointMatricesTexture, jointMatricesTextureUnit);

      this .skinning ();

      gl .activeTexture (gl .TEXTURE0 + displacementsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .uniform1i (shaderObject .x3d_DisplacementsTexture, displacementsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + displacementWeightsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .displacementWeightsTexture);
      gl .uniform1i (shaderObject .x3d_DisplacementWeightsTexture, displacementWeightsTextureTextureUnit);
   },
   skinning ()
   {
      if (!this .updateSkinTexture)
         return;

      this .updateSkinTexture = false;

      // Create joint matrices.

      const
         jointMatricesArray = this .jointMatricesArray,
         size               = Math .ceil (Math .sqrt (this .jointNodes .size * 8));

      let i = 0;

      for (const jointNode of this .jointNodes)
      {
         jointMatricesArray .set (jointNode .getJointMatrix (), i * 32);
         // No need for jointNormalMatrix.
         ++ i;
      }

      // Upload textures.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, jointMatricesArray);
   },
   updateSkin ()
   {
      this .updateSkinTexture = true;
   },
});

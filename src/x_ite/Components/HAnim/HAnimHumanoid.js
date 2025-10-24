import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import Group                from "../Grouping/Group.js";
import Transform            from "../Grouping/Transform.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

// Register shaders.

import ShaderRegistry from "../../Browser/Shaders/ShaderRegistry.js";
import Skin2          from "../../../assets/shaders/webgl2/common/Skin2.glsl.js";

ShaderRegistry .addInclude ("Skin", Skin2);

/**
 * HAnimHumanoid
 */

function HAnimHumanoid (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .HAnimHumanoid);

   this .addChildObjects (X3DConstants .outputOnly, "jointTextures",              new Fields .SFTime (),
                          X3DConstants .outputOnly, "displacementsTexture",       new Fields .SFTime (),
                          X3DConstants .outputOnly, "displacementWeightsTexture", new Fields .SFTime ());

   // Units

   this ._translation .setUnit ("length");
   this ._center      .setUnit ("length");
   this ._bboxSize    .setUnit ("length");
   this ._bboxCenter  .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this ._version = "";

   // Private properties

   this .skeletonNode         = new Group (executionContext);
   this .viewpointsNode       = new Group (executionContext);
   this .skinNode             = new Skin (executionContext, this);
   this .transformNode        = new Transform (executionContext);
   this .poseNodes            = [ ];
   this .motionNodes          = [ ];
   this .jointNodes           = [ ];
   this .jointBindingMatrices = [ ];
   this .displacementWeights  = [ ];
   this .numJoints            = 0;
   this .numDisplacements     = 0;
   this .update               = new Lock ();
   this .skinning             = Function .prototype;
}

Object .assign (Object .setPrototypeOf (HAnimHumanoid .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      // Groups

      this .skeletonNode   .addAllowedTypes (X3DConstants .HAnimJoint, X3DConstants .HAnimSite);
      this .viewpointsNode .addAllowedTypes (X3DConstants .HAnimSite);

      this ._skeleton   .addFieldInterest (this .skeletonNode   ._children);
      this ._viewpoints .addFieldInterest (this .viewpointsNode ._children);
      this ._skin       .addFieldInterest (this .skinNode       ._children);

      this .skeletonNode   ._children = this ._skeleton;
      this .viewpointsNode ._children = this ._viewpoints;
      this .skinNode       ._children = this ._skin;

      this .skeletonNode   .setPrivate (true);
      this .viewpointsNode .setPrivate (true);
      this .skinNode       .setPrivate (true);

      // Transform

      this ._translation      .addFieldInterest (this .transformNode ._translation);
      this ._rotation         .addFieldInterest (this .transformNode ._rotation);
      this ._scale            .addFieldInterest (this .transformNode ._scale);
      this ._scaleOrientation .addFieldInterest (this .transformNode ._scaleOrientation);
      this ._center           .addFieldInterest (this .transformNode ._center);
      this ._bboxSize         .addFieldInterest (this .transformNode ._bboxSize);
      this ._bboxCenter       .addFieldInterest (this .transformNode ._bboxCenter);

      this .transformNode ._translation      = this ._translation;
      this .transformNode ._rotation         = this ._rotation;
      this .transformNode ._scale            = this ._scale;
      this .transformNode ._scaleOrientation = this ._scaleOrientation;
      this .transformNode ._center           = this ._center;
      this .transformNode ._bboxSize         = this ._bboxSize;
      this .transformNode ._bboxCenter       = this ._bboxCenter;
      this .transformNode ._children         = [ this .skeletonNode, this .viewpointsNode, this .skinNode ];

      // Setup

      this .skeletonNode   .setup ();
      this .viewpointsNode .setup ();
      this .skinNode       .setup ();
      this .transformNode  .setup ();

      this .connectChildNode (this .transformNode);

      // Textures

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .jointsTexture              = gl .createTexture ();
      this .displacementsTexture       = gl .createTexture ();
      this .displacementWeightsTexture = gl .createTexture ();
      this .jointMatricesTexture       = gl .createTexture ();

      for (const texture of [this .jointsTexture, this .displacementsTexture, this .displacementWeightsTexture, this .jointMatricesTexture])
      {
         gl .bindTexture (gl .TEXTURE_2D, texture);

         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
      }

      // Events

      this ._poses                      .addInterest ("set_poses__",                      this);
      this ._motionsEnabled             .addInterest ("set_motions__",                    this);
      this ._motions                    .addInterest ("set_motions__",                    this);
      this ._jointBindingPositions      .addInterest ("set_joints__",                     this);
      this ._jointBindingRotations      .addInterest ("set_joints__",                     this);
      this ._jointBindingScales         .addInterest ("set_joints__",                     this);
      this ._joints                     .addInterest ("set_joints__",                     this);
      this ._jointTextures              .addInterest ("set_jointTextures__",              this);
      this ._displacementsTexture       .addInterest ("set_displacementsTexture__",       this);
      this ._displacementWeightsTexture .addInterest ("set_displacementWeightsTexture__", this);
      this ._skinCoord                  .addInterest ("set_skinCoord__",                  this);

      this .set_poses__ ();
      this .set_motions__ ();
      this .set_joints__ ();
      this .set_skinCoord__ ();
   },
   getBBox (bbox, shadows)
   {
      return this .transformNode .getBBox (bbox, shadows);
   },
   getSubBBox (bbox, shadows)
   {
      return this .transformNode .getSubBBox (bbox, shadows);
   },
   getShapes (shapes, modelMatrix)
   {
      return this .transformNode .getShapes (shapes, modelMatrix);
   },
   getMatrix ()
   {
      return this .transformNode .getMatrix ();
   },
   getHAnimKey ()
   {
      return this .humanoidKey;
   },
   set_humanoidKey__ ()
   {
      this .humanoidKey = `[${this .numJoints}.${this .numDisplacements}]`;
   },
   set_poses__ ()
   {
      const poseNodes = this .poseNodes;

      for (const poseNode of this .poseNodes)
      {
         poseNode ._isActive .removeInterest ("set_pose_active__", this);

         poseNode .removeJoints (this .jointNodes);
      }

      poseNodes .length = 0;

      for (const node of this ._poses)
      {
         const poseNode = X3DCast (X3DConstants .HAnimPose, node);

         if (poseNode)
            poseNodes .push (poseNode);
      }

      for (const poseNode of this .poseNodes)
      {
         poseNode ._isActive .addInterest ("set_pose_active__", this);

         poseNode .addJoints (this .jointNodes);
      }
   },
   set_pose_active__ (value)
   {
      if (value .getValue ())
         return;

      for (const poseNode of this .poseNodes)
         poseNode .setUpdateJoints (true);
   },
   set_motions__ ()
   {
      const
         motionsEnabled = this ._motionsEnabled,
         motionNodes    = this .motionNodes;

      for (const motionNode of motionNodes)
      {
         motionNode ._joints          .removeInterest ("set_connectJoints__", this);
         motionNode ._channelsEnabled .removeInterest ("set_connectJoints__", this);
         motionNode ._channels        .removeInterest ("set_connectJoints__", this);
         motionNode ._values          .removeInterest ("set_connectJoints__", this);

         motionNode .disconnectJoints (this .jointNodes);
      }

      motionNodes .length = 0;

      for (const [i, node] of this ._motions .entries ())
      {
         if (i < motionsEnabled .length && !motionsEnabled [i])
            continue;

         const motionNode = X3DCast (X3DConstants .HAnimMotion, node);

         if (motionNode)
            motionNodes .push (motionNode);
      }

      for (const motionNode of motionNodes)
      {
         motionNode ._joints          .addInterest ("set_connectJoints__", this, motionNode);
         motionNode ._channelsEnabled .addInterest ("set_connectJoints__", this, motionNode);
         motionNode ._channels        .addInterest ("set_connectJoints__", this, motionNode);
         motionNode ._values          .addInterest ("set_connectJoints__", this, motionNode);

         motionNode .connectJoints (this .jointNodes);
      }
   },
   set_connectJoints__ (motionNode)
   {
      motionNode .disconnectJoints (this .jointNodes);
      motionNode .connectJoints (this .jointNodes);
   },
   set_joints__ ()
   {
      const
         jointNodes               = this .jointNodes,
         jointBindingMatrices     = this .jointBindingMatrices,
         jointBindingPositions    = this ._jointBindingPositions,
         jointBindingRotations    = this ._jointBindingRotations,
         jointBindingScales       = this ._jointBindingScales,
         numJointBindingPositions = jointBindingPositions .length,
         numJointBindingRotations = jointBindingRotations .length,
         numJointBindingScales    = jointBindingScales .length;

      for (const poseNode of this .poseNodes)
         poseNode .removeJoints (jointNodes);

      for (const motionNode of this .motionNodes)
         motionNode .disconnectJoints (jointNodes);

      for (const jointNode of jointNodes)
      {
         jointNode .removeInterest ("unlock", this .update);

         jointNode ._skinCoordIndex      .removeInterest ("addEvent", this ._jointTextures);
         jointNode ._skinCoordWeight     .removeInterest ("addEvent", this ._jointTextures);
         jointNode ._displacements       .removeInterest ("addEvent", this ._displacementsTexture);
         jointNode ._displacementWeights .removeInterest ("addEvent", this ._displacementWeightsTexture);
      }

      jointNodes           .length = 0;
      jointBindingMatrices .length = 0;

      for (const [i, node] of this ._joints .entries ())
      {
         const jointNode = X3DCast (X3DConstants .HAnimJoint, node);

         if (!jointNode)
            continue;

         const
            t = i < numJointBindingPositions ? jointBindingPositions [i] .getValue () : null,
            r = i < numJointBindingRotations ? jointBindingRotations [i] .getValue () : null,
            s = i < numJointBindingScales    ? jointBindingScales    [i] .getValue () : null;

         jointNodes           .push (jointNode);
         jointBindingMatrices .push (new Matrix4 () .set (t, r, s));
      }

      for (const jointNode of jointNodes)
      {
         jointNode .addInterest ("unlock", this .update);

         jointNode ._skinCoordIndex      .addInterest ("addEvent", this ._jointTextures);
         jointNode ._skinCoordWeight     .addInterest ("addEvent", this ._jointTextures);
         jointNode ._displacements       .addInterest ("addEvent", this ._displacementsTexture);
         jointNode ._displacementWeights .addInterest ("addEvent", this ._displacementWeightsTexture);
      }

      for (const poseNode of this .poseNodes)
         poseNode .addJoints (jointNodes);

      for (const motionNode of this .motionNodes)
         motionNode .connectJoints (jointNodes);

      const size = Math .ceil (Math .sqrt (jointNodes .length * 8));

      this .jointMatricesArray = new Float32Array (size * size * 4),

      this ._jointTextures              .addEvent ();
      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   set_jointTextures__ ()
   {
      // Create arrays.

      const
         length  = this .skinCoordNode ?._point .length || 1,
         joints  = Array .from ({ length }, () => [ ]),
         weights = Array .from ({ length }, () => [ ]);

      for (const [joint, jointNode] of this .jointNodes .entries ())
      {
         const skinCoordWeight = jointNode ._skinCoordWeight .getValue ();

         for (const [i, index] of jointNode ._skinCoordIndex .entries ())
         {
            const weight = skinCoordWeight [i];

            if (weight === 0)
               continue;

            joints  [index] ?.push (joint);
            weights [index] ?.push (weight);
         }
      }

      const
         numJoints   = Algorithm .roundToMultiple (joints .reduce ((p, n) => Math .max (p, n .length), 0), 4),
         numJoints2  = numJoints * 2,
         size        = Math .ceil (Math .sqrt (length * numJoints2)) || 1,
         jointsArray = new Float32Array (size * size * 4);

      for (let i = 0; i < length; ++ i)
      {
         jointsArray .set (joints  [i], i * numJoints2);
         jointsArray .set (weights [i], i * numJoints2 + numJoints);
      }

      this .numJoints = numJoints;

      // Upload textures.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .jointsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, jointsArray);

      // Trigger update.

      this .update .unlock ();
      this .set_humanoidKey__ ();
   },
   set_displacementsTexture__ ()
   {
      // Create array.

      const
         length        = this .skinCoordNode ?._point .length || 1,
         displacements = Array .from ({ length }, () => [ ]);

      let displacer = 0;

      this .displacementWeights .length = 0;

      for (const [joint, jointNode] of this .jointNodes .entries ())
      {
         for (const { _weight, _coordIndex, _displacements } of jointNode .getDisplacers ())
         {
            if (!_coordIndex .length)
               continue;

            // Store reference to weight SFFloat.
            this .displacementWeights .push (_weight, 0, 0, 0);

            for (const [i, index] of _coordIndex .entries ())
               displacements [index] ?.push (... _displacements [i], joint, displacer, 0, 0, 0);

            ++ displacer;
         }
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

      this .update .unlock ();
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
   set_skinCoord__ ()
   {
      if (this .skinCoordNode)
      {
         this .skinCoordNode .removeInterest ("addEvent", this ._jointTextures);
         this .skinCoordNode .removeInterest ("addEvent", this ._displacementsTexture);
         this .skinCoordNode .removeInterest ("addEvent", this ._displacementWeightsTexture);
      }

      this .skinCoordNode = X3DCast (X3DConstants .Coordinate, this ._skinCoord)
         ?? X3DCast (X3DConstants .CoordinateDouble, this ._skinCoord);

      if (this .skinCoordNode)
      {
         delete this .skinning;

         this .skinCoordNode .addInterest ("addEvent", this ._jointTextures);
         this .skinCoordNode .addInterest ("addEvent", this ._displacementsTexture);
         this .skinCoordNode .addInterest ("addEvent", this ._displacementWeightsTexture);
      }
      else
      {
         this .skinning = Function .prototype;
      }

      this ._jointTextures              .addEvent ();
      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   traverse (type, renderObject)
   {
      const invHumanoidMatrix = renderObject .getInvHumanoidMatrix ();

      invHumanoidMatrix .push (this .transformNode .getMatrix ());
      invHumanoidMatrix .multRight (renderObject .getModelViewMatrix () .get ());
      invHumanoidMatrix .inverse ();

      this .transformNode .traverse (type, renderObject);

      this .skinning (type, renderObject);

      invHumanoidMatrix .pop ();
   },
   skinning (type, renderObject)
   {
      if (type !== TraverseType .DISPLAY || this .update .lock ())
         return;

      // Create joint matrices.

      const
         invModelViewMatrix   = renderObject .getInvHumanoidMatrix () .get (),
         jointNodes           = this .jointNodes,
         jointNodesLength     = jointNodes .length,
         jointBindingMatrices = this .jointBindingMatrices,
         jointMatricesArray   = this .jointMatricesArray,
         size                 = Math .ceil (Math .sqrt (jointNodesLength * 8));

      for (let i = 0; i < jointNodesLength; ++ i)
      {
         const
            jointNode          = jointNodes [i],
            jointBindingMatrix = jointBindingMatrices [i],
            jointMatrix        = jointNode .getModelViewMatrix () .multRight (invModelViewMatrix) .multLeft (jointBindingMatrix),
            jointNormalMatrix  = jointMatrix .submatrix .transpose () .inverse ();

         jointMatricesArray .set (jointMatrix,       i * 32 + 0);
         jointMatricesArray .set (jointNormalMatrix, i * 32 + 16);
      }

      // Upload textures.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, jointMatricesArray);
   },
   getShaderOptions (options)
   {
      options .push ("X3D_SKINNING");
      options .push (`X3D_NUM_JOINT_SETS ${this .numJoints / 4}`);
      options .push (`X3D_NUM_DISPLACEMENTS ${this .numDisplacements}`);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         browser                  = this .getBrowser (),
         jointsTextureTextureUnit = browser .getTextureUnit (),
         jointMatricesTextureUnit = browser .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + jointsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .jointsTexture);
      gl .uniform1i (shaderObject .x3d_JointsTexture, jointsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + jointMatricesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
      gl .uniform1i (shaderObject .x3d_JointMatricesTexture, jointMatricesTextureUnit);

      if (!this .numDisplacements)
         return;

      const
         displacementsTextureTextureUnit       = browser .getTextureUnit (),
         displacementWeightsTextureTextureUnit = browser .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + displacementsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .uniform1i (shaderObject .x3d_DisplacementsTexture, displacementsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + displacementWeightsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .displacementWeightsTexture);
      gl .uniform1i (shaderObject .x3d_DisplacementWeightsTexture, displacementWeightsTextureTextureUnit);
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (HAnimHumanoid,
{
   ... X3DNode .getStaticProperties ("HAnimHumanoid", "HAnim", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",                  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "info",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "version",               new Fields .SFString ("2.1")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skeletalConfiguration", new Fields .SFString ("BASIC")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "loa",                   new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",              new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",                 new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation",      new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",                new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",              new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",            new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skeleton",              new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "jointBindingPositions", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "jointBindingRotations", new Fields .MFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "jointBindingScales",    new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "joints",                new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "segments",              new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sites",                 new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "viewpoints",            new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "poses",                 new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "motionsEnabled",        new Fields .MFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "motions",               new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinBindingNormals",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinBindingCoords",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinNormal",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoord",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skin",                  new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

class Skin extends Group
{
   #humanoidNode;

   constructor (executionContext, humanoidNode)
   {
      super (executionContext);

      this .#humanoidNode = humanoidNode;
   }

   traverse (type, renderObject)
   {
      renderObject .getHAnimNode () .push (this .#humanoidNode);

      super .traverse (type, renderObject);

      renderObject .getHAnimNode () .pop ();
   }
}

class Lock
{
   #locked = true;

   unlock ()
   {
      this .#locked = false;
   }

   lock ()
   {
      const locked = this .#locked;

      this .#locked = true;

      return locked;
   }
}

export default HAnimHumanoid;

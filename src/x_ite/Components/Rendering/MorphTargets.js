import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "./X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";

import { maxTexCoords } from "../../Browser/Texturing/TexturingConfiguration.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function MorphTargets (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .MorphTargets);

   this .addChildObjects (X3DConstants .outputOnly, "key", new Fields .SFTime ());

   // Private properties

   this .targets     = [ ];
   this .targetNodes = [ ];
}

Object .assign (Object .setPrototypeOf (MorphTargets .prototype, X3DGeometricPropertyNode .prototype),
{
   initialize ()
   {
      X3DGeometricPropertyNode .prototype .initialize .call (this);

      // Textures

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .morphTargetsTexture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .morphTargetsTexture);

      gl .texParameteri (gl .TEXTURE_2D_ARRAY, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D_ARRAY, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D_ARRAY, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D_ARRAY, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
      gl .texImage3D (gl .TEXTURE_2D_ARRAY, 0, gl .RGBA16F, 1, 1, 1, 0, gl .RGBA, gl .FLOAT, null);

      // Events

      this ._weights .addInterest ("set_weights__", this);
      this ._targets .addInterest ("set_targets__", this);

      this .set_weights__ ();
      this .set_targets__ ();
   },
   set_weights__ ()
   {
      const numWeights = this ._weights .length;

      if (numWeights === this .numWeights)
         return;

      this .numWeights = numWeights;

      this ._key = Date .now () / 1000;
   },
   set_targets__ ()
   {
      const targetNodes = this .targetNodes;

      for (const targetNode of targetNodes)
         targetNode .removeInterest ("createTexture", this);

      targetNodes .length = 0;

      for (const node of this ._targets)
      {
         const targetNode = X3DCast (X3DConstants .MorphTarget, node);

         if (targetNode)
            targetNodes .push (targetNode);
      }

      for (const targetNode of targetNodes)
         targetNode .addInterest ("createTexture", this);

      this .createTexture ();
   },
   getKey ()
   {
      if (!this ._weights .length)
         return "[]";

      if (this ._weights .length !== this .targets .length)
         return "[]";

      let key = "";

      key += "[";
      key += this ._weights .length;
      key += Object .values (this .targets [0]) .map (target => target .length) .join (",");
      key += "]";

      return key;
   },
   createTexture ()
   {
      // Update targets array.

      const targets = this .targets;

      targets .length = 0;

      if (!this .targetNodes .length)
         return;

      for (const targetNode of this .targetNodes)
      {
         const target = targetNode .getDisplacements ({
            COLOR: [ ],
            ... Object .fromEntries (Array .from ({ length: maxTexCoords }, (_, i) => [`TEXCOORD_${i}`, [ ]])),
            TANGENT: [ ],
            NORMAL: [ ],
            POSITION: [ ],
         });

         target .NORMAL = this .createNormalArray (target .NORMAL);

         targets .push (target);
      }

      // Update offsets array.

      let o = 0;

      const morphTargetOffsets = Object .values (targets [0]) .map (target => o += target .length / 4);

      morphTargetOffsets .unshift (0);

      this .morphTargetOffsets = morphTargetOffsets;

      // Update texture.

      const
         size              = Math .ceil (Math .sqrt (morphTargetOffsets .at (-1))),
         morphTargetsArray = new Float32Array (size * size * 4 * targets .length);

      for (const [i, target] of targets .entries ())
         morphTargetsArray .set (Object .values (target) .flat (), size * size * 4 * i);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .morphTargetsTexture);
      gl .texImage3D (gl .TEXTURE_2D_ARRAY, 0, gl .RGBA16F, size, size, targets .length, 0, gl .RGBA, gl .FLOAT, morphTargetsArray);

      // Propagate changes.

      this ._key = Date .now () / 1000;
   },
   createNormalArray (normal)
   {
      const
         length  = normal .length,
         normal4 = [ ];

      for (let i = 0; i < length; i += 3)
         normal4 .push (normal [i], normal [i + 1], normal [i + 2], 0);

      return normal4;
   },
   getShaderOptions (options)
   {
      if (!this ._weights .length)
         return;

      if (this ._weights .length !== this .targets .length)
         return;

      options .push (`X3D_MORPH_TARGETS`);
      options .push (`X3D_NUM_MORPH_WEIGHTS ${this ._weights .length}`);

      for (const [i, [name, array]] of Object .entries (this .targets [0]) .entries ())
      {
         if (!array .length)
            continue;

         options .push (`X3D_MORPH_TARGET_${name}`);
         options .push (`X3D_MORPH_TARGET_${name}_OFFSET ${this .morphTargetOffsets [i]}`);
      }

      options .push (`X3D_MORPH_TARGET_LAST_OFFSET ${this .morphTargetOffsets .at (-1)}`);
   },
   setShaderUniforms (gl, shaderObject)
   {
      gl .uniform1fv (shaderObject .x3d_MorphWeights, this ._weights .shrinkToFit ());

      const
         browser                 = this .getBrowser (),
         morphTargetsTextureUnit = browser .popTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + morphTargetsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .morphTargetsTexture);
      gl .uniform1i (shaderObject .x3d_MorphTargetsTexture, morphTargetsTextureUnit);
   },
});

Object .defineProperties (MorphTargets,
{
   ... X3DNode .getStaticProperties ("MorphTargets", "Rendering", 5, "targets", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weights",  new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "targets",  new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MorphTargets;

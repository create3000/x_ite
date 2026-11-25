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

   // Private properties

   this .targetNodes = [ ];
   this .targets     = {
      COLOR: [ ],
      ... Object .fromEntries (Array .from ({ length: maxTexCoords }, (_, i) => [`TEXCOORD_${i}`, [ ]])),
      TANGENT: [ ],
      NORMAL: [ ],
      POSITION: [ ],
   };
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

      gl .bindTexture (gl .TEXTURE_2D, this .morphTargetsTexture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      // Events

      this ._targets .addInterest ("set_targets__", this);

      this .set_targets__ ();
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
      let key = "";

      key += "[";
      key += this ._weights .length;

      for (const target of Object .values (this .targets))
         key += target .length ? 1 : 0;

      key += "]";

      return key;
   },
   createTexture ()
   {
      // Update targets arrays.

      const targets = this .targets;

      for (const target of Object .values (targets))
         target .length = 0;

      for (const targetNode of this .targetNodes)
         targetNode .getDisplacements (targets);

      targets .NORMAL = this .createNormalArray (targets .NORMAL);

      // Update offsets array.

      const offsets = Object .values (targets) .map (target => target .length / 4);

      offsets .unshift (0);
      offsets .pop ();

      this .offsets = new Int32Array (offsets);

      // Update texture.

      const
         flatTargets       = Object .values (targets) .flat (),
         size              = Math .ceil (Math .sqrt (flatTargets .length / 4)),
         morphTargetsArray = new Float32Array (size * size * 4);

      morphTargetsArray .set (flatTargets);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .morphTargetsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, morphTargetsArray);

      // Propagate changes.

      this .addNodeEvent ();
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

   },
   setShaderUniforms (gl, shaderObject)
   {
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

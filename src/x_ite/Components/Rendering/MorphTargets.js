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
}

Object .assign (Object .setPrototypeOf (MorphTargets .prototype, X3DGeometricPropertyNode .prototype),
{
   initialize ()
   {
      X3DGeometricPropertyNode .prototype .initialize .call (this);

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
      return "[]";
   },
   createTexture ()
   {
      const targets = {
         COLOR: [ ],
         ... Object .fromEntries (Array .from ({ length: maxTexCoords }, (_, i) => [`TEXCOORD_${i}`, [ ]])),
         TANGENT: [ ],
         NORMAL: [ ],
         POSITION: [ ],
      };

      for (const targetNode of this .targetNodes)
         targetNode .getDisplacements (targets);

      console .log (Object .values (targets) .flat ())
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

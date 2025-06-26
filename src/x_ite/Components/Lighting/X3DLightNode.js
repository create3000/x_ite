import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";

function X3DLightNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DLightNode);

   this .enabled = true;
}

Object .assign (Object .setPrototypeOf (X3DLightNode .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._global    .addInterest ("set_global__", this);
      this ._on        .addInterest ("set_on__",     this);
      this ._intensity .addInterest ("set_on__",     this);

      this .set_global__ ();
      this .set_on__ ();
   },
   set_global__ ()
   {
      this .setVisibleObject (this ._global .getValue ());
   },
   set_on__ ()
   {
      if (this ._on .getValue () && this .getIntensity () > 0 && this .enabled)
      {
         delete this .push;
         delete this .pop;
      }
      else
      {
         this .push = Function .prototype;
         this .pop  = Function .prototype;
      }
   },
   getLightKey ()
   {
      return 1; // [ClipPlane 0, X3DLightNode 1, EnvironmentLight 2, X3DTextureProjectorNode 3]
   },
   getEnabled ()
   {
      return this .enabled;
   },
   setEnabled (value)
   {
      this .enabled = value;
   },
   getGlobal ()
   {
      return this ._global .getValue ();
   },
   getColor ()
   {
      return this ._color .getValue ();
   },
   getIntensity ()
   {
      return Math .max (this ._intensity .getValue (), 0);
   },
   getAmbientIntensity ()
   {
      return Algorithm .clamp (this ._ambientIntensity .getValue (), 0, 1);
   },
   getDirection ()
   {
      return this ._direction .getValue ();
   },
   getShadows ()
   {
      return this ._shadows .getValue ();
   },
   getShadowColor ()
   {
      return this ._shadowColor .getValue ();
   },
   getShadowIntensity ()
   {
      return this .getShadows () ? Algorithm .clamp (this ._shadowIntensity .getValue (), 0, 1) : 0;
   },
   getShadowBias ()
   {
      return Algorithm .clamp (this ._shadowBias .getValue (), 0, 1);
   },
   getShadowMapSize ()
   {
      return Math .min (this ._shadowMapSize .getValue (), this .getBrowser () .getMaxTextureSize ());
   },
   getBiasMatrix: (() =>
   {
      // Transforms normalized coords from range (-1, 1) to (0, 1).
      const biasMatrix = new Matrix4 (0.5, 0.0, 0.0, 0.0,
                                      0.0, 0.5, 0.0, 0.0,
                                      0.0, 0.0, 0.5, 0.0,
                                      0.5, 0.5, 0.5, 1.0);

      return function ()
      {
         return biasMatrix;
      };
   })(),
   push (renderObject, groupNode)
   {
      if (renderObject .isIndependent ())
      {
         const lightContainer = this .getLights () .pop ();

         if (this ._global .getValue ())
         {
            lightContainer .set (this,
                                 renderObject .getLayer () .getGroups (),
                                 renderObject .getModelViewMatrix () .get ());

            renderObject .getGlobalLights () .push (lightContainer);
            renderObject .getLights ()       .push (lightContainer);

            renderObject .pushGlobalShadows (!! this .getShadowIntensity ());
            renderObject .getGlobalLightsKeys () .push (this .getLightKey ());
         }
         else
         {
            lightContainer .set (this,
                                 groupNode,
                                 renderObject .getModelViewMatrix () .get ());

            renderObject .getLocalObjects () .push (lightContainer);
            renderObject .getLights ()       .push (lightContainer);

            renderObject .pushLocalShadows (!! this .getShadowIntensity ());
            renderObject .getLocalObjectsKeys () .push (this .getLightKey ());
         }
      }
      else
      {
         const lightContainer = renderObject .getLightContainer ();

         lightContainer .modelViewMatrix .push (renderObject .getModelViewMatrix () .get ());

         if (this ._global .getValue ())
         {
            renderObject .getGlobalLights () .push (lightContainer);
            renderObject .getLights ()       .push (lightContainer);

            renderObject .pushGlobalShadows (!! this .getShadowIntensity ());
            renderObject .getGlobalLightsKeys () .push (this .getLightKey ());
         }
         else
         {
            renderObject .getLocalObjects () .push (lightContainer);
            renderObject .getLights ()       .push (lightContainer);

            renderObject .pushLocalShadows (!! this .getShadowIntensity ());
            renderObject .getLocalObjectsKeys () .push (this .getLightKey ());
         }
      }
   },
   pop (renderObject)
   {
      if (this ._global .getValue ())
         return;

      const lightContainer = renderObject .getLocalObjects () .pop ();

      if (renderObject .isIndependent ())
         this .getBrowser () .getLocalObjects () .push (lightContainer);

      renderObject .popLocalShadows ();
      renderObject .getLocalObjectsKeys () .pop ();
   },
});

Object .defineProperties (X3DLightNode, X3DNode .getStaticProperties ("X3DLightNode", "Lighting", 1));

export default X3DLightNode;

import X3DNode      from "../Core/X3DNode.js";
import X3DLightNode from "../Lighting/X3DLightNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DCast      from "../../Base/X3DCast.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";

function X3DTextureProjectorNode (executionContext)
{
   X3DLightNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTextureProjectorNode);

   // Units

   this ._location    .setUnit ("length");
   this ._farDistance .setUnit ("length");
   this ._location    .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (X3DTextureProjectorNode .prototype, X3DLightNode .prototype),
{
   initialize ()
   {
      X3DLightNode .prototype .initialize .call (this);

      this ._nearDistance .addInterest ("set_nearDistance__", this);
      this ._farDistance  .addInterest ("set_farDistance__",  this);
      this ._texture      .addInterest ("set_texture__",      this);

      this .set_nearDistance__ ();
      this .set_farDistance__ ();
      this .set_texture__ ();
   },
   getLightKey ()
   {
      return 3;
   },
   getGlobal ()
   {
      return this ._global .getValue ();
   },
   getLocation ()
   {
      return this ._location .getValue ();
   },
   getDirection ()
   {
      return this ._direction .getValue ();
   },
   getNearDistance ()
   {
      return this .nearDistance;
   },
   getNearParameter ()
   {
      return this .nearParameter;
   },
   getFarDistance ()
   {
      return this .farDistance;
   },
   getFarParameter ()
   {
      return this .farParameter;
   },
   getTexture ()
   {
      return this .textureNode;
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
   straightenHorizon (orientation)
   {
      return orientation .straighten (this ._upVector .getValue ());
   },
   set_nearDistance__ ()
   {
      const nearDistance = this ._nearDistance .getValue ();

      this .nearDistance  = nearDistance < 0 ? 0.125 : nearDistance;
      this .nearParameter = nearDistance < 0 ? 0 : -1;
   },
   set_farDistance__ ()
   {
      const farDistance = this ._farDistance .getValue ();

      this .farDistance  = farDistance < 0 ? 100_000 : farDistance;
      this .farParameter = farDistance < 0 ? 1 : 2;
   },
   set_texture__ ()
   {
      this .textureNode ?.removeInterest ("set_aspectRatio__", this);

      this .textureNode = X3DCast (X3DConstants .X3DTexture2DNode, this ._texture);

      this .textureNode ?.addInterest ("set_aspectRatio__", this);

      this .setEnabled (!!this .textureNode);

      this .set_aspectRatio__ ();
      this .set_on__ ();
   },
   set_aspectRatio__ ()
   {
      if (this .textureNode)
         this ._aspectRatio = this .textureNode .getWidth () / this .textureNode .getHeight ();
      else
         this ._aspectRatio = 1;
   },
});

Object .defineProperties (X3DTextureProjectorNode, X3DNode .getStaticProperties ("X3DTextureProjectorNode", "TextureProjection", 4));

export default X3DTextureProjectorNode;

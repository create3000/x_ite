import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DBackgroundNode    from "./X3DBackgroundNode.js";
import ImageTexture         from "../Texturing/ImageTexture.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Color3               from "../../../standard/Math/Numbers/Color3.js";

function Background (executionContext)
{
   X3DBackgroundNode .call (this, executionContext);

   this .addType (X3DConstants .Background);
}

Object .assign (Object .setPrototypeOf (Background .prototype, X3DBackgroundNode .prototype),
{
   initialize ()
   {
      X3DBackgroundNode .prototype .initialize .call (this);

      const
         frontTexture      = new ImageTexture (this .getExecutionContext ()),
         backTexture       = new ImageTexture (this .getExecutionContext ()),
         leftTexture       = new ImageTexture (this .getExecutionContext ()),
         rightTexture      = new ImageTexture (this .getExecutionContext ()),
         topTexture        = new ImageTexture (this .getExecutionContext ()),
         bottomTexture     = new ImageTexture (this .getExecutionContext ()),
         textureProperties = this .getBrowser () .getBackgroundTextureProperties ();

      this ._frontUrl  .addFieldInterest (frontTexture  ._url);
      this ._backUrl   .addFieldInterest (backTexture   ._url);
      this ._leftUrl   .addFieldInterest (leftTexture   ._url);
      this ._rightUrl  .addFieldInterest (rightTexture  ._url);
      this ._topUrl    .addFieldInterest (topTexture    ._url);
      this ._bottomUrl .addFieldInterest (bottomTexture ._url);

      frontTexture  ._url = this ._frontUrl;
      backTexture   ._url = this ._backUrl;
      leftTexture   ._url = this ._leftUrl;
      rightTexture  ._url = this ._rightUrl;
      topTexture    ._url = this ._topUrl;
      bottomTexture ._url = this ._bottomUrl;

      frontTexture  ._textureProperties = textureProperties;
      backTexture   ._textureProperties = textureProperties;
      leftTexture   ._textureProperties = textureProperties;
      rightTexture  ._textureProperties = textureProperties;
      topTexture    ._textureProperties = textureProperties;
      bottomTexture ._textureProperties = textureProperties;

      frontTexture  .setup ();
      backTexture   .setup ();
      leftTexture   .setup ();
      rightTexture  .setup ();
      topTexture    .setup ();
      bottomTexture .setup ();

      this .set_texture__ (0, frontTexture);
      this .set_texture__ (1, backTexture);
      this .set_texture__ (2, leftTexture);
      this .set_texture__ (3, rightTexture);
      this .set_texture__ (4, topTexture);
      this .set_texture__ (5, bottomTexture);
   }
});

Object .defineProperties (Background,
{
   ... X3DNode .getStaticProperties ("Background", "EnvironmentalEffects", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",     new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frontUrl",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backUrl",      new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "leftUrl",      new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "rightUrl",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "topUrl",       new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "bottomUrl",    new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "skyAngle",     new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "skyColor",     new Fields .MFColor (new Color3 ())),
         new X3DFieldDefinition (X3DConstants .inputOutput, "groundAngle",  new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "groundColor",  new Fields .MFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",     new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default Background;

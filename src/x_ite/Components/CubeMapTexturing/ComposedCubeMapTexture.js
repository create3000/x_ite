import Fields                    from "../../Fields.js";
import X3DFieldDefinition        from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray      from "../../Base/FieldDefinitionArray.js";
import X3DNode                   from "../Core/X3DNode.js";
import X3DEnvironmentTextureNode from "./X3DEnvironmentTextureNode.js";
import X3DCast                   from "../../Base/X3DCast.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import BitSet                    from "../../../standard/Utility/BitSet.js";

function ComposedCubeMapTexture (executionContext)
{
   X3DEnvironmentTextureNode .call (this, executionContext);

   this .addType (X3DConstants .ComposedCubeMapTexture);

   this .addChildObjects (X3DConstants .outputOnly, "update", new Fields .SFTime ());

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this .addAlias ("front",  this ._frontTexture);
      this .addAlias ("back",   this ._backTexture);
      this .addAlias ("left",   this ._leftTexture);
      this .addAlias ("right",  this ._rightTexture);
      this .addAlias ("top",    this ._topTexture);
      this .addAlias ("bottom", this ._bottomTexture);
   }

   // Private properties

   this .textureNodes = [null, null, null, null, null, null];
   this .textureBits  = new BitSet ();
}

Object .assign (Object .setPrototypeOf (ComposedCubeMapTexture .prototype, X3DEnvironmentTextureNode .prototype),
{
   initialize ()
   {
      X3DEnvironmentTextureNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      this .frameBuffer = gl .createFramebuffer ();

      // Upload default data.

      this .clearTexture ();

      // Initialize.

      this ._frontTexture  .addInterest ("set_texture__", this, 0);
      this ._backTexture   .addInterest ("set_texture__", this, 1);
      this ._leftTexture   .addInterest ("set_texture__", this, 2);
      this ._rightTexture  .addInterest ("set_texture__", this, 3);
      this ._topTexture    .addInterest ("set_texture__", this, 5);
      this ._bottomTexture .addInterest ("set_texture__", this, 4);
      this ._update        .addInterest ("update",        this);

      this .set_texture__ (0, this ._frontTexture);
      this .set_texture__ (1, this ._backTexture);
      this .set_texture__ (2, this ._leftTexture);
      this .set_texture__ (3, this ._rightTexture);
      this .set_texture__ (4, this ._topTexture);
      this .set_texture__ (5, this ._bottomTexture);
   },
   set_texture__ (index, node)
   {
      let textureNode = this .textureNodes [index];

      textureNode ?.removeInterest (`set_loadState${index}__`, this);

      textureNode = this .textureNodes [index] = X3DCast (X3DConstants .X3DTexture2DNode, node);

      textureNode ?.addInterest (`set_loadState${index}__`, this, index, textureNode);

      this .set_loadState__ (index, textureNode);
   },
   set_loadState__ (index, textureNode)
   {
      this .setTextureBit (index, textureNode ?.checkLoadState ());

      this ._update .addEvent ();
   },
   setTextureBit (bit, loadState)
   {
      this .textureBits .set (bit, loadState === X3DConstants .COMPLETE_STATE);
   },
   isComplete ()
   {
      if (+this .textureBits !== 0b111111)
         return false;

      const
         textureNodes = this .textureNodes,
         size         = textureNodes [0] .getWidth ();

      for (const textureNode of textureNodes)
      {
         if (textureNode .getWidth () !== size)
            return false;

         if (textureNode .getHeight () !== size)
            return false;
      }

      return true;
   },
   update ()
   {
      if (this .isComplete ())
      {
         const
            gl           = this .getBrowser () .getContext (),
            textureNodes = this .textureNodes,
            size         = textureNodes [0] .getWidth ();

         // Prepare faces. This is necessary for Chrome and Firefox.

         if (size !== this .getSize ())
         {
            const defaultData = new Uint8Array (size * size * 4);

            gl .bindTexture (this .getTarget (), this .getTexture ());

            for (let i = 0; i < 6; ++ i)
               gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, size, size, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

            this .setSize (size);
            this .updateTextureParameters ();
         }

         // Fill with texture data.

         gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

         for (let i = 0; i < 6; ++ i)
         {
            const textureNode = textureNodes [i];

            // Copy color texture.

            gl .bindTexture (gl .TEXTURE_2D, textureNode .getTexture ());
            gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, textureNode .getTexture (), 0);
            gl .bindTexture (this .getTarget (), this .getTexture ());

            if (textureNode .getTextureType () === 1)
            {
               gl .copyTexSubImage2D (this .getTargets () [i], 0, 0, 0, 0, 0, size, size);
            }
            else
            {
               // Copy and flip Y.
               for (let y = 0; y < size; ++ y)
                  gl .copyTexSubImage2D (this .getTargets () [i], 0, 0, size - y - 1, 0, y, size, 1);
            }
         }

         this .setTransparent (textureNodes .some (textureNode => textureNode .isTransparent ()));
         this .setLinear (textureNodes .some (textureNode => textureNode .isLinear ()));
         this .setMipMaps (textureNodes .every (textureNode => textureNode .canMipMaps ()));
         this .updateTextureParameters ();
      }
      else
      {
         this .clearTexture ();
      }
   },
});

Object .defineProperties (ComposedCubeMapTexture,
{
   ... X3DNode .getStaticProperties ("ComposedCubeMapTexture", "CubeMapTexturing", 1, "texture", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "frontTexture",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "backTexture",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "leftTexture",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rightTexture",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "topTexture",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bottomTexture",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

for (let index = 0; index < 6; ++ index)
{
   ComposedCubeMapTexture .prototype [`set_loadState${index}__`] = function (index, textureNode)
   {
      this .set_loadState__ (index, textureNode);
   };
}

export default ComposedCubeMapTexture;

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture3DNode     from "./X3DTexture3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";

function ComposedTexture3D (executionContext)
{
   X3DTexture3DNode .call (this, executionContext);

   this .addType (X3DConstants .ComposedTexture3D);

   this .addChildObjects (X3DConstants .outputOnly, "update", new Fields .SFTime ());

   this .textureNodes = [ ];
}

Object .assign (Object .setPrototypeOf (ComposedTexture3D .prototype, X3DTexture3DNode .prototype),
{
   initialize ()
   {
      X3DTexture3DNode .prototype .initialize .call (this);

      this ._texture .addInterest ("set_texture__", this);
      this ._update  .addInterest ("update",        this);

      this .set_texture__ ();
   },
   set_texture__ ()
   {
      const textureNodes = this .textureNodes;

      for (const textureNode of textureNodes)
         textureNode .removeInterest ("addEvent", this ._update);

      textureNodes .length = 0;

      for (const node of this ._texture)
      {
         const textureNode = X3DCast (X3DConstants .X3DTexture2DNode, node);

         if (textureNode)
            textureNodes .push (textureNode);
      }

      for (const textureNode of textureNodes)
         textureNode .addInterest ("addEvent", this ._update);

      this ._update .addEvent ();
   },
   isComplete ()
   {
      return this .textureNodes .every (textureNode => textureNode .checkLoadState () === X3DConstants .COMPLETE_STATE);
   },
   update ()
   {
      const textureNodes = this .textureNodes

      if (textureNodes .length === 0 || !this .isComplete ())
      {
         this .clearTexture ();
      }
      else
      {
         const
            gl          = this .getBrowser () .getContext (),
            width       = textureNodes [0] .getWidth (),
            height      = textureNodes [0] .getHeight (),
            depth       = textureNodes .length,
            frameBuffer = gl .createFramebuffer ();

         gl .bindFramebuffer (gl .FRAMEBUFFER, frameBuffer);
         gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());

         if (width !== this .getWidth () || height !== this .getHeight () || depth !== this .getDepth ())
         {
            const defaultData = new Uint8Array (width * height * depth * 4);

            gl .texImage3D (gl .TEXTURE_3D, 0, gl .RGBA, width, height, depth, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         }

         for (const [i, textureNode] of this .textureNodes .entries ())
         {
            if (textureNode .getWidth () === width && textureNode .getHeight () === height)
            {
               gl .bindTexture (gl .TEXTURE_2D, textureNode .getTexture ());
               gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, textureNode .getTexture (), 0);

               if (textureNode .getTextureType () === 1)
               {
                  // Copy and flip Y.
                  for (let y = 0; y < height; ++ y)
                     gl .copyTexSubImage3D (gl .TEXTURE_3D, 0, 0, height - y - 1, i, 0, y, width, 1);
               }
               else
               {
                  gl .copyTexSubImage3D (gl .TEXTURE_3D, 0, 0, 0, i, 0, 0, width, height);
               }
            }
            else
            {
               console .warn ("ComposedTexture3D: all textures must have same size.");
            }
         }

         gl .deleteFramebuffer (frameBuffer);

         this .setWidth (width);
         this .setHeight (height);
         this .setDepth (depth);
         this .setTransparent (textureNodes .some (textureNode => textureNode .isTransparent ()));
         this .setLinear (textureNodes .some (textureNode => textureNode .isLinear ()));
         this .setMipMaps (textureNodes .every (textureNode => textureNode .canMipMaps ()));
         this .updateTextureParameters ();
      }
   },
});

Object .defineProperties (ComposedTexture3D,
{
   ... X3DNode .getStaticProperties ("ComposedTexture3D", "Texturing3D", 1, "texture", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texture",           new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ComposedTexture3D;

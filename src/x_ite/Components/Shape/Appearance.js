/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DAppearanceNode    from "./X3DAppearanceNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import AlphaMode            from "../../Browser/Shape/AlphaMode.js";
import BitSet               from "../../../standard/Utility/BitSet.js";

function Appearance (executionContext)
{
   X3DAppearanceNode .call (this, executionContext);

   this .addType (X3DConstants .Appearance);

   this .stylePropertiesNode     = [ ];
   this .textureTransformMapping = new Map ();
   this .textureBits             = new BitSet ();
   this .shaderNodes             = [ ];
   this .renderModeNodes         = [ ];
}

Object .assign (Object .setPrototypeOf (Appearance .prototype, X3DAppearanceNode .prototype),
{
   initialize ()
   {
      X3DAppearanceNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      browser .getRenderingProperties () ._ContentScale .addInterest ("set_contentScale__", this);

      this ._alphaMode        .addInterest ("set_alphaMode__",        this);
      this ._alphaCutoff      .addInterest ("set_alphaCutoff__",      this);
      this ._pointProperties  .addInterest ("set_pointProperties__",  this);
      this ._lineProperties   .addInterest ("set_lineProperties__",   this);
      this ._fillProperties   .addInterest ("set_fillProperties__",   this);
      this ._material         .addInterest ("set_material__",         this);
      this ._backMaterial     .addInterest ("set_backMaterial__",     this);
      this ._texture          .addInterest ("set_texture__",          this);
      this ._textureTransform .addInterest ("set_textureTransform__", this);
      this ._shaders          .addInterest ("set_shaders__",          this);
      this ._blendMode        .addInterest ("set_renderModes__",      this);
      this ._depthMode        .addInterest ("set_renderModes__",      this);

      this ._alphaMode      .addInterest ("set_transparent__", this);
      this ._fillProperties .addInterest ("set_transparent__", this);
      this ._material       .addInterest ("set_transparent__", this);
      this ._texture        .addInterest ("set_transparent__", this);
      this ._blendMode      .addInterest ("set_transparent__", this);

      this .set_alphaMode__ ();
      this .set_pointProperties__ ();
      this .set_lineProperties__ ();
      this .set_fillProperties__ ();
      this .set_material__ ();
      this .set_backMaterial__ ();
      this .set_texture__ ();
      this .set_textureTransform__ ();
      this .set_shaders__ ();
      this .set_renderModes__ ();
      this .set_transparent__ ();
   },
   getAlphaMode ()
   {
      return this .alphaMode;
   },
   getAlphaCutoff ()
   {
      return this .alphaCutoff;
   },
   getStyleProperties (geometryType)
   {
      return this .stylePropertiesNode [geometryType];
   },
   getPointProperties ()
   {
      return this .stylePropertiesNode [0];
   },
   getLineProperties ()
   {
      return this .stylePropertiesNode [1];
   },
   getFillProperties ()
   {
      return this .stylePropertiesNode [2];
   },
   getMaterial ()
   {
      return this .materialNode;
   },
   getBackMaterial ()
   {
      return this .backMaterialNode;
   },
   getTexture ()
   {
      return this .textureNode;
   },
   getTextureBits ()
   {
      return this .textureBits;
   },
   updateTextureBits ()
   {
      this .textureBits .clear ();
      this .textureNode .updateTextureBits (this .textureBits);
   },
   getTextureTransform ()
   {
      return this .textureTransformNode;
   },
   getTextureTransformMapping ()
   {
      return this .textureTransformMapping;
   },
   getShader (geometryContext, renderContext)
   {
      return this .materialNode .getShader (geometryContext, renderContext);
   },
   getBackShader (geometryContext, renderContext)
   {
      return this .backMaterialNode .getShader (geometryContext, renderContext);
   },
   getRenderModes ()
   {
      return this .renderModeNodes;
   },
   getDepthMode ()
   {
      return this .depthModeNode;
   },
   set_contentScale__ ()
   {
      this .set_pointProperties__ ();
      this .set_applied__ ();
   },
   set_alphaMode__ ()
   {
      this .alphaMode = $.enum (AlphaMode, this ._alphaMode .getValue (), AlphaMode .AUTO);

      this .set_alphaCutoff__ ();
   },
   set_alphaCutoff__ ()
   {
      this .alphaCutoff = this .alphaMode === AlphaMode .MASK ? this ._alphaCutoff .getValue () : 0;
   },
   set_pointProperties__ ()
   {
      this .stylePropertiesNode [0] = X3DCast (X3DConstants .PointProperties, this ._pointProperties);

      if (!this .stylePropertiesNode [0])
      {
         const browser = this .getBrowser ();

         if (browser .getRenderingProperty ("ContentScale") !== 1)
            this .stylePropertiesNode [0] = browser .getDefaultPointProperties ();
      }
   },
   set_lineProperties__ ()
   {
      if (this .linePropertiesNode)
         this .linePropertiesNode ._applied .removeInterest ("set_applied__", this);

      this .linePropertiesNode = X3DCast (X3DConstants .LineProperties, this ._lineProperties);

      if (this .linePropertiesNode)
         this .linePropertiesNode ._applied .addInterest ("set_applied__", this);

      this .set_applied__ ();
   },
   set_applied__ ()
   {
      if (this .linePropertiesNode && this .linePropertiesNode ._applied .getValue ())
      {
         this .stylePropertiesNode [1] = this .linePropertiesNode;
      }
      else
      {
         const browser = this .getBrowser ();

         if (browser .getRenderingProperty ("ContentScale") !== 1)
            this .stylePropertiesNode [1] = browser .getDefaultLineProperties ();
         else
            this .stylePropertiesNode [1] = null;
      }
   },
   set_fillProperties__ ()
   {
      if (this .stylePropertiesNode [2])
         this .stylePropertiesNode [2] ._transparent .removeInterest ("set_transparent__", this);

      this .stylePropertiesNode [2] = X3DCast (X3DConstants .FillProperties, this ._fillProperties);

      if (this .stylePropertiesNode [2])
         this .stylePropertiesNode [2] ._transparent .addInterest ("set_transparent__", this);

      this .stylePropertiesNode [3] = this .stylePropertiesNode [2];
   },
   set_material__ ()
   {
      if (this .materialNode)
      {
         this .materialNode ._transparent  .removeInterest ("set_transparent__",  this);
         this .materialNode ._transmission .removeInterest ("set_transmission__", this);
      }

      this .materialNode = X3DCast (X3DConstants .X3DMaterialNode, this ._material);

      if (!this .materialNode)
         this .materialNode = this .getBrowser () .getDefaultMaterial ();

      if (this .materialNode)
      {
         this .materialNode ._transparent  .addInterest ("set_transparent__",  this);
         this .materialNode ._transmission .addInterest ("set_transmission__", this);
      }

      // Depreciated TwoSidedMaterial handling.

      if (X3DCast (X3DConstants .TwoSidedMaterial, this .materialNode))
         this .set_backMaterial__ ();
   },
   set_backMaterial__ ()
   {
      if (this .backMaterialNode)
         this .backMaterialNode ._transparent .removeInterest ("set_transparent__", this);

      this .backMaterialNode = X3DCast (X3DConstants .X3DOneSidedMaterialNode, this ._backMaterial);

      if (this .backMaterialNode)
         this .backMaterialNode ._transparent .addInterest ("set_transparent__", this);

      // Depreciated TwoSidedMaterial handling.

      if (!this .backMaterialNode && X3DCast (X3DConstants .TwoSidedMaterial, this .materialNode))
         this .backMaterialNode = this .materialNode;
   },
   set_texture__ ()
   {
      if (this .textureNode)
      {
         this .textureNode .removeInterest ("updateTextureBits", this);
         this .textureNode ._transparent .removeInterest ("set_transparent__", this);
      }

      this .textureNode = X3DCast (X3DConstants .X3DTextureNode, this ._texture);

      if (this .textureNode)
      {
         this .textureNode .addInterest ("updateTextureBits", this);
         this .textureNode ._transparent .addInterest ("set_transparent__", this);

         this .updateTextureBits ();
      }
      else
      {
         this .textureBits .clear ();
      }
   },
   set_textureTransform__ ()
   {
      if (this .textureTransformNode)
         this .textureTransformNode .removeInterest ("updateTextureTransformMapping", this);

      this .textureTransformNode = X3DCast (X3DConstants .X3DTextureTransformNode, this ._textureTransform);

      if (!this .textureTransformNode)
         this .textureTransformNode = this .getBrowser () .getDefaultTextureTransform ();

      this .textureTransformNode .addInterest ("updateTextureTransformMapping", this);

      this .updateTextureTransformMapping ();
   },
   updateTextureTransformMapping ()
   {
      this .textureTransformMapping .clear ();

      this .textureTransformNode .getTextureTransformMapping (this .textureTransformMapping);
   },
   set_shaders__ ()
   {
      const shaderNodes = this .shaderNodes;

      for (const shaderNode of shaderNodes)
         shaderNode ._isValid .removeInterest ("set_shader__", this);

      shaderNodes .length = 0;

      for (const node of this ._shaders)
      {
         const shaderNode = X3DCast (X3DConstants .X3DShaderNode, node);

         if (shaderNode)
            shaderNodes .push (shaderNode);
      }

      for (const shaderNode of shaderNodes)
         shaderNode ._isValid .addInterest ("set_shader__", this);

      this .set_shader__ ();
   },
   set_shader__: (() =>
   {
      function getShader ()
      {
         return this .shaderNode;
      }

      return function ()
      {
         const shaderNodes = this .shaderNodes;

         if (this .shaderNode)
            this .shaderNode .deselect ();

         this .shaderNode = null;

         for (const shaderNode of shaderNodes)
         {
            if (shaderNode ._isValid .getValue ())
            {
               this .shaderNode = shaderNode;
               break;
            }
         }

         if (this .shaderNode)
         {
            this .shaderNode .select ();

            this .getShader     = getShader;
            this .getBackShader = getShader;
         }
         else
         {
            delete this .getShader;
            delete this .getBackShader;
         }
      };
   })(),
   set_renderModes__ ()
   {
      this .renderModeNodes .length = 0;

      this .blendModeNode = X3DCast (X3DConstants .BlendMode, this ._blendMode),
      this .depthModeNode = X3DCast (X3DConstants .DepthMode, this ._depthMode);

      if (this .blendModeNode) this .renderModeNodes .push (this .blendModeNode);
      if (this .depthModeNode) this .renderModeNodes .push (this .depthModeNode);
   },
   set_transparent__ ()
   {
      this .setTransparent (this .stylePropertiesNode [3] ?.isTransparent () ||
                            this .materialNode ?.isTransparent () ||
                            this .backMaterialNode ?.isTransparent () ||
                            this .textureNode ?.isTransparent () ||
                            this .blendModeNode);
   },
   set_transmission__ ()
   {
      this .setTransmission (this .materialNode ?.isTransmission () ||
                             this .backMaterialNode ?.isTransmission ());

   },
   traverse (type, renderObject)
   {
      this .textureNode ?.traverse (type, renderObject);
   },
});

Object .defineProperties (Appearance,
{
   typeName:
   {
      value: "Appearance",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Shape", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "appearance",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "2.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "alphaMode",          new Fields .SFString ("AUTO")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "alphaCutoff",        new Fields .SFFloat (0.5)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "acousticProperties", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointProperties",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "lineProperties",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fillProperties",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "material",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backMaterial",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "texture",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "textureTransform",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shaders",            new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "blendMode",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depthMode",          new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default Appearance;

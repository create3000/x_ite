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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DAppearanceChildNode from "../Shape/X3DAppearanceChildNode.js";
import TraverseType           from "../../Rendering/TraverseType.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function BlendMode (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .BlendMode);

   this .factorTypes   = new Map ();
   this .equationTypes = new Map ();
}

BlendMode .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
{
   constructor: BlendMode,
   initialize: function ()
   {
      X3DAppearanceChildNode .prototype .initialize .call (this);

      const
         gl  = this .getBrowser () .getContext (),
         ext = gl .getExtension ('EXT_blend_minmax');

      this .factorTypes .set ("ZERO",                     gl .ZERO);
      this .factorTypes .set ("ONE",                      gl .ONE);
      this .factorTypes .set ("SRC_COLOR",                gl .SRC_COLOR);
      this .factorTypes .set ("ONE_MINUS_SRC_COLOR",      gl .ONE_MINUS_SRC_COLOR);
      this .factorTypes .set ("DST_COLOR",                gl .DST_COLOR);
      this .factorTypes .set ("ONE_MINUS_DST_COLOR",      gl .ONE_MINUS_DST_COLOR);
      this .factorTypes .set ("SRC_ALPHA",                gl .SRC_ALPHA);
      this .factorTypes .set ("ONE_MINUS_SRC_ALPHA",      gl .ONE_MINUS_SRC_ALPHA);
      this .factorTypes .set ("DST_ALPHA",                gl .DST_ALPHA);
      this .factorTypes .set ("ONE_MINUS_DST_ALPHA",      gl .ONE_MINUS_DST_ALPHA);
      this .factorTypes .set ("SRC_ALPHA_SATURATE",       gl .SRC_ALPHA_SATURATE);
      this .factorTypes .set ("CONSTANT_COLOR",           gl .CONSTANT_COLOR);
      this .factorTypes .set ("ONE_MINUS_CONSTANT_COLOR", gl .ONE_MINUS_CONSTANT_COLOR);
      this .factorTypes .set ("CONSTANT_ALPHA",           gl .CONSTANT_ALPHA);
      this .factorTypes .set ("ONE_MINUS_CONSTANT_ALPHA", gl .ONE_MINUS_CONSTANT_ALPHA);

      this .equationTypes .set ("FUNC_ADD",              gl .FUNC_ADD);
      this .equationTypes .set ("FUNC_SUBTRACT",         gl .FUNC_SUBTRACT);
      this .equationTypes .set ("FUNC_REVERSE_SUBTRACT", gl .FUNC_REVERSE_SUBTRACT);
      this .equationTypes .set ("MIN",                   gl .MIN || (ext && ext .MIN_EXT));
      this .equationTypes .set ("MAX",                   gl .MAX || (ext && ext .MAX_EXT));

      this ._sourceColorFactor      .addInterest ("set_sourceColorFactor__",      this);
      this ._sourceAlphaFactor      .addInterest ("set_sourceAlphaFactor__",      this);
      this ._destinationColorFactor .addInterest ("set_destinationColorFactor__", this);
      this ._destinationAlphaFactor .addInterest ("set_destinationAlphaFactor__", this);
      this ._colorEquation          .addInterest ("set_colorEquation__",          this);
      this ._alphaEquation          .addInterest ("set_alphaEquation__",          this);

      this .set_sourceColorFactor__ ();
      this .set_sourceAlphaFactor__ ();
      this .set_destinationColorFactor__ ();
      this .set_destinationAlphaFactor__ ();
      this .set_colorEquation__ ();
      this .set_alphaEquation__ ();
   },
   set_sourceColorFactor__: function ()
   {
      this .sourceColorFactorType = this .factorTypes .get (this ._sourceColorFactor .getValue ());

      if (this .sourceColorFactorType === undefined)
         this .sourceColorFactorType = this .factorTypes .get ("SRC_ALPHA");
   },
   set_sourceAlphaFactor__: function ()
   {
      this .sourceAlphaFactorType = this .factorTypes .get (this ._sourceAlphaFactor .getValue ());

      if (this .sourceAlphaFactorType === undefined)
         this .sourceAlphaFactorType = this .factorTypes .get ("ONE");
   },
   set_destinationColorFactor__: function ()
   {
      this .destinationColorFactorType = this .factorTypes .get (this ._destinationColorFactor .getValue ());

      if (this .destinationColorFactorType === undefined)
         this .destinationColorFactorType = this .factorTypes .get ("ONE_MINUS_SRC_ALPHA");
   },
   set_destinationAlphaFactor__: function ()
   {
      this .destinationAlphaFactorType = this .factorTypes .get (this ._destinationAlphaFactor .getValue ());

      if (this .destinationAlphaFactorType === undefined)
         this .destinationAlphaFactorType = this .factorTypes .get ("ONE_MINUS_SRC_ALPHA");
   },
   set_colorEquation__: function ()
   {
      this .colorEquationType = this .equationTypes .get (this ._colorEquation .getValue ());

      if (this .colorEquationType === undefined)
         this .colorEquationType = this .equationTypes .get ("FUNC_ADD");
   },
   set_alphaEquation__: function ()
   {
      this .alphaEquationType = this .equationTypes .get (this ._alphaEquation .getValue ());

      if (this .alphaEquationType === undefined)
         this .alphaEquationType = this .equationTypes .get ("FUNC_ADD");
   },
   enable: function (gl)
   {
      const color = this ._blendColor .getValue ();

      gl .blendColor (color .r, color .g, color .b, color .a);
      gl .blendFuncSeparate (this .sourceColorFactorType, this .destinationColorFactorType, this .sourceAlphaFactorType, this .destinationAlphaFactorType);
      gl .blendEquationSeparate (this .colorEquationType, this .alphaEquationType);
   },
   disable: function (gl)
   {
      gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      gl .blendEquationSeparate (gl .FUNC_ADD, gl .FUNC_ADD);
   },
});

Object .defineProperties (BlendMode,
{
   typeName:
   {
      value: "BlendMode",
      enumerate: true,
   },
   componentName:
   {
      value: "X_ITE",
      enumerate: true,
   },
   containerField:
   {
      value: "blendMode",
      enumerate: true,
   },
   specificationRange:
   {
      value: Object .freeze (["3.3", "Infinity"]),
      enumerate: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "blendColor",              new Fields .SFColorRGBA ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sourceColorFactor",       new Fields .SFString ("SRC_ALPHA")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sourceAlphaFactor",       new Fields .SFString ("ONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "destinationColorFactor",  new Fields .SFString ("ONE_MINUS_SRC_ALPHA")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "destinationAlphaFactor",  new Fields .SFString ("ONE_MINUS_SRC_ALPHA")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "colorEquation",           new Fields .SFString ("FUNC_ADD")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "alphaEquation",           new Fields .SFString ("FUNC_ADD")),
      ]),
      enumerate: true,
   },
});

export default BlendMode;

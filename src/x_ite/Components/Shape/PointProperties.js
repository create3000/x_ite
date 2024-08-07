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
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "./X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Algorithm              from "../../../standard/Math/Algorithm.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";

function PointProperties (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .PointProperties);

   this .attenuation = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (PointProperties .prototype, X3DAppearanceChildNode .prototype),
{
   initialize ()
   {
      X3DAppearanceChildNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .pointSizeRange = gl .getParameter (gl .ALIASED_POINT_SIZE_RANGE);

      browser .getRenderingProperties () ._ContentScale .addInterest ("set_contentScale__", this);

      this ._pointSizeScaleFactor .addInterest ("set_pointSizeScaleFactor__", this);
      this ._pointSizeMinValue    .addInterest ("set_pointSizeMinValue__",    this);
      this ._pointSizeMaxValue    .addInterest ("set_pointSizeMaxValue__",    this);
      this ._attenuation          .addInterest ("set_attenuation__",          this);

      this .set_pointSizeScaleFactor__ ();
      this .set_pointSizeMinValue__ ();
      this .set_pointSizeMaxValue__ ();
      this .set_attenuation__ ();
   },
   getStyleKey ()
   {
      return 1;
   },
   set_contentScale__ ()
   {
      this .set_pointSizeScaleFactor__ ();
      this .set_pointSizeMinValue__ ();
      this .set_pointSizeMaxValue__ ();
   },
   set_pointSizeScaleFactor__ ()
   {
      const contentScale = this .getBrowser () .getRenderingProperty ("ContentScale");

      this .pointSizeScaleFactor = Math .max (this ._pointSizeScaleFactor .getValue (), 0) * contentScale;
   },
   set_pointSizeMinValue__ ()
   {
      const contentScale = this .getBrowser () .getRenderingProperty ("ContentScale");

      this .pointSizeMinValue = Algorithm .clamp (this ._pointSizeMinValue .getValue (), 0, this .pointSizeRange [1]) * contentScale;
   },
   set_pointSizeMaxValue__ ()
   {
      const contentScale = this .getBrowser () .getRenderingProperty ("ContentScale");

      this .pointSizeMaxValue = Algorithm .clamp (this ._pointSizeMaxValue .getValue (), 0, this .pointSizeRange [1]) * contentScale;
   },
   set_attenuation__ ()
   {
      this .attenuation [0] = Math .max (0, this ._attenuation [0]);
      this .attenuation [1] = Math .max (0, this ._attenuation [1]);
      this .attenuation [2] = Math .max (0, this ._attenuation [2]);
   },
   setShaderUniforms (gl, shaderObject)
   {
      gl .uniform1f  (shaderObject .x3d_PointPropertiesPointSizeScaleFactor, this .pointSizeScaleFactor);
      gl .uniform1f  (shaderObject .x3d_PointPropertiesPointSizeMinValue,    this .pointSizeMinValue);
      gl .uniform1f  (shaderObject .x3d_PointPropertiesPointSizeMaxValue,    this .pointSizeMaxValue);
      gl .uniform3fv (shaderObject .x3d_PointPropertiesAttenuation,          this .attenuation);
   },
});

Object .defineProperties (PointProperties, X3DNode .staticProperties ("PointProperties", "Shape", 5, "pointProperties", "4.0", "Infinity"));

Object .defineProperties (PointProperties,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeScaleFactor", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeMinValue",    new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeMaxValue",    new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "attenuation",          new Fields .SFVec3f (1, 0, 0)),
      ]),
      enumerable: true,
   },
});

export default PointProperties;

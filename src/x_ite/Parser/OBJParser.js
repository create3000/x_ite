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

import X3DParser    from "./X3DParser.js";
import X3DOptimizer from "./X3DOptimizer.js";
import Vector2      from "../../standard/Math/Numbers/Vector2.js";
import Vector3      from "../../standard/Math/Numbers/Vector3.js";
import Quaternion   from "../../standard/Math/Numbers/Quaternion.js";
import Rotation4    from "../../standard/Math/Numbers/Rotation4.js";
import Matrix3      from "../../standard/Math/Numbers/Matrix3.js";
import Matrix4      from "../../standard/Math/Numbers/Matrix4.js";
import Color3       from "../../standard/Math/Numbers/Color3.js";
import Color4       from "../../standard/Math/Numbers/Color4.js";
import Algorithm    from "../../standard/Math/Algorithm.js";
import DEBUG        from "../DEBUG.js"

// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html
// https://github.com/KhronosGroup/glTF-Sample-Models

const
   STEP_TIME          = 1e-4, // in seconds
   SAMPLES_PER_SECOND = 30;   // in 1/s

function GLTF2Parser (scene)
{
   X3DParser    .call (this, scene);
   X3DOptimizer .call (this),

   this .buffers               = [ ];
   this .bufferViews           = [ ];
   this .accessors             = [ ];
   this .samplers              = [ ];
   this .materials             = [ ];
   this .textureTransformNodes = new Map ();
   this .cameras               = [ ];
   this .viewpoints            = [ ];
   this .nodes                 = [ ];
   this .animations            = 0;
}

GLTF2Parser .prototype = Object .assign (Object .create (X3DParser .prototype),
   X3DOptimizer .prototype,
{
   constructor: GLTF2Parser,
   getEncoding: function ()
   {
      return "STRING";
   },
   isValid: function ()
   {
      return !! this .input .match (/^(?:\s|#.*?[\r\n])*(?:mtllib)/s);
   },
   getInput: function ()
   {
      return this .input;
   },
   setInput: function (string)
   {
      this .input = string;
   },
   parseIntoScene: function (success, error)
   {
      success (this .getScene ());
   },
});

export default GLTF2Parser;

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

import Types from "../../../assets/shaders/Types.glsl.js";

const ShaderSource =
{
   getSource (gl, browser, source, options)
   {
      const
         COMMENTS     = "\\s+|/\\*[\\s\\S]*?\\*/|//.*?\\n",
         LINE         = "#line\\s+.*?\\n",
         IF           = "#if\\s+.*?\\n",
         ELIF         = "#elif\\s+.*?\\n",
         IFDEF        = "#ifdef\\s+.*?\\n",
         IFNDEF       = "#ifndef\\s+.*?\\n",
         ELSE         = "#else.*?\\n",
         ENDIF        = "#endif.*?\\n",
         DEFINE       = "#define\\s+(?:[^\\n\\\\]|\\\\[^\\r\\n]|\\\\\\r?\\n)*\\n",
         UNDEF        = "#undef\\s+.*?\\n",
         PRAGMA       = "#pragma\\s+.*?\\n",
         PREPROCESSOR =  `${LINE}|${IF}|${ELIF}|${IFDEF}|${IFNDEF}|${ELSE}|${ENDIF}|${DEFINE}|${UNDEF}|${PRAGMA}`,
         VERSION      = "#version\\s+.*?\\n",
         EXTENSION    = "#extension\\s+.*?\\n";

      const
         GLSL  = new RegExp (`^((?:${COMMENTS}|${PREPROCESSOR})*(?:${VERSION})?(?:${COMMENTS}|${PREPROCESSOR}|${EXTENSION})*)`, "s"),
         match = source .match (GLSL);

      // const
      //    COMMENTS = "\\s+|/\\*.*?\\*/|//.*?\\n",
      //    VERSION  = "#version\\s+.*?\\n",
      //    ANY      = ".*";

      // const
      //    GLSL  = new RegExp ("^((?:" + COMMENTS + ")?(?:" + VERSION + ")?)(" + ANY + ")$", "s"),
      //    match = source .match (GLSL);

      if (!match)
         return source;

      // Constants

      const defines = /* glsl */ `
      ${options .map (option => `#define ${option}`) .join ("\n")}

      #define x3d_MaxLights ${browser .getMaxLights ()}
      `;

      // Adjust precision of struct types;

      const
         matchFloat     = source .match (/\s*precision\s+(lowp|mediump|highp)\s+float\s*;/),
         matchInt       = source .match (/\s*precision\s+(lowp|mediump|highp)\s+int\s*;/),
         precisionFloat = matchFloat ?.[1] ?? "mediump",
         precisionInt   = matchInt   ?.[1] ?? "mediump";

      const types = Types ()
         .replace (/mediump\s+(float|vec2|vec3|mat3|mat4)/g, `${precisionFloat} \$1`)
         .replace (/mediump\s+(int)/g,                       `${precisionInt} \$1`);

      const lines = (match [1] .match (/\n/g) ?.length ?? 0) + 1;

      return `${match [1]}${defines}${types}#line ${lines + 1} -1\n${source .substring (match [0] .length)}`;
   },
};

function depreciatedWarning (source, depreciated, current)
{
   if (source .indexOf (depreciated) === -1)
      return;

   console .warn ("Use of '" + depreciated + "' is depreciated, use '" + current + "' instead. See https://create3000.github.io/x_ite/custom-shaders.");
}

export default ShaderSource;

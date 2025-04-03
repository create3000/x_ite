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

import Arc2DOptions       from "./Arc2DOptions.js";
import ArcClose2DOptions  from "./ArcClose2DOptions.js";
import Circle2DOptions    from "./Circle2DOptions.js";
import Disk2DOptions      from "./Disk2DOptions.js";
import Rectangle2DOptions from "./Rectangle2DOptions.js";
import PrimitiveQuality   from "../Core/PrimitiveQuality.js";

const
   _arc2DOptions       = Symbol (),
   _arcClose2DOptions  = Symbol (),
   _circle2DOptions    = Symbol (),
   _disk2DOptions      = Symbol (),
   _rectangle2DOptions = Symbol ();

function X3DGeometry2DContext () { }

Object .assign (X3DGeometry2DContext .prototype,
{
   initialize ()
   {
      this .setPrimitiveQuality2D (this .getBrowserOptions () .getPrimitiveQuality ());
   },
   getArc2DOptions ()
   {
      return getOptionNode .call (this, _arc2DOptions, Arc2DOptions);
   },
   getArcClose2DOptions ()
   {
      return getOptionNode .call (this, _arcClose2DOptions, ArcClose2DOptions);
   },
   getCircle2DOptions ()
   {
      return getOptionNode .call (this, _circle2DOptions, Circle2DOptions);
   },
   getDisk2DOptions ()
   {
      return getOptionNode .call (this, _disk2DOptions, Disk2DOptions);
   },
   getRectangle2DOptions ()
   {
      return getOptionNode .call (this, _rectangle2DOptions, Rectangle2DOptions);
   },
   setPrimitiveQuality2D (primitiveQuality)
   {
      const
         arc      = this .getArc2DOptions (),
         arcClose = this .getArcClose2DOptions (),
         circle   = this .getCircle2DOptions (),
         disk     = this .getDisk2DOptions ();

      switch (primitiveQuality)
      {
         case PrimitiveQuality .LOW:
         {
            arc      ._dimension = 20;
            arcClose ._dimension = 20;
            circle   ._dimension = 20;
            disk     ._dimension = 20;
            break;
         }
         case PrimitiveQuality .MEDIUM:
         {
            arc      ._dimension = 40;
            arcClose ._dimension = 40;
            circle   ._dimension = 40;
            disk     ._dimension = 40;
            break;
         }
         case PrimitiveQuality .HIGH:
         {
            arc      ._dimension = 80;
            arcClose ._dimension = 80;
            circle   ._dimension = 80;
            disk     ._dimension = 80;
            break;
         }
      }
   },
});

function getOptionNode (key, OptionNode)
{
   return this [key] ??= (() =>
   {
      const optionNode = new OptionNode (this .getPrivateScene ());

      optionNode .setup ();

      return optionNode;
   })();
}

export default X3DGeometry2DContext;

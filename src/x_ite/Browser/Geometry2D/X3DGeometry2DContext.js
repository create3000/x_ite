/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Browser/Geometry2D/Arc2DOptions",
   "x_ite/Browser/Geometry2D/ArcClose2DOptions",
   "x_ite/Browser/Geometry2D/Circle2DOptions",
   "x_ite/Browser/Geometry2D/Disk2DOptions",
   "x_ite/Browser/Geometry2D/Rectangle2DOptions",
   "x_ite/Browser/Core/PrimitiveQuality",
],
function (Arc2DOptions,
          ArcClose2DOptions,
          Circle2DOptions,
          Disk2DOptions,
          Rectangle2DOptions,
          PrimitiveQuality)
{
"use strict";

   const
      _arc2DOptions       = Symbol (),
      _arcClose2DOptions  = Symbol (),
      _circle2DOptions    = Symbol (),
      _disk2DOptions      = Symbol (),
      _rectangle2DOptions = Symbol ();

   function getOptionNode (fun, name, Type)
   {
      this [name] = new Type (this .getPrivateScene ());
      this [name] .setup ();

      this [fun] = function () { return this [name]; };

      Object .defineProperty (this, fun, { enumerable: false });

      return this [name];
   }

   function X3DGeometry2DContext () { }

   X3DGeometry2DContext .prototype =
   {
      initialize: function ()
      {
         this .setGeometry2DPrimitiveQuality (this .getBrowserOptions () .getPrimitiveQuality ());
      },
      getArc2DOptions: function ()
      {
         return getOptionNode .call (this, "getArc2DOptions", _arc2DOptions, Arc2DOptions);
      },
      getArcClose2DOptions: function ()
      {
         return getOptionNode .call (this, "getArcClose2DOptions", _arcClose2DOptions, ArcClose2DOptions);
      },
      getCircle2DOptions: function ()
      {
         return getOptionNode .call (this, "getCircle2DOptions", _circle2DOptions, Circle2DOptions);
      },
      getDisk2DOptions: function ()
      {
         return getOptionNode .call (this, "getDisk2DOptions", _disk2DOptions, Disk2DOptions);
      },
      getRectangle2DOptions: function ()
      {
         return getOptionNode .call (this, "getRectangle2DOptions", _rectangle2DOptions, Rectangle2DOptions);
      },
      setGeometry2DPrimitiveQuality: function (primitiveQuality)
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
               arc      .dimension_ = 20;
               arcClose .dimension_ = 20;
               circle   .dimension_ = 20;
               disk     .dimension_ = 20;
               break;
            }
            case PrimitiveQuality .MEDIUM:
            {
               arc      .dimension_ = 40;
               arcClose .dimension_ = 40;
               circle   .dimension_ = 40;
               disk     .dimension_ = 40;
               break;
            }
            case PrimitiveQuality .HIGH:
            {
               arc      .dimension_ = 80;
               arcClose .dimension_ = 80;
               circle   .dimension_ = 80;
               disk     .dimension_ = 80;
               break;
            }
         }
      },
   };

   return X3DGeometry2DContext;
});

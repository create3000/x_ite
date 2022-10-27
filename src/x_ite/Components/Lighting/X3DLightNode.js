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
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Algorithm",
],
function (X3DChildNode,
          X3DConstants,
          Matrix4,
          Algorithm)
{
"use strict";

   function X3DLightNode (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .X3DLightNode);
   }

   X3DLightNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: X3DLightNode,
      initialize: function ()
      {
         X3DChildNode .prototype .initialize .call (this);

         this ._on        .addInterest ("set_on__", this);
         this ._intensity .addInterest ("set_on__", this);

         this .set_on__ ();
      },
      set_on__: function ()
      {
         if (this ._on .getValue () && this .getIntensity () > 0)
         {
            delete this .push;
            delete this .pop;
         }
         else
         {
            this .push = Function .prototype;
            this .pop  = Function .prototype;
         }
      },
      getGlobal: function ()
      {
         return this ._global .getValue ();
      },
      getColor: function ()
      {
         return this ._color .getValue ();
      },
      getIntensity: function ()
      {
         return Math .max (this ._intensity .getValue (), 0);
      },
      getAmbientIntensity: function ()
      {
         return Algorithm .clamp (this ._ambientIntensity .getValue (), 0, 1);
      },
      getDirection: function ()
      {
         return this ._direction .getValue ();
      },
      getShadows: function ()
      {
         return this ._shadows .getValue ();
      },
      getShadowColor: function ()
      {
         return this ._shadowColor .getValue ();
      },
      getShadowIntensity: function ()
      {
         return this .getShadows () ? Algorithm .clamp (this ._shadowIntensity .getValue (), 0, 1) : 0;
      },
      getShadowBias: function ()
      {
         return Algorithm .clamp (this ._shadowBias .getValue (), 0, 1);
      },
      getShadowMapSize: function ()
      {
         return Math .min (this ._shadowMapSize .getValue (), this .getBrowser () .getMaxTextureSize ());
      },
      getBiasMatrix: (function ()
      {
         // Transforms normalized coords from range (-1, 1) to (0, 1).
         const biasMatrix = new Matrix4 (0.5, 0.0, 0.0, 0.0,
                                         0.0, 0.5, 0.0, 0.0,
                                         0.0, 0.0, 0.5, 0.0,
                                         0.5, 0.5, 0.5, 1.0);

         return function ()
         {
            return biasMatrix;
         };
      })(),
      push: function (renderObject, group)
      {
         if (renderObject .isIndependent ())
         {
            const lightContainer = this .getLights () .pop ();

            if (this ._global .getValue ())
            {
               lightContainer .set (this .getBrowser (),
                                    this,
                                    renderObject .getLayer () .getGroup (),
                                    renderObject .getModelViewMatrix () .get ());

               renderObject .getGlobalObjects () .push (lightContainer);
               renderObject .getLights ()        .push (lightContainer);
            }
            else
            {
               lightContainer .set (this .getBrowser (),
                                    this,
                                    group,
                                    renderObject .getModelViewMatrix () .get ());

               renderObject .getLocalObjects () .push (lightContainer);
               renderObject .getLights ()       .push (lightContainer);
            }
         }
         else
         {
            const lightContainer = renderObject .getLightContainer ();

            if (this ._global .getValue ())
            {
               lightContainer .getModelViewMatrix () .pushMatrix (renderObject .getModelViewMatrix () .get ());

               renderObject .getGlobalObjects () .push (lightContainer);
               renderObject .getLights ()        .push (lightContainer);
            }
            else
            {
               lightContainer .getModelViewMatrix () .pushMatrix (renderObject .getModelViewMatrix () .get ());

               renderObject .getLocalObjects () .push (lightContainer);
               renderObject .getLights ()       .push (lightContainer);
            }
         }

         renderObject .pushShadow (!! this .getShadowIntensity ());
      },
      pop: function (renderObject)
      {
         if (this ._global .getValue ())
            return;

         if (renderObject .isIndependent ())
            this .getBrowser () .getLocalObjects () .push (renderObject .getLocalObjects () .pop ());
         else
            renderObject .getLocalObjects () .pop ();

         renderObject .popShadow ();
      },
   });

   return X3DLightNode;
});

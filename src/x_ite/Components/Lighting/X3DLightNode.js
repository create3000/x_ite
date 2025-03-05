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

import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";

function X3DLightNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DLightNode);

   this .enabled = true;
}

Object .assign (Object .setPrototypeOf (X3DLightNode .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._global    .addInterest ("set_global__", this);
      this ._on        .addInterest ("set_on__",     this);
      this ._intensity .addInterest ("set_on__",     this);

      this .set_global__ ();
      this .set_on__ ();
   },
   set_global__ ()
   {
      this .setVisibleObject (this ._global .getValue ());
   },
   set_on__ ()
   {
      if (this ._on .getValue () && this .getIntensity () > 0 && this .enabled)
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
   getLightKey ()
   {
      return 1; // [ClipPlane 0, X3DLightNode 1, EnvironmentLight 2, X3DTextureProjectorNode 3]
   },
   getEnabled ()
   {
      return this .enabled;
   },
   setEnabled (value)
   {
      this .enabled = value;
   },
   getGlobal ()
   {
      return this ._global .getValue ();
   },
   getColor ()
   {
      return this ._color .getValue ();
   },
   getIntensity ()
   {
      return Math .max (this ._intensity .getValue (), 0);
   },
   getAmbientIntensity ()
   {
      return Algorithm .clamp (this ._ambientIntensity .getValue (), 0, 1);
   },
   getDirection ()
   {
      return this ._direction .getValue ();
   },
   getShadows ()
   {
      return this ._shadows .getValue ();
   },
   getShadowColor ()
   {
      return this ._shadowColor .getValue ();
   },
   getShadowIntensity ()
   {
      return this .getShadows () ? Algorithm .clamp (this ._shadowIntensity .getValue (), 0, 1) : 0;
   },
   getShadowBias ()
   {
      return Algorithm .clamp (this ._shadowBias .getValue (), 0, 1);
   },
   getShadowMapSize ()
   {
      return Math .min (this ._shadowMapSize .getValue (), this .getBrowser () .getMaxTextureSize ());
   },
   getBiasMatrix: (() =>
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
   push (renderObject, groupNode)
   {
      if (renderObject .isIndependent ())
      {
         const lightContainer = this .getLights () .pop ();

         if (this ._global .getValue ())
         {
            lightContainer .set (this,
                                 renderObject .getLayer () .getGroups (),
                                 renderObject .getModelViewMatrix () .get ());

            renderObject .getGlobalLights () .push (lightContainer);
            renderObject .getLights ()       .push (lightContainer);

            renderObject .pushGlobalShadows (!! this .getShadowIntensity ());
            renderObject .getGlobalLightsKeys () .push (this .getLightKey ());
         }
         else
         {
            lightContainer .set (this,
                                 groupNode,
                                 renderObject .getModelViewMatrix () .get ());

            renderObject .getLocalObjects () .push (lightContainer);
            renderObject .getLights ()       .push (lightContainer);

            renderObject .pushLocalShadows (!! this .getShadowIntensity ());
            renderObject .getLocalObjectsKeys () .push (this .getLightKey ());
         }
      }
      else
      {
         const lightContainer = renderObject .getLightContainer ();

         lightContainer .modelViewMatrix .push (renderObject .getModelViewMatrix () .get ());

         if (this ._global .getValue ())
         {
            renderObject .getGlobalLights () .push (lightContainer);
            renderObject .getLights ()       .push (lightContainer);

            renderObject .pushGlobalShadows (!! this .getShadowIntensity ());
            renderObject .getGlobalLightsKeys () .push (this .getLightKey ());
         }
         else
         {
            renderObject .getLocalObjects () .push (lightContainer);
            renderObject .getLights ()       .push (lightContainer);

            renderObject .pushLocalShadows (!! this .getShadowIntensity ());
            renderObject .getLocalObjectsKeys () .push (this .getLightKey ());
         }
      }
   },
   pop (renderObject)
   {
      if (this ._global .getValue ())
         return;

      const lightContainer = renderObject .getLocalObjects () .pop ();

      if (renderObject .isIndependent ())
         this .getBrowser () .getLocalObjects () .push (lightContainer);

      renderObject .popLocalShadows ();
      renderObject .getLocalObjectsKeys () .pop ();
   },
});

Object .defineProperties (X3DLightNode, X3DNode .getStaticProperties ("X3DLightNode", "Lighting", 1));

export default X3DLightNode;

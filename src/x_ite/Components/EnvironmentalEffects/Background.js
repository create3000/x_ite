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
   "x_ite/Fields",
   "x_ite/Basic/X3DFieldDefinition",
   "x_ite/Basic/FieldDefinitionArray",
   "x_ite/Components/EnvironmentalEffects/X3DBackgroundNode",
   "x_ite/Components/Texturing/ImageTexture",
   "x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBackgroundNode,
          ImageTexture,
          X3DConstants)
{
"use strict";

   function Background (executionContext)
   {
      X3DBackgroundNode .call (this, executionContext);

      this .addType (X3DConstants .Background);
   }

   Background .prototype = Object .assign (Object .create (X3DBackgroundNode .prototype),
   {
      constructor: Background,
      fieldDefinitions: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",     new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frontUrl",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backUrl",      new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "leftUrl",      new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "rightUrl",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "topUrl",       new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "bottomUrl",    new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "skyAngle",     new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "skyColor",     new Fields .MFColor (new Fields .SFColor ())),
         new X3DFieldDefinition (X3DConstants .inputOutput, "groundAngle",  new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "groundColor",  new Fields .MFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",     new Fields .SFTime ()),
      ]),
      getTypeName: function ()
      {
         return "Background";
      },
      getComponentName: function ()
      {
         return "EnvironmentalEffects";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DBackgroundNode .prototype .initialize .call (this);

         var
            frontTexture      = new ImageTexture (this .getExecutionContext ()),
            backTexture       = new ImageTexture (this .getExecutionContext ()),
            leftTexture       = new ImageTexture (this .getExecutionContext ()),
            rightTexture      = new ImageTexture (this .getExecutionContext ()),
            topTexture        = new ImageTexture (this .getExecutionContext ()),
            bottomTexture     = new ImageTexture (this .getExecutionContext ()),
            textureProperties = this .getBrowser () .getBackgroundTextureProperties ();

         this .frontUrl_  .addFieldInterest (frontTexture  .url_);
         this .backUrl_   .addFieldInterest (backTexture   .url_);
         this .leftUrl_   .addFieldInterest (leftTexture   .url_);
         this .rightUrl_  .addFieldInterest (rightTexture  .url_);
         this .topUrl_    .addFieldInterest (topTexture    .url_);
         this .bottomUrl_ .addFieldInterest (bottomTexture .url_);

         frontTexture  .url_ = this .frontUrl_;
         backTexture   .url_ = this .backUrl_;
         leftTexture   .url_ = this .leftUrl_;
         rightTexture  .url_ = this .rightUrl_;
         topTexture    .url_ = this .topUrl_;
         bottomTexture .url_ = this .bottomUrl_;

         frontTexture  .textureProperties_ = textureProperties;
         backTexture   .textureProperties_ = textureProperties;
         leftTexture   .textureProperties_ = textureProperties;
         rightTexture  .textureProperties_ = textureProperties;
         topTexture    .textureProperties_ = textureProperties;
         bottomTexture .textureProperties_ = textureProperties;

         frontTexture  .setup ();
         backTexture   .setup ();
         leftTexture   .setup ();
         rightTexture  .setup ();
         topTexture    .setup ();
         bottomTexture .setup ();

         this .set_frontTexture__  (frontTexture);
         this .set_backTexture__   (backTexture);
         this .set_leftTexture__   (leftTexture);
         this .set_rightTexture__  (rightTexture);
         this .set_topTexture__    (topTexture);
         this .set_bottomTexture__ (bottomTexture);
      }
   });

   return Background;
});

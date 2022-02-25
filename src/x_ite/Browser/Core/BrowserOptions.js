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
   "x_ite/Basic/X3DBaseNode",
   "x_ite/Bits/X3DConstants",
   "x_ite/Browser/Core/PrimitiveQuality",
   "x_ite/Browser/Core/Shading",
   "x_ite/Browser/Core/TextureQuality",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBaseNode,
          X3DConstants,
          PrimitiveQuality,
          Shading,
          TextureQuality)
{
"use strict";

   function toBoolean (value, defaultValue)
   {
      if (value === "true" || value === "TRUE")
         return true;

      if (value === "false" || value === "FALSE")
         return false;

      return defaultValue;
   }

   function BrowserOptions (executionContext)
   {
      X3DBaseNode .call (this, executionContext);

      this .addAlias ("AntiAliased", this .Antialiased_);

      const browser = executionContext .getBrowser ();

      this .localStorage     = browser .getLocalStorage () .addNameSpace ("BrowserOptions.");
      this .textureQuality   = TextureQuality .MEDIUM
      this .primitiveQuality = PrimitiveQuality .MEDIUM;
      this .shading          = Shading .GOURAUD;

      this .setAttributeSplashScreen ();
   }

   BrowserOptions .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   {
      constructor: BrowserOptions,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "SplashScreen",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Dashboard",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Rubberband",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "EnableInlineViewpoints", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Antialiased",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "TextureQuality",         new Fields .SFString ("MEDIUM")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "PrimitiveQuality",       new Fields .SFString ("MEDIUM")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "QualityWhenMoving",      new Fields .SFString ("MEDIUM")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Shading",                new Fields .SFString ("GOURAUD")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "MotionBlur",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Gravity",                new Fields .SFFloat (9.80665)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "StraightenHorizon",      new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "LogarithmicDepthBuffer", new Fields .SFBool (false)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Timings",                new Fields .SFBool (false)),
      ]),
      getTypeName: function ()
      {
         return "BrowserOptions";
      },
      getComponentName: function ()
      {
         return "X_ITE";
      },
      getContainerField: function ()
      {
         return "browserOptions";
      },
      initialize: function ()
      {
         X3DBaseNode .prototype .initialize .call (this);

         this .localStorage .addDefaultValues ({
            Rubberband:        this .Rubberband_        .getValue (),
            PrimitiveQuality:  this .PrimitiveQuality_  .getValue (),
            TextureQuality:    this .TextureQuality_    .getValue (),
            StraightenHorizon: this .StraightenHorizon_ .getValue (),
            Timings:           this .Timings_           .getValue (),
         });

         this .SplashScreen_           .addInterest ("set_splashScreen__",           this);
         this .Rubberband_             .addInterest ("set_rubberband__",             this);
         this .PrimitiveQuality_       .addInterest ("set_primitiveQuality__",       this);
         this .TextureQuality_         .addInterest ("set_textureQuality__",         this);
         this .Shading_                .addInterest ("set_shading__",                this);
         this .StraightenHorizon_      .addInterest ("set_straightenHorizon__",      this);
         this .LogarithmicDepthBuffer_ .addInterest ("set_logarithmicDepthBuffer__", this);
         this .Timings_                .addInterest ("set_timings__",                this);

         this .configure ();
      },
      configure: function ()
      {
         if (!this .isInitialized ())
            return;

         const
            localStorage     = this .localStorage,
            fieldDefinitions = this .getFieldDefinitions ();

         for (const fieldDefinition of fieldDefinitions)
         {
            const field = this .getField (fieldDefinition .name);

            if (localStorage [fieldDefinition .name] !== undefined)
               continue;

            if (!field .equals (fieldDefinition .value))
               field .setValue (fieldDefinition .value);
         }

         const
            rubberband        = localStorage .Rubberband,
            primitiveQuality  = localStorage .PrimitiveQuality,
            textureQuality    = localStorage .TextureQuality,
            straightenHorizon = localStorage .StraightenHorizon,
            timings           = localStorage .Timings;

         this .setAttributeSplashScreen ();

         if (rubberband !== this .Rubberband_ .getValue ())
            this .Rubberband_ = rubberband;

         if (primitiveQuality !== this .PrimitiveQuality_ .getValue ())
            this .PrimitiveQuality_ = primitiveQuality;

         if (textureQuality !== this .TextureQuality_ .getValue ())
            this .TextureQuality_ = textureQuality;

         if (straightenHorizon !== this .StraightenHorizon_ .getValue ())
            this .StraightenHorizon_ = straightenHorizon;

         if (timings !== this .Timings_ .getValue ())
            this .Timings_ = timings;
      },
      setAttributeSplashScreen: function ()
      {
         this .SplashScreen_ .set (this .getSplashScreen ());
      },
      getCache: function ()
      {
         return toBoolean (this .getBrowser () .getElement () .attr ("cache"), true);
      },
      getContextMenu: function ()
      {
         return toBoolean (this .getBrowser () .getElement () .attr ("contextMenu"), true);
      },
      getDebug: function ()
      {
         return toBoolean (this .getBrowser () .getElement () .attr ("debug"), false);
      },
      getNotifications: function ()
      {
         return toBoolean (this .getBrowser () .getElement () .attr ("notifications"), true);
      },
      getSplashScreen: function ()
      {
         return toBoolean (this .getBrowser () .getElement () .attr ("splashScreen"), true);
      },
      getPrimitiveQuality: function ()
      {
         return this .primitiveQuality;
      },
      getShading: function ()
      {
         return this .shading;
      },
      getTextureQuality: function ()
      {
         return this .textureQuality;
      },
      set_splashScreen__: function (splashScreen)
      {
         this .getBrowser () .getElement () .attr ("splashScreen", splashScreen .getValue () ? "true" : "false");
      },
      set_rubberband__: function (rubberband)
      {
         this .localStorage .Rubberband = rubberband .getValue ();

         this .getBrowser () .getViewer () .initShaders ();
      },
      set_primitiveQuality__: function (value)
      {
         const
            browser          = this .getBrowser (),
            primitiveQuality = value .getValue () .toUpperCase ();

         this .localStorage .PrimitiveQuality = primitiveQuality;

         const
            cone     = browser .getConeOptions (),
            cylinder = browser .getCylinderOptions (),
            sphere   = browser .getSphereOptions ();

         switch (primitiveQuality)
         {
            case "LOW":
            {
               if (this .primitiveQuality === PrimitiveQuality .LOW)
                  break;

               this .primitiveQuality = PrimitiveQuality .LOW;

               if (browser .setGeometry2DPrimitiveQuality)
                  browser .setGeometry2DPrimitiveQuality (this .primitiveQuality);

               cone     .xDimension_ = 16;
               cylinder .xDimension_ = 16;
               sphere   .xDimension_ = 20;
               sphere   .yDimension_ = 9;
               break;
            }
            case "HIGH":
            {
               if (this .primitiveQuality === PrimitiveQuality .HIGH)
                  break;

               this .primitiveQuality = PrimitiveQuality .HIGH;

               if (browser .setGeometry2DPrimitiveQuality)
                  browser .setGeometry2DPrimitiveQuality (this .primitiveQuality);

               cone     .xDimension_ = 32;
               cylinder .xDimension_ = 32;
               sphere   .xDimension_ = 64;
               sphere   .yDimension_ = 31;
               break;
            }
            default:
            {
               if (this .primitiveQuality === PrimitiveQuality .MEDIUM)
                  break;

               this .primitiveQuality = PrimitiveQuality .MEDIUM;

               if (browser .setGeometry2DPrimitiveQuality)
                  browser .setGeometry2DPrimitiveQuality (this .primitiveQuality);

               cone     .xDimension_ = 20;
               cylinder .xDimension_ = 20;
               sphere   .xDimension_ = 32;
               sphere   .yDimension_ = 15;
               break;
            }
         }
      },
      set_textureQuality__: function (value)
      {
         const
            browser        = this .getBrowser (),
            textureQuality = value .getValue () .toUpperCase ();

         this .localStorage .TextureQuality = textureQuality;

         const textureProperties = browser .getDefaultTextureProperties ();

         switch (textureQuality)
         {
            case "LOW":
            {
               if (this .textureQuality === TextureQuality .LOW)
                  break;

               this .textureQuality = TextureQuality .LOW;

               textureProperties .magnificationFilter_ = "AVG_PIXEL";
               textureProperties .minificationFilter_  = "AVG_PIXEL";
               textureProperties .textureCompression_  = "FASTEST";
               textureProperties .generateMipMaps_     = true;

               //glHint (GL_GENERATE_MIPMAP_HINT,        GL_FASTEST);
               //glHint (GL_PERSPECTIVE_CORRECTION_HINT, GL_FASTEST);
               break;
            }
            case "HIGH":
            {
               if (this .textureQuality === TextureQuality .HIGH)
                  break;

               this .textureQuality = TextureQuality .HIGH;

               textureProperties .magnificationFilter_ = "NICEST";
               textureProperties .minificationFilter_  = "NICEST";
               textureProperties .textureCompression_  = "NICEST";
               textureProperties .generateMipMaps_     = true;

               //glHint (GL_GENERATE_MIPMAP_HINT,        GL_NICEST);
               //glHint (GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);
               break;
            }
            default:
            {
               if (this .textureQuality === TextureQuality .MEDIUM)
                  break;

               this .textureQuality = TextureQuality .MEDIUM;

               textureProperties .magnificationFilter_ = "NICEST";
               textureProperties .minificationFilter_  = "AVG_PIXEL_AVG_MIPMAP";
               textureProperties .textureCompression_  = "NICEST";
               textureProperties .generateMipMaps_     = true;

               //glHint (GL_GENERATE_MIPMAP_HINT,        GL_FASTEST);
               //glHint (GL_PERSPECTIVE_CORRECTION_HINT, GL_FASTEST);
               break;
            }
         }
      },
      set_shading__: function (value)
      {
         const shading = value .getValue () .toUpperCase ();

         switch (shading)
         {
            case "POINT":
            case "POINTSET":
            {
               this .shading = Shading .POINT;
               break;
            }
            case "WIREFRAME":
            {
               this .shading = Shading .WIREFRAME;
               break;
            }
            case "FLAT":
            {
               this .shading = Shading .FLAT;
               break;
            }
            case "PHONG":
            {
               this .shading = Shading .PHONG;
               break;
            }
            default:
            {
               this .shading = Shading .GOURAUD;
               break;
            }
         }

         this .getBrowser () .setShading (this .shading);
      },
      set_straightenHorizon__: function (straightenHorizon)
      {
         this .localStorage .StraightenHorizon = straightenHorizon .getValue ();
      },
      set_logarithmicDepthBuffer__: function (logarithmicDepthBuffer)
      {
         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         logarithmicDepthBuffer = logarithmicDepthBuffer .getValue () && (gl .getVersion () >= 2 || Boolean (browser .getExtension ("EXT_frag_depth")));

         if (logarithmicDepthBuffer === browser .getRenderingProperties () .LogarithmicDepthBuffer_ .getValue ())
            return;

         browser .getRenderingProperties () .LogarithmicDepthBuffer_ = logarithmicDepthBuffer;

         // Recompile shaders.

         // There's no need to update background shader.

         if (browser .hasPointShader ())
         {
            browser .getPointShader () .parts_ [0] .getValue () .url_ .addEvent ();
            browser .getPointShader () .parts_ [1] .getValue () .url_ .addEvent ();
         }

         if (browser .hasLineShader ())
         {
            browser .getLineShader () .parts_ [0] .getValue () .url_ .addEvent ();
            browser .getLineShader () .parts_ [1] .getValue () .url_ .addEvent ();
         }

         if (browser .hasGouraudShader ())
         {
            browser .getGouraudShader () .parts_ [0] .getValue () .url_ .addEvent ();
            browser .getGouraudShader () .parts_ [1] .getValue () .url_ .addEvent ();
         }

         if (browser .hasPhongShader ())
         {
            browser .getPhongShader () .parts_ [0] .getValue () .url_ .addEvent ();
            browser .getPhongShader () .parts_ [1] .getValue () .url_ .addEvent ();
         }

         if (browser .hasShadowShader ())
         {
            browser .getShadowShader () .parts_ [0] .getValue () .url_ .addEvent ();
            browser .getShadowShader () .parts_ [1] .getValue () .url_ .addEvent ();
         }
      },
      set_timings__: function (timings)
      {
         this .localStorage .Timings = timings .getValue ();

         this .getBrowser () .getBrowserTimings () .setEnabled (timings .getValue ());
      },
   });

   return BrowserOptions;
});

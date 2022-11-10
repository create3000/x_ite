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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Navigation/X3DViewpointNode",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Components/Interpolation/ScalarInterpolator",
   "x_ite/Components/Navigation/NavigationInfo",
   "x_ite/Base/X3DConstants",
   "standard/Math/Geometry/Camera",
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DViewpointNode,
          X3DGeospatialObject,
          ScalarInterpolator,
          NavigationInfo,
          X3DConstants,
          Camera,
          Vector2,
          Vector3,
          Rotation4,
          Matrix4,
          Algorithm)
{
"use strict";

   function traverse (type, renderObject)
   {
      X3DViewpointNode .prototype .traverse .call (this, type, renderObject);

      this .navigationInfoNode .traverse (type, renderObject);
   }

   function GeoViewpoint (executionContext)
   {
      X3DViewpointNode    .call (this, executionContext);
      X3DGeospatialObject .call (this, executionContext);

      this .addType (X3DConstants .GeoViewpoint);

      this ._centerOfRotation .setUnit ("length");
      this ._fieldOfView      .setUnit ("angle");

      this .navigationInfoNode      = new NavigationInfo (executionContext);
      this .fieldOfViewInterpolator = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
      this .projectionMatrix        = new Matrix4 ();
      this .elevation               = 0;

      switch (executionContext .specificationVersion)
      {
         case "2.0":
         case "3.0":
         case "3.1":
         case "3.2":
            this .traverse = traverse;
            break;
      }
   }

   GeoViewpoint .prototype = Object .assign (Object .create (X3DViewpointNode .prototype),
      X3DGeospatialObject .prototype,
   {
      constructor: GeoViewpoint,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",         new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_bind",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "position",          new Fields .SFVec3d (0, 0, 100000)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "orientation",       new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "centerOfRotation",  new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fieldOfView",       new Fields .SFFloat (0.7854)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "jump",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "retainUserOffsets", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "navType",           new Fields .MFString ("EXAMINE", "ANY")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "headlight",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "speedFactor",       new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isBound",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "bindTime",          new Fields .SFTime ()),
      ]),
      getTypeName: function ()
      {
         return "GeoViewpoint";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DViewpointNode    .prototype .initialize .call (this);
         X3DGeospatialObject .prototype .initialize .call (this);

         // Logarithmic depth buffer support

         const gl = this .getBrowser () .getContext ();

         this .logarithmicDepthBuffer = gl .HAS_FEATURE_FRAG_DEPTH;

         // Fields

         this ._position       .addInterest ("set_position__", this);
         this ._positionOffset .addInterest ("set_position__", this);
         this ._navType        .addFieldInterest (this .navigationInfoNode ._type);
         this ._headlight      .addFieldInterest (this .navigationInfoNode ._headlight);

         this .navigationInfoNode .setup ();

         this .set_position__ ();

         // Setup interpolators

         this .fieldOfViewInterpolator ._key = [ 0, 1 ];
         this .fieldOfViewInterpolator .setup ();

         this .getEaseInEaseOut () ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewInterpolator ._set_fraction);
         this .fieldOfViewInterpolator ._value_changed .addFieldInterest (this ._fieldOfViewScale);
      },
      setInterpolators: function (fromViewpointNode, toViewpointNode)
      {
         if (fromViewpointNode .getType () .includes (X3DConstants .Viewpoint) || fromViewpointNode .getType () .includes (X3DConstants .GeoViewpoint))
         {
            const scale = fromViewpointNode .getFieldOfView () / toViewpointNode .getFieldOfView ();

            this .fieldOfViewInterpolator ._keyValue = new Fields .MFFloat (scale, toViewpointNode ._fieldOfViewScale .getValue ());

            this ._fieldOfViewScale = scale;
         }
         else
         {
            this .fieldOfViewInterpolator ._keyValue = new Fields .MFFloat (toViewpointNode ._fieldOfViewScale .getValue (), toViewpointNode ._fieldOfViewScale .getValue ());

            this ._fieldOfViewScale = toViewpointNode ._fieldOfViewScale .getValue ();
         }
      },
      getLogarithmicDepthBuffer: function ()
      {
         return this .logarithmicDepthBuffer;
      },
      setPosition: (function ()
      {
         const geoPosition = new Vector3 (0, 0, 0);

         return function (value)
         {
            this ._position .setValue (this .getGeoCoord (value, geoPosition));
         };
      })(),
      getPosition: (function ()
      {
         const position = new Vector3 (0, 0, 0);

         return function ()
         {
            return this .getCoord (this ._position .getValue (), position);
         };
      })(),
      set_position__: (function ()
      {
         const position = new Vector3 (0, 0, 0);

         return function ()
         {
            this .getCoord (this ._position .getValue (), position);

            this .elevation = this .getGeoElevation (position .add (this ._positionOffset .getValue ()));
         };
      })(),
      setOrientation: (function ()
      {
         const
            locationMatrix = new Matrix4 (),
            geoOrientation = new Rotation4 (0, 0, 1, 0);

         return function (value)
         {
            ///  Returns the resulting orientation for this viewpoint.

            const rotationMatrix = this .getLocationMatrix (this ._position .getValue (), locationMatrix) .submatrix;

            geoOrientation .setMatrix (rotationMatrix);

            this ._orientation .setValue (geoOrientation .inverse () .multLeft (value));
         };
      })(),
      getOrientation: (function ()
      {
         const
            locationMatrix = new Matrix4 (),
            orientation    = new Rotation4 (0, 0, 1, 0);

         return function ()
         {
            ///  Returns the resulting orientation for this viewpoint.

            const rotationMatrix = this .getLocationMatrix (this ._position .getValue (), locationMatrix) .submatrix;

            orientation .setMatrix (rotationMatrix);

            return orientation .multLeft (this ._orientation .getValue ());
         };
      })(),
      getCenterOfRotation: (function ()
      {
         const centerOfRotation = new Vector3 (0, 0, 0);

         return function ()
         {
            return this .getCoord (this ._centerOfRotation .getValue (), centerOfRotation);
         };
      })(),
      getFieldOfView: function ()
      {
         const fov = this ._fieldOfView * this ._fieldOfViewScale;

         return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
      },
      getMaxFarValue: function ()
      {
         return 1e10;
      },
      getUpVector: (function ()
      {
         const
            position = new Vector3 (0, 0, 0),
            upVector = new Vector3 (0, 0, 0);

         return function ()
         {
            this .getCoord (this ._position .getValue (), position);

            return this .getGeoUpVector .call (this, position .add (this ._positionOffset .getValue ()), upVector);
         };
      })(),
      getSpeedFactor: function ()
      {
         return (Math .max (this .elevation, 0.0) + 10) / 10 * this ._speedFactor .getValue ();
      },
      getScreenScale: function (point, viewport, screenScale)
      {
         // Returns the screen scale in meter/pixel for on pixel.

         const
            width  = viewport [2],
            height = viewport [3];

         let size = Math .abs (point .z) * Math .tan (this .getFieldOfView () / 2) * 2;

         if (width > height)
            size /= height;
         else
            size /= width;

         return screenScale .set (size, size, size);
      },
      getViewportSize: (function ()
      {
         const viewportSize = new Vector2 (0, 0);

         return function (viewport, nearValue)
         {
            const
               width  = viewport [2],
               height = viewport [3],
               size   = nearValue * Math .tan (this .getFieldOfView () / 2) * 2,
               aspect = width / height;

            if (aspect > 1)
               return viewportSize .set (size * aspect, size);

            return viewportSize .set (size, size / aspect);
         };
      })(),
      getLookAtDistance: function (bbox)
      {
         return (bbox .size .magnitude () / 2) / Math .tan (this .getFieldOfView () / 2);
      },
      getProjectionMatrixWithLimits: function (nearValue, farValue, viewport)
      {
         return Camera .perspective (this .getFieldOfView (), nearValue, farValue, viewport [2], viewport [3], this .projectionMatrix);
      },
   });

   return GeoViewpoint;
});

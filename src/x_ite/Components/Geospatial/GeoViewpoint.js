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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DViewpointNode     from "../Navigation/X3DViewpointNode.js";
import X3DGeospatialObject  from "./X3DGeospatialObject.js";
import Viewpoint            from "../Navigation/Viewpoint.js";
import NavigationInfo       from "../Navigation/NavigationInfo.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function GeoViewpoint (executionContext)
{
   X3DViewpointNode    .call (this, executionContext);
   X3DGeospatialObject .call (this, executionContext);

   this .addType (X3DConstants .GeoViewpoint);

   this .addChildObjects (X3DConstants .inputOutput, "navType",   new Fields .MFString ("EXAMINE", "ANY"),
                          X3DConstants .inputOutput, "headlight", new Fields .SFBool (true));

   // Units

   this ._centerOfRotation .setUnit ("length");
   this ._fieldOfView      .setUnit ("angle");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.2)
   {
      this .addAlias ("navType",   this ._navType);
      this .addAlias ("headlight", this ._headlight);

      this .traverse = traverse;
   }

   // Private properties

   this .geoNavigationInfoNode = new NavigationInfo (executionContext);
   this .projectionMatrix      = new Matrix4 ();
   this .elevation             = 0;
}

Object .assign (Object .setPrototypeOf (GeoViewpoint .prototype, X3DViewpointNode .prototype),
   X3DGeospatialObject .prototype,
{
   initialize ()
   {
      X3DViewpointNode    .prototype .initialize .call (this);
      X3DGeospatialObject .prototype .initialize .call (this);

      // Logarithmic depth buffer support

      const gl = this .getBrowser () .getContext ();

      this .logarithmicDepthBuffer = gl .HAS_FEATURE_FRAG_DEPTH;

      // Fields

      this ._position       .addInterest ("set_position__", this);
      this ._positionOffset .addInterest ("set_position__", this);
      this ._navType        .addFieldInterest (this .geoNavigationInfoNode ._type);
      this ._headlight      .addFieldInterest (this .geoNavigationInfoNode ._headlight);

      this .geoNavigationInfoNode ._type      = this ._navType;
      this .geoNavigationInfoNode ._headlight = this ._headlight;

      this .geoNavigationInfoNode .setup ();

      if (this .getExecutionContext () .getSpecificationVersion () <= 3.2)
         this ._navigationInfo = this .geoNavigationInfoNode;

      this .set_position__ ();
   },
   getRelativeTransformation: Viewpoint .prototype .getRelativeTransformation,
   setInterpolators: Viewpoint .prototype .setInterpolators,
   getFieldOfView: Viewpoint .prototype .getFieldOfView,
   setFieldOfView: Viewpoint .prototype .setFieldOfView,
   getUserFieldOfView: Viewpoint .prototype .getUserFieldOfView,
   getScreenScale: Viewpoint .prototype .getScreenScale,
   getViewportSize: Viewpoint .prototype .getViewportSize,
   getLookAtDistance: Viewpoint .prototype .getLookAtDistance,
   getProjectionMatrixWithLimits: Viewpoint .prototype .getProjectionMatrixWithLimits,
   getLogarithmicDepthBuffer ()
   {
      return this .logarithmicDepthBuffer;
   },
   getPosition: (() =>
   {
      const position = new Vector3 ();

      return function ()
      {
         return this .getCoord (this ._position .getValue (), position);
      };
   })(),
   setPosition: (() =>
   {
      const geoPosition = new Vector3 ();

      return function (value)
      {
         this ._position .setValue (this .getGeoCoord (value, geoPosition));
      };
   })(),
   set_position__: (() =>
   {
      const position = new Vector3 ();

      return function ()
      {
         this .getCoord (this ._position .getValue (), position);

         this .elevation = this .getGeoElevation (position .add (this ._positionOffset .getValue ()));
      };
   })(),
   getOrientation: (() =>
   {
      const
         locationMatrix = new Matrix4 (),
         orientation    = new Rotation4 ();

      return function ()
      {
         ///  Returns the resulting orientation for this viewpoint.

         const rotationMatrix = this .getLocationMatrix (this ._position .getValue (), locationMatrix) .submatrix;

         orientation .setMatrix (rotationMatrix);

         return orientation .multLeft (this ._orientation .getValue ());
      };
   })(),
   setOrientation: (() =>
   {
      const
         locationMatrix = new Matrix4 (),
         geoOrientation = new Rotation4 ();

      return function (value)
      {
         ///  Returns the resulting orientation for this viewpoint.

         const rotationMatrix = this .getLocationMatrix (this ._position .getValue (), locationMatrix) .submatrix;

         geoOrientation .setMatrix (rotationMatrix);

         this ._orientation .setValue (geoOrientation .inverse () .multLeft (value));
      };
   })(),
   getCenterOfRotation: (() =>
   {
      const centerOfRotation = new Vector3 ();

      return function ()
      {
         return this .getCoord (this ._centerOfRotation .getValue (), centerOfRotation);
      };
   })(),
   setCenterOfRotation: (() =>
   {
      const geoCenterOfRotation = new Vector3 ();

      return function (value)
      {
         this ._centerOfRotation .setValue (this .getGeoCoord (value, geoCenterOfRotation));
      };
   })(),
   getMaxFarValue ()
   {
      return 1e9;
   },
   getUpVector: (() =>
   {
      const
         position = new Vector3 (),
         upVector = new Vector3 ();

      return function (dynamic = false)
      {
         if (!dynamic || this .getUserPosition () .magnitude () < 6.5e6)
         {
            this .getCoord (this ._position .getValue (), position);

            return this .getGeoUpVector (position .add (this ._positionOffset .getValue ()), upVector);
         }
         else
         {
            return upVector .assign (Vector3 .zAxis);
         }
      };
   })(),
   getSpeedFactor ()
   {
      return (Math .max (this .elevation, 0.0) + 10) / 10 * this ._speedFactor .getValue ();
   },
   dispose ()
   {
      X3DGeospatialObject .prototype .dispose .call (this);
      X3DViewpointNode    .prototype .dispose .call (this);
   },
});

function traverse (type, renderObject)
{
   X3DViewpointNode .prototype .traverse .call (this, type, renderObject);

   this .geoNavigationInfoNode .traverse (type, renderObject);
}

Object .defineProperties (GeoViewpoint, X3DNode .staticProperties ("GeoViewpoint", "Geospatial", 1, "children", "3.0", "Infinity"));

Object .defineProperties (GeoViewpoint,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",         new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_bind",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "position",          new Fields .SFVec3d (0, 0, 100000)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "orientation",       new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "centerOfRotation",  new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fieldOfView",       new Fields .SFFloat (0.785398)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "nearDistance",      new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "farDistance",       new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "viewAll",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "jump",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "retainUserOffsets", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "speedFactor",       new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isBound",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "bindTime",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "navigationInfo",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default GeoViewpoint;

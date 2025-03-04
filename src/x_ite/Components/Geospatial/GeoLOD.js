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
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DGeospatialObject  from "./X3DGeospatialObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Group                from "../Grouping/Group.js";
import Inline               from "../Networking/Inline.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";

var center = new Vector3 ();

function GeoLOD (executionContext)
{
   X3DChildNode        .call (this, executionContext);
   X3DBoundedObject    .call (this, executionContext);
   X3DGeospatialObject .call (this, executionContext);

   this .addType (X3DConstants .GeoLOD);

   this .setVisibleObject (true);

   // Units

   this ._range .setUnit ("length");

   // Private properties

   this .unload           = false;
   this .rootGroup        = new Group (this .getBrowser () .getPrivateScene ());
   this .rootInline       = new Inline (executionContext);
   this .child1Inline     = new Inline (executionContext);
   this .child2Inline     = new Inline (executionContext);
   this .child3Inline     = new Inline (executionContext);
   this .child4Inline     = new Inline (executionContext);
   this .childrenLoaded   = false;
   this .childBBox        = new Box3 ();
   this .keepCurrentLevel = false;
   this .modelViewMatrix  = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (GeoLOD .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
   X3DGeospatialObject .prototype,
{
   initialize ()
   {
      X3DChildNode        .prototype .initialize .call (this);
      X3DBoundedObject    .prototype .initialize .call (this);
      X3DGeospatialObject .prototype .initialize .call (this);

      this ._rootNode .addFieldInterest (this .rootGroup ._children);

      this .rootGroup ._children = this ._rootNode;
      this .rootGroup .setPrivate (true);

      this .rootInline   ._loadState .addInterest ("set_rootLoadState__", this);
      this .child1Inline ._loadState .addInterest ("set_childLoadState__", this);
      this .child2Inline ._loadState .addInterest ("set_childLoadState__", this);
      this .child3Inline ._loadState .addInterest ("set_childLoadState__", this);
      this .child4Inline ._loadState .addInterest ("set_childLoadState__", this);

      this ._rootUrl   .addFieldInterest (this .rootInline   ._url);
      this ._child1Url .addFieldInterest (this .child1Inline ._url);
      this ._child2Url .addFieldInterest (this .child2Inline ._url);
      this ._child3Url .addFieldInterest (this .child3Inline ._url);
      this ._child4Url .addFieldInterest (this .child4Inline ._url);

      this .rootInline   ._load = true;
      this .child1Inline ._load = false;
      this .child2Inline ._load = false;
      this .child3Inline ._load = false;
      this .child4Inline ._load = false;

      this .rootInline   ._url = this ._rootUrl;
      this .child1Inline ._url = this ._child1Url;
      this .child2Inline ._url = this ._child2Url;
      this .child3Inline ._url = this ._child3Url;
      this .child4Inline ._url = this ._child4Url;

      this .rootInline   .setup ();
      this .child1Inline .setup ();
      this .child2Inline .setup ();
      this .child3Inline .setup ();
      this .child4Inline .setup ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
      {
         switch (this .childrenLoaded ? this ._level_changed .getValue () : 0)
         {
            case 0:
            {
               if (this ._rootNode .length)
                  return this .rootGroup .getBBox (bbox, shadows);

               return this .rootInline .getBBox (bbox, shadows);
            }
            case 1:
            {
               // Must be unique for each GeoLOD..
               const childBBox = this .childBBox;

               bbox .set ();

               bbox .add (this .child1Inline .getBBox (childBBox, shadows));
               bbox .add (this .child2Inline .getBBox (childBBox, shadows));
               bbox .add (this .child3Inline .getBBox (childBBox, shadows));
               bbox .add (this .child4Inline .getBBox (childBBox, shadows));

               return bbox;
            }
         }

         return bbox .set ();
      }

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   set_rootLoadState__ ()
   {
      if (this ._level_changed .getValue () !== 0)
         return;

      if (this ._rootNode .length)
         return;

      if (this .rootInline .checkLoadState () === X3DConstants .COMPLETE_STATE)
      {
         this ._children      = this .rootInline .getInternalScene () .getRootNodes ();
         this .childrenLoaded = false;
      }
   },
   set_childLoadState__ ()
   {
      if (this ._level_changed .getValue () !== 1)
         return;

      var loaded = 0;

      if (this .child1Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
          this .child1Inline .checkLoadState () === X3DConstants .FAILED_STATE)
         ++ loaded;

      if (this .child2Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
          this .child2Inline .checkLoadState () === X3DConstants .FAILED_STATE)
         ++ loaded;

      if (this .child3Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
          this .child3Inline .checkLoadState () === X3DConstants .FAILED_STATE)
         ++ loaded;

      if (this .child4Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
          this .child4Inline .checkLoadState () === X3DConstants .FAILED_STATE)
         ++ loaded;

      if (loaded === 4)
      {
         this .childrenLoaded = true;

         var children = this ._children;

         children .length = 0;

         var rootNodes = this .child1Inline .getInternalScene () .getRootNodes ();

         for (var i = 0, length = rootNodes .length; i < length; ++ i)
            children .push (rootNodes [i]);

         var rootNodes = this .child2Inline .getInternalScene () .getRootNodes ();

         for (var i = 0, length = rootNodes .length; i < length; ++ i)
            children .push (rootNodes [i]);

         var rootNodes = this .child3Inline .getInternalScene () .getRootNodes ();

         for (var i = 0, length = rootNodes .length; i < length; ++ i)
            children .push (rootNodes [i]);

         var rootNodes = this .child4Inline .getInternalScene () .getRootNodes ();

         for (var i = 0, length = rootNodes .length; i < length; ++ i)
            children .push (rootNodes [i]);
      }
   },
   set_childPointingObject__ ()
   {
      this .setCameraObject (this .child1Inline .isPointingObject () ||
                             this .child2Inline .isPointingObject () ||
                             this .child3Inline .isPointingObject () ||
                             this .child4Inline .isPointingObject ());
   },
   set_childCameraObject__ ()
   {
      this .setCameraObject (this .child1Inline .isCameraObject () ||
                             this .child2Inline .isCameraObject () ||
                             this .child3Inline .isCameraObject () ||
                             this .child4Inline .isCameraObject ());
   },
   set_childPickableObject__ ()
   {
      this .setPickableObject (this .child1Inline .isPickableObject () ||
                               this .child2Inline .isPickableObject () ||
                               this .child3Inline .isPickableObject () ||
                               this .child4Inline .isPickableObject ());
   },
   getLevel (modelViewMatrix)
   {
      var distance = this .getDistance (modelViewMatrix);

      if (distance < this ._range .getValue ())
         return 1;

      return 0;
   },
   getDistance (modelViewMatrix)
   {
      modelViewMatrix .translate (this .getCoord (this ._center .getValue (), center));

      return modelViewMatrix .origin .magnitude ();
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .PICKING:
         {
            var
               browser          = this .getBrowser (),
               pickingHierarchy = browser .getPickingHierarchy ();

            pickingHierarchy .push (this);

            this .traverseChildren (type, renderObject);

            pickingHierarchy .pop ();
            return;
         }
         case TraverseType .DISPLAY:
         {
            var level = this .getLevel (this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()));

            if (level !== this ._level_changed .getValue ())
            {
               this ._level_changed = level;

               switch (level)
               {
                  case 0:
                  {
                     this .child1Inline ._isPointingObject .removeInterest ("set_childPointingObject__", this);
                     this .child2Inline ._isPointingObject .removeInterest ("set_childPointingObject__", this);
                     this .child3Inline ._isPointingObject .removeInterest ("set_childPointingObject__", this);
                     this .child4Inline ._isPointingObject .removeInterest ("set_childPointingObject__", this);

                     this .child1Inline ._isCameraObject .removeInterest ("set_childCameraObject__", this);
                     this .child2Inline ._isCameraObject .removeInterest ("set_childCameraObject__", this);
                     this .child3Inline ._isCameraObject .removeInterest ("set_childCameraObject__", this);
                     this .child4Inline ._isCameraObject .removeInterest ("set_childCameraObject__", this);

                     this .child1Inline ._isPickableObject .removeInterest ("set_childPickableObject__", this);
                     this .child2Inline ._isPickableObject .removeInterest ("set_childPickableObject__", this);
                     this .child3Inline ._isPickableObject .removeInterest ("set_childPickableObject__", this);
                     this .child4Inline ._isPickableObject .removeInterest ("set_childPickableObject__", this);

                     if (this ._rootNode .length)
                     {
                        this .rootGroup ._isPointingObject .addFieldInterest (this ._isPointingObject);
                        this .rootGroup ._isCameraObject   .addFieldInterest (this ._isCameraObject);
                        this .rootGroup ._isPickableObject .addFieldInterest (this ._isPickableObject);

                        this .setPointingObject (this .rootGroup .isPointingObject ());
                        this .setCameraObject   (this .rootGroup .isCameraObject ());
                        this .setPickableObject (this .rootGroup .isPickableObject ());

                        this ._children      = this ._rootNode;
                        this .childrenLoaded = false;
                     }
                     else
                     {
                        if (this .rootInline .checkLoadState () == X3DConstants .COMPLETE_STATE)
                        {
                           this .rootInline ._isPointingObject .addFieldInterest (this ._isPointingObject);
                           this .rootInline ._isCameraObject   .addFieldInterest (this ._isCameraObject);
                           this .rootInline ._isPickableObject .addFieldInterest (this ._isPickableObject);

                           this .setPointingObject (this .rootInline .isPointingObject ());
                           this .setCameraObject   (this .rootInline .isCameraObject ());
                           this .setPickableObject (this .rootInline .isPickableObject ());

                           this ._children      = this .rootInline .getInternalScene () .getRootNodes ();
                           this .childrenLoaded = false;
                        }
                     }

                     if (this .unload)
                     {
                        this .child1Inline ._load = false;
                        this .child2Inline ._load = false;
                        this .child3Inline ._load = false;
                        this .child4Inline ._load = false;
                     }

                     break;
                  }
                  case 1:
                  {
                     if (this ._rootNode .length)
                     {
                        this .rootGroup ._isPointingObject .removeFieldInterest (this ._isPointingObject);
                        this .rootGroup ._isCameraObject   .removeFieldInterest (this ._isCameraObject);
                        this .rootGroup ._isPickableObject .removeFieldInterest (this ._isPickableObject);
                     }
                     else
                     {
                        this .rootInline ._isPointingObject .removeFieldInterest (this ._isPointingObject);
                        this .rootInline ._isCameraObject   .removeFieldInterest (this ._isCameraObject);
                        this .rootInline ._isPickableObject .removeFieldInterest (this ._isPickableObject);
                     }

                     this .child1Inline ._isPointingObject .addInterest ("set_childPointingObject__", this);
                     this .child2Inline ._isPointingObject .addInterest ("set_childPointingObject__", this);
                     this .child3Inline ._isPointingObject .addInterest ("set_childPointingObject__", this);
                     this .child4Inline ._isPointingObject .addInterest ("set_childPointingObject__", this);

                     this .child1Inline ._isCameraObject .addInterest ("set_childCameraObject__", this);
                     this .child2Inline ._isCameraObject .addInterest ("set_childCameraObject__", this);
                     this .child3Inline ._isCameraObject .addInterest ("set_childCameraObject__", this);
                     this .child4Inline ._isCameraObject .addInterest ("set_childCameraObject__", this);

                     this .child1Inline ._isPickableObject .addInterest ("set_childPickableObject__", this);
                     this .child2Inline ._isPickableObject .addInterest ("set_childPickableObject__", this);
                     this .child3Inline ._isPickableObject .addInterest ("set_childPickableObject__", this);
                     this .child4Inline ._isPickableObject .addInterest ("set_childPickableObject__", this);

                     this .set_childPointingObject__ ();
                     this .set_childCameraObject__ ();
                     this .set_childPickableObject__ ();

                     if (this .child1Inline ._load .getValue ())
                     {
                        this .set_childLoadState__ ();
                     }
                     else
                     {
                        this .child1Inline ._load = true;
                        this .child2Inline ._load = true;
                        this .child3Inline ._load = true;
                        this .child4Inline ._load = true;
                     }

                     break;
                  }
               }
            }

            this .traverseChildren (type, renderObject);
            return;
         }
         default:
         {
            this .traverseChildren (type, renderObject);
            return;
         }
      }
   },
   traverseChildren (type, renderObject)
   {
      switch (this .childrenLoaded ? this ._level_changed .getValue () : 0)
      {
         case 0:
         {
            if (this ._rootNode .length)
               this .rootGroup .traverse (type, renderObject);
            else
               this .rootInline .traverse (type, renderObject);

            break;
         }
         case 1:
         {
            this .child1Inline .traverse (type, renderObject);
            this .child2Inline .traverse (type, renderObject);
            this .child3Inline .traverse (type, renderObject);
            this .child4Inline .traverse (type, renderObject);
            break;
         }
      }
   },
   dispose ()
   {
      X3DGeospatialObject .prototype .dispose .call (this);
      X3DBoundedObject    .prototype .dispose .call (this);
      X3DChildNode        .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoLOD,
{
   ... X3DNode .getStaticProperties ("GeoLOD", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",     new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "rootUrl",       new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child1Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child2Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child3Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child4Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "center",        new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "range",         new Fields .SFFloat (10)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "level_changed", new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",      new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "rootNode",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "children",      new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default GeoLOD;

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
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DUrlObject         from "./X3DUrlObject.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import Group                from "../Grouping/Group.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import FileLoader           from "../../InputOutput/FileLoader.js";

function Inline (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DUrlObject     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .Inline);

   if (executionContext .getSpecificationVersion () < 4.0)
      this ._global = true;

   this .scene        = this .getBrowser () .getDefaultScene ();
   this .groupNode    = new Group (executionContext);
   this .localObjects = [ ];
   this .localShadows = false;
}

Inline .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   X3DUrlObject .prototype,
   X3DBoundedObject .prototype,
{
   constructor: Inline,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "global",               new Fields .SFBool (false)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",              new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",          new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",             new Fields .SFVec3f (-1, -1, -1)),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",           new Fields .SFVec3f ()),
   ]),
   getTypeName: function ()
   {
      return "Inline";
   },
   getComponentName: function ()
   {
      return "Networking";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DUrlObject     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this .groupNode .setPrivate (true);
      this .groupNode .setup ();

      this .groupNode ._isCameraObject   .addFieldInterest (this ._isCameraObject);
      this .groupNode ._isPickableObject .addFieldInterest (this ._isPickableObject);

      this .requestImmediateLoad ();
   },
   getBBox: function (bbox, shadows)
   {
      if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
         return this .groupNode .getBBox (bbox, shadows);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   set_live__: function ()
   {
      X3DUrlObject .prototype .set_live__ .call (this);

      if (this .isPrivate ())
         return

      this .scene .setLive (this .isLive () .getValue ());
   },
   unLoadNow: function ()
   {
      this .abortLoading ();
      this .setInternalScene (this .getBrowser () .getDefaultScene ());
   },
   loadNow: function ()
   {
      this .abortLoading ();
      this .fileLoader = new FileLoader (this) .createX3DFromURL (this ._url, null, this .setInternalSceneAsync .bind (this));
   },
   abortLoading: function ()
   {
      this .scene ._loadCount .removeInterest ("checkLoadCount", this);

      if (this .fileLoader)
         this .fileLoader .abort ();
   },
   setInternalSceneAsync: function (scene)
   {
      if (scene)
      {
         scene ._loadCount .addInterest ("checkLoadCount", this);
         this .setInternalScene (scene);
         this .checkLoadCount (scene ._loadCount);
      }
      else
      {
         this .setInternalScene (this .getBrowser () .getDefaultScene ());
         this .setLoadState (X3DConstants .FAILED_STATE);
      }
   },
   checkLoadCount: function (loadCount)
   {
      if (loadCount .getValue ())
         return;

      loadCount .removeInterest ("checkLoadCount", this);

      this .setLoadState (X3DConstants .COMPLETE_STATE);
   },
   setInternalScene: function (scene)
   {
      this .scene .setLive (false);
      this .scene .rootNodes .removeFieldInterest (this .groupNode ._children);

      // Set new scene.

      this .scene = scene;
      this .scene .setExecutionContext (this .getExecutionContext ());
      this .scene .setPrivate (this .getExecutionContext () .isPrivate ());

      this .scene .rootNodes .addFieldInterest (this .groupNode ._children);
      this .groupNode ._children = this .scene .rootNodes;

      this .set_live__ ();

      this .getBrowser () .addBrowserEvent ();
   },
   getInternalScene: function ()
   {
      ///  Returns the internal X3DScene of this inline, that is loaded from the url given.
      ///  If the load field was false an empty scene is returned.  This empty scene is the same for all Inline
      ///  nodes (due to performance reasons).

      return this .scene;
   },
   traverse: function (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .PICKING:
         {
            const
               browser          = this .getBrowser (),
               pickingHierarchy = browser .getPickingHierarchy ();

            pickingHierarchy .push (this);

            this .groupNode .traverse (type, renderObject);

            pickingHierarchy .pop ();
            return;
         }
         case TraverseType .DISPLAY:
         {
            if (this ._global .getValue ())
            {
               this .groupNode .traverse (type, renderObject);
            }
            else
            {
               const
                  globalObjects        = renderObject .getGlobalObjects (),
                  globalShadows        = renderObject .getGlobalShadows (),
                  globalsBegin         = globalObjects .length,
                  shadowsBegin         = globalShadows .length,
                  localObjects         = this .localObjects,
                  numLocalObjects      = localObjects .length,
                  numLights            = localObjects .reduce ((n, c) => n + !!c .lightNode, 0),
                  numTextureProjectors = localObjects .reduce ((n, c) => n + !!c .textureProjectorNode, 0);

               renderObject .getLocalObjects () .push (... localObjects);
               renderObject .pushLocalShadows (this .localShadows);
               renderObject .getLocalObjectsCount () [1] += numLights;
               renderObject .getLocalObjectsCount () [2] += numTextureProjectors;

               this .groupNode .traverse (type, renderObject);

               if (renderObject .isIndependent ())
               {
                  const browser = this .getBrowser ();

                  for (let i = 0; i < numLocalObjects; ++ i)
                     browser .getLocalObjects () .push (renderObject .getLocalObjects () .pop ());
               }
               else
               {
                  for (let i = 0; i < numLocalObjects; ++ i)
                     renderObject .getLocalObjects () .pop ();
               }

               renderObject .popLocalShadows ();
               renderObject .getLocalObjectsCount () [1] -= numLights;
               renderObject .getLocalObjectsCount () [2] -= numTextureProjectors;

               const numGlobalObjects = globalObjects .length - globalsBegin;

               for (let i = 0; i < numGlobalObjects; ++ i)
               {
                  const globalObject = globalObjects [globalsBegin + i];

                  globalObject .groupNode = this .groupNode;
                  globalObject .global    = false;

                  localObjects [i] = globalObject;
               }

               localObjects .length = numGlobalObjects;
               this .localShadows   = globalShadows .at (-1);

               globalObjects .length = globalsBegin;
               globalShadows .length = shadowsBegin;
            }

            return;
         }
         default:
         {
            this .groupNode .traverse (type, renderObject);
            return;
         }
      }
   },
   dispose: function ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DUrlObject     .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

export default Inline;

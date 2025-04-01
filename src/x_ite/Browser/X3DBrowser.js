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

import VERSION              from "../BROWSER_VERSION.js";
import X3DFieldDefinition   from "../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../Base/FieldDefinitionArray.js";
import Fields               from "../Fields.js";
import Components           from "../Components.js";
import X3DBrowserContext    from "./X3DBrowserContext.js";
import DOMIntegration       from "./DOMIntegration.js";
import Legacy               from "./Legacy.js";
import ProfileInfo          from "../Configuration/ProfileInfo.js";
import ComponentInfo        from "../Configuration/ComponentInfo.js";
import ComponentInfoArray   from "../Configuration/ComponentInfoArray.js";
import SupportedProfiles    from "../Configuration/SupportedProfiles.js";
import SupportedComponents  from "../Configuration/SupportedComponents.js";
import AbstractNodes        from "../Configuration/AbstractNodes.js";
import ConcreteNodes        from "../Configuration/ConcreteNodes.js";
import FieldTypes           from "../Configuration/FieldTypes.js";
import X3DScene             from "../Execution/X3DScene.js";
import FileLoader           from "../InputOutput/FileLoader.js";
import XMLParser            from "../Parser/XMLParser.js";
import JSONParser           from "../Parser/JSONParser.js";
import X3DCast              from "../Base/X3DCast.js";
import X3DConstants         from "../Base/X3DConstants.js";
import Features             from "../Features.js";
import Algorithm            from "../../standard/Math/Algorithm.js";
import MikkTSpace           from "./Rendering/MikkTSpace.js";
import _                    from "../../locale/gettext.js";
import DEVELOPMENT          from "../DEVELOPMENT.js";

const
   _DOMIntegration      = Symbol (),
   _supportedProfiles   = Symbol (),
   _supportedComponents = Symbol (),
   _concreteNodes       = Symbol (),
   _abstractNodes       = Symbol (),
   _fieldTypes          = Symbol (),
   _reject              = Symbol (),
   _fileLoader          = Symbol (),
   _browserCallbacks    = Symbol (),
   _console             = Symbol (),
   _processEvents       = Symbol .for ("X_ITE.X3DRoutingContext.processEvents");

function X3DBrowser (element)
{
   element = $(element);

   if (element .prop ("browser"))
      throw new Error ("Couldn't create browser, element has already a browser.");

   X3DBrowserContext .call (this, element);

   this .addType (X3DConstants .X3DBrowser);

   this [_supportedProfiles]   = SupportedProfiles .copy ();
   this [_supportedComponents] = SupportedComponents .copy ();
   this [_concreteNodes]       = ConcreteNodes .copy ();
   this [_abstractNodes]       = AbstractNodes .copy ();
   this [_fieldTypes]          = FieldTypes .copy ();
   this [_console]             = document .getElementsByClassName ("x_ite-console");

   this [_browserCallbacks] = new Map ([
      [X3DConstants .CONNECTION_ERROR,  new Map ()],
      [X3DConstants .BROWSER_EVENT,     new Map ()],
      [X3DConstants .INITIALIZED_EVENT, new Map ()],
      [X3DConstants .SHUTDOWN_EVENT,    new Map ()],
      [X3DConstants .INITIALIZED_ERROR, new Map ()],
   ]);

   this .setup ();
};

Object .assign (Object .setPrototypeOf (X3DBrowser .prototype, X3DBrowserContext .prototype),
{
   initialize ()
   {
      X3DBrowserContext .prototype .initialize .call (this);

      const scene = new X3DScene (this);

      scene .setup ();

      this .replaceWorld (scene)
         .catch (DEVELOPMENT ? error => console .error (error) : Function .prototype);

      this [_DOMIntegration] = new DOMIntegration (this);

      Legacy .browser (this);

      // Process events from context creation. This will setup nodes like
      // geometry option nodes before any node is created.
      this [_processEvents] .call (this);

      // Print welcome message.

      if (this .getInstanceId () > 1)
         return;

      if (!this .getBrowserOption ("Debug"))
         return;

      this .print (this .getWelcomeMessage ());
   },
   getWelcomeMessage ()
   {
      return `Welcome to ${this .name} X3D Browser v${this .version}:\n` +
             `   Current Graphics Renderer\n` +
             `      Name: ${this .getVendor ()} ${this .getRenderer ()}\n` +
             `      WebGL version: ${this .getWebGLVersion ()}\n` +
             `      Shading language: ${this .getShadingLanguageVersion ()}\n` +
             `      WebXR: ${"xr" in navigator}\n` +
             `   Rendering Properties\n` +
             `      ContentScale: ${this .getRenderingProperty ("ContentScale")}\n` +
             `      Antialiased: ${this .getRenderingProperty ("Antialiased")}\n` +
             `      Max samples: ${this .getMaxSamples ()}\n` +
             `      Depth size: ${this .getDepthSize ()} bits\n` +
             `      Color depth: ${this .getColorDepth ()} bits\n` +
             `      Max clip planes per shape: ${this .getMaxClipPlanes ()}\n` +
             `      Max lights per shape: ${this .getMaxLights ()}\n` +
             `      Max textures per shape: ${this .getMaxTextures ()}\n` +
             `      Max texture size: ${this .getMaxTextureSize ()} × ${this .getMaxTextureSize ()} pixels\n` +
             `      Texture memory: ${this .getTextureMemory () || "n/a"}\n` +
             `      Texture units: ${this .getMaxCombinedTextureUnits ()}\n` +
             `      Max vertex uniform vectors: ${this .getMaxVertexUniformVectors ()}\n` +
             `      Max fragment uniform vectors: ${this .getMaxFragmentUniformVectors ()}\n` +
             `      Max vertex attribs: ${this .getMaxVertexAttribs ()}\n` +
             `      Max varying vectors: ${this .getMaxVaryingVectors ()}\n`;
   },
   getName ()
   {
      return "X_ITE";
   },
   getVersion ()
   {
      return VERSION;
   },
   getDescription ()
   {
      return this .getNotification () ._string .getValue ()
   },
   setDescription (value)
   {
      this .getNotification () ._string = value;
   },
   getWorldURL ()
   {
      return this .currentScene .worldURL;
   },
   getProfile (name)
   {
      const profile = this [_supportedProfiles] .get (String (name));

      if (profile)
         return profile;

      throw Error (`Profile '${name}' is not supported.`);
   },
   addSupportedProfile: function (profile)
   {
      this [_supportedProfiles] .add (profile .name, profile);
   },
   updateSupportedProfile: function (profile)
   {
      this [_supportedProfiles] .update (profile .name, profile .name, profile);
   },
   removeSupportedProfile (name)
   {
      return this [_supportedProfiles] .remove (String (name));
   },
   getSupportedProfile (name)
   {
      const profile = this [_supportedProfiles] .get (String (name));

      if (profile)
         return profile;

      throw new Error (`Supported profile '${name}' does not exists.`);
   },
   getSupportedProfiles ()
   {
      return this [_supportedProfiles];
   },
   getComponent (name, level)
   {
      name   = String (name);
      level |= 0;

      const component = this [_supportedComponents] .get (name);

      if (component)
      {
         return new ComponentInfo (component .name,
            Algorithm .clamp (level || component .level, 1, component .level),
            component .title,
            component .providerURL,
            component .external,
            component .dependencies);
      }

      throw Error (`Component '${name}' at level '${level}' is not supported.`);
   },
   addSupportedComponent (component)
   {
      this [_supportedComponents] .add (component .name, component);
   },
   updateSupportedComponent (component)
   {
      this [_supportedComponents] .update (component .name, component .name, component);
   },
   removeSupportedComponent (name)
   {
      this [_supportedComponents] .remove (String (name));
   },
   getSupportedComponent (name)
   {
      const component = this [_supportedComponents] .get (String (name));

      if (component)
         return component;

      throw new Error (`Supported component '${name}' does not exists.`);
   },
   getSupportedComponents ()
   {
      return this [_supportedComponents];
   },
   loadComponents: (() =>
   {
      function loadComponents (components, seen)
      {
         return Promise .all (components .map (component => loadComponent .call (this, component, seen)));
      }

      async function loadComponent ({ name, providerURL, external, dependencies }, seen)
      {
         if (seen .has (name)) return; seen .add (name);

         await loadComponents .call (this, dependencies .map (name => this [_supportedComponents] .get (name)), seen);

         if (!external)
            return;

         switch (Features .ENVIRONMENT)
         {
            case "NODE":
            {
               global .require (global .require ("url") .fileURLToPath (providerURL));
               break;
            }
            case "BROWSER":
            case "MODULE":
            {
               await import (/* webpackIgnore: true */ providerURL);
               break;
            }
         }
      }

      return function (... args)
      {
         const component = [ ];

         for (const arg of args)
         {
            if (arg instanceof X3DScene)
               component .push (... (arg .profile ?? this .getProfile ("Full")) .components, ... arg .components);

            else if (arg instanceof ProfileInfo)
               component .push (... arg .components);

            else if (arg instanceof ComponentInfoArray)
               component .push (... arg);

            else if (arg instanceof ComponentInfo)
               component .push (arg);

            else if (typeof arg === "string")
               component .push (this .getComponent (arg))
         }

         // Load array of component names.
         return Promise .all ([
            MikkTSpace .initialize (), // Required by Rendering component.
            loadComponents .call (this, component, new Set ()),
         ])
         .then (Function .prototype);
      };
   })(),
   addConcreteNode (ConcreteNode)
   {
      this [_concreteNodes] .add (ConcreteNode .typeName, ConcreteNode);
   },
   updateConcreteNode (ConcreteNode)
   {
      this [_concreteNodes] .update (ConcreteNode .typeName, ConcreteNode .typeName, ConcreteNode);
   },
   removeConcreteNode (ConcreteNode)
   {
      this [_concreteNodes] .remove (ConcreteNode .typeName);
   },
   getConcreteNode (typeName)
   {
      const concreteNode = this [_concreteNodes] .get (String (typeName));

      if (concreteNode)
         return concreteNode;

      throw new Error (`Concrete node '${typeName}' does not exists.`);
   },
   getConcreteNodes ()
   {
      return this [_concreteNodes];
   },
   addAbstractNode (AbstractNode)
   {
      this [_abstractNodes] .add (AbstractNode .typeName, AbstractNode);
   },
   updateAbstractNode (AbstractNode)
   {
      this [_abstractNodes] .update (AbstractNode .typeName, AbstractNode .typeName, AbstractNode);
   },
   removeAbstractNode (AbstractNode)
   {
      this [_abstractNodes] .remove (AbstractNode .typeName);
   },
   getAbstractNode (typeName)
   {
      const abstractNode = this [_abstractNodes] .get (String (typeName));

      if (abstractNode)
         return abstractNode;

      throw new Error (`Abstract node '${typeName}' does not exists.`);
   },
   getAbstractNodes ()
   {
      return this [_abstractNodes];
   },
   getFieldType (typeName)
   {
      const fieldType = this [_fieldTypes] .get (String (typeName));

      if (fieldType)
         return fieldType;

      throw new Error (`Field type '${typeName}' does not exists.`);
   },
   getFieldTypes ()
   {
      return this [_fieldTypes];
   },
   async createScene (profile, ... components)
   {
      const scene = new X3DScene (this);

      if (arguments .length)
      {
         if (!(profile instanceof ProfileInfo))
            throw new Error ("Couldn't create scene: profile must be of type ProfileInfo.");

         scene .setProfile (profile);

         for (const component of components)
         {
            if (!(component instanceof ComponentInfo))
               throw new Error ("Couldn't create scene: component must be of type ComponentInfo.");

            scene .addComponent (component);
         }
      }

      scene .setup ();
      scene .setLive (true);

      await this .loadComponents (scene);

      return scene;
   },
   replaceWorld (scene)
   {
      return new Promise (async (resolve, reject) =>
      {
         this [_fileLoader] ?.abort ();

         this [_reject] ?.("Replacing world aborted.");
         this [_reject] = reject;

         this .setBrowserLoading (true);

         // Remove world.

         if (this .getWorld ())
         {
            // Wait for events to be processed before scene is replaced, to get correct
            // results from getBBox and viewpoint binding in new scene, especially when
            // a SCRIPTED scene is created.
            await this .nextFrame ();

            if (this [_reject] !== reject)
               return;

            this .getExecutionContext () .setLive (false);
            this .shutdown () .processInterests ();
            this .callBrowserCallbacks (X3DConstants .SHUTDOWN_EVENT);
            this .callBrowserEventHandler ("shutdown");
         }

         if (this [_reject] !== reject)
            return;

         // Replace world.

         if (scene instanceof Fields .MFNode)
         {
            // VRML version of replaceWorld has a MFNode value as argument.

            const rootNodes = scene;

            scene = new X3DScene (this);

            for (const node of rootNodes .filter (node => node))
               scene .getLive () .addInterest ("setLive", node .getValue () .getExecutionContext ());

            scene .setRootNodes (rootNodes);
            scene .setup ();
         }

         if (!(scene instanceof X3DScene))
         {
            scene = new X3DScene (this);
            scene .setup ();
         }

         // Detach scene from parent.

         scene .setExecutionContext (null);
         scene .setLive (true);

         // Replace.

         this .setExecutionContext (scene);
         this .setDescription ("");

         this ._loadCount .addInterest ("checkLoadCount", this, resolve, reject);
         this ._loadCount .addEvent ();
      });
   },
   checkLoadCount (resolve, reject, loadCount)
   {
      if (this [_reject] !== reject)
         return;

      if (loadCount .getValue ())
         return;

      loadCount .removeInterest ("checkLoadCount", this);
      this .setBrowserLoading (false);
      this .initialized () .set (this .getCurrentTime ());
      this .initialized () .processInterests ();
      this .callBrowserCallbacks (X3DConstants .INITIALIZED_EVENT);
      this .callBrowserEventHandler ("initialized load");
      resolve ();
   },
   createVrmlFromString (vrmlSyntax)
   {
      const
         external     = this .isExternal (),
         currentScene = this .currentScene,
         worldURL     = external ? this .getBaseURL () : currentScene .getWorldURL (),
         fileLoader   = new FileLoader (this .getScriptNode () ?? this .getWorld ()),
         scene        = fileLoader .createX3DFromString (worldURL, `#VRML V2.0 utf8\n\n${vrmlSyntax}`);

      if (!external)
         scene .setExecutionContext (currentScene);

      scene .setLive (true);

      return scene .rootNodes;
   },
   async createX3DFromString (x3dSyntax)
   {
      x3dSyntax = String (x3dSyntax);

      const
         external     = this .isExternal (),
         currentScene = this .currentScene,
         worldURL     = external ? this .getBaseURL () : currentScene .getWorldURL (),
         fileLoader   = new FileLoader (this .getScriptNode () ?? this .getWorld ());

      const scene = await new Promise ((resolve, reject) =>
      {
         fileLoader .createX3DFromString (worldURL, x3dSyntax, resolve, reject);
      });

      if (!external)
         scene .setExecutionContext (currentScene);

      scene .setLive (true);

      return scene;
   },
   createVrmlFromURL (url, node, event)
   {
      node  = X3DCast (X3DConstants .X3DNode, node, false);
      event = String (event);

      if (!(url instanceof Fields .MFString))
         throw new Error ("Browser.createVrmlFromURL: url must be of type MFString.");

      if (!node)
         throw new Error ("Browser.createVrmlFromURL: node must be of type X3DNode.");

      const field = node .getField (event);

      if (!field .isInput ())
         throw new Error (`Browser.createVrmlFromURL: event named '${event}' must be a input field.`);

      if (field .getType () !== X3DConstants .MFNode)
         throw new Error (`Browser.createVrmlFromURL: event named '${event}' must be of type MFNode.`);

      const
         currentScene = this .currentScene,
         external     = this .isExternal (),
         fileLoader   = new FileLoader (this .getScriptNode () ?? this .getWorld ());

      this .addLoadingObject (fileLoader);

      fileLoader .createX3DFromURL (url, null, scene =>
      {
         this .removeLoadingObject (fileLoader);

         if (!scene)
            return;

         // Handle getLive for script scenes here:

         if (!external)
            scene .setExecutionContext (currentScene);

         scene .setLive (true);

         // Wait until scene is completely loaded, scene ._loadCount must be 0.
         field .setValue (scene .rootNodes);
      });
   },
   createX3DFromURL (url, node, event)
   {
      if (arguments .length === 3)
         return this .createVrmlFromURL (url, node, event);

      // arguments .length === 1

      if (!(url instanceof Fields .MFString))
         throw new Error ("Browser.createX3DFromURL: url must be of type MFString.");

      return new Promise ((resolve, reject) =>
      {
         const
            currentScene = this .currentScene,
            external     = this .isExternal (),
            fileLoader   = new FileLoader (this .getScriptNode () ?? this .getWorld ());

         this .addLoadingObject (fileLoader);

         fileLoader .createX3DFromURL (url, null, scene =>
         {
            this .removeLoadingObject (fileLoader);

            if (scene)
            {
               if (!external)
                  scene .setExecutionContext (currentScene);

               scene .setLive (true);

               resolve (scene);
            }
            else
            {
               reject (new Error ("Couldn't load X3D file."));
            }
         })
      });
   },
   loadURL (url, parameter = new Fields .MFString ())
   {
      return new Promise ((resolve, reject) =>
      {
         if (!(url instanceof Fields .MFString))
            throw new Error ("Browser.loadURL: url must be of type MFString.");

         if (!(parameter instanceof Fields .MFString))
            throw new Error ("Browser.loadURL: parameter must be of type MFString.");

         // Start loading.

         const fileLoader = new FileLoader (this .getScriptNode () ?? this .getWorld ());

         fileLoader .createX3DFromURL (url, parameter, async scene =>
         {
            fileLoader .ready = true;

            if (this [_fileLoader] !== fileLoader)
            {
               this .removeLoadingObject (fileLoader);
               reject (new Error ("Loading of X3D file aborted."));
            }
            else
            {
               if (!this .getBrowserOption ("SplashScreen"))
                  this .getCanvas () .show ();

               if (scene)
               {
                  this .addLoadingObject (this); // Prevent resetLoadCount.
                  this .replaceWorld (scene) .then (resolve) .catch (reject);
                  this .removeLoadingObject (this);
                  this .removeLoadingObject (fileLoader);
               }
               else
               {
                  this .callBrowserCallbacks (X3DConstants .CONNECTION_ERROR);
                  this .callBrowserEventHandler ("error");

                  setTimeout (() =>
                  {
                     this .getSplashScreen ()
                        .find (".x_ite-private-spinner-text")
                        .text (_ ("Failed loading world."));
                  });

                  reject (new Error ("Couldn't load X3D file."));
               }
            }
         },
         (fragment) =>
         {
            fileLoader .ready = true;

            this .changeViewpoint (fragment);
            this .removeLoadingObject (fileLoader);

            resolve ();
         },
         (url, target) =>
         {
            fileLoader .ready = true;

            if (target)
               window .open (url, target);
            else
               location = url;

            this .removeLoadingObject (fileLoader);

            resolve ();
         });

         if (!fileLoader .ready)
         {
            this [_fileLoader] ?.abort ();

            this .setBrowserLoading (true);
            this .addLoadingObject (this [_fileLoader] = fileLoader);
         }
      });
   },
   addBrowserListener (callback, object)
   {
      // The string describes the name of the callback function to be called within the current ECMAScript context.
   },
   removeBrowserListener (callback)
   {
      // The string describes the name of the callback function to be called within the current ECMAScript context.
   },
   addBrowserCallback (... args)
   {
      switch (args .length)
      {
         case 2:
         {
            const [key, object] = args;

            for (const [event, map] of this [_browserCallbacks])
               this [_browserCallbacks] .set (event, new Map (map) .set (key, object));

            break;
         }
         case 3:
         {
            const
               [key, event, object] = args,
               map                  = new Map (this [_browserCallbacks] .get (event));

            this [_browserCallbacks] .set (event, map);

            map .set (key, object);
            break;
         }
      }
   },
   removeBrowserCallback (... args)
   {
      switch (args .length)
      {
         case 1:
         {
            const [key] = args;

            for (const map of this [_browserCallbacks] .values ())
               map .delete (key);

            break;
         }
         case 2:
         {
            const [key, event] = args;

            this [_browserCallbacks] .get (event) .delete (key);
            break;
         }
      }
   },
   getBrowserCallbacks (event)
   {
      if (arguments .length === 1)
         return this [_browserCallbacks] .get (event);
      else
         return new Map ([... this [_browserCallbacks]] .flatMap (([event, map]) => [... map]));
   },
   callBrowserCallbacks (event)
   {
      for (const callback of this [_browserCallbacks] .get (event) .values ())
         callback (event);
   },
   async importDocument (dom)
   {
      const
         currentScene = this .currentScene,
         scene        = new X3DScene (this),
         external     = this .isExternal ();

      const parser = new XMLParser (scene);

      parser .setInput (dom)

      await new Promise (parser .parseIntoScene .bind (parser));

      if (!external)
         scene .setExecutionContext (currentScene);

      scene .isLive (true);

      return scene;
   },
   async importJS (json)
   {
      const
         currentScene = this .currentScene,
         scene        = new X3DScene (this),
         external     = this .isExternal ();

      const parser = new JSONParser (scene);

      parser .setInput (json);

      await new Promise (parser .parseIntoScene .bind (parser));

      if (!external)
         scene .setExecutionContext (currentScene);

      scene .isLive (true);

      return scene;
   },
   getBrowserProperty (name)
   {
      return this .getBrowserProperties () .getField (name) .getValue ();
   },
   setBrowserOption (name, value)
   {
      this .getBrowserOptions () .getField (name) .setValue (value);
   },
   getBrowserOption (name)
   {
      return this .getBrowserOptions () .getField (name) .getValue ();
   },
   getRenderingProperty (name)
   {
      return this .getRenderingProperties () .getField (name) .getValue ();
   },
   viewAll (layerNode, transitionTime = 1)
   {
      if (arguments .length === 1 && typeof layerNode === "number")
         transitionTime = layerNode;

      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      layerNode ?.viewAll (transitionTime, 1, this .getBrowserOption ("StraightenHorizon"));
   },
   firstViewpoint (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      const viewpoints = layerNode ?.getUserViewpoints ();

      if (viewpoints ?.length)
         this .bindViewpoint (layerNode, viewpoints .at (0));
   },
   previousViewpoint (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      const viewpoints = layerNode ?.getUserViewpoints ();

      if (!viewpoints ?.length)
         return;

      const i = viewpoints .findIndex (viewpointNode => viewpointNode ._isBound .getValue ());

      this .bindViewpoint (layerNode, viewpoints .at (i > -1 ? i - 1 : -1));
   },
   nextViewpoint (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      const viewpoints = layerNode ?.getUserViewpoints ();

      if (!viewpoints ?.length)
         return;

      const i = viewpoints .findIndex (viewpointNode => viewpointNode ._isBound .getValue ());

      this .bindViewpoint (layerNode, viewpoints .at ((i + 1) % viewpoints .length));
   },
   lastViewpoint (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      const viewpoints = layerNode ?.getUserViewpoints ();

      if (viewpoints ?.length)
         this .bindViewpoint (layerNode, viewpoints .at (-1));
   },
   changeViewpoint (layerNode, name)
   {
      if (arguments .length === 1)
      {
         name      = String (layerNode);
         layerNode = this .getActiveLayer ();
      }

      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      const viewpointNode = layerNode ?.getViewpoints () .get ()
         .find (viewpointNode => viewpointNode .getName () === name);

      if (viewpointNode)
         this .bindViewpoint (layerNode, viewpointNode);
   },
   bindViewpoint (layerNode, viewpointNode)
   {
      layerNode     = X3DCast (X3DConstants .X3DLayerNode,     layerNode);
      viewpointNode = X3DCast (X3DConstants .X3DViewpointNode, viewpointNode);

      if (!layerNode)
         throw new Error ("Browser.bindViewpoint: layerNode must be of type X3DLayerNode.")

      if (!viewpointNode)
         throw new Error ("Browser.bindViewpoint: viewpointNode must be of type X3DViewpointNode.")

      viewpointNode .setVRMLTransition (true);

      viewpointNode ._set_bind = true;
   },
   addRoute (sourceNode, sourceField, destinationNode, destinationField)
   {
      this .currentScene .addRoute (sourceNode, sourceField, destinationNode, destinationField);
   },
   deleteRoute (sourceNode, sourceField, destinationNode, destinationField)
   {
      this .currentScene .deleteRoute (sourceNode, sourceField, destinationNode, destinationField);
   },
   beginUpdate ()
   {
      this .setLive (true);
      this .advanceTime ();
      this .addBrowserEvent ();
   },
   endUpdate ()
   {
      this .setLive (false);
   },
   print (... args)
   {
      const string = args .join (" ");

      console .log (string);

      for (const element of this [_console])
         element .append (document .createTextNode (string));
   },
   println (... args)
   {
      const string = args .join (" ");

      console .log (string);

      for (const element of this [_console])
         element .append (document .createTextNode (`${string}\n`));
   },
   toVRMLStream (generator)
   {
      this .currentScene .toVRMLStream (generator);
   },
   toXMLStream (generator)
   {
      this .currentScene .toXMLStream (generator);
   },
   toJSONStream (generator)
   {
      this .currentScene .toJSONStream (generator);
   },
   dispose ()
   {
      this [_DOMIntegration] .dispose ();

      X3DBrowserContext .prototype .dispose .call (this);
   },
});

for (const key of Object .keys (X3DBrowser .prototype))
   Object .defineProperty (X3DBrowser .prototype, key, { enumerable: false });

Object .defineProperties (X3DBrowser .prototype,
{
   name:
   {
      get: X3DBrowser .prototype .getName,
      enumerable: true,
   },
   version:
   {
      value: VERSION,
      enumerable: true,
   },
   providerURL:
   {
      get: X3DBrowser .prototype .getProviderURL,
      enumerable: true,
   },
   providerUrl: // legacy
   {
      get: X3DBrowser .prototype .getProviderURL,
      enumerable: false,
   },
   currentFrameRate:
   {
      get: X3DBrowser .prototype .getCurrentFrameRate,
      enumerable: true,
   },
   currentSpeed:
   {
      get: X3DBrowser .prototype .getCurrentSpeed,
      enumerable: true,
   },
   description:
   {
      get: X3DBrowser .prototype .getDescription,
      set: X3DBrowser .prototype .setDescription,
      enumerable: true,
   },
   baseURL:
   {
      get: X3DBrowser .prototype .getBaseURL,
      set: X3DBrowser .prototype .setBaseURL,
      enumerable: true,
   },
   supportedProfiles:
   {
      get: X3DBrowser .prototype .getSupportedProfiles,
      enumerable: true,
   },
   supportedComponents:
   {
      get: X3DBrowser .prototype .getSupportedComponents,
      enumerable: true,
   },
   concreteNodes:
   {
      get: X3DBrowser .prototype .getConcreteNodes,
      enumerable: true,
   },
   abstractNodes:
   {
      get: X3DBrowser .prototype .getAbstractNodes,
      enumerable: true,
   },
   fieldTypes:
   {
      get: X3DBrowser .prototype .getFieldTypes,
      enumerable: true,
   },
   currentScene:
   {
      get ()
      {
         return this .getScriptNode () ?.getExecutionContext () ?? this .getExecutionContext ();
      },
      enumerable: true,
   },
   activeLayer:
   {
      get ()
      {
         if (this .getActiveLayer () === this .getWorld () .getLayer0 ())
            return null;

         return this ._activeLayer .valueOf ();
      },
      enumerable: true,
   },
   activeNavigationInfo:
   {
      get ()
      {
         if (this .getActiveNavigationInfo () === this .getActiveLayer () ?.getNavigationInfoStack () .get () [0])
            return null;

         return this ._activeNavigationInfo .valueOf ();
      },
      enumerable: true,
   },
   activeViewpoint:
   {
      get ()
      {
         if (this .getActiveViewpoint () === this .getActiveLayer () ?.getViewpointStack () .get () [0])
            return null;

         return this ._activeViewpoint .valueOf ();
      },
      enumerable: true,
   },
   contextMenu:
   {
      get: X3DBrowser .prototype .getContextMenu,
      enumerable: true,
   },
   element:
   {
      get ()
      {
         return this .getElement () .get (0);
      },
      enumerable: true,
   },
});

Object .defineProperties (X3DBrowser,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .outputOnly, "activeLayer",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "activeNavigationInfo", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "activeViewpoint",      new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
   typeName:
   {
      value: "X3DBrowser",
      enumerable: true,
   },
});

X3DConstants .addConstant (X3DBrowser .typeName);

export default X3DBrowser;

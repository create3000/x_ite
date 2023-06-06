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

import VERSION             from "./VERSION.js";
import Fields              from "../Fields.js";
import Components          from "../Components.js";
import X3DBrowserContext   from "./X3DBrowserContext.js";
import DOMIntegration      from "./DOMIntegration.js";
import Legacy              from "./Legacy.js";
import ProfileInfo         from "../Configuration/ProfileInfo.js";
import ComponentInfo       from "../Configuration/ComponentInfo.js";
import ComponentInfoArray  from "../Configuration/ComponentInfoArray.js";
import SupportedProfiles   from "../Configuration/SupportedProfiles.js";
import SupportedComponents from "../Configuration/SupportedComponents.js";
import AbstractNodes       from "../Configuration/AbstractNodes.js"
import ConcreteNodes       from "../Configuration/ConcreteNodes.js"
import X3DScene            from "../Execution/X3DScene.js";
import FileLoader          from "../InputOutput/FileLoader.js";
import XMLParser           from "../Parser/XMLParser.js";
import JSONParser          from "../Parser/JSONParser.js";
import X3DCast             from "../Base/X3DCast.js";
import X3DConstants        from "../Base/X3DConstants.js";
import Features            from "./Networking/Features.js";
import Algorithm           from "../../standard/Math/Algorithm.js";
import MapUtilities        from "../../standard/Utility/MapUtilities.js";
import _                   from "../../locale/gettext.js";

X3DConstants .addNode (X3DBrowser);

const
   _DOMIntegration   = Symbol (),
   _reject           = Symbol (),
   _fileLoader       = Symbol (),
   _browserCallbacks = Symbol (),
   _console          = Symbol (),
   _processEvents    = Symbol .for ("X_ITE.X3DRoutingContext.processEvents");

function X3DBrowser (element)
{
   element = $(element);

   if (element .prop ("browser"))
      throw new Error ("Couldn't create browser, element has already a browser.");

   X3DBrowserContext .call (this, element);

   this .addType (X3DConstants .X3DBrowser);

   this [_browserCallbacks] = new Map ();
   this [_console]          = document .getElementsByClassName ("x_ite-console");

   this .setup ();
};

X3DBrowser .prototype = Object .assign (Object .create (X3DBrowserContext .prototype),
{
   constructor: X3DBrowser,
   initialize: function ()
   {
      X3DBrowserContext .prototype .initialize .call (this);

      this .replaceWorld (this .createScene ()) .catch (Function .prototype);

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

      this .printWelcomeMessage ();
   },
   printWelcomeMessage: function ()
   {
      this .print ("Welcome to " + this .name + " X3D Browser v" + this .version + ":\n" +
                   "   Current Graphics Renderer\n" +
                   "      Name: " + this .getVendor () + " " + this .getRenderer () + "\n" +
                   "      WebGL version: " + this .getWebGLVersion () + "\n" +
                   "      Shading language: " + this .getShadingLanguageVersion () + "\n" +
                   "   Rendering Properties\n" +
                   "      Antialiased: " + this .getAntialiased () + "\n" +
                   "      Max samples: " + this .getMaxSamples () + "\n" +
                   "      Depth size: " + this .getDepthSize () + " bits\n" +
                   "      Color depth: " + this .getColorDepth () + " bits\n" +
                   "      Max clip planes per shape: " + this .getMaxClipPlanes () + "\n" +
                   "      Max lights per shape: " + this .getMaxLights () + "\n" +
                   "      Max multi textures per shape: " + this .getMaxTextures () + "\n" +
                   "      Texture units: " + this .getMaxCombinedTextureUnits () + "\n" +
                   "      Max texture size: " + this .getMaxTextureSize () + " × " + this .getMaxTextureSize () + " pixels\n" +
                   "      Texture memory: " + this .getTextureMemory () + "\n" +
                   "      Max vertex uniform vectors: " + this .getMaxVertexUniformVectors () + "\n" +
                   "      Max fragment uniform vectors: " + this .getMaxFragmentUniformVectors () + "\n" +
                   "      Max vertex attribs: " + this .getMaxVertexAttribs () + "\n" +
                   "      Max varying vectors: " + this .getMaxVaryingVectors () + "\n");
   },
   getName: function ()
   {
      return "X_ITE";
   },
   getVersion: function ()
   {
      return VERSION;
   },
   getDescription: function ()
   {
      return this .getNotification () ._string .getValue ()
   },
   setDescription: function (value)
   {
      this .getNotification () ._string = value;
   },
   getWorldURL: function ()
   {
      return this .currentScene .worldURL;
   },
   getProfile: function (name)
   {
      name = String (name);

      const profile = SupportedProfiles .get (name);

      if (profile)
         return profile;

      throw Error ("Profile '" + name + "' is not supported.");
   },
   getSupportedProfiles: function ()
   {
      return SupportedProfiles;
   },
   getComponent: function (name, level = 0)
   {
      name   = String (name);
      level |= 0;

      const component = SupportedComponents .get (name);

      if (component)
      {
         return new ComponentInfo (name,
            Algorithm .clamp (level || component .level, 1, component .level),
            component .title,
            component .providerUrl,
            component .external,
            component .dependencies);
      }

      throw Error ("Component '" + name + "' at level '" + level + "' is not supported.");
   },
   getSupportedComponents: function ()
   {
      return SupportedComponents;
   },
   loadComponents: (function ()
   {
      function loadComponents (componentNames, seen)
      {
         return Promise .all (Array .from (componentNames, name => loadComponent (name, seen)))
      }

      async function loadComponent (name, seen)
      {
         if (seen .has (name)) return; seen .add (name);

         const component = SupportedComponents .get (name);

         await loadComponents (component .dependencies, seen);

         if (!component .external)
            return;

         if (Features .NODE_ENV)
            global .require (global .require ("url") .fileURLToPath (component .providerUrl))
         else
            await import (/* webpackIgnore: true */ component .providerUrl);
      }

      return function (arg)
      {
         if (arg instanceof ProfileInfo)
            return this .loadComponents (arg .components);

         if (arg instanceof ComponentInfoArray)
            return this .loadComponents (Array .from (arg, ({name}) => name));

         if (arg instanceof ComponentInfo)
            return this .loadComponents ([arg .name]);

         // Load array of component names.
         return loadComponents (arg, new Set ());
      };
   })(),
   addConcreteNode: function (typeName, ConcreteNode)
   {
      ConcreteNodes .add (String (typeName), ConcreteNode);
   },
   updateConcreteNode: function (typeName, ConcreteNode)
   {
      ConcreteNodes .update (String (typeName), String (typeName), ConcreteNode);
   },
   removeConcreteNode: function (typeName)
   {
      ConcreteNodes .remove (String (typeName));
   },
   getConcreteNode: function (typeName)
   {
      return ConcreteNodes .get (String (typeName));
   },
   getConcreteNodes: function ()
   {
      return ConcreteNodes;
   },
   addAbstractNode: function (typeName, AbstractNode)
   {
      AbstractNodes .add (String (typeName), AbstractNode);
   },
   updateAbstractNode: function (typeName, AbstractNode)
   {
      AbstractNodes .update (String (typeName), String (typeName), AbstractNode);
   },
   removeAbstractNode: function (typeName)
   {
      AbstractNodes .remove (String (typeName));
   },
   getAbstractNode: function (typeName)
   {
      return AbstractNodes .get (String (typeName));
   },
   getAbstractNodes: function ()
   {
      return AbstractNodes;
   },
   createScene: function (profile, ... components)
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

      return scene;
   },
   replaceWorld: function (scene)
   {
      return new Promise ((resolve, reject) =>
      {
         this [_fileLoader] ?.abort ();

         this [_reject] ?.("Replacing world aborted.");
         this [_reject] = reject;

         // Remove world.

         if (this .initialized () .getValue ())
         {
            this .getExecutionContext () .setLive (false);
            this .shutdown () .processInterests ();
            this .callBrowserCallbacks (X3DConstants .SHUTDOWN_EVENT);
            this .callBrowserEventHandler ("shutdown");
         }

         // Replace world.

         if (scene instanceof Fields .MFNode)
         {
            // VRML version of replaceWorld has a MFNode value as argument.

            const rootNodes = scene;

            scene = this .createScene ();

            for (const node of rootNodes .filter (node => node))
               scene .getLive () .addInterest ("setLive", node .getValue () .getExecutionContext ());

            scene .setRootNodes (rootNodes);
         }

         if (!(scene instanceof X3DScene))
            scene = this .createScene ();

         // Detach scene from parent.

         scene .getExecutionContext () .getLive () .removeInterest ("setLive", scene);
         scene .setExecutionContext (scene);

         // Replace.

         this .setDescription ("");
         this .getBrowserOptions () .configure ();
         this .setBrowserLoading (true);
         this ._loadCount .addInterest ("checkLoadCount", this, resolve);

         for (const object of scene .getLoadingObjects ())
            this .addLoadingObject (object);

         this .setExecutionContext (scene);
         this .getWorld () .bindBindables ();

         scene .setLive (this .isLive ());
      });
   },
   checkLoadCount: function (resolve, loadCount)
   {
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
   createVrmlFromString: function (vrmlSyntax)
   {
      vrmlSyntax = String (vrmlSyntax);

      const
         currentScene = this .currentScene,
         external     = this .isExternal (),
         fileLoader   = new FileLoader (this .getWorld ()),
         scene        = fileLoader .createX3DFromString (currentScene .getWorldURL (), vrmlSyntax);

      if (!external)
      {
         currentScene .getLive () .addInterest ("setLive", scene);
         scene .setExecutionContext (currentScene);
         scene .setLive (currentScene .isLive ());
      }

      return scene .rootNodes;
   },
   createX3DFromString: async function (x3dSyntax)
   {
      x3dSyntax = String (x3dSyntax);

      const
         currentScene = this .currentScene,
         external     = this .isExternal (),
         fileLoader   = new FileLoader (this .getWorld ());

      const scene = await new Promise ((resolve, reject) =>
      {
         fileLoader .createX3DFromString (currentScene .getWorldURL (), x3dSyntax, resolve, reject);
      });

      if (!external)
      {
         currentScene .getLive () .addInterest ("setLive", scene);
         scene .setExecutionContext (currentScene);
         scene .setLive (currentScene .isLive ());
      }

      return scene;
   },
   createVrmlFromURL: function (url, node, event)
   {
      node  = X3DCast (X3DConstants .X3DNode, node, false);
      event = String (event);

      if (!(url instanceof Fields .MFString))
         throw new Error ("Browser.createVrmlFromURL: url must be of type MFString.");

      if (!node)
         throw new Error ("Browser.createVrmlFromURL: node must be of type X3DNode.");

      const field = node .getField (event);

      if (!field .isInput ())
         throw new Error ("Browser.createVrmlFromURL: event named '" + event + "' must be a input field.");

      if (field .getType () !== X3DConstants .MFNode)
         throw new Error ("Browser.createVrmlFromURL: event named '" + event + "' must be of type MFNode.");

      const
         currentScene = this .currentScene,
         external     = this .isExternal (),
         fileLoader   = new FileLoader (this .getWorld ());

      this .addLoadingObject (fileLoader);

      fileLoader .createX3DFromURL (url, null, (scene) =>
      {
         this .removeLoadingObject (fileLoader);

         if (scene)
         {
            // Handle getLive for script scenes here:

            if (!external)
            {
               currentScene .getLive () .addInterest ("setLive", scene);
               scene .setExecutionContext (currentScene);
               scene .setLive (currentScene .isLive ());
            }

            // Wait until scene is completely loaded, scene ._loadCount must be 0.
            field .setValue (scene .rootNodes);
         }
      });
   },
   createX3DFromURL: function (url, node, event)
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
            fileLoader   = new FileLoader (this .getWorld ());

         this .addLoadingObject (fileLoader);

         fileLoader .createX3DFromURL (url, null, (scene) =>
         {
            this .removeLoadingObject (fileLoader);

            if (scene)
            {
               if (!external)
               {
                  currentScene .getLive () .addInterest ("setLive", scene);
                  scene .setExecutionContext (currentScene);
                  scene .setLive (currentScene .isLive ());
               }

               resolve (scene);
            }
            else
            {
               reject (new Error ("Couldn't load X3D file."));
            }
         })
      });
   },
   loadURL: function (url, parameter = new Fields .MFString ())
   {
      return new Promise ((resolve, reject) =>
      {
         if (!(url instanceof Fields .MFString))
            throw new Error ("Browser.loadURL: url must be of type MFString.");

         if (!(parameter instanceof Fields .MFString))
            throw new Error ("Browser.loadURL: parameter must be of type MFString.");

         // Start loading.

         const fileLoader = new FileLoader (this .getWorld ());

         fileLoader .createX3DFromURL (url, parameter, (scene) =>
         {
            if (this [_fileLoader] !== fileLoader)
            {
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
   addBrowserListener: function (callback, object)
   {
      // The string describes the name of the callback function to be called within the current ECMAScript context.
   },
   removeBrowserListener: function (callback)
   {
      // The string describes the name of the callback function to be called within the current ECMAScript context.
   },
   addBrowserCallback: function (key, object)
   {
      this [_browserCallbacks] .set (key, object);
   },
   removeBrowserCallback: function (key)
   {
      this [_browserCallbacks] .delete (key);
   },
   getBrowserCallbacks: function ()
   {
      return this [_browserCallbacks];
   },
   callBrowserCallbacks: (function ()
   {
      const browserCallbacks = [ ];

      return function (browserEvent)
      {
         if (this [_browserCallbacks] .size)
         {
            for (const browserCallback of MapUtilities .values (browserCallbacks, this [_browserCallbacks]))
            {
               browserCallback (browserEvent);
            }
         }
      };
   })(),
   importDocument: function (dom)
   {
      const
         currentScene = this .currentScene,
         scene        = this .createScene (),
         external     = this .isExternal ();

      if (!external)
      {
         currentScene .getLive () .addInterest ("setLive", scene);
         scene .setExecutionContext (currentScene);
         scene .setLive (currentScene .isLive ());
      }

      const parser = new XMLParser (scene);

      parser .setInput (dom)

      return new Promise (parser .parseIntoScene .bind (parser));
   },
   importJS: function (json)
   {
      const
         currentScene = this .currentScene,
         scene        = this .createScene (),
         external     = this .isExternal ();

      if (!external)
      {
         currentScene .getLive () .addInterest ("setLive", scene);
         scene .setExecutionContext (currentScene);
         scene .setLive (currentScene .isLive ());
      }

      const parser = new JSONParser (scene);

      parser .setInput (json);

      return new Promise (parser .parseIntoScene .bind (parser));
   },
   getBrowserProperty: function (name)
   {
      return this .getBrowserProperties () .getField (name) .getValue ();
   },
   setBrowserOption: function (name, value)
   {
      this .getBrowserOptions () .getField (name) .setValue (value);
   },
   getBrowserOption: function (name)
   {
      return this .getBrowserOptions () .getField (name) .getValue ();
   },
   getRenderingProperty: function (name)
   {
      return this .getRenderingProperties () .getField (name) .getValue ();
   },
   viewAll: function (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      if (!layerNode)
         return;

      layerNode .viewAll (1, this .getBrowserOption ("StraightenHorizon"));
   },
   firstViewpoint: function (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      const viewpoints = layerNode .getUserViewpoints ();

      if (viewpoints .length)
         this .bindViewpoint (layerNode, viewpoints [0]);
   },
   previousViewpoint: function (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      if (!layerNode)
         return;

      const viewpoints = layerNode .getUserViewpoints ();

      if (viewpoints .length === 0)
         return;

      for (var i = 0, length = viewpoints .length; i < length; ++ i)
      {
         if (viewpoints [i] ._isBound .getValue ())
            break;
      }

      if (i < viewpoints .length)
      {
         if (i === 0)
            this .bindViewpoint (layerNode, viewpoints .at (-1));

         else
            this .bindViewpoint (layerNode, viewpoints [i - 1]);
      }
      else
         this .bindViewpoint (layerNode, viewpoints .at (-1));
   },
   nextViewpoint: function (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      if (!layerNode)
         return;

      const viewpoints = layerNode .getUserViewpoints ();

      if (viewpoints .length === 0)
         return;

      for (var i = 0, length = viewpoints .length; i < length; ++ i)
      {
         if (viewpoints [i] ._isBound .getValue ())
            break;
      }

      if (i < viewpoints .length)
      {
         if (i === viewpoints .length - 1)
            this .bindViewpoint (layerNode, viewpoints [0]);

         else
            this .bindViewpoint (layerNode, viewpoints [i + 1]);
      }
      else
         this .bindViewpoint (layerNode, viewpoints [0]);
   },
   lastViewpoint: function (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      if (!layerNode)
         return;

      const viewpoints = layerNode .getUserViewpoints ();

      if (viewpoints .length)
         this .bindViewpoint (layerNode, viewpoints .at (-1));
   },
   changeViewpoint: function (layerNode, name)
   {
      if (arguments .length === 1)
      {
         name      = String (layerNode);
         layerNode = this .getActiveLayer ();
      }

      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode) ?? this .getActiveLayer ();

      if (!layerNode)
         return;

      for (const viewpointNode of layerNode .getViewpoints () .get ())
      {
         if (viewpointNode .getName () !== name)
            continue;

         this .bindViewpoint (layerNode, viewpointNode);
         break;
      }
   },
   bindViewpoint: function (layerNode, viewpointNode)
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
   addRoute: function (fromNode, fromEventOut, toNode, toEventIn)
   {
      this .currentScene .addRoute (fromNode, fromEventOut, toNode, toEventIn);
   },
   deleteRoute: function (fromNode, fromEventOut, toNode, toEventIn)
   {
      try
      {
         const route = this .currentScene .getRoute (fromNode, fromEventOut, toNode, toEventIn);

         if (route)
            this .currentScene .deleteRoute (route);
      }
      catch (error)
      {
         console .error (error);
      }
   },
   beginUpdate: function ()
   {
      this .setLive (true);
      this .getExecutionContext () .setLive (true);
      this .advanceTime ();
      this .addBrowserEvent ();
   },
   endUpdate: function ()
   {
      this .setLive (false);
      this .getExecutionContext () .setLive (false);
   },
   print: function (... args)
   {
      const string = args .join ("");

      console .log (string);

      for (const element of this [_console])
         element .append (document .createTextNode (string));
   },
   println: function (... args)
   {
      const string = args .join ("");

      console .log (string);

      for (const element of this [_console])
         element .append (document .createTextNode (string + "\n"));
   },
   toVRMLStream: function (generator)
   {
      this .currentScene .toVRMLStream (generator);
   },
   toXMLStream: function (generator)
   {
      this .currentScene .toXMLStream (generator);
   },
   toJSONStream: function (generator)
   {
      this .currentScene .toJSONStream (generator);
   },
});

for (const key of Reflect .ownKeys (X3DBrowser .prototype))
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
   currentScene:
   {
      get: function ()
      {
         return this .getScriptStack () .at (-1) .getExecutionContext ();
      },
      enumerable: true,
   },
   supportedProfiles:
   {
      value: SupportedProfiles,
      enumerable: true,
   },
   supportedComponents:
   {
      value: SupportedComponents,
      enumerable: true,
   },
   concreteNodes:
   {
      value: ConcreteNodes,
      enumerable: true,
   },
   abstractNodes:
   {
      value: AbstractNodes,
      enumerable: true,
   },
});

Object .defineProperties (X3DBrowser,
{
   typeName:
   {
      value: "X3DBrowser",
      enumerable: true,
   },
});

export default X3DBrowser;

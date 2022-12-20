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
import X3DLayerNode        from "../Components/Layering/X3DLayerNode.js";
import X3DBrowserContext   from "./X3DBrowserContext.js";
import DOMIntegration      from "./DOMIntegration.js";
import legacy              from "./Legacy.js";
import ProfileInfo         from "../Configuration/ProfileInfo.js";
import ComponentInfo       from "../Configuration/ComponentInfo.js";
import ComponentInfoArray  from "../Configuration/ComponentInfoArray.js";
import SupportedProfiles   from "../Configuration/SupportedProfiles.js";
import SupportedComponents from "../Configuration/SupportedComponents.js";
import SupportedNodes      from "../Configuration/SupportedNodes.js";
import Scene               from "../Execution/Scene.js";
import X3DScene            from "../Execution/X3DScene.js";
import FileLoader          from "../InputOutput/FileLoader.js";
import XMLParser           from "../Parser/XMLParser.js";
import JSONParser          from "../Parser/JSONParser.js";
import X3DCast             from "../Base/X3DCast.js";
import X3DConstants        from "../Base/X3DConstants.js";
import Features            from "./Networking/Features.js";
import MapUtilities        from "../../standard/Utility/MapUtilities.js";
import _                   from "../../locale/gettext.js";

const
   _DOMIntegration   = Symbol (),
   _loader           = Symbol (),
   _browserCallbacks = Symbol ();

function X3DBrowser (element)
{
   element = $(element);

   if (element .data ("browser"))
      throw new Error ("Couldn't create browser, element has already a browser.");

   element .data ("browser", this);

   X3DBrowserContext .call (this, element);

   this [_browserCallbacks] = new Map ();

   this .setup ();
};

X3DBrowser .prototype = Object .assign (Object .create (X3DBrowserContext .prototype),
{
   constructor: X3DBrowser,
   getTypeName: function ()
   {
      return "X3DBrowser";
   },
   getComponentName: function ()
   {
      return "X_ITE";
   },
   getContainerField: function ()
   {
      return "browser";
   },
   initialize: function ()
   {
      X3DBrowserContext .prototype .initialize .call (this);

      this .replaceWorld (this .createScene ());

      this [_DOMIntegration] = new DOMIntegration (this);

      legacy .call (this);

      // Print welcome message.

      if (this .getInstanceId () > 1) return;

      this .print ("Welcome to " + this .name + " X3D Browser v" + this .version + ":\n" +
                   "   Current Graphics Renderer\n" +
                   "      Name: " + this .getVendor () + " " + this .getRenderer () + "\n" +
                   "      WebGL version: " + this .getWebGLVersion () + "\n" +
                   "      Shading language: " + this .getShadingLanguageVersion () + "\n" +
                   "   Rendering Properties\n" +
                   "      Antialiased: " + this .getAntialiased () + "\n" +
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
   getComponent: function (name, level)
   {
      name  = String (name);
      level = ~~level;

      const component = SupportedComponents .get (name);

      if (component)
      {
         if (level <= component .level || true)
         {
            return new ComponentInfo ({
               name: name,
               level: level,
               title: component .title,
               providerUrl: component .providerUrl,
               external: $.data (component, "external"),
               dependencies: $.data (component, "dependencies"),
            });
         }
      }

      throw Error ("Component '" + name + "' at level '" + level + "' is not supported.");
   },
   getSupportedComponents: function ()
   {
      return SupportedComponents;
   },
   loadComponents: (function ()
   {
      function loadComponents (browser, components, seen)
      {
         return Promise .all (components .map (name => loadComponent (browser, name, seen)))
      }

      async function loadComponent (browser, name, seen)
      {
         if (seen .has (name)) return; seen .add (name);

         const component = browser .getSupportedComponents () .get (name);

         await loadComponents (browser, $.data (component, "dependencies"), seen);

         if (! $.data (component, "external"))
            return;

         if (Features .NODE_ENV)
            global .require (global .require ("url") .fileURLToPath (component .providerUrl))
         else
            await import (/* webpackIgnore: true */ component .providerUrl);
      }

      return function (argument)
      {
         if (argument instanceof ProfileInfo)
            return this .loadComponents (argument .components);

         if (argument instanceof ComponentInfoArray)
            return this .loadComponents (argument .map (({name}) => name));

         if (argument instanceof ComponentInfo)
            return this .loadComponents ([argument .name]);

         return loadComponents (this, [... argument], new Set ());
      };
   })(),
   getSupportedNode: function (typeName)
   {
      return SupportedNodes .getType (String (typeName));
   },
   getSupportedNodes: function ()
   {
      return SupportedNodes .getTypes ();
   },
   createScene: function (profile, component1 /*, ...*/)
   {
      const scene = new Scene (this);

      if (arguments .length)
      {
         if (! (profile instanceof ProfileInfo))
            throw new Error ("Couldn't create scene: profile must be of type ProfileInfo.");

         scene .setProfile (profile);

         for (let i = 1, length = arguments .length; i < length; ++ i)
         {
            const component = arguments [i];

            if (! (component instanceof ComponentInfo))
               throw new Error ("Couldn't create scene: component must be of type ComponentInfo.");

            scene .addComponent (component);
         }
      }

      scene .setup ();

      return scene;
   },
   replaceWorld: function (scene)
   {
       if (this [_loader])
         this [_loader] .abort ();

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

         for (const rootNode of rootNodes)
            scene .isLive () .addInterest (rootNode .getValue () .getExecutionContext () .isLive ());

         scene .setRootNodes (rootNodes);
      }

      if (! (scene instanceof X3DScene))
         scene = this .createScene ();

      // Detach scene from parent.

      scene .getExecutionContext () .isLive () .removeInterest ("setLive", scene);
      scene .setExecutionContext (scene);

      // Replace.

      this .setDescription ("");
      this .getBrowserOptions () .configure ();
      this .setBrowserLoading (true);
      this ._loadCount .addInterest ("checkLoadCount", this);

      for (const object of scene .getLoadingObjects ())
         this .addLoadingObject (object);

      this .setExecutionContext (scene);
      this .getWorld () .bindBindables ();

      scene .setLive (this .isLive () .getValue ());
   },
   checkLoadCount: function (loadCount)
   {
      if (loadCount .getValue ())
         return;

      loadCount .removeInterest ("checkLoadCount", this);
      this .initialized () .set (this .getCurrentTime ());
      this .initialized () .processInterests ();
      this .callBrowserCallbacks (X3DConstants .INITIALIZED_EVENT);
      this .callBrowserEventHandler ("initialized load");
      this .setBrowserLoading (false);
   },
   createVrmlFromString: function (vrmlSyntax)
   {
      return this .createX3DFromString (vrmlSyntax) .rootNodes;
   },
   createX3DFromString: function (x3dSyntax)
   {
      x3dSyntax = String (x3dSyntax);

      const
         currentScene = this .currentScene,
         external     = this .isExternal (),
         fileLoader   = new FileLoader (this .getWorld ()),
         scene        = fileLoader .createX3DFromString (currentScene .getWorldURL (), x3dSyntax);

      if (! external)
      {
         currentScene .isLive () .addInterest ("setLive", scene);
         scene .setExecutionContext (currentScene);
         scene .setLive (currentScene .getLive ());
      }

      return scene;
   },
   createVrmlFromURL: function (url, node, event)
   {
      node  = X3DCast (X3DConstants .X3DNode, node, false);
      event = String (event);

      if (! (url instanceof Fields .MFString))
         throw new Error ("Browser.createVrmlFromURL: url must be of type MFString.");

      if (! node)
         throw new Error ("Browser.createVrmlFromURL: node must be of type X3DNode.");

      const field = node .getField (event);

      if (! field .isInput ())
         throw new Error ("Browser.createVrmlFromURL: event named '" + event + "' must be a input field.");

      if (field .getType () !== X3DConstants .MFNode)
         throw new Error ("Browser.createVrmlFromURL: event named '" + event + "' must be of type MFNode.");

      const
         currentScene = this .currentScene,
         external     = this .isExternal (),
         loader       = new FileLoader (this .getWorld ());

      this .addLoadingObject (loader);

      loader .createX3DFromURL (url, null, (scene) =>
      {
         this .removeLoadingObject (loader);

         if (scene)
         {
            // Handle isLive for script scenes here:

            if (! external)
            {
               currentScene .isLive () .addInterest ("setLive", scene);
               scene .setExecutionContext (currentScene);
               scene .setLive (currentScene .getLive ());
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

      if (! (url instanceof Fields .MFString))
         throw new Error ("Browser.createX3DFromURL: url must be of type MFString.");

      const
         currentScene = this .currentScene,
         external     = this .isExternal (),
         fileLoader   = new FileLoader (this .getWorld ()),
         scene        = fileLoader .createX3DFromURL (url, null);

      if (! external)
      {
         currentScene .isLive () .addInterest ("setLive", scene);
         scene .setExecutionContext (currentScene);
         scene .setLive (currentScene .getLive ());
      }

      return scene;
   },
   loadURL: function (url, parameter = new Fields .MFString ())
   {
      return new Promise ((resolve, reject) =>
      {
         if (! (url instanceof Fields .MFString))
            throw new Error ("Browser.loadURL: url must be of type MFString.");

         if (! (parameter instanceof Fields .MFString))
            throw new Error ("Browser.loadURL: parameter must be of type MFString.");

         // Cancel any loading.

         this ._loadCount       .removeInterest ("checkLoadCount",    this);
         this .prepareEvents () .removeInterest ("updateInitialized", this);

         if (this [_loader])
            this [_loader] .abort ();

         // Start loading.

         this .setBrowserLoading (true);
         this .addLoadingObject (this);

         const loader = this [_loader] = new FileLoader (this .getWorld ());

         loader .createX3DFromURL (url, parameter, (scene) =>
         {
            if (loader !== this [_loader])
            {
               reject ("Loading of X3D file aborted.");
               return;
            }

            if (! this .getBrowserOptions () .getSplashScreen ())
               this .getCanvas () .show ();

            if (scene)
            {
               this .replaceWorld (scene);
               this .removeLoadingObject (this);

               resolve ();
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

               reject ("Couldn't load X3D file.");
            }
         },
         (fragment) =>
         {
            if (loader !== this [_loader])
            {
               reject ("Change viewpoint aborted.");
               return;
            }

            this .changeViewpoint (fragment);
            this .removeLoadingObject (this);
            this .setBrowserLoading (false);

            resolve ();
         },
         (url, target) =>
         {
            if (loader !== this [_loader])
            {
               reject ("Loading of file aborted.");
               return;
            }

            if (target)
               window .open (url, target);
            else
               location = url;

            this .removeLoadingObject (this);
            this .setBrowserLoading (false);

            resolve ();
         });
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
   importDocument: function (dom, async = false)
   {
      const
         currentScene = this .currentScene,
         scene        = this .createScene (),
         external     = this .isExternal ();

      if (! external)
      {
         currentScene .isLive () .addInterest ("setLive", scene);
         scene .setExecutionContext (currentScene);
         scene .setLive (currentScene .getLive ());
      }

      const parser = new XMLParser (scene);

      parser .setInput (dom)

      if (async)
         return new Promise (parser .parseIntoScene .bind (parser));

      parser .parseIntoScene ();

      return scene;
   },
   importJS: function (json, async = false)
   {
      const
         currentScene = this .currentScene,
         scene        = this .createScene (),
         external     = this .isExternal ();

      if (! external)
      {
         currentScene .isLive () .addInterest ("setLive", scene);
         scene .setExecutionContext (currentScene);
         scene .setLive (currentScene .getLive ());
      }

      const parser = new JSONParser (scene);

      parser .setInput (json);

      if (async)
         return new Promise (parser .parseIntoScene .bind (parser));

      parser .parseIntoScene ();

      return scene;
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
   firstViewpoint: function (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode, false);

      if (! layerNode)
         layerNode = this .getActiveLayer ();

      const viewpoints = layerNode .getUserViewpoints ();

      if (viewpoints .length)
         this .bindViewpoint (layerNode, viewpoints [0]);
   },
   previousViewpoint: function (layerNode)
   {
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode, false);

      if (! layerNode)
         layerNode = this .getActiveLayer ();

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
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode, false);

      if (! layerNode)
         layerNode = this .getActiveLayer ();

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
      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode, false);

      if (! layerNode)
         layerNode = this .getActiveLayer ();

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

      layerNode = X3DCast (X3DConstants .X3DLayerNode, layerNode, false);

      if (! layerNode)
         layerNode = this .getActiveLayer ();

      if (layerNode instanceof X3DLayerNode)
      {
         for (const viewpointNode of layerNode .getViewpoints () .get ())
         {
            if (viewpointNode .getName () === name)
            {
               this .bindViewpoint (layerNode, viewpointNode);
               break;
            }
         }
      }
   },
   bindViewpoint: function (layerNode, viewpointNode)
   {
      layerNode     = X3DCast (X3DConstants .X3DLayerNode,     layerNode,     false);
      viewpointNode = X3DCast (X3DConstants .X3DViewpointNode, viewpointNode, false);

      if (! layerNode)
         throw new Error ("Browser.bindViewpoint: layerNode must be of type X3DLayerNode.")

      if (! viewpointNode)
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
   print: function ()
   {
      console .log (Array .prototype .join .call (arguments, " "));
   },
   println: function ()
   {
      console .log (Array .prototype .join .call (arguments, " "));
   },
   toVRMLStream: function (stream)
   {
      this .currentScene .toVRMLStream (stream);
   },
   toXMLStream: function (stream)
   {
      this .currentScene .toXMLStream (stream);
   },
   toJSONStream: function (stream)
   {
      this .currentScene .toJSONStream (stream);
   },
});

for (const key of Reflect .ownKeys (X3DBrowser .prototype))
   Object .defineProperty (X3DBrowser .prototype, key, { enumerable: false });

Object .defineProperty (X3DBrowser .prototype, "name",
{
   get: function () { return this .getName (); },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DBrowser .prototype, "version",
{
   get: function () { return this .getVersion (); },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DBrowser .prototype, "currentFrameRate",
{
   get: function () { return this .getCurrentFrameRate (); },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DBrowser .prototype, "currentSpeed",
{
   get: function () { return this .getCurrentSpeed (); },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DBrowser .prototype, "description",
{
   get: function ()
   {
      return this .getDescription ();
   },
   set: function (value)
   {
      this .setDescription (value);
   },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DBrowser .prototype, "currentScene",
{
   get: function ()
   {
      return this .getScriptStack () .at (-1) .getExecutionContext ();
   },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DBrowser .prototype, "supportedProfiles",
{
   get: function ()
   {
      return SupportedProfiles;
   },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DBrowser .prototype, "supportedComponents",
{
   get: function ()
   {
      return SupportedComponents;
   },
   enumerable: true,
   configurable: false
});

export default X3DBrowser;

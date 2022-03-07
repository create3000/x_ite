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
   "x_ite/Configuration/SupportedNodes",
   "x_ite/Fields",
   "x_ite/Base/X3DBaseNode",
   "x_ite/Execution/X3DImportedNode",
   "x_ite/Prototype/ExternProtoDeclarationArray",
   "x_ite/Prototype/ProtoDeclarationArray",
   "x_ite/Routing/RouteArray",
   "x_ite/Routing/X3DRoute",
   "x_ite/Base/X3DCast",
   "x_ite/Base/X3DConstants",
   "x_ite/InputOutput/Generator",
   "x_ite/Fields/SFNodeCache",
   "standard/Math/Algorithm",
],
function (SupportedNodes,
          Fields,
          X3DBaseNode,
          X3DImportedNode,
          ExternProtoDeclarationArray,
          ProtoDeclarationArray,
          RouteArray,
          X3DRoute,
          X3DCast,
          X3DConstants,
          Generator,
          SFNodeCache,
          Algorithm)
{
"use strict";

   const
      _namedNodes     = Symbol (),
      _importedNodes  = Symbol (),
      _protos         = Symbol (),
      _externprotos   = Symbol (),
      _routes         = Symbol (),
      _node           = Symbol ();

   SupportedNodes .addAbstractType ("X3DExecutionContext");

   function X3DExecutionContext (executionContext)
   {
      X3DBaseNode .call (this, executionContext);

      this .addType (X3DConstants .X3DExecutionContext)

      this .addChildObjects ("rootNodes",  new Fields .MFNode (),
                             "worldInfos", new Fields .MFNode ());

      this ._rootNodes .setAccessType (X3DConstants .initializeOnly);
      this ._rootNodes .addCloneCount (1);

      this [_namedNodes]     = new Map ();
      this [_importedNodes]  = new Map ();
      this [_protos]         = new ProtoDeclarationArray ();
      this [_externprotos]   = new ExternProtoDeclarationArray ();
      this [_routes]         = new RouteArray ();
   }

   X3DExecutionContext .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   {
      constructor: X3DExecutionContext,
      getTypeName: function ()
      {
         return "X3DExecutionContext";
      },
      [_node]: null,
      getNode: function ()
      {
         // Can be either of type X3DProtoDeclaration or X3DPrototypeInstance, or null.
         return this [_node];
      },
      setNode: function (value)
      {
         this [_node] = value;
      },
      getSpecificationVersion: function ()
      {
         return this .getExecutionContext () .getSpecificationVersion ();
      },
      getEncoding: function ()
      {
         return this .getExecutionContext () .getEncoding ();
      },
      getWorldURL: function ()
      {
         return this .getExecutionContext () .getWorldURL ();
      },
      getProfile: function ()
      {
         return this .getExecutionContext () .getProfile ();
      },
      getComponents: function ()
      {
         return this .getExecutionContext () .getComponents ();
      },
      fromUnit: function (category, value)
      {
         return this .getExecutionContext () .fromUnit (category, value);
      },
      toUnit: function (category, value)
      {
         return this .getExecutionContext () .toUnit (category, value);
      },
      getUnits: function ()
      {
         return this .getExecutionContext () .getUnits ();
      },
      createNode: function (typeName, setup = true)
      {
         if (setup === false)
         {
            const Type = this .getBrowser () .getSupportedNode (typeName);

            if (!Type)
               return null;

            return new Type (this);
         }
         else
         {
            const Type = this .getBrowser () .getSupportedNode (typeName);

            if (!Type)
               throw new Error ("Unknown node type '" + typeName + "'.");

            const baseNode = new Type (this);

            baseNode .setup ();

            return SFNodeCache .get (baseNode);
         }
      },
      createProto: function (name, setup = true)
      {
         const X3DScene = require ("x_ite/Execution/X3DScene");

         let executionContext = this;

         for (;;)
         {
            const proto = executionContext .protos .get (name);

            if (proto)
               return proto .createInstance (this, setup);

            const externproto = executionContext .externprotos .get (name);

            if (externproto)
               return externproto .createInstance (this, setup);

            if (executionContext instanceof X3DScene)
               break;

            executionContext = executionContext .getExecutionContext ();
         }

         if (setup === false)
            return null;

         throw new Error ("Unknown proto or externproto type '" + name + "'.");
      },
      addNamedNode: function (name, node)
      {
         if (this [_namedNodes] .has (name))
            throw new Error ("Couldn't add named node: node named '" + name + "' is already in use.");

         this .updateNamedNode (name, node);
      },
      updateNamedNode: function (name, node)
      {
         if (!(node instanceof Fields .SFNode || node instanceof X3DBaseNode))
            throw new Error ("Couldn't update named node: node must be of type SFNode.");

         name = String (name);

         const baseNode = node instanceof Fields .SFNode ? node .getValue () : node;

         if (!baseNode)
            throw new Error ("Couldn't update named node: node IS NULL.");

         if (baseNode .getExecutionContext () !== this)
            throw new Error ("Couldn't update named node: node does not belong to this execution context.");

         if (name .length === 0)
            throw new Error ("Couldn't update named node: node name is empty.");

         // Remove named node.

         this .removeNamedNode (baseNode .getName ());
         this .removeNamedNode (name);

         // Update named node.

         baseNode .setName (name);

         this [_namedNodes] .set (name, baseNode);
      },
      removeNamedNode: function (name)
      {
         const baseNode = this [_namedNodes] .get (name);

         if (!baseNode)
            return;

         baseNode .setName ("");

         this [_namedNodes] .delete (name);
      },
      getNamedNode: function (name)
      {
         const baseNode = this [_namedNodes] .get (name);

         if (baseNode)
            return SFNodeCache .get (baseNode);

         throw new Error ("Named node '" + name + "' not found.");
      },
      getNamedNodes: function ()
      {
         return this [_namedNodes];
      },
      getUniqueName: (function ()
      {
         const _TrailingNumbers = /_\d+$/;

         return function (name)
         {
            name = name .replace (_TrailingNumbers, "");

            let
               newName = name,
               i       = 64;

            for (; i;)
            {
               if (!(this [_namedNodes] .has (newName) || newName .length === 0))
                  break;

               const
                  min = i,
                  max = i <<= 1;

               newName  = name;
               newName += '_';
               newName += Math .round (Algorithm .random (min, max));
            }

            return newName;
         };
      })(),
      addImportedNode: function (inlineNode, exportedName, importedName)
      {
         if (importedName === undefined)
            importedName = exportedName;

         if (this [_importedNodes] .has (importedName))
            throw new Error ("Couldn't add imported node: imported name '" + importedName + "' already in use.");

         this .updateImportedNode (inlineNode, exportedName, importedName);
      },
      updateImportedNode: function (inlineNode, exportedName, importedName)
      {
         inlineNode   = X3DCast (X3DConstants .Inline, inlineNode);
         exportedName = String (exportedName);
         importedName = importedName === undefined ? exportedName : String (importedName);

         if (!inlineNode)
            throw new Error ("Node named is not an Inline node.");

         if (inlineNode .getExecutionContext () !== this)
            throw new Error ("Couldn't update imported node: Inline node does not belong to this execution context.");

         if (exportedName .length === 0)
            throw new Error ("Couldn't update imported node: exported name is empty.");

         if (importedName .length === 0)
            throw new Error ("Couldn't update imported node: imported name is empty.");

         // Update imported node.

         this .removeImportedNode (importedName);

         const importedNode = new X3DImportedNode (this, inlineNode, exportedName, importedName);

         this [_importedNodes] .set (importedName, importedNode);

         importedNode .setup ();
      },
      removeImportedNode: function (importedName)
      {
         const importedNode = this [_importedNodes] .get (importedName);

         if (!importedNode)
            return;

         importedNode .dispose ();

         this [_importedNodes] .delete (importedName);
      },
      getImportedNode: function (importedName)
      {
         const importedNode = this [_importedNodes] .get (importedName);

         if (importedNode)
            return SFNodeCache .get (importedNode .getExportedNode ());

         throw new Error ("Imported node '" + importedName + "' not found.");
      },
      getImportedNodes: function ()
      {
         return this [_importedNodes];
      },
      getLocalNode: function (name)
      {
         try
         {
            return this .getNamedNode (name);
         }
         catch (error)
         {
            const importedNode = this [_importedNodes] .get (name);

            if (importedNode)
               return SFNodeCache .get (importedNode);

            throw new Error ("Unknown named or imported node '" + name + "'.");
         }
      },
      getLocalName: function (node)
      {
         if (!(node instanceof Fields .SFNode))
            throw new Error ("Couldn't get local name: node is NULL.");

         if (node .getValue () .getExecutionContext () === this)
            return node .getValue () .getName ();

         for (const importedNode of this [_importedNodes] .values ())
         {
            try
            {
               if (importedNode .getExportedNode () === node .getValue ())
                  return importedNode .getImportedName ();
            }
            catch (error)
            {
               //console .log (error);
            }
         }

         throw new Error ("Couldn't get local name: node is shared.");
      },
      setRootNodes: function () { },
      getRootNodes: function ()
      {
         return this ._rootNodes;
      },
      getProtoDeclaration: function (name)
      {
         const proto = this [_protos] .get (name);

         if (proto)
            return proto;

         throw new Error ("Proto declaration '" + name + "' not found.");
      },
      addProtoDeclaration (name, proto)
      {
         const X3DProtoDeclaration = require ("x_ite/Prototype/X3DProtoDeclaration");

         if (!(proto instanceof X3DProtoDeclaration))
            throw new Error ("Couldn't add proto declaration: proto must be of type X3DProtoDeclaration.");

         if (this [_protos] .get (name))
            throw new Error ("Couldn't add proto declaration: proto '" + name + "' already in use.");

         name = String (name);

         if (name .length === 0)
            throw new Error ("Couldn't add proto declaration: proto name is empty.");

         this [_protos] .add (name, proto);
         proto .setName (name);
      },
      updateProtoDeclaration (name, proto)
      {
         const X3DProtoDeclaration = require ("x_ite/Prototype/X3DProtoDeclaration");

         if (!(proto instanceof X3DProtoDeclaration))
            throw new Error ("Couldn't add proto declaration: proto must be of type X3DProtoDeclaration.");

         name = String (name);

         if (name .length === 0)
            throw new Error ("Couldn't add proto declaration: proto name is empty.");

         this [_protos] .update (proto .getName (), name, proto);
         proto .setName (name);
      },
      removeProtoDeclaration (name)
      {
         this [_protos] .remove (name);
      },
      getProtoDeclarations: function ()
      {
         return this [_protos];
      },
      getUniqueProtoName: (function ()
      {
         const TrailingNumbers = /\d+$/;

         return function (name)
         {
            name = name .replace (TrailingNumbers, "");

            let
               newName = name,
               i       = 64;

            for (; i;)
            {
               if (!this [_protos] .has (newName))
                  break;

               const
                  min = i,
                  max = i <<= 1;

               newName  = name;
               newName += Math .round (Algorithm .random (min, max));
            }

            return newName;
         };
      })(),
      getExternProtoDeclaration: function (name)
      {
         const externproto = this [_externprotos] .get (name);

         if (externproto)
            return externproto;

         throw new Error ("Extern proto declaration '" + name + "' not found.");
      },
      addExternProtoDeclaration (name, externproto)
      {
         const X3DExternProtoDeclaration = require ("x_ite/Prototype/X3DExternProtoDeclaration");

         if (!(externproto instanceof X3DExternProtoDeclaration))
            throw new Error ("Couldn't add extern proto declaration: extern proto must be of type X3DExternProtoDeclaration.");

         if (this [_externprotos] .get (name))
            throw new Error ("Couldn't add extern proto declaration: extern proto '" + name + "' already in use.");

         name = String (name);

         if (name .length === 0)
            throw new Error ("Couldn't add extern proto declaration: extern proto name is empty.");

         this [_externprotos] .add (name, externproto);
         externproto .setName (name);
      },
      updateExternProtoDeclaration (name, externproto)
      {
         const X3DExternProtoDeclaration = require ("x_ite/Prototype/X3DExternProtoDeclaration");

         if (!(externproto instanceof X3DExternProtoDeclaration))
            throw new Error ("Couldn't add extern proto declaration: extern proto must be of type X3DExternProtoDeclaration.");

         name = String (name);

         if (name .length === 0)
            throw new Error ("Couldn't add extern proto declaration: extern proto name is empty.");

         this [_externprotos] .update (externproto .getName (), name, externproto);
         externproto .setName (name);
      },
      removeExternProtoDeclaration (name)
      {
         this [_externprotos] .remove (name);
      },
      getExternProtoDeclarations: function ()
      {
         return this [_externprotos];
      },
      getUniqueExternProtoName: (function ()
      {
         const TrailingNumbers = /\d+$/;

         return function (name)
         {
            name = name .replace (TrailingNumbers, "");

            let
               newName = name,
               i       = 64;

            for (; i;)
            {
               if (!this [_externprotos] .has (newName))
                  break;

               const
                  min = i,
                  max = i <<= 1;

               newName  = name;
               newName += Math .round (Algorithm .random (min, max));
            }

            return newName;
         };
      })(),
      addRoute: function (sourceNode, sourceField, destinationNode, destinationField)
      {
         sourceField      = String (sourceField);
         destinationField = String (destinationField);

         if (!(sourceNode instanceof Fields .SFNode))
            throw new Error ("Bad ROUTE specification: source node must be of type SFNode.");

         if (!(destinationNode instanceof Fields .SFNode))
            throw new Error ("Bad ROUTE specification: destination node must be of type SFNode.");

         const
            sourceNodeValue      = sourceNode      .getValue (),
            destinationNodeValue = destinationNode .getValue ();

         if (!sourceNodeValue)
            throw new Error ("Bad ROUTE specification: source node is NULL.");

         if (!destinationNodeValue)
            throw new Error ("Bad ROUTE specification: destination node is NULL.");

         // Imported nodes handling.

         let
            importedSourceNode      = sourceNodeValue      instanceof X3DImportedNode ? sourceNodeValue      : null,
            importedDestinationNode = destinationNodeValue instanceof X3DImportedNode ? destinationNodeValue : null;

         try
         {
            // If sourceNode is shared node try to find the corresponding X3DImportedNode.
            if (sourceNodeValue .getExecutionContext () !== this)
               importedSourceNode = this .getLocalNode (this .getLocalName (sourceNode)) .getValue ();
         }
         catch (error)
         {
            // Source node is shared but not imported.
         }

         try
         {
            // If destinationNode is shared node try to find the corresponding X3DImportedNode.
            if (destinationNodeValue .getExecutionContext () !== this)
               importedDestinationNode = this .getLocalNode (this .getLocalName (destinationNode)) .getValue ();
         }
         catch (error)
         {
            // Destination node is shared but not imported.
         }

         if (importedSourceNode instanceof X3DImportedNode && importedDestinationNode instanceof X3DImportedNode)
         {
            importedSourceNode      .addRoute (importedSourceNode, sourceField, importedDestinationNode, destinationField);
            importedDestinationNode .addRoute (importedSourceNode, sourceField, importedDestinationNode, destinationField);
         }
         else if (importedSourceNode instanceof X3DImportedNode)
         {
            importedSourceNode .addRoute (importedSourceNode, sourceField, destinationNodeValue, destinationField);
         }
         else if (importedDestinationNode instanceof X3DImportedNode)
         {
            importedDestinationNode .addRoute (sourceNodeValue, sourceField, importedDestinationNode, destinationField);
         }

         // If either sourceNode or destinationNode is an X3DImportedNode return here without value.
         if (importedSourceNode === sourceNodeValue || importedDestinationNode === destinationNodeValue)
            return;

         // Create route and return.

         return this .addSimpleRoute (sourceNodeValue, sourceField, destinationNodeValue, destinationField);
      },
      addSimpleRoute: function (sourceNode, sourceField, destinationNode, destinationField)
      {
         // Source and dest node are here X3DBaseNode.

         try
         {
            // Private function.
            // Create route and return.

            sourceField      = sourceNode      .getField (sourceField),
            destinationField = destinationNode .getField (destinationField);

            if (!sourceField .isOutput ())
               throw new Error ("Field named '" + sourceField .getName () + "' in node named '" + sourceNode .getName () + "' of type " + sourceNode .getTypeName () + " is not an output field.");

            if (!destinationField .isInput ())
               throw new Error ("Field named '" + destinationField .getName () + "' in node named '" + destinationNode .getName () + "' of type " + destinationNode .getTypeName () + " is not an input field.");

            if (sourceField .getType () !== destinationField .getType ())
               throw new Error ("ROUTE types " + sourceField .getTypeName () + " and " + destinationField .getTypeName () + " do not match.");

            const id = sourceField .getId () + "." + destinationField .getId ();

            let route = this [_routes] .get (id);

            if (route)
               return route;

            route = new X3DRoute (this, sourceNode, sourceField, destinationNode, destinationField);

            this [_routes] .add (id, route);

            return route;
         }
         catch (error)
         {
            throw new Error ("Bad ROUTE specification: " + error .message);
         }
      },
      deleteRoute: function (route)
      {
         // sourceNode, sourceField, destinationNode, destinationField
         if (arguments .length === 4)
         {
            route = this .getRoute .apply (this, arguments);

            if (!route)
               return false;
         }

         if (this .deleteSimpleRoute (route))
            this .deleteImportedRoute (route .sourceNode, route .destinationNode, route);
      },
      deleteSimpleRoute: function (route)
      {
         try
         {
            const
               sourceField      = route .getSourceNode () .getField (route .getSourceField ()),
               destinationField = route .getDestinationNode () .getField (route .getDestinationField ()),
               id               = sourceField .getId () + "." + destinationField .getId ();

            this [_routes] .remove (id);
            route .disconnect ();

            return true;
         }
         catch (error)
         {
            console .log (error);
            return false;
         }
      },
      deleteImportedRoute (sourceNode, destinationNode, route)
      {
         // Imported nodes handling.

         let
            importedSourceNode      = null,
            importedDestinationNode = null;

         try
         {
            // If sourceNode is shared node try to find the corresponding X3DImportedNode.
            if (sourceNode .getValue () .getExecutionContext () !== this)
               importedSourceNode = this .getLocalNode (this .getLocalName (sourceNode)) .getValue ();
         }
         catch (error)
         {
            // Source node is shared but not imported.
         }

         try
         {
            // If destinationNode is shared node try to find the corresponding X3DImportedNode.
            if (destinationNode .getValue () .getExecutionContext () !== this)
               importedDestinationNode = this .getLocalNode (this .getLocalName (destinationNode)) .getValue ();
         }
         catch (error)
         {
            // Destination node is shared but not imported.
         }

         if (importedSourceNode instanceof X3DImportedNode && importedDestinationNode instanceof X3DImportedNode)
         {
            importedSourceNode      .deleteRoute (route);
            importedDestinationNode .deleteRoute (route);
         }
         else if (importedSourceNode instanceof X3DImportedNode)
         {
            importedSourceNode .deleteRoute (route);
         }
         else if (importedDestinationNode instanceof X3DImportedNode)
         {
            importedDestinationNode .deleteRoute (route);
         }
      },
      getRoute: function (sourceNode, sourceField, destinationNode, destinationField)
      {
         if (!sourceNode .getValue ())
            throw new Error ("Bad ROUTE specification: sourceNode is NULL.");

         if (!destinationNode .getValue ())
            throw new Error ("Bad ROUTE specification: destinationNode is NULL.");

         sourceField      = sourceNode .getValue () .getField (sourceField);
         destinationField = destinationNode .getValue () .getField (destinationField);

         const id = sourceField .getId () + "." + destinationField .getId ();

         return this [_routes] .get (id);
      },
      getRoutes: function ()
      {
         return this [_routes];
      },
      getWorldInfos: function ()
      {
         return this ._worldInfos;
      },
      addWorldInfo: function (worldInfoNode)
      {
         this ._worldInfos .push (worldInfoNode);
      },
      removeWorldInfo: function (worldInfoNode)
      {
         const index = this ._worldInfos .getValue () .indexOf (worldInfoNode);

         if (index !== -1)
            this ._worldInfos .splice (index, 1);
      },
      toVRMLStream: function (stream)
      {
         const generator = Generator .Get (stream);

         generator .PushExecutionContext (this);
         generator .EnterScope ();
         generator .ImportedNodes (this .getImportedNodes ());

         // Output extern protos

         this .getExternProtoDeclarations () .toVRMLStream (stream);

         // Output protos

         this .getProtoDeclarations () .toVRMLStream (stream);

         // Output root nodes

         const rootNodes = this .getRootNodes ();

         for (let i = 0, length = rootNodes .length; i < length; ++ i)
         {
            const rootNode = rootNodes [i];

            stream .string += generator .Indent ();

            if (rootNode)
               rootNode .toVRMLStream (stream);
            else
               stream .string += "NULL";

            stream .string += "\n";

            if (i !== length - 1)
               stream .string += "\n";
         }

         // Output imported nodes

         const importedNodes = this .getImportedNodes ();

         if (importedNodes .size)
         {
            stream .string += "\n";

            importedNodes .forEach (function (importedNode)
            {
               try
               {
                  importedNode .toVRMLStream (stream);

                  stream .string += "\n";
               }
               catch (error)
               { }
            });
         }

         // Output routes

         const routes = this .getRoutes ();

         if (routes .length)
         {
            stream .string += "\n";

            routes .toVRMLStream (stream);
         }

         generator .LeaveScope ();
         generator .PopExecutionContext ();
      },
      toXMLStream: function (stream)
      {
         const generator = Generator .Get (stream);

         generator .PushExecutionContext (this);
         generator .EnterScope ();
         generator .ImportedNodes (this .getImportedNodes ());

         // Output extern protos

         this .getExternProtoDeclarations () .toXMLStream (stream);

         // Output protos

         this .getProtoDeclarations () .toXMLStream (stream);

         // Output root nodes

         const rootNodes = this .getRootNodes ();

         if (rootNodes .length)
         {
            rootNodes .toXMLStream (stream);

            stream .string += "\n";
         }

         // Output imported nodes

         const importedNodes = this .getImportedNodes ();

         importedNodes .forEach (function (importedNode)
         {
            try
            {
               importedNode .toXMLStream (stream);

               stream .string += "\n";
            }
            catch (error)
            { }
         });

         // Output routes

         this .getRoutes () .toXMLStream (stream);

         generator .LeaveScope ();
         generator .PopExecutionContext ();
      },
      dispose: function ()
      {
         this ._rootNodes .dispose ();

         for (const route of this [_routes])
            this .deleteRoute (route);

         X3DBaseNode .prototype .dispose .call (this);
      },
   });

   for (const key of Reflect .ownKeys (X3DExecutionContext .prototype))
      Object .defineProperty (X3DExecutionContext .prototype, key, { enumerable: false });

   Object .defineProperty (X3DExecutionContext .prototype, "specificationVersion",
   {
      get: function () { return this .getSpecificationVersion (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExecutionContext .prototype, "encoding",
   {
      get: function () { return this .getEncoding (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExecutionContext .prototype, "profile",
   {
      get: function () { return this .getProfile (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExecutionContext .prototype, "components",
   {
      get: function () { return this .getComponents (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExecutionContext .prototype, "worldURL",
   {
      get: function () { return this .getWorldURL (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExecutionContext .prototype, "units",
   {
      get: function () { return this .getUnits (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExecutionContext .prototype, "rootNodes",
   {
      get: function () { return this .getRootNodes (); },
      set: function (value) { this .setRootNodes (value); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExecutionContext .prototype, "protos",
   {
      get: function () { return this .getProtoDeclarations (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExecutionContext .prototype, "externprotos",
   {
      get: function () { return this .getExternProtoDeclarations (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExecutionContext .prototype, "routes",
   {
      get: function () { return this .getRoutes (); },
      enumerable: true,
      configurable: false
   });

   return X3DExecutionContext;
});

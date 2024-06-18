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

import Fields                      from "../Fields.js";
import X3DBaseNode                 from "../Base/X3DBaseNode.js";
import X3DBoundedObject            from "../Components/Grouping/X3DBoundedObject.js";
import { getUniqueName }           from "./NamedNodesHandling.js";
import NamedNodesArray             from "./NamedNodesArray.js";
import X3DImportedNode             from "./X3DImportedNode.js";
import ImportedNodesArray          from "./ImportedNodesArray.js";
import ExternProtoDeclarationArray from "../Prototype/ExternProtoDeclarationArray.js";
import ProtoDeclarationArray       from "../Prototype/ProtoDeclarationArray.js";
import X3DProtoDeclaration         from "../Prototype/X3DProtoDeclaration.js";
import X3DExternProtoDeclaration   from "../Prototype/X3DExternProtoDeclaration.js";
import RouteArray                  from "../Routing/RouteArray.js";
import X3DRoute                    from "../Routing/X3DRoute.js";
import X3DCast                     from "../Base/X3DCast.js";
import X3DConstants                from "../Base/X3DConstants.js";
import SFNodeCache                 from "../Fields/SFNodeCache.js";

const
   _outerNode     = Symbol (),
   _namedNodes    = Symbol (),
   _importedNodes = Symbol (),
   _protos        = Symbol (),
   _externprotos  = Symbol (),
   _routes        = Symbol ();

function X3DExecutionContext (executionContext, outerNode = null, browser = executionContext .getBrowser ())
{
   X3DBaseNode .call (this, executionContext, browser);

   this .addType (X3DConstants .X3DExecutionContext)

   this .addChildObjects (X3DConstants .initializeOnly, "rootNodes",          new Fields .MFNode (),
                          X3DConstants .inputOutput,    "countPrimitives",    new Fields .SFBool (true),
                          X3DConstants .outputOnly,     "worldInfos",         new Fields .MFNode (),
                          X3DConstants .outputOnly,     "sceneGraph_changed", new Fields .SFTime ())

   this ._rootNodes .setPrivate (false);
   this ._rootNodes .collectCloneCount = () => 1;

   if (executionContext)
   {
      this ._countPrimitives .addReference (executionContext ._countPrimitives);
      this ._sceneGraph_changed .addFieldInterest (executionContext ._sceneGraph_changed);
   }

   this [_outerNode]       = outerNode;
   this [_namedNodes]      = new NamedNodesArray ();
   this [_importedNodes]   = new ImportedNodesArray ();
   this [_protos]          = new ProtoDeclarationArray ();
   this [_externprotos]    = new ExternProtoDeclarationArray ();
   this [_routes]          = new RouteArray ();

   this [_namedNodes]     .addParent (this);
   this [_importedNodes]  .addParent (this);
   this [_protos]         .addParent (this);
   this [_externprotos]   .addParent (this);
   this [_routes]         .addParent (this);
}

Object .assign (Object .setPrototypeOf (X3DExecutionContext .prototype, X3DBaseNode .prototype),
{
   setExecutionContext (executionContext)
   {
      if (this .getExecutionContext ())
      {
         this ._countPrimitives .removeReference (this .getExecutionContext () ._countPrimitives);
         this ._sceneGraph_changed .removeFieldInterest (this .getExecutionContext () ._sceneGraph_changed);
      }

      X3DBaseNode .prototype .setExecutionContext .call (this, executionContext);

      if (executionContext)
      {
         this ._countPrimitives .addReference (executionContext ._countPrimitives);
         this ._sceneGraph_changed .addFieldInterest (executionContext ._sceneGraph_changed);
      }
   },
   isScene ()
   {
      return false;
   },
   getOuterNode ()
   {
      // Can be either of type X3DProtoDeclaration or X3DPrototypeInstance, or null.
      return this [_outerNode];
   },
   getCountPrimitives ()
   {
      return this ._countPrimitives .getValue ();
   },
   setCountPrimitives (value)
   {
      this ._countPrimitives = (this .getExecutionContext () ?.getCountPrimitives () ?? true) && value;
   },
   getBBox (bbox, shadows)
   {
      const nodes = Array .from (this .getRootNodes (), node => X3DCast (X3DConstants .X3DBoundedObject, node))
         .filter (node => node);

      return X3DBoundedObject .prototype .getBBox (nodes, bbox, shadows);
   },
   getSpecificationVersion ()
   {
      return this .getExecutionContext () .getSpecificationVersion ();
   },
   getEncoding ()
   {
      return this .getExecutionContext () .getEncoding ();
   },
   getWorldURL ()
   {
      return this .getExecutionContext () .getWorldURL ();
   },
   getBaseURL ()
   {
      return this .getExecutionContext () .getBaseURL ();
   },
   getProfile ()
   {
      return this .getExecutionContext () .getProfile ();
   },
   hasComponent (name, level)
   {
      return this .getExecutionContext () .hasComponent (name, level);
   },
   getComponents ()
   {
      return this .getExecutionContext () .getComponents ();
   },
   fromUnit (category, value)
   {
      return this .getExecutionContext () .fromUnit (category, value);
   },
   toUnit (category, value)
   {
      return this .getExecutionContext () .toUnit (category, value);
   },
   getUnits ()
   {
      return this .getExecutionContext () .getUnits ();
   },
   createNode (typeName, setup = true /* non-public argument */)
   {
      typeName = String (typeName);

      if (setup === false)
      {
         const ConcreteNode = this .getBrowser () .getConcreteNodes () .get (typeName);

         if (!ConcreteNode)
            return null;

         const specificationRange = ConcreteNode .specificationRange;

         if (this .getSpecificationVersion () < specificationRange .from)
            return null;

         if (this .getSpecificationVersion () > specificationRange .to)
            return null;

         if (!this .hasComponent (ConcreteNode .componentInfo .name))
            console .warn (`Node type '${typeName}' does not match component/profile statements in '${this .getWorldURL ()}'.`);

         return new ConcreteNode (this);
      }
      else
      {
         const ConcreteNode = this .getBrowser () .getConcreteNodes () .get (typeName);

         if (!ConcreteNode)
            throw new Error (`Unknown node type '${typeName}'.`);

         const specificationRange = ConcreteNode .specificationRange;

         if (this .getSpecificationVersion () < specificationRange .from)
            throw new Error (`Node type '${typeName}' does not match specification version in '${this .getWorldURL ()}.`);

         if (this .getSpecificationVersion () > specificationRange .to)
            throw new Error (`Node type '${typeName}' does not match specification version in '${this .getWorldURL ()}.`);

         if (!this .hasComponent (ConcreteNode .componentInfo .name))
            console .warn (`Node type '${typeName}' does not match component/profile statements in '${this .getWorldURL ()}'.`);

         const baseNode = new ConcreteNode (this);

         baseNode .setup ();

         return SFNodeCache .get (baseNode);
      }
   },
   createProto (name, setup = true /* non-public argument */)
   {
      name = String (name);

      for (let executionContext = this;;)
      {
         const protoNode = executionContext .protos .get (name)
            ?? executionContext .externprotos .get (name);

         if (protoNode)
            return protoNode .createInstance (this, setup);

         if (executionContext .isScene ())
            break;

         executionContext = executionContext .getExecutionContext ();
      }

      if (setup === false)
         return null;

      throw new Error (`Unknown proto or externproto type '${name}'.`);
   },
   addNamedNode (name, node)
   {
      name = String (name);
      node = X3DCast (X3DConstants .X3DNode, node, false);

      if (!node)
         throw new Error ("Couldn't add named node: node must be of type X3DNode.");

      if (node .getExecutionContext () !== this)
         throw new Error ("Couldn't add named node: node does not belong to this execution context.");

      if (name .length === 0)
         throw new Error ("Couldn't add named node: node name is empty.");

      if (this [_namedNodes] .has (name))
         throw new Error (`Couldn't add named node: node named '${name}' is already in use.`);

      if (this [_namedNodes] .get (node .getName ()) ?.getValue () === node)
         throw new Error (`Couldn't add named node: node named '${node .getName ()}' already has a name.`);

      // Add named node.

      node .setName (name);

      this [_namedNodes] .add (name, SFNodeCache .get (node));
   },
   updateNamedNode (name, node)
   {
      name = String (name);
      node = X3DCast (X3DConstants .X3DNode, node, false);

      if (!node)
         throw new Error ("Couldn't update named node: node must be of type X3DNode.");

      if (node .getExecutionContext () !== this)
         throw new Error ("Couldn't update named node: node does not belong to this execution context.");

      if (name .length === 0)
         throw new Error ("Couldn't update named node: node name is empty.");

      // Remove named node.

      this .removeNamedNode (name);

      // Update named node.

      this [_namedNodes] .update (node .getName (), name, SFNodeCache .get (node));

      node .setName (name);

      this ._namedNodes_changed = this .getBrowser () .getCurrentTime ();
   },
   removeNamedNode (name)
   {
      name = String (name);

      const node = this [_namedNodes] .get (name);

      if (!node || !node .getValue ())
         return;

      node .getValue () .setName ("");

      this [_namedNodes] .remove (name);

      this ._namedNodes_changed = this .getBrowser () .getCurrentTime ();
   },
   getNamedNode (name)
   {
      name = String (name);

      const node = this [_namedNodes] .get (name);

      if (node)
         return node;

      throw new Error (`Named node '${name}' not found.`);
   },
   getNamedNodes ()
   {
      return this [_namedNodes];
   },
   getUniqueName (name)
   {
      return getUniqueName (this [_namedNodes], name);
   },
   addImportedNode (inlineNode, exportedName, importedName = exportedName)
   {
      exportedName = String (exportedName);
      importedName = String (importedName);

      if (this [_importedNodes] .has (importedName))
         throw new Error (`Couldn't add imported node: imported name '${importedName}' already in use.`);

      this .updateImportedNode (inlineNode, exportedName, importedName);
   },
   updateImportedNode (inlineNode, exportedName, importedName)
   {
      inlineNode   = X3DCast (X3DConstants .Inline, inlineNode, false);
      exportedName = String (exportedName);
      importedName = importedName === undefined ? exportedName : String (importedName);

      if (!inlineNode)
         throw new Error ("Node must be of type Inline node.");

      if (inlineNode .getExecutionContext () !== this)
         throw new Error ("Couldn't update imported node: Inline node does not belong to this execution context.");

      if (exportedName .length === 0)
         throw new Error ("Couldn't update imported node: exported name is empty.");

      if (importedName .length === 0)
         throw new Error ("Couldn't update imported node: imported name is empty.");

      // Update imported node.

      this .removeImportedNode (importedName);

      const importedNode = new X3DImportedNode (this, inlineNode, exportedName, importedName);

      this [_importedNodes] .add (importedName, importedNode);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   renameImportedNode (oldImportedName, newImportedName)
   {
      const importedNode = this [_importedNodes] .get (oldImportedName);

      if (!importedNode)
         throw new Error ("Couldn't rename imported node: imported node does not exists.");

      if (this [_importedNodes] .get (newImportedName))
         throw new Error ("Couldn't rename imported node: new imported name does already exists.");

      importedNode [Symbol .for ("X_ITE.X3DImportedNode.setImportName")] (newImportedName);

      this [_importedNodes] .update (oldImportedName, newImportedName, importedNode);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   removeImportedNode (importedName)
   {
      importedName = String (importedName);

      const importedNode = this [_importedNodes] .get (importedName);

      if (!importedNode)
         return;

      importedNode .dispose ();

      this [_importedNodes] .remove (importedName);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   getImportedNode (importedName)
   {
      importedName = String (importedName);

      const importedNode = this [_importedNodes] .get (importedName);

      if (importedNode)
         return importedNode .exportedNode;

      throw new Error (`Imported node '${importedName}' not found.`);
   },
   getImportedNodes ()
   {
      return this [_importedNodes];
   },
   getUniqueImportName (name)
   {
      return getUniqueName (this [_importedNodes], name);
   },
   getLocalNode (name)
   {
      name = String (name);

      try
      {
         return this .getNamedNode (name);
      }
      catch
      {
         const importedNode = this [_importedNodes] .get (name);

         if (importedNode)
            return importedNode;

         throw new Error (`Unknown named or imported node '${name}'.`);
      }
   },
   getLocalizedNode (node)
   {
      const importedNode = node instanceof X3DImportedNode ? node : null;

      node = X3DCast (X3DConstants .X3DNode, node, false) ?? importedNode;

      if (!node)
         throw new Error ("Couldn't get localized node: node must be of type X3DNode.");

      for (const importedNode of this [_importedNodes])
      {
         try
         {
            if (importedNode .getExportedNode () === node)
               return importedNode;
         }
         catch
         { }
      }

      return node;
   },
   setRootNodes () { },
   getRootNodes ()
   {
      return this ._rootNodes;
   },
   getProtoDeclaration (name)
   {
      name = String (name);

      const proto = this [_protos] .get (name);

      if (proto)
         return proto;

      throw new Error (`Proto declaration '${name}' not found.`);
   },
   addProtoDeclaration (name, proto)
   {
      name = String (name);

      if (!(proto instanceof X3DProtoDeclaration))
         throw new Error ("Couldn't add proto declaration: proto must be of type X3DProtoDeclaration.");

      if (proto .getExecutionContext () !== this)
         throw new Error ("Couldn't add proto declaration: proto does not belong to this execution context.");

      if (this [_protos] .get (name))
         throw new Error (`Couldn't add proto declaration: proto '${name}' already in use.`);

      if (this [_protos] .get (proto .getName ()) === proto)
         throw new Error (`Couldn't add proto declaration: proto '${proto .getName ()}' already added.`);

      name = String (name);

      if (name .length === 0)
         throw new Error ("Couldn't add proto declaration: proto name is empty.");

      this [_protos] .add (name, proto);
      proto .setName (name);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   updateProtoDeclaration (name, proto)
   {
      name = String (name);

      if (!(proto instanceof X3DProtoDeclaration))
         throw new Error ("Couldn't update proto declaration: proto must be of type X3DProtoDeclaration.");

      if (proto .getExecutionContext () !== this)
         throw new Error ("Couldn't update proto declaration: proto does not belong to this execution context.");

      name = String (name);

      if (name .length === 0)
         throw new Error ("Couldn't update proto declaration: proto name is empty.");

      this [_protos] .update (proto .getName (), name, proto);
      proto .setName (name);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   removeProtoDeclaration (name)
   {
      name = String (name);

      this [_protos] .remove (name);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   getProtoDeclarations ()
   {
      return this [_protos];
   },
   getUniqueProtoName (name)
   {
      return getUniqueName (this [_protos], name);
   },
   getExternProtoDeclaration (name)
   {
      name = String (name);

      const externproto = this [_externprotos] .get (name);

      if (externproto)
         return externproto;

      throw new Error (`Extern proto declaration '${name}' not found.`);
   },
   addExternProtoDeclaration (name, externproto)
   {
      name = String (name);

      if (!(externproto instanceof X3DExternProtoDeclaration))
         throw new Error ("Couldn't add extern proto declaration: extern proto must be of type X3DExternProtoDeclaration.");

      if (externproto .getExecutionContext () !== this)
         throw new Error ("Couldn't add extern proto declaration: extern proto does not belong to this execution context.");

      if (this [_externprotos] .get (name))
         throw new Error (`Couldn't add extern proto declaration: extern proto '${name}' already in use.`);

      if (this [_externprotos] .get (externproto .getName ()) === externproto)
         throw new Error (`Couldn't add extern proto declaration: extern proto '${externproto .getName ()}' already added.`);

      name = String (name);

      if (name .length === 0)
         throw new Error ("Couldn't add extern proto declaration: extern proto name is empty.");

      this [_externprotos] .add (name, externproto);
      externproto .setName (name);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   updateExternProtoDeclaration (name, externproto)
   {
      name = String (name);

      if (!(externproto instanceof X3DExternProtoDeclaration))
         throw new Error ("Couldn't update extern proto declaration: extern proto must be of type X3DExternProtoDeclaration.");

      if (externproto .getExecutionContext () !== this)
         throw new Error ("Couldn't update extern proto declaration: extern proto does not belong to this execution context.");

      name = String (name);

      if (name .length === 0)
         throw new Error ("Couldn't update extern proto declaration: extern proto name is empty.");

      this [_externprotos] .update (externproto .getName (), name, externproto);
      externproto .setName (name);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   removeExternProtoDeclaration (name)
   {
      name = String (name);

      this [_externprotos] .remove (name);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   getExternProtoDeclarations ()
   {
      return this [_externprotos];
   },
   getUniqueExternProtoName (name)
   {
      return getUniqueName (this [_externprotos], name);
   },
   addRoute (sourceNode, sourceField, destinationNode, destinationField)
   {
      try
      {
         // Normalize arguments.

         const
            importedSourceNode      = sourceNode      instanceof X3DImportedNode ? sourceNode      : null,
            importedDestinationNode = destinationNode instanceof X3DImportedNode ? destinationNode : null;

         sourceNode       = X3DCast (X3DConstants .X3DNode, sourceNode, false) ?? importedSourceNode;
         sourceField      = String (sourceField);
         destinationNode  = X3DCast (X3DConstants .X3DNode, destinationNode, false) ?? importedDestinationNode;
         destinationField = String (destinationField);

         if (!sourceNode)
            throw new Error ("source node must be of type X3DNode or X3DImportedNode.");

         if (!destinationNode)
            throw new Error ("destination node must be of type X3DNode or X3DImportedNode.");

         // Resolve imported source and destination node.

         sourceNode      = this .getLocalizedNode (sourceNode);
         destinationNode = this .getLocalizedNode (destinationNode);

         // Add route.

         const
            id    = X3DRoute .getRouteId (sourceNode, sourceField, destinationNode, destinationField),
            route = this [_routes] .get (id);

         if (route)
         {
            return route;
         }
         else
         {
            const route = new X3DRoute (this, sourceNode, sourceField, destinationNode, destinationField);

            this [_routes] .add (id, route);

            return route;
         }
      }
      catch (error)
      {
         throw new Error (`Bad ROUTE specification: ${error .message}`);
      }
   },
   deleteRoute (route)
   {
      // Case: sourceNode, sourceField, destinationNode, destinationField.
      if (arguments .length === 4)
         route = this .getRoute (... arguments);

      if (!(route instanceof X3DRoute))
         return;

      if (this [_routes] .get (route .getRouteId ()) !== route)
         return;

      this [_routes] .remove (route .getRouteId ());

      route .dispose ();
   },
   getRoute (sourceNode, sourceField, destinationNode, destinationField)
   {
      // Normalize arguments.

      const
         importedSourceNode      = sourceNode      instanceof X3DImportedNode ? sourceNode      : null,
         importedDestinationNode = destinationNode instanceof X3DImportedNode ? destinationNode : null;

      sourceNode       = X3DCast (X3DConstants .X3DNode, sourceNode, false) ?? importedSourceNode;
      sourceField      = String (sourceField)
      destinationNode  = X3DCast (X3DConstants .X3DNode, destinationNode, false) ?? importedDestinationNode;
      destinationField = String (destinationField)

      if (!sourceNode)
         throw new Error ("Bad ROUTE specification: sourceNode must be of type X3DNode.");

      if (!destinationNode)
         throw new Error ("Bad ROUTE specification: destinationNode must be of type X3DNode.");

      // Resolve imported source and destination node.

      sourceNode      = this .getLocalizedNode (sourceNode);
      destinationNode = this .getLocalizedNode (destinationNode);

      // Return route.

      return this [_routes] .get (X3DRoute .getRouteId (sourceNode, sourceField, destinationNode, destinationField));
   },
   getRoutes ()
   {
      return this [_routes];
   },
   getWorldInfos ()
   {
      return this ._worldInfos;
   },
   addWorldInfo (worldInfoNode)
   {
      this ._worldInfos .push (worldInfoNode);
   },
   removeWorldInfo (worldInfoNode)
   {
      for (const [i, worldInfo] of this ._worldInfos .entries ())
      {
         if (worldInfo .getValue () !== worldInfoNode)
            continue;

         this ._worldInfos .splice (i, 1);
         break;
      }
   },
   toVRMLStream (generator)
   {
      generator .PushExecutionContext (this);
      generator .EnterScope ();
      generator .NamedNodes (this .getNamedNodes ());
      generator .ImportedNodes (this .getImportedNodes ());

      // Output extern protos

      this .getExternProtoDeclarations () .toVRMLStream (generator);

      // Output protos

      this .getProtoDeclarations () .toVRMLStream (generator);

      // Output root nodes

      const rootNodes = this .getRootNodes ();

      for (let i = 0, length = rootNodes .length; i < length; ++ i)
      {
         const rootNode = rootNodes [i];

         generator .string += generator .Indent ();

         if (rootNode)
            rootNode .toVRMLStream (generator);
         else
            generator .string += "NULL";

         generator .string += generator .TidyBreak ();

         if (i !== length - 1)
            generator .string += generator .TidyBreak ();
      }

      // Output imported nodes

      const importedNodes = this .getImportedNodes ();

      if (importedNodes .length)
      {
         generator .string += generator .TidyBreak ();

         importedNodes .toVRMLStream (generator);
      }

      // Output routes

      const routes = this .getRoutes ();

      if (routes .length)
      {
         generator .string += generator .TidyBreak ();

         routes .toVRMLStream (generator);
      }

      generator .LeaveScope ();
      generator .PopExecutionContext ();
   },
   toXMLStream (generator)
   {
      generator .PushExecutionContext (this);
      generator .EnterScope ();
      generator .NamedNodes (this .getNamedNodes ());
      generator .ImportedNodes (this .getImportedNodes ());

      // Output extern protos

      this .getExternProtoDeclarations () .toXMLStream (generator);

      // Output protos

      this .getProtoDeclarations () .toXMLStream (generator);

      // Output root nodes

      const rootNodes = this .getRootNodes ();

      if (rootNodes .length)
      {
         rootNodes .toXMLStream (generator);

         generator .string += generator .TidyBreak ();
      }

      // Output imported nodes

      this .getImportedNodes () .toXMLStream (generator);

      // Output routes

      this .getRoutes () .toXMLStream (generator);

      generator .LeaveScope ();
      generator .PopExecutionContext ();
   },
   toJSONStream (generator)
   {
      generator .PushExecutionContext (this);
      generator .EnterScope ();
      generator .NamedNodes (this .getNamedNodes ());
      generator .ImportedNodes (this .getImportedNodes ());


      // Extern proto declarations

      this .getExternProtoDeclarations () .toJSONStream (generator, true);


      // Proto declarations

      this .getProtoDeclarations () .toJSONStream (generator, true);


      // Root nodes

      if (this .getRootNodes () .length)
      {
         for (const rootNode of this .getRootNodes ())
         {
            generator .string += generator .Indent ();

            if (rootNode)
            {
               rootNode .toJSONStream (generator);
            }
            else
            {
               generator .string += generator .Indent ();
               generator .string += "null";
            }

            generator .string += ',';
            generator .string += generator .TidyBreak ();
         }
      }


      // Imported nodes

      this .getImportedNodes () .toJSONStream (generator, true);


      // Routes

      this .getRoutes () .toJSONStream (generator, true);


      generator .LeaveScope ();
      generator .PopExecutionContext ();
   },
   dispose ()
   {
      for (const route of Array .from (this [_routes]))
         this .deleteRoute (route);

      this [_outerNode] = null;
      this [_namedNodes]    .clear ();
      this [_importedNodes] .clear ();
      this [_protos]        .clear ();
      this [_externprotos]  .clear ();
      this [_routes]        .clear ();

      X3DBaseNode .prototype .dispose .call (this);
   },
});

for (const key of Object .keys (X3DExecutionContext .prototype))
   Object .defineProperty (X3DExecutionContext .prototype, key, { enumerable: false });

Object .defineProperties (X3DExecutionContext .prototype,
{
   specificationVersion:
   {
      get: X3DExecutionContext .prototype .getSpecificationVersion,
      enumerable: true,
   },
   encoding:
   {
      get: X3DExecutionContext .prototype .getEncoding,
      enumerable: true,
   },
   profile:
   {
      get: X3DExecutionContext .prototype .getProfile,
      enumerable: true,
   },
   components:
   {
      get: X3DExecutionContext .prototype .getComponents,
      enumerable: true,
   },
   worldURL:
   {
      get: X3DExecutionContext .prototype .getWorldURL,
      enumerable: true,
   },
   baseURL:
   {
      get: X3DExecutionContext .prototype .getBaseURL,
      enumerable: true,
   },
   units:
   {
      get: X3DExecutionContext .prototype .getUnits,
      enumerable: true,
   },
   namedNodes:
   {
      get: X3DExecutionContext .prototype .getNamedNodes,
      enumerable: true,
   },
   importedNodes:
   {
      get: X3DExecutionContext .prototype .getImportedNodes,
      enumerable: true,
   },
   rootNodes:
   {
      get: X3DExecutionContext .prototype .getRootNodes,
      set: X3DExecutionContext .prototype .setRootNodes,
      enumerable: true,
   },
   protos:
   {
      get: X3DExecutionContext .prototype .getProtoDeclarations,
      enumerable: true,
   },
   externprotos:
   {
      get: X3DExecutionContext .prototype .getExternProtoDeclarations,
      enumerable: true,
   },
   routes:
   {
      get: X3DExecutionContext .prototype .getRoutes,
      enumerable: true,
   },
});

Object .defineProperties (X3DExecutionContext,
{
   typeName:
   {
      value: "X3DExecutionContext",
      enumerable: true,
   },
});

X3DConstants .addConstant (X3DExecutionContext .typeName);

export default X3DExecutionContext;

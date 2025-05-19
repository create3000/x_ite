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

import X3DField                  from "../Base/X3DField.js";
import X3DBaseNode               from "../Base/X3DBaseNode.js";
import X3DNode                   from "../Components/Core/X3DNode.js";
import X3DPrototypeInstance      from "../Components/Core/X3DPrototypeInstance.js";
import Fields                    from "../Fields.js";
import X3DParser                 from "./X3DParser.js";
import VRMLParser                from "./VRMLParser.js";
import HTMLSupport               from "./HTMLSupport.js";
import X3DExternProtoDeclaration from "../Prototype/X3DExternProtoDeclaration.js";
import X3DProtoDeclaration       from "../Prototype/X3DProtoDeclaration.js";
import X3DConstants              from "../Base/X3DConstants.js";
import DEVELOPMENT               from "../DEVELOPMENT.js";

const AccessType =
{
   initializeOnly: X3DConstants .initializeOnly,
   inputOnly:      X3DConstants .inputOnly,
   outputOnly:     X3DConstants .outputOnly,
   inputOutput:    X3DConstants .inputOutput,
};

function XMLParser (scene)
{
   X3DParser .call (this, scene);

   this .protoDeclarations = [ ];
   this .parents           = [ ];
   this .parser            = new VRMLParser (scene);
   this .url               = new Fields .MFString ();
   this .protoNames        = new Map ();
   this .protoFields       = new WeakMap ();

   this .parser .setUnits (!!scene);
}

Object .assign (Object .setPrototypeOf (XMLParser .prototype, X3DParser .prototype),
{
   getEncoding ()
   {
      return "XML";
   },
   setInput (xmlElement)
   {
      try
      {
         if (typeof xmlElement === "string")
            xmlElement = $.parseXML (xmlElement);

         this .input = xmlElement;
         this .xml   = this .isXML (xmlElement);

         if (!this .xml)
            Object .assign (this, HTMLParser);
      }
      catch
      {
         this .input = undefined;
      }
   },
   isValid ()
   {
      return (this .input instanceof XMLDocument) || (this .input instanceof HTMLElement) || (this .input === null);
   },
   isXML (element)
   {
      if (element instanceof HTMLElement)
         return false;
      else
         return true;
   },
   parseIntoScene (resolve, reject)
   {
      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      this .resolve = resolve;
      this .reject  = reject;

      scene .setEncoding ("XML");
      scene .setProfile (browser .getProfile ("Full"));

      this .xmlElement (this .input);
   },
   xmlElement (xmlElement)
   {
      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      if (xmlElement === null)
         return this .resolve ?.(scene);

      switch (xmlElement .nodeName)
      {
         case "#document":
         {
            const X3D = $(xmlElement) .children ("X3D");

            if (X3D .length)
            {
               for (const xmlElement of X3D)
                  this .x3dElement (xmlElement);
            }
            else
            {
               if (this .resolve)
               {
                  browser .loadComponents (scene) .then (() =>
                  {
                     this .childrenElements (xmlElement);
                     this .resolve (scene);
                  })
                  .catch (this .reject);
               }
               else
               {
                  this .childrenElements (xmlElement);
               }
            }

            break;
         }
         case "X3D":
         {
            this .x3dElement (xmlElement);
            break;
         }
         case "Scene":
         case "SCENE":
         {
            if (this .resolve)
            {
               browser .loadComponents (scene) .then (() =>
               {
                  this .sceneElement (xmlElement);
                  this .resolve (scene);
               })
               .catch (this .reject);
            }
            else
            {
               this .sceneElement (xmlElement);
            }

            break;
         }
         default:
         {
            if (this .resolve)
            {
               browser .loadComponents (scene) .then (() =>
               {
                  this .childrenElements (xmlElement);
                  this .resolve (scene);
               })
               .catch (this .reject);
            }
            else
            {
               this .childrenElements (xmlElement);
            }

            break;
         }
      }
   },
   x3dElement (xmlElement)
   {
      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      try
      {
         // Profile

         const
            profileNameId = xmlElement .getAttribute ("profile"),
            profile       = browser .getProfile (profileNameId || "Full");

         $.data (this .scene, "X3D", xmlElement);

         scene .setProfile (profile);
      }
      catch (error)
      {
         console .error (error);
      }

      // Specification version

      const specificationVersion = xmlElement .getAttribute ("version");

      if (specificationVersion)
         scene .setSpecificationVersion (specificationVersion);

      // Process child nodes

      for (const childNode of xmlElement .childNodes)
         this .x3dElementChildHead (childNode)

      if (!this .xml)
         this .headElement (xmlElement);

      if (this .resolve)
      {
         browser .loadComponents (scene) .then (() =>
         {
            for (const childNode of xmlElement .childNodes)
               this .x3dElementChildScene (childNode)

            this .resolve (scene);
         })
         .catch (this .reject);
      }
      else
      {
         for (const childNode of xmlElement .childNodes)
            this .x3dElementChildScene (childNode)
      }
   },
   x3dElementChildHead (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "head":
         case "HEAD":
            this .headElement (xmlElement);
            return;
      }
   },
   x3dElementChildScene (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "Scene":
         case "SCENE":
            this .sceneElement (xmlElement);
            return;
      }
   },
   headElement (xmlElement)
   {
      for (const childNode of xmlElement .childNodes)
         this .headElementChild (childNode);
   },
   headElementChild (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "component":
         case "COMPONENT":
            this .componentElement (xmlElement);
            return;
         case "unit":
         case "UNIT":
            this .unitElement (xmlElement);
            return;
         case "meta":
         case "META":
            this .metaElement (xmlElement);
            return;
      }
   },
   componentElement (xmlElement)
   {
      try
      {
         const
            componentNameIdCharacters = xmlElement .getAttribute ("name"),
            componentSupportLevel     = xmlElement .getAttribute ("level");

         if (componentNameIdCharacters === null)
            return console .warn ("XML Parser: Bad component statement. Expected name attribute.");

         if (componentSupportLevel === null)
            return console .warn ("XML Parser: Bad component statement. Expected level attribute.");

         const component = this .getBrowser () .getComponent (componentNameIdCharacters, parseInt (componentSupportLevel));

         this .getScene () .updateComponent (component);
      }
      catch (error)
      {
         console .log (error .message);
      }
   },
   unitElement (xmlElement)
   {
      const
         category         = xmlElement .getAttribute ("category"),
         name             = xmlElement .getAttribute ("name"),
         conversionFactor = xmlElement .getAttribute ("conversionFactor"); //works for html5 as well

      if (category === null)
         return console .warn ("XML Parser: Bad unit statement. Expected category attribute.");

      if (name === null)
         return console .warn ("XML Parser: Bad unit statement. Expected name attribute.");

      if (conversionFactor === null)
         return console .warn ("XML Parser: Bad unit statement. Expected conversionFactor attribute.");

      this .getScene () .updateUnit (category, name, parseFloat (conversionFactor));
   },
   metaElement (xmlElement)
   {
      const
         metakey   = xmlElement .getAttribute ("name"),
         metavalue = xmlElement .getAttribute ("content");

      if (metakey === null)
         return console .warn ("XML Parser: Bad meta statement. Expected name attribute.");

      if (metavalue === null)
         return console .warn ("XML Parser: Bad meta statement. Expected content attribute.");

      this .getScene () .addMetaData (metakey, metavalue);
   },
   sceneElement (xmlElement)
   {
      $.data (xmlElement, "node", this .scene);

      this .childrenElements (xmlElement);
   },
   childrenElements (xmlElement)
   {
      for (const childNode of xmlElement .childNodes)
         this .childElement (childNode);
   },
   childElement (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "#comment":
         case "#text":
            return;

         case "#cdata-section":
            this .cdataNode (xmlElement);
            return;

         case "ExternProtoDeclare":
         case "EXTERNPROTODECLARE":
            this .externProtoDeclareElement (xmlElement);
            return;

         case "ProtoDeclare":
         case "PROTODECLARE":
            this .protoDeclareElement (xmlElement);
            return;

         case "IS":
            this .isElement (xmlElement);
            return;

         case "ProtoInstance":
         case "PROTOINSTANCE":
            this .protoInstanceElement (xmlElement);
            return;

         case "fieldValue":
         case "FIELDVALUE":
            this .fieldValueElement (xmlElement);
            return;

         case "field":
         case "FIELD":
            this .fieldElement (xmlElement);
            return;

         case "ROUTE":
            this .routeElement (xmlElement);
            return;

         case "IMPORT":
            this .importElement (xmlElement);
            return;

         case "EXPORT":
            this .exportElement (xmlElement);
            return;

         default:
            this .nodeElement (xmlElement);
            return;
      }
   },
   externProtoDeclareElement (xmlElement)
   {
      const name = xmlElement .getAttribute ("name");

      if (this .id (name))
      {
         const url = xmlElement .getAttribute ("url");

         this .parser .setInput (url ?? "");
         this .parser .sfstringValues (this .url);

         if (!this .url .length)
            console .warn ("XML Parser: Bad ExternProtoDeclare statement. Expected url attribute with value.");

         const externproto = new X3DExternProtoDeclaration (this .getExecutionContext (), this .url);

         this .pushParent (externproto);
         this .protoInterfaceElement (xmlElement);
         this .popParent ();
         this .addProtoFieldNames (externproto);

         externproto .setup ();

         try
         {
            const existingExternProto = this .getExecutionContext () .getExternProtoDeclaration (name);

            this .getExecutionContext () .updateExternProtoDeclaration (this .getExecutionContext () .getUniqueExternProtoName (name), existingExternProto);

            console .warn (`Extern proto '${name}' already defined, renamed existing one.`);
         }
         catch
         { }

         this .getExecutionContext () .updateExternProtoDeclaration (name, externproto);

         this .addProtoName (name);
      }
   },
   protoDeclareElement (xmlElement)
   {
      const name = xmlElement .getAttribute ("name");

      if (this .id (name))
      {
         const proto = new X3DProtoDeclaration (this .getExecutionContext ());

         for (const childNode of xmlElement .childNodes)
         {
            switch (childNode .nodeName)
            {
               case "ProtoInterface":
               case "PROTOINTERFACE":
               {
                  this .pushParent (proto);
                  this .protoInterfaceElement (childNode);
                  this .popParent ();
                  this .addProtoFieldNames (proto);
                  break;
               }
               default:
                  continue;
            }

            break;
         }

         for (const childNode of xmlElement .childNodes)
         {
            switch (childNode .nodeName)
            {
               case "ProtoBody":
               case "PROTOBODY":
               {
                  this .pushExecutionContext (proto .getBody ());
                  this .pushParent (proto);
                  this .protoBodyElement (childNode);
                  this .popParent ();
                  this .popExecutionContext ();
                  break;
               }
               default:
                  continue;
            }

            break;
         }

         proto .setup ();

         try
         {
            const existingProto = this .getExecutionContext () .getProtoDeclaration (name);

            this .getExecutionContext () .updateProtoDeclaration (this .getExecutionContext () .getUniqueProtoName (name), existingProto);

            console .warn (`Proto '${name}' already defined, renamed existing one.`);
         }
         catch
         { }

         this .getExecutionContext () .updateProtoDeclaration (name, proto);

         this .addProtoName (name);
      }
   },
   protoInterfaceElement (xmlElement)
   {
      for (const childNode of xmlElement .childNodes)
         this .protoInterfaceElementChild (childNode);
   },
   protoInterfaceElementChild (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "field": // User-defined field
         case "FIELD": // User-defined field
            this .fieldElement (xmlElement);
            return;
      }
   },
   fieldElement (xmlElement)
   {
      try
      {
         if (this .getParents () .length === 0)
            return;

         const node = this .getParent ();

         if (!(node instanceof X3DBaseNode))
            return;

         if (!node .canUserDefinedFields ())
            return;

         const
            accessType = AccessType [xmlElement .getAttribute ("accessType")] || X3DConstants .initializeOnly,
            Field      = Fields [xmlElement .getAttribute ("type")];

         if (!Field)
            return;

         const name = xmlElement .getAttribute ("name");

         if (!this .id (name))
            return;

         const field = new Field ();

         if (accessType & X3DConstants .initializeOnly)
         {
            this .fieldValue (field, xmlElement .getAttribute ("value"));

            this .pushParent (field);
            this .childrenElements (xmlElement);
            this .popParent ();
         }

         node .addUserDefinedField (accessType, name, field);
      }
      catch (error)
      {
         console .error (error);
      }
   },
   protoBodyElement (xmlElement)
   {
      this .childrenElements (xmlElement);
   },
   isElement (xmlElement)
   {
      if (this .isInsideProtoDeclaration ())
      {
         for (const childNode of xmlElement .childNodes)
            this .isElementChild (childNode);
      }
   },
   isElementChild (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "connect":
         case "CONNECT":
            this .connectElement (xmlElement);
            return;
      }
   },
   connectElement (xmlElement)
   {
      const
         nodeFieldName  = xmlElement .getAttribute ("nodeField"),
         protoFieldName = xmlElement .getAttribute ("protoField");

      if (nodeFieldName === null)
         return console .warn ("XML Parser: Bad connect statement. Expected nodeField attribute.");

      if (protoFieldName === null)
         return console .warn ("XML Parser: Bad connect statement. Expected protoField attribute.");

      try
      {
         if (this .getParents () .length === 0)
            return;

         const
            node  = this .getParent (),
            proto = this .getOuterNode ();

         if (!(node instanceof X3DNode))
            return;

         const
            nodeField  = node .getField (nodeFieldName),
            protoField = proto .getField (protoFieldName);

         if (nodeField .getType () === protoField .getType ())
         {
            if (protoField .isReference (nodeField .getAccessType ()))
               nodeField .addReference (protoField);
            else
               throw new Error (`Field '${nodeField .getName ()}' and '${protoField .getName ()}' in PROTO ${proto .getName ()} are incompatible as an IS mapping.`);
         }
         else
            throw new Error (`Field '${nodeField .getName ()}' and '${protoField .getName ()}' in PROTO ${this .proto .getName()} have different types.`);
      }
      catch (error)
      {
         console .warn (`XML Parser: Couldn't create IS reference. ${error .message}`);
      }
   },
   protoInstanceElement (xmlElement)
   {
      try
      {
         if (this .useAttribute (xmlElement))
            return;

         const name = xmlElement .getAttribute ("name");

         if (this .id (name))
         {
            const node = this .getExecutionContext () .createProto (name, false);

            if (!node)
               throw new Error (`Unknown proto or externproto type '${name}'.`);

            ///DOMIntegration: attach node to DOM xmlElement for access from DOM.
            $.data (xmlElement, "node", node);

            this .defAttribute (xmlElement, node);
            this .addNode (xmlElement, node);
            this .pushParent (node);
            this .childrenElements (xmlElement);

            if (!this .isInsideProtoDeclaration ())
               node .setup ();

            this .popParent ();
         }
      }
      catch (error)
      {
         console .warn ("XML Parser: ", error .message);

         if (DEVELOPMENT)
            console .error (error);
      }
   },
   fieldValueElement (xmlElement)
   {
      try
      {
         if (this .getParents () .length === 0)
            return;

         const
            node = this .getParent (),
            name = xmlElement .getAttribute ("name");

         if (!(node instanceof X3DPrototypeInstance))
            return;

         if (!this .id (name))
            return;

         const
            field      = node .getField (name),
            accessType = field .getAccessType ();

         if (accessType & X3DConstants .initializeOnly)
         {
            if (field .getType () === X3DConstants .MFNode)
            {
               field .length = 0
            }

            this .fieldValue (field, xmlElement .getAttribute ("value"));

            this .pushParent (field);
            this .childrenElements (xmlElement);
            this .popParent ();
         }
      }
      catch (error)
      {
         console .warn (`XML Parser: Couldn't assign field value. ${error .message}`);
      }
   },
   nodeElement (xmlElement)
   {
      try
      {
         if (this .useAttribute (xmlElement))
            return;

         const node = this .getExecutionContext () .createNode (this .nodeNameToCamelCase (xmlElement .nodeName), false)
            ?? this .getExecutionContext () .createProto (this .protoNameToCamelCase (xmlElement .nodeName), false);

         if (!node)
            throw new Error (`Unknown node type '${xmlElement .nodeName}', you probably have insufficient component/profile statements and/or an inappropriate specification version.`);

         ///DOMIntegration: attach node to DOM xmlElement for access from DOM.
         $.data (xmlElement, "node", node);

         //DOMIntegration: Script node support for HTML.
         if (xmlElement .nodeName === "SCRIPT")
            this .scriptElement (xmlElement);

         this .defAttribute (xmlElement, node);
         this .addNode (xmlElement, node);
         this .pushParent (node);
         this .nodeAttributes (xmlElement, node);
         this .childrenElements (xmlElement);

         if (!this .isInsideProtoDeclaration ())
            node .setup ();

         this .popParent ();
      }
      catch (error)
      {
         // NULL

         if (xmlElement .nodeName == "NULL")
         {
            this .addNode (xmlElement, null);
            return;
         }

         if (DEVELOPMENT)
            console .error (error);
         else
            console .error (`XML Parser: ${error .message}`);
      }
   },
   scriptElement (element)
   {
      const
         scriptDocument = $.parseXML (element .outerHTML, "application/xml"),
         childNodes     = scriptDocument .children [0] .childNodes;

      element .textContent = "// Content moved into childNodes.";

      for (const childNode of childNodes)
      {
         // Add elements and cdata.
         if (childNode .nodeType === 1 || childNode .nodeType === 4)
            element .appendChild (childNode);
      }
   },
   routeElement (xmlElement)
   {
      try
      {
         const
            sourceNodeName      = xmlElement .getAttribute ("fromNode"),
            sourceField         = xmlElement .getAttribute ("fromField"),
            destinationNodeName = xmlElement .getAttribute ("toNode"),
            destinationField    = xmlElement .getAttribute ("toField");

         if (sourceNodeName === null)
            throw new Error ("Bad ROUTE statement: Expected fromNode attribute.");

         if (sourceField === null)
            throw new Error ("Bad ROUTE statement: Expected fromField attribute.");

         if (destinationNodeName === null)
            throw new Error ("Bad ROUTE statement: Expected toNode attribute.");

         if (destinationField === null)
            throw new Error ("Bad ROUTE statement: Expected toField attribute.");

         const
            executionContext = this .getExecutionContext (),
            sourceNode       = executionContext .getLocalNode (sourceNodeName),
            destinationNode  = executionContext .getLocalNode (destinationNodeName),
            route            = executionContext .addRoute (sourceNode, sourceField, destinationNode, destinationField);

         ///DOMIntegration: attach node to DOM xmlElement for access from DOM.
         $.data (xmlElement, "node", route);
      }
      catch (error)
      {
         console .warn (`XML Parser: ${error .message}`);

         if (DEVELOPMENT)
            console .error (error);
      }
   },
   importElement (xmlElement)
   {
      try
      {
         const
            inlineNodeName   = xmlElement .getAttribute ("inlineDEF"),
            exportedNodeName = xmlElement .getAttribute ("importedDEF") || xmlElement .getAttribute ("exportedDEF"),
            localNodeName    = xmlElement .getAttribute ("AS") || exportedNodeName;

         if (inlineNodeName === null)
            throw new Error ("Bad IMPORT statement: Expected inlineDEF attribute.");

         if (exportedNodeName === null)
            throw new Error ("Bad IMPORT statement: Expected importedDEF attribute.");

         const inlineNode = this .getExecutionContext () .getNamedNode (inlineNodeName);

         // Rename existing imported node.

         this .renameExistingNode (localNodeName);

         // Add new imported node.

         this .getExecutionContext () .addImportedNode (inlineNode, exportedNodeName, localNodeName);
      }
      catch (error)
      {
         console .warn (`XML Parser: ${error .message}`);
      }
   },
   exportElement (xmlElement)
   {
      try
      {
         const
            localNodeName    = xmlElement .getAttribute ("localDEF"),
            exportedNodeName = xmlElement .getAttribute ("AS") || localNodeName;

         if (localNodeName === null)
            throw new Error ("Bad EXPORT statement: Expected localDEF attribute.");

         const localNode = this .getExecutionContext () .getLocalNode (localNodeName);

         try
         {
            const existingNode = this .getScene () .getExportedNode (exportedNodeName);

            this .getScene () .addExportedNode (this .getScene () .getUniqueExportName (exportedNodeName), existingNode);
         }
         catch
         { }

         this .getScene () .updateExportedNode (exportedNodeName, localNode);
      }
      catch (error)
      {
         console .warn (`XML Parser: ${error .message}`);
      }
   },
   cdataNode (xmlElement)
   {
      if (this .getParents () .length === 0)
         return;

      const node = this .getParent ();

      if (node instanceof X3DNode)
         node .getSourceText () ?.push (xmlElement .data);
   },
   useAttribute (xmlElement)
   {
      try
      {
         const name = xmlElement .getAttribute ("USE");

         if (this .id (name))
         {
            const node = this .getExecutionContext () .getNamedNode (name);

            if (this .nodeNameToCamelCase (xmlElement .nodeName) === "ProtoInstance")
            {
               if (!node .getNodeType () .includes (X3DConstants .X3DPrototypeInstance))
               {
                  console .warn (`XML Parser: DEF/USE mismatch, '${name}', referenced node is not of type X3DPrototypeInstance.`);
               }
               else if (xmlElement .getAttribute ("name") !== node .getNodeTypeName ())
               {
                  console .warn (`XML Parser: DEF/USE mismatch, '${name}', name ${xmlElement .getAttribute ("name")} != ${node .getNodeTypeName ()}.`);
               }
            }
            else if (this .nodeNameToCamelCase (xmlElement .nodeName) !== node .getNodeTypeName ())
            {
               console .warn (`XML Parser: DEF/USE mismatch, '${name}', ${xmlElement .nodeName} != ${node .getNodeTypeName ()}.`);
            }

            this .addNode (xmlElement, node .getValue ());
            return true;
         }
      }
      catch (error)
      {
         console .warn (`XML Parser: Invalid USE name: ${error .message}`);
      }

      return false;
   },
   defAttribute (xmlElement, node)
   {
      try
      {
         const name = xmlElement .getAttribute ("DEF");

         if (name)
         {
            this .renameExistingNode (name);

            this .getExecutionContext () .updateNamedNode (name, node);
         }
      }
      catch (error)
      {
         console .warn (`XML Parser: Invalid DEF name: ${error .message}`);
      }
   },
   nodeAttributes (xmlElement, node)
   {
      for (const xmlAttribute of xmlElement .attributes)
         this .nodeAttribute (xmlAttribute, node);
   },
   nodeAttribute (xmlAttribute, node)
   {
      try
      {
         const field = node .getPredefinedField (this .attributeToCamelCase (node, xmlAttribute .name));

         if (field .isInitializable ())
            this .fieldValue (field, xmlAttribute .value);
      }
      catch (error)
      {
         //console .error (error);
      }
   },
   fieldValue (field, value)
   {
      if (value === null)
         return false;

      this .parser .pushExecutionContext (this .getExecutionContext ());
      this .parser .setInput (value);

      const ok = this [field .getType ()] .call (this .parser, field, field .getUnit ());

      this .parser .popExecutionContext ();

      return ok;
   },
   id (string)
   {
      if (string === null)
         return false;

      if (string .length === 0)
         return false;

      return true;
   },
   getParents ()
   {
      return this .parents;
   },
   getParent ()
   {
      return this .parents .at (-1);
   },
   pushParent (parent)
   {
      return this .parents .push (parent);
   },
   popParent ()
   {
      this .parents .pop ();
   },
   addNode (xmlElement, node)
   {
      if (this .parents .length === 0 || this .getParent () instanceof X3DProtoDeclaration)
      {
         this .getExecutionContext () .rootNodes .push (node);
         return;
      }

      const parent = this .getParent ();

      if (parent instanceof X3DField)
      {
         switch (parent .getType ())
         {
            case X3DConstants .SFNode:
               parent .setValue (node);
               return;

            case X3DConstants .MFNode:
               parent .push (node);
               return;
         }

         return;
      }

      // parent is a node.

      try
      {
         const containerField = xmlElement .getAttribute ("containerField")
            || node ?.getContainerField (this .getExecutionContext () .getSpecificationVersion ());

         if (!containerField)
         {
            console .warn ("XML Parser: Node must have a container field attribute.");
            return;
         }

         const field = parent .getField (containerField);

         switch (field .getType ())
         {
            case X3DConstants .SFNode:
               field .setValue (node);
               return;

            case X3DConstants .MFNode:
               field .push (node);
               return;
         }
      }
      catch (error)
      {
         // console .error (error);

         if (node ?.getType () .includes (X3DConstants .X3DMetadataObject))
         {
            xmlElement .setAttribute ("containerField", "metadata");

            this .addNode (xmlElement, node);
         }
      }
   },
   // Overloaded by HTMLParser.
   addProtoName (name)
   { },
   addProtoFieldNames (protoNode)
   { },
   protoNameToCamelCase (typeName)
   {
      return typeName;
   },
   nodeNameToCamelCase (typeName)
   {
      return typeName;
   },
   attributeToCamelCase (node, name)
   {
      return name;
   },
});

Object .assign (XMLParser .prototype,
{
   [X3DConstants .SFBool]:      VRMLParser .prototype .sfboolValue,
   [X3DConstants .SFColor]:     VRMLParser .prototype .sfcolorValue,
   [X3DConstants .SFColorRGBA]: VRMLParser .prototype .sfcolorrgbaValue,
   [X3DConstants .SFDouble]:    VRMLParser .prototype .sfdoubleValue,
   [X3DConstants .SFFloat]:     VRMLParser .prototype .sfdoubleValue,
   [X3DConstants .SFImage]:     VRMLParser .prototype .sfimageValue,
   [X3DConstants .SFInt32]:     VRMLParser .prototype .sfint32Value,
   [X3DConstants .SFMatrix3f]:  VRMLParser .prototype .sfmatrix3Value,
   [X3DConstants .SFMatrix3d]:  VRMLParser .prototype .sfmatrix3Value,
   [X3DConstants .SFMatrix4f]:  VRMLParser .prototype .sfmatrix4Value,
   [X3DConstants .SFMatrix4d]:  VRMLParser .prototype .sfmatrix4Value,
   [X3DConstants .SFNode] (field)
   {
      field .setValue (null);
      return true;
   },
   [X3DConstants .SFRotation]:  VRMLParser .prototype .sfrotationValue,
   [X3DConstants .SFString] (field)
   {
      field .setValue (Fields .SFString .unescape (this .input));
      return true;
   },
   [X3DConstants .SFTime]:      VRMLParser .prototype .sfdoubleValue,
   [X3DConstants .SFVec2d]:     VRMLParser .prototype .sfvec2Value,
   [X3DConstants .SFVec2f]:     VRMLParser .prototype .sfvec2Value,
   [X3DConstants .SFVec3d]:     VRMLParser .prototype .sfvec3Value,
   [X3DConstants .SFVec3f]:     VRMLParser .prototype .sfvec3Value,
   [X3DConstants .SFVec4d]:     VRMLParser .prototype .sfvec4Value,
   [X3DConstants .SFVec4f]:     VRMLParser .prototype .sfvec4Value,

   [X3DConstants .VrmlMatrix]:  VRMLParser .prototype .sfmatrix4Value,

   [X3DConstants .MFBool]:      VRMLParser .prototype .sfboolValues,
   [X3DConstants .MFColor]:     VRMLParser .prototype .sfcolorValues,
   [X3DConstants .MFColorRGBA]: VRMLParser .prototype .sfcolorValues,
   [X3DConstants .MFDouble]:    VRMLParser .prototype .sfdoubleValues,
   [X3DConstants .MFFloat]:     VRMLParser .prototype .sfdoubleValues,
   [X3DConstants .MFImage]:     VRMLParser .prototype .sfimageValues,
   [X3DConstants .MFInt32]:     VRMLParser .prototype .sfint32Values,
   [X3DConstants .MFMatrix3d]:  VRMLParser .prototype .sfmatrixValues,
   [X3DConstants .MFMatrix3f]:  VRMLParser .prototype .sfmatrixValues,
   [X3DConstants .MFMatrix4d]:  VRMLParser .prototype .sfmatrixValues,
   [X3DConstants .MFMatrix4f]:  VRMLParser .prototype .sfmatrixValues,
   [X3DConstants .MFNode] (field)
   {
      field .length = 0;
      return true;
   },
   [X3DConstants .MFRotation]:  VRMLParser .prototype .sfrotationValues,
   [X3DConstants .MFString]:    VRMLParser .prototype .sfstringValues,
   [X3DConstants .MFTime]:      VRMLParser .prototype .sfdoubleValues,
   [X3DConstants .MFVec2d]:     VRMLParser .prototype .sfvecValues,
   [X3DConstants .MFVec2f]:     VRMLParser .prototype .sfvecValues,
   [X3DConstants .MFVec3d]:     VRMLParser .prototype .sfvecValues,
   [X3DConstants .MFVec3f]:     VRMLParser .prototype .sfvecValues,
   [X3DConstants .MFVec4d]:     VRMLParser .prototype .sfvecValues,
   [X3DConstants .MFVec4f]:     VRMLParser .prototype .sfvecValues,
});

// HTML Support

const HTMLParser =
{
   addProtoName (name)
   {
      // DOMIntegration: add uppercase versions of proto name.

      this .protoNames .set (name,                 name);
      this .protoNames .set (name .toUpperCase (), name);
   },
   addProtoFieldNames: (() =>
   {
      const reservedAttributes = new Set ();

      for (const reservedAttribute of [
         "DEF",
         "USE",
         "containerField",
      ])
      {
         reservedAttributes
            .add (reservedAttribute)
            .add (reservedAttribute .toLowerCase ());
      }

      return function (protoNode)
      {
         //DOMIntegration: handle lowercase versions of field names.

         const fields = new Map ();

         this .protoFields .set (protoNode, fields);

         for (const { name } of protoNode .getFieldDefinitions ())
         {
            if (reservedAttributes .has (name))
               continue;

            fields .set (name,                 name);
            fields .set (name .toLowerCase (), name);
         }
      };
   })(),
   protoNameToCamelCase (typeName)
   {
      //DOMIntegration: handle uppercase versions of node names.
      return this .protoNames .get (typeName);
   },
   nodeNameToCamelCase (typeName)
   {
      //DOMIntegration: handle uppercase versions of node names.
      return HTMLSupport .getNodeTypeName (typeName);
   },
   attributeToCamelCase (node, name)
   {
      //DOMIntegration: handle lowercase versions of field names.

      if (node instanceof X3DPrototypeInstance)
         return this .protoFields .get (node .getProtoNode ()) .get (name);

      return HTMLSupport .getFieldName (name);
   },
};

X3DField .prototype .fromXMLString = function (string, scene)
{
   const parser = new XMLParser (scene);

   if (parser .fieldValue (this, string))
      return;

   throw new Error (`Couldn't read value for field '${this .getName ()}'.`);
};

export default XMLParser;

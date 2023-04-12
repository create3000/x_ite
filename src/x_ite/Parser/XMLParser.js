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
import X3DPrototypeInstance      from "../Components/Core/X3DPrototypeInstance.js";
import Fields                    from "../Fields.js";
import X3DParser                 from "./X3DParser.js";
import VRMLParser                from "./VRMLParser.js";
import HTMLSupport               from "./HTMLSupport.js";
import X3DExternProtoDeclaration from "../Prototype/X3DExternProtoDeclaration.js";
import X3DProtoDeclaration       from "../Prototype/X3DProtoDeclaration.js";
import X3DConstants              from "../Base/X3DConstants.js";
import DEBUG                     from "../DEBUG.js";

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
}

XMLParser .prototype = Object .assign (Object .create (X3DParser .prototype),
{
   constructor: XMLParser,
   getEncoding: function ()
   {
      return "XML";
   },
   isValid: function ()
   {
      return (this .input instanceof XMLDocument) || (this .input instanceof HTMLElement) || (this .input === null);
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
      catch (error)
      {
         this .input = undefined;
      }
   },
   isXML: function (element)
   {
      if (element instanceof HTMLElement)
         return false;
      else
         return true;
   },
   parseIntoScene: function (success, error)
   {
      this .success = success;
      this .error   = error;

      this .getScene () .setEncoding ("XML");
      this .getScene () .setProfile (this .getBrowser () .getProfile ("Full"));

      this .xmlElement (this .input);
   },
   xmlElement: function (xmlElement)
   {
      if (xmlElement === null)
      {
         if (this .success)
            return this .success (this .getScene ());
      }

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
               if (this .success)
               {
                  this .loadComponents () .then (function ()
                  {
                     this .childrenElements (xmlElement);
                     this .success (this .getScene ());
                  }
                  .bind (this))
                  .catch (function (error)
                  {
                     if (this .error)
                        this .error (error);
                  }
                  .bind (this));
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
            if (this .success)
            {
               this .loadComponents () .then (function ()
               {
                  this .sceneElement (xmlElement);
                  this .success (this .getScene ());
               }
               .bind (this))
               .catch (function (error)
               {
                  if (this .error)
                     this .error (error);
               }
               .bind (this));
            }
            else
            {
               this .sceneElement (xmlElement);
            }

            break;
         }
         default:
         {
            if (this .success)
            {
               this .loadComponents () .then (function ()
               {
                  this .childrenElements (xmlElement);
                  this .success (this .getScene ());
               }
               .bind (this))
               .catch (function (error)
               {
                  if (this .error)
                     this .error (error);
               }
               .bind (this));
            }
            else
            {
               this .childrenElements (xmlElement);
            }

            break;
         }
      }
   },
   x3dElement: function (xmlElement)
   {
      try
      {
         // Profile

         var
            profileNameId = xmlElement .getAttribute ("profile"),
            profile       = this .getBrowser () .getProfile (profileNameId || "Full");

         $.data (this .scene, "X3D", xmlElement);

         this .getScene () .setProfile (profile);
      }
      catch (error)
      {
         console .error (error);
      }

      // Specification version

      var specificationVersion = xmlElement .getAttribute ("version");

      if (specificationVersion)
         this .getScene () .setSpecificationVersion (specificationVersion);

      // Process child nodes

      var childNodes = xmlElement .childNodes;

      for (var i = 0; i < childNodes .length; ++ i)
         this .x3dElementChildHead (childNodes [i])

      if (!this .xml)
         this .headElement (xmlElement);

      if (this .success)
      {
         this .loadComponents () .then (function ()
         {
            for (var i = 0; i < childNodes .length; ++ i)
               this .x3dElementChildScene (childNodes [i])

            this .success (this .getScene ());
         }
         .bind (this))
         .catch (function (error)
         {
            if (this .error)
               this .error (error);
         }
         .bind (this));
      }
      else
      {
         for (var i = 0; i < childNodes .length; ++ i)
            this .x3dElementChildScene (childNodes [i])
      }
   },
   x3dElementChildHead: function (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "head":
         case "HEAD":
            this .headElement (xmlElement);
            return;
      }
   },
   x3dElementChildScene: function (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "Scene":
         case "SCENE":
            this .sceneElement (xmlElement);
            return;
      }
   },
   headElement: function (xmlElement)
   {
      var childNodes = xmlElement .childNodes;

      for (var i = 0; i < childNodes .length; ++ i)
         this .headElementChild (childNodes [i]);
   },
   headElementChild: function (xmlElement)
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
   componentElement: function (xmlElement)
   {
      try
      {
         var
            componentNameIdCharacters = xmlElement .getAttribute ("name"),
            componentSupportLevel = parseInt (xmlElement .getAttribute ("level"));

         if (componentNameIdCharacters === null)
            return console .warn ("XML Parser Error: Bad component statement: Expected name attribute.");

         if (componentSupportLevel === null)
            return console .warn ("XML Parser Error: Bad component statement: Expected level attribute.");

         var component = this .getBrowser () .getComponent (componentNameIdCharacters, componentSupportLevel);

         this .getScene () .addComponent (component);
      }
      catch (error)
      {
         console .log (error .message);
      }
   },
   unitElement: function (xmlElement)
   {
      var
         category         = xmlElement .getAttribute ("category"),
         name             = xmlElement .getAttribute ("name"),
         conversionFactor = xmlElement .getAttribute ("conversionFactor"); //works for html5 as well

      if (category === null)
         return console .warn ("XML Parser Error: Bad unit statement: Expected category attribute.");

      if (name === null)
         return console .warn ("XML Parser Error: Bad unit statement: Expected name attribute.");

      if (conversionFactor === null)
         return console .warn ("XML Parser Error: Bad unit statement: Expected conversionFactor attribute.");

      this .getScene () .updateUnit (category, name, parseFloat (conversionFactor));
   },
   metaElement: function (xmlElement)
   {
      var
         metakey   = xmlElement .getAttribute ("name"),
         metavalue = xmlElement .getAttribute ("content");

      if (metakey === null)
         return console .warn ("XML Parser Error: Bad meta statement: Expected name attribute.");

      if (metavalue === null)
         return console .warn ("XML Parser Error: Bad meta statement: Expected content attribute.");

      this .getScene () .addMetaData (metakey, metavalue);
   },
   sceneElement: function (xmlElement)
   {
      $.data (xmlElement, "node", this .scene);

      this .childrenElements (xmlElement);
   },
   childrenElements: function (xmlElement)
   {
      var childNodes = xmlElement .childNodes;

      for (var i = 0; i < childNodes .length; ++ i)
         this .childElement (childNodes [i]);
   },
   childElement: function (xmlElement)
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
   externProtoDeclareElement: function (xmlElement)
   {
      var name = xmlElement .getAttribute ("name");

      if (this .id (name))
      {
         var url = xmlElement .getAttribute ("url");

         if (url === null)
            return console .warn ("XML Parser Error: Bad ExternProtoDeclare statement: Expected url attribute.");

         this .parser .setInput (url);
         VRMLParser .prototype .sfstringValues .call (this .parser, this .url);

         var externproto = new X3DExternProtoDeclaration (this .getExecutionContext (), this .url);

         this .pushParent (externproto);
         this .protoInterfaceElement (xmlElement);
         this .popParent ();
         this .addProtoFieldNames (externproto);

         externproto .setup ();

         try
         {
            const existingExternProto = this .getExecutionContext () .getExternProtoDeclaration (name);

            this .getExecutionContext () .updateExternProtoDeclaration (this .getExecutionContext () .getUniqueExternProtoName (name), existingExternProto);
         }
         catch (error)
         { }

         this .getExecutionContext () .updateExternProtoDeclaration (name, externproto);

         this .addProtoName (name);
      }
   },
   protoDeclareElement: function (xmlElement)
   {
      var name = xmlElement .getAttribute ("name");

      if (this .id (name))
      {
         var
            proto      = new X3DProtoDeclaration (this .getExecutionContext ()),
            childNodes = xmlElement .childNodes;

         for (var i = 0; i < childNodes .length; ++ i)
         {
            var child = childNodes [i];

            switch (child .nodeName)
            {
               case "ProtoInterface":
               case "PROTOINTERFACE":
               {
                  this .pushParent (proto);
                  this .protoInterfaceElement (child);
                  this .popParent ();
                  this .addProtoFieldNames (proto);
                  break;
               }
               default:
                  continue;
            }

            break;
         }

         for (var i = 0; i < childNodes .length; ++ i)
         {
            var child = childNodes [i];

            switch (child .nodeName)
            {
               case "ProtoBody":
               case "PROTOBODY":
               {
                  this .pushPrototype (proto);
                  this .pushExecutionContext (proto .getBody ());
                  this .pushParent (proto);
                  this .protoBodyElement (child);
                  this .popParent ();
                  this .popExecutionContext ();
                  this .popPrototype ();
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
         }
         catch (error)
         { }

         this .getExecutionContext () .updateProtoDeclaration (name, proto);

         this .addProtoName (name);
      }
   },
   protoInterfaceElement: function (xmlElement)
   {
      var childNodes = xmlElement .childNodes;

      for (var i = 0; i < childNodes .length; ++ i)
         this .protoInterfaceElementChild (childNodes [i]);
   },
   protoInterfaceElementChild: function (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "field": // User-defined field
         case "FIELD": // User-defined field
            this .fieldElement (xmlElement);
            return;
      }
   },
   fieldElement: function (xmlElement)
   {
      try
      {
         if (this .getParents () .length === 0)
            return;

         var node = this .getParent ();

         if (! (node instanceof X3DBaseNode))
            return;

         if (! node .canUserDefinedFields ())
            return;

         var accessType = AccessType [xmlElement .getAttribute ("accessType")];

         if (accessType === undefined)
            accessType = X3DConstants .initializeOnly;

         var type = Fields [xmlElement .getAttribute ("type")];

         if (type === undefined)
            return;

         var name = xmlElement .getAttribute ("name");

         if (! this .id (name))
            return;

         var field = new type ();

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
         //console .error (error);
      }
   },
   protoBodyElement: function (xmlElement)
   {
      this .childrenElements (xmlElement);
   },
   isElement: function (xmlElement)
   {
      if (this .isInsideProtoDefinition ())
      {
         var childNodes = xmlElement .childNodes;

         for (var i = 0; i < childNodes .length; ++ i)
            this .isElementChild (childNodes [i]);
      }
   },
   isElementChild: function (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "connect":
         case "CONNECT":
            this .connectElement (xmlElement);
            return;
      }
   },
   connectElement: function (xmlElement)
   {
      var
         nodeFieldName  = xmlElement .getAttribute ("nodeField"),
         protoFieldName = xmlElement .getAttribute ("protoField");

      if (nodeFieldName === null)
         return console .warn ("XML Parser Error: Bad connect statement: Expected nodeField attribute.");

      if (protoFieldName === null)
         return console .warn ("XML Parser Error: Bad connect statement: Expected protoField attribute.");

      try
      {
         if (this .getParents () .length === 0)
            return;

         var
            node  = this .getParent (),
            proto = this .getPrototype ();

         if (! (node instanceof X3DBaseNode))
            return;

         var
            nodeField  = node .getField (nodeFieldName),
            protoField = proto .getField (protoFieldName);

         if (nodeField .getType () === protoField .getType ())
         {
            if (protoField .isReference (nodeField .getAccessType ()))
               nodeField .addReference (protoField);
            else
               throw new Error ("Field '" + nodeField .getName () + "' and '" + protoField .getName () + "' in PROTO " + proto .getName () + " are incompatible as an IS mapping.");
         }
         else
            throw new Error ("Field '" + nodeField .getName () + "' and '" + protoField .getName () + "' in PROTO " + this .proto .getName () + " have different types.");
      }
      catch (error)
      {
         console .warn ("XML Parser Error: Couldn't create IS reference: " + error .message);
      }
   },
   protoInstanceElement: function (xmlElement)
   {
      try
      {
         if (this .useAttribute (xmlElement))
            return;

         var name = xmlElement .getAttribute ("name");

         if (this .id (name))
         {
            var node = this .getExecutionContext () .createProto (name, false);

            if (! node)
               throw new Error ("Unknown proto or externproto type '" + name + "'.");

            ///DOMIntegration: attach node to DOM xmlElement for access from DOM.
            $.data (xmlElement, "node", node);

            this .defAttribute (xmlElement, node);
            this .addNode (xmlElement, node);
            this .pushParent (node);
            this .childrenElements (xmlElement);

            if (! this .isInsideProtoDefinition ())
               node .setup ();

            this .popParent ();
         }
      }
      catch (error)
      {
         console .warn ("XML Parser Error: ", error .message);

         if (DEBUG)
            console .error (error);
      }
   },
   fieldValueElement: function (xmlElement)
   {
      try
      {
         if (this .getParents () .length === 0)
            return;

         var
            node = this .getParent (),
            name = xmlElement .getAttribute ("name");

         if (! (node instanceof X3DPrototypeInstance))
            return;

         if (! this .id (name))
            return;

         var
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
         console .warn ("XML Parser Error: Couldn't assign field value: " + error .message);
      }
   },
   nodeElement: function (xmlElement)
   {
      try
      {
         if (this .useAttribute (xmlElement))
            return;

         var node = this .getExecutionContext () .createNode (this .nodeNameToCamelCase (xmlElement .nodeName), false);

         if (!node)
            node = this .getExecutionContext () .createProto (this .protoNameToCamelCase (xmlElement .nodeName), false);

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

         if (! this .isInsideProtoDefinition ())
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

         if (DEBUG)
            console .error (error);
         else
            console .error ("XML Parser Error: " + error .message);
      }
   },
   scriptElement (element)
	{
		const
			domParser      = new DOMParser (),
			scriptDocument = domParser .parseFromString (element .outerHTML, "application/xml"),
			childNodes     = scriptDocument .children [0] .childNodes;

      element .textContent = "// Content moved into childNodes.";

		for (const childNode of childNodes)
		{
         // Add elements and cdata.
			if (childNode .nodeType === 1 || childNode .nodeType === 4)
         	element .appendChild (childNode);
		}
	},
   routeElement: function (xmlElement)
   {
      try
      {
         var
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

         var
            executionContext = this .getExecutionContext (),
            sourceNode       = executionContext .getLocalNode (sourceNodeName),
            destinationNode  = executionContext .getLocalNode (destinationNodeName),
            route            = executionContext .addRoute (sourceNode, sourceField, destinationNode, destinationField);

         ///DOMIntegration: attach node to DOM xmlElement for access from DOM.
         $.data (xmlElement, "node", route);
      }
      catch (error)
      {
         console .warn ("XML Parser Error: " + error .message);

         if (DEBUG)
            console .error (error);
      }
   },
   importElement: function (xmlElement)
   {
      try
      {
         var
            inlineNodeName   = xmlElement .getAttribute ("inlineDEF"),
            exportedNodeName = xmlElement .getAttribute ("importedDEF") || xmlElement .getAttribute ("exportedDEF"),
            localNodeName    = xmlElement .getAttribute ("AS");

         if (inlineNodeName === null)
            throw new Error ("Bad IMPORT statement: Expected inlineDEF attribute.");

         if (exportedNodeName === null)
            throw new Error ("Bad IMPORT statement: Expected importedDEF attribute.");

         if (! localNodeName)
            localNodeName = exportedNodeName;

         var inlineNode = this .getExecutionContext () .getNamedNode (inlineNodeName);

         this .getExecutionContext () .updateImportedNode (inlineNode, exportedNodeName, localNodeName);
      }
      catch (error)
      {
         console .warn ("XML Parser Error: " + error .message);
      }
   },
   exportElement: function (xmlElement)
   {
      try
      {
         if (this .getScene () !== this .getExecutionContext ())
         {
            console .warn ("XML Parser Error: Export statement not allowed here.");
            return;
         }

         var
            localNodeName    = xmlElement .getAttribute ("localDEF"),
            exportedNodeName = xmlElement .getAttribute ("AS");

         if (localNodeName === null)
            throw new Error ("Bad EXPORT statement: Expected localDEF attribute.");

         if (! exportedNodeName)
            exportedNodeName = localNodeName;

         var localNode = this .getExecutionContext () .getLocalNode (localNodeName);

         this .getScene () .updateExportedNode (exportedNodeName, localNode);
      }
      catch (error)
      {
         console .warn ("XML Parser Error: " + error .message);
      }
   },
   cdataNode: function (xmlElement)
   {
      if (this .getParents () .length === 0)
         return;

      var node = this .getParent ();

      if (node instanceof X3DBaseNode)
      {
         var field = node .getSourceText ();

         if (field)
         {
            field .push (xmlElement .data);
         }
      }
   },
   useAttribute: function (xmlElement)
   {
      try
      {
         var name = xmlElement .getAttribute ("USE");

         if (this .id (name))
         {
            var node = this .getExecutionContext () .getNamedNode (name);

            this .addNode (xmlElement, node .getValue ());
            return true;
         }
      }
      catch (error)
      {
         console .warn ("Invalid USE name: " + error .message);
      }

      return false;
   },
   defAttribute: function (xmlElement, node)
   {
      try
      {
         var name = xmlElement .getAttribute ("DEF");

         if (name)
         {
            try
            {
               var namedNode = this .getExecutionContext () .getNamedNode (name);

               this .getExecutionContext () .updateNamedNode (this .getExecutionContext () .getUniqueName (name), namedNode);
            }
            catch (error)
            { }

            this .getExecutionContext () .updateNamedNode (name, node);
         }
      }
      catch (error)
      {
         console .warn ("Invalid DEF name: " + error .message);
      }
   },
   nodeAttributes: function (xmlElement, node)
   {
      var xmlAttributes = xmlElement .attributes;

      for (var i = 0; i < xmlAttributes .length; ++ i)
         this .nodeAttribute (xmlAttributes [i], node);
   },
   nodeAttribute: function (xmlAttribute, node)
   {
      try
      {
         const field = node .getField (this .attributeToCamelCase (node, xmlAttribute .name));

         if (field .isInitializable ())
            this .fieldValue (field, xmlAttribute .value);
      }
      catch (error)
      {
         //console .error (error);
      }
   },
   fieldValue: function (field, value)
   {
      if (value === null)
         return;

      this .parser .pushExecutionContext (this .getExecutionContext ());

      this .parser .setInput (value);
      this .fieldTypes [field .getType ()] .call (this .parser, field);

      this .parser .popExecutionContext ();
   },
   id: function (string)
   {
      if (string === null)
         return false;

      if (string .length === 0)
         return false;

      return true;
   },
   getParents: function ()
   {
      return this .parents;
   },
   getParent: function ()
   {
      return this .parents .at (-1);
   },
   pushParent: function (parent)
   {
      return this .parents .push (parent);
   },
   popParent: function ()
   {
      this .parents .pop ();
   },
   addNode: function (xmlElement, node)
   {
      if (this .parents .length === 0 || this .getParent () instanceof X3DProtoDeclaration)
      {
         this .getExecutionContext () .rootNodes .push (node);
         return;
      }

      var parent = this .getParent ();

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
         var containerField = xmlElement .getAttribute ("containerField");

         if (! containerField)
         {
            if (node)
               containerField = node .getContainerField ();
            else
               throw new Error ("NULL node must have a container field attribute.");
         }

         var field = parent .getField (containerField);

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
         //console .warn (error .message);
      }
   },
   // Overloaded by HTMLParser.
   addProtoName: function (name)
   { },
   addProtoFieldNames: function (protoNode)
   { },
   protoNameToCamelCase: function (typeName)
   {
      return typeName;
   },
   nodeNameToCamelCase: function (typeName)
   {
      return typeName;
   },
   attributeToCamelCase: function (node, name)
   {
      return name;
   },
});

XMLParser .prototype .fieldTypes = [ ];
XMLParser .prototype .fieldTypes [X3DConstants .SFBool]      = VRMLParser .prototype .sfboolValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFColor]     = VRMLParser .prototype .sfcolorValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFColorRGBA] = VRMLParser .prototype .sfcolorrgbaValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFDouble]    = VRMLParser .prototype .sfdoubleValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFFloat]     = VRMLParser .prototype .sffloatValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFImage]     = VRMLParser .prototype .sfimageValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFInt32]     = VRMLParser .prototype .sfint32Value;
XMLParser .prototype .fieldTypes [X3DConstants .SFMatrix3f]  = VRMLParser .prototype .sfmatrix3dValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFMatrix3d]  = VRMLParser .prototype .sfmatrix3fValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFMatrix4f]  = VRMLParser .prototype .sfmatrix4dValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFMatrix4d]  = VRMLParser .prototype .sfmatrix4fValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFNode]      = function (field) { field .setValue (null); };
XMLParser .prototype .fieldTypes [X3DConstants .SFRotation]  = VRMLParser .prototype .sfrotationValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFString]    = function (field) { field .setValue (Fields .SFString .unescape (this .input)); };
XMLParser .prototype .fieldTypes [X3DConstants .SFTime]      = VRMLParser .prototype .sftimeValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFVec2d]     = VRMLParser .prototype .sfvec2dValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFVec2f]     = VRMLParser .prototype .sfvec2fValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFVec3d]     = VRMLParser .prototype .sfvec3dValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFVec3f]     = VRMLParser .prototype .sfvec3fValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFVec4d]     = VRMLParser .prototype .sfvec4dValue;
XMLParser .prototype .fieldTypes [X3DConstants .SFVec4f]     = VRMLParser .prototype .sfvec4fValue;

XMLParser .prototype .fieldTypes [X3DConstants .MFBool]      = VRMLParser .prototype .sfboolValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFColor]     = VRMLParser .prototype .sfcolorValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFColorRGBA] = VRMLParser .prototype .sfcolorrgbaValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFDouble]    = VRMLParser .prototype .sfdoubleValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFFloat]     = VRMLParser .prototype .sffloatValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFImage]     = VRMLParser .prototype .sfimageValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFInt32]     = VRMLParser .prototype .sfint32Values;
XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix3d]  = VRMLParser .prototype .sfmatrix3dValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix3f]  = VRMLParser .prototype .sfmatrix3fValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix4d]  = VRMLParser .prototype .sfmatrix4dValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix4f]  = VRMLParser .prototype .sfmatrix4fValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFNode]      = function (field) { field .length = 0; };
XMLParser .prototype .fieldTypes [X3DConstants .MFRotation]  = VRMLParser .prototype .sfrotationValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFString]    = VRMLParser .prototype .sfstringValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFTime]      = VRMLParser .prototype .sftimeValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFVec2d]     = VRMLParser .prototype .sfvec2dValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFVec2f]     = VRMLParser .prototype .sfvec2fValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFVec3d]     = VRMLParser .prototype .sfvec3dValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFVec3f]     = VRMLParser .prototype .sfvec3fValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFVec4d]     = VRMLParser .prototype .sfvec4dValues;
XMLParser .prototype .fieldTypes [X3DConstants .MFVec4f]     = VRMLParser .prototype .sfvec4fValues;

// HTML Support

const HTMLParser =
{
   addProtoName: function (name)
   {
      //DOMIntegration: add uppercase versions of proto name.

      this .protoNames .set (name,                 name);
      this .protoNames .set (name .toUpperCase (), name);
   },
   addProtoFieldNames: (function ()
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
   protoNameToCamelCase: function (typeName)
   {
      //DOMIntegration: handle uppercase versions of node names.
      return this .protoNames .get (typeName);
   },
   nodeNameToCamelCase: function (typeName)
   {
      //DOMIntegration: handle uppercase versions of node names.
      return HTMLSupport .getNodeTypeName (typeName);
   },
   attributeToCamelCase: function (node, name)
   {
      //DOMIntegration: handle lowercase versions of field names.

      if (node instanceof X3DPrototypeInstance)
         return this .protoFields .get (node .getProtoNode ()) .get (name);

      return HTMLSupport .getFieldName (name);
   },
};

export default XMLParser;

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

import Fields              from "../Fields.js";
import X3DExecutionContext from "./X3DExecutionContext.js";
import { getUniqueName }   from "./NamedNodesHandling.js";
import ComponentInfo       from "../Configuration/ComponentInfo.js";
import ComponentInfoArray  from "../Configuration/ComponentInfoArray.js";
import UnitInfo            from "../Configuration/UnitInfo.js";
import UnitInfoArray       from "../Configuration/UnitInfoArray.js";
import X3DExportedNode     from "./X3DExportedNode.js";
import ExportedNodesArray  from "./ExportedNodesArray.js";
import X3DCast             from "../Base/X3DCast.js";
import X3DConstants        from "../Base/X3DConstants.js";
import SFNodeCache         from "../Fields/SFNodeCache.js";
import LATEST_VERSION      from "../LATEST_VERSION.js";

const
   _specificationVersion = Symbol (),
   _encoding             = Symbol (),
   _profile              = Symbol (),
   _components           = Symbol (),
   _worldURL             = Symbol (),
   _units                = Symbol (),
   _metadata             = Symbol (),
   _exportedNodes        = Symbol (),
   _loadingObjects       = Symbol ();

function X3DScene (browser)
{
   X3DExecutionContext .call (this, null, null, browser);

   this .addType (X3DConstants .X3DScene)

   this .addChildObjects (X3DConstants .outputOnly, "profile_changed",  new Fields .SFTime (),
                          X3DConstants .outputOnly, "metadata_changed", new Fields .SFTime (),
                          X3DConstants .outputOnly, "loadCount",        new Fields .SFInt32 ())

   this [_specificationVersion] = LATEST_VERSION;
   this [_encoding]             = "SCRIPTED";
   this [_profile]              = null;
   this [_components]           = new ComponentInfoArray ([ ]);
   this [_worldURL]             = location .toString ();
   this [_units]                = new UnitInfoArray ();

   this [_units] .add ("angle",  new UnitInfo ("angle",  "radian",   1));
   this [_units] .add ("force",  new UnitInfo ("force",  "newton",   1));
   this [_units] .add ("length", new UnitInfo ("length", "metre",    1));
   this [_units] .add ("mass",   new UnitInfo ("mass",   "kilogram", 1));

   this [_metadata]       = new Map ();
   this [_exportedNodes]  = new ExportedNodesArray ();
   this [_loadingObjects] = new Set ();

   this [_components]    .addParent (this);
   this [_units]         .addParent (this);
   this [_exportedNodes] .addParent (this);

   this .getRootNodes () .setAccessType (X3DConstants .inputOutput);

   this .setLive (false);
}

Object .assign (Object .setPrototypeOf (X3DScene .prototype, X3DExecutionContext .prototype),
{
   isScene ()
   {
      return true;
   },
   setSpecificationVersion (specificationVersion)
   {
      this [_specificationVersion] = String (specificationVersion);
   },
   getSpecificationVersion ()
   {
      return this [_specificationVersion];
   },
   setEncoding (encoding)
   {
      this [_encoding] = String (encoding);
   },
   getEncoding ()
   {
      return this [_encoding];
   },
   setWorldURL (url)
   {
      this [_worldURL] = String (url);
   },
   getWorldURL ()
   {
      return this [_worldURL];
   },
   getBaseURL ()
   {
      if (this [_worldURL] .match (/^(?:data|blob):/))
      {
         return this .getExecutionContext () ?.getBaseURL ()
            ?? this .getBrowser () .getBaseURL ();
      }

      return this [_worldURL];
   },
   setProfile (profile)
   {
      this [_profile] = profile;

      this ._profile_changed = this .getBrowser () .getCurrentTime ();
   },
   getProfile ()
   {
      return this [_profile];
   },
   hasComponent (name, level = 0)
   {
      if (!this [_profile])
         return true;

      if (name instanceof ComponentInfo)
         var { name, level } = name;

      const component = this [_profile] .components .get (name) ?? this [_components] .get (name);

      if (component)
         return level <= component .level;

      return false;
   },
   addComponent (component)
   {
      this [_components] .add (component .name, component);

      this ._components_changed = this .getBrowser () .getCurrentTime ();
   },
   updateComponent (component)
   {
      this [_components] .update (component .name, component .name, component);

      this ._components_changed = this .getBrowser () .getCurrentTime ();
   },
   removeComponent (name)
   {
      this [_components] .remove (name);

      this ._components_changed = this .getBrowser () .getCurrentTime ();
   },
   getComponents ()
   {
      return this [_components];
   },
   updateUnit (category, name, conversionFactor)
   {
      // Private function.

      if (!this [_units] .has (category))
         return;

      this [_units] .update (category, category, new UnitInfo (category, String (name),  Number (conversionFactor)));

      this ._units_changed = this .getBrowser () .getCurrentTime ();
   },
   getUnit (category)
   {
      return this [_units] .get (category);
   },
   getUnits ()
   {
      return this [_units];
   },
   fromUnit (category, value)
   {
      switch (category)
      {
         // Base units

         case "angle":
         case "force":
         case "length":
         case "mass":
            return value * this .getUnits () .get (category) .conversionFactor;

         // Derived units

         case "acceleration:":
            return value * this .getUnits () .get ("length") .conversionFactor;
         case "angularRate":
            return value * this .getUnits () .get ("angle") .conversionFactor;
         case "area":
            return value * this .getUnits () .get ("length") .conversionFactor ** 2;
         case "speed":
            return value * this .getUnits () .get ("length") .conversionFactor;
         case "volume":
            return value * this .getUnits () .get ("length") .conversionFactor ** 3;
      }

      return value;
   },
   toUnit (category, value)
   {
      switch (category)
      {
         // Base units

         case "angle":
         case "force":
         case "length":
         case "mass":
            return value / this .getUnits () .get (category) .conversionFactor;

         // Derived units

         case "acceleration:":
            return value / this .getUnits () .get ("length") .conversionFactor;
         case "angularRate":
            return value / this .getUnits () .get ("angle") .conversionFactor;
         case "area":
            return value / this .getUnits () .get ("length") .conversionFactor ** 2;
         case "speed":
            return value / this .getUnits () .get ("length") .conversionFactor;
         case "volume":
            return value / this .getUnits () .get ("length") .conversionFactor ** 3;
      }

      return value;
   },
   setMetaData (name, values)
   {
      name = String (name);

      if (!name .length)
         throw new Error ("Couldn't add metadata: name is empty.");

      if (!Array .isArray (values))
         values = [values];

      if (!values .length)
         throw new Error ("Couldn't add metadata: values length is 0.");

      this [_metadata] .set (name, values .map (String));

      this ._metadata_changed = this .getBrowser () .getCurrentTime ();
   },
   addMetaData (name, value)
   {
      name  = String (name);
      value = String (value);

      if (!name .length)
         throw new Error ("Couldn't add metadata: name is empty.");

      let values = this [_metadata] .get (name);

      if (!values)
         this [_metadata] .set (name, values = [ ]);

      values .push (value);
   },
   removeMetaData (name)
   {
      name = String (name);

      this [_metadata] .delete (name);

      this ._metadata_changed = this .getBrowser () .getCurrentTime ();
   },
   getMetaData (name)
   {
      name = String (name);

      const values = this [_metadata] .get (name);

      if (values)
         return values .slice ();

      return undefined;
   },
   getMetaDatas ()
   {
      const metadata = new Map ();

      for (const [key, values] of this [_metadata])
         metadata .set (key, values .slice ());

      return metadata;
   },
   addExportedNode (exportedName, node)
   {
      exportedName = String (exportedName);

      if (this [_exportedNodes] .has (exportedName))
         throw new Error (`Couldn't add exported node: exported name '${exportedName}' already in use.`);

      this .updateExportedNode (exportedName, node);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   updateExportedNode (exportedName, node)
   {
      exportedName = String (exportedName);
      node         = X3DCast (X3DConstants .X3DNode, node, false);

      if (exportedName .length === 0)
         throw new Error ("Couldn't update exported node: node exported name is empty.");

      if (!node)
         throw new Error ("Couldn't update exported node: node must be of type X3DNode.");

      //if (node .getExecutionContext () !== this)
      //   throw new Error ("Couldn't update exported node: node does not belong to this execution context.");

      const exportedNode = new X3DExportedNode (this, exportedName, node);

      this [_exportedNodes] .update (exportedName, exportedName, exportedNode);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   removeExportedNode (exportedName)
   {
      exportedName = String (exportedName);

      this [_exportedNodes] .remove (exportedName);

      this ._sceneGraph_changed = this .getBrowser () .getCurrentTime ();
   },
   getExportedNode (exportedName)
   {
      exportedName = String (exportedName);

      const exportedNode = this [_exportedNodes] .get (exportedName);

      if (exportedNode)
         return exportedNode .localNode;

      throw new Error (`Exported node '${exportedName}' not found.`);
   },
   getExportedNodes ()
   {
      return this [_exportedNodes];
   },
   getUniqueExportName (name)
   {
      return getUniqueName (this [_exportedNodes], name);
   },
   addRootNode (node)
   {
      node = SFNodeCache .get (X3DCast (X3DConstants .X3DNode, node, false));

      const rootNodes = this .getRootNodes ();

      if (rootNodes .includes (node))
         return;

      rootNodes .push (node);
   },
   removeRootNode (node)
   {
      node = SFNodeCache .get (X3DCast (X3DConstants .X3DNode, node, false));

      const rootNodes = this .getRootNodes ();

      rootNodes .assign (rootNodes .filter (rootNode => rootNode !== node));
   },
   setRootNodes (value)
   {
      if (!(value instanceof Fields .MFNode))
         throw new Error ("Value must be of type MFNode.");

      this .getRootNodes () .assign (value);
   },
   toVRMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "#X3D V";
      generator .string += LATEST_VERSION;
      generator .string += generator .Space ();
      generator .string += "utf8";
      generator .string += generator .Space ();
      generator .string += this .getBrowser () .name;
      generator .string += generator .Space ();
      generator .string += "V";
      generator .string += this .getBrowser () .version;
      generator .string += generator .ForceBreak ();
      generator .string += generator .ForceBreak ();

      const profile = this .getProfile ();

      if (profile)
      {
         profile .toVRMLStream (generator);

         generator .string += generator .Break ();
         generator .string += generator .TidyBreak ();
      }

      const components = this .getComponents ();

      if (components .length)
      {
         components .toVRMLStream (generator);

         generator .string += generator .TidyBreak ();
      }

      const units = this .getUnits () .filter (unit => unit .conversionFactor !== 1);

      if (units .length)
      {
         for (const unit of units)
         {
            unit .toVRMLStream (generator);

            generator .string += generator .Break ();
         }

         generator .string += generator .TidyBreak ();
      }

      const metadata = this .getMetaDatas ();

      if (metadata .size)
      {
         for (const [key, values] of metadata)
         {
            for (const value of values)
            {
               generator .string += generator .Indent ();
               generator .string += "META";
               generator .string += generator .Space ();
               generator .string += new Fields .SFString (key) .toString ();
               generator .string += generator .Space ();
               generator .string += new Fields .SFString (value) .toString ();
               generator .string += generator .Break ();
            }
         }

         generator .string += generator .TidyBreak ();
      }

      const exportedNodes = this .getExportedNodes ();

      generator .PushExecutionContext (this);
      generator .EnterScope ();
      generator .ExportedNodes (exportedNodes);

      X3DExecutionContext .prototype .toVRMLStream .call (this, generator);

      if (exportedNodes .length)
      {
         generator .string += generator .TidyBreak ();

         exportedNodes .toVRMLStream (generator);
      }

      generator .LeaveScope ();
      generator .PopExecutionContext ();
   },
   toXMLStream (generator)
   {
      if (!generator .html)
      {
         generator .string += generator .Indent ();
         generator .string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
         generator .string += generator .TidyBreak ();
         generator .string += generator .Indent ();
         generator .string += "<!DOCTYPE X3D PUBLIC \"ISO//Web3D//DTD X3D ";
         generator .string += LATEST_VERSION;
         generator .string += "//EN\" \"http://www.web3d.org/specifications/x3d-";
         generator .string += LATEST_VERSION;
         generator .string += ".dtd\">";
         generator .string += generator .TidyBreak ();
      }

      generator .string += generator .Indent ();
      generator .string += "<X3D";
      generator .string += generator .Space ();
      generator .string += "profile='";
      generator .string += this .getProfile () ? this .getProfile () .name : "Full";
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "version='";
      generator .string += LATEST_VERSION;
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance'";
      generator .string += generator .Space ();
      generator .string += "xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-";
      generator .string += LATEST_VERSION;
      generator .string += ".xsd'>";
      generator .string += generator .TidyBreak ();

      generator .IncIndent ();

      if (this .getComponents () .length ||
          this .getUnits () .some (unit => unit .conversionFactor !== 1) ||
          this .getMetaDatas () .size)
      {
         generator .string += generator .Indent ();
         generator .string += "<head>";
         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         // <head>

         this .getComponents () .toXMLStream (generator);

         for (const unit of this .getUnits ())
         {
            if (unit .conversionFactor !== 1)
            {
               unit .toXMLStream (generator);

               generator .string += generator .TidyBreak ();
            }
         }

         for (const [key, values] of this .getMetaDatas ())
         {
            for (const value of values)
            {
               generator .string += generator .Indent ();
               generator .string += "<meta";
               generator .string += generator .Space ();
               generator .string += "name='";
               generator .string += generator .XMLEncode (key);
               generator .string += "'";
               generator .string += generator .Space ();
               generator .string += "content='";
               generator .string += generator .XMLEncode (value);
               generator .string += "'";
               generator .string += generator .closingTags ? "></meta>" : "/>";
               generator .string += generator .TidyBreak ();
            }
         }

         // </head>

         generator .DecIndent ();

         generator .string += generator .Indent ();
         generator .string += "</head>";
         generator .string += generator .TidyBreak ();
      }

      if (this .getExternProtoDeclarations () .length ||
          this .getProtoDeclarations () .length ||
          this .getRootNodes () .length)
      {
         generator .string += generator .Indent ();
         generator .string += "<Scene>";
         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         // <Scene>

         const exportedNodes = this .getExportedNodes ();

         generator .PushExecutionContext (this);
         generator .EnterScope ();
         generator .ExportedNodes (exportedNodes);

         X3DExecutionContext .prototype .toXMLStream .call (this, generator);

         exportedNodes .toXMLStream (generator);

         generator .LeaveScope ();
         generator .PopExecutionContext ();

         // </Scene>

         generator .DecIndent ();

         generator .string += generator .Indent ();
         generator .string += "</Scene>";
         generator .string += generator .TidyBreak ();
      }
      else
      {
         generator .string += generator .Indent ();
         generator .string += "<Scene/>";
         generator .string += generator .TidyBreak ();
      }

      generator .DecIndent ();

      generator .string += generator .Indent ();
      generator .string += "</X3D>";
      generator .string += generator .TidyBreak ();
   },
   toJSONStream (generator)
   {
      // X3D

      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "X3D";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();
      generator .string += generator .IncIndent ();


      // Encoding

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "encoding";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "UTF-8";
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();


      // Profile

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@profile";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += this .getProfile () ? this .getProfile () .name : "Full";
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();


      // Version

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@version";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += LATEST_VERSION;
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();


      // XSD noNamespaceSchemaLocation

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@xsd:noNamespaceSchemaLocation";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "http://www.web3d.org/specifications/x3d-";
      generator .string += LATEST_VERSION;
      generator .string += ".xsd";
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();


      // JSON schema

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "JSON schema";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "http://www.web3d.org/specifications/x3d-";
      generator .string += LATEST_VERSION;
      generator .string += "-JSONSchema.json";
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();


      // Head

      const outputUnits = this .getUnits () .some (unit => unit .conversionFactor !== 1);

      if (this .getComponents () .length || outputUnits || this .getMetaDatas () .size)
      {
         let headLastProperty = false;

         generator .string += generator .Indent ();
         generator .string += '"';
         generator .string += "head";
         generator .string += '"';
         generator .string += ':';
         generator .string += generator .TidySpace ();
         generator .string += '{';
         generator .string += generator .TidyBreak ();
         generator .string += generator .IncIndent ();


         // Meta data

         if (this .getMetaDatas () .size)
         {
            if (headLastProperty)
            {
               generator .string += ',';
               generator .string += generator .TidyBreak ();
            }


            // Meta data begin

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "meta";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '[';
            generator .string += generator .TidyBreak ();
            generator .string += generator .IncIndent ();


            // Meta data

            for (const [i, [key, values]] of [... this .getMetaDatas ()] .entries ())
            {
               for (const [j, value] of values .entries ())
               {
                  generator .string += generator .Indent ();
                  generator .string += '{';
                  generator .string += generator .TidyBreak ();
                  generator .string += generator .IncIndent ();

                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@name";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (key);
                  generator .string += '"';
                  generator .string += ',';
                  generator .string += generator .TidyBreak ();

                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@content";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (value);
                  generator .string += '"';
                  generator .string += generator .TidyBreak ();

                  generator .string += generator .DecIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '}';

                  if (!(i === this .getMetaDatas () .size - 1 && j === values .length - 1))
                     generator .string += ',';

                  generator .string += generator .TidyBreak ();
               }
            }


            // Meta data end

            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += ']';

            headLastProperty = true;
         }


         // Components

         if (this .getComponents () .length)
         {
            if (headLastProperty)
            {
               generator .string += ',';
               generator .string += generator .TidyBreak ();
            }


            // Components begin

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "component";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '[';
            generator .string += generator .TidyBreak ();
            generator .string += generator .IncIndent ();


            // Components

            this .getComponents () .toJSONStream (generator);


            // Components end

            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += ']';

            headLastProperty = true;
         }


         // Units

         if (outputUnits)
         {
            if (headLastProperty)
            {
               generator .string += ',';
               generator .string += generator .TidyBreak ();
            }


            // Units begin

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "unit";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '[';
            generator .string += generator .TidyBreak ();
            generator .string += generator .IncIndent ();


            // Units

            this .getUnits ()  .toJSONStream (generator);


            // Unit end

            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += ']';

            headLastProperty = true;
         }


         // Head end

         generator .string += generator .TidyBreak ();
         generator .string += generator .DecIndent ();
         generator .string += generator .Indent ();
         generator .string += '}';
         generator .string += ',';
         generator .string += generator .TidyBreak ();
      }

      // Scene

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "Scene";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();
      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "-children";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '[';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();

      const exportedNodes = this .getExportedNodes ();

      generator .PushExecutionContext (this);
      generator .EnterScope ();
      generator .ExportedNodes (exportedNodes);

      X3DExecutionContext .prototype .toJSONStream .call (this, generator);

      // Exported nodes

      this .getExportedNodes () .toJSONStream (generator, true);

      generator .JSONRemoveComma ();

      generator .LeaveScope ();
      generator .PopExecutionContext ();

      // Scene end

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += ']';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';


      // X3D end

      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
   },
   dispose ()
   {
      this .exportedNodes .clear ();

      X3DExecutionContext .prototype .dispose .call (this);
   },
},
{
   setExecutionContext (executionContext)
   {
      if (this .getExecutionContext ())
      {
         const scene = this .getScene ();

         for (const object of this [_loadingObjects])
            scene .removeLoadingObject (object);
      }

      X3DExecutionContext .prototype .setExecutionContext .call (this, executionContext);

      if (this .getExecutionContext ())
      {
         const scene = this .getScene ();

         for (const object of this [_loadingObjects])
            scene .addLoadingObject (object);
      }
   },
   getLoadingObjects ()
   {
      return this [_loadingObjects];
   },
   addLoadingObject (node)
   {
      if (this [_loadingObjects] .has (node))
         return;

      this [_loadingObjects] .add (node);

      this ._loadCount = this [_loadingObjects] .size;

      const browser = this .getBrowser ();

      if (this === browser .getExecutionContext ())
         browser .addLoadingObject (node);

      this .getScene () ?.addLoadingObject (node);
   },
   removeLoadingObject (node)
   {
      if (!this [_loadingObjects] .has (node))
         return;

      this [_loadingObjects] .delete (node);

      this ._loadCount = this [_loadingObjects] .size;

      const browser = this .getBrowser ();

      if (this === browser .getExecutionContext ())
         browser .removeLoadingObject (node);

      this .getScene () ?.removeLoadingObject (node);
   },
});

for (const key of Object .keys (X3DScene .prototype))
   Object .defineProperty (X3DScene .prototype, key, { enumerable: false });

Object .defineProperties (X3DScene .prototype,
{
   specificationVersion:
   {
      get: X3DScene .prototype .getSpecificationVersion,
      enumerable: true,
   },
   encoding:
   {
      get: X3DScene .prototype .getEncoding,
      enumerable: true,
   },
   profile:
   {
      get: X3DScene .prototype .getProfile,
      enumerable: true,
   },
   profile_changed:
   {
      get () { return this ._profile_changed; },
      enumerable: false,
   },
   components:
   {
      get: X3DScene .prototype .getComponents,
      enumerable: true,
   },
   worldURL:
   {
      get: X3DScene .prototype .getWorldURL,
      enumerable: true,
   },
   baseURL:
   {
      get: X3DScene .prototype .getBaseURL,
      enumerable: true,
   },
   units:
   {
      get: X3DScene .prototype .getUnits,
      enumerable: true,
   },
   metadata_changed:
   {
      get () { return this ._metadata_changed; },
      enumerable: false,
   },
   rootNodes:
   {
      get: X3DScene .prototype .getRootNodes,
      set: X3DScene .prototype .setRootNodes,
      enumerable: true,
   },
   exportedNodes:
   {
      get: X3DScene .prototype .getExportedNodes,
      enumerable: true,
   },
   sceneGraph_changed:
   {
      get () { return this ._sceneGraph_changed; },
      enumerable: false,
   },
});

Object .defineProperties (X3DScene,
{
   typeName:
   {
      value: "X3DScene",
      enumerable: true,
   },
});

X3DConstants .addConstant (X3DScene .typeName);

export default X3DScene;

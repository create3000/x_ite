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

   this .getRootNodes () .setAccessType (X3DConstants .inputOutput);

   this .setLive (false);

   // Private properties

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
}

Object .assign (Object .setPrototypeOf (X3DScene .prototype, X3DExecutionContext .prototype),
{
   getLocalScene ()
   {
      return this;
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

      this ._profile_changed = Date .now () / 1000;
   },
   getProfile ()
   {
      return this [_profile];
   },
   hasComponent (name, level = 0)
   {
      if (name instanceof ComponentInfo)
         var { name, level } = name;

      const
         browser = this .getBrowser (),
         profile = this [_profile] ?? browser .getProfile ("Full");

      return [profile .components .get (name), this [_components] .get (name)]
         .some (component => component && level <= component .level);
   },
   addComponent (component)
   {
      this [_components] .add (component .name, component);

      this ._components_changed = Date .now () / 1000;
   },
   updateComponent (component)
   {
      this [_components] .update (component .name, component .name, component);

      this ._components_changed = Date .now () / 1000;
   },
   removeComponent (name)
   {
      this [_components] .remove (name);

      this ._components_changed = Date .now () / 1000;
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

      this ._units_changed = Date .now () / 1000;
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

      this ._metadata_changed = Date .now () / 1000;
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

      this ._metadata_changed = Date .now () / 1000;
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

      this ._sceneGraph_changed = Date .now () / 1000;
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

      this ._sceneGraph_changed = Date .now () / 1000;
   },
   removeExportedNode (exportedName)
   {
      exportedName = String (exportedName);

      this [_exportedNodes] .remove (exportedName);

      this ._sceneGraph_changed = Date .now () / 1000;
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
         generator .string += "//EN\" \"https://www.web3d.org/specifications/x3d-";
         generator .string += LATEST_VERSION;
         generator .string += ".dtd\">";
         generator .string += generator .TidyBreak ();
      }

      generator .openTag ("X3D");
      generator .attribute ("profile",   this .getProfile () ?.name ?? "Full");
      generator .attribute ("version",   LATEST_VERSION);
      generator .attribute ("xmlns:xsd", "http://www.w3.org/2001/XMLSchema-instance");
      generator .attribute ("xsd:noNamespaceSchemaLocation", `https://www.web3d.org/specifications/x3d-${LATEST_VERSION}.xsd`);

      generator .endTag ();
      generator .IncIndent ();

      if (this .getComponents () .length ||
          this .getUnits () .some (unit => unit .conversionFactor !== 1) ||
          this .getMetaDatas () .size)
      {
         generator .openingTag ("head");
         generator .AddTidyBreak ();
         generator .IncIndent ();

         // <head>

         this .getComponents () .toXMLStream (generator);

         for (const unit of this .getUnits ())
         {
            if (unit .conversionFactor !== 1)
            {
               unit .toXMLStream (generator);
               generator .AddTidyBreak ();
            }
         }

         for (const [key, values] of this .getMetaDatas ())
         {
            for (const value of values)
            {
               generator .openTag ("meta");
               generator .attribute ("name",    key);
               generator .attribute ("content", value);
               generator .closeTag ("meta");
               generator .AddTidyBreak ();
            }
         }

         // </head>

         generator .DecIndent ();
         generator .closingTag ("head");
         generator .AddTidyBreak ();
      }

      if (this .getExternProtoDeclarations () .length ||
          this .getProtoDeclarations () .length ||
          this .getRootNodes () .length)
      {
         generator .openingTag ("Scene");
         generator .AddTidyBreak ();
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
         generator .DecIndent ();
      }

      generator .closingTag ("Scene");
      generator .AddTidyBreak ();
      generator .DecIndent ();
      generator .closingTag ("X3D");
      generator .AddTidyBreak ();
   },
   toJSONStream (generator)
   {
      // X3D

      generator .beginObject ("X3D", false, true);
      generator .stringProperty ("encoding", "UTF-8", false);
      generator .stringProperty ("@profile", this .getProfile () ?.name ?? "Full");
      generator .stringProperty ("@version", LATEST_VERSION);
      generator .stringProperty ("@xsd:noNamespaceSchemaLocation", `https://www.web3d.org/specifications/x3d-${LATEST_VERSION}.xsd`);
      generator .stringProperty ("JSON schema", `https://www.web3d.org/specifications/x3d-${LATEST_VERSION}-JSONSchema.json`);

      // Head

      const outputUnits = this .getUnits () .some (unit => unit .conversionFactor !== 1);

      if (this .getComponents () .length || outputUnits || this .getMetaDatas () .size)
      {
         let headLastProperty = false;

         generator .beginObject ("head");

         // Meta data

         if (this .getMetaDatas () .size)
         {
            // Meta data begin

            generator .beginArray ("meta", headLastProperty);

            // Meta data

            for (const [i, [key, values]] of [... this .getMetaDatas ()] .entries ())
            {
               for (const [j, value] of values .entries ())
               {
                  generator .beginObject ("", i !== 0 || j !== 0);
                  generator .stringProperty ("@name",    key, false);
                  generator .stringProperty ("@content", value);
                  generator .endObject ();
               }
            }

            // Meta data end

            generator .endArray ();

            headLastProperty = true;
         }

         // Components

         if (this .getComponents () .length)
         {
            generator .beginArray ("component", headLastProperty);

            this .getComponents () .toJSONStream (generator);

            generator .endArray ();

            headLastProperty = true;
         }

         // Units

         if (outputUnits)
         {
            generator .beginArray ("unit", headLastProperty);

            this .getUnits () .toJSONStream (generator);

            generator .endArray ();

            headLastProperty = true;
         }

         // Head end

         generator .endObject ();
      }

      // Scene

      generator .beginObject ("Scene");
      generator .beginArray ("-children", false);

      const exportedNodes = this .getExportedNodes ();

      generator .PushExecutionContext (this);
      generator .EnterScope ();
      generator .ExportedNodes (exportedNodes);

      const comma = X3DExecutionContext .prototype .toJSONStream .call (this, generator);

      // Exported nodes

      this .getExportedNodes () .toJSONStream (generator, comma);

      generator .LeaveScope ();
      generator .PopExecutionContext ();

      // Scene end

      generator .endArray ();
      generator .endObject ();

      // X3D end

      generator .endObject ();
      generator .endObject ();
      generator .AddTidyBreak ();
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
      // Remove loading object.
      {
         const scene = this .getScene ();

         if (scene)
         {
            for (const object of this [_loadingObjects])
               scene .removeLoadingObject (object);
         }
      }

      X3DExecutionContext .prototype .setExecutionContext .call (this, executionContext);

      // Add loading object.
      {
         const scene = this .getScene ();

         if (scene)
         {
            for (const object of this [_loadingObjects])
               scene .addLoadingObject (object);
         }
      }
   },
   getLoadingObjects ()
   {
      return this [_loadingObjects];
   },
   addLoadingObject (node)
   {
      this [_loadingObjects] .add (node);

      this ._loadCount = this [_loadingObjects] .size;

      const parent = this .getScene () ?? this .getBrowser ();

      parent .addLoadingObject (node);
   },
   removeLoadingObject (node)
   {
      this [_loadingObjects] .delete (node);

      this ._loadCount = this [_loadingObjects] .size;

      const parent = this .getScene () ?? this .getBrowser ();

      parent .removeLoadingObject (node);
   },
});

for (const key of Object .keys (X3DScene .prototype))
   Object .defineProperty (X3DScene .prototype, key, { enumerable: false });

Object .defineProperties (X3DScene .prototype,
{
   isScene:
   {
      value: true,
      enumerable: true,
   },
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

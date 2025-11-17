import Fields       from "../../Fields.js";
import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DField     from "../../Base/X3DField.js";
import SFNodeCache  from "../../Fields/SFNodeCache.js";

const _metaDataCallbacks = Symbol ();

function X3DNode (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addType (X3DConstants .X3DNode);
}

Object .assign (Object .setPrototypeOf (X3DNode .prototype, X3DBaseNode .prototype),
{
   getComponentInfo ()
   {
      return this .constructor .componentInfo;
   },
   getContainerField ()
   {
      return this .constructor .containerField;
   },
   getSpecificationRange ()
   {
      return this .constructor .specificationRange;
   },
   create (executionContext = this .getExecutionContext ())
   {
      return new (this .constructor) (executionContext);
   },
   copy (instance)
   {
      if (instance ?.getType () .includes (X3DConstants .X3DExecutionContext) ?? true)
      {
         const copy = this .create (instance);

         for (const field of this .getPredefinedFields ())
            copy .getPredefinedFields () .get (field .getName ()) .assign (field);

         if (this .canUserDefinedFields ())
         {
            for (const field of this .getUserDefinedFields ())
               copy .addUserDefinedField (field .getAccessType (), field .getName (), field .copy ());
         }

         return copy;
      }
      else
      {
         const executionContext = instance .getBody ();

         // First try to get a named node with the node's name.

         if (this .getName () .length)
         {
            const namedNode = executionContext .getNamedNodes () .get (this .getName ());

            if (namedNode)
               return namedNode .getValue ();
         }

         // Create copy.

         const copy = this .create (executionContext);

         // Support editing of protos.
         if (this .getNeedsName ())
            this .getExecutionContext () .updateNamedNode (this .getExecutionContext () .getUniqueName (), this);

         if (this .getName () .length)
            executionContext .updateNamedNode (this .getName (), copy);

         // Default fields

         for (const sourceField of this .getPredefinedFields ())
         {
            try
            {
               const destinationField = copy .getPredefinedField (sourceField .getName ());

               let initializableReferences = false;

               for (const originalReference of sourceField .getReferences ())
                  initializableReferences ||= originalReference .isInitializable ();

               if (sourceField .isInitializable () && !initializableReferences)
               {
                  switch (sourceField .getType ())
                  {
                     case X3DConstants .SFNode:
                     case X3DConstants .MFNode:
                        destinationField .assign (sourceField .copy (instance));
                        break;
                     default:
                        destinationField .assign (sourceField);
                        break;
                  }
               }

               if (sourceField .getReferences () .size)
               {
                  // IS relationship

                  for (const originalReference of sourceField .getReferences ())
                  {
                     try
                     {
                        destinationField .addReference (instance .getField (originalReference .getName ()));
                     }
                     catch (error)
                     {
                        console .error (error);
                     }
                  }
               }

               destinationField .setModificationTime (sourceField .getModificationTime ());
            }
            catch (error)
            {
               console .error (error);
            }
         }

         // User-defined fields

         for (const sourceField of this .getUserDefinedFields ())
         {
            let initializableReferences = false;

            for (const originalReference of sourceField .getReferences ())
               initializableReferences ||= originalReference .isInitializable ();

            const destinationField = initializableReferences
               ? sourceField .create ()
               : sourceField .copy (instance);

            copy .addUserDefinedField (sourceField .getAccessType (),
                                       sourceField .getName (),
                                       destinationField);

            if (sourceField .getReferences () .size)
            {
               // IS relationship

               for (const originalReference of sourceField .getReferences ())
               {
                  try
                  {
                     destinationField .addReference (instance .getField (originalReference .getName ()));
                  }
                  catch (error)
                  {
                     console .error (`No reference '${originalReference .getName ()}' inside execution context ${instance .getTypeName ()} '${instance .getName ()}'.`);
                  }
               }
            }

            destinationField .setModificationTime (sourceField .getModificationTime ());
         }

         return copy;
      }
   },
   getDisplayName ()
   {
      return this .getName () .replace (/_\d+$/, "");
   },
   getNeedsName ()
   {
      if (this .getName () .length)
         return false;

      if (this .getCloneCount () > 1)
         return true;

      if (this .hasRoutes ())
         return true;

      const executionContext = this .getExecutionContext ()

      for (const importedNode of executionContext .getImportedNodes ())
      {
         if (importedNode .getInlineNode () === this)
            return true;
      }

      if (executionContext .isScene)
      {
         for (const exportedNode of executionContext .getExportedNodes ())
         {
            if (exportedNode .getLocalNode () === this)
               return true;
         }
      }

      return false;
   },
   hasRoutes ()
   {
      ///  Returns true if there are any routes from or to fields of this node, otherwise false.

      for (const field of this .getPredefinedFields ())
      {
         if (field .getInputRoutes () .size || field .getOutputRoutes () .size)
            return true;
      }

      for (const field of this .getUserDefinedFields ())
      {
         if (field .getInputRoutes () .size || field .getOutputRoutes () .size)
            return true;
      }

      for (const route of this .getExecutionContext () .getRoutes ())
      {
         if (route .getSourceNode () === this || route .getDestinationNode () === this)
            return true;
      }

      return false;
   },
   getCloneCount ()
   {
      return X3DBaseNode .prototype .collectCloneCount .call (this);
   },
   collectCloneCount ()
   {
      return 1;
   },
   getSourceText ()
   {
      return null;
   },
   traverse ()
   { },
   hasMetaData (path)
   {
      const names = path .split ("/");

      if (names .length < 2)
         return false;

      const
         last           = names .pop (),
         metadataSet    = this .getMetadataSet (names),
         metadataObject = metadataSet ?.getValue () .getMetaValue (last);

      return !!metadataObject;
   },
   getMetaData (path, field)
   {
      const names = path .split ("/");

      if (names .length < 2)
         return;

      const
         last           = names .pop (),
         metadataSet    = this .getMetadataSet (names),
         metadataObject = metadataSet ?.getValue () .getMetaValue (last);

      if (field instanceof X3DField)
      {
         if (!metadataObject)
            return field;

         switch (field .getType ())
         {
            case X3DConstants .SFBool:
            case X3DConstants .SFDouble:
            case X3DConstants .SFFloat:
            case X3DConstants .SFInt32:
            case X3DConstants .SFString:
            case X3DConstants .SFTime:
            {
               field .setValue (metadataObject .value [0]);
               break;
            }
            case X3DConstants .SFColor:
            case X3DConstants .SFColorRGBA:
            case X3DConstants .SFMatrix3d:
            case X3DConstants .SFMatrix3f:
            case X3DConstants .SFMatrix4d:
            case X3DConstants .SFMatrix4f:
            case X3DConstants .SFRotation:
            case X3DConstants .SFVec2d:
            case X3DConstants .SFVec2f:
            case X3DConstants .SFVec3d:
            case X3DConstants .SFVec3f:
            case X3DConstants .SFVec4d:
            case X3DConstants .SFVec4f:
            {
               const value = metadataObject .value;

               let i = 0;

               for (const key in field)
                  field [key] = value [i ++];

               break;
            }
            case X3DConstants .SFImage:
            {
               const
                  value = metadataObject .value,
                  array = field .array;

               field .width  = value [0];
               field .height = value [1];
               field .comp   = value [2];

               const l = array .length;

               for (let i = 0; i < l; ++ i)
                  array [i] = value [3 + i];

               break;
            }
            case X3DConstants .SFNode:
            case X3DConstants .MFNode:
            {
               throw new Error ("SFNode and MFNode are not supported as metadata value.");
            }
            case X3DConstants .MFBool:
            case X3DConstants .MFDouble:
            case X3DConstants .MFFloat:
            case X3DConstants .MFInt32:
            case X3DConstants .MFString:
            case X3DConstants .MFTime:
            {
               field .length = 0;

               for (const v of metadataObject .value)
                  field .push (v);

               break;
            }
            case X3DConstants .MFColor:
            case X3DConstants .MFColorRGBA:
            case X3DConstants .MFMatrix3d:
            case X3DConstants .MFMatrix3f:
            case X3DConstants .MFMatrix4d:
            case X3DConstants .MFMatrix4f:
            case X3DConstants .MFRotation:
            case X3DConstants .MFVec2d:
            case X3DConstants .MFVec2f:
            case X3DConstants .MFVec3d:
            case X3DConstants .MFVec3f:
            case X3DConstants .MFVec4d:
            case X3DConstants .MFVec4f:
            {
               const
                  value  = metadataObject .value,
                  length = value .length;

               field .length = 0;

               for (let i = 0; i < length;)
               {
                  const
                     l = field .length ++,
                     f = field [l];

                  for (const key in f)
                     f [key] = value [i ++];
               }

               break;
            }
            case X3DConstants .MFImage:
            {
               const
                  value  = metadataObject .value,
                  length = value .length;

               field .length = 0;

               for (let i = 0; i < length;)
               {
                  const
                     l = field .length ++,
                     f = field [l],
                     a = f .array;

                  f .width  = value [i ++];
                  f .height = value [i ++];
                  f .comp   = value [i ++];

                  const p = a .length;

                  for (let k = 0; k < p; ++ k)
                     a [k] = value [i ++];
               }

               break;
            }
         }

         return field;
      }
      else if (field)
      {
         // Support for Numbers (Vector234, Color34, ...).

         if (!metadataObject)
            return field;

         const value = metadataObject .value;

         let i = 0;

         for (const key in field)
            field [key] = value [i ++];

         return field;
      }

      return metadataObject ? Array .from (metadataObject .value) : [ ];
   },
   setMetaData (path, value)
   {
      const names = path .split ("/");

      if (names .length < 2)
         return;

      const
         last        = names .pop (),
         metadataSet = this .getMetadataSet (names, true);

      if (value instanceof X3DField)
      {
         const field = value;

         switch (value .getType ())
         {
            case X3DConstants .SFBool:
            case X3DConstants .SFDouble:
            case X3DConstants .SFFloat:
            case X3DConstants .SFInt32:
            case X3DConstants .SFString:
            case X3DConstants .SFTime:
            {
               value = [field .valueOf ()];
               break;
            }
            case X3DConstants .SFNode:
            case X3DConstants .MFNode:
               throw new Error ("SFNode and MFNode are not supported as metadata value.");
            default:
            {
               value = Array .from (field, f => f instanceof X3DField ? Array .from (f) : f) .flat ();
               break;
            }
         }

         switch (field .getType ())
         {
            case X3DConstants .SFBool:
            case X3DConstants .MFBool:
               value .type = "boolean";
               break;
            case X3DConstants .SFDouble:
            case X3DConstants .SFMatrix3d:
            case X3DConstants .SFMatrix4d:
            case X3DConstants .SFRotation:
            case X3DConstants .SFTime:
            case X3DConstants .SFVec2d:
            case X3DConstants .SFVec3d:
            case X3DConstants .SFVec4d:
            case X3DConstants .MFDouble:
            case X3DConstants .MFMatrix3d:
            case X3DConstants .MFMatrix4d:
            case X3DConstants .MFRotation:
            case X3DConstants .MFTime:
            case X3DConstants .MFVec2d:
            case X3DConstants .MFVec3d:
            case X3DConstants .MFVec4d:
               value .type = "double";
               break;
            case X3DConstants .SFColor:
            case X3DConstants .SFColorRGBA:
            case X3DConstants .SFFloat:
            case X3DConstants .SFMatrix3f:
            case X3DConstants .SFMatrix4f:
            case X3DConstants .SFVec2f:
            case X3DConstants .SFVec3f:
            case X3DConstants .SFVec4f:
            case X3DConstants .MFColor:
            case X3DConstants .MFColorRGBA:
            case X3DConstants .MFFloat:
            case X3DConstants .MFMatrix3f:
            case X3DConstants .MFMatrix4f:
            case X3DConstants .MFVec2f:
            case X3DConstants .MFVec3f:
            case X3DConstants .MFVec4f:
               value .type = "float";
               break;
            case X3DConstants .SFInt32:
            case X3DConstants .SFImage:
            case X3DConstants .MFInt32:
            case X3DConstants .MFImage:
               value .type = "integer";
               break;
            case X3DConstants .SFString:
            case X3DConstants .MFString:
               value .type = "string";
               break;
         }
      }
      else if (!Array .isArray (value) && value .valueOf () instanceof Object)
      {
         // Support for Numbers (Vector234, Color34, ...).

         value = Array .from (value);
         value .type = "double";
      }

      metadataSet .getValue () .setMetaValue (last, value);

      this .processMetaDataCallback (path);
   },
   removeMetaData (path)
   {
      const names = path .split ("/");

      if (names .length < 2)
         return;

      function removeMetaData (metadataSet, names)
      {
         if (!metadataSet)
            return false;

         const name = names .shift ();

         if (!names .length || removeMetaData (metadataSet .getValue () .getMetadataObject ("MetadataSet", name), names))
         {
            metadataSet .getValue () .removeMetaValue (name);
         }

         return !metadataSet .value .length;
      }

      if (removeMetaData (this .getMetadataSet ([names .shift ()]), names))
         this ._metadata = null;
   },
   getMetadataSet (names, create = false)
   {
      const name = names .shift ();

      let metadataSet = this ._metadata .valueOf ();

      if (metadataSet ?.getNodeTypeName () !== "MetadataSet" || metadataSet ?.name !== name)
      {
         if (!create)
            return null;

         this ._metadata = this .getExecutionContext () .createNode ("MetadataSet");
         metadataSet     = this ._metadata .valueOf ();

         this .getExecutionContext () .addNamedNode (this .getExecutionContext () .getUniqueName (name), metadataSet);

         metadataSet .reference = this .getBrowser () .getBrowserOption ("MetadataReference");
         metadataSet .name      = name;
      }

      for (const name of names)
         metadataSet = metadataSet .getValue () .getMetadataObject ("MetadataSet", name, create);

      return metadataSet;
   },
   [_metaDataCallbacks]: new Map (),
   addMetaDataCallback (key, path, callback)
   {
      if (!this .hasOwnProperty (_metaDataCallbacks))
         this [_metaDataCallbacks] = new Map ();

      let map = this [_metaDataCallbacks] .get (path);

      if (!map)
         this [_metaDataCallbacks] .set (path, map = new Map ());

      map .set (key, callback);
   },
   removeMetaDataCallback (key, path)
   {
      const map = this [_metaDataCallbacks] .get (path);

      if (!map)
         return;

      map .delete (key);

      if (map .size === 0)
         this [_metaDataCallbacks] .delete (path);
   },
   processMetaDataCallback (path)
   {
      const map = this [_metaDataCallbacks] .get (path);

      if (!map)
         return;

      for (const callback of map .values ())
         callback ();
   },
   toStream (generator)
   {
      generator .string += this .getTypeName ();
      generator .TidySpace ();
      generator .string += "{";
      generator .TidySpace ();
      generator .string += "}";
   },
   toVRMLStream (generator)
   {
      generator .CheckSpace ();

      if (generator .outputNames)
      {
         const name = generator .Name (this);

         if (name .length)
         {
            if (generator .ExistsNode (this))
            {
               generator .string += "USE";
               generator .Space ();
               generator .string += name;
               generator .NeedsSpace ();
               return;
            }
         }

         if (name .length)
         {
            generator .AddNode (this);

            generator .string += "DEF";
            generator .Space ();
            generator .string += name;
            generator .Space ();
         }
      }

      generator .string += this .getTypeName ();
      generator .TidySpace ();
      generator .string += "{";

      const
         fields            = this .getChangedFields (),
         userDefinedFields = this .getUserDefinedFields ();

      if (this .canUserDefinedFields ())
      {
         if (userDefinedFields .length)
         {
            let
               fieldTypeLength  = 0,
               accessTypeLength = 0;

            for (const field of userDefinedFields)
            {
               fieldTypeLength  = Math .max (fieldTypeLength, field .getTypeName () .length);
               accessTypeLength = Math .max (accessTypeLength, generator .AccessType (field .getAccessType ()) .length);
            }

            generator .TidyBreak ();
            generator .IncIndent ();

            const last = userDefinedFields .at (-1);

            for (const field of userDefinedFields)
            {
               this .toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength);

               if (field === last)
                  generator .TidyBreak ();
               else
                  generator .Break ();
            }

            generator .DecIndent ();

            if (fields .length !== 0)
               generator .TidyBreak ();
         }
      }

      if (fields .length === 0)
      {
         if (userDefinedFields .length)
            generator .Indent ();
         else
            generator .TidySpace ();
      }
      else
      {
         const last = fields .at (-1);

         if (userDefinedFields .length === 0)
            generator .TidyBreak ();

         generator .IncIndent ();

         for (const field of fields)
         {
            this .toVRMLStreamField (generator, field);

            if (field === last)
               generator .TidyBreak ();
            else
               generator .Break ();
         }

         generator .DecIndent ();
         generator .Indent ();
      }

      generator .string += "}";
   },
   toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength)
   {
      const sharedNode = generator .IsSharedNode (this);

      if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode)
      {
         generator .Indent ();
         generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, generator .TidySpace ());
         generator .Space ();
         generator .string += field .getTypeName () .padEnd (fieldTypeLength, generator .TidySpace ());
         generator .Space ();
         generator .string += field .getName ();

         if (field .isInitializable ())
         {
            generator .Space ();

            field .toVRMLStream (generator);
         }
      }
      else
      {
         let
            index                  = 0,
            initializableReferences = false;

         for (const reference of field .getReferences ())
         {
            initializableReferences ||= reference .isInitializable ();

            // Output user defined reference field

            generator .Indent ();
            generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, generator .TidySpace ());
            generator .Space ();
            generator .string += field .getTypeName () .padEnd (fieldTypeLength, generator .TidySpace ());
            generator .Space ();
            generator .string += field .getName ();
            generator .Space ();
            generator .string += "IS";
            generator .Space ();
            generator .string += reference .getName ();

            ++ index;

            if (index !== field .getReferences () .size)
               generator .Break ();
         }

         if (field .getAccessType () === X3DConstants .inputOutput && !initializableReferences && !field .isDefaultValue ())
         {
            generator .Break ();
            generator .Indent ();
            generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, generator .TidySpace ());
            generator .Space ();
            generator .string += field .getTypeName () .padEnd (fieldTypeLength, generator .TidySpace ());
            generator .Space ();
            generator .string += field .getName ();

            if (field .isInitializable ())
            {
               generator .Space ();

               field .toVRMLStream (generator);
            }
         }
      }
   },
   toVRMLStreamField (generator, field)
   {
      const sharedNode = generator .IsSharedNode (this);

      if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode)
      {
         if (field .isInitializable ())
         {
            generator .Indent ();
            generator .string += field .getName ();
            generator .Space ();

            field .toVRMLStream (generator);
         }
      }
      else
      {
         let
            index                  = 0,
            initializableReferences = false;

         for (const reference of field .getReferences ())
         {
            initializableReferences ||= reference .isInitializable ();

            // Output build in reference field

            generator .Indent ();
            generator .string += field .getName ();
            generator .Space ();
            generator .string += "IS";
            generator .Space ();
            generator .string += reference .getName ();

            ++ index;

            if (index !== field .getReferences () .size)
               generator .Break ();
         }

         if (field .getAccessType () === X3DConstants .inputOutput && !initializableReferences && !this .isDefaultValue (field))
         {
            // Output build in field

            generator .Break ();
            generator .Indent ();
            generator .string += field .getName ();
            generator .Space ();

            field .toVRMLStream (generator);
         }
      }
   },
   toXMLStream (generator)
   {
      const
         sharedNode = generator .IsSharedNode (this),
         name       = generator .Name (this);

      if (name .length)
      {
         if (generator .ExistsNode (this))
         {
            generator .openTag (this .getTypeName ());

            if (generator .html && this .getTypeName () === "Script")
               generator .attribute ("type", "model/x3d+xml");

            generator .attribute ("USE", name);
            generator .containerField (this .getContainerField ());
            generator .closeTag (this .getTypeName ());
            return;
         }
      }

      generator .openTag (this .getTypeName ());

      if (generator .html && this .getTypeName () === "Script")
         generator .attribute ("type", "model/x3d+xml");

      if (name .length)
      {
         generator .AddNode (this);
         generator .attribute ("DEF", name);
      }

      generator .containerField (this .getContainerField ());

      const
         fields            = this .getChangedFields (),
         userDefinedFields = this .getUserDefinedFields ();

      const
         references = [ ],
         childNodes = [ ];

      let cdata = this .getSourceText ();

      if (cdata ?.length === 0 || (generator .html && this .getTypeName () !== "Script"))
         cdata = null;

      if (!cdata ?.some (string => string .match (/^\s*(?:data|ecmascript|javascript|vrmlscript)\:/s)))
         cdata = null;

      generator .IncIndent ();
      generator .IncIndent ();

      for (const field of fields)
      {
         // If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
         // for this field.

         let mustOutputValue = false;

         if (generator .ExecutionContext ())
         {
            if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
            {
               if (!Array .from (field .getReferences ()) .some (reference => reference .isInitializable ()))
                  mustOutputValue = !this .isDefaultValue (field);
            }
         }

         // If we have no execution context we are not in a proto and must not generate IS references the same is true
         // if the node is a shared node as the node does not belong to the execution context.

         if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode || mustOutputValue)
         {
            if (mustOutputValue)
               references .push (field);

            if (field .isInitializable ())
            {
               switch (field .getType ())
               {
                  case X3DConstants .SFNode:
                  case X3DConstants .MFNode:
                  {
                     childNodes .push (field);
                     break;
                  }
                  default:
                  {
                     if (field === cdata)
                        break;

                     generator .AttribBreak ();
                     generator .ListIndent ();
                     generator .string += field .getName ();
                     generator .string += "='";

                     field .toXMLStream (generator, field === this .getSourceText ());

                     generator .string += "'";
                     break;
                  }
               }
            }
         }
         else
         {
            references .push (field);
         }
      }

      generator .DecIndent ();
      generator .DecIndent ();

      if ((!this .canUserDefinedFields () || !userDefinedFields .length) && (!references .length || sharedNode) && !childNodes .length && !cdata)
      {
         generator .closeTag (this .getTypeName ());
      }
      else
      {
         generator .endTag ();
         generator .IncIndent ();

         if (this .canUserDefinedFields ())
         {
            for (const field of userDefinedFields)
            {
               generator .openTag ("field");
               generator .attribute ("accessType", generator .AccessType (field .getAccessType ()));
               generator .attribute ("type",       field .getTypeName ());
               generator .attribute ("name",       field .getName ());

               // If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
               // for this field.

               let mustOutputValue = false;

               if (generator .ExecutionContext ())
               {
                  if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
                  {
                     if (!Array .from (field .getReferences ()) .some (reference => reference .isInitializable ()))
                        mustOutputValue = true;
                  }
               }

               if ((field .getReferences () .size === 0 || !generator .ExecutionContext ()) || sharedNode || mustOutputValue)
               {
                  if (mustOutputValue && generator .ExecutionContext ())
                     references .push (field);

                  if (!field .isInitializable () || field .isDefaultValue ())
                  {
                     if (field .getAppInfo ())
                        generator .attribute ("appinfo", field .getAppInfo ());

                     if (field .getDocumentation ())
                        generator .attribute ("documentation", field .getDocumentation ());

                     generator .closeTag ("field");
                     generator .TidyBreak ();
                  }
                  else
                  {
                     // Output value

                     switch (field .getType ())
                     {
                        case X3DConstants .SFNode:
                        case X3DConstants .MFNode:
                        {
                           if (field .getAppInfo ())
                              generator .attribute ("appinfo", field .getAppInfo ());

                           if (field .getDocumentation ())
                              generator .attribute ("documentation", field .getDocumentation ());

                           generator .endTag ();
                           generator .IncIndent ();
                           generator .PushContainerField (null);

                           field .toXMLStream (generator);

                           generator .TidyBreak ();
                           generator .DecIndent ();
                           generator .closingTag ("field");
                           generator .TidyBreak ();
                           generator .PopContainerField ();
                           break;
                        }
                        default:
                        {
                           generator .Space ();
                           generator .string += "value='";

                           field .toXMLStream (generator);

                           generator .string += "'";

                           if (field .getAppInfo ())
                              generator .attribute ("appinfo", field .getAppInfo ());

                           if (field .getDocumentation ())
                              generator .attribute ("documentation", field .getDocumentation ());

                           generator .closeTag ("field");
                           generator .TidyBreak ();
                           break;
                        }
                     }
                  }
               }
               else
               {
                  if (generator .ExecutionContext ())
                     references .push (field);

                  if (field .getAppInfo ())
                     generator .attribute ("appinfo", field .getAppInfo ());

                  if (field .getDocumentation ())
                     generator .attribute ("documentation", field .getDocumentation ());

                  generator .closeTag ("field");
                  generator .TidyBreak ();
               }
            }
         }

         if (references .length && !sharedNode)
         {
            generator .openingTag ("IS");
            generator .TidyBreak ();
            generator .IncIndent ();

            for (const field of references)
            {
               const protoFields = field .getReferences ();

               for (const protoField of protoFields)
               {
                  generator .openTag ("connect");
                  generator .attribute ("nodeField",  field .getName ());
                  generator .attribute ("protoField", protoField .getName ());
                  generator .closeTag ("connect");
                  generator .TidyBreak ();
               }
            }

            generator .DecIndent ();
            generator .closingTag ("IS");
            generator .TidyBreak ();
         }

         for (const field of childNodes)
         {
            generator .PushContainerField (field);

            field .toXMLStream (generator);

            generator .TidyBreak ();
            generator .PopContainerField ();
         }

         for (const value of cdata ?? [ ])
         {
            generator .string += "<![CDATA[";
            generator .string += value;
            generator .string += "]]>";
            generator .Break ();
         }

         generator .DecIndent ();
         generator .closingTag (this .getTypeName ());
      }
   },
   toJSONStream (generator)
   {
      const
         sharedNode = generator .IsSharedNode (this),
         name       = generator .Name (this);

      // Type name

      generator .beginObject (this .getTypeName (), false, true);

      // USE name

      if (name .length)
      {
         if (generator .ExistsNode (this))
         {
            generator .stringProperty ("@USE", name, false);
            generator .endObject ();
            generator .endObject ();
            return;
         }
      }

      let comma = false;

      // DEF name

      if (name .length)
      {
         generator .AddNode (this);
         generator .stringProperty ("@DEF", name, false);

         comma = true;
      }

      // Fields

      const
         fields            = this .getChangedFields (),
         userDefinedFields = this .getUserDefinedFields ();

      const references = [ ];

      let sourceText = this .getSourceText ();

      // Source text

      if (sourceText ?.length !== 1)
         sourceText = null;

      if (!sourceText ?.some (string => string .match (/^\s*(?:data|ecmascript|javascript|vrmlscript)\:/s)))
         sourceText = null;

      // Predefined fields

      if (fields .length)
      {
         const outputFields = [ ];

         for (const field of fields)
         {
            // If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
            // for this field.

            let mustOutputValue = false;

            if (generator .ExecutionContext ())
            {
               if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
               {
                  if (!Array .from (field .getReferences ()) .some (reference => reference .isInitializable ()))
                     mustOutputValue = !this .isDefaultValue (field);
               }
            }

            // If we have no execution context we are not in a proto and must not generate IS references the same is true
            // if the node is a shared node as the node does not belong to the execution context.

            if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode || mustOutputValue)
            {
               if (mustOutputValue)
                  references .push (field);

               if (field !== sourceText && field .isInitializable ())
                  outputFields .push (field);
            }
            else
            {
               references .push (field);
            }
         }

         for (const field of outputFields)
         {
            switch (field .getType ())
            {
               case X3DConstants .SFNode:
               case X3DConstants .MFNode:
               {
                  generator .beginValue (`-${field .getName ()}`, comma || field !== outputFields [0]);

                  field .toJSONStream (generator);
                  break;
               }
               default:
               {
                  generator .beginValue (`@${field .getName ()}`, comma || field !== outputFields [0]);

                  field .toJSONStream (generator);
                  break;
               }
            }
         }

         comma ||= !! outputFields .length;
      }

      // User defined fields

      if (this .canUserDefinedFields () && userDefinedFields .length)
      {
         generator .beginArray ("field", comma);

         for (const field of userDefinedFields)
         {
            generator .beginObject ("", field !== userDefinedFields [0]);
            generator .stringProperty ("@accessType", generator .AccessType (field .getAccessType ()), false);
            generator .stringProperty ("@type",       field .getTypeName ());
            generator .stringProperty ("@name",       field .getName ());

            // If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
            // for this field.

            let mustOutputValue = false;

            if (generator .ExecutionContext ())
            {
               if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
               {
                  if (!Array .from (field .getReferences ()) .some (reference => reference .isInitializable ()))
                     mustOutputValue = true;
               }
            }

            if ((field .getReferences () .size === 0 || !generator .ExecutionContext ()) || sharedNode || mustOutputValue)
            {
               if (mustOutputValue && generator .ExecutionContext ())
                  references .push (field);

               if (field .isInitializable () && !field .isDefaultValue ())
               {
                  // Output value

                  switch (field .getType ())
                  {
                     case X3DConstants .SFNode:
                     {
                        generator .beginArray ("-children");

                        generator .TidyBreak ();
                        generator .Indent ();

                        field .toJSONStream (generator);

                        generator .endArray ();
                        break;
                     }
                     case X3DConstants .MFNode:
                     {
                        generator .beginValue ("-children");

                        field .toJSONStream (generator);
                        break;
                     }
                     default:
                     {
                        generator .beginValue ("@value");

                        field .toJSONStream (generator);
                        break;
                     }
                  }
               }
            }
            else
            {
               if (generator .ExecutionContext ())
                  references .push (field);
            }

            if (field .getAppInfo ())
               generator .stringProperty ("@appinfo", field .getAppInfo ());

            if (field .getDocumentation ())
               generator .stringProperty ("@documentation", field .getDocumentation ());

            generator .endObject ();
         }

         generator .endArray ();

         comma = true;
      }

      // Source text

      if (sourceText)
      {
         generator .beginArray ("#sourceCode", comma);

         const lines = sourceText [0] .split ("\n");

         for (const [i, line] of lines .entries ())
         {
            if (i !== 0)
               generator .string += ',';

            generator .TidyBreak ();
            generator .ListIndent ();
            generator .string += '"';
            generator .string += generator .EncodeString (line);
            generator .string += '"';
         }

         generator .endArray ();

         comma = true;
      }

      // IS references

      if (references .length && !sharedNode)
      {
         generator .beginObject ("IS", comma);
         generator .beginArray ("connect", false);

         for (const field of references)
         {
            const protoFields = Array .from (field .getReferences ());

            for (const protoField of protoFields)
            {
               generator .beginObject ("", field !== references [0] || protoField !== protoFields [0]);
               generator .stringProperty ("@nodeField",  field .getName (), false);
               generator .stringProperty ("@protoField", protoField .getName ());
               generator .endObject ();
            }
         }

         generator .endArray ();
         generator .endObject ();
      }

      // End

      generator .endObject ();
      generator .endObject ();
   },
   dispose ()
   {
      const executionContext = this .getExecutionContext ();

      // Remove named node if any.

      if (this .getName ())
         executionContext .removeNamedNode (this .getName ())

      if (executionContext .isScene)
      {
         // Remove exported node if any.

         for (const exportedNode of Array .from (executionContext .getExportedNodes ()))
         {
            if (exportedNode .getLocalNode () === this)
               executionContext .removeExportedNode (exportedNode .getExportedName ());
         }

         // Remove imported node if any.

         const parentContext = executionContext .getExecutionContext ();

         if (parentContext)
         {
            for (const importedNode of parentContext .getImportedNodes ())
               importedNode .getExportedNode () .update ();
         }
      }

      // Remove node from entire scene graph.

      for (const firstParent of Array .from (this .getParents ()))
      {
         if (!(firstParent instanceof Fields .SFNode))
            continue;

         for (const secondParent of Array .from (firstParent .getParents ()))
         {
            if (!(secondParent instanceof Fields .MFNode))
               continue;

            secondParent .setValue (Array .from (secondParent) .filter (node => node ?.getValue () !== this))
         }
      }

      for (const firstParent of Array .from (this .getParents ()))
      {
         if (!(firstParent instanceof Fields .SFNode))
            continue;

         firstParent .setValue (null);
      }

      SFNodeCache .delete (this);

      // Call super.dispose, where fields get disposed.

      X3DBaseNode .prototype .dispose .call (this);
   },
});

for (const key of Object .keys (X3DNode .prototype))
   Object .defineProperty (X3DNode .prototype, key, { enumerable: false });

Object .defineProperties (X3DNode,
{
   getStaticProperties:
   {
      value (typeName, componentName, componentLevel, containerField, fromVersion, toVersion = "Infinity")
      {
         return {
            typeName:
            {
               value: typeName,
               enumerable: true,
            },
            componentInfo:
            {
               value: Object .freeze ({ name: componentName, level: componentLevel }),
               enumerable: true,
            },
            ... containerField ?
            {
               containerField:
               {
                  value: containerField,
                  enumerable: true,
               },
            } : { },
            ... fromVersion && toVersion ?
            {
               specificationRange:
               {
                  value: Object .freeze ({ from: fromVersion, to: toVersion }),
                  enumerable: true,
               },
            } : { },
         };
      },
   },
})

Object .defineProperties (X3DNode, X3DNode .getStaticProperties ("X3DNode", "Core", 1));

export default X3DNode;

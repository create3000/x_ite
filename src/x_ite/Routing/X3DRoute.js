import X3DObject       from "../Base/X3DObject.js";
import X3DConstants    from "../Base/X3DConstants.js";
import SFNodeCache     from "../Fields/SFNodeCache.js";
import X3DNode         from "../Components/Core/X3DNode.js";
import X3DImportedNode from "../Execution/X3DImportedNode.js";

const
   _executionContext     = Symbol (),
   _sourceNode           = Symbol (),
   _sourceFieldName      = Symbol (),
   _sourceField          = Symbol (),
   _destinationNode      = Symbol (),
   _destinationFieldName = Symbol (),
   _destinationField     = Symbol (),
   _disposed             = Symbol ();

function X3DRoute (executionContext, sourceNode, sourceFieldName, destinationNode, destinationFieldName)
{
   X3DObject .call (this, executionContext);

   this [_executionContext]     = executionContext;
   this [_sourceNode]           = sourceNode;
   this [_sourceFieldName]      = sourceFieldName;
   this [_destinationNode]      = destinationNode;
   this [_destinationFieldName] = destinationFieldName;

   if (sourceNode instanceof X3DImportedNode)
      sourceNode .getInlineNode () .getLoadState () .addInterest ("reconnect", this);

   if (destinationNode instanceof X3DImportedNode)
      destinationNode .getInlineNode () .getLoadState () .addInterest ("reconnect", this);

   this .reconnect ();
}

Object .assign (Object .setPrototypeOf (X3DRoute .prototype, X3DObject .prototype),
{
   getExecutionContext ()
   {
      return this [_executionContext];
   },
   getRouteId ()
   {
      return X3DRoute .getRouteId (this [_sourceNode], this [_sourceFieldName], this [_destinationNode], this [_destinationFieldName]);
   },
   getSourceNode ()
   {
      ///  SAI
      return this [_sourceNode];
   },
   getSourceField ()
   {
      ///  SAI

      if (this [_sourceField])
      {
         return this [_sourceField] .getAccessType () === X3DConstants .inputOutput
            ? this [_sourceField] .getName () + "_changed"
            : this [_sourceField] .getName ();
      }
      else
      {
         return this [_sourceFieldName];
      }

   },
   getDestinationNode ()
   {
      ///  SAI
      return this [_destinationNode];
   },
   getDestinationField ()
   {
      ///  SAI

      if (this [_destinationField])
      {
         return this [_destinationField] .getAccessType () === X3DConstants .inputOutput
            ? "set_" + this [_destinationField] .getName ()
            : this [_destinationField] .getName ();
      }
      else
      {
         return this [_destinationFieldName];
      }
   },
   reconnect ()
   {
      try
      {
         this .disconnect ();
         this .connect ();
      }
      catch (error)
      {
         if ((this [_sourceNode] instanceof X3DNode ||
              this [_sourceNode] .getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE) &&
             (this [_destinationNode] instanceof X3DNode ||
              this [_destinationNode] .getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE))
         {
            console .warn (error .message);
         }
      }
   },
   connect ()
   {
      if (this [_disposed])
         return;

      let firstError, secondError;

      try
      {
         const sourceNode = this [_sourceNode] instanceof X3DNode
            ? this [_sourceNode]
            : this [_sourceNode] .getExportedNode ();

         this [_sourceField] = sourceNode .getField (this [_sourceFieldName]);
      }
      catch (error)
      {
         firstError = error;
      }

      try
      {
         const destinationNode = this [_destinationNode] instanceof X3DNode
            ? this [_destinationNode]
            : this [_destinationNode] .getExportedNode ();

         this [_destinationField] = destinationNode .getField (this [_destinationFieldName]);

      }
      catch (error)
      {
         secondError = error;
      }

      if (this [_sourceField] && this [_destinationField])
      {
         if (this [_sourceField] .getType () !== this [_destinationField] .getType ())
            throw new Error (`Bad ROUTE statement: Source field type must match destination field type of fields named "${this [_sourceField] .getName ()}" and "${this [_destinationField] .getName ()}".`);

         if (!this [_sourceField] .isOutput ())
            throw new Error (`Bad ROUTE statement: Source field "${this [_sourceField] .getName ()}" must be an output.`);

         if (!this [_destinationField] .isInput ())
            throw new Error (`Bad ROUTE statement: Destination field "${this [_destinationField] .getName ()}" must be an input.`);

         this [_sourceField]      .addOutputRoute (this);
         this [_destinationField] .addInputRoute (this);
         this [_sourceField]      .addFieldInterest (this [_destinationField]);
      }
      else
      {
         throw firstError ?? secondError;
      }
   },
   disconnect ()
   {
      this [_sourceField]      ?.removeOutputRoute (this);
      this [_destinationField] ?.removeInputRoute (this);

      if (this [_sourceField] && this [_destinationField])
         this [_sourceField] .removeFieldInterest (this [_destinationField]);

      this [_sourceField]      = null;
      this [_destinationField] = null;
   },
   toVRMLStream (generator)
   {
      if (!generator .ExistsRouteNode (this [_sourceNode]))
         throw new Error (`Source node does not exist in scene graph.`);

      if (!generator .ExistsRouteNode (this [_destinationNode]))
         throw new Error (`Destination node does not exist in scene graph.`);

      const sourceNodeName = this [_sourceNode] instanceof X3DNode
         ? generator .Name (this [_sourceNode])
         : generator .ImportedName (this [_sourceNode]);

      const destinationNodeName = this [_destinationNode] instanceof X3DNode
         ? generator .Name (this [_destinationNode])
         : generator .ImportedName (this [_destinationNode]);

      generator .string += generator .Indent ();
      generator .string += "ROUTE";
      generator .string += generator .Space ();
      generator .string += sourceNodeName;
      generator .string += ".";
      generator .string += this .getSourceField ();
      generator .string += generator .Space ();
      generator .string += "TO";
      generator .string += generator .Space ();
      generator .string += destinationNodeName;
      generator .string += ".";
      generator .string += this .getDestinationField ();
   },
   toXMLStream (generator)
   {
      if (!generator .ExistsRouteNode (this [_sourceNode]))
         throw new Error (`Source node does not exist in scene graph.`);

      if (!generator .ExistsRouteNode (this [_destinationNode]))
         throw new Error (`Destination node does not exist in scene graph.`);

      const sourceNodeName = this [_sourceNode] instanceof X3DNode
         ? generator .Name (this [_sourceNode])
         : generator .ImportedName (this [_sourceNode]);

      const destinationNodeName = this [_destinationNode] instanceof X3DNode
         ? generator .Name (this [_destinationNode])
         : generator .ImportedName (this [_destinationNode]);

      generator .string += generator .Indent ();
      generator .string += "<ROUTE";
      generator .string += generator .Space ();
      generator .string += "fromNode='";
      generator .string += generator .XMLEncode (sourceNodeName);
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "fromField='";
      generator .string += generator .XMLEncode (this .getSourceField ());
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "toNode='";
      generator .string += generator .XMLEncode (destinationNodeName);
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "toField='";
      generator .string += generator .XMLEncode (this .getDestinationField ());
      generator .string += "'";
      generator .string += generator .closingTags ? "></ROUTE>" : "/>";
   },
   toJSONStream (generator)
   {
      if (!generator .ExistsRouteNode (this [_sourceNode]))
         throw new Error (`Source node does not exist in scene graph.`);

      if (!generator .ExistsRouteNode (this [_destinationNode]))
         throw new Error (`Destination node does not exist in scene graph.`);

      const sourceNodeName = this [_sourceNode] instanceof X3DNode
         ? generator .Name (this [_sourceNode])
         : generator .ImportedName (this [_sourceNode]);

      const destinationNodeName = this [_destinationNode] instanceof X3DNode
         ? generator .Name (this [_destinationNode])
         : generator .ImportedName (this [_destinationNode]);

      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "ROUTE";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();
      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@fromNode";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (sourceNodeName);
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@fromField";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (this .getSourceField ());
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@toNode";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (destinationNodeName);
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@toField";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (this .getDestinationField ());
      generator .string += '"';
      generator .string += generator .TidyBreak ();

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
   dispose ()
   {
      if (this [_disposed])
         return;

      this [_disposed] = true;

      this .disconnect ();

      if (this [_sourceNode] instanceof X3DImportedNode)
         this [_sourceNode] .getInlineNode () .getLoadState () .removeInterest ("reconnect", this);

      if (this [_destinationNode] instanceof X3DImportedNode)
         this [_destinationNode] .getInlineNode () .getLoadState () .removeInterest ("reconnect", this);

      this [_executionContext] .deleteRoute (this);

      X3DObject .prototype .dispose .call (this);
   }
});

for (const key of Object .keys (X3DRoute .prototype))
   Object .defineProperty (X3DRoute .prototype, key, { enumerable: false });

Object .defineProperties (X3DRoute .prototype,
{
   sourceNode:
   {
      get ()
      {
         if (this [_sourceNode] instanceof X3DNode)
            return SFNodeCache .get (this [_sourceNode]);

         return this [_sourceNode];
      },
      enumerable: true,
   },
   sourceField:
   {
      get: X3DRoute .prototype .getSourceField,
      enumerable: true,
   },
   destinationNode:
   {
      get ()
      {
         if (this [_destinationNode] instanceof X3DNode)
            return SFNodeCache .get (this [_destinationNode]);

         return this [_destinationNode];
      },
      enumerable: true,
   },
   destinationField:
   {
      get: X3DRoute .prototype .getDestinationField,
      enumerable: true,
   },
});

Object .defineProperties (X3DRoute,
{
   typeName:
   {
      value: "X3DRoute",
      enumerable: true,
   },
});

Object .assign (X3DRoute,
{
   getRouteId (sourceNode, sourceFieldName, destinationNode, destinationFieldName)
   {
      const sourceField = sourceNode instanceof X3DNode
         ? sourceNode .getField (sourceFieldName)
         : $.try (() => sourceNode .getExportedNode () .getField (sourceFieldName));

      const destinationField = destinationNode instanceof X3DNode
         ? destinationNode .getField (destinationFieldName)
         : $.try (() => destinationNode .getExportedNode () .getField (destinationFieldName));

      if (sourceField)
      {
         sourceFieldName = sourceField .getName ();

         if (sourceField .getAccessType () === X3DConstants .inputOutput)
            sourceFieldName += "_changed";
      }

      if (destinationField)
      {
         destinationFieldName = destinationField .getName ();

         if (destinationField .getAccessType () === X3DConstants .inputOutput)
            destinationFieldName = "set_" + destinationFieldName;
      }

      return `${sourceNode .getId ()}.${sourceFieldName}.${destinationNode .getId ()}.${destinationFieldName}`;
   },
});

export default X3DRoute;

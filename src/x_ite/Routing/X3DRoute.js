import X3DObject               from "../Base/X3DObject.js";
import X3DConstants            from "../Base/X3DConstants.js";
import SFNodeCache             from "../Fields/SFNodeCache.js";
import X3DImportedNodeInstance from "../Components/Core/X3DImportedNodeInstance.js";

const
   _executionContext     = Symbol (),
   _sourceNode           = Symbol (),
   _sourceFieldName      = Symbol (),
   _sourceField          = Symbol (),
   _destinationNode      = Symbol (),
   _destinationFieldName = Symbol (),
   _destinationField     = Symbol ();

function X3DRoute (executionContext, sourceNode, sourceFieldName, destinationNode, destinationFieldName)
{
   X3DObject .call (this, executionContext);

   this [_executionContext]     = executionContext;
   this [_sourceNode]           = sourceNode;
   this [_sourceFieldName]      = sourceFieldName;
   this [_destinationNode]      = destinationNode;
   this [_destinationFieldName] = destinationFieldName;

   if (sourceNode instanceof X3DImportedNodeInstance)
      sourceNode .getImportedNode () .getInlineNode () ._loadState .addInterest ("reconnect", this);

   if (destinationNode instanceof X3DImportedNodeInstance)
      destinationNode .getImportedNode () .getInlineNode () ._loadState .addInterest ("reconnect", this);

   this .reconnect ();
}

Object .assign (Object .setPrototypeOf (X3DRoute .prototype, X3DObject .prototype),
{
   getExecutionContext ()
   {
      return this [_executionContext];
   },
   getSourceNode ()
   {
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
         if ((!(this [_sourceNode] instanceof X3DImportedNodeInstance) ||
              this [_sourceNode] .getImportedNode () .getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE) &&
             (!(this [_destinationNode] instanceof X3DImportedNodeInstance) ||
              this [_destinationNode] .getImportedNode () .getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE))
         {
            console .warn (error);
         }
      }
   },
   connect ()
   {
      const errors = [ ];

      try
      {
         this [_sourceField] = this [_sourceNode] .getField (this [_sourceFieldName]);
      }
      catch (error)
      {
         errors .push (error);
      }

      try
      {
         this [_destinationField] = this [_destinationNode] .getField (this [_destinationFieldName]);
      }
      catch (error)
      {
         errors .push (error);
      }

      if (this [_sourceField] && this [_destinationField])
      {
         X3DRoute .checkFields (this [_sourceField], this [_destinationField]);

         this [_sourceField]      .addOutputRoute (this);
         this [_destinationField] .addInputRoute (this);
         this [_sourceField]      .addFieldInterest (this [_destinationField]);
      }
      else
      {
         throw new AggregateError (errors, "Couldn't connect route.");
      }
   },
   disconnect ()
   {
      this [_sourceField]      ?.removeOutputRoute (this);
      this [_destinationField] ?.removeInputRoute (this);

      if (this [_destinationField])
         this [_sourceField] ?.removeFieldInterest (this [_destinationField]);

      this [_sourceField]      = null;
      this [_destinationField] = null;
   },
   toVRMLStream (generator)
   {
      if (!generator .ExistsRouteNode (this [_sourceNode]))
         throw new Error (`Source node does not exist in scene graph.`);

      if (!generator .ExistsRouteNode (this [_destinationNode]))
         throw new Error (`Destination node does not exist in scene graph.`);

      const sourceNodeName = this [_sourceNode] instanceof X3DImportedNodeInstance
         ? generator .ImportedName (this [_sourceNode])
         : generator .Name (this [_sourceNode]);

      const destinationNodeName = this [_destinationNode] instanceof X3DImportedNodeInstance
         ? generator .ImportedName (this [_destinationNode])
         : generator .Name (this [_destinationNode]);

      generator .Indent ();
      generator .string += "ROUTE";
      generator .Space ();
      generator .string += sourceNodeName;
      generator .string += ".";
      generator .string += this .getSourceField ();
      generator .Space ();
      generator .string += "TO";
      generator .Space ();
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

      const sourceNodeName = this [_sourceNode] instanceof X3DImportedNodeInstance
         ? generator .ImportedName (this [_sourceNode])
         : generator .Name (this [_sourceNode]);

      const destinationNodeName = this [_destinationNode] instanceof X3DImportedNodeInstance
         ? generator .ImportedName (this [_destinationNode])
         : generator .Name (this [_destinationNode]);

      generator .openTag ("ROUTE");
      generator .attribute ("fromNode",  sourceNodeName);
      generator .attribute ("fromField", this .getSourceField ());
      generator .attribute ("toNode",    destinationNodeName);
      generator .attribute ("toField",   this .getDestinationField ());
      generator .closeTag ("ROUTE");
   },
   toJSONStream (generator)
   {
      if (!generator .ExistsRouteNode (this [_sourceNode]))
         throw new Error (`Source node does not exist in scene graph.`);

      if (!generator .ExistsRouteNode (this [_destinationNode]))
         throw new Error (`Destination node does not exist in scene graph.`);

      const sourceNodeName = this [_sourceNode] instanceof X3DImportedNodeInstance
         ? generator .ImportedName (this [_sourceNode])
         : generator .Name (this [_sourceNode]);

      const destinationNodeName = this [_destinationNode] instanceof X3DImportedNodeInstance
         ? generator .ImportedName (this [_destinationNode])
         : generator .Name (this [_destinationNode]);

      generator .TidyBreak ();
      generator .Indent ();

      generator .beginObject ("ROUTE", false, true);

      generator .stringProperty ("@fromNode",  sourceNodeName, false);
      generator .stringProperty ("@fromField", this .getSourceField ());
      generator .stringProperty ("@toNode",    destinationNodeName);
      generator .stringProperty ("@toField",   this .getDestinationField ());

      generator .endObject ();
      generator .endObject ();
   },
   dispose ()
   {
      this .disconnect ();

      if (this [_sourceNode] instanceof X3DImportedNodeInstance)
         this [_sourceNode] .getImportedNode () .getInlineNode () ._loadState .removeInterest ("reconnect", this);

      if (this [_destinationNode] instanceof X3DImportedNodeInstance)
         this [_destinationNode] .getImportedNode () .getInlineNode () ._loadState .removeInterest ("reconnect", this);

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
         return SFNodeCache .get (this .getSourceNode ());
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
         return SFNodeCache .get (this .getDestinationNode ());
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
   checkFields (sourceField, destinationField)
   {
      if (sourceField && destinationField)
      {
         if (sourceField .getType () !== destinationField .getType ())
            throw new Error (`Bad ROUTE specification: source field type must match destination field type of fields named "${sourceField .getName ()}" and "${destinationField .getName ()}".`);
      }

      if (sourceField)
      {
         if (!sourceField .isOutput ())
            throw new Error (`Bad ROUTE specification: source field "${sourceField .getName ()}" must be an output.`);
      }

      if (destinationField)
      {
         if (!destinationField .isInput ())
            throw new Error (`Bad ROUTE specification: destination field "${destinationField .getName ()}" must be an input.`);
      }
   },
});

export default X3DRoute;

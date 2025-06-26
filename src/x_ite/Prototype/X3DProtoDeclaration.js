import Fields                  from "../Fields.js";
import X3DFieldDefinition      from "../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../Base/FieldDefinitionArray.js";
import X3DExecutionContext     from "../Execution/X3DExecutionContext.js";
import X3DProtoDeclarationNode from "./X3DProtoDeclarationNode.js";
import X3DConstants            from "../Base/X3DConstants.js";

const
   _body = Symbol ();

function X3DProtoDeclaration (executionContext)
{
   X3DProtoDeclarationNode .call (this, executionContext);

   this .addType (X3DConstants .X3DProtoDeclaration)

   this [_body] = new X3DExecutionContext (executionContext, this);
   this [_body] .setLive (false);
   this .setLive (false);
}

Object .assign (Object .setPrototypeOf (X3DProtoDeclaration .prototype, X3DProtoDeclarationNode .prototype),
{
   initialize ()
   {
      X3DProtoDeclarationNode .prototype .initialize .call (this);

      this [_body] .setup ();
   },
   getProtoDeclaration ()
   {
      return this;
   },
   getBody ()
   {
      return this [_body];
   },
   canUserDefinedFields ()
   {
      return true;
   },
   getCloneCount ()
   {
      return X3DProtoDeclarationNode .prototype .collectCloneCount .call (this);
   },
   collectCloneCount ()
   {
      return 1;
   },
   toVRMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "PROTO";
      generator .string += generator .Space ();
      generator .string += this .getName ();
      generator .string += generator .TidySpace ();
      generator .string += "[";

      generator .EnterScope ();

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length === 0)
      {
         generator .string += generator .TidySpace ();
      }
      else
      {
         let
            fieldTypeLength  = 0,
            accessTypeLength = 0;

         for (const field of userDefinedFields)
         {
            fieldTypeLength  = Math .max (fieldTypeLength, field .getTypeName () .length);
            accessTypeLength = Math .max (accessTypeLength, generator .AccessType (field .getAccessType ()) .length);
         }

         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         const last = userDefinedFields .at (-1);

         for (const field of userDefinedFields)
         {
            this .toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength);

            if (field === last)
               generator .string += generator .TidyBreak ();
            else
               generator .string += generator .Break ();
         }

         generator .DecIndent ();

         generator .string += generator .Indent ();
      }

      generator .LeaveScope ();

      generator .string += "]";
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += "{";
      generator .string += generator .TidyBreak ();

      generator .IncIndent ();

      this [_body] .toVRMLStream (generator);

      generator .DecIndent ();

      generator .string += generator .Indent ();
      generator .string += "}";
   },
   toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength)
   {
      generator .string += generator .Indent ();
      generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, generator .TidySpace ());
      generator .string += generator .Space ();
      generator .string += field .getTypeName () .padEnd (fieldTypeLength, generator .TidySpace ());
      generator .string += generator .Space ();
      generator .string += field .getName ();

      if (!field .isInitializable ())
         return;

      generator .string += generator .Space ();

      field .toVRMLStream (generator);
   },
   toXMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "<ProtoDeclare";
      generator .string += generator .Space ();
      generator .string += "name='";
      generator .string += generator .XMLEncode (this .getName ());
      generator .string += "'";
      generator .string += ">";
      generator .string += generator .TidyBreak ();

      // <ProtoInterface>

      generator .EnterScope ();

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length !== 0)
      {
         generator .IncIndent ();

         generator .string += generator .Indent ();
         generator .string += "<ProtoInterface>";
         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         for (const field of userDefinedFields)
         {
            generator .string += generator .Indent ();
            generator .string += "<field";
            generator .string += generator .Space ();
            generator .string += "accessType='";
            generator .string += generator .AccessType (field .getAccessType ());
            generator .string += "'";
            generator .string += generator .Space ();
            generator .string += "type='";
            generator .string += field .getTypeName ();
            generator .string += "'";
            generator .string += generator .Space ();
            generator .string += "name='";
            generator .string += generator .XMLEncode (field .getName ());
            generator .string += "'";

            if (field .isDefaultValue () || !field .isInitializable ())
            {
               generator .string += generator .closingTags ? "></field>" : "/>";
               generator .string += generator .TidyBreak ();
            }
            else
            {
               switch (field .getType ())
               {
                  case X3DConstants .SFNode:
                  case X3DConstants .MFNode:
                  {
                     generator .PushContainerField (field);

                     generator .string += ">";
                     generator .string += generator .TidyBreak ();

                     generator .IncIndent ();

                     field .toXMLStream (generator);

                     generator .string += generator .TidyBreak ();

                     generator .DecIndent ();

                     generator .string += generator .Indent ();
                     generator .string += "</field>";
                     generator .string += generator .TidyBreak ();

                     generator .PopContainerField ();
                     break;
                  }
                  default:
                  {
                     generator .string += generator .Space ();
                     generator .string += "value='";

                     field .toXMLStream (generator);

                     generator .string += "'";
                     generator .string += generator .closingTags ? "></field>" : "/>";
                     generator .string += generator .TidyBreak ();
                     break;
                  }
               }
            }
         }

         generator .DecIndent ();

         generator .string += generator .Indent ();
         generator .string += "</ProtoInterface>";
         generator .string += generator .TidyBreak ();

         generator .DecIndent ();
      }

      generator .LeaveScope ();

      // </ProtoInterface>

      // <ProtoBody>

      generator .IncIndent ();

      generator .string += generator .Indent ();
      generator .string += "<ProtoBody>";
      generator .string += generator .TidyBreak ();

      generator .IncIndent ();

      this [_body] .toXMLStream (generator);

      generator .DecIndent ();

      generator .string += generator .Indent ();
      generator .string += "</ProtoBody>";
      generator .string += generator .TidyBreak ();

      generator .DecIndent ();

      // </ProtoBody>

      generator .string += generator .Indent ();
      generator .string += "</ProtoDeclare>";
   },
   toJSONStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "ProtoDeclare";
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
      generator .string += "@name";
      generator .string += '"';
      generator .string += ':';
      generator .string += '"';
      generator .string += generator .JSONEncode (this .getName ());
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "ProtoInterface";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();


      // Fields

      generator .EnterScope ();

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length)
      {
         generator .string += generator .Indent ();
         generator .string += '"';
         generator .string += "field";
         generator .string += '"';
         generator .string += ':';
         generator .string += generator .TidySpace ();
         generator .string += '[';
         generator .string += generator .TidyBreak ();
         generator .string += generator .IncIndent ();

         for (const field of userDefinedFields)
         {
            generator .string += generator .Indent ();
            generator .string += '{';
            generator .string += generator .TidyBreak ();
            generator .string += generator .IncIndent ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@accessType";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += generator .AccessType (field .getAccessType ());
            generator .string += '"';
            generator .string += ',';
            generator .string += generator .TidyBreak ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@type";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += field .getTypeName ();
            generator .string += '"';
            generator .string += ',';
            generator .string += generator .TidyBreak ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@name";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += generator .JSONEncode (field .getName ());
            generator .string += '"';

            if (field .isDefaultValue () || !field .isInitializable ())
            {
               generator .string += generator .TidyBreak ();
            }
            else
            {
               generator .string += ',';
               generator .string += generator .TidyBreak ();

               // Output value

               switch (field .getType ())
               {
                  case X3DConstants .SFNode:
                  {
                     generator .string += generator .Indent ();
                     generator .string += '"';
                     generator .string += "-children";
                     generator .string += '"';
                     generator .string += ':';
                     generator .string += generator .TidySpace ();
                     generator .string += '[';
                     generator .string += generator .TidyBreak ();
                     generator .string += generator .IncIndent ();
                     generator .string += generator .Indent ();

                     field .toJSONStream (generator);

                     generator .string += generator .TidyBreak ();
                     generator .string += generator .DecIndent ();
                     generator .string += generator .Indent ();
                     generator .string += ']';
                     generator .string += generator .TidyBreak ();
                     break;
                  }
                  case X3DConstants .MFNode:
                  {
                     generator .string += generator .Indent ();
                     generator .string += '"';
                     generator .string += "-children";
                     generator .string += '"';
                     generator .string += ':';
                     generator .string += generator .TidySpace ();

                     field .toJSONStream (generator);

                     generator .string += generator .TidyBreak ();
                     break;
                  }
                  default:
                  {
                     generator .string += generator .Indent ();
                     generator .string += '"';
                     generator .string += "@value";
                     generator .string += '"';
                     generator .string += ':';
                     generator .string += generator .TidySpace ();

                     field .toJSONStream (generator);

                     generator .string += generator .TidyBreak ();
                     break;
                  }
               }
            }

            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += '}';

            if (field !== userDefinedFields .at (-1))
               generator .string += ',';

            generator .string += generator .TidyBreak ();
         }

         generator .string += generator .DecIndent ();
         generator .string += generator .Indent ();
         generator .string += ']';
      }

      generator .string += generator .DecIndent ();
      generator .string += generator .TidyBreak ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .LeaveScope ();


      // ProtoBody

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "ProtoBody";
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

      this [_body] .toJSONStream (generator);

      generator .JSONRemoveComma ();

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += ']';
      generator .string += generator .TidyBreak ();

      // End

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
});

for (const key of Object .keys (X3DProtoDeclaration .prototype))
   Object .defineProperty (X3DProtoDeclaration .prototype, key, { enumerable: false });

Object .defineProperties (X3DProtoDeclaration .prototype,
{
   name:
   {
      get: X3DProtoDeclaration .prototype .getName,
      enumerable: true,
   },
   fields:
   {
      get: X3DProtoDeclaration .prototype .getFieldDefinitions,
      enumerable: true,
   },
   isExternProto:
   {
      value: false,
      enumerable: true,
   },
});

Object .defineProperties (X3DProtoDeclaration,
{
   typeName:
   {
      value: "X3DProtoDeclaration",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

X3DConstants .addConstant (X3DProtoDeclaration .typeName);

export default X3DProtoDeclaration;

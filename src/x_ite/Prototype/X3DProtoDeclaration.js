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
      generator .openTag ("ProtoDeclare");
      generator .attribute ("name", this .getName ());

      if (this .getAppInfo ())
         generator .attribute ("appinfo", this .getAppInfo ());

      if (this .getDocumentation ())
         generator .attribute ("documentation", this .getDocumentation ());

      generator .endTag ();

      // <ProtoInterface>

      generator .EnterScope ();

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length !== 0)
      {
         generator .IncIndent ();
         generator .openingTag ("ProtoInterface");
         generator .AddTidyBreak ();
         generator .IncIndent ();

         for (const field of userDefinedFields)
         {
            generator .openTag ("field");
            generator .attribute ("accessType", generator .AccessType (field .getAccessType ()));
            generator .attribute ("type",       field .getTypeName ());
            generator .attribute ("name",       field .getName ());

            if (field .isDefaultValue () || !field .isInitializable ())
            {
               if (field .getAppInfo ())
                  generator .attribute ("appinfo", field .getAppInfo ());

               if (field .getDocumentation ())
                  generator .attribute ("documentation", field .getDocumentation ());

               generator .closeTag ("field");
               generator .AddTidyBreak ();
            }
            else
            {
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

                     generator .AddTidyBreak ();
                     generator .DecIndent ();
                     generator .closingTag ("field");
                     generator .AddTidyBreak ();
                     generator .PopContainerField ();
                     break;
                  }
                  default:
                  {
                     generator .string += generator .Space ();
                     generator .string += "value='";

                     field .toXMLStream (generator);

                     generator .string += "'";

                     if (field .getAppInfo ())
                        generator .attribute ("appinfo", field .getAppInfo ());

                     if (field .getDocumentation ())
                        generator .attribute ("documentation", field .getDocumentation ());

                     generator .closeTag ("field");
                     generator .AddTidyBreak ();
                     break;
                  }
               }
            }
         }

         generator .DecIndent ();
         generator .closingTag ("ProtoInterface");
         generator .AddTidyBreak ();
         generator .DecIndent ();
      }

      generator .LeaveScope ();

      // </ProtoInterface>

      // <ProtoBody>

      generator .IncIndent ();
      generator .openingTag ("ProtoBody");
      generator .AddTidyBreak ();
      generator .IncIndent ();

      this [_body] .toXMLStream (generator);

      generator .DecIndent ();
      generator .closingTag ("ProtoBody");
      generator .AddTidyBreak ();
      generator .DecIndent ();

      // </ProtoBody>

      generator .closingTag ("ProtoDeclare");
   },
   toJSONStream (generator)
   {
      generator .string += generator .TidyBreak ();
      generator .string += generator .Indent ();

      generator .beginObject ("ProtoDeclare", false, true);

      generator .stringProperty ("@name",          this .getName (), false);
      generator .stringProperty ("@appinfo",       this .getAppInfo ());
      generator .stringProperty ("@documentation", this .getDocumentation ());

      // Fields

      generator .EnterScope ();
      generator .beginObject ("ProtoInterface");

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length)
      {
         generator .beginArray ("field", false);

         for (const field of userDefinedFields)
         {
            generator .beginObject ("", field !== userDefinedFields [0]);
            generator .stringProperty ("@accessType", generator .AccessType (field .getAccessType ()), false);
            generator .stringProperty ("@type",       field .getTypeName ());
            generator .stringProperty ("@name",       field .getName ());

            if (!field .isDefaultValue () && field .isInitializable ())
            {
               // Output value

               switch (field .getType ())
               {
                  case X3DConstants .SFNode:
                  {
                     generator .beginArray ("-children");

                     generator .string += generator .TidyBreak ();
                     generator .string += generator .Indent ();

                     field .toJSONStream (generator);

                     generator .endArray ();
                     break;
                  }
                  case X3DConstants .MFNode:
                  {
                     generator .beginValue ("-children", true);

                     field .toJSONStream (generator);
                     break;
                  }
                  default:
                  {
                     generator .beginValue ("@value", true);

                     field .toJSONStream (generator);
                     break;
                  }
               }
            }

            generator .stringProperty ("@appinfo",       field .getAppInfo ());
            generator .stringProperty ("@documentation", field .getDocumentation ());
            generator .endObject ();
         }

         generator .endArray ();
      }

      generator .endObject ();
      generator .LeaveScope ();

      // ProtoBody

      generator .beginObject ("ProtoBody");
      generator .beginArray ("-children", false);

      this [_body] .toJSONStream (generator);

      generator .endArray ();
      generator .endObject ();

      // End

      generator .endObject ();
      generator .endObject ();
   },
});

for (const key of Object .keys (X3DProtoDeclaration .prototype))
   Object .defineProperty (X3DProtoDeclaration .prototype, key, { enumerable: false });

Object .defineProperties (X3DProtoDeclaration .prototype,
{
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

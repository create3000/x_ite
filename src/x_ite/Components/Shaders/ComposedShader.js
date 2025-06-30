import Fields                      from "../../Fields.js";
import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DNode                     from "../Core/X3DNode.js";
import X3DShaderNode               from "./X3DShaderNode.js";
import X3DProgrammableShaderObject from "./X3DProgrammableShaderObject.js";
import LoadSensor                  from "../Networking/LoadSensor.js";
import X3DCast                     from "../../Base/X3DCast.js";
import X3DConstants                from "../../Base/X3DConstants.js";

function ComposedShader (executionContext)
{
   X3DShaderNode               .call (this, executionContext);
   X3DProgrammableShaderObject .call (this, executionContext);

   this .addType (X3DConstants .ComposedShader);

   this .loadSensor                = new LoadSensor (executionContext);
   this .transformFeedbackVaryings = [ ];
}

Object .assign (Object .setPrototypeOf (ComposedShader .prototype, X3DShaderNode .prototype),
   X3DProgrammableShaderObject .prototype,
{
   wireframe: false,
   initialize ()
   {
      X3DShaderNode               .prototype .initialize .call (this);
      X3DProgrammableShaderObject .prototype .initialize .call (this);

      // https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/shaders_glsl.html#relinkingprograms
      this ._activate .addInterest ("set_activate__", this);
      this ._language .addInterest ("set_loaded__",   this);

      this ._parts .addFieldInterest (this .loadSensor ._children);

      this .loadSensor ._isLoaded .addInterest ("connectLoaded", this);
      this .loadSensor ._children = this ._parts;
      this .loadSensor .setPrivate (true);
      this .loadSensor .setup ();

      if (this .loadSensor ._isLoaded .getValue ())
         this .set_loaded__ ();
      else
         this .connectLoaded ();
   },
   connectLoaded ()
   {
      this .loadSensor ._isLoaded .removeInterest ("connectLoaded", this);
      this .loadSensor ._isLoaded .addInterest ("set_loaded__", this);
   },
   addUserDefinedField (accessType, name, field)
   {
      const shaderFields = this .isInitialized () && this .isValid ();

      if (shaderFields)
         this .removeShaderFields ();

      X3DShaderNode .prototype .addUserDefinedField .call (this, accessType, name, field);

      if (shaderFields)
         this .addShaderFields ();
   },
   removeUserDefinedField (name)
   {
      const shaderFields = this .isInitialized () && this .isValid ();

      if (shaderFields)
         this .removeShaderFields ();

      X3DShaderNode .prototype .removeUserDefinedField .call (this, name);

      if (shaderFields)
         this .addShaderFields ();
   },
   setTransformFeedbackVaryings (value)
   {
      this .transformFeedbackVaryings = value;
   },
   getProgram ()
   {
      return this .program;
   },
   set_activate__ ()
   {
      if (!this ._activate .getValue ())
         return;

      this .set_loaded__ ();
   },
   set_loaded__ ()
   {
      if (this .loadSensor ._isLoaded .getValue () && this ._language .getValue () === "GLSL")
      {
         const
            gl      = this .getBrowser () .getContext (),
            program = gl .createProgram ();

         if (this .isValid ())
            this .removeShaderFields ();

         gl .deleteProgram (this .program);

         this .program = program;

         for (const node of this ._parts)
         {
            const partNode = X3DCast (X3DConstants .ShaderPart, node);

            if (partNode ?.getShader ())
               gl .attachShader (program, partNode .getShader ());
         }

         if (this .transformFeedbackVaryings .length)
            gl .transformFeedbackVaryings (program, this .transformFeedbackVaryings, gl .INTERLEAVED_ATTRIBS);

         gl .linkProgram (program);

         if (gl .getProgramParameter (program, gl .LINK_STATUS))
         {
            this .setValid (true);
            this .getDefaultUniformsAndAttributes ();
            this .addShaderFields ();
         }
         else
         {
            this .setValid (false);

            if (this ._parts .length)
            {
               console .warn (`Couldn't initialize ${this .getTypeName ()} '${this .getName ()}': ${gl .getProgramInfoLog (program)}`);
            }
         }
      }
      else
      {
         this .setValid (false);
      }
   },
   dispose ()
   {
      X3DProgrammableShaderObject .prototype .dispose .call (this);
      X3DShaderNode               .prototype .dispose .call (this);
   },
});

Object .defineProperties (ComposedShader,
{
   ... X3DNode .getStaticProperties ("ComposedShader", "Shaders", 1, "shaders", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "activate",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isSelected", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isValid",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "language",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "parts",      new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ComposedShader;

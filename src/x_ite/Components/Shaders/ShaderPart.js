import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import ShaderSource         from "../../Browser/Shaders/ShaderSource.js";
import ShaderCompiler       from "../../Browser/Shaders/ShaderCompiler.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import FileLoader           from "../../InputOutput/FileLoader.js";
import X3DConstants         from "../../Base/X3DConstants.js";

const customOptions = [
   "X3D_GEOMETRY_0D",
   "X3D_GEOMETRY_1D",
   "X3D_GEOMETRY_2D",
   "X3D_GEOMETRY_3D",
   "X3D_FOG",
   "X3D_STYLE_PROPERTIES",
   "X3D_UNLIT_MATERIAL",
   "X3D_PHONG_MATERIAL",
   "X3D_LIGHTING",
   "X3D_TEXTURE",
   "X3D_MULTI_TEXTURING",
];

function ShaderPart (executionContext)
{
   X3DNode      .call (this, executionContext);
   X3DUrlObject .call (this, executionContext);

   this .addType (X3DConstants .ShaderPart);
}

Object .assign (Object .setPrototypeOf (ShaderPart .prototype, X3DNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DNode      .prototype .initialize .call (this);
      X3DUrlObject .prototype .initialize .call (this);

      this .options ??= customOptions .slice ();

      this ._type .addInterest ("set_type__", this);

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   set_type__ ()
   {
      this .setLoadState (X3DConstants .NOT_STARTED_STATE);

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   getSourceText ()
   {
      return this ._url;
   },
   getOptions ()
   {
      return this .options;
   },
   setOptions (value)
   {
      this .options = value;
   },
   getShader ()
   {
      return this .shader;
   },
   getShaderType: (() =>
   {
      const shaderTypes = new Map ([
         ["VERTEX",          "VERTEX_SHADER"],
         ["TESS_CONTROL",    "TESS_CONTROL_SHADER"],
         ["TESS_EVALUATION", "TESS_EVALUATION_SHADER"],
         ["GEOMETRY",        "GEOMETRY_SHADER"],
         ["FRAGMENT",        "FRAGMENT_SHADER"],
         ["COMPUTE",         "COMPUTE_SHADER"],
      ]);

      return function ()
      {
         return shaderTypes .get (this ._type .getValue ()) || "VERTEX_SHADER";
      };
   })(),
   unloadData ()
   {
      this .valid = false;
   },
   loadData ()
   {
      new FileLoader (this) .loadDocument (this ._url,
      function (data, url)
      {
         if (data === null)
         {
            // No URL could be loaded.
            this .setLoadState (X3DConstants .FAILED_STATE);
         }
         else
         {
            const
               browser        = this .getBrowser (),
               gl             = browser .getContext (),
               type           = this .getShaderType (),
               options        = ["X3D_" + type] .concat (this .options),
               shaderCompiler = new ShaderCompiler (gl),
               source         = ShaderSource .getSource (gl, browser, shaderCompiler .process ($.decodeText (data)), options),
               shader         = gl .createShader (gl [type]);

            gl .deleteShader (this .shader);

            this .shader = shader;

            gl .shaderSource (shader, source);
            gl .compileShader (shader);

            if (!gl .getShaderParameter (shader, gl .COMPILE_STATUS))
            {
               const
                  typeName = this .getTypeName (),
                  name     = this .getName (),
                  log      = gl .getShaderInfoLog (shader),
                  match    = log .match (/(\d+):(\d+)/);

               if (match)
               {
                  const fileName = shaderCompiler .getSourceFileName (match [1]) || url || this .getExecutionContext () .getWorldURL ();

                  throw new Error ("Error in " + typeName + " '" + name + "' in URL '" + fileName + "', line " + match [2] + ", " + log);
               }
               else
               {
                  const fileName = url || this .getExecutionContext () .getWorldURL ();

                  throw new Error ("Error in " + typeName + " '" + name + "' in URL '" + fileName + "', " + log);
               }
            }

            this .setLoadState (X3DConstants .COMPLETE_STATE);
         }
      }
      .bind (this));
   },
   dispose ()
   {
      X3DUrlObject .prototype .dispose .call (this);
      X3DNode      .prototype .dispose .call (this);
   },
});

Object .defineProperties (ShaderPart,
{
   ... X3DNode .getStaticProperties ("ShaderPart", "Shaders", 1, "parts", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "type",                 new Fields .SFString ("VERTEX")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
      ]),
      enumerable: true,
   },
});

export default ShaderPart;

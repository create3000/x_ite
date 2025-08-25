import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DVolumeDataNode    from "./X3DVolumeDataNode.js";
import ComposedShader       from "../Shaders/ComposedShader.js";
import ShaderPart           from "../Shaders/ShaderPart.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";

function VolumeData (executionContext)
{
   X3DVolumeDataNode .call (this, executionContext);

   this .addType (X3DConstants .VolumeData);
}

Object .assign (Object .setPrototypeOf (VolumeData .prototype, X3DVolumeDataNode .prototype),
{
   initialize ()
   {
      X3DVolumeDataNode .prototype .initialize .call (this);

      this ._renderStyle .addInterest ("set_renderStyle__", this);
      this ._voxels      .addInterest ("set_voxels__",      this);
      this ._renderStyle .addInterest ("updateShader",      this);

      this .set_renderStyle__ ();
      this .set_voxels__ ();

      this .updateShader ();
   },
   set_renderStyle__ ()
   {
      if (this .renderStyleNode)
      {
         this .renderStyleNode .removeInterest ("updateShader", this);
         this .renderStyleNode .removeVolumeData (this);
      }

      this .renderStyleNode = X3DCast (X3DConstants .X3DVolumeRenderStyleNode, this ._renderStyle);

      if (this .renderStyleNode)
      {
         this .renderStyleNode .addInterest ("updateShader", this);
         this .renderStyleNode .addVolumeData (this);
      }
   },
   set_voxels__ ()
   {
      this .voxelsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._voxels);

      if (this .voxelsNode)
         this .getAppearance () ._texture = this ._voxels;
      else
         this .getAppearance () ._texture = this .getBrowser () .getDefaultVoxels ();
   },
   createShader (options, vs, fs)
   {
      // if (DEVELOPMENT)
      //    console .log ("Creating VolumeData Shader ...");

      const
         opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
         styleDefines          = new Set ();

      opacityMapVolumeStyle .getDefines (styleDefines);

      let
         styleUniforms  = opacityMapVolumeStyle .getUniformsText (),
         styleFunctions = opacityMapVolumeStyle .getFunctionsText ();

      if (this .renderStyleNode)
      {
         this .renderStyleNode .getDefines (styleDefines);

         styleUniforms  += this .renderStyleNode .getUniformsText (),
         styleFunctions += this .renderStyleNode .getFunctionsText ();
      }

      fs = fs
         .replace ("__VOLUME_STYLES_DEFINES__",   Array .from (styleDefines) .join ("\n"))
         .replace ("__VOLUME_STYLES_UNIFORMS__",  styleUniforms)
         .replace ("__VOLUME_STYLES_FUNCTIONS__", styleFunctions);

      // this .getBrowser () .print (fs);

      const vertexShader = new ShaderPart (this .getExecutionContext ());
      vertexShader ._url .push (encodeURI ("data:x-shader/x-vertex," + vs));
      vertexShader .setPrivate (true);
      vertexShader .setName ("VolumeDataVertexShader");
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new ShaderPart (this .getExecutionContext ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI ("data:x-shader/x-fragment," + fs));
      fragmentShader .setPrivate (true);
      fragmentShader .setName ("VolumeDataFragmentShader");
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new ComposedShader (this .getExecutionContext ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);
      shaderNode .setPrivate (true);
      shaderNode .setName ("VolumeDataShader");

      opacityMapVolumeStyle .addShaderFields (shaderNode);

      this .renderStyleNode ?.addShaderFields (shaderNode);

      const uniformNames = [ ];

      this .addShaderUniformNames (uniformNames);

      shaderNode .setUniformNames (uniformNames);
      shaderNode .setup ();

      return shaderNode;
   },
});

Object .defineProperties (VolumeData,
{
   ... X3DNode .getStaticProperties ("VolumeData", "VolumeRendering", 1, "children", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",  new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",      new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default VolumeData;

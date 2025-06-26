import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DVolumeDataNode    from "./X3DVolumeDataNode.js";
import ComposedShader       from "../Shaders/ComposedShader.js";
import ShaderPart           from "../Shaders/ShaderPart.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";

function SegmentedVolumeData (executionContext)
{
   X3DVolumeDataNode .call (this, executionContext);

   this .addType (X3DConstants .SegmentedVolumeData);

   this .renderStyleNodes = [ ];
}

Object .assign (Object .setPrototypeOf (SegmentedVolumeData .prototype, X3DVolumeDataNode .prototype),
{
   initialize ()
   {
      X3DVolumeDataNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._segmentIdentifiers .addInterest ("set_segmentIdentifiers__", this);
      this ._renderStyle        .addInterest ("set_renderStyle__",        this);

      this ._segmentEnabled     .addInterest ("updateShader", this);
      this ._segmentIdentifiers .addInterest ("updateShader", this);
      this ._renderStyle        .addInterest ("updateShader", this);

      this .set_segmentIdentifiers__ ();
      this .set_renderStyle__ ();
      this .set_voxels__ ();

      this .updateShader ();
   },
   getSegmentEnabled (index)
   {
      return index < this ._segmentEnabled .length ? this ._segmentEnabled [index] : true;
   },
   set_segmentIdentifiers__ ()
   {
      this .segmentIdentifiersNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._segmentIdentifiers);
   },
   set_renderStyle__ ()
   {
      const renderStyleNodes = this .renderStyleNodes;

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .removeInterest ("updateShader", this);
         renderStyleNode .removeVolumeData (this);
      }

      renderStyleNodes .length = 0;

      for (const node of this ._renderStyle)
      {
         const renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, node);

         if (renderStyleNode)
            renderStyleNodes .push (renderStyleNode);
      }

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .addInterest ("updateShader", this);
         renderStyleNode .addVolumeData (this);
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
      //    console .log ("Creating SegmentedVolumeData Shader ...");

      const
         opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
         styleDefines          = new Set ();

      let
         styleUniforms  = opacityMapVolumeStyle .getUniformsText (),
         styleFunctions = opacityMapVolumeStyle .getFunctionsText ();

      if (this .segmentIdentifiersNode)
      {
         styleUniforms += "\n";
         styleUniforms += "uniform sampler3D segmentIdentifiers;\n";
         styleUniforms += "\n";

         styleFunctions += "\n";
         styleFunctions += "   int segment = int (texture (segmentIdentifiers, texCoord) .r * 255.0);\n";
      }
      else
      {
         styleFunctions += "   int segment = 0;\n";
      }

      if (this .renderStyleNodes .length)
      {
         styleFunctions += "\n";
         styleFunctions += "   switch (segment)\n";
         styleFunctions += "   {\n";

         for (const [i, renderStyleNode] of this .renderStyleNodes .entries ())
         {
            renderStyleNode .getDefines (styleDefines);

            styleFunctions += "      case " + i + ":\n";
            styleFunctions += "      {\n";

            if (this .getSegmentEnabled (i))
            {
               styleUniforms  += renderStyleNode .getUniformsText (),
               styleFunctions += renderStyleNode .getFunctionsText ();
               styleFunctions += "         break;\n";
            }
            else
            {
               styleFunctions += "         discard;\n";
            }

            styleFunctions += "      }\n";
         }

         styleFunctions += "   }\n";
      }

      fs = fs
         .replace ("__VOLUME_STYLES_DEFINES__",   Array .from (styleDefines) .join ("\n"))
         .replace ("__VOLUME_STYLES_UNIFORMS__",  styleUniforms)
         .replace ("__VOLUME_STYLES_FUNCTIONS__", styleFunctions);

      // if (DEVELOPMENT)
      //    this .getBrowser () .print (fs);

      const vertexShader = new ShaderPart (this .getExecutionContext ());
      vertexShader ._url .push (encodeURI ("data:x-shader/x-vertex," + vs));
      vertexShader .setPrivate (true);
      vertexShader .setName ("SegmentedVolumeDataVertexShader");
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new ShaderPart (this .getExecutionContext ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI ("data:x-shader/x-fragment," + fs));
      fragmentShader .setPrivate (true);
      fragmentShader .setName ("SegmentedVolumeDataFragmentShader");
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new ComposedShader (this .getExecutionContext ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);
      shaderNode .setPrivate (true);
      shaderNode .setName ("SegmentedVolumeDataShader");

      if (this .segmentIdentifiersNode)
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "segmentIdentifiers", new Fields .SFNode (this .segmentIdentifiersNode));

      opacityMapVolumeStyle .addShaderFields (shaderNode);

      for (const [i, renderStyleNode] of this .renderStyleNodes .entries ())
      {
         if (this .getSegmentEnabled (i))
            renderStyleNode .addShaderFields (shaderNode);
      }

      const uniformNames = [ ];

      this .addShaderUniformNames (uniformNames);

      shaderNode .setUniformNames (uniformNames);
      shaderNode .setup ();

      return shaderNode;
   },
});

Object .defineProperties (SegmentedVolumeData,
{
   ... X3DNode .getStaticProperties ("SegmentedVolumeData", "VolumeRendering", 2, "children", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",         new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "segmentEnabled",     new Fields .MFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",           new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "segmentIdentifiers", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle",        new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",             new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default SegmentedVolumeData;

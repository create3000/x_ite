import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DVolumeDataNode    from "./X3DVolumeDataNode.js";
import ComposedShader       from "../Shaders/ComposedShader.js";
import ShaderPart           from "../Shaders/ShaderPart.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";

function IsoSurfaceVolumeData (executionContext)
{
   X3DVolumeDataNode .call (this, executionContext);

   this .addType (X3DConstants .IsoSurfaceVolumeData);

   this .renderStyleNodes = [ ];
}

Object .assign (Object .setPrototypeOf (IsoSurfaceVolumeData .prototype, X3DVolumeDataNode .prototype),
{
   initialize ()
   {
      X3DVolumeDataNode .prototype .initialize .call (this);

      this ._gradients        .addInterest ("set_gradients__",   this);
      this ._renderStyle      .addInterest ("set_renderStyle__", this);

      this ._contourStepSize  .addInterest ("updateShader", this);
      this ._surfaceValues    .addInterest ("updateShader", this);
      this ._surfaceTolerance .addInterest ("updateShader", this);
      this ._renderStyle      .addInterest ("updateShader", this);

      this .set_gradients__ ();
      this .set_renderStyle__ ();
      this .set_voxels__ ();

      this .updateShader ();
   },
   set_gradients__ ()
   {
      this .gradientsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._gradients);
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
      //    console .log ("Creating VolumeData Shader ...");

      const
         opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
         styleDefines          = new Set ();

      opacityMapVolumeStyle .getDefines (styleDefines);

      let
         styleUniforms  = opacityMapVolumeStyle .getUniformsText (),
         styleFunctions = opacityMapVolumeStyle .getFunctionsText ();

      styleUniforms  += "\n";
      styleUniforms  += "uniform float surfaceValues [" + Math .max (this ._surfaceValues .length, 1)+ "];\n";
      styleUniforms  += "uniform float surfaceTolerance;\n";

      for (const renderStyleNode of this .renderStyleNodes)
      {
         renderStyleNode .getDefines (styleDefines);
         styleUniforms  += renderStyleNode .getUniformsText ();
      }

      styleFunctions += "\n";
      styleFunctions += "   // IsoSurfaceVolumeData\n";
      styleFunctions += "\n";

      if (this .gradientsNode)
      {
         styleUniforms += "\n";
         styleUniforms += "uniform sampler3D gradients;\n";

         styleFunctions += "   if (length (texture (gradients, texCoord) .xyz * 2.0 - 1.0) < surfaceTolerance)\n";
         styleFunctions += "      discard;\n";
      }
      else
      {
         styleUniforms += "\n";
         styleUniforms += "vec4\n";
         styleUniforms += "getNormal (in vec3 texCoord)\n";
         styleUniforms += "{\n";
         styleUniforms += "   vec4  offset = vec4 (1.0 / vec3 (textureSize (x3d_Texture3D [0], 0)), 0.0);\n";
         styleUniforms += "   float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
         styleUniforms += "   float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
         styleUniforms += "   float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
         styleUniforms += "   float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
         styleUniforms += "   float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
         styleUniforms += "   float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
         styleUniforms += "   vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
         styleUniforms += "\n";
         styleUniforms += "   return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
         styleUniforms += "}\n";

         styleFunctions += "   if (getNormal (texCoord) .w < surfaceTolerance)\n";
         styleFunctions += "      discard;\n";
      }

      styleFunctions += "\n";
      styleFunctions += "   float intensity = textureColor .r;\n";
      styleFunctions += "\n";

      if (this ._surfaceValues .length === 1)
      {
         const contourStepSize = Math .abs (this ._contourStepSize .getValue ());

         if (contourStepSize === 0)
         {
            styleFunctions += "   if (intensity > surfaceValues [0])\n";
            styleFunctions += "   {\n";
            styleFunctions += "      textureColor = vec4 (vec3 (surfaceValues [0]), 1.0);\n";

            if (this .renderStyleNodes .length)
            {
               styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
            }

            styleFunctions += "   }\n";
            styleFunctions += "   else\n";
            styleFunctions += "   {\n";
            styleFunctions += "      discard;\n";
            styleFunctions += "   }\n";
            styleFunctions += "\n";
         }
         else
         {
            const surfaceValues = [ ];

            for (let v = this ._surfaceValues [0] - contourStepSize; v > 0; v -= contourStepSize)
               surfaceValues .unshift (v);

            surfaceValues .push (this ._surfaceValues [0]);

            for (let v = this ._surfaceValues [0] + contourStepSize; v < 1; v += contourStepSize)
               surfaceValues .push (v);

            styleFunctions += "   if (false)\n";
            styleFunctions += "   { }\n";

            for (let i = this ._surfaceValues .length - 1; i >= 0; -- i)
            {
               styleFunctions += "   else if (intensity > " + surfaceValues [i] + ")\n";
               styleFunctions += "   {\n";
               styleFunctions += "      textureColor = vec4 (vec3 (" + surfaceValues [i] + "), 1.0);\n";

               if (this .renderStyleNodes .length)
               {
                  styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
               }

               styleFunctions += "   }\n";
            }

            styleFunctions += "   else\n";
            styleFunctions += "   {\n";
            styleFunctions += "      discard;\n";
            styleFunctions += "   }\n";
            styleFunctions += "\n";
         }
      }
      else
      {
         styleFunctions += "   if (false)\n";
         styleFunctions += "   { }\n";

         for (let i = this ._surfaceValues .length - 1; i >= 0; -- i)
         {
            styleFunctions += "   else if (intensity > surfaceValues [" + i + "])\n";
            styleFunctions += "   {\n";
            styleFunctions += "      textureColor = vec4 (vec3 (surfaceValues [" + i + "]), 1.0);\n";

            if (this .renderStyleNodes .length)
            {
               const r = Math .min (i, this .renderStyleNodes .length - 1);

               styleFunctions += this .renderStyleNodes [r] .getFunctionsText ();
            }

            styleFunctions += "   }\n";
         }

         styleFunctions += "   else\n";
         styleFunctions += "   {\n";
         styleFunctions += "      discard;\n";
         styleFunctions += "   }\n";
         styleFunctions += "\n";
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

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceValues",    this ._surfaceValues    .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceTolerance", this ._surfaceTolerance .copy ());

      if (this .gradientsNode)
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "gradients", new Fields .SFNode (this .gradientsNode));

      opacityMapVolumeStyle .addShaderFields (shaderNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addShaderFields (shaderNode);

      const uniformNames = [ ];

      this .addShaderUniformNames (uniformNames);

      shaderNode .setUniformNames (uniformNames);
      shaderNode .setup ();

      return shaderNode;
   },
});

Object .defineProperties (IsoSurfaceVolumeData,
{
   ... X3DNode .getStaticProperties ("IsoSurfaceVolumeData", "VolumeRendering", 2, "children", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",       new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "contourStepSize",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceValues",    new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceTolerance", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "gradients",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",           new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default IsoSurfaceVolumeData;

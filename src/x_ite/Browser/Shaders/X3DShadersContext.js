import Shading        from "../Core/Shading.js";
import ShaderRegistry from "./ShaderRegistry.js";
import ComposedShader from "../../Components/Shaders/ComposedShader.js";
import ShaderPart     from "../../Components/Shaders/ShaderPart.js";
import DEVELOPMENT    from "../../DEVELOPMENT.js";

const
   _primitiveModes = Symbol (),
   _shaderNodes    = Symbol (),
   _wireframe      = Symbol ();

function X3DShadersContext ()
{
   this [_primitiveModes] = new Map ();
   this [_shaderNodes]    = new Map ();
}

Object .assign (X3DShadersContext .prototype,
{
   initialize ()
   {
      this .setShading (this .getBrowserOptions () .getShading ());
   },
   getShadingLanguageVersion ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .SHADING_LANGUAGE_VERSION);
   },
   getMaxVertexUniformVectors ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_VERTEX_UNIFORM_VECTORS);
   },
   getMaxFragmentUniformVectors ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_FRAGMENT_UNIFORM_VECTORS);
   },
   getMaxVertexAttribs ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_VERTEX_ATTRIBS);
   },
   getMaxVaryingVectors ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_VARYING_VECTORS);
   },
   getPrimitiveMode (primitiveMode)
   {
      return this [_primitiveModes] .get (primitiveMode);
   },
   getShaders ()
   {
      return this [_shaderNodes];
   },
   setShading (type)
   {
      const
         gl             = this .getContext (),
         primitiveModes = this [_primitiveModes];

      if (this [_wireframe])
      {
         this [_wireframe] = false;

         const ext = gl .getExtension ("WEBGL_polygon_mode");

         ext ?.polygonModeWEBGL (gl .FRONT_AND_BACK, ext .FILL_WEBGL);
      }

      switch (type)
      {
         case Shading .POINT:
         {
            primitiveModes
               .set (gl .POINTS,    gl .POINTS)
               .set (gl .LINES,     gl .POINTS)
               .set (gl .TRIANGLES, gl .POINTS);

            break;
         }
         case Shading .WIREFRAME:
         {
            this [_wireframe] = true;

            const ext = gl .getExtension ("WEBGL_polygon_mode");

            ext ?.polygonModeWEBGL (gl .FRONT_AND_BACK, ext .LINE_WEBGL);

            primitiveModes
               .set (gl .POINTS,    gl .POINTS)
               .set (gl .LINES,     gl .LINES)
               .set (gl .TRIANGLES, gl .TRIANGLES);

            break;
         }
         default:
         {
            // case Shading .FLAT:
            // case Shading .GOURAUD:
            // case Shading .PHONG:

            primitiveModes
               .set (gl .POINTS,    gl .POINTS)
               .set (gl .LINES,     gl .LINES)
               .set (gl .TRIANGLES, gl .TRIANGLES);

            break;
         }
      }
   },
   getWireframe ()
   {
      return this [_wireframe];
   },
   createShader (name, vs, fs = vs, options = [ ], uniformNames = [ ], transformFeedbackVaryings = [ ])
   {
      if (DEVELOPMENT)
         console .info (`Initializing ${name}Shader.`);

      const
         gl      = this .getContext (),
         version = gl .getVersion ();

      const vertexShader = new ShaderPart (this .getPrivateScene ());
      vertexShader ._url .push (encodeURI (vs .startsWith ("data:") ? vs : `data:x-shader/x-vertex,${ShaderRegistry .vertex [version] [vs] ()}`));

      vertexShader .setName (`${name}VertexShader`);
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new ShaderPart (this .getPrivateScene ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI (fs .startsWith ("data:") ? fs : `data:x-shader/x-fragment,${ShaderRegistry .fragment [version] [fs] ()}`));

      fragmentShader .setName (`${name}FragmentShader`);
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new ComposedShader (this .getPrivateScene ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);

      shaderNode .setName (`${name}Shader`);
      shaderNode .setUniformNames (uniformNames);
      shaderNode .setTransformFeedbackVaryings (transformFeedbackVaryings);
      shaderNode .setup ();

      return shaderNode;
   },
});

export default X3DShadersContext;

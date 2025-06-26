import GeometryContext from "./GeometryContext.js";
import AlphaMode       from "../Shape/AlphaMode.js";
import VertexArray     from "../../Rendering/VertexArray.js";
import Layer           from "../../Components/Layering/Layer.js"
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";

function ScreenPoint (browser)
{
   const gl = browser .getContext ();

   this .browser           = browser;
   this .vertexArrayObject = new VertexArray (gl);

   // Black Circle

   this .circleVertexBuffer    = gl .createBuffer ();
   this .circleGeometryContext = new GeometryContext ({
      renderObject: new Layer (browser .getPrivateScene ()),
      alphaMode: AlphaMode .BLEND,
      geometryType: 1,
   });

   this .circleGeometryContext .renderObject .setup ();

   // Transfer circle vertices.

   const circleVertexArray = browser .getCircle2DOptions () .getGeometry () .getVertices ();

   this .circleNumVertices = circleVertexArray .length / 4;

   gl .bindBuffer (gl .ARRAY_BUFFER, this .circleVertexBuffer);
   gl .bufferData (gl .ARRAY_BUFFER, circleVertexArray .getValue (), gl .STATIC_DRAW);

   // Disk

   this .diskVertexBuffer      = gl .createBuffer ();
   this .diskGeometryContext   = new GeometryContext ({
      renderObject: this .circleGeometryContext .renderObject,
      alphaMode: AlphaMode .BLEND,
      geometryType: 3,
   });

   // Transfer disk vertices.

   const diskVertexArray = browser .getDisk2DOptions () .getDiskVertices ();

   this .diskNumVertices = diskVertexArray .length / 4;

   gl .bindBuffer (gl .ARRAY_BUFFER, this .diskVertexBuffer);
   gl .bufferData (gl .ARRAY_BUFFER, diskVertexArray .getValue (), gl .STATIC_DRAW);
}

Object .assign (ScreenPoint .prototype,
{
   display: (() =>
   {
      const
         projectionMatrixArray = new Float32Array (Matrix4 .Identity),
         modelViewMatrixArray  = new Float32Array (Matrix4 .Identity),
         identity              = new Float32Array (Matrix4 .Identity),
         screenMatrix          = new Matrix4 (),
         clipPlanes            = [ ];

      return function (radius, color, transparency, circle, modelViewMatrix, projectionMatrix, frameBuffer)
      {
         // Configure HUD

         const
            browser  = this .browser,
            gl       = browser .getContext (),
            viewport = browser .getViewport ();

         frameBuffer .bind ();

         // Set viewport.

         gl .viewport (... viewport);
         gl .scissor (... viewport);
         gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);

         // Apply screen scale to matrix.

         const
            screenScale = Math .abs (modelViewMatrix .origin .z),
            scale       = radius * screenScale;

         const
            x = modelViewMatrix .xAxis .normalize () .multiply (scale),
            y = modelViewMatrix .yAxis .normalize () .multiply (scale),
            z = modelViewMatrix .zAxis .normalize () .multiply (scale);

         screenMatrix .set (... x, 0, ... y, 0, ... z, 0, ... modelViewMatrix .origin, 1);

         // Set projection and model view matrix.

         projectionMatrixArray .set (projectionMatrix);
         modelViewMatrixArray  .set (screenMatrix);

         // Change state.

         gl .depthMask (false);
         gl .disable (gl .DEPTH_TEST);
         gl .enable (gl .BLEND);
         gl .disable (gl .CULL_FACE);

         {
            // Set uniforms and attributes.

            const shaderNode = browser .getDefaultMaterial () .getShader (this .circleGeometryContext);

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, clipPlanes);

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_EyeMatrix,        false, identity);
            gl .uniform3f        (shaderNode .x3d_EmissiveColor, 0, 0, 0);
            gl .uniform1f        (shaderNode .x3d_Transparency, circle);

            if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
               shaderNode .enableVertexAttribute (gl, this .circleVertexBuffer, 0, 0);

            // Draw a black and a white point.

            gl .drawArrays (gl .LINES, 0, this .circleNumVertices);
         }

         {
            // Set uniforms and attributes.

            const shaderNode = browser .getDefaultMaterial () .getShader (this .diskGeometryContext);

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, clipPlanes);

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_EyeMatrix,        false, identity);
            gl .uniform3f        (shaderNode .x3d_EmissiveColor, ... color);
            gl .uniform1f        (shaderNode .x3d_Transparency, transparency);

            if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
               shaderNode .enableVertexAttribute (gl, this .diskVertexBuffer, 0, 0);

            // Draw a black and a white point.

            gl .drawArrays (gl .TRIANGLES, 0, this .diskNumVertices);
         }

         // Reset state.

         gl .depthMask (true);
         gl .enable (gl .DEPTH_TEST);
         gl .disable (gl .BLEND);
      };
   })(),
   dispose ()
   {
      const gl = this .browser .getContext ();

      gl .deleteBuffer (this .diskVertexBuffer);

      this .diskVertexArrayObject .dispose (gl);
   },
});

export default ScreenPoint;

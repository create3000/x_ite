import Fields          from "../../Fields.js";
import X3DNode         from "../Core/X3DNode.js";
import X3DBindableNode from "../Core/X3DBindableNode.js";
import GeometryContext from "../../Browser/Rendering/GeometryContext.js";
import VertexArray     from "../../Rendering/VertexArray.js";
import TraverseType    from "../../Rendering/TraverseType.js";
import AlphaMode       from "../../Browser/Shape/AlphaMode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import RenderPass      from "../../Rendering/RenderPass.js";
import Complex         from "../../../standard/Math/Numbers/Complex.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4       from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm       from "../../../standard/Math/Algorithm.js";
import BitSet          from "../../../standard/Utility/BitSet.js";

function X3DBackgroundNode (executionContext)
{
   X3DBindableNode .call (this, executionContext);

   this .addType (X3DConstants .X3DBackgroundNode);

   this .addChildObjects (X3DConstants .inputOutput, "hidden", new Fields .SFBool ());

   this .setVisibleObject (true);

   // Units

   this ._skyAngle    .setUnit ("angle");
   this ._groundAngle .setUnit ("angle");

   // Private properties

   this .modelMatrix      = new Matrix4 ();
   this .clipPlanes       = [ ];
   this .colors           = [ ];
   this .sphere           = [ ];
   this .textureNodes     = new Array (6);
   this .textureBits      = new BitSet ();
   this .sphereContext    = new GeometryContext ({ colorMaterial: true });
   this .texturesContext  = new GeometryContext ({ localObjectsKeys: this .sphereContext .localObjectsKeys });
   this .localObjectsKeys = this .sphereContext .localObjectsKeys;

   this [RenderPass .RENDER_INDEX]         = this;
   this [RenderPass .TRANSMISSION_INDEX]   = this;
   this [RenderPass .VOLUME_SCATTER_INDEX] = null;

}

Object .assign (Object .setPrototypeOf (X3DBackgroundNode .prototype, X3DBindableNode .prototype),
{
   initialize ()
   {
      X3DBindableNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .colorBuffer         = gl .createBuffer ();
      this .sphereBuffer        = gl .createBuffer ();
      this .texCoordBuffers     = [gl .createBuffer ()];
      this .textureBuffers      = Array .from ({length: 6}, () => gl .createBuffer ());
      this .sphereArrayObject   = new VertexArray (gl);
      this .textureArrayObjects = Array .from ({length: 6}, () => new VertexArray (gl));

      this ._groundAngle .addInterest ("build", this);
      this ._groundColor .addInterest ("build", this);
      this ._skyAngle    .addInterest ("build", this);
      this ._skyColor    .addInterest ("build", this);

      this .build ();
      this .transferRectangle ();
   },
   isHidden ()
   {
      return this ._hidden .getValue ();
   },
   setHidden (value)
   {
      if (value === this ._hidden .getValue ())
         return;

      this ._hidden = value;
   },
   isTransparent ()
   {
      if (this ._hidden .getValue ())
         return true;

      if (this ._transparency .getValue () <= 0)
         return false;

      if (this .textureBits .size !== 6)
         return true;

      for (const i of this .textureBits)
      {
         if (this .textureNodes [i] ._transparent .getValue ())
            return true;
      }

      return false;
   },
   getRenderPassNodes ()
   {
      return this .renderPassNodes;
   },
   set_texture__ (index, textureNode)
   {
      this .textureNodes [index] ?.removeInterest (`set_loadState${index}__`, this);

      this .textureNodes [index] = textureNode;

      textureNode ?.addInterest (`set_loadState${index}__`, this, index, textureNode);

      this .set_loadState__ (index, textureNode);
   },
   set_loadState__ (index, textureNode)
   {
      this .setTextureBit (index, textureNode ?.checkLoadState ());
   },
   setTextureBit (bit, loadState)
   {
      this .textureBits .set (bit, loadState === X3DConstants .COMPLETE_STATE);
   },
   getColor (theta, color, angle)
   {
      const index = Algorithm .upperBound (angle, 0, angle .length, theta);

      return color [index];
   },
   build ()
   {
      this .colors .length = 0;
      this .sphere .length = 0;

      if (this ._groundColor .length === 0 && this ._skyColor .length == 1)
      {
         // Build cube

         this .sphere .vertices = 36;

         this .sphere .push ( 1,  1, -1, 1, -1,  1, -1, 1, -1, -1, -1, 1, // Back
                              1,  1, -1, 1, -1, -1, -1, 1,  1, -1, -1, 1,
                             -1,  1,  1, 1,  1,  1,  1, 1, -1, -1,  1, 1, // Front
                             -1, -1,  1, 1,  1,  1,  1, 1,  1, -1,  1, 1,
                             -1,  1, -1, 1, -1,  1,  1, 1, -1, -1,  1, 1, // Left
                             -1,  1, -1, 1, -1, -1,  1, 1, -1, -1, -1, 1,
                              1,  1,  1, 1,  1,  1, -1, 1,  1, -1,  1, 1, // Right
                              1, -1,  1, 1,  1,  1, -1, 1,  1, -1, -1, 1,
                              1,  1,  1, 1, -1,  1,  1, 1, -1,  1, -1, 1, // Top
                              1,  1,  1, 1, -1,  1, -1, 1,  1,  1, -1, 1,
                             -1, -1,  1, 1,  1, -1,  1, 1, -1, -1, -1, 1, // Bottom
                             -1, -1, -1, 1,  1, -1,  1, 1,  1, -1, -1, 1);

         const color = this ._skyColor [0];

         for (let i = 0, vertices = this .sphere .vertices; i < vertices; ++ i)
            this .colors .push (... color, 1);
      }
      else
      {
         // Build sphere

         if (this ._skyColor .length > this ._skyAngle .length)
         {
            const vAngle = this ._skyAngle .slice ();

            if (vAngle .length === 0 || vAngle [0] > 0)
               vAngle .unshift (0);

            if (vAngle .at (-1) < Math .PI)
               vAngle .push (Math .PI);

            if (vAngle .length === 2)
               vAngle .splice (1, 0, (vAngle [0] + vAngle [1]) / 2)

            this .buildSphere (vAngle, this ._skyAngle, this ._skyColor, false);
         }

         if (this ._groundColor .length > this ._groundAngle .length)
         {
            const vAngle = this ._groundAngle .slice () .reverse ();

            if (vAngle .length === 0 || vAngle [0] < Math .PI / 2)
               vAngle .unshift (Math .PI / 2);

            if (vAngle .at (-1) > 0)
               vAngle .push (0);

            this .buildSphere (vAngle, this ._groundAngle, this ._groundColor, true);
         }
      }

      this .transferSphere ();
   },
   buildSphere: (() =>
   {
      const U_DIMENSION = 20;

      const
         z1 = new Complex (),
         z2 = new Complex (),
         y1 = new Complex (),
         y2 = new Complex (),
         y3 = new Complex (),
         y4 = new Complex ();

      return function (vAngle, angle, color, bottom)
      {
         const
            vAngleMax   = bottom ? Math .PI / 2 : Math .PI,
            V_DIMENSION = vAngle .length - 1;

         for (let v = 0; v < V_DIMENSION; ++ v)
         {
            let
               theta1 = Algorithm .clamp (vAngle [v],     0, vAngleMax),
               theta2 = Algorithm .clamp (vAngle [v + 1], 0, vAngleMax);

            if (bottom)
            {
               theta1 = Math .PI - theta1;
               theta2 = Math .PI - theta2;
            }

            z1 .setPolar (1, theta1);
            z2 .setPolar (1, theta2);

            const
               c1 = this .getColor (vAngle [v],     color, angle),
               c2 = this .getColor (vAngle [v + 1], color, angle);

            for (let u = 0; u < U_DIMENSION; ++ u)
            {
               // p4 --- p1
               //  |   / |
               //  | /   |
               // p3 --- p2

               // The last point is the first one.
               const u1 = u < U_DIMENSION - 1 ? u + 1 : 0;

               // p1, p2
               let phi = 2 * Math .PI * (u / U_DIMENSION);
               y1 .setPolar (-z1 .imag, phi);
               y2 .setPolar (-z2 .imag, phi);

               // p3, p4
               phi = 2 * Math .PI * (u1 / U_DIMENSION);
               y3 .setPolar (-z2 .imag, phi);
               y4 .setPolar (-z1 .imag, phi);

               // Triangle 1 and 2

               this .colors .push (... c1, 1,
                                   ... c2, 1,
                                   ... c2, 1,
                                   // Triangle 2
                                   ... c1, 1,
                                   ... c1, 1,
                                   ... c2, 1);

               this .sphere .push (y1 .imag, z1 .real, y1 .real, 1,
                                   y3 .imag, z2 .real, y3 .real, 1,
                                   y2 .imag, z2 .real, y2 .real, 1,
                                   // Triangle 2
                                   y1 .imag, z1 .real, y1 .real, 1,
                                   y4 .imag, z1 .real, y4 .real, 1,
                                   y3 .imag, z2 .real, y3 .real, 1);
            }
         }
      };
   })(),
   transferSphere ()
   {
      const gl = this .getBrowser () .getContext ();

      // Transfer colors.

      gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (this .colors), gl .DYNAMIC_DRAW);

      // Transfer sphere.

      gl .bindBuffer (gl .ARRAY_BUFFER, this .sphereBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (this .sphere), gl .DYNAMIC_DRAW);

      this .sphereCount = this .sphere .length / 4;
   },
   transferRectangle: (() =>
   {
      const texCoords = new Float32Array ([
         1, 1, 0, 1,
         0, 1, 0, 1,
         0, 0, 0, 1,
         1, 1, 0, 1,
         0, 0, 0, 1,
         1, 0, 0, 1,
      ]);

      const frontVertices = new Float32Array ([
         1,  1, -1, 1,
        -1,  1, -1, 1,
        -1, -1, -1, 1,
         1,  1, -1, 1,
        -1, -1, -1, 1,
         1, -1, -1, 1,
      ]);

      const backVertices = new Float32Array ([
         -1,  1,  1, 1,
          1,  1,  1, 1,
          1, -1,  1, 1,
         -1,  1,  1, 1,
          1, -1,  1, 1,
         -1, -1,  1, 1,
      ]);

      const leftVertices = new Float32Array ([
         -1,  1, -1, 1,
         -1,  1,  1, 1,
         -1, -1,  1, 1,
         -1,  1, -1, 1,
         -1, -1,  1, 1,
         -1, -1, -1, 1,
      ]);

      const rightVertices = new Float32Array ([
         1,  1,  1, 1,
         1,  1, -1, 1,
         1, -1, -1, 1,
         1,  1,  1, 1,
         1, -1, -1, 1,
         1, -1,  1, 1,
      ]);

      const topVertices = new Float32Array ([
          1, 1,  1, 1,
         -1, 1,  1, 1,
         -1, 1, -1, 1,
          1, 1,  1, 1,
         -1, 1, -1, 1,
          1, 1, -1, 1,
      ]);

      const bottomVertices = new Float32Array ([
          1, -1, -1, 1,
         -1, -1, -1, 1,
         -1, -1,  1, 1,
          1, -1, -1, 1,
         -1, -1,  1, 1,
          1, -1,  1, 1,
      ]);

      const vertices = [
         frontVertices,
         backVertices,
         leftVertices,
         rightVertices,
         topVertices,
         bottomVertices,
      ];

      return function ()
      {
         const gl = this .getBrowser () .getContext ();

         // Transfer texCoords.

         gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
         gl .bufferData (gl .ARRAY_BUFFER, texCoords, gl .DYNAMIC_DRAW);

         // Transfer rectangle.

         for (let i = 0; i < 6; ++ i)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, this .textureBuffers [i]);
            gl .bufferData (gl .ARRAY_BUFFER, vertices [i], gl .DYNAMIC_DRAW);
         }
      };
   })(),
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .CAMERA:
         {
            renderObject .getLayer () .getBackgrounds () .push (this);

            this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
            return;
         }
         case TraverseType .DISPLAY:
         {
            const
               localObjects     = renderObject .getLocalObjects (),
               clipPlanes       = this .clipPlanes,
               localObjectsKeys = this .localObjectsKeys;

            let c = 0;

            for (const localObject of localObjects)
            {
               if (localObject .isClipped)
                  clipPlanes [c ++] = localObject;
            }

            clipPlanes       .length = c;
            localObjectsKeys .length = c;
            localObjectsKeys .fill (0);
            return;
         }
      }
   },
   display: (() =>
   {
      const
         projectionMatrixArray = new Float32Array (16),
         projectionMatrix      = new Matrix4 (),
         projectionScale       = new Matrix4 (1,0,0,0, 0,1,0,0, 0,0,0,0, 0,0,0,1),
         modelViewMatrixArray  = new Float32Array (16),
         modelViewMatrix       = new Matrix4 (),
         rotation              = new Rotation4 (),
         scale                 = new Vector3 ();

      return function (gl, renderObject)
      {
         if (this ._hidden .getValue ())
            return;

         const browser = this .getBrowser ();

         // Always fill background.

         if (browser .getWireframe ())
         {
            const ext = gl .getExtension ("WEBGL_polygon_mode");

            ext ?.polygonModeWEBGL (gl .FRONT_AND_BACK, ext .FILL_WEBGL);
         }

         // Setup context.

         gl .disable (gl .DEPTH_TEST);
         gl .depthMask (false);
         gl .enable (gl .CULL_FACE);
         gl .frontFace (gl .CCW);

         // Create projection matrix.
         // The projectionScale will set gl_Position.z to 0,
         // so it is in the middle of near and far plane.

         projectionMatrixArray .set (projectionMatrix
            .assign (renderObject .getProjectionMatrixArray ())
            .multRight (projectionScale));

         // Rotate and scale background.

         const far = renderObject .getViewpoint () .getMaxFarValue ();

         modelViewMatrix .assign (this .modelMatrix);
         modelViewMatrix .multRight (renderObject .getViewMatrix () .get ());
         modelViewMatrix .get (null, rotation);
         modelViewMatrix .identity ();
         modelViewMatrix .rotate (rotation);
         modelViewMatrix .scale (scale .set (far, far, far));

         modelViewMatrixArray .set (modelViewMatrix);

         // Draw background sphere and texture cube.

         this .drawSphere (renderObject, modelViewMatrixArray, projectionMatrixArray);

         if (+this .textureBits)
            this .drawCube (renderObject, modelViewMatrixArray, projectionMatrixArray);

         gl .depthMask (true);
         gl .enable (gl .DEPTH_TEST);
         gl .disable (gl .BLEND);

         // Restore polygon mode.

         if (browser .getWireframe ())
         {
            const ext = gl .getExtension ("WEBGL_polygon_mode");

            ext ?.polygonModeWEBGL (gl .FRONT_AND_BACK, ext .LINE_WEBGL);
         }
      };
   })(),
   drawSphere (renderObject, modelViewMatrixArray, projectionMatrixArray)
   {
      const transparency = Algorithm .clamp (this ._transparency .getValue (), 0, 1);

      if (transparency === 1)
         return;

      const
         browser       = this .getBrowser (),
         gl            = browser .getContext (),
         sphereContext = this .sphereContext;

      sphereContext .alphaMode    = transparency ? AlphaMode .BLEND : AlphaMode .OPAQUE;
      sphereContext .renderObject = renderObject;

      const shaderNode = browser .getDefaultMaterial () .getShader (sphereContext);

      shaderNode .enable (gl);
      shaderNode .setClipPlanes (gl, this .clipPlanes, renderObject);

      // Uniforms

      gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
      gl .uniformMatrix4fv (shaderNode .x3d_EyeMatrix,        false, renderObject .getEyeMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);

      gl .uniform3f (shaderNode .x3d_EmissiveColor,                      1, 1, 1)
      gl .uniform1f (shaderNode .x3d_Transparency,                       transparency)
      gl .uniform1i (shaderNode .x3d_TextureCoordinateGeneratorMode [0], 0);
      gl .uniform1f (shaderNode .x3d_Exposure,                           1);

      // Enable vertex attribute arrays.

      if (this .sphereArrayObject .enable (shaderNode .getProgram ()))
      {
         shaderNode .enableColorAttribute  (gl, this .colorBuffer,  0, 0);
         shaderNode .enableVertexAttribute (gl, this .sphereBuffer, 0, 0);
      }

      // Draw.

      if (transparency)
         gl .enable (gl .BLEND);
      else
         gl .disable (gl .BLEND);

      gl .drawArrays (gl .TRIANGLES, 0, this .sphereCount);

      gl .uniform1f (shaderNode .x3d_Exposure, Math .max (browser .getBrowserOption ("Exposure"), 0));
   },
   drawCube: (() =>
   {
      const textureMatrixArray = new Float32Array (Matrix4 .Identity);

      return function (renderObject, modelViewMatrixArray, projectionMatrixArray)
      {
         const
            browser         = this .getBrowser (),
            gl              = browser .getContext (),
            texturesContext = this .texturesContext;

         // Draw all textures.

         for (const i of this .textureBits)
         {
            const textureNode = this .textureNodes [i];

            texturesContext .alphaMode    = textureNode ._transparent .getValue () ? AlphaMode .BLEND : AlphaMode .OPAQUE;
            texturesContext .textureNode  = textureNode;
            texturesContext .renderObject = renderObject;

            const shaderNode = browser .getDefaultMaterial () .getShader (texturesContext);

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, this .clipPlanes, renderObject);

            // Set uniforms.

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix,  false, projectionMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_EyeMatrix,         false, renderObject .getEyeMatrixArray ());
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,   false, modelViewMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_TextureMatrix [0], false, textureMatrixArray);

            gl .uniform3f (shaderNode .x3d_EmissiveColor,                      1, 1, 1);
            gl .uniform1f (shaderNode .x3d_Transparency,                       0);
            gl .uniform1i (shaderNode .x3d_TextureCoordinateGeneratorMode [0], 0);
            gl .uniform1f (shaderNode .x3d_Exposure,                           1);

            this .drawRectangle (gl, browser, shaderNode, renderObject, textureNode, this .textureBuffers [i], this .textureArrayObjects [i]);

            gl .uniform1f (shaderNode .x3d_Exposure, Math .max (browser .getBrowserOption ("Exposure"), 0));
         }
      };
   })(),
   drawRectangle (gl, browser, shaderNode, renderObject, textureNode, buffer, vertexArray)
   {
      textureNode .setShaderUniforms (gl, shaderNode, renderObject);

      if (vertexArray .enable (shaderNode .getProgram ()))
      {
         shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);
         shaderNode .enableVertexAttribute (gl, buffer, 0, 0);
      }

      // Draw.

      if (textureNode ._transparent .getValue ())
         gl .enable (gl .BLEND);
      else
         gl .disable (gl .BLEND);

      gl .drawArrays (gl .TRIANGLES, 0, 6);

      browser .resetTextureUnits ();
   },
});

Object .defineProperties (X3DBackgroundNode, X3DNode .getStaticProperties ("X3DBackgroundNode", "EnvironmentalEffects", 1));

for (let index = 0; index < 6; ++ index)
{
   X3DBackgroundNode .prototype [`set_loadState${index}__`] = function (index, textureNode)
   {
      this .set_loadState__ (index, textureNode);
   };
}

export default X3DBackgroundNode;

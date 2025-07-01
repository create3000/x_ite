import X3DNode         from "../Core/X3DNode.js";
import X3DGeometryNode from "./X3DGeometryNode.js";

function X3DPointGeometryNode (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   const browser = this .getBrowser ();

   this .setGeometryType (0);
   this .setPrimitiveMode (browser .getContext () .POINTS);
   this .setSolid (false);
}

Object .assign (Object .setPrototypeOf (X3DPointGeometryNode .prototype, X3DGeometryNode .prototype),
{
   intersectsLine ()
   {
      return false;
   },
   intersectsBox ()
   {
      return false;
   },
   generateTexCoords ()
   { },
   display (gl, renderContext)
   {
      const
         { viewport, appearanceNode} = renderContext,
         browser                     = this .getBrowser (),
         shaderNode                  = appearanceNode .getShader (this, renderContext),
         renderModeNodes             = appearanceNode .getRenderModes ();

      if (!renderContext .transparent)
      {
         gl .enable (gl .SAMPLE_ALPHA_TO_COVERAGE);
         gl .enable (gl .BLEND);
         gl .blendFuncSeparate (gl .ONE, gl .ZERO, gl .ZERO, gl .ONE);
      }

      // Set viewport.

      gl .viewport (... viewport);

      // Enable render mode nodes.

      for (const node of renderModeNodes)
         node .enable (gl);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, renderContext, this);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         const
            attribNodes   = this .getAttrib (),
            attribBuffers = this .getAttribBuffers ();

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         for (let i = 0, length = attribNodes .length; i < length; ++ i)
            attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

         if (this .hasFogCoords)
            shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

         if (this .colorMaterial)
            shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

         if (this .hasTangents)
            shaderNode .enableTangentAttribute (gl, this .tangentBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);
      }

      gl .drawArrays (this .primitiveMode, 0, this .vertexCount);

      // Disable render mode nodes.

      for (const node of renderModeNodes)
         node .disable (gl);

      // Reset texture units.

      browser .resetTextureUnits ();

      if (!renderContext .transparent)
      {
         gl .disable (gl .SAMPLE_ALPHA_TO_COVERAGE);
         gl .disable (gl .BLEND);
         gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      }
   },
   displayInstanced (gl, renderContext, shapeNode)
   {
      const
         { viewport, appearanceNode} = renderContext,
         browser                     = this .getBrowser (),
         shaderNode                  = appearanceNode .getShader (this, renderContext),
         renderModeNodes             = appearanceNode .getRenderModes ();

      if (!renderContext .transparent)
      {
         gl .enable (gl .SAMPLE_ALPHA_TO_COVERAGE);
         gl .enable (gl .BLEND);
         gl .blendFuncSeparate (gl .ONE, gl .ZERO, gl .ZERO, gl .ONE);
      }

      // Set viewport.

      gl .viewport (... viewport);

      // Enable render mode nodes.

      for (const node of renderModeNodes)
         node .enable (gl);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, renderContext, this);

      // Setup vertex attributes.

      const instances = shapeNode .getInstances ();

      if (instances .vertexArrayObject .update (this .updateInstances) .enable (shaderNode .getProgram ()))
      {
         const { instancesStride, particleOffset, velocityOffset, matrixOffset, normalMatrixOffset } = shapeNode;

         const
            attribNodes   = this .getAttrib (),
            attribBuffers = this .getAttribBuffers ();

         if (particleOffset !== undefined)
            shaderNode .enableParticleAttribute (gl, instances, instancesStride, particleOffset, 1);

         if (velocityOffset !== undefined)
            shaderNode .enableParticleVelocityAttribute (gl, instances, instancesStride, velocityOffset, 1);

         shaderNode .enableInstanceMatrixAttribute (gl, instances, instancesStride, matrixOffset, 1);

         if (normalMatrixOffset !== undefined)
            shaderNode .enableInstanceNormalMatrixAttribute (gl, instances, instancesStride, normalMatrixOffset, 1);

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         for (let i = 0, length = attribNodes .length; i < length; ++ i)
            attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

         if (this .hasFogCoords)
            shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

         if (this .colorMaterial)
            shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

         if (this .hasTangents)
            shaderNode .enableTangentAttribute (gl, this .tangentBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);

         this .updateInstances = false;
      }

      // Wireframes are always solid so only one drawing call is needed.

      gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, shapeNode .getNumInstances ());

      // Disable render mode nodes.

      for (const node of renderModeNodes)
         node .disable (gl);

      // Reset texture units.

      browser .resetTextureUnits ();

      if (!renderContext .transparent)
      {
         gl .disable (gl .SAMPLE_ALPHA_TO_COVERAGE);
         gl .disable (gl .BLEND);
         gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      }
   },
});

Object .defineProperties (X3DPointGeometryNode, X3DNode .getStaticProperties ("X3DPointGeometryNode", "Rendering", 1));

export default X3DPointGeometryNode;

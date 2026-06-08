import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../../Components/Core/X3DNode.js";
import X3DShapeNode         from "../../Components/Shape/X3DShapeNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import URLs                 from "../Networking/URLs.js";
import GeometryContext      from "../Rendering/GeometryContext.js";
import GeometryType         from "../Shape/GeometryType.js";
import AlphaMode            from "../Shape/AlphaMode.js";
import VertexArray          from "../../Rendering/VertexArray.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

// Register shaders.

import ShaderRegistry from "../Shaders/ShaderRegistry.js";
import VertexShader   from "./GaussianSplats.vs.js";
import FragmentShader from "./GaussianSplats.fs.js";

ShaderRegistry .addVertexShader   ("GaussianSplats", VertexShader);
ShaderRegistry .addFragmentShader ("GaussianSplats", FragmentShader);

// Spherical Harmonics Counts

const SH_COEFS = [1, 3, 5, 7];

// Quad Geometry

// p4 ------ p3
// |       / |
// |     /   |
// |   /     |
// | /       |
// p1 ------ p2

const QuadGeometry = new Float32Array ([
   -1, -1, 0, 1,
    1, -1, 0, 1,
    1,  1, 0, 1,
   -1, -1, 0, 1,
    1,  1, 0, 1,
   -1,  1, 0, 1,
]);

// Special X3DShapeNode for internal use.

function GaussianSplatsShape (executionContext, node)
{
   X3DShapeNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .outputOnly, "rebuild", new Fields .SFTime ());

   this .setShadowObject (false);

   // Private Properties

   this .node                   = node;
   this .shaderCache            = this .getBrowser () .getShaders ();
   this .currentModelViewMatrix = new Float32Array (16);
   this .sortModelViewMatrix    = new Float32Array (16);
   this .clipPlanes             = [ ];
}

Object .assign (Object .setPrototypeOf (GaussianSplatsShape .prototype, X3DShapeNode .prototype),
{
   initialize ()
   {
      X3DShapeNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Quad Geometry

      this .geometryContext   = new GeometryContext ();
      this .geometryBuffer    = gl .createBuffer ();
      this .splatsIndexBuffer = gl .createBuffer ();
      this .vertexArrayObject = new VertexArray (gl);

      gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, QuadGeometry, gl .DYNAMIC_DRAW);

      // Textures

      this .positionsTexture          = this .createTexture ();
      this .orientationsTexture       = this .createTexture ();
      this .scalesTexture             = this .createTexture ();
      this .sphericalHarmonicsTexture = this .createTexture (gl .TEXTURE_2D_ARRAY);
      this .opacitiesTexture          = this .createTexture ();

      this .positionsTextureUnit          = browser .popTextureUnit ();
      this .orientationsTextureUnit       = browser .popTextureUnit ();
      this .scalesTextureUnit             = browser .popTextureUnit ();
      this .sphericalHarmonicsTextureUnit = browser .popTextureUnit ();
      this .opacitiesTextureUnit          = browser .popTextureUnit ();

      browser .resetTextureUnits ();

      // Fields

      this .node ._colorSpace   .addInterest ("set_key__",      this);
      this .node ._positions    .addInterest ("requestRebuild", this);
      this .node ._orientations .addInterest ("requestRebuild", this);
      this .node ._scales       .addInterest ("requestRebuild", this);
      this .node ._opacities    .addInterest ("requestRebuild", this);

      for (const [degree, coefs] of SH_COEFS .entries ())
      {
         for (let coef = 0; coef < coefs; ++ coef)
            this .node .getField (`sphericalHarmonicsDegree${degree}Coef${coef}`) .addInterest ("requestRebuild", this);
      }

      this ._rebuild .addInterest ("rebuild", this);

      this .rebuild ();
   },
   getShapeKey ()
   {
      return this .key;
   },
   getGeometryContext ()
   {
      return this .geometryContext;
   },
   getGeometryType ()
   {
      return GeometryType .POINT;
   },
   getNumInstances ()
   {
      return this .numSplats;
   },
   set_key__ ()
   {
      let key = "GS";

      for (const [degree, coefs] of SH_COEFS .entries ())
      {
         const filled = Array .from ({ length: coefs }, (_, coef) => this .node .getField (`sphericalHarmonicsDegree${degree}Coef${coef}`) .length) .some (length => length);

         key += filled ? 1 : 0;
      }

      switch (this .node ._colorSpace .getValue ())
      {
         case "LIN_REC709_DISPLAY":
            key += 1;
            break;
         default: // "SRGB_REC709_DISPLAY"
            key += 0;
            break;
      }

      this .key = key;
   },
   set_bbox__ ()
   {
      const bbox = this .bbox;

      if (this .isDefaultBBoxSize ())
         bbox .setArray (this .node ._positions .shrinkToFit ());
      else
         bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());

      this .getBBoxSize ()   .assign (bbox .size);
      this .getBBoxCenter () .assign (bbox .center);
   },
   set_geometry__ ()
   { },
   set_transparent__ ()
   {
      this .setTransparent (true);
      this .setAlphaMode (AlphaMode .BLEND);
   },
   createTexture (target)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext (),
         texture = gl .createTexture ();

      target ??= gl .TEXTURE_2D;

      gl .bindTexture (target, texture);

      gl .texParameteri (target, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (target, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      return texture;
   },
   requestRebuild ()
   {
      this ._rebuild = Date .now () / 1000;
   },
   rebuild ()
   {
      const
         browser   = this .getBrowser (),
         gl        = browser .getContext (),
         numSplats = this .node ._positions .length;

      this .numSplats = numSplats;

      // Indices

      gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Uint32Array (Array (numSplats) .keys ()), gl .DYNAMIC_DRAW);

      // Positions

      const textureWidth = Math .ceil (Math .sqrt (numSplats));

      if (textureWidth)
      {
         const
            textureSize        = textureWidth * textureWidth,
            positions          = new Float32Array (textureSize * 3),
            orientations       = new Float32Array (textureSize * 4),
            scales             = new Float32Array (textureSize * 3),
            opacities          = new Float32Array (textureSize),
            sphericalHarmonics = new Float32Array (textureSize * 3 * 16);

         positions    .set (this .node ._positions    .getValue () .subarray (0, numSplats * 3));
         orientations .set (this .node ._orientations .getValue () .subarray (0, numSplats * 4));
         scales       .set (this .node ._scales       .getValue () .subarray (0, numSplats * 3));
         opacities    .set (this .node ._opacities    .getValue () .subarray (0, numSplats));

         // Degree 0,1,2,3

         let offset = 0;

         for (const [degree, coefs] of SH_COEFS .entries ())
         {
            for (let coef = 0; coef < coefs; ++ coef)
            {
               const value = this .node .getField (`sphericalHarmonicsDegree${degree}Coef${coef}`) .getValue ();

               sphericalHarmonics .set (value .subarray (0, numSplats * 3), offset);

               offset += textureSize * 3;
            }
         }

         gl .bindTexture (gl .TEXTURE_2D, this .positionsTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGB32F, textureWidth, textureWidth, 0, gl .RGB, gl .FLOAT, positions);

         gl .bindTexture (gl .TEXTURE_2D, this .orientationsTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureWidth, textureWidth, 0, gl .RGBA, gl .FLOAT, orientations);

         gl .bindTexture (gl .TEXTURE_2D, this .scalesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGB32F, textureWidth, textureWidth, 0, gl .RGB, gl .FLOAT, scales);

         gl .bindTexture (gl .TEXTURE_2D, this .opacitiesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .R16F, textureWidth, textureWidth, 0, gl .RED, gl .FLOAT, opacities);

         gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .sphericalHarmonicsTexture);
         gl .texImage3D (gl .TEXTURE_2D_ARRAY, 0, gl .RGB16F, textureWidth, textureWidth, 16, 0, gl .RGB, gl .FLOAT, sphericalHarmonics);
      }

      // Sort Worker

      this .initSortWorker ();

      // Finish

      this .set_key__ ();
      this .set_bbox__ ();
      this .set_objects__ ();
   },
   displaySimple (gl, renderContext, shaderNode)
   {
      // Set uniforms.

      const { renderObject, viewport } = renderContext;
      const projectionMatrixArray = renderObject .getProjectionMatrixArray ();

      gl .uniform4iv (shaderNode .x3d_Viewport, renderObject .getViewportArray ());

      // The projection matrix stores the focal length in the first and second element of the diagonal.
      // We need to convert from NDC space to screen space, which is done by multiplying with the
      // framebuffer dimensions and dividing by 2, since NDC goes from -1 to 1.
      gl .uniform2f (shaderNode .x3d_FocalLength,
         projectionMatrixArray [0] * viewport [2] * 0.5,
         projectionMatrixArray [5] * viewport [3] * 0.5);

      // Set textures.

      gl .activeTexture (gl .TEXTURE0 + this .positionsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .positionsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .orientationsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .orientationsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .scalesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .scalesTexture);

      gl .activeTexture (gl .TEXTURE0 + this .opacitiesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .opacitiesTexture);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
         gl .enableVertexAttribArray (shaderNode .x3d_SplatIndex);
         gl .vertexAttribIPointer (shaderNode .x3d_SplatIndex, 1, gl .UNSIGNED_INT, 0, 0);
         gl .vertexAttribDivisor (shaderNode .x3d_SplatIndex, 1);

         shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, 0);
      }

      gl .drawArraysInstanced (gl .TRIANGLES, 0, 6, this .numSplats);
   },
   display (gl, renderContext)
   {
      const shaderNode = this .getShader (renderContext);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .hasFog (null);

      // Set uniforms.

      const { renderObject, viewport, modelViewMatrix, localObjects, fogNode } = renderContext;
      const projectionMatrixArray = renderObject .getProjectionMatrixArray ();

      // Set ClipPlane nodes.

      shaderNode .setClipPlanes (gl, localObjects, renderObject);
      fogNode ?.setShaderUniforms (gl, shaderNode);

      // Set viewport and matrices.

      gl .viewport (... viewport);
      gl .uniform4iv (shaderNode .x3d_Viewport, renderObject .getViewportArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
      gl .uniformMatrix4fv (shaderNode .x3d_EyeMatrix,        false, renderObject .getEyeMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrix);

      // The projection matrix stores the focal length in the first and second element of the diagonal.
      // We need to convert from NDC space to screen space, which is done by multiplying with the
      // framebuffer dimensions and dividing by 2, since NDC goes from -1 to 1.
      gl .uniform2f (shaderNode .x3d_FocalLength,
         projectionMatrixArray [0] * viewport [2] * 0.5,
         projectionMatrixArray [5] * viewport [3] * 0.5);

      // Set textures.

      gl .activeTexture (gl .TEXTURE0 + this .positionsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .positionsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .orientationsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .orientationsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .scalesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .scalesTexture);

      gl .activeTexture (gl .TEXTURE0 + this .opacitiesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .opacitiesTexture);

      gl .activeTexture (gl .TEXTURE0 + this .sphericalHarmonicsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .sphericalHarmonicsTexture);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
         gl .enableVertexAttribArray (shaderNode .x3d_SplatIndex);
         gl .vertexAttribIPointer (shaderNode .x3d_SplatIndex, 1, gl .UNSIGNED_INT, 0, 0);
         gl .vertexAttribDivisor (shaderNode .x3d_SplatIndex, 1);

         shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, 0);
      }

      // Sort splats.
      this .sortIndices (modelViewMatrix);

      // gl .blendFunc (gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      gl .frontFace (gl .CCW);
      gl .enable (gl .CULL_FACE);

      gl .drawArraysInstanced (gl .TRIANGLES, 0, 6, this .numSplats);

      // gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
   },
   getShader (renderContext)
   {
      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      let key = "";

      key += this .key;
      key += renderObject .getRenderKey ();
      key += fogNode ?.getFogType () ?? 0;
      key += localObjectsKeys .join (""); // ClipPlane

      return this .shaderCache .get (key) ?? this .createShader (key, renderContext);
   },
   createShader (key, renderContext)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext (),
         options = browser .getDefaultMaterial () .getShaderOptions (this .geometryContext, renderContext)
            .filter (option => !option .startsWith ("X3D_COLORSPACE_"));

      // Color Space

      switch (this .node ._colorSpace .getValue ())
      {
         case "LIN_REC709_DISPLAY":
            options .push ("X3D_COLORSPACE_LINEAR");
            break;
         default: // "SRGB_REC709_DISPLAY"
            options .push ("X3D_COLORSPACE_SRGB");
            break;
      }

      // Spherical Harmonics

      for (const [degree, coefs] of SH_COEFS .entries ())
      {
         const filled = Array .from ({ length: coefs }, (_, coef) => this .node .getField (`sphericalHarmonicsDegree${degree}Coef${coef}`) .length) .some (length => length);

         if (!filled)
            break;

         options .push (`X3D_GAUSSIAN_SPLATTING_DEGREE_${degree}`);
      }

      // Shader

      const shaderNode = browser .createShader ({
         name: "GaussianSplats",
         vertexShader: "GaussianSplats",
         fragmentShader: "GaussianSplats",
         options,
         attributes: ["x3d_SplatIndex"],
         uniforms: [
            "x3d_PositionsTexture",
            "x3d_OrientationsTexture",
            "x3d_ScalesTexture",
            "x3d_OpacitiesTexture",
            "x3d_SphericalHarmonicsTexture",
            "x3d_FocalLength",
         ],
      });

      this .shaderCache .set (key, shaderNode);

      // Static Uniforms

      shaderNode .enable (gl);

      gl .uniform1i (shaderNode .x3d_PositionsTexture,          this .positionsTextureUnit);
      gl .uniform1i (shaderNode .x3d_OrientationsTexture,       this .orientationsTextureUnit);
      gl .uniform1i (shaderNode .x3d_ScalesTexture,             this .scalesTextureUnit);
      gl .uniform1i (shaderNode .x3d_OpacitiesTexture,          this .opacitiesTextureUnit);
      gl .uniform1i (shaderNode .x3d_SphericalHarmonicsTexture, this .sphericalHarmonicsTextureUnit);

      return shaderNode;
   },
   createPointingShader (options)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Shader

      const shaderNode = browser .createShader ({
         name: "GaussianSplatsPointing",
         vertexShader: "GaussianSplats",
         fragmentShader: "GaussianSplats",
         options,
         attributes: ["x3d_SplatIndex"],
         uniforms: [
            "x3d_PositionsTexture",
            "x3d_OrientationsTexture",
            "x3d_ScalesTexture",
            "x3d_OpacitiesTexture",
            "x3d_FocalLength",
         ],
      });

      // Static Uniforms

      shaderNode .enable (gl);

      gl .uniform1i (shaderNode .x3d_PositionsTexture,    this .positionsTextureUnit);
      gl .uniform1i (shaderNode .x3d_OrientationsTexture, this .orientationsTextureUnit);
      gl .uniform1i (shaderNode .x3d_ScalesTexture,       this .scalesTextureUnit);
      gl .uniform1i (shaderNode .x3d_OpacitiesTexture,    this .opacitiesTextureUnit);

      return shaderNode;
   },
   createDepthShader (options)
   {
      return this .createPointingShader (options);
   },
   initSortWorker ()
   {
      if (!this .getBrowser () .getBrowserOption ("LoadUrlObjects"))
         return;

      // Terminate existing worker.

      this .sortWorker ?.terminate ();

      // Load worker.

      const
         content = `import "${URLs .getLibraryURL ("mkkellogg-sort.worker.js")}";`,
         url     = URL .createObjectURL (new Blob ([content], { type: "text/javascript" }));

      this .sortWorker = new Worker (url, { type: "module" });

      URL .revokeObjectURL (url);

      // Connect events.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .sortWorker .onmessage = event =>
      {
         // console .log (event .data .type);

         this .sortPending = false;

         switch (event .data .type)
         {
            case "ready":
            {
               this .sortModelViewMatrix .fill (0);
               browser .addBrowserEvent ();
               break;
            }
            case "sorted":
            {
               gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
               gl .bufferData (gl .ARRAY_BUFFER, event .data .indices, gl .DYNAMIC_DRAW);

               browser .addBrowserEvent ();
               break;
            }
            case "error":
            {
               console .error ("Sort worker error:", event .data .message);
               break;
            }
         }
      };

      this .sortWorker .onerror = error =>
      {
         console .error (error);

         this .sortPending = false;
      };

      // Transfer positions buffer to the worker.

      this .sortWorker .postMessage ({
         type: "init",
         positions: this .node ._positions .getValue () .subarray (0, this .numSplats * 3),
         splatCount: this .numSplats,
      });

      this .sortPending = true;
   },
   sortIndices (viewMatrix)
   {
      this .currentModelViewMatrix .set (viewMatrix);

      if (this .sortPending)
         return;

      if (Matrix4 .prototype .equals .call (this .currentModelViewMatrix, this .sortModelViewMatrix))
         return;

      this .sortModelViewMatrix .set (viewMatrix);

      this .sortWorker ?.postMessage ({
         type: "sort",
         viewMatrix: this .sortModelViewMatrix,
      });

      this .sortPending = true;
   },
});

Object .defineProperties (GaussianSplatsShape,
{
   ... X3DNode .getStaticProperties ("GaussianSplatsShape", "X_ITE", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pointerEvents", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",      new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",      new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default GaussianSplatsShape;

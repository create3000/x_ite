import ComposedShader              from "./Shaders/ComposedShader.js";
import FloatVertexAttribute        from "./Shaders/FloatVertexAttribute.js";
import Matrix3VertexAttribute      from "./Shaders/Matrix3VertexAttribute.js";
import Matrix4VertexAttribute      from "./Shaders/Matrix4VertexAttribute.js";
import PackagedShader              from "./Shaders/PackagedShader.js";
import ProgramShader               from "./Shaders/ProgramShader.js";
import ShaderPart                  from "./Shaders/ShaderPart.js";
import ShaderProgram               from "./Shaders/ShaderProgram.js";
import X3DProgrammableShaderObject from "./Shaders/X3DProgrammableShaderObject.js";
import X3DShaderNode               from "./Shaders/X3DShaderNode.js";
import X3DVertexAttributeNode      from "./Shaders/X3DVertexAttributeNode.js";

export default {
   name: "Shaders",
   concreteNodes:
   [
      ComposedShader,
      FloatVertexAttribute,
      Matrix3VertexAttribute,
      Matrix4VertexAttribute,
      PackagedShader,
      ProgramShader,
      ShaderPart,
      ShaderProgram,
   ],
   abstractNodes:
   [
      X3DProgrammableShaderObject,
      X3DShaderNode,
      X3DVertexAttributeNode,
   ],
};

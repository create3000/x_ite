import Types from "../../../assets/shaders/Types.glsl.js";

const ShaderSource =
{
   getSource (gl, browser, source, options)
   {
      const
         COMMENTS     = "\\s+|/\\*[\\s\\S]*?\\*/|//.*?\\n",
         LINE         = "#line\\s+.*?\\n",
         IF           = "#if\\s+.*?\\n",
         ELIF         = "#elif\\s+.*?\\n",
         IFDEF        = "#ifdef\\s+.*?\\n",
         IFNDEF       = "#ifndef\\s+.*?\\n",
         ELSE         = "#else.*?\\n",
         ENDIF        = "#endif.*?\\n",
         DEFINE       = "#define\\s+(?:[^\\n\\\\]|\\\\[^\\r\\n]|\\\\\\r?\\n)*\\n",
         UNDEF        = "#undef\\s+.*?\\n",
         PRAGMA       = "#pragma\\s+.*?\\n",
         PREPROCESSOR =  `${LINE}|${IF}|${ELIF}|${IFDEF}|${IFNDEF}|${ELSE}|${ENDIF}|${DEFINE}|${UNDEF}|${PRAGMA}`,
         VERSION      = "#version\\s+.*?\\n",
         EXTENSION    = "#extension\\s+.*?\\n";

      const
         GLSL  = new RegExp (`^((?:${COMMENTS}|${PREPROCESSOR})*(?:${VERSION})?(?:${COMMENTS}|${PREPROCESSOR}|${EXTENSION})*)`, "s"),
         match = source .match (GLSL);

      // const
      //    COMMENTS = "\\s+|/\\*.*?\\*/|//.*?\\n",
      //    VERSION  = "#version\\s+.*?\\n",
      //    ANY      = ".*";

      // const
      //    GLSL  = new RegExp ("^((?:" + COMMENTS + ")?(?:" + VERSION + ")?)(" + ANY + ")$", "s"),
      //    match = source .match (GLSL);

      if (!match)
         return source;

      // Constants

      const defines = /* glsl */ `
      ${options .map (option => `#define ${option}`) .join ("\n")}

      #define x3d_MaxLights ${browser .getMaxLights ()}
      `;

      // Adjust precision of struct types;

      const
         matchFloat     = source .match (/\s*precision\s+(lowp|mediump|highp)\s+float\s*;/),
         matchInt       = source .match (/\s*precision\s+(lowp|mediump|highp)\s+int\s*;/),
         precisionFloat = matchFloat ?.[1] ?? "mediump",
         precisionInt   = matchInt   ?.[1] ?? "mediump";

      const types = Types ()
         .replace (/mediump\s+(float|vec2|vec3|mat3|mat4)/g, `${precisionFloat} \$1`)
         .replace (/mediump\s+(int)/g,                       `${precisionInt} \$1`);

      const lines = (match [1] .match (/\n/g) ?.length ?? 0) + 1;

      return `${match [1]}${defines}${types}#line ${lines + 1} -1\n${source .substring (match [0] .length)}`;
   },
};

// function depreciatedWarning (source, depreciated, current)
// {
//    if (source .indexOf (depreciated) === -1)
//       return;

//    console .warn ("Use of '" + depreciated + "' is depreciated, use '" + current + "' instead. See https://create3000.github.io/x_ite/custom-shaders.");
// }

export default ShaderSource;

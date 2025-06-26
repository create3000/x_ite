import ShaderRegistry from "./ShaderRegistry.js";

const include = /^\s*#pragma\s+X3D\s+include\s+".*?([^\/]+)\.glsl"\s*$/;

function ShaderCompiler (gl)
{
   this .includes          = ShaderRegistry .includes [gl .getVersion ()];
   this .sourceFileNumbers = { };

   for (const [i, name] of Object .getOwnPropertyNames (this .includes) .entries ())
      this .sourceFileNumbers [name] = i + 1;
}

Object .assign (ShaderCompiler .prototype,
{
   getSourceFileName (sourceFileNumber)
   {
      return Object .getOwnPropertyNames (this .includes) [sourceFileNumber - 1];
   },
   process (source, parent = 0)
   {
      const lines = source .split ("\n");

      source = "";

      for (const [i, line] of lines .entries ())
      {
         const match = line .match (include);

         if (match)
         {
            source += `#line 1 ${this .sourceFileNumbers [match [1]] ?? 0}\n`;
            source += this .process (this .includes [match [1]] ?.() ?? "", this .sourceFileNumbers [match [1]] ?? 0);
            source += "\n";
            source += `#line ${i + 2} ${parent}\n`;
         }
         else
         {
            source += line;
            source += "\n";
         }
      }

      return source;
   },
});

export default ShaderCompiler;

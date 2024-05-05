window .X_ITE = new Promise (async resolve =>
{
   try
   {
      const version = document .currentScript .getAttribute ("version") ?? "latest";

      const { default: X3D } = await import (`https://cdn.jsdelivr.net/npm/x_ite@${version}/dist/x_ite.min.mjs`);

      jQuery (() => resolve (X3D));
   }
   catch
   {
      const { default: X3D } = await import ("https://create3000.github.io/code/x_ite/latest/x_ite.min.mjs");

      jQuery (() => resolve (X3D));
   }
});

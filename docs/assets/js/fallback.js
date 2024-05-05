if (typeof X3D !== "undefined")
{
   window .X_ITE = Promise .resolve (X3D);
}
else
{
   window .X_ITE = new Promise (async resolve =>
   {
      const { default: X3D } = await import ("https://create3000.github.io/code/x_ite/latest/x_ite.min.mjs");

      resolve (X3D);
   });
}

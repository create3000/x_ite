const Namespace = { };

Object .defineProperty (Namespace, "add",
{
   value (name, module)
   {
      if (Namespace .hasOwnProperty (name))
      {
         console .error (new Error (`Namespace: "${name}" already exists.`));
         return module;
      }

      const X3D = window [Symbol .for ("X_ITE.X3D")];

      if (X3D)
         X3D [name] = module;

      // For x_ite.js:
      return Namespace [name] = module;
   },
});

export default Namespace .add ("Namespace", Namespace);

import X3D              from "./x_ite/X3D.js";
import X3DCanvasElement from "./x_ite/X3DCanvasElement.js";

// Assign X3D to global namespace.

window [Symbol .for ("X_ITE.X3D")] = X3D;

// Activate extensions.

function activateExtensions (X3D)
{
   const
      _extensions = Symbol .for ("X_ITE.extensions"),
      extensions  = window [_extensions];

   if (Array .isArray (extensions))
   {
      for (const extension of extensions)
         extension (X3D);
   }

   delete window [_extensions];
}

activateExtensions (X3D);

// Define <x3d-canvas> element.

customElements .define ("x3d-canvas", X3DCanvasElement);

X3D ();

export default X3D;

import X3D              from "./x_ite/X3D.js";
import X3DCanvasElement from "./x_ite/X3DCanvasElement.js";

// Assign X3D to global namespace.

window [Symbol .for ("X_ITE.X3D")] = X3D;

customElements .define ("x3d-canvas", X3DCanvasElement);

X3D ();

export default X3D;

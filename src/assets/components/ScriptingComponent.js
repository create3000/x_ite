import Components          from "../../x_ite/Components.js";
import Script              from "../../x_ite/Components/Scripting/Script.js";
import X3DScriptNode       from "../../x_ite/Components/Scripting/X3DScriptNode.js";

Components .add ({
   name: "Scripting",
   concreteNodes:
   [
      Script,
   ],
   abstractNodes:
   [
      X3DScriptNode,
   ],
});

export default undefined;

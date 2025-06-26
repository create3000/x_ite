import Components       from "../../x_ite/Components.js";
import X3DTextContext   from "../../x_ite/Browser/Text/X3DTextContext.js"
import FontStyle        from "../../x_ite/Components/Text/FontStyle.js";
import Text             from "../../x_ite/Components/Text/Text.js";
import X3DFontStyleNode from "../../x_ite/Components/Text/X3DFontStyleNode.js";

Components .add ({
   name: "Text",
   concreteNodes:
   [
      FontStyle,
      Text,
   ],
   abstractNodes:
   [
      X3DFontStyleNode,
   ],
   browserContext: X3DTextContext,
});

export default undefined;

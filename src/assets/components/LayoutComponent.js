import Components       from "../../x_ite/Components.js";
import X3DLayoutContext from "../../x_ite/Browser/Layout/X3DLayoutContext.js";
import Layout           from "../../x_ite/Components/Layout/Layout.js";
import LayoutGroup      from "../../x_ite/Components/Layout/LayoutGroup.js";
import LayoutLayer      from "../../x_ite/Components/Layout/LayoutLayer.js";
import ScreenFontStyle  from "../../x_ite/Components/Layout/ScreenFontStyle.js";
import ScreenGroup      from "../../x_ite/Components/Layout/ScreenGroup.js";
import X3DLayoutNode    from "../../x_ite/Components/Layout/X3DLayoutNode.js";

Components .add ({
   name: "Layout",
   concreteNodes:
   [
      Layout,
      LayoutGroup,
      LayoutLayer,
      ScreenFontStyle,
      ScreenGroup,
   ],
   abstractNodes:
   [
      X3DLayoutNode,
   ],
   browserContext: X3DLayoutContext,
});

export default undefined;

import Components        from "../../x_ite/Components.js";
import AnnotationLayer   from "../../x_ite/Components/Annotation/AnnotationLayer.js";
import AnnotationTarget  from "../../x_ite/Components/Annotation/AnnotationTarget.js";
import GroupAnnotation   from "../../x_ite/Components/Annotation/GroupAnnotation.js";
import IconAnnotation    from "../../x_ite/Components/Annotation/IconAnnotation.js";
import TextAnnotation    from "../../x_ite/Components/Annotation/TextAnnotation.js";
import URLAnnotation     from "../../x_ite/Components/Annotation/URLAnnotation.js";
import X3DAnnotationNode from "../../x_ite/Components/Annotation/X3DAnnotationNode.js";

Components .add ({
   name: "Annotation",
   concreteNodes:
   [
      AnnotationLayer,
      AnnotationTarget,
      GroupAnnotation,
      IconAnnotation,
      TextAnnotation,
      URLAnnotation,
   ],
   abstractNodes:
   [
      X3DAnnotationNode,
   ],
});

export default undefined;

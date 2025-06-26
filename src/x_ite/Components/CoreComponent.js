import MetadataBoolean      from "./Core/MetadataBoolean.js";
import MetadataDouble       from "./Core/MetadataDouble.js";
import MetadataFloat        from "./Core/MetadataFloat.js";
import MetadataInteger      from "./Core/MetadataInteger.js";
import MetadataSet          from "./Core/MetadataSet.js";
import MetadataString       from "./Core/MetadataString.js";
import WorldInfo            from "./Core/WorldInfo.js";
import X3DBindableNode      from "./Core/X3DBindableNode.js";
import X3DChildNode         from "./Core/X3DChildNode.js";
import X3DInfoNode          from "./Core/X3DInfoNode.js";
import X3DMetadataObject    from "./Core/X3DMetadataObject.js";
import X3DNode              from "./Core/X3DNode.js";
import X3DPrototypeInstance from "./Core/X3DPrototypeInstance.js";
import X3DSensorNode        from "./Core/X3DSensorNode.js";

export default {
   name: "Core",
   concreteNodes:
   [
      MetadataBoolean,
      MetadataDouble,
      MetadataFloat,
      MetadataInteger,
      MetadataSet,
      MetadataString,
      WorldInfo,
   ],
   abstractNodes:
   [
      X3DBindableNode,
      X3DChildNode,
      X3DInfoNode,
      X3DMetadataObject,
      X3DNode,
      X3DPrototypeInstance,
      X3DSensorNode,
   ],
};

import SFScalar    from "./Fields/SFScalar.js";
import SFColor     from "./Fields/SFColor.js";
import SFColorRGBA from "./Fields/SFColorRGBA.js";
import SFImage     from "./Fields/SFImage.js";
import SFMatrix3   from "./Fields/SFMatrix3.js";
import SFMatrix4   from "./Fields/SFMatrix4.js";
import SFNode      from "./Fields/SFNode.js";
import SFRotation  from "./Fields/SFRotation.js";
import SFVec2      from "./Fields/SFVec2.js";
import SFVec3      from "./Fields/SFVec3.js";
import SFVec4      from "./Fields/SFVec4.js";
import ArrayFields from "./Fields/ArrayFields.js";

const Fields = {
   SFColor:     SFColor,
   SFColorRGBA: SFColorRGBA,
   SFImage:     SFImage,
   SFNode:      SFNode,
   SFRotation:  SFRotation,
   ... SFScalar,
   ... SFMatrix3,
   ... SFMatrix4,
   ... SFVec2,
   ... SFVec3,
   ... SFVec4,
   ... ArrayFields,
};

export default Fields;

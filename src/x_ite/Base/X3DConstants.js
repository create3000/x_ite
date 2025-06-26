const X3DConstants =
{
   [Symbol .toStringTag]: "X3DConstants",
};

let CONSTANT_VALUE = 1000;

Object .defineProperty (X3DConstants, "addConstant",
{
   value (name, value)
   {
      if (this .hasOwnProperty (name) || this .hasOwnProperty (value))
         return;

      Object .defineProperty (this, name,
      {
         value: value ?? ++ CONSTANT_VALUE,
         enumerable: true,
      });

      Object .defineProperty (this, this [name],
      {
         value: name,
      });
   },
});

Object .entries ({
   // Access types

   initializeOnly: 0b001,
   inputOnly:      0b010,
   outputOnly:     0b100,
   inputOutput:    0b111,
})
.forEach (([name, value]) => X3DConstants .addConstant (name, value));

[
   // Browser events

   "CONNECTION_ERROR",
   "BROWSER_EVENT",
   "INITIALIZED_EVENT",
   "SHUTDOWN_EVENT",
   "INITIALIZED_ERROR",

   // Load states

   "NOT_STARTED_STATE",
   "IN_PROGRESS_STATE",
   "COMPLETE_STATE",
   "FAILED_STATE",

   // X3DField

   "SFBool",
   "SFColor",
   "SFColorRGBA",
   "SFDouble",
   "SFFloat",
   "SFImage",
   "SFInt32",
   "SFMatrix3d",
   "SFMatrix3f",
   "SFMatrix4d",
   "SFMatrix4f",
   "SFNode",
   "SFRotation",
   "SFString",
   "SFTime",
   "SFVec2d",
   "SFVec2f",
   "SFVec3d",
   "SFVec3f",
   "SFVec4d",
   "SFVec4f",

   "VrmlMatrix",

   // X3DArrayField

   "MFBool",
   "MFColor",
   "MFColorRGBA",
   "MFDouble",
   "MFFloat",
   "MFImage",
   "MFInt32",
   "MFMatrix3d",
   "MFMatrix3f",
   "MFMatrix4d",
   "MFMatrix4f",
   "MFNode",
   "MFRotation",
   "MFString",
   "MFTime",
   "MFVec2d",
   "MFVec2f",
   "MFVec3d",
   "MFVec3f",
   "MFVec4d",
   "MFVec4f",

   // Abstract and concrete nodes and nodes types are added later.

   "X3DBaseNode",
]
.forEach (name => X3DConstants .addConstant (name));

export default X3DConstants;

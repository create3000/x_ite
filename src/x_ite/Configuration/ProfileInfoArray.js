import X3DInfoArray       from "../Base/X3DInfoArray.js";
import ComponentInfoArray from "./ComponentInfoArray.js";
import ProfileInfo        from "./ProfileInfo.js";

function ProfileInfoArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .name, value]), ProfileInfo);
}

Object .assign (Object .setPrototypeOf (ProfileInfoArray .prototype, X3DInfoArray .prototype),
{
   add (name, { title, providerURL, components })
   {
      X3DInfoArray .prototype .add .call (this, name, new ProfileInfo (name, title, providerURL, new ComponentInfoArray (components)));
   },
});

for (const key of Object .keys (ProfileInfoArray .prototype))
   Object .defineProperty (ProfileInfoArray .prototype, key, { enumerable: false });

Object .defineProperties (ProfileInfoArray,
{
   typeName:
   {
      value: "ProfileInfoArray",
      enumerable: true,
   },
});

export default ProfileInfoArray;

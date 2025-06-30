import X3DInfoArray  from "../Base/X3DInfoArray.js";
import ComponentInfo from "./ComponentInfo.js";

function ComponentInfoArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .name, value]), ComponentInfo);
}

Object .assign (Object .setPrototypeOf (ComponentInfoArray .prototype, X3DInfoArray .prototype),
{
   add (name, { level, title, providerURL, external = false, dependencies = [ ] })
   {
      X3DInfoArray .prototype .add .call (this, name, new ComponentInfo (name, level, title, providerURL, external, dependencies));
   },
});

for (const key of Object .keys (ComponentInfoArray .prototype))
   Object .defineProperty (ComponentInfoArray .prototype, key, { enumerable: false });

Object .defineProperties (ComponentInfoArray,
{
   typeName:
   {
      value: "ComponentInfoArray",
      enumerable: true,
   },
});

export default ComponentInfoArray;

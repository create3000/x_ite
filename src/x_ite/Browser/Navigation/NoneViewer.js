import X3DViewer from "./X3DViewer.js";

function NoneViewer (executionContext, navigationInfo)
{
   X3DViewer .call (this, executionContext, navigationInfo);
}

Object .setPrototypeOf (NoneViewer .prototype, X3DViewer .prototype);

Object .defineProperties (NoneViewer,
{
   typeName:
   {
      value: "NoneViewer",
      enumerable: true,
   },
});

export default NoneViewer;

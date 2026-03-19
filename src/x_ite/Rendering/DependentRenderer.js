import X3DBaseNode     from "../Base/X3DBaseNode.js";
import X3DRenderObject from "./X3DRenderObject.js";
import TraverseType    from "./TraverseType.js";

function DependentRenderer (executionContext, renderObject)
{
   X3DBaseNode     .call (this, executionContext);
   X3DRenderObject .call (this, executionContext);

   this .renderObject = renderObject;
   this .framebuffers = [ ];
}

Object .assign (Object .setPrototypeOf (DependentRenderer .prototype, X3DBaseNode .prototype),
   X3DRenderObject .prototype,
{
   initialize ()
   {
      X3DBaseNode     .prototype .initialize .call (this);
      X3DRenderObject .prototype .initialize .call (this);
   },
   isIndependent ()
   {
      return false;
   },
   getLayer ()
   {
      return this .renderObject .getLayer ();
   },
   getBackground ()
   {
      return this .backgroundNode ?? this .renderObject .getBackground ();
   },
   setBackground (backgroundNode)
   {
      this .backgroundNode = backgroundNode;
   },
   getFog ()
   {
      return this .fogNode ?? this .renderObject .getFog ();
   },
   setFog (fogNode)
   {
      this .fogNode = fogNode;
   },
   getNavigationInfo ()
   {
      return this .renderObject .getNavigationInfo ();
   },
   getViewpoint ()
   {
      return this .renderObject .getViewpoint ();
   },
   getViewpointStack ()
   {
      return this .renderObject .getViewpointStack ();
   },
   getLightContainer (path)
   {
      return this .renderObject .getLights () .get (path);
   },
   getFramebuffers ()
   {
      return this .framebuffers;
   },
   setFramebuffer (frameBuffer)
   {
      this .framebuffers [0] = frameBuffer;
   },
   render (type, callback, group)
   {
      switch (type)
      {
         case TraverseType .DISPLAY:
         {
            X3DRenderObject .prototype .render .call (this, type, callback, group);

            for (const light of this .renderObject .getLights () .values ())
               light .modelViewMatrix .pop ();

            break;
         }
         default:
         {
            X3DRenderObject .prototype .render .call (this, type, callback, group);
            break;
         }
      }
   },
});

for (const key of Object .keys (DependentRenderer .prototype))
   Object .defineProperty (DependentRenderer .prototype, key, { enumerable: false });

export default DependentRenderer;

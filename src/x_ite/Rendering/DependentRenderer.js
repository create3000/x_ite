import X3DBaseNode     from "../Base/X3DBaseNode.js";
import X3DRenderObject from "./X3DRenderObject.js";
import TraverseType    from "./TraverseType.js";

function DependentRenderer (executionContext, renderObject, node)
{
   X3DBaseNode     .call (this, executionContext);
   X3DRenderObject .call (this, executionContext);

   this .renderObject = renderObject;
   this .node         = node;
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
   getNode ()
   {
      return this .node;
   },
   getLayer ()
   {
      return this .renderObject .getLayer ();
   },
   getBackground ()
   {
      return this .renderObject .getBackground ();
   },
   getFog ()
   {
      return this .renderObject .getFog ();
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
   getLightContainer ()
   {
      return this .renderObject .getLights () [this .lightIndex ++];
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
         case TraverseType .COLLISION:
         {
            X3DRenderObject .prototype .render .call (this, type, callback, group);
            break;
         }
         case TraverseType .SHADOW:
         {
            X3DRenderObject .prototype .render .call (this, type, callback, group);
            break;
         }
         case TraverseType .DISPLAY:
         {
            this .lightIndex = 0;

            X3DRenderObject .prototype .render .call (this, type, callback, group);

            for (const light of this .renderObject .getLights ())
               light .modelViewMatrix .pop ();

            break;
         }
      }
   },
});

for (const key of Object .keys (DependentRenderer .prototype))
   Object .defineProperty (DependentRenderer .prototype, key, { enumerable: false });

export default DependentRenderer;

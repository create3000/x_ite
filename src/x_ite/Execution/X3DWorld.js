import SFNode         from "../Fields/SFNode.js";
import X3DBaseNode    from "../Base/X3DBaseNode.js";
import LayerSet       from "../Components/Layering/LayerSet.js";
import Layer          from "../Components/Layering/Layer.js";
import X3DCast        from "../Base/X3DCast.js";
import X3DConstants   from "../Base/X3DConstants.js";

function X3DWorld (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addType (X3DConstants .X3DWorld)

   this .addChildObjects (X3DConstants .outputOnly, "activeLayer", new SFNode (this .layer0));

   this .defaultLayerSet = new LayerSet (executionContext);
   this .layerSet        = this .defaultLayerSet;
   this .layer0          = new Layer (executionContext);
}

Object .assign (Object .setPrototypeOf (X3DWorld .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .layerSet .setPrivate (true);
      this .layerSet .setup ();
      this .layerSet .setLayer0 (this .layer0);
      this .layerSet ._activeLayer .addInterest ("set_rootNodes__", this);

      this .getExecutionContext () .getRootNodes () .addInterest ("set_rootNodes__", this);

      this .set_rootNodes__ ();

      this .layer0 .setPrivate (true);
      this .layer0 .setLayer0 (true);
      this .layer0 .setup ();

      this .set_activeLayer__ ();
   },
   getCache ()
   {
      return this .getBrowser () .getBrowserOption ("Cache");
   },
   getLayerSet ()
   {
      return this .layerSet;
   },
   getActiveLayer ()
   {
      return this ._activeLayer .getValue ();
   },
   getLayer0 ()
   {
      return this .layer0;
   },
   set_rootNodes__ ()
   {
      const
         oldLayerSet = this .layerSet,
         rootNodes   = this .getExecutionContext () .getRootNodes ();

      this .layerSet          = this .defaultLayerSet;
      this .layer0 ._children = rootNodes;

      for (const rootNode of rootNodes)
      {
         const layerSet = X3DCast (X3DConstants .LayerSet, rootNode);

         if (layerSet)
            this .layerSet = layerSet;
      }

      if (this .layerSet === oldLayerSet)
         return;

      this .layerSet .setLayer0 (this .layer0);

      oldLayerSet    ._activeLayerNode .removeInterest ("set_activeLayer__", this);
      this .layerSet ._activeLayerNode .addInterest    ("set_activeLayer__", this);

      this .set_activeLayer__ ();
   },
   set_activeLayer__ ()
   {
      this ._activeLayer = this .layerSet .getActiveLayer ();
   },
   bindBindables ()
   {
      // Bind first X3DBindableNodes found in each layer.

      const worldURL = this .getExecutionContext () .getWorldURL ();

      this .layerSet .bindBindables (decodeURIComponent (new URL (worldURL) .hash .substring (1)));
   },
   traverse (type, renderObject)
   {
      this .layerSet .traverse (type, renderObject);
   },
});

for (const key of Object .keys (X3DWorld .prototype))
   Object .defineProperty (X3DWorld .prototype, key, { enumerable: false });

Object .defineProperties (X3DWorld,
{
   typeName:
   {
      value: "X3DWorld",
      enumerable: true,
   },
});

X3DConstants .addConstant (X3DWorld .typeName);

export default X3DWorld;

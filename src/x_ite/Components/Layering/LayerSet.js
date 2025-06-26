import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import Layer                from "./Layer.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function LayerSet (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .LayerSet);

   this .addChildObject (X3DConstants .outputOnly, "activeLayerNode",  new Fields .SFNode ());

   this .layerNodes = [ new Layer (executionContext) ];
   this .layerNode0 = this .layerNodes [0];
}

Object .assign (Object .setPrototypeOf (LayerSet .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this .layerNode0 .setPrivate (true);
      this .layerNode0 .setup ();
      this .layerNode0 .setLayer0 (true);

      this ._activeLayer .addInterest ("set_activeLayer__", this);
      this ._order       .addInterest ("set_layers__",      this);
      this ._layers      .addInterest ("set_layers__",      this);

      this .set_layers__ ();
   },
   getActiveLayer ()
   {
      return this ._activeLayerNode .getValue ();
   },
   getLayer0 ()
   {
      return this .layerNode0;
   },
   setLayer0 (value)
   {
      this .layerNode0 = value;

      this .set_layers__ ();
   },
   getLayers ()
   {
      return this .layerNodes;
   },
   set_activeLayer__ ()
   {
      if (this ._activeLayer .getValue () === 0)
      {
         var activeLayerNode = this .layerNode0;
      }
      else
      {
         const index = this ._activeLayer .getValue () - 1;

         if (index >= 0 && index < this ._layers .length)
         {
            var activeLayerNode = X3DCast (X3DConstants .X3DLayerNode, this ._layers [index]);
         }
         else
         {
            var activeLayerNode = null;
         }
      }

      if (!activeLayerNode ?._display .getValue ())
         activeLayerNode = null;

      if (this ._activeLayerNode .getValue () !== activeLayerNode)
         this ._activeLayerNode = activeLayerNode;
   },
   set_layers__ ()
   {
      const layers = this ._layers .getValue ();

      for (const layerNode of this .layerNodes)
         layerNode ._display .removeInterest ("set_layers__", this);

      this .layerNodes .length = 0;

      for (let index of this ._order)
      {
         if (index === 0)
         {
            this .layerNode0 ._display .addInterest ("set_layers__", this);
            this .layerNodes .push (this .layerNode0);
         }
         else
         {
            -- index;

            if (index >= 0 && index < layers .length)
            {
               const layerNode = X3DCast (X3DConstants .X3DLayerNode, layers [index]);

               if (!layerNode)
                  continue;

               layerNode ._display .addInterest ("set_layers__", this);

               if (layerNode ._display .getValue ())
                  this .layerNodes .push (layerNode);
            }
         }
      }

      this .set_activeLayer__ ();
   },
   bindBindables (viewpointName)
   {
      this .layerNode0 ?.bindBindables (viewpointName);

      for (const node of this ._layers)
      {
         const layerNode = X3DCast (X3DConstants .X3DLayerNode, node);

         layerNode ?.bindBindables (viewpointName);
      }
   },
   traverse (type, renderObject)
   {
      for (const layerNode of this .layerNodes)
         layerNode .traverse (type, renderObject);
   },
});

Object .defineProperties (LayerSet,
{
   ... X3DNode .getStaticProperties ("LayerSet", "Layering", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "activeLayer", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "order",       new Fields .MFInt32 (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "layers",      new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default LayerSet;

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DViewportNode      from "./X3DViewportNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";
import ViewVolume           from "../../../standard/Math/Geometry/ViewVolume.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

const ViewVolumes = ObjectCache (ViewVolume);

function Viewport (executionContext)
{
   X3DViewportNode .call (this, executionContext);

   this .addType (X3DConstants .Viewport);

   this .rectangle = new Vector4 ();
}

Object .assign (Object .setPrototypeOf (Viewport .prototype, X3DViewportNode .prototype),
{
   initialize ()
   {
      X3DViewportNode .prototype .initialize .call (this);

      this ._clipBoundary .addInterest ("set_clipBoundary__", this);

      this .set_clipBoundary__ ();
   },
   set_clipBoundary__ ()
   {
      this .left   = this ._clipBoundary .length > 0 ? Algorithm .clamp (this ._clipBoundary [0], 0, 1) : 0;
      this .right  = this ._clipBoundary .length > 1 ? Algorithm .clamp (this ._clipBoundary [1], 0, 1) : 1;
      this .bottom = this ._clipBoundary .length > 2 ? Algorithm .clamp (this ._clipBoundary [2], 0, 1) : 0;
      this .top    = this ._clipBoundary .length > 3 ? Algorithm .clamp (this ._clipBoundary [3], 0, 1) : 1;
   },
   getRectangle (viewport = this .getBrowser () .getViewport ())
   {
      const
         left   = Math .floor (viewport [0] + viewport [2] * this .left),
         right  = Math .floor (viewport [0] + viewport [2] * this .right),
         bottom = Math .floor (viewport [1] + viewport [3] * this .bottom),
         top    = Math .floor (viewport [1] + viewport [3] * this .top);

      this .rectangle .set (left,
                            bottom,
                            Math .max (right - left, 0),
                            Math .max (top - bottom, 0));

      return this .rectangle;
   },
   traverse (type, renderObject)
   {
      try
      {
         this .push (renderObject);

         switch (type)
         {
            case TraverseType .POINTER:
            {
               const
                  browser  = this .getBrowser (),
                  viewport = this .rectangle;

               if (!browser .getPointingLayer ())
               {
                  if (!browser .isPointerInRectangle (viewport))
                     return;
               }

               // Proceed with next case:
            }
            default:
            {
               X3DViewportNode .prototype .traverse .call (this, type, renderObject);
               break;
            }
         }
      }
      finally
      {
         this .pop (renderObject);
      }
   },
   push (renderObject)
   {
      const
         viewVolumes = renderObject .getViewVolumes (),
         viewVolume  = ViewVolumes .pop (),
         rectangle   = this .getRectangle (viewVolumes .at (-1) ?.getViewport ());

      viewVolume .set (renderObject .getProjectionMatrix () .get (), rectangle);

      viewVolumes .push (viewVolume);
   },
   pop (renderObject)
   {
      ViewVolumes .push (renderObject .getViewVolumes () .pop ());
   },
});

Object .defineProperties (Viewport,
{
   ... X3DNode .getStaticProperties ("Viewport", "Layering", 1, "viewport", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "clipBoundary",   new Fields .MFFloat (0, 1, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Viewport;

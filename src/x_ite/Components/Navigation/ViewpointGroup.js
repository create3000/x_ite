import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import ProximitySensor      from "../EnvironmentalSensor/ProximitySensor.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function ViewpointGroup (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .ViewpointGroup);

   this .setCameraObject  (true);
   this .setVisibleObject (true);

   // Units

   this ._size   .setUnit ("length");
   this ._center .setUnit ("length");

   // Private properties

   this .proximitySensor = new ProximitySensor (executionContext);
   this .cameraObjects   = [ ];
   this .viewpointGroups = [ ];
}

Object .assign (Object .setPrototypeOf (ViewpointGroup .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._size     .addInterest ("set_size__",     this);
      this ._children .addInterest ("set_children__", this);

      this ._size   .addFieldInterest (this .proximitySensor ._size);
      this ._center .addFieldInterest (this .proximitySensor ._center);

      this .proximitySensor ._isActive .addInterest ("set_active__", this);

      this .proximitySensor ._size   = this ._size;
      this .proximitySensor ._center = this ._center;

      this .proximitySensor .setup ();

      this .set_size__ ();
      this .set_children__ ();
   },
   getDisplayed ()
   {
      return this .displayed;
   },
   set_size__ ()
   {
      this .proximitySensor ._enabled = !this ._size .getValue () .equals (Vector3 .Zero);

      this .set_active__ ();
   },
   set_active__ ()
   {
      const proximitySensor = this .proximitySensor;

      this .active    = proximitySensor ._isActive .getValue () || !proximitySensor ._enabled .getValue ();
      this .displayed = this ._displayed .getValue () && this .active;
   },
   set_children__ ()
   {
      this .cameraObjects   .length = 0;
      this .viewpointGroups .length = 0;

      for (const child of this ._children)
      {
         const childNode = X3DCast (X3DConstants .X3DChildNode, child);

         if (!childNode)
            continue;

         const type = childNode .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .X3DViewpointNode:
               {
                  this .cameraObjects .push (childNode);
                  break;
               }
               case X3DConstants .ViewpointGroup:
               {
                  this .cameraObjects   .push (childNode);
                  this .viewpointGroups .push (childNode);
                  break;
               }
               default:
                  continue;
            }

            break;
         }
      }

      this .setCameraObject  (this .cameraObjects .length);
      this .setVisibleObject (this .cameraObjects .length);
   },
   traverse (type, renderObject)
   {
      this .proximitySensor .traverse (type, renderObject);

      switch (type)
      {
         case TraverseType .CAMERA:
         {
            renderObject .getViewpointGroups () .push (this);

            for (const cameraObject of this .cameraObjects)
               cameraObject .traverse (type, renderObject);

            renderObject .getViewpointGroups () .pop ();
            return;
         }
         case TraverseType .DISPLAY:
         {
            if (this .active)
            {
               for (const viewpointGroup of this .viewpointGroups)
                  viewpointGroup .traverse (type, renderObject);
            }

            return;
         }
      }
   },
});

Object .defineProperties (ViewpointGroup,
{
   ... X3DNode .getStaticProperties ("ViewpointGroup", "Navigation", 3, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "displayed",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",              new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",            new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",          new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ViewpointGroup;

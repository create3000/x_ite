import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function LOD (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .LOD);

   this .setVisibleObject (true);

   // Units

   this ._center .setUnit ("length");
   this ._range  .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () == 2.0)
      this .addAlias ("level", this ._children); // VRML2

   // Private properties

   this .frameRate = 60;
}

Object .assign (Object .setPrototypeOf (LOD .prototype, X3DGroupingNode .prototype),
{
   addChildren ()
   { },
   removeChildren ()
   { },
   set_addChildren__ ()
   {
      X3DGroupingNode .prototype .set_addChildren__ .call (this);

      this .set_children__ ();
   },
   set_removeChildren__ ()
   {
      X3DGroupingNode .prototype .set_removeChildren__ .call (this);

      this .set_children__ ();
   },
   set_children__ ()
   {
      this .clearChildren ();

      // Add single child.

      const level = Math .min (this ._level_changed .getValue (), this ._children .length - 1);

      if (level >= 0 && level < this ._children .length)
         this .addChild (this ._children [level]);

      this .set_objects__ ();
   },
   set_visibleObjects__ ()
   { },
   getLevel: (() =>
   {
      const
         FRAMES         = 180, // Number of frames after which a level change takes in affect.
         FRAME_RATE_MIN = 20,  // Lowest level of detail.
         FRAME_RATE_MAX = 55;  // Highest level of detail.

      return function (modelViewMatrix)
      {
         if (this ._range .length === 0)
         {
            const browser = this .getBrowser ();

            this .frameRate = ((FRAMES - 1) * this .frameRate + browser .currentFrameRate) / FRAMES;

            const size = this ._children .length;

            switch (size)
            {
               case 0:
                  return -1;
               case 1:
                  return 0;
               case 2:
                  return +(this .frameRate > FRAME_RATE_MAX);
               default:
               {
                  const fraction = 1 - Algorithm .clamp ((this .frameRate - FRAME_RATE_MIN) / (FRAME_RATE_MAX - FRAME_RATE_MIN), 0, 1);

                  return Math .min (Math .floor (fraction * size), size - 1);
               }
            }
         }

         const distance = modelViewMatrix .translate (this ._center .getValue ()) .origin .norm ();

         return Algorithm .upperBound (this ._range, 0, this ._range .length, distance);
      };
   })(),
   changeLevel: (() =>
   {
      const modelViewMatrix = new Matrix4 ();

      return function (renderObject)
      {
         const currentLevel = this ._level_changed .getValue ();

         let level = this .getLevel (modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()));

         if (this ._forceTransitions .getValue ())
         {
            if (level > currentLevel)
               level = currentLevel + 1;

            else if (level < currentLevel)
               level = currentLevel - 1;
         }

         if (level === currentLevel)
            return;

         this ._level_changed = level;

         this .set_children__ ();
      };
   })(),
   traverse (type, renderObject)
   {
      if (type === TraverseType .DISPLAY)
         this .changeLevel (renderObject);

      X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
   },
});

Object .defineProperties (LOD,
{
   ... X3DNode .getStaticProperties ("LOD", "Navigation", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "forceTransitions", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "center",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "range",            new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "level_changed",    new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default LOD;

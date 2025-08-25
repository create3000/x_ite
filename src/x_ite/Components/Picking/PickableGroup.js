import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DPickableObject    from "./X3DPickableObject.js";
import MatchCriterion       from "../../Browser/Picking/MatchCriterion.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";

function PickableGroup (executionContext)
{
   X3DGroupingNode   .call (this, executionContext);
   X3DPickableObject .call (this, executionContext);

   this .addType (X3DConstants .PickableGroup);

   // Private properties

   this .pickSensorNodes = new Set ();
}

Object .assign (Object .setPrototypeOf (PickableGroup .prototype, X3DGroupingNode .prototype),
   X3DPickableObject .prototype,
{
   initialize ()
   {
      X3DGroupingNode   .prototype .initialize .call (this);
      X3DPickableObject .prototype .initialize .call (this);

      this ._pickable .addInterest ("set_pickableObjects__", this);
   },
   set_pickableObjects__ ()
   {
      this .setPickableObject (this ._pickable .getValue () || this .getTransformSensors () .size);
   },
   traverse (type, renderObject)
   {
      if (type !== TraverseType .PICKING)
      {
         X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
         return;
      }

      if (!this ._pickable .getValue ())
      {
         if (this .getTransformSensors () .size)
         {
            const modelMatrix = renderObject .getModelViewMatrix () .get ();

            for (const transformSensorNode of this .getTransformSensors ())
               transformSensorNode .collect (modelMatrix);
         }

         return;
      }

      if (this .getObjectType () .has ("NONE"))
         return;

      const
         browser       = this .getBrowser (),
         pickableStack = browser .getPickable ();

      if (this .getObjectType () .has ("ALL"))
      {
         pickableStack .push (true);
         X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
         pickableStack .pop ();
         return;
      }

      // Filter pick sensors.

      const
         pickSensorNodes = this .pickSensorNodes,
         pickSensorStack = browser .getPickSensors ();

      for (const pickSensorNode of pickSensorStack .at (-1))
      {
         if (!pickSensorNode .getObjectType () .has ("ALL"))
         {
            let intersection = 0;

            for (const objectType of this .getObjectType ())
            {
               if (pickSensorNode .getObjectType () .has (objectType))
               {
                  ++ intersection;
                  break;
               }
            }

            switch (pickSensorNode .getMatchCriterion ())
            {
               case MatchCriterion .MATCH_ANY:
               {
                  if (intersection === 0)
                     continue;

                  break;
               }
               case MatchCriterion .MATCH_EVERY:
               {
                  if (intersection !== pickSensor .getObjectType () .size)
                     continue;

                  break;
               }
               case MatchCriterion .MATCH_ONLY_ONE:
               {
                  if (intersection !== 1)
                     continue;

                  break;
               }
            }
         }

         pickSensorNodes .add (pickSensorNode);
      }

      pickableStack   .push (true);
      pickSensorStack .push (pickSensorNodes);

      X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

      pickSensorStack .pop ();
      pickableStack   .pop ();

      pickSensorNodes .clear ();
   },
   dispose ()
   {
      X3DPickableObject .prototype .dispose .call (this);
      X3DGroupingNode   .prototype .dispose .call (this);
   },
});

Object .defineProperties (PickableGroup,
{
   ... X3DNode .getStaticProperties ("PickableGroup", "Picking", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickable",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",     new Fields .MFString ("ALL")),
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

export default PickableGroup;

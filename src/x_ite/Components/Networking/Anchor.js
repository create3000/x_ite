import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DUrlObject         from "./X3DUrlObject.js";
import TouchSensor          from "../PointingDeviceSensor/TouchSensor.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import FileLoader           from "../../InputOutput/FileLoader.js";

function Anchor (executionContext)
{
   X3DGroupingNode .call (this, executionContext);
   X3DUrlObject    .call (this, executionContext);

   this .addType (X3DConstants .Anchor);

   this .touchSensorNode = new TouchSensor (executionContext);
   this .anchorSensors   = [ ];
}

Object .assign (Object .setPrototypeOf (Anchor .prototype, X3DGroupingNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);
      X3DUrlObject    .prototype .initialize .call (this);

      this ._description .addFieldInterest (this .touchSensorNode ._description);
      this ._load        .addFieldInterest (this .touchSensorNode ._enabled);

      this .touchSensorNode ._description = this ._description;
      this .touchSensorNode ._enabled     = this ._load;
      this .touchSensorNode .setup ();

      // Modify set_active__ to get immediate response to user action (click event),
      // otherwise links are not opened in this window.

      this .touchSensorNode .set_active__ = (active, hit) =>
      {
         TouchSensor .prototype .set_active__ .call (this .touchSensorNode, active, hit);

         if (this .touchSensorNode ._isOver .getValue () && !active)
            this .requestImmediateLoad () .catch (Function .prototype);
      };
   },
   set_load__ ()
   { },
   set_url__ ()
   { },
   requestImmediateLoad (cache = true)
   {
      this .setCache (cache);
      this .setLoadState (X3DConstants .IN_PROGRESS_STATE, false);

      return new Promise ((resolve, reject) =>
      {
         new FileLoader (this) .createX3DFromURL (this ._url, this ._parameter,
         (scene) =>
         {
            if (scene)
            {
               this .getBrowser () .replaceWorld (scene);
               this .setLoadState (X3DConstants .COMPLETE_STATE, false);
               resolve ();
            }
            else
            {
               this .setLoadState (X3DConstants .FAILED_STATE, false);
               reject ();
            }
         },
         (viewpointName) =>
         {
            this .getBrowser () .changeViewpoint (viewpointName);
            this .setLoadState (X3DConstants .COMPLETE_STATE, false);
            resolve ();
         },
         (url, target) =>
         {
            if (target)
               window .open (url, target);
            else
               location = url;

            this .setLoadState (X3DConstants .COMPLETE_STATE, false);
            resolve ();
         });
      });
   },
   requestUnload ()
   { },
   traverse (type, renderObject)
   {
      if (type === TraverseType .POINTER)
      {
         const sensors = this .anchorSensors;

         sensors .length = 0;

         this .touchSensorNode .push (renderObject, sensors);

         if (sensors .length)
         {
            renderObject .getSensors () .push (sensors);

            X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

            renderObject .getSensors () .pop ();
         }
         else
         {
            X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
         }
      }
      else
      {
         X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
      }
   },
   dispose ()
   {
      X3DUrlObject    .prototype .dispose .call (this);
      X3DGroupingNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (Anchor,
{
   ... X3DNode .getStaticProperties ("Anchor", "Networking", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "parameter",            new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",             new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",          new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",             new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Anchor;

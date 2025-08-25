import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DNetworkSensorNode from "./X3DNetworkSensorNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function LoadSensor (executionContext)
{
   X3DNetworkSensorNode .call (this, executionContext);

   this .addType (X3DConstants .LoadSensor);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this .addAlias ("watchList", this ._children);

   // Private properties

   this .urlObjects = [ ];
   this .aborted    = false;
   this .timeOutId  = undefined;
}

Object .assign (Object .setPrototypeOf (LoadSensor .prototype, X3DNetworkSensorNode .prototype),
{
   initialize ()
   {
      X3DNetworkSensorNode .prototype .initialize .call (this);

      this ._enabled  .addInterest ("set_enabled__",  this);
      this ._timeOut  .addInterest ("set_timeOut__",  this);
      this ._children .addInterest ("set_children__", this);

      this .set_children__ ();
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue ())
         this .reset ();

      else
      {
         this .abort ();
         this .remove ();
      }
   },
   set_timeOut__ ()
   {
      if (this ._isActive .getValue ())
      {
         this .clearTimeout ();

         this .aborted = false;

         if (this ._timeOut .getValue () > 0)
            this .timeOutId = setTimeout (this .abort .bind (this), this ._timeOut .getValue () * 1000);
      }
   },
   set_children__ ()
   {
      this .reset ();
   },
   set_loadState__ (urlObject)
   {
      switch (urlObject .checkLoadState ())
      {
         case X3DConstants .NOT_STARTED_STATE:
            break;
         case X3DConstants .IN_PROGRESS_STATE:
         case X3DConstants .COMPLETE_STATE:
         case X3DConstants .FAILED_STATE:
         {
            this .count ();
            break;
         }
      }
   },
   count ()
   {
      const urlObjects = this .urlObjects;

      if (urlObjects .length)
      {
         let
            complete = 0,
            failed   = 0;

         for (const urlObject of urlObjects)
         {
            complete += urlObject .checkLoadState () == X3DConstants .COMPLETE_STATE;
            failed   += urlObject .checkLoadState () == X3DConstants .FAILED_STATE;
         }

         const
            loaded   = complete === urlObjects .length,
            progress = complete / urlObjects .length;

         if (this .aborted || failed || loaded)
         {
            this .clearTimeout ();

            this ._isActive = false;
            this ._isLoaded = loaded;
            this ._progress = progress;

            if (loaded)
               this ._loadTime = this .getBrowser () .getCurrentTime ();
         }
         else
         {
            if (this ._isActive .getValue ())
            {
               this ._progress = progress;
            }
            else
            {
               this ._isActive = true;
               this ._progress = progress;

               this .set_timeOut__ ();
            }
         }
      }
      else
      {
         this ._isActive = false;
         this ._isLoaded = false;
         this ._progress = 0;
      }
   },
   abort ()
   {
      this .clearTimeout ();

      this .aborted = true;

      if (this ._enabled .getValue ())
         this .count ();
   },
   reset ()
   {
      this .remove ();

      if (! this ._enabled .getValue ())
         return;

      const urlObjects = this .urlObjects;

      for (const node of this ._children)
      {
         const urlObject = X3DCast (X3DConstants .X3DUrlObject, node);

         if (urlObject)
         {
            urlObjects .push (urlObject);

            urlObject ._loadState .addInterest ("set_loadState__", this, urlObject);
         }
      }

      this .count ();
   },
   remove ()
   {
      this .clearTimeout ();

      const urlObjects = this .urlObjects;

      for (const urlObject of urlObjects)
         urlObject ._loadState .removeInterest ("set_loadState__", this);

      urlObjects .length = 0;
   },
   clearTimeout ()
   {
      clearTimeout (this .timeOutId);

      this .timeOutId = undefined;
   },
});

Object .defineProperties (LoadSensor,
{
   ... X3DNode .getStaticProperties ("LoadSensor", "Networking", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "timeOut",     new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isLoaded",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "progress",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "loadTime",    new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",    new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default LoadSensor;

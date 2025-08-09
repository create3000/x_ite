import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DBindableNode      from "../Core/X3DBindableNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function NavigationInfo (executionContext)
{
   X3DBindableNode .call (this, executionContext);

   this .addType (X3DConstants .NavigationInfo);

   this .addChildObjects (X3DConstants .outputOnly, "transitionStart",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "transitionActive", new Fields .SFBool (),
                          X3DConstants .outputOnly, "availableViewers", new Fields .MFString (),
                          X3DConstants .outputOnly, "viewer",           new Fields .SFString ());

   // Units

   this ._avatarSize      .setUnit ("length");
   this ._speed           .setUnit ("speed");
   this ._visibilityLimit .setUnit ("length");

   // Legacy

   // Actually the type field had this value, but we never knew this.
   // if (executionContext .getSpecificationVersion () == 2.0)
   //    this ._type = ["WALK", "ANY"]; // VRML2
}

Object .assign (Object .setPrototypeOf (NavigationInfo .prototype, X3DBindableNode .prototype),
{
   initialize ()
   {
      X3DBindableNode .prototype .initialize .call (this);

      this ._type               .addInterest ("set_type__",               this);
      this ._headlight          .addInterest ("set_headlight__",          this);
      this ._visibilityLimit    .addInterest ("set_visibilityLimit__",    this);
      this ._transitionStart    .addInterest ("set_transitionStart__",    this);
      this ._transitionComplete .addInterest ("set_transitionComplete__", this);
      this ._isBound            .addInterest ("set_isBound__",            this);

      this .set_type__ ();
      this .set_headlight__ ();
      this .set_visibilityLimit__ ();
   },
   getViewer ()
   {
      return this ._viewer .getValue ();
   },
   getCollisionRadius ()
   {
      if (this ._avatarSize .length > 0)
      {
         if (this ._avatarSize [0] > 0)
            return this ._avatarSize [0];
      }

      return 0.25;
   },
   getAvatarHeight ()
   {
      if (this ._avatarSize .length > 1)
         return this ._avatarSize [1];

      return 1.6;
   },
   getStepHeight ()
   {
      if (this ._avatarSize .length > 2)
         return this ._avatarSize [2];

      return 0.75;
   },
   getNearValue ()
   {
      const nearValue = this .getCollisionRadius ();

      return nearValue === 0 ? 1e-5 : nearValue / 2;
   },
   getFarValue ()
   {
      return this .visibilityLimit;
   },
   getTransitionType: (() =>
   {
      const TransitionTypes = new Set ([
         "TELEPORT",
         "LINEAR",
         "ANIMATE",
      ]);

      return function ()
      {
         for (const value of this ._transitionType)
         {
            if (TransitionTypes .has (value))
               return value;
         }

         return "LINEAR";
      };
   })(),
   set_type__ ()
   {
      // Determine active viewer.

      this ._viewer = "EXAMINE";

      for (const string of this ._type)
      {
         switch (string)
         {
            case "EXAMINE":
            case "WALK":
            case "FLY":
            case "LOOKAT":
            case "PLANE":
            case "NONE":
               this ._viewer = string;
               break;
            case "PLANE_create3000.github.io":
            case "PLANE_create3000.de":
               this ._viewer = "PLANE";
               break;
            default:
               continue;
         }

         // Leave for loop.
         break;
      }

      // Determine available viewers.

      let
         examineViewer = false,
         walkViewer    = false,
         flyViewer     = false,
         planeViewer   = false,
         noneViewer    = false,
         lookAt        = false;

      if (!this ._type .length)
      {
         examineViewer = true;
         walkViewer    = true;
         flyViewer     = true;
         planeViewer   = true;
         noneViewer    = true;
         lookAt        = true;
      }
      else
      {
         for (const string of this ._type)
         {
            switch (string)
            {
               case "EXAMINE":
                  examineViewer = true;
                  continue;
               case "WALK":
                  walkViewer = true;
                  continue;
               case "FLY":
                  flyViewer = true;
                  continue;
               case "LOOKAT":
                  lookAt = true;
                  continue;
               case "PLANE":
                  planeViewer = true;
                  continue;
               case "NONE":
                  noneViewer = true;
                  continue;
               case "ANY":
                  examineViewer = true;
                  walkViewer    = true;
                  flyViewer     = true;
                  planeViewer   = true;
                  noneViewer    = true;
                  lookAt        = true;
                  break;
               default:
                  // Some strings lead to:
                  examineViewer = true;
                  continue;
            }

            break;
         }
      }

      this ._availableViewers .length = 0;

      if (examineViewer)
         this ._availableViewers .push ("EXAMINE");

      if (walkViewer)
         this ._availableViewers .push ("WALK");

      if (flyViewer)
         this ._availableViewers .push ("FLY");

      if (planeViewer)
         this ._availableViewers .push ("PLANE");

      if (lookAt)
         this ._availableViewers .push ("LOOKAT");

      if (noneViewer)
         this ._availableViewers .push ("NONE");
   },
   set_headlight__ ()
   {
      if (this ._headlight .getValue ())
         delete this .enable;
      else
         this .enable = Function .prototype;
   },
   set_visibilityLimit__ ()
   {
      this .visibilityLimit = Math .max (this ._visibilityLimit .getValue (), 0);
   },
   set_transitionStart__ ()
   {
      if (!this ._transitionActive .getValue ())
         this ._transitionActive = true;
   },
   set_transitionComplete__ ()
   {
      if (this ._transitionActive .getValue ())
         this ._transitionActive = false;
   },
   set_isBound__ ()
   {
      if (this ._isBound .getValue ())
         return;

      if (this ._transitionActive .getValue ())
         this ._transitionActive = false;
   },
   enable (type, renderObject)
   {
      if (!this ._headlight .getValue ())
         return;

      const headlight = this .getBrowser () .getHeadlight ();

      renderObject .getGlobalLights ()     .push (headlight);
      renderObject .getGlobalLightsKeys () .push (headlight .lightNode .getLightKey ());
   },
   traverse (type, renderObject)
   {
      renderObject .getLayer () .getNavigationInfos () .push (this);
   }
});

Object .defineProperties (NavigationInfo,
{
   ... X3DNode .getStaticProperties ("NavigationInfo", "Navigation", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "type",               new Fields .MFString ("EXAMINE", "ANY")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "avatarSize",         new Fields .MFFloat (0.25, 1.6, 0.75)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",              new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "headlight",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "visibilityLimit",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transitionType",     new Fields .MFString ("LINEAR")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transitionTime",     new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "transitionComplete", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",           new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default NavigationInfo;

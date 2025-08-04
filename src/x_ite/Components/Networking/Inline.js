import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DUrlObject         from "./X3DUrlObject.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import Group                from "../Grouping/Group.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import FileLoader           from "../../InputOutput/FileLoader.js";

function Inline (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DUrlObject     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .Inline);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this ._global = true;

   // Private properties

   this .scene        = this .getBrowser () .getDefaultScene ();
   this .groupNode    = new Group (executionContext);
   this .localLights  = [ ];
   this .localShadows = false;
}

Object .assign (Object .setPrototypeOf (Inline .prototype, X3DChildNode .prototype),
   X3DUrlObject .prototype,
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DUrlObject     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this .groupNode .setPrivate (true);
      this .groupNode .setup ();

      this .connectChildNode (this .groupNode);
      this .requestImmediateLoad () .catch (Function .prototype);
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .groupNode .getBBox (bbox, shadows);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getShapes (shapes, modelViewMatrix)
   {
      return this .groupNode .getShapes (shapes, modelViewMatrix);
   },
   unloadData ()
   {
      this .abortLoading ();
      this .setInternalScene (this .getBrowser () .getDefaultScene ());
   },
   loadData ()
   {
      this .abortLoading ();
      this .fileLoader = new FileLoader (this) .createX3DFromURL (this ._url, null, this .setInternalSceneAsync .bind (this));
   },
   abortLoading ()
   {
      this .scene ._loadCount .removeInterest ("checkLoadCount", this);

      if (this .fileLoader)
         this .fileLoader .abort ();
   },
   setInternalSceneAsync (scene)
   {
      if (scene)
      {
         scene ._loadCount .addInterest ("checkLoadCount", this);
         this .setInternalScene (scene);
         this .checkLoadCount (scene ._loadCount);
      }
      else
      {
         this .setInternalScene (this .getBrowser () .getDefaultScene ());
         this .setLoadState (X3DConstants .FAILED_STATE);
      }
   },
   checkLoadCount (loadCount)
   {
      if (loadCount .getValue ())
         return;

      loadCount .removeInterest ("checkLoadCount", this);

      this .setLoadState (X3DConstants .COMPLETE_STATE);
   },
   setInternalScene (scene)
   {
      if (this .scene !== this .getBrowser () .getDefaultScene ())
         this .scene .dispose ();

      // Set new scene.

      this .scene = scene;

      if (this .scene !== this .getBrowser () .getDefaultScene ())
      {
         this .scene .setExecutionContext (this .getExecutionContext ());
         this .scene .setLive (true);
         this .scene .rootNodes .addFieldInterest (this .groupNode ._children);
         this .groupNode ._children = this .scene .rootNodes;
      }
      else
      {
         this .groupNode ._children .length = 0;
      }

      this .getBrowser () .addBrowserEvent ();
   },
   getInternalScene ()
   {
      ///  Returns the internal X3DScene of this inline, that is loaded from the url given.
      ///  If the load field was false an empty scene is returned.  This empty scene is the same for all Inline
      ///  nodes (due to performance reasons).

      return this .scene;
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .PICKING:
         {
            const
               browser          = this .getBrowser (),
               pickingHierarchy = browser .getPickingHierarchy ();

            pickingHierarchy .push (this);

            this .groupNode .traverse (type, renderObject);

            pickingHierarchy .pop ();
            return;
         }
         case TraverseType .DISPLAY:
         {
            if (this ._global .getValue ())
            {
               this .groupNode .traverse (type, renderObject);
            }
            else
            {
               const
                  globalLights    = renderObject .getGlobalLights (),
                  globalShadows   = renderObject .getGlobalShadows (),
                  globalsBegin    = globalLights .length,
                  shadowsBegin    = globalShadows .length,
                  localLights     = this .localLights,
                  numLocalObjects = localLights .length,
                  lightsKeys      = localLights .map (c => c .lightNode .getLightKey ());

               if (numLocalObjects)
               {
                  renderObject .getLocalObjects () .push (... localLights);
                  renderObject .pushLocalShadows (this .localShadows);
                  renderObject .getLocalObjectsKeys () .push (... lightsKeys);
               }

               this .groupNode .traverse (type, renderObject);

               if (numLocalObjects)
               {
                  if (renderObject .isIndependent ())
                  {
                     const browser = this .getBrowser ();

                     for (let i = 0; i < numLocalObjects; ++ i)
                        browser .getLocalObjects () .push (renderObject .getLocalObjects () .pop ());
                  }
                  else
                  {
                     for (let i = 0; i < numLocalObjects; ++ i)
                        renderObject .getLocalObjects () .pop ();
                  }

                  renderObject .popLocalShadows ();
                  renderObject .getLocalObjectsKeys () .length -= lightsKeys .length;
               }

               const numGlobalLights = globalLights .length - globalsBegin;

               for (let i = 0; i < numGlobalLights; ++ i)
               {
                  const globalLight = globalLights [globalsBegin + i];

                  globalLight .groupNode = this .groupNode;
                  globalLight .global    = false;

                  localLights [i] = globalLight;
               }

               localLights .length = numGlobalLights;
               this .localShadows  = globalShadows .at (-1);

               globalLights  .length = globalsBegin;
               globalShadows .length = shadowsBegin;
            }

            return;
         }
         default:
         {
            this .groupNode .traverse (type, renderObject);
            return;
         }
      }
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DUrlObject     .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (Inline,
{
   ... X3DNode .getStaticProperties ("Inline", "Networking", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",               new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",             new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",           new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default Inline;

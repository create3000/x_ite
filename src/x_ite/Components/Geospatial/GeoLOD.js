import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DGeospatialObject  from "./X3DGeospatialObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Group                from "../Grouping/Group.js";
import Inline               from "../Networking/Inline.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function GeoLOD (executionContext)
{
   X3DChildNode        .call (this, executionContext);
   X3DBoundedObject    .call (this, executionContext);
   X3DGeospatialObject .call (this, executionContext);

   this .addType (X3DConstants .GeoLOD);

   this .setVisibleObject (true);

   // Units

   this ._range .setUnit ("length");

   // Private properties

   this .unload           = false;
   this .rootGroupNode    = new Group (this .getBrowser () .getPrivateScene ());
   this .rootInlineNode   = new Inline (executionContext);
   this .child1InlineNode = new Inline (executionContext);
   this .child2InlineNode = new Inline (executionContext);
   this .child3InlineNode = new Inline (executionContext);
   this .child4InlineNode = new Inline (executionContext);
   this .childInlineNodes = [this .child1InlineNode, this .child2InlineNode, this .child3InlineNode, this .child4InlineNode];
   this .childrenLoaded   = false;
   this .keepCurrentLevel = false;
}

Object .assign (Object .setPrototypeOf (GeoLOD .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
   X3DGeospatialObject .prototype,
{
   initialize ()
   {
      X3DChildNode        .prototype .initialize .call (this);
      X3DBoundedObject    .prototype .initialize .call (this);
      X3DGeospatialObject .prototype .initialize .call (this);

      this ._rootNode .addFieldInterest (this .rootGroupNode ._children);

      this .rootGroupNode ._children = this ._rootNode;
      this .rootGroupNode .setPrivate (true);

      this .rootInlineNode ._loadState .addInterest ("set_rootLoadState__", this);

      for (const childInlineNode of this .childInlineNodes)
         childInlineNode ._loadState .addInterest ("set_childLoadState__", this);

      this ._rootUrl   .addFieldInterest (this .rootInlineNode   ._url);
      this ._child1Url .addFieldInterest (this .child1InlineNode ._url);
      this ._child2Url .addFieldInterest (this .child2InlineNode ._url);
      this ._child3Url .addFieldInterest (this .child3InlineNode ._url);
      this ._child4Url .addFieldInterest (this .child4InlineNode ._url);

      this .rootInlineNode ._load = true;

      for (const childInlineNode of this .childInlineNodes)
         childInlineNode ._load = false;

      this .rootInlineNode   ._url = this ._rootUrl;
      this .child1InlineNode ._url = this ._child1Url;
      this .child2InlineNode ._url = this ._child2Url;
      this .child3InlineNode ._url = this ._child3Url;
      this .child4InlineNode ._url = this ._child4Url;

      this .rootInlineNode .setup ();

      for (const childInlineNode of this .childInlineNodes)
         childInlineNode .setup ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
      {
         switch (this .childrenLoaded ? this ._level_changed .getValue () : 0)
         {
            case 0:
            {
               if (this ._rootNode .length)
                  return this .rootGroupNode .getBBox (bbox, shadows);

               return this .rootInlineNode .getBBox (bbox, shadows);
            }
            case 1:
            {
               return X3DBoundedObject .prototype .getBBox .call (this, this .childInlineNodes, bbox, shadows);
            }
         }
      }

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getShapes (shapes, modelViewMatrix)
   {
      switch (this .childrenLoaded ? this ._level_changed .getValue () : 0)
      {
         case 0:
         {
            if (this ._rootNode .length)
               return this .rootGroupNode .getShapes (shapes, modelViewMatrix);

            return this .rootInlineNode .getShapes (shapes, modelViewMatrix);
         }
         case 1:
         {
            for (const childInlineNode of this .childInlineNodes)
               childInlineNode .getShapes (shapes, modelViewMatrix);

            return shapes;
         }
      }
   },
   set_rootLoadState__ ()
   {
      if (this ._level_changed .getValue () !== 0)
         return;

      if (this ._rootNode .length)
         return;

      if (this .rootInlineNode .checkLoadState () !== X3DConstants .COMPLETE_STATE)
         return;

      this .childrenLoaded = false;
      this ._children      = this .rootInlineNode .getInternalScene () .getRootNodes ();
   },
   set_childLoadState__ ()
   {
      if (this ._level_changed .getValue () !== 1)
         return;

      const loaded = this .childInlineNodes .reduce ((previous, childInlineNode) =>
      {
         return previous + (childInlineNode .checkLoadState () === X3DConstants .COMPLETE_STATE ||
            childInlineNode .checkLoadState () === X3DConstants .FAILED_STATE);
      },
      0)

      if (loaded !== 4)
         return;

      this .childrenLoaded = true;
      this ._children      = this .childInlineNodes .flatMap (childInlineNode => Array .from (childInlineNode .getInternalScene () .getRootNodes ()));
   },
   set_childBoundedObject__ ()
   {
      this .setBoundedObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isBoundedObject ()));
   },
   set_childPointingObject__ ()
   {
      this .setPointingObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isPointingObject ()));
   },
   set_childCameraObject__ ()
   {
      this .setCameraObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isCameraObject ()));
   },
   set_childPickableObject__ ()
   {
      this .setPickableObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isPickableObject ()));
   },
   set_childCollisionObject__ ()
   {
      this .setCollisionObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isCollisionObject ()));
   },
   set_childShadowObject__ ()
   {
      this .setShadowObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isShadowObject ()));
   },
   getLevel: (() =>
   {
      const center = new Vector3 ();

      return function (modelViewMatrix)
      {
         modelViewMatrix .translate (this .getCoord (this ._center .getValue (), center));

         const distance = modelViewMatrix .origin .norm ();

         if (distance < this ._range .getValue ())
            return 1;

         return 0;
      };
   })(),
   changeLevel: (() =>
   {
      const modelViewMatrix = new Matrix4 ();

      return function (renderObject)
      {
         const level = this .getLevel (modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()));

         if (level === this ._level_changed .getValue ())
            return;

         this ._level_changed = level;

         switch (level)
         {
            case 0:
            {
               for (const childInlineNode of this .childInlineNodes)
               {
                  childInlineNode ._isBoundedObject   .removeInterest ("set_childBoundedObject__",   this);
                  childInlineNode ._isPointingObject  .removeInterest ("set_childPointingObject__",  this);
                  childInlineNode ._isCameraObject    .removeInterest ("set_childCameraObject__",    this);
                  childInlineNode ._isPickableObject  .removeInterest ("set_childPickableObject__",  this);
                  childInlineNode ._isCollisionObject .removeInterest ("set_childCollisionObject__", this);
                  childInlineNode ._isShadowObject    .removeInterest ("set_childShadowObject__",    this);
               }

               if (this ._rootNode .length)
               {
                  this .connectChildNode (this .rootGroupNode, [TraverseType .DISPLAY]);

                  this ._children      = this ._rootNode;
                  this .childrenLoaded = false;
               }
               else
               {
                  if (this .rootInlineNode .checkLoadState () == X3DConstants .COMPLETE_STATE)
                  {
                     this .connectChildNode (this .rootInlineNode, [TraverseType .DISPLAY]);

                     this ._children      = this .rootInlineNode .getInternalScene () .getRootNodes ();
                     this .childrenLoaded = false;
                  }
               }

               if (this .unload)
               {
                  for (const childInlineNode of this .childInlineNodes)
                     childInlineNode ._load = false;
               }

               break;
            }
            case 1:
            {
               if (this ._rootNode .length)
                  this .disconnectChildNode (this .rootGroupNode);
               else
                  this .disconnectChildNode (this .rootInlineNode);

               for (const childInlineNode of this .childInlineNodes)
               {
                  childInlineNode ._isBoundedObject   .addInterest ("set_childBoundedObject__",   this);
                  childInlineNode ._isPointingObject  .addInterest ("set_childPointingObject__",  this);
                  childInlineNode ._isCameraObject    .addInterest ("set_childCameraObject__",    this);
                  childInlineNode ._isPickableObject  .addInterest ("set_childPickableObject__",  this);
                  childInlineNode ._isCollisionObject .addInterest ("set_childCollisionObject__", this);
                  childInlineNode ._isShadowObject    .addInterest ("set_childShadowObject__",    this);
               }

               this .set_childBoundedObject__ ();
               this .set_childPointingObject__ ();
               this .set_childCameraObject__ ();
               this .set_childPickableObject__ ();
               this .set_childCollisionObject__ ();
               this .set_childShadowObject__ ();

               if (this .child1InlineNode ._load .getValue ())
               {
                  this .set_childLoadState__ ();
               }
               else
               {
                  for (const childInlineNode of this .childInlineNodes)
                     childInlineNode ._load = true;
               }

               break;
            }
         }
      };
   })(),
   traverse (type, renderObject)
   {
      if (type === TraverseType .DISPLAY)
         this .changeLevel (renderObject);

      switch (this .childrenLoaded ? this ._level_changed .getValue () : 0)
      {
         case 0:
         {
            if (this ._rootNode .length)
               this .rootGroupNode .traverse (type, renderObject);
            else
               this .rootInlineNode .traverse (type, renderObject);

            break;
         }
         case 1:
         {
            for (const childInlineNode of this .childInlineNodes)
               childInlineNode .traverse (type, renderObject);

            break;
         }
      }
   },
   dispose ()
   {
      X3DGeospatialObject .prototype .dispose .call (this);
      X3DBoundedObject    .prototype .dispose .call (this);
      X3DChildNode        .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoLOD,
{
   ... X3DNode .getStaticProperties ("GeoLOD", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",     new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "rootUrl",       new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child1Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child2Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child3Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child4Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "center",        new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "range",         new Fields .SFFloat (10)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "level_changed", new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",      new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "rootNode",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "children",      new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default GeoLOD;

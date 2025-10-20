import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import IndexedFaceSet       from "../Geometry3D/IndexedFaceSet.js";
import Group                from "../Grouping/Group.js";
import Coordinate           from "../Rendering/Coordinate.js";
import Appearance           from "../Shape/Appearance.js";
import Shape                from "../Shape/Shape.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function GaussianSplatting (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .GaussianSplatting);

   this .addChildObjects (X3DConstants .outputOnly, "geometry", new Fields .SFTime ());

   // Units

   this ._translations .setUnit ("length");

   // Private properties

   this .groupNode      = new Group (executionContext);
   this .shapeNode      = new Shape (executionContext);
   this .appearanceNode = new Appearance (executionContext);
   this .geometryNode   = new IndexedFaceSet (executionContext);
   this .coordNode      = new Coordinate (executionContext);
}

Object .assign (Object .setPrototypeOf (GaussianSplatting .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      // this ._color .addFieldInterest (this .geometryNode ._color);

      this .coordNode ._point = [-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0] .map (v => v * 1);

      this .geometryNode ._solid          = false; // TODO: can be true
      this .geometryNode ._colorPerVertex = false;
      // this .geometryNode ._color          = this ._color;
      this .geometryNode ._coord          = this .coordNode;

      this .shapeNode ._appearance = this .appearanceNode;
      this .shapeNode ._geometry   = this .geometryNode;
      this .groupNode ._children   = [this .shapeNode];

      this .appearanceNode .setPrivate (true);
      this .coordNode      .setPrivate (true);
      this .geometryNode   .setPrivate (true);
      this .shapeNode      .setPrivate (true);
      this .groupNode      .setPrivate (true);

      this .appearanceNode .setup ();
      this .coordNode      .setup ();
      this .geometryNode   .setup ();
      this .shapeNode      .setup ();
      this .groupNode      .setup ();

      this ._translations .addInterest ("requestUpdateGeometry", this);
      this ._rotations    .addInterest ("requestUpdateGeometry", this);
      this ._scales       .addInterest ("requestUpdateGeometry", this);

      this ._geometry .addInterest ("set_geometry__", this);

      this .set_geometry__ ();
   },
   getInnerNode ()
   {
      return this .groupNode;
   },
   requestUpdateGeometry ()
   {
      this ._geometry = this .getBrowser () .getCurrentTime ();
   },
   set_geometry__ ()
   {
      const
         numTranslations = this ._translations .length && 10000,
         index           = [ ];

      for (let i = 0; i < numTranslations; ++ i)
         index .push (0, 2, 3, -1, 0, 3, 1, -1);

      this .geometryNode ._coordIndex = index;

      console .log (numTranslations)
   }
});

Object .defineProperties (GaussianSplatting,
{
   ... X3DNode .getStaticProperties ("GaussianSplatting", "X_ITE", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translations",      new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotations",         new Fields .MFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scales",            new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pointerEvents",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",             new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default GaussianSplatting;

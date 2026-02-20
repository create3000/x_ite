import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DChildObject       from "../../Base/X3DChildObject.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DUrlObject         from "./X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import FileLoader           from "../../InputOutput/FileLoader.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function InlineGeometry (executionContext)
{
   X3DGeometryNode .call (this, executionContext);
   X3DUrlObject    .call (this, executionContext);

   this .addType (X3DConstants .InlineGeometry);
}

Object .assign (Object .setPrototypeOf (InlineGeometry .prototype, X3DGeometryNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DGeometryNode .prototype .initialize .call (this);
      X3DUrlObject    .prototype .initialize .call (this);

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   getInnerNode ()
   {
      if (this .geometryNode)
         return this .geometryNode;

      throw new Error ("Root node not available.");
   },
   unloadData ()
   {
      this .fileLoader ?.abort ();
      this .setInternalScene (null);
   },
   loadData ()
   {
      this .fileLoader ?.abort ();
      this .fileLoader = new FileLoader (this) .createX3DFromURL (this ._url, null, this .setInternalSceneAsync .bind (this));
   },
   setInternalSceneAsync (scene)
   {
      if (scene)
      {
         this .setInternalScene (scene);
         this .setLoadState (X3DConstants .COMPLETE_STATE);
      }
      else
      {
         this .setInternalScene (this .getBrowser () .getDefaultScene ());
         this .setLoadState (X3DConstants .FAILED_STATE);
      }
   },
   setInternalScene (scene)
   {
      this .scene ?.dispose ();

      // Set new scene.

      this .scene        = scene;
      this .geometryNode = scene ? this .getGeometryFromArray (scene .rootNodes) : null;

      X3DChildObject .prototype .addEvent .call (this);
   },
   getGeometryFromArray (nodes)
   {
      for (const node of nodes)
      {
         const geometryNode = this .getGeometry (node ?.getValue ())

         if (geometryNode)
            return geometryNode;
      }
   },
   getGeometry (node)
   {
      if (!node)
         return;

      if (node .getType () .includes (X3DConstants .X3DGeometryNode))
         return node;

      for (const field of node .getFields ())
      {
         switch (field .getType ())
         {
            case X3DConstants .SFNode:
            {
               const geometryNode = this .getGeometry (field .getValue ());

               if (geometryNode)
                  return geometryNode;

               break;
            }
            case X3DConstants .MFNode:
            {
               const geometryNode = this .getGeometryFromArray (field);

               if (geometryNode)
                  return geometryNode;

               break;
            }
         }
      }
   },
   build ()
   { },
   dispose ()
   {
      X3DUrlObject    .prototype .dispose .call (this);
      X3DGeometryNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (InlineGeometry,
{
   ... X3DNode .getStaticProperties ("InlineGeometry", "Networking", 4, "children", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefreshTimeLimit", new Fields .SFTime (3600)),
      ]),
      enumerable: true,
   },
});

export default InlineGeometry;

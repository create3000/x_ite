import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DChildObject       from "../../Base/X3DChildObject.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DLineGeometryNode  from "../Rendering/X3DLineGeometryNode.js";
import X3DUrlObject         from "./X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import FileLoader           from "../../InputOutput/FileLoader.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function InlineGeometry (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);
   X3DUrlObject        .call (this, executionContext);

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
   unloadData ()
   {
      this .fileLoader ?.abort ();
      this .setInternalScene (null);
   },
   loadData ()
   {
      const cache = this .getBrowser () .getBrowserOption ("Cache");

      this .fileLoader ?.abort ();

      this .fileLoader = new FileLoader (this, cache)
         .createX3DFromURL (this ._url, null, this .setInternalScene .bind (this));
   },
   setInternalScene (scene)
   {
      // Remove old scene.

      if (!this .scene ?.cache)
         this .scene ?.dispose ();

      // Set new scene.

      this .scene = scene;

      if (scene)
      {
         const
            browser = this .getBrowser (),
            hash    = new URL (scene .getWorldURL ()) .hash .substring (1);

         this .geometryNode = hash
            ? X3DCast (X3DConstants .X3DGeometryNode, scene .getNamedNode (hash))
            : this .getGeometryFromArray (scene .rootNodes);

         if (!this .geometryNode)
            throw new Error ("No X3DGeometryNode found.");

         this .scene .setExecutionContext (scene .cache ? browser .getDefaultScene () : this .getExecutionContext ());
         this .scene .setLive (true);

         this .setLoadState (X3DConstants .COMPLETE_STATE);
      }
      else
      {
         this .geometryNode = null;

         this .setLoadState (X3DConstants .FAILED_STATE);
      }

      X3DChildObject .prototype .addEvent .call (this);
   },
   getInternalScene ()
   {
      ///  Returns the internal X3DScene of this InlineGeometry node, that is loaded from the url given.
      ///  If the load field was false, null is returned.

      return this .scene;
   },
   getInnerNode ()
   {
      if (this .geometryNode)
         return this .geometryNode;

      throw new Error ("Geometry node not available.");
   },
   getGeometryFromArray (nodes)
   {
      for (const node of nodes)
      {
         const geometryNode = this .getGeometryFromNode (node ?.getValue ())

         if (geometryNode)
            return geometryNode;
      }
   },
   getGeometryFromNode (node)
   {
      if (!node)
         return;

      const geometryNode = X3DCast (X3DConstants .X3DGeometryNode, node);

      if (geometryNode)
         return geometryNode;

      for (const field of node .getFields ())
      {
         switch (field .getType ())
         {
            case X3DConstants .SFNode:
            {
               const geometryNode = this .getGeometryFromNode (field .getValue ());

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
   ... X3DNode .getStaticProperties ("InlineGeometry", "Networking", 4, "geometry", "4.1"),
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

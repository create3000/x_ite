import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
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
         this .setInternalScene (null);
         this .setLoadState (X3DConstants .FAILED_STATE);
      }
   },
   setInternalScene (scene)
   {
      // Remove old scene.

      this .scene ?.dispose ();

      this .geometryNode ?.removeInterest ("requestRebuild", this);
      this .geometryNode ?._transparent .removeFieldInterest (this ._transparent);

      // Set new scene.

      this .scene        = scene;
      this .geometryNode = scene ? this .getGeometryFromArray (scene .rootNodes) : null;

      this .scene ?.setExecutionContext (this .getExecutionContext ());
      this .scene ?.setLive (true);

      this .geometryNode ?.addInterest ("requestRebuild", this);
      this .geometryNode ?._transparent .addFieldInterest (this ._transparent);

      this .requestRebuild ();
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

      const geometryNode = X3DCast (X3DConstants .X3DGeometryNode, node);

      if (geometryNode)
         return geometryNode;

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
   {
      const { geometryNode } = this;

      if (!geometryNode)
         return;

      this .setTextureCoordinate (geometryNode .getTextureCoordinate ());

      this .getCoordIndices ()   .assign (geometryNode .getCoordIndices ());
      this .getAttribs ()        .push (... geometryNode .getAttribs ());
      this .getFogDepths ()      .assign (geometryNode .getFogDepths ());
      this .getColors ()         .assign (geometryNode .getColors ());
      this .getMultiTexCoords () .push (... geometryNode .getMultiTexCoords ());
      this .getTexCoords ()      .assign (geometryNode .getTexCoords ());
      this .getTangents ()       .assign (geometryNode .getTangents ());
      this .getNormals ()        .assign (geometryNode .getNormals ());
      this .getVertices ()       .assign (geometryNode .getVertices ());

      this .getMin () .assign (geometryNode .getMin ());
      this .getMax () .assign (geometryNode .getMax ());

      this .setGeometryType (geometryNode .getGeometryType ());
      this .setTransparent (geometryNode .isTransparent ());
      this .setSolid (geometryNode .isSolid ());
      this .setCCW (geometryNode .getCCW ());
      this .setBase (geometryNode);
   },
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

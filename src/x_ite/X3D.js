import Namespace                   from "./Namespace.js"
import X3DBaseNode                 from "./Base/X3DBaseNode.js";
import X3DFieldDefinition          from "./Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "./Base/FieldDefinitionArray.js";
import X3DField                    from "./Base/X3DField.js";
import X3DArrayField               from "./Base/X3DArrayField.js";
import Fields                      from "./Fields.js";
import Legacy                      from "./Browser/Legacy.js";
import X3DBrowser                  from "./Browser/X3DBrowser.js";
import ComponentInfo               from "./Configuration/ComponentInfo.js";
import ComponentInfoArray          from "./Configuration/ComponentInfoArray.js";
import ProfileInfo                 from "./Configuration/ProfileInfo.js";
import ProfileInfoArray            from "./Configuration/ProfileInfoArray.js";
import ConcreteNodesArray          from "./Configuration/ConcreteNodesArray.js";
import AbstractNodesArray          from "./Configuration/AbstractNodesArray.js";
import UnitInfo                    from "./Configuration/UnitInfo.js";
import UnitInfoArray               from "./Configuration/UnitInfoArray.js";
import X3DExecutionContext         from "./Execution/X3DExecutionContext.js";
import X3DScene                    from "./Execution/X3DScene.js";
import NamedNodesArray             from "./Execution/NamedNodesArray.js";
import ImportedNodesArray          from "./Execution/ImportedNodesArray.js";
import X3DImportedNode             from "./Execution/X3DImportedNode.js";
import ExportedNodesArray          from "./Execution/ExportedNodesArray.js";
import X3DExportedNode             from "./Execution/X3DExportedNode.js";
import ExternProtoDeclarationArray from "./Prototype/ExternProtoDeclarationArray.js";
import ProtoDeclarationArray       from "./Prototype/ProtoDeclarationArray.js";
import X3DExternProtoDeclaration   from "./Prototype/X3DExternProtoDeclaration.js";
import X3DProtoDeclaration         from "./Prototype/X3DProtoDeclaration.js";
import X3DProtoDeclarationNode     from "./Prototype/X3DProtoDeclarationNode.js";
import RouteArray                  from "./Routing/RouteArray.js";
import X3DRoute                    from "./Routing/X3DRoute.js";
import X3DConstants                from "./Base/X3DConstants.js";

import "./Features.js";
import "./X3DCanvasElement.js";
import "../standard/Math/Algorithms/QuickSort.js";
import "../lib/jquery.js";
import "../lib/libtess.js";

let promise; // Declare return value of X3D function.

/**
*
* @param {function?} onfulfilled
* @param {function?} onrejected
* @returns {Promise<void>} Promise
*/
const X3D = Object .assign (function (onfulfilled, onrejected)
{
   promise ??= new Promise ((resolve, reject) =>
   {
      $(() =>
      {
         try
         {
            Legacy .elements ($("X3DCanvas"), X3DBrowser);

            if (Array .from ($("x3d-canvas")) .every (canvas => canvas .browser))
               resolve ();
            else
               throw new Error ("Couldn't create browser.");
         }
         catch (error)
         {
            Legacy .error ($("X3DCanvas"), error);
            reject (error);
         }
      });
   });

   return promise .then (onfulfilled) .catch (onrejected);
},
Namespace, Namespace .Fields,
{
   X3DConstants:                X3DConstants,
   X3DBrowser:                  X3DBrowser,
   X3DExecutionContext:         X3DExecutionContext,
   X3DScene:                    X3DScene,
   ComponentInfo:               ComponentInfo,
   ComponentInfoArray:          ComponentInfoArray,
   ProfileInfo:                 ProfileInfo,
   ProfileInfoArray:            ProfileInfoArray,
   ConcreteNodesArray:          ConcreteNodesArray,          // non-standard
   AbstractNodesArray:          AbstractNodesArray,          // non-standard
   UnitInfo:                    UnitInfo,
   UnitInfoArray:               UnitInfoArray,
   NamedNodesArray:             NamedNodesArray,             // non-standard
   ImportedNodesArray:          ImportedNodesArray,          // non-standard
   X3DImportedNode:             X3DImportedNode,             // non-standard
   ExportedNodesArray:          ExportedNodesArray,          // non-standard
   X3DExportedNode:             X3DExportedNode,             // non-standard
   ExternProtoDeclarationArray: ExternProtoDeclarationArray,
   ProtoDeclarationArray:       ProtoDeclarationArray,
   X3DExternProtoDeclaration:   X3DExternProtoDeclaration,
   X3DProtoDeclaration:         X3DProtoDeclaration,
   X3DProtoDeclarationNode:     X3DProtoDeclarationNode,     // non-standard
   RouteArray:                  RouteArray,
   X3DRoute:                    X3DRoute,

   X3DBaseNode:                 X3DBaseNode,                 // non-standard

   X3DFieldDefinition:          X3DFieldDefinition,
   FieldDefinitionArray:        FieldDefinitionArray,

   X3DField:                    X3DField,
   X3DArrayField:               X3DArrayField,

   ... Fields,
},
{
   /**
   * @deprecated Use X3D.ModuleName instead.
   */
   require (path)
   {
      return Namespace [path .match (/([^\/]+)$/) ?.[1]];
   },
   noConflict: (() =>
   {
      const
         _had = window .hasOwnProperty ("X3D"),
         _X3D = window .X3D;

      return function ()
      {
         if (window .X3D === X3D)
         {
            if (_had)
               window .X3D = _X3D;
            else
               delete window .X3D;
         }

         return X3D;
      };
   })(),
   getBrowser (element)
   {
      return $(element || "x3d-canvas, X3DCanvas") .filter ("x3d-canvas, X3DCanvas") .prop ("browser");
   },
   createBrowser (... args)
   {
      const element = document .createElement ("x3d-canvas");

      if (args .length)
         element .browser .loadURL (... args);

      return element;
   },
});

export default X3D;

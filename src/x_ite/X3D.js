/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

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
import X3DCanvasElement            from "./X3DCanvasElement.js";
import jQuery                      from "../lib/jquery.js";
import libtess                     from "../lib/libtess.js";

const
   callbacks = $.Deferred (),
   fallbacks = $.Deferred ();

let initialized = false;

/**
 *
 * @param {function?} callback
 * @param {function?} fallback
 * @returns {Promise<void>} Promise
 */
function X3D (callback, fallback)
{
   return new Promise ((resolve, reject) =>
   {
      if (typeof callback === "function")
         callbacks .done (callback);

      if (typeof fallback === "function")
         fallbacks .done (fallback);

      callbacks .done (resolve);
      fallbacks .done (reject);

      if (initialized)
         return;

      initialized = true;

      $(() =>
      {
         try
         {
            Legacy .elements ($("X3DCanvas"), X3DBrowser);

            if ([... $("x3d-canvas")] .every (canvas => canvas .browser))
               callbacks .resolve ();
            else
               fallbacks .resolve (new Error ("Couldn't create browser."));
         }
         catch (error)
         {
            Legacy .error ($("X3DCanvas"), error);
            fallbacks .resolve (error);
         }
      });
   });
}

Object .assign (X3D, Namespace, Namespace .Fields,
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

   SFColor:                     Fields .SFColor,
   SFColorRGBA:                 Fields .SFColorRGBA,
   SFImage:                     Fields .SFImage,
   SFMatrix3d:                  Fields .SFMatrix3d,
   SFMatrix3f:                  Fields .SFMatrix3f,
   SFMatrix4d:                  Fields .SFMatrix4d,
   SFMatrix4f:                  Fields .SFMatrix4f,
   SFNode:                      Fields .SFNode,
   SFRotation:                  Fields .SFRotation,
   SFVec2d:                     Fields .SFVec2d,
   SFVec2f:                     Fields .SFVec2f,
   SFVec3d:                     Fields .SFVec3d,
   SFVec3f:                     Fields .SFVec3f,
   SFVec4d:                     Fields .SFVec4d,
   SFVec4f:                     Fields .SFVec4f,
   VrmlMatrix:                  Fields .VrmlMatrix,

   MFBool:                      Fields .MFBool,
   MFColor:                     Fields .MFColor,
   MFColorRGBA:                 Fields .MFColorRGBA,
   MFDouble:                    Fields .MFDouble,
   MFFloat:                     Fields .MFFloat,
   MFImage:                     Fields .MFImage,
   MFInt32:                     Fields .MFInt32,
   MFMatrix3d:                  Fields .MFMatrix3d,
   MFMatrix3f:                  Fields .MFMatrix3f,
   MFMatrix4d:                  Fields .MFMatrix4d,
   MFMatrix4f:                  Fields .MFMatrix4f,
   MFNode:                      Fields .MFNode,
   MFRotation:                  Fields .MFRotation,
   MFString:                    Fields .MFString,
   MFTime:                      Fields .MFTime,
   MFVec2d:                     Fields .MFVec2d,
   MFVec2f:                     Fields .MFVec2f,
   MFVec3d:                     Fields .MFVec3d,
   MFVec3f:                     Fields .MFVec3f,
   MFVec4d:                     Fields .MFVec4d,
   MFVec4f:                     Fields .MFVec4f,
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
      return $(element || "x3d-canvas, X3DCanvas") .prop ("browser");
   },
   createBrowser (url, parameter)
   {
      const element = document .createElement ("x3d-canvas");

      if (arguments .length)
         element .browser .loadURL (url, parameter);

      return element;
   },
});

export default X3D;

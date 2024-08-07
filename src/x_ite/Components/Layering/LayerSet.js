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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import Layer                from "./Layer.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function LayerSet (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .LayerSet);

   this .layerNodes      = [ new Layer (executionContext) ];
   this .layerNode0      = this .layerNodes [0];
   this .activeLayerNode = null;
}

Object .assign (Object .setPrototypeOf (LayerSet .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this .layerNode0 .setPrivate (true);
      this .layerNode0 .setup ();
      this .layerNode0 .setLayer0 (true);

      this ._activeLayer .addInterest ("set_activeLayer__", this);
      this ._order       .addInterest ("set_layers__", this);
      this ._layers      .addInterest ("set_layers__", this);

      this .set_layers__ ();
   },
   getActiveLayer ()
   {
      return this .activeLayerNode;
   },
   getLayer0 ()
   {
      return this .layerNode0;
   },
   setLayer0 (value)
   {
      this .layerNode0 = value;

      this .set_layers__ ();
   },
   getLayers ()
   {
      return this .layerNodes;
   },
   set_activeLayer__ ()
   {
      if (this ._activeLayer .getValue () === 0)
      {
         if (this .activeLayerNode !== this .layerNode0)
            this .activeLayerNode = this .layerNode0;
      }
      else
      {
         const index = this ._activeLayer - 1;

         if (index >= 0 && index < this ._layers .length)
         {
            if (this .activeLayerNode !== this ._layers [index] .getValue ())
               this .activeLayerNode = X3DCast (X3DConstants .X3DLayerNode, this ._layers [index]);
         }
         else
         {
            if (this .activeLayerNode !== null)
               this .activeLayerNode = null;
         }
      }
   },
   set_layers__ ()
   {
      const layers = this ._layers .getValue ();

      this .layerNodes .length = 0;

      for (let index of this ._order)
      {
         if (index === 0)
         {
            this .layerNodes .push (this .layerNode0);
         }
         else
         {
            -- index;

            if (index >= 0 && index < layers .length)
            {
               const layerNode = X3DCast (X3DConstants .X3DLayerNode, layers [index]);

               if (layerNode)
                  this .layerNodes .push (layerNode);
            }
         }
      }

      this .set_activeLayer__ ();
   },
   bindBindables (viewpointName)
   {
      const layers = this ._layers .getValue ();

      this .layerNode0 .bindBindables (viewpointName);

      for (let i = 0, length = layers .length; i < length; ++ i)
      {
         const layerNode = X3DCast (X3DConstants .X3DLayerNode, layers [i]);

         if (layerNode)
            layerNode .bindBindables (viewpointName);
      }
   },
   traverse (type, renderObject)
   {
      for (const layerNode of this .layerNodes)
         layerNode .traverse (type, renderObject);
   },
});

Object .defineProperties (LayerSet, X3DNode .getStaticProperties ("LayerSet", "Layering", 1, "children", "3.2"));

Object .defineProperties (LayerSet,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "activeLayer", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "order",       new Fields .MFInt32 (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "layers",      new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default LayerSet;

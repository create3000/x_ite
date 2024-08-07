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
import X3DSoundChannelNode  from "./X3DSoundChannelNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function ChannelSplitter (executionContext)
{
   X3DSoundChannelNode .call (this, executionContext);

   this .addType (X3DConstants .ChannelSplitter);

   this .outputNodes = [ ];
}

Object .assign (Object .setPrototypeOf (ChannelSplitter .prototype, X3DSoundChannelNode .prototype),
{
   initialize ()
   {
      X3DSoundChannelNode .prototype .initialize .call (this);

      this ._enabled .addInterest ("set_outputs__", this);
      this ._outputs .addInterest ("set_outputs__", this);

      this .set_outputs__ ();
   },
   set_outputs__ ()
   {
      if (this .channelSplitterNode)
      {
         this .channelSplitterNode .disconnect ();
      }
      else
      {
         for (const outputNode of this .outputNodes)
            this .getAudioSource () .disconnect (outputNode .getAudioDestination ());
      }

      this .outputNodes .length = 0;

      for (const child of this ._outputs)
      {
         const outputNode = X3DCast (X3DConstants .X3DChildNode, child);

         if (!outputNode)
            continue;

         const type = outputNode .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .X3DSoundChannelNode:
               case X3DConstants .X3DSoundProcessingNode:
                  this .outputNodes .push (outputNode);
                  break;
               default:
                  continue;
            }

            break;
         }
      }

      if (this .channelSplitterNode)
         this .getAudioSource () .disconnect (this .channelSplitterNode);

      if (this ._enabled .getValue ())
      {
         const
            audioContext    = this .getBrowser () .getAudioContext (),
            numberOfOutputs = Algorithm .clamp (this .outputNodes .length, 1, 32);

         if (this .channelSplitterNode ?.numberOfOutputs !== numberOfOutputs)
            this .channelSplitterNode = new ChannelSplitterNode (audioContext, { numberOfOutputs });

         this .getAudioSource () .connect (this .channelSplitterNode);
      }
      else
      {
         this .channelSplitterNode = null;
      }

      if (this .channelSplitterNode)
      {
         const length = Math .min (this .outputNodes .length, 32);

         for (let i = 0; i < length; ++ i)
            this .channelSplitterNode .connect (this .outputNodes [i] .getAudioDestination (), i);
      }
      else
      {
         for (const outputNode of this .outputNodes)
            this .getAudioSource () .connect (outputNode .getAudioDestination ());
      }
   },
});

Object .defineProperties (ChannelSplitter, X3DNode .staticProperties ("ChannelSplitter", "Sound", 2, "children", "4.0"));

Object .defineProperties (ChannelSplitter,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCount",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("SPEAKERS")),

         new X3DFieldDefinition (X3DConstants .inputOutput, "children",              new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "outputs",               new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ChannelSplitter;

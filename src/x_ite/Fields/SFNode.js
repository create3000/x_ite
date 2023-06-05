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

import X3DField     from "../Base/X3DField.js";
import X3DConstants from "../Base/X3DConstants.js";
import Generator    from "../InputOutput/Generator.js";
import SFNodeCache  from "./SFNodeCache.js";

const
   _target     = Symbol .for ("X_ITE.SFNode.target"),
   _proxy      = Symbol (),
   _cloneCount = Symbol ();

const handler =
{
   get: function (target, key)
   {
      try
      {
         const value = target [key];

         if (value !== undefined)
            return value;

         const
            node       = target .getValue (),
            field      = node .getField (key),
            accessType = field .getAccessType ();

         // Specification conform would be: accessType & X3DConstants .outputOnly.
         // But we allow read access to plain fields, too.
         if (accessType === X3DConstants .inputOnly)
            return undefined;

         return field .valueOf ();
      }
      catch (error)
      {
         return undefined;
      }
   },
   set: function (target, key, value)
   {
      if (key in target)
      {
         target [key] = value;
         return true;
      }

      try
      {
         const
            node       = target .getValue (),
            field      = node .getField (key),
            accessType = field .getAccessType ();

         if (accessType !== X3DConstants .outputOnly)
            field .setValue (value);

         return true;
      }
      catch (error)
      {
         console .error (target, key, error);
         return false;
      }
   },
   has: function (target, key)
   {
      try
      {
         return !! target .getValue () .getField (key);
      }
      catch (error)
      {
         return key in target;
      }
   },
   ownKeys: function (target)
   {
      const
         value   = target .getValue (),
         ownKeys = [ ];

      if (value)
      {
         for (const fieldDefinition of value .getFieldDefinitions ())
            ownKeys .push (fieldDefinition .name);
      }

      return ownKeys;
   },
   getOwnPropertyDescriptor: function (target, key)
   {
      const value = target .getValue ();

      if (value)
      {
         const fieldDefinition = value .getFieldDefinitions () .get (key);

         if (fieldDefinition)
         {
            return {
               value: this .get (target, key),
               writable: fieldDefinition .accessType !== X3DConstants .outputOnly,
               enumerable: true,
               configurable: true,
            };
         }
      }
   },
};

function SFNode (value)
{
   // Node need to test for X3DBaseNode, because there is a special version of SFNode in Script.

   const proxy = new Proxy (this, handler);

   this [_target] = this;
   this [_proxy]  = proxy;

   if (value)
   {
      value .addParent (proxy);

      X3DField .call (this, value);
   }
   else
   {
      X3DField .call (this, null);
   }

   return proxy;
}

SFNode .prototype = Object .assign (Object .create (X3DField .prototype),
{
   constructor: SFNode,
   [_target]: null,
   [_proxy]: null,
   [_cloneCount]: 0,
   copy: function (instance)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return new SFNode (instance ? value .copy (instance) : value);

      return new SFNode ();
   },
   equals: function (node)
   {
      const target = this [_target];

      if (node)
         return target .getValue () === node .getValue ();

      return target .getValue () === null;
   },
   isDefaultValue: function ()
   {
      const target = this [_target];

      return target .getValue () === null;
   },
   set: function (value)
   {
      const
         target  = this [_target],
         current = target .getValue ();

      if (current)
      {
         current .removeCloneCount (target [_cloneCount]);
         current .removeParent (target [_proxy]);
      }

      // No need to test for X3DBaseNode, because there is a special version of SFNode in Script.

      if (value)
      {
         value .addParent (target [_proxy]);
         value .addCloneCount (target [_cloneCount]);

         X3DField .prototype .set .call (target, value);
      }
      else
      {
         X3DField .prototype .set .call (target, null);
      }
   },
   getNodeTypeName: function ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return value .getTypeName ();

      throw new Error ("SFNode.getNodeTypeName: node is null.");
   },
   getNodeName: function ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return value .getName ();

      throw new Error ("SFNode.getNodeName: node is null.");
   },
   getNodeDisplayName: function ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return value .getDisplayName ();

      throw new Error ("SFNode.getNodeDisplayName: node is null.");
   },
   getNodeType: function ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return Array .from (value .getType ());

      throw new Error ("SFNode.getNodeType: node is null.");
   },
   getFieldDefinitions: function ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return value .getFieldDefinitions ();

      throw new Error ("SFNode.getFieldDefinitions: node is null.");
   },
   addFieldCallback: function (name, key, object)
   {
      const target = this [_target];

      switch (arguments .length)
      {
         case 2:
         {
            return X3DField .prototype .addFieldCallback .apply (target, arguments);
         }
         case 3:
         {
            const value = target .getValue ();

            if (value)
               return value .getField (name) .addFieldCallback (key, object);

            throw new Error ("SFNode.addFieldCallback: node is null.");
         }
      }
   },
   removeFieldCallback: function (name, key)
   {
      const target = this [_target];

      switch (arguments .length)
      {
         case 1:
         {
            return X3DField .prototype .removeFieldCallback .apply (target, arguments);
         }
         case 2:
         {
            const value = target .getValue ();

            if (value)
               return value .getField (name) .removeFieldCallback (key);

            throw new Error ("SFNode.removeFieldCallback: node is null.");
         }
      }
   },
   addCloneCount: function (count)
   {
      const target = this [_target];

      target [_cloneCount] += count;

      target .getValue () ?.addCloneCount (count);
   },
   removeCloneCount: function (count)
   {
      const target = this [_target];

      target [_cloneCount] -= count;

      target .getValue () ?.removeCloneCount (count);
   },
   getNodeUserData: function (key)
   {
      return this [_target] .getValue () .getUserData (key);
   },
   setNodeUserData: function (key, value)
   {
      this [_target] .getValue () .setUserData (key, value);
   },
   removeNodeUserData: function (key)
   {
      this [_target] .getValue () .removeUserData (key);
   },
   valueOf: function ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      return value ? SFNodeCache .get (value) : null;
   },
   toStream: function (generator)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         value .toStream (generator);
      else
         generator .string += "NULL";
   },
   toVRMLStream: function (generator)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         value .toVRMLStream (generator);
      else
         generator .string += "NULL";
   },
   toXMLStream: function (generator)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         value .toXMLStream (generator);
      else
         generator .string += "<!-- NULL -->";
   },
   toJSONStream: function (generator)
   {
      this .toJSONStreamValue (generator);
   },
   toJSONStreamValue: function (generator)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         value .toJSONStream (generator);
      else
         generator .string += "null";
   },
   dispose: function ()
   {
      const target = this [_target];

      target .set (null);
      target .processInterests ();

      X3DField .prototype .dispose .call (target);
   },
});

for (const key of Reflect .ownKeys (SFNode .prototype))
   Object .defineProperty (SFNode .prototype, key, { enumerable: false });

Object .defineProperties (SFNode,
{
   typeName:
   {
      value: "SFNode",
      enumerable: true,
   },
});

export default SFNode;

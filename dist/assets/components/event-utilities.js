(function ()
{
// Undefine global variables.
var module = { }, exports, process;

const
	X3D     = window [Symbol .for ("X_ITE.X3D-6.1.0")],
	define  = X3D .define,
	require = X3D .require;
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/EventUtilities/BooleanFilter',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DConstants)
{
"use strict";

   function BooleanFilter (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .BooleanFilter);
   }

   BooleanFilter .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: BooleanFilter,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_boolean", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "inputTrue",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "inputFalse",  new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "inputNegate", new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "BooleanFilter";
      },
      getComponentName: function ()
      {
         return "EventUtilities";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DChildNode .prototype .initialize .call (this);

         this ._set_boolean .addInterest ("set_boolean__", this);
      },
      set_boolean__: function ()
      {
         const value = this ._set_boolean .getValue ();

         if (value)
            this ._inputTrue = true;

         else
            this ._inputFalse = false;

         this ._inputNegate = ! value;
      },
   });

   return BooleanFilter;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/EventUtilities/X3DSequencerNode',[
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Algorithm",
],
function (X3DChildNode,
          X3DConstants,
          Algorithm)
{
"use strict";

   function X3DSequencerNode (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .X3DSequencerNode);

      this .index = -1;
   }

   X3DSequencerNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: X3DSequencerNode,
      initialize: function ()
      {
         X3DChildNode .prototype .initialize .call (this);

         this ._set_fraction .addInterest ("set_fraction__", this);
         this ._previous     .addInterest ("set_previous__", this);
         this ._next         .addInterest ("set_next__", this);
         this ._key          .addInterest ("set_index__", this);
      },
      set_fraction__: function ()
      {
         const
            fraction = this ._set_fraction .getValue (),
            key      = this ._key,
            length   = key .length;

         if (length === 0)
            return;

         let i = 0;

         if (length === 1 || fraction <= key [0])
            i = 0;

         else if (fraction >= key [length - 1])
            i = this .getSize () - 1;

         else
         {
            const index = Algorithm .upperBound (key, 0, length, fraction);

            i = index - 1;
         }

         if (i !== this .index)
         {
            if (i < this .getSize ())
            {
               this .sequence (this .index = i);
            }
         }
      },
      set_previous__: function ()
      {
         if (this ._previous .getValue ())
         {
            if (this .index <= 0)
               this .index = this .getSize () - 1;

            else
               -- this .index;

            if (this .index < this .getSize ())
               this .sequence (this .index);
         }
      },
      set_next__: function ()
      {
         if (this ._next .getValue ())
         {
            if (this .index >= this .getSize () - 1)
               this .index = 0;

            else
               ++ this .index;

            if (this .index < this .getSize ())
               this .sequence (this .index);
         }
      },
      set_index__: function ()
      {
         this .index = -1;
      },
   });

   return X3DSequencerNode;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/EventUtilities/BooleanSequencer',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/EventUtilities/X3DSequencerNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSequencerNode,
          X3DConstants)
{
"use strict";

   function BooleanSequencer (executionContext)
   {
      X3DSequencerNode .call (this, executionContext);

      this .addType (X3DConstants .BooleanSequencer);
   }

   BooleanSequencer .prototype = Object .assign (Object .create (X3DSequencerNode .prototype),
   {
      constructor: BooleanSequencer,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "previous",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "next",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "BooleanSequencer";
      },
      getComponentName: function ()
      {
         return "EventUtilities";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DSequencerNode .prototype .initialize .call (this);

         this ._keyValue .addInterest ("set_index__", this);
      },
      getSize: function ()
      {
         return this ._keyValue .length;
      },
      sequence: function (index)
      {
         this ._value_changed = this ._keyValue [index];
      },
   });

   return BooleanSequencer;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/EventUtilities/BooleanToggle',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DConstants)
{
"use strict";

   function BooleanToggle (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .BooleanToggle);
   }

   BooleanToggle .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: BooleanToggle,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_boolean", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "toggle",      new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "BooleanToggle";
      },
      getComponentName: function ()
      {
         return "EventUtilities";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DChildNode .prototype .initialize .call (this);

         this ._set_boolean .addInterest ("set_boolean__", this);
      },
      set_boolean__: function ()
      {
         if (this ._set_boolean .getValue ())
            this ._toggle = ! this ._toggle .getValue ();
      },
   });

   return BooleanToggle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/EventUtilities/X3DTriggerNode',[
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Base/X3DConstants",
],
function (X3DChildNode,
          X3DConstants)
{
"use strict";

   function X3DTriggerNode (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .X3DTriggerNode);
   }

   X3DTriggerNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: X3DTriggerNode,
   });

   return X3DTriggerNode;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/EventUtilities/BooleanTrigger',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/EventUtilities/X3DTriggerNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTriggerNode,
          X3DConstants)
{
"use strict";

   function BooleanTrigger (executionContext)
   {
      X3DTriggerNode .call (this, executionContext);

      this .addType (X3DConstants .BooleanTrigger);
   }

   BooleanTrigger .prototype = Object .assign (Object .create (X3DTriggerNode .prototype),
   {
      constructor: BooleanTrigger,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_triggerTime", new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "triggerTrue",     new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "BooleanTrigger";
      },
      getComponentName: function ()
      {
         return "EventUtilities";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DTriggerNode .prototype .initialize .call (this);

         this ._set_triggerTime .addInterest ("set_triggerTime__", this);
      },
      set_triggerTime__: function ()
      {
         this ._triggerTrue = true;
      },
   });

   return BooleanTrigger;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/EventUtilities/IntegerSequencer',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/EventUtilities/X3DSequencerNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSequencerNode,
          X3DConstants)
{
"use strict";

   function IntegerSequencer (executionContext)
   {
      X3DSequencerNode .call (this, executionContext);

      this .addType (X3DConstants .IntegerSequencer);
   }

   IntegerSequencer .prototype = Object .assign (Object .create (X3DSequencerNode .prototype),
   {
      constructor: IntegerSequencer,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "previous",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "next",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFInt32 ()),
      ]),
      getTypeName: function ()
      {
         return "IntegerSequencer";
      },
      getComponentName: function ()
      {
         return "EventUtilities";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DSequencerNode .prototype .initialize .call (this);

         this ._keyValue .addInterest ("set_index__", this);
      },
      getSize: function ()
      {
         return this ._keyValue .length;
      },
      sequence: function (index)
      {
         this ._value_changed = this ._keyValue [index];
      },
   });

   return IntegerSequencer;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/EventUtilities/IntegerTrigger',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/EventUtilities/X3DTriggerNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTriggerNode,
          X3DConstants)
{
"use strict";

   function IntegerTrigger (executionContext)
   {
      X3DTriggerNode .call (this, executionContext);

      this .addType (X3DConstants .IntegerTrigger);
   }

   IntegerTrigger .prototype = Object .assign (Object .create (X3DTriggerNode .prototype),
   {
      constructor: IntegerTrigger,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_boolean",  new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "integerKey",   new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "triggerValue", new Fields .SFInt32 ()),
      ]),
      getTypeName: function ()
      {
         return "IntegerTrigger";
      },
      getComponentName: function ()
      {
         return "EventUtilities";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DTriggerNode .prototype .initialize .call (this);

         this ._set_boolean .addInterest ("set_boolean__", this);
      },
      set_boolean__: function ()
      {
         this ._triggerValue = this ._integerKey;
      },
   });

   return IntegerTrigger;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/EventUtilities/TimeTrigger',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/EventUtilities/X3DTriggerNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTriggerNode,
          X3DConstants)
{
"use strict";

   function TimeTrigger (executionContext)
   {
      X3DTriggerNode .call (this, executionContext);

      this .addType (X3DConstants .TimeTrigger);
   }

   TimeTrigger .prototype = Object .assign (Object .create (X3DTriggerNode .prototype),
   {
      constructor: TimeTrigger,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_boolean", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "triggerTime", new Fields .SFTime ()),
      ]),
      getTypeName: function ()
      {
         return "TimeTrigger";
      },
      getComponentName: function ()
      {
         return "EventUtilities";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DTriggerNode .prototype .initialize .call (this);

         this ._set_boolean .addInterest ("set_boolean__", this);
      },
      set_boolean__: function ()
      {
         this ._triggerTime = this .getBrowser () .getCurrentTime ();
      },
   });

   return TimeTrigger;
});

/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define (require .getComponentUrl ("event-utilities"), [
   "x_ite/Components",
   "x_ite/Components/EventUtilities/BooleanFilter",
   "x_ite/Components/EventUtilities/BooleanSequencer",
   "x_ite/Components/EventUtilities/BooleanToggle",
   "x_ite/Components/EventUtilities/BooleanTrigger",
   "x_ite/Components/EventUtilities/IntegerSequencer",
   "x_ite/Components/EventUtilities/IntegerTrigger",
   "x_ite/Components/EventUtilities/TimeTrigger",
   "x_ite/Components/EventUtilities/X3DSequencerNode",
   "x_ite/Components/EventUtilities/X3DTriggerNode",
],
function (Components,
          BooleanFilter,
          BooleanSequencer,
          BooleanToggle,
          BooleanTrigger,
          IntegerSequencer,
          IntegerTrigger,
          TimeTrigger,
          X3DSequencerNode,
          X3DTriggerNode)
{
"use strict";

   Components .addComponent ({
      name: "EventUtilities",
      types:
      {
         BooleanFilter:    BooleanFilter,
         BooleanSequencer: BooleanSequencer,
         BooleanToggle:    BooleanToggle,
         BooleanTrigger:   BooleanTrigger,
         IntegerSequencer: IntegerSequencer,
         IntegerTrigger:   IntegerTrigger,
         TimeTrigger:      TimeTrigger,
      },
      abstractTypes:
      {
         X3DSequencerNode: X3DSequencerNode,
         X3DTriggerNode:   X3DTriggerNode,
      },
   });
});


})();

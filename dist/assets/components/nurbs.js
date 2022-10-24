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


define ('x_ite/Components/NURBS/Contour2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode,
          X3DConstants,
          X3DCast)
{
"use strict";

   function Contour2D (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .Contour2D);

      this .childNodes = [ ];
   }

   Contour2D .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: Contour2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",       new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "Contour2D";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "trimmingContour";
      },
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);

         this ._addChildren    .addInterest ("set_addChildren__",    this);
         this ._removeChildren .addInterest ("set_removeChildren__", this);
         this ._children       .addInterest ("set_children__",       this);

         this .set_children__ ();
      },
      set_addChildren__: function ()
      {
         this ._addChildren .setTainted (true);

         this ._addChildren .erase (remove (this ._addChildren, 0, this ._addChildren .length,
                                            this ._children,    0, this ._children .length),
                                    this ._addChildren .length);

         for (const child of this ._addChildren)
            this ._children .push (child);

         this ._addChildren .length = 0;
         this ._addChildren .setTainted (false);
      },
      set_removeChildren__: function ()
      {
         this ._removeChildren .setTainted (true);

         this ._children .erase (remove (this ._children,       0, this ._children .length,
                                         this ._removeChildren, 0, this ._removeChildren .length),
                                 this ._children .length);

         this ._removeChildren .length = 0;
         this ._removeChildren .setTainted (false);
      },
      set_children__: function ()
      {
         const childNodes = this .childNodes;

         childNodes .length = 0;

         for (const node of this ._children)
         {
            const childNode = X3DCast (X3DConstants .NurbsCurve2D, node);

            if (childNode)
            {
               childNodes .push (childNode);
               continue;
            }
            else
            {
               const childNode = X3DCast (X3DConstants .ContourPolyline2D, node);

               if (childNode)
               {
                  childNodes .push (childNode);
                  continue;
               }
            }
         }
      },
      addTrimmingContour: function (trimmingContours)
      {
         for (const childNode of this .childNodes)
            trimmingContours .push (childNode .tessellate (2));
      }
   });

   function remove (array, first, last, range, rfirst, rlast)
   {
      const set = new Set ();

      for (let i = rfirst; i < rlast; ++ i)
         set .add (range [i]);

      function compare (value) { return set .has (value); }

      return array .remove (first, last, compare);
   }

   return Contour2D;
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


define ('x_ite/Components/NURBS/X3DNurbsControlCurveNode',[
   "x_ite/Components/Core/X3DNode",
   "x_ite/Base/X3DConstants",
],
function (X3DNode,
          X3DConstants)
{
"use strict";

   function X3DNurbsControlCurveNode (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .X3DNurbsControlCurveNode);
   }

   X3DNurbsControlCurveNode .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: X3DNurbsControlCurveNode,
   });

   return X3DNurbsControlCurveNode;
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


define ('x_ite/Components/NURBS/ContourPolyline2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/NURBS/X3DNurbsControlCurveNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNurbsControlCurveNode,
          X3DConstants,
          Vector3)
{
"use strict";

   function ContourPolyline2D (executionContext)
   {
      X3DNurbsControlCurveNode .call (this, executionContext);

      this .addType (X3DConstants .ContourPolyline2D);

      this .controlPoints = [ ];
   }

   ContourPolyline2D .prototype = Object .assign (Object .create (X3DNurbsControlCurveNode .prototype),
   {
      constructor: ContourPolyline2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "controlPoint", new Fields .MFVec2d ()),
      ]),
      getTypeName: function ()
      {
         return "ContourPolyline2D";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "children";
      },
      tessellate: function (type)
      {
         switch (type)
         {
            case 0:
            {
               const
                  controlPointArray = this ._controlPoint .getValue (),
                  controlPoints     = this .controlPoints,
                  length            = this ._controlPoint .length;

               for (let i = 0; i < length; ++ i)
               {
                  const i2 = i * 2;

                  controlPoints [i2 + 0] = controlPointArray [i2 + 0];
                  controlPoints [i2 + 1] = controlPointArray [i2 + 1];
               }

               controlPoints .length = length * 2;

               return controlPoints;
            }
            case 1:
            {
               const
                  controlPointArray = this ._controlPoint .getValue (),
                  controlPoints     = this .controlPoints,
                  length            = this ._controlPoint .length;

               for (let i = 0; i < length; ++ i)
               {
                  const
                     i2 = i * 2,
                     i3 = i * 3;

                  controlPoints [i3 + 0] = controlPointArray [i2 + 0];
                  controlPoints [i3 + 1] = 0;
                  controlPoints [i3 + 2] = controlPointArray [i2 + 1];
               }

               controlPoints .length = length * 3;

               return controlPoints;
            }
            case 3:
            {
               const
                  controlPointArray = this ._controlPoint .getValue (),
                  controlPoints     = this .controlPoints,
                  length            = this ._controlPoint .length;

               for (let i = 0; i < length; ++ i)
               {
                  const i2 = i * 2;

                  controlPoints [i] = new Vector3 (controlPointArray [i2 + 0], controlPointArray [i2 + 1], 0);
               }

               controlPoints .length = length;

               return controlPoints;
            }
         }
      },
   });

   return ContourPolyline2D;
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


define ('x_ite/Components/NURBS/CoordinateDouble',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DCoordinateNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DCoordinateNode,
          X3DConstants)
{
"use strict";

   function CoordinateDouble (executionContext)
   {
      X3DCoordinateNode .call (this, executionContext);

      this .addType (X3DConstants .CoordinateDouble);
   }

   CoordinateDouble .prototype = Object .assign (Object .create (X3DCoordinateNode .prototype),
   {
      constructor: CoordinateDouble,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec3d ()),
      ]),
      getTypeName: function ()
      {
         return "CoordinateDouble";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "coord";
      },
   });

   return CoordinateDouble;
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


define ('x_ite/Browser/NURBS/NURBS',[
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Vector4",
],
function (Vector2,
          Vector3,
          Vector4)
{
"use strict";

   const NURBS = {
      getTessellation: function (tessellation, dimension)
      {
         if (tessellation > 0)
            return tessellation + 1;

         if (tessellation < 0)
            return -tessellation * dimension + 1;

         return 2 * dimension + 1;
      },
      getClosed2D: function (order, knot, weight, controlPoint)
      {
         const
            dimension   = controlPoint .length,
            haveWeights = weight .length === dimension;

         // Check if first and last weights are unitary.

         if (haveWeights)
         {
            if (weight [0] !== weight [dimension - 1])
               return false;
         }

         // Check if first and last point are coincident.

         if (! controlPoint [0] .equals (controlPoint [dimension - 1]))
            return false;

         // Check if knots are periodic.

         if (! this .isPeriodic (order, dimension, knot))
            return false;

         return true;
      },
      getClosed: (function ()
      {
         const
            firstPoint = new Vector3 (0, 0, 0),
            lastPoint  = new Vector3 (0, 0, 0);

         return function (order, knot, weight, controlPointNode)
         {
            const
               dimension   = controlPointNode .getSize (),
               haveWeights = weight .length === dimension;

            // Check if first and last weights are unitary.

            if (haveWeights)
            {
               if (weight [0] !== weight [dimension - 1])
                  return false;
            }

            // Check if first and last point are coincident.

            if (! controlPointNode .get1Point (0, firstPoint) .equals (controlPointNode .get1Point (dimension - 1, lastPoint)))
               return false;

            // Check if knots are periodic.

            if (! this .isPeriodic (order, dimension, knot))
               return false;

            return true;
         };
      })(),
      getUClosed: (function ()
      {
         const
            firstPoint = new Vector3 (0, 0, 0),
            lastPoint  = new Vector3 (0, 0, 0);

         return function (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode)
         {
            const haveWeights = weight .length === controlPointNode .getSize ();

            for (let v = 0, length = vDimension; v < length; ++ v)
            {
               const
                  first = v * uDimension,
                  last  = v * uDimension + uDimension - 1;

               // Check if first and last weights are unitary.

               if (haveWeights)
               {
                  if (weight [first] !== weight [last])
                     return false;
               }

               // Check if first and last point are coincident.

               if (! controlPointNode .get1Point (first, firstPoint) .equals (controlPointNode .get1Point (last, lastPoint)))
                  return false;
            }

            // Check if knots are periodic.

            if (! this .isPeriodic (uOrder, uDimension, uKnot))
               return false;

            return true;
         };
      })(),
      getVClosed: (function ()
      {
         const
            firstPoint = new Vector3 (0, 0, 0),
            lastPoint  = new Vector3 (0, 0, 0);

         return function (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode)
         {
            const haveWeights = weight .length === controlPointNode .getSize ();

            for (let u = 0, size = uDimension; u < size; ++ u)
            {
               const
                  first = u,
                  last  = (vDimension - 1) * uDimension + u;

               // Check if first and last weights are unitary.

               if (haveWeights)
               {
                  if (weight [first] !== weight [last])
                     return false;
               }

               // Check if first and last point are coincident.

               if (! controlPointNode .get1Point (first, firstPoint) .equals (controlPointNode .get1Point (last, lastPoint)))
                  return false;
            }

            // Check if knots are periodic.

            if (! this .isPeriodic (vOrder, vDimension, vKnot))
               return false;

            return true;
         };
      })(),
      isPeriodic: function (order, dimension, knot)
      {
         // Check if knots are periodic.

         if (knot .length === dimension + order)
         {
            {
               let count = 1;

               for (let i = 1, size = order; i < size; ++ i)
               {
                  count += knot [i] === knot [0];
               }

               if (count === order)
                  return false;
            }

            {
               let count = 1;

               for (let i = knot .length - order, size = knot .length - 1; i < size; ++ i)
               {
                  count += knot [i] === knot [size];
               }

               if (count === order)
                  return false;
            }
         }

         return true;
      },
      getKnots: function (result, closed, order, dimension, knot)
      {
         const knots = result || [ ];

         for (let i = 0, length = knot .length; i < length; ++ i)
            knots [i] = knot [i];

         knots .length = knot .length;

         // check the knot-vectors. If they are not according to standard
         // default uniform knot vectors will be generated.

         let generateUniform = true;

         if (knots .length === dimension + order)
         {
            generateUniform = false;

            let consecutiveKnots = 0;

            for (let i = 1, length = knots .length; i < length; ++ i)
            {
               if (knots [i] == knots [i - 1])
                  ++ consecutiveKnots;
               else
                  consecutiveKnots = 0;

               if (consecutiveKnots > order - 1)
                  generateUniform = true;

               if (knots [i - 1] > knots [i])
                  generateUniform = true;
            }
         }

         if (generateUniform)
         {
            for (let i = 0, length = dimension + order; i < length; ++ i)
               knots [i] = i / (length - 1);
         }

         if (closed)
         {
            for (let i = 1, length = order - 1; i < length; ++ i)
               knots .push (knots .at (-1) + (knots [i] - knots [i - 1]));
         }

         return knots;
      },
      getWeights: function (result, dimension, weight)
      {
         if (weight .length !== dimension)
            return undefined;

         const weights = result || [ ];

         for (let i = 0; i < dimension; ++ i)
         {
            weights [i] = weight [i];
         }

         weights .length = dimension;

         return weights;
      },
      getUVWeights: function (result, uDimension, vDimension, weight)
      {
         const dimension = uDimension * vDimension;

         if (weight .length !== dimension)
            return undefined;

         const weights = result || [ ];

         for (let u = 0, i = 0; u < uDimension; ++ u)
         {
            for (let v = 0; v < vDimension; ++ v, ++ i)
            {
               weights [i] = weight [i];
            }
         }

         weights .length = dimension;

         return weights;
      },
      getControlPoints2D: function (result, closed, order, weights, controlPoint)
      {
         const
            controlPoints     = result || [ ],
            controlPointArray = controlPoint .getValue (),
            dimension         = controlPoint .length,
            haveWeights       = Boolean (weights),
            Vector            = haveWeights ? Vector3 : Vector2;

         if (controlPoints .haveWeights !== haveWeights)
         {
            controlPoints .haveWeights = haveWeights;
            controlPoints .length      = 0;
         }

         for (let i = 0; i < dimension; ++ i)
         {
            const
               i2 = i * 2,
               p  = controlPoints [i] || new Vector (0, 0, 0);

            controlPoints [i] = p .set (controlPointArray [i2 + 0], controlPointArray [i2 + 1], haveWeights ? weights [i] : 0);
         }

         controlPoints .length = dimension;

         if (closed)
         {
            for (let i = 1, size = order - 1; i < size; ++ i)
               controlPoints .push (controlPoints [i]);
         }

         return controlPoints;
      },
      getControlPoints: function (result, closed, order, weights, controlPointNode)
      {
         const
            controlPoints = result || [ ],
            dimension     = controlPointNode .getSize (),
            haveWeights   = Boolean (weights),
            Vector        = haveWeights ? Vector4 : Vector3;

         if (controlPoints .haveWeights !== haveWeights)
         {
            controlPoints .haveWeights = haveWeights;
            controlPoints .length      = 0;
         }

         for (let i = 0; i < dimension; ++ i)
         {
            const cp = controlPoints [i] = controlPointNode .get1Point (i, controlPoints [i] || new Vector (0, 0, 0, 0));

            if (haveWeights)
               cp .w = weights [i];
         }

         controlPoints .length = dimension;

         if (closed)
         {
            for (let i = 1, size = order - 1; i < size; ++ i)
               controlPoints .push (controlPoints [i]);
         }

         return controlPoints;
      },
      getUVControlPoints: function (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode)
      {
         const
            controlPoints = result || [ ],
            haveWeights   = Boolean (weights),
            Vector        = haveWeights ? Vector4 : Vector3;

         if (controlPoints .haveWeights !== haveWeights)
         {
            controlPoints .haveWeights = haveWeights;
            controlPoints .length      = 0;
         }

         for (let u = 0; u < uDimension; ++ u)
         {
            let cp = controlPoints [u];

            if (! cp)
               cp = controlPoints [u] = [ ];

            for (let v = 0; v < vDimension; ++ v)
            {
               const index = v * uDimension + u;

               cp [v] = controlPointNode .get1Point (index, cp [v] || new Vector (0, 0, 0, 0));

               if (haveWeights)
                  cp [v] .w = weights [index];
            }

            cp .length = vDimension;

            if (vClosed)
            {
               for (let i = 1, length = vOrder - 1; i < length; ++ i)
                  cp .push (cp [i]);
            }
         }

         controlPoints .length = uDimension;

         if (uClosed)
         {
            for (let i = 1, length = uOrder - 1; i < length; ++ i)
               controlPoints .push (controlPoints [i]);
         }

         return controlPoints;
      },
      getTexControlPoints: function (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, controlPointNode)
      {
         const controlPoints = result || [ ];

         for (let u = 0; u < uDimension; ++ u)
         {
            let cp = controlPoints [u];

            if (! cp)
               cp = controlPoints [u] = [ ];

            for (let v = 0; v < vDimension; ++ v)
            {
               const index = v * uDimension + u;

               cp [v] = controlPointNode .get1Point (index, cp [v] || new Vector4 (0, 0, 0, 0));
            }

            cp .length = vDimension;

            if (vClosed)
            {
               for (let i = 1, length = vOrder - 1; i < length; ++ i)
                  cp .push (cp [i]);
            }
         }

         controlPoints .length = uDimension;

         if (uClosed)
         {
            for (let i = 1, length = uOrder - 1; i < length; ++ i)
               controlPoints .push (controlPoints [i]);
         }

         return controlPoints;
      },
   };

   return NURBS;
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


define ('x_ite/Components/NURBS/X3DParametricGeometryNode',[
   "x_ite/Components/Rendering/X3DGeometryNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/NURBS/NURBS",
],
function (X3DGeometryNode,
          X3DConstants,
          NURBS)
{
"use strict";

   function X3DParametricGeometryNode (executionContext)
   {
      X3DGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .X3DParametricGeometryNode);
   }

   X3DParametricGeometryNode .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
   {
      constructor: X3DParametricGeometryNode,
      getKnots: function (result, closed, order, dimension, knot)
      {
         return NURBS .getKnots (result, closed, order, dimension, knot);
      },
   });

   return X3DParametricGeometryNode;
});


define ('nurbs/src/utils/is-ndarray',[],function ()
{
'use strict';

   // Source: https://github.com/scijs/isndarray
   // By Kyle Robinson Young, MIT Licensed.

   return function (arr)
   {
      if (! arr)
         return false;

      if (! arr .dtype)
         return false;

      var re = new RegExp ('function View[0-9]+d(:?' + arr .dtype + ')+');

      return re .test (String (arr .constructor));
   };
});


define ('nurbs/src/utils/is-ndarray-like',[],function ()
{
'use strict';

   return function (arr)
   {
      if (!arr)
         return false;

      return (
         arr .data   !== undefined &&
         Array .isArray (arr .shape) &&
         arr .offset !== undefined &&
         arr .stride !== undefined
      );
   };
});


define ('nurbs/src/utils/is-array-like',[],function ()
{
'use strict';

   return function isArrayLike (data)
   {
      return Array .isArray (data) || ArrayBuffer .isView (data) || data .length !== undefined;
   };
});


define ('nurbs/src/utils/infer-type',[
   'nurbs/src/utils/is-ndarray',
   'nurbs/src/utils/is-ndarray-like',
   'nurbs/src/utils/is-array-like',
],
function (isNdarray,
          isNdarrayLike,
          isArrayLike)
{
'use strict';

   function inferType (x)
   {
      if (! x)
         return undefined;

      if (isNdarray (x) || isNdarrayLike (x))
      {
         if (x.dtype === 'generic')
            return inferType .GENERIC_NDARRAY;

         return inferType .NDARRAY;
      }
      else
      {
         if (isArrayLike (x))
         {
            for (var ptr = x; isArrayLike (ptr [0]); ptr = ptr [0])
               ;

            if ('x' in ptr)
               return inferType .ARRAY_OF_OBJECTS;

            // if (isArrayLike(x[0])) {
            return inferType .ARRAY_OF_ARRAYS;
            // }
            // return inferType.PACKED;
         }

         throw new Error('Unhandled data type. Got type: ' + (typeof x));
      }
   }

   inferType .ARRAY_OF_OBJECTS = 'Obj';
   inferType .ARRAY_OF_ARRAYS  = 'Arr';
   inferType .NDARRAY          = 'Nd';
   inferType .GENERIC_NDARRAY  = 'GenNd';
   inferType .PACKED           = 'PackArr';

   return inferType;
});


define ('nurbs/src/utils/cache-key',[
   'nurbs/src/utils/is-array-like',
],
function (isArrayLike)
{
'use strict';

   function capitalize (str) {
      return str[0].toUpperCase() + str.slice(1);
   }

   return function (nurbs, debug, checkBounds, pointType, weightType, knotType) {
      var d;
      var degreeParts = [];
      var hasAnyKnots = false;
      for (d = 0; d < nurbs.splineDimension; d++) {
         var hasKnots = isArrayLike(nurbs.knots) && isArrayLike(nurbs.knots[d]);
         if (hasKnots) hasAnyKnots = true;
         degreeParts.push(
            'Deg' +
            nurbs.degree[d] +
            (hasKnots ? '' : 'Uniform') +
            capitalize(nurbs.boundary[d])
         );
      }
      var parts = [
         [
            hasAnyKnots ? 'NU' : '',
            nurbs.weights ? 'RBS' : 'BS'
         ].join('') +
         nurbs.dimension + 'D',
         degreeParts.join('_')
      ];

      if (pointType) {
         parts.push(pointType + 'Pts');
      }
      if (weightType) {
         parts.push(weightType + 'Wts');
      }
      if (knotType) {
         parts.push(knotType + 'Kts');
      }

      if (debug) {
         parts.push('debug');
      }

      if (checkBounds) {
         parts.push('chk');
      }

      return parts.join('_');
   };
});


define ('nurbs/src/utils/variable',[],function ()
{
'use strict';

   var createVariable = function createVariable (name, nurbs) {
      return function (i, period) {
         if (i !== undefined && !Array.isArray(i)) i = [i];
         var dimAccessors = [];
         for (var j = 0; j < i.length; j++) {
            dimAccessors.push(createVariable.sum(i[j]));
         }
         if (period) {
            for (i = 0; i < dimAccessors.length; i++) {
               if (period[i] === undefined) continue;
               dimAccessors[i] = '(' + dimAccessors[i] + ' + ' + period[i] + ') % ' + period[i];
            }
         }
         return name + dimAccessors.join('_');
      };
   };

   createVariable.sum = function (parts) {
      parts = Array.isArray(parts) ? parts : [parts];
      parts = parts.filter(function (part) { return part !== undefined && part !== 0; });
      if (parts.length === 0) parts.push(0);
      return parts.join(' + ');
   };

   return createVariable;
});


define ('nurbs/src/utils/create-accessors',[
   'nurbs/src/utils/infer-type',
   'nurbs/src/utils/variable',
],
function (inferType,
          createVariable)
{
'use strict';

   var properties = ['.x', '.y', '.z', '.w'];

   function wrapAccessor (callback)
   {
      return function (i, period)
      {
         if (i !== undefined && ! Array .isArray(i))
            i = [i];

         var dimAccessors = [ ];

         for (var j = 0; j < i .length; j ++)
            dimAccessors .push (createVariable .sum (i [j]));

         if (period)
         {
            for (i = 0; i < dimAccessors .length; i++)
            {
               if (period [i] === undefined)
                  continue;

               dimAccessors [i] = '(' + dimAccessors [i] + ' + ' + period [i] + ') % ' + period [i];
            }
         }
         return callback (dimAccessors);
      };
   }

   function createAccessor (name, data)
   {
      if (! data)
         return undefined;

      switch (inferType(data))
      {
         case inferType .ARRAY_OF_OBJECTS:
         {
            return wrapAccessor (function (accessors)
            {
               var e = accessors .pop ();

               return name + '[' + accessors .join ('][') + ']' + properties [e];
            });
         }
         case inferType .ARRAY_OF_ARRAYS:
         {
            return wrapAccessor (function (accessors)
            {
               return name + '[' + accessors .join ('][') + ']';
            });
         }
         case inferType .GENERIC_NDARRAY:
         {
            return wrapAccessor(function (accessors)
            {
               return name + '.get(' + accessors.join(',') + ')';
            });
         }
         case inferType .NDARRAY:
         {
            return wrapAccessor(function (accessors)
            {
               var code = [name + 'Offset'];

               for (var i = 0; i < accessors.length; i++)
               {
                  code.push(name + 'Stride' + i + ' * (' + accessors[i] + ')');
               }

               return name + '[' + code.join(' + ') + ']';
            });
         }
         case inferType.PACKED:
         default:
            return undefined;
      }
   }

   return function (nurbs)
   {
      var accessors = { };

      var accessor = createAccessor ('x', nurbs .points);

      if (accessor)
         accessors .point = accessor;

      var accessor = createAccessor ('w', nurbs .weights);

      if (accessor)
         accessors .weight = accessor;

      var accessor = createAccessor ('k', nurbs .knots);

      if (accessor)
         accessors .knot = accessor;

      return accessors;
   };
});


define ('nurbs/src/numerical-derivative',[],function ()
{
'use strict';

   var args = [];
   var tmp = [];

   return function numericalDerivative (out, order, dimension) {
      if (order !== 1) {
         throw new Error('Numerical derivative not implemented for order n = ' + order + '.');
      }

      var i;
      var h = arguments[this.splineDimension + 3] === undefined ? 1e-4 : arguments[this.splineDimension + 3];

      args.length = this.splineDimension;
      for (i = 0; i < this.splineDimension; i++) {
         args[i + 1] = arguments[i + 3];
      }

      var domain = this.domain;
      var k0 = domain[dimension][0];
      var k1 = domain[dimension][1];

      var tm, tp, T;
      var t0 = args[dimension + 1];
      var dt = (k1 - k0) * h;
      if (this.boundary[dimension] === 'closed') {
         T = k1 - k0;
         tm = k0 + ((t0 - k0 - dt + T) % T);
         tp = k0 + ((t0 - k0 + dt + T) % T);
         dt *= 2;
      } else {
         tm = Math.min(k1, Math.max(k0, t0 - dt));
         tp = Math.min(k1, Math.max(k0, t0 + dt));
         dt = tp - tm;
      }

      args[dimension + 1] = tm;
      args[0] = tmp;
      this.evaluate.apply(null, args);

      args[dimension + 1] = tp;
      args[0] = out;
      this.evaluate.apply(null, args);

      for (i = 0; i < this.dimension; i++) {
         out[i] = (out[i] - tmp[i]) / dt;
      }

      return out;
   };
});


define ('nurbs/src/utils/ndloop',[],function ()
{
'use strict';

   return function ndloop (n, callback) {
      for (var m = 1, k = 0, i = []; k < n.length; k++) {
         m *= Array.isArray(n[k]) ? (n[k][1] - n[k][0]) : n[k];
         i[k] = Array.isArray(n[k]) ? n[k][0] : 0;
      }
      for (var ptr = 0; ptr < m; ptr++) {
         callback(i.slice());
         for (k = n.length - 1; k >= 0; k--) {
            if (i[k] === (Array.isArray(n[k]) ? n[k][1] : n[k]) - 1) {
               i[k] = Array.isArray(n[k]) ? n[k][0] : 0;
            } else {
               i[k]++;
               break;
            }
         }
      }
   };
});


define ('nurbs/src/utils/accessor-preamble',[
   'nurbs/src/utils/infer-type',
],
function (inferType)
{
'use strict';

   return function (nurbs, variableName, propertyName, data)
   {
      var code = [ ];

      switch (inferType (data))
      {
         case inferType .NDARRAY:
         {
            code .push ('  var ' + variableName + ' = ' + propertyName + '.data;');
            code .push ('  var ' + variableName + 'Offset = ' + propertyName + '.offset;');

            for (var i = 0; i < data .dimension; i++) {
               code .push ('  var ' + variableName + 'Stride' + i + ' = ' + propertyName + '.stride[' + i + '];');
            }

            break;
         }
         case inferType .ARRAY_OF_OBJECTS:
         case inferType .ARRAY_OF_ARRAYS:
            code .push ('  var ' + variableName + ' = ' + propertyName + ';');
      }

      return code .join ('\n');
   };
});


define ('nurbs/src/utils/size-getter',[
   'nurbs/src/utils/is-ndarray-like',
],
function (isNdarrayLike)
{
'use strict';

   return function (data, dataVariableName, dimension) {
      if (!data) {
         return 'this.size[' + dimension + ']';
      } else if (isNdarrayLike(data)) {
         return dataVariableName + '.shape[' + dimension + ']';
      } else {
         var str = dataVariableName;
         for (var i = 0; i < dimension; i++) {
            str += '[0]';
         }
         return str + '.length';
      }
   };
});


define ('nurbs/src/evaluate',[
   'nurbs/src/utils/ndloop',
   'nurbs/src/utils/variable',
   'nurbs/src/utils/accessor-preamble',
   'nurbs/src/utils/infer-type',
   'nurbs/src/utils/is-array-like',
   'nurbs/src/utils/size-getter',
],
function (ndloop,
          variable,
          accessorPreamble,
          inferType,
          isArrayLike,
          sizeGetter)
{
'use strict';

   var evaluatorCache = {};
   var codeCache = {};

   return function (cacheKey, nurbs, accessors, debug, checkBounds, isBasis, derivative) {
      var splineDimension = nurbs.splineDimension;
      var i, j, n, m, d, kvar;

      var points = nurbs.points;
      var degree = nurbs.degree;
      var weights = nurbs.weights;
      var hasWeights = weights !== undefined;
      var knots = nurbs.knots;
      var spaceDimension = nurbs.dimension;
      var boundary = nurbs.boundary;

      if (derivative !== undefined && derivative !== null) {
         if (!Array.isArray(derivative)) {
            derivative = [derivative];
         }
         var totalDerivativeOrder = 0;
         for (i = 0; i < splineDimension; i++) {
            if (derivative[i] === undefined) derivative[i] = 0;
            totalDerivativeOrder += derivative[i];
         }
         if (hasWeights && totalDerivativeOrder > 1) {
            throw new Error('Analytical derivative not implemented for rational b-splines with order n = ' + totalDerivativeOrder + '.');
         }
      }

      if (isBasis) cacheKey = 'Basis' + cacheKey;
      if (derivative) cacheKey = 'Der' + derivative.join('_') + '_' + cacheKey;
      var cachedEvaluator = evaluatorCache[cacheKey];
      if (debug) {
         var logger = typeof debug === 'function' ? debug : console.log;
      }

      if (cachedEvaluator) {
         if (debug) {
            logger(codeCache[cacheKey]);
         }

         return cachedEvaluator.bind(nurbs);
      }

      var code = [];
      var functionName = 'evaluate' + cacheKey;

      var pointAccessor = accessors.point;
      if (isBasis) {
         pointAccessor = function (src, period) {
            var terms = [];
            for (var i = 0; i < src.length; i++) {
               var accessor = src[i];
               var terms2 = [];
               for (var j = 0; j < accessor.length; j++) {
                  if (accessor[j] !== 0) terms2.push(accessor[j]);
               }
               accessor = terms2.join(' + ');
               if (period[i]) {
                  accessor = '(' + accessor + ' + ' + period[i] + ') % ' + period[i];
               }
               terms.push(accessor + ' === ' + indexVar(i));
            }
            return '((' + terms.join(' && ') + ') ? 1 : 0)';
         };
      }
      var weightAccessor = accessors.weight;
      var knotAccessor = accessors.knot;

      var knotVar = variable('k');
      var pointVar = variable('x');
      var weightVar = variable('w');
      var indexVar = variable('i');
      var tVar = variable('t');
      var domainVar = debug ? 'domain' : 'd';
      var sizeVar = variable(debug ? 'size' : 's');
      var knotIndex = variable(debug ? 'knotIndex' : 'j');

      var allDimensionUniform = true;
      for (d = 0; d < splineDimension; d++) {
         if (isArrayLike(knots) && isArrayLike(knots[d])) {
            allDimensionUniform = false;
         }
      }

      // Just to indent properly and save lots of typing
      function line (str) {
         code.push('  ' + (str || ''));
      }
      function debugLine (str) {
         if (debug) line(str);
      }
      // function clog (str) {
         // if (debug) code.push('console.log("' + str + ' =", ' + str + ');');
      // }

      if (isBasis) {
         var indexArgs = [];
      }
      var parameterArgs = [];
      for (i = 0; i < splineDimension; i++) {
         if (isBasis) {
            indexArgs.push(indexVar([i]));
         }
         parameterArgs.push(tVar([i]));
      }

      code.push('function ' + functionName + ' (' +
         (isBasis ? '' : 'out, ') +
         parameterArgs.join(', ') +
         (isBasis ? ', ' + indexArgs.join(', ') : '') +
         ') {');

      line('var h, m, a, b;');

      if (checkBounds) {
         line('var ' + domainVar + ' = this.domain;');
         line('for (var i = 0; i < this.splineDimension; i++) {');
         line('  a = arguments[i + 1];');
         line('  if (a < ' + domainVar + '[i][0] || a > ' + domainVar + '[i][1] || a === undefined || isNaN(a)) {');
         line('    throw new Error(\'Invalid Spline parameter in dimension \'+i+\'. Valid domain is [\'+' + domainVar + '[i][0]+\', \'+' + domainVar + '[i][1]+\']. but got t\'+i+\' = \'+arguments[i + 1]+\'.\');');
         line('  }');
         line('}');
      }

      for (d = 0; d < splineDimension; d++) {
         line('var ' + sizeVar(d) + ' = ' + sizeGetter(points, 'this.points', d) + ';');
      }
      code.push(accessorPreamble(nurbs, 'x', 'this.points', points));

      if (hasWeights) {
         code.push(accessorPreamble(nurbs, 'w', 'this.weights', weights));
      }

      if (!allDimensionUniform) {
         code.push(accessorPreamble(nurbs, 'k', 'this.knots', knots));
      }

      function ternary (cond, a, b) {
         return '(' + cond + ') ? (' + a + ') : (' + b + ')';
      }

      var hasKnots = [];
      for (d = 0; d < splineDimension; d++) {
         switch (inferType(knots)) {
            case inferType.NDARRAY:
               hasKnots[d] = true;
               break;
            case inferType.ARRAY_OF_ARRAYS:
               hasKnots[d] = isArrayLike(knots[d]);
               break;
         }
      }

      for (d = 0; d < splineDimension; d++) {
         if (hasKnots[d]) {
            //
            // LOCATE KNOTS
            //
            debugLine('\n  // Bisect to locate the knot interval in dimension ' + d + '\n');
            line('var ' + knotIndex(d) + ' = 0;');
            line('h = ' + sizeVar(d) + ';');
            line('while(h > ' + knotIndex(d) + ' + 1) {');
            line('  m = 0.5 * (h + ' + knotIndex(d) + ') | 0;');
            line('  if (' + knotAccessor([d, 'm']) + ' > ' + tVar(d) + ') h = m;');
            line('  else ' + knotIndex(d) + ' = m;');
            line('}');

            debugLine('\n  // Fetch knots for dimension ' + d + '\n');

            for (i = -degree[d] + 1; i <= degree[d]; i++) {
               if (boundary[d] === 'closed') {
                  if (i < 0) {
                     // line('var ' + knotVar([d, i + degree[d] - 1]) + ' = ' + knotAccessor([d, [knotIndex(d), i]]) + ';');
                     // EDIT THIS SECTION
                     line('var ' + knotVar([d, i + degree[d] - 1]) + ' = ' + ternary(
                        knotIndex(d) + ' < ' + (-i),
                        knotAccessor([d, 0]) + ' + ' + knotAccessor([d, [sizeVar(d), knotIndex(d), i]]) + ' - ' + knotAccessor([d, [sizeVar(d)]]),
                        knotAccessor([d, [knotIndex(d), i]])
                     ) + ';');
                  } else if (i > 0) {
                     line('var ' + knotVar([d, i + degree[d] - 1]) + ' = ' + ternary(
                        knotIndex(d) + ' + ' + i + ' > ' + sizeVar(d),
                        // knotAccessor([d, sizeVar(d)]) + ' + ' + knotAccessor([d, i]) + ' - ' + knotAccessor([d, 0]),
                        knotAccessor([d, sizeVar(d)]) + ' + ' + knotAccessor([d, i + ' + ' + knotIndex(d) + ' - ' + sizeVar(d)]) + ' - ' + knotAccessor([d, 0]),
                        knotAccessor([d, [knotIndex(d), i]])
                     ) + ';');
                  } else {
                     line('var ' + knotVar([d, i + degree[d] - 1]) + ' = ' + knotAccessor([d, [knotIndex(d), i]]) + ';');
                  }
               } else {
                  line('var ' + knotVar([d, i + degree[d] - 1]) + ' = ' + knotAccessor([d, [knotIndex(d), i]]) + ';');
               }
            }
         } else {
            //
            // UNIFORM B-SPLINE
            //
            debugLine('\n  // Directly compute knot interval for dimension ' + d + '\n');

            if (boundary[d] === 'closed') {
               line(knotIndex(d) + ' = (' + tVar(d) + ' | 0) % ' + sizeVar(d) + ';');
            } else {
               line(knotIndex(d) + ' = (' + tVar(d) + ' | 0);');
               line('if (' + knotIndex(d) + ' < ' + degree[d] + ') ' + knotIndex(d) + ' = ' + degree[d] + ';');
               line('if (' + knotIndex(d) + ' > ' + sizeVar(d) + ' - 1) ' + knotIndex(d) + ' = ' + sizeVar(d) + ' - 1;');
            }

            debugLine('\n  // Compute and clamp knots for dimension ' + d + '\n');
            for (i = -degree[d] + 1; i <= degree[d]; i++) {
               kvar = knotVar([d, i + degree[d] - 1]);
               line('var ' + kvar + ' = ' + knotIndex(d) + ' + ' + (i) + ';');
            }

            if (boundary[d] === 'clamped') {
               for (i = -degree[d] + 1; i <= degree[d]; i++) {
                  kvar = knotVar([d, i + degree[d] - 1]);
                  if (i < 0) {
                     line('if (' + kvar + ' < ' + degree[d] + ') ' + kvar + ' = ' + degree[d] + ';');
                  }
                  if (i > 0) {
                     line('if (' + kvar + ' > ' + sizeVar(d) + ') ' + kvar + ' = ' + sizeVar(d) + ';');
                  }
               }
            }

            if (boundary[d] === 'closed') {
               debugLine('\n  // Wrap the B-Spline parameter for closed boundary');
               line(tVar(d) + ' %= ' + sizeVar(d) + ';');
            }
         }
      }

      for (d = 0, n = []; d < splineDimension; d++) {
         n[d] = degree[d] + 1;
      }

      if (hasWeights) {
         debugLine('\n  // Fetch weights\n');
         ndloop(n, function (dst) {
            var readIdx = [];
            var period = [];
            for (var d = 0; d < splineDimension; d++) {
               readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
               if (boundary[d] === 'closed' && dst[d] - degree[d] < 0) period[d] = sizeVar(d);
            }
            line('var ' + weightVar(dst) + ' = ' + weightAccessor(readIdx, period) + ';');
         });
      }

      if (debug) {
         if (hasWeights) {
            line('\n  // Fetch points and project into homogeneous (weighted) coordinates\n');
         } else {
            line('\n  // Fetch points\n');
         }
      }

      ndloop(n, function (dst) {
         var readIdx = [];
         var period = [];
         for (var d = 0; d < splineDimension; d++) {
            readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
            if (boundary[d] === 'closed' && dst[d] - degree[d] < 0) period[d] = sizeVar(d);
         }
         if (isBasis) {
            if (hasWeights) {
               line('var ' + pointVar(dst) + ' = ' + pointAccessor(readIdx, period) + ' * ' + weightVar(dst) + ';');
            } else {
               line('var ' + pointVar(dst) + ' = ' + pointAccessor(readIdx, period) + ';');
            }
         } else {
            for (d = 0; d < spaceDimension; d++) {
               var dstWithDim = dst.concat(d);
               readIdx[splineDimension] = d;
               if (hasWeights) {
                  line('var ' + pointVar(dstWithDim) + ' = ' + pointAccessor(readIdx, period) + ' * ' + weightVar(dst) + ';');
               } else {
                  line('var ' + pointVar(dstWithDim) + ' = ' + pointAccessor(readIdx, period) + ';');
               }
            }
         }
      });
      debugLine('\n');

      debugLine('// Perform De Boor\'s algorithm');
      for (d = n.length - 1; d >= 0; d--) {
         n[d] = [degree[d], degree[d] + 1];
         for (i = 0; i < degree[d]; i++) {
            debugLine('\n  // Degree ' + degree[d] + ' evaluation in dimension ' + d + ', step ' + (i + 1) + '\n');
            for (j = degree[d]; j > i; j--) {
               var isDerivative = derivative && (degree[d] - i - derivative[d] <= 0);

               if (isDerivative) {
                  line('m = 1 / (' + knotVar([d, j - i + degree[d] - 1]) + ' - ' + knotVar([d, j - 1]) + ');');
                  if (hasWeights) {
                     line('a = (' + tVar(d) + ' - ' + knotVar([d, j - 1]) + ') * m;');
                     line('b = 1 - a;');
                  }
               } else {
                  line('a = (' + tVar(d) + ' - ' + knotVar([d, j - 1]) + ') / (' + knotVar([d, j - i + degree[d] - 1]) + ' - ' + knotVar([d, j - 1]) + ');');
                  line('b = 1 - a;');
               }

               if (hasWeights) {
                  ndloop(n, function (ii) {
                     var ij = ii.slice();
                     var ij1 = ii.slice();
                     ij[d] = j;
                     ij1[d] = j - 1;
                     if (isDerivative && hasWeights) line('h = ' + weightVar(ij) + ';');
                     line(weightVar(ij) + ' = b * ' + weightVar(ij1) + ' + a * ' + weightVar(ij) + ';');
                  });
               }
               ndloop(n, function (ii) {
                  var weightFactor, pt1, pt2;
                  var ij = ii.slice();
                  var ij1 = ii.slice();
                  // Replace the dimension being interpolated with the interpolation indices
                  ij[d] = j;
                  ij1[d] = j - 1;
                  // Create a version to which we can append the dimension when we loop over spatial dimension
                  if (isDerivative) {
                     var derivCoeff = i + 1;
                     if (isBasis) {
                        weightFactor = hasWeights ? 'h * ' + weightVar(ij1) + ' / ' + weightVar(ij) + ' * ' : '';
                        pt1 = pointVar(ij) + (hasWeights ? ' / h' : '');
                        pt2 = pointVar(ij1) + (hasWeights ? ' / ' + weightVar(ij1) : '');
                        line(pointVar(ij) + ' = ' + derivCoeff + ' * ' + weightFactor + '(' + pt1 + ' - ' + pt2 + ') * m;');
                     } else {
                        var ijWithDimension = ij.slice();
                        var ij1WithDimension = ij1.slice();
                        for (m = 0; m < spaceDimension; m++) {
                           ijWithDimension[splineDimension] = ij1WithDimension[splineDimension] = m;
                           weightFactor = hasWeights ? 'h * ' + weightVar(ij1) + ' / ' + weightVar(ij) + ' * ' : '';
                           pt1 = pointVar(ijWithDimension) + (hasWeights ? ' / h' : '');
                           pt2 = pointVar(ij1WithDimension) + (hasWeights ? ' / ' + weightVar(ij1) : '');
                           line(pointVar(ijWithDimension) + ' = ' + derivCoeff + ' * ' + weightFactor + '(' + pt1 + ' - ' + pt2 + ') * m;');
                        }
                     }
                  } else {
                     if (isBasis) {
                        line(pointVar(ij) + ' = b * ' + pointVar(ij1) + ' + a * ' + pointVar(ij) + ';');
                     } else {
                        for (m = 0; m < spaceDimension; m++) {
                           ij[splineDimension] = ij1[splineDimension] = m;
                           line(pointVar(ij) + ' = b * ' + pointVar(ij1) + ' + a * ' + pointVar(ij) + ';');
                        }
                     }
                  }
               });
               debugLine('\n');
            }
         }
      }

      if (debug) {
         if (hasWeights) {
            line('\n  // Project back from homogeneous coordinates and return final output\n');
         } else {
            line('\n  // Return final output\n');
         }
      }
      if (isBasis) {
         if (hasWeights) {
            line('return ' + pointVar(degree) + ' / ' + weightVar(degree) + ';');
         } else {
            line('return ' + pointVar(degree) + ';');
         }
      } else {
         for (d = 0; d < spaceDimension; d++) {
            if (hasWeights) {
               line('out[' + d + '] = ' + pointVar(degree.concat([d])) + ' / ' + weightVar(degree) + ';');
            } else {
               line('out[' + d + '] = ' + pointVar(degree.concat([d])) + ';');
            }
         }
      }
      if (!isBasis) {
         line('return out;');
      }
      code.push('}');

      if (debug) {
         var codeStr = code.join('\n');
         logger(codeStr);

         codeCache[cacheKey] = codeStr;
      }

      var evaluator = new Function([code.join('\n'), '; return ', functionName].join(''))();
      evaluatorCache[cacheKey] = evaluator;
      return evaluator.bind(nurbs);
   };
});


define ('nurbs/src/transform',[
   'nurbs/src/utils/accessor-preamble',
   'nurbs/src/utils/size-getter',
   'nurbs/src/utils/variable',
],
function (accessorPreamble,
          sizeGetter,
          variable)
{
'use strict';

   var transformerCache = {};

   return function createTransform (cacheKey, nurbs, accessors, debug) {
      var i, j, iterator, iterators, terms, n, rvalue, lvalue;
      var cachedTransformer = transformerCache[cacheKey];
      if (cachedTransformer) {
         return cachedTransformer.bind(nurbs);
      }

      var code = [];
      var functionName = 'transform' + cacheKey;

      code.push('function ' + functionName + '(m) {');
      code.push('var i, w;');
      code.push(accessorPreamble(nurbs, 'x', 'this.points', nurbs.points));

      var sizeVar = variable(debug ? 'size' : 's');
      for (i = 0; i < nurbs.splineDimension; i++) {
         code.push('var ' + sizeVar(i) + ' = ' + sizeGetter(nurbs.points, 'this.points', i) + ';');
      }

      iterators = [];
      for (i = 0; i < nurbs.splineDimension; i++) {
         iterator = 'i' + i;
         iterators.push(iterator);
         code.push('for (' + iterator + ' = ' + sizeVar(i) + '- 1; ' + iterator + ' >= 0; ' + iterator + '--) {');
      }

      for (i = 0; i < nurbs.dimension; i++) {
         code.push('x' + i + ' = ' + accessors.point(iterators.concat([i])));
      }

      terms = [];
      for (i = 0; i < nurbs.dimension; i++) {
         terms.push('m[' + ((nurbs.dimension + 1) * (i + 1) - 1) + '] * x' + i);
      }
      terms.push('m[' + ((nurbs.dimension + 1) * (nurbs.dimension + 1) - 1) + ']');
      code.push('var w = (' + terms.join(' + ') + ') || 1.0;');

      for (i = 0; i < nurbs.dimension; i++) {
         terms = [];
         n = nurbs.dimension;
         for (j = 0; j < n; j++) {
            terms.push('m[' + (j * (n + 1) + i) + '] * x' + j);
         }
         terms.push('m[' + (j * (n + 1) + i) + ']');
         lvalue = accessors.point(iterators.concat([i]));
         rvalue = '(' + terms.join(' + ') + ') / w';
         code.push(lvalue + ' = ' + rvalue + ';');
      }

      for (i = nurbs.splineDimension - 1; i >= 0; i--) {
         code.push('}');
      }

      code.push('return this;');
      code.push('}');

      var transform = new Function([code.join('\n'), '; return ', functionName].join(''))();

      if (debug) console.log(code.join('\n'));

      transformerCache[cacheKey] = transform;
      return transform.bind(nurbs);
   };
});


define ('nurbs/src/support',[
   'nurbs/src/utils/ndloop',
   'nurbs/src/utils/variable',
   'nurbs/src/utils/accessor-preamble',
   'nurbs/src/utils/infer-type',
   'nurbs/src/utils/is-array-like',
   'nurbs/src/utils/size-getter',
],
function (ndloop,
          variable,
          accessorPreamble,
          inferType,
          isArrayLike,
          sizeGetter)
{
'use strict';

   var supportCache = {};

   return function (cacheKey, nurbs, accessors, debug, checkBounds) {
      var cachedSupport = supportCache[cacheKey];
      if (cachedSupport) {
         return cachedSupport.bind(nurbs);
      }

      var degree = nurbs.degree;
      var knots = nurbs.knots;
      var splineDimension = nurbs.splineDimension;
      var boundary = nurbs.boundary;

      var i, n, d;
      var code = [];
      var functionName = 'support' + cacheKey;

      var knotAccessor = accessors.knot;

      var tVar = variable('t');
      var domainVar = debug ? 'domain' : 'd';
      var sizeVar = variable(debug ? 'size' : 's');
      var knotIndex = variable(debug ? 'knotIndex' : 'i');

      var allDimensionUniform = true;
      for (d = 0; d < splineDimension; d++) {
         if (isArrayLike(knots) && isArrayLike(knots[d])) {
            allDimensionUniform = false;
         }
      }

      // Just to indent properly and save lots of typing
      function line (str) {
         code.push('  ' + (str || ''));
      }

      var parameterArgs = [];
      for (i = 0; i < splineDimension; i++) {
         parameterArgs.push(tVar([i]));
      }

      code.push('function ' + functionName + ' (out, ' + parameterArgs.join(', ') + ') {');

      var c = 0;
      function pushSupport (args, period) {
         if (period === undefined) {
            line('out[' + (c++) + '] = ' + args.join(' + ') + ';');
         } else {
            line('out[' + (c++) + '] = (' + args.join(' + ') + ' + ' + period + ') % ' + period + ';');
         }
      }

      line('var h, m;');
      line('var c = 0;');

      if (checkBounds) {
         line('var ' + domainVar + ' = this.domain;');
         line('for (var i = 0; i < this.splineDimension; i++) {');
         line('  a = arguments[i + 1];');
         line('  if (a < ' + domainVar + '[i][0] || a > ' + domainVar + '[i][1] || a === undefined || isNaN(a)) {');
         line('    throw new Error(\'Invalid Spline parameter in dimension \'+i+\'. Valid domain is [\'+' + domainVar + '[i][0]+\', \'+' + domainVar + '[i][1]+\']. but got t\'+i+\' = \'+arguments[i + 1]+\'.\');');
         line('  }');
         line('}');
      }

      for (d = 0; d < splineDimension; d++) {
         line('var ' + sizeVar(d) + ' = ' + sizeGetter(nurbs.points, 'this.points', d) + ';');
      }

      if (!allDimensionUniform) {
         code.push(accessorPreamble(nurbs, 'k', 'this.knots', knots));
      }

      var hasKnots = [];
      for (d = 0; d < splineDimension; d++) {
         switch (inferType(knots)) {
            case inferType.NDARRAY:
               hasKnots[d] = true;
               break;
            case inferType.ARRAY_OF_ARRAYS:
               hasKnots[d] = isArrayLike(knots[d]);
               break;
         }
      }

      for (d = 0; d < splineDimension; d++) {
         if (hasKnots[d]) {
            line('var ' + knotIndex(d) + ' = 0;');
            line('h = ' + sizeVar(d) + ';');
            line('while(h > ' + knotIndex(d) + ' + 1) {');
            line('  m = 0.5 * (h + ' + knotIndex(d) + ') | 0;');
            line('  if (' + knotAccessor([d, 'm']) + ' > ' + tVar(d) + ') h = m;');
            line('  else ' + knotIndex(d) + ' = m;');
            line('}');
         } else {
            if (boundary[d] === 'closed') {
               line(knotIndex(d) + ' = (' + tVar(d) + ' | 0) % ' + sizeVar(d) + ';');
            } else {
               line(knotIndex(d) + ' = (' + tVar(d) + ' | 0);');
               line('if (' + knotIndex(d) + ' < ' + degree[d] + ') ' + knotIndex(d) + ' = ' + degree[d] + ';');
               line('if (' + knotIndex(d) + ' > ' + sizeVar(d) + ' - 1) ' + knotIndex(d) + ' = ' + sizeVar(d) + ' - 1;');
            }
         }
      }

      for (d = 0, n = []; d < splineDimension; d++) {
         n[d] = degree[d] + 1;
      }

      ndloop(n, function (dst) {
         var readIdx = [];
         var period = [];
         for (var d = 0; d < splineDimension; d++) {
            readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
            if (boundary[d] === 'closed' && dst[d] - degree[d] < 0) period[d] = sizeVar(d);
         }
         for (d = 0; d < splineDimension; d++) {
            pushSupport(readIdx[d], period[d]);
         }
      });

      line('out.length = ' + c + ';');

      line('return out;');
      code.push('}');

      if (debug) console.log(code.join('\n'));

      var evaluator = new Function([code.join('\n'), '; return ', functionName].join(''))();
      supportCache[cacheKey] = evaluator;
      return evaluator.bind(nurbs);
   };
});


define ('nurbs/extras/sample',[
   "standard/Math/Numbers/Vector3",
   "standard/Math/Geometry/Triangle3",
],
function (Vector3,
          Triangle3)
{
'use strict';

   var tmp1 = [ ];

   return function (mesh, surface, opts)
   {
      mesh = mesh || { };
      opts = opts || { };

      var
         points      = mesh .points = mesh .points || [ ],
         faces       = mesh .faces  = mesh .faces  || [ ],
         haveWeights = opts .haveWeights;

      var dimension = surface .dimension - haveWeights;

      if (Array .isArray (opts .resolution))
      {
         var resolution = opts .resolution;
      }
      else
      {
         var
            res        = opts .resolution === undefined ? 31 : opts .resolution,
            resolution = new Array (surface .splineDimension) .fill (res);
      }

      switch (surface .splineDimension)
      {
         case 1:
         {
            var
               nu         = resolution [0],
               uClosed    = surface .boundary [0] === 'closed',
               nuBound    = nu + ! uClosed,
               nbVertices = nuBound * dimension,
               domain     = opts .domain || surface .domain,
               uDomain    = domain [0],
               uDistance  = uDomain [1] - uDomain [0];

            for (var i = 0; i < nuBound; ++ i)
            {
               var
                  u   = uDomain [0] + uDistance * i / nu,
                  ptr = i * dimension;

               surface .evaluate (tmp1, u);

               if (haveWeights)
               {
                  var w = tmp1 [dimension];

                  for (var d = 0; d < dimension; ++ d)
                     points [ptr + d] = tmp1 [d] / w;
               }
               else
               {
                  for (var d = 0; d < dimension; ++ d)
                     points [ptr + d] = tmp1 [d];
               }
            }

            points .length = nbVertices;
            break;
         }
         case 2:
         {
            var
               nu         = resolution [0],
               nv         = resolution [1],
               uClosed    = surface .boundary [0] === 'closed',
               vClosed    = surface .boundary [1] === 'closed',
               nuBound    = nu + ! uClosed,
               nvBound    = nv + ! vClosed,
               nbVertices = nuBound * nvBound * dimension,
               domain     = opts .domain || surface .domain,
               uDomain    = domain [0],
               vDomain    = domain [1],
               uDistance  = uDomain [1] - uDomain [0],
               vDistance  = vDomain [1] - vDomain [0];

            // Generate points.

            for (var i = 0; i < nuBound; ++ i)
            {
               var u = uDomain [0] + uDistance * i / nu;

               for (var j = 0; j < nvBound; ++ j)
               {
                  var
                     v   = vDomain [0] + vDistance * j / nv,
                     ptr = (i + nuBound * j) * dimension;

                  surface .evaluate (tmp1, u, v);

                  if (haveWeights)
                  {
                     var w = tmp1 [dimension];

                     for (var d = 0; d < dimension; ++ d)
                        points [ptr + d] = tmp1 [d] / w;
                  }
                  else
                  {
                     for (var d = 0; d < dimension; ++ d)
                        points [ptr + d] = tmp1 [d];
                  }
               }
            }

            points .length = nbVertices;

            // Generate faces.

            var
               uClosed = opts .closed [0],
               vClosed = opts .closed [1];

            var c = 0;

            for (var i = 0; i < nu; ++ i)
            {
              var
                  i0 = i,
                  i1 = i + 1;

               if (uClosed)
                  i1 = i1 % nu;

               for (var j = 0; j < nv; ++ j)
               {
                  var j0 = j;
                  var j1 = j + 1;

                  if (vClosed)
                     j1 = j1 % nv;

                  // Triangle 1

                  faces [c ++] = i0 + nuBound * j0; // 1
                  faces [c ++] = i1 + nuBound * j0; // 2
                  faces [c ++] = i1 + nuBound * j1; // 3

                  // Triangle 2

                  faces [c ++] = i0 + nuBound * j0; // 1
                  faces [c ++] = i1 + nuBound * j1; // 3
                  faces [c ++] = i0 + nuBound * j1; // 4
               }
            }

            faces .length = c;

            /*
            // Trimming Contours

            if (opts .trimmingContours)
            {
               var holes = [ ];

               var trimmingContours = opts .trimmingContours;

               for (var t = 0, iLength = trimmingContours .length; t < iLength; ++ t)
               {
                  var
                     trimmingContour = trimmingContours [t],
                     hole            = [ ];

                  for (var p = 0, pLength = trimmingContour .length; p < pLength; ++ p)
                  {
                     var point = trimmingContour [p];

                     surface .evaluate (tmp1, point .x, point .y);

                     for (var d = 0; d < dimension; ++ d)
                        points .push (tmp1 [d]);

                     var vertex = new Vector3 (tmp1 [0], tmp1 [1], tmp1 [2]);

                     vertex .index = c ++;

                     hole .push (vertex);
                  }

                  holes .push (hole);
               }

               var
                  curves    = [ ],
                  triangles = [ ],
                  trimmed   = [ ];

               for (var v = 0, fLength = faces .length; v < fLength; v += 3)
               {
                  curves    .length = 0;
                  triangles .length = 0;

                  var
                     index1 = faces [v]     * 3,
                     index2 = faces [v + 1] * 3,
                     index3 = faces [v + 2] * 3;

                  var
                     vertex1 = new Vector3 (points [index1], points [index1 + 1], points [index1 + 2]),
                     vertex2 = new Vector3 (points [index2], points [index2 + 1], points [index2 + 2]),
                     vertex3 = new Vector3 (points [index3], points [index3 + 1], points [index3 + 2]);

                  vertex1 .index = v;
                  vertex2 .index = v + 1;
                  vertex3 .index = v + 2;

                  curves .push ([ vertex1, vertex2, vertex3 ]);
                  curves .push .apply (curves, holes);
                  curves .push (triangles);

                  Triangle3 .triangulatePolygon .apply (Triangle3, curves);

                  for (var t = 0, tLength = triangles .length; t < tLength; ++ t)
                     trimmed .push (triangles [t] .index);
               }

               mesh .faces = trimmed;
            }
            */

            break;
         }
         default:
            throw new Error('Can only sample curves and surfaces');
      }

      return mesh;
   };
});


define ('nurbs/nurbs',[
   'nurbs/src/utils/infer-type',
   'nurbs/src/utils/cache-key',
   'nurbs/src/utils/is-ndarray',
   'nurbs/src/utils/is-ndarray-like',
   'nurbs/src/utils/create-accessors',
   'nurbs/src/numerical-derivative',
   'nurbs/src/utils/is-array-like',
   'nurbs/src/evaluate',
   'nurbs/src/transform',
   'nurbs/src/support',
   "nurbs/extras/sample",
],
function (inferType,
          computeCacheKey,
          isNdarray,
          isNdarrayLike,
          createAccessors,
          numericalDerivative,
          isArrayLike,
          createEvaluator,
          createTransform,
          createSupport,
          sample)
{
'use strict';

   var BOUNDARY_TYPES = {
      open: 'open',
      closed: 'closed',
      clamped: 'clamped'
   };

   function isBlank (x) {
      return x === undefined || x === null;
   }

   function parseNURBS (points, degree, knots, weights, boundary, opts) {
      var i, dflt;

      if (points && !isArrayLike(points) && !isNdarray(points)) {
         opts = points;
         this.debug = points.debug;
         this.checkBounds = !!points.checkBounds;
         this.weights = points.weights;
         this.knots = points.knots;
         this.degree = points.degree;
         this.boundary = points.boundary;
         this.points = points.points;
         Object.defineProperty(this, 'size', {value: opts.size, writable: true, configurable: true});
      } else {
         opts = opts || {};
         this.weights = weights;
         this.knots = knots;
         this.degree = degree;
         this.points = points;
         this.boundary = boundary;
         this.debug = opts.debug;
         this.checkBounds = !!opts.checkBounds;
         Object.defineProperty(this, 'size', {value: opts.size, writable: true, configurable: true});
      }

      var pointType  = inferType(this.points);
      var weightType = inferType(this.weights);
      var knotType   = inferType(this.knots);

      if (this.points) {
         //
         // Sanitize the points
         //
         switch (pointType) {
            case inferType.GENERIC_NDARRAY:
            case inferType.NDARRAY:
               Object.defineProperties(this, {
                  splineDimension: {
                     value: this.points.shape.length - 1,
                     writable: false,
                     configurable: true
                  },
                  dimension: {
                     value: this.points.shape[this.points.shape.length - 1],
                     writable: false,
                     configurable: true
                  },
                  size: {
                     get: function () {
                        return this.points.shape.slice(0, this.points.shape.length - 1);
                     },
                     set: function () {
                        throw new Error("Cannot assign to read only property 'size'");
                     },
                     configurable: true
                  }
               });
               break;

            case inferType.ARRAY_OF_OBJECTS:
            case inferType.ARRAY_OF_ARRAYS:
               // Follow the zeroth entries until we hit something that's not an array
               var splineDimension = 0;
               var size = this.size || [];
               size.length = 0;
               for (var ptr = this.points; isArrayLike(ptr[0]); ptr = ptr[0]) {
                  splineDimension++;
                  size.push(ptr.length);
               }
               if (splineDimension === 0) {
                  throw new Error('Expected an array of points');
               }

               Object.defineProperties(this, {
                  splineDimension: {
                     value: splineDimension,
                     writable: false,
                     configurable: true
                  },
                  dimension: {
                     value: ptr.length,
                     writable: false,
                     configurable: true
                  },
                  size: {
                     get: function () {
                        var size = [];
                        size.length = 0;
                        for (var i = 0, ptr = this.points; i < this.splineDimension; i++, ptr = ptr[0]) {
                           size[i] = ptr.length;
                        }
                        return size;
                     },
                     set: function () {
                        throw new Error("Cannot assign to read only property 'size'");
                     },
                     configurable: true
                  }
               });

               break;
            case inferType.PACKED:
            default:
               throw new Error('Expected either a packed array, array of arrays, or ndarray of points');
         }
      } else {
         if (this.size === undefined || this.size === null) {
            throw new Error('Either points or a control hull size must be provided.');
         }
         if (!isArrayLike(this.size)) {
            Object.defineProperty(this, 'size', {
               value: [this.size],
               writable: true,
               configurable: true
            });
         }
         if (this.size.length === 0) {
            throw new Error('`size` must be a number or an array of length at least one.');
         }

         Object.defineProperties(this, {
            splineDimension: {
               value: this.size.length,
               writable: false,
               configurable: true
            },
            dimension: {
               value: 0,
               writable: false,
               configurable: true
            }
         });
      }

      //
      // Sanitize the degree into an array
      //
      if (isArrayLike(this.degree)) {
         for (i = 0; i < this.splineDimension; i++) {
            if (isBlank(this.degree[i])) {
               throw new Error('Missing degree in dimension ' + (i + 1));
            }
         }
      } else {
         var hasBaseDegree = !isBlank(this.degree);
         var baseDegree = isBlank(this.degree) ? 2 : this.degree;
         this.degree = [];
         for (i = 0; i < this.splineDimension; i++) {
            if (this.size[i] <= baseDegree) {
               if (hasBaseDegree) {
                  throw new Error('Expected at least ' + (baseDegree + 1) + ' points for degree ' + baseDegree + ' spline in dimension ' + (i + 1) + ' but got only ' + this.size[i]);
               } else {
                  this.degree[i] = this.size[i] - 1;
               }
            } else {
               this.degree[i] = baseDegree;
            }
         }
      }

      //
      // Sanitize boundaries
      //
      dflt = (typeof this.boundary !== 'string') ? 'open' : this.boundary;
      if (!BOUNDARY_TYPES[dflt]) {
         throw new Error('Boundary type must be one of ' + Object.keys(BOUNDARY_TYPES) + '. Got ' + dflt);
      }
      this.boundary = isArrayLike(this.boundary) ? this.boundary : [];
      this.boundary.length = this.splineDimension;
      for (i = 0; i < this.splineDimension; i++) {
         this.boundary[i] = isBlank(this.boundary[i]) ? dflt : this.boundary[i];

         if (!BOUNDARY_TYPES[dflt]) {
            throw new Error('Boundary type must be one of ' + Object.keys(BOUNDARY_TYPES) + '. Got ' + dflt + ' for dimension ' + (i + 1));
         }
      }

      //
      // Sanitize knots
      //
      switch (knotType) {
         case inferType.ARRAY_OF_ARRAYS:
            // Wrap flat arrays in an array so that curves are more natural
            if (isArrayLike(this.knots) && this.knots.length > 0 && !isArrayLike(this.knots[0])) {
               this.knots = [this.knots];
            }

            for (i = 0; i < this.splineDimension; i++) {
               if (this.size[i] <= this.degree[i]) {
                  throw new Error('Expected at least ' + (this.degree[i] + 1) + ' points in dimension ' + (i + 1) + ' but got ' + this.size[i] + '.');
               }

               if (isArrayLike(this.knots[i])) {
                  if (this.boundary[i] !== 'closed' && this.knots[i].length !== this.degree[i] + this.size[i] + 1) {
                     throw new Error('Expected ' + (this.degree[i] + this.size[i] + 1) + ' knots in dimension ' + (i + 1) + ' but got ' + this.knots[i].length + '.');
                  } else if (this.boundary[i] === 'closed' && this.knots[i].length !== this.size[i] + 1) {
                     // Fudge factor allowance for just ignoring extra knots. This makes some allowance
                     // for passing regular clamped/open spline knots to a closed spline by ignoring extra
                     // knots instead of simply truncating.
                     var canBeFudged = this.knots[i].length === this.size[i] + this.degree[i] + 1;
                     if (!canBeFudged) {
                        throw new Error('Expected ' + (this.size[i] + 1) + ' knots for closed spline in dimension ' + (i + 1) + ' but got ' + this.knots[i].length + '.');
                     }
                  }
               }
            }
            break;
         case inferType.NDARRAY:
            break;
      }

      //
      // Create evaluator
      //
      var newCacheKey = computeCacheKey(this, this.debug, this.checkBounds, pointType, weightType, knotType);

      if (newCacheKey !== this.__cacheKey) {
         this.__cacheKey = newCacheKey;

         var accessors = createAccessors(this);

         this.evaluate = createEvaluator(this.__cacheKey, this, accessors, this.debug, this.checkBounds, false);
         this.transform = createTransform(this.__cacheKey, this, accessors, this.debug);
         this.support = createSupport(this.__cacheKey, this, accessors, this.debug, this.checkBounds);

         this.evaluator = function (derivativeOrder, isBasis) {
            return createEvaluator(this.__cacheKey, this, accessors, this.debug, this.checkBounds, isBasis, derivativeOrder);
         };
      }

      this.numericalDerivative = numericalDerivative.bind(this);

      return this;
   }

   function domainGetter () {
      var sizeArray;
      var ret = [];

      // If the reference to size is hard-coded, then the size cannot change, or
      // if you change points manually (like by appending a point) without re-running
      // the constructor, then it'll be incorrect. This aims for middle-ground
      // by querying the size directly, based on the point data type
      //
      // A pointer to the point array-of-arrays:
      var ptr = this.points;

      if (!ptr) {
         // If there are no points, then just use this.size
         sizeArray = this.size;
      } else if (isNdarrayLike(ptr)) {
         // If it's an ndarray, use the ndarray's shape property
         sizeArray = ptr.shape;
      }

      for (var d = 0; d < this.splineDimension; d++) {
         var size = sizeArray ? sizeArray[d] : ptr.length;
         var p = this.degree[d];
         var isClosed = this.boundary[d] === 'closed';

         if (this.knots && this.knots[d]) {
            var k = this.knots[d];
            ret[d] = [k[isClosed ? 0 : p], k[size]];
         } else {
            ret[d] = [isClosed ? 0 : p, size];
         }

         // Otherwise if it's an array of arrays, we get the size of the next
         // dimension by recursing into the points
         if (ptr) ptr = ptr[0];
      }
      return ret;
   }

   // Evaluate Non-Uniform Rational B-Splines (NURBS)
   // @param points {Array} - data array
   // @param degree {Array} - spline curve degree
   // @param knots {Array} - knot vector
   // @param weights {Array} - weight vector
   // @param opts {object} - additional options
   function nurbs (points, degree, knots, weights, boundary, opts)
   {
      var ctor = function (points, degree, knots, weights, boundary, opts)
      {
         parseFcn (points, degree, knots, weights, boundary, opts);
         return ctor;
      };

      var parseFcn = parseNURBS .bind (ctor);

      Object .defineProperty (ctor, 'domain',
      {
         get: domainGetter
      });

      parseFcn (points, degree, knots, weights, boundary, opts);

      return ctor;
   }

   nurbs .sample = sample;

   return nurbs;
});

define('nurbs', ['nurbs/nurbs'], function (main) { return main; });

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


define ('x_ite/Components/NURBS/NurbsCurve',[
   "x_ite/Base/X3DCast",
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/NURBS/X3DParametricGeometryNode",
   "x_ite/Components/Rendering/X3DLineGeometryNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/NURBS/NURBS",
   "nurbs",
],
function (X3DCast,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParametricGeometryNode,
          X3DLineGeometryNode,
          X3DConstants,
          NURBS,
          nurbs)
{
"use strict";

   function NurbsCurve (executionContext)
   {
      X3DParametricGeometryNode .call (this, executionContext);
      X3DLineGeometryNode       .call (this, executionContext);

      this .addType (X3DConstants .NurbsCurve);

      this .knots         = [ ];
      this .weights       = [ ];
      this .controlPoints = [ ];
      this .mesh          = { };
      this .sampleOptions = { resolution: [ ] };
   }

   NurbsCurve .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
      X3DLineGeometryNode .prototype,
   {
      constructor: NurbsCurve,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellation", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "closed",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",        new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "knot",         new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsCurve";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      initialize: function ()
      {
         X3DParametricGeometryNode .prototype .initialize .call (this);

         this ._controlPoint .addInterest ("set_controlPoint__", this);

         this .set_controlPoint__ ();
      },
      set_controlPoint__: function ()
      {
         if (this .controlPointNode)
            this .controlPointNode .removeInterest ("requestRebuild", this);

         this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._controlPoint);

         if (this .controlPointNode)
            this .controlPointNode .addInterest ("requestRebuild", this);
      },
      getTessellation: function (numKnots)
      {
         return NURBS .getTessellation (this ._tessellation .getValue (), numKnots - this ._order .getValue ());
      },
      getClosed: function (order, knot, weight, controlPointNode)
      {
         if (! this ._closed .getValue ())
            return false;

         return NURBS .getClosed (order, knot, weight, controlPointNode);
      },
      getWeights: function (result, dimension, weight)
      {
         return NURBS .getWeights (result, dimension, weight);
      },
      getControlPoints: function (result, closed, order, weights, controlPointNode)
      {
         return NURBS .getControlPoints (result, closed, order, weights, controlPointNode);
      },
      tessellate: function ()
      {
         if (this ._order .getValue () < 2)
            return [ ];

         if (! this .controlPointNode)
            return [ ];

         if (this .controlPointNode .getSize () < this ._order .getValue ())
            return [ ];

         const
            vertexArray = this .getVertices (),
            array       = [ ];

         if (vertexArray .length)
         {
            const length = vertexArray .length;

            for (let i = 0; i < length; i += 8)
               array .push (vertexArray [i], vertexArray [i + 1], vertexArray [i + 2]);

            array .push (vertexArray [length - 4], vertexArray [length - 3], vertexArray [length - 2]);
         }

         return array;
      },
      build: function ()
      {
         if (this ._order .getValue () < 2)
            return;

         if (! this .controlPointNode)
            return;

         if (this .controlPointNode .getSize () < this ._order .getValue ())
            return;

         // Order and dimension are now positive numbers.

         const
            closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this .controlPointNode),
            weights       = this .getWeights (this .weights, this .controlPointNode .getSize (), this ._weight),
            controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this .controlPointNode);

         // Knots

         const
            knots = this .getKnots (this .knots, closed, this ._order .getValue (), this .controlPointNode .getSize (), this ._knot),
            scale = knots .at (-1) - knots [0];

         // Initialize NURBS tessellator

         const degree = this ._order .getValue () - 1;

         const surface = this .surface = (this .surface || nurbs) ({
            boundary: ["open"],
            degree: [degree],
            knots: [knots],
            points: controlPoints,
            debug: false,
         });

         this .sampleOptions .resolution [0] = this .getTessellation (knots .length);
         this .sampleOptions .haveWeights    = Boolean (weights);

         const
            mesh        = nurbs .sample (this .mesh, surface, this .sampleOptions),
            points      = mesh .points,
            vertexArray = this .getVertices ();

         for (let i2 = 3, length = points .length; i2 < length; i2 += 3)
         {
            const i1 = i2 - 3;

            vertexArray .push (points [i1], points [i1 + 1], points [i1 + 2], 1);
            vertexArray .push (points [i2], points [i2 + 1], points [i2 + 2], 1);
         }
      },
   });

   return NurbsCurve;
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


define ('x_ite/Components/NURBS/NurbsCurve2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/NURBS/X3DNurbsControlCurveNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/NURBS/NURBS",
   "standard/Math/Numbers/Vector3",
   "nurbs",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNurbsControlCurveNode,
          X3DConstants,
          NURBS,
          Vector3,
          nurbs)
{
"use strict";

   function NurbsCurve2D (executionContext)
   {
      X3DNurbsControlCurveNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsCurve2D);

      this .knots         = [ ];
      this .weights       = [ ];
      this .controlPoints = [ ];
      this .mesh          = { };
      this .sampleOptions = { resolution: [ ] };
      this .array         = [ ];
   }

   NurbsCurve2D .prototype = Object .assign (Object .create (X3DNurbsControlCurveNode .prototype),
   {
      constructor: NurbsCurve2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellation", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "closed",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",        new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "knot",         new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .MFVec2d ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsCurve2D";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "children";
      },
      getTessellation: function (numKnots)
      {
         return NURBS .getTessellation (this ._tessellation .getValue (), numKnots - this ._order .getValue ());
      },
      getClosed: function (order, knot, weight, controlPoint)
      {
         if (! this ._closed .getValue ())
            return false;

         return NURBS .getClosed2D (order, knot, weight, controlPoint);
      },
      getKnots: function (result, closed, order, dimension, knot)
      {
         return NURBS .getKnots (result, closed, order, dimension, knot);
      },
      getWeights: function (result, dimension, weight)
      {
         return NURBS .getWeights (result, dimension, weight);
      },
      getControlPoints: function (result, closed, order, weights, controlPoint)
      {
         return NURBS .getControlPoints2D (result, closed, order, weights, controlPoint);
      },
      tessellate: function (type)
      {
         const array = this .array;

         array .length = 0;

         if (this ._order .getValue () < 2)
            return array;

         if (this ._controlPoint .length < this ._order .getValue ())
            return array;

         // Order and dimension are now positive numbers.

         const
            closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this ._controlPoint),
            weights       = this .getWeights (this .weights, this ._controlPoint .length, this ._weight),
            controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this ._controlPoint);

         // Knots

         const
            knots = this .getKnots (this .knots, closed, this ._order .getValue (), this ._controlPoint .length, this ._knot),
            scale = knots .at (-1) - knots [0];

         // Initialize NURBS tessellator

         const degree = this ._order .getValue () - 1;

         const surface = this .surface = (this .surface || nurbs) ({
            boundary: ["open"],
            degree: [degree],
            knots: [knots],
            points: controlPoints,
            debug: false,
         });

         this .sampleOptions .resolution [0] = this .getTessellation (knots .length);
         this .sampleOptions .haveWeights    = Boolean (weights);

         const
            mesh   = nurbs .sample (this .mesh, surface, this .sampleOptions),
            points = mesh .points;

         switch (type)
         {
            case 0:
            {
               for (let i = 0, length = points .length; i < length; i += 2)
               {
                  array .push (points [i], points [i + 1]);
               }

               break;
            }
            case 1:
            {
               for (let i = 0, length = points .length; i < length; i += 2)
               {
                  array .push (points [i], 0, points [i + 1]);
               }

               break;
            }
            case 2:
            {
               for (let i = 0, length = points .length; i < length; i += 2)
               {
                  array .push (new Vector3 (points [i], points [i + 1], 0));
               }

               break;
            }
         }

         return array;
      },
   });

   return NurbsCurve2D;
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


define ('x_ite/Components/NURBS/NurbsOrientationInterpolator',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Components/Interpolation/OrientationInterpolator",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "x_ite/Browser/NURBS/NURBS",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "nurbs",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          OrientationInterpolator,
          X3DConstants,
          X3DCast,
          NURBS,
          Vector3,
          Rotation4,
          nurbs)
{
"use strict";

   function NurbsOrientationInterpolator (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsOrientationInterpolator);

      this .addChildObjects ("rebuild", new Fields .SFTime ());

      this .interpolator  = new OrientationInterpolator (executionContext);
      this .knots         = [ ];
      this .weights       = [ ];
      this .controlPoints = [ ];
      this .mesh          = { };
      this .sampleOptions = { resolution: [ 128 ] };
   }

   NurbsOrientationInterpolator .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: NurbsOrientationInterpolator,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "order",         new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "knot",          new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weight",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "controlPoint",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFRotation ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsOrientationInterpolator";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DChildNode .prototype .initialize .call (this);

         this ._order        .addInterest ("requestRebuild",     this);
         this ._knot         .addInterest ("requestRebuild",     this);
         this ._weight       .addInterest ("requestRebuild",     this);
         this ._controlPoint .addInterest ("set_controlPoint__", this);

         this ._rebuild .addInterest ("build", this);

         this ._set_fraction .addFieldInterest (this .interpolator ._set_fraction);
         this .interpolator ._value_changed .addFieldInterest (this ._value_changed);

         this .interpolator .setup ();

         this .set_controlPoint__ ();
      },
      set_controlPoint__: function ()
      {
         if (this .controlPointNode)
            this .controlPointNode .removeInterest ("requestRebuild", this);

         this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._controlPoint);

         if (this .controlPointNode)
            this .controlPointNode .addInterest ("requestRebuild", this);

         this .requestRebuild ();
      },
      getClosed: function (order, knot, weight, controlPointNode)
      {
         return false && NURBS .getClosed (order, knot, weight, controlPointNode);
      },
      getKnots: function (result, closed, order, dimension, knot)
      {
         return NURBS .getKnots (result, closed, order, dimension, knot);
      },
      getWeights: function (result, dimension, weight)
      {
         return NURBS .getWeights (result, dimension, weight);
      },
      getControlPoints: function (result, closed, order, weights, controlPointNode)
      {
         return NURBS .getControlPoints (result, closed, order, weights, controlPointNode);
      },
      requestRebuild: function ()
      {
         this ._rebuild .addEvent ();
      },
      build: function ()
      {
         if (this ._order .getValue () < 2)
            return;

         if (! this .controlPointNode)
            return;

         if (this .controlPointNode .getSize () < this ._order .getValue ())
            return;

         // Order and dimension are now positive numbers.

         const
            closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this .controlPointNode),
            weights       = this .getWeights (this .weights, this .controlPointNode .getSize (), this ._weight),
            controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this .controlPointNode);

         // Knots

         const
            knots = this .getKnots (this .knots, closed, this ._order .getValue (), this .controlPointNode .getSize (), this ._knot),
            scale = knots .at (-1) - knots [0];

         // Initialize NURBS tessellator

         const degree = this ._order .getValue () - 1;

         const surface = this .surface = (this .surface || nurbs) ({
            boundary: ["open"],
            degree: [degree],
            knots: [knots],
            points: controlPoints,
            debug: false,
         });

         this .sampleOptions .haveWeights = Boolean (weights);

         const
            mesh         = nurbs .sample (this .mesh, surface, this .sampleOptions),
            points       = mesh .points,
            interpolator = this .interpolator;

         interpolator ._key      .length = 0;
         interpolator ._keyValue .length = 0;

         for (let i = 0, length = points .length - 3; i < length; i += 3)
         {
            const direction = new Vector3 (points [i + 3] - points [i + 0],
                                           points [i + 4] - points [i + 1],
                                           points [i + 5] - points [i + 2]);

            interpolator ._key      .push (knots [0] + i / (length - 3 + (3 * closed)) * scale);
            interpolator ._keyValue. push (new Rotation4 (Vector3 .zAxis, direction));
         }

         if (closed)
         {
            interpolator ._key      .push (knots [0] + scale);
            interpolator ._keyValue. push (interpolator ._keyValue [0]);
         }
      },
   });

   return NurbsOrientationInterpolator;
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


define ('x_ite/Components/NURBS/X3DNurbsSurfaceGeometryNode',[
   "x_ite/Components/NURBS/X3DParametricGeometryNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "x_ite/Browser/NURBS/NURBS",
   "standard/Math/Algorithm",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Geometry/Triangle3",
   "nurbs",
],
function (X3DParametricGeometryNode,
          X3DConstants,
          X3DCast,
          NURBS,
          Algorithm,
          Vector3,
          Triangle3,
          nurbs)
{
"use strict";

   function X3DNurbsSurfaceGeometryNode (executionContext)
   {
      X3DParametricGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .X3DNurbsSurfaceGeometryNode);

      this .tessellationScale = 1;
      this .uKnots            = [ ];
      this .vKnots            = [ ];
      this .weights           = [ ];
      this .controlPoints     = [ ];
      this .mesh              = { };
      this .sampleOptions     = { resolution: [ ], closed: [ ] };
      this .textUKnots        = [ ];
      this .textVKnots        = [ ];
      this .textWeights       = [ ];
      this .texControlPoints  = [ ];
      this .texMesh           = { };
   }

   X3DNurbsSurfaceGeometryNode .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
   {
      constructor: X3DNurbsSurfaceGeometryNode,
      initialize: function ()
      {
         X3DParametricGeometryNode .prototype .initialize .call (this);

         this ._texCoord     .addInterest ("set_texCoord__",     this);
         this ._controlPoint .addInterest ("set_controlPoint__", this);

         this .set_texCoord__ ();
         this .set_controlPoint__ ();
      },
      set_texCoord__: function ()
      {
         if (this .texCoordNode)
            this .texCoordNode .removeInterest ("requestRebuild", this);

         if (this .nurbsTexCoordNode)
            this .nurbsTexCoordNode .removeInterest ("requestRebuild", this);

         this .texCoordNode      = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoord);
         this .nurbsTexCoordNode = X3DCast (X3DConstants .NurbsTextureCoordinate,   this ._texCoord);

         if (this .texCoordNode)
            this .texCoordNode .addInterest ("requestRebuild", this);

         if (this .nurbsTexCoordNode)
            this .nurbsTexCoordNode .addInterest ("requestRebuild", this);
      },
      set_controlPoint__: function ()
      {
         if (this .controlPointNode)
            this .controlPointNode .removeInterest ("requestRebuild", this);

         this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._controlPoint);

         if (this .controlPointNode)
            this .controlPointNode .addInterest ("requestRebuild", this);
      },
      setTessellationScale: function (value)
      {
         this .tessellationScale = value;

         this .requestRebuild ();
      },
      getUTessellation: function (numKnots)
      {
         return Math .floor (NURBS .getTessellation (this ._uTessellation .getValue (), numKnots - this ._uOrder .getValue ()) * this .tessellationScale);
      },
      getVTessellation: function (numKnots)
      {
         return Math .floor (NURBS .getTessellation (this ._vTessellation .getValue (), numKnots - this ._vOrder .getValue ()) * this .tessellationScale);
      },
      getUClosed: function (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode)
      {
         if (this ._uClosed .getValue ())
            return NURBS .getUClosed (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode);

         return false;
      },
      getVClosed: function (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode)
      {
         if (this ._vClosed .getValue ())
            return NURBS .getVClosed (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode);

         return false;
      },
      getUVWeights: function (result, uDimension, vDimension, weight)
      {
         return NURBS .getUVWeights (result, uDimension, vDimension, weight);
      },
      getTexControlPoints: function (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, texCoordNode)
      {
         return NURBS .getTexControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, texCoordNode);
      },
      getUVControlPoints: function (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode)
      {
         return NURBS .getUVControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode);
      },
      getTrimmingContours: function ()
      {
         return undefined;
      },
      build: function ()
      {
         if (this ._uOrder .getValue () < 2)
            return;

         if (this ._vOrder .getValue () < 2)
            return;

         if (this ._uDimension .getValue () < this ._uOrder .getValue ())
            return;

         if (this ._vDimension .getValue () < this ._vOrder .getValue ())
            return;

         if (! this .controlPointNode)
            return;

         if (this .controlPointNode .getSize () !== this ._uDimension .getValue () * this ._vDimension .getValue ())
            return;

         // Order and dimension are now positive numbers.

         // ControlPoints

         const
            uClosed       = this .getUClosed (this ._uOrder .getValue (), this ._uDimension .getValue (), this ._vDimension .getValue (), this ._uKnot, this ._weight, this .controlPointNode),
            vClosed       = this .getVClosed (this ._vOrder .getValue (), this ._uDimension .getValue (), this ._vDimension .getValue (), this ._vKnot, this ._weight, this .controlPointNode),
            weights       = this .getUVWeights (this .weights, this ._uDimension .getValue (), this ._vDimension .getValue (), this ._weight),
            controlPoints = this .getUVControlPoints (this .controlPoints, uClosed, vClosed, this ._uOrder .getValue (), this ._vOrder .getValue (), this ._uDimension .getValue (), this ._vDimension .getValue (), weights, this .controlPointNode);

         // Knots

         const
            uKnots = this .getKnots (this .uKnots, uClosed, this ._uOrder .getValue (), this ._uDimension .getValue (), this ._uKnot),
            vKnots = this .getKnots (this .vKnots, vClosed, this ._vOrder .getValue (), this ._vDimension .getValue (), this ._vKnot),
            uScale = uKnots .at (-1) - uKnots [0],
            vScale = vKnots .at (-1) - vKnots [0];

         // Initialize NURBS tessellator

         const
            uDegree = this ._uOrder .getValue () - 1,
            vDegree = this ._vOrder .getValue () - 1;

         const surface = this .surface = (this .surface || nurbs) ({
            boundary: ["open", "open"],
            degree: [uDegree, vDegree],
            knots: [uKnots, vKnots],
            points: controlPoints,
            debug: false,
         });

         const sampleOptions = this .sampleOptions;

         sampleOptions .resolution [0]   = this .getUTessellation (uKnots .length);
         sampleOptions .resolution [1]   = this .getVTessellation (vKnots .length);
         sampleOptions .closed [0]       = uClosed;
         sampleOptions .closed [1]       = vClosed;
         sampleOptions .domain           = undefined;
         sampleOptions .haveWeights      = Boolean (weights);
         sampleOptions .trimmingContours = this .getTrimmingContours ();

         const
            mesh        = nurbs .sample (this .mesh, surface, sampleOptions),
            faces       = mesh .faces,
            points      = mesh .points,
            vertexArray = this .getVertices ();

         for (let i = 0, length = faces .length; i < length; ++ i)
         {
            const index = faces [i] * 3;

            vertexArray .push (points [index], points [index + 1], points [index + 2], 1);
         }

         this .buildNurbsTexCoords (uClosed, vClosed, this ._uOrder .getValue (), this ._vOrder .getValue (), uKnots, vKnots, this ._uDimension .getValue (), this ._vDimension .getValue (), surface .domain);
         this .buildNormals (faces, points);
         this .setSolid (this ._solid .getValue ());
         this .setCCW (true);
      },
      buildNurbsTexCoords: (function ()
      {
         const
            defaultTexUKnots        = [ ],
            defaultTexVKnots        = [ ],
            defaultTexControlPoints = [[[0, 0, 0, 1], [0, 1, 0, 1]], [[1, 0, 0, 1], [1, 1, 0, 1]]];

         function getDefaultTexKnots (result, knots)
         {
            result [0] = result [1] = knots [0];
            result [2] = result [3] = knots .at (-1);
            return result;
         }

         return function (uClosed, vClosed, uOrder, vOrder, uKnots, vKnots, uDimension, vDimension, domain)
         {
            const sampleOptions = this .sampleOptions;

            if (this .texCoordNode && this .texCoordNode .getSize () === uDimension * vDimension)
            {
               var
                  texUDegree       = uOrder - 1,
                  texVDegree       = vOrder - 1,
                  texUKnots        = uKnots,
                  texVKnots        = vKnots,
                  texControlPoints = this .getTexControlPoints (this .texControlPoints, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, this .texCoordNode);
            }
            else if (this .nurbsTexCoordNode && this .nurbsTexCoordNode .isValid ())
            {
               var
                  node             = this .nurbsTexCoordNode,
                  texUDegree       = node ._uOrder .getValue () - 1,
                  texVDegree       = node ._vOrder .getValue () - 1,
                  texUKnots        = this .getKnots (this .texUKnots, false, node ._uOrder .getValue (), node ._uDimension .getValue (), node ._uKnot),
                  texVKnots        = this .getKnots (this .texVKnots, false, node ._vOrder .getValue (), node ._vDimension .getValue (), node ._vKnot),
                  texWeights       = this .getUVWeights (this .texWeights, node ._uDimension .getValue (), node ._vDimension .getValue (), node ._weight);
                  texControlPoints = node .getControlPoints (texWeights);
            }
            else
            {
               var
                  texUDegree       = 1,
                  texVDegree       = 1,
                  texUKnots        = getDefaultTexKnots (defaultTexUKnots, uKnots),
                  texVKnots        = getDefaultTexKnots (defaultTexVKnots, vKnots),
                  texControlPoints = defaultTexControlPoints;

               sampleOptions .domain = domain;
            }

            const texSurface = this .texSurface = (this .texSurface || nurbs) ({
               boundary: ["open", "open"],
               degree: [texUDegree, texVDegree],
               knots: [texUKnots, texVKnots],
               points: texControlPoints,
            });

            sampleOptions .closed [0]  = false;
            sampleOptions .closed [1]  = false;
            sampleOptions .haveWeights = false;

            const
               texMesh       = nurbs .sample (this .texMesh, texSurface, sampleOptions),
               faces         = texMesh .faces,
               points        = texMesh .points,
               texCoordArray = this .getTexCoords ();

            for (let i = 0, length = faces .length; i < length; ++ i)
            {
               const index = faces [i] * 4;

               texCoordArray .push (points [index], points [index + 1], points [index + 2], points [index + 3]);
            }

            this .getMultiTexCoords () .push (this .getTexCoords ());
         };
      })(),
      buildNormals: function (faces, points)
      {
         const
            normals     = this .createNormals (faces, points),
            normalArray = this .getNormals ();

         for (const normal of normals)
            normalArray .push (normal .x, normal .y, normal .z);
      },
      createNormals: function (faces, points)
      {
         const
            normals     = this .createFaceNormals (faces, points),
            normalIndex = [ ];

         for (let i = 0, length = faces .length; i < length; ++ i)
         {
            const index = faces [i];

            let pointIndex = normalIndex [index];

            if (! pointIndex)
               pointIndex = normalIndex [index] = [ ];

            pointIndex .push (i);
         }

         return this .refineNormals (normalIndex, normals, Algorithm .radians (85));
      },
      createFaceNormals: (function ()
      {
         const
            v1 = new Vector3 (0, 0, 0),
            v2 = new Vector3 (0, 0, 0),
            v3 = new Vector3 (0, 0, 0);

         return function (faces, points)
         {
            const
               normals = this .faceNormals || [ ],
               length  = faces .length;

            for (let i = 0; i < length; i += 3)
            {
               const
                  index1 = faces [i]     * 3,
                  index2 = faces [i + 1] * 3,
                  index3 = faces [i + 2] * 3;

               v1 .set (points [index1], points [index1 + 1], points [index1 + 2]);
               v2 .set (points [index2], points [index2 + 1], points [index2 + 2]);
               v3 .set (points [index3], points [index3 + 1], points [index3 + 2]);

               const normal = Triangle3 .normal (v1, v2 ,v3, normals [i] || new Vector3 (0, 0, 0));

               normals [i]     = normal;
               normals [i + 1] = normal;
               normals [i + 2] = normal;
            }

            normals .length = length;

            return normals;
         };
      })(),
   });

   return X3DNurbsSurfaceGeometryNode;
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


define ('x_ite/Components/NURBS/NurbsPatchSurface',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/NURBS/X3DNurbsSurfaceGeometryNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNurbsSurfaceGeometryNode,
          X3DConstants)
{
"use strict";

   function NurbsPatchSurface (executionContext)
   {
      X3DNurbsSurfaceGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsPatchSurface);
   }

   NurbsPatchSurface .prototype = Object .assign (Object .create (X3DNurbsSurfaceGeometryNode .prototype),
   {
      constructor: NurbsPatchSurface,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "uTessellation", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "vTessellation", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uClosed",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vClosed",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",        new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",        new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",    new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",    new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",         new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",         new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint",  new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsPatchSurface";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
   });

   return NurbsPatchSurface;
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


define ('x_ite/Components/NURBS/NurbsPositionInterpolator',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Components/Interpolation/PositionInterpolator",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "x_ite/Browser/NURBS/NURBS",
   "nurbs",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          PositionInterpolator,
          X3DConstants,
          X3DCast,
          NURBS,
          nurbs)
{
"use strict";

   function NurbsPositionInterpolator (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsPositionInterpolator);

      this .addChildObjects ("rebuild", new Fields .SFTime ());

      this .interpolator  = new PositionInterpolator (executionContext);
      this .knots         = [ ];
      this .weights       = [ ];
      this .controlPoints = [ ];
      this .mesh          = { };
      this .sampleOptions = { resolution: [ 128 ] };
   }

   NurbsPositionInterpolator .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: NurbsPositionInterpolator,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "order",         new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "knot",          new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weight",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "controlPoint",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFVec3f ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsPositionInterpolator";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DChildNode .prototype .initialize .call (this);

         this ._order        .addInterest ("requestRebuild",     this);
         this ._knot         .addInterest ("requestRebuild",     this);
         this ._weight       .addInterest ("requestRebuild",     this);
         this ._controlPoint .addInterest ("set_controlPoint__", this);

         this ._rebuild .addInterest ("build", this);

         this ._set_fraction .addFieldInterest (this .interpolator ._set_fraction);
         this .interpolator ._value_changed .addFieldInterest (this ._value_changed);

         this .interpolator .setup ();

         this .set_controlPoint__ ();
      },
      set_controlPoint__: function ()
      {
         if (this .controlPointNode)
            this .controlPointNode .removeInterest ("requestRebuild", this);

         this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._controlPoint);

         if (this .controlPointNode)
            this .controlPointNode .addInterest ("requestRebuild", this);

         this .requestRebuild ();
      },
      getClosed: function (order, knot, weight, controlPointNode)
      {
         return false && NURBS .getClosed (order, knot, weight, controlPointNode);
      },
      getKnots: function (result, closed, order, dimension, knot)
      {
         return NURBS .getKnots (result, closed, order, dimension, knot);
      },
      getWeights: function (result, dimension, weight)
      {
         return NURBS .getWeights (result, dimension, weight);
      },
      getControlPoints: function (result, closed, order, weights, controlPointNode)
      {
         return NURBS .getControlPoints (result, closed, order, weights, controlPointNode);
      },
      requestRebuild: function ()
      {
         this ._rebuild .addEvent ();
      },
      build: function ()
      {
         if (this ._order .getValue () < 2)
            return;

         if (! this .controlPointNode)
            return;

         if (this .controlPointNode .getSize () < this ._order .getValue ())
            return;

         // Order and dimension are now positive numbers.

         const
            closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this .controlPointNode),
            weights       = this .getWeights (this .weights, this .controlPointNode .getSize (), this ._weight),
            controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this .controlPointNode);

         // Knots

         const
            knots = this .getKnots (this .knots, closed, this ._order .getValue (), this .controlPointNode .getSize (), this ._knot),
            scale = knots .at (-1) - knots [0];

         // Initialize NURBS tessellator

         const degree = this ._order .getValue () - 1;

         const surface = this .surface = (this .surface || nurbs) ({
            boundary: ["open"],
            degree: [degree],
            knots: [knots],
            points: controlPoints,
            debug: false,
         });

         this .sampleOptions .haveWeights = Boolean (weights);

         const
            mesh         = nurbs .sample (this .mesh, surface, this .sampleOptions),
            points       = mesh .points,
            interpolator = this .interpolator;

         interpolator ._key      .length = 0;
         interpolator ._keyValue .length = 0;

         for (let i = 0, length = points .length; i < length; i += 3)
         {
            interpolator ._key      .push (knots [0] + i / (length - 3) * scale);
            interpolator ._keyValue. push (new Fields .SFVec3f (points [i], points [i + 1], points [i + 2]));
         }
      },
   });

   return NurbsPositionInterpolator;
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


define ('x_ite/Components/NURBS/NurbsSet',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Components/Grouping/X3DBoundedObject",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DBoundedObject,
          X3DConstants,
          X3DCast)
{
"use strict";

   function NurbsSet (executionContext)
   {
      X3DChildNode     .call (this, executionContext);
      X3DBoundedObject .call (this, executionContext);

      this .addType (X3DConstants .NurbsSet);

      this .geometryNodes = [ ];
   }

   NurbsSet .prototype = Object .assign (Object .create (X3DChildNode .prototype),
      X3DBoundedObject .prototype,
   {
      constructor: NurbsSet,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellationScale", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addGeometry",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeGeometry",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",          new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsSet";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DChildNode     .prototype .initialize .call (this);
         X3DBoundedObject .prototype .initialize .call (this);

         this ._tessellationScale .addInterest ("set_tessellationScale__", this);
         this ._addGeometry       .addInterest ("set_addGeometry__",       this);
         this ._removeGeometry    .addInterest ("set_removeGeometry__",    this);
         this ._geometry          .addInterest ("set_geometry__",          this);

         this .set_geometry__ ();
      },
      getBBox: function (bbox, shadow)
      {
         // Add bounding boxes

         for (const geometryNode of this .geometryNodes)
            bbox .add (geometryNode .getBBox ());

         return bbox;
      },
      set_tessellationScale__: function ()
      {
         const tessellationScale = Math .max (0, this ._tessellationScale .getValue ());

         for (const geometryNode of this .geometryNodes)
            geometryNode .setTessellationScale (tessellationScale);
      },
      set_addGeometry__: function ()
      {
         this ._addGeometry .setTainted (true);

         this ._addGeometry .erase (remove (this ._addGeometry, 0, this ._addGeometry .length,
                                            this ._geometry,    0, this ._geometry .length),
                                    this ._addGeometry .length);

         for (const geometry of this ._addGeometry)
            this ._geometry .push (geometry);

         this ._addGeometry .length = 0;
         this ._addGeometry .setTainted (false);
      },
      set_removeGeometry__: function ()
      {
         this ._removeGeometry .setTainted (true);

         this ._geometry .erase (remove (this ._geometry,       0, this ._geometry .length,
                                         this ._removeGeometry, 0, this ._removeGeometry .length),
                                 this ._geometry .length);

         this ._removeGeometry .length = 0;
         this ._removeGeometry .setTainted (false);
      },
      set_geometry__: function ()
      {
         for (const geometryNode of this .geometryNodes)
            geometryNode .setTessellationScale (1);

         this .geometryNodes .length = 0;

         for (const node of this ._geometry)
         {
            const geometryNode = X3DCast (X3DConstants .X3DNurbsSurfaceGeometryNode, node);

            if (geometryNode)
               this .geometryNodes .push (geometryNode);
         }

         this .set_tessellationScale__ ();
      },
   });

   function remove (array, first, last, range, rfirst, rlast)
   {
      const set = new Set ();

      for (let i = rfirst; i < rlast; ++ i)
         set .add (range [i]);

      function compare (value) { return set .has (value); }

      return array .remove (first, last, compare);
   }

   return NurbsSet;
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


define ('standard/Math/Geometry/Triangle2',[],function ()
{
"use strict";

   return {
      isPointInTriangle: function (a, b, c, point)
      {
         // https://en.wikipedia.org/wiki/Barycentric_coordinate_system

         const det = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);

         if (det == 0)
            return false;

         const u = ((b.y - c.y) * (point .x - c.x) + (c.x - b.x) * (point .y - c.y)) / det;

         if (u < 0 || u > 1)
            return false;

         const v = ((c.y - a.y) * (point .x - c.x) + (a.x - c.x) * (point .y - c.y)) / det;

         if (v < 0 || v > 1)
            return false;

         const t = 1 - u - v;

         if (t < 0 || t > 1)
            return false;

         return true;
      },
   };
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


define ('x_ite/Components/NURBS/NurbsSurfaceInterpolator',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Components/NURBS/NurbsPatchSurface",
   "x_ite/Base/X3DConstants",
   "standard/Math/Geometry/Line3",
   "standard/Math/Geometry/Triangle2",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          NurbsPatchSurface,
          X3DConstants,
          Line3,
          Triangle2,
          Vector3)
{
"use strict";

   function NurbsSurfaceInterpolator (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsSurfaceInterpolator);

      this .geometry = new NurbsPatchSurface (executionContext);
   }

   NurbsSurfaceInterpolator .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: NurbsSurfaceInterpolator,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_fraction",     new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",           new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",           new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",            new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",            new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",           new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "normal_changed",   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "position_changed", new Fields .SFVec3f ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsSurfaceInterpolator";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         this ._set_fraction .addInterest ("set_fraction__", this);

         this ._uOrder       .addFieldInterest (this .geometry ._uOrder);
         this ._vOrder       .addFieldInterest (this .geometry ._vOrder);
         this ._uDimension   .addFieldInterest (this .geometry ._uDimension);
         this ._vDimension   .addFieldInterest (this .geometry ._vDimension);
         this ._uKnot        .addFieldInterest (this .geometry ._uKnot);
         this ._vKnot        .addFieldInterest (this .geometry ._vKnot);
         this ._weight       .addFieldInterest (this .geometry ._weight);
         this ._controlPoint .addFieldInterest (this .geometry ._controlPoint);

         this .geometry ._uTessellation = 128;
         this .geometry ._vTessellation = 128;
         this .geometry ._uOrder        = this ._uOrder;
         this .geometry ._vOrder        = this ._vOrder;
         this .geometry ._uDimension    = this ._uDimension;
         this .geometry ._vDimension    = this ._vDimension;
         this .geometry ._uKnot         = this ._uKnot;
         this .geometry ._vKnot         = this ._vKnot;
         this .geometry ._weight        = this ._weight;
         this .geometry ._controlPoint  = this ._controlPoint;

         this .geometry .setup ();
      },
      set_fraction__: (function ()
      {
         const
            a     = new Vector3 (0, 0, 0),
            b     = new Vector3 (0, 0, 0),
            c     = new Vector3 (0, 0, 0),
            point = new Vector3 (0, 0, 0),
            line  = new Line3 (Vector3 .Zero, Vector3 .zAxis),
            uvt   = { };

         return function ()
         {
            const
               fraction       = this ._set_fraction .getValue (),
               texCoordsArray = this .geometry .getTexCoords (),
               normalArray    = this .geometry .getNormals (),
               verticesArray  = this .geometry .getVertices ();

            for (let i4 = 0, i3 = 0, length = texCoordsArray .length; i4 < length; i4 += 12, i3 += 9)
            {
               a .set (texCoordsArray [i4 + 0], texCoordsArray [i4 + 1], 0);
               b .set (texCoordsArray [i4 + 4], texCoordsArray [i4 + 5], 0);
               c .set (texCoordsArray [i4 + 7], texCoordsArray [i4 + 9], 0);

               if (Triangle2 .isPointInTriangle (a, b, c, fraction))
               {
                  line .set (point .set (fraction .x, fraction .y, 0), Vector3 .zAxis);

                  if (line .intersectsTriangle (a, b, c, uvt))
                  {
                     const
                        u = uvt .u,
                        v = uvt .v,
                        t = uvt .t;

                     const normal = new Vector3 (t * normalArray [i3 + 0] + u * normalArray [i3 + 3] + v * normalArray [i3 + 6],
                                                 t * normalArray [i3 + 1] + u * normalArray [i3 + 4] + v * normalArray [i3 + 7],
                                                 t * normalArray [i3 + 2] + u * normalArray [i3 + 5] + v * normalArray [i3 + 8]);

                     const position = new Vector3 (t * verticesArray [i4 + 0] + u * verticesArray [i4 + 4] + v * verticesArray [i4 +  8],
                                                   t * verticesArray [i4 + 1] + u * verticesArray [i4 + 5] + v * verticesArray [i4 +  9],
                                                   t * verticesArray [i4 + 2] + u * verticesArray [i4 + 6] + v * verticesArray [i4 + 10]);

                     this ._normal_changed   = normal;
                     this ._position_changed = position;
                  }
               }
            }
         };
      })(),
   });

   return NurbsSurfaceInterpolator;
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


 define ('x_ite/Components/NURBS/NurbsSweptSurface',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Geometry3D/Extrusion",
   "x_ite/Components/NURBS/X3DParametricGeometryNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          Extrusion,
          X3DParametricGeometryNode,
          X3DConstants,
          X3DCast)
{
"use strict";

   function NurbsSweptSurface (executionContext)
   {
      X3DParametricGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsSweptSurface);

      this .extrusion = new Extrusion (executionContext);
   }

   NurbsSweptSurface .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
   {
      constructor: NurbsSweptSurface,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "crossSectionCurve", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "trajectoryCurve",   new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsSweptSurface";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      initialize: function ()
      {
         X3DParametricGeometryNode .prototype .initialize .call (this);

         this ._crossSectionCurve .addInterest ("set_crossSectionCurve__", this);
         this ._trajectoryCurve   .addInterest ("set_trajectoryCurve__",   this);

         const extrusion = this .extrusion;

         extrusion ._beginCap     = false;
         extrusion ._endCap       = false;
         extrusion ._solid        = true;
         extrusion ._ccw          = true;
         extrusion ._convex       = true;
         extrusion ._creaseAngle  = Math .PI;

         extrusion .setup ();

         extrusion ._crossSection .setTainted (true);
         extrusion ._spine        .setTainted (true);

         this .set_crossSectionCurve__ ();
         this .set_trajectoryCurve__ ();
      },
      set_crossSectionCurve__: function ()
      {
         if (this .crossSectionCurveNode)
            this .crossSectionCurveNode .removeInterest ("requestRebuild", this);

         this .crossSectionCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this ._crossSectionCurve);

         if (this .crossSectionCurveNode)
            this .crossSectionCurveNode .addInterest ("requestRebuild", this);
      },
      set_trajectoryCurve__: function ()
      {
         if (this .trajectoryCurveNode)
            this .trajectoryCurveNode ._rebuild .removeInterest ("requestRebuild", this);

         this .trajectoryCurveNode = X3DCast (X3DConstants .NurbsCurve, this ._trajectoryCurve);

         if (this .trajectoryCurveNode)
            this .trajectoryCurveNode ._rebuild .addInterest ("requestRebuild", this);
      },
      build: function ()
      {
         if (! this .crossSectionCurveNode)
            return;

         if (! this .trajectoryCurveNode)
            return;

         const extrusion = this .extrusion;

         extrusion ._crossSection = this .crossSectionCurveNode .tessellate (0);
         extrusion ._spine        = this .trajectoryCurveNode   .tessellate (0);

         extrusion .rebuild ();

         this .getColors ()    .assign (extrusion .getColors ());
         this .getTexCoords () .assign (extrusion .getTexCoords ());
         this .getNormals ()   .assign (extrusion .getNormals ());
         this .getVertices ()  .assign (extrusion .getVertices ());

         this .getMultiTexCoords () .push (this .getTexCoords ());

         if (! this ._ccw .getValue ())
         {
            const normals = this .getNormals ();

            for (let i = 0, length = normals .length; i < length; ++ i)
               normals [i] = -normals [i];
         }

         this .setSolid (this ._solid .getValue ());
         this .setCCW (this ._ccw .getValue ());
      },
   });

   return NurbsSweptSurface;
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


define ('x_ite/Components/NURBS/NurbsSwungSurface',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Geometry3D/Extrusion",
   "x_ite/Components/NURBS/X3DParametricGeometryNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          Extrusion,
          X3DParametricGeometryNode,
          X3DConstants,
          X3DCast)
{
"use strict";

   function NurbsSwungSurface (executionContext)
   {
      X3DParametricGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsSwungSurface);

      this .extrusion = new Extrusion (executionContext);
   }

   NurbsSwungSurface .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
   {
      constructor: NurbsSwungSurface,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "profileCurve",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "trajectoryCurve", new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsSwungSurface";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      initialize: function ()
      {
         X3DParametricGeometryNode .prototype .initialize .call (this);

         this ._profileCurve    .addInterest ("set_profileCurve__",    this);
         this ._trajectoryCurve .addInterest ("set_trajectoryCurve__", this);

         const extrusion = this .extrusion;

         extrusion ._beginCap     = false;
         extrusion ._endCap       = false;
         extrusion ._solid        = true;
         extrusion ._ccw          = true;
         extrusion ._convex       = true;
         extrusion ._creaseAngle  = Math .PI;

         extrusion .setup ();

         extrusion ._crossSection .setTainted (true);
         extrusion ._spine        .setTainted (true);

         this .set_profileCurve__ ();
         this .set_trajectoryCurve__ ();
      },
      set_profileCurve__: function ()
      {
         if (this .profileCurveNode)
            this .profileCurveNode .removeInterest ("requestRebuild", this);

         this .profileCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this ._profileCurve);

         if (this .profileCurveNode)
            this .profileCurveNode .addInterest ("requestRebuild", this);
      },
      set_trajectoryCurve__: function ()
      {
         if (this .trajectoryCurveNode)
            this .trajectoryCurveNode .removeInterest ("requestRebuild", this);

         this .trajectoryCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this ._trajectoryCurve);

         if (this .trajectoryCurveNode)
            this .trajectoryCurveNode .addInterest ("requestRebuild", this);
      },
      build: function ()
      {
         if (! this .profileCurveNode)
            return;

         if (! this .trajectoryCurveNode)
            return;

         const extrusion = this .extrusion;

         extrusion ._crossSection = this .profileCurveNode    .tessellate (0);
         extrusion ._spine        = this .trajectoryCurveNode .tessellate (1);

         extrusion .rebuild ();

         this .getColors ()    .assign (extrusion .getColors ());
         this .getTexCoords () .assign (extrusion .getTexCoords ());
         this .getNormals ()   .assign (extrusion .getNormals ());
         this .getVertices ()  .assign (extrusion .getVertices ());

         this .getMultiTexCoords () .push (this .getTexCoords ());

         if (! this ._ccw .getValue ())
         {
            const normals = this .getNormals ();

            for (let i = 0, length = normals .length; i < length; ++ i)
               normals [i] = -normals [i];
         }

         this .setSolid (this ._solid .getValue ());
         this .setCCW (this ._ccw .getValue ());
      },
   });

   return NurbsSwungSurface;
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


 define ('x_ite/Components/NURBS/NurbsTextureCoordinate',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode,
          X3DConstants,
          Vector4)
{
"use strict";

   function NurbsTextureCoordinate (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsTextureCoordinate);

      this .controlPoints = [ ];
   }

   NurbsTextureCoordinate .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: NurbsTextureCoordinate,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",       new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",       new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .MFVec2f ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsTextureCoordinate";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "texCoord";
      },
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);
      },
      getControlPoints: function (texWeights)
      {
         const
            controlPointArray = this ._controlPoint .getValue (),
            controlPoints     = this .controlPoints;

         for (let u = 0, uDimension = this ._uDimension .getValue (); u < uDimension; ++ u)
         {
            let cp = controlPoints [u];

            if (! cp)
               cp = controlPoints [u] = [ ];

            for (let v = 0, vDimension = this ._vDimension .getValue (); v < vDimension; ++ v)
            {
               const
                  index = v * uDimension + u,
                  p     = cp [v] || new Vector4 (),
                  i     = index * 2;

               cp [v] = p .set (controlPointArray [i], controlPointArray [i + 1], 0, texWeights ? texWeights [index] : 1);
            }
         }

         return controlPoints;
      },
      isValid: function ()
      {
         if (this ._uOrder .getValue () < 2)
            return false;

         if (this ._vOrder .getValue () < 2)
            return false;

         if (this ._uDimension .getValue () < this ._uOrder .getValue ())
            return false;

         if (this ._vDimension .getValue () < this ._vOrder .getValue ())
            return false;

         if (this ._controlPoint .length !== this ._uDimension .getValue () * this ._vDimension .getValue ())
            return false;

         return true;
      }
   });

   return NurbsTextureCoordinate;
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


define ('x_ite/Components/NURBS/NurbsTrimmedSurface',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/NURBS/X3DNurbsSurfaceGeometryNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNurbsSurfaceGeometryNode,
          X3DConstants,
          X3DCast)
{
"use strict";

   function NurbsTrimmedSurface (executionContext)
   {
      X3DNurbsSurfaceGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsTrimmedSurface);

      this .trimmingContourNodes = [ ];
   }

   NurbsTrimmedSurface .prototype = Object .assign (Object .create (X3DNurbsSurfaceGeometryNode .prototype),
   {
      constructor: NurbsTrimmedSurface,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "uTessellation",         new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "vTessellation",         new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uClosed",               new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vClosed",               new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",                new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",                new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",                 new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",                 new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",                new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addTrimmingContour",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeTrimmingContour", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "trimmingContour",       new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsTrimmedSurface";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      initialize: function ()
      {
         X3DNurbsSurfaceGeometryNode .prototype .initialize .call (this);

         this ._addTrimmingContour    .addInterest ("set_addTrimmingContour__",    this);
         this ._removeTrimmingContour .addInterest ("set_removeTrimmingContour__", this);
         this ._trimmingContour       .addInterest ("set_trimmingContour__",       this);

         this .set_trimmingContour__ ();
      },
      set_addTrimmingContour__: function ()
      {
         this ._addTrimmingContour .setTainted (true);

         this ._addTrimmingContour .erase (remove (this ._addTrimmingContour, 0, this ._addTrimmingContour .length,
                                                   this ._trimmingContour,    0, this ._trimmingContour .length),
                                           this ._addTrimmingContour .length);

         for (const trimmingContour of this ._addTrimmingContour)
            this ._trimmingContour .push (trimmingContour);

         this ._addTrimmingContour .length = 0;
         this ._addTrimmingContour .setTainted (false);
      },
      set_removeTrimmingContour__: function ()
      {
         this ._removeTrimmingContour .setTainted (true);

         this ._trimmingContour .erase (remove (this ._trimmingContour,       0, this ._trimmingContour .length,
                                                this ._removeTrimmingContour, 0, this ._removeTrimmingContour .length),
                                        this ._trimmingContour .length);

         this ._removeTrimmingContour .length = 0;
         this ._removeTrimmingContour .setTainted (false);
      },
      set_trimmingContour__: function ()
      {
         const trimmingContourNodes = this .trimmingContourNodes;

         trimmingContourNodes .length = 0;

         for (const node of this ._trimmingContour)
         {
            const trimmingContourNode = X3DCast (X3DConstants .Contour2D, node);

            if (trimmingContourNode)
               trimmingContourNodes .push (trimmingContourNode);
         }
      },
      getTrimmingContours: function ()
      {
         const
            trimmingContourNodes = this .trimmingContourNodes,
            trimmingContours     = [ ];

         for (const trimmingContourNode of trimmingContourNodes)
            trimmingContourNode .addTrimmingContour (trimmingContours);

         return trimmingContours;
      },
   });

   function remove (array, first, last, range, rfirst, rlast)
   {
      const set = new Set ();

      for (let i = rfirst; i < rlast; ++ i)
         set .add (range [i]);

      function compare (value) { return set .has (value); }

      return array .remove (first, last, compare);
   }

   return NurbsTrimmedSurface;
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


define (require .getComponentUrl ("nurbs"), [
   "x_ite/Components",
   "x_ite/Components/NURBS/Contour2D",
   "x_ite/Components/NURBS/ContourPolyline2D",
   "x_ite/Components/NURBS/CoordinateDouble",
   "x_ite/Components/NURBS/NurbsCurve",
   "x_ite/Components/NURBS/NurbsCurve2D",
   "x_ite/Components/NURBS/NurbsOrientationInterpolator",
   "x_ite/Components/NURBS/NurbsPatchSurface",
   "x_ite/Components/NURBS/NurbsPositionInterpolator",
   "x_ite/Components/NURBS/NurbsSet",
   "x_ite/Components/NURBS/NurbsSurfaceInterpolator",
   "x_ite/Components/NURBS/NurbsSweptSurface",
   "x_ite/Components/NURBS/NurbsSwungSurface",
   "x_ite/Components/NURBS/NurbsTextureCoordinate",
   "x_ite/Components/NURBS/NurbsTrimmedSurface",
   "x_ite/Components/NURBS/X3DNurbsControlCurveNode",
   "x_ite/Components/NURBS/X3DNurbsSurfaceGeometryNode",
   "x_ite/Components/NURBS/X3DParametricGeometryNode",
],
function (Components,
          Contour2D,
          ContourPolyline2D,
          CoordinateDouble,
          NurbsCurve,
          NurbsCurve2D,
          NurbsOrientationInterpolator,
          NurbsPatchSurface,
          NurbsPositionInterpolator,
          NurbsSet,
          NurbsSurfaceInterpolator,
          NurbsSweptSurface,
          NurbsSwungSurface,
          NurbsTextureCoordinate,
          NurbsTrimmedSurface,
          X3DNurbsControlCurveNode,
          X3DNurbsSurfaceGeometryNode,
          X3DParametricGeometryNode)
{
"use strict";

   Components .addComponent ({
      name: "NURBS",
      types:
      {
         Contour2D:                    Contour2D,
         ContourPolyline2D:            ContourPolyline2D,
         CoordinateDouble:             CoordinateDouble,
         NurbsCurve:                   NurbsCurve,
         NurbsCurve2D:                 NurbsCurve2D,
         NurbsOrientationInterpolator: NurbsOrientationInterpolator,
         NurbsPatchSurface:            NurbsPatchSurface,
         NurbsPositionInterpolator:    NurbsPositionInterpolator,
         NurbsSet:                     NurbsSet,
         NurbsSurfaceInterpolator:     NurbsSurfaceInterpolator,
         NurbsSweptSurface:            NurbsSweptSurface,
         NurbsSwungSurface:            NurbsSwungSurface,
         NurbsTextureCoordinate:       NurbsTextureCoordinate,
         NurbsTrimmedSurface:          NurbsTrimmedSurface,
      },
      abstractTypes:
      {
         X3DNurbsControlCurveNode:    X3DNurbsControlCurveNode,
         X3DNurbsSurfaceGeometryNode: X3DNurbsSurfaceGeometryNode,
         X3DParametricGeometryNode:   X3DParametricGeometryNode,
      },
   });
});


})();

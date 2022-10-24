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


define ('x_ite/Browser/Geometry2D/Arc2DOptions',[
   "x_ite/Base/X3DBaseNode",
   "x_ite/Fields",
],
function (X3DBaseNode,
          Fields)
{
"use strict";

   function ArcClose2DOptions (executionContext)
   {
      X3DBaseNode .call (this, executionContext);

      this .addChildObjects ("dimension", new Fields .SFInt32 (40))
   }

   ArcClose2DOptions .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   {
      constructor: ArcClose2DOptions,
      getTypeName: function ()
      {
         return "ArcClose2DOptions";
      },
      getComponentName: function ()
      {
         return "X_ITE";
      },
      getContainerField: function ()
      {
         return "arcClose2DOptions";
      },
   });

   return ArcClose2DOptions;
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


define ('x_ite/Browser/Geometry2D/ArcClose2DOptions',[
   "x_ite/Base/X3DBaseNode",
   "x_ite/Fields",
],
function (X3DBaseNode,
          Fields)
{
"use strict";

   function Arc2DOptions (executionContext)
   {
      X3DBaseNode .call (this, executionContext);

      this .addChildObjects ("dimension", new Fields .SFInt32 (40))
   }

   Arc2DOptions .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   {
      constructor: Arc2DOptions,
      getTypeName: function ()
      {
         return "Arc2DOptions";
      },
      getComponentName: function ()
      {
         return "X_ITE";
      },
      getContainerField: function ()
      {
         return "arc2DOptions";
      },
   });

   return Arc2DOptions;
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


define ('x_ite/Browser/Geometry2D/Circle2DOptions',[
   "x_ite/Base/X3DBaseNode",
   "x_ite/Fields",
   "x_ite/Components/Rendering/X3DGeometryNode",
   "standard/Math/Numbers/Complex",
],
function (X3DBaseNode,
          Fields,
          X3DGeometryNode,
          Complex)
{
"use strict";

   function Circle2DOptions (executionContext)
   {
      X3DBaseNode .call (this, executionContext);

      this .addChildObjects ("dimension", new Fields .SFInt32 (40))

      this .vertices = X3DGeometryNode .createArray ();
   }

   Circle2DOptions .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   {
      constructor: Circle2DOptions,
      getTypeName: function ()
      {
         return "Circle2DOptions";
      },
      getComponentName: function ()
      {
         return "X_ITE";
      },
      getContainerField: function ()
      {
         return "circle2DOptions";
      },
      initialize: function ()
      {
         this .addInterest ("build", this);

         this .build ();
      },
      getVertices: function ()
      {
         return this .vertices;
      },
      build: function ()
      {
         const
            dimension = this ._dimension .getValue (),
            angle     = Math .PI * 2 / dimension,
            vertices  = this .vertices;

         vertices .length = 0;

         for (let n = 0; n < dimension; ++ n)
         {
            const
               point1 = Complex .Polar (1, angle * n),
               point2 = Complex .Polar (1, angle * (n + 1));

            vertices .push (point1 .real, point1 .imag, 0, 1);
            vertices .push (point2 .real, point2 .imag, 0, 1);
         }

         vertices .shrinkToFit ();
      },
   });

   return Circle2DOptions;
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


define ('x_ite/Browser/Geometry2D/Disk2DOptions',[
   "x_ite/Base/X3DBaseNode",
   "x_ite/Fields",
   "x_ite/Components/Rendering/X3DGeometryNode",
   "standard/Math/Numbers/Complex",
   "standard/Math/Numbers/Vector3",
],
function (X3DBaseNode,
          Fields,
          X3DGeometryNode,
          Complex,
          Vector3)
{
"use strict";

   function Disk2DOptions (executionContext)
   {
      X3DBaseNode .call (this, executionContext);

      this .addChildObjects ("dimension", new Fields .SFInt32 (40))

      this .circleVertices = X3DGeometryNode .createArray ();
      this .diskTexCoords  = X3DGeometryNode .createArray ();
      this .diskNormals    = X3DGeometryNode .createArray ();
      this .diskVertices   = X3DGeometryNode .createArray ();
   }

   Disk2DOptions .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   {
      constructor: Disk2DOptions,
      getTypeName: function ()
      {
         return "Disk2DOptions";
      },
      getComponentName: function ()
      {
         return "X_ITE";
      },
      getContainerField: function ()
      {
         return "circle2DOptions";
      },
      initialize: function ()
      {
         this .addInterest ("build", this);

         this .build ();
      },
      getCircleVertices: function ()
      {
         return this .circleVertices;
      },
      getDiskTexCoords: function ()
      {
         return this .diskTexCoords;
      },
      getDiskNormals: function ()
      {
         return this .diskNormals;
      },
      getDiskVertices: function ()
      {
         return this .diskVertices;
      },
      build: (function ()
      {
         const
            half      = new Complex (0.5, 0.5),
            texCoord1 = new Complex (0, 0),
            texCoord2 = new Complex (0, 0),
            point1    = new Complex (0, 0),
            point2    = new Complex (0, 0);

         return function ()
         {
            const
               dimension      = this ._dimension .getValue (),
               angle          = Math .PI * 2 / dimension,
               circleVertices = this .circleVertices,
               diskTexCoords  = this .diskTexCoords,
               diskNormals    = this .diskNormals,
               diskVertices   = this .diskVertices;

            circleVertices .length = 0;
            diskTexCoords  .length = 0;
            diskNormals    .length = 0;
            diskVertices   .length = 0;

            for (let n = 0; n < dimension; ++ n)
            {
               const
                  theta1 = angle * n,
                  theta2 = angle * (n + 1);

               texCoord1 .setPolar (0.5, theta1) .add (half);
               texCoord2 .setPolar (0.5, theta2) .add (half);
               point1    .setPolar (1, theta1);
               point2    .setPolar (1, theta2);

               // Circle

               circleVertices .push (point1 .real, point1 .imag, 0, 1);
               circleVertices .push (point2 .real, point2 .imag, 0, 1);

               // Disk

               diskTexCoords .push (0.5, 0.5, 0, 1,
                                    texCoord1 .real, texCoord1 .imag, 0, 1,
                                    texCoord2 .real, texCoord2 .imag, 0, 1);

               diskNormals .push (0, 0, 1,  0, 0, 1,  0, 0, 1);

               diskVertices .push (0, 0, 0, 1,
                                   point1 .real, point1 .imag, 0, 1,
                                   point2 .real, point2 .imag, 0, 1);
            }

            circleVertices .shrinkToFit ();
            diskTexCoords  .shrinkToFit ();
            diskNormals    .shrinkToFit ();
            diskVertices   .shrinkToFit ();
         };
      })(),
   });

   return Disk2DOptions;
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


define ('x_ite/Browser/Geometry2D/Rectangle2DOptions',[
   "x_ite/Fields",
   "x_ite/Base/X3DBaseNode",
   "x_ite/Components/Geometry3D/IndexedFaceSet",
   "x_ite/Components/Rendering/Coordinate",
   "x_ite/Components/Texturing/TextureCoordinate",
],
function (Fields,
          X3DBaseNode,
          IndexedFaceSet,
          Coordinate,
          TextureCoordinate)
{
"use strict";

   function Rectangle2DOptions (executionContext)
   {
      X3DBaseNode .call (this, executionContext);
   }

   Rectangle2DOptions .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   {
      constructor: Rectangle2DOptions,
      getTypeName: function ()
      {
         return "Rectangle2DOptions";
      },
      getComponentName: function ()
      {
         return "X_ITE";
      },
      getContainerField: function ()
      {
         return "rectangle2DOptions";
      },
      initialize: function ()
      {
         X3DBaseNode .prototype .initialize .call (this);
      },
      getGeometry: function ()
      {
         if (this .geometry)
            return this .geometry;

         this .geometry            = new IndexedFaceSet (this .getExecutionContext ());
         this .geometry ._texCoord = new TextureCoordinate (this .getExecutionContext ());
         this .geometry ._coord    = new Coordinate (this .getExecutionContext ());

         const
            geometry = this .geometry,
            texCoord = this .geometry ._texCoord .getValue (),
            coord    = this .geometry ._coord .getValue ();

         geometry ._texCoordIndex = new Fields .MFInt32 (
            0, 1, 2, 3, -1
         );

         geometry ._coordIndex = new Fields .MFInt32 (
            0, 1, 2, 3, -1
         );

         texCoord ._point = new Fields .MFVec2f (
            new Fields .SFVec2f (1, 1), new Fields .SFVec2f (0, 1), new Fields .SFVec2f (0, 0), new Fields .SFVec2f (1, 0)
         );

         coord ._point = new Fields .MFVec3f (
            new Fields .SFVec3f (1, 1, 0), new Fields .SFVec3f (-1, 1, 0), new Fields .SFVec3f (-1, -1, 0), new Fields .SFVec3f (1, -1, 0)
         );

         texCoord .setup ();
         coord    .setup ();
         geometry .setup ();

         return this .geometry;
      },
   });

   return Rectangle2DOptions;
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


define ('x_ite/Browser/Geometry2D/X3DGeometry2DContext',[
   "x_ite/Browser/Geometry2D/Arc2DOptions",
   "x_ite/Browser/Geometry2D/ArcClose2DOptions",
   "x_ite/Browser/Geometry2D/Circle2DOptions",
   "x_ite/Browser/Geometry2D/Disk2DOptions",
   "x_ite/Browser/Geometry2D/Rectangle2DOptions",
   "x_ite/Browser/Core/PrimitiveQuality",
],
function (Arc2DOptions,
          ArcClose2DOptions,
          Circle2DOptions,
          Disk2DOptions,
          Rectangle2DOptions,
          PrimitiveQuality)
{
"use strict";

   function X3DGeometry2DContext () { }

   X3DGeometry2DContext .prototype =
   {
      initialize: function ()
      {
         this .setPrimitiveQuality2D (this .getBrowserOptions () .getPrimitiveQuality ());
      },
      getArc2DOptions: function ()
      {
         return getOptionNode .call (this, "getArc2DOptions", Arc2DOptions);
      },
      getArcClose2DOptions: function ()
      {
         return getOptionNode .call (this, "getArcClose2DOptions", ArcClose2DOptions);
      },
      getCircle2DOptions: function ()
      {
         return getOptionNode .call (this, "getCircle2DOptions", Circle2DOptions);
      },
      getDisk2DOptions: function ()
      {
         return getOptionNode .call (this, "getDisk2DOptions", Disk2DOptions);
      },
      getRectangle2DOptions: function ()
      {
         return getOptionNode .call (this, "getRectangle2DOptions", Rectangle2DOptions);
      },
      setPrimitiveQuality2D: function (primitiveQuality)
      {
         const
            arc      = this .getArc2DOptions (),
            arcClose = this .getArcClose2DOptions (),
            circle   = this .getCircle2DOptions (),
            disk     = this .getDisk2DOptions ();

         switch (primitiveQuality)
         {
            case PrimitiveQuality .LOW:
            {
               arc      ._dimension = 20;
               arcClose ._dimension = 20;
               circle   ._dimension = 20;
               disk     ._dimension = 20;
               break;
            }
            case PrimitiveQuality .MEDIUM:
            {
               arc      ._dimension = 40;
               arcClose ._dimension = 40;
               circle   ._dimension = 40;
               disk     ._dimension = 40;
               break;
            }
            case PrimitiveQuality .HIGH:
            {
               arc      ._dimension = 80;
               arcClose ._dimension = 80;
               circle   ._dimension = 80;
               disk     ._dimension = 80;
               break;
            }
         }
      },
   };

   function getOptionNode (key, OptionNode)
   {
      const optionNode = new OptionNode (this .getPrivateScene ());

      optionNode .setup ();

      this [key] = function () { return optionNode; };

      Object .defineProperty (this, key, { enumerable: false });

      return optionNode;
   }

   return X3DGeometry2DContext;
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


define ('x_ite/Components/Geometry2D/Arc2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DLineGeometryNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Complex",
   "standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode,
          X3DConstants,
          Complex,
          Algorithm)
{
"use strict";

   function Arc2D (executionContext)
   {
      X3DLineGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .Arc2D);

      this ._startAngle .setUnit ("angle");
      this ._endAngle   .setUnit ("angle");
      this ._radius     .setUnit ("length");
   }

   Arc2D .prototype = Object .assign (Object .create (X3DLineGeometryNode .prototype),
   {
      constructor: Arc2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "startAngle", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "endAngle",   new Fields .SFFloat (1.5708)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",     new Fields .SFFloat (1)),
      ]),
      getTypeName: function ()
      {
         return "Arc2D";
      },
      getComponentName: function ()
      {
         return "Geometry2D";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      set_live__: function ()
      {
         X3DLineGeometryNode .prototype .set_live__ .call (this);

         if (this .isLive () .getValue ())
            this .getBrowser () .getArc2DOptions () .addInterest ("requestRebuild", this);
         else
            this .getBrowser () .getArc2DOptions () .removeInterest ("requestRebuild", this);
      },
      getSweepAngle: function ()
      {
         const
            start = Algorithm .interval (this ._startAngle .getValue (), 0, Math .PI * 2),
            end   = Algorithm .interval (this ._endAngle   .getValue (), 0, Math .PI * 2);

         if (start === end)
            return Math .PI * 2;

         const sweepAngle = Math .abs (end - start);

         if (start > end)
            return (Math .PI * 2) - sweepAngle;

         if (! isNaN (sweepAngle))
            return sweepAngle;

         // We must test for NAN, as NAN to int is undefined.
         return 0;
      },
      build: function ()
      {
         const
            options     = this .getBrowser () .getArc2DOptions (),
            dimension   = options ._dimension .getValue (),
            startAngle  = this ._startAngle .getValue  (),
            radius      = Math .abs (this ._radius .getValue ()),
            sweepAngle  = this .getSweepAngle (),
            steps       = Math .max (3, Math .floor (sweepAngle * dimension / (Math .PI * 2))),
            vertexArray = this .getVertices ();

         for (let n = 0; n < steps; ++ n)
         {
            const
               t1     = n / steps,
               theta1 = startAngle + (sweepAngle * t1),
               point1 = Complex .Polar (radius, theta1),
               t2     = (n + 1) / steps,
               theta2 = startAngle + (sweepAngle * t2),
               point2 = Complex .Polar (radius, theta2);

            vertexArray .push (point1 .real, point1 .imag, 0, 1);
            vertexArray .push (point2 .real, point2 .imag, 0, 1);
         }

         this .getMin () .set (-radius, -radius, 0);
         this .getMax () .set ( radius,  radius, 0);
      },
   });

   return Arc2D;
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


define ('x_ite/Components/Geometry2D/ArcClose2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DGeometryNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Complex",
   "standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DConstants,
          Complex,
          Algorithm)
{
"use strict";

   function ArcClose2D (executionContext)
   {
      X3DGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .ArcClose2D);

      this .setGeometryType (2);

      this ._startAngle .setUnit ("angle");
      this ._endAngle   .setUnit ("angle");
      this ._radius     .setUnit ("length");
   }

   ArcClose2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
   {
      constructor: ArcClose2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "closureType", new Fields .SFString ("PIE")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "startAngle",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "endAngle",    new Fields .SFFloat (1.5708)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",      new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",       new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "ArcClose2D";
      },
      getComponentName: function ()
      {
         return "Geometry2D";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      set_live__: function ()
      {
         X3DGeometryNode .prototype .set_live__ .call (this);

         if (this .isLive () .getValue ())
            this .getBrowser () .getArcClose2DOptions () .addInterest ("requestRebuild", this);
         else
            this .getBrowser () .getArcClose2DOptions () .removeInterest ("requestRebuild", this);
      },
      getSweepAngle: function ()
      {
         const
            start = Algorithm .interval (this ._startAngle .getValue (), 0, Math .PI * 2),
            end   = Algorithm .interval (this ._endAngle   .getValue (), 0, Math .PI * 2);

         if (start === end)
            return Math .PI * 2;

         const sweepAngle = Math .abs (end - start);

         if (start > end)
            return (Math .PI * 2) - sweepAngle;

         if (! isNaN (sweepAngle))
            return sweepAngle;

         // We must test for NAN, as NAN to int is undefined.
         return 0;
      },
      build: (function ()
      {
         const half = new Complex (0.5, 0.5);

         return function ()
         {
            const
               options       = this .getBrowser () .getArcClose2DOptions (),
               chord         = this ._closureType .getValue () === "CHORD",
               dimension     = options ._dimension .getValue (),
               startAngle    = this ._startAngle .getValue  (),
               radius        = Math .abs (this ._radius .getValue ()),
               sweepAngle    = this .getSweepAngle (),
               steps         = Math .max (4, Math .floor (sweepAngle * dimension / (Math .PI * 2))),
               texCoordArray = this .getTexCoords (),
               normalArray   = this .getNormals (),
               vertexArray   = this .getVertices (),
               texCoords     = [ ],
               points        = [ ];

            this .getMultiTexCoords () .push (texCoordArray);

            const steps_1 = steps - 1;

            for (let n = 0; n < steps; ++ n)
            {
               const
                  t     = n / steps_1,
                  theta = startAngle + (sweepAngle * t);

               texCoords .push (Complex .Polar (0.5, theta) .add (half));
               points    .push (Complex .Polar (radius, theta));
            }

            if (chord)
            {
               const
                  t0 = texCoords [0],
                  p0 = points [0];

               for (let i = 1; i < steps_1; ++ i)
               {
                  const
                     t1 = texCoords [i],
                     t2 = texCoords [i + 1],
                     p1 = points [i],
                     p2 = points [i + 1];

                  texCoordArray .push (t0 .real, t0 .imag, 0, 1,
                                       t1 .real, t1 .imag, 0, 1,
                                       t2 .real, t2 .imag, 0, 1);

                  normalArray .push (0, 0, 1,
                                     0, 0, 1,
                                     0, 0, 1);

                  vertexArray .push (p0 .real, p0 .imag, 0, 1,
                                     p1 .real, p1 .imag, 0, 1,
                                     p2 .real, p2 .imag, 0, 1);
               }
            }
            else
            {
               for (let i = 0; i < steps_1; ++ i)
               {
                  const
                     t1 = texCoords [i],
                     t2 = texCoords [i + 1],
                     p1 = points [i],
                     p2 = points [i + 1];

                  texCoordArray .push (0.5, 0.5, 0, 1,
                                       t1 .real, t1 .imag, 0, 1,
                                       t2 .real, t2 .imag, 0, 1);

                  normalArray .push (0, 0, 1,  0, 0, 1,  0, 0, 1);

                  vertexArray .push (0, 0, 0, 1,
                                     p1 .real, p1 .imag, 0, 1,
                                     p2 .real, p2 .imag, 0, 1);
               }
            }

            this .getMin () .set (-radius, -radius, 0);
            this .getMax () .set ( radius,  radius, 0);

            this .setSolid (this ._solid .getValue ());
         };
      })(),
   });

   return ArcClose2D;
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


define ('x_ite/Components/Geometry2D/Circle2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DLineGeometryNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode,
          X3DConstants)
{
"use strict";

   function Circle2D (executionContext)
   {
      X3DLineGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .Circle2D);

      this ._radius .setUnit ("length");
   }

   Circle2D .prototype = Object .assign (Object .create (X3DLineGeometryNode .prototype),
   {
      constructor: Circle2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",   new Fields .SFFloat (1)),
      ]),
      getTypeName: function ()
      {
         return "Circle2D";
      },
      getComponentName: function ()
      {
         return "Geometry2D";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      set_live__: function ()
      {
         X3DLineGeometryNode .prototype .set_live__ .call (this);

         if (this .isLive () .getValue ())
            this .getBrowser () .getCircle2DOptions () .addInterest ("requestRebuild", this);
         else
            this .getBrowser () .getCircle2DOptions () .removeInterest ("requestRebuild", this);
      },
      build: function ()
      {
         const
            options     = this .getBrowser () .getCircle2DOptions (),
            vertexArray = this .getVertices (),
            radius      = this ._radius .getValue ();

         if (radius === 1)
         {
            this .setVertices (options .getVertices ());
         }
         else
         {
            const defaultVertices = options .getVertices () .getValue ();

            for (let i = 0, length = defaultVertices .length; i < length; i += 4)
               vertexArray .push (defaultVertices [i] * radius, defaultVertices [i + 1] * radius, 0, 1);
         }

         this .getMin () .set (-radius, -radius, 0);
         this .getMax () .set ( radius,  radius, 0);
      },
   });

   return Circle2D;
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


define ('x_ite/Components/Geometry2D/Disk2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DGeometryNode",
   "x_ite/Components/Rendering/X3DLineGeometryNode",
   "x_ite/Components/Rendering/X3DPointGeometryNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DLineGeometryNode,
          X3DPointGeometryNode,
          X3DConstants)
{
"use strict";

   function Disk2D (executionContext)
   {
      X3DLineGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .Disk2D);

      this ._innerRadius .setUnit ("length");
      this ._outerRadius .setUnit ("length");
   }

   Disk2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
   {
      constructor: Disk2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "innerRadius", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "outerRadius", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",       new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "Disk2D";
      },
      getComponentName: function ()
      {
         return "Geometry2D";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      initialize: function ()
      {
         X3DGeometryNode .prototype .initialize .call (this);
      },
      set_live__: function ()
      {
         X3DGeometryNode .prototype .set_live__ .call (this);

         if (this .isLive () .getValue ())
            this .getBrowser () .getDisk2DOptions () .addInterest ("requestRebuild", this);
         else
            this .getBrowser () .getDisk2DOptions () .removeInterest ("requestRebuild", this);
      },
      build: function ()
      {
         const
            browser     = this .getBrowser (),
            gl          = browser .getContext (),
            options     = browser .getDisk2DOptions (),
            innerRadius = Math .min (Math .abs (this ._innerRadius .getValue ()), Math .abs (this ._outerRadius .getValue ())),
            outerRadius = Math .max (Math .abs (this ._innerRadius .getValue ()), Math .abs (this ._outerRadius .getValue ()));

         if (innerRadius === outerRadius)
         {
            const vertexArray = this .getVertices ();

            // Point

            if (outerRadius === 0)
            {
               vertexArray .push (0, 0, 0, 1);

               this .getMin () .set (0, 0, 0);
               this .getMax () .set (0, 0, 0);

               this .setGeometryType (0);
               this .setPrimitiveMode (gl .POINTS);
               this .setTransparent (true);
               this .setBase (X3DPointGeometryNode);
               return;
            }

            // Circle

            if (outerRadius === 1)
            {
               this .setVertices (options .getCircleVertices ());
            }
            else
            {
               const defaultVertices = options .getCircleVertices () .getValue ();

               for (let i = 0, length = defaultVertices .length; i < length; i += 4)
                  vertexArray .push (defaultVertices [i] * outerRadius, defaultVertices [i + 1] * outerRadius, 0, 1);
            }

            this .getMin () .set (-outerRadius, -outerRadius, 0);
            this .getMax () .set ( outerRadius,  outerRadius, 0);

            this .setGeometryType (1);
            this .setPrimitiveMode (gl .LINES);
            this .setTransparent (false);
            this .setBase (X3DLineGeometryNode);
            return;
         }

         if (innerRadius === 0)
         {
            // Disk

            this .getMultiTexCoords () .push (options .getDiskTexCoords ());
            this .setNormals (options .getDiskNormals ());

            if (outerRadius === 1)
            {
               this .setVertices (options .getDiskVertices ());
            }
            else
            {
               const
                  defaultVertices = options .getDiskVertices () .getValue (),
                  vertexArray     = this .getVertices ();

               for (let i = 0, length = defaultVertices .length; i < length; i += 4)
                  vertexArray .push (defaultVertices [i] * outerRadius, defaultVertices [i + 1] * outerRadius, 0, 1);
            }

            this .getMin () .set (-outerRadius, -outerRadius, 0);
            this .getMax () .set ( outerRadius,  outerRadius, 0);

            this .setGeometryType (2);
            this .setPrimitiveMode (gl .TRIANGLES);
            this .setTransparent (false);
            this .setSolid (this ._solid .getValue ());
            this .setBase (X3DGeometryNode);
            return;
         }

         // Disk with hole

         const
            scale            = innerRadius / outerRadius,
            offset           = (1 - scale) / 2,
            defaultTexCoords = options .getDiskTexCoords () .getValue (),
            defaultVertices  = options .getDiskVertices () .getValue (),
            texCoordArray    = this .getTexCoords (),
            normalArray      = this .getNormals (),
            vertexArray      = this .getVertices ();

         this .getMultiTexCoords () .push (texCoordArray);

         for (let i = 0, length = defaultVertices .length; i < length; i += 12)
         {
            texCoordArray .push (defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
                                 defaultTexCoords [i + 4], defaultTexCoords [i + 5], 0, 1,
                                 defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,

                                 defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
                                 defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,
                                 defaultTexCoords [i + 8] * scale + offset, defaultTexCoords [i + 9] * scale + offset, 0, 1);

            normalArray .push (0, 0, 1,  0, 0, 1,  0, 0, 1,
                               0, 0, 1,  0, 0, 1,  0, 0, 1);

            vertexArray .push (defaultVertices [i + 4] * innerRadius, defaultVertices [i + 5] * innerRadius, 0, 1,
                               defaultVertices [i + 4] * outerRadius, defaultVertices [i + 5] * outerRadius, 0, 1,
                               defaultVertices [i + 8] * outerRadius, defaultVertices [i + 9] * outerRadius, 0, 1,

                               defaultVertices [i + 4] * innerRadius, defaultVertices [i + 5] * innerRadius, 0, 1,
                               defaultVertices [i + 8] * outerRadius, defaultVertices [i + 9] * outerRadius, 0, 1,
                               defaultVertices [i + 8] * innerRadius, defaultVertices [i + 9] * innerRadius, 0, 1);
         }

         this .getMin () .set (-outerRadius, -outerRadius, 0);
         this .getMax () .set ( outerRadius,  outerRadius, 0);

         this .setGeometryType (2);
         this .setPrimitiveMode (gl .TRIANGLES);
         this .setTransparent (false);
         this .setSolid (this ._solid .getValue ());
         this .setBase (X3DGeometryNode);
      },
      setBase: function (base)
      {
         this .intersectsLine   = base .prototype .intersectsLine;
         this .intersectsBox    = base .prototype .intersectsBox;
         this .display          = base .prototype .display;
         this .displayParticles = base .prototype .displayParticles;
      },
      setRenderFunctions: function ()
      { },
   });

   return Disk2D;
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


define ('x_ite/Components/Geometry2D/Polyline2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DLineGeometryNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode,
          X3DConstants)
{
"use strict";

   function Polyline2D (executionContext)
   {
      X3DLineGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .Polyline2D);

      this ._lineSegments .setUnit ("length");
   }

   Polyline2D .prototype = Object .assign (Object .create (X3DLineGeometryNode .prototype),
   {
      constructor: Polyline2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "lineSegments", new Fields .MFVec2f ()),
      ]),
      getTypeName: function ()
      {
         return "Polyline2D";
      },
      getComponentName: function ()
      {
         return "Geometry2D";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      build: function ()
      {
         const
            lineSegments = this ._lineSegments .getValue (),
            vertexArray  = this .getVertices ();

         for (let i = 0, length = (this ._lineSegments .length - 1) * 2; i < length; i += 2)
         {
            vertexArray .push (lineSegments [i + 0], lineSegments [i + 1], 0, 1);
            vertexArray .push (lineSegments [i + 2], lineSegments [i + 3], 0, 1);
         }
      },
   });

   return Polyline2D;
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


define ('x_ite/Components/Geometry2D/Polypoint2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DPointGeometryNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DPointGeometryNode,
          X3DConstants)
{
"use strict";

   function Polypoint2D (executionContext)
   {
      X3DPointGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .Polypoint2D);

      this ._point .setUnit ("length");
   }

   Polypoint2D .prototype = Object .assign (Object .create (X3DPointGeometryNode .prototype),
   {
      constructor: Polypoint2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec2f ()),
      ]),
      getTypeName: function ()
      {
         return "Polypoint2D";
      },
      getComponentName: function ()
      {
         return "Geometry2D";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      build: function ()
      {
         const
            point       = this ._point .getValue (),
            vertexArray = this .getVertices ();

         for (let i = 0, length = this ._point .length * 2; i < length; i += 2)
         {
            vertexArray .push (point [i], point [i + 1], 0, 1);
         }
      },
   });

   return Polypoint2D;
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


define ('x_ite/Components/Geometry2D/Rectangle2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DGeometryNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DConstants,
          Vector2,
          Vector3)
{
"use strict";

   function Rectangle2D (executionContext)
   {
      X3DGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .Rectangle2D);

      this .setGeometryType (2);

      this ._size .setUnit ("length");
   }

   Rectangle2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
   {
      constructor: Rectangle2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "size",     new Fields .SFVec2f (2, 2)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "Rectangle2D";
      },
      getComponentName: function ()
      {
         return "Geometry2D";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      build: (function ()
      {
         const defaultSize = new Vector2 (2, 2);

         return function ()
         {
            const
               options  = this .getBrowser () .getRectangle2DOptions (),
               geometry = options .getGeometry (),
               size     = this ._size .getValue ();

            this .setMultiTexCoords (geometry .getMultiTexCoords ());
            this .setNormals        (geometry .getNormals ());

            if (size .equals (defaultSize))
            {
               this .setVertices (geometry .getVertices ());

               this .getMin () .assign (geometry .getMin ());
               this .getMax () .assign (geometry .getMax ());
            }
            else
            {
               const
                  scale           = Vector3 .divide (size, 2),
                  x               = scale .x,
                  y               = scale .y,
                  defaultVertices = geometry .getVertices () .getValue (),
                  vertexArray     = this .getVertices ();

               for (let i = 0; i < defaultVertices .length; i += 4)
               {
                  vertexArray .push (x * defaultVertices [i],
                                     y * defaultVertices [i + 1],
                                     0,
                                     1);
               }

               this .getMin () .set (-x, -y, 0);
               this .getMax () .set ( x,  y, 0);
            }

            this .setSolid (this ._solid .getValue ());
         };
      })(),
   });

   return Rectangle2D;
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


define ('x_ite/Components/Geometry2D/TriangleSet2D',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DGeometryNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DConstants)
{
"use strict";

   function TriangleSet2D (executionContext)
   {
      X3DGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .TriangleSet2D);

      this .setGeometryType (2);

      this ._vertices .setUnit ("length");
   }

   TriangleSet2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
   {
      constructor: TriangleSet2D,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "vertices", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "TriangleSet2D";
      },
      getComponentName: function ()
      {
         return "Geometry2D";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      build: function ()
      {
         const
            vertices    = this ._vertices .getValue (),
            normalArray = this .getNormals (),
            vertexArray = this .getVertices ();

         for (let i = 0, length = this ._vertices .length * 2; i < length; i += 2)
         {
            normalArray .push (0, 0, 1);
            vertexArray .push (vertices [i], vertices [i + 1], 0, 1);
         }

         this .setSolid (this ._solid .getValue ());
      },
      buildTexCoords: function ()
      {
         const texCoordArray = this .getTexCoords ();

         if (texCoordArray .length === 0)
         {
            const
               p             = this .getTexCoordParams (),
               min           = p .min,
               Ssize         = p .Ssize,
               vertexArray   = this .getVertices () .getValue ();

            for (let i = 0, length = vertexArray .length; i < length; i += 4)
            {
               texCoordArray .push ((vertexArray [i]     - min [0]) / Ssize,
                                    (vertexArray [i + 1] - min [1]) / Ssize,
                                    0,
                                    1);
            }

            texCoordArray .shrinkToFit ();
         }

         this .getMultiTexCoords () .push (texCoordArray);
      },
   });

   return TriangleSet2D;
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


define (require .getComponentUrl ("geometry2d"), [
   "x_ite/Components",
   "x_ite/Browser/Geometry2D/X3DGeometry2DContext",
   "x_ite/Components/Geometry2D/Arc2D",
   "x_ite/Components/Geometry2D/ArcClose2D",
   "x_ite/Components/Geometry2D/Circle2D",
   "x_ite/Components/Geometry2D/Disk2D",
   "x_ite/Components/Geometry2D/Polyline2D",
   "x_ite/Components/Geometry2D/Polypoint2D",
   "x_ite/Components/Geometry2D/Rectangle2D",
   "x_ite/Components/Geometry2D/TriangleSet2D",
],
function (Components,
          X3DGeometry2DContext,
          Arc2D,
          ArcClose2D,
          Circle2D,
          Disk2D,
          Polyline2D,
          Polypoint2D,
          Rectangle2D,
          TriangleSet2D)
{
"use strict";

   Components .addComponent ({
      name: "Geometry2D",
      types:
      {
         Arc2D:         Arc2D,
         ArcClose2D:    ArcClose2D,
         Circle2D:      Circle2D,
         Disk2D:        Disk2D,
         Polyline2D:    Polyline2D,
         Polypoint2D:   Polypoint2D,
         Rectangle2D:   Rectangle2D,
         TriangleSet2D: TriangleSet2D,
      },
      abstractTypes:
      {
      },
      context: X3DGeometry2DContext,
   });
});


})();

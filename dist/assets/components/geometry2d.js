(function () {

	var
		define  = X3D .define,
		require = X3D .require,
		module  = { };
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
	"x_ite/Basic/X3DBaseNode",
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
	"x_ite/Basic/X3DBaseNode",
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
	"x_ite/Basic/X3DBaseNode",
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
			var
				dimension = this .dimension_ .getValue (),
				angle     = Math .PI * 2 / dimension,
				vertices  = this .vertices;

			vertices .length = 0;

			for (var n = 0; n < dimension; ++ n)
			{
				var point = Complex .Polar (1, angle * n);
		
				vertices .push (point .real, point .imag, 0, 1);
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
	"x_ite/Basic/X3DBaseNode",
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
			var
				half      = new Complex (0.5, 0.5),
				texCoord1 = new Complex (0, 0),
				texCoord2 = new Complex (0, 0),
				point1    = new Complex (0, 0),
				point2    = new Complex (0, 0);

			return function ()
			{
				var
					dimension      = this .dimension_ .getValue (),
					angle          = Math .PI * 2 / dimension,
					circleVertices = this .circleVertices,
					diskTexCoords  = this .diskTexCoords,
					diskNormals    = this .diskNormals,
					diskVertices   = this .diskVertices;
	
				circleVertices .length = 0;
				diskTexCoords  .length = 0;
				diskNormals    .length = 0;
				diskVertices   .length = 0;
	
				for (var n = 0; n < dimension; ++ n)
				{
					var
						theta1 = angle * n,
						theta2 = angle * (n + 1);

					texCoord1 .setPolar (0.5, theta1) .add (half);
					texCoord2 .setPolar (0.5, theta2) .add (half);
					point1    .setPolar (1, theta1);
					point2    .setPolar (1, theta2);
			
					// Circle
	
					circleVertices .push (point1 .real, point1 .imag, 0, 1);
	
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
	"x_ite/Basic/X3DBaseNode",
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
			this .geometry .texCoord_ = new TextureCoordinate (this .getExecutionContext ());
			this .geometry .coord_    = new Coordinate (this .getExecutionContext ());

			var
				geometry = this .geometry,
				texCoord = this .geometry .texCoord_ .getValue (),
				coord    = this .geometry .coord_ .getValue ();

			geometry .texCoordIndex_ = new Fields .MFInt32 (
				0, 1, 2, 3, -1
			);

			geometry .coordIndex_ = new Fields .MFInt32 (
				0, 1, 2, 3, -1
			);

			texCoord .point_ = new Fields .MFVec2f (
				new Fields .SFVec2f (1, 1), new Fields .SFVec2f (0, 1), new Fields .SFVec2f (0, 0), new Fields .SFVec2f (1, 0)
			);

			coord .point_ = new Fields .MFVec3f (
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
	
	function getOptionNode (name, Type)
	{
		if (this [name])
			return this [name];

		this [name] = new Type (this .getPrivateScene ());
		this [name] .setup ();

		return this [name];
	}

	function X3DGeometry2DContext () { }

	X3DGeometry2DContext .prototype =
	{
		initialize: function ()
		{
			this .setGeometry2DPrimitiveQuality (this .getBrowserOptions () .getPrimitiveQuality ());
		},
		getArc2DOptions: function ()
		{
			return getOptionNode .call (this, "arc2DOptions", Arc2DOptions);
		},
		getArcClose2DOptions: function ()
		{
			return getOptionNode .call (this, "arcClose2DOptions", ArcClose2DOptions);
		},
		getCircle2DOptions: function ()
		{
			return getOptionNode .call (this, "circle2DOptions", Circle2DOptions);
		},
		getDisk2DOptions: function ()
		{
			return getOptionNode .call (this, "disk2DOptions", Disk2DOptions);
		},
		getRectangle2DOptions: function ()
		{
			return getOptionNode .call (this, "rectangle2DOptions", Rectangle2DOptions);
		},
		setGeometry2DPrimitiveQuality: function (primitiveQuality)
		{
			var
				arc      = this .getArc2DOptions (),
				arcClose = this .getArcClose2DOptions (),
				circle   = this .getCircle2DOptions (),
				disk     = this .getDisk2DOptions ();

			switch (primitiveQuality)
			{
				case PrimitiveQuality .LOW:
				{
					arc      .dimension_ = 20;
					arcClose .dimension_ = 20;
					circle   .dimension_ = 20;
					disk     .dimension_ = 20;
					break;
				}
				case PrimitiveQuality .MEDIUM:
				{
					arc      .dimension_ = 40;
					arcClose .dimension_ = 40;
					circle   .dimension_ = 40;
					disk     .dimension_ = 40;
					break;
				}
				case PrimitiveQuality .HIGH:
				{
					arc      .dimension_ = 80;
					arcClose .dimension_ = 80;
					circle   .dimension_ = 80;
					disk     .dimension_ = 80;
					break;
				}
			}
		},
	};

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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Complex",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode,
          X3DConstants,
          Complex,
          Vector3,
          Algorithm)
{
"use strict";

	function Arc2D (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Arc2D);

		this .setGeometryType (1);

		this .startAngle_ .setUnit ("angle");
		this .endAngle_   .setUnit ("angle");
		this .radius_     .setUnit ("length");
	}

	Arc2D .prototype = Object .assign (Object .create (X3DLineGeometryNode .prototype),
	{
		constructor: Arc2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
			var
				start = Algorithm .interval (this .startAngle_ .getValue (), 0, Math .PI * 2),
				end   = Algorithm .interval (this .endAngle_   .getValue (), 0, Math .PI * 2);

			if (start === end)
				return Math .PI * 2;

			var sweepAngle = Math .abs (end - start);

			if (start > end)
				return (Math .PI * 2) - sweepAngle;

			if (! isNaN (sweepAngle))
				return sweepAngle;

			// We must test for NAN, as NAN to int is undefined.
			return 0;
		},
		build: function ()
		{
			var
				gl          = this .getBrowser () .getContext (),
				options     = this .getBrowser () .getArc2DOptions (),
				dimension   = options .dimension_ .getValue (),
				startAngle  = this .startAngle_ .getValue  (),
				radius      = Math .abs (this .radius_ .getValue ()),
				sweepAngle  = this .getSweepAngle (),
				circle      = sweepAngle == (Math .PI * 2),
				steps       = Math .floor (sweepAngle * dimension / (Math .PI * 2)),
				vertexArray = this .getVertices ();

			steps = Math .max (3, steps);

			if (! circle)
			{
				++ steps;
				this .setPrimitiveMode (gl .LINE_STRIP);
			}
			else
				this .setPrimitiveMode (gl .LINE_LOOP);

			var steps_1 = circle ? steps : steps - 1;

			for (var n = 0; n < steps; ++ n)
			{
				var
					t     = n / steps_1,
					theta = startAngle + (sweepAngle * t),
					point = Complex .Polar (radius, theta);

				vertexArray .push (point .real, point .imag, 0, 1);
			}

			this .getMin () .set (-radius, -radius, 0);
			this .getMax () .set ( radius,  radius, 0);

			this .setSolid (false);
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Complex",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DConstants,
          Complex,
          Vector3,
          Algorithm)
{
"use strict";

	function ArcClose2D (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .ArcClose2D);

		this .setGeometryType (2);

		this .startAngle_ .setUnit ("angle");
		this .endAngle_   .setUnit ("angle");
		this .radius_     .setUnit ("length");
	}

	ArcClose2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
	{
		constructor: ArcClose2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
			var
				start = Algorithm .interval (this .startAngle_ .getValue (), 0, Math .PI * 2),
				end   = Algorithm .interval (this .endAngle_   .getValue (), 0, Math .PI * 2);

			if (start === end)
				return Math .PI * 2;

			var sweepAngle = Math .abs (end - start);

			if (start > end)
				return (Math .PI * 2) - sweepAngle;

			if (! isNaN (sweepAngle))
				return sweepAngle;

			// We must test for NAN, as NAN to int is undefined.
			return 0;
		},
		build: (function ()
		{
			var half = new Complex (0.5, 0.5);

			return function ()
			{
				var
					options       = this .getBrowser () .getArcClose2DOptions (),
					chord         = this .closureType_ .getValue () === "CHORD",
					dimension     = options .dimension_ .getValue (),
					startAngle    = this .startAngle_ .getValue  (),
					radius        = Math .abs (this .radius_ .getValue ()),
					sweepAngle    = this .getSweepAngle (),
					steps         = Math .max (4, Math .floor (sweepAngle * dimension / (Math .PI * 2))),
					texCoordArray = this .getTexCoords (),
					normalArray   = this .getNormals (),
					vertexArray   = this .getVertices (),
					texCoords     = [ ],
					points        = [ ];

				this .getMultiTexCoords () .push (texCoordArray);

				var steps_1 = steps - 1;

				for (var n = 0; n < steps; ++ n)
				{
					var
						t     = n / steps_1,
						theta = startAngle + (sweepAngle * t);

					texCoords .push (Complex .Polar (0.5, theta) .add (half));
					points    .push (Complex .Polar (radius, theta));
				}

				if (chord)
				{
					var
						t0 = texCoords [0],
						p0 = points [0];

					for (var i = 1; i < steps_1; ++ i)
					{
						var
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
					for (var i = 0; i < steps_1; ++ i)
					{
						var
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

				this .setSolid (this .solid_ .getValue ());
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DConstants",
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

		this .setGeometryType (1);

		this .radius_ .setUnit ("length");
	}

	Circle2D .prototype = Object .assign (Object .create (X3DLineGeometryNode .prototype),
	{
		constructor: Circle2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
		initialize: function ()
		{
			X3DLineGeometryNode .prototype .initialize .call (this);

			this .setPrimitiveMode (this .getBrowser () .getContext () .LINE_LOOP);
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
			var
				options     = this .getBrowser () .getCircle2DOptions (),
				vertexArray = this .getVertices (),
				radius      = this .radius_ .getValue ();

			if (radius === 1)
			{
				this .setVertices (options .getVertices ());
			}
			else
			{
				var defaultVertices = options .getVertices () .getValue ();

				for (var i = 0, length = defaultVertices .length; i < length; i += 4)
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DLineGeometryNode,
          X3DConstants,
          Vector3)
{
"use strict";

	function Disk2D (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Disk2D);

		this .innerRadius_ .setUnit ("length");
		this .outerRadius_ .setUnit ("length");
	}

	Disk2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
		//X3DLineGeometryNode .prototype, // Considered X3DLineGeometryNode.
	{
		constructor: Disk2D,
		fieldDefinitions: new FieldDefinitionArray ([
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

			this .setPrimitiveMode (this .getBrowser () .getContext () .LINE_LOOP);
		},
		getShader: function (browser)
		{
			// For circle support.

			return browser .getLineShader ();
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
			var
				options     = this .getBrowser () .getDisk2DOptions (),
				innerRadius = this .innerRadius_ .getValue (),
				outerRadius = this .outerRadius_ .getValue ();

			if (innerRadius === outerRadius)
			{
				var
					radius      = Math .abs (outerRadius),
					vertexArray = this .getVertices ();

				// Point

				//if (radius === 0)
				//{
				//	vertexArray .push (0, 0, 0, 1);
				//	this .setGeometryType (GeometryType .GEOMETRY_POINTS);
				//	return;
				//}

				// Circle

				if (radius === 1)
				{
					this .setVertices (options .getCircleVertices ());
				}
				else
				{
					var defaultVertices = options .getCircleVertices () .getValue ();

					for (var i = 0, length = defaultVertices .length; i < length; i += 4)
						vertexArray .push (defaultVertices [i] * radius, defaultVertices [i + 1] * radius, 0, 1);
				}

				this .getMin () .set (-radius, -radius, 0);
				this .getMax () .set ( radius,  radius, 0);

				this .setGeometryType (1);
				return;
			}

			if (innerRadius === 0 || outerRadius === 0)
			{
				// Disk

				var radius = Math .abs (Math .max (innerRadius, outerRadius));

				this .getMultiTexCoords () .push (options .getDiskTexCoords ());
				this .setNormals (options .getDiskNormals ());

				if (radius === 1)
				{
					this .setVertices (options .getDiskVertices ());
				}
				else
				{
					var
						defaultVertices = options .getDiskVertices () .getValue (),
						vertexArray     = this .getVertices ();

					for (var i = 0, length = defaultVertices .length; i < length; i += 4)
						vertexArray .push (defaultVertices [i] * radius, defaultVertices [i + 1] * radius, 0, 1);
				}

				this .getMin () .set (-radius, -radius, 0);
				this .getMax () .set ( radius,  radius, 0);

				this .setGeometryType (2);
				this .setSolid (this .solid_ .getValue ());

				return;
			}

			// Disk with hole

			var
				maxRadius        = Math .abs (Math .max (innerRadius, outerRadius)),
				minRadius        = Math .abs (Math .min (innerRadius, outerRadius)),
				scale            = minRadius / maxRadius,
				offset           = (1 - scale) / 2,
				defaultTexCoords = options .getDiskTexCoords () .getValue (),
				defaultVertices  = options .getDiskVertices () .getValue (),
				texCoordArray    = this .getTexCoords (),
				normalArray      = this .getNormals (),
				vertexArray      = this .getVertices ();

			this .getMultiTexCoords () .push (texCoordArray);

			for (var i = 0, length = defaultVertices .length; i < length; i += 12)
			{
				texCoordArray .push (defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
				                     defaultTexCoords [i + 4], defaultTexCoords [i + 5], 0, 1,
				                     defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,

				                     defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
				                     defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,
				                     defaultTexCoords [i + 8] * scale + offset, defaultTexCoords [i + 9] * scale + offset, 0, 1);

				normalArray .push (0, 0, 1,  0, 0, 1,  0, 0, 1,
                               0, 0, 1,  0, 0, 1,  0, 0, 1);

				vertexArray .push (defaultVertices [i + 4] * minRadius, defaultVertices [i + 5] * minRadius, 0, 1,
				                   defaultVertices [i + 4] * maxRadius, defaultVertices [i + 5] * maxRadius, 0, 1,
				                   defaultVertices [i + 8] * maxRadius, defaultVertices [i + 9] * maxRadius, 0, 1,

				                   defaultVertices [i + 4] * minRadius, defaultVertices [i + 5] * minRadius, 0, 1,
				                   defaultVertices [i + 8] * maxRadius, defaultVertices [i + 9] * maxRadius, 0, 1,
				                   defaultVertices [i + 8] * minRadius, defaultVertices [i + 9] * minRadius, 0, 1);
			}

			this .getMin () .set (-maxRadius, -maxRadius, 0);
			this .getMax () .set ( maxRadius,  maxRadius, 0);

			this .setGeometryType (2);
			this .setSolid (this .solid_ .getValue ());
		},
		intersectsLine: function (line, clipPlanes, modelViewMatrix, intersections)
		{
			if (this .getGeometryType () < 2)
			{
				return X3DLineGeometryNode .prototype .intersectsLine .call (this, line, clipPlanes, modelViewMatrix, intersections);
			}
			else
			{
				return X3DGeometryNode .prototype .intersectsLine .call (this, line, clipPlanes, modelViewMatrix, intersections);
			}
		},
		intersectsBox: function (box, clipPlanes, modelViewMatrix)
		{
			if (this .getGeometryType () < 2)
			{
				return X3DLineGeometryNode .prototype .intersectsBox .call (this, box, clipPlanes, modelViewMatrix);
			}
			else
			{
				return X3DGeometryNode .prototype .intersectsBox .call (this, box, clipPlanes, modelViewMatrix);
			}
		},
		display: function (gl, context)
		{
			if (this .getGeometryType () < 2)
			{
				return X3DLineGeometryNode .prototype .display .call (this, gl, context);
			}
			else
			{
				return X3DGeometryNode .prototype .display .call (this, gl, context);
			}
		},
		displayParticles: function (gl, context, particles, numParticles)
		{
			if (this .getGeometryType () < 2)
			{
				return X3DLineGeometryNode .prototype .displayParticles .call (this, gl, context, particles, numParticles);
			}
			else
			{
				return X3DGeometryNode .prototype .displayParticles .call (this, gl, context, particles, numParticles);
			}
		}
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode,
          X3DConstants,
          Vector3)
{
"use strict";

	function Polyline2D (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Polyline2D);

		this .setGeometryType (1);

		this .lineSegments_ .setUnit ("length");
	}

	Polyline2D .prototype = Object .assign (Object .create (X3DLineGeometryNode .prototype),
	{
		constructor: Polyline2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
		initialize: function ()
		{
			X3DLineGeometryNode .prototype .initialize .call (this);

			this .setPrimitiveMode (this .getBrowser () .getContext () .LINE_STRIP);
		},
		build: function ()
		{
			var
				lineSegments = this .lineSegments_ .getValue (),
				vertexArray  = this .getVertices ();

			for (var i = 0, length = this .lineSegments_ .length * 2; i < length; i += 2)
			{
				vertexArray .push (lineSegments [i], lineSegments [i + 1], 0, 1);
			}

			this .setSolid (false);
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode, 
          X3DConstants,
          Vector3)
{
"use strict";

	function Polypoint2D (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Polypoint2D);

		this .setGeometryType (0);

		this .point_ .setUnit ("length");

		this .setTransparent (true);
	}

	Polypoint2D .prototype = Object .assign (Object .create (X3DLineGeometryNode .prototype),
	{
		constructor: Polypoint2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
		initialize: function ()
		{
			X3DLineGeometryNode .prototype .initialize .call (this);

			var browser = this .getBrowser ();

			this .setPrimitiveMode (browser .getContext () .POINTS);
			this .setSolid (false);
		},
		getShader: function (browser)
		{
			return browser .getPointShader ();
		},
		build: function ()
		{
			var
				point       = this .point_ .getValue (),
				vertexArray = this .getVertices ();

			for (var i = 0, length = this .point_ .length * 2; i < length; i += 2)
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
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

	var defaultSize = new Vector2 (2, 2);

	function Rectangle2D (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Rectangle2D);

		this .setGeometryType (2);

		this .size_ .setUnit ("length");
	}

	Rectangle2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
	{
		constructor: Rectangle2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
		build: function ()
		{
			var
				options  = this .getBrowser () .getRectangle2DOptions (),
				geometry = options .getGeometry (),
				size     = this .size_ .getValue ();

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
				var
					scale           = Vector3 .divide (size, 2),
					x               = scale .x,
					y               = scale .y,
					defaultVertices = geometry .getVertices () .getValue (),
					vertexArray     = this .getVertices ();

				for (var i = 0; i < defaultVertices .length; i += 4)
				{
					vertexArray .push (x * defaultVertices [i],
					                   y * defaultVertices [i + 1],
					                   defaultVertices [i + 2],
					                   1);
				}
	
				this .getMin () .set (-x, -y, 0);
				this .getMax () .set ( x,  y, 0);
			}

			this .setSolid (this .solid_ .getValue ());
		},
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode, 
          X3DConstants,
          Vector3)
{
"use strict";

	function TriangleSet2D (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .TriangleSet2D);

		this .setGeometryType (2);

		this .vertices_ .setUnit ("length");
	}

	TriangleSet2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
	{
		constructor: TriangleSet2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
			var
				vertices    = this .vertices_ .getValue (),
				normalArray = this .getNormals (),
				vertexArray = this .getVertices ();

			for (var i = 0, length = this .vertices_ .length * 2; i < length; i += 2)
			{
				normalArray .push (0, 0, 1);
				vertexArray .push (vertices [i], vertices [i + 1], 0, 1);
			}

			this .setSolid (this .solid_ .getValue ());
		},
		buildTexCoords: function ()
		{
			var texCoordArray = this .getTexCoords ();

			if (texCoordArray .length === 0)
			{
				var
					p             = this .getTexCoordParams (),
					min           = p .min,
					Ssize         = p .Ssize,
					vertexArray   = this .getVertices () .getValue ();
	
				for (var i = 0, length = vertexArray .length; i < length; i += 4)
				{
					texCoordArray .push ((vertexArray [i]     - min [0]) / Ssize,
					                     (vertexArray [i + 1] - min [1]) / Ssize,
					                     0,
					                     1);
				}

				texCoordArray .shrinkToFit ();
			}

			return texCoordArray;
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


define ([
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
		browser: X3DGeometry2DContext,
	});
});



}());

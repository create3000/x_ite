(function () {

	var
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode, 
          X3DConstants)
{
"use strict";

	function Contour2D (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .Contour2D);
	}

	Contour2D .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: Contour2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
	});

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
	"x_ite/Bits/X3DConstants",
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/NURBS/X3DNurbsControlCurveNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNurbsControlCurveNode, 
          X3DConstants)
{
"use strict";

	function ContourPolyline2D (executionContext)
	{
		X3DNurbsControlCurveNode .call (this, executionContext);

		this .addType (X3DConstants .ContourPolyline2D);
	}

	ContourPolyline2D .prototype = Object .assign (Object .create (X3DNurbsControlCurveNode .prototype),
	{
		constructor: ContourPolyline2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
		tessellate: function (spine)
		{
			var
				controlPoint = this .controlPoint_,
				array        = [ ];

			if (spine)
			{
				for (var i = 0, length = controlPoint .length; i < length; ++ i)
				{
					var point = controlPoint [i];
	
					array .push (point .x, 0, point .y);
				}
			}
			else
			{
				for (var i = 0, length = controlPoint .length; i < length; ++ i)
				{
					var point = controlPoint [i];
	
					array .push (point .x, point .y);
				}
			}

			return array;
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


define ('x_ite/Components/Rendering/X3DGeometricPropertyNode',[
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DNode, 
          X3DConstants)
{
"use strict";

	function X3DGeometricPropertyNode (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DGeometricPropertyNode);
	}

	X3DGeometricPropertyNode .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: X3DGeometricPropertyNode,
	});

	return X3DGeometricPropertyNode;
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


define ('x_ite/Components/Rendering/X3DCoordinateNode',[
	"x_ite/Components/Rendering/X3DGeometricPropertyNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector3",
],
function (X3DGeometricPropertyNode, 
          X3DConstants,
          Triangle3,
          Vector3)
{
"use strict";

	function X3DCoordinateNode (executionContext)
	{
		X3DGeometricPropertyNode .call (this, executionContext);

		this .addType (X3DConstants .X3DCoordinateNode);
	}

	X3DCoordinateNode .prototype = Object .assign (Object .create (X3DGeometricPropertyNode .prototype),
	{
		constructor: X3DCoordinateNode,
		initialize: function ()
		{
			X3DGeometricPropertyNode .prototype .initialize .call (this);

			this .point_ .addInterest ("set_point__", this);

			this .set_point__ ();
		},
		set_point__: function ()
		{
			this .point  = this .point_ .getValue ();
			this .length = this .point_ .length;
		},
		isEmpty: function ()
		{
			return this .length === 0;
		},
		getSize: function ()
		{
			return this .length;
		},
		get1Point: function (index, vector)
		{
			if (index < this .length)
			{
				const point = this .point;

				index *= 3;

				return vector .set (point [index], point [index + 1], point [index + 2]);
			}
			else
			{
				return vector .set (0, 0, 0);
			}
		},
		addPoint: function (index, array)
		{
			if (index < this .length)
			{
				const point = this .point;

				index *= 3;

				array .push (point [index], point [index + 1], point [index + 2], 1);
			}
			else
			{
				array .push (0, 0, 0, 1);
			}
		},
		addPoints: function (array, min)
		{
			const point = this .point;

			for (var index = 0, length = this .length * 3; index < length; index += 3)
				array .push (point [index], point [index + 1], point [index + 2], 1);

			for (var index = length, length = min * 3; index < length; index += 3)
				array .push (0, 0, 0, 1);
		},
		getNormal: (function ()
		{
			var
				point1 = new Vector3 (0, 0, 0),
				point2 = new Vector3 (0, 0, 0),
				point3 = new Vector3 (0, 0, 0);

			return function (index1, index2, index3)
			{
				// The index[1,2,3] cannot be less than 0.
	
				var length = this .length;
	
				if (index1 < length && index2 < length && index3 < length)
				{
					return Triangle3 .normal (this .get1Point (index1, point1),
					                          this .get1Point (index2, point2),
					                          this .get1Point (index3, point3),
					                          new Vector3 (0, 0, 0));
				}
	
				return new Vector3 (0, 0, 0);
			};
		})(),
		getQuadNormal: (function ()
		{
			var
				point1 = new Vector3 (0, 0, 0),
				point2 = new Vector3 (0, 0, 0),
				point3 = new Vector3 (0, 0, 0),
				point4 = new Vector3 (0, 0, 0);

			return function (index1, index2, index3, index4)
			{
				// The index[1,2,3,4] cannot be less than 0.
	
				var length = this .length;
	
				if (index1 < length && index2 < length && index3 < length && index4 < length)
				{
					return Triangle3 .quadNormal (this .get1Point (index1, point1),
					                              this .get1Point (index2, point2),
					                              this .get1Point (index3, point3),
					                              this .get1Point (index4, point4),
					                              new Vector3 (0, 0, 0));
				}
	
				return new Vector3 (0, 0, 0);
			};
		})(),
	});

	return X3DCoordinateNode;
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DCoordinateNode",
	"x_ite/Bits/X3DConstants",
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
		fieldDefinitions: new FieldDefinitionArray ([
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


define ('x_ite/Browser/Core/Shading',[],function ()
{
"use strict";
	
	var i = 0;

	var Shading =
	{
		POINT:     i ++,
		WIREFRAME: i ++,
		FLAT:      i ++,
		GOURAUD:   i ++,
		PHONG:     i ++,
	};

	Object .preventExtensions (Shading);
	Object .freeze (Shading);
	Object .seal (Shading);

	return Shading;
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


define ('standard/Math/Geometry/Plane3',[
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function (Vector3,
          Matrix4)
{
"use strict";

	var
		normal    = new Vector3 (0, 0, 0),
		point     = new Vector3 (0, 0, 0),
		invMatrix = new Matrix4 ();

	function Plane3 (point, normal)
	{
		this .normal             = normal .copy ();
		this .distanceFromOrigin = normal .dot (point);
	}

	Plane3 .prototype =
	{
		constructor: Plane3,
		copy: function ()
		{
			var copy = Object .create (Plane3 .prototype);
			copy .normal             = this .normal .copy ();
			copy .distanceFromOrigin = this .distanceFromOrigin;
			return copy;
		},
		assign: function (plane)
		{
			this .normal .assign (plane .normal);
			this .distanceFromOrigin = plane .distanceFromOrigin;
			return this;
		},
		set: function (point, normal)
		{
			this .normal .assign (normal);
			this .distanceFromOrigin = normal .dot (point);	   
			return this;
		},
		multRight: function (matrix)
		//throw
		{
			// Taken from Inventor:
		
			// Find the point on the plane along the normal from the origin
			point .assign (this .normal) .multiply (this .distanceFromOrigin);
		
			// Transform the plane normal by the matrix
			// to get the new normal. Use the inverse transpose
			// of the matrix so that normals are not scaled incorrectly.
			// n' = n * !~m = ~m * n
			invMatrix .assign (matrix) .inverse ();
			invMatrix .multMatrixDir (normal .assign (this .normal)) .normalize ();
		
			// Transform the point by the matrix
			matrix .multVecMatrix (point);
		
			// The new distance is the projected distance of the vector to the
			// transformed point onto the (unit) transformed normal. This is
			// just a dot product.
			this .normal .assign (normal);
			this .distanceFromOrigin = normal .dot (point);

			return this;
		},
		multLeft: function (matrix)
		//throw
		{
			// Taken from Inventor:
		
			// Find the point on the plane along the normal from the origin
			point .assign (this .normal) .multiply (this .distanceFromOrigin);
		
			// Transform the plane normal by the matrix
			// to get the new normal. Use the inverse transpose
			// of the matrix so that normals are not scaled incorrectly.
			// n' = !~m * n = n * ~m
			invMatrix .assign (matrix) .inverse ();
			invMatrix .multDirMatrix (normal .assign (this .normal)) .normalize ();
		
			// Transform the point by the matrix
			matrix .multMatrixVec (point);
		
			// The new distance is the projected distance of the vector to the
			// transformed point onto the (unit) transformed normal. This is
			// just a dot product.
			this .normal .assign (normal);
			this .distanceFromOrigin = normal .dot (point);

			return this;
		},
		getDistanceToPoint: function (point)
		{
			return Vector3 .dot (point, this .normal) - this .distanceFromOrigin;
		},
		intersectsLine: function (line, intersection)
		{
			var
				point     = line .point,
				direction = line .direction;
		
			// Check if the line is parallel to the plane.
			var theta = direction .dot (this .normal);

			// Plane and line are parallel.
			if (theta === 0)
				return false;

			// Plane and line are not parallel. The intersection point can be calculated now.
			var t = (this .distanceFromOrigin - this .normal .dot (point)) / theta;

			intersection .x = point .x + direction .x * t;
			intersection .y = point .y + direction .y * t;
			intersection .z = point .z + direction .z * t;

			return true;
		},
		toString: function ()
		{
			return this .normal .toString () + " " + this .distanceFromOrigin;
		},
	};

	return Plane3;
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


define ('x_ite/Components/Rendering/X3DGeometryNode',[
	"x_ite/Fields",
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Core/Shading",
	"standard/Math/Numbers/Color3",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Box3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DNode,
          X3DConstants,
          Shading,
          Color3,
          Vector2,
          Vector3,
          Matrix3,
          Matrix4,
          Box3,
          Plane3,
          Triangle3,
          Algorithm)
{
"use strict";

	const ARRAY_TYPE = "Array"; // For color, texCoord, normal, and vertex array, can be MFFloat or Array;

	const
		point           = new Vector3 (0, 0, 0),
		clipPoint       = new Vector3 (0, 0, 0),
		modelViewMatrix = new Matrix4 (),
		invMatrix       = new Matrix4 ();

	// Box normals for bbox / line intersection.
	const boxNormals = [
		new Vector3 (0,  0,  1), // front
		new Vector3 (0,  0, -1), // back
		new Vector3 (0,  1,  0), // top
		new Vector3 (0, -1,  0), // bottom
		new Vector3 (1,  0,  0)  // right
		// left: We do not have to test for left.
	];

	function X3DGeometryNode (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DGeometryNode);
			
		this .addChildObjects ("transparent",  new Fields .SFBool (),
		                       "bbox_changed", new Fields .SFTime (),
		                       "rebuild",      new Fields .SFTime ());

		this .transparent_  .setAccessType (X3DConstants .outputOnly);
		this .bbox_changed_ .setAccessType (X3DConstants .outputOnly);
		this .rebuild_      .setAccessType (X3DConstants .outputOnly);

		// Members

		this .min                 = new Vector3 (0, 0, 0);
		this .max                 = new Vector3 (0, 0, 0);
		this .bbox                = new Box3 (this .min, this .max, true);
		this .solid               = true;
		this .geometryType        = 3;
		this .flatShading         = undefined;
		this .colorMaterial       = false;
		this .attribNodes         = [ ];
		this .attribs             = [ ];
		this .currentTexCoordNode = this .getBrowser () .getDefaultTextureCoordinate (); // For TextureCoordinateGenerator needed.
		this .texCoordParams      = { min: new Vector3 (0, 0, 0) };
		this .multiTexCoords      = [ ];
		this .texCoords           = X3DGeometryNode .createArray ();
		this .colors              = X3DGeometryNode .createArray ();
		this .normals             = X3DGeometryNode .createArray ();
		this .flatNormals         = X3DGeometryNode .createArray ();
		this .vertices            = X3DGeometryNode .createArray ();
		this .vertexCount         = 0;

		// This methods are configured in transfer.
		this .depth            = Function .prototype;
		this .display          = Function .prototype;
		this .displayParticles = Function .prototype;
	}

	// Function to select ether Array or MFFloat for color/normal/vertex arrays.
	X3DGeometryNode .createArray = function ()
	{
		if (ARRAY_TYPE == "MFFloat")
			return new Fields .MFFloat ();

		var array = [ ];

		array .typedArray = new Float32Array ();

		array .assign = function (value)
		{
			this .length = 0;

			Array .prototype .push .apply (this, value);
		};

		array .getValue = function ()
		{
			return this .typedArray;
		};

		array .shrinkToFit = function ()
		{
			if (this .length !== this .typedArray .length)
				this .typedArray = new Float32Array (this);
			else
				this .typedArray .set (this);
		};

		return array;
	}

	X3DGeometryNode .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: X3DGeometryNode,
		intersection: new Vector3 (0, 0, 0),
		uvt: { u: 0, v: 0, t: 0 },
		v0: new Vector3 (0, 0, 0),
		v1: new Vector3 (0, 0, 0),
		v2: new Vector3 (0, 0, 0),
		normal: new Vector3 (0, 0, 0),
		setup: function ()
		{
			X3DNode .prototype .setup .call (this);

			this .addInterest ("requestRebuild", this);
			this .rebuild_ .addInterest ("rebuild", this);

			this .rebuild ();
		},
		initialize: function ()
		{
			X3DNode .prototype .initialize .call (this);

			this .isLive () .addInterest ("set_live__", this);

			var gl = this .getBrowser () .getContext ();

			this .primitiveMode   = gl .TRIANGLES;
			this .frontFace       = gl .CCW;
			this .attribBuffers   = [ ];
			this .texCoordBuffers = [ ];
			this .colorBuffer     = gl .createBuffer ();
			this .normalBuffer    = gl .createBuffer ();
			this .vertexBuffer    = gl .createBuffer ();
			this .planes          = [ ];

			if (this .geometryType > 1)
			{
				for (var i = 0; i < 5; ++ i)
					this .planes [i] = new Plane3 (Vector3 .Zero, boxNormals [0]);
			}

			this .set_live__ ();
		},
		setGeometryType: function (value)
		{
			this .geometryType = value;
		},
		getGeometryType: function ()
		{
			return this .geometryType;
		},
		getBBox: function ()
		{
			// With screen matrix applied.
			return this .bbox;
		},
		setBBox: function (bbox)
		{
			if (! bbox .equals (this .bbox))
			{
			   bbox .getExtents (this .min, this .max);
	
				this .bbox .assign (bbox);
	
				for (var i = 0; i < 5; ++ i)
					this .planes [i] .set (i % 2 ? this .min : this .max, boxNormals [i]);
	
				this .bbox_changed_ .addEvent ();
			}
		},
		getMin: function ()
		{
			// With screen matrix applied.
			return this .min;
		},
		getMax: function ()
		{
			// With screen matrix applied.
			return this .max;
		},
		getMatrix: function ()
		{
			return Matrix4 .Identity;
		},
		setPrimitiveMode: function (value)
		{
			this .primitiveMode = value;
		},
		getPrimitiveMode: function ()
		{
			return this .primitiveMode;
		},
		setSolid: function (value)
		{
			this .solid = value;
		},
		setCCW: function (value)
		{
			this .frontFace = value ? this .getBrowser () .getContext () .CCW : this .getBrowser () .getContext () .CW;
		},
		getAttrib: function ()
		{
			return this .attribNodes;
		},
		getAttribs: function ()
		{
			return this .attribs;
		},
		setColors: function (value)
		{
			this .colors .assign (value);
		},
		getColors: function ()
		{
			return this .colors;
		},
		setMultiTexCoords: function (value)
		{
			var multiTexCoords = this .multiTexCoords;

			multiTexCoords .length = 0;

			Array .prototype .push .apply (multiTexCoords, value);
		},
		getMultiTexCoords: function ()
		{
			return this .multiTexCoords;
		},
		getTexCoords: function ()
		{
			return this .texCoords;
		},
		setCurrentTexCoord: function (value)
		{
			this .currentTexCoordNode = value || this .getBrowser () .getDefaultTextureCoordinate ();
		},
		setNormals: function (value)
		{
			this .normals .assign (value);
		},
		getNormals: function ()
		{
			return this .normals;
		},
		setVertices: function (value)
		{
			this .vertices .assign (value);
		},
		getVertices: function ()
		{
			return this .vertices;
		},
		buildTexCoords: function ()
		{
			var
				p         = this .getTexCoordParams (),
				min       = p .min,
				Sindex    = p .Sindex,
				Tindex    = p .Tindex,
				Ssize     = p .Ssize,
				S         = min [Sindex],
				T         = min [Tindex],
				texCoords = this .texCoords,
				vertices  = this .vertices .getValue ();

			for (var i = 0, length = vertices .length; i < length; i += 4)
			{
				texCoords .push ((vertices [i + Sindex] - S) / Ssize,
				                 (vertices [i + Tindex] - T) / Ssize,
				                 0,
				                 1);
			}

			this .multiTexCoords .push (texCoords);
		},
		getTexCoordParams: function ()
		{
			var
				p     = this .texCoordParams,
				bbox  = this .getBBox (),
				size  = bbox .size,
				Xsize = size .x,
				Ysize = size .y,
				Zsize = size .z;

			p .min .assign (bbox .center) .subtract (size .divide (2));

			if ((Xsize >= Ysize) && (Xsize >= Zsize))
			{
				// X size largest
				p .Ssize = Xsize; p .Sindex = 0;

				if (Ysize >= Zsize)
					p .Tindex = 1;
				else
					p .Tindex = 2;
			}
			else if ((Ysize >= Xsize) && (Ysize >= Zsize))
			{
				// Y size largest
				p .Ssize = Ysize; p .Sindex = 1;

				if (Xsize >= Zsize)
					p .Tindex = 0;
				else
					p .Tindex = 2;
			}
			else
			{
				// Z is the largest
				p .Ssize = Zsize; p .Sindex = 2;

				if (Xsize >= Ysize)
					p .Tindex = 0;
				else
					p .Tindex = 1;
			}

			return p;
		},
		refineNormals: function (normalIndex, normals, creaseAngle)
		{
			if (creaseAngle === 0)
				return normals;

			var
				cosCreaseAngle = Math .cos (Algorithm .clamp (creaseAngle, 0, Math .PI)),
				normals_       = [ ];

			for (var i in normalIndex) // Don't use forEach
			{
				var vertex = normalIndex [i];

				for (var p = 0, length = vertex .length; p < length; ++ p)
				{
					var
						P = vertex [p],
						m = normals [P],
						n = new Vector3 (0, 0, 0);

					for (var q = 0; q < length; ++ q)
					{
						var Q = normals [vertex [q]];
	
						if (Q .dot (m) >= cosCreaseAngle)
							n .add (Q);
					}

					normals_ [P] = n .normalize ();
				}
			}

			return normals_;
		},
		isClipped: function (point, clipPlanes)
		{
			return clipPlanes .some (function (clipPlane)
			{
				return clipPlane .isClipped (point);
			});
		},
		transformLine: function (line)
		{
			// Apply sceen nodes transformation in place here.
		},
		transformMatrix: function (line)
		{
			// Apply sceen nodes transformation in place here.
		},
		intersectsLine: function (line, clipPlanes, modelViewMatrix_, intersections)
		{
			try
			{
				var intersected = false;

				if (this .intersectsBBox (line))
				{
					this .transformLine   (line);                                       // Apply screen transformations from screen nodes.
					this .transformMatrix (modelViewMatrix .assign (modelViewMatrix_)); // Apply screen transformations from screen nodes.

					var
						texCoords  = this .multiTexCoords [0] .getValue (),
						normals    = this .normals .getValue (),
						vertices   = this .vertices .getValue (),
						uvt        = this .uvt,
						v0         = this .v0,
						v1         = this .v1,
						v2         = this .v2;

					for (var i = 0, length = this .vertexCount; i < length; i += 3)
					{
						var i4 = i * 4;

						v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
						v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
						v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

						if (line .intersectsTriangle (v0, v1, v2, uvt))
						{
							// Get barycentric coordinates.

							var
								u = uvt .u,
								v = uvt .v,
								t = uvt .t;

							// Determine vectors for X3DPointingDeviceSensors.

							var point = new Vector3 (t * vertices [i4]     + u * vertices [i4 + 4] + v * vertices [i4 +  8],
							                         t * vertices [i4 + 1] + u * vertices [i4 + 5] + v * vertices [i4 +  9],
							                         t * vertices [i4 + 2] + u * vertices [i4 + 6] + v * vertices [i4 + 10]);

							if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (point)), clipPlanes))
								continue;

							var texCoord = new Vector2 (t * texCoords [i4]     + u * texCoords [i4 + 4] + v * texCoords [i4 + 8],
							                            t * texCoords [i4 + 1] + u * texCoords [i4 + 5] + v * texCoords [i4 + 9]);

							var i3 = i * 3;

							var normal = new Vector3 (t * normals [i3]     + u * normals [i3 + 3] + v * normals [i3 + 6],
							                          t * normals [i3 + 1] + u * normals [i3 + 4] + v * normals [i3 + 7],
							                          t * normals [i3 + 2] + u * normals [i3 + 5] + v * normals [i3 + 8]);

							intersections .push ({ texCoord: texCoord, normal: normal, point: this .getMatrix () .multVecMatrix (point) });
							intersected = true;
						}
					}
				}

				return intersected;
			}
			catch (error)
			{
				console .log (error);
				return false;
			}
		},
		intersectsBBox: function (line)
		{
			var
				planes       = this .planes,
				min          = this .min,
				max          = this .max,
				minX         = min .x,
				maxX         = max .x,
				minY         = min .y,
				maxY         = max .y,
				minZ         = min .z,
				maxZ         = max .z,
				intersection = this .intersection;

		   // front
			if (planes [0] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .y >= minY && intersection .y <= maxY)
					return true;
			}

			// back
			if (planes [1] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .y >= minY && intersection .y <= maxY)
					return true;
			}

			// top
			if (planes [2] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			// bottom
			if (planes [3] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			// right
			if (planes [4] .intersectsLine (line, intersection))
			{
				if (intersection .y >= minY && intersection .y <= maxY &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			return false;
		},
		intersectsBox: function (box, clipPlanes, modelViewMatrix)
		{
			try
			{
				if (box .intersectsBox (this .bbox))
				{
					box .multRight (invMatrix .assign (this .getMatrix ()) .inverse ());

					this .transformMatrix (modelViewMatrix); // Apply screen transformations from screen nodes.

					var
						vertices = this .vertices .getValue (),
						v0       = this .v0,
						v1       = this .v1,
						v2       = this .v2;
		
					for (var i = 0, length = this .vertexCount; i < length; i += 3)
					{
						var i4 = i * 4;
		
						v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
						v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
						v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

						if (box .intersectsTriangle (v0, v1, v2))
						{
							if (clipPlanes .length)
							{
								if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v0)), clipPlanes))
									continue;
				
								if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v1)), clipPlanes))
									continue;
				
								if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v2)), clipPlanes))
									continue;
							}
		
						   return true;
						}
				   }
				}

			   return false;
			}
			catch (error)
			{
				console .log (error);
				return false;
			}
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue ())
				this .getBrowser () .getBrowserOptions () .Shading_ .addInterest ("set_shading__", this);
			else
				this .getBrowser () .getBrowserOptions () .Shading_ .removeInterest ("set_shading__", this);
		},
		set_shading__: function (shading)
		{
			if (this .geometryType < 2)
				return;
			
			var flatShading = this .getBrowser () .getBrowserOptions () .getShading () === Shading .FLAT;

			if (flatShading === this .flatShading)
				return;

			this .flatShading = flatShading;

			// Generate flat normals if needed.

			var gl = this .getBrowser () .getContext ();

			if (flatShading)
			{
				if (! this .flatNormals .length)
				{
					var
						cw          = this .frontFace === gl .CW,
						flatNormals = this .flatNormals,
						vertices    = this .vertices .getValue (),
						v0          = this .v0,
						v1          = this .v1,
						v2          = this .v2,
						normal      = this .normal;

					for (var i = 0, length = vertices .length; i < length; i += 12)
					{
					   Triangle3 .normal (v0 .set (vertices [i],     vertices [i + 1], vertices [i + 2]),
					                      v1 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]),
					                      v2 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]),
					                      normal);
					   
						if (cw)
							normal .negate ();

						flatNormals .push (normal .x, normal .y, normal .z,
						                   normal .x, normal .y, normal .z,
						                   normal .x, normal .y, normal .z);
					}

					flatNormals .shrinkToFit ();
				}
			}

			// Transfer normals.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, flatShading ? this .flatNormals .getValue () : this .normals .getValue (), gl .STATIC_DRAW);
		},
		requestRebuild: function ()
		{
			this .rebuild_ .addEvent ();
		},
		rebuild: function ()
		{
			this .clear ();
			this .build ();

			// Shrink arrays before transfer to graphics card.

			for (var i = 0, length = this .attribs .length; i < length; ++ i)
				this .attribs [i] .shrinkToFit ();

			for (var i = 0, length = this .multiTexCoords .length; i < length; ++ i)
				this .multiTexCoords [i] .shrinkToFit ();
	
			this .colors   .shrinkToFit ();
			this .normals  .shrinkToFit ();
			this .vertices .shrinkToFit ();

			// Determine bbox.

			var
				min      = this .min,
				max      = this .max,
				vertices = this .vertices .getValue ();

			if (vertices .length)
			{
				if (min .x === Number .POSITIVE_INFINITY)
				{
					for (var i = 0, length = vertices .length; i < length; i += 4)
					{
						point .set (vertices [i], vertices [i + 1], vertices [i + 2]);
	
						min .min (point);
						max .max (point);
					}
				}

				this .bbox .setExtents (min, max);
			}
			else
			{
				this .bbox .setExtents (min .set (0, 0, 0), max .set (0, 0, 0));
			}

			this .bbox_changed_ .addEvent ();

			// Generate texCoord if needed.

			if (this .geometryType > 1)
			{
				for (var i = 0; i < 5; ++ i)
					this .planes [i] .set (i % 2 ? min : max, boxNormals [i]);

				if (this .multiTexCoords .length === 0)
				{
					this .buildTexCoords ();
	
					this .texCoords .shrinkToFit ();
				}
			}

			// Upload normals or flat normals.

			this .set_shading__ (this .getBrowser () .getBrowserOptions () .Shading_);

			// Upload arrays.

			this .transfer ();
		},
		clear: function ()
		{
			// BBox

			this .min .set (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY);
			this .max .set (Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY);

			// Create attrib arrays.

			var attribs = this .attribs;

			for (var a = 0, length = attribs .length; a < length; ++ a)
				attribs [a] .length = 0;

			for (var a = attribs .length, length = this .attribNodes .length; a < length; ++ a)
				attribs [a] = X3DGeometryNode .createArray ();

			attribs .length = length;

			// Buffer

			this .flatShading = undefined;

			this .colors         .length = 0;
			this .multiTexCoords .length = 0;
			this .texCoords      .length = 0;
			this .normals        .length = 0;
			this .flatNormals    .length = 0;
			this .vertices       .length = 0;
		},
		transfer: function ()
		{
			var
				gl    = this .getBrowser () .getContext (),
				count = this .vertices .length / 4;

			// Transfer attribs.

			for (var i = this .attribBuffers .length, length = this .attribs .length; i < length; ++ i)
				this .attribBuffers .push (gl .createBuffer ());

			// Only grow.
			//this .attribBuffers .length = length;
			
			for (var i = 0, length = this .attribs .length; i < length; ++ i)
			{
				gl .bindBuffer (gl .ARRAY_BUFFER, this .attribBuffers [i]);
				gl .bufferData (gl .ARRAY_BUFFER, this .attribs [i] .getValue (), gl .STATIC_DRAW);
			}

			// Transfer multiTexCoords.

			for (var i = this .texCoordBuffers .length, length = this .multiTexCoords .length; i < length; ++ i)
				this .texCoordBuffers .push (gl .createBuffer ());

			// Only grow.
			//this .texCoordBuffers .length = length;
			
			for (var i = 0, length = this .multiTexCoords .length; i < length; ++ i)
			{
				gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [i]);
				gl .bufferData (gl .ARRAY_BUFFER, this .multiTexCoords [i] .getValue (), gl .STATIC_DRAW);
			}

			// Transfer colors.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .colors .getValue (), gl .STATIC_DRAW);
			this .colorMaterial = Boolean (this .colors .length);

			// Transfer vertices.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .vertices .getValue (), gl .STATIC_DRAW);
			this .vertexCount = count;

			// Setup render functions.

			if (this .vertexCount)
			{
				// Use default render functions.
				delete this .depth;
				delete this .display;
				delete this .displayParticles;
			}
			else
			{
				// Use no render function.
				this .depth            = Function .prototype;
				this .display          = Function .prototype;
				this .displayParticles = Function .prototype;
			}
	  	},
		traverse: function (type, renderObject)
		{ },
		depth: function (gl, context, shaderNode)
		{
			// Setup vertex attributes.

			// Attribs in depth rendering are not supported.
			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

			shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .disable (gl, shaderNode);

			gl .drawArrays (this .primitiveMode, 0, this .vertexCount);
		},
		display: function (gl, context)
		{
			try
			{
				var
					shaderNode    = context .shaderNode,
					attribNodes   = this .attribNodes,
					attribBuffers = this .attribBuffers;

				// Setup shader.
	
				context .geometryType  = this .geometryType;
				context .colorMaterial = this .colorMaterial;

				shaderNode .enable (gl);
				shaderNode .setLocalUniforms (gl, context);
	
				// Setup vertex attributes.
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);
	
				if (this .colorMaterial)
					shaderNode .enableColorAttribute (gl, this .colorBuffer);
	
				shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);
				shaderNode .enableNormalAttribute   (gl, this .normalBuffer);
				shaderNode .enableVertexAttribute   (gl, this .vertexBuffer);
	
				// Draw depending on wireframe, solid and transparent.
	
				if (shaderNode .wireframe)
				{
					// Wireframes are always solid so only one drawing call is needed.

					for (var i = 0, length = this .vertexCount; i < length; i += 3)
						gl .drawArrays (shaderNode .primitiveMode, i, 3);
				}
				else
				{
					var positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;
	
					gl .frontFace (positiveScale ? this .frontFace : (this .frontFace === gl .CCW ? gl .CW : gl .CCW));
	
					if (context .transparent && ! this .solid)
					{
						gl .enable (gl .CULL_FACE);
						gl .cullFace (gl .FRONT);
						gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);		
	
						gl .cullFace (gl .BACK);
						gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);		
					}
					else
					{
						if (this .solid)
							gl .enable (gl .CULL_FACE);
						else
							gl .disable (gl .CULL_FACE);
	
						gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
					}
				}
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .disable (gl, shaderNode);
	
				shaderNode .disableColorAttribute    (gl);
				shaderNode .disableTexCoordAttribute (gl);
				shaderNode .disableNormalAttribute   (gl);
				shaderNode .disable                  (gl);
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
		displayParticlesDepth: function (gl, context, shaderNode, particles, numParticles)
		{
			var gl = context .renderer .getBrowser () .getContext ();

			// Attribs in depth rendering are not supported:
			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

			shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

			// Draw depending on wireframe, solid and transparent.

			var
				modelViewMatrix = context .modelViewMatrix,
				x               = modelViewMatrix [12],
				y               = modelViewMatrix [13],
				z               = modelViewMatrix [14];

			for (var p = 0; p < numParticles; ++ p)
			{
				var particle = particles [p];

				modelViewMatrix [12] = x;
				modelViewMatrix [13] = y;
				modelViewMatrix [14] = z;

				Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);

				shaderNode .setParticle (gl, p, particle, modelViewMatrix, false);

				gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
			}
	
			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .disable (gl, shaderNode);
		},
		displayParticles: function (gl, context, particles, numParticles)
		{
			try
			{
				var
					shaderNode    = context .shaderNode,
					attribNodes   = this .attribNodes,
					attribBuffers = this .attribBuffers;
	
				// Setup shader.
	
				context .geometryType  = this .geometryType;
				context .colorMaterial = this .colorMaterial;

				shaderNode .enable (gl);
				shaderNode .setLocalUniforms (gl, context);
	
				// Setup vertex attributes.
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

				if (this .colorMaterial)
					shaderNode .enableColorAttribute (gl, this .colorBuffer);
	
				shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);
				shaderNode .enableNormalAttribute   (gl, this .normalBuffer);
				shaderNode .enableVertexAttribute   (gl, this .vertexBuffer);
	
				// Draw depending on wireframe, solid and transparent.
	
				var
					materialNode    = context .materialNode,
					normalMatrix    = materialNode || shaderNode .getCustom (),
					modelViewMatrix = context .modelViewMatrix,
					x               = modelViewMatrix [12],
					y               = modelViewMatrix [13],
					z               = modelViewMatrix [14];
	
				if (shaderNode .wireframe)
				{
					// Wireframes are always solid so only one drawing call is needed.
	
					for (var p = 0; p < numParticles; ++ p)
					{
						var particle = particles [p];

						modelViewMatrix [12] = x;
						modelViewMatrix [13] = y;
						modelViewMatrix [14] = z;
		
						Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);

						shaderNode .setParticle (gl, p, particle, modelViewMatrix, normalMatrix);
		
						for (var i = 0, length = this .vertexCount; i < length; i += 3)
							gl .drawArrays (shaderNode .primitiveMode, i, 3);
					}
				}
				else
				{
					var positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;
	
					gl .frontFace (positiveScale ? this .frontFace : (this .frontFace === gl .CCW ? gl .CW : gl .CCW));
	
					if (context .transparent && ! this .solid)
					{
						for (var p = 0; p < numParticles; ++ p)
						{
							var particle = particles [p];

							modelViewMatrix [12] = x;
							modelViewMatrix [13] = y;
							modelViewMatrix [14] = z;
	
							Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);
	
							shaderNode .setParticle (gl, p, particle, modelViewMatrix, normalMatrix);

							gl .enable (gl .CULL_FACE);
							gl .cullFace (gl .FRONT);
							gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
		
							gl .cullFace (gl .BACK);
							gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
						}	
					}
					else
					{
						if (this .solid)
							gl .enable (gl .CULL_FACE);
						else
							gl .disable (gl .CULL_FACE);
	
						for (var p = 0; p < numParticles; ++ p)
						{
							var particle = particles [p];

							modelViewMatrix [12] = x;
							modelViewMatrix [13] = y;
							modelViewMatrix [14] = z;

							Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);

							shaderNode .setParticle (gl, p, particle, modelViewMatrix, normalMatrix);

							gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
						}
					}
				}
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .disable (gl, shaderNode);
	
				shaderNode .disableColorAttribute    (gl);
				shaderNode .disableTexCoordAttribute (gl);
				shaderNode .disableNormalAttribute   (gl);
				shaderNode .disable                  (gl);
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
	});

	return X3DGeometryNode;
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
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
],
function (Vector3,
          Vector4)
{
"use strict";

	var NURBS = {
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
			var
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
			var
				firstPoint = new Vector3 (0, 0, 0),
				lastPoint  = new Vector3 (0, 0, 0);

			return function (order, knot, weight, controlPointNode)
			{
				var
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
			var
				firstPoint = new Vector3 (0, 0, 0),
				lastPoint  = new Vector3 (0, 0, 0);

			return function (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode)
			{
				var haveWeights = weight .length === controlPointNode .getSize ();
			
				for (var v = 0, length = vDimension; v < length; ++ v)
				{
					var
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
			var
				firstPoint = new Vector3 (0, 0, 0),
				lastPoint  = new Vector3 (0, 0, 0);

			return function (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode)
			{
				var haveWeights = weight .length === controlPointNode .getSize ();
			
				for (var u = 0, size = uDimension; u < size; ++ u)
				{
					var
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
					var count = 1;

					for (var i = 1, size = order; i < size; ++ i)
					{
						count += knot [i] === knot [0];
					}

					if (count === order)
						return false;
				}

				{
					var count = 1;

					for (var i = knot .length - order, size = knot .length - 1; i < size; ++ i)
					{
						count += knot [i] === knot [size];
					}

					if (count === order)
						return false;
				}
			}

			return true;
		},
		getKnots: function (closed, order, dimension, knot)
		{
			var knots = [ ];

			for (var i = 0, length = knot .length; i < length; ++ i)
				knots .push (knot [i]);

			// check the knot-vectors. If they are not according to standard
			// default uniform knot vectors will be generated.
		
			var generateUniform = true;
		
			if (knots .length === dimension + order)
			{
				generateUniform = false;
		
				var consecutiveKnots = 0;
		
				for (var i = 1, length = knots .length; i < length; ++ i)
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
				for (var i = 0, length = dimension + order; i < length; ++ i)
					knots [i] = i / (length - 1);
			}
		
			if (closed)
			{
				for (var i = 1, length = order - 1; i < length; ++ i)
					knots .push (knots [knots .length - 1] + (knots [i] - knots [i - 1]));
			}

			return knots;
		},
		getWeights: function (closed, order, dimension, weight)
		{
			if (weight .length !== dimension)
				return undefined;

			var weights = [ ];
		
			for (var i = 0; i < dimension; ++ i)
			{
				weights .push (weight [i]);
			}
	
			if (closed)
			{
				for (var i = 1, size = order - 1; i < size; ++ i)
					weights .push (weights [i]);
			}

			return weights;
		},
		getUVWeights: function (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weight)
		{
			if (weight .length !== uDimension * vDimension)
				return undefined;

			var weights = [ ];

			for (var u = 0; u < uDimension; ++ u)
			{
				var w = [ ];

				weights .push (w);

				for (var v = 0; v < vDimension; ++ v)
				{
					w .push (weight [v * uDimension + u]);
				}

				if (vClosed)
				{
					for (var i = 1, length = vOrder - 1; i < length; ++ i)
						w .push (w [i]);
				}
			}
	
			if (uClosed)
			{
				for (var i = 1, length = uOrder - 1; i < length; ++ i)
					weights .push (weights [i]);
			}
	
			return weights;
		},
		getControlPoints2D: function (closed, order, controlPoint)
		{
			var
				controlPoints = [ ],
				dimension     = controlPoint .length;
		
			for (var i = 0; i < dimension; ++ i)
			{
				controlPoints .push (controlPoint [i] .getValue ());
			}
	
			if (closed)
			{
				for (var i = 1, size = order - 1; i < size; ++ i)
					controlPoints .push (controlPoints [i]);
			}

			return controlPoints;
		},
		getControlPoints: function (closed, order, controlPointNode)
		{
			var
				controlPoints = [ ],
				dimension     = controlPointNode .getSize ();
		
			for (var i = 0; i < dimension; ++ i)
			{
				controlPoints .push (controlPointNode .get1Point (i, new Vector3 (0, 0, 0)));
			}
	
			if (closed)
			{
				for (var i = 1, size = order - 1; i < size; ++ i)
					controlPoints .push (controlPoints [i]);
			}

			return controlPoints;
		},
		getUVControlPoints: function (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, controlPointNode)
		{
			var controlPoints = [ ];

			for (var u = 0; u < uDimension; ++ u)
			{
				var cp = [ ];

				controlPoints .push (cp);

				for (var v = 0; v < vDimension; ++ v)
				{
					cp .push (controlPointNode .get1Point (v * uDimension + u, new Vector3 (0, 0, 0)));
				}

				if (vClosed)
				{
					for (var i = 1, length = vOrder - 1; i < length; ++ i)
						cp .push (cp [i]);
				}
			}

			if (uClosed)
			{
				for (var i = 1, length = uOrder - 1; i < length; ++ i)
					controlPoints .push (controlPoints [i]);
			}

			return controlPoints;
		},
		getTexControlPoints: function (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, controlPointNode)
		{
			var controlPoints = [ ];

			for (var u = 0; u < uDimension; ++ u)
			{
				var cp = [ ];

				controlPoints .push (cp);

				for (var v = 0; v < vDimension; ++ v)
				{
					cp .push (controlPointNode .get1Point (v * uDimension + u, new Vector4 (0, 0, 0, 0)));
				}

				if (vClosed)
				{
					for (var i = 1, length = vOrder - 1; i < length; ++ i)
						cp .push (cp [i]);
				}
			}

			if (uClosed)
			{
				for (var i = 1, length = uOrder - 1; i < length; ++ i)
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
	"x_ite/Bits/X3DConstants",
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
		getKnots: function (closed, order, dimension, knot)
		{
			return NURBS .getKnots (closed, order, dimension, knot);
		},
	});

	return X3DParametricGeometryNode;
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


define ('x_ite/Components/Rendering/X3DLineGeometryNode',[
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function (X3DGeometryNode,
          X3DConstants,
          Matrix4)
{
"use strict";

	function X3DLineGeometryNode (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		//this .addType (X3DConstants .X3DLineGeometryNode);
	}

	X3DLineGeometryNode .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
	{
		constructor: X3DLineGeometryNode,
		getShader: function (browser)
		{
			return browser .getLineShader ();
		},
		intersectsLine: function (line, clipPlanes, modelViewMatrix, intersections)
		{
			return false;
		},
		intersectsBox: function (box, clipPlanes, modelViewMatrix)
		{
			return false;
		},
		display: function (gl, context)
		{
			try
			{
				var
					browser       = context .renderer .getBrowser (),
					shaderNode    = context .shaderNode,
					attribNodes   = this .attribNodes,
					attribBuffers = this .attribBuffers;
	
				if (shaderNode === browser .getDefaultShader ())
					shaderNode = this .getShader (browser);
	
				// Setup shader.
	
				context .geometryType  = this .getGeometryType ();
				context .colorMaterial = this .getColors () .length;

				shaderNode .enable (gl);
				shaderNode .setLocalUniforms (gl, context);
	
				// Setup vertex attributes.
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

				if (this .colors .length)
					shaderNode .enableColorAttribute (gl, this .colorBuffer);
	
				shaderNode .enableVertexAttribute (gl, this .vertexBuffer);
	
				// Wireframes are always solid so only one drawing call is needed.

				gl .drawArrays (shaderNode .primitiveMode === gl .POINTS ? gl .POINTS : this .primitiveMode, 0, this .vertexCount);
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .disable (gl, shaderNode);
	
				shaderNode .disableColorAttribute (gl);
				shaderNode .disable (gl);
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
		displayParticles: function (gl, context, particles, numParticles)
		{
			try
			{
				var
					browser       = context .renderer .getBrowser (),
					shaderNode    = context .shaderNode,
					attribNodes   = this .attribNodes,
					attribBuffers = this .attribBuffers;
	
				if (shaderNode === browser .getDefaultShader () || shaderNode === browser .getShadowShader ())
					shaderNode = this .getShader (browser);
	
				// Setup shader.
	
				context .geometryType  = this .getGeometryType ();
				context .colorMaterial = this .colors .length;

				shaderNode .enable (gl);
				shaderNode .setLocalUniforms (gl, context);
	
				// Setup vertex attributes.
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

				if (this .colors .length)
					shaderNode .enableColorAttribute (gl, this .colorBuffer);
	
				shaderNode .enableVertexAttribute (gl, this .vertexBuffer);
	
				// Wireframes are always solid so only one drawing call is needed.
	
				var
					modelViewMatrix = context .modelViewMatrix,
					x               = modelViewMatrix [12],
					y               = modelViewMatrix [13],
					z               = modelViewMatrix [14],
					primitiveMode   = shaderNode .primitiveMode === gl .POINTS ? gl .POINTS : this .primitiveMode;
	
				for (var p = 0; p < numParticles; ++ p)
				{
					modelViewMatrix [12] = x;
					modelViewMatrix [13] = y;
					modelViewMatrix [14] = z;
	
					Matrix4 .prototype .translate .call (modelViewMatrix, particles [p] .position);
	
					gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix, false, modelViewMatrix);
		
					gl .drawArrays (primitiveMode, 0, this .vertexCount);
				}
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .disable (gl, shaderNode);
	
				shaderNode .disableColorAttribute (gl);
				shaderNode .disable (gl);
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
	});

	return X3DLineGeometryNode;
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


define ('nurbs/extras/sample',[],function ()
{
'use strict';

	function normalize (out, a)
	{
		var
			x = a [0],
			y = a [1],
			z = a [2];

		var l = Math .sqrt (x * x + y * y + z * z);

		if (l > 0)
		{
			out [0] = a [0] / l;
			out [1] = a [1] / l;
			out [2] = a [2] / l;
		}

		return out
	}

	function cross (out, a, b)
	{
	    var
			ax = a [0], ay = a [1], az = a [2],
			bx = b [0], by = b [1], bz = b [2];
	
		out [0] = ay * bz - az * by
		out [1] = az * bx - ax * bz
		out [2] = ax * by - ay * bx

		return out
	}

	var
		tmp1 = [ ],
		tmp2 = [ ];

	return function (mesh, nurbs, opts)
	{
		mesh = mesh || { };
		opts = opts || { };

		var
			points  = mesh .points  = mesh .points  || [ ],
			normals = mesh .normals = mesh .normals || [ ],
			faces   = mesh .faces   = mesh .faces   || [ ];

		var dimension = nurbs .dimension;

		if (Array .isArray (opts .resolution))
		{
			var resolution = opts .resolution;
		}
		else
		{
			var
				res        = opts .resolution === undefined ? 31 : opts .resolution,
				resolution = new Array (nurbs .splineDimension) .fill (res);
		}

		var generateNormals = dimension === 3 && (opts .generateNormals !== undefined ? opts .generateNormals : true);

		switch (nurbs .splineDimension)
		{
			case 1:
			{
				var
					nu         = resolution [0],
					uClosed    = nurbs .boundary [0] === 'closed',
					nuBound    = nu + ! uClosed,
					nbVertices = nuBound * dimension,
					uDer       = nurbs .evaluator ([1, 0]),
					domain     = opts .domain || nurbs .domain,
					uDomain    = domain [0];

				for (var i = 0; i < nuBound; ++ i)
				{
					var
						u   = uDomain [0] + (uDomain [1] - uDomain [0]) * i / nu,
						ptr = i * dimension;

					nurbs .evaluate (tmp1, u);

					for (var d = 0; d < dimension; ++ d)
						points [ptr + d] = tmp1 [d];
				}
	
				points .length = nbVertices;
				break;
			}
			case 2:
			{
				var
					nu         = resolution [0],
					nv         = resolution [1],
					uClosed    = nurbs .boundary [0] === 'closed',
					vClosed    = nurbs .boundary [1] === 'closed',
					nuBound    = nu + ! uClosed,
					nvBound    = nv + ! vClosed,
					nbNormals  = nuBound * nvBound * 3,
					nbVertices = nuBound * nvBound * dimension,
					uDer       = nurbs .evaluator ([1, 0]),
					vDer       = nurbs .evaluator ([0, 1]),
					domain     = opts .domain || nurbs .domain,
					uDomain    = domain [0],
					vDomain    = domain [1];

				for (var i = 0; i < nuBound; ++ i)
				{
					var u = uDomain [0] + (uDomain [1] - uDomain [0]) * i / nu;
	
					for (var j = 0; j < nvBound; ++ j)
					{
						var
							v   = vDomain [0] + (vDomain [1] - vDomain [0]) * j / nv,
							ptr = (i + nuBound * j) * dimension;

						nurbs .evaluate (tmp1, u, v);
	
						for (var d = 0; d < dimension; ++ d)
							points [ptr + d] = tmp1 [d];

						if (generateNormals)
						{
							normalize (tmp1, cross (tmp1,
								uDer (tmp1, u, v),
								vDer (tmp2, u, v)
							));
		
							normals [ptr]     = tmp1 [0];
							normals [ptr + 1] = tmp1 [1];
							normals [ptr + 2] = tmp1 [2];
						}
					}
				}
	
				normals .length = nbNormals;
				points  .length = nbVertices;
				
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
						
						faces [c ++] = i0 + nuBound * j0;
						faces [c ++] = i1 + nuBound * j0;
						faces [c ++] = i1 + nuBound * j1;
						
						faces [c ++] = i0 + nuBound * j0;
						faces [c ++] = i1 + nuBound * j1;
						faces [c ++] = i0 + nuBound * j1;
					}
				}
		
				faces .length = c;
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
	"x_ite/Bits/X3DCast",
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/NURBS/X3DParametricGeometryNode",
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DConstants",
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

		this .addType (X3DConstants .NurbsCurve);

		this .setGeometryType (1);

		this .mesh          = { };
		this .sampleOptions = { resolution: [ ] };
	}

	NurbsCurve .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
		X3DLineGeometryNode .prototype,
	{
		constructor: NurbsCurve,
		fieldDefinitions: new FieldDefinitionArray ([
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

			this .controlPoint_ .addInterest ("set_controlPoint__", this);

			this .setPrimitiveMode (this .getBrowser () .getContext () .LINES);
			this .setSolid (false);

			this .set_controlPoint__ ();
		},
		set_controlPoint__: function ()
		{
			if (this .controlPointNode)
				this .controlPointNode .removeInterest ("requestRebuild", this);

			this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this .controlPoint_);

			if (this .controlPointNode)
				this .controlPointNode .addInterest ("requestRebuild", this);
		},
		getTessellation: function (numKnots)
		{
			return NURBS .getTessellation (this .tessellation_ .getValue (), numKnots - this .order_ .getValue ());
		},
		getClosed: function (order, knot, weight, controlPointNode)
		{
			if (! this .closed_ .getValue ())
				return false;

			return NURBS .getClosed (order, knot, weight, controlPointNode);
		},
		getWeights: function (closed, order, dimension, weight)
		{
			return NURBS .getWeights (closed, order, dimension, weight);
		},
		getControlPoints: function (closed, order, controlPointNode)
		{
			return NURBS .getControlPoints (closed, order, controlPointNode);
		},
		tessellate: function ()
		{
			if (this .order_ .getValue () < 2)
				return [ ];
		
			if (! this .controlPointNode)
				return [ ];
		
			if (this .controlPointNode .getSize () < this .order_ .getValue ())
				return [ ];

			var
				vertexArray = this .getVertices (),
				array       = [ ];
			
			for (var i = 0, length = vertexArray .length; i < length; i += 8)
				array .push (vertexArray [i], vertexArray [i + 1], vertexArray [i + 2]);

			array .push (vertexArray [length - 4], vertexArray [length - 3], vertexArray [length - 2]);

			return array;
		},
		build: function ()
		{
			if (this .order_ .getValue () < 2)
				return;
		
			if (! this .controlPointNode)
				return;
		
			if (this .controlPointNode .getSize () < this .order_ .getValue ())
				return;

			// Order and dimension are now positive numbers.

			var
				closed        = this .getClosed (this .order_ .getValue (), this .knot_, this .weight_, this .controlPointNode),
				controlPoints = this .getControlPoints (closed, this .order_ .getValue (), this .controlPointNode);
		
			// Knots
		
			var
				knots = this .getKnots (closed, this .order_ .getValue (), this .controlPointNode .getSize (), this .knot_),
				scale = knots [knots .length - 1] - knots [0];

			var weights = this .getWeights (closed, this .order_ .getValue (), this .controlPointNode .getSize (), this .weight_);

			// Initialize NURBS tesselllator

			var degree = this .order_ .getValue () - 1;

			var surface = this .surface = (this .surface || nurbs) ({
				boundary: ["open"],
				degree: [degree],
				knots: [knots],
				weights: weights,
				points: controlPoints,
				debug: false,
			});

			this .sampleOptions .resolution [0] = this .getTessellation (knots .length);

			var
				mesh        = nurbs .sample (this .mesh, surface, this .sampleOptions),
				points      = mesh .points,
				vertexArray = this .getVertices ();

			for (var i2= 3, length = points .length; i2 < length; i2 += 3)
			{
				var i1 = i2 - 3;

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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/NURBS/X3DNurbsControlCurveNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/NURBS/NURBS",
	"nurbs",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNurbsControlCurveNode, 
          X3DConstants,
          NURBS,
          nurbs)
{
"use strict";

	function NurbsCurve2D (executionContext)
	{
		X3DNurbsControlCurveNode .call (this, executionContext);

		this .addType (X3DConstants .NurbsCurve2D);

		this .mesh          = { };
		this .sampleOptions = { resolution: [ ] };
	}

	NurbsCurve2D .prototype = Object .assign (Object .create (X3DNurbsControlCurveNode .prototype),
	{
		constructor: NurbsCurve2D,
		fieldDefinitions: new FieldDefinitionArray ([
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
			return NURBS .getTessellation (this .tessellation_ .getValue (), numKnots - this .order_ .getValue ());
		},
		getClosed: function (order, knot, weight, controlPoint)
		{
			if (! this .closed_ .getValue ())
				return false;

			return NURBS .getClosed2D (order, knot, weight, controlPoint);
		},
		getKnots: function (closed, order, dimension, knot)
		{
			return NURBS .getKnots (closed, order, dimension, knot);
		},
		getWeights: function (closed, order, dimension, weight)
		{
			return NURBS .getWeights (closed, order, dimension, weight);
		},
		getControlPoints: function (closed, order, controlPoint)
		{
			return NURBS .getControlPoints2D (closed, order, controlPoint);
		},
		tessellate: function (spine)
		{
			if (this .order_ .getValue () < 2)
				return [ ];
		
			if (this .controlPoint_ .length < this .order_ .getValue ())
				return [ ];

			// Order and dimension are now positive numbers.

			var
				closed        = this .getClosed (this .order_ .getValue (), this .knot_, this .weight_, this .controlPoint_),
				controlPoints = this .getControlPoints (closed, this .order_ .getValue (), this .controlPoint_);
		
			// Knots
		
			var
				knots = this .getKnots (closed, this .order_ .getValue (), this .controlPoint_ .length, this .knot_),
				scale = knots [knots .length - 1] - knots [0];

			var weights = this .getWeights (closed, this .order_ .getValue (), this .controlPoint_ .length, this .weight_);

			// Initialize NURBS tesselllator

			var degree = this .order_ .getValue () - 1;

			var surface = this .surface = (this .surface || nurbs) ({
				boundary: ["open"],
				degree: [degree],
				knots: [knots],
				weights: weights,
				points: controlPoints,
				debug: false,
			});

			this .sampleOptions .resolution [0] = this .getTessellation (knots .length);

			var
				mesh   = nurbs .sample (this .mesh, surface, this .sampleOptions),
				points = mesh .points,
				array  = [ ];

			if (spine)
			{
				for (var i = 0, length = points .length; i < length; i += 2)
					array .push (points [i], 0, points [i + 1]);
			}
			else
			{
				for (var i = 0, length = points .length; i < length; i += 2)
					array .push (points [i], points [i + 1]);
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


define ('x_ite/Components/Interpolation/X3DInterpolatorNode',[
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Algorithm",
],
function (X3DChildNode, 
          X3DConstants,
          Algorithm)
{
"use strict";

	function X3DInterpolatorNode (executionContext)
	{
		X3DChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DInterpolatorNode);
	}

	X3DInterpolatorNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
	{
		constructor: X3DInterpolatorNode,
		setup: function ()
		{
			// If an X3DInterpolatorNode value_changed outputOnly field is read before it receives any inputs,
			// keyValue[0] is returned if keyValue is not empty. If keyValue is empty (i.e., [ ]), the initial
			// value for the respective field type is returned (EXAMPLE  (0, 0, 0) for Fields .SFVec3f);

			this .set_key__ ();

			if (this .key_ .length)
				this .interpolate (0, 0, 0);

			X3DChildNode .prototype .setup .call (this);
		},
		initialize: function ()
		{
			X3DChildNode .prototype .initialize .call (this);
			
			this .set_fraction_ .addInterest ("set_fraction__", this);
			this .key_          .addInterest ("set_key__", this);
		},
		set_fraction__: function ()
		{
			var
				key      = this .key_,
				length   = key .length,
				fraction = this .set_fraction_ .getValue ();

			switch (length)
			{
				case 0:
					// Interpolator nodes containing no keys in the key field shall not produce any events.
					return;
				case 1:
					return this .interpolate (0, 0, 0);
				default:
				{
					if (fraction <= key [0])
						return this .interpolate (0, 1, 0);

					var index1 = Algorithm .upperBound (key, 0, length, fraction, Algorithm .less);

					if (index1 !== length)
					{
						var
							index0 = index1 - 1,
							weight = (fraction - key [index0]) / (key [index1] - key [index0]);

						this .interpolate (index0, index1, Algorithm .clamp (weight, 0, 1));
					}
					else
						this .interpolate (length - 2, length - 1, 1);
				}
			}
		},
		set_key__: function ()
		{
			this .set_keyValue__ ();
		},
		set_keyValue__: function () { },
		interpolate: function () { },
	});

	return X3DInterpolatorNode;
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


define ('x_ite/Components/Interpolation/OrientationInterpolator',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Interpolation/X3DInterpolatorNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Rotation4"
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInterpolatorNode, 
          X3DConstants,
          Rotation4)
{
"use strict";

	function OrientationInterpolator (executionContext)
	{
		X3DInterpolatorNode .call (this, executionContext);

		this .addType (X3DConstants .OrientationInterpolator);
	}

	OrientationInterpolator .prototype = Object .assign (Object .create (X3DInterpolatorNode .prototype),
	{
		constructor: OrientationInterpolator,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFRotation ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFRotation ()),
		]),
		getTypeName: function ()
		{
			return "OrientationInterpolator";
		},
		getComponentName: function ()
		{
			return "Interpolation";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DInterpolatorNode .prototype .initialize .call (this);

			this .keyValue_ .addInterest ("set_keyValue__", this);
		},
		set_keyValue__: function ()
		{
			var
				key      = this .key_,
				keyValue = this .keyValue_;

			if (keyValue .length < key .length)
				keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFRotation ());
		},
		interpolate: (function ()
		{
			var
				keyValue0 = new Rotation4 (0, 0, 1, 0),
				keyValue1 = new Rotation4 (0, 0, 1, 0);

			return function (index0, index1, weight)
			{
				try
				{
					keyValue0 .assign (this .keyValue_ [index0] .getValue ());
					keyValue1 .assign (this .keyValue_ [index1] .getValue ());

					this .value_changed_ = keyValue0 .slerp (keyValue1, weight);

				}
				catch (error)
				{
					console .log (error);
				}
			};
		}) (),
	});

	return OrientationInterpolator;
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Interpolation/OrientationInterpolator",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
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
		this .mesh          = { };
		this .sampleOptions = { resolution: [ 128 ] };
	}

	NurbsOrientationInterpolator .prototype = Object .assign (Object .create (X3DChildNode .prototype),
	{
		constructor: NurbsOrientationInterpolator,
		fieldDefinitions: new FieldDefinitionArray ([
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

			this .order_        .addInterest ("requestRebuild",     this);
			this .knot_         .addInterest ("requestRebuild",     this);
			this .weight_       .addInterest ("requestRebuild",     this);
			this .controlPoint_ .addInterest ("set_controlPoint__", this);

			this .rebuild_ .addInterest ("build", this);
		
			this .set_fraction_ .addFieldInterest (this .interpolator .set_fraction_);
			this .interpolator .value_changed_ .addFieldInterest (this .value_changed_);

			this .interpolator .setup ();

			this .set_controlPoint__ ();
		},
		set_controlPoint__: function ()
		{
			if (this .controlPointNode)
				this .controlPointNode .removeInterest ("requestRebuild", this);

			this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this .controlPoint_);

			if (this .controlPointNode)
				this .controlPointNode .addInterest ("requestRebuild", this);

			this .requestRebuild ();
		},
		getClosed: function (order, knot, weight, controlPointNode)
		{
			return false && NURBS .getClosed (order, knot, weight, controlPointNode);
		},
		getKnots: function (closed, order, dimension, knot)
		{
			return NURBS .getKnots (closed, order, dimension, knot);
		},
		getWeights: function (closed, order, dimension, weight)
		{
			return NURBS .getWeights (closed, order, dimension, weight);
		},
		getControlPoints: function (closed, order, controlPointNode)
		{
			return NURBS .getControlPoints (closed, order, controlPointNode);
		},
		requestRebuild: function ()
		{
			this .rebuild_ .addEvent ();
		},
		build: function ()
		{
			if (this .order_ .getValue () < 2)
				return;
		
			if (! this .controlPointNode)
				return;
		
			if (this .controlPointNode .getSize () < this .order_ .getValue ())
				return;

			// Order and dimension are now positive numbers.

			var
				closed        = this .getClosed (this .order_ .getValue (), this .knot_, this .weight_, this .controlPointNode),
				controlPoints = this .getControlPoints (closed, this .order_ .getValue (), this .controlPointNode);
		
			// Knots
		
			var
				knots = this .getKnots (closed, this .order_ .getValue (), this .controlPointNode .getSize (), this .knot_),
				scale = knots [knots .length - 1] - knots [0];

			var weights = this .getWeights (closed, this .order_ .getValue (), this .controlPointNode .getSize (), this .weight_);

			// Initialize NURBS tesselllator

			var degree = this .order_ .getValue () - 1;

			var surface = this .surface = (this .surface || nurbs) ({
				boundary: ["open"],
				degree: [degree],
				knots: [knots],
				weights: weights,
				points: controlPoints,
				debug: false,
			});

			var
				mesh         = nurbs .sample (this .mesh, surface, this .sampleOptions),
				points       = mesh .points,
				interpolator = this .interpolator;

			interpolator .key_      .length = 0;
			interpolator .keyValue_ .length = 0;

			for (var i = 0, length = points .length - 3; i < length; i += 3)
			{
				var direction = new Vector3 (points [i + 3] - points [i + 0],
				                             points [i + 4] - points [i + 1],
				                             points [i + 5] - points [i + 2])

				interpolator .key_      .push (knots [0] + i / (length - 3 + (3 * closed)) * scale);
				interpolator .keyValue_. push (new Rotation4 (Vector3 .zAxis, direction));
			}

			if (closed)
			{
				interpolator .key_      .push (knots [0] + scale);
				interpolator .keyValue_. push (interpolator .keyValue_ [0]);
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
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"x_ite/Browser/NURBS/NURBS",
	"nurbs",
],
function (X3DParametricGeometryNode, 
          X3DConstants,
          X3DCast,
          NURBS,
          nurbs)
{
"use strict";

	function X3DNurbsSurfaceGeometryNode (executionContext)
	{
		X3DParametricGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .X3DNurbsSurfaceGeometryNode);

		this .tessellationScale = 1;
		this .mesh              = { };
		this .sampleOptions     = { resolution: [ ] };
	}

	X3DNurbsSurfaceGeometryNode .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
	{
		constructor: X3DNurbsSurfaceGeometryNode,
		initialize: function ()
		{
			X3DParametricGeometryNode .prototype .initialize .call (this);

			this .texCoord_     .addInterest ("set_texCoord__",     this);
			this .controlPoint_ .addInterest ("set_controlPoint__", this);

			this .set_texCoord__ ();
			this .set_controlPoint__ ();
		},
		set_texCoord__: function ()
		{
			if (this .texCoordNode)
				this .texCoordNode .removeInterest ("requestRebuild", this);

			if (this .nurbsTexCoordNode)
				this .nurbsTexCoordNode .removeInterest ("requestRebuild", this);

			this .texCoordNode      = X3DCast (X3DConstants .X3DTextureCoordinateNode, this .texCoord_);
			this .nurbsTexCoordNode = X3DCast (X3DConstants .NurbsTextureCoordinate,   this .texCoord_);

			if (this .texCoordNode)
				this .texCoordNode .addInterest ("requestRebuild", this);

			if (this .nurbsTexCoordNode)
				this .nurbsTexCoordNode .addInterest ("requestRebuild", this);
		},
		set_controlPoint__: function ()
		{
			if (this .controlPointNode)
				this .controlPointNode .removeInterest ("requestRebuild", this);

			this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this .controlPoint_);

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
			return Math .floor (NURBS .getTessellation (this .uTessellation_ .getValue (), numKnots - this .uOrder_ .getValue ()) * this .tessellationScale);
		},
		getVTessellation: function (numKnots)
		{
			return Math .floor (NURBS .getTessellation (this .vTessellation_ .getValue (), numKnots - this .vOrder_ .getValue ()) * this .tessellationScale);
		},
		getUClosed: function (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode)
		{
			if (this .uClosed_ .getValue ())
				return NURBS .getUClosed (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode);

			return false;
		},
		getVClosed: function (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode)
		{
			if (this .vClosed_ .getValue ())
				return NURBS .getVClosed (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode);

			return false;
		},
		getUVWeights: function (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weight)
		{
			return NURBS .getUVWeights (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weight);
		},
		getTexControlPoints: function (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, texCoordNode)
		{
			return NURBS .getTexControlPoints (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, texCoordNode);
		},
		getUVControlPoints: function (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, controlPointNode)
		{
			return NURBS .getUVControlPoints (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, controlPointNode);
		},
		build: function ()
		{
			if (this .uOrder_ .getValue () < 2)
				return;
		
			if (this .vOrder_ .getValue () < 2)
				return;
		
			if (this .uDimension_ .getValue () < this .uOrder_ .getValue ())
				return;
		
			if (this .vDimension_ .getValue () < this .vOrder_ .getValue ())
				return;
		
			if (! this .controlPointNode)
				return;

			if (this .controlPointNode .getSize () !== this .uDimension_ .getValue () * this .vDimension_ .getValue ())
				return;

			// Order and dimension are now positive numbers.

			// ControlPoints

			var
				uClosed       = this .getUClosed (this .uOrder_ .getValue (), this .uDimension_ .getValue (), this .vDimension_ .getValue (), this .uKnot_, this .weight_, this .controlPointNode),
				vClosed       = this .getVClosed (this .vOrder_ .getValue (), this .uDimension_ .getValue (), this .vDimension_ .getValue (), this .vKnot_, this .weight_, this .controlPointNode),
				controlPoints = this .getUVControlPoints (uClosed, vClosed, this .uOrder_ .getValue (), this .vOrder_ .getValue (), this .uDimension_ .getValue (), this .vDimension_ .getValue (), this .controlPointNode);

			// Knots
		
			var
				uKnots = this .getKnots (uClosed, this .uOrder_ .getValue (), this .uDimension_ .getValue (), this .uKnot_),
				vKnots = this .getKnots (vClosed, this .vOrder_ .getValue (), this .vDimension_ .getValue (), this .vKnot_),
				uScale = uKnots [uKnots .length - 1] - uKnots [0],
				vScale = vKnots [vKnots .length - 1] - vKnots [0];

			var weights = this .getUVWeights (uClosed, vClosed, this .uOrder_ .getValue (), this .vOrder_ .getValue (), this .uDimension_ .getValue (), this .vDimension_ .getValue (), this .weight_);

			// Initialize NURBS tesselllator

			var
				uDegree = this .uOrder_ .getValue () - 1,
				vDegree = this .vOrder_ .getValue () - 1;

			var surface = this .surface = (this .surface || nurbs) ({
				boundary: ["open", "open"],
				degree: [uDegree, vDegree],
				knots: [uKnots, vKnots],
				weights: weights,
				points: controlPoints,
				debug: false,
			});

			var sampleOptions = this .sampleOptions;

			sampleOptions .resolution [0]  = this .getUTessellation (uKnots .length);
			sampleOptions .resolution [1]  = this .getVTessellation (vKnots .length);
			sampleOptions .generateNormals = true;
			sampleOptions .domain          = undefined;

			var
				mesh        = nurbs .sample (this .mesh, surface, sampleOptions),
				faces       = mesh .faces,
				normals     = mesh .normals,
				points      = mesh .points,
				normalArray = this .getNormals (),
				vertexArray = this .getVertices ();

			for (var i = 0, length = faces .length; i < length; ++ i)
			{
				var index = faces [i] * 3;

				normalArray .push (normals [index], normals [index + 1], normals [index + 2]);
				vertexArray .push (points [index], points [index + 1], points [index + 2], 1);
			}

			this .buildNurbsTexCoords (uClosed, vClosed, this .uOrder_ .getValue (), this .vOrder_ .getValue (), uKnots, vKnots, this .uDimension_ .getValue (), this .vDimension_ .getValue (), surface .domain);
			this .setSolid (this .solid_ .getValue ());
			this .setCCW (true);
		},
		buildNurbsTexCoords: function (uClosed, vClosed, uOrder, vOrder, uKnots, vKnots, uDimension, vDimension, domain)
		{	
			var sampleOptions = this .sampleOptions;

			if (this .texCoordNode && this .texCoordNode .getSize () === uDimension * vDimension)
			{
				var
					texUDegree       = uOrder - 1,
					texVDegree       = vOrder - 1,
					texUKnots        = uKnots,
					texVKnots        = vKnots,
					texWeights       = undefined,
					texControlPoints = this .getTexControlPoints (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, this .texCoordNode);
			}
			else if (this .nurbsTexCoordNode && this .nurbsTexCoordNode .isValid ())
			{
				var
					node             = this .nurbsTexCoordNode,
					texUDegree       = node .uOrder_ .getValue () - 1,
					texVDegree       = node .vOrder_ .getValue () - 1,
					texUKnots        = this .getKnots (false, node .uOrder_ .getValue (), node .uDimension_ .getValue (), node .uKnot_),
					texVKnots        = this .getKnots (false, node .vOrder_ .getValue (), node .vDimension_ .getValue (), node .vKnot_),
					texWeights       = this .getUVWeights (false, false, node .uOrder_ .getValue (), node .vOrder_ .getValue (), node .uDimension_ .getValue (), node .vDimension_ .getValue (), node .weight_);
					texControlPoints = node .getControlPoints ();
			}
			else
			{
				var
					texUDegree       = 1,
					texVDegree       = 1,
					texUKnots        = [uKnots [0], uKnots [0], uKnots [uKnots .length - 1], uKnots [uKnots .length - 1]],
					texVKnots        = [vKnots [0], vKnots [0], vKnots [vKnots .length - 1], vKnots [vKnots .length - 1]],
					texWeights       = undefined,
					texControlPoints = [[[0, 0, 0, 1], [0, 1, 0, 1]], [[1, 0, 0, 1], [1, 1, 0, 1]]];

				sampleOptions .domain = domain;
			}

			var surface = this .surface = (this .surface || nurbs) ({
				boundary: ["open", "open"],
				degree: [texUDegree, texVDegree],
				knots: [texUKnots, texVKnots],
				weights: texWeights,
				points: texControlPoints,
			});

			sampleOptions .generateNormals = false;

			var
				mesh          = nurbs .sample (this .mesh, surface, sampleOptions),
				faces         = mesh .faces,
				points        = mesh .points,
				texCoordArray = this .getTexCoords ();

			for (var i = 0, length = faces .length; i < length; ++ i)
			{
				var index = faces [i] * 4;

				texCoordArray .push (points [index], points [index + 1], points [index + 2], points [index + 3]);
			}

			this .getMultiTexCoords () .push (this .getTexCoords ());
		},
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/NURBS/X3DNurbsSurfaceGeometryNode",
	"x_ite/Bits/X3DConstants",
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
		fieldDefinitions: new FieldDefinitionArray ([
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


define ('x_ite/Components/Interpolation/PositionInterpolator',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Interpolation/X3DInterpolatorNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInterpolatorNode, 
          X3DConstants,
          Vector3)
{
"use strict";

	function PositionInterpolator (executionContext)
	{
		X3DInterpolatorNode .call (this, executionContext);

		this .addType (X3DConstants .PositionInterpolator);
	}

	PositionInterpolator .prototype = Object .assign (Object .create (X3DInterpolatorNode .prototype),
	{
		constructor: PositionInterpolator,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "PositionInterpolator";
		},
		getComponentName: function ()
		{
			return "Interpolation";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DInterpolatorNode .prototype .initialize .call (this);

			this .keyValue_ .addInterest ("set_keyValue__", this);
		},
		set_keyValue__: function ()
		{
			var
				key      = this .key_,
				keyValue = this .keyValue_;

			if (keyValue .length < key .length)
				keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFVec3f ());
		},
		interpolate: (function ()
		{
			var keyValue = new Vector3 (0, 0, 0);

			return function (index0, index1, weight)
			{
				this .value_changed_ = keyValue .assign (this .keyValue_ [index0] .getValue ()) .lerp (this .keyValue_ [index1] .getValue (), weight);
			};
		})(),
	});

	return PositionInterpolator;
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Interpolation/PositionInterpolator",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
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
		this .mesh          = { };
		this .sampleOptions = { resolution: [ 128 ] };
	}

	NurbsPositionInterpolator .prototype = Object .assign (Object .create (X3DChildNode .prototype),
	{
		constructor: NurbsPositionInterpolator,
		fieldDefinitions: new FieldDefinitionArray ([
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

			this .order_        .addInterest ("requestRebuild",     this);
			this .knot_         .addInterest ("requestRebuild",     this);
			this .weight_       .addInterest ("requestRebuild",     this);
			this .controlPoint_ .addInterest ("set_controlPoint__", this);

			this .rebuild_ .addInterest ("build", this);
		
			this .set_fraction_ .addFieldInterest (this .interpolator .set_fraction_);
			this .interpolator .value_changed_ .addFieldInterest (this .value_changed_);

			this .interpolator .setup ();

			this .set_controlPoint__ ();
		},
		set_controlPoint__: function ()
		{
			if (this .controlPointNode)
				this .controlPointNode .removeInterest ("requestRebuild", this);

			this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this .controlPoint_);

			if (this .controlPointNode)
				this .controlPointNode .addInterest ("requestRebuild", this);

			this .requestRebuild ();
		},
		getClosed: function (order, knot, weight, controlPointNode)
		{
			return false && NURBS .getClosed (order, knot, weight, controlPointNode);
		},
		getKnots: function (closed, order, dimension, knot)
		{
			return NURBS .getKnots (closed, order, dimension, knot);
		},
		getWeights: function (closed, order, dimension, weight)
		{
			return NURBS .getWeights (closed, order, dimension, weight);
		},
		getControlPoints: function (closed, order, controlPointNode)
		{
			return NURBS .getControlPoints (closed, order, controlPointNode);
		},
		requestRebuild: function ()
		{
			this .rebuild_ .addEvent ();
		},
		build: function ()
		{
			if (this .order_ .getValue () < 2)
				return;
		
			if (! this .controlPointNode)
				return;
		
			if (this .controlPointNode .getSize () < this .order_ .getValue ())
				return;

			// Order and dimension are now positive numbers.

			var
				closed        = this .getClosed (this .order_ .getValue (), this .knot_, this .weight_, this .controlPointNode),
				controlPoints = this .getControlPoints (closed, this .order_ .getValue (), this .controlPointNode);
		
			// Knots
		
			var
				knots = this .getKnots (closed, this .order_ .getValue (), this .controlPointNode .getSize (), this .knot_),
				scale = knots [knots .length - 1] - knots [0];

			var weights = this .getWeights (closed, this .order_ .getValue (), this .controlPointNode .getSize (), this .weight_);

			// Initialize NURBS tesselllator

			var degree = this .order_ .getValue () - 1;

			var surface = this .surface = (this .surface || nurbs) ({
				boundary: ["open"],
				degree: [degree],
				knots: [knots],
				weights: weights,
				points: controlPoints,
				debug: false,
			});

			var
				mesh         = nurbs .sample (this .mesh, surface, this .sampleOptions),
				points       = mesh .points,
				interpolator = this .interpolator;

			interpolator .key_      .length = 0;
			interpolator .keyValue_ .length = 0;

			for (var i = 0, length = points .length; i < length; i += 3)
			{
				interpolator .key_      .push (knots [0] + i / (length - 3) * scale);
				interpolator .keyValue_. push (new Fields .SFVec3f (points [i], points [i + 1], points [i + 2]));
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
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

	function remove (array, first, last, range, rfirst, rlast)
	{
		var set = { };

		for (var i = rfirst; i < rlast; ++ i)
			set [getId (range [i])] = true;

		function compare (value) { return set [getId (value)]; }

		return array .remove (first, last, compare);
	}

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
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellationScale", new Fields .SFFloat (1)),
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

			this .tessellationScale_ .addInterest ("set_tessellationScale__", this);
			this .addGeometry_       .addInterest ("set_addGeometry__",       this);
			this .removeGeometry_    .addInterest ("set_removeGeometry__",    this);
			this .geometry_          .addInterest ("set_geometry__",          this);
		
			this .set_geometry__ ();
		},
		set_tessellationScale__: function ()
		{
			var tessellationScale = Math .max (0, this .tessellationScale_ .getValue ());

			for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
				this .geometryNodes [i] .setTessellationScale (tessellationScale);
		},
		set_addGeometry__: function ()
		{
			this .addGeometry_ .setTainted (true);

			this .addGeometry_ .erase (remove (this .addGeometry_, 0, this .addGeometry_ .length,
			                                   this .geometry_, 0, this .geometry_ .length),
			                           this .addGeometry_ .length);

			for (var i = 0, length = this .addGeometry_ .length; i < length; ++ i)
				this .geometry_ .push (this .addGeometry_ [i]);

			this .addGeometry_ .setTainted (false);
		},
		set_removeGeometry__: function ()
		{
			this .geometry_ .erase (remove (this .geometry_,       0, this .geometry_ .length,
			                                this .removeGeometry_, 0, this .removeGeometry_ .length),
			                        this .geometry__ .length);
		},
		set_geometry__: function ()
		{
			for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
				this .geometryNodes [i] .setTessellationScale (1);

			this .geometryNodes .length = 0;

			for (var i = 0, length = this .geometry_ .length; i < length; ++ i)
			{
				var geometryNode = X3DCast (X3DConstants .X3DNurbsSurfaceGeometryNode, this .geometry_ [i]);
		
				if (geometryNode)
					this .geometryNodes .push (geometryNode);
			}

			this .set_tessellationScale__ ();
		},
	});

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


define ('standard/Math/Geometry/Line3',[
	"standard/Math/Numbers/Vector3",
],
function (Vector3)
{
"use strict";

	function Line3 (point, direction)
	{
		this .point     = point     .copy ();
		this .direction = direction .copy ();
	}

	Line3 .prototype =
	{
		constructor: Line3,
		copy: function ()
		{
			var copy = Object .create (Line3 .prototype);
			copy .point     = this .point .copy ();
			copy .direction = this .direction .copy ();
			return copy;
		},
		assign: function (line)
		{
			this .point     .assign (line .point);
			this .direction .assign (line .direction);
			return this;
		},
		set: function (point, direction)
		{
			this .point     .assign (point);
			this .direction .assign (direction);
			return this;
		},
		setPoints: function (point1, point2)
		{
			this .point .assign (point1);
			this .direction .assign (point2) .subtract (point1) .normalize ();
			return this;
		},
		multMatrixLine: function (matrix)
		{
			matrix .multMatrixVec (this .point);
			matrix .multMatrixDir (this .direction) .normalize ();
			return this;
		},
		multLineMatrix: function (matrix)
		{
			matrix .multVecMatrix (this .point);
			matrix .multDirMatrix (this .direction) .normalize ();
			return this;
		},
		getClosestPointToPoint: function (point, result)
		{
			var
				r = result .assign (point) .subtract (this .point),
				d = r .dot (this .direction);

			return result .assign (this .direction) .multiply (d) .add (this .point);
		},
		getClosestPointToLine: (function ()
		{
			var u = new Vector3 (0, 0, 0);

			return function (line, point)
			{
				var
					p1 = this .point,
					p2 = line .point,
					d1 = this .direction,
					d2 = line .direction;
	
				var t = Vector3 .dot (d1, d2);
	
				if (Math .abs (t) >= 1)
					return false;  // lines are parallel
	
				u .assign (p2) .subtract (p1);
	
				t = (u .dot (d1) - t * u .dot (d2)) / (1 - t * t);
	
				point .assign (d1) .multiply (t) .add (p1);
				return true;
			};
		})(),
		getPerpendicularVector: function (point)
		{
			var d = Vector3 .subtract (this .point, point);

			return d .subtract (this .direction .copy () .multiply (Vector3 .dot (d, this .direction)));
		},
		intersectsTriangle: (function ()
		{
			var
				pvec = new Vector3 (0, 0, 0),
				tvec = new Vector3 (0, 0, 0);

			return function (A, B, C, uvt)
			{
				// Find vectors for two edges sharing vert0.
				var
					edge1 = B .subtract (A),
					edge2 = C .subtract (A);
	
				// Begin calculating determinant - also used to calculate U parameter.
				pvec .assign (this .direction) .cross (edge2);
	
				// If determinant is near zero, ray lies in plane of triangle.
				var det = edge1 .dot (pvec);
	
				// Non culling intersection.
	
				if (det === 0)
					return false;
	
				var inv_det = 1 / det;
	
				// Calculate distance from vert0 to ray point.
				tvec .assign (this .point) .subtract (A);
	
				// Calculate U parameter and test bounds.
				var u = tvec .dot (pvec) * inv_det;
	
				if (u < 0 || u > 1)
					return false;
	
				// Prepare to test V parameter.
				var qvec = tvec .cross (edge1);
	
				// Calculate V parameter and test bounds.
				var v = this .direction .dot (qvec) * inv_det;
	
				if (v < 0 || u + v > 1)
					return false;
	
				//var t = edge2 .dot (qvec) * inv_det;
	
				uvt .u = u;
				uvt .v = v;
				uvt .t = 1 - u - v;
	
				return true;
			};
		})(),
		toString: function ()
		{
			return this .point + ", " + this .direction;
		},
	};

	Line3 .Points = function (point1, point2)
	{
		var line = Object .create (Line3 .prototype);
		line .point     = point1 .copy ();
		line .direction = Vector3 .subtract (point2, point1) .normalize ();
		return line;
	};

	return Line3;
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

		   var det = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);

			if (det == 0)
				return false;

		   var u = ((b.y - c.y) * (point .x - c.x) + (c.x - b.x) * (point .y - c.y)) / det;

		   if (u < 0 || u > 1)
		      return false;

		   var v = ((c.y - a.y) * (point .x - c.x) + (a.x - c.x) * (point .y - c.y)) / det;

		   if (v < 0 || v > 1)
		      return false;

		   var t = 1 - u - v;

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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/NURBS/NurbsPatchSurface",
	"x_ite/Bits/X3DConstants",
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
		fieldDefinitions: new FieldDefinitionArray ([
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
			this .set_fraction_ .addInterest ("set_fraction__", this);

			this .uOrder_       .addFieldInterest (this .geometry .uOrder_);
			this .vOrder_       .addFieldInterest (this .geometry .vOrder_);
			this .uDimension_   .addFieldInterest (this .geometry .uDimension_);
			this .vDimension_   .addFieldInterest (this .geometry .vDimension_);
			this .uKnot_        .addFieldInterest (this .geometry .uKnot_);
			this .vKnot_        .addFieldInterest (this .geometry .vKnot_);
			this .weight_       .addFieldInterest (this .geometry .weight_);
			this .controlPoint_ .addFieldInterest (this .geometry .controlPoint_);

			this .geometry .uTessellation_ = 128;
			this .geometry .vTessellation_ = 128;
			this .geometry .uOrder_        = this .uOrder_;
			this .geometry .vOrder_        = this .vOrder_;
			this .geometry .uDimension_    = this .uDimension_;
			this .geometry .vDimension_    = this .vDimension_;
			this .geometry .uKnot_         = this .uKnot_;
			this .geometry .vKnot_         = this .vKnot_;
			this .geometry .weight_        = this .weight_;
			this .geometry .controlPoint_  = this .controlPoint_;

			this .geometry .setup ();
		},
		set_fraction__: (function ()
		{
			var
				a     = new Vector3 (0, 0, 0),
				b     = new Vector3 (0, 0, 0),
				c     = new Vector3 (0, 0, 0),
				point = new Vector3 (0, 0, 0),
				line  = new Line3 (Vector3 .Zero, Vector3 .zAxis),
				uvt   = { };

			return function ()
			{
				var
					fraction       = this .set_fraction_ .getValue (),
					texCoordsArray = this .geometry .getTexCoords (),
					normalArray    = this .geometry .getNormals (),
					verticesArray  = this .geometry .getVertices ();
	
				for (var i4 = 0, i3 = 0, length = texCoordsArray .length; i4 < length; i4 += 12, i3 += 9)
				{
					a .set (texCoordsArray [i4 + 0], texCoordsArray [i4 + 1], 0);
					b .set (texCoordsArray [i4 + 4], texCoordsArray [i4 + 5], 0);
					c .set (texCoordsArray [i4 + 7], texCoordsArray [i4 + 9], 0);
	
					if (Triangle2 .isPointInTriangle (a, b, c, fraction))
					{
						line .set (point .set (fraction .x, fraction .y, 0), Vector3 .zAxis);

						if (line .intersectsTriangle (a, b, c, uvt))
						{
							var
								u = uvt .u,
								v = uvt .v,
								t = uvt .t;

							var normal = new Vector3 (t * normalArray [i3 + 0] + u * normalArray [i3 + 3] + v * normalArray [i3 + 6],
							                          t * normalArray [i3 + 1] + u * normalArray [i3 + 4] + v * normalArray [i3 + 7],
							                          t * normalArray [i3 + 2] + u * normalArray [i3 + 5] + v * normalArray [i3 + 8]);

							var position = new Vector3 (t * verticesArray [i4 + 0] + u * verticesArray [i4 + 4] + v * verticesArray [i4 +  8],
							                            t * verticesArray [i4 + 1] + u * verticesArray [i4 + 5] + v * verticesArray [i4 +  9],
							                            t * verticesArray [i4 + 2] + u * verticesArray [i4 + 6] + v * verticesArray [i4 + 10]);

							this .normal_changed_   = normal;
							this .position_changed_ = position;
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


define ('x_ite/Components/Geometry3D/Extrusion',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode, 
          X3DConstants,
          Triangle3,
          Vector2,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

	function Extrusion (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Extrusion);

		this .creaseAngle_  .setUnit ("angle");
		this .crossSection_ .setUnit ("length");
		this .spine_        .setUnit ("length");
	}

	Extrusion .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
	{
		constructor: Extrusion,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "beginCap",     new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "endCap",       new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",        new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",          new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "convex",       new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "crossSection", new Fields .MFVec2f (new Vector2 (1, 1), new Vector2 (1, -1), new Vector2 (-1, -1), new Vector2 (-1, 1), new Vector2 (1, 1))),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "orientation",  new Fields .MFRotation (new Rotation4 ())),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",        new Fields .MFVec2f (new Vector2 (1, 1))),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "spine",        new Fields .MFVec3f (new Vector3 (0, 0, 0), new Vector3 (0, 1, 0))),
		]),
		getTypeName: function ()
		{
			return "Extrusion";
		},
		getComponentName: function ()
		{
			return "Geometry3D";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		getClosedOrientation: function ()
		{
			var orientation = this .orientation_;

			if (orientation .length)
			{
				var
					firstOrientation = orientation [0] .getValue (),
					lastOrientation  = orientation [orientation .length - 1] .getValue ();

				return firstOrientation .equals (lastOrientation);
			}

			return true;
		},
		createPoints: (function ()
		{
			var scale3 = new Vector3 (1, 1, 1);

			return function ()
			{
				var
					crossSection = this .crossSection_,
					orientation  = this .orientation_,
					scale        = this .scale_,
					spine        = this .spine_,
					points       = [ ];
	
				// calculate SCP rotations
	
				var rotations = this .createRotations ();
	
				// calculate vertices.
				
				for (var i = 0, length = spine .length; i < length; ++ i)
				{
					var matrix = rotations [i];

					if (orientation .length)
						matrix .rotate (orientation [Math .min (i, orientation .length - 1)] .getValue ());
	
					if (scale .length)
					{
						var s = scale [Math .min (i, scale .length - 1)] .getValue ();
						matrix .scale (scale3 .set (s .x, 1, s .y));
					}
	
					for (var cs = 0, csLength = crossSection .length; cs < csLength; ++ cs)
					{
						var vector = crossSection [cs] .getValue ();
						points .push (matrix .multVecMatrix (new Vector3 (vector .x, 0, vector .y)));
					}
				}
	
				return points;
			};
		})(),
		createRotations: (function ()
		{
			var rotations = [ ];

			var
				SCPxAxis = new Vector3 (0, 0, 0),
				SCPyAxis = new Vector3 (0, 0, 0),
				SCPzAxis = new Vector3 (0, 0, 0);

			var
				SCPyAxisPrevious = new Vector3 (0, 0, 0),
				SCPzAxisPrevious = new Vector3 (0, 0, 0);

			var
				vector3  = new Vector3 (0, 0, 0),
				rotation = new Rotation4 (0, 0, 1, 0);

			return function ()
			{
				// calculate SCP rotations
	
				var
					spine       = this .spine_,
					numSpines   = spine .length,
					firstSpine  = spine [0] .getValue (),
					lastSpine   = spine [spine .length - 1] .getValue (),
					closedSpine = firstSpine .equals (lastSpine) && this .getClosedOrientation ();
	
				// Extend or shrink static rotations array:
				for (var i = rotations .length; i < numSpines; ++ i)
					rotations [i] = new Matrix4 ();
	
				rotations .length = numSpines;
	
				// SCP axes:
				SCPxAxis .set (0, 0, 0);
				SCPyAxis .set (0, 0, 0);
				SCPzAxis .set (0, 0, 0);
	
				// SCP for the first point:
				if (closedSpine)
				{
					// Find first defined Y-axis.
					for (var i = 1, length = numSpines - 2; i < length; ++ i)
					{
						SCPyAxis .assign (spine [i] .getValue ()) .subtract (spine [length] .getValue ()) .normalize ();
	
						if (! SCPyAxis .equals (Vector3 .Zero))
							break;
					}

					// Find first defined Z-axis.
					for (var i = 0, length = numSpines - 2; i < length; ++ i)
					{
						SCPzAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i] .getValue ())
						           .cross (vector3 .assign (spine [length] .getValue ()) .subtract (spine [i] .getValue ()))
						           .normalize ();

						if (! SCPzAxis .equals (Vector3 .Zero))
							break;
					}
				}
				else
				{
					// Find first defined Y-axis.
					for (var i = 0, length = numSpines - 1; i < length; ++ i)
					{
						SCPyAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i] .getValue ()) .normalize ();
	
						if (! SCPyAxis .equals (Vector3 .Zero))
							break;
					}

					// Find first defined Z-axis.
					for (var i = 1, length = numSpines - 1; i < length; ++ i)
					{
						SCPzAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i] .getValue ())
						         .cross (vector3 .assign (spine [i - 1] .getValue ()) .subtract (spine [i] .getValue ()))
						         .normalize ();
	
						if (! SCPzAxis .equals (Vector3 .Zero))
							break;
					}
				}
	
				// The entire spine is coincident:
				if (SCPyAxis .equals (Vector3 .Zero))
					SCPyAxis .set (0, 1, 0);
	
				// The entire spine is collinear:
				if (SCPzAxis .equals (Vector3 .Zero))
					rotation .setFromToVec (Vector3 .yAxis, SCPyAxis) .multVecRot (SCPzAxis .assign (Vector3 .zAxis));
	
				// We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
				SCPxAxis .assign (SCPyAxis) .cross (SCPzAxis);

				// Get first spine
				var s = firstSpine;

				rotations [0] .set (SCPxAxis .x, SCPxAxis .y, SCPxAxis .z, 0,
				                    SCPyAxis .x, SCPyAxis .y, SCPyAxis .z, 0,
				                    SCPzAxis .x, SCPzAxis .y, SCPzAxis .z, 0,
				                    s .x,        s .y,        s .z,        1);
	
				// For all points other than the first or last:
	
				SCPyAxisPrevious .assign (SCPyAxis);
				SCPzAxisPrevious .assign (SCPzAxis);
	
				for (var i = 1, length = numSpines - 1; i < length; ++ i)
				{
					var s = spine [i] .getValue ();

					SCPyAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i - 1] .getValue ()) .normalize ();
					SCPzAxis .assign (spine [i + 1] .getValue ()) .subtract (s)
					         .cross (vector3 .assign (spine [i - 1] .getValue ()) .subtract (s))
					         .normalize ();

					// g.
					if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
						SCPzAxis .negate ();
	
					// The two points used in computing the Y-axis are coincident.
					if (SCPyAxis .equals (Vector3 .Zero))
						SCPyAxis .assign (SCPyAxisPrevious);
					else
						SCPyAxisPrevious .assign (SCPyAxis);
	
					// The three points used in computing the Z-axis are collinear.
					if (SCPzAxis .equals (Vector3 .Zero))
						SCPzAxis .assign (SCPzAxisPrevious);
					else
						SCPzAxisPrevious .assign (SCPzAxis);
	
					// We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
					SCPxAxis .assign (SCPyAxis) .cross (SCPzAxis);

					rotations [i] .set (SCPxAxis .x, SCPxAxis .y, SCPxAxis .z, 0,
					                    SCPyAxis .x, SCPyAxis .y, SCPyAxis .z, 0,
					                    SCPzAxis .x, SCPzAxis .y, SCPzAxis .z, 0,
					                    s .x,        s .y,        s .z,        1);
				}
	
				// SCP for the last point
				if (closedSpine)
				{
					// The SCPs for the first and last points are the same.
					rotations [numSpines - 1] .assign (rotations [0]);
				}
				else
				{
					var s = lastSpine;

					SCPyAxis .assign (s) .subtract (spine [numSpines - 2] .getValue ()) .normalize ();
					
					if (numSpines > 2)
					{
						SCPzAxis .assign (s) .subtract (spine [numSpines - 2] .getValue ())
						         .cross (vector3 .assign (spine [numSpines - 3] .getValue ()) .subtract (spine [numSpines - 2] .getValue ()))
						         .normalize ();
					}
	
					// g.
					if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
						SCPzAxis .negate ();
	
					// The two points used in computing the Y-axis are coincident.
					if (SCPyAxis .equals (Vector3 .Zero))
						SCPyAxis .assign (SCPyAxisPrevious);
	
					// The three points used in computing the Z-axis are collinear.
					if (SCPzAxis .equals (Vector3 .Zero))
						SCPzAxis .assign (SCPzAxisPrevious);
	
					// We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
					SCPxAxis .assign (SCPyAxis) .cross (SCPzAxis);
	
					rotations [numSpines - 1] .set (SCPxAxis .x, SCPxAxis .y, SCPxAxis .z, 0,
					                                SCPyAxis .x, SCPyAxis .y, SCPyAxis .z, 0,
					                                SCPzAxis .x, SCPzAxis .y, SCPzAxis .z, 0,
					                                s .x,        s .y,        s .z,        1);
				}
	
				return rotations;
			};
		})(),
		build: (function ()
		{
			var
				min     = new Vector2 (0, 0, 0),
				max     = new Vector2 (0, 0, 0),
				vector2 = new Vector2 (0, 0, 0);

			return function ()
			{
				var
					cw            = ! this .ccw_ .getValue (),
					crossSection  = this .crossSection_,
					spine         = this .spine_,
					numSpines     = spine .length,
					texCoordArray = this .getTexCoords ();
	
				if (numSpines < 2 || crossSection .length < 2)
					return;
	
				this .getMultiTexCoords () .push (texCoordArray);
	
				var crossSectionSize = crossSection .length; // This one is used only in the INDEX macro.
	
				function INDEX (n, k) { return n * crossSectionSize + k; }
	
				var
					firstSpine  = spine [0] .getValue (),
					lastSpine   = spine [numSpines - 1] .getValue (),
					closedSpine = firstSpine .equals (lastSpine) && this .getClosedOrientation ();
	
				var
					firstCrossSection  = crossSection [0] .getValue (),
					lastCrossSection   = crossSection [crossSection .length - 1] .getValue (),
					closedCrossSection = firstCrossSection .equals (lastCrossSection);
	
				// For caps calculation
	
				min .assign (crossSection [0] .getValue ());
				max .assign (crossSection [0] .getValue ());
	
				for (var k = 1, length = crossSection .length; k < length; ++ k)
				{
					min .min (crossSection [k] .getValue ());
					max .max (crossSection [k] .getValue ());
				}
	
				var
					capSize      = vector2 .assign (max) .subtract (min),
					capMax       = Math .max (capSize .x, capSize .y),
					numCapPoints = closedCrossSection ? crossSection .length - 1 : crossSection .length;
	
				// Create
	
				var
					normalIndex = [ ],
				   normals     = [ ],
					points      = this .createPoints ();
	
				for (var p = 0, length = points .length; p < length; ++ p)
					normalIndex [p] = [ ];
	
				// Build body.
	
				var
					normalArray = this .getNormals (),
					vertexArray = this .getVertices ();
	
				var
					numCrossSection_1 = crossSection .length - 1,
					numSpine_1        = numSpines - 1;
	
				var
					indexLeft  = INDEX (0, 0),
					indexRight = INDEX (0, closedCrossSection ? 0 : numCrossSection_1);
	
				for (var n = 0; n < numSpine_1; ++ n)
				{
					for (var k = 0; k < numCrossSection_1; ++ k)
					{
						var
							n1 = closedSpine && n === numSpines - 2 ? 0 : n + 1,
							k1 = closedCrossSection && k === crossSection .length - 2 ? 0 : k + 1;
	
						// k      k+1
						//
						// p4 ----- p3   n+1
						//  |     / |
						//  |   /   |
						//  | /     |
						// p1 ----- p2   n
	
						var
							i1 = INDEX (n,  k),
							i2 = INDEX (n,  k1),
							i3 = INDEX (n1, k1),
							i4 = INDEX (n1, k),
							p1 = points [i1],
							p2 = points [i2],
							p3 = points [i3],
							p4 = points [i4],
							l1 = p2 .distance (p3) >= 1e-7,
							l2 = p4 .distance (p1) >= 1e-7;
	
						if (cw)
						{
							var
								normal1 = Triangle3 .normal (p3, p2, p1, new Vector3 (0, 0, 0)),
								normal2 = Triangle3 .normal (p4, p3, p1, new Vector3 (0, 0, 0));
						}
						else
						{
							var
								normal1 = Triangle3 .normal (p1, p2, p3, new Vector3 (0, 0, 0)),
								normal2 = Triangle3 .normal (p1, p3, p4, new Vector3 (0, 0, 0));
						}
	
						// Merge points on the left and right side if spine is coincident for better normal generation.
			
						if (k == 0)
						{
							if (l2)
								indexLeft = i1;
							else
							{
								i1 = indexLeft;
								p1 = points [i1];
							}
						}
			
						if (k == crossSection .length - 2)
						{
							if (l1)
								indexRight = i2;
							else
							{
								i3 = indexRight;
								p3 = points [i3];
							}
						}
	
						// If there are coincident spine points then one length can be zero.
	
						// Triangle one
	
						if (l1)
						{
							// p1
							if (l2)
								texCoordArray .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
							else
							{
								// Cone case: ((texCoord1 + texCoord4) / 2)
								var y = (n / numSpine_1 + (n + 1) / numSpine_1) / 2;
	
								texCoordArray .push (k / numCrossSection_1, y, 0, 1);
							}
	
							normalIndex [i1] .push (normals .length);
							normals .push (normal1);
							vertexArray .push (p1 .x, p1 .y, p1 .z, 1);
		
							// p2
							texCoordArray .push ((k + 1) / numCrossSection_1, n / numSpine_1, 0, 1);
							normalIndex [i2] .push (normals .length);
							normals .push (normal1);
							vertexArray .push (p2 .x, p2 .y, p2 .z, 1);
		
							// p3
							texCoordArray .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
							normalIndex [i3] .push (normals .length);
							normals .push (normal1);
							vertexArray .push (p3 .x, p3 .y, p3 .z, 1);
						}
	
						// Triangle two
	
						if (l2)
						{
							// p1
							texCoordArray .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
							normalIndex [i1] .push (normals .length);
							normals .push (normal2);
							vertexArray .push (p1 .x, p1 .y, p1 .z, 1);
		
							// p3
							if (l1)
								texCoordArray .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
							else
							{
								// Cone case: ((texCoord3 + texCoord2) / 2)
								var y = ((n + 1) / numSpine_1 + n / numSpine_1) / 2;
	
								texCoordArray .push ((k + 1) / numCrossSection_1, y, 0, 1);
							}
	
							normalIndex [i3] .push (normals .length);
							normals .push (normal2);
							vertexArray .push (p3 .x, p3 .y, p3 .z, 1);
		
							// p4
							texCoordArray .push (k / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
							normalIndex [i4] .push (normals .length);
							normals .push (normal2);
							vertexArray .push (p4 .x, p4 .y, p4 .z, 1);
						}
					}
				}
	
				// Refine body normals and add them.
	
				normals = this .refineNormals (normalIndex, normals, this .creaseAngle_ .getValue ());
	
				for (var i = 0; i < normals .length; ++ i)
				{
					var normal = normals [i];
	
					normalArray .push (normal .x, normal .y, normal .z);
				}
				// Build caps
	
				if (capMax && crossSection .length > 2)
				{
					if (this .beginCap_ .getValue ())
					{
						var
							j         = 0, // spine
							polygon   = [ ],
							triangles = [ ];
	
						for (var k = 0; k < numCapPoints; ++ k)
						{
							var
								index = INDEX (j, numCapPoints - 1 - k),
								point = points [index] .copy ();
	
							point .index    = index;
							point .texCoord = Vector2 .subtract (crossSection [numCapPoints - 1 - k] .getValue (), min) .divide (capMax);
							polygon .push (point);
						}
	
						if (this .convex_ .getValue ())
							Triangle3 .triangulateConvexPolygon (polygon, triangles);
	
						else
							Triangle3 .triangulatePolygon (polygon, triangles);
	
						if (triangles .length >= 3)
						{
							var normal = Triangle3 .normal (points [triangles [0] .index],
							                                points [triangles [1] .index],
							                                points [triangles [2] .index],
							                                new Vector3 (0, 0, 0));
	
							if (cw)
								normal .negate ();
	
							this .addCap (texCoordArray, normal, points, triangles);
						}
					}
	
					if (this .endCap_ .getValue ())
					{
						var
							j         = numSpines - 1, // spine
							polygon   = [ ],
							triangles = [ ];
	
						for (var k = 0; k < numCapPoints; ++ k)
						{
							var
								index = INDEX (j, k),
								point = points [index] .copy ();
	
							point .index    = index;
							point .texCoord = Vector2 .subtract (crossSection [k] .getValue (), min) .divide (capMax);
							polygon .push (point);
						}
	
						if (this .convex_ .getValue ())
							Triangle3 .triangulateConvexPolygon (polygon, triangles);
	
						else
							Triangle3 .triangulatePolygon (polygon, triangles);
	
						if (triangles .length >= 3)
						{
							var normal = Triangle3 .normal (points [triangles [0] .index],
							                                points [triangles [1] .index],
							                                points [triangles [2] .index],
							                                new Vector3 (0, 0, 0));
	
							if (cw)
								normal .negate ();
	
							this .addCap (texCoordArray, normal, points, triangles);
						}
					}
				}
	
				this .setSolid (this .solid_ .getValue ());
				this .setCCW (this .ccw_ .getValue ());
			};
		})(),
		addCap: function (texCoordArray, normal, vertices, triangles)
		{
			var
				normalArray = this .getNormals (),
				vertexArray = this .getVertices ();

			for (var i = 0; i < triangles .length; i += 3)
			{
				var
					p0 = vertices [triangles [i]     .index],
					p1 = vertices [triangles [i + 1] .index],
					p2 = vertices [triangles [i + 2] .index],
					t0 = triangles [i]     .texCoord,
					t1 = triangles [i + 1] .texCoord,
					t2 = triangles [i + 2] .texCoord;

				texCoordArray .push (t0 .x, t0 .y, 0, 1);
				texCoordArray .push (t1 .x, t1 .y, 0, 1);
				texCoordArray .push (t2 .x, t2 .y, 0, 1);

				normalArray .push (normal .x, normal .y, normal .z,
				                   normal .x, normal .y, normal .z,
				                   normal .x, normal .y, normal .z);

				vertexArray .push (p0 .x, p0 .y, p0 .z, 1,
				                   p1 .x, p1 .y, p1 .z, 1,
				                   p2 .x, p2 .y, p2 .z, 1);
			}
		},
	});

	return Extrusion;
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Geometry3D/Extrusion",
	"x_ite/Components/NURBS/X3DParametricGeometryNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
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
		fieldDefinitions: new FieldDefinitionArray ([
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

			this .crossSectionCurve_ .addInterest ("set_crossSectionCurve__", this);
			this .trajectoryCurve_   .addInterest ("set_trajectoryCurve__",   this);

			var extrusion = this .extrusion;

			extrusion .beginCap_     = false;
			extrusion .endCap_       = false;
			extrusion .solid_        = true;
			extrusion .ccw_          = true;
			extrusion .convex_       = true;
			extrusion .creaseAngle_  = Math .PI;

			extrusion .setup ();

			extrusion .crossSection_ .setTainted (true);
			extrusion .spine_        .setTainted (true);

			this .set_crossSectionCurve__ ();
			this .set_trajectoryCurve__ ();
		},
		set_crossSectionCurve__: function ()
		{
			if (this .crossSectionCurveNode)
				this .crossSectionCurveNode .removeInterest ("requestRebuild", this);

			this .crossSectionCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this .crossSectionCurve_);

			if (this .crossSectionCurveNode)
				this .crossSectionCurveNode .addInterest ("requestRebuild", this);
		},
		set_trajectoryCurve__: function ()
		{
			if (this .trajectoryCurveNode)
				this .trajectoryCurveNode .rebuild_ .removeInterest ("requestRebuild", this);

			this .trajectoryCurveNode = X3DCast (X3DConstants .NurbsCurve, this .trajectoryCurve_);

			if (this .trajectoryCurveNode)
				this .trajectoryCurveNode .rebuild_ .addInterest ("requestRebuild", this);
		},
		build: function ()
		{
			if (! this .crossSectionCurveNode)
				return;
		
			if (! this .trajectoryCurveNode)
				return;

			var extrusion = this .extrusion;

			extrusion .crossSection_ = this .crossSectionCurveNode .tessellate ();
			extrusion .spine_        = this .trajectoryCurveNode   .tessellate ();

			extrusion .rebuild ();

			this .getColors ()    .assign (extrusion .getColors ());
			this .getTexCoords () .assign (extrusion .getTexCoords ());
			this .getNormals ()   .assign (extrusion .getNormals ());
			this .getVertices ()  .assign (extrusion .getVertices ());

			this .getMultiTexCoords () .push (this .getTexCoords ());

			if (! this .ccw_ .getValue ())
			{
				var normals = this .getNormals ();

				for (var i = 0, length = normals .length; i < length; ++ i)
					normals [i] = -normals [i];
			}

			this .setSolid (this .solid_ .getValue ());
			this .setCCW (this .ccw_ .getValue ());
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Geometry3D/Extrusion",
	"x_ite/Components/NURBS/X3DParametricGeometryNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
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
		fieldDefinitions: new FieldDefinitionArray ([
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

			this .profileCurve_    .addInterest ("set_profileCurve__",    this);
			this .trajectoryCurve_ .addInterest ("set_trajectoryCurve__", this);

			var extrusion = this .extrusion;

			extrusion .beginCap_     = false;
			extrusion .endCap_       = false;
			extrusion .solid_        = true;
			extrusion .ccw_          = true;
			extrusion .convex_       = true;
			extrusion .creaseAngle_  = Math .PI;

			extrusion .setup ();

			extrusion .crossSection_ .setTainted (true);
			extrusion .spine_        .setTainted (true);

			this .set_profileCurve__ ();
			this .set_trajectoryCurve__ ();
		},
		set_profileCurve__: function ()
		{
			if (this .profileCurveNode)
				this .profileCurveNode .removeInterest ("requestRebuild", this);

			this .profileCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this .profileCurve_);

			if (this .profileCurveNode)
				this .profileCurveNode .addInterest ("requestRebuild", this);
		},
		set_trajectoryCurve__: function ()
		{
			if (this .trajectoryCurveNode)
				this .trajectoryCurveNode .removeInterest ("requestRebuild", this);

			this .trajectoryCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this .trajectoryCurve_);

			if (this .trajectoryCurveNode)
				this .trajectoryCurveNode .addInterest ("requestRebuild", this);
		},
		build: function ()
		{
			if (! this .profileCurveNode)
				return;
		
			if (! this .trajectoryCurveNode)
				return;

			var extrusion = this .extrusion;

			extrusion .crossSection_ = this .profileCurveNode    .tessellate ();
			extrusion .spine_        = this .trajectoryCurveNode .tessellate (true);

			extrusion .rebuild ();

			this .getColors ()    .assign (extrusion .getColors ());
			this .getTexCoords () .assign (extrusion .getTexCoords ());
			this .getNormals ()   .assign (extrusion .getNormals ());
			this .getVertices ()  .assign (extrusion .getVertices ());

			this .getMultiTexCoords () .push (this .getTexCoords ());

			if (! this .ccw_ .getValue ())
			{
				var normals = this .getNormals ();

				for (var i = 0, length = normals .length; i < length; ++ i)
					normals [i] = -normals [i];
			}

			this .setSolid (this .solid_ .getValue ());
			this .setCCW (this .ccw_ .getValue ());
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
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
	}

	NurbsTextureCoordinate .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: NurbsTextureCoordinate,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",       new Fields .SFInt32 (3)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",       new Fields .SFInt32 (3)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",   new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",   new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",        new Fields .MFDouble ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",        new Fields .MFDouble ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFFloat ()),
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
		getControlPoints: function ()
		{
			var constrolPoints = [ ];

			for (var u = 0, uDimension = this .uDimension_ .getValue (); u < uDimension; ++ u)
			{
				var cp = [ ];

				constrolPoints .push (cp);

				for (var v = 0, vDimension = this .vDimension_ .getValue (); v < vDimension; ++ v)
				{
					var point = this .controlPoint_ [v * uDimension + u];

					cp .push (new Vector4 (point .x, point .y, 0, 1));
				}
			}

			return constrolPoints;
		},
		isValid: function ()
		{
			if (this .uOrder_ .getValue () < 2)
				return false;
		
			if (this .vOrder_ .getValue () < 2)
				return false;
		
			if (this .uDimension_ .getValue () < this .uOrder_ .getValue ())
				return false;
		
			if (this .vDimension_ .getValue () < this .vOrder_ .getValue ())
				return false;

			if (this .controlPoint_ .length !== this .uDimension_ .getValue () * this .vDimension_ .getValue ())
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/NURBS/X3DNurbsSurfaceGeometryNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNurbsSurfaceGeometryNode, 
          X3DConstants)
{
"use strict";

	function NurbsTrimmedSurface (executionContext)
	{
		X3DNurbsSurfaceGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .NurbsTrimmedSurface);
	}

	NurbsTrimmedSurface .prototype = Object .assign (Object .create (X3DNurbsSurfaceGeometryNode .prototype),
	{
		constructor: NurbsTrimmedSurface,
		fieldDefinitions: new FieldDefinitionArray ([
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
	});

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


require ([
	"x_ite/Configuration/SupportedNodes",
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
function (SupportedNodes,
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

	var Types =
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
	};

	var AbstractTypes =
	{
		X3DNurbsControlCurveNode:    X3DNurbsControlCurveNode,
		X3DNurbsSurfaceGeometryNode: X3DNurbsSurfaceGeometryNode,
		X3DParametricGeometryNode:   X3DParametricGeometryNode,
	};

	for (var typeName in Types)
		SupportedNodes .addType (typeName, Types [typeName]); 

	for (var typeName in AbstractTypes)
		SupportedNodes .addAbstractType (typeName, AbstractTypes [typeName]); 

	return Types;
});


define("components/nurbs", function(){});


}());

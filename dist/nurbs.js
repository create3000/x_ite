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


define ('x_ite/Components/NURBS/X3DParametricGeometryNode',[
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DGeometryNode, 
          X3DConstants)
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


define ('x_ite/Components/NURBS/X3DNurbsSurfaceGeometryNode',[
	"x_ite/Components/NURBS/X3DParametricGeometryNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DParametricGeometryNode, 
          X3DConstants)
{
"use strict";

	function X3DNurbsSurfaceGeometryNode (executionContext)
	{
		X3DParametricGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .X3DNurbsSurfaceGeometryNode);
	}

	X3DNurbsSurfaceGeometryNode .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
	{
		constructor: X3DNurbsSurfaceGeometryNode,
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
			new X3DFieldDefinition (X3DConstants .inputOutput,    "uTessellation", new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "vTessellation", new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "uClosed",       new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "vClosed",       new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",         new Fields .SFBool (true)),
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


require ([
	"x_ite/Configuration/SupportedNodes",
	"x_ite/Components/NURBS/NurbsPatchSurface",
],
function (SupportedNodes,
          NurbsPatchSurface)
{
"use strict";

	var NURBS =
	{
		NurbsPatchSurface: NurbsPatchSurface,
	};

	function createInstance (executionContext) { return new this (executionContext); }

	for (var typeName in NURBS)
	{
		var interfaceDeclaration = NURBS [typeName];

		interfaceDeclaration .createInstance = createInstance .bind (interfaceDeclaration);

		SupportedNodes [typeName]                 = interfaceDeclaration; 
		SupportedNodes [typeName .toUpperCase ()] = interfaceDeclaration; 
	}

	return NURBS;
});


define("components/nurbs", function(){});


}());

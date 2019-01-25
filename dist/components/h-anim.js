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


define ('x_ite/Components/H-Anim/HAnimDisplacer',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DGeometricPropertyNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometricPropertyNode, 
          X3DConstants)
{
"use strict";

	function HAnimDisplacer (executionContext)
	{
		X3DGeometricPropertyNode .call (this, executionContext);

		this .addType (X3DConstants .HAnimDisplacer);
	}

	HAnimDisplacer .prototype = Object .assign (Object .create (X3DGeometricPropertyNode .prototype),
	{
		constructor: HAnimDisplacer,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "name",          new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "coordIndex",    new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "weight",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "displacements", new Fields .MFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "HAnimDisplacer";
		},
		getComponentName: function ()
		{
			return "H-Anim";
		},
		getContainerField: function ()
		{
			return "displacers";
		},
	});

	return HAnimDisplacer;
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


define ('x_ite/Components/H-Anim/HAnimHumanoid',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Grouping/Group",
	"x_ite/Components/Grouping/Transform",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode, 
          Group, 
          Transform, 
          X3DBoundedObject, 
          TraverseType, 
          X3DConstants,
          X3DCast,
          Matrix4,
          Vector3)
{
"use strict";

	function HAnimHumanoid (executionContext)
	{
		X3DChildNode     .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .HAnimHumanoid);

		this .viewpointsNode = new Group (executionContext);
		this .skeletonNode   = new Group (executionContext);
		this .skinNode       = new Group (executionContext);
		this .transformNode  = new Transform (executionContext);
		this .jointNodes     = [ ];
		this .skinNormalNode = null;
		this .skinCoordNode  = null;
		this .normalNode     = null;
		this .coordNode      = null;

		this .getBBox = this .transformNode .getBBox  .bind (this .transformNode);
	}

	HAnimHumanoid .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: HAnimHumanoid,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "version",          new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "info",             new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "viewpoints",       new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "sites",            new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "joints",           new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "segments",         new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "skeleton",         new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "skinNormal",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "skin",             new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "HAnimHumanoid";
		},
		getComponentName: function ()
		{
			return "H-Anim";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			// Groups

			this .viewpointsNode .setAllowedTypes (X3DConstants .HAnimSite);
			this .skeletonNode   .setAllowedTypes (X3DConstants .HAnimJoint, X3DConstants .HAnimSite);

			this .viewpoints_ .addFieldInterest (this .viewpointsNode .children_);
			this .skeleton_   .addFieldInterest (this .skeletonNode   .children_);
			this .skin_       .addFieldInterest (this .skinNode       .children_);

			this .viewpointsNode .children_ = this .viewpoints_;
			this .skeletonNode   .children_ = this .skeleton_;
			this .skinNode       .children_ = this .skin_;

			this .viewpointsNode .setPrivate (true);
			this .skeletonNode   .setPrivate (true);
			this .skinNode       .setPrivate (true);

			// Transform

			this .translation_      .addFieldInterest (this .transformNode .translation_);
			this .rotation_         .addFieldInterest (this .transformNode .rotation_);
			this .scale_            .addFieldInterest (this .transformNode .scale_);
			this .scaleOrientation_ .addFieldInterest (this .transformNode .scaleOrientation_);
			this .center_           .addFieldInterest (this .transformNode .center_);
			this .bboxSize_         .addFieldInterest (this .transformNode .bboxSize_);
			this .bboxCenter_       .addFieldInterest (this .transformNode .bboxCenter_);

			this .transformNode .translation_      = this .translation_;
			this .transformNode .rotation_         = this .rotation_;
			this .transformNode .scale_            = this .scale_;
			this .transformNode .scaleOrientation_ = this .scaleOrientation_;
			this .transformNode .center_           = this .center_;
			this .transformNode .bboxSize_         = this .bboxSize_;
			this .transformNode .bboxCenter_       = this .bboxCenter_;
			this .transformNode .children_         = [ this .viewpointsNode, this .skeletonNode, this .skinNode ];

			this .transformNode .isCameraObject_ .addFieldInterest (this .isCameraObject_);

			// Setup

			this .viewpointsNode .setup ();
			this .skeletonNode   .setup ();
			this .skinNode       .setup ();
			this .transformNode  .setup ();

			// Skinning

			this .joints_     .addInterest ("set_joints__",     this);
			this .skinNormal_ .addInterest ("set_skinNormal__", this);
			this .skinCoord_  .addInterest ("set_skinCoord__",  this);

			this .set_joints__ ();
			this .set_skinNormal__ ();
			this .set_skinCoord__ ();
		},
		set_joints__: function ()
		{
			var jointNodes = this .jointNodes;

			jointNodes .length = 0;

			for (var i = 0, length = this .joints_ .length; i < length; ++ i)
			{
				var jointNode = X3DCast (X3DConstants .HAnimJoint, this .joints_ [i]);

				if (jointNode)
					jointNodes .push (jointNode);
			}
		},
		set_skinNormal__: function ()
		{
			this .normalNode = null;

			this .skinNormalNode = X3DCast (X3DConstants .X3DNormalNode, this .skinNormal_);

			if (this .skinNormalNode)
				this .normalNode = this .skinNormalNode .flatCopy ();
		},
		set_skinCoord__: function ()
		{
			this .coordNode = null;

			this .skinCoordNode = X3DCast (X3DConstants .X3DCoordinateNode, this .skinCoord_);

			if (this .skinCoordNode)
				this .coordNode = this .skinCoordNode .flatCopy ();
		},
		traverse: function (type, renderObject)
		{
			this .transformNode .traverse (type, renderObject);
			this .skinning (type, renderObject);
		},
		skinning: (function ()
		{
			var
				invModelMatrix = new Matrix4 (),
				vector         = new Vector3 (0, 0, 0),
				point          = new Vector3 (0, 0, 0);

			return function (type, renderObject)
			{
				try
				{
					if (type !== TraverseType .CAMERA)
						return;
	
					if (! this .skinCoordNode)
						return;
	
					var
						jointNodes     = this .jointNodes,
						skinNormalNode = this .skinNormalNode,
						skinCoordNode  = this .skinCoordNode,
						normalNode     = this .normalNode,
						coordNode      = this .coordNode;

					invModelMatrix .assign (this .transformNode .getMatrix ()) .multRight (renderObject .getModelViewMatrix () .get ()) .inverse ();

					for (var j = 0, jointNodesLength = jointNodes .length; j < jointNodesLength; ++ j)
					{
						var
							jointNode            = jointNodes [j],
							skinCoordIndexLength = jointNode .skinCoordIndex_ .length;

						if (skinCoordIndexLength === 0)
							continue;

						var
							jointMatrix    = jointNode .getModelMatrix () .multRight (invModelMatrix),
							normalMatrix   = jointMatrix .submatrix .transpose () .inverse (),
							skinCoordIndex = jointNode .skinCoordIndex_ .getValue ();

						for (var i = 0; i < skinCoordIndexLength; ++ i)
						{
							var index = skinCoordIndex [i];

							if (skinNormalNode)
								skinNormalNode .set1Vector (index, normalMatrix .multVecMatrix (normalNode .get1Vector (index, vector)));

							skinCoordNode .set1Point (index, jointMatrix .multVecMatrix (coordNode .get1Point (index, point)));
						}
					}
				}
				catch (error)
				{
					console .log (error);
				}
			};
		})(),
	});

	return HAnimHumanoid;
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


define ('x_ite/Components/H-Anim/HAnimJoint',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Components/Grouping/X3DTransformNode",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode, 
          X3DTransformNode, 
          TraverseType, 
          X3DConstants, 
          Matrix4)
{
"use strict";

	function HAnimJoint (executionContext)
	{
		X3DTransformNode .call (this, executionContext);

		this .addType (X3DConstants .HAnimJoint);

		this .setAllowedTypes (X3DConstants .HAnimJoint,
		                       X3DConstants .HAnimSegment,
		                       X3DConstants .HAnimSite);

		this .modelMatrix = new Matrix4 ();
	}

	HAnimJoint .prototype = Object .assign (Object .create (X3DTransformNode .prototype),
	{
		constructor: HAnimJoint,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "llimit",           new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "ulimit",           new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "limitOrientation", new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "stiffness",        new Fields .MFFloat (0, 0, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoordIndex",   new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoordWeight",  new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "displacers",       new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "HAnimJoint";
		},
		getComponentName: function ()
		{
			return "H-Anim";
		},
		getContainerField: function ()
		{
			return "children";
		},
		setCameraObject: function (value)
		{
			X3DTransformNode .prototype .setCameraObject .call (this, value || Boolean (this .skinCoordIndex_ .length));
		},
		getModelMatrix: function ()
		{
			return this .modelMatrix;
		},
		traverse: function (type, renderObject)
		{
			if (type === TraverseType .CAMERA && this .skinCoordIndex_ .length)
				this .modelMatrix .assign (this .getMatrix ()) .multRight (renderObject .getModelViewMatrix () .get ());

			X3DTransformNode .prototype .traverse .call (this, type, renderObject);
		},
		groupTraverse: function (type, renderObject)
		{
			if (type === TraverseType .CAMERA && this .skinCoordIndex_ .length)
				this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());

			X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
		},
	});

	return HAnimJoint;
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


define ('x_ite/Components/H-Anim/HAnimSegment',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode, 
          X3DConstants)
{
"use strict";

	function HAnimSegment (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .HAnimSegment);
	}

	HAnimSegment .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
	{
		constructor: HAnimSegment,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "mass",             new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "centerOfMass",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "momentsOfInertia", new Fields .MFFloat (0, 0, 0, 0, 0, 0, 0, 0, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "displacers",       new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",            new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "HAnimSegment";
		},
		getComponentName: function ()
		{
			return "H-Anim";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return HAnimSegment;
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


define ('x_ite/Components/H-Anim/HAnimSite',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DTransformNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTransformNode, 
          X3DConstants)
{
"use strict";

	function HAnimSite (executionContext)
	{
		X3DTransformNode .call (this, executionContext);

		this .addType (X3DConstants .HAnimSite);
	}

	HAnimSite .prototype = Object .assign (Object .create (X3DTransformNode .prototype),
	{
		constructor: HAnimSite,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "HAnimSite";
		},
		getComponentName: function ()
		{
			return "H-Anim";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return HAnimSite;
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
	"x_ite/Configuration/SupportedNodes",
	"x_ite/Components/H-Anim/HAnimDisplacer",
	"x_ite/Components/H-Anim/HAnimHumanoid",
	"x_ite/Components/H-Anim/HAnimJoint",
	"x_ite/Components/H-Anim/HAnimSegment",
	"x_ite/Components/H-Anim/HAnimSite",
],
function (SupportedNodes,
          HAnimDisplacer,
          HAnimHumanoid,
          HAnimJoint,
          HAnimSegment,
          HAnimSite)
{
"use strict";

	var Types =
	{
		HAnimDisplacer: HAnimDisplacer,
		HAnimHumanoid:  HAnimHumanoid,
		HAnimJoint:     HAnimJoint,
		HAnimSegment:   HAnimSegment,
		HAnimSite:      HAnimSite,
	};

	var AbstractTypes =
	{
	};
	
	for (var typeName in Types)
		SupportedNodes .addType (typeName, Types [typeName]); 

	for (var typeName in AbstractTypes)
		SupportedNodes .addAbstractType (typeName, AbstractTypes [typeName]); 

	return Types;
});



}());

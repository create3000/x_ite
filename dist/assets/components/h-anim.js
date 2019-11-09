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

		this .displacements_ .setUnit ("length");
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

		this .translation_ .setUnit ("length");
		this .center_      .setUnit ("length");
		this .bboxSize_    .setUnit ("length");
		this .bboxCenter_  .setUnit ("length");

		this .viewpointsNode = new Group (executionContext);
		this .skeletonNode   = new Group (executionContext);
		this .skinNode       = new Group (executionContext);
		this .transformNode  = new Transform (executionContext);
		this .jointNodes     = [ ];
		this .skinNormalNode = null;
		this .skinCoordNode  = null;
		this .restNormalNode = null;
		this .restCoordNode  = null;
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
			new X3DFieldDefinition (X3DConstants .inputOutput,    "motions",          new Fields .MFNode ()),
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

			this .transformNode .isCameraObject_   .addFieldInterest (this .isCameraObject_);
			this .transformNode .isPickableObject_ .addFieldInterest (this .isPickableObject_);

			// Setup

			this .viewpointsNode .setup ();
			this .skeletonNode   .setup ();
			this .skinNode       .setup ();
			this .transformNode  .setup ();

			this .setCameraObject   (this .transformNode .getCameraObject ());
			this .setPickableObject (this .transformNode .getPickableObject ());

			// Skinning

			this .joints_     .addInterest ("set_joints__",     this);
			this .skinNormal_ .addInterest ("set_skinNormal__", this);
			this .skinCoord_  .addInterest ("set_skinCoord__",  this);

			this .set_joints__ ();
			this .set_skinNormal__ ();
			this .set_skinCoord__ ();
		},
		getBBox: function (bbox)
		{
			return this .transformNode .getBBox (bbox);
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
			this .restNormalNode = null;

			this .skinNormalNode = X3DCast (X3DConstants .X3DNormalNode, this .skinNormal_);

			if (this .skinNormalNode)
				this .restNormalNode = this .skinNormalNode .flatCopy ();
		},
		set_skinCoord__: function ()
		{
			this .restCoordNode = null;

			this .skinCoordNode = X3DCast (X3DConstants .X3DCoordinateNode, this .skinCoord_);

			if (this .skinCoordNode)
				this .restCoordNode = this .skinCoordNode .flatCopy ();
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
				rest           = new Vector3 (0, 0, 0),
				skin           = new Vector3 (0, 0, 0),
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
						restNormalNode = this .restNormalNode,
						restCoordNode  = this .restCoordNode;

					// Reset skin normals and coords.

					if (skinNormalNode)
						skinNormalNode .vector_ .assign (restNormalNode .vector_);

					skinCoordNode .point_ .assign (restCoordNode .point_);

					// Determine inverse model matrix of humanoid.

					invModelMatrix .assign (this .transformNode .getMatrix ()) .multRight (renderObject .getModelViewMatrix () .get ()) .inverse ();

					// Apply joint transformations.

					for (var j = 0, jointNodesLength = jointNodes .length; j < jointNodesLength; ++ j)
					{
						var
							jointNode            = jointNodes [j],
							skinCoordIndexLength = jointNode .skinCoordIndex_ .length;

						if (skinCoordIndexLength === 0)
							continue;

						var
							jointMatrix    = jointNode .getModelMatrix () .multRight (invModelMatrix),
							displacerNodes = jointNode .getDisplacers ();

						for (var d = 0, displacerNodesLength = displacerNodes .length; d < displacerNodesLength; ++ d)
						{
							var
								displacerNode       = displacerNodes [d],
								coordIndex          = displacerNode .coordIndex_ .getValue (),
								coordIndexLength    = displacerNode .coordIndex_ .length,
								weight              = displacerNode .weight_ .getValue (),
								displacements       = displacerNode .displacements_ .getValue (),
								displacementsLength = displacerNode .displacements_ .length;

							for (var i = 0; i < coordIndexLength; ++ i)
							{
								var
									i3           = i * 3,
									index        = coordIndex [i],
									displacement = i < displacementsLength ? point .set (displacements [i3], displacements [i3 + 1], displacements [i3 + 2]) : point .assign (Vector3 .Zero);

								skinCoordNode .get1Point (index, skin);
								jointMatrix .multDirMatrix (displacement) .multiply (weight) .add (skin);
								skinCoordNode .set1Point (index, displacement);
							}
						}

						var
							normalMatrix          = skinNormalNode ? jointMatrix .submatrix .transpose () .inverse () : null,
							skinCoordIndex        = jointNode .skinCoordIndex_ .getValue (),
							skinCoordWeight       = jointNode .skinCoordWeight_ .getValue (),
							skinCoordWeightLength = jointNode .skinCoordWeight_ .length;

						for (var i = 0; i < skinCoordIndexLength; ++ i)
						{
							var
								index  = skinCoordIndex [i],
								weight = i < skinCoordWeightLength ? skinCoordWeight [i] : 1;

							if (skinNormalNode)
							{
								rest .assign (restNormalNode .get1Vector (index, vector));
								skinNormalNode .get1Vector (index, skin);
								normalMatrix .multVecMatrix (vector) .subtract (rest) .multiply (weight) .add (skin);
								skinNormalNode .set1Vector (index, vector);
								// Should the normals be normalzed at end, or let it the shader do?
							}

							//skin += (rest * J - rest) * weight
							rest .assign (restCoordNode .get1Point (index, point));
							skinCoordNode .get1Point (index, skin);
							jointMatrix .multVecMatrix (point) .subtract (rest) .multiply (weight) .add (skin);
							skinCoordNode .set1Point (index, point);
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
	"x_ite/Bits/X3DCast",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DTransformNode,
          TraverseType,
          X3DConstants,
          X3DCast,
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

		this .displacerNodes = [ ];
		this .modelMatrix    = new Matrix4 ();
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
		initialize: function ()
		{
			X3DTransformNode .prototype .initialize .call (this);

			this .displacers_ .addInterest ("set_displacers__", this);

			this .set_displacers__ ();
		},
		setCameraObject: function (value)
		{
			X3DTransformNode .prototype .setCameraObject .call (this, value || !! this .skinCoordIndex_ .length);
		},
		getModelMatrix: function ()
		{
			return this .modelMatrix;
		},
		getDisplacers: function ()
		{
			return this .displacerNodes;
		},
		set_displacers__: function ()
		{
			var displacerNodes = this .displacerNodes;

			displacerNodes .length = 0;

			for (var i = 0, length = this .displacers_ .length; i < length; ++ i)
			{
				var displacerNode = X3DCast (X3DConstants .HAnimDisplacer, this .displacers_ [i]);

				if (displacerNode)
					displacerNodes .push (displacerNode);
			}
		},
		getTraverse: (function ()
		{
			var base = X3DTransformNode .prototype .getTraverse ();

			function traverse (type, renderObject)
			{
				if (type === TraverseType .CAMERA)
					this .modelMatrix .assign (this .getMatrix ()) .multRight (renderObject .getModelViewMatrix () .get ());

				base .call (this, type, renderObject);
			}

			return function ()
			{
				if (this .skinCoordIndex_ .length)
					return traverse;

				return base;
			};
		})(),
		getGroupTraverse: (function ()
		{
			var base = X3DTransformNode .prototype .getGroupTraverse ();

			function traverse (type, renderObject)
			{
				if (type === TraverseType .CAMERA)
					this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());

				base .call (this, type, renderObject);
			}

			return function ()
			{
				if (this .skinCoordIndex_ .length)
					return traverse;

				return base;
			};
		})(),
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


define ('x_ite/Components/H-Anim/HAnimMotion',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DConstants)
{
"use strict";

	function HAnimMotion (executionContext)
	{
		X3DChildNode .call (this, executionContext);

		this .addType (X3DConstants .HAnimMotion);
	}

	HAnimMotion .prototype = Object .assign (Object .create (X3DChildNode .prototype),
	{
		constructor: HAnimMotion,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "description",     new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "next",            new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "previous",        new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "frameDuration",   new Fields .SFTime (0.1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "frameIncrement",  new Fields .SFInt32 (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "frameIndex",      new Fields .SFInt32 (0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "loop",            new Fields .SFBool (false)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "channels",        new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "channelsEnabled", new Fields .MFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "joints",          new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "loa",             new Fields .SFInt32 (-1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "values",          new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "cycleTime",       new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",     new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "frameCount",      new Fields .SFInt32 ()),
		]),
		getTypeName: function ()
		{
			return "HAnimMotion";
		},
		getComponentName: function ()
		{
			return "HAnim";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DChildNode .prototype .initialize .call (this);
		},
	});

	return HAnimMotion;
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

		this .mass_ .setUnit ("mass");
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
	"x_ite/Components",
	"x_ite/Components/H-Anim/HAnimDisplacer",
	"x_ite/Components/H-Anim/HAnimHumanoid",
	"x_ite/Components/H-Anim/HAnimJoint",
	"x_ite/Components/H-Anim/HAnimMotion",
	"x_ite/Components/H-Anim/HAnimSegment",
	"x_ite/Components/H-Anim/HAnimSite",
],
function (Components,
          HAnimDisplacer,
          HAnimHumanoid,
          HAnimJoint,
          HAnimMotion,
          HAnimSegment,
          HAnimSite)
{
"use strict";

	Components .addComponent ({
		name: "H-Anim",
		types:
		{
			HAnimDisplacer: HAnimDisplacer,
			HAnimHumanoid:  HAnimHumanoid,
			HAnimJoint:     HAnimJoint,
			HAnimMotion:    HAnimMotion,
			HAnimSegment:   HAnimSegment,
			HAnimSite:      HAnimSite,
		},
		abstractTypes:
		{
		},
	});
});


}());

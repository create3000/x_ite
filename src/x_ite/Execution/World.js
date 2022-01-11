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


define ([
	"x_ite/Fields/SFNode",
	"x_ite/Basic/X3DBaseNode",
	"x_ite/Components/Layering/LayerSet",
	"x_ite/Components/Layering/Layer",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
],
function (SFNode,
          X3DBaseNode,
          LayerSet,
          Layer,
          X3DCast,
          X3DConstants)
{
"use strict";

	function World (executionContext)
	{
		X3DBaseNode .call (this, executionContext);

		this .addChildObjects ("activeLayer", new SFNode (this .layer0));

		this .layerSet        = new LayerSet (executionContext);
		this .defaultLayerSet = this .layerSet;
		this .layer0          = new Layer (executionContext);
	}

	World .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
	{
		constructor: World,
		getTypeName: function ()
		{
			return "World";
		},
		initialize: function ()
		{
			X3DBaseNode .prototype .initialize .call (this);

			this .layerSet .setPrivate (true);
			this .layerSet .setup ();
			this .layerSet .setLayer0 (this .layer0);
			this .layerSet .activeLayer_ .addInterest ("set_rootNodes__", this);

			this .getExecutionContext () .getRootNodes () .addInterest ("set_rootNodes__", this);

			this .set_rootNodes__ ();

			this .layer0 .setPrivate (true);
			this .layer0 .isLayer0 (true);
			this .layer0 .setup ();

			this .set_activeLayer__ ();
		},
		getLayerSet: function ()
		{
			return this .layerSet;
		},
		getActiveLayer: function ()
		{
			return this .activeLayer_ .getValue ();
		},
		set_rootNodes__: function ()
		{
			const
				oldLayerSet = this .layerSet,
				rootNodes   = this .getExecutionContext () .getRootNodes ();

			this .layerSet          = this .defaultLayerSet;
			this .layer0 .children_ = rootNodes;

			for (const rootNode of rootNodes)
			{
				const rootLayerSet = X3DCast (X3DConstants .LayerSet, rootNode);

				if (rootLayerSet)
					this .layerSet = rootLayerSet;
			}

			this .layerSet .setLayer0 (this .layer0);

			if (this .layerSet === oldLayerSet)
				return;

			oldLayerSet    .activeLayer_ .removeInterest ("set_activeLayer__", this);
			this .layerSet .activeLayer_ .addInterest ("set_activeLayer__", this);

			this .set_activeLayer__ ();
		},
		set_activeLayer__: function ()
		{
			this .activeLayer_ = this .layerSet .getActiveLayer ();
		},
		bind: function ()
		{
			// Bind first X3DBindableNodes found in each layer.

			const worldURL = this .getExecutionContext () .getWorldURL ();

			this .layerSet .bind (new URL (worldURL, worldURL) .hash .substr (1));
		},
		traverse: function (type, renderObject)
		{
			this .layerSet .traverse (type, renderObject);
		},
	});

	return World;
});

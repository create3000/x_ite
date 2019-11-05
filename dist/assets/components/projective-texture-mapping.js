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


define ('x_ite/Components/ProjectiveTextureMapping/X3DTextureProjectorNode',[
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DChildNode,
          X3DConstants)
{
"use strict";

	function X3DTextureProjectorNode (executionContext)
	{
		X3DChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTextureProjectorNode);
	}

	X3DTextureProjectorNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
	{
		constructor: X3DTextureProjectorNode,
		initialize: function ()
		{
			X3DChildNode .prototype .initialize .call (this);
		},
	});

	return X3DTextureProjectorNode;
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


define ('x_ite/Components/ProjectiveTextureMapping/TextureProjectorPerspective',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ProjectiveTextureMapping/X3DTextureProjectorNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureProjectorNode,
          X3DConstants)
{
"use strict";

	function TextureProjectorPerspective (executionContext)
	{
		X3DTextureProjectorNode .call (this, executionContext);

		this .addType (X3DConstants .TextureProjectorPerspective);
	}

	TextureProjectorPerspective .prototype = Object .assign (Object .create (X3DTextureProjectorNode .prototype),
	{
		constructor: TextureProjectorPerspective,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "description",  new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "location",     new Fields .SFVec3f (0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "direction",    new Fields .SFVec3f (0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView" , new Fields .SFFloat (0.7854)),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "aspectRatio",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "upVector",     new Fields .SFVec3f (0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "nearDistance", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "farDistance",  new Fields .SFFloat (10)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "global",       new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "on",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "texture",      new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "TextureProjectorPerspective";
		},
		getComponentName: function ()
		{
			return "ProjectiveTextureMapping";
		},
		getContainerField: function ()
		{
			return "xxxxxxxx";
		},
		initialize: function ()
		{
			X3DTextureProjectorNode .prototype .initialize .call (this);
		},
	});

	return TextureProjectorPerspective;
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


define ('x_ite/Components/ProjectiveTextureMapping/TextureProjectorParallel',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ProjectiveTextureMapping/X3DTextureProjectorNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureProjectorNode,
          X3DConstants)
{
"use strict";

	function TextureProjectorParallel (executionContext)
	{
		X3DTextureProjectorNode .call (this, executionContext);

		this .addType (X3DConstants .TextureProjectorParallel);
	}

	TextureProjectorParallel .prototype = Object .assign (Object .create (X3DTextureProjectorNode .prototype),
	{
		constructor: TextureProjectorParallel,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "description",  new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "location",     new Fields .SFVec3f (0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "direction",    new Fields .SFVec3f (0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "aspectRatio",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView" , new Fields .MFFloat (-1, -1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "nearDistance", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "farDistance",  new Fields .SFFloat (10)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "global",       new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "on",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "texture",      new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "TextureProjectorParallel";
		},
		getComponentName: function ()
		{
			return "ProjectiveTextureMapping";
		},
		getContainerField: function ()
		{
			return "xxxxxxxx";
		},
		initialize: function ()
		{
			X3DTextureProjectorNode .prototype .initialize .call (this);
		},
	});

	return TextureProjectorParallel;
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


define ([
	"x_ite/Components",
	"x_ite/Components/ProjectiveTextureMapping/TextureProjectorPerspective",
	"x_ite/Components/ProjectiveTextureMapping/TextureProjectorParallel",
	"x_ite/Components/ProjectiveTextureMapping/X3DTextureProjectorNode",
],
function (Components,
          TextureProjectorPerspective,
          TextureProjectorParallel,
          X3DTextureProjectorNode)
{
"use strict";

	Components .addComponent ({
		name: "ProjectiveTextureMapping",
		types:
		{
			TextureProjectorPerspective:  TextureProjectorPerspective,
			TextureProjectorParallel: TextureProjectorParallel,
		},
		abstractTypes:
		{
			X3DTextureProjectorNode: X3DTextureProjectorNode,
		},
	});
});


}());

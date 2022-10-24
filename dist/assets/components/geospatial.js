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


define ('x_ite/Components/Geospatial/GeoCoordinate',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DCoordinateNode",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Base/X3DConstants",
   "standard/Math/Geometry/Triangle3",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DCoordinateNode,
          X3DGeospatialObject,
          X3DConstants,
          Triangle3,
          Vector3)
{
"use strict";

   function GeoCoordinate (executionContext)
   {
      X3DCoordinateNode   .call (this, executionContext);
      X3DGeospatialObject .call (this, executionContext);

      this .addType (X3DConstants .GeoCoordinate);
   }

   GeoCoordinate .prototype = Object .assign (Object .create (X3DCoordinateNode .prototype),
      X3DGeospatialObject .prototype,
   {
      constructor: GeoCoordinate,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem", new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "point",     new Fields .MFVec3d ()),
      ]),
      getTypeName: function ()
      {
         return "GeoCoordinate";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "coord";
      },
      initialize: function ()
      {
         X3DCoordinateNode   .prototype .initialize .call (this);
         X3DGeospatialObject .prototype .initialize .call (this);
      },
      set1Point: (function ()
      {
         const result = new Vector3 (0, 0, 0);

         return function (index, point)
         {
            this ._point [index] = this .getGeoCoord (point, result);
         };
      })(),
      get1Point: (function ()
      {
         const p = new Vector3 (0, 0, 0);

         return function (index, result)
         {
            if (index < this .length)
            {
               const point = this .point;

               index *= 3;

               return this .getCoord (p .set (point [index], point [index + 1], point [index + 2]), result);
            }
            else
            {
               return result .set (0, 0, 0);
            }
         };
      })(),
      addPoint: (function ()
      {
         const
            p = new Vector3 (0, 0, 0),
            g = new Vector3 (0, 0, 0);

         return function (index, array)
         {
            if (index < this .length)
            {
               const point = this .point;

               index *= 3;

               this .getCoord (p .set (point [index], point [index + 1], point [index + 2]), g);

               array .push (g [0], g [1], g [2], 1);
            }
            else
            {
               array .push (0, 0, 0, 1);
            }
         };
      })(),
      addPoints: (function ()
      {
         const
            p = new Vector3 (0, 0, 0),
            g = new Vector3 (0, 0, 0);

         return function (array, min)
         {
            const point = this .point;

            for (let index = 0, length = this .length * 3; index < length; index += 3)
            {
               this .getCoord (p .set (point [index], point [index + 1], point [index + 2]), g);

               array .push (g [0], g [1], g [2], 1);
            }

            for (let index = this .length * 3, length = min * 3; index < length; index += 3)
               array .push (0, 0, 0, 1);
         };
      })(),
      getNormal: (function ()
      {
         const
            point1 = new Vector3 (0, 0, 0),
            point2 = new Vector3 (0, 0, 0),
            point3 = new Vector3 (0, 0, 0);

         return function (index1, index2, index3)
         {
            // The index[1,2,3] cannot be less than 0.

            const length = this .length;

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
         const
            point1 = new Vector3 (0, 0, 0),
            point2 = new Vector3 (0, 0, 0),
            point3 = new Vector3 (0, 0, 0),
            point4 = new Vector3 (0, 0, 0);

         return function (index1, index2, index3, index4)
         {
            // The index[1,2,3,4] cannot be less than 0.

            const length = this .length;

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

   return GeoCoordinate;
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


define ('x_ite/Components/Geospatial/GeoElevationGrid',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DGeometryNode",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "standard/Math/Geometry/Triangle3",
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DGeospatialObject,
          X3DConstants,
          X3DCast,
          Triangle3,
          Vector2,
          Vector3)
{
"use strict";

   function GeoElevationGrid (executionContext)
   {
      X3DGeometryNode     .call (this, executionContext);
      X3DGeospatialObject .call (this, executionContext);

      this .addType (X3DConstants .GeoElevationGrid);

      this ._creaseAngle .setUnit ("angle");
      this ._height      .setUnit ("length");

      this .colorNode    = null;
      this .texCoordNode = null;
      this .normalNode   = null;
   }

   GeoElevationGrid .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
      X3DGeospatialObject .prototype,
   {
      constructor: GeoElevationGrid,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",       new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoGridOrigin",   new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "xDimension",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "zDimension",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "xSpacing",        new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "zSpacing",        new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "yScale",          new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",     new Fields .SFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "height",          new Fields .MFDouble (0, 0)),
      ]),
      getTypeName: function ()
      {
         return "GeoElevationGrid";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      initialize: function ()
      {
         X3DGeometryNode     .prototype .initialize .call (this);
         X3DGeospatialObject .prototype .initialize .call (this);

         this ._color    .addInterest ("set_color__", this);
         this ._texCoord .addInterest ("set_texCoord__", this);
         this ._normal   .addInterest ("set_normal__", this);

         this .set_color__ ();
         this .set_texCoord__ ();
         this .set_normal__ ();
      },
      set_color__: function ()
      {
         if (this .colorNode)
         {
            this .colorNode .removeInterest ("requestRebuild", this);
            this .colorNode ._transparent .removeInterest ("set_transparent__", this);
         }

         this .colorNode = X3DCast (X3DConstants .X3DColorNode, this ._color);

         if (this .colorNode)
         {
            this .colorNode .addInterest ("requestRebuild", this);
            this .colorNode ._transparent .addInterest ("set_transparent__", this);

            this .set_transparent__ ();
         }
         else
            this .setTransparent (false);
      },
      set_transparent__: function ()
      {
         this .setTransparent (this .colorNode .getTransparent ());
      },
      set_texCoord__: function ()
      {
         if (this .texCoordNode)
            this .texCoordNode .removeInterest ("requestRebuild", this);

         this .texCoordNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoord);

         if (this .texCoordNode)
            this .texCoordNode .addInterest ("requestRebuild", this);

         this .setTextureCoordinate (this .texCoordNode);
      },
      set_normal__: function ()
      {
         if (this .normalNode)
            this .normalNode .removeInterest ("requestRebuild", this);

         this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this ._normal);

         if (this .normalNode)
            this .normalNode .addInterest ("requestRebuild", this);
      },
      getColor: function ()
      {
         return this .colorNode;
      },
      getTexCoord: function ()
      {
         return this .texCoordNode;
      },
      getNormal: function ()
      {
         return this .normalNode;
      },
      getHeight: function (index)
      {
         if (index < this ._height .length)
            return this ._height [index] * this ._yScale .getValue ();

         return 0;
      },
      createTexCoords: function ()
      {
         var
            texCoords  = [ ],
            xDimension = this ._xDimension .getValue (),
            zDimension = this ._zDimension .getValue (),
            xSize      = xDimension - 1,
            zSize      = zDimension - 1;

         for (var z = 0; z < zDimension; ++ z)
         {
            for (var x = 0; x < xDimension; ++ x)
               texCoords .push (new Vector2 (x / xSize, z / zSize));
         }

         return texCoords;
      },
      createNormals: function (points, coordIndex, creaseAngle)
      {
         var
            cw          = ! this ._ccw .getValue (),
            normalIndex = [ ],
            normals     = [ ];

         for (var p = 0; p < points .length; ++ p)
            normalIndex [p] = [ ];

         for (var c = 0; c < coordIndex .length; c += 3)
         {
            var
               c0 = coordIndex [c],
               c1 = coordIndex [c + 1],
               c2 = coordIndex [c + 2];

            normalIndex [c0] .push (normals .length);
            normalIndex [c1] .push (normals .length + 1);
            normalIndex [c2] .push (normals .length + 2);

            var normal = Triangle3 .normal (points [c0], points [c1], points [c2], new Vector3 (0, 0, 0));

            if (cw)
               normal .negate ();

            normals .push (normal);
            normals .push (normal);
            normals .push (normal);
         }

         return this .refineNormals (normalIndex, normals, this ._creaseAngle .getValue ());
      },
      createCoordIndex: function ()
      {
         // p1 - p4
         //  | \ |
         // p2 - p3

         var
            coordIndex = [ ],
            xDimension = this ._xDimension .getValue (),
            zDimension = this ._zDimension .getValue (),
            xSize      = xDimension - 1,
            zSize      = zDimension - 1;

         for (var z = 0; z < zSize; ++ z)
         {
            for (var x = 0; x < xSize; ++ x)
            {
               var
                  i1 =       z * xDimension + x,
                  i2 = (z + 1) * xDimension + x,
                  i3 = (z + 1) * xDimension + (x + 1),
                  i4 =       z * xDimension + (x + 1);

               coordIndex .push (i1); // p1
               coordIndex .push (i3); // p3
               coordIndex .push (i2); // p2

               coordIndex .push (i1); // p1
               coordIndex .push (i4); // p4
               coordIndex .push (i3); // p3
            }
         }

         return coordIndex;
      },
      createPoints: function ()
      {
         var
            points     = [ ],
            xDimension = this ._xDimension .getValue (),
            zDimension = this ._zDimension .getValue (),
            xSpacing   = this ._xSpacing .getValue (),
            zSpacing   = this ._zSpacing .getValue ();

         // When the geoSystem is "GD", xSpacing refers to the number of units of longitude in angle base units between
         // adjacent height values and zSpacing refers to the number of units of latitude in angle base units between
         // vertical height values.

         // When the geoSystem is "UTM", xSpacing refers to the number of eastings (length base units) between adjacent
         // height values and zSpacing refers to the number of northings (length base units) between vertical height values.

         if (this .getStandardOrder ())
         {
            for (var z = 0; z < zDimension; ++ z)
            {
               for (var x = 0; x < xDimension; ++ x)
               {
                  var point = new Vector3 (zSpacing * z, // latitude, northing
                                           xSpacing * x, // longitude, easting
                                           this .getHeight (x + z * xDimension));

                  point .add (this ._geoGridOrigin .getValue ());

                  points .push (this .getCoord (point, point));
               }
            }
         }
         else
         {
            for (var z = 0; z < zDimension; ++ z)
            {
               for (var x = 0; x < xDimension; ++ x)
               {
                  var point = new Vector3 (xSpacing * x, // longitude, easting
                                           zSpacing * z, // latitude, northing
                                           this .getHeight (x + z * xDimension));

                  point .add (this ._geoGridOrigin .getValue ());

                  points .push (this .getCoord (point, point));
               }
            }
         }

         return points;
      },
      build: function ()
      {
         if (this ._xDimension .getValue () < 2 || this ._zDimension .getValue () < 2)
            return;

         var
            colorPerVertex     = this ._colorPerVertex .getValue (),
            normalPerVertex    = this ._normalPerVertex .getValue (),
            coordIndex         = this .createCoordIndex (),
            colorNode          = this .getColor (),
            texCoordNode       = this .getTexCoord (),
            normalNode         = this .getNormal (),
            points             = this .createPoints (),
            colorArray         = this .getColors (),
            multiTexCoordArray = this .getMultiTexCoords (),
            normalArray        = this .getNormals (),
            vertexArray        = this .getVertices (),
            face               = 0;

         // Vertex attribute

         //std::vector <std::vector <float>> attribArrays (attribNodes .size ());

         //for (size_t a = 0, size = attribNodes .size (); a < size; ++ a)
         //	attribArrays [a] .reserve (coordIndex .size ());

         if (texCoordNode)
         {
            texCoordNode .init (multiTexCoordArray);
         }
         else
         {
            var
               texCoords     = this .createTexCoords (),
               texCoordArray = this .getTexCoords ();

            multiTexCoordArray .push (texCoordArray);
         }

         // Build geometry

         for (var c = 0; c < coordIndex .length; ++ face)
         {
            for (var p = 0; p < 6; ++ p, ++ c)
            {
               var
                  index = coordIndex [c],
                  point = points [index];

               //for (size_t a = 0, size = attribNodes .size (); a < size; ++ a)
               //	attribNodes [a] -> addValue (attribArrays [a], i);

               if (colorNode)
               {
                  if (colorPerVertex)
                     colorNode .addColor (index, colorArray);
                  else
                     colorNode .addColor (face, colorArray);
               }

               if (texCoordNode)
               {
                  texCoordNode .addTexCoord (index, multiTexCoordArray);
               }
               else
               {
                  var t = texCoords [index];

                  texCoordArray .push (t .x, t .y, 0, 1);
               }

               if (normalNode)
               {
                  if (normalPerVertex)
                     normalNode .addVector (index, normalArray);

                  else
                     normalNode .addVector (face, normalArray);
               }

               vertexArray .push (point .x, point .y, point .z, 1);
            }
         }

         // Add auto-generated normals if needed.

         if (! normalNode)
         {
            var normals = this .createNormals (points, coordIndex);

            for (var i = 0; i < normals .length; ++ i)
            {
               var normal = normals [i];

               normalArray .push (normal .x, normal .y, normal .z);
            }
         }

         this .setSolid (this ._solid .getValue ());
         this .setCCW (this ._ccw .getValue ());
      },
   });

   return GeoElevationGrid;
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


define ('x_ite/Components/Geospatial/GeoLOD',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Components/Grouping/X3DBoundedObject",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Base/X3DConstants",
   "x_ite/Rendering/TraverseType",
   "x_ite/Components/Grouping/Group",
   "x_ite/Components/Networking/Inline",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Geometry/Box3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DBoundedObject,
          X3DGeospatialObject,
          X3DConstants,
          TraverseType,
          Group,
          Inline,
          Vector3,
          Matrix4,
          Box3)
{
"use strict";

   var center = new Vector3 (0, 0, 0);

   function GeoLOD (executionContext)
   {
      X3DChildNode        .call (this, executionContext);
      X3DBoundedObject    .call (this, executionContext);
      X3DGeospatialObject .call (this, executionContext);

      this .addType (X3DConstants .GeoLOD);

      this ._range .setUnit ("length");

      this .unload           = false;
      this .rootGroup        = new Group (this .getBrowser () .getPrivateScene ());
      this .rootInline       = new Inline (executionContext);
      this .child1Inline     = new Inline (executionContext);
      this .child2Inline     = new Inline (executionContext);
      this .child3Inline     = new Inline (executionContext);
      this .child4Inline     = new Inline (executionContext);
      this .childrenLoaded   = false;
      this .childBBox        = new Box3 ();
      this .keepCurrentLevel = false;
      this .modelViewMatrix  = new Matrix4 ();
   }

   GeoLOD .prototype = Object .assign (Object .create (X3DChildNode .prototype),
      X3DBoundedObject .prototype,
      X3DGeospatialObject .prototype,
   {
      constructor: GeoLOD,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",     new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "rootUrl",       new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child1Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child2Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child3Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "child4Url",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "center",        new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "range",         new Fields .SFFloat (10)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "level_changed", new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",      new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "rootNode",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "children",      new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "GeoLOD";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DChildNode        .prototype .initialize .call (this);
         X3DBoundedObject    .prototype .initialize .call (this);
         X3DGeospatialObject .prototype .initialize .call (this);

         this ._rootNode .addFieldInterest (this .rootGroup ._children);

         this .rootGroup ._children = this ._rootNode;
         this .rootGroup .setPrivate (true);
         this .rootGroup .setup ();

         this .rootInline   ._loadState .addInterest ("set_rootLoadState__", this);
         this .child1Inline ._loadState .addInterest ("set_childLoadState__", this);
         this .child2Inline ._loadState .addInterest ("set_childLoadState__", this);
         this .child3Inline ._loadState .addInterest ("set_childLoadState__", this);
         this .child4Inline ._loadState .addInterest ("set_childLoadState__", this);

         this ._rootUrl   .addFieldInterest (this .rootInline   ._url);
         this ._child1Url .addFieldInterest (this .child1Inline ._url);
         this ._child2Url .addFieldInterest (this .child2Inline ._url);
         this ._child3Url .addFieldInterest (this .child3Inline ._url);
         this ._child4Url .addFieldInterest (this .child4Inline ._url);

         this .rootInline   ._load = true;
         this .child1Inline ._load = false;
         this .child2Inline ._load = false;
         this .child3Inline ._load = false;
         this .child4Inline ._load = false;

         this .rootInline   ._url = this ._rootUrl;
         this .child1Inline ._url = this ._child1Url;
         this .child2Inline ._url = this ._child2Url;
         this .child3Inline ._url = this ._child3Url;
         this .child4Inline ._url = this ._child4Url;

         this .rootInline   .setup ();
         this .child1Inline .setup ();
         this .child2Inline .setup ();
         this .child3Inline .setup ();
         this .child4Inline .setup ();
      },
      getBBox: function (bbox, shadow)
      {
         if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
         {
            switch (this .childrenLoaded ? this ._level_changed .getValue () : 0)
            {
               case 0:
               {
                  if (this ._rootNode .length)
                     return this .rootGroup .getBBox (bbox, shadow);

                  return this .rootInline .getBBox (bbox, shadow);
               }
               case 1:
               {
                  // Must be unique for each GeoLOD..
                  const childBBox = this .childBBox;

                  bbox .set ();

                  bbox .add (this .child1Inline .getBBox (childBBox, shadow));
                  bbox .add (this .child2Inline .getBBox (childBBox, shadow));
                  bbox .add (this .child3Inline .getBBox (childBBox, shadow));
                  bbox .add (this .child4Inline .getBBox (childBBox, shadow));

                  return bbox;
               }
            }

            return bbox .set ();
         }

         return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
      },
      set_rootLoadState__: function ()
      {
         if (this ._level_changed .getValue () !== 0)
            return;

         if (this ._rootNode .length)
            return;

         if (this .rootInline .checkLoadState () === X3DConstants .COMPLETE_STATE)
         {
            this ._children      = this .rootInline .getInternalScene () .getRootNodes ();
            this .childrenLoaded = false;
         }
      },
      set_childLoadState__: function ()
      {
         if (this ._level_changed .getValue () !== 1)
            return;

         var loaded = 0;

         if (this .child1Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
             this .child1Inline .checkLoadState () === X3DConstants .FAILED_STATE)
            ++ loaded;

         if (this .child2Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
             this .child2Inline .checkLoadState () === X3DConstants .FAILED_STATE)
            ++ loaded;

         if (this .child3Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
             this .child3Inline .checkLoadState () === X3DConstants .FAILED_STATE)
            ++ loaded;

         if (this .child4Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
             this .child4Inline .checkLoadState () === X3DConstants .FAILED_STATE)
            ++ loaded;

         if (loaded === 4)
         {
            this .childrenLoaded = true;

            var children = this ._children;

            children .length = 0;

            var rootNodes = this .child1Inline .getInternalScene () .getRootNodes ();

            for (var i = 0, length = rootNodes .length; i < length; ++ i)
               children .push (rootNodes [i]);

            var rootNodes = this .child2Inline .getInternalScene () .getRootNodes ();

            for (var i = 0, length = rootNodes .length; i < length; ++ i)
               children .push (rootNodes [i]);

            var rootNodes = this .child3Inline .getInternalScene () .getRootNodes ();

            for (var i = 0, length = rootNodes .length; i < length; ++ i)
               children .push (rootNodes [i]);

            var rootNodes = this .child4Inline .getInternalScene () .getRootNodes ();

            for (var i = 0, length = rootNodes .length; i < length; ++ i)
               children .push (rootNodes [i]);
         }
      },
      set_childCameraObject__: function ()
      {
         this .setCameraObject (this .child1Inline .getCameraObject () ||
                                this .child2Inline .getCameraObject () ||
                                this .child3Inline .getCameraObject () ||
                                this .child4Inline .getCameraObject ());
      },
      set_childPickableObject__: function ()
      {
         this .setPickableObject (this .child1Inline .getPickableObject () ||
                                  this .child2Inline .getPickableObject () ||
                                  this .child3Inline .getPickableObject () ||
                                  this .child4Inline .getPickableObject ());
      },
      getLevel: function (modelViewMatrix)
      {
         var distance = this .getDistance (modelViewMatrix);

         if (distance < this ._range .getValue ())
            return 1;

         return 0;
      },
      getDistance: function (modelViewMatrix)
      {
         modelViewMatrix .translate (this .getCoord (this ._center .getValue (), center));

         return modelViewMatrix .origin .magnitude ();
      },
      traverse: function (type, renderObject)
      {
         switch (type)
         {
            case TraverseType .PICKING:
            {
               var
                  browser          = renderObject .getBrowser (),
                  pickingHierarchy = browser .getPickingHierarchy ();

               pickingHierarchy .push (this);

               this .traverseChildren (type, renderObject);

               pickingHierarchy .pop ();
               return;
            }
            case TraverseType .DISPLAY:
            {
               var level = this .getLevel (this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()));

               if (level !== this ._level_changed .getValue ())
               {
                  this ._level_changed = level;

                  switch (level)
                  {
                     case 0:
                     {
                        this .child1Inline ._isCameraObject   .removeInterest ("set_childCameraObject__",   this);
                        this .child2Inline ._isCameraObject   .removeInterest ("set_childCameraObject__",   this);
                        this .child3Inline ._isCameraObject   .removeInterest ("set_childCameraObject__",   this);
                        this .child4Inline ._isCameraObject   .removeInterest ("set_childCameraObject__",   this);
                        this .child1Inline ._isPickableObject .removeInterest ("set_childPickableObject__", this);
                        this .child2Inline ._isPickableObject .removeInterest ("set_childPickableObject__", this);
                        this .child3Inline ._isPickableObject .removeInterest ("set_childPickableObject__", this);
                        this .child4Inline ._isPickableObject .removeInterest ("set_childPickableObject__", this);

                        if (this ._rootNode .length)
                        {
                           this .rootGroup ._isCameraObject   .addFieldInterest (this ._isCameraObject);
                           this .rootGroup ._isPickableObject .addFieldInterest (this ._isPickableObject);

                           this .setCameraObject   (this .rootGroup .getCameraObject ());
                           this .setPickableObject (this .rootGroup .getPickableObject ());

                           this ._children      = this ._rootNode;
                           this .childrenLoaded = false;
                        }
                        else
                        {
                           if (this .rootInline .checkLoadState () == X3DConstants .COMPLETE_STATE)
                           {
                              this .rootInline ._isCameraObject   .addFieldInterest (this ._isCameraObject);
                              this .rootInline ._isPickableObject .addFieldInterest (this ._isPickableObject);

                              this .setCameraObject   (this .rootInline .getCameraObject ());
                              this .setPickableObject (this .rootInline .getPickableObject ());

                              this ._children      = this .rootInline .getInternalScene () .getRootNodes ();
                              this .childrenLoaded = false;
                           }
                        }

                        if (this .unload)
                        {
                           this .child1Inline ._load = false;
                           this .child2Inline ._load = false;
                           this .child3Inline ._load = false;
                           this .child4Inline ._load = false;
                        }

                        break;
                     }
                     case 1:
                     {
                        if (this ._rootNode .length)
                        {
                           this .rootGroup ._isCameraObject   .removeFieldInterest (this ._isCameraObject);
                           this .rootGroup ._isPickableObject .removeFieldInterest (this ._isPickableObject);
                        }
                        else
                        {
                           this .rootInline ._isCameraObject   .removeFieldInterest (this ._isCameraObject);
                           this .rootInline ._isPickableObject .removeFieldInterest (this ._isPickableObject);
                        }

                        this .child1Inline ._isCameraObject   .addInterest ("set_childCameraObject__",   this);
                        this .child2Inline ._isCameraObject   .addInterest ("set_childCameraObject__",   this);
                        this .child3Inline ._isCameraObject   .addInterest ("set_childCameraObject__",   this);
                        this .child4Inline ._isCameraObject   .addInterest ("set_childCameraObject__",   this);
                        this .child1Inline ._isPickableObject .addInterest ("set_childPickableObject__", this);
                        this .child2Inline ._isPickableObject .addInterest ("set_childPickableObject__", this);
                        this .child3Inline ._isPickableObject .addInterest ("set_childPickableObject__", this);
                        this .child4Inline ._isPickableObject .addInterest ("set_childPickableObject__", this);

                        this .set_childCameraObject__ ();
                        this .set_childPickableObject__ ();

                        if (this .child1Inline ._load .getValue ())
                        {
                           this .set_childLoadState__ ();
                        }
                        else
                        {
                           this .child1Inline ._load = true;
                           this .child2Inline ._load = true;
                           this .child3Inline ._load = true;
                           this .child4Inline ._load = true;
                        }

                        break;
                     }
                  }
               }

               this .traverseChildren (type, renderObject);
               return;
            }
            default:
            {
               this .traverseChildren (type, renderObject);
               return;
            }
         }
      },
      traverseChildren: function (type, renderObject)
      {
         switch (this .childrenLoaded ? this ._level_changed .getValue () : 0)
         {
            case 0:
            {
               if (this ._rootNode .length)
                  this .rootGroup .traverse (type, renderObject);
               else
                  this .rootInline .traverse (type, renderObject);

               break;
            }
            case 1:
            {
               this .child1Inline .traverse (type, renderObject);
               this .child2Inline .traverse (type, renderObject);
               this .child3Inline .traverse (type, renderObject);
               this .child4Inline .traverse (type, renderObject);
               break;
            }
         }
      },
   });

   return GeoLOD;
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


define ('x_ite/Components/Geospatial/GeoLocation',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Grouping/X3DTransformMatrix3DNode",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTransformMatrix3DNode,
          X3DGeospatialObject,
          X3DConstants,
          Matrix4)
{
"use strict";

   var locationMatrix = new Matrix4 ();

   function GeoLocation (executionContext)
   {
      X3DTransformMatrix3DNode .call (this, executionContext);
      X3DGeospatialObject      .call (this, executionContext);

      this .addType (X3DConstants .GeoLocation);
   }

   GeoLocation .prototype = Object .assign (Object .create (X3DTransformMatrix3DNode .prototype),
      X3DGeospatialObject .prototype,
   {
      constructor: GeoLocation,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",      new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCoords",      new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "GeoLocation";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DTransformMatrix3DNode .prototype .initialize .call (this);
         X3DGeospatialObject      .prototype .initialize .call (this);

         this .addInterest ("eventsProcessed", this);

         this .eventsProcessed ();
      },
      eventsProcessed: function ()
      {
         this .setMatrix (this .getLocationMatrix (this ._geoCoords .getValue (), locationMatrix));
      },
   });

   return GeoLocation;
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


define ('x_ite/Components/Geospatial/GeoMetadata',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DInfoNode",
   "x_ite/Components/Networking/X3DUrlObject",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInfoNode,
          X3DUrlObject,
          X3DConstants)
{
"use strict";

   function GeoMetadata (executionContext)
   {
      X3DInfoNode  .call (this, executionContext);
      X3DUrlObject .call (this, executionContext);

      this .addType (X3DConstants .GeoMetadata);
   }

   GeoMetadata .prototype = Object .assign (Object .create (X3DInfoNode .prototype),
      X3DUrlObject .prototype,
   {
      constructor: GeoMetadata,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefresh",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "summary",              new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "data",                 new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "GeoMetadata";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DInfoNode  .prototype .initialize .call (this);
         X3DUrlObject .prototype .initialize .call (this);
      },
      requestImmediateLoad: function (cache = true)
      { },
      requestUnload: function ()
      { },
      set_load__: function ()
      { },
      set_url__: function ()
      { },
   });

   return GeoMetadata;
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


define ('x_ite/Components/Geospatial/GeoOrigin',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/Geospatial/Geospatial",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode,
          X3DConstants,
          Geospatial)
{
"use strict";

   function GeoOrigin (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .GeoOrigin);

      this .radians = false;
   }

   GeoOrigin .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: GeoOrigin,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem", new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCoords", new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "rotateYUp", new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "GeoOrigin";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "geoOrigin";
      },
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);

         this ._geoSystem .addInterest ("set_geoSystem__", this);

         this .set_geoSystem__ ();
      },
      set_geoSystem__: function ()
      {
         this .referenceFrame = Geospatial .getReferenceFrame (this ._geoSystem, this .radians);
      },
      getOrigin: function (result)
      {
         return this .referenceFrame .convert (this ._geoCoords .getValue (), result);
      },
   });

   return GeoOrigin;
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


define ('x_ite/Components/Geospatial/GeoPositionInterpolator',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Interpolation/X3DInterpolatorNode",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Browser/Geospatial/Geocentric",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInterpolatorNode,
          X3DGeospatialObject,
          Geocentric,
          X3DConstants,
          Vector3)
{
"use strict";

   function GeoPositionInterpolator (executionContext)
   {
      X3DInterpolatorNode .call (this, executionContext);
      X3DGeospatialObject .call (this, executionContext);

      this .addType (X3DConstants .GeoPositionInterpolator);

      this ._value_changed .setUnit ("length");

      this .geocentric = new Geocentric ();
   }

   GeoPositionInterpolator .prototype = Object .assign (Object .create (X3DInterpolatorNode .prototype),
      X3DGeospatialObject .prototype,
   {
      constructor: GeoPositionInterpolator,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",        new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_fraction",     new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "key",              new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "keyValue",         new Fields .MFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",    new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "geovalue_changed", new Fields .SFVec3d ()),
      ]),
      keyValue0: new Vector3 (0, 0, 0),
      keyValue1: new Vector3 (0, 0, 0),
      geovalue: new Vector3 (0, 0, 0),
      value: new Vector3 (0, 0, 0),
      getTypeName: function ()
      {
         return "GeoPositionInterpolator";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "children";
      },
      setup: function ()
      {
         X3DGeospatialObject .prototype .initialize .call (this);

         X3DInterpolatorNode .prototype .setup .call (this);
      },
      initialize: function ()
      {
         X3DInterpolatorNode .prototype .initialize .call (this);

         this ._keyValue .addInterest ("set_keyValue__", this);
      },
      set_keyValue__: function ()
      {
         var
            key      = this ._key,
            keyValue = this ._keyValue;

         if (keyValue .length < key .length)
            keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFVec3f ());
      },
      interpolate: function (index0, index1, weight)
      {
         this .getCoord (this ._keyValue [index0] .getValue (), this .keyValue0);
         this .getCoord (this ._keyValue [index1] .getValue (), this .keyValue1);

         var coord = this .geocentric .slerp (this .keyValue0, this .keyValue1, weight);

         this ._geovalue_changed = this .getGeoCoord (coord, this .geovalue);
         this ._value_changed    = coord;
      },
   });

   return GeoPositionInterpolator;
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


define ('x_ite/Components/Geospatial/GeoProximitySensor',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/EnvironmentalSensor/X3DEnvironmentalSensorNode",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Components/EnvironmentalSensor/ProximitySensor",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentalSensorNode,
          X3DGeospatialObject,
          ProximitySensor,
          X3DConstants,
          Vector3)
{
"use strict";

   var geoCoord = new Vector3 (0, 0, 0);

   function GeoProximitySensor (executionContext)
   {
      X3DEnvironmentalSensorNode .call (this, executionContext);
      X3DGeospatialObject        .call (this, executionContext);

      this .addType (X3DConstants .GeoProximitySensor);

      this ._position_changed         .setUnit ("length");
      this ._centerOfRotation_changed .setUnit ("length");

      this .proximitySensor = new ProximitySensor (executionContext);

      this .setCameraObject   (this .proximitySensor .getCameraObject ());
      this .setPickableObject (this .proximitySensor .getPickableObject ());
   }

   GeoProximitySensor .prototype = Object .assign (Object .create (X3DEnvironmentalSensorNode .prototype),
      X3DGeospatialObject .prototype,
   {
      constructor: GeoProximitySensor,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",                new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "size",                     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",                   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "enterTime",                new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "exitTime",                 new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "geoCoord_changed",         new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "position_changed",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "orientation_changed",      new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "centerOfRotation_changed", new Fields .SFVec3f ()),
      ]),
      getTypeName: function ()
      {
         return "GeoProximitySensor";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DEnvironmentalSensorNode .prototype .initialize .call (this);
         X3DGeospatialObject        .prototype .initialize .call (this);

         this ._enabled .addFieldInterest (this .proximitySensor ._enabled);
         this ._size    .addFieldInterest (this .proximitySensor ._size);
         this ._center  .addFieldInterest (this .proximitySensor ._center);

         this .proximitySensor ._isCameraObject   .addFieldInterest (this ._isCameraObject);
         this .proximitySensor ._isPickableObject .addFieldInterest (this ._isPickableObject);

         this .proximitySensor ._isActive                 .addFieldInterest (this ._isActive);
         this .proximitySensor ._enterTime                .addFieldInterest (this ._enterTime);
         this .proximitySensor ._exitTime                 .addFieldInterest (this ._exitTime);
         this .proximitySensor ._position_changed         .addFieldInterest (this ._position_changed);
         this .proximitySensor ._orientation_changed      .addFieldInterest (this ._orientation_changed);
         this .proximitySensor ._centerOfRotation_changed .addFieldInterest (this ._centerOfRotation_changed);

         this .proximitySensor ._position_changed .addInterest ("set_position__", this);

         this .proximitySensor ._enabled = this ._enabled;
         this .proximitySensor ._size    = this ._size;
         this .proximitySensor ._center  = this ._center;

         this .proximitySensor .setup ();
      },
      set_position__: function (position)
      {
         this ._geoCoord_changed = this .getGeoCoord (this .proximitySensor ._position_changed .getValue (), geoCoord);
      },
      traverse: function (type, renderObject)
      {
         this .proximitySensor .traverse (type, renderObject);
      },
   });

   return GeoProximitySensor;
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


define ('x_ite/Components/Geospatial/GeoTouchSensor',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/PointingDeviceSensor/X3DTouchSensorNode",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTouchSensorNode,
          X3DGeospatialObject,
          X3DConstants,
          Vector3,
          Matrix4)
{
"use strict";

   var
      invModelViewMatrix = new Matrix4 (),
      geoCoords          = new Vector3 (0, 0, 0);

   function GeoTouchSensor (executionContext)
   {
      X3DTouchSensorNode  .call (this, executionContext);
      X3DGeospatialObject .call (this, executionContext);

      this .addType (X3DConstants .GeoTouchSensor);

      this ._hitPoint_changed .setUnit ("length");
   }

   GeoTouchSensor .prototype = Object .assign (Object .create (X3DTouchSensorNode .prototype),
      X3DGeospatialObject .prototype,
   {
      constructor: GeoTouchSensor,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",         new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",           new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "hitTexCoord_changed", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "hitNormal_changed",   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "hitPoint_changed",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "hitGeoCoord_changed", new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isOver",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "touchTime",           new Fields .SFTime ()),
      ]),
      getTypeName: function ()
      {
         return "GeoTouchSensor";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DTouchSensorNode  .prototype .initialize .call (this);
         X3DGeospatialObject .prototype .initialize .call (this);
      },
      set_over__: function (over, hit, modelViewMatrix, projectionMatrix, viewport)
      {
         X3DTouchSensorNode .prototype .set_over__ .call (this, over, hit, modelViewMatrix, projectionMatrix, viewport);

         if (this ._isOver .getValue ())
         {
            var intersection = hit .intersection;

            invModelViewMatrix .assign (modelViewMatrix) .inverse ();

            this ._hitTexCoord_changed = intersection .texCoord;
            this ._hitNormal_changed   = modelViewMatrix .multMatrixDir (intersection .normal .copy ()) .normalize ();
            this ._hitPoint_changed    = invModelViewMatrix .multVecMatrix (intersection .point .copy ());
            this ._hitGeoCoord_changed = this .getGeoCoord (this ._hitPoint_changed .getValue (), geoCoords);
         }
      },
   });

   return GeoTouchSensor;
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


define ('x_ite/Components/Geospatial/GeoTransform',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Grouping/X3DTransformMatrix3DNode",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTransformMatrix3DNode,
          X3DGeospatialObject,
          X3DConstants,
          Matrix4)
{
"use strict";

   var
      matrix         = new Matrix4 (),
      locationMatrix = new Matrix4 ();

   function GeoTransform (executionContext)
   {
      X3DTransformMatrix3DNode .call (this, executionContext);
      X3DGeospatialObject      .call (this, executionContext);

      this .addType (X3DConstants .GeoTransform);

      this ._translation .setUnit ("length");
   }

   GeoTransform .prototype = Object .assign (Object .create (X3DTransformMatrix3DNode .prototype),
      X3DGeospatialObject .prototype,
   {
      constructor: GeoTransform,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",        new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCenter",        new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "GeoTransform";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DTransformMatrix3DNode .prototype .initialize .call (this);
         X3DGeospatialObject      .prototype .initialize .call (this);

         this .addInterest ("eventsProcessed", this);

         this .eventsProcessed ();
      },
      eventsProcessed: function ()
      {
         this .getLocationMatrix (this ._geoCenter .getValue (), locationMatrix);

         matrix .set (this ._translation      .getValue (),
                        this ._rotation         .getValue (),
                        this ._scale            .getValue (),
                        this ._scaleOrientation .getValue ());

         this .setMatrix (matrix .multRight (locationMatrix) .multLeft (locationMatrix .inverse ()));
      },
   });

   return GeoTransform;
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


define (require .getComponentUrl ("geospatial"), [
   "x_ite/Components",
   "x_ite/Components/Geospatial/GeoCoordinate",
   "x_ite/Components/Geospatial/GeoElevationGrid",
   "x_ite/Components/Geospatial/GeoLOD",
   "x_ite/Components/Geospatial/GeoLocation",
   "x_ite/Components/Geospatial/GeoMetadata",
   "x_ite/Components/Geospatial/GeoOrigin",
   "x_ite/Components/Geospatial/GeoPositionInterpolator",
   "x_ite/Components/Geospatial/GeoProximitySensor",
   "x_ite/Components/Geospatial/GeoTouchSensor",
   "x_ite/Components/Geospatial/GeoTransform",
   "x_ite/Components/Geospatial/GeoViewpoint",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
],
function (Components,
          GeoCoordinate,
          GeoElevationGrid,
          GeoLOD,
          GeoLocation,
          GeoMetadata,
          GeoOrigin,
          GeoPositionInterpolator,
          GeoProximitySensor,
          GeoTouchSensor,
          GeoTransform,
          GeoViewpoint,
          X3DGeospatialObject)
{
"use strict";

   Components .addComponent ({
      name: "Geospatial",
      types:
      {
         GeoCoordinate:           GeoCoordinate,
         GeoElevationGrid:        GeoElevationGrid,
         GeoLOD:                  GeoLOD,
         GeoLocation:             GeoLocation,
         GeoMetadata:             GeoMetadata,
         GeoOrigin:               GeoOrigin,
         GeoPositionInterpolator: GeoPositionInterpolator,
         GeoProximitySensor:      GeoProximitySensor,
         GeoTouchSensor:          GeoTouchSensor,
         GeoTransform:            GeoTransform,
         GeoViewpoint:            GeoViewpoint,
      },
      abstractTypes:
      {
         X3DGeospatialObject: X3DGeospatialObject,
      },
   });
});


})();

/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DGeospatialObject  from "./X3DGeospatialObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Triangle3            from "../../../standard/Math/Geometry/Triangle3.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

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
   getSpecificationRange: function ()
   {
      return ["3.0", "Infinity"];
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
      this .colorNode ?.removeInterest ("requestRebuild", this);

      this .colorNode = X3DCast (X3DConstants .X3DColorNode, this ._color);

      this .colorNode ?.addInterest ("requestRebuild", this);

      this .setTransparent (this .colorNode ?.isTransparent () ?? false);
   },
   set_texCoord__: function ()
   {
      this .texCoordNode ?.removeInterest ("requestRebuild", this);

      this .texCoordNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoord);

      this .texCoordNode ?.addInterest ("requestRebuild", this);

      this .setTextureCoordinate (this .texCoordNode);
   },
   set_normal__: function ()
   {
      this .normalNode ?.removeInterest ("requestRebuild", this);

      this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this ._normal);

      this .normalNode ?.addInterest ("requestRebuild", this);
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
               texCoordNode .addPoint (index, multiTexCoordArray);
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
   dispose: function ()
   {
      X3DGeospatialObject .prototype .dispose .call (this);
      X3DGeometryNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoElevationGrid,
{
   typeName:
   {
      value: "GeoElevationGrid",
   },
   componentName:
   {
      value: "Geospatial",
   },
   containerField:
   {
      value: "geometry",
   },
   specificationRange:
   {
      value: Object .freeze (["3.0", "Infinity"]),
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
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
   },
});

export default GeoElevationGrid;

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

import Vector3 from "../Numbers/Vector3.js";
import Matrix4 from "../Numbers/Matrix4.js";

const
   normal    = new Vector3 (),
   point     = new Vector3 (),
   invMatrix = new Matrix4 ();

function Plane3 (point = Vector3 .Zero, normal = Vector3 .zAxis)
{
   this .normal = new Vector3 ();

   this .set (point, normal);
}

Object .assign (Plane3 .prototype,
{
   copy ()
   {
      const copy = Object .create (Plane3 .prototype);

      copy .normal             = this .normal .copy ();
      copy .distanceFromOrigin = this .distanceFromOrigin;

      return copy;
   },
   assign (plane)
   {
      this .normal .assign (plane .normal);
      this .distanceFromOrigin = plane .distanceFromOrigin;

      return this;
   },
   equals (plane)
   {
      return this .distanceFromOrigin === plane .distanceFromOrigin && this .normal .equals (plane .normal);
   },
   set (point = Vector3 .Zero, normal = Vector3 .zAxis)
   {
      this .normal .assign (normal);
      this .distanceFromOrigin = normal .dot (point);
      return this;
   },
   multLeft (matrix)
   {
      // Taken from Inventor:

      // Find the point on the plane along the normal from the origin
      point .assign (this .normal) .multiply (this .distanceFromOrigin);

      // Transform the plane normal by the matrix
      // to get the new normal. Use the inverse transpose
      // of the matrix so that normals are not scaled incorrectly.
      // n' = !~m * n = n * ~m
      invMatrix .assign (matrix) .submatrix .inverse ()
         .multVecMatrix (normal .assign (this .normal)) .normalize ();

      // Transform the point by the matrix
      matrix .multMatrixVec (point);

      // The new distance is the projected distance of the vector to the
      // transformed point onto the (unit) transformed normal. This is
      // just a dot product.
      this .normal .assign (normal);
      this .distanceFromOrigin = normal .dot (point);

      return this;
   },
   multRight (matrix)
   {
      // Taken from Inventor:

      // Find the point on the plane along the normal from the origin
      point .assign (this .normal) .multiply (this .distanceFromOrigin);

      // Transform the plane normal by the matrix
      // to get the new normal. Use the inverse transpose
      // of the matrix so that normals are not scaled incorrectly.
      // n' = n * !~m = ~m * n
      invMatrix .assign (matrix) .submatrix .inverse ()
         .multMatrixVec (normal .assign (this .normal)) .normalize ();

      // Transform the point by the matrix
      matrix .multVecMatrix (point);

      // The new distance is the projected distance of the vector to the
      // transformed point onto the (unit) transformed normal. This is
      // just a dot product.
      this .normal .assign (normal);
      this .distanceFromOrigin = normal .dot (point);

      return this;
   },
   getDistanceToPoint (point)
   {
      return point .dot (this .normal) - this .distanceFromOrigin;
   },
   getPerpendicularVectorToPoint (point, result = new Vector3 ())
   {
      return result .assign (this .normal) .multiply (-this .getDistanceToPoint (point));
   },
	getClosestPointToPoint (point, result = new Vector3 ())
   {
      return this .getPerpendicularVectorToPoint (point, result) .add (point);
   },
   intersectsLine (line, intersection)
   {
      const { point, direction } = line;

      // Check if the line is parallel to the plane.
      const theta = direction .dot (this .normal);

      // Plane and line are parallel.
      if (theta === 0)
         return false;

      // Plane and line are not parallel. The intersection point can be calculated now.
      const t = (this .distanceFromOrigin - this .normal .dot (point)) / theta;

      intersection .assign (direction) .multiply (t) .add (point);

      return true;
   },
   toString ()
   {
      return `${this .normal}, ${this .distanceFromOrigin}`;
   },
});

export default Plane3;

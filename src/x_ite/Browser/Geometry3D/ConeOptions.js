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

import Fields            from "../../Fields.js";
import X3DConstants      from "../../Base/X3DConstants.js";
import X3DBaseNode       from "../../Base/X3DBaseNode.js";
import IndexedFaceSet    from "../../Components/Geometry3D/IndexedFaceSet.js";
import Coordinate        from "../../Components/Rendering/Coordinate.js";
import Normal            from "../../Components/Rendering/Normal.js";
import TextureCoordinate from "../../Components/Texturing/TextureCoordinate.js";
import Complex           from "../../../standard/Math/Numbers/Complex.js";
import Vector2           from "../../../standard/Math/Numbers/Vector2.js";
import Vector3           from "../../../standard/Math/Numbers/Vector3.js";

function ConeOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "dimension", new Fields .SFInt32 (20))
}

Object .assign (Object .setPrototypeOf (ConeOptions .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);
   },
   getSideGeometry ()
   {
      if (!this .sideGeometry)
         this .build ();

      return this .sideGeometry;
   },
   getBottomGeometry ()
   {
      if (!this .bottomGeometry)
         this .build ();

      return this .bottomGeometry;
   },
   createTexCoordIndex ()
   {
      const
         dimension           = this ._dimension .getValue (),
         sideTexCoordIndex   = this .sideGeometry ._texCoordIndex,
         bottomTexCoordIndex = this .bottomGeometry ._texCoordIndex;

      // Side

      for (let i = 0; i < dimension; ++ i)
         sideTexCoordIndex .push (i, i + 1, i + dimension + 1, -1);

      // Bottom

      for (let i = dimension - 1; i > -1; -- i)
         bottomTexCoordIndex .push (2 * (dimension + 1) + i);

      bottomTexCoordIndex .push (-1);
   },
   createTexCoord ()
   {
      const
         dimension = this ._dimension .getValue (),
         point     = this .sideGeometry ._texCoord .getValue () ._point;

      // Side Bottom

      for (let i = 0; i < dimension + 1; ++ i)
      {
         const u = i / dimension;

         point .push (new Vector2 (u, 0));
      }

      // Side Top

      for (let i = 0; i < dimension + 1; ++ i)
      {
         const u = (i + 0.5) / dimension;

         point .push (new Vector2 (u, 1));
      }

      // Bottom

      for (let i = 0; i < dimension; ++ i)
      {
         const
            u     = i / dimension,
            theta = 2 * Math .PI * u,
            t     = Complex .Polar (-1, theta);

         point .push (new Vector2 ((t .imag + 1) / 2, (t .real + 1) / 2));
      }
   },
   createNormalIndex ()
   {
      const
         dimension         = this ._dimension .getValue (),
         sideNormalIndex   = this .sideGeometry ._normalIndex,
         bottomNormalIndex = this .bottomGeometry ._normalIndex;

      // Side

      for (let i = 0; i < dimension; ++ i)
         sideNormalIndex .push (i, (i + 1) % dimension, i + dimension, -1);

      // Bottom

      for (let i = 0; i < dimension; ++ i)
         bottomNormalIndex .push (2 * dimension);

      bottomNormalIndex .push (-1);
   },
   createNormal ()
   {
      const
         dimension = this ._dimension .getValue (),
         vector    = this .sideGeometry ._normal .getValue () ._vector,
         nz        = Complex .Polar (1, -Math .PI / 4);

      // Side Bottom

      for (let i = 0; i < dimension; ++ i)
      {
         const
            u     = i / dimension,
            theta = 2 * Math .PI * u,
            n     = Complex .Polar (nz .imag, theta);

         vector .push (new Vector3 (n .imag, nz .real, n .real));
      }

      // Side Top

      for (let i = 0; i < dimension; ++ i)
      {
         const
            u     = (i + 0.5) / dimension,
            theta = 2 * Math .PI * u,
            n    = Complex .Polar (nz .imag, theta);

         vector .push (new Vector3 (n .imag, nz .real, n .real));
      }

      // Bottom

      vector .push (new Vector3 (0, -1, 0));
   },
   createCoordIndex ()
   {
      const
         dimension        = this ._dimension .getValue (),
         sideCoordIndex   = this .sideGeometry ._coordIndex,
         bottomCoordIndex = this .bottomGeometry ._coordIndex;

      // Side

      for (let i = 0; i < dimension; ++ i)
         sideCoordIndex .push (i, (i + 1) % dimension, dimension, -1);

      // Bottom

      for (let i = dimension - 1; i > -1; -- i)
         bottomCoordIndex .push (i);

      bottomCoordIndex .push (-1);
   },
   createPoints ()
   {
      const
         dimension = this ._dimension .getValue (),
         point     = this .sideGeometry ._coord .getValue () ._point;

      for (let i = 0; i < dimension; ++ i)
      {
         const
            u     = i / dimension,
            theta = 2 * Math .PI * u,
            p     = Complex .Polar (-1, theta);

         point .push (new Vector3 (p .imag, -1, p .real));
      }

      point .push (new Vector3 (0, 1, 0));
   },
   build ()
   {
      this .sideGeometry            = new IndexedFaceSet (this .getExecutionContext ());
      this .sideGeometry ._texCoord = new TextureCoordinate (this .getExecutionContext ());
      this .sideGeometry ._normal   = new Normal (this .getExecutionContext ());
      this .sideGeometry ._coord    = new Coordinate (this .getExecutionContext ());

      this .bottomGeometry            = new IndexedFaceSet (this .getExecutionContext ());
      this .bottomGeometry ._texCoord = this .sideGeometry ._texCoord;
      this .bottomGeometry ._normal   = this .sideGeometry ._normal;
      this .bottomGeometry ._coord    = this .sideGeometry ._coord;

      this .createTexCoordIndex ();
      this .createTexCoord ();
      this .createNormalIndex ();
      this .createNormal ();
      this .createCoordIndex ();
      this .createPoints ();

      const
         sideGeometry   = this .sideGeometry,
         bottomGeometry = this .bottomGeometry,
         texCoord       = this .sideGeometry ._texCoord .getValue (),
         normal         = this .sideGeometry ._normal .getValue (),
         coord          = this .sideGeometry ._coord .getValue ();

      texCoord       .setup ();
      normal         .setup ();
      coord          .setup ();
      sideGeometry   .setup ();
      bottomGeometry .setup ();
   },
   eventsProcessed ()
   {
      this .sideGeometry   = null;
      this .bottomGeometry = null;
   },
});

Object .defineProperties (ConeOptions,
{
   typeName:
   {
      value: "ConeOptions",
      enumerable: true,
   },
});

export default ConeOptions;

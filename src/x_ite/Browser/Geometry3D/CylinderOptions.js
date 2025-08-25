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

function CylinderOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "dimension", new Fields .SFInt32 (20))
}

Object .assign (Object .setPrototypeOf (CylinderOptions .prototype, X3DBaseNode .prototype),
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
   getTopGeometry ()
   {
      if (!this .topGeometry)
         this .build ();

      return this .topGeometry;
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
         bottomTexCoordIndex = this .bottomGeometry ._texCoordIndex,
         topTexCoordIndex    = this .topGeometry ._texCoordIndex;

      // Side

      for (let i = 0; i < dimension; ++ i)
         sideTexCoordIndex .push (i, i + 1, i + 2 + dimension, i + 1 + dimension, -1);

      // Bottom

      for (let i = dimension - 1; i > -1; -- i)
         bottomTexCoordIndex .push (2 * (dimension + 1) + i);

      bottomTexCoordIndex .push (-1);

      // Top

      for (let i = 0; i < dimension; ++ i)
         topTexCoordIndex .push (2 * (dimension + 1) + dimension + i);

      topTexCoordIndex .push (-1);
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
         const u = i/ dimension;

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

      // Top

      for (let i = 0; i < dimension; ++ i)
      {
         const
            u     = i / dimension,
            theta = 2 * Math .PI * u,
            t     = Complex .Polar (1, theta);

         point .push (new Vector2 (1 - (t .imag + 1) / 2, (t .real + 1) / 2));
      }
   },
   createNormalIndex ()
   {
      const
         dimension         = this ._dimension .getValue (),
         sideNormalIndex   = this .sideGeometry ._normalIndex,
         bottomNormalIndex = this .bottomGeometry ._normalIndex,
         topNormalIndex    = this .topGeometry ._normalIndex;

      // Side

      for (let i = 0; i < dimension; ++ i)
         sideNormalIndex .push (i, (i + 1) % dimension, (i + 1) % dimension, i, -1);

      // Bottom

      for (let i = 0; i < dimension; ++ i)
         bottomNormalIndex .push (dimension);

      bottomNormalIndex .push (-1);

      // Top

      for (let i = 0; i < dimension; ++ i)
         topNormalIndex .push (dimension + 1);

      topNormalIndex .push (-1);
   },
   createNormal ()
   {
      const
         dimension = this ._dimension .getValue (),
         vector    = this .sideGeometry ._normal .getValue () ._vector;

      // Side

      for (let i = 0; i < dimension; ++ i)
      {
         const
            u     = i / dimension,
            theta = 2 * Math .PI * u,
            n     = Complex .Polar (-1, theta);

         vector .push (new Vector3 (n .imag, 0, n .real));
      }

      // Bottom

      vector .push (new Vector3 (0, -1, 0));

      // Top

      vector .push (new Vector3 (0, 1, 0));
   },
   createCoordIndex ()
   {
      const
         dimension        = this ._dimension .getValue (),
         sideCoordIndex   = this .sideGeometry ._coordIndex,
         bottomCoordIndex = this .bottomGeometry ._coordIndex,
         topCoordIndex    = this .topGeometry ._coordIndex;

      // Side

      for (let i = 0; i < dimension; ++ i)
         sideCoordIndex .push (i, (i + 1) % dimension, (i + 1) % dimension + dimension, i + dimension, -1);

      // Bottom

      for (let i = dimension - 1; i > -1; -- i)
         bottomCoordIndex .push (i);

      bottomCoordIndex .push (-1);

      // Top

      for (let i = 0; i < dimension; ++ i)
         topCoordIndex .push (i + dimension);

      topCoordIndex .push (-1);
   },
   createPoints ()
   {
      const
         dimension = this ._dimension .getValue (),
         point     = this .sideGeometry ._coord .getValue () ._point;

      // Bottom

      for (let i = 0; i < dimension; ++ i)
      {
         const
            u     = i / dimension,
            theta = 2 * Math .PI * u,
            p     = Complex .Polar (-1, theta);

         point  .push (new Vector3 (p .imag, -1, p .real));
      }

      // Top

      for (let i = 0; i < dimension; ++ i)
      {
         const
            u     = i / dimension,
            theta = 2 * Math .PI * u,
            p     = Complex .Polar (-1, theta);

         point  .push (new Vector3 (p .imag, 1, p .real));
      }
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

      this .topGeometry            = new IndexedFaceSet (this .getExecutionContext ());
      this .topGeometry ._texCoord = this .sideGeometry ._texCoord;
      this .topGeometry ._normal   = this .sideGeometry ._normal;
      this .topGeometry ._coord    = this .sideGeometry ._coord;

      this .createTexCoordIndex ();
      this .createTexCoord ();
      this .createNormalIndex ();
      this .createNormal ();
      this .createCoordIndex ();
      this .createPoints ();

      const
         sideGeometry   = this .sideGeometry,
         bottomGeometry = this .bottomGeometry,
         topGeometry    = this .topGeometry,
         texCoord       = this .sideGeometry ._texCoord .getValue (),
         normal         = this .sideGeometry ._normal .getValue (),
         coord          = this .sideGeometry ._coord .getValue ();

      texCoord       .setup ();
      normal         .setup ();
      coord          .setup ();
      sideGeometry   .setup ();
      bottomGeometry .setup ();
      topGeometry    .setup ();
   },
   eventsProcessed ()
   {
      this .sideGeometry   = null;
      this .bottomGeometry = null;
      this .topGeometry    = null;
   },
});

Object .defineProperties (CylinderOptions,
{
   typeName:
   {
      value: "CylinderOptions",
      enumerable: true,
   },
});

export default CylinderOptions;

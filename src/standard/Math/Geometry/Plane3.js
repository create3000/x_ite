import Vector3 from "../Numbers/Vector3.js";
import Matrix4 from "../Numbers/Matrix4.js";

const
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
         .multVecMatrix (this .normal) .normalize ();

      // Transform the point by the matrix
      matrix .multMatrixVec (point);

      // The new distance is the projected distance of the vector to the
      // transformed point onto the (unit) transformed normal. This is
      // just a dot product.
      this .distanceFromOrigin = this .normal .dot (point);

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
         .multMatrixVec (this .normal) .normalize ();

      // Transform the point by the matrix
      matrix .multVecMatrix (point);

      // The new distance is the projected distance of the vector to the
      // transformed point onto the (unit) transformed normal. This is
      // just a dot product.
      this .distanceFromOrigin = this .normal .dot (point);

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

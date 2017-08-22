/* -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-*/

#pragma X3D include "Line3.h"

/* Plane */

struct Plane3
{
	vec3  normal;
	float distanceFromOrigin;
};

Plane3
plane3 (in vec3 point, in vec3 normal)
{
	return Plane3 (normal, dot (normal, point));
}

/* Plane intersect line */
bool
intersects (in Plane3 plane, in Line3 line, out vec3 point)
{
	point = vec3 (0.0);

	// Check if the line is parallel to the plane.
	float theta = dot (line .direction, plane .normal);

	// Plane and line are parallel.
	if (theta == 0.0)
		return false;

	// Plane and line are not parallel. The intersection point can be calculated now.
	float t = (plane .distanceFromOrigin - dot (plane .normal, line .point)) / theta;

	point = line .point + line .direction * t;

	return true;
}

///  Returns the closest point on the plane to a given point @a point.
vec3
closest_point (in Plane3 plane, in vec3 point)
{
	vec3 closest_point;
	intersects (plane, Line3 (point, plane .normal), closest_point);
	return closest_point;
}

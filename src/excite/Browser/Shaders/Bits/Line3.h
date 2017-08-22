/* -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-*/

/* Line */

struct Line3 {
	vec3 point;
	vec3 direction;
};

Line3
line3 (in vec3 point1, in vec3 point2)
{
	return Line3 (point1, normalize (point2 - point1));
}

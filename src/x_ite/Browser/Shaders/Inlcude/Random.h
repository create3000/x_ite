/* -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-*/

const int RAND_MAX = int (0x7fffffff);
const int RAND_MIN = int (0x80000000);

int seedValue = 0;

void
seed (in int value)
{
	seedValue = value;
}

// Return a uniform distributed random floating point number in the interval [-1, 1].
float
random1 ()
{
	return float (seedValue = seedValue * 1103515245 + 12345) / float (RAND_MAX);
}

vec2
random2 ()
{
	return vec2 (random1 (), random1 ());
}

vec3
random3 ()
{
	return vec3 (random1 (), random1 (), random1 ());
}

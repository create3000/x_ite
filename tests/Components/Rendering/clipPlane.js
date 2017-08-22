function set_translation (value)
{
	var distanceFromOrigin = new SFVec3f (0, 0, -1) .dot (value);

	plane_changed = new SFVec4f (0, 0, -1, -distanceFromOrigin);

	print (plane_changed);
}


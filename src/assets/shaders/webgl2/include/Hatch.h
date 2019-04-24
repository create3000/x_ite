
uniform x3d_FillPropertiesParameters x3d_FillProperties;

vec4
getHatchColor (vec4 color)
{
	vec4 finalColor = x3d_FillProperties .filled ? color : vec4 (0.0);

	if (x3d_FillProperties .hatched)
	{
		vec4 hatch = texture (x3d_FillProperties .hatchStyle, gl_FragCoord .xy / 32.0);

		hatch .rgb *= x3d_FillProperties .hatchColor;
		finalColor  = mix (finalColor, hatch, hatch .a);
	}

	return finalColor;
}

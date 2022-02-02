
define ('x_ite/Browser/Shaders/ShaderSource',[
],
function ()
{
"use strict";

	return {
		get: function (gl, source)
		{
			return source;
		},
	};
});

for (const key in x_iteNoConfict)
{
	if (x_iteNoConfict [key] === undefined)
		delete window [key];
	else
		window [key] = x_iteNoConfict [key];
}

})
(typeof module === "object" ? module : undefined, typeof require === "function" ? require : undefined);

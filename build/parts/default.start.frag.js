(function (globalModule, globalRequire)
{

if (typeof __filename === "undefined")
{
	globalModule  = undefined;
	globalRequire = undefined;
}

// Undefine global variables.
var module = { }, exports, process;

const
	define  = X3D .define,
	require = X3D .require;

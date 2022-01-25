(function (nodeModule, nodeRequire, nodeProcess) {

if (typeof X3D === "undefined")
	return;

var
	define  = X3D .define,
	require = X3D .require;

var module = { }, exports, process;

if (nodeProcess === undefined)
{
	nodeModule  = undefined;
	nodeRequire = undefined;
}

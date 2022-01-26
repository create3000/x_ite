(function (nodeModule, nodeRequire, __filename)
{

// Undefine global variables.
var module, exports, process;

if (typeof __filename === "undefined")
{
	nodeModule  = undefined;
	nodeRequire = undefined;
}

const x_iteNoConfict = {
	sprintf:  window .sprintf,
	vsprintf: window .vsprintf,
};

(function (globalModule, globalRequire, globalProcess)
{

if (typeof __filename === "undefined")
{
	globalModule  = undefined;
	globalRequire = undefined;
	globalProcess = undefined;
}

// Undefine global variables.
var module, exports, process;

const x_iteNoConfict = {
	sprintf:  window .sprintf,
	vsprintf: window .vsprintf,
};

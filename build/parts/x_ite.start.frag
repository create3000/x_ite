(function (nodeModule, nodeRequire, nodeProcess) {

var x_iteNoConfict = {
	sprintf:  window .sprintf,
	vsprintf: window .vsprintf,
};

var module, exports, process;

if (nodeProcess === undefined)
{
	nodeModule  = undefined;
	nodeRequire = undefined;
}

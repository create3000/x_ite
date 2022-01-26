(function (nodeModule, nodeRequire, __filename) {

var x_iteNoConfict = {
	sprintf:  window .sprintf,
	vsprintf: window .vsprintf,
};

var module, exports, process;

if (__filename === undefined)
{
	nodeModule  = undefined;
	nodeRequire = undefined;
}

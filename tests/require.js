const X3D = require ("../src/x_ite.js")
const browser = X3D .getBrowser ()
const scene = browser .currentScene;
const nodes = scene .addRoute ();
const r = scene .rootNodes;
const n = scene .createNode ("NavigationInfo");

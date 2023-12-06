const X3D = require ("../src/x_ite.js")
const browser = X3D .createBrowser () .browser;
const scene = browser .currentScene;
const nodes = scene .addRoute ();
const r = scene .rootNodes;
const n = scene .createNode ("Appearance");
n .blendMode .destinationAlphaFactor = 'ON'

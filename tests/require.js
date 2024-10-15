const X3D = require ("../src/x_ite.js")
const browser = X3D .createBrowser () .browser;
const scene = browser .currentScene;
const route = scene .addRoute ();
const r = scene .rootNodes;
const n = scene .createNode ("Appearance");
const t = X3D .X3DConstants .AcousticProperties;
n .blendMode .destinationAlphaFactor = 'ON'

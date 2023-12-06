import X3D from "../src/x_ite.js";

const browser = X3D .createBrowser () .browser;
const scene = browser .currentScene;
const nodes = scene .addRoute ();
const r = scene .rootNodes;
const n = scene .createNode ("Transform");
const c = n .children [0] .metadata;

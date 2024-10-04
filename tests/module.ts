import X3D from "../src/x_ite.js";

const browser = X3D .createBrowser () .browser;
const scene = browser .currentScene;
const route = scene .addRoute ();
const r = scene .rootNodes;
const n = scene .createNode ("BlendMode");
const a = [... n .getFieldDefinitions ()]

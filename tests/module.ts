import X3D from "../src/x_ite.js";

const browser = X3D .createBrowser () .browser;
const scene = browser .currentScene;
const route = scene .addRoute ();
const r = scene .rootNodes;
const n = scene .createNode ("BlendMode");
const a = [... n .getFieldDefinitions ()]
const t = X3D .X3DConstants .AcousticProperties;
const m = new X3D .MFBool (0,1,0);
m .push (123)
const f = Float16Array .from ([true, false]);
f [0] = true;

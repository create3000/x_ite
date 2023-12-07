import X3D from "../src/x_ite.js";

const browser = X3D .createBrowser () .browser;
const scene = browser .currentScene;
const nodes = scene .addRoute ();
const r = scene .rootNodes;
const n = scene .createNode ("Transform");
n .children .push (null)

X3D .X3DConstants .COMPLETE_STATE

scene .protos [0] .fields [0] .accessType = X3D .X3DConstants .initializeOnly;

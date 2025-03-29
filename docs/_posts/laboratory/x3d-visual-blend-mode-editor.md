---
title: X3D Visual Blend Mode Editor
date: 2023-02-21
layout: wide
categories: [Laboratory]
tags: [X3D, Visual, Blend Mode, Editor, Laboratory]
---
<style>
/* Viewer */
.viewer {
  padding: 1rem 2rem;
  width: 100vw;
}

.viewer-row {
  display: flex;
  width: calc(100vw - 6rem);
}

.viewer-column-70 {
  flex: 70%;
  height: 100%;
}

.viewer-column-30 {
  flex: 30%;
  height: 100%;
  padding-left: 2rem;
  white-space: nowrap;
}

img.icon {
  position: relative;
  top: -2px;
}

select.select {
  display: inline-block;
  margin-left: 0.5rem;
  width: auto;
}
</style>

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/cferdinandi/tabby@12.0.0/dist/css/tabby-ui.min.css">
<script defer src="https://cdn.jsdelivr.net/gh/cferdinandi/tabby@12.0.0/dist/js/tabby.polyfills.min.js"></script>

<link rel="stylesheet" href="/x_ite/assets/laboratory/blend-mode/style.css">
<script type="module" src="/x_ite/assets/laboratory/blend-mode/blend-mode.mjs"></script>

<div class="viewer">
<div class="viewer-row">
  <div class="viewer-column-70">
    <x3d-canvas class="blend-mode checkerboard" src="/x_ite/assets/laboratory/blend-mode/blend-mode.x3d" splashScreen="false"></x3d-canvas>
  </div>
  <div class="viewer-column-30">
    <small class="small">Source (foreground):</small>
    <br>
    <img class="icon" alt="color wheel" src="/x_ite/assets/laboratory/blend-mode/assets/color-wheel.png">
    <select id="source-color" class="select">
      <option>ZERO</option>
      <option>ONE</option>
      <option>SRC_COLOR</option>
      <option>ONE_MINUS_SRC_COLOR</option>
      <option>DST_COLOR</option>
      <option>ONE_MINUS_DST_COLOR</option>
      <option selected="selected">SRC_ALPHA</option>
      <option>ONE_MINUS_SRC_ALPHA</option>
      <option>DST_ALPHA</option>
      <option>ONE_MINUS_DST_ALPHA</option>
      <option>SRC_ALPHA_SATURATE</option>
      <option>CONSTANT_COLOR</option>
      <option>ONE_MINUS_CONSTANT_COLOR</option>
      <option>CONSTANT_ALPHA</option>
      <option>ONE_MINUS_CONSTANT_ALPHA</option>
    </select>
    <br>
    <img class="icon" alt="contrast" src="/x_ite/assets/laboratory/blend-mode/assets/contrast.png">
    <select id="source-alpha" class="select">
      <option>ZERO</option>
      <option selected="selected">ONE</option>
      <option>SRC_COLOR</option>
      <option>ONE_MINUS_SRC_COLOR</option>
      <option>DST_COLOR</option>
      <option>ONE_MINUS_DST_COLOR</option>
      <option>SRC_ALPHA</option>
      <option>ONE_MINUS_SRC_ALPHA</option>
      <option>DST_ALPHA</option>
      <option>ONE_MINUS_DST_ALPHA</option>
      <option>SRC_ALPHA_SATURATE</option>
      <option>CONSTANT_COLOR</option>
      <option>ONE_MINUS_CONSTANT_COLOR</option>
      <option>CONSTANT_ALPHA</option>
      <option>ONE_MINUS_CONSTANT_ALPHA</option>
    </select>
    <br>
    <small class="small">Destination (background):</small>
    <br>
    <img class="icon" alt="color wheel" src="/x_ite/assets/laboratory/blend-mode/assets/color-wheel.png">
    <select id="destination-color" class="select">
      <option>ZERO</option><option>ONE</option>
      <option>SRC_COLOR</option>
      <option>ONE_MINUS_SRC_COLOR</option>
      <option>DST_COLOR</option>
      <option>ONE_MINUS_DST_COLOR</option>
      <option>SRC_ALPHA</option>
      <option selected="selected">ONE_MINUS_SRC_ALPHA</option>
      <option>DST_ALPHA</option>
      <option>ONE_MINUS_DST_ALPHA</option>
      <option>SRC_ALPHA_SATURATE</option>
      <option>CONSTANT_COLOR</option>
      <option>ONE_MINUS_CONSTANT_COLOR</option>
      <option>CONSTANT_ALPHA</option>
      <option>ONE_MINUS_CONSTANT_ALPHA</option>
    </select>
    <br>
    <img class="icon" alt="contrast" src="/x_ite/assets/laboratory/blend-mode/assets/contrast.png">
    <select id="destination-alpha" class="select">
      <option>ZERO</option>
      <option>ONE</option>
      <option>SRC_COLOR</option>
      <option>ONE_MINUS_SRC_COLOR</option>
      <option>DST_COLOR</option>
      <option>ONE_MINUS_DST_COLOR</option>
      <option>SRC_ALPHA</option>
      <option selected="selected">ONE_MINUS_SRC_ALPHA</option>
      <option>DST_ALPHA</option>
      <option>ONE_MINUS_DST_ALPHA</option>
      <option>SRC_ALPHA_SATURATE</option>
      <option>CONSTANT_COLOR</option>
      <option>ONE_MINUS_CONSTANT_COLOR</option>
      <option>CONSTANT_ALPHA</option>
      <option>ONE_MINUS_CONSTANT_ALPHA</option>
    </select>
    <br>
    <small class="small">Blend equation:</small>
    <br>
    <img class="icon" alt="color wheel" src="/x_ite/assets/laboratory/blend-mode/assets/color-wheel.png">
    <select id="equation-color" class="select">
      <option selected="selected">FUNC_ADD</option>
      <option>FUNC_SUBTRACT</option>
      <option>FUNC_REVERSE_SUBTRACT</option>
      <option>MIN</option><option>MAX</option>
    </select>
    <br>
    <img class="icon" alt="contrast" src="/x_ite/assets/laboratory/blend-mode/assets/contrast.png">
    <select id="equation-alpha" class="select">
      <option selected="selected">FUNC_ADD</option>
      <option>FUNC_SUBTRACT</option>
      <option>FUNC_REVERSE_SUBTRACT</option>
      <option>MIN</option>
      <option>MAX</option>
    </select>
    <br>
    <small class="small">Resulting equations:</small>
    <table>
      <tbody>
        <tr class="red">
          <td>Red:</td>
          <td id="red-equation"></td>
        </tr>
        <tr class="green">
          <td>Green:</td>
          <td id="green-equation"></td>
        </tr><tr class="blue">
          <td>Blue:</td><td id="blue-equation"></td>
        </tr>
        <tr>
          <td>Alpha:</td><td id="alpha-equation"></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<br>

<ul data-image-presets-tabs>
  <li><a data-tabby-default href="#preset-images">Image Presets</a></li>
  <li><a href="#image-urls">Image URLs</a></li>
  <li><a href="#blend-color">Blend Color</a></li>
</ul>

<div id="preset-images">
  <small class="small">Foreground:</small>
  <div id="foreground-images">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/lena.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/earth.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/panther.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/flower.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/cloud.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/forest.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/city.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/death-star.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/colors.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/golden-gate-bridge.jpeg">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/water.jpeg">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/sunset.jpeg">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/night-sky.jpeg">
  </div>
  <small class="small">Background:</small>
  <div id="background-images">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/lena.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/earth.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/panther.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/flower.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/cloud.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/forest.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/city.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/death-star.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/colors.png">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/lake.jpeg">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/desktop.jpeg">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/city-night.jpeg">
    <img alt="example image" src="/x_ite/assets/laboratory/blend-mode/assets/images/castle.jpeg">
  </div>
</div>
<div id="image-urls">
  <small class="small">Foreground:</small>
  <input class="url" id="foreground-url" type="text">
  <small class="small">Background:</small>
  <input class="url" id="background-url" type="text">
  <button id="change-urls">Apply</button>
</div>
<div id="blend-color">
  <div class="color checkerboard"></div>
  <div class="color" style="background: #ffffff;"></div>
  <div class="color" style="background: #000000;"></div>
  <div class="color" style="background: #ff0000;"></div>
  <div class="color" style="background: #00ff00;"></div>
  <div class="color" style="background: #0000ff;"></div>
  <div class="color" style="background: #00ffff;"></div>
  <div class="color" style="background: #ff00ff;"></div>
  <div class="color" style="background: #ffff00;"></div>
  <div class="color" style="background: #E77557;"></div>
  <div class="color" style="background: #E7508B;"></div>
  <div class="color" style="background: #8674E7;"></div>
  <div class="color" style="background: #76E7B3;"></div>
</div>

<h2>Source Code</h2>

<ul data-encoding-tabs>
  <li><a data-tabby-default href="#xml-encoding">XML Encoding</a></li>
  <li><a href="#vrml-encoding">Classic VRML Encoding</a></li>
</ul>

<div id="xml-encoding"><div id="XML">XML</div></div>
<div id="vrml-encoding"><div id="VRML">VRML</div></div>

<h2>See Also</h2>
<ul>
  <li><a href="../../components/x-ite/blendmode/">BlendMode</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFunc">WebGLRenderingContext.blendFunc()</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFuncSeparate">WebGLRenderingContext.blendFuncSeparate()</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquation">WebGLRenderingContext.blendEquation()</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquationSeparate">WebGLRenderingContext.blendEquationSeparate()</a></li>
</ul>

<script type="module">
new Tabby ("[data-image-presets-tabs]");
new Tabby ("[data-encoding-tabs]");
</script>
</div>

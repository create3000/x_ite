---
title: 3D L-System Generator
date: 2023-02-21
layout: wide
categories: [Laboratory]
tags: [3D, L-System, Generator, Laboratory]
---
<style>
/* Viewer */
.viewer {
  padding: 1rem 2rem;
}

/* Table */
table {
  width: 100%;
  height: 100%;
}

/* Canvas */
x3d-canvas {
  height: 60vh;
  width: 100%;
  aspect-ratio: unset;
}
</style>

<script defer src="https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/huebee@2.1.1/dist/huebee.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/huebee@2.1.1/dist/huebee.pkgd.min.js"></script>

<link rel="stylesheet" href="/x_ite/assets/laboratory/l-system/style.css">
<script type="module" src="/x_ite/assets/laboratory/l-system/l-system.mjs"></script>

<div class="viewer">
<table class="l-system">
  <tbody>
    <tr>
      <td style="width: 50%;">
        <x3d-canvas class="l-system" splashScreen="false" update="auto" src="/x_ite/assets/laboratory/l-system/l-system.x3d"></x3d-canvas>
        <p>
          <a class="download l-system" href="#">Download X3D File</a>
          |
          <a class="reset-view" href="#">Reset View</a>
          |
          <small class="small lines">0 Lines</small>
        </p>
      </td>
      <td style="padding-left: 1.5rem;">
        <table class="l-system-options">
          <tbody>
            <tr>
              <td>Iterations:</td>
              <td>
                <input id="iterations" max="15" min="0" title="Number of iterations." type="number" value="8">
              </td>
            </tr>
            <tr>
              <td>U Tilt:</td>
              <td>
                <input id="u-tilt" max="180" min="-180" title="Rotation about the local x-axis (\/)." type="number" value="0">
              </td>
            </tr>
            <tr>
              <td>V Tilt:</td>
              <td>
                <input id="v-tilt" max="180" min="-180" title="Rotation about the local z-axis (-+)." type="number" value="45">
              </td>
            </tr>
            <tr>
              <td>Twist:</td>
              <td>
                <input id="twist" max="180" min="-180" title="Rotation about the local y-axis (<>)." type="number" value="0">
              </td>
            </tr>
            <tr>
              <td>Angle Variation:</td>
              <td>
                <input id="angle-variation" max="1000" min="0" step="0.01" title="The variation is a multiplier for the randomness that is used to control the range of possible output values." type="number" value="0">
              </td>
            </tr>
            <tr>
              <td>Length Variation:</td>
              <td>
                <input id="length-variation" max="1000" min="0" step="0.01" title="The variation is a multiplier for the randomness that is used to control the range of possible output values." type="number" value="0">
              </td>
            </tr>
            <tr>
              <td>Constants:</td>
              <td>
                <input id="constants" title="Constants are symbols which will be replaced but not be drawn." type="text">
              </td>
            </tr>
            <tr>
              <td>Axiom:</td>
              <td>
                <input id="axiom" title="Starting rule." type="text" value="B">
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Rules:</td>
              <td>
                <table class="l-system-rules" title="a-zA-Z0-9 draw line along local y-axis, \ counterclockwise rotation about local x-axis, / clockwise rotation about local x-axis, > counterclockwise rotation about local y-axis, < clockwise rotation about local y-axis, + counterclockwise rotation about local z-axis, - clockwise rotation about local z-axis, | turn around 180° #0-9 color index">
                  <tbody>
                    <tr>
                      <td>
                        <input id="rule-0" type="text" value="A=#0AA">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input id="rule-1" type="text" value="B=#1A[+B]-B">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input id="rule-2" type="text" value="">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input id="rule-3" type="text" value="">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input id="rule-4" type="text" value="">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input id="rule-5" type="text" value="">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

<h3>Colors</h3>
<div id="colors"></div>

<h3>Predefined L-Systems</h3>

<img alt="Example Image" class="predefined" src="/x_ite/assets/laboratory//l-system/images/image1.png">
<img alt="Example Image" class="predefined" src="/x_ite/assets/laboratory//l-system/images/image2.png">
<img alt="Example Image" class="predefined" src="/x_ite/assets/laboratory//l-system/images/image3.png">
<img alt="Example Image" class="predefined" src="/x_ite/assets/laboratory//l-system/images/image4.png">
<img alt="Example Image" class="predefined" src="/x_ite/assets/laboratory//l-system/images/image5.png">
<img alt="Example Image" class="predefined" src="/x_ite/assets/laboratory//l-system/images/image6.png">
<img alt="Example Image" class="predefined" src="/x_ite/assets/laboratory//l-system/images/image7.png">
<img alt="Example Image" class="predefined" src="/x_ite/assets/laboratory//l-system/images/image8.png">
<img alt="Example Image" class="predefined" src="/x_ite/assets/laboratory//l-system/images/image9.png">

<h2>See Also</h2>
<ul>
  <li><a href="https://en.wikipedia.org/wiki/L-system">https://en.wikipedia.org/wiki/L-system</a></li>
</ul>
</div>

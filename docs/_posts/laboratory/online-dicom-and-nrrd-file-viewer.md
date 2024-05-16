---
title: Online DICOM and NRRD file Viewer
date: 2023-02-21
layout: wide
categories: [Laboratory]
tags: [Online, DICOM, NRRD, File, Viewer, Laboratory]
---
<style>
/* Table */

table {
  width: 100%;
  height: 100%;
  table-layout: fixed;
}

table td {
   vertical-align: top;
   padding-right: 2rem;
}

/* Canvas */

x3d-canvas {
   height: 60vh;
   width: 100%;
   aspect-ratio: unset;
}

/* Buttons */

#dicom-buttons input {
   margin-right: 1.5rem;
}

#dicom-buttons input:last-child {
   margin-right: 0;
}

/* Samples */

#core-wrapper table h3 {
   margin-top: 0;
}
</style>

<script type="module" src="https://create3000.github.io/media/laboratory/dicom/dicom.mjs"></script>

<p>Click »Choose File« and select a DICOM P10 or NRRD file from your local file system.</p>

<table>
   <tr>
      <td>
         <x3d-canvas splashScreen="false" src="https://create3000.github.io/media/laboratory/dicom/dicom.x3d"></x3d-canvas>
         <p id="dicom-buttons"></p>
      </td>
      <td style="width: 30%;">
         <h3>Sample Images</h3>
         <ul id="dicom-samples">
            <li><a href="https://create3000.github.io/media/laboratory/dicom/datasets/CT1_J2KR.dcm">CT1_J2KR.dcm</a></li>
            <li><a href="https://create3000.github.io/media/laboratory/dicom/datasets/MR-MONO2-12-shoulder.dcm">MR-MONO2-12-shoulder.dcm</a></li>
            <li><a href="https://create3000.github.io/media/laboratory/dicom/datasets/paramap.dcm">paramap.dcm</a></li>
            <li><a href="https://create3000.github.io/media/laboratory/dicom/datasets/US-PAL-8-10x-echo.dcm">US-PAL-8-10x-echo.dcm</a></li>
            <li><a href="https://create3000.github.io/media/laboratory/dicom/datasets/VL1_J2KI.dcm">VL1_J2KI.dcm</a></li>
         </ul>
      </td>
   </tr>
</table>

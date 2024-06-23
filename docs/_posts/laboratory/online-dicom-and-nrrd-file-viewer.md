---
title: Online DICOM and NRRD file Viewer
date: 2023-02-21
layout: wide
categories: [Laboratory]
tags: [Online, DICOM, NRRD, File, Viewer, Laboratory]
---
<style>
/* Paragraph */
article > p {
   padding: 0 2rem;
}

p {
   margin: 1rem 0;
}

/* Viewer */
.viewer {
   box-sizing: border-box;
   height: 100%;
   border-top: 1px solid var(--main-border-color);
   height: calc(100vh - 128px - 3.8rem);
}

.viewer-row {
   display: flex;
   height: calc(100% - 4rem);
}

.viewer-column-70 {
   flex: 70%;
   width: 70%;
   height: 100%;
}

.viewer-column-30 {
   flex: 30%;
   width: 30%;
   height: 100%;
   padding-top: 1rem;
   padding-left: 2rem;
}

/* Canvas */
x3d-canvas {
   width: 100%;
   height: 100%;
   aspect-ratio: unset;
}

/* Buttons */

.viewer .toolbar {
   box-sizing: border-box;
   border-top: 1px solid var(--main-border-color);
}

#dicom-buttons {
   padding: 0 2rem;
}

#dicom-buttons input {
   margin-right: 1.5rem;
}

#dicom-buttons input:last-child {
   margin-right: 0;
}
</style>

<script type="module" src="/x_ite/assets/laboratory/dicom/dicom.mjs"></script>

<p>Click »Choose File« and select a DICOM P10 or NRRD file from your local file system.</p>

<div class="viewer">
   <div class="viewer-row">
      <div class="viewer-column-70">
         <x3d-canvas splashScreen="false" src="/x_ite/assets/laboratory/dicom/dicom.x3d"></x3d-canvas>
      </div>
      <div class="viewer-column-30">
         <b>Sample Images</b>
         <br>
         <ul id="dicom-samples">
            <li><a href="/x_ite/assets/laboratory/dicom/datasets/CT1_J2KR.dcm">CT1_J2KR.dcm</a></li>
            <li><a href="/x_ite/assets/laboratory/dicom/datasets/MR-MONO2-12-shoulder.dcm">MR-MONO2-12-shoulder.dcm</a></li>
            <li><a href="/x_ite/assets/laboratory/dicom/datasets/MR1_JPLL.dcm">MR1_JPLL.dcm</a></li>
            <li><a href="/x_ite/assets/laboratory/dicom/datasets/RG3_RLE.dcm">RG3_RLE.dcm</a></li>
            <li><a href="/x_ite/assets/laboratory/dicom/datasets/paramap.dcm">paramap.dcm</a></li>
            <li><a href="/x_ite/assets/laboratory/dicom/datasets/US-PAL-8-10x-echo.dcm">US-PAL-8-10x-echo.dcm</a></li>
            <li><a href="/x_ite/assets/laboratory/dicom/datasets/VL1_J2KI.dcm">VL1_J2KI.dcm</a></li>
         </ul>
      </div>
   </div>
   <div class="toolbar">
      <p id="dicom-buttons"></p>
   </div>
</div>

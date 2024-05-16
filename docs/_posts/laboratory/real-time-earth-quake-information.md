---
title: Real Time Earth Quake Information
date: 2023-02-21
layout: wide
categories: [Laboratory]
tags: [Real Time, Earth Quake, Laboratory]
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

</style>

<script type="module" src="https://create3000.github.io/media/laboratory/earthquakes/earthquakes.mjs"></script>

<p>
   This page uses data from the <a href="https://earthquake.usgs.gov" target="_blank">USGS Earthquakes Hazards Program (EHP)</a> to provide real-time earthquake information.
</p>

<table>
   <tr>
      <td><x3d-canvas src="https://create3000.github.io/media/laboratory/earthquakes/earthquakes.x3d" splashScreen="false"></x3d-canvas></td>
      <td style="width: 30%;">
         <p>
            <select id="time">
               <option value="3">Past 30 Days</option>
               <option value="2">Past 7 Days</option>
               <option selected="selected" value="1">Past Day</option>
               <option value="0">Past Hour</option>
            </select>
         </p>
         <div class="locations"></div>
      </td>
   </tr>
</table>

---
title: Real Time Earth Quake Information
date: 2023-02-21
layout: wide
categories: [Laboratory]
tags: [Real Time, Earth Quake, Laboratory]
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
  height: 100%;
}

.viewer-column-80 {
  flex: 80%;
  width: 80%;
  height: 100%;
}

.viewer-column-20 {
  flex: 20%;
  width: 20%;
  height: 100%;
}

.locations {
  height: calc(100% - 4rem);
}

.link-list {
  overflow-y: scroll;
  height: 100%;
  user-select: none;
}

x3d-canvas {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: unset;
}
</style>

<script defer src="https://cdn.jsdelivr.net/npm/d3@latest/dist/d3.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/d3-x3d@latest/dist/d3-x3d.min.js"></script>

**D3-X3D** is an external JavaScript library that combines the power of **D3.js** with X3D and can be found on [GitHub](https://github.com/jamesleesaunders/d3-x3d#d3-x3d) with even more examples and documentation.

<div class="viewer">
  <div class="viewer-row">
    <div class="viewer-column-80">
      <x3d-canvas
          id="chartholder"
          splashScreen="false"
          contentScale="auto"></x3d-canvas>
    </div>
    <div class="viewer-column-20">
      <div class="table-wrapper">
        <table>
          <tr>
            <td>UK:</td>
            <td><input type="checkbox" name="country" id="uk" checked value="UK"/></td>
          </tr>
          <tr>
            <td>France:</td>
            <td><input type="checkbox" name="country" id="france" checked value="France"/></td>
            </tr>
            <tr>
            <td>Spain:</td>
            <td><input type="checkbox" name="country" id="spain" value="Spain"/></td>
            </tr>
            <tr>
            <td>Germany:</td>
            <td><input type="checkbox" name="country" id="germany" checked value="Germany"/></td>
            </tr>
            <tr>
            <td>Italy:</td>
            <td><input type="checkbox" name="country" id="italy" value="Italy"/></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>

<script type="module">
if (!Array.prototype.includes) {
  Array.prototype.includes = function() {
     'use strict';
     return Array.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

// Select chartholder
var chartHolder = d3.select("#chartholder");

// Generate some data
var data = d3.x3d.randomData.dataset2();

// Declare the chart component
var myChart = d3.x3d.chart.areaChartMultiSeries();

var checks = d3.selectAll("input[type=checkbox]");

window .refreshChart = function() {
  var filterArray = [];

  checks.each(function() {
     var check = d3.select(this);
     var checked = check.property("checked");
     if (checked) {
     filterArray.push(check.attr("value"));
     }
  });

  var filteredData = data.filter(function(series) { return filterArray.includes(series.key) });

  chartHolder.datum(filteredData).call(myChart);
};

for (var i = 0; i < checks.length; i++) {
  checks[i].onchange = refreshChart;
}

checks.each(function() {
  var check = d3.select(this);
  check.attr("onchange", "refreshChart()");
});

refreshChart();
</script>

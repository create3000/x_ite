---
title: Releases
date: 2024-05-23
nav: main
categories: []
tags: [Releases]
---
## Latest Stable Version

When deploying X_ITE in a production environment, it's crucial to select and use a fixed, stable version to ensure reliability and avoid potential issues arising from updates or changes. Using a fixed version minimizes the risk of unexpected behavior or compatibility problems that could disrupt your application.

To find the appropriate version for your needs, you can refer to the list of all available versions [on npm](https://www.npmjs.com/package/x_ite?activeTab=versions), where detailed version history and related documentation are available. This approach helps maintain a consistent and predictable production setup, ensuring that your application runs smoothly and efficiently.

There are compressed (x_ite.min.js) and uncompressed (x_ite.js) versions available.

### jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.mjs";
</script>
```

```html
<script src="https://cdn.jsdelivr.net/gh/create3000/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://cdn.jsdelivr.net/gh/create3000/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.mjs";
</script>
```

### UNPKG CDN

```html
<script src="https://www.unpkg.com/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://www.unpkg.com/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.mjs";
</script>
```

## For Development

You can opt for the »latest« tag to ensure you always have the most recent version, instead of using a fixed version number.

You should **NOT** use this in a production environment, as there may be breaking changes between major releases.

### jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/x_ite@latest/dist/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@latest/dist/x_ite.min.mjs";
</script>
```

```html
<script src="https://cdn.jsdelivr.net/gh/create3000/x_ite@latest/dist/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://cdn.jsdelivr.net/gh/create3000/x_ite@latest/dist/x_ite.min.mjs";
</script>
```

### UNPKG CDN

```html
<script src="https://www.unpkg.com/x_ite@latest/dist/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://www.unpkg.com/x_ite@latest/dist/x_ite.min.mjs";
</script>
```

### GitHub CDN

```html
<script src="https://create3000.github.io/code/x_ite/latest/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://create3000.github.io/code/x_ite/latest/x_ite.min.mjs";
</script>
```

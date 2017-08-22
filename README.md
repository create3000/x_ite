<img alt="Excite X3D" src="https://rawgit.com/create3000/excite/master/meta/logo/logo.svg" width="60" height="60"/>

[Excite](http://create3000.de/excite-x3d/) — Excite X3D WebGL Browser
==================================================


Introduction
--------------------------------------

Excite X3D is a work in progress. The goal is a full standard WebGL X3D browser for all major web browsers.

For more information and live preview please visit [http://create3000.de/excite-x3d/](http://create3000.de/excite-x3d/).


Links
--------------------------------------
* [Getting Started](http://create3000.de/excite-x3d/getting-started/)
* [What’s New](http://create3000.de/excite-x3d/whats-new/)
* [Supported Nodes](http://create3000.de/excite-x3d/supported-nodes/)
* [Accessing the External Browser](http://create3000.de/excite-x3d/accessing-the-external-browser/)
* [XHTML DOM Integration](http://create3000.de/excite-x3d/xhtml-dom-integration/)
* [Custom Shaders](http://create3000.de/excite-x3d/shaders/)

Embedding Excite X3D within a Web Page
--------------------------------------

To display your X3D scene in a HTML5 page first save your scene as X3D XML Encoded file or as X3D Classic Encoded file, i.e. create a file with the extension .x3d ,.x3dv or .wrl. 

The HTML5 page is quite easy to create, the HTML5 code below shows you the minimum requirements. The path to the X3D scene is specified in the src attribute of the <X3DCanvas> tag. 

**Note:** it is important to use a HTML5 page and to save it as .html file. 

    <!DOCTYPE html>
      <html>
       <head>
        <meta charset="utf-8"/>
        <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/create3000/excite/latest/excite.js/excite.css"/>
        <script type="text/javascript" src="https://cdn.rawgit.com/create3000/excite/latest/excite.js/excite.min.js"></script>
        <style>
        X3DCanvas {
          width: 768px;
          height: 432px;
        }
        </style>
      </head>
      <body>
        <X3DCanvas src="path/to/your/X3D/world.x3d">
          <p>Your browser may not support all features required by Excite X3D!</p>
        </X3DCanvas>
      </body>
    </html>

To get Excite X3D working you must include the CSS file »excite.css« and the JavaScript file »excite.min.js «. After excite is successfully loaded a new HTML tag <X3DCanvas> is available on your page.

You can style the <X3DCanvas> tag as every HTML tag with CSS as well as you can place it everywhere within the DOM tree. 


### Supported File Formats

As of version 1.19, Excite X3D can now parse either X3D XML Encoding or X3D Classic Encoding. This gives authors the capability to display their existing projects like .wrl worlds, too.

Additionally files can be compressed using GZip compression.


### Fallback Content

The <X3DCanvas> element is equal to the <canvas> element in that, it is easy to define some fallback content, to be displayed in older browsers not supporting it, like currently all other browsers than the recent version of Firefox or older versions of that. You should always provide fallback content to be displayed by those browsers.

Providing fallback content is very straightforward: just insert the alternate content inside the <X3DCanvas> element. Browsers that don't support <X3DCanvas> will ignore the container and render the fallback content inside it. Browsers that do support <X3DCanvas> will ignore the content inside the container, and just render the canvas normally.

For example, we could provide a text description of the X3D element or provide a static image of the dynamically rendered content. This can look something like this: 

    <X3DCanvas src="world.x3d">
       <p>Current stock price: $3.15 +0.15</p>
    </X3DCanvas>

    <X3DCanvas src="world.x3dv">
       <img src="images/clock.png"/>
    </X3DCanvas>


Attributes of the X3DCanvas Tag
--------------------------------------

The HTML **<X3DCanvas> tag** defines the main content of the X3D document. The <X3DCanvas> tag has two attributes that define different behaviours. All of these attributes are optional. 


### src

A String value with the URL that should be loaded on page load. If no URL is specified or the src field is empty an empty scene is displayed.


### cache

A Boolean value (true or false) to indicate whether files transferred over the internet should be cached on the local computer. The default value for the cache attribute is true. It works by appending "_={timestamp}" to the GET parameters of every request.
Example

`<X3DCanvas cache="true" src="path/to/your/X3D/world.x3d"></X3DCanvas>`


Programmer's Style Guide
--------------------------------------
Programmers who want to work on Excite X3D shall first read the [Style Guide](STYLE_GUIDE.md).


Tests
--------------------------------------
[Excite X3D Test Page](http://rawgit.com/create3000/excite/master/excite.min.html)


Authors
--------------------------------------
All authors contributed to this project can be found in the [list of authors](AUTHORS.md).


License
--------------------------------------
Excite X3D is free software: you can redistribute it and/or modify it under the terms of 
the [GNU General Public License version 3](LICENSE.md) only, as published by the Free Software Foundation.

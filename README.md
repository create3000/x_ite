<img alt="X_ITE" src="https://rawgit.com/create3000/x_ite/master/meta/logo/logo.svg" width="60" height="60"/>

[X_ITE](http://create3000.de/x_ite/) — X_ITE WebGL Browser
==================================================


Introduction
--------------------------------------

X_ITE is a work in progress. The goal is a full standard WebGL X3D browser for all major web browsers.

For more information and live preview please visit [http://create3000.de/x_ite/](http://create3000.de/x_ite/).


Links
--------------------------------------
* [Getting Started](http://create3000.de/x_ite/getting-started/)
* [What’s New](http://create3000.de/x_ite/whats-new/)
* [Supported Nodes](http://create3000.de/x_ite/supported-nodes/)
* [Accessing the External Browser](http://create3000.de/x_ite/accessing-the-external-browser/)
* [XHTML DOM Integration](http://create3000.de/x_ite/xhtml-dom-integration/)
* [Custom Shaders](http://create3000.de/x_ite/shaders/)

Embedding X_ITE within a Web Page
--------------------------------------

To display your X3D scene in a HTML5 page first save your scene as X3D XML Encoded file or as X3D Classic Encoded file, i.e. create a file with the extension .x3d ,.x3dv or .wrl. 

The HTML5 page is quite easy to create, the HTML5 code below shows you the minimum requirements. The path to the X3D scene is specified in the src attribute of the <X3DCanvas> tag. 

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <link rel="stylesheet" type="text/css" href="http://code.create3000.de/x_ite/latest/dist/x_ite.css"/>
        <script type="text/javascript" src="http://code.create3000.de/x_ite/latest/dist/x_ite.min.js"></script>
        <style>
        X3DCanvas {
          width: 768px;
          height: 432px;
        }
        </style>
      </head>
      <body>
        <X3DCanvas src="path/to/your/X3D/world.x3d">
          <p>Your browser may not support all features required by X_ITE!</p>
        </X3DCanvas>
      </body>
    </html>

To get X_ITE working you must include the CSS file »x_ite.css« and the JavaScript file »x_ite.min.js «. After x_ite is successfully loaded a new HTML tag <X3DCanvas> is available on your page.

You can style the <X3DCanvas> tag as every HTML tag with CSS as well as you can place it everywhere within the DOM tree. 


### Supported File Formats

As of version 1.19, X_ITE can now parse either X3D XML Encoding or X3D Classic Encoding. This gives authors the capability to display their existing projects like .wrl worlds, too.

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

The HTML **X3DCanvas tag** defines the main content of the X3D document. The X3DCanvas tag has two attributes that define different behaviours. All of these attributes are optional. 


### cache

A Boolean value (true or false) to indicate whether files transferred over the internet should be cached on the local computer. The default value for the cache attribute is true. It works by appending „_={timestamp}“ to the GET parameters of every request.


### contextMenu

A Boolean value (true or false) to indicate whether a context menu should be displayed on right click. The default value for the contextMenu attribute is true.


### notifications

A Boolean value (true or false) to indicate whether the notification bubble should be displayed. The default value for the notifications attribute is true.


### onerror

Type: script code. This event is sent to an X3DCanvas element when an error occurs loading a scene.


### onload

Type: script code. This event handler will be called on the X3DCanvas element when a scene has finished loading. This applies whether the scene is applied via the src attribute or when a scene is loaded or replaced by another world. If you change the scene, the event will fire again when the new scene loads. This event will not bubble up the element tree.


### onshutdown

Type: script code. This event handler will be called on the X3DCanvas element when a scene is unloaded or replaced by another world.


### src

A String value with the URL that should be loaded on page load. If no src attribute is specified or the src attribute is empty an empty scene is displayed.


### splashScreen

A Boolean value (true or false) to indicate whether the splash screen should be displayed. The default value for the splashScreen attribute is true. The display of Learn more about how HTML and X3D can operate together.the splash screen can also be toggled via the browser option Â»SplashScreenÂ« in JavaScript. Call Browser.setBrowserOption(„SplashScreen“, booleanValue) to toggle the display of the splash screen.


### timings

A Boolean value (true or false) to indicate whether the browser timings bubble should be displayed if the context menu option is enabled. The default value for the timings attribute is true. This attribute changes the facility if browsers timings can be displayed, if browser timings are really displayed is in the hand of the user if he toggles the context menu option to true.


### url

A MFString value with urls that should be loaded on page load. If no url attribute is specified or the attribute is empty an empty scene is displayed. If both src and url attribute are specified the src attribute takes precedence.


## Example

`<X3DCanvas cache="true" src="path/to/your/X3D/world.x3d"></X3DCanvas>`


Programmer's Style Guide
--------------------------------------
Programmers who want to work on X_ITE shall first read the [Style Guide](STYLE_GUIDE.md).


Tests
--------------------------------------
[X_ITE Test Page](http://rawgit.com/create3000/x_ite/master/x_ite.min.html)


Authors
--------------------------------------
All authors contributed to this project can be found in the [list of authors](AUTHORS.md).


License
--------------------------------------
X_ITE is free software: you can redistribute it and/or modify it under the terms of 
the [GNU General Public License version 3](LICENSE.md) only, as published by the Free Software Foundation.

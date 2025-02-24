/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

function Bookmarks (browser, element)
{
   this .browser = browser;
   this .element = element;

   browser .addBrowserCallback ("bookmarks", X3D .X3DConstants .INITIALIZED_EVENT, event => this .onload (event));
}

Object .assign (Bookmarks .prototype,
{
   setup (... arrays)
   {
      for (const bookmarks of arrays)
      {
         const server = bookmarks .server;

         for (const bookmark of bookmarks)
         {
            const
               component = bookmark .component,
               test      = bookmark .test,
               path      = bookmark .path;

            if (test)
            {
               var element = $('<span/>')
                  .addClass ('example-box')
                  .attr ('title', component + ' » ' + test)
                  .append ($("<a/>")
                     .addClass ('display-example')
                     .attr ('href', `${server}/${component}/${test}/${test}.x3d`)
                     .attr ('style', `background-image:url(${server}/${component}/${test}/screenshot-small.png)`)
                     .on ("click", () => prevent (this .loadURL (`${server}/${component}/${test}/${test}.x3d`, bookmark))));
            }
            else if (path)
            {
               if (!path .match (/\.(?:x3d|x3dz|x3dv|x3dvz|x3dj|x3djz|wrl|wrz)$/))
                  continue;

               const
                  basename = path .match (/([^\/]+)\.\w+$/),
                  name     = basename [1] .replace (/([A-Z]+)/g, ' $1');

               var element = $('<span/>')
                  .addClass ('example-box')
                  .attr ('title', path)
                  .append ($("<a/>")
                     .addClass ('display-example')
                     .attr ('href', server + '/' + path)
                     .on ("click", () => prevent (this .loadURL (`${server}/${path}`, bookmark)))
                     .text (name));
            }
            else if (component)
            {
               var element = $('<span/>')
                  .addClass ('example-box')
                  .attr ('title', path)
                  .addClass ('display-component')
                  .text (component);
            }

            this .element .append (element);
         }
      }

      this .element .scrollLeft (this .browser .getLocalStorage () ["Bookmarks.scrollLeft"] || 0);

      $(window) .on ("unload", () =>
      {
         this .browser .getLocalStorage () ["Bookmarks.scrollLeft"] = this .element .scrollLeft ();
      });
   },
   async loadURL (url, options = { })
   {
      console .time ("Scene loaded in");

      this .browser .getBrowserOptions () .reset ();

      $(this .browser .element)
         .removeClass (["tr", "br", "bl", "tl"] .map (p => `xr-button-${p}`))
         .addClass (`xr-button-${options .xrButtonPosition ?? "br"}`);

      await this .browser .loadURL (new X3D .MFString (url)) .catch (Function .prototype);

      console .timeEnd ("Scene loaded in");
   },
   onload ()
   {
      const
         base  = this .browser .getWorldURL () .replace (/(?:\.O)?\.[^\.]+$/, ""),
         local = base .replace (/https:\/\/create3000.github.io\/(.*?)\//, `https://${location.hostname}/$1/docs/`);

      $("#file") .text (this .browser .getWorldURL ())
         .append ($("<a/>")
         .attr ('href', base + ".x3d")
         .on ("click", () => prevent (this .loadURL (base + ".x3d")))
         .text (".x3d"))
         .append ($("<a/>")
         .attr ('href', base + ".x3dv")
         .on ("click", () => prevent (this .loadURL (base + ".x3dv")))
         .text (".x3dv"))
         .append ($("<a/>")
         .attr ('href', base + ".x3dj")
         .on ("click", () => prevent (this .loadURL (base + ".x3dj")))
         .text (".x3dj"))
         .append ($("<a/>")
         .attr ('href', local + ".O.x3d")
         .on ("click", () => prevent (this .loadURL (local + ".O.x3d")))
         .text ("local"));

      $("#toolbar") .empty ();

      $("<span></span>")
         .text ("▣")
         .attr ("title", "View All")
         .on ("click", () => this .browser .viewAll (0))
         .appendTo ($("#toolbar"));

      let
         environmentLight = null,
         navigationInfo   = null;

      const environmentLightButton = $("<span></span>")
         .text ("💡")
         .attr ("title", "Add EnvironmentLight")
         .on ("click", async () =>
         {
            if (environmentLight)
            {
               environmentLight .on = !environmentLight .on;

               console .info ("EnvironmentLight.on", environmentLight .on);

               navigationInfo .headlight = environmentLight .on;
               navigationInfo .set_bind  = true;
            }
            else
            {
               environmentLight = await this .getEnvironmentLight (this .browser, this .browser .currentScene);

               environmentLight .on = true;

               this .browser .currentScene .rootNodes .push (environmentLight);

               console .info ("Added EnvironmentLight.");

               navigationInfo = this .browser .currentScene .createNode ("NavigationInfo");

               navigationInfo .headlight = true;
               navigationInfo .set_bind  = true;

               this .browser .currentScene .rootNodes .push (navigationInfo);

               console .info ("Added NavigationInfo.");
            }

            this .browser .getLocalStorage () ["Bookmarks.environmentLight"] = environmentLight .on;
         })
         .appendTo ($("#toolbar"));

      if (this .browser .getLocalStorage () ["Bookmarks.environmentLight"] && this .browser .currentScene .encoding === "GLTF")
         environmentLightButton .trigger ("click");

      $("<span></span>") .addClass ("separator") .appendTo ($("#toolbar"));

      try
      {
         const animations = this .browser .currentScene .getExportedNode ("Animations");

         const stop = function ()
         {
            for (const animation of animations .children)
               animation .children [0] .stopTime = Date .now () / 1000;
         };

         for (const animation of animations .children)
         {
            const timeSensor = animation .children [0];

            $("<span></span>")
               .text ("▶")
               .attr ("title", timeSensor .description)
               .on ("click", () =>
               {
                  stop ();

                  timeSensor .loop      = true;
                  timeSensor .startTime = Date .now () / 1000;
               })
               .appendTo ($("#toolbar"));
         }

         $("<span></span>")
            .text ("◼")
            .attr ("title", "Stop")
            .on ("click", stop)
            .appendTo ($("#toolbar"));
      }
      catch (error)
      {
         // console .log (error)
      }

      $("<span></span>") .addClass ("separator") .appendTo ($("#toolbar"));

      const antialiased = $("<span></span>")
         .text ("antialiased")
         .attr ("title", "Toggle antialiasing.")
         .addClass (this .browser .getBrowserOption ("Antialiased") ? "selected" : "")
         .on ("click", () =>
         {
            const value = !this .browser .getBrowserOption ("Antialiased");

            this .browser .setBrowserOption ("Antialiased", value);

            antialiased .toggleClass ("selected");
         })
         .appendTo ($("#toolbar"));

      $("<span></span>") .addClass ("dot") .appendTo ($("#toolbar"));

      const contentScale = $("<span></span>")
         .text ("contentScale "+ { "0.5": 0, "1": 1, "2": 2, "-1": "auto" } [this .browser .getBrowserOption ("ContentScale")])
         .attr ("index", { "0.5": 0, "1": 1, "2": 2, "-1": 3 } [this .browser .getBrowserOption ("ContentScale")])
         .attr ("title", "Toggle contentScale between 0.5, 1.0, 2.0, auto.")
         .on ("click", () =>
         {
            const
               index = (parseInt (contentScale .attr ("index")) + 1) % 4,
               value = [0.5, 1, 2, -1][index];

            this .browser .setBrowserOption ("ContentScale", value);

            contentScale
               .attr ("index", index)
               .text ("contentScale " + (value === -1 ? "auto" : value .toFixed (1)))
         })
         .appendTo ($("#toolbar"));

      $("<span></span>") .addClass ("dot") .appendTo ($("#toolbar"));

      const pixelated = $("<span></span>")
         .text ("pixelated")
         .attr ("title", "Set CSS property image-rendering to pixelated.")
         .addClass ($("#browser") .css ("image-rendering") === "pixelated" ? "selected" : "")
         .on ("click", () =>
         {
            $("#browser") .css ("image-rendering", pixelated .hasClass ("selected") ? "unset" : "pixelated");

            pixelated .toggleClass ("selected");
         })
         .appendTo ($("#toolbar"));

      $("<span></span>") .addClass ("separator") .appendTo ($("#toolbar"));

      const oit = $("<span></span>")
         .text ("oit")
         .attr ("title", "Toggle order independent transparency.")
         .addClass (this .browser .getBrowserOption ("OrderIndependentTransparency") ? "selected" : "")
         .on ("click", () =>
         {
            const value = !this .browser .getBrowserOption ("OrderIndependentTransparency");

            this .browser .setBrowserOption ("OrderIndependentTransparency", value);

            oit .toggleClass ("selected");
         })
         .appendTo ($("#toolbar"));

      $("<span></span>") .addClass ("dot") .appendTo ($("#toolbar"));

      const log = $("<span></span>")
         .text ("log")
         .attr ("title", "Toggle logarithmic depth buffer.")
         .addClass (this .browser .getBrowserOption ("LogarithmicDepthBuffer") ? "selected" : "")
         .on ("click", () =>
         {
            const value = !this .browser .getBrowserOption ("LogarithmicDepthBuffer");

            this .browser .setBrowserOption ("LogarithmicDepthBuffer", value);

            log .toggleClass ("selected");
         })
         .appendTo ($("#toolbar"));

      // this .browser .setBrowserOption ("Antialiased", false)
      // this .browser .setBrowserOption ("OrderIndependentTransparency", true)
      // this .browser .setBrowserOption ("ContentScale", -1)
   },
   async getEnvironmentLight (browser)
   {
      if (this .environmentLight)
         return this .environmentLight;

      const
         profile           = browser .getProfile ("Interchange"),
         components        = ["CubeMapTexturing", "Lighting", "Texturing"] .map (name => browser .getComponent (name)),
         scene             = await browser .createScene (profile, ... components),
         environmentLight  = scene .createNode ("EnvironmentLight"),
         diffuseTexture    = scene .createNode ("ImageCubeMapTexture"),
         specularTexture   = scene .createNode ("ImageCubeMapTexture"),
         textureProperties = scene .createNode ("TextureProperties");

      textureProperties .generateMipMaps     = true;
      textureProperties .minificationFilter  = "NICEST";
      textureProperties .magnificationFilter = "NICEST";

      // diffuseTexture  .url               = new X3D .MFString ("https://create3000.github.io/Library/Tests/Components/images/symmetrical_garden_1k-diffuse.png");
      // diffuseTexture  .textureProperties = textureProperties;
      // specularTexture .url               = new X3D .MFString ("https://create3000.github.io/Library/Tests/Components/images/symmetrical_garden_1k-specular.png");
      // specularTexture .textureProperties = textureProperties;

      diffuseTexture  .url               = new X3D .MFString ("https://create3000.github.io/Library/Tests/Components/images/helipad-diffuse.jpg");
      diffuseTexture  .textureProperties = textureProperties;
      specularTexture .url               = new X3D .MFString ("https://create3000.github.io/Library/Tests/Components/images/helipad-specular.jpg");
      specularTexture .textureProperties = textureProperties;

      environmentLight .intensity       = 1;
      environmentLight .color           = new X3D .SFColor (1,1,1);
      environmentLight .diffuseTexture  = diffuseTexture;
      environmentLight .specularTexture = specularTexture;

      return this .environmentLight = environmentLight;
   }
});

function prevent (arg)
{
   return false;
}

export default Bookmarks;

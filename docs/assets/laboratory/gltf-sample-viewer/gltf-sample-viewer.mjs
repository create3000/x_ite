import Samples from "./samples.mjs";

$.try = function (callback)
{
   try { return callback (); } catch { }
};

class SampleViewer
{
   static run (browser)
   {
      this .viewer = new SampleViewer (browser);
   }

   constructor (browser)
   {
      browser .setBrowserOption ("ColorSpace", "LINEAR");

      this .browser      = browser;
      this .localStorage = this .browser .getLocalStorage () .addNameSpace ("glTFSampleViewer.");

      this .localStorage .setDefaultValues ({
         scrollTop: 0,
         ibl: "helipad:1",
         toneMapping: "KHR_PBR_NEUTRAL",
         background: false,
      });

      this .createList ("glTF Sample Models",               Samples .glTF);
      this .createList ("glTF Interactivity Sample Models", Samples .interactivity);
      this .createList ("glb Sample Models",                Samples .glb);
      this .createList ("glTF Embedded Sample Models",      Samples .embedded);
      this .createList ("glTF Quantized Sample Models",     Samples .quantized);
      this .createList ("glTF Draco Sample Models",         Samples .draco);
      this .createList ("glTF Meshopt Sample Models",       Samples .meshopt);
      this .createList ("glTF Meshopt EXT Sample Models",   Samples .meshoptEXT);
      this .createList ("glTF IBL Sample Models",           Samples .ibl);
      this .createList ("glTF WebP Sample Models",          Samples .webp);
      this .createList ("glTF KTX2 Sample Models",          Samples .ktx);
      this .createList ("glTF JPG/PNG Sample Models",       Samples .jpg);
      this .createList ("glTF Random Models",               Samples .models);

      $(".viewer-column2") .on ("scroll", () =>
      {
         this .localStorage .scrollTop = $(".viewer-column2") .scrollTop ();
      })
      .scrollTop (this .localStorage .scrollTop);

      $("#ibl") .on ("change", () =>
      {
         this .setEnvironmentLight (!!$("#ibl") .val (), this .localStorage .ibl = $("#ibl") .val () || undefined);
      });

      $("[for=headlight]") .on ("click", () =>
      {
         this .setHeadlight (!$("#headlight") .hasClass ("selected"));
      });

      $("#exposure") .on ("change input", () =>
      {
         this .setExposure ($("#exposure") .val ());
      });

      $("[for=exposure] .reset") .on ("click", () =>
      {
         $("#exposure") .val (1);
         this .setExposure (1);
      });

      $("#tone-mapping") .on ("change", () =>
      {
         this .setToneMapping (this .localStorage .toneMapping = $("#tone-mapping") .val ());
      });

      $("[for=summer]") .on ("click", () =>
      {
         this .setBackground (this .localStorage .background = !$("#summer") .hasClass ("selected"));
      });

      // Handle color scheme change.

      window .matchMedia ("(prefers-color-scheme: dark)")
         .addEventListener ("change", () => this .changeColorScheme ());

      this .changeColorScheme ();

      // Handle viewpoint change.

      browser .getField ("activeViewpoint") .addFieldCallback ("change", () =>
      {
         const
            description = browser .activeViewpoint ?.description ?? "",
            index       = [... $("#viewpoints option")] .findIndex (o => $(o) .text () === description);

         $("#viewpoints select") .val (index);
      });

      // Handle url parameter.

      const url = new URL (location) .searchParams .get ("url");

      if (url)
      {
         const a = Array .from ($(".viewer-column2") .find ("a"))
            .find (a => $(a) .attr ("href") .includes (url));

         if (a)
         {
            a .scrollIntoView ({
               behavior: "instant",
               block: "center",
            });

            $(a) .trigger ("click");
         }
         else
         {
            this .loadURL (url);
         }
      }
      else
      {
         browser .loadURL (new X3D .MFString ("/x_ite/assets/laboratory/gltf-sample-viewer/start-screen/gltf-sample-viewer.x3d"));
      }
   }

   async changeColorScheme ()
   {
      const html = document .querySelector ("html");

      const darkMode = (window .matchMedia ?.("(prefers-color-scheme: dark)") .matches
         || html .getAttribute ("data-bs-theme") === "dark") && (html .getAttribute ("data-bs-theme") !== "light");

      const defaultBackground = await this .getDefaultBackground ();

      defaultBackground .skyColor = darkMode ? [0, 0, 0] : [1, 1, 1];
   }

   get scene ()
   {
      return this .browser .currentScene;
   }

   createList (description, filenames)
   {
      const column = $(".viewer-column2");

      $("<div></div>") .append ($("<strong></strong>") .text (description)) .appendTo (column);

      const
         list = $("<ul></ul>") .appendTo (column),
         map  = new Map ();

      for (const filename of filenames)
      {
         const
            match = filename .match (/\/([^\/]+)\/[^\/]+\/[^\/]+$/),
            name  = this .makeName (match [1]);

         map .set (name, filename);
      }

      for (const [name, filename] of [... map] .sort ((a, b) => a [0] .localeCompare (b [0])))
      {
         const item = $("<li></li>") .appendTo (list);

         const link = $("<a></a>")
            .text (name)
            .attr ("href", filename)
            .on ("click", () =>
            {
               column .find ("a") .removeClass ("bold");
               link .addClass ("bold");

               this .loadURL (filename);
               return false;
            })
            .appendTo (item);

         if (!filename .includes ("KhronosGroup"))
            continue;

         $("<span></span>") .text (" ") .appendTo (item);

         const readme = filename
            .replace ("raw.githubusercontent.com", "github.com")
            .replace (/main|master/, "blob/main", "")
            .replace (/[^\/]+\/[^\/]+$/, "");

         $("<a></a>")
            .css ("position", "relative")
            .css ("top", "1px")
            .attr ("title", "Show README.")
            .attr ("target", "_blank")
            .attr ("href", readme)
            .append ($("<i></i>")
               .css ("margin", "0 0.2rem")
               .addClass (["fa-brands", "fa-readme"]))
            .appendTo (item);
      }
   }

   makeName (string)
   {
      return string
         .replace (/-(?:WebP|KTX)/ig, "")
         .replace (/(\d+)/g, " $1")
         .replace (/([A-Z]+[a-z\d ]+)/g, " $1")
         .replace (/([A-Z][a-z]+)/g, " $1")
         .replace (/\s+/g, " ")
         .trim ();
   }

   async loadURL (filename)
   {
      this .showOptions (false);
      this .setEnvironmentLight (!Samples .no_ibl .some (name => filename .includes (name)));

      await this .browser .loadURL (new X3D .MFString (filename));

      this .showOptions (true);
      this .viewAll ();
      this .setEnvironmentLight (!Samples .no_ibl .some (name => filename .includes (name)));
      this .setHeadlight (!Samples .no_headlight .some (name => filename .includes (name)));
      this .setToneMapping (this .localStorage .toneMapping);
      this .setBackground (Samples .no_background .some (name => filename .includes (name)) ? false : this .localStorage .background);
      this .addScenes ();
      this .addViewpoints ();
      this .addMaterialVariants ();
      this .addAnimations ();
   }

   showOptions (show)
   {
      if (show)
      {
         $("#options") .css ("display", "");
      }
      else
      {
         $("#options") .hide ();
         $("#scenes, #viewpoints, #material-variants, #animations") .hide ();
      }
   }

   async viewAll ()
   {
      await this .browser .nextFrame ();

      if (!this .browser .activeViewpoint ?.description)
         this .browser .viewAll (0);
   }

   async setEnvironmentLight (on, ibl = this .localStorage .ibl)
   {
      $("#ibl") .val (on ? ibl : "");

      if (!on)
      {
         if (!this .environmentLight)
            return;
      }

      const
         environmentLight   = await this .getEnvironmentLight (),
         [image, intensity] = ibl .split (":");

      environmentLight .on        = on;
      environmentLight .intensity = parseFloat (intensity);

      const
         url         = new URL (`images/${image}`, import .meta .url),
         specularURL = new X3D .MFString (`${url}.avif`, `${url}.jpg`);

      if (!environmentLight .specularTexture .url .equals (specularURL))
         environmentLight .specularTexture .url = specularURL;

      this .scene .addRootNode (environmentLight);
   }

   async getEnvironmentLight ()
   {
      return this .environmentLight ??= await (async () =>
      {
         this .scene .updateComponent (this .browser .getComponent ("CubeMapTexturing"));

         await this .browser .loadComponents (this .scene);

         const
            environmentLight = this .scene .createNode ("EnvironmentLight"),
            specularTexture  = this .scene .createNode ("ImageCubeMapTexture");

         environmentLight .global          = true;
         environmentLight .intensity       = 1;
         environmentLight .color           = new X3D .SFColor (1, 1, 1);
         environmentLight .specularTexture = specularTexture;

         return environmentLight;
      })();
   }

   async setHeadlight (on)
   {
      if (on)
      {
         $("#headlight") .removeClass ("fa-xmark") .addClass ("fa-check");
         $("#headlight, [for=headlight]") .addClass ("selected");
      }
      else
      {
         $("#headlight") .removeClass ("fa-check") .addClass ("fa-xmark");
         $("#headlight, [for=headlight]") .removeClass ("selected");
      }

      const navigationInfo = await this .getNavigationInfo ();

      navigationInfo .set_bind  = true;
      navigationInfo .headlight = on;

      this .scene .addRootNode (navigationInfo);
   }

   async getNavigationInfo ()
   {
      return this .navigationInfo ??= this .scene .createNode ("NavigationInfo");
   }

   setExposure (value)
   {
      this .browser .setBrowserOption ("Exposure", value);
   }

   setToneMapping (value)
   {
      $("#tone-mapping") .val (value);

      this .browser .setBrowserOption ("ToneMapping", value);
   }

   async setBackground (on)
   {
      if (on)
      {
         $("#summer") .removeClass ("fa-xmark") .addClass ("fa-check");
         $("#summer, [for=summer]") .addClass ("selected");
      }
      else
      {
         $("#summer") .removeClass ("fa-check") .addClass ("fa-xmark");
         $("#summer, [for=summer]") .removeClass ("selected");
      }

      const
         defaultBackground = await this .getDefaultBackground (),
         background        = await this .getBackground ();

      defaultBackground .set_bind = !on;
      background        .set_bind = on;

      this .scene .addRootNode (defaultBackground);
      this .scene .addRootNode (background);
   }

   async getDefaultBackground ()
   {
      return this .defaultBackground ??= this .scene .createNode ("Background");
   }

   async getBackground ()
   {
      return this .background ??= (() =>
      {
         const background = this .scene .createNode ("Background");

         background .skyAngle    = [0.8, 1.3, 1.4, 1.5708];
         background .skyColor    = [0.21, 0.31, 0.59, 0.33, 0.45, 0.7, 0.57, 0.66, 0.85, 0.6, 0.73, 0.89, 0.7, 0.83, 0.98] .map (v => Math .pow (v, 2.2));
         background .groundAngle = [0.659972, 1.2, 1.39912, 1.5708];
         background .groundColor = [0.105712, 0.156051, 0.297, 0.187629, 0.255857, 0.398, 0.33604, 0.405546, 0.542, 0.3612, 0.469145, 0.602, 0.39471, 0.522059, 0.669] .map (v => Math .pow (v, 2.2));

         return background;
      })();
   }

   addScenes ()
   {
      const scenes = $.try (() => this .scene .getExportedNode ("Scenes"));

      if (!scenes)
         return;

      $("#scenes") .empty ();
      $("<b></b>") .text ("Scenes") .appendTo ($("#scenes"));

      for (let i = 0; i < scenes .children .length; ++ i)
      {
         const onclick = () =>
         {
            $("#scenes i") .each ((_, element) =>
            {
               $(element) .removeClass (["fa-circle-dot", "selected"]) .addClass ("fa-circle");
               $(`[for=${$(element) .attr ("id")}]`) .removeClass ("selected");
            });

            $(`#scene${i}`) .toggleClass (["fa-circle", "fa-circle-dot", "selected"]);
            $(`[for=scene${i}]`) .toggleClass ("selected");

            scenes .whichChoice = i;
         };

         const button = $("<button></button>")
            .addClass ("check")
            .attr ("for", `scene${i}`)
            .text (`Scene ${i}`)
            .on ("click", onclick)
            .appendTo ($("#scenes"));

         $("<i></i>")
            .addClass (["fa-regular", "fa-circle"])
            .attr ("id", `scene${i}`)
            .prependTo (button);
      }

      $("#scenes") .show () .find ("button") .first () .trigger ("click");
   }

   addViewpoints ()
   {
      const viewpoints = $.try (() => this .scene .getExportedNode ("Viewpoints"));

      if (!viewpoints)
         return;

      $("#viewpoints") .empty ();
      $("<b></b>") .text ("Viewpoints") .appendTo ($("#viewpoints"));

      const select = $("<select></select>")
         .addClass ("select")
         .on ("change", () =>
         {
            viewpoints .children [select .val ()] .set_bind = true;
         })
         .appendTo ($("#viewpoints"));

      for (const [i, viewpoint] of viewpoints .children .entries ())
      {
         $("<option></option>")
            .prop ("selected", viewpoint .isBound)
            .text (viewpoint .description)
            .val (i)
            .appendTo (select);

         viewpoint .addFieldCallback ("bind", "isBound", () => select .val (i));
      }

      $("#viewpoints") .show ();
   }

   addMaterialVariants ()
   {
      const switchNode = $.try (() => this .scene .getExportedNode ("MaterialVariants"));

      if (!switchNode)
         return;

      $("#material-variants") .empty ();
      $("<b></b>") .text ("Material Variants") .appendTo ($("#material-variants"));

      const select = $("<select></select>")
         .addClass ("select")
         .on ("change", () =>
         {
            switchNode .whichChoice = select .val ();
         })
         .appendTo ($("#material-variants"));

      $("<option></option>")
         .prop ("selected", true)
         .val (switchNode .getValue () .getMetaData ("Interactivity/materialVariants") .length)
         .text ("Default")
         .appendTo (select);

      for (const [i, name] of switchNode .getValue () .getMetaData ("Interactivity/materialVariants") .entries ())
      {
         $("<option></option>")
            .val (i)
            .text (name)
            .appendTo (select);
      }

      $("#material-variants") .show ();
   }

   addAnimations ()
   {
      const behavior = $.try (() => this .scene .getExportedNode ("Behavior"));

      if (behavior)
         return;

      const animations = $.try (() => this .scene .getExportedNode ("Animations"));

      if (!animations)
         return;

      $("#animations") .empty ();
      $("<b></b>") .text ("Animations") .appendTo ($("#animations"));

      for (const [i, group] of animations .children .entries ())
      {
         const timeSensor = group .children [0];

         const onclick = () =>
         {
            for (const group of animations .children)
               group .children [0] .stopTime = Date .now () / 1000;

            if (timeSensor .isActive)
               return;

            timeSensor .loop      = true;
            timeSensor .startTime = Date .now () / 1000;
         };

         const button = $("<button></button>")
            .addClass ("check")
            .attr ("for", `animation${i}`)
            .text (timeSensor .description)
            .on ("click", onclick)
            .appendTo ($("#animations"));

         const check = $("<i></i>")
            .addClass (["fa-regular", "fa-circle"])
            .attr ("id", `animation${i}`)
            .prependTo (button);

         timeSensor .addFieldCallback (this, "isActive", value =>
         {
            if (value)
            {
               button
                  .addClass ("selected");

               check
                  .removeClass ("fa-circle")
                  .addClass (["fa-circle-dot", "selected"]);
            }
            else
            {
               button
                  .removeClass ("selected");

               check
                  .removeClass (["fa-circle-dot", "selected"])
                  .addClass ("fa-circle");
            }
         });
      }

      $("#animations") .show () .find ("button") .first () .trigger ("click");
   }
}

SampleViewer .run (X3D .getBrowser ());

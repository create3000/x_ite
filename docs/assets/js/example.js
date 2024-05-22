$("table.examples a") .on ("click", function ()
{
   let
      div     = $("div.example"),
      header  = div .find (".header"),
      toolbar = div .find (".toolbar"),
      canvas  = div .find ("x3d-canvas"),
      zip     = div .find (".zip"),
      source  = div .find (".source")

   if (div .length)
   {
      canvas .prop ("browser") .beginUpdate ();
      div .show ();
   }
   else
   {
      div     = $("<div></div>") .addClass ("example") .appendTo ("body");
      header  = $("<p></p>") .addClass ("header") .appendTo (div);
      toolbar = $("<p></p>") .addClass ("toolbar") .appendTo (div);
      canvas  = $("<x3d-canvas></x3d-canvas>") .appendTo (div);

      canvas .on ("initialized", () => updateToolbar (toolbar, canvas));

      $("<i></i>") .addClass (["fas", "fa-solid", "fa-circle-xmark", "fa-fw"]) .appendTo (div) .on ("click", function ()
      {
         canvas .prop ("browser") .endUpdate ();
         div .hide ();
      });

      const footer = $("<p></p>") .addClass ("footer") .appendTo (div);

      zip = $("<a></a>")
         .addClass ("zip")
         .text ("Download ZIP Archive")
         .appendTo (footer);

      $("<span></span>") .addClass ("dot") .appendTo (footer);

      source = $("<a></a>")
         .addClass ("source")
         .text ("View Source in Playground")
         .appendTo (footer);
   }

   canvas .prop ("browser") .getBrowserOptions () .reset ();

   header .text ($(this) .attr ("title"));
   canvas .attr ("src", $(this) .attr ("href"));
   zip    .attr ("href", $(this) .attr ("href") .replace (/\.x3d$/, ".zip"));
   source .attr ("href", `/x_ite/playground/?url=${$(this) .attr ("href")}`);

   if ($(this) .attr ("doc") === "true")
   {
      $("<a> #</a>")
         .attr ("href", `/x_ite/components/${$(this) .attr ("componentName") .replace (/[_]/g, "-") .toLowerCase ()}/${$(this) .attr ("typeName") .toLowerCase ()}/`)
         .appendTo (header);
   }

   console .log (`Loading ${$(this) .attr ("title")} ...`);

   return false;
});

function updateToolbar (toolbar, canvas)
{
   const browser = canvas .prop ("browser");

   toolbar .empty ();

   const antialiased = $("<span></span>")
      .text ("antialiased")
      .attr ("title", "Toggle antialiasing.")
      .addClass (browser .getBrowserOption ("Antialiased") ? "selected" : "")
      .on ("click", () =>
      {
         const value = !browser .getBrowserOption ("Antialiased");

         browser .setBrowserOption ("Antialiased", value);

         antialiased .toggleClass ("selected");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   const contentScale = $("<span></span>")
      .text ("contentScale 1.0")
      .attr ("index", { "0.1": 0, "1": 1, "2": 2, "-1": 3 } [browser .getBrowserOption ("ContentScale")])
      .attr ("title", "Toggle contentScale between 0.1, 1.0, 2.0, auto.")
      .on ("click", () =>
      {
         const
            index = (parseInt (contentScale .attr ("index")) + 1) % 4,
            value = [0.1, 1, 2, -1][index];

         browser .setBrowserOption ("ContentScale", value);

         contentScale
            .attr ("index", index)
            .text ("contentScale " + (value === -1 ? "auto" : value .toFixed (1)))
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   const pixelated = $("<span></span>")
      .text ("pixelated")
      .attr ("title", "Set CSS property image-rendering to pixelated.")
      .addClass (canvas .css ("image-rendering") === "pixelated" ? "selected" : "")
      .on ("click", () =>
      {
         canvas .css ("image-rendering", pixelated .hasClass ("selected") ? "unset" : "pixelated");

         pixelated .toggleClass ("selected");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("separator") .appendTo (toolbar);

   const oit = $("<span></span>")
      .text ("oit")
      .attr ("title", "Toggle order independent transparency.")
      .addClass (browser .getBrowserOption ("OrderIndependentTransparency") ? "selected" : "")
      .on ("click", () =>
      {
         const value = !browser .getBrowserOption ("OrderIndependentTransparency");

         browser .setBrowserOption ("OrderIndependentTransparency", value);

         oit .toggleClass ("selected");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   const log = $("<span></span>")
      .text ("log")
      .attr ("title", "Toggle logarithmic depth buffer.")
      .addClass (browser .getBrowserOption ("LogarithmicDepthBuffer") ? "selected" : "")
      .on ("click", () =>
      {
         const value = !browser .getBrowserOption ("LogarithmicDepthBuffer");

         browser .setBrowserOption ("LogarithmicDepthBuffer", value);

         log .toggleClass ("selected");
      })
      .appendTo (toolbar);
}

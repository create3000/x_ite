$("table.examples a") .on ("click", function ()
{
   let
      div     = $("div.example"),
      header  = div .find (".header"),
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
      div    = $("<div></div>") .addClass ("example") .appendTo ("body");
      header = $("<p></p>") .addClass ("header") .appendTo (div);
      canvas = $("<x3d-canvas></x3d-canvas>") .attr ("contentScale", "auto") .appendTo (div);

      $("<i></i>") .addClass (["fas", "fa-solid", "fa-circle-xmark", "fa-fw"]) .appendTo (div) .on ("click", function ()
      {
         canvas .prop ("browser") .endUpdate ();
         div .hide ();
      });

      const footer = $("<p></p>") .addClass ("footer") .appendTo (div);

      zip = $("<a></a>")
         .addClass ("zip")
         .attr ("download", "")
         .text ("Download ZIP Archive")
         .appendTo (footer);

      $("<span></span>") .addClass ("dot") .appendTo (footer);

      source = $("<a></a>")
         .addClass ("source")
         .text ("View Source in Playground")
         .appendTo (footer);
   }

   canvas .prop ("browser") .getBrowserOptions () .reset ();

   canvas
      .removeClass (["tr", "br", "bl", "tl"] .map (p => `xr-button-${p}`))
      .addClass (`xr-button-${$(this) .attr ("xrButtonPosition")}`)
      .attr ("xrMovementControl", $(this) .attr ("xrMovementControl"));

   header .text ($(this) .attr ("title"));
   canvas .attr ("src", $(this) .attr ("href"));
   zip    .attr ("href", $(this) .attr ("href") .replace (/\.x3d$/, ".zip"));
   source .attr ("href", `/x_ite/playground/?url=${$(this) .attr ("href")}`);

   if ($(this) .attr ("doc") === "true")
   {
      $("<a></a>")
         .text ("#")
         .attr ("href", `/x_ite/components/${$(this) .attr ("componentName") .replace (/[_]/g, "-") .toLowerCase ()}/${$(this) .attr ("typeName") .toLowerCase ()}/`)
         .appendTo (header);
   }

   console .log (`Loading ${$(this) .attr ("title")} ...`);

   return false;
});

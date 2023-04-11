$("table.examples a") .on ("click", function ()
{
   let
      div      = $("div.example"),
      header   = div .find (".header"),
      canvas   = div .find ("x3d-canvas"),
      zip      = div .find ("zip");

   if (div .length)
   {
      canvas .prop ("browser") .beginUpdate ();
      div .show ();
   }
   else
   {
      div    = $("<div></div>") .addClass ("example") .appendTo ("body");
      header = $("<p></p>") .addClass ("header") .appendTo (div);
      canvas = $("<x3d-canvas></x3d-canvas>") .appendTo (div);

      $("<i></i>") .addClass (["fas", "fa-solid", "fa-circle-xmark", "fa-fw"]) .appendTo (div) .on ("click", function ()
      {
         canvas .prop ("browser") .endUpdate ();
         div .hide ();
      });

      zip = $("<a></a>") .addClass ("zip") .text ("Download ZIP Archive") .appendTo ($("<p></p>") .appendTo (div));
   }

   header .text ($(this) .attr ("title"));
   canvas .attr ("src", $(this) .attr ("href"));
   zip    .attr ("href", $(this) .attr ("href") .replace (/\.x3d$/, ".zip"));

   console .log (`Loading ${$(this) .attr ("title")} ...`);

   return false;
});

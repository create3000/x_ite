$("table.examples a") .on ("click", function ()
{
   Examples .shared .load ($(this));
   return false;
});

class Examples
{
   static #instance;

   static get shared ()
   {
      return this .#instance ??= new this ();
   }

   #element;
   #header;
   #canvas;
   #browser;
   #zip;
   #source;

   constructor ()
   {
      this .#element = $("<div></div>")
         .addClass ("example")
         .appendTo ("body");

      this .#header = $("<p></p>")
         .addClass ("header")
         .appendTo (this .#element);

      this .#canvas = $("<x3d-canvas></x3d-canvas>")
         .attr ("contentScale", "auto")
         .attr ("update", "auto")
         .appendTo (this .#element);
         
      this .#browser = this .#canvas .prop ("browser");

      $("<i></i>")
         .addClass (["fas", "fa-solid", "fa-circle-xmark", "fa-fw"])
         .appendTo (this .#element)
         .on ("click", () => this .hide ());

      const footer = $("<p></p>") .addClass ("footer") .appendTo (this .#element);

      this .#zip = $("<a></a>")
         .addClass ("zip")
         .attr ("download", "")
         .text ("Download ZIP Archive")
         .appendTo (footer);

      $("<span></span>") .addClass ("dot") .appendTo (footer);

      this .#source = $("<a></a>")
         .addClass ("source")
         .text ("View Source in Playground")
         .appendTo (footer);
   }

   show ()
   {
      this .#browser .beginUpdate ();
      this .#element .show ();
   }

   hide ()
   {
      this .#browser .endUpdate ();
      this .#element .hide ();
   }

   load (a)
   {
      this .show ();

      this .#browser .getBrowserOptions () .reset ();

      this .#canvas
         .removeClass (["tr", "br", "bl", "tl"] .map (p => `xr-button-${p}`))
         .addClass (`xr-button-${a .attr ("xrButtonPosition")}`)
         .attr ("xrMovementControl", a .attr ("xrMovementControl"));

      this .#header .text (a .attr ("title"));
      this .#canvas .attr ("src", a .attr ("href"));
      this .#zip    .attr ("href", a .attr ("href") .replace (/\.x3d$/, ".zip"));
      this .#source .attr ("href", `/x_ite/playground/?url=${a .attr ("href")}`);

      if (a .attr ("doc") === "true")
      {
         $("<a></a>")
            .text ("#")
            .attr ("href", `/x_ite/components/${a .attr ("componentName") .replace (/[_]/g, "-") .toLowerCase ()}/${a .attr ("typeName") .toLowerCase ()}/`)
            .appendTo (this .#header);
      }

      console .log (`Loading ${a .attr ("title")} ...`);
   }
}

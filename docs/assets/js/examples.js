for (const a of document .querySelectorAll (".examples a"))
{
   a .addEventListener ("click", event =>
   {
      event .preventDefault ();

      Examples .shared .load (a);
   });
}

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
      const html = /* html */ `
<div class="example">
   <p class="header"></p>
   <x3d-canvas contentScale="auto" update="auto"></x3d-canvas>
   <p class="footer"><a class="zip" download>Download ZIP Archive</a><span class="dot"></span><a class="source">View Source in Playground</a></p>
   <i class="close fas fa-solid fa-circle-xmark fa-fw"></i>
</div>
      `;

      const body = document .querySelector ("body");

      body .insertAdjacentHTML ("beforeend", html);

      this .#element = body .querySelector (":scope > :last-child");
      this .#header  = this .#element .querySelector (".header");
      this .#canvas  = this .#element .querySelector ("x3d-canvas");
      this .#browser = this .#canvas .browser;
      this .#zip     = this .#element .querySelector (".zip");
      this .#source  = this .#element .querySelector (".source");

      this .#element .querySelector (".close") .addEventListener ("click", () => this .hide ());
   }

   show ()
   {
      this .#browser .beginUpdate ();
      this .#element .style .display = "";
   }

   hide ()
   {
      this .#browser .endUpdate ();
      this .#element .style .display = "none";
   }

   load (a)
   {
      this .show ();

      this .#browser .getBrowserOptions () .reset ();

      this .#canvas .classList .remove (... ["tr", "br", "bl", "tl"] .map (p => `buttons-${p}`));
      this .#canvas .classList .add (`buttons-${a .getAttribute ("buttonsPosition")}`);
      this .#canvas .setAttribute ("xrMovementControl", a .getAttribute ("xrMovementControl"));

      this .#header .textContent = a .getAttribute ("title");

      this .#canvas .setAttribute ("src", a .getAttribute ("href"));
      this .#zip    .setAttribute ("href", a .getAttribute ("href") .replace (/\.x3d$/, ".zip"));
      this .#source .setAttribute ("href", `/x_ite/playground/?url=${a .getAttribute ("href")}`);

      if (a .getAttribute ("doc") === "true")
      {
         const html = /* html */ `<a title="Go to documentation page." href="/x_ite/components/${a .getAttribute ("componentName") .replace (/[_]/g, "-") .toLowerCase ()}/${a .getAttribute ("typeName") .toLowerCase ()}/">#</a>`;

         this .#header .insertAdjacentHTML ("beforeend", html);
      }

      console .log (`Loading ${a .getAttribute ("title")} ...`);
   }
}

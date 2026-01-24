const Legacy =
{
   elements (elements, X3DBrowser)
   {
      if (!elements .length)
         return;

      console .warn ("Use of <X3DCanvas> element is depreciated, please use <x3d-canvas> element instead. See https://create3000.github.io/x_ite/#embedding-x_ite-within-a-web-page.");

      $.map (elements, element => new X3DBrowser (element));
   },
   properties (browser, properties)
   {
      const element = browser .getElement ();

      if (element .prop ("nodeName") .toUpperCase () !== "X3DCANVAS")
         return properties;

      for (const [name, property] of Object .entries (properties))
      {
         const set = property .set;

         if (!set)
            continue;

         property .set = function (value)
         {
            set (value);

            browser .attributeChangedCallback (name, undefined, value);
         };
      }

      return properties;
   },
   browser (browser)
   {
      const element = browser .getElement ();

      if (element .prop ("nodeName") .toUpperCase () !== "X3DCANVAS")
         return;

      // Make element focusable.
      element .attr ("tabindex", element .attr ("tabindex") ?? 0);

      // Process initial attributes.
      browser .connectedCallback ();
   },
   error (elements, error)
   {
      console .error (error);

      // <X3DCanvas>
      elements .children (".x_ite-private-browser") .hide ();
      elements .children (":not(.x_ite-private-browser)") .show ();
   },
};

export default Legacy;

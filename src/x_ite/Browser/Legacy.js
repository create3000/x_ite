const Legacy =
{
   elements (elements, X3DBrowser)
   {
      if (!elements .length)
         return;

      console .warn ("Use of <X3DCanvas> element is deprecated, please use <x3d-canvas> element instead. See https://create3000.github.io/x_ite/#embedding-x_ite-within-a-web-page.");

      for (const element of elements)
         new X3DBrowser (element);
   },
   properties (browser, properties)
   {
      const element = browser .getElement ();

      if (element .nodeName .toUpperCase () !== "X3DCANVAS")
         return properties;

      for (const [name, property] of Object .entries (properties))
      {
         const set = property .set;

         property .set = function (value)
         {
            set .call (this, value);

            browser .attributeChangedCallback (name, undefined, value);
         };
      }

      return properties;
   },
   browser (browser)
   {
      const element = browser .getElement ();

      if (element .nodeName .toUpperCase () !== "X3DCANVAS")
         return;

      // Make element focusable.
      element .setAttribute ("tabindex", element .getAttribute ("tabindex") ?? 0);

      // Process initial attributes.
      for (const { name, value } of element .attributes)
         browser .attributeChangedCallback (name, undefined, value);
   },
   error (elements, error)
   {
      console .error (error);

      // <X3DCanvas>
      for (const element of elements)
      {
         for (const child of element .children)
         {
            if (child .matches (".x_ite-private-browser"))
               child .style .display = "none";

            if (child .matches (":not(.x_ite-private-browser)"))
               child .style .display = "";
         }
      }
   },
};

export default Legacy;

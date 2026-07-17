import X3DBrowser from "./Browser/X3DBrowser.js";

class X3DCanvasElement extends HTMLElement
{
   browser;

   constructor ()
   {
      super ();

      try
      {
         this .attachShadow ({ mode: "open", delegatesFocus: true });

         new X3DBrowser (this);
      }
      catch (error)
      {
         console .error (error);

         for (const child of Array .from (this .shadowRoot .children))
         {
            if (child .matches (".x_ite-private-browser"))
               child .remove ();
         }

         this .shadowRoot .append (document .createElement ("slot"));
      }
   }

   connectedCallback ()
   {
      this .browser ?.connectedCallback ();
   }

   disconnectedCallback ()
   {
      this .browser ?.disconnectedCallback ();
   }

   static get observedAttributes ()
   {
      const attributes = [
         "antialiased",
         "baseURL",
         "cache",
         "colorSpace",
         "contentScale",
         "contextMenu",
         "debug",
         "displayColorSpace",
         "exposure",
         "extensions",
         "logarithmicDepthBuffer",
         "maximumFrameRate",
         "multisampling",
         "notifications",
         "oninitialized",
         "onshutdown",
         "orderIndependentTransparency",
         "splashScreen",
         "src",
         "textCompression",
         "timings",
         "toneMapping",
         "update",
         "url",
         "xrSessionMode",
      ];

      return attributes .concat (attributes .map (attribute => attribute .toLowerCase ()));
   }

   attributeChangedCallback (name, oldValue, newValue)
   {
      this .browser ?.attributeChangedCallback (name, oldValue, newValue);
   }

   captureStream (... args)
   {
      return this .browser ?.getCanvas () .captureStream (... args);
   }

   toBlob (... args)
   {
      return this .browser ?.getCanvas () .toBlob (... args);
   }

   toDataURL (... args)
   {
      return this .browser ?.getCanvas () .toDataURL (... args);
   }

   get [Symbol .toStringTag] ()
   {
      return "X3DCanvasElement";
   }
}

// IE fix.
document .createElement ("X3DCanvas");

export default X3DCanvasElement;

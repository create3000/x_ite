import X3DBrowser from "./Browser/X3DBrowser.js";

class X3DCanvasElement extends HTMLElement
{
   browser;

   constructor ()
   {
      try
      {
         super ();

         new X3DBrowser (this);
      }
      catch (error)
      {
         console .error (error);

         $(this .shadowRoot)
            .append ($("<slot></slot>"))
            .children (".x_ite-private-browser") .remove ();
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
         "exposure",
         "logarithmicDepthBuffer",
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
      return this .browser ?.getCanvas () [0] .captureStream (... args);
   }

   toBlob (... args)
   {
      return this .browser ?.getCanvas () [0] .toBlob (... args);
   }

   toDataURL (... args)
   {
      return this .browser ?.getCanvas () [0] .toDataURL (... args);
   }

   get [Symbol .toStringTag] ()
   {
      return "X3DCanvasElement";
   }
}

// IE fix.
document .createElement ("X3DCanvas");

export default X3DCanvasElement;

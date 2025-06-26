import Viewport from "../../Components/Layering/Viewport.js";

const _defaultViewport = Symbol ();

function X3DLayeringContext ()
{
   this [_defaultViewport] = new Viewport (this .getPrivateScene ());
}

Object .assign (X3DLayeringContext .prototype,
{
   initialize ()
   {
      this [_defaultViewport] .setPrivate (true);
      this [_defaultViewport] .setup ();
   },
   getDefaultViewport ()
   {
      return this [_defaultViewport];
   },
});

export default X3DLayeringContext;

const
   _keyDeviceSensorNodes = Symbol (),
   _keydown              = Symbol (),
   _keyup                = Symbol ();

function X3DKeyDeviceSensorContext ()
{
   this [_keyDeviceSensorNodes] = new Set ();
}

Object .assign (X3DKeyDeviceSensorContext .prototype,
{
   initialize ()
   {
      const element = this .getElement ();

      element .on ("keydown.X3DKeyDeviceSensorContext", this [_keydown] .bind (this));
      element .on ("keyup.X3DKeyDeviceSensorContext",   this [_keyup]   .bind (this));
   },
   addKeyDeviceSensorNode (keyDeviceSensorNode)
   {
      this [_keyDeviceSensorNodes] .add (keyDeviceSensorNode);
   },
   removeKeyDeviceSensorNode (keyDeviceSensorNode)
   {
      this [_keyDeviceSensorNodes] .delete (keyDeviceSensorNode);
   },
   getKeyDeviceSensorNodes ()
   {
      return this [_keyDeviceSensorNodes];
   },
   [_keydown] (event)
   {
      //console .log (event .keyCode);

      for (const keyDeviceSensorNode of this [_keyDeviceSensorNodes])
         keyDeviceSensorNode .keydown (event);
   },
   [_keyup] (event)
   {
      //console .log (event .which);

      for (const keyDeviceSensorNode of this [_keyDeviceSensorNodes])
         keyDeviceSensorNode .keyup (event);
   },
   dispose ()
   {
      this .getElement () .off (".X3DKeyDeviceSensorContext");
   },
});

export default X3DKeyDeviceSensorContext;

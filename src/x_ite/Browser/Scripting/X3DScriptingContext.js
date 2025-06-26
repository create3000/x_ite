function X3DScriptingContext () { }

Object .assign (X3DScriptingContext .prototype,
{
   isExternal ()
   {
      return !this .getScriptNode ();
   },
   getScriptNode ()
   {
      return null;
   },
});

export default X3DScriptingContext;

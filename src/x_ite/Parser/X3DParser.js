import X3DProtoDeclaration from "../Prototype/X3DProtoDeclaration.js";

function X3DParser (scene)
{
   this .scene             = scene;
   this .executionContexts = [ scene ];
   this .prototypes        = [ ];
}

Object .assign (X3DParser .prototype,
{
   getBrowser ()
   {
      return this .scene .getBrowser ();
   },
   getScene ()
   {
      return this .scene;
   },
   getExecutionContext ()
   {
      return this .executionContexts .at (-1);
   },
   pushExecutionContext (executionContext)
   {
      return this .executionContexts .push (executionContext);
   },
   popExecutionContext ()
   {
      this .executionContexts .pop ();
   },
   getOuterNode ()
   {
      return this .getExecutionContext () .getOuterNode ();
   },
   isInsideProtoDeclaration ()
   {
      return this .getExecutionContext () .getOuterNode () instanceof X3DProtoDeclaration;
   },
   /**
    * @deprecated Directly use `browser.loadComponents`.
    */
   loadComponents ()
   {
      return this .getBrowser () .loadComponents (this .getScene ());
   },
   setUnits (units)
   {
      if (units)
         delete this .fromUnit;
      else
         this .fromUnit = function (category, value) { return value; };
   },
   fromUnit (category, value)
   {
      return this .scene .fromUnit (category, value);
   },
   convertColor (value, defaultColor = "white")
   {
      const
         wrap   = $("<div></div>") .hide () .css ("color", defaultColor) .appendTo ($("body")),
         div    = $("<div></div>").css ("color", value) .appendTo (wrap),
         rgb    = window .getComputedStyle (div [0]) .color,
         values = rgb .replace (/^rgba?\(|\)$/g, "") .split (/[\s,]+/) .map (s => parseFloat (s));

      wrap .remove ();

      values [0] /= 255;
      values [1] /= 255;
      values [2] /= 255;

      if (typeof values [3] !== "number")
         values [3] = 1;

      return values;
   },
   sanitizeName (name = "")
   {
      // NonIdFirstChar
      name = name .replace (/^[\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*/, "");

      // NonIdChars
      name = name .replace (/[\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]+/g, "-");

      // Spaces
      name = name .trim () .replace (/[\s_-]+/g, "-");

      // Trim
      name = name .replace (/^-+|-+$/g, "");

      return name;
   },
   renameExistingNode (name)
   {
      try
      {
         const namedNode = this .getExecutionContext () .getNamedNode (name);

         this .getExecutionContext () .updateNamedNode (this .getExecutionContext () .getUniqueName (name), namedNode);
      }
      catch
      { }

      try
      {
         const importedName = this .getExecutionContext () .getUniqueImportName (name);

         this .getExecutionContext () .renameImportedNode (name, importedName);
      }
      catch
      { }
   },
});

export default X3DParser;

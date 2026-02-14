import X3DProtoDeclaration from "../Prototype/X3DProtoDeclaration.js";

function X3DParser (scene)
{
   this .scene             = scene;
   this .executionContexts = [ scene ];
   this .prototypes        = [ ];
   this .placeholders      = new Map ();
   this .namedNodes        = new Map ();
   this .importedNodes     = new Map ();
   this .nodes             = new Map ();
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
      return this .getExecutionContext () ?.getOuterNode ();
   },
   isInsideProtoDeclaration ()
   {
      return this .getOuterNode () instanceof X3DProtoDeclaration;
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
         div    = $("<div></div>") .css ("color", value) .appendTo (wrap),
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
      const executionContext = this .getExecutionContext ();

      try
      {
         const namedNode = executionContext .getNamedNode (name);

         executionContext .updateNamedNode (executionContext .getUniqueName (name), namedNode);

         // console .warn (`Duplicate DEF name '${name}' in file '${executionContext .getWorldURL ()}'.`);
      }
      catch
      { }

      try
      {
         const importedName = executionContext .getUniqueImportName (name);

         executionContext .renameImportedNode (name, importedName);

         // console .warn (`Duplicate imported name '${name}' in file '${executionContext .getWorldURL ()}'.`);
      }
      catch
      { }
   },
   getNodes ()
   {
      return this .getContainer (this .nodes, Array);
   },
   getPlaceholders ()
   {
      return this .getContainer (this .placeholders, Map);
   },
   getNamedNodes ()
   {
      return this .getContainer (this .namedNodes, Map);
   },
   getImportedNodes ()
   {
      return this .getContainer (this .importedNodes, Map);
   },
   getContainer (objects, type)
   {
      const
         executionContext = this .getExecutionContext (),
         map              = objects .get (executionContext);

      if (map)
      {
         return map;
      }
      else
      {
         const map = new type ();

         objects .set (executionContext, map);

         return map;
      }
   },
   checkNodeType ()
   { },
   setupNodes ()
   {
      const
         placeholders = this .getPlaceholders (),
         nodes        = this .getNodes ();

      placeholders .forEach (placeholder => placeholder .replaceWithNode ());
      placeholders .clear ();

      if (!this .isInsideProtoDeclaration ())
         nodes .forEach (node => node .setup ());

      nodes .length = 0;;
   },
   rotateAxes (array)
   {
      // This function is for STL models.

      const length = array .length;

      for (let i = 0; i < length; i += 3)
      {
         const z = -array [i + 1];

         array [i + 1] = array [i + 2];
         array [i + 2] = z;
      }
   },
});

export default X3DParser;

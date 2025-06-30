import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function FontLibrary (executionContext)
{
   X3DNode       .call (this, executionContext);
   X3DUrlObject .call (this, executionContext);

   this .addType (X3DConstants .FontLibrary);
}

Object .assign (Object .setPrototypeOf (FontLibrary .prototype, X3DNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DNode      .prototype .initialize .call (this);
      X3DUrlObject .prototype .initialize .call (this);

      this ._family .addInterest ("set_family__", this);

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   set_family__ ()
   {
      if (!this .font)
         return;

      const familyName = this ._family .getValue ();

      if (!familyName)
         return;

      this .getBrowser () .registerFontLibrary (this .getExecutionContext (), familyName, this .font);
   },
   async loadData ()
   {
      const
         browser          = this .getBrowser (),
         executionContext = this .getExecutionContext (),
         fileURLs         = Array .from (this ._url) .map (fileURL => new URL (fileURL, executionContext .getBaseURL ()));

      this .font = null;

      for (const fileURL of fileURLs)
      {
         this .font = await browser .loadFont (fileURL, this .getCache ());

         if (!this .font)
            continue;

         browser .registerFont (executionContext, this .font);

         this .set_family__ ();

         this .setLoadState (X3DConstants .COMPLETE_STATE);
         return;
      }

      this .setLoadState (X3DConstants .FAILED_STATE);
   },
   dispose ()
   {
      X3DUrlObject .prototype .dispose .call (this);
      X3DNode      .prototype .dispose .call (this);
   },
});

Object .defineProperties (FontLibrary,
{
   ... X3DNode .getStaticProperties ("FontLibrary", "Text", 2, "FontLibrary", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "family",               new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefreshTimeLimit", new Fields .SFTime (3600)),
      ]),
      enumerable: true,
   },
});

export default FontLibrary;

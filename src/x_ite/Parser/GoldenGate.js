import X3DParser   from "./X3DParser.js";
import JSONParser  from "./JSONParser.js";
import VRMLParser  from "./VRMLParser.js";
import XMLParser   from "./XMLParser.js";
import GLTF2Parser from "./GLTF2Parser.js";
import GLB2Parser  from "./GLB2Parser.js";
import OBJParser   from "./OBJParser.js";
import STLAParser  from "./STLAParser.js";
import STLBParser  from "./STLBParser.js";
import PLYAParser  from "./PLYAParser.js";
import PLYBParser  from "./PLYBParser.js";
import SVGParser   from "./SVGParser.js";

class GoldenGate extends X3DParser
{
   #inputs = new Map ();

   static #parsers = [
      SVGParser,
      XMLParser,
      GLTF2Parser,
      GLB2Parser,
      JSONParser,
      VRMLParser,
      OBJParser,
      STLAParser,
      STLBParser,
      PLYAParser,
      PLYBParser,
   ];

   static addParsers (... args)
   {
      this .#parsers .push (... args);
   }

   static removeParsers (... args)
   {
      this .#parsers = this .#parsers .filter (parser => !args .includes (parser));
   }

   static getParsers ()
   {
      return this .#parsers .slice ();
   }

   /**
    * @deprecated Use `GoldenGate.add/remove/getParsers`.
    */
   static get Parser () { return this .#parsers; }

   parseIntoScene (x3dSyntax, resolve, reject)
   {
      for (const Parser of GoldenGate .#parsers)
      {
         try
         {
            const
               parser = new Parser (this .getScene ()),
               input  = this .getInput (parser .getEncoding (), x3dSyntax);

            if (Array .isArray (input) ? input .some (i => i === undefined) : input === undefined)
               continue;

            parser .setInput (input);

            if (!parser .isValid ())
               continue;

            parser .pushExecutionContext (this .getExecutionContext ());
            parser .parseIntoScene (resolve, reject);
            return;
         }
         catch (error)
         {
            if (reject)
               reject (error);
            else
               throw error;

            return;
         }
      }

      if (this .getScene () .worldURL .startsWith ("data:"))
         throw new Error ("Couldn't parse X3D. No suitable file handler found for 'data:' URL.");
      else
         throw new Error (`Couldn't parse X3D. No suitable file handler found for '${this .getScene () .worldURL}'.`);
   }

   getInput (encoding, x3dSyntax)
   {
      if (Array .isArray (encoding))
      {
         return encoding .map (encoding => this .getInput (encoding));
      }
      else
      {
         if (this .#inputs .has (encoding))
            return this .#inputs .get (encoding);

         const input = this .createInput (encoding, x3dSyntax);

         this .#inputs .set (encoding, input);

         return input;
      }
   }

   createInput (encoding, x3dSyntax)
   {
      try
      {
         switch (encoding)
         {
            case "STRING":
               return $.decodeText (x3dSyntax);
            case "XML":
               return $.parseXML (this .getInput ("STRING", x3dSyntax));
            case "JSON":
               return JSON .parse (this .getInput ("STRING", x3dSyntax));
            case "ARRAY_BUFFER":
               return x3dSyntax instanceof ArrayBuffer ? x3dSyntax : undefined;
         }
      }
      catch
      {
         return undefined;
      }
   }
}

export default GoldenGate;

import XMLParser from "./XMLParser.js";
import X3DParser from "./X3DParser.js";

function JSONParser (scene)
{
   X3DParser .call (this, scene);

   this .namespace = "http://www.web3d.org/specifications/x3d-namespace";
}

Object .assign (Object .setPrototypeOf (JSONParser .prototype, X3DParser .prototype),
{
   getEncoding ()
   {
      return "JSON";
   },
   setInput (json)
   {
      try
      {
         if (typeof json === "string")
            json = JSON .parse (json);

         this .input = json;
      }
      catch
      {
         this .input = undefined;
      }
   },
   isValid ()
   {
      return this .input instanceof Object;
   },
   parseIntoScene (resolve, reject)
   {
      /**
       * Load X3D JSON into an element.
       * json - the JavaScript object to convert to DOM.
       */

      const child = this .createElement ("X3D");

      this .convertToDOM (this .input, "", child);

      // Call the DOM parser.

      const parser = new XMLParser (this .getScene ());

      parser .setInput (child);
      parser .parseIntoScene (resolve, reject);

      this .getScene () .setEncoding ("JSON");
   },
   elementSetAttribute (element, key, value)
   {
      /**
       * Yet another way to set an attribute on an element.  does not allow you to
       * set JSON schema or encoding.
       */

      switch (key)
      {
         case "SON schema":
         {
            // JSON Schema
            break;
         }
         case "ncoding":
         {
            // encoding, UTF-8, UTF-16 or UTF-32
            break;
         }
         default:
         {
            if (typeof element .setAttribute === "function")
               element .setAttribute (key, value);

            break;
         }
      }
   },
   convertChildren (parentkey, object, element)
   {
      /**
       * converts children of object to DOM.
       */

      for (const key in object)
      {
         if (typeof object [key] !== "object")
            continue;

         if (isNaN (parseInt (key)))
            this .convertObject (key, object, element, parentkey .substring (1));
         else
            this .convertToDOM (object [key], key, element, parentkey .substring (1));
      }
   },
   createElement (key, containerField)
   {
      /**
       * a method to create and element with tagnam key to DOM in a namespace.  If
       * containerField is set, then the containerField is set in the elemetn.
       */

      if (typeof this .namespace === "undefined")
      {
         var child = document .createElement (key);
      }
      else
      {
         var child = document .createElementNS (this .namespace, key);

         if (child === null || typeof child === "undefined")
         {
            console .error ("Trouble creating element for", key);

            child = document .createElement (key);
         }
      }

      if (typeof containerField !== "undefined")
         this .elementSetAttribute (child, "containerField", containerField);

      return child;
   },
   createCDATA (document, element, str)
   {
      const
         docu  = $.parseXML ("<xml></xml>", "application/xml"),
         cdata = docu .createCDATASection (str);

      element .appendChild (cdata);
   },
   convertObject (key, object, element, containerField)
   {
      /**
       * convert the object at object[key] to DOM.
       */

      if (object !== null && typeof object [key] === "object")
      {
         if (key [0] === "@")
         {
            this .convertToDOM (object [key], key, element);
         }
         else if (key [0] === "-")
         {
            this .convertChildren (key, object [key], element);
         }
         else if (key === "#comment")
         {
            for (const c in object [key])
            {
               const child = document .createComment (this .commentStringToXML (object [key] [c]));

               element .appendChild (child);
            }
         }
         else if (key === "#sourceCode" || key === "@sourceCode" || key === "#sourceText")
         {
            this .createCDATA (document, element, object [key] .join ("\n"));
         }
         else if (key === "connect" || key === "fieldValue" || key === "field" || key === "meta" || key === "component" || key === "unit")
         {
            for (const childkey in object [key])
            {
               // for each field
               if (typeof object [key] [childkey] === "object")
               {
                  const child = this .createElement (key, containerField);

                  this .convertToDOM (object [key] [childkey], childkey, child);

                  element .appendChild (child);
                  element .appendChild (document .createTextNode ("\n"));
               }
            }
         }
         else
         {
            const child = this .createElement (key, containerField);

            this .convertToDOM (object [key], key, child);

            element .appendChild (child);
            element .appendChild (document .createTextNode ("\n"));
         }
      }
   },
   commentStringToXML (str)
   {
      /**
       * convert a comment string in JavaScript to XML.  Pass the string
       */

      return str .replace (/\\\\/g, "\\");
   },
   SFStringToXML (str)
   {
      /**
       * convert an SFString to XML.
       */

      return str .replace (/([\\"])/g, "\\$1");
   },
   JSONStringToXML (str)
   {
      /**
       * convert a JSON String to XML.
       */

      str = str .replace (/\\/g, "\\\\");
      str = str .replace (/\n/g, "\\n");

      return str;
   },
   convertToDOM (object, parentkey, element, containerField)
   {
      /**
       * main routine for converting a JavaScript object to DOM.
       * object is the object to convert.
       * parentkey is the key of the object in the parent.
       * element is the parent element.
       * containerField is a possible containerField.
       */

      if (object === null)
      {
         const isArray = !isNaN (parseInt (parentkey));

         if (isArray)
         {
            const child = this .createElement ("NULL", containerField);

            element .appendChild (child);
         }
         else
         {
            this .elementSetAttribute (element, "value", null);
         }

         return element;
      }

      let
         isArray        = false,
         localArray     = [ ],
         arrayOfStrings = false;

      for (const key in object)
      {
         isArray = !isNaN (parseInt (key));

         if (isArray)
         {
            switch (typeof object [key])
            {
               case "number":
               {
                  localArray .push (object [key]);
                  break;
               }
               case "string":
               {
                  localArray .push (object [key]);

                  arrayOfStrings = true;
                  break;
               }
               case "boolean":
               {
                  localArray .push (object [key]);
                  break;
               }
               case "object":
               {
                  /*
                  if (object[key] != null && typeof object[key].join === "function") {
                     localArray.push(object[key].join(" "));
                  }
                  */
                  this .convertToDOM (object [key], key, element);
                  break;
               }
               case "undefined":
               {
                  break;
               }
               default:
               {
                  console .error (`Unknown type found in array ${typeof object [key]}`);
               }
            }
         }
         else
         {
            switch (typeof object [key])
            {
               case "object":
               {
                  // This is where the whole thing starts

                  if (key === "X3D")
                     this .convertToDOM (object [key], key, element);

                  else
                     this .convertObject (key, object, element, containerField);

                  break;
               }
               case "number":
               {
                  this .elementSetAttribute (element, key .substring (1), object [key]);
                  break;
               }
               case "string":
               {
                  if (key !== "#comment")
                  {
                     // ordinary string attributes
                     this .elementSetAttribute (element, key .substring (1), this .JSONStringToXML (object [key]));
                  }
                  else
                  {
                     const child = document .createComment (this .commentStringToXML (object [key]));

                     element .appendChild (child);
                  }

                  break;
               }
               case "boolean":
               {
                  this .elementSetAttribute (element, key .substring (1), object [key]);
                  break;
               }
               case "undefined":
               {
                  break;
               }
               default:
               {
                  console .error (`Unknown type found in object ${typeof object [key]}`);
                  console .error (object);
               }
            }
         }
      }

      if (isArray)
      {
         if (parentkey [0] === "@")
         {
            if (arrayOfStrings)
            {
               arrayOfStrings = false;

               for (const [str, value] of localArray .entries ())
                  localArray [str] = this .SFStringToXML (value);

               this .elementSetAttribute (element, parentkey .substring (1), '"' + localArray .join ('" "') + '"');
            }
            else
            {
               // if non string array
               this .elementSetAttribute (element, parentkey .substring (1), localArray .join (" "));
            }
         }

         isArray = false;
      }

      return element;
   },
});

export default JSONParser;

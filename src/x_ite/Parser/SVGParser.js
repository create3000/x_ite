/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import X3DParser from "./X3DParser.js";

function SVGParser (scene)
{
   X3DParser .call (this, scene);
}

SVGParser .prototype = Object .assign (Object .create (X3DParser .prototype),
{
   constructor: SVGParser,
   getEncoding: function ()
   {
      return "XML";
   },
   isValid: function ()
   {
      if (!(this .input instanceof XMLDocument) || (this .input instanceof HTMLElement))
         return false;

      if ($(this .input) .children ("svg") .length)
         return true;

      if (this .input .nodeName .toLowerCase () === "svg")
         return true;

      return false;
   },
   getInput: function ()
   {
      return this .input;
   },
   setInput (xmlElement)
   {
      try
      {
         if (typeof xmlElement === "string")
            xmlElement = $.parseXML (xmlElement);

         this .input = xmlElement;
      }
      catch (error)
      {
         this .input = undefined;
      }
   },
   parseIntoScene: function (success, error)
   {
      try
      {
         const
            browser = this .getBrowser (),
            scene   = this .getScene ();

         scene .setEncoding ("SVG");
         scene .setProfile (browser .getProfile ("Interchange"));

         this .xmlElement (this .input);

         success (scene);
      }
      catch (exception)
      {
         error (exception);
      }
   },
   xmlElement: function (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "#document":
         {
            const svg = $(xmlElement) .children ("svg");

            if (!svg .length)
               return;

            for (var i = 0; i < svg .length; ++ i)
               this .svgElement (svg [i]);

            return;
         }
         case "svg":
         {
            this .svgElement (xmlElement);
            return;
         }
      }
   },
   svgElement: function (xmlElement)
   {
      console .log (xmlElement)

   },
});

export default SVGParser;

/*******************************************************************************
 * MIT License
 *
 * Copyright (c) 2016 Andreas Plesch
 * taken from https://github.com/andreasplesch/x_ite_dom.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/

import X3DConstants from "../Base/X3DConstants.js";
import SFNodeCache  from "../Fields/SFNodeCache.js";

class DOMIntegration
{
   constructor (browser)
   {
      this .browser        = browser;
      this .rootElement    = undefined;
      this .canvasObserver = new MutationObserver (() => this .processCanvasMutation (browser));

      this .canvasObserver .observe (browser .getElement () [0], {
         childList: true,
      });

      this .processCanvasMutation (browser)
   }

   processCanvasMutation (browser)
   {
      this .processRootElement (browser, browser .getElement () .children ("X3D") .get (-1));
   }

   async processRootElement (browser, rootElement)
   {
      try
      {
         if (rootElement === this .rootElement)
            return;

         this .rootElement = rootElement;

         if (rootElement)
         {
            // Display splash screen.

            browser .setBrowserLoading (true);
            browser .addLoadingObject (this);

            // Now also attach node property to each node element.

            const scene = await browser .importDocument (rootElement);

            browser .replaceWorld (scene);

            // Create an observer instance.

            this .observer = new MutationObserver (mutations =>
            {
               for (const mutation of mutations)
                  this .processMutation (mutation);
            });

            // Start observing, also catches inlined Inline elements.

            this .observer .observe (rootElement, {
               attributes: true,
               childList: true,
               characterData: false,
               subtree: true,
               attributeOldValue: true,
            });

            // Add Inline elements from initial scene, and connect to node events.

            this .processInlineElements (rootElement);
            this .addEventDispatchersAll (rootElement);

            browser .removeLoadingObject (this);
         }
         else
         {
            browser .replaceWorld (null);
         }
      }
      catch (error)
      {
         console .error ("Error importing document:", error);
      }
   }

   processMutation (mutation)
   {
      switch (mutation .type)
      {
         case "attributes":
         {
            this .processAttribute (mutation, mutation .target);
            break;
         }
         case "childList":
         {
            for (const node of mutation .addedNodes)
               this .processAddedNode (node);

            for (const node of mutation .removedNodes)
               this .processRemovedNode (node);

            break;
         }
      }
   }

   processAttribute (mutation, element)
   {
      const
         parser = this .parser,
         node   = $.data (element, "node");

      if (node)
      {
         const
            attributeName = mutation .attributeName,
            attribute     = element .attributes .getNamedItem (attributeName);

         parser .nodeAttribute (attribute, node);
      }
      else
      {
         // Is an attribute of non-node child such as fieldValue (or ROUTE).

         const
            parentNode = element .parentNode,
             node       = $.data (parentNode, "node");

         if (node)
         {
            parser .pushExecutionContext (node .getExecutionContext ());
            parser .pushParent (node);
            parser .childElement (element);
            parser .popParent ();
            parser .popExecutionContext ();
         }
      }
   }

   processAddedNode (element)
   {
      // Only process element nodes.

      if (element .nodeType !== Node .ELEMENT_NODE)
         return;

      if (element .nodeName === "X3D")
         return;

      if ($.data (element, "node"))
         return;

      const
         parentNode = element .parentNode,
         parser     = this .parser;

      if (parentNode .nodeName .match (/^(?:Scene|SCENE)$/))
      {
         // Root scene or Inline scene.

         const scene = $.data (parentNode, "node");

         parser .pushExecutionContext (scene);
         parser .childElement (element);
         parser .popExecutionContext ();
      }
      else if ($.data (parentNode, "node"))
      {
         // Use parent's scene if non-root, works for Inline.

         const
            node             = $.data (parentNode, "node"),
            executionContext = node .getExecutionContext ();

         parser .pushExecutionContext (executionContext);
         parser .pushParent (node);
         parser .childElement (element);
         parser .popParent ();
         parser .popExecutionContext ();
      }
      else
      {
         const scene = this .browser .currentScene;

         parser .pushExecutionContext (scene);
         parser .childElement (element);
         parser .popExecutionContext ();
      }

      // Now after creating nodes need to look again for Inline elements.

      this .processInlineElements (element);

      // Then attach event dispatchers.

      this .addEventDispatchers (element);
      this .addEventDispatchersAll (element);
   }

   processRemovedNode (element)
   {
      // Works also for root nodes, as it has to be, since scene .rootNodes is effectively a MFNode in x-ite.
      // Also removes ROUTE elements.

      const node = $.data (element, "node");

      if (!node)
         return;

      node .dispose ();

      $.data (element, "node", null);
   }

   processInlineElements (element)
   {
      if (element .nodeName .match (/^(?:Inline|INLINE)$/))
         this .processInlineElement (element);

      for (const inlineElement of element .querySelectorAll ("Inline"))
         this .processInlineElement (inlineElement);
   }

   processInlineElement (element)
   {
      const node = $.data (element, "node");

      if (!node)
         return;

      node ._loadState .addInterest ("appendInlineChildElement", this, element);

      this .appendInlineChildElement (element);
   }

   appendInlineChildElement (element)
   {
      const node = $.data (element, "node");

      switch (node .checkLoadState ())
      {
         case X3DConstants .NOT_STARTED_STATE:
         case X3DConstants .FAILED_STATE:
         {
            // Remove all child nodes.

            while (element .firstChild)
               element .removeChild (element .lastChild);

            break;
         }
         case X3DConstants .COMPLETE_STATE:
         {
            // Remove all child nodes.

            while (element .firstChild)
               element .removeChild (element .lastChild);

            // Add scene as child node of Inline element.

            const X3DElement = $.data (node .getInternalScene (), "X3D");

            if (!X3DElement)
               break;

            element .appendChild (X3DElement);

            // Add Inline elements, and connect to node events.

            this .processInlineElements (X3DElement);
            this .addEventDispatchersAll (X3DElement);

            break;
         }
      }

      switch (node .checkLoadState ())
      {
         case X3DConstants .COMPLETE_STATE:
         {
            const event = new CustomEvent ("load",
            {
               detail: { node: SFNodeCache .get (node) },
            });

            element .dispatchEvent (event);
            break;
         }
         case X3DConstants .FAILED_STATE:
         {
            const event = new CustomEvent ("error",
            {
               detail: { node: SFNodeCache .get (node) },
            });

            element .dispatchEvent (event);
            break;
         }
      }
   }

   addEventDispatchersAll (element)
   {
      const childElements = element .querySelectorAll ("*");

      for (const childElement of childElements)
         this .addEventDispatchers (childElement);
   }

   addEventDispatchers (element)
   {
      // Check for USE nodes; they do not emit events.

      if (element .nodeName === "ROUTE")
         return;

      const node = $.data (element, "node");

      if (!node)
         return;

      for (const field of node .getPredefinedFields ())
         this .bindFieldCallback (field, element);

      for (const field of node .getUserDefinedFields ())
         this .bindFieldCallback (field, element);
   }

   bindFieldCallback (field, element)
   {
      if (!field .isOutput ())
         return;

      field .addInterest ("fieldCallback", this, element);
   }

   fieldCallback (element, field)
   {
      const node = $.data (element, "node");

      if (!node)
         return;

      const event = new CustomEvent (field .getName (),
      {
         detail: {
            node: SFNodeCache .get (node),
            value: field .valueOf (),
         },
      });

      element .dispatchEvent (event);
   }
};

export default DOMIntegration;

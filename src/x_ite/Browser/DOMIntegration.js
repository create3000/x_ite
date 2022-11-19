// DOMIntegration was taken from https://github.com/andreasplesch/x_ite_dom

import XMLParser from "../Parser/XMLParser.js"

const _dom = Symbol .for ("X_ITE.dom");

class DOMIntegration
{
	constructor (browser)
	{
		this .browser      = browser;
		this .rootElements = new WeakSet ();

		this .canvasObserver = new MutationObserver (() =>
		{
			this .observeRoot (this .browser .getElement () .children ("X3D") [0]);
		});

		this .canvasObserver .observe (this .browser .getElement () [0], {
			childList: true,
		});

		this .observeRoot (this .browser .getElement () .children ("X3D") [0]);
	}

	observeRoot (rootElement)
	{
		if (! rootElement)
			return;

		if (this .rootElements .has (rootElement))
			return;

		this .rootElements .add (rootElement);

		//preprocess script nodes if not xhtml

		if (! document .URL .toLowerCase () .includes ("xhtml"))
			this .preprocessScripts (rootElement);

		//now also attached x3d property to each node element
		const onAfterImport = (importedScene) =>
		{
			this .browser .replaceWorld (importedScene);

			this .loadSensor = importedScene .createNode ("LoadSensor") .getValue ();

			//events
			this .addEventDispatchersAll (rootElement); //has to happen after reimporting since rootElement .x3d

			// create an observer instance
			this .observer = new MutationObserver (mutations =>
			{
				for (const mutation of mutations)
					this .processMutation (mutation, new XMLParser (importedScene));
			});

			//start observing, also catches inlined inlines
			this .observer .observe (rootElement, {
				attributes: true,
				childList: true,
				characterData: false,
				subtree: true,
				attributeOldValue: true,
			});

			// Add inline doms from initial scene.
			const inlineElements = rootElement .querySelectorAll ("Inline");

			for (const inlineElement of inlineElements)
				this .processInlineDOM (inlineElement);
		};

		const onError = (error) =>
		{
			console .log ("Error importing document:", error);
		};

		this .browser .importDocument (rootElement, onAfterImport, onError);
	}

	preprocessScripts (rootElement)
	{
		const scripts = rootElement .querySelectorAll ("Script");

		for (const script of scripts)
			this .appendScriptChildren (script);

		return rootElement;
	}

	appendScriptChildren (script)
	{
		const
			domParser   = new DOMParser (),
			scriptDoc   = domParser .parseFromString (script .outerHTML, "application/xml"),
			scriptNodes = scriptDoc .children [0] .childNodes;

		script .textContent = "// content moved into childNodes";

		for (const scriptNode of scriptNodes)
			script .appendChild (scriptNode);
	}

	processMutation (mutation, parser)
	{
		const element = mutation .target;

		switch (mutation .type)
		{
			case "attributes":
			{
				this .processAttribute (mutation, element, parser);
				break;
			}
			case "childList":
			{
				for (const node of mutation .addedNodes)
					this .processAddedNode (node, parser);

				for (const node of mutation .removedNodes)
					this .processRemovedNode (node);

				break;
			}
		}
	}

	addEventDispatchersAll (element)
	{
		for (const child of element .querySelectorAll ("*"))
			this .addEventDispatchers (child);
	}

	addEventDispatchers (element)
	{
		// check for USE nodes; they do not emit events
		if (element .x3d === undefined)
			return;

		if (element .nodeName === "ROUTE")
			return;

		for (const field of element .x3d .getFields ())
			this .bindFieldCallback (field, element);
	}

	bindFieldCallback  (field, element)
	{
		/*var ctx = {};
		ctx .field = field;
		ctx .sensor = sensor;*/
		//only attach callbacks for output fields

		if (field .isOutput ()) // both inputOutput and outputOnly
		{
			field .addFieldCallback ("DomIntegration." + field .getId (),
			                         this .fieldCallback .bind (null, field, element));

			if (this .trace)
			{
				field .addFieldCallback ("DomIntegrationTracer." + field .getId (),
				                         this .fieldTraceCallback .bind (null, field, element .x3d));
			}
		}
	}

	fieldCallback  (field, element, value)
	{
		//var evt = new Event (field .getName ()); // better to use official custom event

		const
		 	node      = element .x3d,
			eventType = "x3d" + "." + field .getName ();

		const event = new CustomEvent (eventType, {
			detail: {
				value: value,
				fields: node .getFields (),
				name: node .getName (),
				x3d: node,
			}
		});

		element .dispatchEvent (event);
	}

	fieldTraceCallback  (field, node, value)
	{
		const
			now       = Date .now (),
			timeStamp = node .getBrowser () .getCurrentTime (),
			dt        = now - timeStamp * 1000;

		console .log ("%f: at %f dt of %s ms %s '%s' %s: %s",
					     now, timeStamp, dt .toFixed (3),
					     node .getTypeName (), node .getName (),
					     field .getName (), value);
	}

	processRemovedNode (element)
	{
		// Works also for root nodes, as it has to be, since scene .rootNodes is effectively a MFNode in x-ite.
		// Also removes ROUTE elements.
		if (element .x3d)
		{
			element .x3d .dispose ();

			if (element .nodeName === "ROUTE") // dispatcher still needs .x3d when dispose processes events
				delete element .x3d;
		}
	}

	processAddedNode (element, parser)
	{
		// Only process element nodes.
		if (element .nodeType !== Node .ELEMENT_NODE)
			return;

		// First need to look for Inline doms to add to dom.
		this .processInlineDOMs (element);

		// Do not add to scene if already parsed as child of inline,
		// although Scene does not have .x3d so should never happen?
		if (element .x3d)
		{
			if (element .nodeName === "Inline" || element .nodeName === "INLINE")
				this .processInlineDOM (element); //only add dom

			return;
		}
		else if (element .nodeName === "Scene" || element .nodeName === "SCENE")
			return;

		const parentNode = element .parentNode;

		// first get correct execution context
		let nodeScene = this .browser .currentScene ; // assume main Scene

		if (parentNode .parentNode .nodeName === "Inline" || parentNode .parentNode .nodeName === "INLINE")
		{
			nodeScene = parentNode .parentNode .x3d .getInternalScene ();
		}
		else if (parentNode .x3d)
		{
			// Use parent's scene if non-root, works for inline.
			nodeScene = parentNode .x3d .getExecutionContext ();
		}

		parser .pushExecutionContext (nodeScene);

		// then check if root node
		if (parentNode .x3d)
		{
			const node = parentNode .x3d;

			parser .pushParent (node);
			parser .childElement (element);
			parser .popParent ();
		}
		else
		{
			// Inline or main root node.
			parser .childElement (element);
		}

		parser .popExecutionContext ();

		// now after creating nodes need to look again for Inline doms.
		this .processInlineDOMs (element);

		//then attach event dispatchers
		//if (element .matches (this .sensorSelector)) { this .addEventDispatchers (element); } // matches () not well supported

		this .addEventDispatchers (element);
		this .addEventDispatchersAll (element); // also for childnodes
	}

	processInlineDOMs (element)
	{
		if (element .nodeName === "Inline" || element .nodeName === "INLINE")
			this .processInlineDOM (element);

		for (const inlineElement of element .querySelectorAll ("Inline"))
			this .processInlineDOM (inlineElement);
	}

	processInlineDOM (element)
	{
		// Check for USE inline as it does not have dom
		if (element .x3d === undefined)
			return;

		const watchList = this .loadSensor .getField ("watchList");

		// Individual callback per inline

		const callback = this .appendInlineDOM .bind (this, element);

		this .loadSensor .getField ("isLoaded") .addFieldCallback ("loaded" + element .x3d .getId (), callback);

		//just add to loadsensor watchlist; triggers isLoaded event after loading
		watchList .push (element .x3d);
	}

	appendInlineDOM (element, loaded)
	{
		// Now loaded and in .dom
		// Inline must have Scene
		const
			node      = element .x3d,
			watchList = this .loadSensor .getField ("watchList"),
			isLoaded  = this .loadSensor .getField ("isLoaded");

		if (node [_dom]) //guard since .dom does not exist for invalid urls
			element .appendChild (node [_dom] .querySelector ("Scene")) ; // XXX: or root nodes? HO: Think, Scene is better.

		//not needed any more, remove callback
		isLoaded .removeFieldCallback ("loaded" + node .getId ());

		// Remove from watchlist

		const wListUpdate = watchList .getValue () .filter (value => value .getValue () !== node);

		watchList .setValue (wListUpdate);

		//check if all inlines are appended and dispatch event;
		//would be also dispatched later whenever a new inline was completely appended
		if (element .querySelector ("Inline") === null) // no more internal inlines
		{
			// also check loadCount ?

			const event = new Event ("x3dload");

			event .element = this .browser .getElement ();

			document .dispatchEvent (event);
		}

		// Attach dom event callbacks.
		this .addEventDispatchersAll (element);
	}

	processAttribute (mutation, element, parser)
	{
		if (element .x3d)
		{
			try
			{
				const
					attributeName = mutation .attributeName,
					attribute     = element .attributes .getNamedItem (attributeName);

				parser .nodeAttribute (attribute, element .x3d);
			}
			catch (error)
			{
				// Unknown attribute.
				console .log (error);
			}
		}
		else
		{
			// is an attribute of non-node child such as fieldValue (or ROUTE)

			const
				parentNode      = element .parentNode, //should always be a node (?)
			 	node            = parentNode .x3d, // need to attach .x3d to ProtoInstance
				isProtoInstance = parentNode .nodeName === "ProtoInstance" || parentNode .nodeName === "PROTOINSTANCE";

			parser .pushExecutionContext (node .getExecutionContext ());
			parser .pushParent (node);
			parser .childElement (element);
			parser .popParent ();
			parser .popExecutionContext ();

			if (isProtoInstance)
			{
				const field = node .getField (element .getAttribute ("name"));

				field .addEvent ();
			}
		}
	}
};

export default DOMIntegration;

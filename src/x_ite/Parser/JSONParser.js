/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 * X3DJSONLD Copyright John Carlson, USA 2016-2017
 * https://coderextreme.net/X3DJSONLD/
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the Cobweb Project.
 *
 * Cobweb is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Cobweb is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Cobweb.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"x_ite/Fields",
	"x_ite/Parser/Parser",
	"x_ite/Parser/XMLParser"
],
function (
          Fields,
          Parser,
          XMLParser
          )
{
"use strict";

	function JSONParser (scene)
	{
		this .scene             = scene;
		this .executionContexts = [ scene ];
		this .protoDeclarations = [ ];
		this .parents           = [ ];
		this .parser            = new Parser (this .scene);
		this .url               = new Fields .MFString ();
		this .x3djsonNS         = "http://www.web3d.org/specifications/x3d-namespace";
	}

	JSONParser.prototype = Object.create(XMLParser.prototype);

	JSONParser .prototype.
		 constructor = JSONParser;

		/**
		 * Load X3D JSON into an element.
		 * jsobj - the JavaScript object to convert to DOM.
		 */
	JSONParser .prototype.
		parseJavaScript = function(jsobj, success, error) {
			var child = this.CreateElement('X3D');
			this.ConvertToX3DOM(jsobj, "", child);
			// call the DOM parser
			this.parseIntoScene(child, success, error);
			return child;
		};

		// 'http://www.web3d.org/specifications/x3d-namespace'

		// Load X3D JavaScript object into XML or DOM

		/**
		 * Yet another way to set an attribute on an element.  does not allow you to
		 * set JSON schema or encoding.
		 */
	JSONParser .prototype.
		elementSetAttribute = function(element, key, value) {
			if (key === 'SON schema') {
				// JSON Schema
			} else if (key === 'ncoding') {
				// encoding, UTF-8, UTF-16 or UTF-32
			} else {
				if (typeof element.setAttribute === 'function') {
					element.setAttribute(key, value);
				}
			}
		};

		/**
		 * converts children of object to DOM.
		 */
	JSONParser .prototype.
		ConvertChildren = function(parentkey, object, element) {
			var key;

			for (key in object) {
				if (typeof object[key] === 'object') {
					if (isNaN(parseInt(key))) {
						this.ConvertObject(key, object, element, parentkey.substr(1));
					} else {
						this.ConvertToX3DOM(object[key], key, element, parentkey.substr(1));
					}
				}
			}
		};

		/**
		 * a method to create and element with tagnam key to DOM in a namespace.  If
		 * containerField is set, then the containerField is set in the elemetn.
		 */
	JSONParser .prototype.
		CreateElement = function(key, containerField) {
			var child = null;
			if (typeof this.x3djsonNS === 'undefined') {
				child = document.createElement(key);
			} else {
				child = document.createElementNS(this.x3djsonNS, key);
				if (child === null || typeof child === 'undefined') {
					console.error('Trouble creating element for', key);
					child = document.createElement(key);
				}
			}
			if (typeof containerField !== 'undefined') {
				this.elementSetAttribute(child, 'containerField', containerField);
			}
			return child;
		};

		/**
		 * a way to create a CDATA function or script in HTML, by using a DOM parser.
		 */
	JSONParser .prototype.
		CDATACreateFunction = function(document, element, str) {
			var y = str.trim().replace(/\\"/g, "\\\"")
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")
				.replace(/&amp;/g, "&");
			do {
				str = y;
				y = str.replace(/'([^'\r\n]*)\n([^']*)'/g, "'$1\\n$2'");
				if (str !== y) {
					console.log("CDATA Replacing",str,"with",y);
				}
			} while (y != str);
			var domParser = new DOMParser();
			var cdataStr = '<script> <![CDATA[ ' + y + ' ]]> </script>'; // has to be wrapped into an element
			var scriptDoc = domParser .parseFromString (cdataStr, 'application/xml');
			var cdata = scriptDoc .children[0] .childNodes[1]; // space after script is childNode[0]
			element .appendChild(cdata);
		};

		/**
		 * convert the object at object[key] to DOM.
		 */
	JSONParser .prototype.
		ConvertObject = function(key, object, element, containerField) {
			var child;
			if (object !== null && typeof object[key] === 'object') {
				if (key.substr(0,1) === '@') {
					this.ConvertToX3DOM(object[key], key, element);
				} else if (key.substr(0,1) === '-') {
					this.ConvertChildren(key, object[key], element);
				} else if (key === '#comment') {
					for (var c in object[key]) {
						child = document.createComment(this.CommentStringToXML(object[key][c]));
						element.appendChild(child);
					}
				} else if (key === '#sourceText') {
					this.CDATACreateFunction(document, element, object[key].join("\r\n")+"\r\n");
				} else {
					if (key === 'connect' || key === 'fieldValue' || key === 'field' || key === 'meta' || key === 'component') {
						for (var childkey in object[key]) {  // for each field
							if (typeof object[key][childkey] === 'object') {
								child = this.CreateElement(key, containerField);
								this.ConvertToX3DOM(object[key][childkey], childkey, child);
								element.appendChild(child);
								element.appendChild(document.createTextNode("\n"));
							}
						}
					} else {
						child = this.CreateElement(key, containerField);
						this.ConvertToX3DOM(object[key], key, child);
						element.appendChild(child);
						element.appendChild(document.createTextNode("\n"));
					}
				}
			}
		};

		/**
		 * convert a comment string in JavaScript to XML.  Pass the string
		 */
	JSONParser .prototype.
		CommentStringToXML = function(str) {
			var y = str;
			str = str.replace(/\\\\/g, '\\');
			if (y !== str) {
				console.log("X3DJSONLD <!-> replacing", y, "with", str);
			}
			return str;
		};

		/**
		 * convert an SFString to XML.
		 */
	JSONParser .prototype.
		SFStringToXML = function(str) {
			var y = str;
			/*
			str = (""+str).replace(/\\\\/g, '\\\\');
			str = str.replace(/\\\\\\\\/g, '\\\\');
			str = str.replace(/(\\+)"/g, '\\"');
			*/
			str = str.replace(/\\/g, '\\\\');
			str = str.replace(/"/g, '\\\"');
			if (y !== str) {
				console.log("X3DJSONLD [] replacing", y, "with", str);
			}
			return str;
		};

		/**
		 * convert a JSON String to XML.
		 */
	JSONParser .prototype.
		JSONStringToXML = function(str) {
			var y = str;
			str = str.replace(/\\/g, '\\\\');
			str = str.replace(/\n/g, '\\n');
			if (y !== str) {
				console.log("X3DJSONLD replacing", y, "with", str);
			}
			return str;
		};

		/**
		 * main routine for converting a JavaScript object to DOM.
		 * object is the object to convert.
		 * parentkey is the key of the object in the parent.
		 * element is the parent element.
		 * containerField is a possible containerField.
		 */
	JSONParser .prototype.
		ConvertToX3DOM = function(object, parentkey, element, containerField) {
			var key;
			var localArray = [];
			var isArray = false;
			var arrayOfStrings = false;
			for (key in object) {
				if (isNaN(parseInt(key))) {
					isArray = false;
				} else {
					isArray = true;
				}
				if (isArray) {
					if (typeof object[key] === 'number') {
						localArray.push(object[key]);
					} else if (typeof object[key] === 'string') {
						localArray.push(object[key]);
						arrayOfStrings = true;
					} else if (typeof object[key] === 'boolean') {
						localArray.push(object[key]);
					} else if (typeof object[key] === 'object') {
						/*
						if (object[key] != null && typeof object[key].join === 'function') {
							localArray.push(object[key].join(" "));
						}
						*/
						this.ConvertToX3DOM(object[key], key, element);
					} else if (typeof object[key] === 'undefined') {
					} else {
						console.error("Unknown type found in array "+typeof object[key]);
					}
				} else if (typeof object[key] === 'object') {
					// This is where the whole thing starts
					if (key === 'X3D') {
						this.ConvertToX3DOM(object[key], key, element);
					} else {
						this.ConvertObject(key, object, element);
					}
				} else if (typeof object[key] === 'number') {
					this.elementSetAttribute(element, key.substr(1),object[key]);
				} else if (typeof object[key] === 'string') {
					if (key !== '#comment') {
						// ordinary string attributes
						this.elementSetAttribute(element, key.substr(1), this.JSONStringToXML(object[key]));
					} else {
						var child = document.createComment(this.CommentStringToXML(object[key]));
						element.appendChild(child);
					}
				} else if (typeof object[key] === 'boolean') {
					this.elementSetAttribute(element, key.substr(1),object[key]);
				} else if (typeof object[key] === 'undefined') {
				} else {
					console.error("Unknown type found in object "+typeof object[key]);
					console.error(object);
				}
			}
			if (isArray) {
				if (parentkey.substr(0,1) === '@') {
					if (arrayOfStrings) {
						arrayOfStrings = false;
						for (var str in localArray) {
							localArray[str] = this.SFStringToXML(localArray[str]);
						}
						this.elementSetAttribute(element, parentkey.substr(1),'"'+localArray.join('" "')+'"');
					} else {
						// if non string array
						this.elementSetAttribute(element, parentkey.substr(1),localArray.join(" "));
					}
				}
				isArray = false;
			}
			return element;
		};
	return JSONParser;
});

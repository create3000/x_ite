/* X_ITE v14.0.3 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-14.0.3")];
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: default

;// external "__X_ITE_X3D__ .Components"
const external_X_ITE_X3D_Components_namespaceObject = __X_ITE_X3D__ .Components;
var external_X_ITE_X3D_Components_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Components_namespaceObject);
;// external "__X_ITE_X3D__ .Fields"
const external_X_ITE_X3D_Fields_namespaceObject = __X_ITE_X3D__ .Fields;
var external_X_ITE_X3D_Fields_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Fields_namespaceObject);
;// external "__X_ITE_X3D__ .X3DFieldDefinition"
const external_X_ITE_X3D_X3DFieldDefinition_namespaceObject = __X_ITE_X3D__ .X3DFieldDefinition;
var external_X_ITE_X3D_X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DFieldDefinition_namespaceObject);
;// external "__X_ITE_X3D__ .FieldDefinitionArray"
const external_X_ITE_X3D_FieldDefinitionArray_namespaceObject = __X_ITE_X3D__ .FieldDefinitionArray;
var external_X_ITE_X3D_FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_FieldDefinitionArray_namespaceObject);
;// external "__X_ITE_X3D__ .X3DNode"
const external_X_ITE_X3D_X3DNode_namespaceObject = __X_ITE_X3D__ .X3DNode;
var external_X_ITE_X3D_X3DNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DGeometryNode"
const external_X_ITE_X3D_X3DGeometryNode_namespaceObject = __X_ITE_X3D__ .X3DGeometryNode;
var external_X_ITE_X3D_X3DGeometryNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DGeometryNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Components/Geometry3D/Box.js








function Box (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Box);

   // Units

   this ._size .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Box .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   build: (() =>
   {
      const defaultSize = new (external_X_ITE_X3D_Vector3_default()) (2);

      return function ()
      {
         const
            options     = this .getBrowser () .getBoxOptions (),
            geometry    = options .getGeometry (),
            size        = this ._size .getValue (),
            vertexArray = this .getVertices ();

         this .getMultiTexCoords () .push (... geometry .getMultiTexCoords ());
         this .getTangents () .assign (geometry .getTangents ());
         this .getNormals ()  .assign (geometry .getNormals ());

         if (size .equals (defaultSize))
         {
            vertexArray .assign (geometry .getVertices ());

            this .getMin () .assign (geometry .getMin ());
            this .getMax () .assign (geometry .getMax ());
         }
         else
         {
            const
               x               = Math .abs (size .x / 2),
               y               = Math .abs (size .y / 2),
               z               = Math .abs (size .z / 2),
               defaultVertices = geometry .getVertices ();

            for (let i = 0, length = defaultVertices .length; i < length; i += 4)
            {
               vertexArray .push (x * defaultVertices [i],
                                  y * defaultVertices [i + 1],
                                  z * defaultVertices [i + 2],
                                  1);
            }

            this .getMin () .set (-x, -y, -z);
            this .getMax () .set ( x,  y,  z);
         }

         this .setSolid (this ._solid .getValue ());
      };
   })(),
});

Object .defineProperties (Box,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Box", "Geometry3D", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "size",     new (external_X_ITE_X3D_Fields_default()).SFVec3f (2, 2, 2)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",    new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
      ]),
      enumerable: true,
   },
});

const __default__ = Box;
;

/* harmony default export */ const Geometry3D_Box = (external_X_ITE_X3D_Namespace_default().add ("Box", __default__));
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// ./src/x_ite/Components/Geometry3D/Cone.js









function Cone (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Cone);

   // Units

   this ._height       .setUnit ("length");
   this ._bottomRadius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Cone .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   set_live__ ()
   {
      this .connectOptions (this .getBrowser () .getConeOptions ());
   },
   build ()
   {
      const
         options       = this .getBrowser () .getConeOptions (),
         height        = Math .abs (this ._height .getValue ()),
         height1_2     = height / 2,
         bottomRadius  = Math .abs (this ._bottomRadius .getValue ()),
         texCoordArray = this .getTexCoords (),
         normalArray   = this .getNormals (),
         vertexArray   = this .getVertices ();

      this .getMultiTexCoords () .push (texCoordArray);

      if (this ._side .getValue ())
      {
         const
            geometry        = options .getSideGeometry (),
            defaultNormals  = geometry .getNormals (),
            defaultVertices = geometry .getVertices (),
            v1              = new (external_X_ITE_X3D_Vector3_default()) (),
            rz              = new (external_X_ITE_X3D_Rotation4_default()) (1, 0, 0, -Math .atan (bottomRadius / height)),
            rx              = new (external_X_ITE_X3D_Rotation4_default()) ();

         for (const t of geometry .getMultiTexCoords () [0])
            texCoordArray .push (t);

         for (let i = 0, length = defaultNormals .length; i < length; i += 3)
         {
            v1 .set (defaultNormals [i], 0, defaultNormals [i + 2]),
            rx .setFromToVec ((external_X_ITE_X3D_Vector3_default()).Z_AXIS, v1) .multLeft (rz) .multVecRot (v1 .set (0, 0, 1));

            normalArray .push (... v1);
         }

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (bottomRadius * defaultVertices [i],
                               height1_2    * defaultVertices [i + 1],
                               bottomRadius * defaultVertices [i + 2],
                               1);
         }
      }

      if (this ._bottom .getValue ())
      {
         const
            geometry        = options .getBottomGeometry (),
            defaultVertices = geometry .getVertices ();

         for (const t of geometry .getMultiTexCoords () [0])
            texCoordArray .push (t);

         for (const n of geometry .getNormals ())
            normalArray .push (n);

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (bottomRadius * defaultVertices [i],
                               height1_2    * defaultVertices [i + 1],
                               bottomRadius * defaultVertices [i + 2],
                               1);
         }
      }

      this .setSolid (this ._solid .getValue ());
      this .setExtents ();
   },
   setExtents ()
   {
      const
         bottomRadius = this ._bottomRadius .getValue (),
         y1           = this ._height .getValue () / 2,
         y2           = -y1;

      if (!this ._side .getValue () && !this ._bottom .getValue ())
      {
         this .getMin () .set (0);
         this .getMax () .set (0);
      }
      else if (!this ._side .getValue ())
      {
         this .getMin () .set (-bottomRadius, y2, -bottomRadius);
         this .getMax () .set ( bottomRadius, y2,  bottomRadius);
      }
      else
      {
         this .getMin () .set (-bottomRadius, y2, -bottomRadius);
         this .getMax () .set ( bottomRadius, y1, bottomRadius);
      }
   },
});

Object .defineProperties (Cone,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Cone", "Geometry3D", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "side",         new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bottom",       new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "height",       new (external_X_ITE_X3D_Fields_default()).SFFloat (2)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bottomRadius", new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
      ]),
      enumerable: true,
   },
});

const Cone_default_ = Cone;
;

/* harmony default export */ const Geometry3D_Cone = (external_X_ITE_X3D_Namespace_default().add ("Cone", Cone_default_));
;// ./src/x_ite/Components/Geometry3D/Cylinder.js







function Cylinder (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Cylinder);

   // Units

   this ._height .setUnit ("length");
   this ._radius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Cylinder .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   set_live__ ()
   {
      this .connectOptions (this .getBrowser () .getCylinderOptions ());
   },
   build ()
   {
      const
         options       = this .getBrowser () .getCylinderOptions (),
         height1_2     = Math .abs (this ._height .getValue ()) / 2,
         radius        = Math .abs (this ._radius .getValue ()),
         texCoordArray = this .getTexCoords (),
         tangentArray  = this .getTangents (),
         normalArray   = this .getNormals (),
         vertexArray   = this .getVertices ();

      this .getMultiTexCoords () .push (texCoordArray);

      if (this ._side .getValue ())
      {
         const
            geometry        = options .getSideGeometry (),
            defaultVertices = geometry .getVertices ();

         for (const t of geometry .getMultiTexCoords () [0])
            texCoordArray .push (t);

         for (const t of geometry .getTangents ())
            tangentArray .push (t);

         for (const n of geometry .getNormals ())
            normalArray .push (n);

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (radius    * defaultVertices [i],
                               height1_2 * defaultVertices [i + 1],
                               radius    * defaultVertices [i + 2],
                               1);
         }
      }

      if (this ._top .getValue ())
      {
         const
            geometry        = options .getTopGeometry (),
            defaultVertices = geometry .getVertices ();

         for (const t of geometry .getMultiTexCoords () [0])
            texCoordArray .push (t);

         for (const t of geometry .getTangents ())
            tangentArray .push (t);

         for (const n of geometry .getNormals ())
            normalArray .push (n);

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (radius    * defaultVertices [i],
                               height1_2 * defaultVertices [i + 1],
                               radius    * defaultVertices [i + 2],
                               1);
         }
      }

      if (this ._bottom .getValue ())
      {
         const
            geometry        = options .getBottomGeometry (),
            defaultVertices = geometry .getVertices ();

         for (const t of geometry .getMultiTexCoords () [0])
            texCoordArray .push (t);

         for (const t of geometry .getTangents ())
            tangentArray .push (t);

         for (const n of geometry .getNormals ())
            normalArray .push (n);

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (radius    * defaultVertices [i],
                               height1_2 * defaultVertices [i + 1],
                               radius    * defaultVertices [i + 2],
                               1);
         }
      }

      this .setSolid (this ._solid .getValue ());
      this .setExtents ();
   },
   setExtents ()
   {
      const
         radius = this ._radius .getValue (),
         y1     = this ._height .getValue () / 2,
         y2     = -y1;

      if (!this ._top .getValue () && !this ._side .getValue () && !this ._bottom .getValue ())
      {
         this .getMin () .set (0);
         this .getMax () .set (0);
      }

      else if (!this ._top .getValue () && !this ._side .getValue ())
      {
         this .getMin () .set (-radius, y2, -radius);
         this .getMax () .set ( radius, y2,  radius);
      }

      else if (!this ._bottom .getValue () && !this ._side .getValue ())
      {
         this .getMin () .set (-radius, y1, -radius);
         this .getMax () .set ( radius, y1,  radius);
      }

      else
      {
         this .getMin () .set (-radius, y2, -radius);
         this .getMax () .set ( radius, y1,  radius);
      }
   },
});

Object .defineProperties (Cylinder,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Cylinder", "Geometry3D", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "top",      new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "side",     new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bottom",   new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "height",   new (external_X_ITE_X3D_Fields_default()).SFFloat (2)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "radius",   new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",    new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
      ]),
      enumerable: true,
   },
});

const Cylinder_default_ = Cylinder;
;

/* harmony default export */ const Geometry3D_Cylinder = (external_X_ITE_X3D_Namespace_default().add ("Cylinder", Cylinder_default_));
;// external "__X_ITE_X3D__ .Triangle3"
const external_X_ITE_X3D_Triangle3_namespaceObject = __X_ITE_X3D__ .Triangle3;
var external_X_ITE_X3D_Triangle3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Triangle3_namespaceObject);
;// external "__X_ITE_X3D__ .Vector2"
const external_X_ITE_X3D_Vector2_namespaceObject = __X_ITE_X3D__ .Vector2;
var external_X_ITE_X3D_Vector2_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector2_namespaceObject);
;// ./src/x_ite/Components/Geometry3D/ElevationGrid.js










function ElevationGrid (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ElevationGrid);

   // Units

   this ._set_height  .setUnit ("length");
   this ._xSpacing    .setUnit ("length");
   this ._zSpacing    .setUnit ("length");
   this ._creaseAngle .setUnit ("angle");
   this ._height      .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (ElevationGrid .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DGeometryNode_default().prototype .initialize .call (this);

      this ._set_height .addFieldInterest (this ._height);
      this ._attrib     .addInterest ("set_attrib__",   this);
      this ._fogCoord   .addInterest ("set_fogCoord__", this);
      this ._color      .addInterest ("set_color__",    this);
      this ._texCoord   .addInterest ("set_texCoord__", this);
      this ._tangent    .addInterest ("set_tangent__",  this);
      this ._normal     .addInterest ("set_normal__",   this);

      this .set_attrib__ ();
      this .set_fogCoord__ ();
      this .set_color__ ();
      this .set_texCoord__ ();
      this .set_tangent__ ();
      this .set_normal__ ();
   },
   getHeight (index)
   {
      if (index < this ._height .length)
         return this ._height [index];

      return 0;
   },
   createTexCoords ()
   {
      const
         texCoords  = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSize      = xDimension - 1,
         zSize      = zDimension - 1;

      for (let z = 0; z < zDimension; ++ z)
      {
         for (let x = 0; x < xDimension; ++ x)
            texCoords .push (new (external_X_ITE_X3D_Vector2_default()) (x / xSize, z / zSize));
      }

      return texCoords;
   },
   createNormals (points, coordIndex, creaseAngle)
   {
      const
         cw          = ! this ._ccw .getValue (),
         normalIndex = new Map (),
         normals     = [ ];

      for (let p = 0, length = points .length; p < length; ++ p)
         normalIndex .set (p, [ ]);

      for (let c = 0, length = coordIndex .length; c < length; c += 3)
      {
         const
            c0 = coordIndex [c],
            c1 = coordIndex [c + 1],
            c2 = coordIndex [c + 2];

         normalIndex .get (c0) .push (normals .length);
         normalIndex .get (c1) .push (normals .length + 1);
         normalIndex .get (c2) .push (normals .length + 2);

         const normal = external_X_ITE_X3D_Triangle3_default().normal (points [c0], points [c1], points [c2], new (external_X_ITE_X3D_Vector3_default()) ());

         if (cw)
            normal .negate ();

         normals .push (normal);
         normals .push (normal);
         normals .push (normal);
      }

      if (!this ._normalPerVertex .getValue ())
         return normals;

      return this .refineNormals (normalIndex, normals, creaseAngle ?? this ._creaseAngle .getValue ());
   },
   createCoordIndex ()
   {
      // p1 - p4
      //  | \ |
      // p2 - p3

      const
         coordIndex = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSize      = xDimension - 1,
         zSize      = zDimension - 1;

      for (let z = 0; z < zSize; ++ z)
      {
         for (let x = 0; x < xSize; ++ x)
         {
            const
               i1 =       z * xDimension + x,
               i2 = (z + 1) * xDimension + x,
               i3 = (z + 1) * xDimension + (x + 1),
               i4 =       z * xDimension + (x + 1);

            coordIndex .push (i1); // p1
            coordIndex .push (i2); // p2
            coordIndex .push (i3); // p3

            coordIndex .push (i1); // p1
            coordIndex .push (i3); // p3
            coordIndex .push (i4); // p4
         }
      }

      return coordIndex;
   },
   createPoints ()
   {
      const
         points     = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSpacing   = this ._xSpacing .getValue (),
         zSpacing   = this ._zSpacing .getValue ();

      for (let z = 0; z < zDimension; ++ z)
      {
         for (let x = 0; x < xDimension; ++ x)
         {
            points .push (new (external_X_ITE_X3D_Vector3_default()) (xSpacing * x,
                                       this .getHeight (x + z * xDimension),
                                       zSpacing * z));
         }
      }

      return points;
   },
   build ()
   {
      if (this ._xDimension .getValue () < 2 || this ._zDimension .getValue () < 2)
         return;

      const
         colorPerVertex     = this ._colorPerVertex .getValue (),
         normalPerVertex    = this ._normalPerVertex .getValue (),
         coordIndex         = this .createCoordIndex (),
         coordIndicesArray  = this .getCoordIndices (),
         attribNodes        = this .getAttrib (),
         numAttribNodes     = attribNodes .length,
         attribArrays       = this .getAttribs (),
         fogCoordNode       = this .getFogCoord (),
         colorNode          = this .getColor (),
         texCoordNode       = this .getTexCoord (),
         tangentNode        = this .getTangent (),
         normalNode         = this .getNormal (),
         points             = this .createPoints (),
         fogDepthArray      = this .getFogDepths (),
         colorArray         = this .getColors (),
         multiTexCoordArray = this .getMultiTexCoords (),
         tangentArray       = this .getTangents (),
         normalArray        = this .getNormals (),
         vertexArray        = this .getVertices (),
         numCoordIndices    = coordIndex .length;

      let texCoords, texCoordArray;

      if (texCoordNode)
      {
         texCoordNode .init (multiTexCoordArray);
      }
      else
      {
         texCoords     = this .createTexCoords (),
         texCoordArray = this .getTexCoords ();

         multiTexCoordArray .push (texCoordArray);
      }

      // Build geometry

      let face = 0;

      for (let c = 0; c < numCoordIndices; ++ face)
      {
         for (let p = 0; p < 6; ++ p, ++ c)
         {
            const
               index      = coordIndex [c],
               { x, y, z} = points [index];

            coordIndicesArray .push (index);

            for (let a = 0; a < numAttribNodes; ++ a)
               attribNodes [a] .addValue (index, attribArrays [a]);

            fogCoordNode ?.addDepth (index, fogDepthArray);

            colorNode ?.addColor (colorPerVertex ? index : face, colorArray);

            if (texCoordNode)
            {
               texCoordNode .addPoint (index, multiTexCoordArray);
            }
            else
            {
               const { x, y } = texCoords [index];

               texCoordArray .push (x, y, 0, 1);
            }

            tangentNode ?.addVector (normalPerVertex ? index : face, tangentArray);
            normalNode  ?.addVector (normalPerVertex ? index : face, normalArray);

            vertexArray .push (x, y, z, 1);
         }
      }

      // Add auto-generated normals if needed.

      if (!normalNode)
      {
         const normals = this .createNormals (points, coordIndex);

         for (const { x, y, z } of normals)
            normalArray .push (x, y, z);
      }

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
});

Object .defineProperties (ElevationGrid,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ElevationGrid", "Geometry3D", 3, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_height",      new (external_X_ITE_X3D_Fields_default()).MFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "xDimension",      new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "zDimension",      new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "xSpacing",        new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "zSpacing",        new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "ccw",             new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "creaseAngle",     new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "colorPerVertex",  new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "normalPerVertex", new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "attrib",          new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "fogCoord",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "color",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "texCoord",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "tangent",         new (external_X_ITE_X3D_Fields_default()).SFNode ()), // experimental
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "normal",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "height",          new (external_X_ITE_X3D_Fields_default()).MFFloat ()),
      ]),
      enumerable: true,
   },
});

const ElevationGrid_default_ = ElevationGrid;
;

/* harmony default export */ const Geometry3D_ElevationGrid = (external_X_ITE_X3D_Namespace_default().add ("ElevationGrid", ElevationGrid_default_));
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// ./src/x_ite/Components/Geometry3D/Extrusion.js












function Extrusion (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Extrusion);

   // Units

   this ._creaseAngle  .setUnit ("angle");
   this ._crossSection .setUnit ("length");
   this ._spine        .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Extrusion .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DGeometryNode_default().prototype .initialize .call (this);

      this ._set_crossSection .addFieldInterest (this ._crossSection);
      this ._set_orientation  .addFieldInterest (this ._orientation);
      this ._set_scale        .addFieldInterest (this ._scale);
      this ._set_spine        .addFieldInterest (this ._spine);
   },
   getClosed (array)
   {
      if (!array .length)
         return true;

      const
         first = array .at (0)  .getValue (),
         last  = array .at (-1) .getValue ();

      return first .equals (last);
   },
   createPoints: (() =>
   {
      const scale3 = new (external_X_ITE_X3D_Vector3_default()) (1);

      return function ()
      {
         const
            crossSection     = this ._crossSection,
            orientation      = this ._orientation,
            scale            = this ._scale,
            spine            = this ._spine,
            numCrossSections = crossSection .length,
            numOrientations  = orientation .length,
            numScales        = scale .length,
            numSpines        = spine .length,
            points           = [ ];

         // Calculate SCP rotations.

         const rotations = this .createRotations ();

         // Calculate vertices.

         for (let i = 0; i < numSpines; ++ i)
         {
            const matrix = rotations [i];

            if (numOrientations)
               matrix .rotate (orientation [Math .min (i, numOrientations - 1)] .getValue ());

            if (numScales)
            {
               const s = scale [Math .min (i, numScales - 1)] .getValue ();
               matrix .scale (scale3 .set (s .x, 1, s .y));
            }

            for (let cs = 0; cs < numCrossSections; ++ cs)
            {
               const vector = crossSection [cs] .getValue ();
               points .push (matrix .multVecMatrix (new (external_X_ITE_X3D_Vector3_default()) (vector .x, 0, vector .y)));
            }
         }

         return points;
      };
   })(),
   createRotations: (() =>
   {
      const rotations = [ ];

      const
         SCPxAxis = new (external_X_ITE_X3D_Vector3_default()) (),
         SCPyAxis = new (external_X_ITE_X3D_Vector3_default()) (),
         SCPzAxis = new (external_X_ITE_X3D_Vector3_default()) ();

      const
         SCPyAxisPrevious = new (external_X_ITE_X3D_Vector3_default()) (),
         SCPzAxisPrevious = new (external_X_ITE_X3D_Vector3_default()) ();

      const
         vector3  = new (external_X_ITE_X3D_Vector3_default()) (),
         rotation = new (external_X_ITE_X3D_Rotation4_default()) ();

      return function ()
      {
         // calculate SCP rotations

         const
            spine       = this ._spine,
            numSpines   = spine .length,
            closedSpine = this .getClosed (spine); // Test only for closed spine.

         // Extend or shrink static rotations array:
         for (let i = rotations .length; i < numSpines; ++ i)
            rotations [i] = new (external_X_ITE_X3D_Matrix4_default()) ();

         rotations .length = numSpines;

         // SCP axes:
         SCPxAxis .set (0);
         SCPyAxis .set (0);
         SCPzAxis .set (0);

         // SCP for the first point:
         if (closedSpine)
         {
            const s = spine .at (0) .getValue ();

            // Find first defined Y-axis.
            for (let i = 1, length = numSpines - 2; i < length; ++ i)
            {
               SCPyAxis .assign (spine [i] .getValue ()) .subtract (s) .normalize ()
                  .subtract (vector3 .assign (spine [length] .getValue ()) .subtract (s) .normalize ())
                  .normalize ();

               if (!SCPyAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
                  break;
            }

            // Find first defined Z-axis.
            for (let i = 0, length = numSpines - 2; i < length; ++ i)
            {
               SCPzAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i] .getValue ())
                  .cross (vector3 .assign (spine [length] .getValue ()) .subtract (spine [i] .getValue ()))
                  .normalize ();

               if (!SCPzAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
                  break;
            }
         }
         else
         {
            // Find first defined Y-axis.
            for (let i = 0, length = numSpines - 1; i < length; ++ i)
            {
               SCPyAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i] .getValue ()) .normalize ();

               if (!SCPyAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
                  break;
            }

            // Find first defined Z-axis.
            for (let i = 1, length = numSpines - 1; i < length; ++ i)
            {
               SCPzAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i] .getValue ())
                  .cross (vector3 .assign (spine [i - 1] .getValue ()) .subtract (spine [i] .getValue ()))
                  .normalize ();

               if (!SCPzAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
                  break;
            }
         }

         // The entire spine is coincident:
         if (SCPyAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
            SCPyAxis .set (0, 1, 0);

         // The entire spine is collinear:
         if (SCPzAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
            rotation .setFromToVec ((external_X_ITE_X3D_Vector3_default()).Y_AXIS, SCPyAxis) .multVecRot (SCPzAxis .assign ((external_X_ITE_X3D_Vector3_default()).Z_AXIS));

         // We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
         SCPxAxis .assign (SCPyAxis) .cross (SCPzAxis);

         // Get first spine
         const s = spine .at (0) .getValue ();

         rotations [0] .set (... SCPxAxis, 0,
                             ... SCPyAxis, 0,
                             ... SCPzAxis, 0,
                             ... s,        1);

         // For all points other than the first or last:

         SCPyAxisPrevious .assign (SCPyAxis);
         SCPzAxisPrevious .assign (SCPzAxis);

         for (let i = 1, length = numSpines - 1; i < length; ++ i)
         {
            const s = spine [i] .getValue ();

            SCPyAxis .assign (spine [i + 1] .getValue ()) .subtract (s) .normalize ()
               .subtract (vector3 .assign (spine [i - 1] .getValue ()) .subtract (s) .normalize ())
               .normalize ();
            SCPzAxis .assign (spine [i + 1] .getValue ()) .subtract (s)
               .cross (vector3 .assign (spine [i - 1] .getValue ()) .subtract (s))
               .normalize ();

            // Fix edge case.
            // https://www.web3d.org/x3d/content/examples/X3dForAdvancedModeling/GeometricShapes/ExtrusionEdgeCasesIndex.html
            if (SCPyAxisPrevious .dot (SCPyAxis) < 0)
               SCPyAxis .negate ();

            // g.
            if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
               SCPzAxis .negate ();

            // The two points used in computing the Y-axis are coincident.
            if (SCPyAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
               SCPyAxis .assign (SCPyAxisPrevious);
            else
               SCPyAxisPrevious .assign (SCPyAxis);

            // The three points used in computing the Z-axis are collinear.
            if (SCPzAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
               SCPzAxis .assign (SCPzAxisPrevious);
            else
               SCPzAxisPrevious .assign (SCPzAxis);

            // We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
            SCPxAxis .assign (SCPyAxis) .cross (SCPzAxis);

            rotations [i] .set (... SCPxAxis, 0,
                                ... SCPyAxis, 0,
                                ... SCPzAxis, 0,
                                ... s,        1);
         }

         // SCP for the last point
         if (closedSpine)
         {
            // The SCPs for the first and last points are the same.
            rotations [numSpines - 1] .assign (rotations [0]);
         }
         else
         {
            const s = spine .at (-1) .getValue ();

            SCPyAxis .assign (s) .subtract (spine .at (-2) .getValue ()) .normalize ();

            if (numSpines > 2)
            {
               SCPzAxis .assign (s) .subtract (spine .at (-2) .getValue ())
                  .cross (vector3 .assign (spine .at (-3) .getValue ()) .subtract (spine .at (-2) .getValue ()))
                  .normalize ();
            }

            // Fix edge case.
            // https://www.web3d.org/x3d/content/examples/X3dForAdvancedModeling/GeometricShapes/ExtrusionEdgeCasesIndex.html
            if (SCPyAxisPrevious .dot (SCPyAxis) < 0)
               SCPyAxis .negate ();

            // g.
            if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
               SCPzAxis .negate ();

            // The two points used in computing the Y-axis are coincident.
            if (SCPyAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
               SCPyAxis .assign (SCPyAxisPrevious);

            // The three points used in computing the Z-axis are collinear.
            if (SCPzAxis .equals ((external_X_ITE_X3D_Vector3_default()).ZERO))
               SCPzAxis .assign (SCPzAxisPrevious);

            // We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
            SCPxAxis .assign (SCPyAxis) .cross (SCPzAxis);

            rotations [numSpines - 1] .set (... SCPxAxis, 0,
                                            ... SCPyAxis, 0,
                                            ... SCPzAxis, 0,
                                            ... s,        1);
         }

         return rotations;
      };
   })(),
   build: (() =>
   {
      const
         min     = new (external_X_ITE_X3D_Vector2_default()) (),
         max     = new (external_X_ITE_X3D_Vector2_default()) (),
         vector2 = new (external_X_ITE_X3D_Vector2_default()) ();

      return function ()
      {
         const
            cw                = !this ._ccw .getValue (),
            crossSection      = this ._crossSection,
            spine             = this ._spine,
            numCrossSections  = crossSection .length,
            numSpines         = spine .length,
            coordIndicesArray = this .getCoordIndices (),
            texCoordArray     = this .getTexCoords ();

         if (numSpines < 2 || numCrossSections < 2)
            return;

         this .getMultiTexCoords () .push (texCoordArray);

         const INDEX = (n, k) => n * numCrossSections + k;

         // Use this to determine if start and end points should be connected.
         const closed = this .getClosed (spine)
            && this .getClosed (this ._orientation)
            && this .getClosed (this ._scale);

         const closedCrossSection = this .getClosed (crossSection);

         // For caps calculation

         min .assign (crossSection [0] .getValue ());
         max .assign (crossSection [0] .getValue ());

         for (let k = 1; k < numCrossSections; ++ k)
         {
            min .min (crossSection [k] .getValue ());
            max .max (crossSection [k] .getValue ());
         }

         const
            capSize      = vector2 .assign (max) .subtract (min),
            capMax       = Math .max (capSize .x, capSize .y),
            numCapPoints = closedCrossSection ? numCrossSections - 1 : numCrossSections;

         // Create

         const
            normalIndex = new Map (),
            normals     = [ ],
            points      = this .createPoints (),
            numPoints   = points .length;

         for (let p = 0; p < numPoints; ++ p)
            normalIndex .set (p, [ ]);

         // Build body.

         const
            normalArray = this .getNormals (),
            vertexArray = this .getVertices ();

         const
            numCrossSection_1 = numCrossSections - 1,
            numSpine_1        = numSpines - 1;

         let
            indexLeft  = INDEX (0, 0),
            indexRight = INDEX (0, closedCrossSection ? 0 : numCrossSection_1);

         for (let n = 0; n < numSpine_1; ++ n)
         {
            for (let k = 0; k < numCrossSection_1; ++ k)
            {
               const
                  n1 = closed && n === numSpines - 2 ? 0 : n + 1,
                  k1 = closedCrossSection && k === numCrossSections - 2 ? 0 : k + 1;

               // k      k+1
               //
               // p4 ----- p3   n+1
               //  |     / |
               //  |   /   |
               //  | /     |
               // p1 ----- p2   n

               let
                  i1 = INDEX (n,  k),
                  i2 = INDEX (n,  k1),
                  i3 = INDEX (n1, k1),
                  i4 = INDEX (n1, k),
                  p1 = points [i1],
                  p2 = points [i2],
                  p3 = points [i3],
                  p4 = points [i4],
                  l1 = p2 .distance (p3) >= 1e-7,
                  l2 = p4 .distance (p1) >= 1e-7;

               const
                  normal1 = external_X_ITE_X3D_Triangle3_default().normal (p1, p2, p3, new (external_X_ITE_X3D_Vector3_default()) ()),
                  normal2 = external_X_ITE_X3D_Triangle3_default().normal (p1, p3, p4, new (external_X_ITE_X3D_Vector3_default()) ());

               if (cw)
               {
                  normal1 .negate ();
                  normal2 .negate ();
               }

               // Merge points on the left and right side if spine is coincident for better normal generation.

               if (k === 0)
               {
                  if (l2)
                  {
                     indexLeft = i1;
                  }
                  else
                  {
                     i1 = indexLeft;
                     p1 = points [i1];
                  }
               }

               if (k === numCrossSections - 2)
               {
                  if (l1)
                  {
                     indexRight = i2;
                  }
                  else
                  {
                     i3 = indexRight;
                     p3 = points [i3];
                  }
               }

               // If there are coincident spine points then one length can be zero.

               // Triangle one

               if (l1)
               {
                  coordIndicesArray .push (i1, i2, i3);

                  // p1
                  if (l2)
                  {
                     texCoordArray .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
                  }
                  else
                  {
                     // Cone case: ((texCoord1 + texCoord4) / 2)
                     const y = (n / numSpine_1 + (n + 1) / numSpine_1) / 2;

                     texCoordArray .push (k / numCrossSection_1, y, 0, 1);
                  }

                  normalIndex .get (i1) .push (normals .length);
                  normals .push (normal1);
                  vertexArray .push (... p1, 1);

                  // p2
                  texCoordArray .push ((k + 1) / numCrossSection_1, n / numSpine_1, 0, 1);
                  normalIndex .get (i2) .push (normals .length);
                  normals .push (normal1);
                  vertexArray .push (... p2, 1);

                  // p3
                  texCoordArray .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
                  normalIndex .get (i3) .push (normals .length);
                  normals .push (normal1);
                  vertexArray .push (... p3, 1);
               }

               // Triangle two

               if (l2)
               {
                  coordIndicesArray .push (i1, i3, i4);

                  // p1
                  texCoordArray .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
                  normalIndex .get (i1) .push (normals .length);
                  normals .push (normal2);
                  vertexArray .push (... p1, 1);

                  // p3
                  if (l1)
                  {
                     texCoordArray .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
                  }
                  else
                  {
                     // Cone case: ((texCoord3 + texCoord2) / 2)
                     const y = ((n + 1) / numSpine_1 + n / numSpine_1) / 2;

                     texCoordArray .push ((k + 1) / numCrossSection_1, y, 0, 1);
                  }

                  normalIndex .get (i3) .push (normals .length);
                  normals .push (normal2);
                  vertexArray .push (... p3, 1);

                  // p4
                  texCoordArray .push (k / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
                  normalIndex .get (i4) .push (normals .length);
                  normals .push (normal2);
                  vertexArray .push (... p4, 1);
               }
            }
         }

         // Refine body normals and add them.

         const refinedNormals = this .refineNormals (normalIndex, normals, this ._creaseAngle .getValue ());

         for (const { x, y, z } of refinedNormals)
            normalArray .push (x, y, z);

         // Build caps

         if (capMax && numCapPoints > 2)
         {
            if (this ._beginCap .getValue ())
            {
               const
                  j         = 0, // spine
                  convex    = this ._convex .getValue (),
                  texCoord  = { },
                  polygon   = [ ],
                  triangles = [ ];

               for (let k = 0; k < numCapPoints; ++ k)
               {
                  const
                     index = INDEX (j, numCapPoints - 1 - k),
                     point = points [index] .copy ();

                  point .index     = index;
                  texCoord [index] = crossSection [numCapPoints - 1 - k] .getValue () .copy () .subtract (min) .divide (capMax);
                  polygon .push (convex ? index : point);
               }

               if (convex)
                  external_X_ITE_X3D_Triangle3_default().triangulateConvexPolygon (polygon, triangles);

               else
                  external_X_ITE_X3D_Triangle3_default().triangulatePolygon (polygon, triangles);

               if (triangles .length >= 3)
               {
                  const normal = external_X_ITE_X3D_Triangle3_default().normal (points [triangles [0]],
                                                    points [triangles [1]],
                                                    points [triangles [2]],
                                                    new (external_X_ITE_X3D_Vector3_default()) ());

                  if (cw)
                     normal .negate ();

                  this .addCap (texCoordArray, texCoord, normal, points, triangles);
               }
            }

            if (this ._endCap .getValue ())
            {
               const
                  j         = numSpines - 1, // spine
                  convex    = this ._convex .getValue (),
                  texCoord  = { },
                  polygon   = [ ],
                  triangles = [ ];

               for (let k = 0; k < numCapPoints; ++ k)
               {
                  const
                     index = INDEX (j, k),
                     point = points [index] .copy ();

                  point .index     = index;
                  texCoord [index] = crossSection [k] .getValue () .copy () .subtract (min) .divide (capMax);
                  polygon .push (convex ? index : point);
               }

               if (convex)
                  external_X_ITE_X3D_Triangle3_default().triangulateConvexPolygon (polygon, triangles);

               else
                  external_X_ITE_X3D_Triangle3_default().triangulatePolygon (polygon, triangles);

               if (triangles .length >= 3)
               {
                  const normal = external_X_ITE_X3D_Triangle3_default().normal (points [triangles [0]],
                                                    points [triangles [1]],
                                                    points [triangles [2]],
                                                    new (external_X_ITE_X3D_Vector3_default()) ());

                  if (cw)
                     normal .negate ();

                  this .addCap (texCoordArray, texCoord, normal, points, triangles);
               }
            }
         }

         this .setSolid (this ._solid .getValue ());
         this .setCCW (this ._ccw .getValue ());
      };
   })(),
   addCap (texCoordArray, texCoord, normal, vertices, triangles)
   {
      const
         coordIndicesArray = this .getCoordIndices (),
         normalArray       = this .getNormals (),
         vertexArray       = this .getVertices (),
         numTriangles      = triangles .length;

      for (let i = 0; i < numTriangles; i += 3)
      {
         const
            i1 = triangles [i],
            i2 = triangles [i + 1],
            i3 = triangles [i + 2],
            p1 = vertices [i1],
            p2 = vertices [i2],
            p3 = vertices [i3],
            t0 = texCoord [i1],
            t1 = texCoord [i2],
            t2 = texCoord [i3];

         coordIndicesArray .push (i1, i2, i3);

         texCoordArray .push (... t0, 0, 1, ... t1, 0, 1, ... t2, 0, 1);
         normalArray   .push (... normal,   ... normal,   ... normal);
         vertexArray   .push (... p1, 1,    ... p2, 1,    ... p3, 1);
      }
   },
});

Object .defineProperties (Extrusion,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Extrusion", "Geometry3D", 4, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_crossSection", new (external_X_ITE_X3D_Fields_default()).MFVec2f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_orientation",  new (external_X_ITE_X3D_Fields_default()).MFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_scale",        new (external_X_ITE_X3D_Fields_default()).MFVec2f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_spine",        new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "beginCap",         new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "endCap",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",            new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "ccw",              new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "convex",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "creaseAngle",      new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "crossSection",     new (external_X_ITE_X3D_Fields_default()).MFVec2f (new (external_X_ITE_X3D_Vector2_default()) (1), new (external_X_ITE_X3D_Vector2_default()) (1, -1), new (external_X_ITE_X3D_Vector2_default()) (-1, -1), new (external_X_ITE_X3D_Vector2_default()) (-1, 1), new (external_X_ITE_X3D_Vector2_default()) (1))),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "orientation",      new (external_X_ITE_X3D_Fields_default()).MFRotation (new (external_X_ITE_X3D_Rotation4_default()) ())),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "scale",            new (external_X_ITE_X3D_Fields_default()).MFVec2f (new (external_X_ITE_X3D_Vector2_default()) (1))),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "spine",            new (external_X_ITE_X3D_Fields_default()).MFVec3f (new (external_X_ITE_X3D_Vector3_default()) (), new (external_X_ITE_X3D_Vector3_default()) (0, 1, 0))),
      ]),
      enumerable: true,
   },
});

const Extrusion_default_ = Extrusion;
;

/* harmony default export */ const Geometry3D_Extrusion = (external_X_ITE_X3D_Namespace_default().add ("Extrusion", Extrusion_default_));
;// external "__X_ITE_X3D__ .IndexedFaceSet"
const external_X_ITE_X3D_IndexedFaceSet_namespaceObject = __X_ITE_X3D__ .IndexedFaceSet;
var external_X_ITE_X3D_IndexedFaceSet_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_IndexedFaceSet_namespaceObject);
;// ./src/x_ite/Components/Geometry3D/Sphere.js







function Sphere (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Sphere);

   // Units

   this ._radius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Sphere .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   set_live__ ()
   {
      this .connectOptions (this .getBrowser () .getSphereOptions ());
   },
   build ()
   {
      const
         options     = this .getBrowser () .getSphereOptions (),
         geometry    = options .getGeometry (),
         radius      = Math .abs (this ._radius .getValue ()),
         vertexArray = this .getVertices ();

      this .getMultiTexCoords () .push (... geometry .getMultiTexCoords ());
      this .getTangents () .assign (geometry .getTangents ());
      this .getNormals ()  .assign (geometry .getNormals ());

      if (radius === 1)
      {
         vertexArray .assign (geometry .getVertices ());
      }
      else
      {
         const defaultVertices = geometry .getVertices ();

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (radius * defaultVertices [i],
                               radius * defaultVertices [i + 1],
                               radius * defaultVertices [i + 2],
                               1);
         }
      }

      this .getMin () .set (-radius, -radius, -radius);
      this .getMax () .set ( radius,  radius,  radius);

      this .setSolid (this ._solid .getValue ());
   },
});

Object .defineProperties (Sphere,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Sphere", "Geometry3D", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "radius",   new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",    new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
      ]),
      enumerable: true,
   },
});

const Sphere_default_ = Sphere;
;

/* harmony default export */ const Geometry3D_Sphere = (external_X_ITE_X3D_Namespace_default().add ("Sphere", Sphere_default_));
;// ./src/assets/components/Geometry3DComponent.js









external_X_ITE_X3D_Components_default().add ({
   name: "Geometry3D",
   concreteNodes:
   [
      Geometry3D_Box,
      Geometry3D_Cone,
      Geometry3D_Cylinder,
      Geometry3D_ElevationGrid,
      Geometry3D_Extrusion,
      (external_X_ITE_X3D_IndexedFaceSet_default()),
      Geometry3D_Sphere,
   ],
   abstractNodes:
   [
   ],
});

const Geometry3DComponent_default_ = undefined;
;

/* harmony default export */ const Geometry3DComponent = (external_X_ITE_X3D_Namespace_default().add ("Geometry3DComponent", Geometry3DComponent_default_));
/******/ })()
;
import PointingDevice from "./PointingDevice.js";
import PointingBuffer from "../../Rendering/PointingBuffer.js";
import TraverseType   from "../../Rendering/TraverseType.js";
import Vector2        from "../../../standard/Math/Numbers/Vector2.js";
import Vector3        from "../../../standard/Math/Numbers/Vector3.js";
import Vector4        from "../../../standard/Math/Numbers/Vector4.js";
import Line3          from "../../../standard/Math/Geometry/Line3.js";
import Matrix4        from "../../../standard/Math/Numbers/Matrix4.js";
import StopWatch      from "../../../standard/Time/StopWatch.js";

const
   _pointingDevice            = Symbol (),
   _pointingDeviceSensorNodes = Symbol (),
   _cursorType                = Symbol (),
   _pointer                   = Symbol (),
   _hit                       = Symbol (),
   _sensors                   = Symbol (),
   _overSensors               = Symbol (),
   _activeSensors             = Symbol (),
   _pointingLayer             = Symbol (),
   _pointingTime              = Symbol (),
   _pointingBuffer            = Symbol (),
   _pointingShaders           = Symbol (),
   _inputSource               = Symbol (),
   _id                        = Symbol (),
   _pointingContexts          = Symbol (),
   _processEvents             = Symbol .for ("X_ITE.X3DRoutingContext.processEvents");

function X3DPointingDeviceSensorContext ()
{
   this [_pointingDevice]            = new PointingDevice (this .getPrivateScene ());
   this [_pointingDeviceSensorNodes] = new Set ();
   this [_pointer]                   = new Vector2 ();
   this [_sensors]                   = [ ];
   this [_overSensors]               = new Map ();
   this [_activeSensors]             = new Map ();
   this [_pointingTime]              = new StopWatch ();
   this [_pointingBuffer]            = new PointingBuffer ({ browser: this });
   this [_pointingShaders]           = new Map ();
   this [_pointingContexts]          = [ ];

   this [_hit] = {
      id: 0,
      pointer: new Vector2 (),
      ray: new Line3 (),
      sensors: new Map (),
      viewMatrix: new Matrix4 (), // Used by SnapTool.
      modelViewMatrix: new Matrix4 (),
      point: new Vector3 (),
      normal: new Vector3 (), // Must be normalized if used.
      texCoord: new Vector4 (),
      layerNode: null,
      pointingLayerNode: null,
      shapeNode: null,
      copy ()
      {
         return {
            id: this .id,
            pointer: this .pointer .copy (),
            ray: this .ray .copy (),
            sensors: new Map (this .sensors),
            viewMatrix: this .viewMatrix .copy (),
            modelViewMatrix: this .modelViewMatrix .copy (),
            point: this .point .copy (),
            normal: this .normal .copy (),
            texCoord: this .texCoord .copy (),
            layerNode: this .layerNode,
            pointingLayerNode: this .pointingLayerNode,
            shapeNode: this .shapeNode,
            copy: this .copy,
         };
      },
   };
}

Object .assign (X3DPointingDeviceSensorContext .prototype,
{
   initialize ()
   {
      this .setCursor ("DEFAULT");

      this [_pointingDevice] .setup ();
   },
   getPointingTime ()
   {
      return this [_pointingTime];
   },
   addPointingDeviceSensor (node)
   {
      this [_pointingDeviceSensorNodes] .add (node);
   },
   removePointingDeviceSensor (node)
   {
      this [_pointingDeviceSensorNodes] .delete (node);
   },
   setCursor (cursorType)
   {
      if (cursorType === this [_cursorType])
         return;

      this [_cursorType] = cursorType;

      this .updateCursor ();
   },
   updateCursor ()
   {
      this .getSurface () .css ("cursor", this .getDisplayLoadCount () ? "wait" : this [_cursorType] .toLowerCase ());
   },
   getPointer ()
   {
      return this [_pointer];
   },
   getPointerFromEvent ({ pageX, pageY })
   {
      const
         offset   = this .getSurface () .offset (),
         rect     = this .getSurface () [0] .getBoundingClientRect (),
         viewport = this .getViewport (),
         x        =      (pageX - offset .left) / rect .width   * viewport [2],
         y        = (1 - (pageY - offset .top)  / rect .height) * viewport [3];

      return new Vector2 (x, y);
   },
   isPointerInRectangle (rectangle, pointer = this [_pointer])
   {
      return pointer .x >= rectangle .x &&
             pointer .x <= rectangle .x + rectangle .z &&
             pointer .y >= rectangle .y &&
             pointer .y <= rectangle .y + rectangle .w;
   },
   getPointingInputSource ()
   {
      return this [_inputSource];
   },
   getPointingLayer ()
   {
      return this [_pointingLayer];
   },
   getHit ()
   {
      return this [_hit];
   },
   removeHit (hit)
   {
      hit .id = 0;
      hit .sensors .clear ();

      this .buttonReleaseEvent (hit);
      this .motion (hit);
   },
   addSensor (sensor)
   {
      this [_sensors] .push (sensor);
   },
   addPointingShape (pointingContext)
   {
      const id = ++ this [_id];

      this [_pointingContexts] [id] = pointingContext;

      return id;
   },
   buttonPressEvent (x, y, hit = this [_hit])
   {
      if (!this [_pointingDeviceSensorNodes] .size)
         return false;

      // Must advance time, because event are later processed.
      this .advanceOnlyTime ();

      if (hit === this [_hit])
         this .touch (x, y);

      if (!hit .id)
         return false;

      hit .pointingLayerNode = hit .layerNode;

      for (const [node, sensor] of hit .sensors)
      {
         if (this [_activeSensors] .has (node))
            continue;

         this [_overSensors]   .set (node, sensor);
         this [_activeSensors] .set (node, sensor);

         sensor .set_active__ (true, hit);
      }

      // Immediately process events to be able
      // to do audio and window.open stuff.
      this [_processEvents] ();

      return !! hit .sensors .size;
   },
   buttonReleaseEvent (hit = this [_hit])
   {
      hit .pointingLayerNode = null;

      if (!this [_pointingDeviceSensorNodes] .size)
         return;

      // Must advance time, because event are later processed.
      this .advanceOnlyTime ();

      for (const [node, sensor] of this [_activeSensors])
      {
         if (sensor .hit !== hit)
            continue;

         this [_activeSensors] .delete (node);

         sensor .set_active__ (false, hit);
      }

      // Immediately process events to be able
      // to do audio and window.open stuff.
      this [_processEvents] ();
   },
   motionNotifyEvent (x, y, hit = this [_hit])
   {
      if (!this [_pointingDeviceSensorNodes] .size)
         return false;

      // Must advance time, because event are later processed.
      this .advanceOnlyTime ();

      if (hit === this [_hit])
         this .touch (x, y);

      this .motion (hit);

      // Immediately process events to be able
      // to do audio and window.open stuff.
      this [_processEvents] ();

      return !! hit .sensors .size;
   },
   leaveNotifyEvent ()
   { },
   touch (x, y, hit = this [_hit], inputSource = null)
   {
      this [_pointingTime] .start ();

      if (this .getViewer () .isActive ())
      {
         this [_pointingTime] .reset ();
         return false;
      }

      if (Boolean (this .getPose ()) !== Boolean (inputSource))
         return false;

      // Pick.

      this [_inputSource]   = inputSource;
      this [_pointingLayer] = hit .pointingLayerNode;
      this [_id]            = 0;

      this [_pointer] .assign (hit .pointer .set (x, y));
      this [_pointingBuffer] .bind ();

      this .getWorld () .traverse (TraverseType .POINTER);

      this [_pointingBuffer] .getHit (hit);

      hit .sensors .clear ();

      if (Number .isInteger (hit .id) && hit .id > 0 && hit .id <= this [_id])
      {
         const
            { renderObject, sensors, modelViewMatrix, shapeNode } = this [_pointingContexts] [hit .id],
            geometryContext = shapeNode .getGeometryContext ();

         hit .ray .assign (renderObject .getHitRay ());

         for (const sensor of sensors)
         {
            sensor .hit = hit;
            hit .sensors .set (sensor .node, sensor);
         }

         hit .layerNode = renderObject;
         hit .shapeNode = shapeNode;

         hit .viewMatrix      .assign (renderObject .getViewpoint () .getViewMatrix ());
         hit .modelViewMatrix .assign (modelViewMatrix);

         // A ParticleSystem has only a geometry context.
         // Hit normal must be normalized if used.

         if (geometryContext .hasNormals)
            hit .modelViewMatrix .submatrix .inverse () .multMatrixVec (hit .normal);
         else
            hit .normal .assign (Vector3 .zAxis);
      }
      else
      {
         hit .id = 0;

         if (hit .pointingLayerNode)
            hit .ray .assign (hit .pointingLayerNode .getHitRay ());

         hit .layerNode = null;
         hit .shapeNode = null;

         hit .viewMatrix      .assign (Matrix4 .Identity);
         hit .modelViewMatrix .assign (Matrix4 .Identity);
      }

      // Dispose unused sensors.

      for (const sensor of this [_sensors])
      {
         if (sensor .hit)
            continue;

         sensor .dispose ();
      }

      this [_sensors] .length = 0;

      // Picking end.

      this .addBrowserEvent ();
      this [_pointingTime] .stop ();

      return !! hit .id;
   },
   motion (hit = this [_hit])
   {
      // Set isOver to FALSE for appropriate nodes

      for (const [node, sensor] of this [_overSensors])
      {
         if (sensor .hit !== hit)
            continue;

         if (hit .id && hit .sensors .has (node))
            continue;

         this [_overSensors] .delete (node);

         sensor .set_over__ (false, hit);
      }

      // Set isOver to TRUE for appropriate nodes

      for (const [node, sensor] of hit .sensors)
      {
         const overSensor = this [_overSensors] .get (node);

         if (overSensor && overSensor .hit !== hit)
            continue;

         this [_overSensors] .set (node, sensor);

         sensor .set_over__ (true, hit);
      }

      // Forward motion event to active drag sensor nodes

      for (const sensor of this [_activeSensors] .values ())
      {
         if (sensor .hit !== hit)
            continue;

         sensor .set_motion__ (hit);
      }
   },
   getPointingShader (numClipPlanes, shapeNode, hAnimNode)
   {
      const { geometryType, hasNormals } = shapeNode .getGeometryContext ();

      let key = "";

      key += numClipPlanes; // Could be more than 9.
      key += hAnimNode ?.getHAnimKey () ?? "[]";
      key += shapeNode .getShapeKey ();
      key += geometryType;
      key += hasNormals ? 1 : 0;

      if (geometryType >= 2)
      {
         key += "0.0.0";
      }
      else
      {
         const appearanceNode = shapeNode .getAppearance ();

         key += appearanceNode .getStyleProperties (geometryType) ? 1 : 0;
         key += ".";
         key += appearanceNode .getTextureBits () .toString (16); // Textures for point and line.
         key += ".";
         key += appearanceNode .getMaterial () .getTextureBits () .toString (16); // Textures for point and line.
      }

      return this [_pointingShaders] .get (key)
         ?? this .createPointingShader (key, numClipPlanes, shapeNode, hAnimNode);
   },
   createPointingShader (key, numClipPlanes, shapeNode, hAnimNode)
   {
      const
         appearanceNode  = shapeNode .getAppearance (),
         geometryContext = shapeNode .getGeometryContext (),
         options         = [ ];

      options .push ("X3D_DEPTH_SHADER");

      if (geometryContext .hasNormals)
         options .push ("X3D_NORMALS");

      if (numClipPlanes)
      {
         options .push ("X3D_CLIP_PLANES");
         options .push ("X3D_NUM_CLIP_PLANES " + numClipPlanes);
      }

      switch (shapeNode .getShapeKey ())
      {
         case 1:
         case 2:
            options .push ("X3D_INSTANCING");
            break;
         case 3:
            options .push ("X3D_INSTANCING", "X3D_INSTANCE_NORMAL");
            break;
      }

      options .push (`X3D_GEOMETRY_${geometryContext .geometryType}D`);

      if (appearanceNode .getStyleProperties (geometryContext .geometryType))
         options .push ("X3D_STYLE_PROPERTIES");

      if (+appearanceNode .getMaterial () .getTextureBits ())
         options .push ("X3D_MATERIAL_TEXTURES");

      if (+appearanceNode .getTextureBits ())
         options .push ("X3D_TEXTURE");

      if (hAnimNode)
      {
         options .push ("X3D_SKINNING");
         options .push (`X3D_NUM_JOINT_SETS ${hAnimNode .getNumJoints () / 4}`);
         options .push (`X3D_NUM_DISPLACEMENTS ${hAnimNode .getNumDisplacements ()}`);
      }

      const shaderNode = this .createShader ("Pointing", "Pointing", "Pointing", options);

      this [_pointingShaders] .set (key, shaderNode);

      return shaderNode;
   },
});

export default X3DPointingDeviceSensorContext;

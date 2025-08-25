import BoxOptions        from "./BoxOptions.js";
import ConeOptions       from "./ConeOptions.js";
import CylinderOptions   from "./CylinderOptions.js";
import QuadSphereOptions from "./QuadSphereOptions.js";
import PrimitiveQuality  from "../Core/PrimitiveQuality.js";

const
   _boxOptions      = Symbol (),
   _coneOptions     = Symbol (),
   _cylinderOptions = Symbol (),
   _sphereOptions   = Symbol ();

function X3DGeometry3DContext () { }

Object .assign (X3DGeometry3DContext .prototype,
{
   initialize ()
   {
      this .setPrimitiveQuality3D (this .getBrowserOptions () .getPrimitiveQuality ());
   },
   getBoxOptions ()
   {
      return getOptionNode .call (this, _boxOptions, BoxOptions);
   },
   getConeOptions ()
   {
      return getOptionNode .call (this, _coneOptions, ConeOptions);
   },
   getCylinderOptions ()
   {
      return getOptionNode .call (this, _cylinderOptions, CylinderOptions);
   },
   getSphereOptions ()
   {
      return getOptionNode .call (this, _sphereOptions, QuadSphereOptions);
   },
   setPrimitiveQuality3D (primitiveQuality)
   {
      const
         cone     = this .getConeOptions (),
         cylinder = this .getCylinderOptions (),
         sphere   = this .getSphereOptions ();

      switch (primitiveQuality)
      {
         case PrimitiveQuality .LOW:
         {
            cone     ._dimension  = 16;
            cylinder ._dimension  = 16;
            sphere   ._xDimension = 20;
            sphere   ._yDimension = 9;
            break;
         }
         case PrimitiveQuality .MEDIUM:
         {
            cone     ._dimension  = 20;
            cylinder ._dimension  = 20;
            sphere   ._xDimension = 32;
            sphere   ._yDimension = 15;
            break;
         }
         case PrimitiveQuality .HIGH:
         {
            cone     ._dimension  = 32;
            cylinder ._dimension  = 32;
            sphere   ._xDimension = 64;
            sphere   ._yDimension = 31;
            break;
         }
      }
   },
});

function getOptionNode (key, OptionNode)
{
   return this [key] ??= (() =>
   {
      const optionNode = new OptionNode (this .getPrivateScene ());

      optionNode .setup ();

      return optionNode;
   })();
}

export default X3DGeometry3DContext;

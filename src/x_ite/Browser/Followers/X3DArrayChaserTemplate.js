import X3DArrayFollowerTemplate from "./X3DArrayFollowerTemplate.js";

function X3DArrayChaserTemplate (Type)
{
   const X3DArrayFollower = X3DArrayFollowerTemplate (Type);

   function X3DArrayChaserObject ()
   {
      X3DArrayFollower .call (this);

      this .array = this .getArray ();
   }

   Object .assign (X3DArrayChaserObject .prototype,
      X3DArrayFollower .prototype,
   {
      step (value1, value2, t)
      {
         const
            output   = this .output,
            deltaOut = this .deltaOut;

         for (let i = 0, length = output .length; i < length; ++ i)
            output [i] .add (deltaOut .assign (value1 [i] || this .zero) .subtract (value2 [i] || this .zero) .multiply (t));
      },
   });

   return X3DArrayChaserObject;
}

export default X3DArrayChaserTemplate;

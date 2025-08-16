import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";

function X3DSequencerNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSequencerNode);

   this .index = -1;
}

Object .assign (Object .setPrototypeOf (X3DSequencerNode .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);
      this ._previous     .addInterest ("set_previous__", this);
      this ._next         .addInterest ("set_next__", this);
      this ._key          .addInterest ("set_index__", this);
   },
   set_fraction__ ()
   {
      const
         fraction = this ._set_fraction .getValue (),
         key      = this ._key,
         length   = key .length;

      if (length === 0)
         return;

      let i = 0;

      if (length === 1 || fraction <= key [0])
         i = 0;

      else if (fraction >= key [length - 1])
         i = this .getSize () - 1;

      else
      {
         const index = Algorithm .upperBound (key, 0, length, fraction);

         i = index - 1;
      }

      if (i !== this .index)
      {
         if (i < this .getSize ())
         {
            this .sequence (this .index = i);
         }
      }
   },
   set_previous__ ()
   {
      if (this ._previous .getValue ())
      {
         if (this .index <= 0)
            this .index = this .getSize () - 1;

         else
            -- this .index;

         if (this .index < this .getSize ())
            this .sequence (this .index);
      }
   },
   set_next__ ()
   {
      if (this ._next .getValue ())
      {
         if (this .index >= this .getSize () - 1)
            this .index = 0;

         else
            ++ this .index;

         if (this .index < this .getSize ())
            this .sequence (this .index);
      }
   },
   set_index__ ()
   {
      this .index = -1;
   },
});

Object .defineProperties (X3DSequencerNode, X3DNode .getStaticProperties ("X3DSequencerNode", "EventUtilities", 1));

export default X3DSequencerNode;

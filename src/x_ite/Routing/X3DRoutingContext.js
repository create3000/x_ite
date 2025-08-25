const
   _taintedFields     = Symbol (),
   _taintedFieldsTemp = Symbol (),
   _taintedNodes      = Symbol (),
   _taintedNodesTemp  = Symbol (),
   _active            = Symbol ();

function X3DRoutingContext ()
{
   this [_taintedFields]     = [ ];
   this [_taintedFieldsTemp] = [ ];
   this [_taintedNodes]      = [ ];
   this [_taintedNodesTemp]  = [ ];
   this [_active]            = false;
}

Object .assign (X3DRoutingContext .prototype,
{
   initialize () { },
   addTaintedField (field, event)
   {
      this [_taintedFields] .push (field, event);
   },
   addTaintedNode (node)
   {
      this [_taintedNodes] .push (node);
   },
   [Symbol .for ("X_ITE.X3DRoutingContext.processEvents")] ()
   {
      if (this [_active])
         return;

      this [_active] = true;

      do
      {
         // Process field events
         do
         {
            const taintedFields = this [_taintedFields];

            // Swap tainted fields.
            this [_taintedFields]         = this [_taintedFieldsTemp];
            this [_taintedFields] .length = 0;

            for (let i = 0, length = taintedFields .length; i < length; i += 2)
               taintedFields [i] .processEvent (taintedFields [i + 1]);

            // Don't know why this must be done after the for loop, otherwise a fatal error could be thrown.
            this [_taintedFieldsTemp] = taintedFields;
         }
         while (this [_taintedFields] .length);

         // Process node events
         do
         {
            const taintedNodes = this [_taintedNodes];

            // Swap tainted nodes.
            this [_taintedNodes]         = this [_taintedNodesTemp];
            this [_taintedNodes] .length = 0;

            for (const taintedNode of taintedNodes)
               taintedNode .processEvent ();

            // Don't know why this must be done after the for loop, otherwise a fatal error could be thrown.
            this [_taintedNodesTemp] = taintedNodes;
         }
         while (! this [_taintedFields] .length && this [_taintedNodes] .length);
      }
      while (this [_taintedFields] .length);

      this [_active] = false;
   },
   dispose () { },
});

export default X3DRoutingContext;

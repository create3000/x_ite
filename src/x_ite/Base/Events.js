const Events = Object .assign ([ ],
{
   create (field)
   {
      const event = this .pop () ?? new Set ();

      event .field = field;
      event .clear ();

      return event;
   },
   copy (event)
   {
      const copy = this .create (event .field);

      for (const source of event)
         copy .add (source);

      return copy;
   },
   from (field)
   {
      const event = this .create (field);

      event .add (field);

      return event;
   },
});

for (const key of Object .keys (Events))
   Object .defineProperty (Events, key, { enumerable: false });

export default Events;

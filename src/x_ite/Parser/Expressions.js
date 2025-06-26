const functions =
{
   parse (parser)
   {
      this .lastIndex = parser .lastIndex;

      parser .result = this .exec (parser .input);

      if (parser .result)
      {
         parser .lastIndex = this .lastIndex;
         return true;
      }

      return false;
   },
   lookahead (parser)
   {
      const
         lastIndex = parser .lastIndex,
         result    = this .parse (parser);

      parser .lastIndex = lastIndex;

      return result;
   },
};

function Expressions (Grammar)
{
   for (const value of Object .values (Grammar))
      Object .assign (value, functions);

   return Grammar;
}

export default Expressions;

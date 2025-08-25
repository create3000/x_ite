function evaluate (thisArg, globalObject, sourceText)
{
   return new Function (/* js */ `with (arguments [0])
   {
      return eval ((() =>
      {
         const sourceText = arguments [1];

         delete arguments [0];
         delete arguments [1];

         arguments .length = 0;

         return sourceText;
      })
      ());
   }`)
   .call (thisArg, globalObject, sourceText);
}

export default evaluate;

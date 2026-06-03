class LoadingObject
{
   #browser;
   #executionContext;

   constructor (executionContext)
   {
      this .#browser          = executionContext .getBrowser ();
      this .#executionContext = executionContext;
   }

   getBrowser ()
   {
      return this .#browser;
   }

   getExecutionContext ()
   {
      return this .#executionContext;
   }

   getCache ()
   {
      return this .#browser .getBrowserOption ("Cache");
   }
}

export default LoadingObject;

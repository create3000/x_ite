$.decodeText = function (input)
{
   if (typeof input === "string")
      return input;

   return new TextDecoder () .decode (input);
};

$.ungzip = function (arrayBuffer)
{
   try
   {
      return pako .ungzip (arrayBuffer, { to: "raw" }) .buffer;
   }
   catch (exception)
   {
      return arrayBuffer;
   }
};

$.toLowerCaseFirst = function (string)
{
   return string [0] .toLowerCase () + string .slice (1);
};

export default $;

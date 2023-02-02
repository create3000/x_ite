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
}

export default $;

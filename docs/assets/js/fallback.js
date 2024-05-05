if (typeof X3D === "undefined")
{
   const $ = jQuery;

   console .log ("Using fallback URL.");

   $("head") .append ($("<script></script>")
      .attr ("src", "https://create3000.github.io/code/x_ite/latest/x_ite.min.js"));
}

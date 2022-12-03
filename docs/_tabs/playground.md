---
title: Playground
layout: wide
order: 3
---
<style>
.row, .post, .post-content {
   height: 100%;
}

table {
  width: 100%;
  height: 100%;
  table-layout: fixed;
}

table td {
   width: 50%;
   vertical-align: top;
}

#editor-wrapper, .console {
   outline: none;
   border: none;
   padding: 0.5rem;
   background: rgba(0,0,0,0.2);
   width: 100%;
   height: 100%;
   resize: none;
   font-family: monospace;
   font-size: 0.8rem;
   line-height: 1.4;
   white-space: pre;
}

#editor-wrapper {
   position: relative;
}

#editor {
   position: absolute;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   background: unset;
}

.ace_gutter {
   background: rgba(255,255,255,0.05) !important;
}

.ace_tag-open, .ace_tag-close, .ace_end-tag-open {
   color: var(--text-color) !important;
}

.ace_tag-name {
   color: #5a9cd8 !important;
}

.ace_attribute-name {
   color: #9fdcfe !important;
}

.ace_attribute-equals {
   color: #d4d4d4 !important;
}

.ace_attribute-value {
   color: #cd9177 !important;
}

.console {
   --system-red: rgb(255, 69, 58);
   --system-yellow: rgb(255, 214, 10);
   --system-blue: rgb(10, 132, 255);
   overflow: scroll;
}

span.info {
   color: var(--system-blue);
}

span.warning {
   color: var(--system-yellow);
}

span.error {
   color: var(--system-red);
}

.post x3d-canvas {
   width: 100%;
   height: 100%;
   aspect-ratio: unset;
}
</style>

<table>
   <tr>
      <td>
         <div id="editor-wrapper"><div id="editor"></div></div>
      </td>
      <td>
         <table>
            <tr>
               <td><x3d-canvas splashScreen="false"></x3d-canvas></td>
            </tr>
            <tr>
               <td><div class="console"></div></td>
            </tr>
         </table>
      </td>
   </tr>
</table>

<pre style="display:none">
<script>
(function ()
{
   function output (log, classes)
   {
      return function ()
      {
         log .apply (this, arguments);

         const
            text    = Array .prototype .slice .call (arguments) .join ("") + "\n",
            element = $("<span></span>") .addClass (classes) .text (text);

         $(".console") .append (element);
         element [0] .scrollIntoView (false);
      }
   }

   console .log     = output (console .log,     "log");
   console .info    = output (console .info,    "info");
   console .warning = output (console .warning, "warning");
   console .error   = output (console .error,   "error");
   console .debug   = output (console .debug,   "debug");
})();
</script>

<script src="https://create3000.github.io/code/x_ite/latest/x_ite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.13.1/ace.min.js"></script>

<script>
ace .config .set ("basePath", "https://cdnjs.cloudflare.com/ajax/libs/ace/1.13.1/");

const editor = ace .edit ("editor");

editor .setTheme ("ace/theme/monokai");
editor .session .setOptions ({ tabSize: 2, useSoftTabs: true });
editor .session .setMode ("ace/mode/xml");

editor .getSession () .on ("change", function ()
{
   const url = "data:," + editor .getSession () .getValue ();

   X3D .getBrowser () .loadURL (new X3D .MFString (url)) .catch (Function .prototype);
});

const box = `<X3D profile='Full' version='4.0'>
   <Scene>
      <Shape>
         <Appearance>
            <Material diffuseColor='0 0.5 1'></Material>
         </Appearance>
         <Box></Box>
      </Shape>
   </Scene>
</X3D>
`;

editor .setValue (box .replace (/ {3}/g, "  "), -1);
editor .getSession () .setUndoManager (new ace .UndoManager ());
</script>
</pre>

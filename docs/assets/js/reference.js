const hierarchy = $("#hierarchy + div .rouge-code pre");

hierarchy .html (hierarchy .text () .replace (/(\w+)/sg, (match, p1) =>
{
   const a = $(`h2[id*="${p1 .toLowerCase ()}"]`);

   return `<a href="#${a .attr ("id")}">${p1}</a>`;
}));

hierarchy .parent () .removeClass ("rouge-code");

const hierarchy = document .querySelector ("#hierarchy + div .rouge-code pre");

hierarchy .innerHTML = hierarchy .textContent .replace (/(\w+)/sg, (match, p1) =>
{
   const a = document .querySelector (`h2[id*="${p1 .toLowerCase ()}"]`);

   return `<a href="#${a .getAttribute ("id")}">${p1}</a>`;
});

hierarchy .parentElement .classList .remove ("rouge-code");

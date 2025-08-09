
// Source: https://github.com/scijs/isndarray
// By Kyle Robinson Young, MIT Licensed.

export default function (arr)
{
   if (!arr)
      return false;

   if (!arr .dtype)
      return false;

   const re = new RegExp ("function View[0-9]+d(:?" + arr .dtype + ")+");

   return re .test (String (arr .constructor));
};

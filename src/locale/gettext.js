import dictionary from "./dictionary.js";

const locales = new Set (Object .keys (dictionary [0]));

function getLanguage ()
{
   for (const value of navigator .languages)
   {
      const language = value .split ("-") [0];

      if (locales .has (language))
         return language;
   }

   return (navigator .language || navigator .userLanguage) .split ("-") [0];
}

const
   language = getLanguage (),
   locale   = new Map (dictionary .map (p => [p .en, p [language]]));

export default (string) => locale .get (string) || string;

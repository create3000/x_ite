import languages from "./languages.js";

const locales = new Set (Object .keys (languages [0]));

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
   locale   = new Map (languages .map (p => [p .en, p [language] ?? p .en]));

export default (string) => locale .get (string) || string;

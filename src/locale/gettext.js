import de from "./de.js";
import fr from "./fr.js";

const locales = new Map ([
   ["en", undefined], // default language
   ["de", de],
   ["fr", fr],
]);

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

const locale = new Map (locales .get (getLanguage ()) ?? [ ]);

export default (string) => locale .get (string) || string;

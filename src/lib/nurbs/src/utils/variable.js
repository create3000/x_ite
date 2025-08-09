
const createVariable = function createVariable (name, nurbs) {
   return function (i, period) {
      if (i !== undefined && !Array.isArray(i)) i = [i];
      const dimAccessors = [];
      for (let j = 0; j < i.length; j++) {
         dimAccessors.push(createVariable.sum(i[j]));
      }
      if (period) {
         for (i = 0; i < dimAccessors.length; i++) {
            if (period[i] === undefined) continue;
            dimAccessors[i] = "(" + dimAccessors[i] + " + " + period[i] + ") % " + period[i];
         }
      }
      return name + dimAccessors.join("_");
   };
};

createVariable.sum = function (parts) {
   parts = Array.isArray(parts) ? parts : [parts];
   parts = parts.filter(part => part !== undefined && part !== 0);
   if (parts.length === 0) parts.push(0);
   return parts.join(" + ");
};

export default createVariable;

let i = 0;

const ExtensionKeys =
{
   add (name)
   {
      this [name] = i ++;
   },
};

export default ExtensionKeys;

let i = 0;

const ModeType =
{
   REPLACE:                   i ++,
   MODULATE:                  i ++,
   MODULATE2X:                i ++,
   MODULATE4X:                i ++,
   ADD:                       i ++,
   ADDSIGNED:                 i ++,
   ADDSIGNED2X:               i ++,
   ADDSMOOTH:                 i ++,
   SUBTRACT:                  i ++,
   BLENDDIFFUSEALPHA:         i ++,
   BLENDTEXTUREALPHA:         i ++,
   BLENDFACTORALPHA:          i ++,
   BLENDCURRENTALPHA:         i ++,
   MODULATEALPHA_ADDCOLOR:    i ++,
   MODULATEINVALPHA_ADDCOLOR: i ++,
   MODULATEINVCOLOR_ADDALPHA: i ++,
   DOTPRODUCT3:               i ++,
   SELECTARG1:                i ++,
   SELECTARG2:                i ++,
   OFF:                       i ++,
};

export default ModeType;

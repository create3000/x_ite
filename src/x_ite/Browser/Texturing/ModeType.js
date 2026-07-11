let i = 0;

const ModeType =
{
   REPLACE:                      i ++,
   MODULATE:                     i ++,
   MODULATE_2X:                  i ++,
   MODULATE_4X:                  i ++,
   ADD:                          i ++,
   ADD_SIGNED:                   i ++,
   ADD_SIGNED_2X:                i ++,
   ADD_SMOOTH:                   i ++,
   SUBTRACT:                     i ++,
   BLEND_DIFFUSE_ALPHA:          i ++,
   BLEND_TEXTURE_ALPHA:          i ++,
   BLEND_FACTOR_ALPHA:           i ++,
   BLEND_CURRENT_ALPHA:          i ++,
   MODULATE_ALPHA_ADD_COLOR:     i ++,
   MODULATE_INV_ALPHA_ADD_COLOR: i ++,
   MODULATE_INV_COLOR_ADD_ALPHA: i ++,
   DOT_PRODUCT_3:                i ++,
   SELECT_ARG1:                  i ++,
   SELECT_ARG2:                  i ++,
   OFF:                          i ++,
};

export default ModeType;

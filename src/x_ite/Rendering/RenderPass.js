const RenderPass =
{
   // Bits
   NONE:                      0b000,
   VOLUME_SCATTER_BIT:        0b001,
   TRANSMISSION_BIT:          0b010,
   TRANSMISSION_BACKFACE_BIT: 0b100,
   // Keys
   RENDER_KEY:                0,
   VOLUME_SCATTER_KEY:        1,
   TRANSMISSION_KEY:          2,
   TRANSMISSION_BACKFACE_KEY: 3,
};

export default RenderPass;

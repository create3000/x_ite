/* const */ vec3 BOX3_NORMALS [5] = vec3 [ ] (
   vec3 (0.0,  0.0,  1.0), // front
   vec3 (0.0,  0.0, -1.0), // back
   vec3 (0.0,  1.0,  0.0), // top
   vec3 (0.0, -1.0,  0.0), // bottom
   vec3 (1.0,  0.0,  0.0)  // right
);

bool
intersects (const in vec3 min, const in vec3 max, const in Line3 line)
{
   vec3 intersection = vec3 (0.0);

   for (int i = 0; i < 5; ++ i)
   {
      if (intersects (plane3 ((i & 1) == 1 ? min : max, BOX3_NORMALS [i]), line, intersection))
      {
         switch (i)
         {
            case 0:
            case 1:

               if (intersection .x >= min .x && intersection .x <= max .x &&
                   intersection .y >= min .y && intersection .y <= max .y)
                  return true;

               break;
            case 2:
            case 3:

               if (intersection .x >= min .x && intersection .x <= max .x &&
                   intersection .z >= min .z && intersection .z <= max .z)
                  return true;

               break;
            case 4:

               if (intersection .y >= min .y && intersection .y <= max .y &&
                   intersection .z >= min .z && intersection .z <= max .z)
                  return true;

               break;
         }
      }
   }

   return false;
}

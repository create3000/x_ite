export default () => /* glsl */ `
struct Line2
{
   vec2 point;
   vec2 direction;
};

Line2
line2 (const in vec2 point1, const in vec2 point2)
{
   return Line2 (point1, normalize (point2 - point1));
}

vec2
closest_point (const in Line2 line, const in vec2 point)
{
   vec2  r = point - line .point;
   float d = dot (r, line .direction);

   return line .direction * d + line .point;
}
`;

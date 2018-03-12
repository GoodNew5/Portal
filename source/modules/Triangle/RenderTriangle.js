import { RenderTriangleCSS } from "./RenderTriangleCSS";

let RenderTriangle = function (position, size) {

  let directions = [];
  let positions = ["left", "right", "top", "bottom"];

  positions.forEach(item => {
    directions.push(RenderTriangleCSS(item, size));
  });

  let triangles = {
    left: directions[0],
    right: directions[1],
    top: directions[2],
    bottom: directions[3]
  };

  return triangles[position];
}
export { RenderTriangle }
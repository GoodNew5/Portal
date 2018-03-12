let RenderTriangleCSS = function (direction, size) {
  if (direction === "left") {
    return `
      width: 0;
      height: 0;
      border-top: ${size + "px"} solid transparent;
      border-right: ${size + "px"} solid black;
      border-bottom: ${size + "px"} solid transparent;
      position: absolute;
    `;
  }
  if (direction === "right") {
    return `
      width: 0;
      height: 0;
      border-top:  ${size + "px"} solid transparent;
      border-bottom: ${size + "px"} solid transparent;
      border-left:  ${size + "px"}  solid black;
      border-right:  ${size + "px"} solid transparent;
      position: absolute;
    `;
  }
  if (direction === "top") {
    return `
      position: absolute;
      width: 0;
      height: 0;
      border-left:  ${size + "px"} solid transparent;
      border-right:  ${size + "px"}  solid transparent;
      border-bottom:  ${size + "px"}  solid transparent;
      border-top:  ${size + "px"} solid black;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    `;
  }
  if (direction === "bottom") {
    return `
      position: absolute;
      width: 0;
      height: 0;
      border-left:  ${size + "px"} solid transparent;
      border-right:  ${size + "px"}  solid transparent;
      border-bottom:  ${size + "px"} solid black;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
    `;
  }
}
export { RenderTriangleCSS };
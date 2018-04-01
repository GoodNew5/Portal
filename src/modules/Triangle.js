const Triangle = function (direction, size, horizontalAlignment) {
   let hAlignment = horizontalAlignment === undefined ? true : horizontalAlignment;
   let baseStyle = `
    width: 0;
    height: 0;
    position: absolute;
  `;

   if (direction === "left") {
     return `
      ${baseStyle}
      border-right: ${size + "px"} solid black;
      border-top: ${size + "px"} solid transparent;
      border-bottom: ${size + "px"} solid transparent;
    `;
   }
   if (direction === "right") {
     return `
      ${baseStyle}
      border-top:  ${size + "px"} solid transparent;
      border-left:  ${size + "px"}  solid black;
      border-bottom: ${size + "px"} solid transparent;
    `;
   }
   if (direction === "top") {
     return `
      ${baseStyle}
      border-left:  ${size + "px"} solid transparent;
      border-right:  ${size + "px"}  solid transparent;
      border-top:  ${size + "px"} solid black;
      left: 0;
      right: 0;
      ${hAlignment ? "margin-left: auto" : null};
      ${hAlignment ? "margin-right: auto" : null};
    `;
   }
   if (direction === "bottom") {
     return `
      ${baseStyle}
      border-left:  ${size + "px"} solid transparent;
      border-right:  ${size + "px"}  solid transparent;
      border-bottom:  ${size + "px"} solid black;
      ${hAlignment ? "margin-left: auto" : null};
      ${hAlignment ? "margin-right: auto" : null};
      left: 0;
      right: 0;
    `;
   }
}
export { Triangle }
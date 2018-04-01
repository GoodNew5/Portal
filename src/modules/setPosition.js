const setPosition = (coordinates, portalBox, triangle) => {
  portalBox.style.top = 0
  portalBox.style.left = 0
  portalBox.style.transform = `translate(${coordinates.x}px, ${coordinates.y}px)`

  if (triangle) {
    triangle.style.top = coordinates.tr.y + "px";
    triangle.style.left = coordinates.tr.x + "px";
  }
}

export { setPosition }
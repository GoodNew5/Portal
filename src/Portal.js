/**
 *  @version 0.2
 *  @author Alexander Veselov
 *  @todo responsive
 *
 */

"use strict"


import { Triangle } from './modules/Triangle'
import { Init } from './modules/Init'
import { setPosition } from './modules/setPosition'




export default function Portal (options) {

  /**
   * @param {node} target - Элемент-якорь относительно которого задана позиция
   */
  options = {
    target: options.target,
    triangle: options.triangle || false,
    triangleSize: options.triangle ? options.triangleSize || 10 : 0,
    positions: options.positions || ["bottom"],
    hover: options.hover === undefined ? true : options.hover
  };

  const InitPortal = new Init(options.target);
  const target = InitPortal.renderTarget();

  if (!target) {
    return
  }

  const root = target.offsetParent
  const rootLeft = root.clientLeft;
  const rootTop = root.clientTop;
  const portalBox = InitPortal.renderPortalBox(target);

  if (!portalBox) {
    return
  }

  let triangle = options.triangle ? InitPortal.renderTriangle(portalBox) : null

  function getSize(portalBox, target, root) {
    let sizes = {
      root: {
        height: root.clientHeight,
        width: root.clientWidth
      },
      box: {
        width: portalBox.offsetWidth,
        height: portalBox.offsetHeight
      },
      target: {
        width: target.offsetWidth,
        height: target.offsetHeight
      },
      triangle: {
        width: options.triangleSize,
        height: options.triangleSize
      }
    };

    return sizes;
  }

  function placement(target, sizes) {
    const coordinates = {};
    const scrollTop = window.pageYOffset
    const scrollLeft = window.pageXOffset
    const heightCase = sizes.target.height > sizes.box.height;
    const getCoords = (el) => el.getBoundingClientRect()
    const displayTriangle = options.triangle

    options.triangle ? coordinates.tr = {} : null

    function alignedTriangleY(element) {
      return element.height / 2 - sizes.triangle.height;
    }

    function alignedYCase1() {
      if (heightCase) {
        return coordinates.tr.y = alignedTriangleY(sizes.box);
      }
    }



    function arrangeBottom() {
      coordinates.x = Math.round(getCoords(target).left - (sizes.box.width - sizes.target.width) / 2 + scrollLeft)
      coordinates.y = Math.round(getCoords(target).bottom + sizes.triangle.height + scrollTop)

      if (displayTriangle) {
        coordinates.tr.y = -sizes.triangle.height;
        coordinates.tr.x = 0;
        triangle.style = Triangle("bottom", options.triangleSize);
      }

      if (coordinates.y + sizes.box.height > sizes.root.height) {
        return false;
      }

      if (coordinates.x < rootLeft) {
        if (displayTriangle) {
          coordinates.tr.x = sizes.target.width / 2 - sizes.triangle.width
          triangle.style = Triangle("bottom", options.triangleSize, false)
        }
        coordinates.x =  Math.round(getCoords(target).left + scrollLeft)

      }

      return true;
    }

    function arrangeTop() {
      coordinates.y = Math.round(getCoords(target).top - sizes.box.height - sizes.triangle.height + scrollTop)
      coordinates.x = Math.round(getCoords(target).left - (sizes.box.width - sizes.target.width) / 2 + scrollLeft)

      if (displayTriangle) {
        coordinates.tr.y = sizes.box.height
        coordinates.tr.x = 0;
        triangle.style = Triangle("top", options.triangleSize);
      }

      if (sizes.box.height + sizes.triangle.height > getCoords(target).top) {
        return false;
      }

      if (coordinates.x < rootLeft ) {
        if (displayTriangle) {
          coordinates.tr.x = sizes.target.width / 2 - sizes.triangle.width
          triangle.style = Triangle("top", options.triangleSize, false);
        }
        coordinates.x =  getCoords(target).left + scrollLeft
      }

      return true
    }


    function arrangeRight() {
      coordinates.x =  Math.round(getCoords(target).right + sizes.triangle.width + scrollLeft)
      coordinates.y =  Math.round(getCoords(target).top + scrollTop)

      if (displayTriangle) {
        coordinates.tr.x = -sizes.triangle.width;
        coordinates.tr.y = alignedTriangleY(sizes.target);
        alignedYCase1();
        triangle.style = Triangle("left", options.triangleSize);
      }

      if (coordinates.x + sizes.box.width > sizes.root.width || scrollTop > coordinates.y) {
        return false;
      }

      return true;
    }

    function arrangeLeft() {
      coordinates.x = Math.round(getCoords(target).left - sizes.box.width - sizes.triangle.width + scrollLeft)
      coordinates.y = Math.round(getCoords(target).top + scrollTop)

      if (displayTriangle) {
        coordinates.tr.x = sizes.box.width;
        coordinates.tr.y = alignedTriangleY(sizes.target);
        alignedYCase1();
        triangle.style = Triangle("right", options.triangleSize);
      }

      if (coordinates.x < rootLeft || scrollTop > coordinates.y) {
        console.log('lflf')
        return false;
      }

      return true
    }

    function conductor() {

      let positionsMap = []

      options.positions.forEach((i) => {

        switch (i) {
          case 'left':
            positionsMap.push(arrangeLeft)
            break;
          case 'right':
            positionsMap.push(arrangeRight)
            break;
          case 'top':
            positionsMap.push(arrangeTop)
            break;
          case 'bottom':
            positionsMap.push(arrangeBottom)
            break;
          default:
            break;
        }
      })

      positionsMap.some((i) => i())
    }

    conductor();
    return coordinates;
  }


  function showPortal() {

     if (!options.hover) {
       portalBox.classList.toggle("open");
     }

     else {
       portalBox.classList.add("open");
     }
   }

   function hiddenPortal(event) {
    // for click
    function removeClass() {
      portalBox.classList.remove("open");
    }

    if (!options.hover) {
      if (!target.contains(event.target) && event.target != portalBox && !portalBox.contains(event.target)) {
        removeClass()
      }
    }

    else {
      if (!(portalBox.contains(event.relatedTarget))) {
        removeClass();
      }
    }
   }

  const eventsForShow = !options.hover ? "click" : "mouseover"
  const eventsForHidden = !options.hover ? "click" : "mouseout"


  window.addEventListener("resize", displacement);
  document.addEventListener("DOMContentLoaded", displacement);
  target.addEventListener(eventsForShow, displacement);
  window.addEventListener(eventsForHidden, hiddenPortal);



  function displacement(event) {
    let sizes = getSize(portalBox, target, root);
    let coordinates = placement(target, sizes);
    setPosition(coordinates, portalBox, triangle);

    if (!(event.type === "resize" || event.type === "DOMContentLoaded")) {
      showPortal()
    }
  }
};

/**
 *  @version 0.2
 *  @author Alexander Veselov
 *  @todo responsive
 *  @todo user scenary
 *
 */

"use strict"


import { Triangle } from './modules/Triangle'
import { Init } from './modules/Init'
import { every } from 'rxjs/operator/every';
import { setPosition } from './modules/setPosition'



function Portal (options) {

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
  const portalBox = InitPortal.renderPortalBox(target);

  if (!portalBox) {
    return
  }

  let triangle = options.triangle ? InitPortal.renderTriangle(portalBox) : null


  const sizes = getSize(portalBox, target, root);

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
    const borderLeftWidth = computedBordersWidth(getComputedStyle(target.offsetParent).borderLeftWidth);
    const borderTopWidth = computedBordersWidth(getComputedStyle(target.offsetParent).borderTopWidth);
    const targetTop = target.getBoundingClientRect().top - target.offsetParent.getBoundingClientRect().top - borderTopWidth
    const targetLeft = target.getBoundingClientRect().left - target.offsetParent.getBoundingClientRect().left - borderLeftWidth
    const heightCase = sizes.target.height > sizes.box.height;

    options.triangle ? coordinates.tr = {} : null

    function alignedTriangleY(element) {
      return element.height / 2 - sizes.triangle.height;
    }

    function alignedYCase1() {
      if (heightCase) {
        return coordinates.tr.y = alignedTriangleY(sizes.box);
      }
    }

    function computedBordersWidth(border) {
      const width = Number(border.match(/\d+/, ""))
      return width
    }

    function arrangeBottom() {
      coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2
      coordinates.y = targetTop + sizes.target.height + sizes.triangle.height;

      if (coordinates.y + sizes.box.height > sizes.root.height) {
        return false;
      }

      if (options.triangle) {
        coordinates.tr.y = -sizes.triangle.height;
        coordinates.tr.x = 0;
        triangle.style = Triangle("bottom", options.triangleSize);
      }

      return true;
    }

    function arrangeRight() {
      coordinates.x = targetLeft + sizes.target.width + sizes.triangle.width
      coordinates.y = targetTop


      if (options.triangle) {
        coordinates.tr.x = -sizes.triangle.width;
        coordinates.tr.y = alignedTriangleY(sizes.target);
        alignedYCase1();
        triangle.style = Triangle("left", options.triangleSize);
      }

      if (coordinates.x + sizes.box.width > sizes.root.width) {
        return false;
      }
      return true;
    }

    function arrangeLeft() {
      coordinates.x = targetLeft - sizes.box.width - sizes.triangle.width;
      coordinates.y = targetTop
      let overCondVertical = coordinates.x - sizes.triangle.width + sizes.box.width / 2 < rootLeft

      if (options.triangle) {
        coordinates.tr.x = sizes.box.width;
        coordinates.tr.y = alignedTriangleY(sizes.target);
        alignedYCase1();
        triangle.style = Triangle("right", options.triangleSize);
      }

      if (coordinates.x < rootLeft) {
        return false;
      }

      return true
    }

    function arrangeTop() {
      coordinates.y = targetTop - sizes.box.height - sizes.triangle.height;
      coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2


      if (sizes.box.height + sizes.triangle.height > targetTop) {
        return false;
      }

      if (options.triangle) {
        coordinates.tr.y = sizes.box.height
        coordinates.tr.x = 0;
        triangle.style = Triangle("top", options.triangleSize);
      }

      return true
    }

    function flipRight () {
      coordinates.y = targetTop - sizes.box.height - sizes.triangle.height
      coordinates.x = targetLeft - sizes.box.width + sizes.target.width

      if (options.triangle) {
        coordinates.tr.y = sizes.box.height;
        coordinates.tr.x = sizes.box.width - (sizes.target.width / 2) - sizes.triangle.width
        triangle.style = Triangle("top", options.triangleSize, false)
      }
      return true
    }

    function flipLeft() {
      coordinates.y = targetTop - sizes.box.height - sizes.triangle.height
      coordinates.x = targetLeft

      if (options.triangle) {
        coordinates.tr.y = sizes.box.height;
        coordinates.tr.x = sizes.target.width / 2 - sizes.triangle.width
        triangle.style = Triangle("top", options.triangleSize, false);
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

  function draw(sizes) {
    let coordinates = placement(target, sizes);
    setPosition(coordinates, portalBox, triangle);
  }

  function displacement(event) {
    let sizes = getSize(portalBox, target, root);
    draw(sizes);

    if (!(event.type === "resize" || event.type === "DOMContentLoaded")) {
      showPortal()
    }
  }
};;




const PortalRight = new Portal({
  target: ".button-2",
  position: "top",
  triangle: true,
  hover: true
});

// // // PortalRight.test('Alex')

// const PortalTop = new Portal({
//   target: '.button-5',
//   position: 'top',
//   triangle: true
// });

// const PortalTopNew = new Portal({
//   target: '.button-4',
//   position: 'top',
//   triangle: true
// });

// const PortalBottom = new Portal({
//   target: ".button-3",
//   position: "top",
//   triangle: true
// });

const PortalLeft = new Portal({
  triangle: true,
  positions: ['top', 'bottom'],
  hover: false,
  target: "#custom-button"
});

// const PortalPreview = new Portal({
//   position: 'top',
//   triangle: true
// });




function shuffleRandom(nodes) {
  let elements = document.querySelectorAll(nodes)
  let max = 2800;
  let min = 1000;
  elements.forEach(element => {
    element.style = "margin-left:" + Math.random() * (max - min) + min + "px";
  });
}

shuffleRandom(".button-open-portal");

function getSize(node) {
  let el = document.getElementById(node)
  let sizes = {
    width: el.offsetWidth,
    height: el.offsetHeight,
  }
  console.log(sizes)
}

// getSize("custom-button");
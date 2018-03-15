/**
 *  @version 0.1
 *  @author Alexander Veselov
 *  @todo responsive
 *  @todo Portal Preview
 */

"use strict"

import { moduleA } from './test.js'
import { RenderTriangleDirections } from './modules/RenderTriangleDirections'
import { Init } from './modules/Init'



function Portal (options) {

  /**
   * @param {node} target - Элемент-якорь относительно которого задана позиция
   */
  options = {
    target: options.target,
    triangle: options.triangle || false,
    triangleSize: options.triangle ? options.triangleSize || 10 : 0,
    position: options.position || "bottom",
    hover: options.hover === undefined ? true : options.hover
  };


  const root = document.getElementsByTagName("html")[0];
  const rootTop = root.clientTop;
  const rootLeft = root.clientLeft;
  const rootRight = root.clientRight;
  const InitPortal = new Init(options.target);
  const target = options.target === undefined ? InitPortal.renderPreview() : InitPortal.renderTarget();

  if (!target) {
    return
  }

  const portalBox = InitPortal.renderPortalBox(target);

  if (!portalBox) {
    return
  }

  let triangle = options.triangle ? InitPortal.renderTriangle(portalBox) : null


  let sizes = getSize(portalBox, target, root);



  function getSize(portalBox, target, root) {
    let sizes = {
      root: {
        height: root.offsetHeight
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

  function getPosition(target, sizes) {
    const scrollTop = window.pageYOffset;
    const scrollWidth = window.pageXOffset;
    const coordinates = {};
    const borderLeftWidth = computedBordersWidth(getComputedStyle(target.offsetParent).borderLeftWidth);
    const borderTopWidth = computedBordersWidth(getComputedStyle(target.offsetParent).borderTopWidth);
    const targetTop = target.getBoundingClientRect().top  - target.offsetParent.getBoundingClientRect().top - borderTopWidth - scrollTop;
    const targetLeft = target.getBoundingClientRect().left - target.offsetParent.getBoundingClientRect().left - borderLeftWidth - scrollWidth;
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
      coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth;
      coordinates.y = targetTop + sizes.target.height + scrollTop + sizes.triangle.height;

      if (options.triangle) {
        coordinates.tr.y = -sizes.triangle.height;
        coordinates.tr.x = 0;
        triangle.style = RenderTriangleDirections("bottom", options.triangleSize);
      }

      if (coordinates.y + sizes.box.height > sizes.root.height) {
        return false;
      }

      return true;
    }

    function arrangeRight() {
      coordinates.x = targetLeft + sizes.target.width + sizes.triangle.width + scrollWidth;
      coordinates.y = targetTop + scrollTop

      if (options.triangle) {
        coordinates.tr.x = -sizes.triangle.width;
        coordinates.tr.y = alignedTriangleY(sizes.target);
        alignedYCase1();
        triangle.style = RenderTriangleDirections("left", options.triangleSize);
      }
      if ((coordinates.x + borderLeftWidth) + sizes.box.width > target.offsetParent.offsetWidth) {
        return false;
      }
      return true;
    }

    function arrangeLeft() {
      coordinates.x = targetLeft - sizes.box.width - sizes.triangle.width + scrollWidth;
      coordinates.y = targetTop + scrollTop

      if (options.triangle) {
        coordinates.tr.x = sizes.box.width;
        coordinates.tr.y = alignedTriangleY(sizes.target);
        alignedYCase1();
        triangle.style = RenderTriangleDirections("right", options.triangleSize);
      }

      if (coordinates.x < rootLeft) {
        return false;
      }
      return true;
    }

    function arrangeTop() {
      coordinates.y = targetTop + scrollTop - sizes.box.height - sizes.triangle.height;
      coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth

      if (options.triangle) {
        coordinates.tr.y = sizes.box.height
        coordinates.tr.x = 0;
        triangle.style = RenderTriangleDirections("top", options.triangleSize);
      }

      if (coordinates.y < rootTop) {
        return false;
      }

      return true;
    }

    function conductor() {

      if (options.position === "left" || options.position === "right") {
        let xPositions = [arrangeLeft, arrangeRight];

        xPositions.forEach(function() {

          if (!xPositions[0]()) {
            console.log("over left")
            return xPositions[1]();
          }

          if (!xPositions[1]()) {
             console.log("over right");
            return xPositions[0]();
          }

          if (options.position === "left") {
            return xPositions[0]();
          }

          if (options.position === "right") {
            return xPositions[1]();
          }
        });
      }

      if (options.position === "top" || options.position === "bottom") {
        let yPositions = [arrangeTop, arrangeBottom];

        yPositions.forEach(function() {
          if (!yPositions[0]()) {
            return yPositions[1]();
          }

          if (!yPositions[1]()) {
            return yPositions[0]();
          }

          if (options.position === "bottom") {
            return yPositions[1]();
          }

          if (options.position === "top") {
            return yPositions[0]();
          }
        });
      }
    }

    conductor();
    return coordinates;
  }

  function setPosition(coordinates, portalBox, triangle) {
    portalBox.style.top = 0
    portalBox.style.left = 0
    portalBox.style.transform = "translate(" + coordinates.x + "px" + "," + coordinates.y + "px" + ")"


    if (options.triangle) {
      triangle.style.top = coordinates.tr.y + "px";
      triangle.style.left = coordinates.tr.x + "px";
    }
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

  let eventsForShow = !options.hover ? "click" : "mouseover"
  let eventsForHidden = !options.hover ? "click" : "mouseout"


  window.addEventListener("resize", displacement);
  document.addEventListener("DOMContentLoaded", ready);

  target.addEventListener(eventsForShow, displacement);
  window.addEventListener(eventsForHidden, hiddenPortal);

  function ready() {

    let sizes = getSize(portalBox, target, root);
    draw(sizes);
  }

  function draw(sizes) {
    let coordinates = getPosition(target, sizes);
    setPosition(coordinates, portalBox, triangle);
  }

  function displacement(event) {
    let sizes = getSize(portalBox, target, root);

    draw(sizes);
    event.type != "resize" ? showPortal() : false;
  }
};;



function User() {
  let a = 2;
  this.name = "Alex"
  console.log(this)
}

let user = new User();
// console.log(user.name)
// function remove(node) {
//   var el = document.querySelector(node);
//   document.body.removeChild(el);
// }


const PortalRight = new Portal({
  target: ".button-2",
  position: "right",
  triangle: true,
  hover: false
});

// // // PortalRight.test('Alex')

const PortalTop = new Portal({
  target: '.button-5',
  position: 'top',
  triangle: true
});

// const PortalTopNew = new Portal({
//   target: '.button-4',
//   position: 'top',
//   triangle: false
// });

// const PortalBottom = new Portal({
//   target: ".button-3",
//   position: "bottom",
//   triangle: true
// });

const PortalLeft = new Portal({
  triangle: true,
  position: 'left',
  hover: false,
  target: "#custom-button"
});

// const PortalPreview = new Portal({
//   position: 'top',
//   triangle: true
// });




function shuffleRandom(nodes) {
  let elements = document.querySelectorAll(nodes)
  let max = 2000;
  let min = 200;
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
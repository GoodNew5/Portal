/**
 *  @version 0.1
 *  @author Alexander Veselov
 *  @todo responsive
 *  @todo Portal Preview
 */

"use strict"

import { moduleA } from './test.js'
import { RenderTriangle } from './modules/Triangle/RenderTriangle'
import { Init } from './modules/Init'



function Portal (options) {
  /**
   * @public base options
   */

  options = {
    target: options.target,
    triangle: options.triangle || false,
    triangleSize: options.triangle ? options.triangleSize || 10 : 0,
    position: options.position || "bottom"
  };


  const root = document.getElementsByTagName("html")[0];
  const rootTop = root.clientTop;
  const rootLeft = root.clientLeft;
  const rootRight = root.clientRight;
  let triangle;
  const InitPortal = new Init(options.target);
  const target = options.target === undefined ? InitPortal.renderPreview() : InitPortal.renderTarget();

  if (!target) {
    return
  }

  const portalBox = InitPortal.renderPortalBox(target);

  if (!portalBox) {
    return
  }

  let sizes = getSize(portalBox, target, root);

  if (options.triangle) {
    let el = document.createElement("div");
    triangle = portalBox.appendChild(el);
  }

  function getSize(portalBox, target, root) {
    let sizes = {
      root: {
        height: root.offsetHeight,
        width: root.offsetWidth
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
    const targetTop = target.getBoundingClientRect().top
    const targetLeft = target.getBoundingClientRect().left
    const heightCase = sizes.target.height > sizes.box.height;

    options.triangle ? coordinates.tr = {} : false

    function alignedTriangleY(element) {
      return element.height / 2 - sizes.triangle.height;
    }

    function alignedYCase1() {
      if (heightCase) {
        return coordinates.tr.y = alignedTriangleY(sizes.box);
      }
    }


    function arrangeBottom() {
      coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth;
      coordinates.y = targetTop + sizes.target.height + scrollTop + sizes.triangle.height;

      if (options.triangle) {
        coordinates.tr.y = -sizes.triangle.height;
        coordinates.tr.x = 0;
        triangle.style = RenderTriangle("bottom", options.triangleSize);
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
        triangle.style = RenderTriangle("left", options.triangleSize);
      }
      if (coordinates.x + sizes.box.width > sizes.root.width) {
        return false;
      }
      return true;
    }

    function arrangeLeft() {
      coordinates.x = targetLeft - sizes.box.width - sizes.triangle.width + scrollWidth;
      coordinates.y = targetTop + scrollTop;

      if (options.triangle) {
        coordinates.tr.x = sizes.box.width;
        coordinates.tr.y = alignedTriangleY(sizes.target);
        alignedYCase1();
        triangle.style = RenderTriangle("right", options.triangleSize);
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
        coordinates.tr.y = sizes.box.height;
        coordinates.tr.x = 0;
        triangle.style = RenderTriangle("top", options.triangleSize);
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
            return xPositions[1]();
          }

          if (!xPositions[1]()) {
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
    portalBox.style.left = coordinates.x + 'px';
    portalBox.style.top = coordinates.y + 'px';

    if (options.triangle) {
      triangle.style.top = coordinates.tr.y + "px";
      triangle.style.left = coordinates.tr.x + "px";
    }
  }


  window.addEventListener("resize", displacement);
  target.addEventListener("click", displacement);
  document.addEventListener("DOMContentLoaded", ready);

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
    event.type != "resize" ? portalBox.classList.toggle("open") : false;
  }

  window.addEventListener("click", function(event) {
    if (event.target != target && !target.contains(event.target) && event.target != portalBox && !portalBox.contains(event.target)) {
      portalBox.classList.remove("open");
    }
  });
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
  triangle: true
});

// // PortalRight.test('Alex')

const PortalTop = new Portal({
  target: '.button-5',
  position: 'top',
  triangle: true
});

const PortalTopNew = new Portal({
  target: '.button-4',
  position: 'top',
  triangle: true
});

const PortalBottom = new Portal({
  target: ".button-3",
  position: "bottom",
  triangle: true
});

const PortalLeft = new Portal({
  triangle: true,
  position: 'left',
  target: "#custom-button"
});

const PortalPreview = new Portal({
  position: 'top',
  triangle: true
});




function shuffleRandom(nodes) {
  let elements = document.querySelectorAll(nodes)
  let max = 2000;
  let min = 200;
  elements.forEach(element => {
    element.style = "margin-left:" + Math.random() * (max - min) + min + "px";
  });
}

// shuffleRandom(".button-open-portal");

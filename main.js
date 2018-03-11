
(function () {
  ("use strict");

  this.Portal = function(options) {
    /**
     * @public base options
     */

    options = {
      target: options.target,
      triangle: options.triangle || false,
      triangleSize: options.triangle ? options.triangleSize || 10 : 0,
      position: options.position || "bottom"
    };

    const target = document.querySelector(options.target);
    const root = document.getElementsByTagName("html")[0];
    const rootTop = root.clientTop;
    const rootLeft = root.clientLeft;
    const rootRight = root.clientRight;
    const scrollbarWidth = getScrollBarWidth();

    function getScrollBarWidth() {
      let scrollDiv = document.createElement("div");
      scrollDiv.style.overflowY = "scroll";
      scrollDiv.style.width = "50px";
      scrollDiv.style.height = "50px";
      scrollDiv.style.visibility = "hidden";
      document.body.appendChild(scrollDiv);
      let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth

    }

    let sizes;
    let triangle;

    const triangleLeftDirection = `
      width: 0;
      height: 0;
      border-top: ${options.triangleSize + "px"} solid transparent;
      border-bottom: ${options.triangleSize + "px"} solid transparent;
      border-right: ${options.triangleSize + "px"} solid black;
      position: absolute;
    `;
    const triangleRightDirection = `
      width: 0;
      height: 0;
      border-top:  ${options.triangleSize + "px"} solid transparent;
      border-bottom: ${options.triangleSize + "px"} solid transparent;
      border-left:  ${options.triangleSize + "px"}  solid black;
      border-right:  ${options.triangleSize + "px"} solid transparent;
      position: absolute;
    `;
    const triangleTopDirection = `
      position: absolute;
      width: 0;
      height: 0;
      border-left:  ${options.triangleSize + "px"} solid transparent;
      border-right:  ${options.triangleSize + "px"}  solid transparent;
      border-top:  ${options.triangleSize + "px"} solid black;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    `;
    const triangleBottomDirection = `
      position: absolute;
      width: 0;
      height: 0;
      border-left:  ${options.triangleSize + "px"} solid transparent;
      border-right:  ${options.triangleSize + "px"}  solid transparent;
      border-bottom:  ${options.triangleSize + "px"} solid black;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
    `;

    if (target === null) {
      console.error('Target is not detected, check option "target" or your HTML');
      return;
    }
    target.className = "button-open-portal";

    let getContent = function(target) {
      let content = target.dataset.portal; // custom content
      return content;
    };

    const content = getContent(target);
    const portalBox = document.querySelector(content);

    if (portalBox === null) {
      console.error('Check in your html data atribute "data-portal", content not found');
      return;
    }

    portalBox.className = "portal-box";
    portalBox.style = "width: 100%";

    if (options.triangle) {
      let el = document.createElement("div");
      triangle = portalBox.appendChild(el);
    }

    function getSize(portalBox, target, root) {
      let sizes = {
        root: {
          height: root.offsetHeight,
          width: root.offsetWidth + scrollbarWidth
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
      // console.log(target.offsetTop)
      const targetLeft = target.getBoundingClientRect().left
      const heightCase = sizes.target.height > sizes.box.height;

      if (options.triangle) {
        coordinates.tr = {};

        function alignedTriangleY(element) {
          return element.height / 2 - sizes.triangle.height;
        }

        function alignedYCase1() {
          if (heightCase) {
            coordinates.tr.y = alignedTriangleY(sizes.box);
          }
        }
      }

      function arrangeBottom() {
        coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth;
        coordinates.y = targetTop + sizes.target.height + scrollTop + sizes.triangle.height;

        if (options.triangle) {
          coordinates.tr.y = -sizes.triangle.height;
          coordinates.tr.x = 0;
          triangle.style = triangleBottomDirection;
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
          triangle.style = triangleLeftDirection;
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
          triangle.style = triangleRightDirection;
        }

        if (coordinates.x < rootLeft) {
          return false;
        }
        return true;
      }

      function arrangeTop() {
        coordinates.y = targetTop + scrollTop - sizes.box.height - sizes.triangle.height;
        coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth
        // console.log(targetLeft);
        console.log(target.clientLeft)
        // console.log(target.offsetLeft)
        if (options.triangle) {
          coordinates.tr.y = sizes.box.height;
          coordinates.tr.x = 0;
          triangle.style = triangleTopDirection;
        }

        if (coordinates.y < rootTop) {
          return false;
        }

        return true;
      }

      function conduct() {
        var positions = [arrangeLeft, arrangeRight, arrangeTop, arrangeBottom];

        if (options.position === "left") {

          if (!positions[0]()) {
            console.log(positions[1]())
            return positions[1]();
          }
          if (!positions[1]()) {
            return positions[0]();
          }
          return positions[0]();
        }

        if (options.position === "right") {
          if (!positions[0]()) {

            return positions[1]();
          }
          if (!positions[1]()) {
            return positions[0]();
          }
          return positions[1]();
        }

        if (options.position === "bottom") {
          if (!positions[3]()) {
            return positions[2]();
          } else {
            return positions[3]();
          }
        }

        if (options.position === "top") {
          if (!positions[2]()) {
            return positions[3]();
          } else {
            return positions[2]();
          }
        }
      }

      conduct();
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


    window.addEventListener("resize", handler1);
    target.addEventListener("click", handler);
    document.addEventListener("DOMContentLoaded", ready);
    // this.onload = function() {
    //   // console.log("ready")
    //   ready();
    //   // setTimeout(() => {
    //   //   ready();
    //   // }, 1000);
    // };
    // ready()
    function ready() {
      let sizes = getSize(portalBox, target, root);
      draw(sizes);
    }

    function draw(sizes) {
      let coordinates = getPosition(target, sizes);
      // console.log(coordinates)
      setPosition(coordinates, portalBox, triangle);
    }

    function handler() {
      let sizes = getSize(portalBox, target, root); // get sizes only on click
      draw(sizes);
      portalBox.classList.toggle("open");
    }

    function handler1() {
      // portalBox.classList.remove("open");
      let sizes = getSize(portalBox, target, root);
      draw(sizes);
    }

    window.addEventListener("click", function(event) {
      if (event.target != target && !target.contains(event.target) && event.target != portalBox && !portalBox.contains(event.target)) {
        portalBox.classList.remove("open");
      }
    });
  };;
}());


// for test
function remove(node) {
  var el = document.querySelector(node);
  document.body.removeChild(el);
}


// createElement("div", ".container");
// getSize(".test");
// Portal({
//   target: ".button-2",
//   position: "right",
//   triangle: true
// });

Portal({
  target: '.button-5',
  position: 'top',
  triangle: true
});

Portal({
  target: '.button-4',
  position: 'top',
  triangle: true
});

Portal({
  target: ".button-3",
  position: "bottom",
  triangle: true
});

// Portal({
//   triangle: true,
//   target: '#custom-button',
//   position: 'left'
// });




function shuffleRandom(nodes) {
  let elements = document.querySelectorAll(nodes)
  let max = 300;
  let min = 200;
  elements.forEach(element => {
    element.style = "margin-left:" + Math.random() * (max - min) + min + "px";
  });
}

// shuffleRandom(".button-open-portal");







// Portal({
//   target: '.button-6',
//   position: 'top'
// });

// Portal({
//   target: '.button-10',
//   position: 'left',
//   triangle: true
// });

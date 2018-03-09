
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
    const rootHeight = document.getElementsByTagName("html")[0].offsetHeight;
    const rootTop = root.clientTop;
    const rootWidth = root.clientWidth;
    const rootLeft = root.clientLeft;
    const rootRight = root.clientRight;

    let sizes;
    let triangle;


    const triangleLeftDirection = `
      width: 0;
      height: 0;
      border-top: ${options.triangleSize + 'px'} solid transparent;
      border-bottom: ${options.triangleSize + 'px'} solid transparent;
      border-right: ${options.triangleSize + 'px'} solid black;
      position: absolute;
    `;
    const triangleRightDirection = `
      width: 0;
      height: 0;
      border-top:  ${options.triangleSize + "px"} solid transparent;
      border-bottom: ${ options.triangleSize + "px"} solid transparent;
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

      return content

    }

    const content = getContent(target)
    const portalBox = document.querySelector(content);

     if (portalBox === null) {
       console.error('Check in your html data atribute "data-portal", content not found');
       return;
     }

    portalBox.className = "portal-box";



    if (options.triangle) {

      let el = document.createElement("div"); // problem with triangle
      triangle = portalBox.appendChild(el);


      function triangleSetDirection(direction, triangle) {
        triangle.style = direction
      }

    }



    function getSize(portalBox, target) {


      let sizes = {
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
      const targetTop = target.getBoundingClientRect().top;
      const targetLeft = target.getBoundingClientRect().left;
      const heightCase = sizes.target.height > sizes.box.height;

      if (options.triangle) {
        coordinates.tr = {};

        function alignedTriangleY(element) {
          return element.height / 2 - sizes.triangle.height
        }

        function alignedYCase1() {
          if (heightCase) {
            coordinates.tr.y = alignedTriangleY(sizes.box);
          }
          return coordinates
        }

      }
      function getFreeSpace(params) {

      }


      function getTriangleRightPosition() {
        coordinates.tr.x = - sizes.triangle.width;
        coordinates.tr.y = alignedTriangleY(sizes.target);
        alignedYCase1();

        return coordinates
      }

      function getTriangleLeftPosition() {
        coordinates.tr.x = sizes.box.width;
        coordinates.tr.y = alignedTriangleY(sizes.target);
        alignedYCase1();

        return coordinates
      }

      function getTriangleBottomPosition() {
        coordinates.tr.y = - sizes.triangle.height
        return coordinates
      }

      function getTriangleTopPosition() {
        coordinates.tr.y = sizes.box.height;
        return coordinates
      }

      function setLeftPosition (place) {
        if (options.triangle) {
          getTriangleLeftPosition();
          triangleSetDirection(triangleRightDirection, triangle);
        }

        getPositionBoxLeft();
      }

      function setRightPosition () {

        if (options.triangle) {
          getTriangleRightPosition();
          triangleSetDirection(triangleLeftDirection, triangle);
        }
        getPositionBoxRight();
      }

      function setBottomPosition() {
        if (options.triangle) {
          getTriangleBottomPosition();
          triangleSetDirection(triangleBottomDirection, triangle);
        }
        getPositionBoxBottom();
      }

      function setTopPosition() {

        if (options.triangle) {
          getTriangleTopPosition();
          triangleSetDirection(triangleTopDirection, triangle);
        }
        getPositionBoxTop();

      }

      function getPositionBoxBottom() {
        coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth;
        coordinates.y = targetTop + sizes.target.height + scrollTop + sizes.triangle.height;

        if (coordinates.x < rootLeft || coordinates.y > rootHeight) {
          return false
        }
        return coordinates;
      }

      function getPositionBoxRight() {
        coordinates.x = targetLeft + sizes.target.width + sizes.triangle.width + scrollWidth;
        coordinates.y = targetTop + scrollTop;

        if (coordinates.x + sizes.box.width > rootWidth) {
          return false;
        }

        return coordinates;
      }

      function getPositionBoxLeft() {
        coordinates.x = targetLeft - sizes.box.width - sizes.triangle.width + scrollWidth;
        coordinates.y = targetTop + scrollTop;

        if (coordinates.x < rootLeft) {
          return false;
        }

        return coordinates;
      }

      function getPositionBoxTop() {
        coordinates.y = targetTop + scrollTop - sizes.box.height - sizes.triangle.height;
        coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth;

         if (coordinates.x < rootLeft) {
           return false;
         }
        return coordinates;
      }


      // todow autowidth
      function conduct() {

        let positions = [getPositionBoxLeft, getPositionBoxRight, getPositionBoxBottom, getPositionBoxTop];



          if (options.position === "left") {
            if (!positions[1]() && !positions[0]()) {
                console.log("over left and right");
                return /*do something*/ (coordinates.x = "auto"), (coordinates.y = "auto");
            }
            if (!positions[0]()) {
              return setRightPosition();
            }
            else {
              return setLeftPosition();
            }
          }

          if (options.position === "right") {
            if (!positions[0]() && !positions[1]()) {
              console.log("over left and right");
              return /*do something*/ (coordinates.x = "auto"), (coordinates.y = "auto");
            }
            if (!positions[1]()) {
              return setLeftPosition();
            }
            else {
              return setRightPosition();
            }

          }

          if (options.position === "bottom") {

            if (!positions[0]()) {
              return setRightPosition();
            }
            else {
              if (!positions[1]()) {
                return setLeftPosition();
              }
              else {
                if (!positions[2]()) {
                  return setTopPosition();
                }
                else {
                  return setBottomPosition();
                }
              }
            }
          }


          if (options.position === "top") {
            if (!positions[0]()) {
              return setRightPosition();
            }
            else {
              if (!positions[1]()) {
                return setLeftPosition();
              }
              else {
                if (!positions[3]()) {
                  return setBottomPosition();
                }
                else {
                  return setTopPosition();
                }
              }
            }
          }
      }

      conduct();
      return coordinates;
    }




    function setPosition(coordinates, portalBox, triangle) {

      portalBox.style.left = coordinates.x + "px";
      portalBox.style.top = coordinates.y + "px";

      if (options.triangle) {
        triangle.style.top = coordinates.tr.y + "px";
        triangle.style.left = coordinates.tr.x + "px";
      }

    }

    document.addEventListener("DOMContentLoaded", ready);
    window.addEventListener("resize", handler1);
    target.addEventListener("click", handler);

    function ready() {
      let sizes = getSize(portalBox, target);
      draw(sizes);
    }

    function draw(sizes) {

      let coordinates = getPosition(target, sizes);
      setPosition(coordinates, portalBox, triangle);
    }

    function handler() {
      let sizes = getSize(portalBox, target); // get sizes only on click
      draw(sizes);
      portalBox.classList.toggle("open");

    }

    function handler1() {
      portalBox.classList.remove("open");
    }

    window.addEventListener("click", function(event) {
      if (event.target != target && !target.contains(event.target) && event.target != portalBox && !portalBox.contains(event.target)) {
        portalBox.classList.remove("open");
      }
    });
};
}());


// for test
function remove(node) {
  var el = document.querySelector(node);
  document.body.removeChild(el);
}


// createElement("div", ".container");
// getSize(".test");

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

Portal({
  triangle: true,
  target: '#custom-button',
  position: 'left'
});

// Portal({
//   target: ".button-2",
//   position: "right",
//   triangle: true
// });



function shuffle(nodes) {
  let elements = document.querySelectorAll(nodes)
  let max = 900;
  let min = 200;
  elements.forEach(element => {
    element.style = "margin-left:" + Math.random() * (max - min) + min + "px";
  });
}
shuffle(".button-open-portal");






// Portal({
//   target: '.button-5',
//   position: 'right',
//   triangle: true
// });

// Portal({
//   target: '.button-6',
//   position: 'top'
// });

// Portal({
//   target: '.button-10',
//   position: 'left',
//   triangle: true
// });


// // if (options.triangle) {
// //   coordinates.x = target.getBoundingClientRect().left + target.offsetWidth + triangle.offsetWidth
// // }
// // document.querySelector('.test').onclick = function () {
// //   var i = 0;
// //   setInterval(function () {
// //     console.log(i++);
// //   }, 1000);
// //   this.parentNode.removeChild(this);
// // }

// //





(function () {
  ("use strict");

  this.Portal = function(options) {

    var options = { target: options.target, triangle: options.triangle || false, position: options.position || "bottom" };

    var target = document.querySelector(options.target);
    const root = document.getElementsByTagName("html")[0];
    const rootTop = root.clientTop;
    const rootWidth = root.clientWidth;
    const rootLeft = root.clientLeft;
    const rootRight = root.clientRight;
    var sizes;
    var content;

    // todo написать функцию для получения размеров: кнопки, треугольника, порталбокса
    // которая должна возвращать объект с размерами каждой из фигур и потом передать этот объект в функцию calcPosition
    // записать все размеры в соответствующие переменные внутри этой функции и использовать для правильного позиционирования относительно кнопки

    // todo if(target.height > portalBox.height) => {triangle center portalBox}

    if (target === null) {
      console.error('Target is not detected, check option "target" or your HTML');
      return;
    }
    target.className = "button-open-portal";

    content = target.dataset.portal;
    var portalBox = document.querySelector(content);

    if (portalBox === null) {
      console.error('Check in your html data atribute "data-portal", content not found');
      return;
    }

    portalBox.className = "portal-box";

    if (options.triangle) {
      function renderTriangle() {
        const triangle = document.createElement("div");

        if (options.position === "bottom") {
          triangle.classList.add("portal-triangle-top");
        }

        if (options.position === "right") {
          triangle.classList.add("portal-triangle-left");
        }

        if (options.position === "left") {
          triangle.classList.add("portal-triangle-right");
        }

        return triangle;
      }
      var triangle = portalBox.appendChild(renderTriangle());
    }

    function getSize(portalBox, target, triangle) {
      var sizes = {
        box: {
          width: portalBox.offsetWidth,
          height: portalBox.offsetHeight
        },
        target: {
          width: target.offsetWidth,
          height: target.offsetHeight
        },
        triangle: {
          width: 0,
          height: 0
        }
      };

      if (options.triangle) {
        sizes.triangle.height = triangle.offsetHeight;
        sizes.triangle.width = triangle.offsetWidth;
      }

      return sizes;
    }

    function ready() {
      sizes = getSize(portalBox, target, triangle);
    }

    function calcPosition(target, sizes) {
      const scrollTop = window.pageYOffset;
      const scrollWidth = window.pageXOffset;
      const coordinates = {};
      const targetTop = target.getBoundingClientRect().top;
      const targetLeft = target.getBoundingClientRect().left;
      const heightCase = sizes.target.height > sizes.box.height;

      function alignedTriangleY(element) {
        return element.height / 2 - sizes.triangle.height / 2;
      }

      function alignedYCase1() {
        // aligned case1

        if (heightCase) {
          coordinates.tr.y = alignedTriangleY(sizes.box);
        }
      }

      if (options.triangle) {
        coordinates.tr = {};
      }

      function positionedBottom() {
        coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth;
        coordinates.y = targetTop + sizes.target.height + scrollTop + sizes.triangle.height;

        if (options.triangle) {
          coordinates.tr.y = -sizes.triangle.height;
        }

        return coordinates;
      }

      function positionedRight() {
        coordinates.x = targetLeft + sizes.target.width + scrollWidth + sizes.triangle.width;
        coordinates.y = targetTop + scrollTop;

        if (options.triangle) {
          coordinates.tr.y = alignedTriangleY(sizes.target);
          coordinates.tr.x = -sizes.triangle.width;

          alignedYCase1();
        }

        if (coordinates.x > rootWidth) {
          positionedLeft();
        }

        return coordinates;
      }

      function positionedLeft() {
        coordinates.x = +targetLeft - sizes.box.width - sizes.triangle.width + scrollWidth;
        coordinates.y = targetTop + scrollTop;

        if (options.triangle) {
          coordinates.tr.y = alignedTriangleY(sizes.target);
          coordinates.tr.x = sizes.box.width;
          alignedYCase1();
        }

        if (coordinates.x < rootLeft) {
          positionedRight();
        }

        return coordinates;
      }

      function positionedTop() {
        coordinates.y = targetTop + scrollTop - sizes.box.height;
        coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth;

        if (coordinates.y < rootTop) {
          positionedBottom();
        }

        return coordinates;
      }

      if (options.position === "bottom") {
        positionedBottom();
      }

      if (options.position === "right") {
        positionedRight();
      }

      if (options.position === "left") {
        positionedLeft();
      }

      if (options.position === "top") {
        positionedTop();
      }

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

    function draw() {
      var coordinates = calcPosition(target, sizes);
      setPosition(coordinates, portalBox, triangle);
    }

    function handler() {
      draw();
      portalBox.classList.toggle("open");
    }

    function handler1() {
      portalBox.classList.remove("open");
      draw();
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

Portal({
  triangle: false,
  target: '#custom-button',
  position: 'top'
});

Portal({
  target: '.button-2',
  position: 'right',
  triangle: true
});

Portal({
  target: '.button-3',
  position: 'left',
  triangle: true
});

Portal({
  target: '.button-4',
  position: 'bottom',
  triangle: true
});

Portal({
  target: '.button-5',
  position: 'bottom',
  triangle: true
});

Portal({
  target: '.button-6',
  position: 'top'
});

Portal({
  target: '.button-10',
  position: 'right'
});

// if (options.triangle) {
//   coordinates.x = target.getBoundingClientRect().left + target.offsetWidth + triangle.offsetWidth
// }
// document.querySelector('.test').onclick = function () {
//   var i = 0;
//   setInterval(function () {
//     console.log(i++);
//   }, 1000);
//   this.parentNode.removeChild(this);
// }

//




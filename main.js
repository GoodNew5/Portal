'use strict'


var Portal = {
  render: function (options) {
    var options = {
      target: options.target,
      triangle: options.triangle || false,
      position: options.position || 'bottom'
    }

    var target = document.querySelector(options.target);
    const root = document.getElementsByTagName('html')[0];
    const rootTop = root.clientTop;
    const rootWidth = root.clientWidth;
    const rootLeft = root.clientLeft;
    const rootRight = root.clientRight;
    var sizes;

    // todo написать функцию для получения размеров: кнопки, треугольника, порталбокса
    // которая должна возвращать объект с размерами каждой из фигур и потом передать этот объект в функцию calcPosition
    // записать все размеры в соответствующие переменные внутри этой функции и использовать для правильного позиционирования относительно кнопки

    // if(target.height > portalBox.height) => {triangle center portalBox}



    if (target === null) {
      console.error('Target is not detected, check option "target" or your HTML')
      return
    }

    var content = target.dataset.portal;
    target.className = "button-open-portal";

    var portalBox = document.querySelector(content)

    if (portalBox === null) {
      console.error('Check in your html data atribute "data-portal", content not found')
      return
    }

    portalBox.className = "portal-box";



    function renderTriangle() {

      const triangle = document.createElement('div');

      if (options.position === 'bottom') {
        triangle.classList.add('portal-triangle-top')
      }

      if (options.position === 'right') {
        triangle.classList.add('portal-triangle-left');
      }

      if (options.position === 'left') {
        triangle.classList.add('portal-triangle-right');
      }

      return triangle
    }

    if (options.triangle) {
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
      }

       if (options.triangle) {
         sizes.triangle.height = triangle.offsetHeight
         sizes.triangle.width = triangle.offsetWidth
       }

      return sizes
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



      if (options.triangle) {
        var centerTriangle = (sizes.target.height / 2) - (sizes.triangle.height / 2)
        coordinates.tr = {}
      }

      function positionedBottom() {
        coordinates.x = (targetLeft - (sizes.box.width - sizes.target.width) / 2) + scrollWidth
        coordinates.y = targetTop + sizes.target.height + scrollTop + sizes.triangle.height;
        console.log(sizes.target.height)
        console.log(sizes.triangle.heigh)
        // console.log(coordinates.y)

        if (options.triangle) {
          coordinates.tr.y = -sizes.triangle.height
        }






        return coordinates
      }

      function positionedRight() {
        coordinates.x = targetLeft + sizes.target.width + scrollWidth + sizes.triangle.width
        coordinates.y = targetTop + scrollTop
        console.log(sizes.target.height)

        if (options.triangle) {
          coordinates.tr.y = centerTriangle
          coordinates.tr.x = -sizes.triangle.width
        }

        if (coordinates.x > rootWidth) {

          positionedLeft()
        }




        return coordinates
      }

      function positionedLeft() {
        coordinates.x = + targetLeft - sizes.box.width - sizes.triangle.width + scrollWidth
        coordinates.y = targetTop + scrollTop

        if (options.triangle) {
          coordinates.tr.y = centerTriangle;
          coordinates.tr.x = sizes.box.width
        }

        if (coordinates.x < rootLeft) {
          positionedRight();
        }

        return coordinates
      }

      function positionedTop() {
        coordinates.y = targetTop + scrollTop - sizes.box.height;
        coordinates.x = (targetLeft - (sizes.box.width - sizes.target.width) / 2) + scrollWidth

        if ( coordinates.y < rootTop ) {
          positionedBottom();
        }

        return coordinates
      }


      if ( options.position === 'bottom' ) {
        positionedBottom()
      }

      if ( options.position === 'right' ) {
        positionedRight()
      }

      if ( options.position === 'left' ) {
        positionedLeft()
      }

      if ( options.position === 'top' ) {
        positionedTop()
      }


      return coordinates
    }

    function setPosition(coordinates, portalBox, triangle) {
      portalBox.style.left = coordinates.x + 'px';
      portalBox.style.top = coordinates.y + 'px';

      if(options.triangle) {
        triangle.style.top = coordinates.tr.y + 'px';
        triangle.style.left = coordinates.tr.x + 'px';
      }

    }
    document.addEventListener("DOMContentLoaded", ready)

    window.addEventListener('resize', function () {
      portalBox.classList.remove('open');
      var coordinates = calcPosition(target, sizes);
      setPosition(coordinates, portalBox, triangle);
    });

    target.addEventListener('click', openPortal)

    function openPortal() {
      var coordinates = calcPosition(target, sizes);
      setPosition(coordinates, portalBox, triangle);
      portalBox.classList.toggle('open');

    }




    window.addEventListener('click', function (event) {
      if (
        event.target != target
        && !target.contains(event.target)
        && event.target != portalBox
        && !portalBox.contains(event.target)
      ) {
        portalBox.classList.remove('open');
      }
    })

  }

}
// for test
function remove(node) {
  var el = document.querySelector(node);
  document.body.removeChild(el);
}

Portal.render({
  triangle: false,
  target: '#custom-button',
  position: 'bottom'
});

Portal.render({
  target: '.button-2',
  position: 'right',
  triangle: true
});

Portal.render({
  target: '.button-3',
  position: 'left',
  triangle: true
});

Portal.render({
  target: '.button-4',
  position: 'bottom',
  triangle: false
});

Portal.render({
  target: '.button-5',
  position: 'bottom',
  triangle: true
});

// Portal.render({
//   target: '.button-6',
//   position: 'top'
// });

Portal.render({
  target: '.button-10',
  position: 'top'
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




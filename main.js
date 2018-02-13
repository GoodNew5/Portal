'use strict'
// console.log();

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
    const rootLeft = root.clientLeft;
    const rootRight = root.clientRight;

    // todo написать функцию для получения размеров: кнопки, треугольника, порталбокса
    // которая должна возвращать объект с размерами каждой из фигур и потом передать этот объект в функцию calcPosition
    // записать все размеры в соответствующие переменные внутри этой функции и использовать для правильного позиционирования относительно кнопки





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

      return triangle
    }

    if (options.triangle) {

      var triangle = portalBox.appendChild(renderTriangle());
      console.log(triangle)
    }
    // console.log(triangle)


    function calcPosition(target, portalBox, triangle) {
      const scrollTop = window.pageYOffset;
      const scrollWidth = window.pageXOffset;
      const coordinates = {};
      const targetTop = target.getBoundingClientRect().top;
      const targetLeft = target.getBoundingClientRect().left;
      const targetHeight = target.offsetHeight;
      const targetWidth = target.offsetWidth;
      const portalBoxWidth = portalBox.offsetWidth;
      const portalBoxHeight = portalBox.offsetHeight;
      const triangleHeight = triangle ? triangle.offsetHeight : 0;
      const triangleWidth = triangle ? triangle.offsetWidth : 0;


      // console.log(triangle.el.offsetHeight)
      // var triangleLeft = triangle.getBoundingClientRect().left;




      function positionedBottom() {
        // triangle ? true : triangleHeight = triangle.offsetHeight


        coordinates.x = (targetLeft - (portalBoxWidth - targetWidth) / 2) + scrollWidth
        coordinates.y = targetTop + targetHeight + scrollTop + triangleHeight;


        return coordinates
      }

      function positionedRight() {


        if (!(coordinates.x < rootRight)) {
          coordinates.x = targetLeft + targetWidth + scrollWidth + triangleWidth
          coordinates.y = targetTop + scrollTop

          if (triangle) {
            coordinates.tr = {}
            coordinates.tr.y = (targetHeight / 2) - (triangleHeight / 2)
          }
        }

        else {
          positionedLeft()
        }

        return coordinates
      }

      function positionedLeft() {

        if (!( coordinates.x < rootLeft )) {
          coordinates.x = + targetLeft - portalBoxWidth + scrollWidth
          coordinates.y = targetTop + scrollTop
        }
        else {
          positionedRight()
        }

        return coordinates
      }

      function positionedTop() {
        coordinates.y = targetTop + scrollTop - portalBoxHeight;
        coordinates.x = (targetLeft - (portalBoxWidth - targetWidth) / 2) + scrollWidth

        if ( coordinates.y < rootTop ) {
          positionedBottom();
        }

        return coordinates
      }


      if ( options.position === 'bottom' ) {
        positionedBottom();
      }

      if ( options.position === 'right' ) {
        positionedRight()

      }

      if ( options.position === 'left' ) {
        positionedLeft()
      }

      if ( options.position === 'top' ) {
        positionedTop();
      }


      return coordinates
    }

    function setPosition(coordinates, portalBox, triangle) {
      portalBox.style.left = coordinates.x + 'px';
      portalBox.style.top = coordinates.y + 'px';

      if(options.triangle) {
        triangle.style.top = coordinates.tr.y + 'px';
      }
    }

    window.addEventListener('resize', function () {
      portalBox.classList.remove('open');
      var coordinates = calcPosition(target, portalBox, triangle);
      setPosition(coordinates, portalBox, triangle);
    });

    target.addEventListener('click', openPortal)

    function openPortal() {
      var coordinates = calcPosition(target, portalBox, triangle);
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
  triangle: true,
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




'use strict'

var Portal = {
  render: function (options) {

    var options = {
      target: options.target,
      triangle: options.triangle,
      position: options.position || 'bottom'
    }

    var target = document.querySelector(options.target);

    if (target === null) {
      console.error('Target is not detected, check option "target" or your HTML')
      return
    }

    var content = target.dataset.portal;
    target.className = "button-open-portal";

    var portalBox = {
      el: document.querySelector(content),
      width: null
    }

    if (portalBox.el === null) {
      console.error('Check in your html data atribute "data-portal", content not found')
      return
    }

    portalBox.el.className = "portal-box";

    if (options.triangle) {

      var trian = {
        el: document.createElement('div'),
        height: null,
        width: null,
        directions: null
      }

      portalBox.el.appendChild(trian.el);
    }

    if (options.triangle && options.position === 'bottom') {

      trian.directions = trian.el.classList.add('portal-triangle-top');
      trian.height = trian.el.offsetHeight;
      trian.width = trian.el.offsetWidth;
      trian.el.style.top = '-' + trian.height + 'px';
      trian.el.style.left = (portalBox.el.offsetWidth - trian.width) / 2 + 'px';

    }

    function calcPosition(target) {
      var scrollTop = window.pageYOffset;
      var scrollWidth = window.pageXOffset;
      var coordinates = {};

      portalBox.width = portalBox.el.offsetWidth

      function positionedBottom() {
        var top = target.getBoundingClientRect().top + target.offsetHeight + scrollTop;

        coordinates.x = (target.getBoundingClientRect().left - (portalBox.width - target.offsetWidth) / 2) + scrollWidth
        coordinates.y = top;

        if (options.triangle) {
          coordinates.y = top + trian.el.offsetHeight;
        }
      }

      function positionedRight() {
        coordinates.x = target.getBoundingClientRect().left + target.offsetWidth + scrollWidth
        coordinates.y = target.getBoundingClientRect().top + scrollTop

        if (options.triangle) {
          coordinates.x = target.getBoundingClientRect().left + target.offsetWidth + triangle.offsetWidth
        }
      }

      function positionedLeft() {
        coordinates.x = + target.getBoundingClientRect().left - portalBox.width + scrollWidth
        coordinates.y = target.getBoundingClientRect().top + scrollTop
      }

      function positionedTop() {
        var top = target.getBoundingClientRect().top + scrollTop - portalBox.el.offsetHeight;
        coordinates.y = top;
        coordinates.x = (target.getBoundingClientRect().left - (portalBox.width - target.offsetWidth) / 2) + scrollWidth
      }

      if (options.position === 'bottom') {
        positionedBottom()
      }

      if (options.position === 'right') {
        positionedRight()

      }

      if (options.position === 'left') {
        positionedLeft()
      }

      if (options.position === 'top') {
        positionedTop()
      }


      return coordinates
    }

    function setPosition(coordinates) {
      portalBox.el.style.left = coordinates.x + 'px';
      portalBox.el.style.top = coordinates.y + 'px';
    }

    window.addEventListener('resize', function () {
      portalBox.el.classList.remove('open');
      var coordinates = calcPosition(target);
      setPosition(coordinates);
    });

    target.addEventListener('click', openPortal)

    function openPortal() {
      var coordinates = calcPosition(target);
      setPosition(coordinates);
      portalBox.el.classList.toggle('open');
      var i = 0;
      setInterval(function () {
        console.log(i++);
      }, 1000);

    }




    window.addEventListener('click', function (event) {
      if (
        event.target != target
        && !target.contains(event.target)
        && event.target != portalBox.el
        && !portalBox.el.contains(event.target)
      ) {
        portalBox.el.classList.remove('open');
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
  target: '#custom-button',
  position: 'bottom'
});

Portal.render({
  target: '.button-2',
  position: 'right'
});

Portal.render({
  target: '.button-3',
  position: 'left'
});

Portal.render({
  target: '.button-4',
  position: 'bottom'
});

Portal.render({
  target: '.button-5',
  position: 'bottom',
  triangle: true
});

Portal.render({
  target: '.button-6',
  position: 'top'
});


document.querySelector('.test').onclick = function () {
  var i = 0;
  setInterval(function () {
    console.log(i++);
  }, 1000);
  this.parentNode.removeChild(this);
}

//




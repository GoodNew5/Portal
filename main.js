
var Portal = {
  render: function (options) {

    var options = {
      target: options.target,
      triangle: options.triangle,
      position: options.position || 'bottom'
    }

    var coordinates = {};
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

    if(portalBox.el === null) {
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
        portalBox.width = portalBox.el.offsetWidth

        if (options.position === 'bottom') {
          var top = target.getBoundingClientRect().top + target.offsetHeight + scrollTop;

          coordinates.x = (target.getBoundingClientRect().left - (portalBox.width - target.offsetWidth) / 2) + scrollWidth
          coordinates.y = top;

          if (options.triangle) {
            coordinates.y = top + trian.el.offsetHeight;
          }

        }

        if (options.position === 'right') {
          coordinates.x = target.getBoundingClientRect().x + target.offsetWidth + scrollWidth
          coordinates.y = target.getBoundingClientRect().y + scrollTop

          if (options.triangle) {
            coordinates.x = target.getBoundingClientRect().x + target.offsetWidth + triangle.offsetWidth
          }

        }

        if (options.position === 'left') {
          coordinates.x = + target.getBoundingClientRect().x - portalBox.width + scrollWidth
          coordinates.y = target.getBoundingClientRect().y + scrollTop
        }
        return coordinates
      }

      function setPosition() {
        portalBox.el.style.left = coordinates.x + 'px';
        portalBox.el.style.top = coordinates.y + 'px';
      }

      window.addEventListener('resize', function () {
        portalBox.el.classList.remove('open');
        calcPosition(target);
        setPosition();
      });

      target.addEventListener('click', function () {
        calcPosition(target);
        setPosition();
        portalBox.el.classList.toggle('open');
      });



  }


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






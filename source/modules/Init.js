let Init = function(targetButton) {

  this.renderTarget = function() {
    try {
      let target = document.querySelector(targetButton);
      target.className = "button-open-portal";
      return target;

    }
    catch (error) {
      console.error('Target is not detected, check option "target" or your HTML');
    }
  };

  this.renderTriangle = function (portalBox) {
    let triangle = document.createElement("div")
    portalBox.appendChild(triangle);
    return triangle
  }

  this.renderPortalBox = function(target) {
    try {
      let portal = document.querySelector(target.dataset.portal);
       portal.className = "portal-box";
       portal.style = "position: absolute;";
      return portal;
    }
    catch (error) {
      console.error('Check in your html data atribute "data-portal", content not found');
    }

  };
};
export { Init }

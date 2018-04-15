let Init = function(targetButton) {
  this.renderTarget = function() {

    let target = document.querySelector(targetButton);
    if (!target) {
      return
    }
    target.classList.add("button-open-portal")
    return target;


  };

  this.renderTriangle = function (portalBox) {
    let triangle = document.createElement("div")
    portalBox.appendChild(triangle);
    return triangle
  }

  this.renderPortalBox = function(target) {
    let body = document.querySelector('body');
    let portal = document.querySelector(target.dataset.portal);
    if (!portal) {
      return
    }
    portal.className = "portal-box";
    portal.style = "position: absolute;";
    body.appendChild(portal)
    return portal;
  };
};
export { Init }

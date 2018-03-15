let Init = function(targetButton) {


  this.renderPreview = function() {
    let targetPreview = document.createElement("div");
    targetPreview.className = "button-open-portal";
    targetPreview.innerHTML = "Portal";
    targetPreview.setAttribute("data-portal", ".portal-preview");
    let portalBoxPreview = document.createElement("div");
    portalBoxPreview.className = "portal-box";
    portalBoxPreview.innerHTML = "This is Portal preview"
    portalBoxPreview.classList.add("portal-preview");
    document.body.appendChild(portalBoxPreview);
    document.body.appendChild(targetPreview);

    return targetPreview;
  };

  this.renderTarget = function() {
    let target = document.querySelector(targetButton);
    if (target === null) {
      console.error(
        'Target is not detected, check option "target" or your HTML'
      );
      return false;
    }

    target.className = "button-open-portal";
    return target;
  };

  this.renderTriangle = function (where) {
    let triangle = document.createElement("div");
    where.appendChild(triangle);
    return triangle
  }

  this.renderPortalBox = function(target) {
    let portal = document.querySelector(target.dataset.portal);

    if (portal === null) {
      console.error(
        'Check in your html data atribute "data-portal", content not found'
      );
      return false;
    }
    portal.className = "portal-box";
    portal.style = "position: absolute;"
    return portal;
  };
};
export { Init }

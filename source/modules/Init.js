let Init = function (target) {
  if (target === null) {
    console.error('Target is not detected, check option "target" or your HTML');
    return;
  }

  target.className = "button-open-portal";
  const content = target.dataset.portal;
  const portalBox = document.querySelector(content);

  if (portalBox === null) {
    console.error(
      'Check in your html data atribute "data-portal", content not found'
    );
    return;
  }

  portalBox.className = "portal-box";
  portalBox.style = "width: 100%";
  return portalBox;
}
export { Init }

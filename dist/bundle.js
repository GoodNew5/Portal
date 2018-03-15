/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/main.js":
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test.js */ \"./source/test.js\");\n/* harmony import */ var _modules_RenderTriangleDirections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/RenderTriangleDirections */ \"./source/modules/RenderTriangleDirections.js\");\n/* harmony import */ var _modules_Init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Init */ \"./source/modules/Init.js\");\n/**\n *  @version 0.1\n *  @author Alexander Veselov\n *  @todo responsive\n *  @todo Portal Preview\n */\n\n\n\n\n\n\n\n\n\nfunction Portal (options) {\n\n  /**\n   * @param {node} target - Элемент-якорь относительно которого задана позиция\n   */\n  options = {\n    target: options.target,\n    triangle: options.triangle || false,\n    triangleSize: options.triangle ? options.triangleSize || 10 : 0,\n    position: options.position || \"bottom\",\n    hover: options.hover === undefined ? true : options.hover\n  };\n\n\n  const root = document.getElementsByTagName(\"html\")[0];\n  const rootTop = root.clientTop;\n  const rootLeft = root.clientLeft;\n  const rootRight = root.clientRight;\n  const InitPortal = new _modules_Init__WEBPACK_IMPORTED_MODULE_2__[\"Init\"](options.target);\n  const target = options.target === undefined ? InitPortal.renderPreview() : InitPortal.renderTarget();\n\n  if (!target) {\n    return\n  }\n\n  const portalBox = InitPortal.renderPortalBox(target);\n\n  if (!portalBox) {\n    return\n  }\n\n  let triangle = options.triangle ? InitPortal.renderTriangle(portalBox) : null\n\n\n  let sizes = getSize(portalBox, target, root);\n\n\n\n  function getSize(portalBox, target, root) {\n    let sizes = {\n      root: {\n        height: root.offsetHeight\n      },\n      box: {\n        width: portalBox.offsetWidth,\n        height: portalBox.offsetHeight\n      },\n      target: {\n        width: target.offsetWidth,\n        height: target.offsetHeight\n      },\n      triangle: {\n        width: options.triangleSize,\n        height: options.triangleSize\n      }\n    };\n\n    return sizes;\n  }\n\n  function getPosition(target, sizes) {\n    const scrollTop = window.pageYOffset;\n    const scrollWidth = window.pageXOffset;\n    const coordinates = {};\n    const borderLeftWidth = computedBordersWidth(getComputedStyle(target.offsetParent).borderLeftWidth);\n    const borderTopWidth = computedBordersWidth(getComputedStyle(target.offsetParent).borderTopWidth);\n    const targetTop = target.getBoundingClientRect().top  - target.offsetParent.getBoundingClientRect().top - borderTopWidth - scrollTop;\n    const targetLeft = target.getBoundingClientRect().left - target.offsetParent.getBoundingClientRect().left - borderLeftWidth - scrollWidth;\n    const heightCase = sizes.target.height > sizes.box.height;\n\n    options.triangle ? coordinates.tr = {} : null\n\n    function alignedTriangleY(element) {\n      return element.height / 2 - sizes.triangle.height;\n    }\n\n    function alignedYCase1() {\n      if (heightCase) {\n        return coordinates.tr.y = alignedTriangleY(sizes.box);\n      }\n    }\n    function computedBordersWidth(border) {\n      const width = Number(border.match(/\\d+/, \"\"))\n\n      return width\n    }\n\n\n\n    function arrangeBottom() {\n      coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth;\n      coordinates.y = targetTop + sizes.target.height + scrollTop + sizes.triangle.height;\n\n      if (options.triangle) {\n        coordinates.tr.y = -sizes.triangle.height;\n        coordinates.tr.x = 0;\n        triangle.style = Object(_modules_RenderTriangleDirections__WEBPACK_IMPORTED_MODULE_1__[\"RenderTriangleDirections\"])(\"bottom\", options.triangleSize);\n      }\n\n      if (coordinates.y + sizes.box.height > sizes.root.height) {\n        return false;\n      }\n\n      return true;\n    }\n\n    function arrangeRight() {\n      coordinates.x = targetLeft + sizes.target.width + sizes.triangle.width + scrollWidth;\n      coordinates.y = targetTop + scrollTop\n\n      if (options.triangle) {\n        coordinates.tr.x = -sizes.triangle.width;\n        coordinates.tr.y = alignedTriangleY(sizes.target);\n        alignedYCase1();\n        triangle.style = Object(_modules_RenderTriangleDirections__WEBPACK_IMPORTED_MODULE_1__[\"RenderTriangleDirections\"])(\"left\", options.triangleSize);\n      }\n      if ((coordinates.x + borderLeftWidth) + sizes.box.width > target.offsetParent.offsetWidth) {\n        return false;\n      }\n      return true;\n    }\n\n    function arrangeLeft() {\n      coordinates.x = targetLeft - sizes.box.width - sizes.triangle.width + scrollWidth;\n      coordinates.y = targetTop + scrollTop\n\n      if (options.triangle) {\n        coordinates.tr.x = sizes.box.width;\n        coordinates.tr.y = alignedTriangleY(sizes.target);\n        alignedYCase1();\n        triangle.style = Object(_modules_RenderTriangleDirections__WEBPACK_IMPORTED_MODULE_1__[\"RenderTriangleDirections\"])(\"right\", options.triangleSize);\n      }\n\n      if (coordinates.x < rootLeft) {\n        return false;\n      }\n      return true;\n    }\n\n    function arrangeTop() {\n      coordinates.y = targetTop + scrollTop - sizes.box.height - sizes.triangle.height;\n      coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2 + scrollWidth\n\n      if (options.triangle) {\n        coordinates.tr.y = sizes.box.height\n        coordinates.tr.x = 0;\n        triangle.style = Object(_modules_RenderTriangleDirections__WEBPACK_IMPORTED_MODULE_1__[\"RenderTriangleDirections\"])(\"top\", options.triangleSize);\n      }\n\n      if (coordinates.y < rootTop) {\n        return false;\n      }\n\n      return true;\n    }\n\n    function conductor() {\n\n      if (options.position === \"left\" || options.position === \"right\") {\n        let xPositions = [arrangeLeft, arrangeRight];\n\n        xPositions.forEach(function() {\n\n          if (!xPositions[0]()) {\n            console.log(\"over left\")\n            return xPositions[1]();\n          }\n\n          if (!xPositions[1]()) {\n             console.log(\"over right\");\n            return xPositions[0]();\n          }\n\n          if (options.position === \"left\") {\n            return xPositions[0]();\n          }\n\n          if (options.position === \"right\") {\n            return xPositions[1]();\n          }\n        });\n      }\n\n      if (options.position === \"top\" || options.position === \"bottom\") {\n        let yPositions = [arrangeTop, arrangeBottom];\n\n        yPositions.forEach(function() {\n          if (!yPositions[0]()) {\n            return yPositions[1]();\n          }\n\n          if (!yPositions[1]()) {\n            return yPositions[0]();\n          }\n\n          if (options.position === \"bottom\") {\n            return yPositions[1]();\n          }\n\n          if (options.position === \"top\") {\n            return yPositions[0]();\n          }\n        });\n      }\n    }\n\n    conductor();\n    return coordinates;\n  }\n\n  function setPosition(coordinates, portalBox, triangle) {\n    portalBox.style.top = 0\n    portalBox.style.left = 0\n    portalBox.style.transform = \"translate(\" + coordinates.x + \"px\" + \",\" + coordinates.y + \"px\" + \")\"\n\n\n    if (options.triangle) {\n      triangle.style.top = coordinates.tr.y + \"px\";\n      triangle.style.left = coordinates.tr.x + \"px\";\n    }\n  }\n   function showPortal() {\n\n     if (!options.hover) {\n       portalBox.classList.toggle(\"open\");\n     }\n\n     else {\n       portalBox.classList.add(\"open\");\n     }\n   }\n\n   function hiddenPortal(event) {\n    // for click\n    function removeClass() {\n      portalBox.classList.remove(\"open\");\n    }\n\n    if (!options.hover) {\n      if (!target.contains(event.target) && event.target != portalBox && !portalBox.contains(event.target)) {\n        removeClass()\n      }\n    }\n\n    else {\n      if (!(portalBox.contains(event.relatedTarget))) {\n        removeClass();\n      }\n    }\n   }\n\n  let eventsForShow = !options.hover ? \"click\" : \"mouseover\"\n  let eventsForHidden = !options.hover ? \"click\" : \"mouseout\"\n\n\n  window.addEventListener(\"resize\", displacement);\n  document.addEventListener(\"DOMContentLoaded\", ready);\n\n  target.addEventListener(eventsForShow, displacement);\n  window.addEventListener(eventsForHidden, hiddenPortal);\n\n  function ready() {\n\n    let sizes = getSize(portalBox, target, root);\n    draw(sizes);\n  }\n\n  function draw(sizes) {\n    let coordinates = getPosition(target, sizes);\n    setPosition(coordinates, portalBox, triangle);\n  }\n\n  function displacement(event) {\n    let sizes = getSize(portalBox, target, root);\n\n    draw(sizes);\n    event.type != \"resize\" ? showPortal() : false;\n  }\n};;\n\n\n\nfunction User() {\n  let a = 2;\n  this.name = \"Alex\"\n  console.log(this)\n}\n\nlet user = new User();\n// console.log(user.name)\n// function remove(node) {\n//   var el = document.querySelector(node);\n//   document.body.removeChild(el);\n// }\n\n\nconst PortalRight = new Portal({\n  target: \".button-2\",\n  position: \"right\",\n  triangle: true,\n  hover: false\n});\n\n// // // PortalRight.test('Alex')\n\nconst PortalTop = new Portal({\n  target: '.button-5',\n  position: 'top',\n  triangle: true\n});\n\n// const PortalTopNew = new Portal({\n//   target: '.button-4',\n//   position: 'top',\n//   triangle: false\n// });\n\n// const PortalBottom = new Portal({\n//   target: \".button-3\",\n//   position: \"bottom\",\n//   triangle: true\n// });\n\nconst PortalLeft = new Portal({\n  triangle: true,\n  position: 'left',\n  hover: false,\n  target: \"#custom-button\"\n});\n\n// const PortalPreview = new Portal({\n//   position: 'top',\n//   triangle: true\n// });\n\n\n\n\nfunction shuffleRandom(nodes) {\n  let elements = document.querySelectorAll(nodes)\n  let max = 2000;\n  let min = 200;\n  elements.forEach(element => {\n    element.style = \"margin-left:\" + Math.random() * (max - min) + min + \"px\";\n  });\n}\n\nshuffleRandom(\".button-open-portal\");\n\nfunction getSize(node) {\n  let el = document.getElementById(node)\n  let sizes = {\n    width: el.offsetWidth,\n    height: el.offsetHeight,\n  }\n  console.log(sizes)\n}\n\n// getSize(\"custom-button\");\n\n//# sourceURL=webpack:///./source/main.js?");

/***/ }),

/***/ "./source/modules/Init.js":
/*!********************************!*\
  !*** ./source/modules/Init.js ***!
  \********************************/
/*! exports provided: Init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Init\", function() { return Init; });\nlet Init = function(targetButton) {\n\n\n  this.renderPreview = function() {\n    let targetPreview = document.createElement(\"div\");\n    targetPreview.className = \"button-open-portal\";\n    targetPreview.innerHTML = \"Portal\";\n    targetPreview.setAttribute(\"data-portal\", \".portal-preview\");\n    let portalBoxPreview = document.createElement(\"div\");\n    portalBoxPreview.className = \"portal-box\";\n    portalBoxPreview.innerHTML = \"This is Portal preview\"\n    portalBoxPreview.classList.add(\"portal-preview\");\n    document.body.appendChild(portalBoxPreview);\n    document.body.appendChild(targetPreview);\n\n    return targetPreview;\n  };\n\n  this.renderTarget = function() {\n    let target = document.querySelector(targetButton);\n    if (target === null) {\n      console.error(\n        'Target is not detected, check option \"target\" or your HTML'\n      );\n      return false;\n    }\n\n    target.className = \"button-open-portal\";\n    return target;\n  };\n\n  this.renderTriangle = function (where) {\n    let triangle = document.createElement(\"div\");\n    where.appendChild(triangle);\n    return triangle\n  }\n\n  this.renderPortalBox = function(target) {\n    let portal = document.querySelector(target.dataset.portal);\n\n    if (portal === null) {\n      console.error(\n        'Check in your html data atribute \"data-portal\", content not found'\n      );\n      return false;\n    }\n    portal.className = \"portal-box\";\n    portal.style = \"position: absolute;\"\n    return portal;\n  };\n};\n\n\n\n//# sourceURL=webpack:///./source/modules/Init.js?");

/***/ }),

/***/ "./source/modules/RenderTriangleDirections.js":
/*!****************************************************!*\
  !*** ./source/modules/RenderTriangleDirections.js ***!
  \****************************************************/
/*! exports provided: RenderTriangleDirections */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RenderTriangleDirections\", function() { return RenderTriangleDirections; });\nlet RenderTriangleCSS = function(direction, size) {\n  if (direction === \"left\") {\n    return `\n      width: 0;\n      height: 0;\n      border-top: ${size + \"px\"} solid transparent;\n      border-right: ${size + \"px\"} solid black;\n      border-bottom: ${size + \"px\"} solid transparent;\n      position: absolute;\n    `;\n  }\n  if (direction === \"right\") {\n    return `\n      width: 0;\n      height: 0;\n      border-top:  ${size + \"px\"} solid transparent;\n      border-bottom: ${size + \"px\"} solid transparent;\n      border-left:  ${size + \"px\"}  solid black;\n      position: absolute;\n    `;\n  }\n  if (direction === \"top\") {\n    return `\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-left:  ${size + \"px\"} solid transparent;\n      border-right:  ${size + \"px\"}  solid transparent;\n      border-top:  ${size + \"px\"} solid black;\n      left: 0;\n      right: 0;\n      margin-left: auto;\n      margin-right: auto;\n    `;\n  }\n  if (direction === \"bottom\") {\n    return `\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-left:  ${size + \"px\"} solid transparent;\n      border-right:  ${size + \"px\"}  solid transparent;\n      border-bottom:  ${size + \"px\"} solid black;\n      margin-left: auto;\n      margin-right: auto;\n      left: 0;\n      right: 0;\n    `;\n  }\n};\n\nlet RenderTriangleDirections = function (position, size) {\n\n  let directions = [];\n  let positions = [\"left\", \"right\", \"top\", \"bottom\"];\n\n  positions.forEach(item => {\n    directions.push(RenderTriangleCSS(item, size));\n  });\n\n  let triangles = {\n    left: directions[0],\n    right: directions[1],\n    top: directions[2],\n    bottom: directions[3]\n  };\n\n  return triangles[position];\n}\n\n\n//# sourceURL=webpack:///./source/modules/RenderTriangleDirections.js?");

/***/ }),

/***/ "./source/test.js":
/*!************************!*\
  !*** ./source/test.js ***!
  \************************/
/*! exports provided: moduleA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moduleA\", function() { return moduleA; });\nlet moduleA = function a() {\n  return alert()\n}\n\n\n//# sourceURL=webpack:///./source/test.js?");

/***/ })

/******/ });
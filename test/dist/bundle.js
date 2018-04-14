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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Portal.js":
/*!***********************!*\
  !*** ./src/Portal.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Portal; });\n/* harmony import */ var _modules_Triangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Triangle */ \"./src/modules/Triangle.js\");\n/* harmony import */ var _modules_Init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Init */ \"./src/modules/Init.js\");\n/* harmony import */ var _modules_setPosition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/setPosition */ \"./src/modules/setPosition.js\");\n/**\n *  @version 0.2\n *  @author Alexander Veselov\n *  @todo responsive\n *\n */\n\n\n\n\n\n\n\n\n\n\nfunction Portal (options) {\n\n  /**\n   * @param {node} target - Элемент-якорь относительно которого задана позиция\n   */\n  options = {\n    target: options.target,\n    triangle: options.triangle || false,\n    triangleSize: options.triangle ? options.triangleSize || 10 : 0,\n    positions: options.positions || [\"bottom\"],\n    hover: options.hover === undefined ? true : options.hover\n  };\n\n  const InitPortal = new _modules_Init__WEBPACK_IMPORTED_MODULE_1__[\"Init\"](options.target);\n  const target = InitPortal.renderTarget();\n\n  if (!target) {\n    return\n  }\n\n  const root = target.offsetParent\n  const rootLeft = root.clientLeft;\n  const rootTop = root.clientTop;\n  const portalBox = InitPortal.renderPortalBox(target);\n\n  if (!portalBox) {\n    return\n  }\n\n  let triangle = options.triangle ? InitPortal.renderTriangle(portalBox) : null\n\n\n  const sizes = getSize(portalBox, target, root);\n\n  function getSize(portalBox, target, root) {\n    let sizes = {\n      root: {\n        height: root.clientHeight,\n        width: root.clientWidth\n      },\n      box: {\n        width: portalBox.offsetWidth,\n        height: portalBox.offsetHeight\n      },\n      target: {\n        width: target.offsetWidth,\n        height: target.offsetHeight\n      },\n      triangle: {\n        width: options.triangleSize,\n        height: options.triangleSize\n      }\n    };\n\n    return sizes;\n  }\n\n  function placement(target, sizes) {\n    const coordinates = {};\n    const scrollTop = window.pageYOffset\n    const scrollLeft = window.pageXOffset\n    const heightCase = sizes.target.height > sizes.box.height;\n    const getCoords = (el) => el.getBoundingClientRect()\n    const displayTriangle = options.triangle\n\n    options.triangle ? coordinates.tr = {} : null\n\n    function alignedTriangleY(element) {\n      return element.height / 2 - sizes.triangle.height;\n    }\n\n    function alignedYCase1() {\n      if (heightCase) {\n        return coordinates.tr.y = alignedTriangleY(sizes.box);\n      }\n    }\n\n\n\n    function arrangeBottom() {\n      coordinates.x = getCoords(target).left - (sizes.box.width - sizes.target.width) / 2 + scrollLeft\n      coordinates.y =  getCoords(target).bottom + sizes.triangle.height + scrollTop\n\n      if (displayTriangle) {\n        coordinates.tr.y = -sizes.triangle.height;\n        coordinates.tr.x = 0;\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"bottom\", options.triangleSize);\n      }\n\n      if (coordinates.y + sizes.box.height > sizes.root.height) {\n        return false;\n      }\n\n      if (coordinates.x < rootLeft) {\n        if (displayTriangle) {\n          coordinates.tr.x = sizes.target.width / 2 - sizes.triangle.width\n          triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"bottom\", options.triangleSize, false)\n        }\n        coordinates.x =  getCoords(target).left + scrollLeft\n\n      }\n\n      return true;\n    }\n\n    function arrangeTop() {\n      coordinates.y = getCoords(target).top - sizes.box.height - sizes.triangle.height + scrollTop;\n      coordinates.x = getCoords(target).left - (sizes.box.width - sizes.target.width) / 2 + scrollLeft;\n\n      if (displayTriangle) {\n        coordinates.tr.y = sizes.box.height\n        coordinates.tr.x = 0;\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"top\", options.triangleSize);\n      }\n\n      if (sizes.box.height + sizes.triangle.height > getCoords(target).top) {\n        return false;\n      }\n\n      if (coordinates.x < rootLeft ) {\n        if (displayTriangle) {\n          coordinates.tr.x = sizes.target.width / 2 - sizes.triangle.width\n          triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"top\", options.triangleSize, false);\n        }\n        coordinates.x =  getCoords(target).left + scrollLeft\n      }\n\n      return true\n    }\n\n\n    function arrangeRight() {\n      coordinates.x =  getCoords(target).right + sizes.triangle.width + scrollLeft\n      coordinates.y =  getCoords(target).top + scrollTop\n\n      if (displayTriangle) {\n        coordinates.tr.x = -sizes.triangle.width;\n        coordinates.tr.y = alignedTriangleY(sizes.target);\n        alignedYCase1();\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"left\", options.triangleSize);\n      }\n\n      if (coordinates.x + sizes.box.width > sizes.root.width || scrollTop > coordinates.y) {\n        return false;\n      }\n\n      return true;\n    }\n\n    function arrangeLeft() {\n      coordinates.x = getCoords(target).left - sizes.box.width - sizes.triangle.width + scrollLeft\n      coordinates.y = getCoords(target).top + scrollTop\n\n      if (displayTriangle) {\n        coordinates.tr.x = sizes.box.width;\n        coordinates.tr.y = alignedTriangleY(sizes.target);\n        alignedYCase1();\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"right\", options.triangleSize);\n      }\n\n      if (coordinates.x < rootLeft || scrollTop > coordinates.y) {\n        return false;\n      }\n\n      return true\n    }\n\n    function conductor() {\n\n      let positionsMap = []\n\n      options.positions.forEach((i) => {\n\n        switch (i) {\n          case 'left':\n            positionsMap.push(arrangeLeft)\n            break;\n          case 'right':\n            positionsMap.push(arrangeRight)\n            break;\n          case 'top':\n            positionsMap.push(arrangeTop)\n            break;\n          case 'bottom':\n            positionsMap.push(arrangeBottom)\n            break;\n          default:\n            break;\n        }\n      })\n\n      positionsMap.some((i) => i())\n    }\n\n    conductor();\n    return coordinates;\n  }\n\n\n  function showPortal() {\n\n     if (!options.hover) {\n       portalBox.classList.toggle(\"open\");\n     }\n\n     else {\n       portalBox.classList.add(\"open\");\n     }\n   }\n\n   function hiddenPortal(event) {\n    // for click\n    function removeClass() {\n      portalBox.classList.remove(\"open\");\n    }\n\n    if (!options.hover) {\n      if (!target.contains(event.target) && event.target != portalBox && !portalBox.contains(event.target)) {\n        removeClass()\n      }\n    }\n\n    else {\n      if (!(portalBox.contains(event.relatedTarget))) {\n        removeClass();\n      }\n    }\n   }\n\n  const eventsForShow = !options.hover ? \"click\" : \"mouseover\"\n  const eventsForHidden = !options.hover ? \"click\" : \"mouseout\"\n\n\n  window.addEventListener(\"resize\", displacement);\n  document.addEventListener(\"DOMContentLoaded\", displacement);\n  target.addEventListener(eventsForShow, displacement);\n  window.addEventListener(eventsForHidden, hiddenPortal);\n\n  function draw(sizes) {\n    let coordinates = placement(target, sizes);\n    Object(_modules_setPosition__WEBPACK_IMPORTED_MODULE_2__[\"setPosition\"])(coordinates, portalBox, triangle);\n  }\n\n  function displacement(event) {\n    let sizes = getSize(portalBox, target, root);\n    draw(sizes);\n\n    if (!(event.type === \"resize\" || event.type === \"DOMContentLoaded\")) {\n      showPortal()\n    }\n  }\n};\n\n\n//# sourceURL=webpack:///./src/Portal.js?");

/***/ }),

/***/ "./src/modules/Init.js":
/*!*****************************!*\
  !*** ./src/modules/Init.js ***!
  \*****************************/
/*! exports provided: Init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Init\", function() { return Init; });\nlet Init = function(targetButton) {\n\n  this.renderTarget = function() {\n\n    let target = document.querySelector(targetButton);\n    if (!target) {\n      return\n    }\n    target.classList.add(\"button-open-portal\")\n    return target;\n\n\n  };\n\n  this.renderTriangle = function (portalBox) {\n    let triangle = document.createElement(\"div\")\n    portalBox.appendChild(triangle);\n    return triangle\n  }\n\n  this.renderPortalBox = function(target) {\n\n    let portal = document.querySelector(target.dataset.portal);\n    if (!portal) {\n      return\n    }\n    portal.className = \"portal-box\";\n    portal.style = \"position: absolute;\";\n    return portal;\n\n  };\n};\n\n\n\n//# sourceURL=webpack:///./src/modules/Init.js?");

/***/ }),

/***/ "./src/modules/Triangle.js":
/*!*********************************!*\
  !*** ./src/modules/Triangle.js ***!
  \*********************************/
/*! exports provided: Triangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Triangle\", function() { return Triangle; });\nconst Triangle = function (direction, size, horizontalAlignment) {\n   let hAlignment = horizontalAlignment === undefined ? true : horizontalAlignment;\n   let baseStyle = `\n    width: 0;\n    height: 0;\n    position: absolute;\n  `;\n\n   if (direction === \"left\") {\n     return `\n      ${baseStyle}\n      border-right: ${size + \"px\"} solid black;\n      border-top: ${size + \"px\"} solid transparent;\n      border-bottom: ${size + \"px\"} solid transparent;\n    `;\n   }\n   if (direction === \"right\") {\n     return `\n      ${baseStyle}\n      border-top:  ${size + \"px\"} solid transparent;\n      border-left:  ${size + \"px\"}  solid black;\n      border-bottom: ${size + \"px\"} solid transparent;\n    `;\n   }\n   if (direction === \"top\") {\n     return `\n      ${baseStyle}\n      border-left:  ${size + \"px\"} solid transparent;\n      border-right:  ${size + \"px\"}  solid transparent;\n      border-top:  ${size + \"px\"} solid black;\n      left: 0;\n      right: 0;\n      ${hAlignment ? \"margin-left: auto\" : null};\n      ${hAlignment ? \"margin-right: auto\" : null};\n    `;\n   }\n   if (direction === \"bottom\") {\n     return `\n      ${baseStyle}\n      border-left:  ${size + \"px\"} solid transparent;\n      border-right:  ${size + \"px\"}  solid transparent;\n      border-bottom:  ${size + \"px\"} solid black;\n      ${hAlignment ? \"margin-left: auto\" : null};\n      ${hAlignment ? \"margin-right: auto\" : null};\n      left: 0;\n      right: 0;\n    `;\n   }\n}\n\n\n//# sourceURL=webpack:///./src/modules/Triangle.js?");

/***/ }),

/***/ "./src/modules/setPosition.js":
/*!************************************!*\
  !*** ./src/modules/setPosition.js ***!
  \************************************/
/*! exports provided: setPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setPosition\", function() { return setPosition; });\nconst setPosition = (coordinates, portalBox, triangle) => {\n  portalBox.style.top = 0\n  portalBox.style.left = 0\n  portalBox.style.transform = `translate(${coordinates.x}px, ${coordinates.y}px)`\n\n  if (triangle) {\n    triangle.style.top = coordinates.tr.y + \"px\";\n    triangle.style.left = coordinates.tr.x + \"px\";\n  }\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/setPosition.js?");

/***/ }),

/***/ "./test/app.js":
/*!*********************!*\
  !*** ./test/app.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_Portal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/Portal */ \"./src/Portal.js\");\n\n\n\n\n\nconst PortalTop = new _src_Portal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  target: '.button-5',\n  positions: ['top', 'right', 'bottom'],\n  triangle: true\n});\n\n\nconst PortalTopNew = new _src_Portal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  target: '.button-4',\n  positions: ['right', 'bottom'],\n  triangle: true\n});\n\nconst PortalBottom = new _src_Portal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  target: \".button-3\",\n  positions: ['left'],\n  triangle: false\n});\n\nconst PortalLeft = new _src_Portal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  triangle: true,\n  positions: ['top', 'right', 'bottom'],\n  hover: false,\n  target: \"#custom-button\"\n});\n\nconst test = new _src_Portal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  triangle: true,\n  positions: ['top', 'bottom'],\n  hover: false,\n  target: \".button-2\"\n});\n\nconst PortalPreview = new _src_Portal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  positions: ['top'],\n  triangle: true\n});\n\n\nfunction shuffleRandom(nodes) {\n  let elements = document.querySelectorAll(nodes)\n  let max = 2800;\n  let min = 1000;\n  elements.forEach(element => {\n    element.style = \"margin-left:\" + Math.random() * (max - min) + min + \"px\";\n  });\n}\n\n// shuffleRandom(\".button-open-portal\");\n\n\n\n//# sourceURL=webpack:///./test/app.js?");

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./test/app.js ./src/Portal.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./test/app.js */\"./test/app.js\");\nmodule.exports = __webpack_require__(/*! ./src/Portal.js */\"./src/Portal.js\");\n\n\n//# sourceURL=webpack:///multi_./test/app.js_./src/Portal.js?");

/***/ })

/******/ });
!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);let o=function(t,e){let n=[];return["left","right","top","bottom"].forEach(t=>{n.push(function(t,e){return"left"===t?`\n      width: 0;\n      height: 0;\n      border-top: ${e+"px"} solid transparent;\n      border-right: ${e+"px"} solid black;\n      border-bottom: ${e+"px"} solid transparent;\n      position: absolute;\n    `:"right"===t?`\n      width: 0;\n      height: 0;\n      border-top:  ${e+"px"} solid transparent;\n      border-bottom: ${e+"px"} solid transparent;\n      border-left:  ${e+"px"}  solid black;\n      border-right:  ${e+"px"} solid transparent;\n      position: absolute;\n    `:"top"===t?`\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-left:  ${e+"px"} solid transparent;\n      border-right:  ${e+"px"}  solid transparent;\n      border-bottom:  ${e+"px"}  solid transparent;\n      border-top:  ${e+"px"} solid black;\n      left: 0;\n      right: 0;\n      margin-left: auto;\n      margin-right: auto;\n    `:"bottom"===t?`\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-left:  ${e+"px"} solid transparent;\n      border-right:  ${e+"px"}  solid transparent;\n      border-bottom:  ${e+"px"} solid black;\n      margin-left: auto;\n      margin-right: auto;\n      left: 0;\n      right: 0;\n    `:void 0}(t,e))}),{left:n[0],right:n[1],top:n[2],bottom:n[3]}[t]},i=function(t){if(null===t)return console.error('Target is not detected, check option "target" or your HTML'),!1;t.className="button-open-portal";const e=t.dataset.portal,n=document.querySelector(e);return null===n?(console.error('Check in your html data atribute "data-portal", content not found'),!1):(n.className="portal-box",n.style="width: 100%",n)};function r(t){t={target:t.target,triangle:t.triangle||!1,triangleSize:t.triangle?t.triangleSize||10:0,position:t.position||"bottom"};const e=document.querySelector(t.target),n=document.getElementsByTagName("html")[0],r=n.clientTop,a=n.clientLeft;n.clientRight;let l;const g=i(e);if(!g)return;s(g,e,n);if(t.triangle){let t=document.createElement("div");l=g.appendChild(t)}function s(e,n,o){return{root:{height:o.offsetHeight,width:o.offsetWidth},box:{width:e.offsetWidth,height:e.offsetHeight},target:{width:n.offsetWidth,height:n.offsetHeight},triangle:{width:t.triangleSize,height:t.triangleSize}}}function h(n){!function(e,n,o){n.style.left=e.x+"px",n.style.top=e.y+"px",t.triangle&&(o.style.top=e.tr.y+"px",o.style.left=e.tr.x+"px")}(function(e,n){const i=window.pageYOffset,g=window.pageXOffset,s={},h=e.getBoundingClientRect().top,d=e.getBoundingClientRect().left,u=n.target.height>n.box.height;function p(t){return t.height/2-n.triangle.height}function c(){if(u)return s.tr.y=p(n.box)}function f(){return s.x=d-(n.box.width-n.target.width)/2+g,s.y=h+n.target.height+i+n.triangle.height,t.triangle&&(s.tr.y=-n.triangle.height,s.tr.x=0,l.style=o("bottom",t.triangleSize)),!(s.y+n.box.height>n.root.height)}function b(){return s.x=d+n.target.width+n.triangle.width+g,s.y=h+i,t.triangle&&(s.tr.x=-n.triangle.width,s.tr.y=p(n.target),c(),l.style=o("left",t.triangleSize)),!(s.x+n.box.width>n.root.width)}function x(){return s.x=d-n.box.width-n.triangle.width+g,s.y=h+i,t.triangle&&(s.tr.x=n.box.width,s.tr.y=p(n.target),c(),l.style=o("right",t.triangleSize)),!(s.x<a)}function w(){return s.y=h+i-n.box.height-n.triangle.height,s.x=d-(n.box.width-n.target.width)/2+g,t.triangle&&(s.tr.y=n.box.height,s.tr.x=0,l.style=o("top",t.triangleSize)),!(s.y<r)}return t.triangle&&(s.tr={}),function(){if("left"===t.position||"right"===t.position){let e=[x,b];e.forEach(function(){return e[0]()?e[1]()?"left"===t.position?e[0]():"right"===t.position?e[1]():void 0:e[0]():e[1]()})}if("top"===t.position||"bottom"===t.position){let e=[w,f];e.forEach(function(){return e[0]()?e[1]()?"bottom"===t.position?e[1]():"top"===t.position?e[0]():void 0:e[0]():e[1]()})}}(),s}(e,n),g,l)}function d(t){h(s(g,e,n)),"resize"!=t.type&&g.classList.toggle("open")}window.addEventListener("resize",d),e.addEventListener("click",d),document.addEventListener("DOMContentLoaded",function(){h(s(g,e,n))}),window.addEventListener("click",function(t){t.target==e||e.contains(t.target)||t.target==g||g.contains(t.target)||g.classList.remove("open")})}new function(){this.name="Alex",console.log(this)};new r({target:".button-2",position:"right",triangle:!0}),new r({target:".button-5FF",position:"top",triangle:!0}),new r({target:".button-4",position:"top",triangle:!0}),new r({target:".button-3",position:"bottom",triangle:!0}),new r({triangle:!0,target:"#custom-button",position:"left"})}]);
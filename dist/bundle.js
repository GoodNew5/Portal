!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);let o=function(t,e){let n=[];return["left","right","top","bottom"].forEach(t=>{n.push(function(t,e){return"left"===t?`\n      width: 0;\n      height: 0;\n      border-top: ${e+"px"} solid transparent;\n      border-right: ${e+"px"} solid black;\n      border-bottom: ${e+"px"} solid transparent;\n      position: absolute;\n    `:"right"===t?`\n      width: 0;\n      height: 0;\n      border-top:  ${e+"px"} solid transparent;\n      border-bottom: ${e+"px"} solid transparent;\n      border-left:  ${e+"px"}  solid black;\n      border-right:  ${e+"px"} solid transparent;\n      position: absolute;\n    `:"top"===t?`\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-left:  ${e+"px"} solid transparent;\n      border-right:  ${e+"px"}  solid transparent;\n      border-bottom:  ${e+"px"}  solid transparent;\n      border-top:  ${e+"px"} solid black;\n      left: 0;\n      right: 0;\n      margin-left: auto;\n      margin-right: auto;\n    `:"bottom"===t?`\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-left:  ${e+"px"} solid transparent;\n      border-right:  ${e+"px"}  solid transparent;\n      border-bottom:  ${e+"px"} solid black;\n      margin-left: auto;\n      margin-right: auto;\n      left: 0;\n      right: 0;\n    `:void 0}(t,e))}),{left:n[0],right:n[1],top:n[2],bottom:n[3]}[t]},r=function(t){this.renderPreview=function(){let t=document.createElement("div");t.className="button-open-portal",t.innerHTML="Portal",t.setAttribute("data-portal",".portal-preview");let e=document.createElement("div");return e.className="portal-box",e.innerHTML="This is Portal preview",e.classList.add("portal-preview"),document.body.appendChild(e),document.body.appendChild(t),t},this.renderTarget=function(){let e=document.querySelector(t);return null===e?(console.error('Target is not detected, check option "target" or your HTML'),!1):(e.className="button-open-portal",e)},this.renderPortalBox=function(t){let e=document.querySelector(t.dataset.portal);return null===e?(console.error('Check in your html data atribute "data-portal", content not found'),!1):(e.className="portal-box",e.style="width: 100%",e)}};function i(t){t={target:t.target,triangle:t.triangle||!1,triangleSize:t.triangle?t.triangleSize||10:0,position:t.position||"bottom"};const e=document.getElementsByTagName("html")[0],n=e.clientTop,i=e.clientLeft;e.clientRight;let a;const l=new r(t.target),s=void 0===t.target?l.renderPreview():l.renderTarget();if(!s)return;const d=l.renderPortalBox(s);if(!d)return;g(d,s,e);if(t.triangle){let t=document.createElement("div");a=d.appendChild(t)}function g(e,n,o){return{root:{height:o.offsetHeight,width:o.offsetWidth},box:{width:e.offsetWidth,height:e.offsetHeight},target:{width:n.offsetWidth,height:n.offsetHeight},triangle:{width:t.triangleSize,height:t.triangleSize}}}function p(e){!function(e,n,o){n.style.left=e.x+"px",n.style.top=e.y+"px",t.triangle&&(o.style.top=e.tr.y+"px",o.style.left=e.tr.x+"px")}(function(e,r){const l=window.pageYOffset,s=window.pageXOffset,d={},g=e.getBoundingClientRect().top,p=e.getBoundingClientRect().left,h=r.target.height>r.box.height;function u(t){return t.height/2-r.triangle.height}function c(){if(h)return d.tr.y=u(r.box)}function f(){return d.x=p-(r.box.width-r.target.width)/2+s,d.y=g+r.target.height+l+r.triangle.height,t.triangle&&(d.tr.y=-r.triangle.height,d.tr.x=0,a.style=o("bottom",t.triangleSize)),!(d.y+r.box.height>r.root.height)}function b(){return d.x=p+r.target.width+r.triangle.width+s,d.y=g+l,t.triangle&&(d.tr.x=-r.triangle.width,d.tr.y=u(r.target),c(),a.style=o("left",t.triangleSize)),!(d.x+r.box.width>r.root.width)}function x(){return d.x=p-r.box.width-r.triangle.width+s,d.y=g+l,t.triangle&&(d.tr.x=r.box.width,d.tr.y=u(r.target),c(),a.style=o("right",t.triangleSize)),!(d.x<i)}function w(){return d.y=g+l-r.box.height-r.triangle.height,d.x=p-(r.box.width-r.target.width)/2+s,t.triangle&&(d.tr.y=r.box.height,d.tr.x=0,a.style=o("top",t.triangleSize)),!(d.y<n)}return t.triangle&&(d.tr={}),function(){if("left"===t.position||"right"===t.position){let e=[x,b];e.forEach(function(){return e[0]()?e[1]()?"left"===t.position?e[0]():"right"===t.position?e[1]():void 0:e[0]():e[1]()})}if("top"===t.position||"bottom"===t.position){let e=[w,f];e.forEach(function(){return e[0]()?e[1]()?"bottom"===t.position?e[1]():"top"===t.position?e[0]():void 0:e[0]():e[1]()})}}(),d}(s,e),d,a)}function h(t){p(g(d,s,e)),"resize"!=t.type&&d.classList.toggle("open")}window.addEventListener("resize",h),s.addEventListener("click",h),document.addEventListener("DOMContentLoaded",function(){p(g(d,s,e))}),window.addEventListener("click",function(t){t.target==s||s.contains(t.target)||t.target==d||d.contains(t.target)||d.classList.remove("open")})}new function(){this.name="Alex",console.log(this)};new i({target:".button-2",position:"right",triangle:!0}),new i({target:".button-5",position:"top",triangle:!0}),new i({target:".button-4",position:"top",triangle:!0}),new i({target:".button-3",position:"bottom",triangle:!0}),new i({triangle:!0,position:"left",target:"#custom-button"}),new i({position:"top",triangle:!0})}]);
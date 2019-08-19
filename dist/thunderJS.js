var ThunderJS=function(){"use strict";function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),t.push.apply(t,o)}return t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=null;"undefined"!=typeof WebSocket?t=WebSocket:"undefined"!=typeof MozWebSocket?t=MozWebSocket:void 0!==e?t=e.WebSocket||e.MozWebSocket:"undefined"!=typeof window?t=window.WebSocket||window.MozWebSocket:"undefined"!=typeof self&&(t=self.WebSocket||self.MozWebSocket);function o(n){if("string"==typeof n)try{n=JSON.parse(n.normalize())}catch(e){}if(!n.id&&n.method){var e=u[n.method];e&&Array.isArray(e)&&e.length&&e.forEach(function(e){e(n.params)})}}function l(t){return new Promise(function(e,n){if(c)e(c);else try{s||((s=new i(function(e){return[e&&e.protocol||"ws://",e&&e.host||"localhost",":"+(e&&e.port||80),e&&e.endpoint||"/jsonrpc"].join("")}(t),"notification")).addEventListener("message",function(e){!function(e){if("string"==typeof e)try{e=JSON.parse(e.normalize())}catch(e){}if(e.id){var n=a[e.id];n?("result"in e?n.resolve(e.result):n.reject(e.error),delete a[e.id]):console.log("no pending request found with id "+e.id)}}(e.data)}),s.addEventListener("message",function(e){o(e.data)})),s.addEventListener("open",function(){o({method:"client.ThunderJS.events.connect"}),e(c=s)}),s.addEventListener("close",function(){o({method:"client.ThunderJS.events.disconnect"}),c=s=null})}catch(e){n(e)}})}function r(s){return{request:function(i,c,u){return new Promise(function(e,n){var t=p+=1,o=function(e,n,t){var o;return(o=t&&t.version)?o:e&&(e[n]||e.default)||1}(s.versions,i,u),r=function(e,n,t,o,r){o&&delete o.version;var i={jsonrpc:"2.0",id:e,method:[n,r,t].join(".")};return!o&&!1!==o||"object"===f(o)&&0===Object.keys(o).length||(i.params=o),i}(t,i,c,u,o);s.debug&&(console.log(" "),console.log("API REQUEST:"),console.log(JSON.stringify(r,null,2)),console.log(" ")),a[t]={body:r,resolve:e,reject:n},function(e,n){l(e).then(function(e){e.send(JSON.stringify(n))}).catch(console.error)}(s,r)})}}}var i=t,a={},u={},c=null,s=null,p=0,d={DeviceInfo:{freeRam:function(e){return this.call("systeminfo",e).then(function(e){return e.freeram})},version:function(e){return this.call("systeminfo",e).then(function(e){return e.version})}}};function h(n,t,e){var o=this,r=function(e,n,t){var o=y(e,n);if(!u[o]){u[o]=[];if(e!=="ThunderJS"){var r="register";var i=o.split(".").slice(0,-1).join(".");var c={event:n,id:i};this.api.request(e,r,c).then().catch()}}return u[o].push(t),u[o].length-1}.call(this,n,t,e);return{dispose:function(){var e=y(n,t);u[e].splice(r,1),0===u[e].length&&function(e,n){var t=y(e,n);if(delete u[t],"ThunderJS"!==e){var o="unregister";var r=t.split(".").slice(0,-1).join(".");var i={event:n,id:r};this.api.request(e,o,i)}}.call(o,n,t)}}}function y(e,n){return["client",e,"events",n].join(".")}var b,g=function t(e){return{options:e,plugin:!1,call:function(){var e=Array.prototype.slice.call(arguments);this.plugin&&e[0]!==this.plugin&&e.unshift(this.plugin);var n=e[0],t=e[1];return"function"==typeof this[n][t]?this[n][t](e[2]):this.api.request.apply(this,e)},registerPlugin:function(e,n){this[e]=v(Object.assign(Object.create(t),n,{plugin:e}))},subscribe:function(){},on:function(){var e=Array.prototype.slice.call(arguments);return-1<e[0].indexOf("connect","disconnect")?e.unshift("ThunderJS"):this.plugin&&e[0]!==this.plugin&&e.unshift(this.plugin),h.apply(this,e)},once:function(){console.log("todo ...")}}},v=function e(n){return new Proxy(n,{get:function(o,r){var i=o[r];return"api"===r?b:void 0!==i?"function"==typeof i?-1<["on","once","subscribe"].indexOf(r)?function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return i.apply(this,n)}:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(t,e){"object"===f(t)&&("object"!==f(t)||t.then&&"function"==typeof t.then)||(t=new Promise(function(e,n){t instanceof Error==!1?e(t):n(t)}));var n="function"==typeof e[e.length-1]?e[e.length-1]:null;if(!n)return t;t.then(function(e){return n(null,e)}).catch(function(e){return n(e)})}(i.apply(this,n),n)}:"object"===f(i)?e(Object.assign(Object.create(g(o.options)),i,{plugin:r})):i:!1===o.plugin?e(Object.assign(Object.create(g(o.options)),{},{plugin:r})):function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.unshift(r),o.call.apply(this,n)}}})};return function(e){return b=r(e),v(function(r){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(i,!0).forEach(function(e){var n,t,o;n=r,o=i[t=e],t in n?Object.defineProperty(n,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[t]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):n(i).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(i,e))})}return r}({},g(e),{},d))}}();

var ThunderJS=function(){"use strict";function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),t.push.apply(t,o)}return t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=null;"undefined"!=typeof WebSocket?t=WebSocket:"undefined"!=typeof MozWebSocket?t=MozWebSocket:void 0!==e?t=e.WebSocket||e.MozWebSocket:"undefined"!=typeof window?t=window.WebSocket||window.MozWebSocket:"undefined"!=typeof self&&(t=self.WebSocket||self.MozWebSocket);function f(t){return new Promise(function(e,n){if(i)e(i);else try{c||((c=new r(function(e){return[e&&e.protocol||"ws://",e&&e.host||"localhost",":"+(e&&e.port||80),e&&e.endpoint||"/jsonrpc",e&&e.token?"?token="+e.token:null].join("")}(t),"notification")).addEventListener("message",function(e){!function(e){if("string"==typeof e&&(e=JSON.parse(e.normalize().replace(/\\x([0-9A-Fa-f]{2})/g,""))),e.id){var n=a[e.id];n?("result"in e?n.resolve(e.result):n.reject(e.error),delete a[e.id]):console.log("no pending request found with id "+e.id)}}(e.data)}),c.addEventListener("message",function(e){!function(n){if("string"==typeof n&&(n=JSON.parse(n.normalize().replace(/\\x([0-9A-Fa-f]{2})/g,""))),!n.id&&n.method){var e=u[n.method];e&&Array.isArray(e)&&e.length?e.forEach(function(e){e(n.params)}):console.log("no callbacks for "+n.method)}}(e.data)})),c.addEventListener("open",function(){e(i=c)})}catch(e){n(e)}})}function o(l){return{request:function(i,c,u){return new Promise(function(e,n){var t=p+=1,o=function(e,n,t){var o;return(o=t&&t.version)?o:e&&(e[n]||e.default)||1}(l.versions,i,u),r=function(e,n,t,o,r){o&&delete o.version;var i={jsonrpc:"2.0",id:e,method:[n,r,t].join(".")};return!o&&!1!==o||"object"===s(o)&&0===Object.keys(o).length||(i.params=o),i}(t,i,c,u,o);l.debug&&(console.log(" "),console.log("API REQUEST:"),console.log(JSON.stringify(r,null,2)),console.log(" ")),a[t]={body:r,resolve:e,reject:n},function(e,n){f(e).then(function(e){e.send(JSON.stringify(n))}).catch(console.error)}(l,r)})}}}var r=t,a={},u={},i=null,c=null,p=0,l={DeviceInfo:{freeRam:function(e){return this.call("systeminfo",e).then(function(e){return e.freeram})},version:function(e){return this.call("systeminfo",e).then(function(e){return e.version})}}};function h(n,t,e){var o=this,r=function(e,n,t){var o=d(e,n);if(!u[o]){u[o]=[];var r="register";var i=o.split(".").slice(0,-1).join(".");var c={event:n,id:i};this.api.request(e,r,c).then().catch()}return u[o].push(t),u[o].length-1}.call(this,n,t,e);return{dispose:function(){var e=d(n,t);u[e].splice(r,1),0===u[e].length&&function(e,n){var t=d(e,n);delete u[t];var o="unregister",r=t.split(".").slice(0,-1).join("."),i={event:n,id:r};this.api.request(e,o,i)}.call(o,n,t)}}}function d(e,n){return["client",e,"events",n].join(".")}var y,g=function t(e){return{options:e,plugin:!1,call:function(){var e=Array.prototype.slice.call(arguments);this.plugin&&e[0]!==this.plugin&&e.unshift(this.plugin);var n=e[0],t=e[1];return"function"==typeof this[n][t]?this[n][t](e[2]):this.api.request.apply(this,e)},registerPlugin:function(e,n){this[e]=b(Object.assign(Object.create(t),n,{plugin:e}))},subscribe:function(){},on:function(){var e=Array.prototype.slice.call(arguments);return this.plugin&&e[0]!==this.plugin&&e.unshift(this.plugin),h.apply(this,e)},once:function(){console.log("todo ...")}}},b=function e(n){return new Proxy(n,{get:function(o,r){var i=o[r];return"api"===r?y:void 0!==i?"function"==typeof i?-1<["on","once","subscribe"].indexOf(r)?function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return i.apply(this,n)}:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(t,e){"object"===s(t)&&("object"!==s(t)||t.then&&"function"==typeof t.then)||(t=new Promise(function(e,n){t instanceof Error==!1?e(t):n(t)}));var n="function"==typeof e[e.length-1]?e[e.length-1]:null;if(!n)return t;t.then(function(e){return n(null,e)}).catch(function(e){return n(e)})}(i.apply(this,n),n)}:"object"===s(i)?e(Object.assign(Object.create(g(o.options)),i,{plugin:r})):i:!1===o.plugin?e(Object.assign(Object.create(g(o.options)),{},{plugin:r})):function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.unshift(r),o.call.apply(this,n)}}})};return function(e){return globalThis.thunder&&"function"==typeof globalThis.thunder.token&&(e.token=globalThis.thunder.token()),y=o(e),b(function(r){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(i,!0).forEach(function(e){var n,t,o;n=r,o=i[t=e],t in n?Object.defineProperty(n,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[t]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):n(i).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(i,e))})}return r}({},g(e),{},l))}}();

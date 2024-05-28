!function(){"use strict";var e=window.wp.element;function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function n(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],_n=!0,a=!1;try{for(n=n.call(e);!(_n=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);_n=!0);}catch(e){a=!0,o=e}finally{try{_n||null==n.return||n.return()}finally{if(a)throw o}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=window.React;function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var l,i=function(t){var c,l=t.props,i=t.editorTypes,s=l.clientId,u=l.attributes,p=l.attributes.className,m=n((0,o.useState)((c={},Object.keys(i).map((function(e){c=a(a({},c),{},r({},e,p?function(e){new RegExp("".concat(e,"-\\S+\\s?"),"g");var t=p.split(" "),n="";return Object.values(t).map((function(t){t.includes(e+"-")&&(n=t)})),n}(e):""))})),c)),2),f=m[0],y=m[1],d=function(t){var c=t.type,l=n((0,o.useState)(!1),2),m=l[0],d=l[1];return(0,e.createElement)("div",{style:{marginBottom:"1rem"},className:"customStyles"},(0,e.createElement)("p",{onClick:function(){return d(!m)},style:{cursor:"pointer"}},(0,e.createElement)("span",{style:{fontWeight:"bold"}},i[c].headline,": "),f[c]?(0,e.createElement)("span",{style:{color:"orange",fontWeight:"bold"}},f[c]):"Standard",(0,e.createElement)("span",{style:{display:"inline-block",transform:m?"rotate(90deg)":""}},"»")),m&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)("p",{onClick:function(){!function(e){if(p&&p.includes(e+"-")){var t=new RegExp("".concat(e,"-\\S+\\s?"),"g");p=p.replace(t,"");var n=a(a({},u),{},{className:"".concat(p)});y(a(a({},f),{},r({},e,""))),wp.data.dispatch("core/block-editor").updateBlockAttributes(s,n)}}(c),d(!1)},style:{cursor:"pointer",backgroundColor:"lightgrey",color:"black",padding:"5px",marginBottom:"5px"}},"Standard"),Object.keys(i[c].types).map((function(t){var n=i[c].types[t].name||i[c].types[t].class;return(0,e.createElement)("div",{className:c+"-"+i[c].types[t].class+" fontPrev",onClick:function(){return function(e){y(a(a({},f),{},r({},c,i[c].types[e].name?i[c].types[e].name:i[c].types[e].class))),function(e,t){var n=e;if(p&&p.includes(t+"-")){var r=new RegExp("".concat(t,"-\\S+\\s?"),"g");n=e+" "+(p=p.replace(r,""))}else p&&(n=e+" "+p);var o=a(a({},u),{},{className:"".concat(n)});wp.data.dispatch("core/block-editor").updateBlockAttributes(s,o)}(c+"-"+i[c].types[e].class,c)}(t)},style:{cursor:"pointer",backgroundColor:"lightgrey",color:"black",padding:"5px",marginBottom:"5px"}},(0,e.createElement)("span",null,n))}))))};return(0,e.createElement)(e.Fragment,null,Object.keys(i).map((function(t){return(0,e.createElement)(d,{type:t})})))},s=wp.compose.createHigherOrderComponent,u=wp.blockEditor.InspectorControls,p=wp.components.PanelBody;fetch("/wp-content/themes/aundo/inc/customStyle_config.json").then((function(e){return e.json()})).then((function(e){l=e}));var m=s((function(t){return function(n){return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(t,n),(0,e.createElement)(u,null,(0,e.createElement)(p,null,(0,e.createElement)("h3",null,"Custom Styles"),(0,e.createElement)(i,{props:n,editorTypes:l}))))}}),"withInspectorControl");wp.hooks.addFilter("editor.BlockEdit","aundo-custom-styles/with-inspector-controls",m)}();
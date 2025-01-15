!function(){"use strict";var e=window.wp.blocks;function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function r(e,r,n){return(r=function(e){var r=function(e){if("object"!=t(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=t(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==t(r)?r:r+""}(r))in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}window.wp.i18n;var o=window.React,i=window.ReactJSXRuntime,l=window.wp.blockEditor,a=window.wp.components,c=function(e){var t=e.props;return e.editorActive&&(0,i.jsxs)("div",{children:[(0,i.jsx)(l.MediaUpload,{onSelect:function(e){return function(e){t.setAttributes({image:e.url,imageId:e.id})}(e)},allowedTypes:["image/svg\\+xml"],multiple:!1,render:function(e){var r=e.open;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{onClick:r,className:"tabImage",children:t.attributes.image?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("figure",{children:(0,i.jsx)("img",{loading:"lazy",src:t.attributes.image,alt:"",width:t.attributes.width})}),(0,i.jsx)("button",{children:"Bild ändern +"})]}):(0,i.jsx)("button",{children:"Icon wählen +"})})})}}),(0,i.jsx)(a.CheckboxControl,{label:"Bild stretchen",checked:t.attributes.stretch,onChange:function(){return t.attributes.stretch?t.setAttributes({stretch:!1}):t.setAttributes({stretch:!0})}}),(0,i.jsx)(a.SelectControl,{label:"Hintergrund-Farbe",value:t.attributes.bgColor,options:[{label:"Transparent",value:"bg-trans"},{label:"Orange",value:"bg-orange"},{label:"Gelb",value:"bg-gelb"},{label:"Schwarz",value:"bg-schwarz"},{label:"Weiß",value:"bg-weiss"}],onChange:function(e){return t.setAttributes({bgColor:e})}}),(0,i.jsx)(a.SelectControl,{label:"Position",value:t.attributes.position,options:[{label:"Rechts vom Bild",value:"moveRight"},{label:"Unter dem Bild",value:"moveBottom"}],onChange:function(e){return t.setAttributes({position:e})}})]})},s=function(e){var t,r,a=e.props,s=(0,o.useRef)(),u=(0,o.useRef)(),d=(t=(0,o.useState)(!1),r=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,l,a=[],c=!0,s=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(a.push(n.value),a.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(s)throw o}}return a}}(t,r)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),b=d[0],p=d[1];return(0,i.jsxs)("div",{ref:s,"data-name":"aundo-iconImg",class:"parent-aundo aundo-iconImg",children:[(0,i.jsx)("div",{ref:u,className:"windowContent",style:{display:"none"},children:(0,i.jsx)(c,{props:a,editorActive:b})}),(0,i.jsxs)("button",{onClick:function(){return function(e,t,r){var n=e.parentNode.id+e.dataset.name;if(r&&r(!0),document.querySelector('[data-id="'+n+'"]'))document.querySelector('[data-id="'+n+'"]').style.display="flex";else{var o=document.createElement("div");o.classList.add("window"),o.dataset.id=n,document.querySelector(".is-root-container").prepend(o),wp.element.render(wp.element.createElement((function(){return(0,i.jsx)("div",{children:(0,i.jsx)("button",{onClick:function(){document.querySelector('[data-id="'+n+'"]').style.display="none"},class:"save",children:"Fertig"})})})),o),e.dataset.name,o.querySelector("div").prepend(t),o.querySelector(".windowContent").style.display="block"}}(s.current,u.current,p)},class:"edit",children:[(0,i.jsx)("p",{style:{fontSize:".6rem"},children:"Bild-Icon"}),(0,i.jsx)("div",{className:"icon",children:(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",children:(0,i.jsx)("path",{d:"M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"})})})]}),(0,i.jsx)(l.InnerBlocks,{template:[["core/image"]]})]})};function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var b=JSON.parse('{"UU":"create-block/aundo-iconimg"}');(0,e.registerBlockType)(b.UU,{attributes:{image:{type:"string"},imageId:{type:"number"},bgColor:{type:"string"},position:{type:"string"},stretch:{type:"boolean",default:!1}},edit:function(e){var t=(0,l.useBlockProps)({className:"bloecke-edit-block"});return(0,i.jsx)("div",d(d({},t),{},{children:(0,i.jsx)(s,{props:e})}))},save:function(e){return l.useBlockProps.save(),(0,i.jsx)(l.InnerBlocks.Content,{})}})}();
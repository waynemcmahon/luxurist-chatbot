/*! For license information please see luxurist-chatbot.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("React"),require("ReactDOM")):"function"==typeof define&&define.amd?define("LuxuristChatbot",["React","ReactDOM"],t):"object"==typeof exports?exports.LuxuristChatbot=t(require("React"),require("ReactDOM")):e.LuxuristChatbot=t(e.React,e.ReactDOM)}(window,((e,t)=>(()=>{var o={110:function(e,t,o){var r,a,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,a=[t,o(883),o(848)],void 0===(n="function"==typeof(r=function(e,t,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VoiceflowChat=void 0;e.VoiceflowChat=e=>{let{projectId:r,apiKey:a,placement:n="floating",initialMessage:s="Hey! Ready to plan your trip?"}=e;const[i,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(!1),[u,p]=(0,t.useState)(!0),[y,f]=(0,t.useState)([]),[x,h]=(0,t.useState)(""),[g,m]=(0,t.useState)([]),[b,v]=(0,t.useState)(!1),w=(0,t.useRef)(null),j=(0,t.useRef)(`user-${Math.random().toString(36).substring(7)}`),S="inline"===n?"w-full h-full min-h-[400px] bg-white rounded-xl shadow-lg p-8":"fixed bottom-5 right-5 w-[350px] h-[500px] z-50 shadow-lg rounded-xl bg-white";(0,t.useEffect)((()=>{const e=document.querySelector(".overflow-y-auto");e&&(e.scrollTop=e.scrollHeight)}),[y,g]);const N=()=>{const e=document.querySelector(".overflow-y-auto");e&&(e.scrollTop=e.scrollHeight)},k=async e=>{try{v(!0);const t=await fetch(`https://general-runtime.voiceflow.com/state/user/${j.current}/interact`,{method:"POST",headers:{Authorization:a,versionID:"production","Content-Type":"application/json"},body:JSON.stringify({request:e,config:{tts:!1,stripSSML:!0,stopAll:!0,excludeTypes:["debug","flow","block","log"]}})});if(!t.ok)throw new Error(`Voiceflow API returned ${t.status}`);const o=await t.json();if(!Array.isArray(o))throw new Error("Invalid response format from Voiceflow API");let r=[],n=[];for(const e of o)"text"===e.type?r.push({type:"assistant",content:e.payload.message}):"choice"===e.type?n=e.payload.buttons:"end"===e.type&&console.log("Conversation ended");r.length>0&&f((e=>[...e,...r])),n.length>0&&m(n)}catch(e){console.error("Error interacting with Voiceflow:",e),f((e=>[...e,{type:"assistant",content:"Sorry, I encountered an error. Please try again."}]))}finally{v(!1)}},C=async e=>{e.trim()&&(f((t=>[...t,{type:"user",content:e}])),h(""),m([]),setTimeout(N,100),await k({type:"text",payload:e}))};return c?(0,o.jsxs)("div",{id:"voiceflow-chat-container",className:`transition-all duration-500 ease-in-out hanken-grotesk ${i?"opacity-100 scale-100":"opacity-0 scale-95"} ${S}`,"aria-live":"polite",role:"region","aria-label":"Chat interface",children:[(0,o.jsxs)("div",{className:"border-b border-gray-100 pb-4",children:[(0,o.jsx)("h2",{className:"text-2xl font-bold gilda-display text-gray-900",children:"Magic Quote"}),(0,o.jsx)("p",{className:"hanken-grotesk text-gray-500",children:" Share some details about a trip you are interested in creating, and our concierge experts will craft a bespoke trip delivered to your inbox"})]}),(0,o.jsxs)("div",{className:"flex flex-col h-[calc(450px-8rem)]",children:[(0,o.jsxs)("div",{className:"flex-1 overflow-y-auto py-4 space-y-4",children:[y.map(((e,t)=>(0,o.jsx)("div",{className:`flex ${"user"===e.type?"justify-end":"justify-start"} message ${e.type}`,children:(0,o.jsx)("div",{className:"max-w-[80%] rounded-lg px-4 py-2 hanken-grotesk "+("user"===e.type?"bg-primary text-white":"bg-secondary text-text"),children:e.content})},t))),b&&(0,o.jsx)("div",{className:"flex justify-start",children:(0,o.jsx)("div",{className:"bg-secondary text-text rounded-lg px-4 py-2 typing hanken-grotesk",children:"typing..."})}),(0,o.jsx)("div",{ref:w})]}),g.length>0&&(0,o.jsx)("div",{className:"py-4 space-y-2",children:g.map(((e,t)=>(0,o.jsx)("button",{onClick:()=>(async e=>{f((t=>[...t,{type:"user",content:e.name}])),m([]),setTimeout(N,100),await k(e.request)})(e),className:"w-full text-left px-4 py-2 rounded-lg choice-button gilda-display",children:e.name},t)))}),(0,o.jsx)("div",{className:"border-t pt-4 input-area mt-auto",children:(0,o.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,o.jsx)("input",{type:"text",value:x,onChange:e=>h(e.target.value),onKeyPress:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),C(x))},placeholder:"Share your travel vision...",className:"flex-1 px-4 py-2 rounded-lg focus:outline-none hanken-grotesk",disabled:b}),(0,o.jsx)("button",{onClick:()=>C(x),disabled:b||!x.trim(),className:"px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed gilda-display","aria-label":"Send message",children:"Send"})]})})]})]}):(0,o.jsxs)("div",{className:`${S} flex flex-col justify-center space-y-8 welcome-screen`,children:[(0,o.jsx)("span",{className:"text-2xl gilda-display leading-tight font-extralight text-gray-700",style:{fontFamily:"Gilda Display"},children:"Ready to create an unforgettable journey for your guests?"}),(0,o.jsx)("p",{className:"text-gray-800 font-extralight",style:{fontFamily:"Hanken Grotesk"},children:"Simply click the button below to get started."}),(0,o.jsx)("button",{onClick:async()=>{u&&(d(!0),setTimeout((async()=>{l(!0),await k({type:"launch"})}),500))},disabled:!u,style:{fontFamily:"Gilda Display"},className:`\n            w-full px-8 py-4 text-white bg-[hsla(23,91.9%,29.53%,1)] hover:bg-[hsla(23,91.9%,25%,1)] text-lg font-gilda font-normal tracking-widest\n            transition-all duration-300 ease-in-out transform\n            ${u?"w-full md:w-auto transition-colors":"cursor-not-allowed"}\n          `,children:"LET'S START"}),(0,o.jsxs)("div",{className:"flex items-start space-x-2 mt-4",children:[(0,o.jsx)("input",{type:"checkbox",id:"privacy-consent",checked:u,onChange:e=>p(e.target.checked),className:"w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"}),(0,o.jsxs)("label",{htmlFor:"privacy-consent",className:"text-xs hanken-grotesk font-extralight text-gray-600",children:["I CONSENT TO RECEIVE COMMUNICATIONS AS PER THE"," ",(0,o.jsx)("a",{href:"#",className:"underline hover:text-primary",children:"PRIVACY POLICY"})]})]})]})}})?r.apply(t,a):r)||(e.exports=n)},43:function(e,t,o){var r,a,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,a=[t,o(883),o(845),o(110),o(114),o(848)],void 0===(n="function"==typeof(r=function(e,t,r,a,n,s){"use strict";var i=o(994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=i(t),r=i(r);const l={initChat:function(e){const{projectId:t,apiKey:o,placement:n="floating",containerId:i}=e;if(i){const e=document.getElementById(i);if(!e)return void console.error(`Container with id "${i}" not found`);r.default.render((0,s.jsx)(a.VoiceflowChat,{projectId:t,apiKey:o,placement:"inline",initialMessage:"Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"}),e)}else{const e=document.createElement("div");e.id="luxurist-chatbot-container",document.body.appendChild(e),r.default.render((0,s.jsx)(a.VoiceflowChat,{projectId:t,apiKey:o,placement:"floating",initialMessage:"Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"}),e)}}};e.default=l})?r.apply(t,a):r)||(e.exports=n)},114:(e,t,o)=>{"use strict";o.r(t)},20:(e,t,o)=>{"use strict";var r=o(883),a=Symbol.for("react.element"),n=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,o){var r,n={},c=null,d=null;for(r in void 0!==o&&(c=""+o),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)s.call(t,r)&&!l.hasOwnProperty(r)&&(n[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===n[r]&&(n[r]=t[r]);return{$$typeof:a,type:e,key:c,ref:d,props:n,_owner:i.current}}t.Fragment=n,t.jsx=c,t.jsxs=c},848:(e,t,o)=>{"use strict";e.exports=o(20)},883:t=>{"use strict";t.exports=e},845:e=>{"use strict";e.exports=t},994:e=>{e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}},r={};function a(e){var t=r[e];if(void 0!==t)return t.exports;var n=r[e]={exports:{}};return o[e].call(n.exports,n,n.exports,a),n.exports}a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n=a(43);return n.default})()));
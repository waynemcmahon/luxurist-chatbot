/*! For license information please see luxurist-chatbot.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("React"),require("ReactDOM")):"function"==typeof define&&define.amd?define("LuxuristChatbot",["React","ReactDOM"],t):"object"==typeof exports?exports.LuxuristChatbot=t(require("React"),require("ReactDOM")):e.LuxuristChatbot=t(e.React,e.ReactDOM)}(window,((e,t)=>(()=>{var r={110:function(e,t,r){var a,o,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,o=[t,r(883),r(848)],void 0===(n="function"==typeof(a=function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VoiceflowChat=void 0;e.VoiceflowChat=e=>{let{projectId:a,apiKey:o,placement:n="floating",initialMessage:s="Hey! Ready to plan your trip?"}=e;const[i,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(!1),[u,p]=(0,t.useState)(!1),[y,f]=(0,t.useState)([]),[x,h]=(0,t.useState)(""),[g,m]=(0,t.useState)([]),[b,v]=(0,t.useState)(!1),w=(0,t.useRef)(null),j=(0,t.useRef)(`user-${Math.random().toString(36).substring(7)}`),S=()=>{w.current?.scrollIntoView({behavior:"smooth"})},N=async e=>{try{v(!0);const t=await fetch(`https://general-runtime.voiceflow.com/state/user/${j.current}/interact`,{method:"POST",headers:{Authorization:o,versionID:"production","Content-Type":"application/json"},body:JSON.stringify({request:e,config:{tts:!1,stripSSML:!0,stopAll:!0,excludeTypes:["debug","flow","block","log"]}})});if(!t.ok)throw new Error(`Voiceflow API returned ${t.status}`);const r=await t.json();if(!Array.isArray(r))throw new Error("Invalid response format from Voiceflow API");let a=[],n=[];for(const e of r)"text"===e.type?a.push({type:"assistant",content:e.payload.message}):"choice"===e.type?n=e.payload.buttons:"end"===e.type&&console.log("Conversation ended");a.length>0&&(f((e=>[...e,...a])),setTimeout(S,100)),n.length>0&&m(n)}catch(e){console.error("Error interacting with Voiceflow:",e),f((e=>[...e,{type:"assistant",content:"Sorry, I encountered an error. Please try again."}]))}finally{v(!1)}},k=async e=>{e.trim()&&(f((t=>[...t,{type:"user",content:e}])),h(""),m([]),setTimeout(S,100),await N({type:"text",payload:e}))},C="inline"===n?"w-full h-full min-h-[400px] bg-white rounded-xl shadow-lg p-8":"fixed bottom-5 right-5 w-[350px] h-[500px] z-50 shadow-lg rounded-xl bg-white";return c?(0,r.jsxs)("div",{id:"voiceflow-chat-container",className:`transition-all duration-500 ease-in-out hanken-grotesk ${i?"opacity-100 scale-100":"opacity-0 scale-95"} ${C}`,"aria-live":"polite",role:"region","aria-label":"Chat interface",children:[(0,r.jsxs)("div",{className:"border-b border-gray-100 py-4",children:[(0,r.jsx)("h2",{className:"text-lg font-bold gilda-display text-gray-900",children:"Magic Quote"}),(0,r.jsx)("p",{className:"text-sm hanken-grotesk text-gray-500",children:"Discover the perfect luxury travel experience for your guests"})]}),(0,r.jsxs)("div",{className:"flex flex-col h-[calc(100%-8rem)]",children:[(0,r.jsxs)("div",{className:"flex-1 overflow-y-auto py-4 space-y-4",children:[y.map(((e,t)=>(0,r.jsx)("div",{className:`flex ${"user"===e.type?"justify-end":"justify-start"} message ${e.type}`,children:(0,r.jsx)("div",{className:"max-w-[80%] rounded-lg px-4 py-2 hanken-grotesk "+("user"===e.type?"bg-primary text-white":"bg-secondary text-text"),children:e.content})},t))),b&&(0,r.jsx)("div",{className:"flex justify-start",children:(0,r.jsx)("div",{className:"bg-secondary text-text rounded-lg px-4 py-2 typing hanken-grotesk",children:"typing..."})}),(0,r.jsx)("div",{ref:w})]}),g.length>0&&(0,r.jsx)("div",{className:"py-4 space-y-2",children:g.map(((e,t)=>(0,r.jsx)("button",{onClick:()=>(async e=>{f((t=>[...t,{type:"user",content:e.name}])),m([]),setTimeout(S,100),await N(e.request)})(e),className:"w-full text-left px-4 py-2 rounded-lg choice-button gilda-display",children:e.name},t)))}),(0,r.jsx)("div",{className:"border-t py-4 input-area mt-auto",children:(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsx)("input",{type:"text",value:x,onChange:e=>h(e.target.value),onKeyPress:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),k(x))},placeholder:"Share your travel vision...",className:"flex-1 px-4 py-2 rounded-lg focus:outline-none hanken-grotesk",disabled:b}),(0,r.jsx)("button",{onClick:()=>k(x),disabled:b||!x.trim(),className:"px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed gilda-display","aria-label":"Send message",children:"Send"})]})})]})]}):(0,r.jsxs)("div",{className:`${C} flex flex-col justify-center space-y-8 welcome-screen`,children:[(0,r.jsx)("span",{className:"text-2xl gilda-display text-gray-800 leading-tight",children:"Ready to create an unforgettable journey for your guests?"}),(0,r.jsx)("p",{className:"text-gray-800 hanken-grotesk font-extralight",children:"Simply click the button below, share some details about a trip you are interested in creating, and our concierge experts will craft a bespoke trip delivered to your inbox"}),(0,r.jsx)("button",{onClick:async()=>{u&&(d(!0),setTimeout((async()=>{l(!0),await N({type:"launch"})}),500))},disabled:!u,style:{fontFamily:"Gilda Display",fontSize:"1.25rem",fontWeight:"400",lineHeight:"1.111em",letterSpacing:".2em"},className:`\n            w-full px-8 py-4 text-white text-lg gilda-display tracking-widest\n            transition-all duration-300 ease-in-out transform\n            ${u?"bg-primary hover:bg-primary/90 hover:-translate-y-1":"bg-gray-300 cursor-not-allowed"}\n          `,children:"LET'S START"}),(0,r.jsxs)("div",{className:"flex items-start space-x-2 mt-4",children:[(0,r.jsx)("input",{type:"checkbox",id:"privacy-consent",checked:u,onChange:e=>p(e.target.checked),className:"w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"}),(0,r.jsxs)("label",{htmlFor:"privacy-consent",className:"text-xs hanken-grotesk font-extralight text-gray-600",children:["I CONSENT TO RECEIVE COMMUNICATIONS AS PER THE"," ",(0,r.jsx)("a",{href:"#",className:"underline hover:text-primary",children:"PRIVACY POLICY"})]})]})]})}})?a.apply(t,o):a)||(e.exports=n)},43:function(e,t,r){var a,o,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,o=[t,r(883),r(845),r(110),r(114),r(848)],void 0===(n="function"==typeof(a=function(e,t,a,o,n,s){"use strict";var i=r(994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=i(t),a=i(a);const l={initChat:function(e){const{projectId:t,apiKey:r,placement:n="floating",containerId:i}=e;if(i){const e=document.getElementById(i);if(!e)return void console.error(`Container with id "${i}" not found`);a.default.render((0,s.jsx)(o.VoiceflowChat,{projectId:t,apiKey:r,placement:"inline",initialMessage:"Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"}),e)}else{const e=document.createElement("div");e.id="luxurist-chatbot-container",document.body.appendChild(e),a.default.render((0,s.jsx)(o.VoiceflowChat,{projectId:t,apiKey:r,placement:"floating",initialMessage:"Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"}),e)}}};e.default=l})?a.apply(t,o):a)||(e.exports=n)},114:(e,t,r)=>{"use strict";r.r(t)},20:(e,t,r)=>{"use strict";var a=r(883),o=Symbol.for("react.element"),n=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,i=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var a,n={},c=null,d=null;for(a in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)s.call(t,a)&&!l.hasOwnProperty(a)&&(n[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===n[a]&&(n[a]=t[a]);return{$$typeof:o,type:e,key:c,ref:d,props:n,_owner:i.current}}t.Fragment=n,t.jsx=c,t.jsxs=c},848:(e,t,r)=>{"use strict";e.exports=r(20)},883:t=>{"use strict";t.exports=e},845:e=>{"use strict";e.exports=t},994:e=>{e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}},a={};function o(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return r[e].call(n.exports,n,n.exports,o),n.exports}o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n=o(43);return n.default})()));
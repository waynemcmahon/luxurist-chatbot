/*! For license information please see luxurist-chatbot.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("React"),require("ReactDOM")):"function"==typeof define&&define.amd?define("LuxuristChatbot",["React","ReactDOM"],t):"object"==typeof exports?exports.LuxuristChatbot=t(require("React"),require("ReactDOM")):e.LuxuristChatbot=t(e.React,e.ReactDOM)}(window,((e,t)=>(()=>{var o={110:function(e,t,o){var a,r,s;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,o(883),o(848)],void 0===(s="function"==typeof(a=function(e,t,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VoiceflowChat=void 0;e.VoiceflowChat=e=>{let{projectId:a,apiKey:r,placement:s="floating",initialMessage:n="Hey! Ready to plan your trip?",isSimulation:i=!1}=e;const[l,c]=(0,t.useState)(!1),[d,u]=(0,t.useState)(!1),[p,y]=(0,t.useState)(!0),[f,h]=(0,t.useState)([]),[x,m]=(0,t.useState)(""),[g,w]=(0,t.useState)([]),[v,b]=(0,t.useState)(!1),j=(0,t.useRef)(null),S=(0,t.useRef)(`user-${Math.random().toString(36).substring(7)}`),[k,N]=(0,t.useState)(0),[C,T]=(0,t.useState)(!1),[I,_]=(0,t.useState)({email:"",city:"",people:"",interests:"",travelDate:""}),O="inline"===s?"w-full h-full min-h-[400px]":"fixed bottom-5 right-5 w-[350px] h-[500px] z-50 shadow-lg rounded-xl bg-white";(0,t.useEffect)((()=>{const e=document.querySelector(".overflow-y-auto");e&&(e.scrollTop=e.scrollHeight)}),[f,g]);const E=()=>{const e=document.querySelector(".overflow-y-auto");e&&(e.scrollTop=e.scrollHeight)},R=async e=>{try{b(!0);const t=await fetch(`https://general-runtime.voiceflow.com/state/user/${S.current}/interact`,{method:"POST",headers:{Authorization:r,versionID:"production","Content-Type":"application/json"},body:JSON.stringify({request:e,config:{tts:!1,stripSSML:!0,stopAll:!0,excludeTypes:["debug","flow","block","log"]}})});if(!t.ok)throw new Error(`Voiceflow API returned ${t.status}`);const o=await t.json();if(!Array.isArray(o))throw new Error("Invalid response format from Voiceflow API");let a=[],s=[];for(const e of o)"text"===e.type?a.push({type:"assistant",content:e.payload.message}):"choice"===e.type?s=e.payload.buttons:"end"===e.type&&console.log("Conversation ended");a.length>0&&h((e=>[...e,...a])),s.length>0&&w(s)}catch(e){console.error("Error interacting with Voiceflow:",e),h((e=>[...e,{type:"assistant",content:"Sorry, I encountered an error. Please try again."}]))}finally{b(!1)}},P=async e=>{e.trim()&&(h((t=>[...t,{type:"user",content:e}])),m(""),w([]),setTimeout(E,100),await R({type:"text",payload:e}))},M=[{question:"Hi! I'd love to help you with your perfect adventure. What kind of trip would you like to plan?",response:"A safari tour in South Africa for me and my wife",delay:1e3},{question:"A safari tour in South Africa sounds wonderful! When would you like to travel?",response:"June 2024",delay:1500},{question:"Perfect! Could you share your email address so I can send you a detailed safari itinerary?",response:"john.smith@email.com",delay:1500},{question:"Great! I'll craft a luxurious South African safari experience for you and your wife in June 2024. You'll receive a detailed itinerary at john.smith@email.com shortly. Let us know if there's anything else we can do for you!",isEnd:!0,delay:2e3}],A=(0,t.useCallback)((async()=>{if(!i||C)return;const e=(e,t)=>{h((o=>[...o,{type:t,content:e}]))};for(let t=0;t<M.length;t++){const o=M[t];b(!0),await new Promise((e=>setTimeout(e,1500))),b(!1),e(o.question,"assistant"),await new Promise((e=>setTimeout(e,o.delay))),!o.isEnd&&o.response&&(e(o.response,"user"),await new Promise((e=>setTimeout(e,1e3))),N(t+1))}T(!0)}),[i,C]);return d?(0,o.jsxs)("div",{id:"voiceflow-chat-container",className:`bg-white rounded-xl shadow-lg p-8 transition-all duration-500 ease-in-out hanken-grotesk ${l?"opacity-100 scale-100":"opacity-0 scale-95"} ${O}`,"aria-live":"polite",role:"region","aria-label":"Chat interface",children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"border-b border-gray-100 pb-4",children:(0,o.jsx)("h2",{className:"text-2xl font-bold gilda-display text-gray-900",children:"Magic Quote"})}),(0,o.jsx)("div",{className:"flex flex-col h-[calc(450px-8rem)]",children:(0,o.jsxs)("div",{className:"flex-1 overflow-y-auto py-4 space-y-4",children:[f.map(((e,t)=>(0,o.jsx)("div",{className:`flex ${"user"===e.type?"justify-end":"justify-start"} message ${e.type}`,children:(0,o.jsx)("div",{className:"max-w-[80%] rounded-lg px-4 py-2 hanken-grotesk "+("user"===e.type?"bg-primary text-white":"bg-secondary text-text"),children:e.content})},t))),v&&(0,o.jsx)("div",{className:"flex justify-start",children:(0,o.jsx)("div",{className:"bg-secondary text-text rounded-lg px-4 py-2 typing hanken-grotesk",children:"typing..."})}),(0,o.jsx)("div",{ref:j})]})})]}),g.length>0&&(0,o.jsx)("div",{className:"py-4 space-y-2",children:g.map(((e,t)=>(0,o.jsx)("button",{onClick:()=>(async e=>{h((t=>[...t,{type:"user",content:e.name}])),w([]),setTimeout(E,100),await R(e.request)})(e),className:"w-full text-left px-4 py-2 rounded-lg choice-button gilda-display",children:e.name},t)))}),(0,o.jsx)("div",{className:"border-t pt-4 input-area mt-auto",children:(0,o.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,o.jsx)("input",{type:"text",value:x,onChange:e=>m(e.target.value),onKeyPress:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),P(x))},placeholder:i?"This is a demo conversation...":"Share your travel vision...",className:"flex-1 px-4 py-2 rounded-lg focus:outline-none hanken-grotesk",disabled:i||v}),(0,o.jsx)("button",{onClick:()=>P(x),disabled:i||v||!x.trim(),className:"px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed gilda-display","aria-label":"Send message",children:"Send"})]})})]}):(0,o.jsxs)("div",{className:`${O} flex flex-col space-y-8 welcome-screen`,children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("span",{className:"text-2xl gilda-display leading-tight font-extralight text-gray-700 block",style:{fontFamily:"Gilda Display"},children:"Ready to create an unforgettable journey for your guests?"}),(0,o.jsx)("span",{className:"mt-4 gilda-display text-gray-800 block",style:{fontFamily:"Hanken Grotesk"},children:" Share some details about a trip you are interested in creating, and our concierge experts will craft a bespoke trip delivered to your inbox."}),(0,o.jsx)("span",{className:"mt-4 text-gray-800 font-extralight block",style:{fontFamily:"Hanken Grotesk"},children:"Simply click the button below to get started."})]}),(0,o.jsx)("button",{onClick:async()=>{p&&(u(!0),setTimeout((async()=>{c(!0),i?A():await R({type:"launch"})}),500))},disabled:!p,style:{fontFamily:"Gilda Display"},className:`\n            w-full px-8 py-4 text-white bg-[hsla(23,91.9%,29.53%,1)] hover:bg-[hsla(23,91.9%,25%,1)] text-lg font-gilda font-normal tracking-widest\n            transition-all duration-300 ease-in-out transform\n            ${p?"w-full md:w-auto transition-colors":"cursor-not-allowed"}\n          `,children:"LET'S START"}),(0,o.jsxs)("div",{className:"flex items-start space-x-2 mt-4",children:[(0,o.jsx)("input",{type:"checkbox",id:"privacy-consent",checked:p,onChange:e=>y(e.target.checked),className:"w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"}),(0,o.jsxs)("label",{htmlFor:"privacy-consent",className:"text-xs hanken-grotesk font-extralight text-gray-600",children:["I CONSENT TO RECEIVE COMMUNICATIONS AS PER THE"," ",(0,o.jsx)("a",{href:"#",className:"underline hover:text-primary",children:"PRIVACY POLICY"})]})]})]})}})?a.apply(t,r):a)||(e.exports=s)},43:function(e,t,o){var a,r,s;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,o(883),o(845),o(110),o(114),o(848)],void 0===(s="function"==typeof(a=function(e,t,a,r,s,n){"use strict";var i=o(994);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=i(t),a=i(a);const l={initChat:function(e){const{projectId:t,apiKey:o,placement:s="floating",containerId:i,isSimulation:l=!1}=e;if(i){const e=document.getElementById(i);if(!e)return void console.error(`Container with id "${i}" not found`);a.default.render((0,n.jsx)(r.VoiceflowChat,{projectId:t,apiKey:o,placement:"inline",isSimulation:l,initialMessage:"Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"}),e)}else{const e=document.createElement("div");e.id="luxurist-chatbot-container",document.body.appendChild(e),a.default.render((0,n.jsx)(r.VoiceflowChat,{projectId:t,apiKey:o,placement:"floating",isSimulation:l,initialMessage:"Hi there! I'm your luxury travel concierge. How can I help you plan your perfect getaway?"}),e)}}};e.default=l})?a.apply(t,r):a)||(e.exports=s)},114:(e,t,o)=>{"use strict";o.r(t)},20:(e,t,o)=>{"use strict";var a=o(883),r=Symbol.for("react.element"),s=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,i=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,o){var a,s={},c=null,d=null;for(a in void 0!==o&&(c=""+o),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)n.call(t,a)&&!l.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===s[a]&&(s[a]=t[a]);return{$$typeof:r,type:e,key:c,ref:d,props:s,_owner:i.current}}t.Fragment=s,t.jsx=c,t.jsxs=c},848:(e,t,o)=>{"use strict";e.exports=o(20)},883:t=>{"use strict";t.exports=e},845:e=>{"use strict";e.exports=t},994:e=>{e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}},a={};function r(e){var t=a[e];if(void 0!==t)return t.exports;var s=a[e]={exports:{}};return o[e].call(s.exports,s,s.exports,r),s.exports}r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s=r(43);return s.default})()));
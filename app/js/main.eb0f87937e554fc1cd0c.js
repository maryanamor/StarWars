(()=>{"use strict";var t={370:t=>{t.exports=function(t,e){return e||(e={}),t?(t=String(t.__esModule?t.default:t),e.hash&&(t+=e.hash),e.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(t)?'"'.concat(t,'"'):t):t}},325:(t,e,n)=>{t.exports=n.p+"41876af6f87fa237431e.jpeg"},714:(t,e,n)=>{t.exports=n.p+"5fd605ddbbb7ed0ceb2c.js"},962:(t,e,n)=>{t.exports=n.p+"b88d04fba731603756b1.css"}},e={};function n(a){var s=e[a];if(void 0!==s)return s.exports;var r=e[a]={exports:{}};return t[a](r,r.exports,n),r.exports}n.m=t,n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.p="",n.b=document.baseURI||self.location.href,(()=>{var t=n(370),e=n.n(t),a=new URL(n(962),n.b),s=new URL(n(714),n.b),r=new URL(n(325),n.b);e()(a),e()(s),e()(r);const o=async t=>{try{return await fetch(t).then((t=>t.json()))}catch(t){return t}},i=document.querySelector("tbody"),c=document.querySelector(".loader"),l=document.querySelector(".pagination");document.addEventListener("DOMContentLoaded",(function(){p(1)}));const u=new class{constructor(t,e,n){this.page=t,this.count=e,this.total=n}setPagination(t,e,n){return this.page=t,this.total=n,this.count=e,this}};const p=async t=>(c.removeAttribute("hidden"),i.style.opacity="0.4",await async function(t){try{const e=await(async t=>{try{return(await fetch(`https://swapi.dev/api/planets/?${t}=&page=${t}`)).json()}catch(t){return t}})(t);if(u.setPagination(t,e.results.length,e.count),e.results.length){const t=(await Promise.all(e.results?.map((t=>Promise.all(t.residents?.map((async(e,n)=>{const a=await o(e,t.name);return{index:n+1,planet:t.name,residentName:a.name,species:a.species}}))))))).flatMap((t=>t));return(await Promise.all(t.map((async t=>t.species.length?await Promise.all(t.species.map((async e=>{const n=await o(e,t.residentName);return t.species=n.name,t}))):(t.species="Human",t))))).flatMap((t=>t))}}catch(t){console.error(t)}}(t).then((t=>{c.setAttribute("hidden",""),i.style.opacity="1",function(t,e){t.innerHTML="";for(let n of e){let e=t.insertRow();for(let t in n){let a=e.insertCell(),s=document.createTextNode(n[t]);a.appendChild(s)}}!function(t,e){l.innerHTML="";let n=Math.ceil(t/e);for(let t=0;t<n;t++){let e=d(t+1);l.appendChild(e)}}(u.total,u.count)}(i,t)})));function d(t){let e=document.createElement("button");return e.classList.add("pagination__btn"),e.innerText=t,u.page===t&&e.classList.add("pagination__btn-active"),e.addEventListener("click",(function(){p(t),document.querySelector(".pagination__btn-active").classList.remove("pagination__btn-active"),e.classList.add("pagination__btn-active")})),e}})()})();
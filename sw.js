if(!self.define){let e,i={};const c=(c,n)=>(c=new URL(c+".js",n).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const s=e=>c(e,o),f={module:{uri:o},exports:d,require:s};i[o]=Promise.all(n.map((e=>f[e]||s(e)))).then((e=>(r(...e),d)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"android-chrome-144x144.png",revision:"b7c6c7e823f79bc3e94c22c22e00eb3a"},{url:"android-chrome-192x192.png",revision:"e184aea92814e775b433c35e90dcc8ce"},{url:"android-chrome-512x512.png",revision:"9540e0808cb7203ca3a4599149bb40c2"},{url:"apple-touch-icon.png",revision:"fc80872917524b0fe4b081816409bf05"},{url:"assets/index-CH2x80eQ.css",revision:null},{url:"assets/index-CJf7GOVF.js",revision:null},{url:"favicon-16x16.png",revision:"681f895a8fadb1184e89a19624b1fffa"},{url:"favicon-32x32.png",revision:"6b24a855d49706d660e992dccbc7e8d2"},{url:"favicon.ico",revision:"8ad23162404c360a19e6ad06e2fb04dd"},{url:"index.html",revision:"6b39380f02126fbbc8798cf314df96cc"},{url:"registerSW.js",revision:"7dced58172f49b3135ca8c5f24093785"},{url:"favicon-16x16.png",revision:"681f895a8fadb1184e89a19624b1fffa"},{url:"favicon-32x32.png",revision:"6b24a855d49706d660e992dccbc7e8d2"},{url:"favicon.ico",revision:"8ad23162404c360a19e6ad06e2fb04dd"},{url:"android-chrome-144x144.png",revision:"b7c6c7e823f79bc3e94c22c22e00eb3a"},{url:"android-chrome-192x192.png",revision:"e184aea92814e775b433c35e90dcc8ce"},{url:"android-chrome-512x512.png",revision:"9540e0808cb7203ca3a4599149bb40c2"},{url:"apple-touch-icon.png",revision:"fc80872917524b0fe4b081816409bf05"},{url:"manifest.webmanifest",revision:"dd24719f337f89a329f31c3652d021f9"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

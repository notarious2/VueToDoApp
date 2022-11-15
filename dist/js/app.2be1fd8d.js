(function(){"use strict";var e={9342:function(e,t,n){n.d(t,{t:function(){return c}});n(7658);var r=n(9876),o=n(9669),a=n.n(o),i=n(108);function s(){let e=JSON.parse(localStorage.getItem("user"));return e&&e["refresh_token"]?{Authorization:"Bearer "+e.refresh_token}:{}}const c=(0,r.Q_)("authentication",{state:()=>({token:"",user:JSON.parse(localStorage.getItem("user")),errorLogIn:!1,isAuthenticated:!1}),actions:{async login(e,t){const n=new URLSearchParams;n.append("username",e),n.append("password",t);const r={Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"};await a().post("login",n,{headers:r}).then((e=>{localStorage.setItem("user",JSON.stringify(e.data)),this.token=e.data["access_token"],this.isAuthenticated=!0,i.Z.push({name:"Home"})})).catch((e=>{console.log(e),this.errorLogIn=!0}))},async register(e){await a().post("user",e,{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}}).then((e=>{i.Z.push({name:"Authorization"}),console.log(`User ${e.data.username} has been successfully created!`)})).catch((e=>{console.log(e)}))},logout(){this.token=null,localStorage.removeItem("user"),this.isAuthenticated=!1,location.reload()},async refreshToken(){const e=await a().get("refresh",{headers:s()});var t=localStorage.getItem("user");return t=JSON.parse(t),console.log(t.access_token),t["access_token"]=e.data.access_token,console.log("REFRESHING!",e.data.access_token),localStorage.setItem("user",JSON.stringify(t)),e.data.access_token},clearError(){this.errorLogIn=!1}},persist:{enabled:!0}})},4953:function(e,t,n){var r=n(9963),o=n(6252);function a(e,t){const n=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(n)}var i=n(3744);const s={},c=(0,i.Z)(s,[["render",a]]);var u=c,l=n(108),d=n(9669),f=n.n(d),p=n(9342);f().defaults.baseURL="http://127.0.0.1:8000/",f().interceptors.response.use((e=>e),(async function(e){console.log("HERE!",e.response.status);const t=e.config;if(401===e.response.status&&!t._retry){t._retry=!0;const e=(0,p.t)();return await e.refreshToken(),location.reload(),[null,await f().request(t)]}return Promise.reject(e)}));n(7658);var g=n(2262),h=n(3577),A="data:image/png;base64,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",m=n(2201);const v=e=>((0,o.dD)("data-v-1f9faaf2"),e=e(),(0,o.Cn)(),e),C=v((()=>(0,o._)("img",{src:A,alt:""},null,-1))),w={class:"app-name"},y={key:0,class:"greetings"};var b={__name:"TheHeader",setup(e){const t=(0,m.tv)(),n=(0,p.t)(),r=(0,o.Fl)((()=>n.isAuthenticated)),a=(0,o.Fl)((()=>!(!r.value||null===JSON.parse(localStorage.getItem("user")))&&JSON.parse(localStorage.getItem("user")).username));return(e,i)=>{const s=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("header",null,[C,(0,o._)("nav",null,[(0,o._)("h1",w,[(0,o.Wm)(s,{to:{name:"Home"}},{default:(0,o.w5)((()=>[(0,o.Uk)(" to-do app ")])),_:1})]),(0,g.SU)(r)?((0,o.wg)(),(0,o.iD)("h3",y,[(0,o.Uk)(" Hello "),(0,o._)("span",null,(0,h.zw)((0,g.SU)(a))+"!",1)])):(0,o.kq)("",!0)]),(0,g.SU)(r)?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("button",{key:0,onClick:i[0]||(i[0]=e=>(0,g.SU)(t).push({name:"Registration"})),class:"button-74"}," Register ")),(0,g.SU)(r)?((0,o.wg)(),(0,o.iD)("button",{key:2,class:"button-74",onClick:i[2]||(i[2]=e=>(0,g.SU)(n).logout())},"Logout")):((0,o.wg)(),(0,o.iD)("button",{key:1,onClick:i[1]||(i[1]=e=>(0,g.SU)(t).push({name:"Authorization"})),class:"button-74",id:"login-button"}," Log In "))])}}};const S=(0,i.Z)(b,[["__scopeId","data-v-1f9faaf2"]]);var k=S;const D=e=>((0,o.dD)("data-v-75de74dc"),e=e(),(0,o.Cn)(),e),N={class:"footer-text"},T=D((()=>(0,o._)("strong",null,"Bekzod Mirahmedov",-1)));function F(e,t){return(0,o.wg)(),(0,o.iD)("footer",null,[(0,o._)("p",N,[T,(0,o.Uk)(" ©   "+(0,h.zw)((new Date).getFullYear()),1)])])}const O={},B=(0,i.Z)(O,[["render",F],["__scopeId","data-v-75de74dc"]]);var x=B,j=n(9876),I=n(5929);const L=(0,r.ri)(u),E=(0,j.WB)();L.component("the-header",k),L.component("the-footer",x),L.use(l.Z),E.use(I.Z),L.use(E),L.mount("#app")},108:function(e,t,n){var r=n(2201);const o=()=>n.e(799).then(n.bind(n,7799)),a=()=>n.e(647).then(n.bind(n,9647)),i=()=>n.e(795).then(n.bind(n,4795)),s=[{path:"/",name:"Home",component:o},{path:"/login",name:"Authorization",component:a},{path:"/register",name:"Registration",component:i}],c=(0,r.p7)({history:(0,r.PO)(),routes:s});t["Z"]=c}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],a=e[l][2];for(var s=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(s=!1,a<i&&(i=a));if(s){e.splice(l--,1);var u=o();void 0!==u&&(t=u)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{424:"6e140627",647:"aca68e6d",718:"ba500416",795:"651bcc25",799:"c952178b"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{424:"b2261be2",647:"3cda4c51",718:"6ce59e1c",795:"ef6cf7b3"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="todo_front:";n.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var s,c;if(void 0!==a)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=r),e[r]=[o];var f=function(t,n){s.onerror=s.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=function(a){if(o.onerror=o.onload=null,"load"===a.type)n();else{var i=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=s,o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=a,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var i=n.miniCssF(r),s=n.p+i;if(t(i,s))return o();e(r,s,o,a)}))},o={143:0};n.f.miniCss=function(e,t){var n={424:1,647:1,718:1,795:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(t),s=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}};n.l(i,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],s=r[1],c=r[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var l=c(n)}for(t&&t(r);u<i.length;u++)a=i[u],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},r=self["webpackChunktodo_front"]=self["webpackChunktodo_front"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(4953)}));r=n.O(r)})();
//# sourceMappingURL=app.2be1fd8d.js.map
(this["webpackJsonpmy-notes-app"]=this["webpackJsonpmy-notes-app"]||[]).push([[0],{117:function(e,t,n){"use strict";n.r(t);var a=n(20),r=n(4),c=n(144),o=n(145),i=n(149),s=n(1),u=n(36),l=n.n(u),b=n(11),j=n.n(b),d=n(23),p=n(5),m=n(21),O=n(41),f=n(147),k=n(142),x=n(135),h=n(138),v=n(150),g=n(132),y=n(143),S=n(139),w=n(148),C=n(128),B=n(137),R=n(83),E=n(65),A=n(88),D=n(133),N=n(134),I=n(146),F=n(129),M=n(90),U=n(131),T=n(91),L=n(51),J=j.a.mark(z),q=j.a.mark(H);function z(e){var t,n,a,r;return j.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:t=new Set,n=Object(L.a)(e),c.prev=2,n.s();case 4:if((a=n.n()).done){c.next=13;break}if(r=a.value,!t.has(r)){c.next=8;break}return c.abrupt("continue",11);case 8:return c.next=10,r;case 10:t.add(r);case 11:c.next=4;break;case 13:c.next=18;break;case 15:c.prev=15,c.t0=c.catch(2),n.e(c.t0);case 18:return c.prev=18,n.f(),c.finish(18);case 21:case"end":return c.stop()}}),J,null,[[2,15,18,21]])}function H(e,t){var n,a,r;return j.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:n=Object(L.a)(t),c.prev=1,n.s();case 3:if((a=n.n()).done){c.next=9;break}return r=a.value,c.next=7,e(r);case 7:c.next=3;break;case 9:c.next=14;break;case 11:c.prev=11,c.t0=c.catch(1),n.e(c.t0);case 14:return c.prev=14,n.f(),c.finish(14);case 17:case"end":return c.stop()}}),q,null,[[1,11,14,17]])}function V(e){var t,n=e.name,a=e.url,r=e.description,c=void 0===r?"":r,o=e.tags,i=void 0===o?[]:o,s=(new Date).toISOString();return{id:Object(T.a)(),url:a,name:n,description:c,tags:(t=z(H((function(e){return e.toLowerCase()}),i)),Array.from(t)),createdAt:s,updatedAt:s}}var _=n(35),P=n(125),G=n(126),K=n(68);var Q={Form:function(e){return Object(r.jsx)(K.b,{initialValues:e.initialValues,onSubmit:e.onSubmit,validate:e.validate,render:function(t){var n=t.handleSubmit;return Object(r.jsx)("form",{onSubmit:n,children:e.children})}})},Field:function(e){return Object(r.jsx)(K.a,{name:e.name,render:function(t){var n=t.input,a=t.meta;return Object(r.jsxs)(_.a,{id:e.id,isRequired:e.isRequired,isInvalid:a.touched&&a.error,children:[Object(r.jsx)(P.a,{children:e.label}),e.render(n),Object(r.jsxs)(G.b,{children:[Object(r.jsx)(G.a,{})," ",a.error]})]})}})}},W=Q.Form,X=Q.Field;function Y(e){var t,n,a={};return 0===((null===(t=e.name)||void 0===t?void 0:t.trim())||"").length&&(a.name="Name can not be empty"),0===((null===(n=e.url)||void 0===n?void 0:n.trim())||"").length&&(a.url="URL can not be empty"),a}function Z(e){var t,n,c,o,i=e.title,u=e.bookmark,l=e.isOpen,b=e.onClose,j=e.onSubmit,d=Object(s.useRef)(null);var p={description:null!==(t=null===u||void 0===u?void 0:u.description)&&void 0!==t?t:"",name:null!==(n=null===u||void 0===u?void 0:u.name)&&void 0!==n?n:"",tags:null!==(c=null===u||void 0===u?void 0:u.tags.join(", "))&&void 0!==c?c:"",url:null!==(o=null===u||void 0===u?void 0:u.url)&&void 0!==o?o:""};return Object(r.jsxs)(I.a,{isOpen:l,onClose:b,children:[Object(r.jsx)(I.g,{}),Object(r.jsx)(W,{onSubmit:function(e){var t={name:e.name,description:e.description,url:e.url,tags:e.tags.split(/[\s,]+/).filter(Boolean)};j(u?function(e,t){return Object(a.a)(Object(a.a)(Object(a.a)({},e),t),{},{updatedAt:(new Date).toISOString()})}(u,t):V(t)),b()},initialValues:p,validate:Y,children:Object(r.jsxs)(I.d,{children:[Object(r.jsx)(I.f,{children:i}),Object(r.jsx)(I.c,{}),Object(r.jsx)(I.b,{children:Object(r.jsxs)(v.b,{children:[Object(r.jsx)(X,{name:"name",label:"Name",id:"bookmark-name",isRequired:!0,render:function(e){return Object(r.jsx)(C.a,Object(a.a)({ref:d},e))}}),Object(r.jsx)(X,{name:"url",label:"URL",id:"bookmark-url",isRequired:!0,render:function(e){return Object(r.jsx)(C.a,Object(a.a)({},e))}}),Object(r.jsx)(X,{name:"description",label:"Description",id:"bookmark-description",render:function(e){return Object(r.jsx)(F.a,Object(a.a)({},e))}}),Object(r.jsx)(X,{name:"tags",label:"Tags",id:"bookmark-tags",render:function(e){return Object(r.jsx)(F.a,Object(a.a)({},e))}})]})}),Object(r.jsxs)(I.e,{children:[Object(r.jsx)(M.a,{mr:3,onClick:b,children:"Cancel"}),Object(r.jsx)(M.a,{colorScheme:"blue",type:"submit",children:"Save"})]})]})})]})}function $(e){var t=e.onBookmarkCreate,n=Object(U.a)(),a=n.onClose,c=n.onOpen,o=n.isOpen;return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(g.a,{"aria-label":"New bookmakr",icon:Object(r.jsx)(D.a,{}),onClick:c}),Object(r.jsx)(Z,{title:"New bookmark",onClose:a,isOpen:o,onSubmit:t})]})}function ee(e){var t=e.bookmark,n=e.onBookmarkUpdate,a=Object(U.a)(),c=a.onClose,o=a.onOpen,i=a.isOpen;return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(g.a,{"aria-label":"New bookmakr",icon:Object(r.jsx)(N.a,{}),onClick:o}),Object(r.jsx)(Z,{title:"Edit bookmark",bookmark:t,onClose:c,isOpen:i,onSubmit:n})]})}var te=n(141),ne=n(151),ae=n(136),re=n(140);function ce(e){var t=new URL(e);return"".concat(t.origin,"/favicon.ico")}function oe(e){var t=e.url,n=Object(s.useState)(!1),a=Object(p.a)(n,2),c=a[0],o=a[1],i=Object(s.useRef)(new Image);return Object(s.useEffect)((function(){var e=!1;return i.current.src=t,i.current.onload=function(){e||o(!0)},function(){o(!1),e=!0}}),[t]),Object(r.jsx)(x.a,{background:"gray.50",width:"24px",height:"24px",rounded:"full",display:"flex",justifyContent:"center",alignItems:"center",children:Object(r.jsx)(ne.a,{boxSize:"16px",src:t,alt:"Favicon",transition:"opacity 0.2s ease-in",opacity:Number(c)})})}function ie(e){var t=e.bookmark,n=e.onBookmarkUpdate,a=e.onBookmarkDelete,c=Object(U.a)(),o=c.isOpen,i=c.onOpen,s=c.onClose;return Object(r.jsxs)(x.a,{border:"1px",borderColor:"gray.200",borderRadius:8,px:4,py:2,children:[Object(r.jsxs)(ae.a,{justify:"space-between",children:[Object(r.jsxs)(x.a,{children:[Object(r.jsx)(B.a,{isExternal:!0,href:t.url,children:Object(r.jsxs)(h.a,{as:"h3",size:"m",display:"flex",alignItems:"center",children:[Object(r.jsx)(oe,{url:ce(t.url)}),Object(r.jsx)(x.a,{ml:2,children:t.name})]})}),Object(r.jsx)(S.a,{mb:1,children:t.description}),Object(r.jsx)(v.a,{children:t.tags.map((function(e){return Object(r.jsx)(re.a,{size:"sm",children:e},e)}))})]}),Object(r.jsxs)(v.b,{children:[Object(r.jsx)(ee,{bookmark:t,onBookmarkUpdate:n}),Object(r.jsx)(g.a,{"aria-label":"Delete bookmark",icon:Object(r.jsx)(te.a,{}),onClick:i})]})]}),Object(r.jsxs)(I.a,{onClose:s,isOpen:o,children:[Object(r.jsx)(I.g,{}),Object(r.jsxs)(I.d,{children:[Object(r.jsx)(I.f,{children:"Are you sure?"}),Object(r.jsxs)(I.b,{children:["Deleting bookmark: ",Object(r.jsx)("strong",{children:t.name})]}),Object(r.jsxs)(I.e,{children:[Object(r.jsx)(M.a,{onClick:s,mr:3,children:"Cancel"}),Object(r.jsx)(M.a,{colorScheme:"red",onClick:function(){a(t.id),s()},children:"Delete"})]})]})]})]})}var se=n(66);function ue(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return{version:e,bookmarks:[]}}var le={0:function(e){return e.bookmarks.forEach((function(e){var t=(new Date).toISOString();e.createdAt=e.updatedAt=t})),e.version=1,e}};function be(e){for(;1!==e.version;){var t,n=Number(null!==(t=e.version)&&void 0!==t?t:0);e=n in le?le[n](e):ue(1)}return e}function je(e){return de.apply(this,arguments)}function de(){return(de=Object(d.a)(j.a.mark((function e(t){var n,a,r,c,o=arguments;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:"Untitled",a=o.length>2?o[2]:void 0,r=new Blob([JSON.stringify(t)],{type:"application/json"}),e.next=5,Object(se.b)(r,{fileName:n,description:"My bookmarks file",extensions:[".mbms"]},a);case 5:return c=e.sent,e.abrupt("return",{fileHandle:c});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function pe(){return me.apply(this,arguments)}function me(){return(me=Object(d.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(se.a)({description:"My bookmarks file",extensions:[".mbms"]});case 2:return t=e.sent,e.t0=be,e.t1=JSON,e.next=7,t.text();case 7:return e.t2=e.sent,e.t3=e.t1.parse.call(e.t1,e.t2),e.t4=(0,e.t0)(e.t3),e.t5=t.name,e.t6=t.handle,e.abrupt("return",{state:e.t4,name:e.t5,handle:e.t6});case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Oe(e,t){switch(t.type){case"NewBookmark":return Object(a.a)(Object(a.a)({},e),{},{bookmarks:e.bookmarks.concat(t.payload)});case"UpdateBookmark":var n=e.bookmarks.findIndex((function(e){return e.id===t.payload.id})),r=[].concat(Object(m.a)(e.bookmarks.slice(0,n)),[t.payload],Object(m.a)(e.bookmarks.slice(n+1)));return Object(a.a)(Object(a.a)({},e),{},{bookmarks:r});case"DeleteBookmark":return Object(a.a)(Object(a.a)({},e),{},{bookmarks:e.bookmarks.filter((function(e){return e.id!==t.payload}))});case"SetState":return t.payload}}var fe,ke=function(e){var t=e.initialState,n=e.onStateChange,a=Object(s.useReducer)(Oe,t),c=Object(p.a)(a,2),o=c[0],i=c[1],u=Object(s.useState)(""),l=Object(p.a)(u,2),b=l[0],m=l[1],D=Object(s.useState)(),N=Object(p.a)(D,2),I=N[0],F=N[1],M=Object(s.useState)(!1),U=Object(p.a)(M,2),T=U[0],L=U[1],J=Object(f.a)();Object(s.useEffect)((function(){var e=setTimeout((function(){n(o)}),100);return function(){return clearTimeout(e)}}),[n,o]),Object(s.useEffect)((function(){T&&je(o,null===I||void 0===I?void 0:I.name,I).catch((function(e){e.code!==DOMException.ABORT_ERR&&J({title:"Error",description:e.message,status:"error",isClosable:!0})}))}),[T,I,o,J]);var q=o.bookmarks,z=Object(s.useMemo)((function(){return Object(R.a)(q.slice().sort((function(e,t){return e.updatedAt<t.updatedAt?-1:1})),b,{keys:["name","tags","description"]})}),[b,q]);function H(){return(H=Object(d.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,pe();case 3:t=e.sent,F(t.handle),i({type:"SetState",payload:t.state}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),e.t0.code!==DOMException.ABORT_ERR&&J({title:"Error",description:e.t0.message,status:"error",isClosable:!0});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function V(){return(V=Object(d.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,je(o,null===I||void 0===I?void 0:I.name,I);case 3:t=e.sent,F(t.fileHandle),J({title:"Saved",description:"Bookmarks saved to "+t.fileHandle.name,status:"success",duration:2e3,isClosable:!0}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),e.t0.code!==DOMException.ABORT_ERR&&J({title:"Error",description:e.t0.message,status:"error",isClosable:!0});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return Object(r.jsxs)(k.a,{py:8,children:[Object(r.jsxs)(x.a,{as:"header",display:"flex",justifyContent:"space-between",alignItems:"center",mb:2,children:[Object(r.jsx)(h.a,{as:"h1",children:"My bookmarks."}),Object(r.jsxs)(v.a,{children:[Object(r.jsx)(g.a,{"aria-label":"Open file",title:"Open file",icon:Object(r.jsx)(O.a,{as:E.a}),onClick:function(){return H.apply(this,arguments)}}),Object(r.jsx)(g.a,{"aria-label":"Save to file",title:"Save to file",icon:Object(r.jsx)(O.a,{as:E.b}),onClick:function(){return V.apply(this,arguments)}}),Object(r.jsx)($,{onBookmarkCreate:function(e){i({type:"NewBookmark",payload:e})}})]})]}),Object(r.jsx)(y.a,{in:Boolean(I),animateOpacity:!0,children:I&&Object(r.jsxs)(x.a,{display:"flex",justifyContent:"space-between",pb:2,children:[Object(r.jsx)(S.a,{children:I.name}),Object(r.jsx)(w.a,{checked:T,onChange:function(e){return L(e.target.checked)},children:"Autosave"})]})}),Object(r.jsx)(C.a,{placeholder:"Search",value:b,onChange:function(e){return m(e.target.value)},mb:8,mt:8}),0===z.length&&Object(r.jsx)(x.a,{textAlign:"center",color:"gray.500",children:"No bookmarks yet. Let's add the first bookmark!"}),Object(r.jsx)(v.b,{spacing:4,align:"stretch",children:z.map((function(e){return Object(r.jsx)(ie,{bookmark:e,onBookmarkUpdate:function(e){return i({type:"UpdateBookmark",payload:e})},onBookmarkDelete:function(e){return i({type:"DeleteBookmark",payload:e})}},e.id)}))}),Object(r.jsx)(x.a,{as:"footer",mt:10,display:"flex",justifyContent:"flex-end",children:Object(r.jsxs)(B.a,{href:"https://github.com/nanot1m/my-bookmarks-app",isExternal:!0,color:"gray.500",children:[Object(r.jsx)(O.a,{as:A.a})," nanot1m"]})})]})},xe=function(e){e&&e instanceof Function&&n.e(12).then(n.bind(null,162)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),c(e),o(e)}))},he="MyBookmarksAppState",ve={getState:function(){return Object(d.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem(he),e.abrupt("return",t?JSON.parse(t):ue(1));case 2:case"end":return e.stop()}}),e)})))()},setState:function(e){localStorage.setItem(he,JSON.stringify(e))}},ge=(fe=ve,{getState:function(){return Object(d.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fe.getState();case 3:if(1===(t=e.sent).version){e.next=8;break}return n=be(t),fe.setState(n),e.abrupt("return",n);case 8:return e.abrupt("return",t);case 11:return e.prev=11,e.t0=e.catch(0),e.abrupt("return",ue(1));case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()},setState:function(e){fe.setState(e)}});ge.getState().then((function(e){var t=Object(c.a)({config:{useSystemColorMode:!0}});l.a.render(Object(r.jsxs)(s.StrictMode,{children:[Object(r.jsx)(o.a,{}),Object(r.jsx)(i.a,{theme:t,children:Object(r.jsx)(ke,{initialState:e,onStateChange:ge.setState})})]}),document.getElementById("root"))})),window.setTestBookmarks=function(){var e=[V({name:"google",url:"https://www.google.com",description:"big search engine",tags:["google","search"]}),V({name:"instagram",url:"https://www.instagram.com/",description:"share photoes and videos",tags:["photo","video","image","social","media"]}),V({name:"youtube",url:"https://www.youtube.com",tags:["google","video"]})];ve.setState(Object(a.a)(Object(a.a)({},ue(1)),{},{bookmarks:e})),window.location.reload()},xe()}},[[117,1,2]]]);
//# sourceMappingURL=main.68954222.chunk.js.map
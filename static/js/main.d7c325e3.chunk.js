(this["webpackJsonpreact-tensor-app"]=this["webpackJsonpreact-tensor-app"]||[]).push([[0],{154:function(e,t){},156:function(e,t){},167:function(e,t){},169:function(e,t){},196:function(e,t){},198:function(e,t){},199:function(e,t){},204:function(e,t){},206:function(e,t){},225:function(e,t){},237:function(e,t){},240:function(e,t){},267:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=267},271:function(e,t,n){"use strict";n.r(t);var r,A,c,o,a,i,s,u,l,b,h,j,f,p,d,O,g,x,w,m,v,y,S,U,k=n(0),C=n.n(k),F=n(140),R=n.n(F),D=n(2),T=n(3),I=Object(T.b)(r||(r=Object(D.a)(["\n    display: flex;\n    flex-direction: row;\n"]))),B=Object(T.b)(A||(A=Object(D.a)(["\n    display: flex;\n    flex-direction: column;\n"]))),G={flex_row:{horz:{left:Object(T.b)(c||(c=Object(D.a)([" "," justify-content: flex-start;"])),I),center:Object(T.b)(o||(o=Object(D.a)([" "," justify-content: center;"])),I),right:Object(T.b)(a||(a=Object(D.a)([" "," justify-content: flex-end;"])),I),in_space:Object(T.b)(i||(i=Object(D.a)([" "," justify-content: space-between;"])),I),in_out_space:Object(T.b)(s||(s=Object(D.a)([" "," justify-content: space-evenly;"])),I)},vert:{top:Object(T.b)(u||(u=Object(D.a)(["align-items:flex-start;"]))),center:Object(T.b)(l||(l=Object(D.a)(["align-items:center;"]))),bottom:Object(T.b)(b||(b=Object(D.a)(["align-items:flex-end;"]))),stretch:Object(T.b)(h||(h=Object(D.a)(["align-items:stretch;"])))}},flex_col:{vert:{top:Object(T.b)(j||(j=Object(D.a)([" "," justify-content: flex-start;"])),B),center:Object(T.b)(f||(f=Object(D.a)([" "," justify-content: center;"])),B),bottom:Object(T.b)(p||(p=Object(D.a)([" "," justify-content: flex-end;"])),B),in_space:Object(T.b)(d||(d=Object(D.a)([" "," justify-content: space-between;"])),B),in_out_space:Object(T.b)(O||(O=Object(D.a)([" "," justify-content: space-evenly;"])),B)},horz:{left:Object(T.b)(g||(g=Object(D.a)(["align-items:flex-start;"]))),center:Object(T.b)(x||(x=Object(D.a)(["align-items:center;"]))),right:Object(T.b)(w||(w=Object(D.a)(["align-items:flex-end;"]))),stretch:Object(T.b)(m||(m=Object(D.a)(["align-items:stretch;"])))}},hover_blink:{forward:Object(T.b)(v||(v=Object(D.a)(["\n            :after {\n                content: '';\n                position: absolute;\n                top: 0;\n                left: 0;\n                width: 0;\n                height: 100%;\n                background-color: rgba(255,255,255,0.4);\n                -webkit-transition: none;\n                -moz-transition: none;\n                transition: none;\n                border-radius: 6ch;\n            }\n            \n            :hover:after {\n                width: 120%;\n                background-color: rgba(255,255,255,0);\n                -webkit-transition: all 1s ease-in-out;\n                -moz-transition: all 1s ease-in-out;\n                transition: all 1s ease-in-out;\n            }\n        "]))),backward:Object(T.b)(y||(y=Object(D.a)(["\n            :not(:hover):after {\n            width: 0;\n            background-color: rgba(255,255,255,0.4);\n            -webkit-transition: all 0.5s ease-out;\n            -moz-transition: all 0.5s ease-out;\n            transition: all 0.5s ease-out;\n        }"])))},img_protection:Object(T.b)(S||(S=Object(D.a)(["\n        ","\n        user-select: none;\n        ","\n        user-drag: none;\n        ","\n        pointer-events: none;\n    "])),"","","")},N=Object(T.a)(U||(U=Object(D.a)(["\n    html, body, #root {\n        height: 100%;\n        width: 100%;\n\t    overflow: hidden;\n    }\n\n    body {\n        margin: 0;\n        background-color: rgb(255, 255, 255);\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n            sans-serif;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n        user-select: none; \n        user-drag: none;\n    }\n\n    .img {\n        ","\n    }\n\n    code {\n        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;\n    }\n"])),G.img_protection),E=n(9),K=n.n(E),q=n(15),Q=n(7),M=n(85),P=n(23),L=n(27),Z=new(function(){function e(){Object(P.a)(this,e),this.localDataKey="LastLoginState",this.user=null,this.onAuthStateChangeCallback=null,this.expireTime=18e5}return Object(L.a)(e,[{key:"setUser",value:function(e){if(this.user=e,e){var t=new Date;e.time=t.getTime(),window.localStorage.setItem(this.localDataKey,JSON.stringify(e))}else window.localStorage.removeItem(this.localDataKey);this.onAuthStateChangeCallback&&this.onAuthStateChangeCallback(e)}},{key:"onAuthStateChanged",value:function(e){this.onAuthStateChangeCallback=e;var t=window.localStorage.getItem(this.localDataKey);if(t){var n=JSON.parse(t);if((new Date).getTime()-n.time<this.expireTime)return void this.setUser(n)}this.setUser(null)}},{key:"signInWithEmailAndPassword",value:function(){var e=Object(q.a)(K.a.mark((function e(t,n){var r=this;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,A){setTimeout((function(){"stephen@invited.com"===t&&"niubideren666"===n?(r.setUser({id:"Stephen-FakeServer-user-id"}),e(r.user)):A(null)}),3e3)})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"signOut",value:function(){var e=Object(q.a)(K.a.mark((function e(){var t=this;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){setTimeout((function(){t.setUser(null),e(!0)}),500)})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}()),V=n(273),J=1,W=2,Y="StphClientID_"+Object(V.a)().replaceAll("-","_"),X="Alan-Stephen-Leong-Song_ServerID_mJygpKissLS4vM",z={iceServers:[{url:"stun:stun.fwdnet.net"},{url:"stun:stun.ideasip.com"},{url:"stun:stun.iptel.org"},{url:"stun:stun.rixtelecom.se"},{url:"stun:stun.schlund.de"},{url:"stun:stunserver.org"},{url:"stun:stun.voiparound.com"},{url:"stun:stun.voipbuster.com"},{url:"stun:stun.voipstunt.com"},{url:"stun:stun.voxgratia.org"},{url:"stun:stun.xten.com"},{url:"stun:stun01.sipphone.com"},{url:"stun:stun.l.google.com:19302"},{url:"stun:stun1.l.google.com:19302"},{url:"stun:stun2.l.google.com:19302"},{url:"stun:stun3.l.google.com:19302"},{url:"stun:stun4.l.google.com:19302"},{url:"turn:homeo@turn.bistri.com:80",credential:"homeo"},{urls:"turn:13.250.13.83:3478?transport=udp",username:"YzYNCouZM1mhqhmseWk6",credential:"YzYNCouZM1mhqhmseWk6"},{url:"turn:numb.viagenie.ca",credential:"muazkh",username:"webrtc@live.com"},{url:"turn:192.158.29.39:3478?transport=udp",credential:"JZEOEt2V3Qb0y27GRntt2u2PAYA=",username:"28224511:1379330808"},{url:"turn:192.158.29.39:3478?transport=tcp",credential:"JZEOEt2V3Qb0y27GRntt2u2PAYA=",username:"28224511:1379330808"},{url:"turn:turn.anyfirewall.com:443?transport=tcp",credential:"webrtc",username:"webrtc"}],sdpSemantics:"unified-plan"},H=n(1),_=(M.AES.encrypt,M.AES.decrypt,Object(k.createContext)(null));function $(e){return{id:e.id}}function ee(e){var t=e.children,n=Object(k.useState)(),r=Object(Q.a)(n,2),A=r[0],c=r[1],o=Object(k.useState)(!1),a=Object(Q.a)(o,2),i=a[0],s=a[1];function u(){return(u=Object(q.a)(K.a.mark((function e(t,n){var r;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Z.signInWithEmailAndPassword(t,n);case 3:return e.abrupt("return",Promise.resolve(!0));case 6:e.prev=6,e.t0=e.catch(0),r=new Error,console.warn(r.stack);case 10:return e.abrupt("return",Promise.resolve(!1));case 11:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function l(){return(l=Object(q.a)(K.a.mark((function e(){return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Z.signOut();case 3:return e.abrupt("return",Promise.resolve(!0));case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",Promise.resolve(!1));case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}Object(k.useEffect)(Object(q.a)(K.a.mark((function e(){return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.next=4;break;case 4:Z.onAuthStateChanged((function(e){e=e?$(e):null,c(e),s(!0)}));case 5:case"end":return e.stop()}}),e)}))),[]);var b={isInit:i,user:A,login:function(e,t){return u.apply(this,arguments)},logout:function(){return l.apply(this,arguments)}};return Object(H.jsx)(_.Provider,{value:b,children:t})}function te(){return Object(k.useContext)(_)}var ne=n(17);var re={name:"YourName-"+Y.slice(-6,-1),photoURL:"data:image/png;base64,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"},Ae=/^[^]+[.]{1}(jpeg|jpg|png|gif)$/,ce=/^([A-Z]|[a-z]|[0-9]|-){0,15}$/,oe=Object(k.createContext)(null);function ae(e){var t=e.children,n=function(e,t,n){var r=Object(k.useState)((function(){n&&window.localStorage.removeItem(e);try{var r=window.localStorage.getItem(e);return r?JSON.parse(r):(window.localStorage.setItem(e,JSON.stringify(t)),t)}catch(A){return console.error(A),t}})),A=Object(Q.a)(r,2),c=A[0],o=A[1];return[c,function(t){try{t=t instanceof Function?t(c):t,window.localStorage.setItem(e,JSON.stringify(t)),o(t)}catch(n){console.error(n)}}]}("info",re,true),r=Object(Q.a)(n,2),A=r[0],c=r[1],o={info:A,setPhoto:function(e){if(!Ae.test(e.name))throw"Invalid image file!";var t=new FileReader;t.onloadend=function(e){c(Object(ne.a)(Object(ne.a)({},A),{},{photoURL:e.currentTarget.result}))},t.readAsDataURL(e)},setName:function(e,t){if(!ce.test(e))throw 15<=e.length?"User name must be 6-15 characters!":"Invalid character!";if(t&&e.length<6)throw"User name must be 6-15 characters!";c(Object(ne.a)(Object(ne.a)({},A),{},{name:e}))}};return Object(H.jsx)(oe.Provider,{value:o,children:t})}function ie(){return Object(k.useContext)(oe)}var se=Object(k.createContext)(null);function ue(e){var t=e.children,n=pe(),r=Object(k.useState)([]),A=Object(Q.a)(r,2),c=A[0],o=A[1];Object(k.useEffect)((function(){n.setOnUsersSnapshot(a)}),[]);var a=function(e){delete e[Y];var t=[];for(var n in e){var r=e[n];r.id=n,t.push(r)}o(t)},i={list:c};return Object(H.jsx)(se.Provider,{value:i,children:t})}var le=n(58),be=n.n(le),he=Object(k.createContext)(null);function je(e){var t=e.children,n=te(),r=ie(),A=Object(k.useState)(!1),c=Object(Q.a)(A,2),o=c[0],a=c[1],i=Object(k.useState)(!1),s=Object(Q.a)(i,2),u=s[0],l=s[1],b=Object(k.useRef)({peer:null,serverConnection:null,onUsersSnapshot:function(){}});Object(k.useEffect)((function(){null==n.user&&l(!1),h()}),[n.user]);var h=function(){if(!b.current.peer){var e=new be.a(Y,z);b.current.peer=e,e.on("open",(function(t){null===e.id&&(e.id=Y),a(!0)})),e.on("error",(function(e){console.log(e)}))}},j={isInit:o,isConnectedToServer:u,connectToServer:function(){if(b.current.serverConnection)l(!0);else{var e=b.current.peer.connect(X);e.on("open",(function(){console.log("Connected to peer server"),b.current.serverConnection=e,l(!0),e.send({type:J,user:r.info})})),e.on("data",(function(e){e.type===W&&e.users&&b.current.onUsersSnapshot(e.users)}))}},setOnUsersSnapshot:function(e){b.current.onUsersSnapshot=e}};return Object(H.jsx)(he.Provider,{value:j,children:t})}function fe(e){var t=e.children;return Object(H.jsx)(ae,{children:Object(H.jsx)(je,{children:Object(H.jsx)(ue,{children:t})})})}function pe(){return Object(k.useContext)(he)}var de=Object(k.createContext)(null);function Oe(e){var t=e.children,n=Object(k.useState)(!1),r=Object(Q.a)(n,2),A=r[0],c=r[1],o=Object(k.useRef)({peer:null,connections:{},users:{}});Object(k.useEffect)((function(){a(o)}),[]);var a=function(e){if(!e.current.peer){console.log("Trying to create a peer server ...");var t=new be.a(X,z);e.current.peer=t,t.on("open",(function(e){console.log("A Peer Server is created on this instance!"),c(!0)})),t.on("connection",(function(e){console.log("Incoming connection id: ",e.peer),i(e)})),t.on("error",(function(t){"unavailable-id"===t.type&&(e.current.peer=null,c(!0))}))}},i=function(e){var t=o.current.connections,n=o.current.users,r=e.peer;e.on("data",(function(A){if(A.type===J&&A.user)for(var c in t[r]=e,n[r]=A.user,t)t[c].send({type:W,users:n})}))},s={isInit:A};return Object(H.jsx)(de.Provider,{value:s,children:t})}var ge,xe=n(10),we=n(59);function me(){return Object(H.jsx)(ke,{})}var ve,ye,Se,Ue,ke=T.c.div(ge||(ge=Object(D.a)(["\n\theight: 400px;\n\twidth: 100%;\n\tbackground-color: lightcyan;\n\t","\n\t","\n\tuser-select: text;\n"])),G.flex_col.vert.center,G.flex_col.horz.center);function Ce(e){var t=e.user;return Object(H.jsxs)(Ge,{children:[Object(H.jsx)(Be,{src:t.photoURL}),Object(H.jsx)(Ne,{children:t.name})]})}function Fe(){var e=Object(k.useContext)(se).list;return Object(H.jsx)(Ee,{children:e.map((function(e,t){return Object(H.jsx)(Ce,{user:e})}))})}var Re,De,Te,Ie,Be=T.c.img(ve||(ve=Object(D.a)(["\n\theight: 6ch;\n\twidth: 6ch;\n\tborder-radius: 3ch;\n\tmargin: 3ch;\n"]))),Ge=T.c.div(ye||(ye=Object(D.a)(["\n\theight: 10ch;\n\twidth: 100%;\n\toverflow: hidden;\n\t","\n\t","\n"])),G.flex_row.horz.left,G.flex_row.vert.center),Ne=T.c.div(Se||(Se=Object(D.a)(["\n\tflex: 1;\n\theight: 100%;\n\toverflow: hidden;\n\tborder-bottom: 2px solid rgba(0,0,0,0.15);\n\t","\n\t","\n"])),G.flex_row.horz.left,G.flex_row.vert.center),Ee=T.c.div(Ue||(Ue=Object(D.a)(["\n\theight: 100%;\n\twidth: 100%;\n\tbackground-color: white;\n\t","\n\t","\n\tuser-select: text;\n"])),G.flex_col.vert.top,G.flex_col.horz.center),Ke=n(11),qe=n.p+"static/media/blue_planet.13ad91ff.svg",Qe=n.p+"static/media/cyan_planet.f7f5fde8.svg",Me=n.p+"static/media/earth.5820ba12.svg",Pe=n.p+"static/media/jupiter.2a74c919.svg",Le=n.p+"static/media/moon.fe14d20b.svg",Ze=n.p+"static/media/orange_planet.bbf32967.svg",Ve=n.p+"static/media/red_planet.3a0827a7.svg",Je=n.p+"static/media/ring_planet.0b6db24e.svg",We=n.p+"static/media/star.3c47846d.svg";function Ye(e){var t=e.x,n=e.y,r=e.slowDown,A=e.springProps,c=e.children,o={transform:A.xy.interpolate((function(e,A){return"translate3d(".concat(e/r+t,"px, ").concat(A/r+n,"px,0)")}))};return Object(H.jsx)(tt,{style:o,children:c})}function Xe(e){var t=e.svg,n=e.x,r=e.y,A=e.w,c=e.slowDown,o=e.springProps,a={width:"".concat(A,"ch"),transform:o.xy.interpolate((function(e,t){return"translate3d(".concat(e/c+n,"px, ").concat(t/c+r,"px, 0)")}))};return Object(H.jsx)($e,{src:t,style:a})}function ze(e){var t=e.children,n=Object(Ke.b)((function(){return{xy:[0,0],config:{mass:10,tension:600,friction:100}}})),r=Object(Q.a)(n,2),A=r[0],c=r[1],o=function(e,t){return[e-window.innerWidth/2,t-window.innerHeight/2]};return Object(H.jsxs)(_e,{onMouseMove:function(e){var t=e.clientX,n=e.clientY;return c({xy:o(t,n)})},children:[Object(H.jsx)(et,{src:We,x:800,y:-200,w:5}),Object(H.jsx)(et,{src:We,x:-800,y:-100,w:2.5}),Object(H.jsx)(et,{src:We,x:600,y:300,w:3.5}),Object(H.jsx)(et,{src:We,x:730,y:-170,w:2}),Object(H.jsx)(et,{src:We,x:-400,y:200,w:2}),Object(H.jsx)(et,{src:We,x:-300,y:260,w:4}),Object(H.jsx)(et,{src:We,x:300,y:-50,w:4}),Object(H.jsx)(et,{src:We,x:50,y:-350,w:10}),Object(H.jsx)(et,{src:We,x:150,y:-330,w:2}),Object(H.jsx)(Xe,{svg:Ze,x:550,y:-200,w:14,slowDown:52,springProps:A}),Object(H.jsx)(Xe,{svg:Pe,x:400,y:-290,w:30,slowDown:35,springProps:A}),Object(H.jsx)(Xe,{svg:Je,x:-200,y:-120,w:120,slowDown:23,springProps:A}),Object(H.jsx)(Xe,{svg:qe,x:570,y:100,w:16,slowDown:18,springProps:A}),Object(H.jsx)(Xe,{svg:Ve,x:150,y:150,w:44,slowDown:10,springProps:A}),Object(H.jsx)(Xe,{svg:Qe,x:-300,y:-220,w:15,slowDown:5,springProps:A}),Object(H.jsx)(Xe,{svg:Me,x:-330,y:-180,w:20,slowDown:3,springProps:A}),Object(H.jsx)(Xe,{svg:Le,x:-380,y:-150,w:6,slowDown:2.5,springProps:A}),Object(H.jsx)(Ye,{x:0,y:0,slowDown:40,springProps:A,children:t})]})}var He,_e=T.c.div(Re||(Re=Object(D.a)(["\n    height: 100%;\n    width: 100%;\n\toverflow: hidden;\n    /* color: #003e3e; */\n    background-image: linear-gradient(150deg,  #4f719b,  #583056 , #003e3e);\n    ","\n    ","\n"])),G.flex_col.vert.center,G.flex_col.horz.center),$e=Object(T.c)(Ke.a.img)(De||(De=Object(D.a)(["\n    position: absolute;\n    will-change: transform;\n    -webkit-filter: drop-shadow( 0px 0px 6px rgba(255, 255, 255, 0.3));\n    filter: drop-shadow( 0px 0px 6px rgba(255, 255, 255, 0.3));\n    ","\n"])),G.img_protection),et=T.c.img(Te||(Te=Object(D.a)(["\n    position: absolute;\n    width: ","ch;\n    transform: translate3d( ","px, ","px, 0);\n    -webkit-filter: drop-shadow( 0px 0px 10px rgba(255, 255, 255, 0.8));\n    filter: drop-shadow( 0px 0px 10px rgba(255, 255, 255, 0.8));\n    ","\n"])),(function(e){return e.w}),(function(e){return e.x}),(function(e){return e.y}),G.img_protection),tt=Object(T.c)(Ke.a.div)(Ie||(Ie=Object(D.a)(["\n    height: 48ch;\n    width: 45ch;\n\toverflow: hidden;\n    border-radius: 4ch;\n    background-color: rgba(255, 255, 255, 0.2);\n    -webkit-backdrop-filter: blur(10px);\n    -webkit-filter: drop-shadow( 0px 0px 10px rgba(0, 0, 0, 0.6));\n    filter: drop-shadow( 0px 0px 10px rgba(0, 0, 0, 0.6));\n    backdrop-filter: blur(10px);\n    ","\n    ","\n"])),G.flex_col.vert.center,G.flex_col.horz.center),nt=n(40);function rt(e,t){var n=Object(Ke.b)((function(){return{scale:e,config:t||{mass:1,tension:370,friction:10}}})),r=Object(Q.a)(n,2),A=r[0],c=r[1];return[{transform:A.scale.interpolate((function(e){return"scale(".concat(e,")")}))},function(e,t){return new Promise((function(n,r){var A={scale:e,onRest:n};t&&(A.config=t),c(A)}))}]}function At(e,t){var n=Object(k.useRef)(!1),r=Object(Ke.b)((function(){return{percentage:0,config:t||{mass:1,tension:470,friction:5}}})),A=Object(Q.a)(r,2),c=A[0],o=A[1];return[{transform:c.percentage.interpolate({range:[0,.5,1],output:[0,1,0]}).interpolate(e)},function(){return new Promise((function(e,t){n.current=!n.current,o({percentage:n.current?1:0,onRest:e})}))}]}var ct,ot,at,it,st=Object(k.memo)((function(e){var t=e.className,n=e.children,r=e.onMouseDown,A=e.onMouseUp,c=e.onMouseLeave,o=Object(nt.a)(e,["className","children","onMouseDown","onMouseUp","onMouseLeave"]),a=rt(1),i=Object(Q.a)(a,2),s=i[0],u=i[1];return Object(H.jsx)(ut,Object(ne.a)(Object(ne.a)({className:t,style:s,onMouseDown:function(){u(.9),r&&r()},onMouseUp:function(){u(1),A&&A()},onMouseLeave:function(){u(1),c&&c()}},o),{},{children:n}))})),ut=Object(T.c)(Ke.a.button)(He||(He=Object(D.a)(["\n    height: 6ch;\n\twidth: 30ch;\n    margin: 1.5ch;\n    color: white;\n    background-color: #ff80c0;\n    border-radius: 4ch;\n    border: none;\n    cursor: pointer;\n    overflow: hidden;\n\n    ","\n\t","\n\n    /* \u4ece\u5de6\u5f80\u53f3\u7684\u95ea\u5149\u6548\u679c\uff0c css transition \u52a8\u753b */\n    ","\n\t","\n\n    :focus{\n        outline: none;\n    }\n\n    \n"])),G.flex_col.vert.center,G.flex_col.horz.center,G.hover_blink.forward,G.hover_blink.backward),lt=n.p+"static/media/loading.13f33801.svg",bt=Object(k.memo)((function(e){var t=e.className,n=Object(Ke.b)({i:0,config:{mass:70,tensor:1.5,friction:0,velocity:10}}).i;return Object(H.jsx)(ht,{className:t,src:lt,style:{transform:n.interpolate((function(e){return"rotate(".concat(45*e,"deg)")}))}})})),ht=Object(T.c)(Ke.a.img)(ct||(ct=Object(D.a)(["\n    width : 10ch;\n    -webkit-filter: drop-shadow( 0px 0px 10px rgba(0, 0, 0, 0.2));\n    filter: drop-shadow( 0px 0px 10px rgba(0, 0, 0, 0.2));\n"])));function jt(e){var t=e.reference,n=e.style,r=Object(nt.a)(e,["reference","style"]),A=At((function(e){return"translate3d(".concat(2*e,"ch, 0, 0)")})),c=Object(Q.a)(A,2),o=c[0],a=c[1];return t.current={triggerShaking:a},Object(H.jsx)(vt,Object(ne.a)({type:"password",placeholder:"INVITATION CODE",style:Object(ne.a)(Object(ne.a)({},o),n)},r))}function ft(){var e=te(),t=Object(k.useRef)(),n=Object(k.useState)(""),r=Object(Q.a)(n,2),A=r[0],c=r[1],o=Object(k.useState)(null),a=Object(Q.a)(o,2),i=a[0],s=a[1],u=Object(k.useState)(!1),l=Object(Q.a)(u,2),b=l[0],h=l[1],j=function(){var n=Object(q.a)(K.a.mark((function n(){var r;return K.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!b){n.next=2;break}return n.abrupt("return");case 2:return h(!0),n.next=5,e.login("stephen@invited.com",A);case 5:r=n.sent,h(!1),r||(s("Invalid invitation code!"),t.current.triggerShaking());case 8:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)(jt,{reference:t,value:A,onChange:function(e){c(e.target.value),s(null)}}),Object(H.jsx)(yt,{onClick:j,children:" LOGIN "}),!b&&i&&Object(H.jsx)(mt,{children:i}),b&&Object(H.jsx)(bt,{})]})}var pt,dt,Ot,gt,xt,wt,mt=T.c.p(ot||(ot=Object(D.a)(["\n    color: #fad692;\n    text-shadow: 0px 0px 13px rgba(0, 0, 0, 0.5);\n"]))),vt=Object(T.c)(Ke.a.input)(at||(at=Object(D.a)(["\n    height: 6ch;\n\twidth: 30ch;\n    margin: 1.5ch;\n    color: #2c2c4e;\n    background-color: white;\n    border-radius: 4ch;\n    border: none;\n    text-align: center;\n\n    :focus{\n        outline: none;\n    }\n"]))),yt=Object(T.c)(st)(it||(it=Object(D.a)(["\n    height: 6ch;\n\twidth: 30ch;\n    margin: 1.5ch;\n    color: white;\n    background-color: #53c6b1;\n    border-radius: 4ch;\n"])));function St(e){var t=e.reference,n=e.src,r=e.onChange,A=At((function(e){return"translate3d(".concat(1.5*e,"ch, 0, 0)")})),c=Object(Q.a)(A,2),o=c[0],a=c[1],i=rt(1),s=Object(Q.a)(i,2),u=s[0],l=s[1],b=Object(k.useState)(u),h=Object(Q.a)(b,2),j=h[0],f=h[1],p="login_user_photo";return t.current={triggerShaking:function(){f(o),a()}},Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)(Rt,{htmlFor:p,onMouseDown:function(){f(u),l(.85)},onMouseUp:function(){f(u),l(1)},onMouseLeave:function(){f(u),l(1)},style:j,children:Object(H.jsx)(Tt,{src:n})}),Object(H.jsx)(Bt,{id:p,type:"file",accept:"image/*",onChange:r})]})}function Ut(e){var t=e.reference,n=Object(nt.a)(e,["reference"]),r=At((function(e){return"translate3d(".concat(e,"ch, 0, 0)")})),A=Object(Q.a)(r,2),c=A[0],o=A[1];return t.current={triggerShaking:o},Object(H.jsx)(It,Object(ne.a)({type:"text",placeholder:"YOUR USER NAME",style:c},n))}function kt(){var e=pe().connectToServer,t=ie(),n=t.info,r=n.name,A=n.photoURL,c=t.setName,o=t.setPhoto,a=Object(k.useRef)(),i=Object(k.useRef)(),s=Object(k.useState)(!1),u=Object(Q.a)(s,2),l=u[0],b=u[1],h=Object(k.useState)(null),j=Object(Q.a)(h,2),f=j[0],p=j[1],d=Object(xe.h)(),O=Object(xe.g)(),g=function(){var t=Object(q.a)(K.a.mark((function t(){return K.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{p(null),c(r,!0),b(!0),e(),O.replace(d.state?d.state.from:Yt)}catch(f){p(f),a.current.triggerShaking()}case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)(St,{reference:i,src:A,onChange:function(e){if(e.target.files&&e.target.files[0])try{p(null),o(e.target.files[0])}catch(f){p(f),i.current.triggerShaking()}}}),Object(H.jsx)(Ut,{reference:a,value:r,onChange:function(e){try{p(null),c(e.target.value,!1)}catch(f){p(f),a.current.triggerShaking()}}}),!l&&Object(H.jsx)(Gt,{onClick:g,children:" START "}),!l&&f&&Object(H.jsx)(Dt,{children:f}),l&&Object(H.jsx)(bt,{})]})}var Ct,Ft,Rt=Object(T.c)(Ke.a.label)(pt||(pt=Object(D.a)(["\n    width: 15ch;\n    height: 15ch;\n    margin: 1.5ch;\n    border-radius: 10ch;\n    border: none;\n    overflow: hidden;\n    box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.5);\n    cursor: pointer;\n    ","\n    ","\n    \n    ","\n    ","\n    :after {\n        border-radius: 0ch;\n    }\n"])),G.hover_blink.forward,G.hover_blink.backward,G.flex_col.horz.center,G.flex_col.vert.center),Dt=T.c.p(dt||(dt=Object(D.a)(["\n    color: #fad692;\n    text-shadow: 0px 0px 13px rgba(0, 0, 0, 0.5);\n"]))),Tt=T.c.img(Ot||(Ot=Object(D.a)(["\n    height: 100%;\n\twidth:  100%;\n    ","\n"])),G.img_protection),It=Object(T.c)(Ke.a.input)(gt||(gt=Object(D.a)(["\n    height: 6ch;\n\twidth: 30ch;\n    margin: 1.5ch;\n    color: #2c2c4e;\n    background-color: white;\n    border-radius: 4ch;\n    border: none;\n    text-align: center;\n\n    :focus{\n        outline: none;\n    }\n"]))),Bt=T.c.input(xt||(xt=Object(D.a)(["\n    height: 0;\n\twidth: 0;\n    opacity: 0;\n    border: none;\n    :focus{\n        outline: none;\n    }\n"]))),Gt=Object(T.c)(st)(wt||(wt=Object(D.a)(["\n    height: 6ch;\n\twidth: 30ch;\n    margin: 1.5ch;\n    color: white;\n    background-color: #d071b4;\n    border-radius: 4ch;\n"]))),Nt=Object(k.memo)((function(e){var t=e.reference,n=e.isPopup,r=e.isShownAtStart,A=e.children,c=e.className,o=rt(r?1:0),a=Object(Q.a)(o,2),i=a[0],s=a[1],u={popup:function(){var e=Object(q.a)(K.a.mark((function e(t){return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=t,!e.t0){e.next=4;break}return e.next=4,new Promise((function(e){return setTimeout(e,t)}));case 4:return e.abrupt("return",s(1,{mass:1,tension:370,friction:10}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),hide:function(){var e=Object(q.a)(K.a.mark((function e(t){return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=t,!e.t0){e.next=4;break}return e.next=4,new Promise((function(e){return setTimeout(e,t)}));case 4:return e.abrupt("return",s(0,{mass:1,tension:400,friction:35}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()};return t?t.current=u:n?u.popup():u.hide(),Object(H.jsx)(Et,{style:i,className:c,children:A})})),Et=Object(T.c)(Ke.a.div)(Ct||(Ct=Object(D.a)(["\n\twidth: 100%;\n\theight: 100%;\n"])));function Kt(){var e=te(),t=Object(k.useRef)(null),n=Object(k.useState)(1),r=Object(Q.a)(n,2),A=r[0],c=r[1];return Object(k.useEffect)(Object(q.a)(K.a.mark((function n(){return K.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!e.isInit){n.next=9;break}if(e.user){n.next=5;break}t.current.popup(300),n.next=9;break;case 5:return n.next=7,t.current.hide();case 7:c(2),t.current.popup(400);case 9:case"end":return n.stop()}}),n)}))),[e.isInit,e.user]),Object(H.jsxs)(Mt,{reference:t,isShownAtStart:!1,children:[1===A&&Object(H.jsx)(ft,{}),2===A&&Object(H.jsx)(kt,{})]})}function qt(){return Object(H.jsx)(ze,{children:Object(H.jsx)(Kt,{})})}var Qt,Mt=Object(T.c)(Nt)(Ft||(Ft=Object(D.a)(["\n\twidth: 100%;\n\theight: 100%;\n\toverflow: hidden;\n\t","\n\t","\n"])),G.flex_col.horz.center,G.flex_col.vert.center);function Pt(){var e=te();return Object(H.jsx)(Jt,{children:e.user&&e.user.email})}var Lt,Zt,Vt,Jt=T.c.div(Qt||(Qt=Object(D.a)(["\n\theight: 400px;\n\twidth: 100%;\n\tbackground-color: lightseagreen;\n\t","\n\t","\n"])),G.flex_col.vert.in_out_space,G.flex_col.horz.left),Wt="/login",Yt="/",Xt="/groupchat",zt="/profile";function Ht(e){var t=e.redirectPath,n=Object(xe.h)();return Object(H.jsx)(xe.b,{path:"*",children:Object(H.jsx)(xe.a,{to:{pathname:t,state:{from:n}}})})}var _t=Object(k.memo)((function(){return Object(H.jsxs)(xe.d,{children:[Object(H.jsxs)(xe.b,{exact:!0,path:Wt,children:[" ",Object(H.jsx)(qt,{})," "]}),Object(H.jsx)(Ht,{redirectPath:Wt})]})}));function $t(){var e=te();return Object(H.jsxs)(H.Fragment,{children:[Object(H.jsxs)(xe.d,{children:[Object(H.jsxs)(xe.b,{exact:!0,path:Yt,children:[" ",Object(H.jsx)(Fe,{})," "]}),Object(H.jsxs)(xe.b,{exact:!0,path:Xt,children:[" ",Object(H.jsx)(me,{})," "]}),Object(H.jsxs)(xe.b,{exact:!0,path:zt,children:[" ",Object(H.jsx)(Pt,{}),"  "]}),Object(H.jsx)(Ht,{redirectPath:Yt})]}),Object(H.jsxs)(An,{children:[Object(H.jsx)(rn,{to:Yt,children:"Home"}),Object(H.jsx)(rn,{to:Xt,children:"Group Chat"}),Object(H.jsx)(rn,{to:zt,children:"Profile"}),Object(H.jsx)("button",{onClick:function(){return e.logout()},children:"sign out"})]})]})}function en(){var e=te(),t=Object(k.useContext)(de),n=pe();return Object(H.jsx)(H.Fragment,{children:e.isInit&&t.isInit&&n.isInit?Object(H.jsx)(we.a,{children:e.user&&n.isConnectedToServer?Object(H.jsx)($t,{}):Object(H.jsx)(_t,{})}):Object(H.jsx)(nn,{})})}var tn,nn=Object(T.c)(bt)(Lt||(Lt=Object(D.a)(["\n    width: 30ch;\n"]))),rn=Object(T.c)(we.b)(Zt||(Zt=Object(D.a)(["\n    flex: 1;\n    height: 100%;\n    color: black;\n    text-decoration: none;\n    ","\n    ","\n"])),G.flex_row.horz.center,G.flex_row.vert.center),An=T.c.div(Vt||(Vt=Object(D.a)(["\n    width: 100%;\n    height: 50px;\n    background-color: #ececec;\n    ","\n    ","\n"])),G.flex_row.horz.in_out_space,G.flex_row.vert.center);var cn=T.c.div(tn||(tn=Object(D.a)(["\n\tbackground-color: #ffffff;\n\twidth: 100%;\n\theight: 100%;\n\toverflow: hidden;\n\t","\n\t","\n\tbackground-image: linear-gradient(150deg,  #4f719b,  #583056 , #003e3e);\n"])),G.flex_col.horz.center,G.flex_col.vert.center),on=function(){return Object(H.jsxs)(cn,{children:[Object(H.jsx)(N,{}),Object(H.jsx)(ee,{children:Object(H.jsx)(Oe,{children:Object(H.jsx)(fe,{children:Object(H.jsx)(en,{})})})})]})},an=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,274)).then((function(t){var n=t.getCLS,r=t.getFID,A=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),A(e),c(e),o(e)}))};R.a.render(Object(H.jsx)(C.a.StrictMode,{children:Object(H.jsx)(on,{})}),document.getElementById("root")),an()}},[[271,1,2]]]);
//# sourceMappingURL=main.d7c325e3.chunk.js.map
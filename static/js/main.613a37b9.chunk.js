(window.webpackJsonpfindline=window.webpackJsonpfindline||[]).push([[0],{213:function(e,t,n){e.exports=n(383)},214:function(e,t,n){},217:function(e,t,n){},383:function(e,t,n){"use strict";n.r(t);n(214),n(215);var r=n(21),a=n(27);function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=e.slice().sort((function(e,t){return e-t})),n=t.length,r=n%2!==0,a=r?(n-1)/2:n/2,o=t.slice(0,a).reverse(),l=t.slice(r?a+1:a),i=r?t[a]:null,c=(l[0]-o[0])/2+o[0],u=i===c,s=l.map((function(e,t){return Math.abs(c-e)===Math.abs(o[t]-c)})).every((function(e){return!!e}));return{center:c,isOdd:r,oddElement:i,isOddMatchCenter:r?u:null,result:r?!!u&&s:s,arr:e}}o.sourceName="findLine";var l=n(0),i=n.n(l),c=(n(217),n(384)),u=n(396),s=n(51);function m(e,t,n){return function(){for(var r=[],a=Date.now(),o=0;o<n;o++)for(var l=0;l<t;l++){var i=e.apply(null,arguments[0]);r.push(i)}return{results:r,time:Date.now()-a}}}function d(e,t,n,r){for(var a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=[],l=0;l<e.length;l++)o.push({name:e[l].sourceName,func:m(e[l],t,n),time:0,count:[],date:[],results:[],serial:l,run:function(e){var t=this.func(r),n=t.time,o=t.results;this.time=n,this.count.push(n),this.date.push(Date.now()),this.results=o,a&&this.print(),e&&e({time:n,name:this.name,results:o})},print:function(){console.log('Function "'.concat(this.name,'" - time: ').concat(this.time," ms")),console.log("Results: ",this.results),console.log("- - ".repeat(15))},getAverage:function(){for(var e=0,t=0;t<this.count.length;t++)e+=this.count[t];return e/this.count.length},done:function(){var e=Math.max.apply(Math,Object(s.a)(this.count)),t=Math.min.apply(Math,Object(s.a)(this.count)),n=parseInt(100-t/e*100);return{max:e,min:t,average:this.getAverage(),persent:n}},printDone:function(){var e=this.done();console.log(this.name+" = max time "+e.max+" / mim time "+e.min+" / average "+e.average+" / persent "+e.persent)}});return o}var f=function(e,t,n){console.log("=".repeat(30)),console.log("Start Benchmark ".concat((new Date).toLocaleString())),console.log("Settings: inRow - ".concat(e,", loops - ").concat(t,", iteration - ").concat(n)),console.log("=".repeat(30))},g=function(e){console.log("=".repeat(30)),console.log("End Benchmark ".concat((new Date).toLocaleString())),console.log("=".repeat(30)),e.forEach((function(e){return e.printDone()}))},b=function(e){return e.map((function(e){return{labels:Array.from({length:e.count.length}).map((function(e,t){return t+1})),datasets:[{label:e.name,backgroundColor:"rgba(255,99,132,0.2)",borderColor:"rgba(255,99,132,1)",borderWidth:1,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",data:e.count}]}}))},p=n(184);function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(n,!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.args,n=e.delay,r=void 0===n?500:n,o=e.functions,s=e.inRow,m=void 0===s?1e3:s,v=e.iteration,E=void 0===v?1:v,y=e.loops,O=void 0===y?100:y,j=e.printToConsole,w=void 0!==j&&j,C=e.disable,P=e.onStart,S=void 0===P?function(){}:P,D=e.onEnd,A=void 0===D?function(){}:D,k=Object(l.useState)({inProgress:!1,result:null}),T=Object(a.a)(k,2),N=T[0],x=T[1],M=N.inProgress,R=N.result;Object(l.useEffect)((function(){R&&console.log("result",R)}),[R]);var L=d(o,m,O,t,w),F=function(){S(),I(null),w&&f(m,O,E),x((function(e){return h({},e,{inProgress:!0})}))},B=function(){A({items:L.map((function(e){return h({},e,{settings:{args:t,delay:r,inRow:m,iteration:E,loops:O,printToConsole:w}})}))}),w&&g(L),x((function(e){return h({},e,{inProgress:!1,result:b(L)})}))},I=function(e){x((function(t){return h({},t,{result:e})}))},G=function(){for(var e=0;e<L.length;e++)L[e].run()},q=function(){F(),setTimeout(G,0),setTimeout((function(){E>1?(E--,setTimeout((function e(){G(),--E>0?setTimeout(e,r):B()}),r)):B()}),100)};return i.a.createElement("div",null,i.a.createElement("div",null,(void 0===o||0===o.length)&&i.a.createElement("div",{className:"branchmark__message warning"},"there is not functions yet"),i.a.createElement(c.a,{loading:M,disabled:M||C,onClick:q},"Start"),R&&R.map((function(e,t){return i.a.createElement(p.a,{key:t,data:e,width:100,height:50})})),!R&&!M&&i.a.createElement(u.a,null,i.a.createElement("p",null,"No result yet."))))},y=n(394),O=n(126),j=n(397),w=n(395),C=n(393),P=n(392),S=function(e,t){return e+Math.floor(Math.random()*(t+1-e))},D=function(e,t){return e.slice().reverse().map((function(e){return t+(t-e)}))},A=O.array().of(O.number().min(-100).max(100).integer()),k=function(e){var t=e.state,n=t.delay,r=t.inRow,o=t.loops,m=t.iteration,d=t.printToConsole,f=t.disabled,g=t.initialArgs,b=e.onValidArgs,p=e.onArgsChange,v=e.onChange,h=function(e){var t=e.target,n=t.name,r=t.value;v(n,Number(r))},E=Object(l.useState)(10),y=Object(a.a)(E,2),O=y[0],k=y[1],T=Object(l.useState)(10),N=Object(a.a)(T,2),x=N[0],M=N[1],R=Object(l.useState)(g),L=Object(a.a)(R,2),F=L[0],B=L[1],I=Object(l.useState)(""),G=Object(a.a)(I,2),q=G[0],J=G[1],V=function(e,t){try{return e.validateSync(t),{valid:!0,error:""}}catch(n){return{valid:!1,error:n.message}}};return Object(l.useEffect)((function(){var e=V(A,F),t=e.error,n=e.valid;p(F),b(n),J(t)}),[]),i.a.createElement("div",null,i.a.createElement(j.a,{as:"h3"},"Settings"),i.a.createElement(w.a,null,i.a.createElement(w.a.Group,{widths:"equal"},i.a.createElement(w.a.Field,null,i.a.createElement("label",null,"Delay"),i.a.createElement(C.a,{disabled:f,onChange:h,value:n,name:"delay",type:"number"})),i.a.createElement(w.a.Field,null,i.a.createElement("label",null,"In row"),i.a.createElement(C.a,{disabled:f,onChange:h,value:r,name:"inRow",type:"number"})),i.a.createElement(w.a.Field,null,i.a.createElement("label",null,"Loops"),i.a.createElement(C.a,{disabled:f,onChange:h,value:o,name:"loops",type:"number"})),i.a.createElement(w.a.Field,null,i.a.createElement("label",null,"Iterations"),i.a.createElement(C.a,{disabled:f,onChange:h,value:m,name:"iteration",type:"number"}))),i.a.createElement(w.a.Field,null,i.a.createElement(P.a,{disabled:f,onChange:function(e,t){v(e,t)}.bind(null,"printToConsole",!d),label:"print to console",checked:d}))),i.a.createElement("div",null,i.a.createElement("br",null),i.a.createElement(j.a,{as:"h3"},"Arguments"),i.a.createElement(C.a,{error:!!q,fluid:!0,disabled:f,onChange:function(e){var t=e.target.value.split(",").map((function(e){return e.trim()})).map((function(e){return e?isNaN(e)?e:Number(e.trim()):e})),n=V(A,t),r=n.error,a=n.valid;J(r),b(a),B(t),p(t)},value:F.join(","),name:"args",type:"text"}),!!q&&i.a.createElement(u.a,{negative:!0},i.a.createElement("p",null,q)),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(C.a,{min:"0",disabled:f,onChange:function(e){var t=e.target.value;k((function(e){return Number(t)}))},value:O,name:"symetricLength",type:"number"})," "," "," "," ",i.a.createElement(c.a,{disabled:f,onClick:function(e){var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.min,r=void 0===n?-50:n,a=t.max,o=void 0===a?50:a;if(e>100)throw new Error("Length must be less or equal to 100");var l=e%2!==0,i=l?(e-1)/2:e/2,c=Array.from({length:i}).map((function(e){return S(r,o/2)})).sort((function(e,t){return e-t})),u=c[i-1],m=S(u+1,u+9),d=D(c,m),f=[].concat(Object(s.a)(c),Object(s.a)(l?[m]:[]),Object(s.a)(d));return{result:f,center:m}}(e).result,n=V(A,t),r=n.error,a=n.valid;B(t),b(a),p(t),J(r)}.bind(null,O)},"Gen symetric array"),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(C.a,{min:"0",disabled:f,onChange:function(e){var t=e.target.value;M((function(e){return Number(t)}))},value:x,name:"asymetricLength",type:"number"})," "," "," ",i.a.createElement(c.a,{disabled:f,onClick:function(e){var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.min,r=void 0===n?-50:n,a=t.max,o=void 0===a?50:a;return Array.from({length:e}).map((function(e){return S(r,o)}))}(e),n=V(A,t),r=n.error,a=n.valid;B(t),b(a),p(t),J(r)}.bind(null,x)},"Gen asymetric array")))};function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(n,!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var x=function(){var e=Object(l.useState)({delay:500,inRow:1e3,loops:100,iteration:1,printToConsole:!0,disabled:!1,initialArgs:[1,2,3]}),t=Object(a.a)(e,2),n=t[0],c=t[1],u=Object(l.useState)({history:[],args:null,validArgs:!1}),s=Object(a.a)(u,2),m=s[0],d=s[1],f=m.args,g=m.validArgs,b=n.delay,p=n.inRow,v=n.loops,h=n.iteration,O=n.printToConsole;return i.a.createElement("div",null,i.a.createElement("br",null),i.a.createElement(y.a,null,i.a.createElement(k,{onArgsChange:function(e){d((function(t){return N({},t,{args:e})}))},onChange:function(e,t){c((function(n){return N({},n,Object(r.a)({},e,t))}))},state:n,onValidArgs:function(e){d((function(t){return N({},t,{validArgs:e})}))}}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(E,{disable:!g,onStart:function(){c((function(e){return N({},e,{disabled:!0})}))},onEnd:function(e){c((function(e){return N({},e,{disabled:!1})}))},functions:[o,o],args:[f],printToConsole:O,loops:v,inRow:p,iteration:h,delay:b})))},M=n(50);n.n(M).a.render(i.a.createElement(x,null),document.getElementById("root"))}},[[213,1,2]]]);
//# sourceMappingURL=main.613a37b9.chunk.js.map
(window.webpackJsonpfindline=window.webpackJsonpfindline||[]).push([[0],[,,,,function(n,t,e){n.exports=e(12)},,,,,function(n,t,e){},function(n,t,e){},function(n,t,e){},function(n,t,e){"use strict";e.r(t);var o=e(0),r=e.n(o),i=e(3),a=e.n(i),c=(e(9),e(10),function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=n.slice().sort((function(n,t){return n-t})),e=t.length,o=e%2!==0,r=o?(e-1)/2:e/2,i=t.slice(0,r).reverse(),a=t.slice(o?r+1:r),c=o?t[r]:null,s=(a[0]-i[0])/2+i[0],l=c===s,u=a.map((function(n,t){return Math.abs(s-n)===Math.abs(i[t]-s)})).every((function(n){return!!n})),h=o?!!l&&u:u;return{center:s,isOdd:o,oddElement:c,isOddMatchCenter:o?l:null,result:h,arr:n}}),s=e(1),l=function(n,t){return n+Math.floor(Math.random()*(t+1-n))},u=function(n,t){return n.slice().reverse().map((function(n){return t+(t-n)}))},h=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.min,o=void 0===e?-50:e,r=t.max,i=void 0===r?50:r;if(n>100)throw new Error("Length must be less or equal to 100");var a=n%2!==0,c=a?(n-1)/2:n/2,h=Array.from({length:c}).map((function(n){return l(o,i/2)})).sort((function(n,t){return n-t})),m=h[c-1],f=l(m+1,m+9),v=u(h,f),g=[].concat(Object(s.a)(h),Object(s.a)(a?[f]:[]),Object(s.a)(v));return{result:g,center:f}};e(11);function m(n,t,e){return function(){for(var o=[],r=Date.now(),i=0;i<e;i++)for(var a=0;a<t;a++){var c=n.apply(null,arguments[0]);o.push(c)}return{results:o,time:Date.now()-r}}}function f(n,t,e,o){for(var r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=[],a=0;a<n.length;a++)i.push({name:n[a].name,func:m(n[a],t,e),time:0,count:[],results:[],serial:a,run:function(){var n=this.func(o),t=n.time,e=n.results;this.time=t,this.count.push(t),this.results=e,r&&this.print()},print:function(){console.log('Function "'.concat(this.name,'" - time: ').concat(this.time," ms")),console.log("Results: ",this.results),console.log("- - ".repeat(15))},getAverage:function(){for(var n=0,t=0;t<this.count.length;t++)n+=this.count[t];return n/this.count.length},done:function(){var n=Math.max.apply(Math,Object(s.a)(this.count)),t=Math.min.apply(Math,Object(s.a)(this.count)),e=parseInt(100-t/n*100);return{max:n,min:t,average:this.getAverage(),persent:e}},printDone:function(){var n=this.done();console.log(this.name+" = max time "+n.max+" / mim time "+n.min+" / average "+n.average+" / persent "+n.persent)}});return i}var v=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.args,e=n.delay,o=void 0===e?500:e,i=n.functions,a=n.inRow,c=void 0===a?1e3:a,s=n.iteration,l=void 0===s?1:s,u=n.loops,h=void 0===u?100:u,m=n.printToConsole,v=void 0!==m&&m,g=f(i,c,h,t,v);console.log("items",g);var d=function(){console.log("=".repeat(30)),console.log("Start Benchmark ".concat((new Date).toLocaleString())),console.log("Settings: inRow - ".concat(c,", loops - ").concat(h,", iteration - ").concat(l)),console.log("=".repeat(30))};function p(n){console.log("=".repeat(30)),console.log("End Benchmark ".concat((new Date).toLocaleString())),console.log("=".repeat(30)),n.forEach((function(n){return n.printDone()}))}var w=function(){for(var n=0;n<g.length;n++)g[n].run()};return v&&d(),w(),l>1?(l--,setTimeout((function n(){w(),--l>0?setTimeout(n,o):v&&p(g)}),o)):v&&p(g),r.a.createElement("div",null,r.a.createElement("div",{className:"benchmark"},(void 0===i||0===i.length)&&r.a.createElement("div",{className:"branchmark__message warning"},"there is not functions yet")))};var g=function(){return r.a.createElement("div",null,r.a.createElement(v,{loops:1e3,inRow:1e3,printToConsole:!0,functions:[c],args:[h(14).result],iteration:"5"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()}))}],[[4,1,2]]]);
//# sourceMappingURL=main.680b292a.chunk.js.map
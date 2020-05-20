(this.webpackJsonpban=this.webpackJsonpban||[]).push([[0],{41:function(e,t,a){e.exports=a(84)},63:function(e,t,a){},64:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},82:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),o=a.n(c),i=a(34),u=a.n(i),l=(a(63),a(64),a(12));a(70);var s=function(e){var t=e.id,a=e.title,n=e.children;return r.a.createElement("div",{className:"mycard mycard--light",id:"mycard--".concat(t)},r.a.createElement("div",{className:"mycard__title"},r.a.createElement("h2",null,a)),r.a.createElement("div",{className:"mycard__body"},n))};function h(e){var t=e.data;return r.a.createElement(s,{title:t.date},r.a.createElement("p",null,"min: ",t.temp.min),r.a.createElement("p",null,"max: ",t.temp.max))}var m=a(85);a(71);var d=Object(l.b)((function(e){return Object(m.a)(["err","days","isFetching"])(e.weather)}),{})((function(e){return r.a.createElement("section",{className:"weather"},e.isFetching?"Loading":null,e.err?r.a.createElement("div",null,e.err):e.days.map((function(e,t){return r.a.createElement(h,{key:t,data:e})})))})),b=a(36),f=a.n(b),p=(a(82),a(6)),O=a(5),g=a(88),v=a(86),w=a(89),j=a(39),y=a(90),E=a(37),S=a.n(E),C="ban/weather/QUERY",_="ban/weather/SUGGEST",F="ban/weather/FETCH_ERROR",N="ban/weather/FETCHING",R={search:"",locations:[],isFetching:!1,err:"",days:[]};function T(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,a=arguments.length>1?arguments[1]:void 0,n=(e={},Object(p.a)(e,C,(function(){return Object(O.a)(Object(O.a)({},t),{},{search:a.search})})),Object(p.a)(e,_,r),Object(p.a)(e,"ban/weather/CLEAR_LOCATIONS",(function(){return Object(O.a)(Object(O.a)({},t),{},{locations:[]})})),Object(p.a)(e,N,(function(){return Object(O.a)(Object(O.a)({},t),{},{isFetching:!0,err:"",days:[]})})),Object(p.a)(e,"ban/weather/FETCH_SUCCESS",c),Object(p.a)(e,F,o),e);return n.hasOwnProperty(a.type)?n[a.type]():t;function r(){return Object(O.a)(Object(O.a)({},t),a.data)}function c(){return Object(O.a)(Object(O.a)({},t),{},{isFetching:!1,err:"",days:a.data.weather})}function o(){return Object(O.a)(Object(O.a)({},t),{},{isFetching:!1,err:a.err.message,days:[]})}}function x(e){return r.a.createElement("span",null,e.title)}var A=null;var I={updateQuery:function(e){return function(t){return t({type:C,search:e})}},query:function(e){return function(t,a,n){var r=n.api;e&&r.weather.search(e).then((function(e){return t({type:_,data:{locations:e}})}),(function(){return t({type:_,data:{locations:[]}})}))}},onClearSuggestion:function(){return function(e){return e({type:"ban/weather/CLEAR_LOCATIONS"})}},submit:function(e){return function(t,a,n){var r=n.api;t({type:N}),r.weather.getWeather(e).then(Object(g.a)(Object(v.a)(Object(w.a)("weather"),Object(g.a)(Object(j.a)(Object(v.a)(Object(w.a)("date"),(function(e){return S()(e,"YYYY-MM-DD").format("dddd")}))),Object(y.a)(5))),(function(e){return t({type:"ban/weather/FETCH_SUCCESS",data:e})})),(function(e){return t({type:F,err:e})}))}}},W=Object(l.b)((function(e){return{txt:e.weather.search,locations:e.weather.locations}}),I)((function(e){return r.a.createElement("section",{className:"searcher"},r.a.createElement(f.a,{suggestions:e.locations,onSuggestionsFetchRequested:function(t){var a=t.value;A&&clearTimeout(A),A=setTimeout((function(){e.query(a),A=null}),1e3)},onSuggestionsClearRequested:e.onClearSuggestion,getSuggestionValue:function(t){return e.submit(t.id),t.title},renderSuggestion:x,inputProps:{placeholder:"Search",value:e.txt,onChange:function(t,a){var n=a.newValue;e.updateQuery(t.target.value||n)}}}))}));function k(e){var t=e.store;return r.a.createElement(l.a,{store:t},r.a.createElement("div",{className:"App App--light"},r.a.createElement("header",null,r.a.createElement("h1",null,"Weather")),r.a.createElement("main",null,r.a.createElement(W,null),r.a.createElement(d,null))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var L=a(9),q=a(38);var U=function(){return Object(L.c)({weather:T})};var Y=a(40),H=a(87);var J={vendor:{metaWeather:{url:"https://cors-anywhere.herokuapp.com/https://www.metaweather.com",timeout:6e4}}},G={state:function(e){var t=e.localStorage;return{get:function(){try{var a=t.getItem("state");return a?JSON.parse(a):void 0}catch(n){e.console.error(n)}},set:function(e){t.setItem("state",JSON.stringify(e))},clear:function(){t.removeItem("state")}}}(window),weather:function(e,t){var a=e.url,n=e.timeout,r=t.create({baseURL:"".concat(a,"/api/location"),timeout:n});return{search:function(e){return r.get("/search?query=".concat(e)).then(Object(g.a)(Object(Y.a)("data"),Object(j.a)((function(e){return{title:e.title,type:e.location_type,id:e.woeid}}))))},getWeather:function(e){return r.get("/".concat(e)).then(Object(g.a)(Object(Y.a)("data"),(function(e){return{weather:e.consolidated_weather}}),Object(H.a)({weather:Object(j.a)((function(e){return{date:e.applicable_date,temp:{min:e.min_temp,max:e.max_temp}}}))})))}}}(J.vendor.metaWeather,u.a)},Q=G.state.get(),B=function(e,t){var a=[q.a.withExtraArgument({api:e})],n=U();return Object(L.d)(n,t,L.a.apply(null,a))}(G,Q);o.a.render(r.a.createElement(k,{store:B}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[41,1,2]]]);
//# sourceMappingURL=main.45d213a1.chunk.js.map
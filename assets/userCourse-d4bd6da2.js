import{Y as r}from"./index-50a2709c.js";function n(e){return r({url:`/api/courses?${e}`,method:"get"})}function o(e){return r({url:"/api/course/courseIsExist",method:"post",data:e})}function a(e){return r({url:`/api/course/${e}`,method:"get"})}function i(e){return r({url:`/api/course/${e}/chapter`,method:"get"})}function c(e){return r({url:`/api/course/${e}/inquiry`,method:"get"})}function l(e){return r({url:`/api/course/${e}/faq`,method:"get"})}function p(e){return r({url:`/api/course/${e}/rating`,method:"get"})}function f(e,t){return r({url:`/api/course/${e}/preClassInquiry`,method:"post",data:t})}function g(e,t,u){return r({url:`/api/course/${e}/preClassInquiry/${t}`,method:"post",data:u})}function q(){return r({url:"/api/user/tag/userFavorite",method:"get"})}function R(e,t){return r({url:`/api/user/tag/${t}`,method:e})}function h(e){return r({url:`/api/user/course/${e}`,method:"get"})}function m(e){return r({url:"/api/user/ownedCourse/check",method:"post",data:e})}function C(e,t,u={}){return r({url:`/api/user/course/${t}/rating`,method:e,data:u})}function d(e){return r({url:`/api/user/course/${e}/ratings`,method:"get"})}function $(e,t){const u=Number(e);return Number.isInteger(u)===!0?t+1<=u?"star":"star_border":t+1<=u?"star":t+1-u<=.5?"star_half":"star_border"}function G(e){return e===null||e.slice(-4)==="null"?"https://fakeimg.pl/40x40/B7B7B7/?text=用戶":e}export{m as C,n as G,f as I,C as R,R as U,G as a,o as b,h as c,i as d,c as e,g as f,$ as g,l as h,a as i,p as j,d as k,q as l};
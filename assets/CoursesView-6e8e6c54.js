import{d as E,m as N,s as T,o as $,r as f,w as j,g as b,a as n,c,b as e,h as a,i as s,l as u,j as r,F as L,n as P,N as A,B as H,k as R,v as U,G as q,O as _,p as z,t as y}from"./index-50a2709c.js";import{_ as D}from"./CommonModal.vue_vue_type_script_setup_true_lang-a9fddaa2.js";import{u as G}from"./useSetMinMainHeight-d5a1d6d1.js";import{u as I}from"./instructor-c8d2850c.js";const O={class:"flex items-stretch bg-neutral-100"},J={class:"w-72 bg-neutral-50 p-6"},K=e("span",{class:"text-sm text-neutral-600"},"產品",-1),Q=e("span",{class:"text-sm text-neutral-600"},"營運",-1),W={class:"flex-1 bg-neutral-100 p-8"},X={class:"mb-4 flex items-center justify-between rounded bg-neutral-50 p-4"},Y=e("h1",{class:"font-bold text-neutral-800"},"課程列表",-1),Z={class:"rounded bg-neutral-50 p-6"},ee={key:0},te={key:1,class:""},se={class:"mb-2 flex items-center md:mb-0"},oe={class:"text-sm md:w-20"},ae=["src"],le={class:"text-sm md:me-4 md:text-base"},ne={class:"mb-6"},re=["disabled"],_e=E({__name:"CoursesView",setup(de){G();const{showError:h}=U(),{updateLoading:m}=N(),v=I(),{getCourses:V,addCourse:w}=v,{courses:x}=T(v);$(()=>{m(!0),V().catch(o=>{h(o)}).finally(()=>{m(!1)})});const g=f(null),d=f(!1),i=f("");j(d,()=>{q(()=>{var o;i.value="",(o=g.value)==null||o.resetForm()})});function C(){m(!0),w({title:i.value}).then(()=>{i.value=""}).catch(o=>{h(o)}).finally(()=>{m(!1),d.value=!1})}return(o,l)=>{const F=b("ErrorMessage"),M=b("VField"),S=b("VForm");return n(),c("main",O,[e("aside",J,[K,a(r(_),{to:"/instructor/courses",class:"mb-8 block"},{default:s(()=>[u("課程")]),_:1}),Q,a(r(_),{to:"/",class:"block"},{default:s(()=>[u("人員")]),_:1})]),e("div",W,[e("div",X,[Y,e("button",{class:"btn-primary",onClick:l[0]||(l[0]=t=>d.value=!0)},"新增課程")]),e("div",Z,[r(x).length===0?(n(),c("div",ee,"尚未有課程")):(n(),c("ul",te,[(n(!0),c(L,null,P(r(x),t=>(n(),c("li",{class:"mb-4 flex flex-col rounded bg-neutral-100 p-6 md:flex-row md:items-center",key:t.id},[e("div",se,[e("div",{class:z(["me-2 h-2 w-2 rounded-full",[t.isPublish?"bg-success-50":"bg-warning-50"]])},null,2),e("span",oe,y(t.isPublish?"已發布":"尚未發布"),1),a(r(_),{class:"material-icons ms-auto cursor-pointer text-primary-5 md:hidden",to:`/instructor/course/${t.id}`},{default:s(()=>[u("settings")]),_:2},1032,["to"])]),e("img",{src:t.image_path||"https://fakeimg.pl/156x88?text=cover",alt:"cover",class:"mb-2 h-22 w-39 object-contain md:mb-0 md:me-4"},null,8,ae),e("span",le,y(t.title),1),a(r(_),{class:"material-icons ms-auto hidden cursor-pointer p-5 text-primary-5 md:block",to:`/instructor/course/${t.id}`},{default:s(()=>[u("settings")]),_:2},1032,["to"])]))),128))]))])]),a(D,{modelValue:d.value,"onUpdate:modelValue":l[2]||(l[2]=t=>d.value=t)},{title:s(()=>[u("新增課程")]),default:s(()=>[a(S,{ref_key:"addCourseForm",ref:g,onSubmit:C},{default:s(({meta:t})=>[e("div",ne,[a(M,{name:"course",type:"text",rules:"required",modelValue:i.value,"onUpdate:modelValue":l[1]||(l[1]=p=>i.value=p),label:"課程名稱"},{default:s(({field:p,errors:B,meta:k})=>[e("input",A({id:"course",class:"form-control",placeholder:"輸入課程名稱"},p,{class:{invalid:k.validated&&!!B.length}}),null,16),k.validated?(n(),H(F,{key:0,class:"invalid-feedback",name:"course"})):R("",!0)]),_:2},1032,["modelValue"])]),e("button",{type:"submit",class:"btn-primary mx-auto block w-fit",disabled:!t.valid}," 新增 ",8,re)]),_:1},512)]),_:1},8,["modelValue"])])}}});export{_e as default};
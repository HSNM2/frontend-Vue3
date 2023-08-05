import{d as M,a as s,c as o,b as e,t as r,l as U,r as w,o as z,F as u,n as D,p as Z,h as E,i as ve,k as T,T as be,H as ee,I as te,_ as se,D as fe,f as xe,s as F,j as $,x as me,J as _e,K as ye,e as De,v as ge,L as he,m as Ve,A as Re,M as je,w as Ne,B as qe,C as Le,u as Oe,S as Ae}from"./index-bcaa0858.js";import{u as Pe}from"./tag-e570b289.js";import{d as Ee,a as H,e as Me,I as Be,f as Ge,h as He,b as Fe,i as Ue,j as ze,g as Je,C as Ke}from"./userCourse-48ca7c5e.js";import{C as Qe,_ as Ye}from"./ReviewView.vue_vue_type_script_setup_true_lang-6b14547d.js";import"./user-d7268db1.js";import"./ReviewModal.vue_vue_type_script_setup_true_lang-033acb2f.js";const We={class:"px-3 pb-16"},Xe={class:"mb-7"},Ze=e("h4",{class:"relative mb-4 ps-3 text-xl font-bold"},[e("span",{class:"absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"}),U(" 關於課程 ")],-1),et={class:"mb-2 flex items-center"},tt=e("span",{class:"material-icons text-lg"}," watch_later ",-1),st=e("p",{class:"mr-4"},"課程時長",-1),ot={class:""},at={class:"mb-2 flex items-center"},lt=e("span",{class:"material-icons text-lg"}," group ",-1),nt=e("p",{class:"mr-4"},"課程學員",-1),rt={class:""},ct=e("div",{class:"flex items-center"},[e("span",{class:"material-icons text-lg"}," remove_red_eye "),e("p",{class:"mr-4"},"觀看期限"),e("p",{class:""},"無期限")],-1),it=e("h4",{class:"relative mb-4 ps-3 text-xl font-bold"},[e("span",{class:"absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"}),U(" 關於簡介 ")],-1),dt=["innerHTML"],ut=M({__name:"IntroduceView",props:{isLogin:{type:Boolean,required:!0},user:{type:Object},courseDetail:{type:Object,required:!0}},emits:["get-data"],setup(a,{emit:V}){return(m,g)=>(s(),o("div",We,[e("div",Xe,[Ze,e("div",null,[e("div",et,[tt,st,e("p",ot,r(a.courseDetail.data.course.totalTime),1)]),e("div",at,[lt,nt,e("p",rt,r(a.courseDetail.data.course.buyers),1)]),ct])]),e("div",null,[it,e("div",{class:"prose max-w-none",innerHTML:a.courseDetail.data.course.description},null,8,dt)])]))}}),$e=a=>(ee("data-v-ddf19f43"),a=a(),te(),a),pt={class:"px-3 pb-16"},mt=$e(()=>e("h4",{class:"relative mb-4 ps-3 text-xl font-bold"},[e("span",{class:"absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"}),U(" 課程大綱 ")],-1)),_t={class:"mb-4"},ht=["onClick"],vt={class:"flex items-center"},bt=$e(()=>e("span",{class:"material-icons text-2xl"}," list ",-1)),ft={class:"text-lg font-bold"},xt={key:0,class:"px-2 py-4"},yt=M({__name:"OutlineView",props:{courseDetail:{type:Object,required:!0},courseID:{type:Number,required:!0}},setup(a){const V=a,m=w(null),g=()=>{Ee(V.courseID).then(h=>{var k;m.value=h.data,(k=m.value)==null||k.chapters.forEach(x=>{x.isShow=!1})}).catch(h=>{console.log(h)})};return z(()=>{g()}),(h,k)=>{var x;return s(),o("div",pt,[mt,e("ul",null,[(s(!0),o(u,null,D((x=m.value)==null?void 0:x.chapters,p=>(s(),o("li",{key:p.id},[e("div",_t,[e("div",{class:"flex cursor-pointer items-center justify-between gap-x-1 bg-primary-3/50 px-2",onClick:v=>p.isShow=!p.isShow},[e("div",vt,[bt,e("p",ft,r(p.title),1)]),e("span",{class:Z(["material-icons",p.isShow?"":"rotate-180"])}," expand_more ",2)],8,ht),E(be,{name:"slide"},{default:ve(()=>[p.isShow?(s(),o("div",xt,[(s(!0),o(u,null,D(p.lessons,v=>(s(),o("div",{key:v.id,class:"flex items-center py-2"},[e("p",null,r(v.title),1)]))),128))])):T("",!0)]),_:2},1024)])]))),128))])])}}});const gt=se(yt,[["__scopeId","data-v-ddf19f43"]]),$t="/frontend-Vue3/image/icon-rolling-pin.png",kt={class:"mb-16 grid grid-cols-12 gap-x-6 gap-y-4 px-3"},wt=De('<div class="relative col-span-12 lg:col-span-5"><input type="search" placeholder="搜尋關鍵字" class="h-10 w-full rounded-2.5xl border border-neutral-200 px-4 py-2"><span class="material-icons absolute right-6 top-1 text-lg text-neutral-600"> search </span></div><select class="col-span-6 h-10 rounded-2.5xl border border-neutral-200 px-4 py-2 lg:col-span-2"><option value="">全部問題</option></select><select class="col-span-6 h-10 rounded-2.5xl border border-neutral-200 px-4 py-2 lg:col-span-2"><option value="">日期最新</option></select>',3),Ct={class:"col-span-12 md:mx-0 lg:hidden"},It={key:0,class:"-mx-3 flex items-center justify-between bg-primary-1 px-[33.5px] py-3"},St=e("p",{class:"text-primary-6"},"對課程有些許問題？",-1),Tt={class:"col-span-12 lg:col-span-9"},Dt=e("div",{class:"h-14 rounded-2.5xl border border-neutral-200 px-7 py-4"},[e("p",{class:"text-neutral-800"},"請先登入才能使用留言功能～")],-1),Vt={key:0,class:"col-span-9 mt-8 h-20 bg-secondary-1 lg:h-80"},Rt=e("div",{class:"flex h-20 items-center justify-center lg:h-80"},[e("p",{class:"text-xl font-bold text-neutral-800"},"尚無問答")],-1),jt=[Rt],Nt={key:1,class:"mt-4 rounded-2.5xl border border-neutral-200 p-2 md:p-4"},qt={class:"rounded-2.5xl px-4 py-4 md:px-5 md:py-6"},Lt={class:"flex items-center justify-between"},Ot={class:"flex items-center gap-x-4"},At=["src"],Pt={class:""},Et={class:"mt-2 flex justify-end"},Mt=["disabled"],Bt={class:"rounded-2.5xl px-4 py-4 md:px-5 md:py-6"},Gt={class:"flex items-center justify-between"},Ht={class:"flex items-center gap-x-4"},Ft=["src"],Ut={class:""},zt={class:"text-sm text-primary-4"},Jt={class:"ml-14 mt-4"},Kt={class:"flex items-center justify-between"},Qt={class:"flex items-center gap-x-4"},Yt=["src"],Wt={class:""},Xt={class:"text-sm text-primary-4"},Zt={class:"ml-14 mt-4"},es={key:0,class:"mt-4 flex items-center justify-end"},ts=["onClick"],ss=e("div",{class:"flex justify-center"},[e("span",{class:"material-icons text-neutral-900"}," reply "),e("span",{class:"text-neutral-900"},"回覆")],-1),os=[ss],as={class:"rounded-2.5xl px-4 py-4 md:px-5 md:py-6"},ls={class:"flex items-center justify-between"},ns={class:"flex items-center gap-x-4"},rs=["src"],cs={class:""},is=["onUpdate:modelValue"],ds={class:"mt-2 flex justify-end"},us=["disabled","onClick"],ps={key:0,class:"-mt-14 hidden lg:col-span-3 lg:block"},ms={class:"flex flex-col items-center gap-y-4 rounded-2.5xl border border-neutral-200 bg-primary-1 py-8"},_s=e("img",{src:$t,class:"h-[7px] w-[65px]",alt:""},null,-1),hs=e("p",{class:"text-base text-primary-6"},"對課程有些許問題？",-1),vs=M({__name:"QAView",props:{isLogin:{type:Boolean,required:!0},isOwnedCourse:{type:Boolean,required:!1},user:{type:Object},courseDetail:{type:Object,required:!0},courseID:{type:Number,required:!0}},emits:["get-data"],setup(a,{emit:V}){const m=a,g=fe(),{showError:h}=ge(),k=xe(),{authModal:x,authModalType:p}=F(k),v=w(null),_=w(""),L=()=>{Me(m.courseID).then(i=>{var d;v.value=i.data,(d=v.value)==null||d.inquiries.forEach(y=>{y.isResponse=!1,y.responseValue=""})}).catch(i=>{console.log(i)})},R=i=>{m.isLogin===!1?P():J(i)},J=i=>{var d;(d=v.value)==null||d.inquiries.forEach(y=>{y.id===i&&(y.isResponse=!0)})},P=(i="login")=>{x.value=!0,p.value=i},K=i=>{let d=Number(g.params.id);Be(d,{content:i}).then(I=>{_.value="",L()}).catch(I=>{h(I)})},O=(i,d)=>{let y=Number(g.params.id);Ge(y,i,{content:d}).then(j=>{L()}).catch(j=>{h(j)})};return z(()=>{L()}),(i,d)=>{var y,I,j,B,n,S;return s(),o(u,null,[e("div",kt,[wt,e("div",Ct,[a.isLogin===!1?(s(),o("div",It,[St,e("button",{class:"btn-primary",onClick:d[0]||(d[0]=c=>P("login"))},"開始提問")])):T("",!0)]),e("div",Tt,[a.isLogin===!1?(s(),o(u,{key:0},[Dt,((y=v.value)==null?void 0:y.inquiries.length)===0?(s(),o("div",Vt,jt)):T("",!0)],64)):(s(),o("div",Nt,[e("div",qt,[e("div",Lt,[e("div",Ot,[e("img",{class:"h-10 w-10 rounded-full",src:$(H)((I=a.user)==null?void 0:I.avatarImagePath),alt:""},null,8,At),e("p",Pt,r(((j=a.user)==null?void 0:j.nickName)===null?(B=a.user)==null?void 0:B.name:(n=a.user)==null?void 0:n.nickName),1)])])]),e("div",null,[me(e("textarea",{"onUpdate:modelValue":d[1]||(d[1]=c=>_.value=c),class:"w-full rounded-2.5xl border border-neutral-100 px-4 py-4 md:px-5",placeholder:"對本課程有疑問？請盡情發問吧！"},null,512),[[_e,_.value]])]),e("div",Et,[e("button",{type:"button",class:"btn-primary w-[112px]",disabled:_.value==="",onClick:d[2]||(d[2]=c=>K(_.value))}," 送出 ",8,Mt)])])),(s(!0),o(u,null,D((S=v.value)==null?void 0:S.inquiries,c=>{var C,N,G;return s(),o("div",{key:c.id,class:"mt-4 rounded-2.5xl border border-neutral-200 p-2 md:p-4"},[e("div",null,[e("div",Bt,[e("div",Gt,[e("div",Ht,[e("img",{class:"h-10 w-10 rounded-full",src:$(H)(c.imagePath),alt:""},null,8,Ft),e("p",Ut,r(c.nickName===""?c.name:c.nickName),1)]),e("p",zt,r(c.date.slice(0,10)),1)]),e("div",Jt,[e("p",null,r(c.content),1)])]),(s(!0),o(u,null,D(c.responses,(b,Q)=>(s(),o("div",{key:b.id,class:Z(["rounded-2.5xl px-4 py-4 md:px-5 md:py-6",Number.isInteger(Q/2)?"bg-secondary-2/50":"bg-neutral-100"])},[e("div",Kt,[e("div",Qt,[e("img",{class:"h-10 w-10 rounded-full",src:$(H)(b.imagePath),alt:""},null,8,Yt),e("p",Wt,r(b.nickName===""?b.name:b.nickName),1)]),e("p",Xt,r(b.date.slice(0,10)),1)]),e("div",Zt,[e("p",null,r(b.content),1)])],2))),128)),c.isResponse===!1?(s(),o("div",es,[e("button",{type:"button",class:"btn-secondary w-[112px] px-0",onClick:b=>R(c.id)},os,8,ts)])):(s(),o(u,{key:1},[e("div",as,[e("div",ls,[e("div",ns,[e("img",{class:"h-10 w-10 rounded-full",src:$(H)((C=a.user)==null?void 0:C.avatarImagePath),alt:""},null,8,rs),e("p",cs,r(((N=a.user)==null?void 0:N.nickName)===null?a.user.name:(G=a.user)==null?void 0:G.nickName),1)])])]),e("div",null,[me(e("textarea",{"onUpdate:modelValue":b=>c.responseValue=b,class:"w-full rounded-2.5xl border border-neutral-100 px-4 py-4 md:px-5",placeholder:"輸入內容..."},null,8,is),[[_e,c.responseValue]])]),e("div",ds,[e("button",{type:"button",class:"btn-primary w-[112px]",disabled:c.responseValue==="",onClick:b=>O(c.id,c.responseValue)}," 送出 ",8,us)])],64))])])}),128))]),a.isLogin===!1?(s(),o("div",ps,[e("div",ms,[_s,hs,e("button",{class:"btn-primary",onClick:d[3]||(d[3]=c=>P("login"))},"開始提問")])])):T("",!0)]),E(ye)],64)}}}),bs=a=>(ee("data-v-71912b7f"),a=a(),te(),a),fs={class:"px-3 pb-16"},xs={class:"relative mb-4 ps-3 text-xl font-bold"},ys=bs(()=>e("span",{class:"absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"},null,-1)),gs={class:"mb-4 flex flex-col gap-y-3"},$s=["onClick"],ks={class:"text-lg font-bold"},ws={key:0,class:"p-6"},Cs=M({__name:"CommonProblemView",props:{courseDetail:{type:Object,required:!0},courseID:{type:Number,required:!0}},setup(a){const V=a,m=w(null),g=()=>{He(V.courseID).then(h=>{var k;m.value=h.data,(k=m.value)==null||k.faqs.forEach(x=>{x.questions.forEach(p=>{p.isShow=!1})})}).catch(h=>{console.log(h)})};return z(()=>{g()}),(h,k)=>{var x;return s(),o("div",fs,[(s(!0),o(u,null,D((x=m.value)==null?void 0:x.faqs,(p,v)=>(s(),o(u,{key:v},[e("h4",xs,[ys,U(" "+r(p.title),1)]),e("ul",gs,[(s(!0),o(u,null,D(p.questions,_=>(s(),o("li",{key:_.id},[e("div",{class:"flex cursor-pointer items-center justify-between gap-x-1 bg-primary-3/50 p-2",onClick:L=>_.isShow=!_.isShow},[e("p",ks,r(_.title),1),e("span",{class:Z(["material-icons",_.isShow?"":"rotate-180"])}," expand_more ",2)],8,$s),E(be,{name:"slide"},{default:ve(()=>[_.isShow?(s(),o("div",ws,[e("p",null,r(_.content),1)])):T("",!0)]),_:2},1024)]))),128))])],64))),128))])}}});const Is=se(Cs,[["__scopeId","data-v-71912b7f"]]),Ss=a=>(ee("data-v-87720665"),a=a(),te(),a),Ts={key:0},Ds={class:"bg-paleYellow"},Vs={class:"md:container"},Rs={class:"grid grid-cols-12 px-3 py-6 lg:px-0 lg:py-[52px]"},js={class:"col-span-12 lg:col-span-6 lg:gap-x-6"},Ns={class:"pb-1 text-base text-neutral-800"},qs={class:"pb-5 text-heading-3xl font-bold text-primary-6"},Ls={class:"pb-3 text-qa-title text-primary-6"},Os={class:"flex gap-x-2 pb-3"},As={class:"flex items-center lg:pb-3"},Ps={class:"text-sm text-neutral-600"},Es={class:"hidden pb-5 md:block"},Ms={class:"flex items-center gap-x-2"},Bs={class:"text-2xl font-bold text-primary-4"},Gs={key:0,class:"text-sm font-bold text-neutral-400 line-through"},Hs={class:"flex items-center gap-x-5 pb-6"},Fs=Ss(()=>e("span",{class:"material-icons cursor-pointer text-primary-6"}," share ",-1)),Us={class:"col-span-12 lg:col-span-6"},zs=["src"],Js={class:"md:container"},Ks={class:"py-6 lg:py-[52px]"},Qs={class:"relative mx-[12.5px] py-3"},Ys={class:"flex justify-around gap-x-[19px] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-primary-3 after:content-[''] lg:justify-start"},Ws={class:"fixed bottom-0 z-10 w-full md:hidden"},Xs={class:"flex items-center justify-between gap-x-5 bg-secondary-1 px-3 py-[15px]"},Zs={class:"flex items-center gap-x-2"},eo={class:"text-2xl font-bold text-primary-4"},to={class:"text-sm font-bold text-neutral-400 line-through"},so=M({__name:"CourseView",setup(a){const V=fe(),m=Oe(),{showError:g}=ge(),{addCartItem:h,courseAddedCheck:k,addImmediateCourseItem:x}=he(),{cart:p,hasAddCart:v,isImmediateCheckout:_}=F(he()),L=Ve(),{updateLoading:R}=L,J=xe(),{authModal:P,authModalType:K,user:O}=F(J),i=w(O.value!==null),d=Pe(),{tagList:y}=F(d),{getTagList:I,handleCourseTag:j,judgeTags:B}=d,n=w(null),S=w(null),c=w({}),C=Number(V.params.id),N=w(!1),G=()=>{Fe({courseId:C}).then(t=>{if(t.data.isPublish===!0)b(),ne();else return Ae.fire({icon:"error",title:"未有此課程"}).finally(function(){m.push({path:"/courses"})})}).catch(t=>{g(t)})},b=()=>{R(!0),Ue(C).then(l=>{var t,f,q,re,ce,ie,de,ue,pe;Q(),n.value=l.data,((t=n.value)==null?void 0:t.data.course)!=null&&(c.value={id:(f=n.value)==null?void 0:f.data.course.id.toString(),image_path:(q=n.value)==null?void 0:q.data.course.image_path,title:(re=n.value)==null?void 0:re.data.course.title,provider:(ce=n.value)==null?void 0:ce.data.course.provider,category:(ie=n.value)==null?void 0:ie.data.course.category,type:(de=n.value)==null?void 0:de.data.course.type,originPrice:(ue=n.value)==null?void 0:ue.data.course.originPrice,price:(pe=n.value)==null?void 0:pe.data.course.price}),setTimeout(()=>{R(!1)},500)}).catch(l=>{R(!1),g(l).finally(function(){m.push({path:"/courses"})})})},Q=()=>{ze(C).then(l=>{var t;S.value=l.data,((t=n.value)==null?void 0:t.data.course)!=null&&(c.value.avgRating=+S.value.rating.avgRating)}).catch(l=>{g(l)})},ke=()=>{Ke({id:C}).then(t=>{N.value=t.data.isOwned}).catch(t=>{g(t)})},A=l=>{if(l==="paymentSelection"&&i.value===!1)Y();else{let t="";l==="learn"?t=`/learn/${C}`:l==="paymentSelection"?(_.value=!0,x(c.value),t="/shoppingCart/paymentSelection"):l==="orderConfirmation"&&(t="/shoppingCart/orderConfirmation"),m.push({path:t})}},Y=(l="login")=>{P.value=!0,K.value=l},we=l=>{i.value===!1?Y():j(l)},oe=()=>{i.value===!1?Y():(h(c.value),ae())},ae=()=>{let l=localStorage.getItem("sweetTimeCart");l!==null&&(p.value=JSON.parse(l),k(C.toString()))},W=[{name:"課程介紹",comp:ut,style:""},{name:"課程大綱",comp:gt,style:""},{name:"課前問答",comp:vs,style:""},{name:"常見問題",comp:Is,style:""},{name:"課程評價",comp:Ye,style:""}],le=Re(W[0].comp),X=w(null),Ce=w(null),Ie=l=>{var t;X.value&&(X.value.scrollIntoView({behavior:"smooth"}),(t=Ce.value)==null||t.changeTabAction(l))},Se=l=>{R(!0),W.forEach(t=>{t.name===l&&(le.value=t.comp,Ie(l),setTimeout(()=>{R(!1)},500))})},ne=()=>{O.value!==null?(i.value=!0,I(),ae(),ke()):(i.value=!1,y.value=[])},Te=je(()=>l=>l==null?void 0:l.split(","));return Ne(O,()=>{ne()}),z(()=>{G()}),(l,t)=>(s(),o(u,null,[n.value?(s(),o("main",Ts,[e("div",Ds,[e("div",Vs,[e("div",Rs,[e("div",js,[e("p",Ns,r(n.value.data.course.provider),1),e("h2",qs,r(n.value.data.course.title),1),e("p",Ls,r(n.value.data.course.subTitle),1),e("div",Os,[(s(!0),o(u,null,D($(Te)(n.value.data.course.tag),(f,q)=>(s(),o("p",{key:q,class:"rounded-[15px] bg-secondary-2 px-3 py-1 text-sm"},r(`#${f}`),1))),128))]),e("div",As,[S.value?(s(),o(u,{key:0},[(s(),o(u,null,D(5,(f,q)=>e("span",{key:q,class:"material-icons text-lg text-primary-3"},r($(Je)(S.value.rating.avgRating,q)),1)),64)),e("span",Ps,r(`(${S.value.rating.countRating})`),1)],64)):T("",!0)]),e("div",Es,[e("div",Ms,[e("p",Bs," NT$"+r(n.value.data.course.price),1),n.value.data.course.originPrice!==0&&n.value.data.course.price<n.value.data.course.originPrice?(s(),o("p",Gs," NT$"+r(n.value.data.course.originPrice),1)):T("",!0)])]),e("div",Hs,[$(v)===!1?(s(),o(u,{key:0},[N.value===!1?(s(),o(u,{key:0},[e("button",{type:"button",class:"btn-primary hidden md:block",onClick:t[0]||(t[0]=f=>A("paymentSelection"))}," 立即購買 "),e("span",{class:"material-icons hidden cursor-pointer text-primary-6 md:block",onClick:t[1]||(t[1]=f=>oe())}," shopping_cart ")],64)):(s(),o("button",{key:1,type:"button",class:"btn-primary hidden md:block",onClick:t[2]||(t[2]=f=>A("learn"))}," 進入課程 "))],64)):(s(),o("button",{key:1,type:"button",class:"btn-secondary hidden md:block",onClick:t[3]||(t[3]=f=>A("orderConfirmation"))}," 已加入購物車 ")),Fs,e("span",{class:"material-icons cursor-pointer text-2xl text-primary-6",onClick:t[4]||(t[4]=f=>we(n.value.data.course.id))},r($(B)(n.value.data.course.id)?"bookmark":"bookmark_border"),1)])]),e("div",Us,[e("img",{class:"h-52 w-full object-cover sm:h-96",src:n.value.data.course.image_path,alt:""},null,8,zs)])])])]),e("div",{ref_key:"tabsElement",ref:X},[e("div",Js,[e("div",Ks,[e("div",Qs,[e("div",Ys,[E(Qe,{tabs:W,onChangeTabView:Se})])])]),(s(),qe(Le($(le)),{isLogin:i.value,isOwnedCourse:N.value,user:$(O),courseDetail:n.value,courseID:$(C),onGetData:b},null,40,["isLogin","isOwnedCourse","user","courseDetail","courseID"]))])],512),e("div",Ws,[e("div",Xs,[e("div",Zs,[e("p",eo,"NT$"+r(n.value.data.course.price),1),e("p",to," NT$"+r(n.value.data.course.originPrice),1)]),$(v)===!1?(s(),o(u,{key:0},[N.value===!1?(s(),o(u,{key:0},[e("button",{type:"button",class:"btn-primary w-full px-2",onClick:t[5]||(t[5]=f=>A("paymentSelection"))}," 立即購買 "),e("span",{class:"material-icons cursor-pointer text-primary-6",onClick:t[6]||(t[6]=f=>oe())}," shopping_cart ")],64)):(s(),o("button",{key:1,type:"button",class:"btn-primary block w-full px-2 md:hidden",onClick:t[7]||(t[7]=f=>A("learn"))}," 進入課程 "))],64)):(s(),o("button",{key:1,type:"button",class:"btn-primary w-full px-2",onClick:t[8]||(t[8]=f=>A("orderConfirmation"))}," 已加入購物車 "))])])])):T("",!0),E(ye)],64))}});const io=se(so,[["__scopeId","data-v-87720665"]]);export{io as default};

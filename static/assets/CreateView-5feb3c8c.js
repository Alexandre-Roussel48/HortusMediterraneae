import{_ as C,r as w,o as n,c as a,a as e,e as r,t as d,f as _,v as f,g as b,F as u,h,n as g,i as x,b as y,j as k}from"./index-04d57ed5.js";const q={name:"specimen_form",data(){return{rep:{},data:{parcelle:{id:""},indigenat:{id:""},taxonomie:{},historique:"",herbier:"",medias:[]},parcelles:[],indigenats:[],medias:[],media_open:!1,type_media_filters:[],theme_filters:[],nom_media:"",types_media:[],themes:[],end:!1,redirect:"",data_ready:!1}},methods:{async get_thes(){return await(await fetch(`${this.$url_prefix}/especes/get_thes`)).json()},async get_taxon(t){return await(await fetch(`${this.$url_prefix}/especes/get_taxon?q=${t}`)).json()},async get_specimen(t){return await(await fetch(`${this.$url_prefix}/especes/get_specimen?q=${t}`)).json()},async get_medias(){return await(await fetch(`${this.$url_prefix}/pedagogie/get_medias`)).json()},MaxLengthTextarea(t,i){this.data[t].length>i&&(this.data[t]=this.data[t].substring(0,i),alert("Votre texte ne doit pas dépasser "+i+" caractères!"))},toggle(){this.media_open==""?this.media_open="is-active":this.media_open=""},add_media(t){this.data.medias.push(t)},remove_media(t){this.data.medias.splice(this.data.medias.indexOf(t),1)},get_icon(t){return t.code=="image"?"image":t.code=="photo"?"camera":t.code=="video"?"video":t.code=="bandeson"?"headphones":t.code=="support"?"file":t.code=="conte"?"book":""},get_url(t){return`${this.$url_prefix}/`+t.url},get_media_nom(t){return this.medias.filter(i=>i.id==t)[0].nom},toggle_media(t){t.open==""?t.open="is-active":t.open=""},send_data(){fetch(`${this.$url_prefix}/especes/cr_or_up_specimen`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.data)}).then(t=>{t.text().then(i=>{this.redirect=i,this.end=!0})})}},computed:{issend(){return this.end},hvl(){return this.data.historique.length},iscomplete(){return this.data.parcelle.id&&this.data.indigenat.id&&this.data.historique},getfilteredmedias(){let t=this.medias;return this.type_media_filters.length!=0&&(t=t.filter(i=>this.type_media_filters.includes(i.type_media.id))),this.theme_filters.length!=0&&(t=t.filter(i=>{let p=0;for(let v in this.theme_filters){let o=this.theme_filters[v];for(let l in i.tags){let m=i.tags[l].id;o==m&&p++}}return p==this.theme_filters.length})),this.nom_media!=""&&(t=t.filter(i=>i.nom.toLowerCase().substring(0,this.nom_media.length)==this.nom_media.toLowerCase())),t}},async mounted(){if(this.rep=await this.get_thes(),this.medias=await this.get_medias(),this.parcelles=this.rep["ref.parcelle"],this.indigenats=this.rep["ref.indigenat"],this.types_media=this.rep["ref.type_media"],this.themes=this.rep["ref.theme"],this.$route.query.q){this.data=await this.get_specimen(this.$route.query.q);for(let t in this.data.medias)this.data.medias[t]=this.data.medias[t].id}else this.data.taxonomie=await this.get_taxon(this.$route.params.id);this.data_ready=!0}},V={key:0},S={key:0,class:"container large_form"},T={class:"form_position"},N=e("h1",{class:"subtitle text_color"},"Insertion de données",-1),U=e("p",{class:"text_color"},"Les champs marqués d'un astérisque (*) sont obligatoires.",-1),j={class:"box"},L={class:"columns"},M={class:"column is-8"},z={class:"label title is-4"},B={class:"columns"},F={class:"column is-8"},O={class:"field"},P=e("label",{class:"label"},"Part d'herbier",-1),D={class:"control"},E={class:"field"},I=e("label",{class:"label"},"Historique*",-1),A={class:"control"},H={class:"columns"},J={class:"column is-2"},K={class:"field"},R=e("label",{class:"label"},"Parcelle*",-1),G={class:"control"},Q={class:"select"},W=e("option",{value:""},"Choisir ...",-1),X=["value"],Y={class:"column is-2"},Z={class:"field"},$=e("label",{class:"label"},"Indigénat*",-1),ee={class:"control"},se={class:"select"},te=e("option",{value:""},"Choisir ...",-1),ie=["value"],oe={class:"columns"},le={class:"column is-12"},ne=e("label",{class:"label"},"Médias",-1),ae=["onClick"],de={class:"icon"},ce=e("div",{class:"modal-background"},null,-1),re={class:"modal-card large_modal"},_e=e("header",{class:"modal-card-head"},[e("p",{class:"modal-card-title text_center"},"Sélectionnez un ou plusieurs médias")],-1),ue={class:"modal-card-body"},he=e("p",{class:"subtitle is-6"},"Types de médias :",-1),me={class:"columns is-gapless is-multiline"},pe={class:"column is-2"},fe=["for"],ve=["value","id"],be=e("p",{class:"subtitle is-6"},"Thémes :",-1),ge={class:"columns is-gapless is-multiline"},xe={class:"column is-2"},ye=["for"],ke=["value","id"],Ce={class:"field is-horizontal"},we=e("div",{class:"field-label is-normal"},[e("label",{class:"label"},"Nom du média")],-1),qe={class:"field-body"},Ve={class:"field"},Se={class:"control is-expanded"},Te={class:"box"},Ne={class:"columns is-multiline"},Ue={class:"column is-2"},je={class:"icon"},Le={class:"column is-4"},Me={class:"column is-3"},ze=["onClick"],Be=["onClick"],Fe={class:"column is-3"},Oe=["onClick"],Pe=e("div",{class:"modal-background"},null,-1),De={class:"modal-content large_modal"},Ee={class:"box"},Ie={class:"subtitle"},Ae={key:0,controls:"",class:"embeb_position"},He=["src"],Je={key:1,controls:"",class:"embeb_position"},Ke=["src"],Re=["src"],Ge={class:"buttons spaced_buttons"},Qe=e("i",null,null,-1),We=["onClick"],Xe={class:"modal-card-foot"},Ye={class:"form_position"},Ze={class:"buttons spaced_buttons"},$e=e("i",null,null,-1),es={key:1,class:"container form_position"},ss={class:"title"},ts=["href"];function is(t,i,p,v,o,l){const m=w("font-awesome-icon");return o.data_ready?(n(),a("div",V,[l.issend?(n(),a("div",es,[e("h1",ss,[r("Vous pouvez consulter "),e("a",{href:o.redirect},"votre donnée",8,ts),r(" !")])])):(n(),a("div",S,[e("div",T,[N,U,e("div",j,[e("div",L,[e("div",M,[e("label",z,[r("Specimen pour "),e("i",null,d(o.data.taxonomie.nom),1)])])]),e("div",B,[e("div",F,[e("div",O,[P,e("div",D,[_(e("input",{class:"input",type:"text","onUpdate:modelValue":i[0]||(i[0]=s=>o.data.herbier=s)},null,512),[[f,o.data.herbier]])])])])]),e("div",E,[I,e("div",A,[e("span",null,"Nombre de caractères : "+d(l.hvl),1),_(e("textarea",{name:"historique",class:"textarea","onUpdate:modelValue":i[1]||(i[1]=s=>o.data.historique=s),onKeyup:i[2]||(i[2]=s=>{l.MaxLengthTextarea("historique",800)}),placeholder:"Rentrer le texte en moins de 800 caractères.",rows:"8"},null,544),[[f,o.data.historique]])])]),e("div",H,[e("div",J,[e("div",K,[R,e("div",G,[e("div",Q,[_(e("select",{name:"parcelle","onUpdate:modelValue":i[3]||(i[3]=s=>o.data.parcelle.id=s)},[W,(n(!0),a(u,null,h(o.parcelles,s=>(n(),a("option",{value:s.id},d(s.label),9,X))),256))],512),[[b,o.data.parcelle.id]])])])])]),e("div",Y,[e("div",Z,[$,e("div",ee,[e("div",se,[_(e("select",{name:"parcelle","onUpdate:modelValue":i[4]||(i[4]=s=>o.data.indigenat.id=s)},[te,(n(!0),a(u,null,h(o.indigenats,s=>(n(),a("option",{value:s.id},d(s.label),9,ie))),256))],512),[[b,o.data.indigenat.id]])])])])])]),e("div",oe,[e("div",le,[ne,e("button",{onClick:i[5]||(i[5]=(...s)=>l.toggle&&l.toggle(...s)),class:"button"},"Sélectionner un média"),(n(!0),a(u,null,h(o.data.medias,s=>(n(),a("button",{onClick:c=>l.remove_media(s),class:"button"},[e("span",de,[y(m,{icon:["fas","trash"]})]),e("span",null,d(l.get_media_nom(s)),1)],8,ae))),256))])]),e("div",{class:g(["modal",o.media_open])},[ce,e("div",re,[_e,e("section",ue,[he,e("div",me,[(n(!0),a(u,null,h(o.types_media,s=>(n(),a("div",pe,[e("label",{class:"checkbox",for:s.id},[_(e("input",{type:"checkbox",value:s.id,id:s.id,"onUpdate:modelValue":i[6]||(i[6]=c=>o.type_media_filters=c)},null,8,ve),[[k,o.type_media_filters]]),r(" "+d(s.label),1)],8,fe)]))),256))]),be,e("div",ge,[(n(!0),a(u,null,h(o.themes,s=>(n(),a("div",xe,[e("label",{class:"checkbox",for:s.id},[_(e("input",{type:"checkbox",value:s.id,id:s.id,"onUpdate:modelValue":i[7]||(i[7]=c=>o.theme_filters=c)},null,8,ke),[[k,o.theme_filters]]),r(" "+d(s.label),1)],8,ye)]))),256))]),e("div",Ce,[we,e("div",qe,[e("div",Ve,[e("p",Se,[_(e("input",{type:"text",class:"input","onUpdate:modelValue":i[8]||(i[8]=s=>o.nom_media=s)},null,512),[[f,o.nom_media]])])])])]),(n(!0),a(u,null,h(l.getfilteredmedias,s=>(n(),a("div",Te,[e("div",Ne,[e("div",Ue,[e("span",je,[y(m,{icon:["fas",l.get_icon(s.type_media)]},null,8,["icon"])])]),e("div",Le,d(s.nom),1),e("div",Me,[o.data.medias.includes(s.id)?(n(),a("button",{key:1,type:"button",onClick:c=>l.remove_media(s.id),class:"delete is-medium"},null,8,Be)):(n(),a("button",{key:0,type:"button",onClick:c=>l.add_media(s.id),class:"delete add_button is-medium"},null,8,ze))]),e("div",Fe,[e("button",{onClick:c=>l.toggle_media(s),class:"button"},"Aperçu",8,Oe)]),e("div",{class:g(["modal",s.open])},[Pe,e("div",De,[e("div",Ee,[e("h1",Ie,d(s.nom),1),s.type_media.code=="video"?(n(),a("video",Ae,[e("source",{src:l.get_url(s)},null,8,He),r(" Votre navigateur ne supporte pas cette extension. ")])):s.type_media=="bandeson"?(n(),a("audio",Je,[e("source",{src:l.get_url(s)},null,8,Ke),r(" Votre navigateur ne supporte pas cette extension. ")])):(n(),a("embed",{key:2,src:l.get_url(s),class:"embeb_position"},null,8,Re)),e("div",Ge,[Qe,e("button",{class:"button",onClick:c=>l.toggle_media(s)},"Fermer",8,We)])])])],2)])]))),256))]),e("footer",Xe,[e("button",{onClick:i[9]||(i[9]=(...s)=>l.toggle&&l.toggle(...s)),class:"button"},"Sauvegarder")])])],2)]),e("div",Ye,[e("div",Ze,[$e,l.iscomplete?(n(),a("button",{key:0,type:"button",class:"button",onClick:i[10]||(i[10]=s=>l.send_data())},"Envoyer")):x("",!0)])])])]))])):x("",!0)}const ls=C(q,[["render",is]]);export{ls as default};

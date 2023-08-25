import{_ as V,o as a,c as d,a as e,f as r,v as u,r as q,n as y,t as _,g as k,F as m,h,b as C,j as x,e as p,l as T,i as g,d as U}from"./index-04d57ed5.js";const L={name:"animform",props:["data"]},M={class:"form_position"},N={class:"box"},F={class:"field"},z=e("label",{class:"label"},"Titre*",-1),A={class:"control"},D={class:"field"},O=e("label",{class:"label"},"Lieux à visiter*",-1),P={class:"control"},B=e("span",null,"Dans l'ordre du premier au dernier lieu",-1),R={class:"columns"},E={class:"column is-one-fifth"},I={class:"field is-horizontal"},G=e("div",{class:"field-label is-normal field_text"},[e("label",{class:"label"},"De")],-1),J={class:"field-body"},K={class:"field"},H={class:"control"},Q={class:"column is-one-fifth"},W={class:"field is-horizontal"},X=e("div",{class:"field-label is-normal field_text"},[e("label",{class:"label"},"à")],-1),Y={class:"field-body"},Z={class:"field"},$={class:"control"},ee=e("div",{class:"column is-one-fifth"},[e("div",{class:"field is-horizontal"},[e("div",{class:"field-label is-normal field_text"},[e("label",{class:"label"},"personnes*")])])],-1),te={class:"field"},se=e("label",{class:"label"},"Objectifs*",-1),ie={class:"control"},le={class:"columns"},oe={class:"column is-half"},ae={class:"field"},ne=e("label",{class:"label"},"Préconisations",-1),de={class:"control"},ce={class:"column is-half"},re={class:"field"},_e=e("label",{class:"label"},"Conditions d'annulation",-1),ue={class:"control"},me={class:"field"},he=e("label",{class:"label"},"Préparation/Mise en place",-1),fe={class:"control"};function ve(i,t,l,f,n,o){return a(),d("div",M,[e("div",N,[e("div",F,[z,e("div",A,[r(e("input",{type:"text",name:"titre",class:"input","onUpdate:modelValue":t[0]||(t[0]=c=>l.data.titre=c)},null,512),[[u,l.data.titre]])])]),e("div",D,[O,e("div",P,[B,r(e("input",{type:"text",name:"lieu",class:"input","onUpdate:modelValue":t[1]||(t[1]=c=>l.data.lieu=c)},null,512),[[u,l.data.lieu]])])]),e("div",R,[e("div",E,[e("div",I,[G,e("div",J,[e("div",K,[e("div",H,[r(e("input",{type:"text",name:"min",class:"input","onUpdate:modelValue":t[2]||(t[2]=c=>l.data._min=c)},null,512),[[u,l.data._min]])])])])])]),e("div",Q,[e("div",W,[X,e("div",Y,[e("div",Z,[e("div",$,[r(e("input",{type:"text",name:"max",class:"input","onUpdate:modelValue":t[3]||(t[3]=c=>l.data._max=c)},null,512),[[u,l.data._max]])])])])])]),ee]),e("div",te,[se,e("div",ie,[r(e("textarea",{name:"objectifs",class:"textarea","onUpdate:modelValue":t[4]||(t[4]=c=>l.data.objectifs=c)},null,512),[[u,l.data.objectifs]])])]),e("div",le,[e("div",oe,[e("div",ae,[ne,e("div",de,[r(e("textarea",{name:"preconisations",class:"textarea","onUpdate:modelValue":t[5]||(t[5]=c=>l.data.preconisations=c)},null,512),[[u,l.data.preconisations]])])])]),e("div",ce,[e("div",re,[_e,e("div",ue,[r(e("textarea",{name:"annulation",class:"textarea","onUpdate:modelValue":t[6]||(t[6]=c=>l.data.annulation=c)},null,512),[[u,l.data.annulation]])])])])]),e("div",me,[he,e("div",fe,[r(e("textarea",{name:"pre_anim",class:"textarea","onUpdate:modelValue":t[7]||(t[7]=c=>l.data.pre_anim=c)},null,512),[[u,l.data.pre_anim]])])])])])}const be=V(L,[["render",ve]]),pe={name:"seqform",props:["parties","approches","modalites","durees","medias","types_media","themes","global_values","idx","data"],data(){return{reduction:!1,media_open:"",type_media_filters:[],theme_filters:[],nom_media:"",delete_seq_open:""}},methods:{toggle(){this.media_open==""?(this.media_open="is-active",this.$emit("get-medias")):this.media_open=""},toggle_media(i){i.open==""?i.open="is-active":i.open=""},toggle_delete_seq(){this.delete_seq_open==""?this.delete_seq_open="is-active":this.delete_seq_open=""},get_icon(i){return i.id==this.global_values.image?"image":i.id==this.global_values.photo?"camera":i.id==this.global_values.video?"video":i.id==this.global_values.bandeson?"headphones":i.id==this.global_values.support?"file":i.id==this.global_values.conte?"book":""},get_url(i){return`${this.$url_prefix}/`+i.url},add_materiel(i){this.data.materiel.push(i)},remove_materiel(i){this.data.materiel.splice(this.data.materiel.indexOf(i),1)},get_media_nom(i){return this.medias.filter(t=>t.id==i)[0].nom},get_tag_id(i){return this.idx+"seq"+i}},computed:{getcolor(){return this.data.type_seq.id==this.global_values.intro?"intro-color":this.data.type_seq.id==this.global_values.dvp?"dvp-color":this.data.type_seq.id==this.global_values.dvpopt?"dvpopt-color":this.data.type_seq.id==this.global_values.conclu?"conclu-color":"grey-color"},getfilteredmedias(){let i=this.medias;return this.type_media_filters.length!=0&&(i=i.filter(t=>this.type_media_filters.includes(t.type_media.id))),this.theme_filters.length!=0&&(i=i.filter(t=>{let l=0;for(let f in this.theme_filters){let n=this.theme_filters[f];for(let o in t.tags){let c=t.tags[o].id;n==c&&l++}}return l==this.theme_filters.length})),this.nom_media!=""&&(i=i.filter(t=>t.nom.toLowerCase().substring(0,this.nom_media.length)==this.nom_media.toLowerCase())),i}}},ge={class:"form_position"},ye={class:"subtitle text_color"},qe={key:1,class:"box"},xe={class:"columns is-gapless"},ke={class:"column is-one-fifth"},Ce={class:"select"},Ve=e("option",{value:""},"Choisir ...",-1),we=["value"],Ue={class:"column is-half"},je={class:"field is-horizontal"},Se=e("div",{class:"field-label is-normal field_text"},[e("label",{class:"label"},"Titre*")],-1),Te={class:"field-body"},Le={class:"field"},Me={class:"control"},Ne={class:"buttons spaced_buttons"},Fe=e("div",{class:"modal-background"},null,-1),ze={class:"modal-content"},Ae={class:"box"},De=e("p",{class:"subtitle text_center"},"Êtes-vous sûr de vouloir supprimer la séquence ?",-1),Oe={class:"buttons is-centered"},Pe=T('<div class="column is-one-fifth"><div class="field text_center"><label class="label">Approche et modalités*</label></div></div><div class="column is-one-fifth"><div class="field text_center"><label class="label">Durée*</label></div></div><div class="column is-one-fifth"><div class="field text_center"><label class="label">Objectifs*</label></div></div><div class="column is-one-fifth"><div class="field text_center"><label class="label">Matériel</label></div></div><div class="column is-one-fifth"><div class="field text_center"><label class="label">Média et codex</label></div></div>',5),Be=[Pe],Re={class:"columns is-gapless"},Ee={class:"column is-one-fifth"},Ie={class:"select"},Ge=e("option",{value:""},"Choisir ...",-1),Je=["value"],Ke={class:"select"},He=e("option",{value:""},"Choisir ...",-1),Qe=["value"],We={class:"column is-one-fifth"},Xe={class:"select"},Ye=e("option",{value:""},"Choisir ...",-1),Ze=["value"],$e={class:"column is-one-fifth"},et={class:"column is-one-fifth"},tt={class:"column is-one-fifth"},st=["onClick"],it={class:"icon"},lt={class:"field"},ot=e("label",{class:"label"},"Description de la séquence*",-1),at={class:"control"},nt=e("div",{class:"modal-background"},null,-1),dt={class:"modal-card large_modal"},ct=e("header",{class:"modal-card-head"},[e("p",{class:"modal-card-title text_center"},"Sélectionnez un ou plusieurs médias")],-1),rt={class:"modal-card-body"},_t=e("p",{class:"subtitle is-6"},"Types de médias :",-1),ut={class:"columns is-gapless is-multiline"},mt={class:"column is-2"},ht=["for"],ft=["value","id"],vt=e("p",{class:"subtitle is-6"},"Thémes :",-1),bt={class:"columns is-gapless is-multiline"},pt={class:"column is-2"},gt=["for"],yt=["value","id"],qt={class:"field is-horizontal"},xt=e("div",{class:"field-label is-normal"},[e("label",{class:"label"},"Nom du média")],-1),kt={class:"field-body"},Ct={class:"field"},Vt={class:"control is-expanded"},wt={class:"box"},Ut={class:"columns is-multiline"},jt={class:"column is-2"},St={class:"icon"},Tt={class:"column is-4"},Lt={class:"column is-3"},Mt=["onClick"],Nt=["onClick"],Ft={class:"column is-3"},zt=["onClick"],At=e("div",{class:"modal-background"},null,-1),Dt={class:"modal-content large_modal"},Ot={class:"box"},Pt={class:"subtitle"},Bt={key:0,controls:"",class:"embeb_position"},Rt=["src"],Et={key:1,controls:"",class:"embeb_position"},It=["src"],Gt=["src"],Jt={class:"buttons spaced_buttons"},Kt=e("i",null,null,-1),Ht=["onClick"],Qt={class:"modal-card-foot"};function Wt(i,t,l,f,n,o){const c=q("font-awesome-icon");return a(),d("div",ge,[n.reduction?(a(),d("div",{key:0,class:y(["box",o.getcolor])},[e("p",ye,_(l.data.titre),1),e("button",{onClick:t[0]||(t[0]=s=>n.reduction=!1),class:"button"},"Augmenter la séquence")],2)):(a(),d("div",qe,[e("div",xe,[e("div",ke,[e("div",Ce,[r(e("select",{name:"partie",id:"partie","onUpdate:modelValue":t[1]||(t[1]=s=>l.data.type_seq.id=s)},[Ve,(a(!0),d(m,null,h(l.parties,s=>(a(),d("option",{value:s.id},_(s.label),9,we))),256))],512),[[k,l.data.type_seq.id]])])]),e("div",Ue,[e("div",je,[Se,e("div",Te,[e("div",Le,[e("div",Me,[r(e("input",{type:"text",name:"titre",class:"input","onUpdate:modelValue":t[2]||(t[2]=s=>l.data.titre=s)},null,512),[[u,l.data.titre]])])])])])])]),e("div",Ne,[e("button",{onClick:t[3]||(t[3]=s=>n.reduction=!0),type:"button",class:"button"},"Réduire la séquence"),e("button",{onClick:t[4]||(t[4]=(...s)=>o.toggle_delete_seq&&o.toggle_delete_seq(...s)),class:"button is-warning"},"Supprimer ma séquence")]),e("div",{class:y(["modal",n.delete_seq_open])},[Fe,e("div",ze,[e("div",Ae,[De,e("div",Oe,[e("button",{onClick:t[5]||(t[5]=(...s)=>o.toggle_delete_seq&&o.toggle_delete_seq(...s)),class:"button is-warning"},"NON"),e("button",{onClick:t[6]||(t[6]=s=>i.$emit("remove-seq")),class:"button"},"OUI")])])])],2),e("div",{class:y(["columns is-gapless columns_position",o.getcolor])},Be,2),e("div",Re,[e("div",Ee,[e("div",Ie,[r(e("select",{name:"approche","onUpdate:modelValue":t[7]||(t[7]=s=>l.data.approche.id=s)},[Ge,(a(!0),d(m,null,h(l.approches,s=>(a(),d("option",{value:s.id},_(s.label),9,Je))),256))],512),[[k,l.data.approche.id]])]),e("div",Ke,[r(e("select",{name:"modalite","onUpdate:modelValue":t[8]||(t[8]=s=>l.data.modalite.id=s)},[He,(a(!0),d(m,null,h(l.modalites,s=>(a(),d("option",{value:s.id},_(s.label),9,Qe))),256))],512),[[k,l.data.modalite.id]])])]),e("div",We,[e("div",Xe,[r(e("select",{name:"duree","onUpdate:modelValue":t[9]||(t[9]=s=>l.data.duree.id=s)},[Ye,(a(!0),d(m,null,h(l.durees,s=>(a(),d("option",{value:s.id},_(s.label),9,Ze))),256))],512),[[k,l.data.duree.id]])])]),e("div",$e,[r(e("textarea",{class:"textarea",name:"objectifs","onUpdate:modelValue":t[10]||(t[10]=s=>l.data.objectifs=s)},null,512),[[u,l.data.objectifs]])]),e("div",et,[r(e("textarea",{class:"textarea",name:"materiel","onUpdate:modelValue":t[11]||(t[11]=s=>l.data.materiel_div=s)},null,512),[[u,l.data.materiel_div]])]),e("div",tt,[e("button",{onClick:t[12]||(t[12]=(...s)=>o.toggle&&o.toggle(...s)),class:"button"},"Sélectionner un média"),(a(!0),d(m,null,h(l.data.materiel,s=>(a(),d("button",{onClick:v=>o.remove_materiel(s),class:"button"},[e("span",it,[C(c,{icon:["fas","trash"]})]),e("span",null,_(o.get_media_nom(s)),1)],8,st))),256))])]),e("div",lt,[ot,e("div",at,[r(e("textarea",{class:"textarea",name:"description","onUpdate:modelValue":t[13]||(t[13]=s=>l.data.description=s)},null,512),[[u,l.data.description]])])]),e("div",{class:y(["modal",n.media_open])},[nt,e("div",dt,[ct,e("section",rt,[_t,e("div",ut,[(a(!0),d(m,null,h(l.types_media,s=>(a(),d("div",mt,[e("label",{class:"checkbox",for:o.get_tag_id(s.id)},[r(e("input",{type:"checkbox",value:s.id,id:o.get_tag_id(s.id),"onUpdate:modelValue":t[14]||(t[14]=v=>n.type_media_filters=v)},null,8,ft),[[x,n.type_media_filters]]),p(" "+_(s.label),1)],8,ht)]))),256))]),vt,e("div",bt,[(a(!0),d(m,null,h(l.themes,s=>(a(),d("div",pt,[e("label",{class:"checkbox",for:o.get_tag_id(s.id)},[r(e("input",{type:"checkbox",value:s.id,id:o.get_tag_id(s.id),"onUpdate:modelValue":t[15]||(t[15]=v=>n.theme_filters=v)},null,8,yt),[[x,n.theme_filters]]),p(" "+_(s.label),1)],8,gt)]))),256))]),e("div",qt,[xt,e("div",kt,[e("div",Ct,[e("p",Vt,[r(e("input",{type:"text",class:"input","onUpdate:modelValue":t[16]||(t[16]=s=>n.nom_media=s)},null,512),[[u,n.nom_media]])])])])]),(a(!0),d(m,null,h(o.getfilteredmedias,s=>(a(),d("div",wt,[e("div",Ut,[e("div",jt,[e("span",St,[C(c,{icon:["fas",o.get_icon(s.type_media)]},null,8,["icon"])])]),e("div",Tt,_(s.nom),1),e("div",Lt,[l.data.materiel.includes(s.id)?(a(),d("button",{key:1,type:"button",onClick:v=>o.remove_materiel(s.id),class:"delete is-medium"},null,8,Nt)):(a(),d("button",{key:0,type:"button",onClick:v=>o.add_materiel(s.id),class:"delete add_button is-medium"},null,8,Mt))]),e("div",Ft,[e("button",{onClick:v=>o.toggle_media(s),class:"button"},"Aperçu",8,zt)]),e("div",{class:y(["modal",s.open])},[At,e("div",Dt,[e("div",Ot,[e("h1",Pt,_(s.nom),1),s.type_media==l.global_values.video?(a(),d("video",Bt,[e("source",{src:o.get_url(s)},null,8,Rt),p(" Votre navigateur ne supporte pas cette extension. ")])):s.type_media==l.global_values.bandeson?(a(),d("audio",Et,[e("source",{src:o.get_url(s)},null,8,It),p(" Votre navigateur ne supporte pas cette extension. ")])):(a(),d("embed",{key:2,src:o.get_url(s),class:"embeb_position"},null,8,Gt)),e("div",Jt,[Kt,e("button",{class:"button",onClick:v=>o.toggle_media(s)},"Fermer",8,Ht)])])])],2)])]))),256))]),e("footer",Qt,[e("button",{onClick:t[17]||(t[17]=(...s)=>o.toggle&&o.toggle(...s)),class:"button"},"Sauvegarder")])])],2)]))])}const Xt=V(pe,[["render",Wt]]),Yt={name:"finalform",props:["themes","saisons","publics","data"],data(){return{tags:[]}},computed:{dvl(){return this.data.description.length},pvl(){return this.data.public_specifique.length}},methods:{MaxLengthTextarea(i,t){this.data[i].length>t&&(this.data[i]=this.data[i].substring(0,t),alert("Votre texte ne doit pas dépasser "+t+" caractères!"))}},watch:{tags:function(i){this.data.tags=[];for(let t in i)this.data.tags.push(i[t]);this.$emit("update-tags")}},mounted(){for(let i in this.data.tags)this.tags.push(this.data.tags[i].id)}},Zt={class:"form_position"},$t={class:"box"},es={class:"field"},ts=e("label",{class:"label"},"Public spécifique",-1),ss={class:"control"},is=e("p",{class:"subtitle"},"Mots-clés*",-1),ls={class:"form_position"},os=e("p",{class:"subtitle is-6"},"Thémes",-1),as={class:"columns is-multiline"},ns={class:"column is-2"},ds=["for"],cs=["value","id"],rs={class:"form_position"},_s=e("p",{class:"subtitle is-6"},"Saison",-1),us={class:"columns is-multiline"},ms={class:"column is-2"},hs=["for"],fs=["value","id"],vs={class:"form_position"},bs=e("p",{class:"subtitle is-6"},"Public",-1),ps={class:"columns is-multiline"},gs={class:"column is-2"},ys=["for"],qs=["value","id"],xs={class:"field form_position"},ks=e("label",{class:"label"},"Après l'animation",-1),Cs={class:"control"},Vs=e("span",null,"Étape(s) à réaliser en aval de l'animation. Ex : vérifier des pièges photos entre deux séances.",-1);function ws(i,t,l,f,n,o){return a(),d("div",Zt,[e("div",$t,[e("div",es,[ts,e("div",ss,[e("span",null,"Nombre de caractères : "+_(o.pvl),1),r(e("textarea",{class:"textarea",rows:"10",placeholder:"Rentrer le texte en moins de 400 caractères.",name:"public_specifique","onUpdate:modelValue":t[0]||(t[0]=c=>l.data.public_specifique=c),onKeyup:t[1]||(t[1]=c=>{o.MaxLengthTextarea("public_specifique",400)})},null,544),[[u,l.data.public_specifique]])])]),is,e("div",ls,[os,e("div",as,[(a(!0),d(m,null,h(l.themes,c=>(a(),d("div",ns,[e("label",{class:"checkbox",for:c.id},[r(e("input",{type:"checkbox",value:c.id,id:c.id,"onUpdate:modelValue":t[2]||(t[2]=s=>n.tags=s)},null,8,cs),[[x,n.tags]]),p(" "+_(c.label),1)],8,ds)]))),256))])]),e("div",rs,[_s,e("div",us,[(a(!0),d(m,null,h(l.saisons,c=>(a(),d("div",ms,[e("label",{class:"checkbox",for:c.id},[r(e("input",{type:"checkbox",value:c.id,id:c.id,"onUpdate:modelValue":t[3]||(t[3]=s=>n.tags=s)},null,8,fs),[[x,n.tags]]),p(" "+_(c.label),1)],8,hs)]))),256))])]),e("div",vs,[bs,e("div",ps,[(a(!0),d(m,null,h(l.publics,c=>(a(),d("div",gs,[e("label",{class:"checkbox",for:c.id},[r(e("input",{type:"checkbox",value:c.id,id:c.id,"onUpdate:modelValue":t[4]||(t[4]=s=>n.tags=s)},null,8,qs),[[x,n.tags]]),p(" "+_(c.label),1)],8,ys)]))),256))])]),e("div",xs,[ks,e("div",Cs,[Vs,r(e("textarea",{class:"textarea",name:"post_anim","onUpdate:modelValue":t[5]||(t[5]=c=>l.data.post_anim=c)},null,512),[[u,l.data.post_anim]])])])])])}const Us=V(Yt,[["render",ws]]),js={name:"create_form",components:{Anim:be,Seq:Xt,Final:Us},data(){return{rep:{},data:{titre:"",lieu:"",objectifs:"",_min:"",_max:"",pre_anim:"",preconisations:"",annulation:"",post_anim:"",public_specifique:"",tags:[],sequences:[]},medias:[],redirect:"",end:!1,global_values:{},data_ready:!1}},methods:{async get_thes(){return await(await fetch(`${this.$url_prefix}/pedagogie/get_thes`)).json()},async get_medias(){return await(await fetch(`${this.$url_prefix}/pedagogie/get_medias`)).json()},async get_anim(i){return await(await fetch(`${this.$url_prefix}/pedagogie/get_anim?q=${i}`)).json()},add_seq(){this.data.sequences.push({type_seq:{id:""},titre:"",description:"",approche:{id:""},modalite:{id:""},objectifs:"",duree:{id:""},materiel_div:"",materiel:[]})},remove_seq(i){this.data.sequences.splice(i,1)},send_data(i){this.data.statut=i?3:2,fetch(`${this.$url_prefix}/pedagogie/cr_or_up_anim`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.data)}).then(t=>{t.text().then(l=>{this.redirect=l,this.end=!0})})},set_global(){this.global_values={intro:this.find_id_by_code("ref.type_seq","intro"),dvp:this.find_id_by_code("ref.type_seq","dvp"),dvpopt:this.find_id_by_code("ref.type_seq","dvpopt"),conclu:this.find_id_by_code("ref.type_seq","conclu"),image:this.find_id_by_code("ref.type_media","image"),photo:this.find_id_by_code("ref.type_media","photo"),video:this.find_id_by_code("ref.type_media","video"),bandeson:this.find_id_by_code("ref.type_media","bandeson"),support:this.find_id_by_code("ref.type_media","support"),conte:this.find_id_by_code("ref.type_media","conte")}},find_id_by_code(i,t){for(let l in this.rep[i])if(this.rep[i][l].code==t)return this.rep[i][l].id},update_tags(){for(let i in this.data.tags){let t=["ref.theme","ref.saison","ref.public"];for(let l in t){let f=t[l];for(let n in this.rep[f])this.rep[f][n].id==this.data.tags[i]&&(this.data.tags[i]=this.rep[f][n])}}}},computed:{isfirst(){return this.data.sequences.length==0},hasconclusion(){let i;return this.data.sequences.length==0?i=!1:i=this.data.sequences[this.data.sequences.length-1].type_seq.id==this.global_values.conclu,i||(this.data.description="",this.data.public_specifique="",this.data.post_anim="",this.data.tags=[]),i},animcomplete(){return this.data.titre&&this.data.lieu&&this.data.objectifs&&this.data._min&&this.data._max},dureetotale(){let i=0;for(const t in this.data.sequences){const l=this.data.sequences[t];for(const f in this.rep["ref.duree_seq"]){const n=this.rep["ref.duree_seq"][f];n.id==l.duree.id&&(i+=parseInt(n.code))}}return i},firstseqisintro(){if(this.data.sequences.length!=0&&this.data.sequences[0].type_seq.id!="")return this.data.sequences[0].type_seq.id!=this.global_values.intro&&(alert("La première séquence doit être une introduction."),this.data.sequences[0].type_seq.id=this.global_values.intro),!0},allseqcomplete(){for(const i in this.data.sequences){const t=this.data.sequences[i];if(!t.type_seq.id||!t.titre||!t.description||!t.approche.id||!t.modalite.id||!t.objectifs||!t.duree.id)return!1}return!0},finaliscomplete(){return this.data.tags.length!=0},issend(){return this.end}},async mounted(){if(this.rep=await this.get_thes(),this.set_global(),this.medias=await this.get_medias(),this.medias.sort(function(i,t){if(i.nom==t.nom)return 0;{let l=[i.nom.toLowerCase(),t.nom.toLowerCase()];return l.sort(),l[0]==i.nom.toLowerCase()?-1:1}}),this.$route.query.q){this.data=await this.get_anim(this.$route.query.q);for(let i in this.data.sequences){let t=this.data.sequences[i];for(let l in t.materiel)t.materiel[l]=t.materiel[l].id}}this.data_ready=!0}},Ss={key:0},Ts={key:0,class:"container large_form bottom_120"},Ls={class:"sticky_head"},Ms={class:"subtitle is-6"},Ns=e("h1",{class:"subtitle text_color"},"Créer une animation",-1),Fs=e("p",{class:"text_color"},"Les champs marqués d'un astérisque (*) sont obligatoires.",-1),zs={class:"form_position"},As={class:"buttons spaced_buttons"},Ds={class:"form_position"},Os={class:"buttons spaced_buttons"},Ps={class:"icon"},Bs={key:2},Rs={class:"form_position"},Es={class:"buttons spaced_buttons"},Is={key:1,class:"container form_position"},Gs={class:"title"},Js=["href"];function Ks(i,t,l,f,n,o){const c=q("Anim"),s=q("Seq"),v=q("font-awesome-icon"),j=q("Final");return n.data_ready?(a(),d("div",Ss,[o.issend?(a(),d("div",Is,[e("h1",Gs,[p("Vous pouvez consulter "),e("a",{href:n.redirect},"votre animation",8,Js),p(" !")])])):(a(),d("div",Ts,[e("div",Ls,[e("p",Ms,"Durée totale de l'animation : "+_(o.dureetotale)+" min",1)]),Ns,Fs,C(c,{data:n.data},null,8,["data"]),e("div",zs,[e("div",As,[o.isfirst&&o.animcomplete?(a(),d("button",{key:0,type:"button",onClick:t[0]||(t[0]=(...b)=>o.add_seq&&o.add_seq(...b)),class:"button"},"Première séquence")):g("",!0),o.isfirst&&o.animcomplete?(a(),d("button",{key:1,type:"button",class:"button is-warning",onClick:t[1]||(t[1]=b=>o.send_data(!0))},"Finir plus tard")):g("",!0)])]),o.animcomplete?(a(!0),d(m,{key:0},h(n.data.sequences,(b,w)=>(a(),U(s,{data:b,key:w,idx:w,parties:n.rep["ref.type_seq"],approches:n.rep["ref.approche"],modalites:n.rep["ref.modalite"],durees:n.rep["ref.duree_seq"],medias:n.medias,types_media:n.rep["ref.type_media"],themes:n.rep["ref.theme"],global_values:n.global_values,onRemoveSeq:S=>o.remove_seq(w),onGetMedias:t[2]||(t[2]=S=>o.get_medias())},null,8,["data","idx","parties","approches","modalites","durees","medias","types_media","themes","global_values","onRemoveSeq"]))),128)):g("",!0),e("div",Ds,[e("div",Os,[!o.isfirst&&o.firstseqisintro&&o.allseqcomplete?(a(),d("button",{key:0,type:"button",onClick:t[3]||(t[3]=(...b)=>o.add_seq&&o.add_seq(...b)),class:"button"},[e("span",Ps,[C(v,{icon:["fas","plus"]})])])):g("",!0),!o.isfirst&&o.firstseqisintro&&o.allseqcomplete&&!o.hasconclusion?(a(),d("button",{key:1,type:"button",class:"button is-warning",onClick:t[4]||(t[4]=b=>o.send_data(!0))},"Finir plus tard")):(a(),d("i",Bs))])]),o.hasconclusion&&o.allseqcomplete?(a(),U(j,{key:1,data:n.data,themes:n.rep["ref.theme"],saisons:n.rep["ref.saison"],publics:n.rep["ref.public"],onUpdateTags:t[5]||(t[5]=b=>o.update_tags())},null,8,["data","themes","saisons","publics"])):g("",!0),e("div",Rs,[e("div",Es,[o.hasconclusion&&o.animcomplete&&o.allseqcomplete&&o.finaliscomplete?(a(),d("button",{key:0,type:"button",class:"button",onClick:t[6]||(t[6]=b=>o.send_data(!1))},"Envoyer")):g("",!0),o.hasconclusion&&o.animcomplete&&o.allseqcomplete&&!o.finaliscomplete?(a(),d("button",{key:1,type:"button",class:"button is-warning",onClick:t[7]||(t[7]=b=>o.send_data(!0))},"Finir plus tard")):g("",!0)])])]))])):g("",!0)}const Qs=V(js,[["render",Ks]]);export{Qs as default};

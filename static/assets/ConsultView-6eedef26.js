import{_ as g,r as v,o as t,c as e,a as s,t as l,i as c,F as p,h as b,b as u,w as x,e as r,n as f}from"./index-aa26a53f.js";const L={name:"anim_consult",components:{},data(){return{data:{},data_ready:!1}},methods:{async get_anim(){return await(await fetch(`${this.$url_prefix}/pedagogie/get_anim?q=${this.$route.params.id}`)).json()},get_duree_totale(){let n=0;for(let a in this.data.sequences){let m=this.data.sequences[a];n+=parseInt(m.duree.code)}return n},async validate(){await fetch(`${this.$url_prefix}/pedagogie/${this.data.id}/validate`),this.data.statut=1},async delete_anim(){await fetch(`${this.$url_prefix}/pedagogie/delete?q=${this.data.id}`).then(n=>{this.$router.push("/pedagogie/search")})}},computed:{is_not_public(){let n=0;for(let a in this.data.tags)this.data.tags[a].reference=="ref.public"&&n++;return n==0},is_materiel(){let n=0;for(let a in this.data.sequences)this.data.sequences[a].materiel_div&&n++;return n!=0},is_statut(){return this.data.statut}},async mounted(){this.data=await this.get_anim(),this.data_ready=!0}},M={key:0},T={class:"container large_form bottom_120"},H={class:"form_position"},w={class:"columns text_break"},C={class:"column is-8"},V={class:"title text_color"},q={key:0,class:"text_color"},j=s("b",{class:"text_color"},"Mots-clés :",-1),D={class:"columns is-multiline"},N={class:"column is-2"},A={class:"icon-text"},B={class:"icon"},F={class:"text_color"},P={key:0,class:"column is-2"},E={key:0,class:"icon-text"},O={class:"icon"},R=s("span",{class:"text_color"},"Tout niveau",-1),z={class:"column is-4"},I={class:"field has-addons"},S={class:"control"},G={class:"icon"},J={class:"control"},K={class:"icon"},Q={key:0,class:"button ghost_button"},U={class:"tooltip"},W={class:"icon"},X=s("span",{class:"tooltiptext"},"En cours d'écriture",-1),Y={class:"tooltip"},Z={class:"icon-text"},$={class:"icon"},ss=s("span",null,"Valider l'animation",-1),ts=s("span",{class:"tooltiptext"},"Terminée",-1),es={key:2,class:"button ghost_button"},os={class:"tooltip"},ns={class:"icon"},is=s("span",{class:"tooltiptext"},"Validée",-1),ls={class:"box"},cs={class:"columns is-multiline text_break"},as={class:"column is-4"},_s=s("b",null,"Lieux :",-1),ds={class:"column is-4"},rs=s("b",null,"Nombre min/max de personnes :",-1),us={class:"column is-4"},hs=s("b",null,"Durée totale : ",-1),ms={class:"column is-12"},ps=s("b",null,"Objectifs :",-1),bs=["innerHTML"],vs={key:0,class:"column is-6"},fs=s("b",null,"Préconisations :",-1),ks=["innerHTML"],ys={key:1,class:"column is-6"},gs=s("b",null,"Conditions d'annulation :",-1),xs=["innerHTML"],Ls={key:2,class:"column is-6"},Ms=s("b",null,"Préparation/Mise en place :",-1),Ts=["innerHTML"],Hs={key:3,class:"column is-6"},ws=s("b",null,"Matériel :",-1),Cs=["innerHTML"],Vs={class:"box"},qs={class:"column is-12"},js={class:"title is-4"},Ds={class:"columns is-multiline text_break"},Ns={class:"column is-4"},As=s("b",null,"Description :",-1),Bs=["innerHTML"],Fs={class:"column is-4"},Ps=s("b",null,"Objectifs :",-1),Es=["innerHTML"],Os={class:"column is-2"},Rs=s("b",null,"Modalité :",-1),zs=s("b",null,"Approche :",-1),Is={class:"column is-2"},Ss=s("b",null,"Durée :",-1),Gs={key:0},Js=s("b",null,"Aperçu médias :",-1),Ks={class:"columns is-multiline text_break"},Qs={class:"column is-2"},Us=["onClick"],Ws=s("div",{class:"modal-background"},null,-1),Xs={class:"modal-content large_modal"},Ys={class:"box"},Zs={class:"subtitle"},$s={key:0,controls:"",class:"embeb_position"},st=["src"],tt={key:1,controls:"",class:"embeb_position"},et=["src"],ot=["src"],nt={class:"buttons spaced_buttons"},it=s("i",null,null,-1),lt=["onClick"],ct={class:"columns is-multiline text_break"},at={key:0,class:"column is-6"},_t=s("b",null,"Public spécifique :",-1),dt=["innerHTML"],rt={key:1,class:"column is-6"},ut=s("b",null,"Après l'animation :",-1),ht=["innerHTML"];function mt(n,a,m,pt,o,d){const h=v("font-awesome-icon"),k=v("RouterLink");return o.data_ready?(t(),e("div",M,[s("div",T,[s("div",H,[s("div",w,[s("div",C,[s("h2",V,l(o.data.titre),1),o.data.date_modif?(t(),e("p",q,[s("small",null,"Dernière modification le "+l(o.data.date_modif),1)])):c("",!0),s("p",null,[s("small",null,[j,s("div",D,[(t(!0),e(p,null,b(o.data.tags,i=>(t(),e("div",N,[s("span",A,[s("span",B,[u(h,{icon:["fas","check"],style:{color:"white"}})]),s("span",F,l(i.label),1)])]))),256)),d.is_not_public?(t(),e("div",P,[d.is_not_public?(t(),e("span",E,[s("span",O,[u(h,{icon:["fas","check"]})]),R])):c("",!0)])):c("",!0)])])])]),s("div",z,[s("div",I,[s("p",S,[u(k,{to:"/pedagogie/create?q="+o.data.id,class:"button"},{default:x(()=>[s("span",G,[u(h,{icon:["fas","pen"]})])]),_:1},8,["to"])]),s("p",J,[s("a",{onClick:a[0]||(a[0]=i=>d.delete_anim()),class:"button"},[s("span",K,[u(h,{icon:["fas","trash"]})])])])]),d.is_statut=="3"?(t(),e("span",Q,[s("div",U,[s("span",W,[u(h,{icon:["fas","spinner"]})]),X])])):d.is_statut=="2"?(t(),e("a",{key:1,onClick:a[1]||(a[1]=(...i)=>d.validate&&d.validate(...i)),class:"button"},[s("div",Y,[s("span",Z,[s("span",$,[u(h,{icon:["fas","check"],style:{color:"yellow"}})]),ss]),ts])])):(t(),e("span",es,[s("div",os,[s("span",ns,[u(h,{icon:["fas","check"],style:{color:"green"}})]),is])]))])]),s("div",ls,[s("div",cs,[s("div",as,[_s,r(" "+l(o.data.lieu),1)]),s("div",ds,[rs,r(" "+l(o.data._min)+"/"+l(o.data._max),1)]),s("div",us,[hs,r(" "+l(d.get_duree_totale())+" min ",1)]),s("div",ms,[ps,s("div",{innerHTML:n.md(o.data.objectifs)},null,8,bs)]),o.data.preconisations?(t(),e("div",vs,[fs,s("div",{innerHTML:n.md(o.data.preconisations)},null,8,ks)])):c("",!0),o.data.annulation?(t(),e("div",ys,[gs,s("div",{innerHTML:n.md(o.data.annulation)},null,8,xs)])):c("",!0),o.data.pre_anim?(t(),e("div",Ls,[Ms,s("div",{innerHTML:n.md(o.data.pre_anim)},null,8,Ts)])):c("",!0),d.is_materiel?(t(),e("div",Hs,[ws,(t(!0),e(p,null,b(o.data.sequences,i=>(t(),e("div",{innerHTML:n.md(i.materiel_div)},null,8,Cs))),256))])):c("",!0)]),(t(!0),e(p,null,b(o.data.sequences,i=>(t(),e("div",Vs,[s("div",{class:f(["columns text_break",i.type_seq.code+"-color"])},[s("div",qs,[s("h3",js,[s("b",null,l(i.type_seq.label)+" :",1),r(" "+l(i.titre),1)])])],2),s("div",Ds,[s("div",Ns,[As,s("div",{innerHTML:n.md(i.description)},null,8,Bs)]),s("div",Fs,[Ps,s("div",{innerHTML:n.md(i.objectifs)},null,8,Es)]),s("div",Os,[s("p",null,[Rs,r(" "+l(i.modalite.label),1)]),s("p",null,[zs,r(" "+l(i.approche.label),1)])]),s("div",Is,[s("p",null,[Ss,r(" "+l(i.duree.label),1)])])]),i.materiel.length?(t(),e("div",Gs,[Js,s("div",Ks,[(t(!0),e(p,null,b(i.materiel,_=>(t(),e("div",Qs,[s("button",{class:"button",onClick:y=>_.open="is-active"},l(_.nom),9,Us),s("div",{class:f(["modal",_.open])},[Ws,s("div",Xs,[s("div",Ys,[s("h1",Zs,l(_.nom),1),_.type_media.code=="video"?(t(),e("video",$s,[s("source",{src:`${this.$url_prefix}/`+_.url},null,8,st),r(" Votre navigateur ne supporte pas cette extension. ")])):_.type_media.code=="bandeson"?(t(),e("audio",tt,[s("source",{src:`${this.$url_prefix}/`+_.url},null,8,et),r(" Votre navigateur ne supporte pas cette extension. ")])):(t(),e("embed",{key:2,src:`${this.$url_prefix}/`+_.url,class:"embeb_position"},null,8,ot)),s("div",nt,[it,s("button",{class:"button",onClick:y=>_.open=""},"Fermer",8,lt)])])])],2)]))),256))])])):c("",!0)]))),256)),s("div",ct,[o.data.public_specifique?(t(),e("div",at,[_t,s("div",{innerHTML:n.md(o.data.public_specifique)},null,8,dt)])):c("",!0),o.data.post_anim?(t(),e("div",rt,[ut,s("div",{innerHTML:n.md(o.data.post_anim)},null,8,ht)])):c("",!0)])])])])])):c("",!0)}const vt=g(L,[["render",mt]]);export{vt as default};
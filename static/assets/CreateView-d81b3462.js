import{_ as L,r as C,o,c as a,a as t,f as h,v as y,b as k,t as m,g as U,F as f,h as v,i as V,n as S,e as g,w as E,d as N,j as x}from"./index-aa26a53f.js";const T={name:"synform",props:["idx","data"]},A={class:"column is-2"},M={class:"columns is-gapless"},B={class:"column is-11"},q={class:"column is-1"},D={class:"icon"};function I(i,e,r,l,n,_){const b=C("font-awesome-icon");return o(),a("div",A,[t("div",M,[t("div",B,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[0]||(e[0]=d=>r.data.synonyme=d)},null,512),[[y,r.data.synonyme]])]),t("div",q,[t("button",{type:"button",onClick:e[1]||(e[1]=d=>i.$emit("remove-syn")),class:"button"},[t("span",D,[k(b,{icon:["fas","minus"]})])])])])])}const R=L(T,[["render",I]]),j={name:"verform",props:["idx","data"]},P={class:"column is-2"},z={class:"columns is-gapless"},F={class:"column is-11"},H={class:"column is-1"},J={class:"icon"};function O(i,e,r,l,n,_){const b=C("font-awesome-icon");return o(),a("div",P,[t("div",z,[t("div",F,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[0]||(e[0]=d=>r.data.vernaculaire=d)},null,512),[[y,r.data.vernaculaire]])]),t("div",H,[t("button",{type:"button",onClick:e[1]||(e[1]=d=>i.$emit("remove-ver")),class:"button"},[t("span",J,[k(b,{icon:["fas","minus"]})])])])])])}const K=L(j,[["render",O]]),G={name:"taxonomie_form",components:{Synonyme:R,Vernaculaire:K},data(){return{rep:{},data:{nom:"",auteur:"",annee:"",description:"",publication:"",bibliographie:"",rang:{id:""},parent:{parent:""},tags:[],synonymes:[],vernaculaires:[]},redirect:"",end:!1,rangs:[],parents:[],from:"",to:"",tags:[],alert:"",data_ready:!1}},methods:{async get_thes(){return await(await fetch(`${this.$url_prefix}/especes/get_thes`)).json()},async get_taxon(i){return await(await fetch(`${this.$url_prefix}/especes/get_taxon?q=${i}`)).json()},get_parents(i){fetch(`${this.$url_prefix}/especes/get_parents?q=${i}`).then(e=>{e.json().then(r=>{this.parents=r,this.autocomplete(document.getElementById("parent"),this.parents,this.data.parent)})})},send_data(){fetch(`${this.$url_prefix}/especes/cr_or_up_nomenclature`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.data)}).then(i=>{i.text().then(e=>{e=="duplicate"?this.alert=e:(this.redirect=e,this.end=!0)})})},MaxLengthTextarea(i,e){this.data[i].length>e&&(this.data[i]=this.data[i].substring(0,e),alert("Votre texte ne doit pas dépasser "+e+" caractères!"))},add_syn(){this.data.synonymes.push({synonyme:""})},remove_syn(i){this.data.synonymes.splice(i,1)},add_ver(){this.data.vernaculaires.push({vernaculaire:""})},remove_ver(i){this.data.vernaculaires.splice(i,1)},autocomplete(i,e,r){e.length==0?(i.disabled=!0,i.placeholder="PAS DE PARENTS POSSIBLES"):(i.disabled=!1,i.placeholder="");var l;i.addEventListener("input",function(d){var c,p,s,u=this.value;if(b(),!u)return!1;for(l=-1,c=document.createElement("DIV"),c.setAttribute("id",this.id+"autocomplete-list"),c.setAttribute("class","autocomplete-items"),this.parentNode.appendChild(c),s=0;s<e.length;s++)e[s].nom.substr(0,u.length).toUpperCase()==u.toUpperCase()&&(p=document.createElement("DIV"),p.innerHTML="<strong>"+e[s].nom.substr(0,u.length)+"</strong>",p.innerHTML+=e[s].nom.substr(u.length),p.innerHTML+="<input type='hidden' value='"+e[s].nom+"'>",p.addEventListener("click",function(w){i.value=this.getElementsByTagName("input")[0].value,r.parent=this.getElementsByTagName("input")[0].value,b()}),c.appendChild(p));c.children.length==0&&i.value.length!=0?(i.className="input is-danger",p=document.createElement("DIV"),p.innerHTML="<strong>Ce parent n'existe pas ou l'ortographe est éronnée</strong>",c.appendChild(p)):i.className="input"}),i.addEventListener("keydown",function(d){var c=document.getElementById(this.id+"autocomplete-list");c&&(c=c.getElementsByTagName("div")),d.keyCode==40?(l++,n(c)):d.keyCode==38?(l--,n(c)):d.keyCode==13&&(d.preventDefault(),l>-1&&c&&c[l].click())});function n(d){if(!d)return!1;_(d),l>=d.length&&(l=0),l<0&&(l=d.length-1),d[l].classList.add("autocomplete-active")}function _(d){for(var c=0;c<d.length;c++)d[c].classList.remove("autocomplete-active")}function b(d){for(var c=document.getElementsByClassName("autocomplete-items"),p=0;p<c.length;p++)d!=c[p]&&d!=i&&c[p].parentNode.removeChild(c[p])}document.addEventListener("click",function(d){b(d.target)})},fill_floraison(){let i=[];for(let e in this.rep["ref.floraison"])i.push(this.rep["ref.floraison"][e].id);if(this.data.tags=this.data.tags.filter(e=>{for(let r in i)if(i[r]==e.id)return!1;return!0}),this.from&&this.to)if(this.from<=this.to)for(let e=this.from;e<=this.to;e++)this.data.tags.push({id:e});else{let e=i[i.length-1];for(let l=this.from;l<=e;l++)this.data.tags.push({id:l});let r=i[0];for(let l=r;l<=this.to;l++)this.data.tags.push({id:l})}},set_floraison(){let i=[],e=["Décembre","Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre"];for(let r in this.data.tags){let l=this.data.tags[r];l.reference=="ref.floraison"&&i.push(l)}if(i.length!=0){let r=0,l=0;for(let n in e){let _=e[n];i[0].label==_&&(r=n),i[i.length-1].label==_&&(l=n)}l-r+1==i.length?(this.from=i[0].id,this.to=i[i.length-1].id):(this.from=i[i.length-1].id,this.to=i[0].id)}},update_tags(){for(let i in this.data.tags)this.data.tags[i].id||(this.data.tags[i]={id:this.data.tags[i]})}},computed:{dvl(){return this.data.description.length},bvl(){return this.data.bibliographie.length},getfilteredparents(){let i=this.parents;return this.parent!=""&&(i=i.filter(e=>e.nom.toLowerCase().substring(0,this.parent.length)==this.parent.toLowerCase())),i},israng(){if(this.data.rang.id){let i=0;for(let r in this.rangs)this.rangs[r].id==this.data.rang.id&&(i=r);if(this.rangs[i].code=="regne")return!1;let e=this.data.rang.id-1;return this.get_parents(e),!0}return!1},iscomplete(){return this.data.nom&&this.data.rang.id&&this.data.bibliographie},issend(){return this.end},isalert(){return this.alert?"is-active":""}},watch:{tags:function(i){this.data.tags=[];for(let e in i)this.data.tags.push(i[e]);this.update_tags()}},async mounted(){if(this.rep=await this.get_thes(),this.rangs=this.rep["ref.rang"],this.$route.query.q){this.data=await this.get_taxon(this.$route.query.q),this.data.parent={parent:this.data.parent.nom?this.data.parent.nom:""},this.set_floraison();for(let e in this.data.tags){let r=this.data.tags[e];this.data.tags[e]={id:r.id}}let i=[];for(let e in this.data.tags){let r=this.data.tags[e];i.push(r.id)}this.tags=i}this.data_ready=!0}},Q={key:0},W={key:0,class:"container large_form"},X={class:"form_position"},Y=t("h1",{class:"subtitle text_color"},"Insertion de données",-1),Z=t("p",{class:"text_color"},"Les champs marqués d'un astérisque (*) sont obligatoires.",-1),$={class:"box"},tt={class:"columns"},et={class:"column is-4"},st={class:"field"},it=t("label",{class:"label"},"Nom*",-1),nt={class:"control"},ot={class:"column is-4"},lt={class:"field"},at=t("label",{class:"label"},"Auteur",-1),dt={class:"control"},rt={class:"column is-4"},ct={class:"field"},ut=t("label",{class:"label"},"Année",-1),_t={class:"control"},ht={class:"columns"},pt={class:"column is-12"},mt={class:"field"},ft=t("label",{class:"label"},"Publication",-1),vt={class:"control"},bt={class:"field"},gt=t("label",{class:"label"},"Description",-1),yt={class:"control"},xt={class:"field"},Ct=t("label",{class:"label"},"Bibliographie*",-1),kt={class:"control"},Vt={class:"columns"},Ut={class:"column is-2"},Lt={class:"field"},wt=t("label",{class:"label"},"Rang*",-1),Nt={class:"control"},St={class:"select"},Et=t("option",{value:""},"Choisir ...",-1),Tt=["value"],At={class:"column is-10"},Mt={key:0,class:"field"},Bt=t("label",{class:"label"},"Parent",-1),qt={class:"control autocomplete"},Dt={class:"columns"},It=t("div",{class:"column is-1"},[t("label",{class:"label"},"Synonymes")],-1),Rt={class:"column is-11"},jt={class:"icon is-small"},Pt={class:"columns is-multiline"},zt={class:"columns"},Ft=t("div",{class:"column is-1"},[t("label",{class:"label"},"Vernaculaires")],-1),Ht={class:"column is-11"},Jt={class:"icon is-small"},Ot={class:"columns is-multiline"},Kt={class:"columns is-multiline"},Gt=t("div",{class:"column is-12"},[t("label",{class:"label"},"Mots-clés")],-1),Qt={class:"column is-12"},Wt=t("p",{class:"subtitle is-6"},"Floraison",-1),Xt={class:"columns"},Yt={class:"column is-2"},Zt={class:"field is-horizontal"},$t=t("div",{class:"field-label is-normal field_text"},[t("label",{class:"label"},"De")],-1),te={class:"field-body"},ee={class:"field"},se={class:"control"},ie={class:"select"},ne=t("option",{value:""},"Choisir ...",-1),oe=["value"],le={class:"column is-10"},ae={class:"field is-horizontal"},de=t("div",{class:"field-label is-normal field_text"},[t("label",{class:"label"},"à")],-1),re={class:"field-body"},ce={class:"field"},ue={class:"control"},_e={class:"select"},he=t("option",{value:""},"Choisir ...",-1),pe=["value"],me={class:"column"},fe=t("p",{class:"subtitle is-6"},"Couleur des fleurs",-1),ve=["for"],be=["value","name","id"],ge={class:"column"},ye=t("p",{class:"subtitle is-6"},"Type biologique",-1),xe=["for"],Ce=["value","name","id"],ke={class:"column"},Ve=t("p",{class:"subtitle is-6"},"Conservation / patrimonialité",-1),Ue=["for"],Le=["value","name","id"],we={class:"column"},Ne=t("p",{class:"subtitle is-6"},"Status IUCN à l'échelle mondiale",-1),Se=["for"],Ee=["value","name","id"],Te={class:"column"},Ae=t("p",{class:"subtitle is-6"},"Status IUCN à l'échelle européenne",-1),Me=["for"],Be=["value","name","id"],qe={class:"column"},De=t("p",{class:"subtitle is-6"},"Status IUCN à l'échelle régionale PACA",-1),Ie=["for"],Re=["value","name","id"],je=t("div",{class:"modal-background"},null,-1),Pe={class:"modal-content"},ze={class:"box"},Fe={key:0},He=t("p",{class:"subtitle text_center"},"Taxon déjà existant",-1),Je=t("p",null,"Le taxon que vous avez essayé d'insérer existe déja !",-1),Oe=[He,Je],Ke={class:"form_position"},Ge={class:"buttons spaced_buttons"},Qe=t("i",null,null,-1),We={key:1,class:"container form_position"},Xe={class:"title"};function Ye(i,e,r,l,n,_){const b=C("font-awesome-icon"),d=C("Synonyme"),c=C("Vernaculaire"),p=C("RouterLink");return n.data_ready?(o(),a("div",Q,[_.issend?(o(),a("div",We,[t("h1",Xe,[g("Vous pouvez consulter "),k(p,{to:n.redirect},{default:E(()=>[g("votre donnée")]),_:1},8,["to"]),g(" !")])])):(o(),a("div",W,[t("div",X,[Y,Z,t("div",$,[t("div",tt,[t("div",et,[t("div",st,[it,t("div",nt,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[0]||(e[0]=s=>n.data.nom=s)},null,512),[[y,n.data.nom]])])])]),t("div",ot,[t("div",lt,[at,t("div",dt,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[1]||(e[1]=s=>n.data.auteur=s)},null,512),[[y,n.data.auteur]])])])]),t("div",rt,[t("div",ct,[ut,t("div",_t,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[2]||(e[2]=s=>n.data.annee=s)},null,512),[[y,n.data.annee]])])])])]),t("div",ht,[t("div",pt,[t("div",mt,[ft,t("div",vt,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[3]||(e[3]=s=>n.data.publication=s)},null,512),[[y,n.data.publication]])])])])]),t("div",bt,[gt,t("div",yt,[t("span",null,"Nombre de caractères : "+m(_.dvl),1),h(t("textarea",{name:"description",class:"textarea","onUpdate:modelValue":e[4]||(e[4]=s=>n.data.description=s),onKeyup:e[5]||(e[5]=s=>{_.MaxLengthTextarea("description",400)}),placeholder:"Rentrer le texte en moins de 400 caractères."},null,544),[[y,n.data.description]])])]),t("div",xt,[Ct,t("div",kt,[t("span",null,"Nombre de caractères : "+m(_.bvl),1),h(t("textarea",{name:"bibliographie",class:"textarea","onUpdate:modelValue":e[6]||(e[6]=s=>n.data.bibliographie=s),onKeyup:e[7]||(e[7]=s=>{_.MaxLengthTextarea("bibliographie",600)}),placeholder:"Rentrer le texte en moins de 600 caractères."},null,544),[[y,n.data.bibliographie]])])]),t("div",Vt,[t("div",Ut,[t("div",Lt,[wt,t("div",Nt,[t("div",St,[h(t("select",{name:"rang","onUpdate:modelValue":e[8]||(e[8]=s=>n.data.rang.id=s)},[Et,(o(!0),a(f,null,v(n.rangs,s=>(o(),a("option",{value:s.id},m(s.label),9,Tt))),256))],512),[[U,n.data.rang.id]])])])])]),t("div",At,[_.israng&&n.parents?(o(),a("div",Mt,[Bt,t("div",qt,[h(t("input",{class:"input",type:"text",id:"parent","onUpdate:modelValue":e[9]||(e[9]=s=>n.data.parent.parent=s)},null,512),[[y,n.data.parent.parent]])])])):V("",!0)])]),t("div",Dt,[It,t("div",Rt,[t("button",{type:"button",onClick:e[10]||(e[10]=(...s)=>_.add_syn&&_.add_syn(...s)),class:"button is-small"},[t("span",jt,[k(b,{icon:["fas","plus"]})])])])]),t("div",Pt,[(o(!0),a(f,null,v(n.data.synonymes,(s,u)=>(o(),N(d,{data:s,key:u,idx:u,onRemoveSyn:w=>_.remove_syn(u)},null,8,["data","idx","onRemoveSyn"]))),128))]),t("div",zt,[Ft,t("div",Ht,[t("button",{type:"button",onClick:e[11]||(e[11]=(...s)=>_.add_ver&&_.add_ver(...s)),class:"button is-small"},[t("span",Jt,[k(b,{icon:["fas","plus"]})])])])]),t("div",Ot,[(o(!0),a(f,null,v(n.data.vernaculaires,(s,u)=>(o(),N(c,{data:s,key:u,idx:u,onRemoveVer:w=>_.remove_ver(u)},null,8,["data","idx","onRemoveVer"]))),128))]),t("div",Kt,[Gt,t("div",Qt,[Wt,t("div",Xt,[t("div",Yt,[t("div",Zt,[$t,t("div",te,[t("div",ee,[t("div",se,[t("div",ie,[h(t("select",{name:"from","onUpdate:modelValue":e[12]||(e[12]=s=>n.from=s),onChange:e[13]||(e[13]=s=>_.fill_floraison())},[ne,(o(!0),a(f,null,v(n.rep["ref.floraison"],s=>(o(),a("option",{value:s.id},m(s.label),9,oe))),256))],544),[[U,n.from]])])])])])])]),t("div",le,[t("div",ae,[de,t("div",re,[t("div",ce,[t("div",ue,[t("div",_e,[h(t("select",{name:"to","onUpdate:modelValue":e[14]||(e[14]=s=>n.to=s),onChange:e[15]||(e[15]=s=>_.fill_floraison())},[he,(o(!0),a(f,null,v(n.rep["ref.floraison"],s=>(o(),a("option",{value:s.id},m(s.label),9,pe))),256))],544),[[U,n.to]])])])])])])])])]),t("div",me,[fe,(o(!0),a(f,null,v(this.rep["ref.couleur_fleur"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[16]||(e[16]=u=>n.tags=u)},null,8,be),[[x,n.tags]]),g(" "+m(s.label),1)],8,ve)]))),256))]),t("div",ge,[ye,(o(!0),a(f,null,v(this.rep["ref.type_bio"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[17]||(e[17]=u=>n.tags=u)},null,8,Ce),[[x,n.tags]]),g(" "+m(s.label),1)],8,xe)]))),256))]),t("div",ke,[Ve,(o(!0),a(f,null,v(this.rep["ref.conservation"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[18]||(e[18]=u=>n.tags=u)},null,8,Le),[[x,n.tags]]),g(" "+m(s.label),1)],8,Ue)]))),256))]),t("div",we,[Ne,(o(!0),a(f,null,v(this.rep["ref.iucn_monde"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[19]||(e[19]=u=>n.tags=u)},null,8,Ee),[[x,n.tags]]),g(" "+m(s.label),1)],8,Se)]))),256))]),t("div",Te,[Ae,(o(!0),a(f,null,v(this.rep["ref.iucn_europe"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[20]||(e[20]=u=>n.tags=u)},null,8,Be),[[x,n.tags]]),g(" "+m(s.label),1)],8,Me)]))),256))]),t("div",qe,[De,(o(!0),a(f,null,v(this.rep["ref.iucn_region"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[21]||(e[21]=u=>n.tags=u)},null,8,Re),[[x,n.tags]]),g(" "+m(s.label),1)],8,Ie)]))),256))])])]),t("div",{class:S(["modal",_.isalert])},[je,t("div",Pe,[t("div",ze,[n.alert=="duplicate"?(o(),a("div",Fe,Oe)):V("",!0),t("button",{id:"modal_button",class:"button is-primary",onClick:e[22]||(e[22]=s=>n.alert="")},"Accepter")])])],2),t("div",Ke,[t("div",Ge,[Qe,_.iscomplete?(o(),a("button",{key:0,type:"button",class:"button",onClick:e[23]||(e[23]=s=>_.send_data())},"Envoyer")):V("",!0)])])])]))])):V("",!0)}const $e=L(G,[["render",Ye]]);export{$e as default};
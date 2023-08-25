import{_ as N,r as C,o,c as a,a as t,f as h,v as b,b as k,t as p,g as U,F as m,h as f,i as V,n as w,e as g,d as L,j as x}from"./index-04d57ed5.js";const S={name:"synform",props:["idx","data"]},E={class:"column is-2"},T={class:"columns is-gapless"},A={class:"column is-11"},M={class:"column is-1"},B={class:"icon"};function q(i,e,c,l,n,_){const v=C("font-awesome-icon");return o(),a("div",E,[t("div",T,[t("div",A,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[0]||(e[0]=d=>c.data.synonyme=d)},null,512),[[b,c.data.synonyme]])]),t("div",M,[t("button",{type:"button",onClick:e[1]||(e[1]=d=>i.$emit("remove-syn")),class:"button"},[t("span",B,[k(v,{icon:["fas","minus"]})])])])])])}const D=N(S,[["render",q]]),I={name:"verform",props:["idx","data"]},R={class:"column is-2"},j={class:"columns is-gapless"},P={class:"column is-11"},z={class:"column is-1"},F={class:"icon"};function H(i,e,c,l,n,_){const v=C("font-awesome-icon");return o(),a("div",R,[t("div",j,[t("div",P,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[0]||(e[0]=d=>c.data.vernaculaire=d)},null,512),[[b,c.data.vernaculaire]])]),t("div",z,[t("button",{type:"button",onClick:e[1]||(e[1]=d=>i.$emit("remove-ver")),class:"button"},[t("span",F,[k(v,{icon:["fas","minus"]})])])])])])}const J=N(I,[["render",H]]),O={name:"taxonomie_form",components:{Synonyme:D,Vernaculaire:J},data(){return{rep:{},data:{nom:"",auteur:"",annee:"",description:"",publication:"",bibliographie:"",rang:{id:""},parent:{parent:""},tags:[],synonymes:[],vernaculaires:[]},redirect:"",end:!1,rangs:[],parents:[],from:"",to:"",tags:[],alert:"",data_ready:!1}},methods:{async get_thes(){return await(await fetch(`${this.$url_prefix}/especes/get_thes`)).json()},async get_taxon(i){return await(await fetch(`${this.$url_prefix}/especes/get_taxon?q=${i}`)).json()},get_parents(i){fetch(`${this.$url_prefix}/especes/get_parents?q=${i}`).then(e=>{e.json().then(c=>{this.parents=c,this.autocomplete(document.getElementById("parent"),this.parents,this.data.parent)})})},send_data(){fetch(`${this.$url_prefix}/especes/cr_or_up_nomenclature`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.data)}).then(i=>{i.text().then(e=>{e=="duplicate"?this.alert=e:(this.redirect=e,this.end=!0)})})},MaxLengthTextarea(i,e){this.data[i].length>e&&(this.data[i]=this.data[i].substring(0,e),alert("Votre texte ne doit pas dépasser "+e+" caractères!"))},add_syn(){this.data.synonymes.push({synonyme:""})},remove_syn(i){this.data.synonymes.splice(i,1)},add_ver(){this.data.vernaculaires.push({vernaculaire:""})},remove_ver(i){this.data.vernaculaires.splice(i,1)},autocomplete(i,e,c){e.length==0?(i.disabled=!0,i.placeholder="PAS DE PARENTS POSSIBLES"):(i.disabled=!1,i.placeholder="");var l;i.addEventListener("input",function(d){var u,s,r,y=this.value;if(v(),!y)return!1;for(l=-1,u=document.createElement("DIV"),u.setAttribute("id",this.id+"autocomplete-list"),u.setAttribute("class","autocomplete-items"),this.parentNode.appendChild(u),r=0;r<e.length;r++)e[r].nom.substr(0,y.length).toUpperCase()==y.toUpperCase()&&(s=document.createElement("DIV"),s.innerHTML="<strong>"+e[r].nom.substr(0,y.length)+"</strong>",s.innerHTML+=e[r].nom.substr(y.length),s.innerHTML+="<input type='hidden' value='"+e[r].nom+"'>",s.addEventListener("click",function(Ye){i.value=this.getElementsByTagName("input")[0].value,c.parent=this.getElementsByTagName("input")[0].value,v()}),u.appendChild(s));u.children.length==0&&i.value.length!=0?(i.className="input is-danger",s=document.createElement("DIV"),s.innerHTML="<strong>Ce parent n'existe pas ou l'ortographe est éronnée</strong>",u.appendChild(s)):i.className="input"}),i.addEventListener("keydown",function(d){var u=document.getElementById(this.id+"autocomplete-list");u&&(u=u.getElementsByTagName("div")),d.keyCode==40?(l++,n(u)):d.keyCode==38?(l--,n(u)):d.keyCode==13&&(d.preventDefault(),l>-1&&u&&u[l].click())});function n(d){if(!d)return!1;_(d),l>=d.length&&(l=0),l<0&&(l=d.length-1),d[l].classList.add("autocomplete-active")}function _(d){for(var u=0;u<d.length;u++)d[u].classList.remove("autocomplete-active")}function v(d){for(var u=document.getElementsByClassName("autocomplete-items"),s=0;s<u.length;s++)d!=u[s]&&d!=i&&u[s].parentNode.removeChild(u[s])}document.addEventListener("click",function(d){v(d.target)})},fill_floraison(){let i=[];for(let e in this.rep["ref.floraison"])i.push(this.rep["ref.floraison"][e].id);if(this.data.tags=this.data.tags.filter(e=>{for(let c in i)if(i[c]==e.id)return!1;return!0}),this.from&&this.to)if(this.from<=this.to)for(let e=this.from;e<=this.to;e++)this.data.tags.push({id:e});else{let e=i[i.length-1];for(let l=this.from;l<=e;l++)this.data.tags.push({id:l});let c=i[0];for(let l=c;l<=this.to;l++)this.data.tags.push({id:l})}},set_floraison(){let i=[],e=["Décembre","Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre"];for(let c in this.data.tags){let l=this.data.tags[c];l.reference=="ref.floraison"&&i.push(l)}if(i.length!=0){let c=0,l=0;for(let n in e){let _=e[n];i[0].label==_&&(c=n),i[i.length-1].label==_&&(l=n)}l-c+1==i.length?(this.from=i[0].id,this.to=i[i.length-1].id):(this.from=i[i.length-1].id,this.to=i[0].id)}},update_tags(){for(let i in this.data.tags)this.data.tags[i].id||(this.data.tags[i]={id:this.data.tags[i]})}},computed:{dvl(){return this.data.description.length},bvl(){return this.data.bibliographie.length},getfilteredparents(){let i=this.parents;return this.parent!=""&&(i=i.filter(e=>e.nom.toLowerCase().substring(0,this.parent.length)==this.parent.toLowerCase())),i},israng(){if(this.data.rang.id){let i=0;for(let c in this.rangs)this.rangs[c].id==this.data.rang.id&&(i=c);if(this.rangs[i].code=="regne")return!1;let e=this.data.rang.id-1;return this.get_parents(e),!0}return!1},iscomplete(){return this.data.nom&&this.data.rang.id&&this.data.bibliographie},issend(){return this.end},isalert(){return this.alert?"is-active":""}},watch:{tags:function(i){this.data.tags=[];for(let e in i)this.data.tags.push(i[e]);this.update_tags()}},async mounted(){if(this.rep=await this.get_thes(),this.rangs=this.rep["ref.rang"],this.$route.query.q){this.data=await this.get_taxon(this.$route.query.q),this.data.parent={parent:this.data.parent.nom?this.data.parent.nom:""},this.set_floraison();for(let e in this.data.tags){let c=this.data.tags[e];this.data.tags[e]={id:c.id}}let i=[];for(let e in this.data.tags){let c=this.data.tags[e];i.push(c.id)}this.tags=i}this.data_ready=!0}},K={key:0},G={key:0,class:"container large_form"},Q={class:"form_position"},W=t("h1",{class:"subtitle text_color"},"Insertion de données",-1),X=t("p",{class:"text_color"},"Les champs marqués d'un astérisque (*) sont obligatoires.",-1),Y={class:"box"},Z={class:"columns"},$={class:"column is-4"},tt={class:"field"},et=t("label",{class:"label"},"Nom*",-1),st={class:"control"},it={class:"column is-4"},nt={class:"field"},ot=t("label",{class:"label"},"Auteur",-1),lt={class:"control"},at={class:"column is-4"},dt={class:"field"},rt=t("label",{class:"label"},"Année",-1),ct={class:"control"},ut={class:"columns"},_t={class:"column is-12"},ht={class:"field"},pt=t("label",{class:"label"},"Publication",-1),mt={class:"control"},ft={class:"field"},vt=t("label",{class:"label"},"Description",-1),bt={class:"control"},gt={class:"field"},yt=t("label",{class:"label"},"Bibliographie*",-1),xt={class:"control"},Ct={class:"columns"},Vt={class:"column is-2"},kt={class:"field"},Ut=t("label",{class:"label"},"Rang*",-1),Nt={class:"control"},Lt={class:"select"},wt=t("option",{value:""},"Choisir ...",-1),St=["value"],Et={class:"column is-10"},Tt={key:0,class:"field"},At=t("label",{class:"label"},"Parent",-1),Mt={class:"control autocomplete"},Bt={class:"columns"},qt=t("div",{class:"column is-1"},[t("label",{class:"label"},"Synonymes")],-1),Dt={class:"column is-11"},It={class:"icon is-small"},Rt={class:"columns is-multiline"},jt={class:"columns"},Pt=t("div",{class:"column is-1"},[t("label",{class:"label"},"Vernaculaires")],-1),zt={class:"column is-11"},Ft={class:"icon is-small"},Ht={class:"columns is-multiline"},Jt={class:"columns is-multiline"},Ot=t("div",{class:"column is-12"},[t("label",{class:"label"},"Mots-clés")],-1),Kt={class:"column is-12"},Gt=t("p",{class:"subtitle is-6"},"Floraison",-1),Qt={class:"columns"},Wt={class:"column is-2"},Xt={class:"field is-horizontal"},Yt=t("div",{class:"field-label is-normal field_text"},[t("label",{class:"label"},"De")],-1),Zt={class:"field-body"},$t={class:"field"},te={class:"control"},ee={class:"select"},se=t("option",{value:""},"Choisir ...",-1),ie=["value"],ne={class:"column is-10"},oe={class:"field is-horizontal"},le=t("div",{class:"field-label is-normal field_text"},[t("label",{class:"label"},"à")],-1),ae={class:"field-body"},de={class:"field"},re={class:"control"},ce={class:"select"},ue=t("option",{value:""},"Choisir ...",-1),_e=["value"],he={class:"column"},pe=t("p",{class:"subtitle is-6"},"Couleur des fleurs",-1),me=["for"],fe=["value","name","id"],ve={class:"column"},be=t("p",{class:"subtitle is-6"},"Type biologique",-1),ge=["for"],ye=["value","name","id"],xe={class:"column"},Ce=t("p",{class:"subtitle is-6"},"Conservation / patrimonialité",-1),Ve=["for"],ke=["value","name","id"],Ue={class:"column"},Ne=t("p",{class:"subtitle is-6"},"Status IUCN à l'échelle mondiale",-1),Le=["for"],we=["value","name","id"],Se={class:"column"},Ee=t("p",{class:"subtitle is-6"},"Status IUCN à l'échelle européenne",-1),Te=["for"],Ae=["value","name","id"],Me={class:"column"},Be=t("p",{class:"subtitle is-6"},"Status IUCN à l'échelle régionale PACA",-1),qe=["for"],De=["value","name","id"],Ie=t("div",{class:"modal-background"},null,-1),Re={class:"modal-content"},je={class:"box"},Pe={key:0},ze=t("p",{class:"subtitle text_center"},"Taxon déjà existant",-1),Fe=t("p",null,"Le taxon que vous avez essayé d'insérer existe déja !",-1),He=[ze,Fe],Je={class:"form_position"},Oe={class:"buttons spaced_buttons"},Ke=t("i",null,null,-1),Ge={key:1,class:"container form_position"},Qe={class:"title"},We=["href"];function Xe(i,e,c,l,n,_){const v=C("font-awesome-icon"),d=C("Synonyme"),u=C("Vernaculaire");return n.data_ready?(o(),a("div",K,[_.issend?(o(),a("div",Ge,[t("h1",Qe,[g("Vous pouvez consulter "),t("a",{href:n.redirect},"votre donnée",8,We),g(" !")])])):(o(),a("div",G,[t("div",Q,[W,X,t("div",Y,[t("div",Z,[t("div",$,[t("div",tt,[et,t("div",st,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[0]||(e[0]=s=>n.data.nom=s)},null,512),[[b,n.data.nom]])])])]),t("div",it,[t("div",nt,[ot,t("div",lt,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[1]||(e[1]=s=>n.data.auteur=s)},null,512),[[b,n.data.auteur]])])])]),t("div",at,[t("div",dt,[rt,t("div",ct,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[2]||(e[2]=s=>n.data.annee=s)},null,512),[[b,n.data.annee]])])])])]),t("div",ut,[t("div",_t,[t("div",ht,[pt,t("div",mt,[h(t("input",{class:"input",type:"text","onUpdate:modelValue":e[3]||(e[3]=s=>n.data.publication=s)},null,512),[[b,n.data.publication]])])])])]),t("div",ft,[vt,t("div",bt,[t("span",null,"Nombre de caractères : "+p(_.dvl),1),h(t("textarea",{name:"description",class:"textarea","onUpdate:modelValue":e[4]||(e[4]=s=>n.data.description=s),onKeyup:e[5]||(e[5]=s=>{_.MaxLengthTextarea("description",400)}),placeholder:"Rentrer le texte en moins de 400 caractères."},null,544),[[b,n.data.description]])])]),t("div",gt,[yt,t("div",xt,[t("span",null,"Nombre de caractères : "+p(_.bvl),1),h(t("textarea",{name:"bibliographie",class:"textarea","onUpdate:modelValue":e[6]||(e[6]=s=>n.data.bibliographie=s),onKeyup:e[7]||(e[7]=s=>{_.MaxLengthTextarea("bibliographie",600)}),placeholder:"Rentrer le texte en moins de 600 caractères."},null,544),[[b,n.data.bibliographie]])])]),t("div",Ct,[t("div",Vt,[t("div",kt,[Ut,t("div",Nt,[t("div",Lt,[h(t("select",{name:"rang","onUpdate:modelValue":e[8]||(e[8]=s=>n.data.rang.id=s)},[wt,(o(!0),a(m,null,f(n.rangs,s=>(o(),a("option",{value:s.id},p(s.label),9,St))),256))],512),[[U,n.data.rang.id]])])])])]),t("div",Et,[_.israng&&n.parents?(o(),a("div",Tt,[At,t("div",Mt,[h(t("input",{class:"input",type:"text",id:"parent","onUpdate:modelValue":e[9]||(e[9]=s=>n.data.parent.parent=s)},null,512),[[b,n.data.parent.parent]])])])):V("",!0)])]),t("div",Bt,[qt,t("div",Dt,[t("button",{type:"button",onClick:e[10]||(e[10]=(...s)=>_.add_syn&&_.add_syn(...s)),class:"button is-small"},[t("span",It,[k(v,{icon:["fas","plus"]})])])])]),t("div",Rt,[(o(!0),a(m,null,f(n.data.synonymes,(s,r)=>(o(),L(d,{data:s,key:r,idx:r,onRemoveSyn:y=>_.remove_syn(r)},null,8,["data","idx","onRemoveSyn"]))),128))]),t("div",jt,[Pt,t("div",zt,[t("button",{type:"button",onClick:e[11]||(e[11]=(...s)=>_.add_ver&&_.add_ver(...s)),class:"button is-small"},[t("span",Ft,[k(v,{icon:["fas","plus"]})])])])]),t("div",Ht,[(o(!0),a(m,null,f(n.data.vernaculaires,(s,r)=>(o(),L(u,{data:s,key:r,idx:r,onRemoveVer:y=>_.remove_ver(r)},null,8,["data","idx","onRemoveVer"]))),128))]),t("div",Jt,[Ot,t("div",Kt,[Gt,t("div",Qt,[t("div",Wt,[t("div",Xt,[Yt,t("div",Zt,[t("div",$t,[t("div",te,[t("div",ee,[h(t("select",{name:"from","onUpdate:modelValue":e[12]||(e[12]=s=>n.from=s),onChange:e[13]||(e[13]=s=>_.fill_floraison())},[se,(o(!0),a(m,null,f(n.rep["ref.floraison"],s=>(o(),a("option",{value:s.id},p(s.label),9,ie))),256))],544),[[U,n.from]])])])])])])]),t("div",ne,[t("div",oe,[le,t("div",ae,[t("div",de,[t("div",re,[t("div",ce,[h(t("select",{name:"to","onUpdate:modelValue":e[14]||(e[14]=s=>n.to=s),onChange:e[15]||(e[15]=s=>_.fill_floraison())},[ue,(o(!0),a(m,null,f(n.rep["ref.floraison"],s=>(o(),a("option",{value:s.id},p(s.label),9,_e))),256))],544),[[U,n.to]])])])])])])])])]),t("div",he,[pe,(o(!0),a(m,null,f(this.rep["ref.couleur_fleur"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[16]||(e[16]=r=>n.tags=r)},null,8,fe),[[x,n.tags]]),g(" "+p(s.label),1)],8,me)]))),256))]),t("div",ve,[be,(o(!0),a(m,null,f(this.rep["ref.type_bio"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[17]||(e[17]=r=>n.tags=r)},null,8,ye),[[x,n.tags]]),g(" "+p(s.label),1)],8,ge)]))),256))]),t("div",xe,[Ce,(o(!0),a(m,null,f(this.rep["ref.conservation"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[18]||(e[18]=r=>n.tags=r)},null,8,ke),[[x,n.tags]]),g(" "+p(s.label),1)],8,Ve)]))),256))]),t("div",Ue,[Ne,(o(!0),a(m,null,f(this.rep["ref.iucn_monde"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[19]||(e[19]=r=>n.tags=r)},null,8,we),[[x,n.tags]]),g(" "+p(s.label),1)],8,Le)]))),256))]),t("div",Se,[Ee,(o(!0),a(m,null,f(this.rep["ref.iucn_europe"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[20]||(e[20]=r=>n.tags=r)},null,8,Ae),[[x,n.tags]]),g(" "+p(s.label),1)],8,Te)]))),256))]),t("div",Me,[Be,(o(!0),a(m,null,f(this.rep["ref.iucn_region"],s=>(o(),a("p",null,[t("label",{for:s.id},[h(t("input",{type:"checkbox",value:s.id,name:s.code,id:s.id,"onUpdate:modelValue":e[21]||(e[21]=r=>n.tags=r)},null,8,De),[[x,n.tags]]),g(" "+p(s.label),1)],8,qe)]))),256))])])]),t("div",{class:w(["modal",_.isalert])},[Ie,t("div",Re,[t("div",je,[n.alert=="duplicate"?(o(),a("div",Pe,He)):V("",!0),t("button",{id:"modal_button",class:"button is-primary",onClick:e[22]||(e[22]=s=>n.alert="")},"Accepter")])])],2),t("div",Je,[t("div",Oe,[Ke,_.iscomplete?(o(),a("button",{key:0,type:"button",class:"button",onClick:e[23]||(e[23]=s=>_.send_data())},"Envoyer")):V("",!0)])])])]))])):V("",!0)}const $e=N(O,[["render",Xe]]);export{$e as default};
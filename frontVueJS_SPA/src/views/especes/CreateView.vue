<script>

import Synonyme from '@/components/especes/create/synonyme.vue'
import Vernaculaire from '@/components/especes/create/vernaculaire.vue'

export default {
	name: 'taxonomie_form',
	components: {Synonyme, Vernaculaire},
	data () {
		return {
			rep: {},
			data: {
				nom: '',
				auteur: '',
				annee: '',
				description: '',
				publication: '',
				bibliographie: '',
				rang: {'id':''},
				parent: {'parent':''},
				tags: [],
				synonymes: [],
				vernaculaires: []
			},
			redirect: '',
			end: false,
			rangs: [],
			parents: [],
			from: '',
			to: '',
			tags: [],
			alert: '',
			data_ready: false
		}
	},
	methods: {
		async get_thes () {
			let response = await fetch(`${this.$url_prefix}/especes/get_thes`);
			return await response.json();
		},
		async get_taxon (id_taxon) {
			let response = await fetch(`${this.$url_prefix}/especes/get_taxon?q=${id_taxon}`);
			return await response.json();
		},
		get_parents (parent) {
			fetch(`${this.$url_prefix}/especes/get_parents?q=${parent}`).then(resp => {resp.json().then(data => {this.parents = data; this.autocomplete(document.getElementById("parent"),this.parents,this.data.parent);})})
		},
		send_data () {
			fetch(`${this.$url_prefix}/especes/cr_or_up_nomenclature`, {
				method: 'POST',
				headers: {
					'Content-Type':'application/json'
				},
				body: JSON.stringify(this.data)
			}).then(resp => { resp.text().then(data => {
				if (data=='duplicate') {
					this.alert = data;
				} else {
					this.redirect = data;
					this.end = true;
				}
			})});
		},
		MaxLengthTextarea(valuename, maxlength){
			if (this.data[valuename].length > maxlength) {
				this.data[valuename] = this.data[valuename].substring(0, maxlength);
				alert('Votre texte ne doit pas dépasser '+maxlength+' caractères!');
			}
		},
		add_syn () {
			this.data.synonymes.push({
				'synonyme':''
			});
		},
		remove_syn (idx) {
			this.data.synonymes.splice(idx,1);
		},
		add_ver () {
			this.data.vernaculaires.push({
				'vernaculaire':''
			});
		},
		remove_ver (idx) {
			this.data.vernaculaires.splice(idx,1);
		},
		autocomplete(inp, arr, parent) {
			if (arr.length==0) {
				inp.disabled = true;
				inp.placeholder = "PAS DE PARENTS POSSIBLES"
			} else {
				inp.disabled = false;
				inp.placeholder = ""
			}
			var currentFocus;
			inp.addEventListener("input", function(e) {
				var a, b, i, val = this.value;
				closeAllLists();
				if (!val) { return false;}
				currentFocus = -1;
				a = document.createElement("DIV");
				a.setAttribute("id", this.id + "autocomplete-list");
				a.setAttribute("class", "autocomplete-items");
				this.parentNode.appendChild(a);
				for (i = 0; i < arr.length; i++) {
					if (arr[i]['nom'].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
						b = document.createElement("DIV");
						b.innerHTML = "<strong>" + arr[i]['nom'].substr(0, val.length) + "</strong>";
						b.innerHTML += arr[i]['nom'].substr(val.length);
						b.innerHTML += "<input type='hidden' value='" + arr[i]['nom'] + "'>";
						b.addEventListener("click", function(e) {
							inp.value = this.getElementsByTagName("input")[0].value;
							parent['parent'] = this.getElementsByTagName("input")[0].value;
							closeAllLists();
						});
						a.appendChild(b);
					}
				}
				if (a.children.length==0 && inp.value.length!=0) {
					inp.className = "input is-danger";
					b = document.createElement("DIV");
					b.innerHTML = "<strong>Ce parent n'existe pas ou l'ortographe est éronnée</strong>";
					a.appendChild(b);
				} else {
					inp.className = "input";
				}
			});
			inp.addEventListener("keydown", function(e) {
				var x = document.getElementById(this.id + "autocomplete-list");
				if (x) x = x.getElementsByTagName("div");
				if (e.keyCode == 40) {
					currentFocus++;
					addActive(x);
				} else if (e.keyCode == 38) {
					currentFocus--;
					addActive(x);
				} else if (e.keyCode == 13) {
					e.preventDefault();
					if (currentFocus > -1) {
						if (x) x[currentFocus].click();
					}
				}
			});
			function addActive(x) {
				if (!x) return false;
				removeActive(x);
				if (currentFocus >= x.length) currentFocus = 0;
				if (currentFocus < 0) currentFocus = (x.length - 1);
				x[currentFocus].classList.add("autocomplete-active");
			}
			function removeActive(x) {
				for (var i = 0; i < x.length; i++) {
					x[i].classList.remove("autocomplete-active");
				}
			}
			function closeAllLists(elmnt) {
				var x = document.getElementsByClassName("autocomplete-items");
				for (var i = 0; i < x.length; i++) {
					if (elmnt != x[i] && elmnt != inp) {
						x[i].parentNode.removeChild(x[i]);
					}
				}
			}
			document.addEventListener("click", function (e) {
				closeAllLists(e.target);
			});
		},
		fill_floraison () {
			let floraisons = [];
			for (let idx in this.rep['ref.floraison']) {
				floraisons.push(this.rep['ref.floraison'][idx].id);
			}
			this.data.tags = this.data.tags.filter(e => {
				for (let idx in floraisons) {
					let idf = floraisons[idx];
					if (idf==e.id) {
						return false;
					}
				}
				return true;
			});
			if (this.from && this.to) {
				if (this.from <= this.to) {
					for (let i = this.from; i <= this.to; i++) {
						this.data.tags.push({'id':i});
					}
				} else {
					let last = floraisons[floraisons.length-1];
					for (let i = this.from; i <= last; i++) {
						this.data.tags.push({'id':i});
					}
					let first = floraisons[0];
					for (let i = first; i <= this.to; i++) {
						this.data.tags.push({'id':i});
					}
				}
			}
		},
		set_floraison () {
			let floraisons = [];
			let months = ['Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];
			for (let idx in this.data.tags) {
				let tag = this.data.tags[idx];
				if (tag.reference=='ref.floraison') {
					floraisons.push(tag);
				}
			}
			if (floraisons.length!=0) {
				let first = 0;
				let second = 0;
				for (let idx in months) {
					let month = months[idx];
					if (floraisons[0].label==month) {
						first = idx;
					}
					if (floraisons[floraisons.length-1].label==month) {
						second = idx;
					}
				}
				if (second-first+1==floraisons.length) {
					this.from = floraisons[0].id;
					this.to = floraisons[floraisons.length-1].id;
				} else {
					this.from = floraisons[floraisons.length-1].id;
					this.to = floraisons[0].id;
				}
			}
		},
		update_tags () {
			for (let idx_tag in this.data.tags) {
				let tag = this.data.tags[idx_tag];
				if (!tag['id']) {
					this.data.tags[idx_tag] = {'id':this.data.tags[idx_tag]};
				}
			}
		}
	},
	computed: {
		dvl () {return this.data.description.length},
		bvl () {return this.data.bibliographie.length},
		getfilteredparents () {
			let filtered_parents = this.parents;

			if (this.parent!='') {
				filtered_parents = filtered_parents.filter(e => {return e.nom.toLowerCase().substring(0, this.parent.length) == this.parent.toLowerCase()});
			}

			return filtered_parents;
		},
		israng () {
			if (this.data.rang.id) {
				let current = 0;
				for (let idx in this.rangs) {
					if (this.rangs[idx]['id']==this.data.rang.id) {
						current = idx;
					}
				}
				if (this.rangs[current]['code']=='regne') {
					return false;
				}
				let parent = this.data.rang.id-1;
				this.get_parents(parent);
				return true;
			}
			return false;
		},
		iscomplete () {
			return this.data.nom && this.data.rang.id && this.data.bibliographie;
		},
		issend () {
			return this.end;
		},
		isalert () {
			return this.alert ? 'is-active' : '';
		}
	},
	watch: {
		tags: function (val) {
			this.data.tags = [];
			for (let idx in val) {
				this.data.tags.push(val[idx]);
			}
			this.update_tags();
		}
	},
	async mounted () {
		this.rep = await this.get_thes();
		this.rangs = this.rep['ref.rang'];
		if (this.$route.query.q) {
			this.data = await this.get_taxon(this.$route.query.q);
			this.data.parent = {'parent':this.data.parent.nom ? this.data.parent.nom:''};
			this.set_floraison();
			for (let idx in this.data.tags) {
				let tag = this.data.tags[idx];
				this.data.tags[idx] = {'id':tag.id};
			}
			let new_array = [];
			for (let idx in this.data.tags) {
				let tag = this.data.tags[idx];
				new_array.push(tag['id']);
			}
			this.tags = new_array;
		}
		this.data_ready = true;
	}
}

</script>

<template>
	<div v-if="data_ready">
		<div v-if="!issend" class="container large_form">
			<div class="form_position">
				<h1 class="subtitle text_color">Insertion de données</h1>
				<p class="text_color">Les champs marqués d'un astérisque (*) sont obligatoires.</p>
				<div class="box">
					<div class="columns">
						<div class="column is-4">
							<div class="field">
								<label class="label">Nom*</label>
								<div class="control">
									<input class="input" type="text" v-model="data.nom">
								</div>
							</div>
						</div>
						<div class="column is-4">
							<div class="field">
								<label class="label">Auteur</label>
								<div class="control">
									<input class="input" type="text" v-model="data.auteur">
								</div>
							</div>
						</div>
						<div class="column is-4">
							<div class="field">
								<label class="label">Année</label>
								<div class="control">
									<input class="input" type="text" v-model="data.annee">
								</div>
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column is-12">
							<div class="field">
								<label class="label">Publication</label>
								<div class="control">
									<input class="input" type="text" v-model="data.publication">
								</div>
							</div>
						</div>
					</div>
					<div class="field">
						<label class="label">Description</label>
						<div class="control">
							<span>Nombre de caractères : {{dvl}}</span>
							<textarea name="description" class="textarea" v-model="data.description" @keyup="MaxLengthTextarea('description', 400);" placeholder="Rentrer le texte en moins de 400 caractères."></textarea>
						</div>
					</div>
					<div class="field">
						<label class="label">Bibliographie*</label>
						<div class="control">
							<span>Nombre de caractères : {{bvl}}</span>
							<textarea name="bibliographie" class="textarea" v-model="data.bibliographie" @keyup="MaxLengthTextarea('bibliographie', 600);" placeholder="Rentrer le texte en moins de 600 caractères."></textarea>
						</div>
					</div>
					<div class="columns">
						<div class="column is-2">
							<div class="field">
								<label class="label">Rang*</label>
								<div class="control">
									<div class="select">
										<select name="rang" v-model="data.rang['id']">
											<option value="">Choisir ...</option>
											<option v-for="rang in rangs" :value="rang['id']">{{rang['label']}}</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div class="column is-10">
							<div class="field" v-if="israng && parents">
								<label class="label">Parent</label>
								<div class="control autocomplete">
									<input class="input" type="text" id="parent" v-model="data.parent['parent']">
								</div>
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column is-1">
							<label class="label">Synonymes</label>
						</div>
						<div class="column is-11">
							<button type="button" @click="add_syn" class="button is-small"><span class="icon is-small">
								<font-awesome-icon :icon="['fas', 'plus']" />
							</span></button>
						</div>
					</div>
					<div class="columns is-multiline">
						<Synonyme v-for="(synonyme, idx) in data.synonymes" :data="synonyme" :key="idx" :idx="idx" @remove-syn="remove_syn(idx)"/>
					</div>
					<div class="columns">
						<div class="column is-1">
							<label class="label">Vernaculaires</label>
						</div>
						<div class="column is-11">
							<button type="button" @click="add_ver" class="button is-small"><span class="icon is-small">
								<font-awesome-icon :icon="['fas', 'plus']" />
							</span></button>
						</div>
					</div>
					<div class="columns is-multiline">
						<Vernaculaire v-for="(vernaculaire, idx) in data.vernaculaires" :data="vernaculaire" :key="idx" :idx="idx" @remove-ver="remove_ver(idx)"/>
					</div>
					<div class="columns is-multiline">
						<div class="column is-12">
							<label class="label">Mots-clés</label>
						</div>
						<div class="column is-12">
							<p class="subtitle is-6">Floraison</p>
							<div class="columns">
								<div class="column is-2">
									<div class="field is-horizontal">
										<div class="field-label is-normal field_text">
											<label class="label">De</label>
										</div>
										<div class="field-body">
											<div class="field">
												<div class="control">
													<div class="select">
														<select name="from" v-model="from" @change="fill_floraison()">
															<option value="">Choisir ...</option>
															<option v-for="floraison in rep['ref.floraison']" :value="floraison['id']">{{floraison['label']}}</option>
														</select>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="column is-10">
									<div class="field is-horizontal">
										<div class="field-label is-normal field_text">
											<label class="label">à</label>
										</div>
										<div class="field-body">
											<div class="field">
												<div class="control">
													<div class="select">
														<select name="to" v-model="to" @change="fill_floraison()">
															<option value="">Choisir ...</option>
															<option v-for="floraison in rep['ref.floraison']" :value="floraison['id']">{{floraison['label']}}</option>
														</select>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="column">
							<p class="subtitle is-6">Couleur des fleurs</p>
							<p v-for="couleur in this.rep['ref.couleur_fleur']">
								<label :for="couleur['id']">
									<input type="checkbox" :value="couleur['id']" :name="couleur['code']" :id="couleur['id']" v-model="tags">
									{{couleur.label}}
								</label>
							</p>
						</div>
						<div class="column">
							<p class="subtitle is-6">Type biologique</p>
							<p v-for="type in this.rep['ref.type_bio']">
								<label :for="type['id']">
									<input type="checkbox" :value="type['id']" :name="type['code']" :id="type['id']" v-model="tags">
									{{type.label}}
								</label>
							</p>
						</div>
						<div class="column">
							<p class="subtitle is-6">Conservation / patrimonialité</p>
							<p v-for="conservation in this.rep['ref.conservation']">
								<label :for="conservation['id']">
									<input type="checkbox" :value="conservation['id']" :name="conservation['code']" :id="conservation['id']" v-model="tags">
									{{conservation.label}}
								</label>
							</p>
						</div>
						<div class="column">
							<p class="subtitle is-6">Status IUCN à l'échelle mondiale</p>
							<p v-for="monde in this.rep['ref.iucn_monde']">
								<label :for="monde['id']">
									<input type="checkbox" :value="monde['id']" :name="monde['code']" :id="monde['id']" v-model="tags">
									{{monde.label}}
								</label>
							</p>
						</div>
						<div class="column">
							<p class="subtitle is-6">Status IUCN à l'échelle européenne</p>
							<p v-for="europe in this.rep['ref.iucn_europe']">
								<label :for="europe['id']">
									<input type="checkbox" :value="europe['id']" :name="europe['code']" :id="europe['id']" v-model="tags">
									{{europe.label}}
								</label>
							</p>
						</div>
						<div class="column">
							<p class="subtitle is-6">Status IUCN à l'échelle régionale PACA</p>
							<p v-for="region in this.rep['ref.iucn_region']">
								<label :for="region['id']">
									<input type="checkbox" :value="region['id']" :name="region['code']" :id="region['id']" v-model="tags">
									{{region.label}}
								</label>
							</p>
						</div>
					</div>
				</div>
				<div class="modal" :class="isalert">
				  <div class="modal-background"></div>
				  <div class="modal-content">
				    <div class="box">
				    	<div v-if="alert=='duplicate'">
				    		<p class="subtitle text_center" >Taxon déjà existant</p>
				    		<p>Le taxon que vous avez essayé d'insérer existe déja !</p>
				    	</div>
				    	<button id="modal_button" class="button is-primary" @click="alert=''">Accepter</button>
				    </div>
				  </div>
				</div>
				<div class="form_position">
					<div class="buttons spaced_buttons">
						<i></i>
						<button v-if="iscomplete" type="button" class="button" @click="send_data()">Envoyer</button>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="container form_position">
			<h1 class="title">Vous pouvez consulter <RouterLink :to="redirect">votre donnée</RouterLink> !</h1>
		</div>
	</div>
</template>
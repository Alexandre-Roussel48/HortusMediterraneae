<script>

import Specimen from '@/components/especes/search/specimen.vue'
import CLink from '@/components/especes/search/clink.vue'

export default {
	name: 'especes_consult',
	components: {Specimen, CLink},
	data () {
		return {
			data: {},
			tags: {
				'conservation': [],
				'iucn_monde': [],
				'iucn_europe': [],
				'iucn_region': [],
				'floraison': [],
				'type_bio': [],
				'couleur_fleur': []
			},
			from: '',
			to: '',
			specimens: [],
			current_specimen: '',
			data_ready: false
		}
	},
	methods: {
		async get_taxon () {
			let response = await fetch(`${this.$url_prefix}/especes/get_taxon?q=${this.$route.params.id}`);
			return await response.json();
		},
		async get_specimens () {
			let response = await fetch(`${this.$url_prefix}/especes/get_specimens?q=${this.$route.params.id}`);
			return await response.json();
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
					this.from = floraisons[0].label;
					this.to = floraisons[floraisons.length-1].label;
				} else {
					this.from = floraisons[floraisons.length-1].label;
					this.to = floraisons[0].label;
				}
			}
		},
		get_parents () {
			let parents = [];
			let current = this.data;
			while (current.parent.parent != '') {
				parents.push([`/especes/${current.parent.id}`,current.parent.nom])
				current = current.parent;
			}
			parents.push([`/especes/${current.parent.id}`,current.parent.nom])
			return parents;
		},
		set_tags () {
			for (let idx in this.data.tags) {
				let tag = this.data.tags[idx];
				this.tags[tag.reference.slice(4)].push(tag);
			}
		},
		change_specimen (direction) {
			if (direction=='left') {
				this.current_specimen = this.current_specimen==0 ? this.specimens.length-1 : this.current_specimen-1;
			} else {
				this.current_specimen = this.current_specimen==this.specimens.length-1 ? 0 : this.current_specimen+1;
			}
		},
		async delete_taxon () {
			await fetch(`${this.$url_prefix}/especes/delete?q=${this.data.id}`)
			.then(resp => {
				if (resp = 'deleted') {
					this.$router.push('/especes/search');
				}
			});
		}
	},
	computed: {

	},
	async mounted () {
		this.data = await this.get_taxon();
		this.specimens = await this.get_specimens();
		if (this.specimens.length!=0) {
			this.current_specimen = 0;
		}
		this.set_floraison();
		this.set_tags();
		this.data_ready = true;
	}
}

</script>

<template>
	<div v-if="data_ready">
		<div class="container larger_form bottom_120">
			<div class="form_position">
				<div class="box">
					<div class="columns">
						<div class="column is-7">
							<div class="columns is-multiline text_break">
								<div class="column is-10">
									<p class="title is-3 jasmine"><i>{{data.nom}}</i> {{data.auteur}}, {{data.annee}}</p>
									<p>
										<span v-if="data.parent">
											<small>Classification : </small>
											<small v-for="item, idx in get_parents().reverse()">
												<span v-if="get_parents().length > 1 && idx > 0"> &lt; </span>
												<CLink :link="item[0]" :nom="item[1]"/>
											</small>
										</span>
									</p>
									<p>
										<span v-if="data.publication">
											<small>Publication : </small>
											<small><div v-html="md(data.publication)"></div></small>
										</span>
									</p>
								</div>
								<div class="column is-2">
									<button class="button ghost_button">{{data.rang.label}}</button>
									<div class="field has-addons">
										<p class="control">
											<RouterLink :to="'/especes/create?q='+data.id" class="button">
												<span class="icon">
													<font-awesome-icon :icon="['fas', 'pen']" />
												</span>
											</RouterLink>
										</p>
										<p class="control">
											<a @click="delete_taxon()" class="button">
												<span class="icon">
													<font-awesome-icon :icon="['fas', 'trash']" />
												</span>
											</a>
										</p>
									</div>
								</div>
								<div class="column is-half" v-if="data.synonymes.length!=0">
									<p class="subtitle is-6">Synonymes courants :</p>
									<p class="subtitle is-6">
										<span v-for="(synonyme, idx) in data.synonymes">
											<span v-if="idx!=data.synonymes.length-1">{{synonyme.synonyme}}, </span>
											<span v-else>{{synonyme.synonyme}}</span>
										</span>
									</p>
								</div>
								<div class="column is-half" v-if="data.vernaculaires.length!=0">
									<p class="subtitle is-6">Noms vernaculaires :</p>
									<p class="subtitle is-6">
										<span v-for="(vernaculaire, idx) in data.vernaculaires">
											<span v-if="idx!=data.vernaculaires.length-1">{{vernaculaire.vernaculaire}}, </span>
											<span v-else>{{vernaculaire.vernaculaire}}</span>
										</span>
									</p>
								</div>
								<div class="column is-12">
									<div v-html="md(data.description)" class="box"></div>
								</div>
								<div class="column is-12">
									<p class="subtitle is-6"><b>Bibliographie :</b></p>
									<div v-html="md(data.bibliographie)"></div>
								</div>
								<div class="column is-6" v-if="tags.conservation.length!=0 || tags.iucn_monde.length!=0 || tags.iucn_europe.length!=0 || tags.iucn_region.length!=0">
									<p class="subtitle is-6"><b>Conservation :</b></p>
									<p class="subtitle is-6">
										<span v-for="tag in data.tags">
											<p v-if="tag.reference=='ref.conservation'">&nbsp;{{tag.label}}</p>
										</span>
									</p>
									<p class="subtitle is-6" v-if="tags.iucn_monde.length!=0 || tags.iucn_europe.length!=0 || tags.iucn_region.length!=0"><b>&nbsp;Status IUCN :</b></p>
									<div class="columns is-multiline">
										<div class="column is-6" v-if="tags.iucn_monde.length!=0">
											<p class="subtitle is-6"><b>&nbsp;&nbsp;Mondial :</b></p>
											<p class="subtitle is-6">
												<span v-for="tag in data.tags">
													<p v-if="tag.reference=='ref.iucn_monde'">&nbsp;&nbsp;&nbsp;{{tag.label}}</p>
												</span>
											</p>
										</div>
										<div class="column is-6" v-if="tags.iucn_europe.length!=0">
											<p class="subtitle is-6"><b>&nbsp;&nbsp;Européen :</b></p>
											<p class="subtitle is-6">
												<span v-for="tag in data.tags">
													<p v-if="tag.reference=='ref.iucn_europe'">&nbsp;&nbsp;&nbsp;{{tag.label}}</p>
												</span>
											</p>
										</div>
										<div class="column is-6" v-if="tags.iucn_region.length!=0">
											<p class="subtitle is-6"><b>&nbsp;&nbsp;Régional :</b></p>
											<p class="subtitle is-6">
												<span v-for="tag in data.tags">
													<p v-if="tag.reference=='ref.iucn_region'">&nbsp;&nbsp;&nbsp;{{tag.label}}</p>
												</span>
											</p>
										</div>
									</div>
								</div>
								<div class="column is-6" v-if="tags.floraison.length!=0 || tags.type_bio.length!=0 || tags.couleur_fleur.length!=0">
									<p class="subtitle is-6"><b>Biologie :</b></p>
									<p class="subtitle is-6" v-if="tags.floraison.length!=0">
										<b>&nbsp;Floraison : </b>
										De {{from}} à {{to}}
									</p>
									<p class="subtitle is-6" v-if="tags.type_bio.length!=0">
										<b>&nbsp;Type biologique : </b>
										<span v-for="tag in data.tags">
											<span v-if="tag.reference=='ref.type_bio'">{{tag.label}}, </span>
										</span>
									</p>
									<p class="subtitle is-6" v-if="tags.couleur_fleur.length!=0">
										<b>&nbsp;Couleur des fleurs : </b>
										<span v-for="tag in data.tags">
											<span v-if="tag.reference=='ref.couleur_fleur'">{{tag.label}}, </span>
										</span>
									</p>
								</div>
							</div>
						</div>
						<div class="column is-5">
							<div class="columns is-multiline">
								<div class="column is-12 text_center">
									<RouterLink :to="'/especes/'+data.id+'/create'" class="button">Insérer un specimen</RouterLink>
								</div>
								<div class="column is-12" style="height: 500px;" v-if="specimens.length!=0">
									<div class="box" >
										<Specimen :specimen="specimens[current_specimen]"/>
									</div>
								</div>
								<div class="column is-12" v-if="specimens.length!=0">
									<div class="buttons spaced_buttons">
										<button class="button" @click="change_specimen('left')">Précédent</button>
										<button class="button" @click="change_specimen('right')">Suivant</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
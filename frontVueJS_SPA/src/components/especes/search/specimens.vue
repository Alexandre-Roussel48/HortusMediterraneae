<script>

export default {
	name: 'specimens',
	props: ['key', 'parcelle', 'tags', 'rangs'],
	data () {
		return {
			rep: [],
			specimens: [],
			pertinence: [],
			specimens_ready: false
		}
	},
	methods: {
		async get_specimens () {
			let query_string = '';
			for (let idx_parcelle in this.parcelle) {
				query_string+= `&parcelle=${this.parcelle[idx_parcelle]}`;
			}
			for (let idx_tag in this.tags) {
				query_string+= `&tag=${this.tags[idx_tag]}`;
			}
			for (let idx_rang in this.rangs) {
				query_string+= `&rang=${this.rangs[idx_rang]}`;
			}
			query_string = query_string.replace('&', '');
			let response = await fetch(`${this.$url_prefix}/especes/specimen/results?${query_string}`);
			return await response.json();
		},
		cut_historique (historique) {
			let new_string = historique.substring(0, 48);
			if (new_string==historique) {
				return historique;
			}
			return new_string + '...';
		},
		has_tags (specimen) {
			for (let idx in specimen.taxonomie.tags) {
				let tag = specimen.taxonomie.tags[idx];
				if (tag.reference!='ref.floraison') {
					return true;
				}
			}
			return false;
		},
		async delete_specimen (specimen) {
			await fetch(`${this.$url_prefix}/especes/specimen/delete?q=${specimen.id}`);
			this.$emit('update');
		}
	},
	computed: {
		is_empty () {
			if (this.specimens.length==0) {
				return true;
			}
			return false;
		}
	},
	async mounted () {
		this.rep = await this.get_specimens();
		for (let specimen_pertinence in this.rep) {
			this.specimens.push(this.rep[specimen_pertinence][0]);
			this.pertinence.push(this.rep[specimen_pertinence][1]);
		}
		this.specimens_ready = true;
	}
}

</script>

<template>
	<div v-if="specimens_ready">
		<div class="container">
			<p class="subtitle is-6" v-if="!is_empty">Specimens :</p>
			<p class="subtitle is-6" v-if="!is_empty">{{specimens.length}} résultat(s)</p>
			<div class="box text_break" v-for="specimen in this.specimens">
				<div class="columns is-vcentered is-gapless is-multiline">
					<div class="column is-9">
						<a :href="'/especes/'+specimen.taxonomie.id"><i>{{specimen.taxonomie.nom}}</i> {{specimen.taxonomie.auteur}}, {{specimen.taxonomie.annee}}</a>
						<p>
							<small v-if="specimen.herbier">Part d'herbier : {{specimen.herbier}}&nbsp;&nbsp;&nbsp;&nbsp;</small>
							<small>Indigénat : {{specimen.indigenat.label}}</small>
						</p>
					</div>
					<div class="column is-3">
						<button class="button ghost_button">{{specimen.parcelle.label}}</button>
						<div class="field has-addons">
							<p class="control">
								<a :href="'/especes/'+specimen.taxonomie.id+'/create?q='+specimen.id" class="button"><span class="icon">
									<font-awesome-icon :icon="['fas', 'pen']" />
								</span></a>
							</p>
							<p class="control">
								<a @click="delete_specimen(specimen)" class="button"><span class="icon">
									<font-awesome-icon :icon="['fas', 'trash']" />
								</span></a>
							</p>
						</div>
					</div>
					<div class="column is-12">
						<div v-html="md(this.cut_historique(specimen.historique))"></div>
					</div>
					<div class="column is-12">
						<small v-if="has_tags(specimen)">Mots-clés :</small>
						<span>
							<small v-for="tag in specimen.taxonomie.tags">
								<span class="icon-text" v-if="tag.reference!='ref.floraison'">
									<span class="icon">
										<font-awesome-icon :icon="['fas', 'check']" />
									</span>
									<span>{{tag.label}}&nbsp;&nbsp;</span>
								</span>
							</small>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
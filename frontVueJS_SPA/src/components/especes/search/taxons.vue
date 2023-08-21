<script>

export default {
	name: 'taxons',
	props: ['key', 'query', 'rangs'],
	data () {
		return {
			rep: [],
			taxons: [],
			pertinence: [],
			taxons_ready: false
		}
	},
	methods: {
		async get_taxons () {
			let query_string = '';
			for (let tag in this.query) {
				query_string+= `&tag=${this.query[tag]}`;
			}
			for (let rang in this.rangs) {
				query_string+= `&rang=${this.rangs[rang]}`;
			}
			query_string = query_string.replace('&', '');
			let response = await fetch(`${this.$url_prefix}/especes/results?${query_string}`);
			return await response.json();
		},
		get_parents (taxon) {
			let parents = '';
			let current = taxon;
			while (current.parent.parent != '') {
				parents = ` > <a href="/especes/${current.parent.id}">` + current.parent.nom + `</a>` + parents;
				current = current.parent;
			}
			parents = `<a href="/especes/${current.parent.id}">` + current.parent.nom + `</a>` + parents;
			return parents;
		}
	},
	computed: {
		is_empty () {
			if (this.taxons.length==0) {
				return true;
			}
			return false;
		}
	},
	async mounted () {
		this.rep = await this.get_taxons();
		for (let taxon_pertinence in this.rep) {
			this.taxons.push(this.rep[taxon_pertinence][0]);
			this.pertinence.push(this.rep[taxon_pertinence][1]);
		}
		this.taxons_ready = true;
	}
}

</script>

<template>
	<div v-if="taxons_ready">
		<div class="container">
			<p class="subtitle is-6" v-if="!is_empty">Taxons :</p>
			<div class="box" v-for="taxon in this.taxons">
				<div class="columns is-vcentered is-gapless is-multiline">
					<div class="column is-10">
						<a :href="'/especes/'+taxon.id"><i>{{taxon.nom}}</i> {{taxon.auteur}}, {{taxon.annee}}</a>
					</div>
					<div class="column is-2">
						<button class="button ghost_button">{{taxon.rang.label}}</button>
					</div>
					<div class="column is-12">
						<span v-if="taxon.parent">
							<small>Classification : </small>
							<small v-html="get_parents(taxon)"></small>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
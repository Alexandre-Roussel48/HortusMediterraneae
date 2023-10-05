<script>

import CLink from '@/components/especes/search/clink.vue'

export default {
	name: 'taxons',
	components: {CLink},
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
			let parents = [];
			let current = taxon;
			while (current.parent.parent != '') {
				parents.push([`/especes/${current.parent.id}`,current.parent.nom])
				current = current.parent;
			}
			parents.push([`/especes/${current.parent.id}`,current.parent.nom])
			return parents;
		},
		cut_description (description) {
			let new_string = description.substring(0, 48);
			if (new_string==description) {
				return description;
			}
			return new_string  + '...';
		},
		has_tags (taxon) {
			for (let idx in taxon.tags) {
				let tag = taxon.tags[idx];
				if (tag.reference!='ref.floraison') {
					return true;
				}
			}
			return false;
		},
		async delete_taxon (taxon) {
			await fetch(`${this.$url_prefix}/especes/delete?q=${taxon.id}`);
			this.$emit('update');
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
			<p class="subtitle is-6" v-if="!is_empty">{{taxons.length}} résultat(s)</p>
			<div class="box text_break" v-for="taxon in this.taxons">
				<div class="columns is-vcentered is-gapless is-multiline">
					<div class="column is-9">
						<RouterLink :to="'/especes/'+taxon.id"><i>{{taxon.nom}}</i> {{taxon.auteur}}, {{taxon.annee}}</RouterLink>
					</div>
					<div class="column is-3">
						<button class="button ghost_button">{{taxon.rang.label}}</button>
						<div class="field has-addons">
							<p class="control">
								<RouterLink :to="'/especes/create?q='+taxon.id" class="button"><span class="icon">
									<font-awesome-icon :icon="['fas', 'pen']" />
								</span></RouterLink>
							</p>
							<p class="control">
								<a @click="delete_taxon(taxon)" class="button"><span class="icon">
									<font-awesome-icon :icon="['fas', 'trash']" />
								</span></a>
							</p>
						</div>
					</div>
					<div class="column is-12">
						<span v-if="taxon.parent">
							<small>Classification : </small>
							<small v-for="item, idx in get_parents(taxon).reverse()">
								<span v-if="get_parents(taxon).length > 1 && idx > 0"> &lt; </span>
								<CLink :link="item[0]" :nom="item[1]"/>
							</small>
						</span>
					</div>
					<div class="column is-12">
						<div v-html="md(this.cut_description(taxon.description))"></div>
					</div>
					<div class="column is-12">
						<small v-if="has_tags(taxon)">Mots-clés :</small>
						<span>
							<small v-for="tag in taxon.tags">
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
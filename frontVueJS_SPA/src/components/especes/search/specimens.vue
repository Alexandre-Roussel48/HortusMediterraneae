<script>

export default {
	name: 'specimens',
	props: ['key', 'query'],
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
			for (let tag in this.query) {
				query_string+= `&tag=${this.query[tag]}`;
			}
			query_string = query_string.replace('&', '');
			let response = await fetch(`${this.$url_prefix}/especes/specimen/results?${query_string}`);
			return await response.json();
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
		</div>
	</div>
</template>
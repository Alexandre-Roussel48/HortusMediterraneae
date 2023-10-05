<script>

export default {
	name: 'specimen',
	props: ['specimen'],
	data () {
		return {
			current_media: ''
		}
	},
	methods: {
		get_url (media) {
			return `${this.$url_prefix}/` + media.url;
		},
		change_media (direction) {
			if (direction=='left') {
				this.current_media = this.current_media==0 ? this.specimen.medias.length-1 : this.current_media-1;
			} else {
				this.current_media = this.current_media==this.specimen.medias.length-1 ? 0 : this.current_media+1;
			}
		},
		async delete_specimen () {
			await fetch(`${this.$url_prefix}/especes/specimen/delete?q=${this.specimen.id}`)
			.then(resp => {
				if (resp = 'deleted') {
					this.$router.push(`/especes/${this.specimen.taxonomie.id}`);
				}
			});
		}
	},
	mounted () {
		if (this.specimen.medias.length!=0) {
			this.current_media = 0;
		}
	}
}

</script>

<template>
	<div class="scrollable_content">
		<div class="columns is-gapless is-vcentered">
			<div class="column is-9">
				<p>
					<small v-if="specimen.herbier">Part d'herbier : {{specimen.herbier}}&nbsp;&nbsp;&nbsp;&nbsp;</small>
					<small>Indigénat : {{specimen.indigenat.label}}</small>
				</p>
			</div>
			<div class="column is-3">
				<button class="button ghost_button">{{specimen.parcelle.label}}</button>
				<div class="field has-addons">
					<p class="control">
						<RouterLink :to="'/especes/'+specimen.taxonomie.id+'/create?q='+specimen.id" class="button"><span class="icon">
							<font-awesome-icon :icon="['fas', 'pen']" />
						</span></RouterLink>
					</p>
					<p class="control">
						<a @click="delete_specimen()" class="button"><span class="icon">
							<font-awesome-icon :icon="['fas', 'trash']" />
						</span></a>
					</p>
				</div>
			</div>
		</div>
		<div class="columns is-vcentered" v-if="specimen.medias[current_media]">
			<div class="column is-1">
				<button class="button" @click="change_media('left')">
					<span class="icon">
						<font-awesome-icon :icon="['fas', 'caret-left']" />
					</span>
				</button>
			</div>
			<div class="column is-10">
				<video v-if="specimen.medias[current_media].type_media.code=='video'" controls class="embeb_position" >
					<source :src="get_url(specimen.medias[current_media])">
					Votre navigateur ne supporte pas cette extension.
				</video>
				<audio v-else-if="specimen.medias[current_media].type_media=='bandeson'" controls class="embeb_position">
					<source :src="get_url(specimen.medias[current_media])">
					Votre navigateur ne supporte pas cette extension.
				</audio>
				<embed v-else :src="get_url(specimen.medias[current_media])" class="embeb_position">
			</div>
			<div class="column is-1">
				<button class="button" @click="change_media('right')">
					<span class="icon">
						<font-awesome-icon :icon="['fas', 'caret-right']" />
					</span>
				</button>
			</div>
		</div>
		<div class="columns">
			<div class="column is-12">
				<div v-html="md(specimen.historique)"></div>
			</div>
		</div>
	</div>
</template>
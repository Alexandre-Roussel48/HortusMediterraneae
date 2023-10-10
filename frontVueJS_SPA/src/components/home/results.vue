<script>

export default {
	name: 'home_results',
	props: ['key', 'query'],
	data () {
		return {
			medias: [],
			taxons: [],
			specimens: [],
			anims: [],
			data_ready: false
		}
	},
	methods: {
		async get_medias () {
			let response = await fetch(`${this.$url_prefix}/medias/searchs?q=${this.query}`);
			return await response.json();
		},
		async get_taxons () {
			let response = await fetch(`${this.$url_prefix}/especes/searchs?q=${this.query}`);
			return await response.json();
		},
		async get_specimens () {
			let response = await fetch(`${this.$url_prefix}/especes/specimen/searchs?q=${this.query}`);
			return await response.json();
		},
		async get_animations () {
			let response = await fetch(`${this.$url_prefix}/pedagogie/searchs?q=${this.query}`);
			return await response.json();
		},
		toggle_media (media) {
			if (media.open=='') {
				media.open = 'is-active';
			} else {
				media.open = '';
			}
		},
		get_url (media) {
			return `${this.$url_prefix}/` + media.url;
		},
		download_media (media) {
			fetch(`${this.$url_prefix}/medias/download?q=${media.id}`)
			.then(response => response.blob())
			.then(blob => URL.createObjectURL(blob))
			.then(uril => {
				var link = document.createElement("a");
				link.href = uril;
				link.download = media.nom + media.url.substring(media.url.indexOf("."));
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			});
		},
		cut_text (text) {
			let new_string = text.substring(0, 48);
			if (new_string==text) {
				return text;
			}
			return new_string  + '...';
		},
	},
	computed: {
		has_results () {
			return this.medias.length != 0 || this.taxons.length!=0 || this.specimens.length!=0 || this.anims.length!=0;
		}
	},
	async mounted () {
		if (this.query) {
			this.medias = await this.get_medias();
			this.specimens = await this.get_specimens();
			this.taxons = await this.get_taxons();
			this.anims = await this.get_animations();
		}
		this.data_ready = true;
	}
}

</script>

<template>
	<div v-if="data_ready && has_results">
		<div class="box scrollable_content_search">
			<div v-if="medias.length!=0">
				<p>
					<small>Média(s) :</small>
				</p>
				<div class="box" v-for="media in medias">
					<div class="columns text_break is-vcentered">
						<div class="column is-1">
							<div class="tooltip" v-if="media.type_media.code=='image'">
								<span class="icon">
									<font-awesome-icon :icon="['fas', 'image']" />
								</span>
								<span class="tooltiptext">Image</span>
							</div>
							<div class="tooltip" v-else-if="media.type_media.code=='photo'">
								<span class="icon">
									<font-awesome-icon :icon="['fas', 'camera']" />
								</span>
								<span class="tooltiptext">Photo</span>
							</div>
							<div class="tooltip" v-else-if="media.type_media.code=='video'">
								<span class="icon">
									<font-awesome-icon :icon="['fas', 'video']" />
								</span>
								<span class="tooltiptext">Vidéo</span>
							</div>
							<div class="tooltip" v-else-if="media.type_media.code=='bandeson'">
								<span class="icon">
									<font-awesome-icon :icon="['fas', 'headphones']" />
								</span>
								<span class="tooltiptext">Bande-son</span>
							</div>
							<div class="tooltip" v-else-if="media.type_media.code=='support'">
								<span class="icon">
									<font-awesome-icon :icon="['fas', 'file']" />
								</span>
								<span class="tooltiptext">Fichier</span>
							</div>
							<div class="tooltip" v-else-if="media.type_media.code=='conte'">
								<span class="icon">
									<font-awesome-icon :icon="['fas', 'book']" />
								</span>
								<span class="tooltiptext">Conte</span>
							</div>
						</div>
						<div class="column is-3">
							{{media.nom}}
						</div>
						<div class="column is-4">
							<div v-html="md(this.cut_text(media.description))"></div>
						</div>
						<div class="column is-2">
							<button class="button" @click="toggle_media(media)">Aperçu</button>
							<div class="modal" :class="media.open">
								<div class="modal-background"></div>
								<div class="modal-content large_modal">
									<div class="box">
										<h1 class="subtitle">{{media.nom}}</h1>
										<video v-if="media.type_media.code=='video'" controls class="embeb_position" >
											<source :src="get_url(media)">
											Votre navigateur ne supporte pas cette extension.
										</video>
										<audio v-else-if="media.type_media.code=='bandeson'" controls class="embeb_position">
											<source :src="get_url(media)">
											Votre navigateur ne supporte pas cette extension.
										</audio>
										<embed v-else :src="get_url(media)" class="embeb_position">
										<div class="buttons spaced_buttons">
											<i></i>
											<button class="button" @click="toggle_media(media)">Fermer</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="column is-2">
							<div class="field has-addons">
								<p class="control">
									<a @click="download_media(media)" class="button"><span class="icon">
										<font-awesome-icon :icon="['fas', 'download']" />
									</span></a>
								</p>
								<p class="control">
									<RouterLink :to="'/medias/create?q='+media.id" class="button"><span class="icon">
										<font-awesome-icon :icon="['fas', 'pen']" />
									</span></RouterLink>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="block"></div>
			</div>
			<div v-if="taxons.length!=0">
				<p>
					<small>Taxon(s) :</small>
				</p>
				<div class="box" v-for="taxon in taxons">
					<div class="columns text_break is-vcentered">
						<div class="column is-1">
							<span class="icon">
								<font-awesome-icon :icon="['fas', 'seedling']" />
							</span>
						</div>
						<div class="column is-3">
							<RouterLink :to="'/especes/'+taxon.id"><i>{{taxon.nom}}</i> {{taxon.auteur}}, {{taxon.annee}}</RouterLink>
						</div>
						<div class="column is-4">
							<div v-html="md(this.cut_text(taxon.description))"></div>
						</div>
						<div class="column is-2">
							<button class="button ghost_button">{{taxon.rang.label}}</button>
						</div>
						<div class="column is-2">
							<RouterLink :to="'/especes/create?q='+taxon.id" class="button">
								<div class="tooltip">
									<span class="icon">
										<font-awesome-icon :icon="['fas', 'pen']" />
									</span>
									<span class="tooltiptext">Éditer le taxon</span>
								</div>
							</RouterLink>
						</div>
					</div>
				</div>
				<div class="block"></div>
			</div>
			<div v-if="specimens.length!=0">
				<p>
					<small>Specimen(s) :</small>
				</p>
				<div class="box" v-for="specimen in specimens">
					<div class="columns text_break is-vcentered">
						<div class="column is-1">
							<span class="icon">
								<font-awesome-icon :icon="['fas', 'seedling']" />
							</span>
						</div>
						<div class="column is-3">
							<RouterLink :to="'/especes/'+specimen.taxonomie.id"><i>{{specimen.taxonomie.nom}}</i> {{specimen.taxonomie.auteur}}, {{specimen.taxonomie.annee}}</RouterLink>
						</div>
						<div class="column is-4">
							{{specimen.herbier}}
						</div>
						<div class="column is-2">
							<button class="button ghost_button">{{specimen.parcelle.label}}</button>
						</div>
						<div class="column is-2">
							<RouterLink :to="'/especes/'+specimen.taxonomie.id+'/create?q='+specimen.id" class="button">
								<div class="tooltip">
									<span class="icon">
										<font-awesome-icon :icon="['fas', 'pen']" />
									</span>
									<span class="tooltiptext">Éditer le specimen</span>
								</div>
							</RouterLink>
						</div>
					</div>
				</div>
				<div class="block"></div>
			</div>
			<div v-if="anims.length!=0">
				<p>
					<small>Animation(s) :</small>
				</p>
				<div class="box" v-for="anim in anims">
					<div class="columns text_break is-vcentered">
						<div class="column is-1">
							<span class="icon">
								<font-awesome-icon :icon="['fas', 'fish']" />
							</span>
						</div>
						<div class="column is-3">
							<RouterLink :to="'/pedagogie/'+anim.id">{{anim.titre}}</RouterLink>
						</div>
						<div class="column is-4">
							<div v-html="md(this.cut_text(anim.objectifs))"></div>
						</div>
						<div class="column is-2">
							{{anim._min}}/{{anim._max}} pers.
						</div>
						<div class="column is-2">
							<RouterLink :to="'/pedagogie/create?q='+anim.id" class="button">
								<div class="tooltip">
									<span class="icon">
										<font-awesome-icon :icon="['fas', 'pen']" />
									</span>
									<span class="tooltiptext">Éditer l'animation</span>
								</div>
							</RouterLink>
						</div>
					</div>
				</div>
				<div class="block"></div>
			</div>
		</div>
	</div>
</template>
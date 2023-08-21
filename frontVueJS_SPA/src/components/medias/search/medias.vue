<script>
	
export default {
	name: 'medias',
	props: ['key', 'query', 'types'],
	data () {
		return {
			rep: [],
			medias: [],
			pertinence: [],
			medias_ready: false
		}
	},
	methods: {
		async get_medias () {
			let query_string = '';
			for (let tag in this.query) {
				query_string+= `&tag=${this.query[tag]}`;
			}
			for (let tag in this.types) {
				query_string+= `&type=${this.types[tag]}`;
			}
			query_string = query_string.replace('&', '');
			let response = await fetch(`${this.$url_prefix}/medias/results?${query_string}`);
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
		async delete_media (media) {
			await fetch(`${this.$url_prefix}/medias/delete?q=${media.id}`);
			this.$emit('update');
		}
	},
	computed: {
	},
	async mounted () {
		this.rep = await this.get_medias();
		for (let media_pertinence in this.rep) {
			this.medias.push(this.rep[media_pertinence][0]);
			this.pertinence.push(this.rep[media_pertinence][1]);
		}
		this.medias_ready = true;
	}
}
</script>

<template>
	<div v-if="medias_ready">
		<div class="container large_form bottom_120">
			<div class="form_position">
				<p class="subtitle is-6 text_color">{{medias.length}} résultat(s)</p>
				<div class="box">
					<div class="form_position" v-for="(media, idx) in medias">
						<div class="box">
							<div class="columns text_break">
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
								<div class="column is-2">
									{{media.nom}}
								</div>
								<div class="column is-3">
									<div v-html="md(media.description)"></div>
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
								<div class="column is-3">
									<div class="field has-addons">
									  <p class="control">
									  	<a @click="download_media(media)" class="button"><span class="icon">
									  		<font-awesome-icon :icon="['fas', 'download']" />
									  	</span></a>
									  </p>
									  <p class="control">
									  	<a :href="'/medias/create?q='+media.id" class="button"><span class="icon">
									  		<font-awesome-icon :icon="['fas', 'pen']" />
									  	</span></a>
									  </p>
									  <p class="control">
									  	<a @click="delete_media(media)" class="button"><span class="icon">
									  		<font-awesome-icon :icon="['fas', 'trash']" />
									  	</span></a>
									  </p>
									</div>
								</div>
								<div class="column is-1" v-if="pertinence[idx]">
									Pertinence : {{pertinence[idx]}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	name: 'specimen_form',
	data () {
		return {
			rep: {},
			data: {
				parcelle: {'id':''},
				indigenat: {'id':''},
				taxonomie: {},
				historique: '',
				herbier: '',
				medias: []
			},
			parcelles: [],
			indigenats: [],
			medias: [],
			media_open: false,
			type_media_filters: [],
			theme_filters: [],
			nom_media: '',
			types_media: [],
			themes: [],
			end: false,
			redirect: '',
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
		async get_specimen (id_specimen) {
			let response = await fetch(`${this.$url_prefix}/especes/get_specimen?q=${id_specimen}`);
			return await response.json();
		},
		async get_medias () {
			let response = await fetch(`${this.$url_prefix}/pedagogie/get_medias`);
			return await response.json();
		},
		MaxLengthTextarea(valuename, maxlength){
			if (this.data[valuename].length > maxlength) {
				this.data[valuename] = this.data[valuename].substring(0, maxlength);
				alert('Votre texte ne doit pas dépasser '+maxlength+' caractères!');
			}
		},
		toggle () {
			if (this.media_open=='') {
				this.media_open = 'is-active';
			} else {
				this.media_open = '';
			}
		},
		add_media (media_id) {
			this.data.medias.push(media_id);
		},
		remove_media (media_id) {
			this.data.medias.splice(this.data.medias.indexOf(media_id), 1);
		},
		get_icon (type_media) {
			if (type_media.code=='image') {
				return 'image';
			} else if (type_media.code=='photo') {
				return 'camera';
			} else if (type_media.code=='video') {
				return 'video';
			} else if (type_media.code=='bandeson') {
				return 'headphones';
			} else if (type_media.code=='support') {
				return 'file';
			} else if (type_media.code=='conte') {
				return 'book';
			} else {
				return '';
			}
		},
		get_url (media) {
			return `${this.$url_prefix}/` + media.url;
		},
		get_media_nom (media_id) {
			return this.medias.filter(e => {return e.id == media_id})[0].nom;
		},
		toggle_media (media) {
			if (media.open=='') {
				media.open = 'is-active';
			} else {
				media.open = '';
			}
		},
		send_data () {
			fetch(`${this.$url_prefix}/especes/cr_or_up_specimen`, {
				method: 'POST',
				headers: {
					'Content-Type':'application/json'
				},
				body: JSON.stringify(this.data)
			}).then(resp => { resp.text().then(data => {this.redirect = data; this.end = true;})});
		},
	},
	computed: {
		issend () {
			return this.end;
		},
		hvl () {return this.data.historique.length},
		iscomplete () {
			return this.data.parcelle.id && this.data.indigenat.id && this.data.historique;
		},
		getfilteredmedias () {
			let filtered_medias = this.medias;

			if (this.type_media_filters.length!=0) {
				filtered_medias = filtered_medias.filter(e => {return this.type_media_filters.includes(e.type_media.id)});
			}

			if (this.theme_filters.length!=0) {
				filtered_medias = filtered_medias.filter(media => {
					let count = 0;
					for (let idx_theme in this.theme_filters) {
						let theme = this.theme_filters[idx_theme];
						for (let idx_tag in media.tags) {
							let tag = media.tags[idx_tag].id;
							if (theme==tag) {
								count++;
							}
						}
					}
					return count==this.theme_filters.length ? true : false;
				});
			}
			
			if (this.nom_media!='') {
				filtered_medias = filtered_medias.filter(e => {return e.nom.toLowerCase().substring(0, this.nom_media.length) == this.nom_media.toLowerCase()});
			}

			return filtered_medias;
		}
	},
	async mounted () {
		this.rep = await this.get_thes();
		this.medias = await this.get_medias();
		this.parcelles = this.rep['ref.parcelle'];
		this.indigenats = this.rep['ref.indigenat'];
		this.types_media = this.rep['ref.type_media'];
		this.themes = this.rep['ref.theme'];
		if (this.$route.query.q) {
			this.data = await this.get_specimen(this.$route.query.q);
			for (let idx in this.data.medias) {
				this.data.medias[idx] = this.data.medias[idx]['id'];
			}
		} else {
			this.data.taxonomie = await this.get_taxon(this.$route.params.id);
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
						<div class="column is-8">
							<label class="label title is-4">Specimen pour <i>{{data.taxonomie.nom}}</i></label>
						</div>
					</div>
					<div class="columns">
						<div class="column is-8">
							<div class="field">
								<label class="label">Part d'herbier</label>
								<div class="control">
									<input class="input" type="text" v-model="data.herbier">
								</div>
							</div>
						</div>
					</div>
					<div class="field">
						<label class="label">Historique*</label>
						<div class="control">
							<span>Nombre de caractères : {{hvl}}</span>
							<textarea name="historique" class="textarea" v-model="data.historique" @keyup="MaxLengthTextarea('historique', 800);" placeholder="Rentrer le texte en moins de 800 caractères." rows="8"></textarea>
						</div>
					</div>
					<div class="columns">
						<div class="column is-2">
							<div class="field">
								<label class="label">Parcelle*</label>
								<div class="control">
									<div class="select">
										<select name="parcelle" v-model="data.parcelle['id']">
											<option value="">Choisir ...</option>
											<option v-for="parcelle in parcelles" :value="parcelle['id']">{{parcelle['label']}}</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div class="column is-2">
							<div class="field">
								<label class="label">Indigénat*</label>
								<div class="control">
									<div class="select">
										<select name="parcelle" v-model="data.indigenat['id']">
											<option value="">Choisir ...</option>
											<option v-for="indigenat in indigenats" :value="indigenat['id']">{{indigenat['label']}}</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column is-12">
							<label class="label">Médias</label>
							<button @click="toggle" class="button">Sélectionner un média</button>
							<button v-for="media in data.medias" @click="remove_media(media)" class="button">
								<span class="icon">
									<font-awesome-icon :icon="['fas', 'trash']" />
								</span>
								<span>{{get_media_nom(media)}}</span>
							</button>
						</div>
					</div>
					<div class="modal" :class="media_open">
						<div class="modal-background"></div>
						<div class="modal-card large_modal">
							<header class="modal-card-head">
								<p class="modal-card-title text_center">Sélectionnez un ou plusieurs médias</p>
							</header>
							<section class="modal-card-body">
								<p class="subtitle is-6">Types de médias :</p>
								<div class="columns is-gapless is-multiline">
									<div class="column is-2" v-for="type in types_media">
										<label class="checkbox" :for="type['id']">
											<input type="checkbox" :value="type['id']" :id="type['id']" v-model="type_media_filters">
											{{type['label']}}
										</label>
									</div>
								</div>
								<p class="subtitle is-6">Thémes :</p>
								<div class="columns is-gapless is-multiline">
									<div class="column is-2" v-for="theme in themes">
										<label class="checkbox" :for="theme['id']">
											<input type="checkbox" :value="theme['id']" :id="theme['id']" v-model="theme_filters">
											{{theme['label']}}
										</label>
									</div>
								</div>
								<div class="field is-horizontal">
									<div class="field-label is-normal">
										<label class="label">Nom du média</label>
									</div>
									<div class="field-body">
										<div class="field">
											<p class="control is-expanded">
												<input type="text" class="input" v-model="nom_media">
											</p>
										</div>
									</div>
								</div>
								<div class="box" v-for="media in getfilteredmedias">
									<div class="columns is-multiline">
										<div class="column is-2">
											<span class="icon">
												<font-awesome-icon :icon="['fas', get_icon(media.type_media)]" />
											</span>
										</div>
										<div class="column is-4">{{media.nom}}</div>
										<div class="column is-3">
											<button v-if="!data.medias.includes(media.id)" type="button" @click="add_media(media.id)" class="delete add_button is-medium"></button>
											<button v-else type="button" @click="remove_media(media.id)" class="delete is-medium"></button>
										</div>
										<div class="column is-3">
											<button @click="toggle_media(media)" class="button">Aperçu</button>
										</div>
										<div class="modal" :class="media.open">
											<div class="modal-background"></div>
											<div class="modal-content large_modal">
												<div class="box">
													<h1 class="subtitle">{{media.nom}}</h1>
													<video v-if="media.type_media.code=='video'" controls class="embeb_position" >
														<source :src="get_url(media)">
														Votre navigateur ne supporte pas cette extension.
													</video>
													<audio v-else-if="media.type_media=='bandeson'" controls class="embeb_position">
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
								</div>
							</section>
							<footer class="modal-card-foot">
								<button @click="toggle" class="button">Sauvegarder</button>
							</footer>
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
<script>
	
export default {
	name: 'seqform',
	props: ['parties','approches','modalites','durees', 'medias', 'types_media', 'themes', 'global_values', 'idx', 'data'],
	data () {
		return {
			reduction: false,
			media_open: '',
			type_media_filters: [],
			theme_filters: [],
			nom_media: '',
			delete_seq_open: ''
		}
	},
	methods: {
		toggle () {
			if (this.media_open=='') {
				this.media_open = 'is-active';
				this.$emit('get-medias');
			} else {
				this.media_open = '';
			}
		},
		toggle_media (media) {
			if (media.open=='') {
				media.open = 'is-active';
			} else {
				media.open = '';
			}
		},
		toggle_delete_seq () {
			if (this.delete_seq_open=='') {
				this.delete_seq_open = 'is-active';
			} else {
				this.delete_seq_open = '';
			}
		},
		get_icon (type_media_id) {
			if (type_media_id.id==this.global_values['image']) {
				return 'image';
			} else if (type_media_id.id==this.global_values['photo']) {
				return 'camera';
			} else if (type_media_id.id==this.global_values['video']) {
				return 'video';
			} else if (type_media_id.id==this.global_values['bandeson']) {
				return 'headphones';
			} else if (type_media_id.id==this.global_values['support']) {
				return 'file';
			} else if (type_media_id.id==this.global_values['conte']) {
				return 'book';
			} else {
				return '';
			}
		},
		get_url (media) {
			return `${this.$url_prefix}/` + media.url;
		},
		add_materiel (media_id) {
			this.data.materiel.push(media_id);
		},
		remove_materiel (media_id) {
			this.data.materiel.splice(this.data.materiel.indexOf(media_id), 1);
		},
		get_media_nom (media_id) {
			return this.medias.filter(e => {return e.id == media_id})[0].nom;
		},
		get_tag_id (id) {
			return this.idx+'seq'+id;
		}
	},
	computed: {
		getcolor () {
			if (this.data.type_seq.id==this.global_values['intro']) {
				return 'intro-color';
			} else if (this.data.type_seq.id==this.global_values['dvp']) {
				return 'dvp-color';
			} else if (this.data.type_seq.id==this.global_values['dvpopt']) {
				return 'dvpopt-color';
			} else if (this.data.type_seq.id==this.global_values['conclu']) {
				return 'conclu-color';
			} else {
				return 'grey-color';
			}
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
	}
}

</script>

<template>
	<div class="form_position">
		<div class="box" :class="getcolor" v-if="reduction">
			<p class="subtitle text_color">{{data.titre}}</p>
			<button @click="reduction=false" class="button">Augmenter la séquence</button>
		</div>
		<div class="box" v-else>
			<div class="columns is-gapless">
				<div class="column is-one-fifth">
					<div class="select">
						<select name="partie" id="partie" v-model="data.type_seq.id">
							<option value="">Choisir ...</option>
							<option v-for="partie in parties" :value="partie['id']">{{partie['label']}}</option>
						</select>
					</div>
				</div>
				<div class="column is-half">
					<div class="field is-horizontal">
						<div class="field-label is-normal field_text">
							<label class="label">Titre*</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<input type="text" name="titre" class="input" v-model="data.titre">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons spaced_buttons">
				<button @click="reduction=true" type="button" class="button">Réduire la séquence</button>
				<button @click="toggle_delete_seq" class="button is-warning">Supprimer ma séquence</button>
			</div>
			<div class="modal" :class="delete_seq_open">
				<div class="modal-background"></div>
				<div class="modal-content">
					<div class="box">
						<p class="subtitle text_center">Êtes-vous sûr de vouloir supprimer la séquence ?</p>
						<div class="buttons is-centered">
							<button @click="toggle_delete_seq" class="button is-warning">NON</button>
							<button @click="$emit('remove-seq')" class="button">OUI</button>
						</div>
					</div>
				</div>
			</div>
			<div class="columns is-gapless columns_position" :class="getcolor">
				<div class="column is-one-fifth">
					<div class="field text_center">
						<label class="label">Approche et modalités*</label>
					</div>
				</div>
				<div class="column is-one-fifth">
					<div class="field text_center">
						<label class="label">Durée*</label>
					</div>
				</div>
				<div class="column is-one-fifth">
					<div class="field text_center">
						<label class="label">Objectifs*</label>
					</div>
				</div>
				<div class="column is-one-fifth">
					<div class="field text_center">
						<label class="label">Matériel</label>
					</div>
				</div>
				<div class="column is-one-fifth">
					<div class="field text_center">
						<label class="label">Média et codex</label>
					</div>
				</div>
			</div>
			<div class="columns is-gapless">
				<div class="column is-one-fifth">
					<div class="select">
						<select name="approche" v-model="data.approche.id">
							<option value="">Choisir ...</option>
							<option v-for="approche in approches" :value="approche['id']">{{approche['label']}}</option>
						</select>
					</div>
					<div class="select">
						<select name="modalite" v-model="data.modalite.id">
							<option value="">Choisir ...</option>
							<option v-for="modalite in modalites" :value="modalite['id']">{{modalite['label']}}</option>
						</select>
					</div>
				</div>
				<div class="column is-one-fifth">
					<div class="select">
						<select name="duree" v-model="data.duree.id">
							<option value="">Choisir ...</option>
							<option v-for="duree in durees" :value="duree['id']">{{duree['label']}}</option>
						</select>
					</div>
				</div>
				<div class="column is-one-fifth">
					<textarea class="textarea" name="objectifs" v-model="data.objectifs"></textarea>
				</div>
				<div class="column is-one-fifth">
					<textarea class="textarea" name="materiel" v-model="data.materiel_div"></textarea>
				</div>
				<div class="column is-one-fifth">
					<button @click="toggle" class="button">Sélectionner un média</button>
					<button v-for="media in data.materiel" @click="remove_materiel(media)" class="button">
						<span class="icon">
							<font-awesome-icon :icon="['fas', 'trash']" />
						</span>
						<span>{{get_media_nom(media)}}</span>
					</button>
				</div>
			</div>
			<div class="field">
				<label class="label">Description de la séquence*</label>
				<div class="control">
					<textarea class="textarea" name="description" v-model="data.description"></textarea>
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
								<label class="checkbox" :for="get_tag_id(type['id'])">
									<input type="checkbox" :value="type['id']" :id="get_tag_id(type['id'])" v-model="type_media_filters">
									{{type['label']}}
								</label>
							</div>
						</div>
						<p class="subtitle is-6">Thémes :</p>
						<div class="columns is-gapless is-multiline">
							<div class="column is-2" v-for="theme in themes">
								<label class="checkbox" :for="get_tag_id(theme['id'])">
									<input type="checkbox" :value="theme['id']" :id="get_tag_id(theme['id'])" v-model="theme_filters">
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
									<button v-if="!data.materiel.includes(media.id)" type="button" @click="add_materiel(media.id)" class="delete add_button is-medium"></button>
									<button v-else type="button" @click="remove_materiel(media.id)" class="delete is-medium"></button>
								</div>
								<div class="column is-3">
									<button @click="toggle_media(media)" class="button">Aperçu</button>
								</div>
								<div class="modal" :class="media.open">
									<div class="modal-background"></div>
									<div class="modal-content large_modal">
										<div class="box">
											<h1 class="subtitle">{{media.nom}}</h1>
											<video v-if="media.type_media==global_values['video']" controls class="embeb_position" >
												<source :src="get_url(media)">
												Votre navigateur ne supporte pas cette extension.
											</video>
											<audio v-else-if="media.type_media==global_values['bandeson']" controls class="embeb_position">
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
	</div>
</template>
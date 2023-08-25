<script>

export default {
  name: 'create_form',
  components: {},
  data () {
  	return {
  		rep: {},
  		data: {
  			id: '',
  			type_media: {id:''},
  			nom: '',
  			description: '',
  			tags: []
  		},
  		file: null,
  		alert: '',
  		data_ready: false,
  		redirect: '',
  		end: false,
  		tags: []
  	}
  },
  methods: {
		async get_thes () {
			let response = await fetch(`${this.$url_prefix}/pedagogie/get_thes`);
			return await response.json();
		},
		MaxLengthTextarea(valuename, maxlength){
			if (this.data[valuename].length > maxlength) {
				this.data[valuename] = this.data[valuename].substring(0, maxlength);
				alert('Votre texte ne doit pas dépasser '+maxlength+' caractères!');
			}
		},
		handleFileUpload(event) {
			this.file = event.target.files[0];
		},
		async send_data () {
			if (!this.data.id) {
				let formData = new FormData();
				formData.append('file', this.file);
				formData.append('type_media', this.data.type_media.id);
				let response = await fetch(`${this.$url_prefix}/medias/cr_or_up_media`, {
					method: 'POST',
					body: formData
				});
				let data = await response.json();
				if (data['alert']) {
					this.alert = data['alert'];
				} else {
					this.data.id = data;
				}
			}
			if (this.data.id) {

				await fetch(`${this.$url_prefix}/medias/cr_or_up_media`, {
					method: 'POST',
					headers: {
						'Content-Type':'application/json'
					},
					body: JSON.stringify(this.data)
				}).then(resp => {resp.text().then(data => {
					this.redirect = data; this.end = true;
				})});
			}
		},
		update_tags () {
      for (let idx_tag in this.data.tags) {
      	this.data.tags[idx_tag] = {'id':this.data.tags[idx_tag]};
      }
    },
    async get_media (id_media) {
      let response = await fetch(`${this.$url_prefix}/medias/get_media?q=${id_media}`);
      return await response.json();
    }
	},
	computed: {
		nvl () {return this.data.nom.length},
		dvl () {return this.data.description.length},
		iscomplete () {
			if (this.data.id) {
				return this.data.type_media.id && this.data.nom && this.data.description && this.data.tags.length!=0;
			} else {
				return this.data.type_media.id && this.data.nom && this.data.description && this.data.tags.length!=0 && this.file;
			}
		},
		issend () {
      return this.end;
    },
    isalert () {
    	return this.alert ? 'is-active' : '';
    },
    isfile () {
    	return this.data.id ? false : true;
    }
	},
	watch: {
		tags: function (val) {
			this.data.tags = [];
			for (let idx in val) {
				this.data.tags.push(val[idx]);
			}
			this.update_tags();
		}
	},
	async mounted () {
		this.rep = await this.get_thes();
		if (this.$route.query.q) {
      this.data = await this.get_media(this.$route.query.q);
      for (let idx in this.data.tags) {
				this.tags.push(this.data.tags[idx]['id']);
			}
    }
		this.data_ready = true;
	}
}

</script>

<template>
	<div v-if="data_ready">
		<div v-if="!issend">
			<div class="container large_form bottom_120">
				<div class="form_position">
					<h1 class="subtitle text_color">Importer un nouveau média</h1>
					<p class="text_color">Les champs marqués d'un astérisque (*) sont obligatoires.</p>
					<div class="box">
						<div class="field">
							<label class="label">Type de média*</label>
							<div class="control">
								<div class="select">
									<select name="type_media" v-model="data.type_media.id">
										<option value="">Choisir ...</option>
										<option v-for="type in rep['ref.type_media']" :value="type.id">{{type.label}}</option>
									</select>
								</div>
							</div>
						</div>
						<div class="form_position">
							<label class="label">Mots-clés*</label>
							<div class="columns is-gapless is-multiline">
								<div class="column is-2" v-for="theme in rep['ref.theme']">
									<label class="checkbox" :for="theme.id">
										<input type="checkbox" :value="theme.id" name="theme" :id="theme.id" v-model="tags">
										{{theme.label}}
									</label>
								</div>
								<div class="column is-2" v-for="saison in rep['ref.saison']">
									<label class="checkbox" :for="saison.id">
										<input type="checkbox" :value="saison.id" name="saison" :id="saison.id" v-model="tags">
										{{saison.label}}
									</label>
								</div>
							</div>
							<div class="block"></div>
						</div>
						<div class="field">
							<label class="label">Nom du media*</label>
							<div class="control">
								<span>Nombre de caractères : {{nvl}}</span>
								<textarea class="textarea" rows="2" placeholder="Rentrer le texte en moins de 60 caractères." name="nom" v-model="data.nom" @keyup="MaxLengthTextarea('nom', 60);"></textarea>
							</div>
						</div>
						<div class="field">
							<label class="label">Description du media*</label>
							<div class="control">
								<span>Nombre de caractères : {{dvl}}</span>
								<textarea class="textarea" rows="3" placeholder="Rentrer le texte en moins de 200 caractères." name="description" v-model="data.description" @keyup="MaxLengthTextarea('description', 200);"></textarea>
							</div>
						</div>
						<div class="field" v-if="isfile">
							<label class="label">Selection du media*</label>
							<div class="control">
								<input type="file" name="file" @change="handleFileUpload($event)">
							</div>
						</div>
						<div class="buttons spaced_buttons">
							<i></i>
							<button v-if="iscomplete" class="button" @click="send_data()">Enregistrer</button>
						</div>
					</div>
					<div class="modal" :class="isalert">
					  <div class="modal-background"></div>
					  <div class="modal-content">
					    <div class="box">
					    	<div v-if="alert=='duplicate'">
					    		<p class="subtitle text_center" >Média déjà existant</p>
					    		<p>Le média que vous avez essayé d'importer existe déja !</p>
					    	</div>
					    	<div v-else>
					    		<p class="subtitle text_center">Extension non supportée</p>
					    		<p>Les extensions supportés sont :</p>
					    		<div class="columns is-multiline">
						    		<div v-for="item in alert" class="column is-1">
						    			{{item}}
						    		</div>
					    		</div>
					    	</div>
					    	<button id="modal_button" class="button is-primary" @click="alert=''">Accepter</button>
					    </div>
					  </div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="container form_position">
			<h1 class="title">Vous pouvez rechercher <a :href="redirect">votre média</a> !</h1>
		</div>
	</div>
</template>
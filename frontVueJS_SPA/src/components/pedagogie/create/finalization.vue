<script>
	
export default {
	name: 'finalform',
	props: ['themes', 'saisons', 'publics', 'data'],
	data () {
		return {
			tags: []
		}
	},
	computed: {
		dvl () {return this.data.description.length},
		pvl () {return this.data.public_specifique.length}
	},
	methods: {
		MaxLengthTextarea(valuename, maxlength){
			if (this.data[valuename].length > maxlength) {
				this.data[valuename] = this.data[valuename].substring(0, maxlength);
				alert('Votre texte ne doit pas dépasser '+maxlength+' caractères!');
			}
		}
	},
	watch: {
		tags: function (val) {
			this.data.tags = [];
			for (let idx in val) {
				this.data.tags.push(val[idx]);
			}
			this.$emit('update-tags');
		}
	},
	mounted () {
		for (let idx in this.data.tags) {
			this.tags.push(this.data.tags[idx]['id']);
		}
	}
}

</script>

<template>
	<div class="form_position">
		<div class="box">
			<div class="field">
				<label class="label">Public spécifique</label>
				<div class="control">
					<span>Nombre de caractères : {{pvl}}</span>
					<textarea class="textarea" rows="10" placeholder="Rentrer le texte en moins de 400 caractères." name="public_specifique" v-model="data.public_specifique"  @keyup="MaxLengthTextarea('public_specifique', 400);"></textarea>
				</div>
			</div>
			<p class="subtitle">Mots-clés*</p>
			<div class="form_position">
				<p class="subtitle is-6">Thémes</p>
				<div class="columns is-multiline">
					<div class="column is-2" v-for="theme in themes">
						<label class="checkbox" :for="theme['id']">
							<input type="checkbox" :value="theme['id']" :id="theme['id']" v-model="tags">
							{{theme['label']}}
						</label>
					</div>
				</div>
			</div>
			<div class="form_position">
				<p class="subtitle is-6">Saison</p>
				<div class="columns is-multiline">
					<div class="column is-2" v-for="saison in saisons">
						<label class="checkbox" :for="saison['id']">
							<input type="checkbox" :value="saison['id']" :id="saison['id']" v-model="tags">
							{{saison['label']}}
						</label>
					</div>
				</div>
			</div>
			<div class="form_position">
				<p class="subtitle is-6">Public</p>
				<div class="columns is-multiline">
					<div class="column is-2" v-for="_public in publics">
						<label class="checkbox" :for="_public['id']">
							<input type="checkbox" :value="_public['id']" :id="_public['id']" v-model="tags">
							{{_public['label']}}
						</label>
					</div>
				</div>
			</div>
			<div class="field form_position">
				<label class="label">Après l'animation</label>
				<div class="control">
					<span>Étape(s) à réaliser en aval de l'animation. Ex : vérifier des pièges photos entre deux séances.</span>
					<textarea class="textarea" name="post_anim" v-model="data.post_anim"></textarea>
				</div>
			</div>
		</div>
	</div>
</template>
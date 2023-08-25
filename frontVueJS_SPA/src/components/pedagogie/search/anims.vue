<script>
	
export default {
	name: 'anims',
	props: ['key', 'query'],
	data () {
		return {
			rep: [],
			anims: [],
			pertinence: [],
			anims_ready: false
		}
	},
	methods: {
		async get_anims () {
			let query_string = '';
			for (let tag in this.query) {
				query_string+= `&tag=${this.query[tag]}`;
			}
			query_string = query_string.replace('&tag', 'tag');
			let response = await fetch(`${this.$url_prefix}/pedagogie/results?${query_string}`);
			return await response.json();
		},
		is_not_public (anim) {
	      	let count = 0;
	      	for (let idx in anim.tags) {
	        	let tag = anim.tags[idx];
	        	if (tag.reference=='ref.public') {
	          		count++;
	        	}
	      	}
	      	return count==0;
	    }
	},
	computed: {
	},
	async mounted () {
		this.rep = await this.get_anims();
		for (let anim_pertinence in this.rep) {
			this.anims.push(this.rep[anim_pertinence][0]);
			this.pertinence.push(this.rep[anim_pertinence][1]);
		}
		this.anims_ready = true;
	}
}
</script>

<template>
	<div v-if="anims_ready">
		<div class="container large_form bottom_120">
			<div class="form_position">
				<p class="subtitle is-6 text_color">{{anims.length}} résultat(s)</p>
				<div class="box">
					<div class="form_position" v-for="(anim, idx) in anims">
						<div class="box">
							<div class="columns is-multiline text_break">
								<div class="column is-9">
									<h2 class="title is-5">{{anim.titre}}</h2>
									<h4 class="subtitle is-6" v-if="pertinence[idx]">Pertinence : {{pertinence[idx]}}</h4>
								</div>
								<div class="column is-3">
									<div class="buttons">
										<span class="button ghost_button">
											<div class="tooltip" v-if="anim.statut==3">
												<span class="icon">
													<font-awesome-icon :icon="['fas', 'spinner']" />
												</span>
												<span class="tooltiptext">En cours d'écriture</span>
											</div>
											<div class="tooltip" v-else-if="anim.statut==2">
												<span class="icon">
													<font-awesome-icon :icon="['fas', 'check']" style="color: yellow;"/>
												</span>
												<span class="tooltiptext">Terminée</span>
											</div>
											<div class="tooltip" v-else>
												<span class="icon">
													<font-awesome-icon :icon="['fas', 'check']" style="color: green;"/>
												</span>
												<span class="tooltiptext">Validée</span>
											</div>
										</span>
										<a :href="'/pedagogie/create?q='+anim.id" class="button">
											<div class="tooltip">
												<span class="icon">
													<font-awesome-icon :icon="['fas', 'pen']" />
												</span>
												<span class="tooltiptext">Éditer l'animation</span>
											</div>
										</a>
										<a :href="'/pedagogie/'+anim.id" class="button">Consulter</a>
									</div>
								</div>
								<div class="column is-4">
									<b>Objectifs :</b>
									<div v-html="md(anim.objectifs)"></div>
								</div>
								<div class="column is-4">
									<b v-if="anim.preconisations">Préconisations :</b>
									<div v-if="anim.preconisations" v-html="md(anim.preconisations)"></div>
								</div>
								<div class="column is-4">
									<b v-if="anim.pre_anim">Préparation :</b>
									<div v-if="anim.pre_anim" v-html="md(anim.pre_anim)"></div>
								</div>
								<div class="column is-6">
									<small v-if="anim.date_modif">Dernière modification le {{anim.date_modif}}</small>
								</div>
								<div class="column is-6">
									<b>Niveaux :</b>
									<div class="columns is-multiline">
										<div v-for="tag in anim.tags" class="column is-2">
											<span v-if="tag.reference=='ref.public'" class="icon-text">
												<span class="icon">
													<font-awesome-icon :icon="['fas', 'check']" />
												</span>
												<span>{{tag.label}}</span>
											</span>
										</div>
									</div>
									<span v-if="is_not_public(anim)" class="icon-text">
										<span class="icon">
											<font-awesome-icon :icon="['fas', 'check']" />
										</span>
										<span>Tout niveau</span>
									</span>
								</div>
								<div class="column is-12">
									<b>Mots-clés :</b>
									<div class="columns is-multiline">
										<div v-for="tag in anim.tags" class="column is-2">
											<span v-if="tag.reference!='ref.public'" class="icon-text">
												<span class="icon">
													<font-awesome-icon :icon="['fas', 'check']" />
												</span>
												<span>{{tag.label}}</span>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
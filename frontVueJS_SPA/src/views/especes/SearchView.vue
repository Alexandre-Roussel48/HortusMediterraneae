<script>

import Taxons from '@/components/especes/search/taxons.vue'
import Specimens from '@/components/especes/search/specimens.vue'

export default {
	name: 'search_form',
	components: {Taxons, Specimens},
	data () {
		return {
			tags: [],
			data_ready: false,
			query_taxon: [],
			rangs_taxon: [],
			query_specimen: [],
			key_taxon: 0,
			key_specimen: 0,
			tabs: {
				'taxon':'',
				'biologie':'visibility: hidden; position: absolute;',
				'parcelles':'visibility: hidden; position: absolute;',
				'indigenat':'visibility: hidden; position: absolute;',
				'conservation':'visibility: hidden; position: absolute;'
			}
		}
	},
	methods: {
		async get_tags () {
			let response = await fetch(`${this.$url_prefix}/especes/get_tags_search`);
			return await response.json();
		},
		open_tab (tab) {
			if (this.tabs[tab] != '') {
				for (let idx in this.tabs) {
					this.tabs[idx] = 'visibility: hidden; position: absolute;';
				}
				this.tabs[tab] = '';
			} else {
				this.tabs[tab] = 'visibility: hidden; position: absolute;';
			}
		}
	},
	computed: {

	},
	watch: {
		query_taxon: function () {
			this.key_taxon++;
		},
		rangs_taxon: function () {
			this.key_taxon++;
		},
		query_specimen: function () {
			this.key_specimen++;
		}
	},
	async mounted () {
		this.tags = await this.get_tags();
		this.data_ready = true;
	}
}

</script>

<template>
	<div v-if="data_ready">
		<div class="container large_form">
			<div class="form_position">
				<div class="columns">
					<div class="column is-half">
						<div class="columns is-multiline">
							<div class="column is-12">
								<div class="box" @click="open_tab('taxon')">
									<div class="columns is-vcentered">
										<div class="column is-11">
											<h3 class="title is-5">Taxon</h3>
										</div>
										<div class="column is-1">
											<span class="icon is-large">
												<font-awesome-icon :icon="['fas', 'caret-down']" size="lg" v-if="this.tabs['taxon']"/>
												<font-awesome-icon :icon="['fas', 'caret-up']" size="lg" v-else/>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="column is-12" :style="this.tabs['taxon']">
								<div class="box">
									<p v-for="rang in this.tags['Rang']">
										<label :for="rang['id']">
											<input type="checkbox" :value="rang['id']" :name="rang['code']" :id="rang['id']" v-model="rangs_taxon">
											{{rang.label}}
										</label>
									</p>
								</div>
							</div>
							<div class="column is-12">
								<div class="box" @click="open_tab('biologie')">
									<div class="columns is-vcentered">
										<div class="column is-11">
											<h3 class="title is-5">Biologie</h3>
										</div>
										<div class="column is-1">
											<span class="icon is-large">
												<font-awesome-icon :icon="['fas', 'caret-down']" size="lg" v-if="this.tabs['biologie']"/>
												<font-awesome-icon :icon="['fas', 'caret-up']" size="lg" v-else/>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="column is-12" :style="this.tabs['biologie']">
								<div class="box">
									<div class="columns is-gapless">
										<div class="column is-one-third">
											<p class="subtitle is-6">Floraison</p>
											<p v-for="floraison in this.tags['Floraison']">
												<label :for="floraison['id']">
													<input type="checkbox" :value="floraison['id']" :name="floraison['code']" :id="floraison['id']" v-model="query_taxon">
													{{floraison.label}}
												</label>
											</p>
										</div>
										<div class="column is-one-third">
											<p class="subtitle is-6">Couleur des fleurs</p>
											<p v-for="couleur in this.tags['Couleur des fleurs']">
												<label :for="couleur['id']">
													<input type="checkbox" :value="couleur['id']" :name="couleur['code']" :id="couleur['id']" v-model="query_taxon">
													{{couleur.label}}
												</label>
											</p>
										</div>
										<div class="column is-one-third">
											<p class="subtitle is-6">Type biologique</p>
											<p v-for="type in this.tags['Type biologique']">
												<label :for="type['id']">
													<input type="checkbox" :value="type['id']" :name="type['code']" :id="type['id']" v-model="query_taxon">
													{{type.label}}
												</label>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div class="column is-12">
								<div class="box" @click="open_tab('parcelles')">
									<div class="columns is-vcentered">
										<div class="column is-11">
											<h3 class="title is-5">Parcelles</h3>
										</div>
										<div class="column is-1">
											<span class="icon is-large">
												<font-awesome-icon :icon="['fas', 'caret-down']" size="lg" v-if="this.tabs['parcelles']"/>
												<font-awesome-icon :icon="['fas', 'caret-up']" size="lg" v-else/>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="column is-12" :style="this.tabs['parcelles']">
								<div class="box">
									<p v-for="parcelle in this.tags['Parcelle']">
										<label :for="parcelle['id']">
											<input type="checkbox" :value="parcelle['id']" :name="parcelle['code']" :id="parcelle['id']" v-model="query_specimen">
											{{parcelle.label}}
										</label>
									</p>
								</div>
							</div>
							<div class="column is-12">
								<div class="box" @click="open_tab('indigenat')">
									<div class="columns is-vcentered">
										<div class="column is-11">
											<h3 class="title is-5">Indigénat</h3>
										</div>
										<div class="column is-1">
											<span class="icon is-large">
												<font-awesome-icon :icon="['fas', 'caret-down']" size="lg" v-if="this.tabs['indigenat']"/>
												<font-awesome-icon :icon="['fas', 'caret-up']" size="lg" v-else/>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="column is-12" :style="this.tabs['indigenat']">
								<div class="box">
									<p v-for="indigenat in this.tags['Indigénat']">
										<label :for="indigenat['id']">
											<input type="checkbox" :value="indigenat['id']" :name="indigenat['code']" :id="indigenat['id']" v-model="query_taxon">
											{{indigenat.label}}
										</label>
									</p>
								</div>
							</div>
							<div class="column is-12">
								<div class="box" @click="open_tab('conservation')">
									<div class="columns is-vcentered">
										<div class="column is-11">
											<h3 class="title is-5">Conservation / Patrimonialité</h3>
										</div>
										<div class="column is-1">
											<span class="icon is-large">
												<font-awesome-icon :icon="['fas', 'caret-down']" size="lg" v-if="this.tabs['conservation']"/>
												<font-awesome-icon :icon="['fas', 'caret-up']" size="lg" v-else/>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="column is-12" :style="this.tabs['conservation']">
								<div class="box">
									<p v-for="conservation in this.tags['Conservation/patrimonialité']">
										<label :for="conservation['id']">
											<input type="checkbox" :value="conservation['id']" :name="conservation['code']" :id="conservation['id']" v-model="query_taxon">
											{{conservation.label}}
										</label>
									</p>
									<div class="block"></div>
									<div class="columns is-gapless">
										<div class="column is-one-third">
											<p class="subtitle is-6">Status IUCN à l'échelle mondiale</p>
											<p v-for="monde in this.tags['Status IUCN à l\'échelle mondiale']">
												<label :for="monde['id']">
													<input type="checkbox" :value="monde['id']" :name="monde['code']" :id="monde['id']" v-model="query_taxon">
													{{monde.label}}
												</label>
											</p>
										</div>
										<div class="column is-one-third">
											<p class="subtitle is-6">Status IUCN à l'échelle européenne</p>
											<p v-for="europe in this.tags['Status IUCN à l\'échelle européenne']">
												<label :for="europe['id']">
													<input type="checkbox" :value="europe['id']" :name="europe['code']" :id="europe['id']" v-model="query_taxon">
													{{europe.label}}
												</label>
											</p>
										</div>
										<div class="column is-one-third">
											<p class="subtitle is-6">Status IUCN à l'échelle régionale PACA</p>
											<p v-for="region in this.tags['Status IUCN à l\'échelle régionale PACA']">
												<label :for="region['id']">
													<input type="checkbox" :value="region['id']" :name="region['code']" :id="region['id']" v-model="query_taxon">
													{{region.label}}
												</label>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="column is-half scrollable_content">
						<div class="box">
							<Taxons :key="key_taxon" :query="query_taxon" :rangs="rangs_taxon"/>
							<Specimens :key="key_specimen" :query="query_specimen"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

export default {
  name: 'anim_consult',
  components: {},
  data () {
    return {
      data: {},
      data_ready: false
    }
  },
  methods: {
    async get_anim () {
      let response = await fetch(`${this.$url_prefix}/pedagogie/get_anim?q=${this.$route.params.id}`);
      return await response.json();
    },
    get_duree_totale () {
      let duree_totale = 0;
      for (let idx in this.data.sequences) {
        let seq = this.data.sequences[idx];
        duree_totale += parseInt(seq.duree.code);
      }
      return duree_totale;
    },
    async validate () {
      await fetch(`${this.$url_prefix}/pedagogie/${this.data.id}/validate`);
      this.data.statut = 1;
    },
    async delete_anim () {
      await fetch(`${this.$url_prefix}/pedagogie/delete?q=${this.data.id}`)
      .then(resp => {
        if (resp = 'deleted') {
          this.$router.push('/pedagogie/search');
        }
      });
    }
  },
  computed: {
    is_not_public () {
      let count = 0;
      for (let idx in this.data.tags) {
        let tag = this.data.tags[idx];
        if (tag.reference=='ref.public') {
          count++;
        }
      }
      return count==0;
    },
    is_materiel () {
      let count = 0;
      for (let idx in this.data.sequences) {
        let seq = this.data.sequences[idx];
        if (seq.materiel_div) {
          count++;
        }
      }
      return count!=0;
    },
    is_statut () {
      return this.data.statut;
    }
  },
  async mounted () {
    this.data = await this.get_anim();
    this.data_ready = true;
  }
}

</script>

<template>
  <div v-if="data_ready">
    <div class="container large_form bottom_120">
      <div class="form_position">
        <div class="columns text_break">
          <div class="column is-8">
            <h2 class="title text_color">{{data.titre}}</h2>
            <p v-if="data.date_modif" class="text_color"><small>Dernière modification le {{data.date_modif}}</small></p>
            <p><small>
              <b class="text_color">Mots-clés :</b>
              <div class="columns is-multiline">
                <div v-for="tag in data.tags" class="column is-2">
                  <span class="icon-text">
                    <span class="icon">
                      <font-awesome-icon :icon="['fas', 'check']" style="color: white;"/>
                    </span>
                    <span class="text_color">{{tag.label}}</span>
                  </span>
                </div>
                <div v-if="is_not_public" class="column is-2">
                  <span v-if="is_not_public" class="icon-text">
                    <span class="icon">
                      <font-awesome-icon :icon="['fas', 'check']" />
                    </span>
                    <span class="text_color">Tout niveau</span>
                  </span>
                </div>
              </div>
            </small></p>
          </div>
          <div class="column is-4">
            <div class="field has-addons">
              <p class="control">
                <RouterLink :to="'/pedagogie/create?q='+data.id" class="button">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'pen']" />
                  </span>
                </RouterLink>
              </p>
              <p class="control">
                <a @click="delete_anim()" class="button"><span class="icon">
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </span></a>
              </p>
            </div>
            <span v-if="is_statut=='3'" class="button ghost_button">
              <div class="tooltip">
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'spinner']" />
                </span>
                <span class="tooltiptext">En cours d'écriture</span>
              </div>
            </span>
            <a v-else-if="is_statut=='2'" @click="validate" class="button">
              <div class="tooltip">
                <span class="icon-text">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'check']" style="color: yellow;"/>
                  </span>
                  <span>Valider l'animation</span>
                </span>
                <span class="tooltiptext">Terminée</span>
              </div>
            </a>
            <span v-else class="button ghost_button">
              <div class="tooltip">
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'check']" style="color: green;"/>
                </span>
                <span class="tooltiptext">Validée</span>
              </div>
            </span>
          </div>
        </div>
        <div class="box">
          <div class="columns is-multiline text_break">
            <div class="column is-4">
              <b>Lieux :</b> {{data.lieu}}
            </div>
            <div class="column is-4">
              <b>Nombre min/max de personnes :</b> {{data._min}}/{{data._max}}
            </div>
            <div class="column is-4">
              <b>Durée totale : </b> {{get_duree_totale()}} min
            </div>
            <div class="column is-12">
              <b>Objectifs :</b>
              <div v-html="md(data.objectifs)"></div>
            </div>
            <div v-if="data.preconisations" class="column is-6">
              <b>Préconisations :</b>
              <div v-html="md(data.preconisations)"></div>
            </div>
            <div v-if="data.annulation" class="column is-6">
              <b>Conditions d'annulation :</b>
              <div v-html="md(data.annulation)"></div>
            </div>
            <div v-if="data.pre_anim" class="column is-6">
              <b>Préparation/Mise en place :</b>
              <div v-html="md(data.pre_anim)"></div>
            </div>
            <div v-if="is_materiel" class="column is-6">
              <b>Matériel :</b>
              <div v-for="seq in data.sequences" v-html="md(seq.materiel_div)"></div>
            </div>
          </div>
          <div v-for="sequence in data.sequences" class="box">
            <div class="columns text_break" :class="sequence.type_seq.code+'-color'">
              <div class="column is-12">
                <h3 class="title is-4"><b>{{sequence.type_seq.label}} :</b> {{sequence.titre}}</h3>
              </div>
            </div>
            <div class="columns is-multiline text_break">
              <div class="column is-4">
                <b>Description :</b>
                <div v-html="md(sequence.description)"></div>
              </div>
              <div class="column is-4">
                <b>Objectifs :</b>
                <div v-html="md(sequence.objectifs)"></div>
              </div>
              <div class="column is-2">
                <p><b>Modalité :</b> {{sequence.modalite.label}}</p>
                <p><b>Approche :</b> {{sequence.approche.label}}</p>
              </div>
              <div class="column is-2">
                <p><b>Durée :</b> {{sequence.duree.label}}</p>
              </div>
            </div>
            <div v-if="sequence.materiel.length">
              <b>Aperçu médias :</b>
              <div class="columns is-multiline text_break">
                <div v-for="media in sequence.materiel" class="column is-2">
                  <button class="button" @click="media.open='is-active'">{{media.nom}}</button>
                  <div class="modal" :class="media.open">
                    <div class="modal-background"></div>
                    <div class="modal-content large_modal">
                      <div class="box">
                        <h1 class="subtitle">{{media.nom}}</h1>
                        <video v-if="media.type_media.code=='video'" controls class="embeb_position" >
                          <source :src="`${this.$url_prefix}/`+media.url">
                          Votre navigateur ne supporte pas cette extension.
                        </video>
                        <audio v-else-if="media.type_media.code=='bandeson'" controls class="embeb_position">
                          <source :src="`${this.$url_prefix}/`+media.url">
                          Votre navigateur ne supporte pas cette extension.
                        </audio>
                        <embed v-else :src="`${this.$url_prefix}/`+media.url" class="embeb_position">
                        <div class="buttons spaced_buttons">
                          <i></i>
                          <button class="button" @click="media.open=''">Fermer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-multiline text_break">
            <div v-if="data.public_specifique" class="column is-6">
              <b>Public spécifique :</b>
              <div v-html="md(data.public_specifique)"></div>
            </div>
            <div v-if="data.post_anim" class="column is-6">
              <b>Après l'animation :</b>
              <div v-html="md(data.post_anim)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Results from '@/components/home/results.vue'

export default {
  name: 'home',
  components: {Results},
  data () {
    return {
      rep: {},
      total: '',
      especes: '',
      medias: '',
      animations: '',
      description: '',
      query: '',
      key: 0,
      edit: false,
      data_ready: false
    }
  },
  methods: {
    async get_stats () {
      let response = await fetch(`${this.$url_prefix}/get_stats`);
      return await response.json();
    },
    async get_desc () {
      let response = await fetch(`${this.$url_prefix}/get_description`);
      return await response.text();
    },
    MaxLengthTextarea(maxlength){
      if (this.description.length > maxlength) {
        this.description = this.description.substring(0, maxlength);
        alert('Votre texte ne doit pas dépasser '+maxlength+' caractères!');
      }
    },
    update_description () {
      fetch(`${this.$url_prefix}/update_description`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(this.description)
      })
      .then(resp => {this.edit=false;});
    }
  },
  watch: {
    query: function () {
      this.key++;
    }
  },
  async mounted () {
    this.rep = await this.get_stats();
    this.description = await this.get_desc();
    this.total = this.rep['total'];
    this.especes = this.rep['especes'];
    this.medias = this.rep['medias'];
    this.animations = this.rep['animations'];
    this.data_ready = true;
  }
}

</script>

<template>
  <main>
    <div v-if="data_ready">
      <div style="padding-top: 15%;">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
              <RouterLink to="/contact">
                <h1 class="title is-1 jasmine">Hortus Mediterraneae</h1>
                <h2 class="subtitle is-4 jasmine">Le référentiel du Domaine du Rayol</h2>
              </RouterLink>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="field">
              <p class="control has-icons-right">
                <input class="input is-large is-rounded" type="text" placeholder="Nom d'une plante, d'une animation, etc..." v-model="query">
                <span class="icon is-small is-right">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </span>
              </p>
            </div>
            <Results :key="key" :query="query"/>
          </div>
        </div>
        <div class="top_50 bottom_20">
          <div class="columns is-vcentered">
            <div class="column is-8 is-offset-2 stats_box">
              <div class="columns centered_columns">
                <div class="column is-3">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'database']" size="2xl" />
                  </span>
                  <p>Nombre total de données</p>
                  <div class="block"></div>
                  <p>{{total}}</p>
                </div>
                <div class="column is-3">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'seedling']" size="2xl" />
                  </span>
                  <p>Nombre total d'espéces</p>
                  <div class="block"></div>
                  <p>{{especes}}</p>
                </div>
                <div class="column is-3">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'image']" size="2xl" />
                  </span>
                  <p>Nombre total de médias</p>
                  <div class="block"></div>
                  <p>{{medias}}</p>
                </div>
                <div class="column is-3">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'fish']" size="2xl" />
                  </span>
                  <p>Nombre total d'animations</p>
                  <div class="block"></div>
                  <p>{{animations}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-1">
            <div class="columns centered_columns">
              <img src="@/assets/logo_jardin_remarquable.png">
            </div>
          </div>
        </div>
        <div class="columns is-vcentered">
          <div class="column is-two-quarters text_break terms_box">
            <div class="columns is-vcentered">
              <div class="column is-11">
                <div v-if="!edit" v-html="md(description)"></div>
                <div v-else>
                  <div class="field">
                    <label class="label">Description :</label>
                    <div class="control">
                      <textarea class="textarea" placeholder="Rentrer le texte en moins de 100 caractères." rows="1" @keyup="MaxLengthTextarea(100);" v-model="description"></textarea>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <button class="button" @click="update_description()">Envoyer</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-1">
                <div class="tooltip" v-if="!edit">
                  <span class="icon" @click="edit=true;">
                    <font-awesome-icon :icon="['fas', 'pen']" />
                  </span>
                  <span class="tooltiptext">Éditer le bandeau</span>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-one-quarter text_break terms_box">
            <p>Termes et conditions,</p>
            <p>Copyright © Domaine du Rayol, 2023</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
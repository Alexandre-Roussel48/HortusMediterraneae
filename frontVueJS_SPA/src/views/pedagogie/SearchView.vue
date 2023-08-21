<script>

import Anims from '@/components/pedagogie/search/anims.vue'

export default {
  name: 'search_form',
  components: {Anims},
  data () {
    return {
      tags: [],
      data_ready: false,
      query: [],
      key: 0
    }
  },
  methods: {
    async get_tags () {
      let response = await fetch(`${this.$url_prefix}/pedagogie/get_tags_search`);
      return await response.json();
    }
  },
  watch: {
    query: function () {
      this.key++;
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
        <h1 class="subtitle text_color">Rechercher une animation</h1>
        <div class="box">
          <p class="subtitle">Mots-clés*</p>
          <div v-for="key in Object.keys(tags)" class="form_position">
            <p class="subtitle is-6">{{key}}</p>
            <div class="columns is-gapless is-multiline">
              <div v-for="tag in tags[key]" class="column is-2">
                <label :for="tag['id']">
                  <input type="checkbox" :value="tag['id']" :name="tag['code']" :id="tag['id']" v-model="query">
                  {{tag.label}}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Anims :key="key" :query="query"/>
  </div>
</template>
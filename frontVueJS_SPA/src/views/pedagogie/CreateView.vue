<script>

import Anim from '@/components/pedagogie/create/anim.vue'
import Seq from '@/components/pedagogie/create/seq.vue'
import Final from '@/components/pedagogie/create/finalization.vue'

export default {
  name: 'create_form',
  components: {Anim, Seq, Final},
  data () {
    return {
      rep: {},
      data: {
        titre: '',
        lieu: '',
        objectifs: '',
        _min: '',
        _max: '',
        pre_anim: '',
        preconisations: '',
        annulation: '',
        post_anim: '',
        public_specifique: '',
        tags: [],
        sequences: []
      },
      medias: [],
      redirect: '',
      end: false,
      global_values: {},
      data_ready: false
    }
  },
  methods: {
    async get_thes () {
      let response = await fetch(`${this.$url_prefix}/pedagogie/get_thes`);
      return await response.json();
    },
    async get_medias () {
      let response = await fetch(`${this.$url_prefix}/pedagogie/get_medias`);
      return await response.json();
    },
    async get_anim (id_anim) {
      let response = await fetch(`${this.$url_prefix}/pedagogie/get_anim?q=${id_anim}`);
      return await response.json();
    },
    add_seq () {
      this.data.sequences.push(
        {
          type_seq: {id:''},
          titre: '',
          description: '',
          approche: {id:''},
          modalite: {id:''},
          objectifs: '',
          duree: {id:''},
          materiel_div: '',
          materiel: []
        }
      );
    },
    remove_seq (idx) {
      this.data.sequences.splice(idx,1);
    },
    send_data (forlater) {
      this.data.statut = forlater ? 3 : 2;
      fetch(`${this.$url_prefix}/pedagogie/cr_or_up_anim`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(this.data)
      }).then(resp => {resp.text().then(data => {this.redirect = data; this.end = true;})});
    },
    set_global () {
      this.global_values = {
        'intro':this.find_id_by_code('ref.type_seq','intro'),
        'dvp':this.find_id_by_code('ref.type_seq','dvp'),
        'dvpopt':this.find_id_by_code('ref.type_seq','dvpopt'),
        'conclu':this.find_id_by_code('ref.type_seq','conclu'),
        'image':this.find_id_by_code('ref.type_media','image'),
        'photo':this.find_id_by_code('ref.type_media','photo'),
        'video':this.find_id_by_code('ref.type_media','video'),
        'bandeson':this.find_id_by_code('ref.type_media','bandeson'),
        'support':this.find_id_by_code('ref.type_media','support'),
        'conte':this.find_id_by_code('ref.type_media','conte')
      };
    },
    find_id_by_code (categorie, code) {
      for (let idx in this.rep[categorie]) {
        if (this.rep[categorie][idx]['code']==code) {
          return this.rep[categorie][idx]['id'];
        }
      }
    },
    update_tags () {
      for (let idx_tag in this.data.tags) {
        let refs = ['ref.theme', 'ref.saison', 'ref.public'];
        for (let idx_ref in refs) {
          let ref = refs[idx_ref];
          for (let idx_thes in this.rep[ref]) {
            if (this.rep[ref][idx_thes]['id']==this.data.tags[idx_tag]) {
              this.data.tags[idx_tag] = this.rep[ref][idx_thes];
            }
          }
        }
      }
    }
  },
  computed: {
    isfirst () {
      return this.data.sequences.length==0;
    },
    hasconclusion () {
      let bool;
      if (this.data.sequences.length==0) {
        bool = false;
      } else {
        bool = this.data.sequences[this.data.sequences.length-1].type_seq.id==this.global_values['conclu'];
      }

      if (!bool) {
        this.data.description = '';
        this.data.public_specifique = '';
        this.data.post_anim = '';
        this.data.tags = [];
      }

      return bool;
    },
    animcomplete () {
      return this.data.titre && this.data.lieu && this.data.objectifs && this.data._min && this.data._max;
    },
    dureetotale () {
      let duree = 0;
      for (const key in this.data.sequences) {
        const sequence = this.data.sequences[key];
        for (const key_duree in this.rep['ref.duree_seq']) {
          const duree_seq = this.rep['ref.duree_seq'][key_duree];
          if (duree_seq['id']==sequence.duree.id) {
            duree += parseInt(duree_seq['code']);
          }
        }
      }
      return duree;
    },
    firstseqisintro () {
      if (this.data.sequences.length!=0 && this.data.sequences[0].type_seq.id!='') {
        if (this.data.sequences[0].type_seq.id!=this.global_values['intro']) {
          alert('La première séquence doit être une introduction.');
          this.data.sequences[0].type_seq.id = this.global_values['intro'];
        }
        return true;
      }

    },
    allseqcomplete () {
      for (const key in this.data.sequences) {
        const sequence = this.data.sequences[key];
        if (!sequence.type_seq.id || !sequence.titre || !sequence.description || !sequence.approche.id || !sequence.modalite.id || !sequence.objectifs || !sequence.duree.id) {
          return false;
        }
      }
      return true;
    },
    finaliscomplete () {
      return this.data.tags.length!=0;
    },
    issend () {
      return this.end;
    }
  },
  async mounted () {
    this.rep = await this.get_thes();
    this.set_global();
    this.medias = await this.get_medias();
    this.medias.sort(function (a, b) {
      if (a.nom==b.nom) {
        return 0;
      } else {
        let compare = [a.nom.toLowerCase(), b.nom.toLowerCase()];
        compare.sort();
        return compare[0] == a.nom.toLowerCase() ? -1 : 1;
      }
    });
    if (this.$route.query.q) {
      this.data = await this.get_anim(this.$route.query.q);
    }
    this.data_ready = true;
  }
}

</script>

<template>
  <div v-if="data_ready">
    <div v-if="!issend" class="container large_form bottom_120">
      <div class="sticky_head">
        <p class="subtitle is-6">Durée totale de l'animation : {{dureetotale}} min</p>
      </div>
      <h1 class="subtitle text_color">Créer une animation</h1>
      <p class="text_color">Les champs marqués d'un astérisque (*) sont obligatoires.</p>
      <Anim :data="data"/>
      <div class="form_position">
        <div class="buttons spaced_buttons">
          <button v-if="isfirst && animcomplete" type="button" @click="add_seq" class="button">Première séquence</button>
          <button v-if="isfirst && animcomplete" type="button" class="button is-warning" @click="send_data(true)">Finir plus tard</button>
        </div>      
      </div>
      <Seq v-if="animcomplete" v-for="(sequence, idx) in data.sequences" :data="sequence" :key="idx" :idx="idx" :parties="rep['ref.type_seq']" :approches="rep['ref.approche']" :modalites="rep['ref.modalite']" :durees="rep['ref.duree_seq']" :medias="medias" :types_media="rep['ref.type_media']" :themes="rep['ref.theme']" :global_values="global_values" @remove-seq="remove_seq(idx)" @get-medias="get_medias()"/>
      <div class="form_position">
        <div class="buttons spaced_buttons">
          <button v-if="!isfirst && firstseqisintro && allseqcomplete" type="button" @click="add_seq" class="button"><span class="icon"><font-awesome-icon :icon="['fas', 'plus']" /></span></button>
          <button v-if="!isfirst && firstseqisintro && allseqcomplete && !hasconclusion" type="button" class="button is-warning" @click="send_data(true)">Finir plus tard</button>
          <i v-else></i>
        </div>
      </div>
      <Final v-if="hasconclusion && allseqcomplete" :data="data" :themes="rep['ref.theme']" :saisons="rep['ref.saison']" :publics="rep['ref.public']" @update-tags="update_tags()"/>
      <div class="form_position">
        <div class="buttons spaced_buttons">
          <button v-if="hasconclusion && animcomplete && allseqcomplete && finaliscomplete" type="button" class="button" @click="send_data(false)">Envoyer</button>
          <button v-if="hasconclusion && animcomplete && allseqcomplete && !finaliscomplete" type="button" class="button is-warning" @click="send_data(true)">Finir plus tard</button>
        </div>      
      </div>
    </div>
    <div v-else class="container form_position">
      <h1 class="title">Vous pouvez consulter <a :href="redirect">votre animation</a> !</h1>
    </div>
  </div>
</template>
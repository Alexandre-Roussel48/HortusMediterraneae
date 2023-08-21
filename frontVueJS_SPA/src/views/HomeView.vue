<script>
</script>

<template>
  <main>
    <div style="padding-top: 15%;">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <a href="/contact">
            <h1 class="title is-1 jasmine">Hortus Mediterraneae</h1>
            <h2 class="subtitle is-4 jasmine">Le référentiel du Domaine du Rayol</h2>
          </a>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="field">
            <p class="control has-icons-right">
              <input class="input is-large is-rounded" type="text" placeholder="Nom d'une plante, d'une parcelle, etc...">
              <span class="icon is-small is-right">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="top_50 bottom_20">
        <div class="columns is-vcentered">
          <div class="column is-half is-offset-one-quarter stats_box"></div>
        </div>
      </div>
      <div class="columns is-vcentered">
        <div class="column is-three-quarters"></div>
        <div class="column is-one-quarter text_break terms_box">
          <p>Termes et conditions,</p>
          <p>Copyright © Domaine du Rayol, 2023</p>
        </div>
      </div>
    </div>
  </main>
</template>
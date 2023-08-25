<script>
</script>

<template>
  <main>
    <div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter header_nav">
          <div class="columns is-gapless centered_columns">
            <div class="column is-half">
              <RouterLink to="/medias/create" class="subtitle is-6 crapeau">Importer un média</RouterLink>
            </div>
            <div class="column is-half">
              <RouterLink to="/medias/search" class="subtitle is-6 crapeau">Chercher un média</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <RouterView :key="$route.fullPath"/>
    </div>
  </main>
</template>
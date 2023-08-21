<script>
</script>

<template>
  <main>
    <div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter header_nav">
          <div class="columns is-gapless centered_columns">
            <div class="column is-half">
              <RouterLink to="/especes/create">Créer une fiche espèce</RouterLink>
            </div>
            <div class="column is-half">
              <RouterLink to="/especes/search">Chercher une espèce</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <RouterView :key="$route.fullPath"/>
    </div>
  </main>
</template>
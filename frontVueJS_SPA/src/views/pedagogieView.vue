<script>
</script>

<template>
  <main>
    <div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter header_nav">
          <div class="columns is-gapless centered_columns">
            <div class="column is-half">
              <RouterLink to="/pedagogie/create">Créer une animation</RouterLink>
            </div>
            <div class="column is-half">
              <RouterLink to="/pedagogie/search">Chercher une animation</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <RouterView :key="$route.fullPath"/>
    </div>
  </main>
</template>
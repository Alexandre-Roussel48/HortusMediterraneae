<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="header_fixed">
      <div class="columns">
        <div class="column is-2 header_logo">
          <a href="https://www.domainedurayol.org/">
            <img src="@/assets/logo_rayol.png">
          </a>
        </div>
        <div class="column is-8 header_nav">
          <div class="columns is-gapless centered_columns">
            <div class="column is-2"></div>
            <div class="column is-2">
              <RouterLink to="/">Accueil</RouterLink>
            </div>
            <div class="column is-2">
              <RouterLink to="/especes">Espèces</RouterLink>
            </div>
            <div class="column is-2">
              <RouterLink to="/medias">Médias</RouterLink>
            </div>
            <div class="column is-2">
              <RouterLink to="/pedagogie">Pédagogie</RouterLink>
            </div>
            <div class="column is-2"></div>
          </div>
        </div>
        <div class="column is-2 header_logo">
          <a href="https://www.conservatoire-du-littoral.fr/">
            <img src="@/assets/logo_conservatoire.png">
          </a>
        </div>
      </div>
    </nav>
    <img src="@/assets/background.jpg" class="background_fixed">
    <div style="padding-top: 120px;"></div>
  </header>

  <RouterView />
</template>
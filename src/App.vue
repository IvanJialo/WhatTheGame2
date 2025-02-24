<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footers from './components/Footer.vue';
import BackToTop from './components/BackToTopButton.vue';
import './assets/backgroundballs.js';
</script>

<template>
  <div class="cuelpo">
    <Navbar />
    <RouterView />
    <BackToTop class="animate-blurred-fade-in"/>
    <Footers />
  </div>
</template>

<style>
.cuelpo {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100vh;
}
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
</style>
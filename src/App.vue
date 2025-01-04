<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footers from './components/Footer.vue';
import BackToTop from './components/BackToTopButton.vue';
</script>

<template>
  <div class="cuelpo">
    <Navbar />
    <RouterView />
    <BackToTop />
    <Footers />
  </div>
</template>

<style>
.cuelpo {
  display: grid;
  grid-template-rows: 2000px auto;
  height: 100vh;
}
</style>
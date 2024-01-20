<script setup>
  import headerv from './components/headerv.vue';
  import footerv from './components/footer.vue';

</script>

<template>
  
  <headerv></headerv>
  
  <main>
    <router-view></router-view>
  </main>
  
  <footerv></footerv>
</template>
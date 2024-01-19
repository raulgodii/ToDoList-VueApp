<script setup>
  import headerv from './components/headerv.vue';
  import footerv from './components/footer.vue';

</script>

<template>
  
  <headerv></headerv>
  
  <router-view></router-view>

  <footerv></footerv>
</template>
<template>
  <NavbarMenu />
  <RouterView />
</template>

<script>
import NavbarMenu from '@/components/NavbarMenu.vue'

export default {
  name: 'App',
  components: {
    NavbarMenu,
  },
}
</script>

<style>
body {
  background-color: #f2f2f2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 600px;
  margin: 0 auto;
}
</style>

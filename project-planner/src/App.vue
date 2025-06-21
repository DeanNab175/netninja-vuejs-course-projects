<template>
  <ProfileBar />
  <main class="main-content">
    <div v-if="user">
      <NavbarMenu />
    </div>
    <RouterView />
  </main>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import NavbarMenu from '@/components/NavbarMenu.vue'
import ProfileBar from '@/components/ProfileBar.vue'

export default {
  name: 'App',
  components: {
    NavbarMenu,
    ProfileBar,
  },
  computed: {
    ...mapState(useUserStore, ['user']),
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
  min-height: 100vh;
}
.main-content {
  max-width: 600px;
  margin: 2rem auto 0;
}
</style>

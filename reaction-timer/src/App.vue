<template>
  <h1>Ninja Reaction Timer.</h1>
  <button @click="start">Play</button>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      isPlaying: false,
      delay: 0,
    }
  },
  methods: {
    start() {
      this.delay = 2000 + Math.random() * 5000
      this.isPlaying = true
    },
  },
}
</script>

<style scoped></style>

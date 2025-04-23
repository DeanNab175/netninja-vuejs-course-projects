<template>
  <div v-if="job">
    <h1>{{ job.title }}</h1>
    <!-- <p>The job id is {{ $route.params.id }}</p> -->
    <p>The job id is {{ id }}</p>
    <p>{{ job.details }}</p>
  </div>
  <div v-else><p>Loading job details...</p></div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      // id: this.$route.params.id,
      job: null,
      endpointBaseUrl: "http://localhost:8000",
    };
  },
  methods: {
    async fetchJob() {
      try {
        const res = await fetch(`${this.endpointBaseUrl}/jobs/${this.id}`);
        const data = await res.json();
        this.job = data;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  mounted() {
    this.fetchJob();
  },
};
</script>

<style></style>

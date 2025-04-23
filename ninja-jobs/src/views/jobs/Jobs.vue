<template>
  <h1>Jobs</h1>
  <div v-if="jobs.length">
    <div v-for="job in jobs" :key="job.id" class="job">
      <RouterLink :to="{ name: 'job-details', params: { id: job.id } }">
        <h2>{{ job.title }}</h2>
      </RouterLink>
    </div>
  </div>
  <div v-else>
    <p>Loading jobs...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
      endpointBaseUrl: "http://localhost:8000",
    };
  },
  methods: {
    async fetchJobs() {
      try {
        const res = await fetch(`${this.endpointBaseUrl}/jobs`);
        const data = await res.json();
        this.jobs = data;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  mounted() {
    // fetch(`${this.endpointBaseUrl}/jobs`)
    //   .then((res) => res.json())
    //   .then((data) => (this.jobs = data))
    //   .catch((err) => console.log(err.message));
    this.fetchJobs();
  },
};
</script>

<style>
.job h2 {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  margin: 10px auto;
  max-width: 600px;
  cursor: pointer;
  color: #444;
}
.job h2:hover {
  background: #ddd;
}
.job a {
  text-decoration: none;
}
</style>

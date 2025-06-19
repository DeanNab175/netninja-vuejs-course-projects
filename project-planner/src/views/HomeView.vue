<template>
  <main>
    <FilterNav @filterChange="handleFilterChange" :currentFilter="currentFilter" />
    <div v-if="filteredProjects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject :project="project" @delete="handleDelete" @complete="handleComplete" />
      </div>
    </div>
  </main>
</template>

<script>
import SingleProject from '@/components/SingleProject.vue'
import FilterNav from '@/components/FilterNav.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      projects: [],
      currentFilter: 'all',
    }
  },
  components: {
    SingleProject,
    FilterNav,
  },
  mounted() {
    fetch('http://localhost:8000/projects')
      .then((response) => response.json())
      .then((data) => {
        this.projects = data
      })
  },
  methods: {
    handleDelete(id) {
      this.projects = this.projects.filter((project) => project.id !== id)
    },
    handleComplete(id) {
      const project = this.projects.find((p) => p.id === id)
      if (project) {
        project.complete = !project.complete
      }
    },
    handleFilterChange(filter) {
      this.currentFilter = filter
    },
  },
  computed: {
    filteredProjects() {
      const filter = this.currentFilter

      switch (filter) {
        case 'completed':
          return this.projects.filter((project) => project.complete)
        case 'ongoing':
          return this.projects.filter((project) => !project.complete)
        default:
          return this.projects
      }
    },
  },
}
</script>

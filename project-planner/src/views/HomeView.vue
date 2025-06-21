<template>
  <main>
    <FilterNav @filterChange="handleFilterChange" :currentFilter="currentFilter" />
    <div v-if="isLoading">Loading...</div>

    <div v-else-if="filteredProjects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject :project="project" @delete="handleDelete" @complete="handleComplete" />
      </div>
    </div>

    <div v-else><p>No projects found.</p></div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { supabase } from '@/lib/supabaseClient'
import SingleProject from '@/components/SingleProject.vue'
import FilterNav from '@/components/FilterNav.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      projects: [],
      currentFilter: 'all',
      isLoading: false,
    }
  },
  components: {
    SingleProject,
    FilterNav,
  },
  async mounted() {
    this.projects = await this.fetchProjects()
  },
  methods: {
    ...mapActions(useUserStore, ['clearUser']),
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
    async fetchProjects() {
      try {
        this.isLoading = true
        const { data } = await supabase.from('projects').select('*').eq('user_id', this.user.id)
        return data
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ['user']),
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

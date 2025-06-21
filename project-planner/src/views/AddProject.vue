<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" v-model="title" required />
    <label>Details</label>
    <textarea v-model="details" required></textarea>
    <button type="submit" :disabled="isLoading">
      <span v-if="isLoading">Loading...</span>
      <span v-else>Add Project</span>
    </button>
  </form>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { supabase } from '@/lib/supabaseClient'

export default {
  data() {
    return {
      title: '',
      details: '',
      isLoading: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    async handleSubmit() {
      const project = {
        title: this.title,
        details: this.details,
        complete: false,
        user_id: this.user.id,
      }

      await this.addProject(project)
      this.$router.push({ name: 'Home' })
    },
    async addProject(projectData) {
      try {
        this.isLoading = true
        const { data } = await supabase.from('projects').insert(projectData)
        return data
      } catch (error) {
        console.error('Error adding project:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

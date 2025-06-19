<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" v-model="title" required />
    <label>Details</label>
    <textarea v-model="details" required></textarea>
    <button>Update Project</button>
  </form>
</template>

<script>
export default {
  name: 'EditProject',
  props: ['id'],
  data() {
    return {
      title: '',
      details: '',
      uri: `http://localhost:8000/projects/${this.id}`,
    }
  },
  mounted() {
    fetch(this.uri)
      .then((response) => response.json())
      .then((data) => {
        this.title = data.title
        this.details = data.details
      })
      .catch((error) => {
        console.error('Error fetching project:', error)
      })
  },
  methods: {
    handleSubmit() {
      const projectData = {
        title: this.title,
        details: this.details,
      }

      fetch(this.uri, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch((error) => {
          console.error('Error updating project:', error)
        })
    },
  },
}
</script>

<template>
  <nav class="filter-nav">
    <button @click="updateFilter('all')" :class="{ active: currentFilter === 'all' }">
      View all
    </button>
    <button @click="updateFilter('completed')" :class="{ active: currentFilter === 'completed' }">
      Completed
    </button>
    <button @click="updateFilter('ongoing')" :class="{ active: currentFilter === 'ongoing' }">
      Ongoing
    </button>
  </nav>
</template>

<script>
export default {
  props: ['currentFilter'],
  methods: {
    updateFilter(by) {
      this.$emit('filterChange', by)
    },
  },
}
</script>

<style>
.filter-nav button {
  background: none;
  border: none;
  color: #bbb;
  outline: none;
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
}
.filter-nav button.active {
  color: #555;
}
</style>

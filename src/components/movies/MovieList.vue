<script setup>
import MovieTile from './MovieTile.vue'

defineProps({
  movies:{
    default: [],
    required: true
  }
})

</script>

<template>
  <ul class="flex flex-wrap">
    <movie-tile v-for="movie in movies" :movie="movie"></movie-tile>
  </ul>
</template>
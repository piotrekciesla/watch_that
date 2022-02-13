<script setup>
import MovieTile from "./MovieTile.vue";

defineProps({
  movies: {
    default: [],
    required: true,
  },
});
</script>

<template>
  <TransitionGroup class="flex flex-wrap" name="list" tag="ul">
    <movie-tile
      :key="movie.id"
      v-for="movie in movies"
      :movie="movie"
    ></movie-tile>
  </TransitionGroup>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in;
  position: relative;
  z-index: 1;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
  z-index: -1;
}
</style>

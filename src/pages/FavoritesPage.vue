<script setup lang="ts">
import MovieList from "./../components/movies/MovieList.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

store.dispatch("fetchFavorites");
const movies = computed(() => store.getters.userFavoritesList);
</script>
<template>
  <div>
    <h1 class="m-4 text-center text-3xl">This are your favorite movies</h1>
    <MovieList :movies="movies"></MovieList>
  </div>
</template>

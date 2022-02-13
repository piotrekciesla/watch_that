<script setup lang="ts">
  import MovieList from "./../components/movies/MovieList.vue";
  import {useStore} from "vuex";
  import {computed} from "vue";

  const store = useStore();

  store.dispatch('fetchFavorites');
  const movies = computed( () => store.getters.userFavoritesList)

</script>
<template>
  <div>
    <h1 class="text-3xl text-center m-4">This are your favorite movies</h1>
    <MovieList :movies="movies"></MovieList>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

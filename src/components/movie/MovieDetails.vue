<script lang="ts" setup>
import { useStore } from "vuex";
import Cast from "./Cast.vue";
import { computed, watch } from "vue";
import MoviePoster from "./../shared/MoviePoster.vue";
import MyButton from "./../shared/MyButton.vue";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const movie = computed(() => store.getters.movie);
const route = useRoute();
const router = useRouter();
const addMovieToFavorites = () =>
  store.dispatch("addMovieToFavorites", movie.value.details);
const removeMovieFromFavorites = () =>
  store.dispatch("removeMovieFromFavorites", movie.value.details);

const account = computed(() => store.getters.account);

watch(movie, (value) => {
  if (
    value &&
    route.params.movieTitle !=
      encodeURI(value?.details.title.replaceAll(" ", "-"))
  ) {
    router.replace({
      name: "details",
      params: {
        movieId: route.params.movieId,
        movieTitle: encodeURI(value?.details.title.replaceAll(" ", "-")),
      },
    });
  }
});
</script>

<template>
  <div v-if="movie">
    <MoviePoster
      class="mx-auto w-64"
      :src="movie.details.poster_path"
      :title="movie.details.title"
    />
    <h1 class="text-center text-3xl font-bold">{{ movie.details.title }}</h1>
    <p class="text-center">{{ movie.details.vote_average }} / 10</p>
    <div class="m-4 text-center">
      <my-button v-if="account" @click="addMovieToFavorites"
        >Add to Favorite</my-button
      >
      <my-button v-if="account" @click="removeMovieFromFavorites"
        >Remove from Favorite</my-button
      >
    </div>
    <p>{{ movie.details.overview }}</p>
    <Cast v-if="movie" :cast="movie.credits.cast" />
  </div>
</template>

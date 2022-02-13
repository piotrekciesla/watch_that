<script setup>
import { RouterLink } from "vue-router";
import MoviePoster from "./../shared/MoviePoster.vue";

defineProps({
  movie: Object,
});
</script>

<template>
  <li class="relative w-32 grow sm:w-56">
    <MoviePoster class="w-full" :src="movie.poster_path" :title="movie.title" />
    <RouterLink
      :to="{
        name: 'details',
        params: {
          movieId: movie.id,
          movieTitle: encodeURI(movie.title.replaceAll(' ', '-')),
        },
      }"
      class="absolute bottom-0 right-0 top-0 left-0 block block flex items-center justify-center p-2 text-white opacity-0 backdrop-blur backdrop-brightness-50 hover:opacity-100 active:opacity-100"
    >
      <div class="inline-block">
        <h4 class="text-center text-xl font-bold">{{ movie.title }}</h4>
        <h5 class="text-l text-center font-medium">
          ({{ movie.release_date.split("-")[0] }})
        </h5>
        <p class="text-center">see details</p>
      </div>
    </RouterLink>
    <div
      class="absolute bottom-0.5 right-0.5 block rounded-lg p-2 text-amber-300 backdrop-blur backdrop-brightness-50"
    >
      <span style="text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.55)"
        >{{ movie.vote_average }} / 10</span
      >
    </div>
  </li>
</template>

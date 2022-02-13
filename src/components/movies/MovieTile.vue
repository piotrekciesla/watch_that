<script setup>
import { RouterLink } from 'vue-router'
import MoviePoster from './../shared/MoviePoster.vue'

defineProps({
  movie: Object
})
</script>

<template>
  <li class="grow w-64 relative">
    <MoviePoster :src="movie.poster_path" :title="movie.title"/>
    <RouterLink :to="{name: 'details', params:{movieId: movie.id, movieTitle: encodeURI(movie.title.replaceAll(' ','-'))}}"
                class="opacity-0 hover:opacity-100 absolute text-white bottom-0 right-0 top-0 left-0 block backdrop-blur p-2 block	backdrop-brightness-50 flex justify-center items-center" >
      <div class="inline-block">
        <h4 class="text-center text-xl font-bold">{{movie.title}}</h4>
        <h5 class="text-center text-l font-medium">({{movie.release_date.split('-')[0]}})</h5>
        <p class="text-center">see details</p>
      </div>
    </RouterLink>
    <div class="absolute text-amber-300 bottom-0.5 right-0.5 backdrop-blur p-2 block rounded-lg	backdrop-brightness-50" >
      <span style="text-shadow: 2px 2px 2px rgba(0,0,0,0.55);">{{movie.vote_average}} / 10</span>
    </div>
  </li>
</template>
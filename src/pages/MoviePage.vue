<template>
    <movie-details/>
</template>

<script setup>
import {useStore} from "vuex";
import {onBeforeRouteLeave, useRoute} from "vue-router";
import MovieDetails from "./../components/movie/MovieDetails.vue"

const store = useStore();
const route = useRoute()
const movieId = route.params.movieId;

store.dispatch('fetchMovie',movieId)

onBeforeRouteLeave(()=>store.dispatch('clearMovie'))

</script>

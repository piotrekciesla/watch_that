<template>
    <MovieList :movies="movies"/>
</template>

<script setup>
import {useStore} from "vuex";
import MovieList from '@/components/movies/MovieList.vue'
import {computed} from "vue";

const store = useStore();
store.dispatch('fetchMovies')

const movies = computed( () => store.getters.movies())

</script>

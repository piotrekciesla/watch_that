<script setup lang="ts">
import {ref} from "vue";
import {useStore} from "vuex";
import {debounce} from "./../helpers/debounce";


const phrase = ref<string>()
const store = useStore();

const search = debounce(()=>store.dispatch('searchMovies', phrase.value), 500)

</script>

<template>
  <input
      class="text-white w-full text-center bg-transparent border-white border-2 p-1 m-1 rounded-2xl"
      placeholder="type movie title you wold like to watch"
      type="text"
      @input="search"
      v-model="phrase"
  >
</template>
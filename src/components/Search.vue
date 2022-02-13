<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { debounce } from "./../helpers/debounce";

const phrase = ref<string>();
const store = useStore();

const search = debounce(async () => {
  await store.dispatch("searchMovies", phrase.value);
  window.scrollTo({ top: 0, behavior: "smooth" });
}, 500);
</script>

<template>
  <h3 class="text-center">Watch that! 👇</h3>
  <input
    class="neumorph-shaddow light:border-2 light:border-white light:bg-neutral-200 m-2 w-full rounded-2xl p-1 text-center focus-visible:border-0 focus-visible:outline-green-400 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-300"
    placeholder="search"
    type="text"
    @input="search"
    v-model="phrase"
  />
</template>

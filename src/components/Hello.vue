<script setup lang="ts">
import Search from "./../components/Search.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
defineProps<{
  msg: string;
}>();

const route = useRoute();
const showSearch = computed(() => route.name == "home");
</script>

<template>
  <div class="greetings">
    <h1
      class="mb-5 text-center font-bold leading-tight text-neutral-600 md:text-left"
    >
      <div
        class="select-none text-center text-5xl font-extrabold tracking-wider text-green-400"
      >
        Good Movie
      </div>
      <div class="select-none text-center font-extrabold tracking-widest">
        To
      </div>
      <div class="select-none text-center text-4xl font-extrabold">
        Watch Tonight
      </div>
    </h1>
    <h2 class="mb-4 text-center text-xl text-green-400">{{ msg }}</h2>
    <div>
      <Search v-if="showSearch" />
    </div>
  </div>
</template>

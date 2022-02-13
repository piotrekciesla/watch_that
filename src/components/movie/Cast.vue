<script lang="ts" setup="">
import { computed, ref } from "vue";
import MyButton from "./../shared/MyButton.vue";

const props = defineProps(["cast"]);
const castLimit = ref(true);
const castToShow = computed(() =>
  castLimit.value ? props.cast.slice(0, 6) : props.cast
);
</script>

<template>
  <div>
    <h3 class="text-xl">Cast:</h3>
    <ul class="flex flex-wrap items-stretch justify-around">
      <li v-for="actor in castToShow" class="m-4">
        <div
          class="neumorph-shaddow flex h-full w-40 flex-col flex-wrap items-center items-stretch overflow-hidden rounded-2xl text-center backdrop-brightness-110"
        >
          <img
            class="w-full"
            :src="
              'https://image.tmdb.org/t/p/w138_and_h175_face' +
              actor.profile_path
            "
            :alt="actor.name"
          />
          <div class="p-2">
            <div class="font-bold">{{ actor.name }}</div>
            <div>{{ actor.character }}</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="text-center">
      <my-button class="m-4 backdrop-blur-md" @click="castLimit = !castLimit"
        >show {{ castLimit ? "more" : "less" }}</my-button
      >
    </div>
  </div>
</template>

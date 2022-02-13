<script lang="ts" setup="">
import { computed, ref } from "vue";
import MyButton from "./../shared/MyButton.vue";

const props = defineProps(["cast"]);
const castLimit = ref(true);
const castToShow = computed(() =>
  castLimit.value ? props.cast.slice(0, 6) : props.cast
);
const toggleCast = () => (castLimit.value = !castLimit.value);
</script>

<template>
  <div>
    <h3 class="text-xl" id="cast">Cast:</h3>
    <TransitionGroup
      class="flex flex-wrap items-stretch justify-around"
      name="list"
      tag="ul"
    >
      <li :key="actor.id" v-for="actor in castToShow" class="m-4">
        <div
          class="neumorph-shaddow bg-theme flex h-full w-40 flex-col flex-wrap items-center items-stretch overflow-hidden rounded-2xl text-center backdrop-brightness-110"
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
    </TransitionGroup>
    <div class="text-center">
      <my-button class="m-4 backdrop-blur-md" @click="toggleCast"
        >show {{ castLimit ? "more" : "less" }}</my-button
      >
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<script  lang="ts" setup="">
import {computed, ref} from "vue";

    const {cast} = defineProps(['cast']);
    const castLimit = ref(true);
    const castToShow = computed(() => castLimit.value ? cast.slice(0,6) : cast);
</script>

<template>
 <div>
   <h3 class="text-xl">Cast:</h3>
    <ul class="flex flex-wrap items-stretch justify-around">
      <li v-for="actor in castToShow" class="m-4">
        <div class="h-full rounded-2xl flex flex-wrap items-stretch flex-col backdrop-brightness-110 neumorph-shaddow text-center overflow-hidden items-center w-40">
          <img class="w-full" :src="'https://image.tmdb.org/t/p/w138_and_h175_face'+actor.profile_path" :alt="actor.name">
          <div class="p-2">
            <div class="font-bold">{{ actor.name }}</div>
            <div>{{ actor.character }}</div>
          </div>
        </div>
      </li>
    </ul>
   <div class="text-center">
    <button class="m-4" @click="castLimit=!castLimit">show {{ castLimit ? 'more' : 'less' }}</button>
   </div>
 </div>
</template>


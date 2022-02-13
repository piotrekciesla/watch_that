<script lang="ts" setup>
defineProps<{
  src: string;
  title: string;
}>();
</script>

<template>
  <img :src="'https://image.tmdb.org/t/p/w500' + src" :alt="title" />
</template>

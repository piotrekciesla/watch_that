<script setup lang="ts">
import MyButton from "./../components/shared/MyButton.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const logoutAction = async () => {
  const { success } = await store.dispatch("logOut");
  if (!success) {
    return;
  }
  router.push({ name: "home" });
};

const account = computed(() => store.getters.account);
</script>
<template>
  <div class="flex items-center justify-center">
    <div class="p-5 text-center">
      <p><strong>username</strong>: {{ account.username }}</p>
      <p><strong>name</strong>: {{ account.name }}</p>
      <my-button class="mt-2" @click="logoutAction">logout</my-button>
    </div>
    `
  </div>
</template>

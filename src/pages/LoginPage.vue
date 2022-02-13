<script setup lang="ts">
import MyButton from "./../components/shared/MyButton.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const loginAction = async () => {
  const { success } = await store.dispatch("loginWithUserNamePassword", {
    username: username.value,
    password: password.value,
  });
  if (!success) {
    alert("Wrong user name or password");
    return;
  }
  router.push({ name: "home" });
};

const username = ref("");
const password = ref("");
</script>
<template>
  <div class="flex-col">
    <label for="username">User name</label>
    <input
      id="username"
      placeholder="User name"
      class="light:bg-white mb-4 mt-2 w-full rounded-xl border-2 bg-transparent p-2 dark:bg-neutral-800 dark:text-white"
      type="text"
      v-model="username"
    />
    <label for="password">Password</label>
    <input
      id="password"
      placeholder="Password"
      class="light:bg-white mb-4 mt-2 w-full rounded-xl border-2 bg-transparent p-2 dark:bg-neutral-800 dark:text-white"
      type="password"
      v-model="password"
    />
    <my-button @click="loginAction">Login</my-button>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Hello from "./components/Hello.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

store.dispatch("fetchAccountData");

const account = computed(() => store.getters.account);
</script>

<template>
  <header class="top-0 lg:sticky xl:sticky">
    <!--    <logo class="logo" />-->
    <div class="wrapper justify-center">
      <Hello :msg="`HEY ${account?.name || account?.username || 'You'}!`" />
      <nav class="mb-4 text-center">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="account" to="/favorites">Favorites</RouterLink>
        <RouterLink v-if="account" to="/account">Account</RouterLink>
        <RouterLink v-if="!account" to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <footer class="mt-20 rounded-xl p-3 text-center backdrop-blur-md">
    <p class="mb-4 font-bold">Watch that is powered by</p>
    <a class="hover:cursor-pointer" href="https://www.themoviedb.org"
      ><img
        class="hover:cursor-pointer"
        src="/src/assets/tmdbLogo.svg"
        alt="tmdbLogo"
    /></a>
  </footer>
</template>

<style>
@import "@/assets/base.scss";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

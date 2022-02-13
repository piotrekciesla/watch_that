import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import MoviePage from "../pages/MoviePage.vue";
import LoginPage from "../pages/LoginPage.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../pages/AccountPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/movie/:movieId/:movieTitle?",
      name: "details",
      component: MoviePage,
    },
    {
      path: "/favorites",
      name: "favorites",
      meta: {
        requiresAuth: true,
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/FavoritesPage.vue"),
    },
  ],
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !sessionStorage.getItem("session_id")) {
    return {
      name: "home",
    };
  }
});

export default router;

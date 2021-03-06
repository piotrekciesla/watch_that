import type { Module } from "vuex";
import type { RootState } from "./index";
import {
  createSessionWithLoginPassword,
  logout,
} from "./../dataProvider/authDataProvider";
import {
  getAccountData,
  getFavorites,
  toggleFavoriteMovie,
} from "./../dataProvider/accountDataProvider";
import type { AccountDetails } from "./../dataProvider/AccountDetails";
import type { Movie as MovieListItem } from "./../dataProvider/MovieList";
import type { Movie } from "./../dataProvider/Movie";

interface State {
  userData: AccountDetails | null;
  userFavoritesList: MovieListItem[] | null;
}

export const account: Module<State, RootState> = {
  state(): State {
    return {
      userData: null,
      userFavoritesList: null,
    };
  },
  mutations: {
    setUserData(state: State, account) {
      state.userData = account;
    },
    setUserFavoritesList(state: State, userFavoritesList) {
      state.userFavoritesList = userFavoritesList;
    },
  },
  getters: {
    account: ({ userData }: State) => userData,
    userFavoritesList: ({ userFavoritesList }: State) => userFavoritesList,
  },
  actions: {
    async fetchAccountData({ commit }) {
      const accountData = await getAccountData();
      commit("setUserData", accountData);
    },
    async loginWithUserNamePassword({ dispatch }, payload) {
      try {
        await createSessionWithLoginPassword(
          payload.username,
          payload.password
        );
        await dispatch("fetchAccountData");
        return { success: true };
      } catch (e) {
        return { success: false };
      }
    },
    async logOut({ commit }) {
      try {
        await logout();
        commit("setUserFavoritesList", null);
        commit("setUserData", null);
        return { success: true };
      } catch (e) {
        return { success: false };
      }
    },
    async fetchFavorites({ commit, dispatch, state }) {
      if (null === state.userData) {
        await dispatch("fetchAccountData");
        dispatch("fetchFavorites");
        return;
      }

      const { results } = await getFavorites(state.userData.id);
      commit("setUserFavoritesList", results);
    },
    async addMovieToFavorites({ dispatch, state }, movie: Movie) {
      if (null === state.userData) {
        await dispatch("fetchAccountData");
        dispatch("addMovieToFavorites");
        return;
      }

      await toggleFavoriteMovie(state.userData.id, movie.id, true);
    },
    async removeMovieFromFavorites({ dispatch, state }, movie: Movie) {
      if (null === state.userData) {
        await dispatch("fetchAccountData");
        dispatch("removeMovieFromFavorites");
        return;
      }

      await toggleFavoriteMovie(state.userData.id, movie.id, false);
    },
  },
};

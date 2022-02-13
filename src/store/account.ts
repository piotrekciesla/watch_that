import type { Module } from "vuex";
import type { RootState } from "./index";
import {
  createSession,
  login,
  type RequestToken,
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
    loadAccount(state: State, account) {
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
      const requestToken = localStorage.getItem("request_token");
      if (!requestToken) {
        return;
      }
      const request_token: RequestToken = JSON.parse(requestToken);

      const session_id = sessionStorage.getItem("session_id");

      if (!session_id) {
        await createSession(request_token);
      }

      const accountData = await getAccountData();
      commit("loadAccount", accountData);
    },
    async getRequestToken() {
      await login();
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

      const response = await toggleFavoriteMovie(
        state.userData.id,
        movie.id,
        true
      );
    },
    async removeMovieFromFavorites({ dispatch, state }, movie: Movie) {
      if (null === state.userData) {
        await dispatch("fetchAccountData");
        dispatch("removeMovieFromFavorites");
        return;
      }

      console.log(movie);

      const response = await toggleFavoriteMovie(
        state.userData.id,
        movie.id,
        false
      );
    },
  },
};

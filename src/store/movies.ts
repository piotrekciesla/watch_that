import {
  getMovie,
  getMovieCredits,
  getMovies,
  searchForMovie,
} from "./../dataProvider/movieDataProvider";
import type { Module } from "vuex";
import type { RootState } from "./index";
import type { Movie } from "../dataProvider/Movie";
import type { Movie as MovieListItem } from "../dataProvider/MovieList";
import type { Credits } from "../dataProvider/Credits";

interface MovieDetailsPage {
  details: Movie;
  credits: Credits;
}

interface State {
  movies: MovieListItem[];
  movie: MovieDetailsPage | null;
}

export const movies: Module<State, RootState> = {
  state(): State {
    return {
      movies: [],
      movie: null,
    };
  },
  mutations: {
    loadMovies(state, movies) {
      state.movies = movies;
    },
    loadMovie(state, data) {
      state.movie = data;
    },
  },
  getters: {
    movies:
      (state) =>
      (phrase = "") => {
        return state.movies.filter((movie) => movie.title.includes(phrase));
      },
    movie: (state) => {
      return state.movie;
    },
  },
  actions: {
    async fetchMovies({ commit }, params) {
      const response = await getMovies(params);
      commit("loadMovies", response.results);
    },
    async searchMovies({ commit, dispatch }, query) {
      if (!query) {
        dispatch("fetchMovies");
        return;
      }
      const response = await searchForMovie(query);
      commit("loadMovies", response.results);
    },
    async fetchMovie({ commit }, movieId) {
      const [responseMovie, responseCredits] = await Promise.all([
        getMovie(movieId),
        getMovieCredits(movieId),
      ]);
      commit("loadMovie", { details: responseMovie, credits: responseCredits });
    },
    async clearMovie({ commit }) {
      commit("loadMovie", null);
    },
  },
};

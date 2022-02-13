import axiosInstance from "./axiosInstance";
import type { MovieList } from "./MovieList";
import type { Movie } from "./Movie";
import type { Credits } from "./Credits";

export const getMovies = async (page = 1): Promise<MovieList> =>
  (await axiosInstance.get("discover/movie", { params: { page } })).data;

export const searchForMovie = async (
  query: string,
  page = 1
): Promise<MovieList> =>
  (
    await axiosInstance.get("/search/movie", {
      params: {
        page,
        query,
      },
    })
  ).data;

export const getMovie = async (movieId: number): Promise<Movie> =>
  (await axiosInstance.get(`/movie/${movieId}`)).data;
export const getMovieCredits = async (movieId: number): Promise<Credits> =>
  (await axiosInstance.get(`/movie/${movieId}/credits`)).data;

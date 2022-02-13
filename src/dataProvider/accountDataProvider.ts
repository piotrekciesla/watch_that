import axiosInstance from "./axiosInstance";
import type { AccountDetails } from "./AccountDetails";
import type { MovieList } from "./MovieList";

export const getAccountData = async (): Promise<AccountDetails> => {
  const session_id = sessionStorage.getItem("session_id");
  return (await axiosInstance.get("/account", { params: { session_id } })).data;
};

export const getFavorites = async (account_id: number): Promise<MovieList> => {
  const session_id = sessionStorage.getItem("session_id");
  return (
    await axiosInstance.get(`/account/${account_id}/favorite/movies`, {
      params: { session_id },
    })
  ).data;
};

export const toggleFavoriteMovie = async (
  account_id: number,
  movieId: number,
  favorite: boolean
): Promise<void> => {
  const session_id = sessionStorage.getItem("session_id");
   (
    await axiosInstance.post(
      `/account/${account_id}/favorite`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: favorite,
      },
      { params: { session_id } }
    )
  ).data;
};

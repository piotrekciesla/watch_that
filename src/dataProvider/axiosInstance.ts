import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    authorization: `bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

export default axiosInstance;

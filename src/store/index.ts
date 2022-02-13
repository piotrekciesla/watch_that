import { createStore } from "vuex";
import { movies } from "./movies";
import { account } from "./account";

export interface RootState {}

const store = createStore<RootState>({
  modules: {
    movies,
    account,
  },
});

export default store;

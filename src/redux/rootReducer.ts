import baseApi from "./baseApi";
import navbarReducer from "./features/navbarSlice";

const reducer = {
  navToggle: navbarReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
export default reducer;

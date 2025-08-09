import baseApi from "./baseApi";
import aftTokenReducer from "./features/aftToken/aftTokenSlice";
import challengeConfigReducer from "./features/challenge/challengeConfigSlice";
import modalReducer from "./features/modal/modalSlice";
import navbarReducer from "./features/navbarSlice";

const reducer = {
  challengeConfig: challengeConfigReducer,
  navToggle: navbarReducer,
  registerModal: modalReducer,
  aftToken: aftTokenReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
export default reducer;

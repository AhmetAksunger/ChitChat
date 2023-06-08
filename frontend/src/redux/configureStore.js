import { legacy_createStore as createStore } from "redux";
import authReducer from "./authReducer";

const store = createStore(authReducer);

export default store;

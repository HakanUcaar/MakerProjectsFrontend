import { createStore } from "redux";
import rootReducer from "./KeyButtonsReducer";

const store = createStore(rootReducer);

export default store;
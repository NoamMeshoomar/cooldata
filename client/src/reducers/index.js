import { combineReducers } from "redux";

import userReducer from "./userReducer";
import boardsReducer from "./boardsReducer";

const combinedReducers = combineReducers({
    user: userReducer,
    boards: boardsReducer
});

export default combinedReducers;
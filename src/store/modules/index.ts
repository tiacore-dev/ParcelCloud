import { combineReducers } from "redux";
import { pages } from "./pages"

export const rootReducer = combineReducers({
    pages
})

export type IState = ReturnType<typeof rootReducer>;
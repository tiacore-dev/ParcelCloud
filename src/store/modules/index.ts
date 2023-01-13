import { combineReducers } from "redux";
import { pages } from "./pages"
import { auth } from './auth'

export const rootReducer = combineReducers({
    pages,
    auth
})

export type IState = ReturnType<typeof rootReducer>;
import { combineReducers } from "redux";
import { pages } from "./pages"
import { auth } from './auth'
import { dictionaries } from './dictionaries'
import { settings } from './settings'


export const rootReducer = combineReducers({
    pages,
    dictionaries,
    auth,
    settings
})

export type IState = ReturnType<typeof rootReducer>;
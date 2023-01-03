import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist"
import { IState, rootReducer } from "./modules";
import { formPersistConfig } from "./storage/formPersistConfig";


export const store = configureStore({
    reducer: persistReducer(
        formPersistConfig<IState>('root'),
        rootReducer
    ),
    devTools: true

})

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

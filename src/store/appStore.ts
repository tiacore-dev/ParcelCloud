import { configureStore } from "@reduxjs/toolkit";
import { 
    persistReducer, 
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
 } from "redux-persist"
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./modules";
// import { formPersistConfig } from "./storage/formPersistConfig";

const persistConfig = {
    key: 'root',
    storage,
    debug: true
}

export const store = configureStore({
    reducer: persistReducer(
        persistConfig,
        rootReducer
    ),
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: true

}) 

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

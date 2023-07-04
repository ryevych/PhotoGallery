import { configureStore, combineReducers, createStore } from "@reduxjs/toolkit";
import { photosApi } from "./services/photoService";
import favoritesReducer from "./reducers/favoriteSlice";
// import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import FSStorage from 'redux-persist-fs-storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const rootReducer = combineReducers({
  favoritesReducer,
  [photosApi.reducerPath]: photosApi.reducer,
});

const persistConfig = {
  key: "root",
  // storage: ExpoFileSystemStorage,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(photosApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const store = setupStore();
export const persistor = persistStore(store);

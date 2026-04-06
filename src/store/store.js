import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counerReducer from "./counterSlice";
import userReducer from "./userSlice";
import usersReducer from "./usersSlice";
import cartsReducer from "./cartSlice";
import refreshReducer from "./refreshSlice";
import tokenReducer from "./tokenSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// export const store = configureStore({
//   reducer: {
//     counter: counerReducer,
//     user: userReducer,
//   },
// });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "counter", "users", "cart", "refresh", "token"],
};

const rootReducer = combineReducers({
  counter: counerReducer,
  user: userReducer,
  users: usersReducer,
  cart: cartsReducer,
  refresh: refreshReducer,
  token: tokenReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

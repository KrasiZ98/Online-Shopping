import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import userSlice from "./userSlice";

const saveToLocalStorage = (store) => (next) => (action) => {
    const result = next(action);
    localStorage.setItem('user', JSON.stringify(store.getState().user));
    return result;
}

const store = configureStore({
    reducer: {
        products: productSlice,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveToLocalStorage),
});

export default store;
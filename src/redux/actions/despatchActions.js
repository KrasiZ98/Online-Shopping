import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi, getProductByIdApi } from "./apiProducts";
import { getAllUsersApi, loginApi } from "./apiUser";
import { clearUser } from "../userSlice";

export const fetchAllProducsts = createAsyncThunk("products/getAll", async () => {
    try {
        const products = await getAllProductsApi();
        return products;
    } catch (error) {
        throw new Error(`Error from fetchAllProducts: ${error.message}`);
    }
});

export const fetchProductById = createAsyncThunk('product/getById', async (productId) => {
    try {
        const product = await getProductByIdApi(productId);
        return product;
    } catch (error) {
        throw new Error(`Error from fetchProductById: ${error.message}`);
    }
});

export const fetchLoginUser = createAsyncThunk('user/login', async (userId) => {
    try {
        const availableUser = await loginApi(userId);
        return availableUser;
    } catch (error) {
        throw new Error(`Error from fetchLoginUser: ${error.message}`);
    }
});

export const fetchGetAllUser = createAsyncThunk('users/getAllUsers', async () => {
    try {
        const availableUsers = await getAllUsersApi();
        return availableUsers;
    } catch (error) {
        throw new Error(`Error from fetchGetAllUser: ${error.message}`);
    }
})

export const clearUserStorage = (dispatch) => {
    localStorage.clear('currentUser');
    dispatch(clearUser());
}
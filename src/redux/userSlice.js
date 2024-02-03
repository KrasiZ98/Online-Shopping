import { createSlice } from "@reduxjs/toolkit";
import { fetchGetAllUser, fetchLoginUser } from "./actions/despatchActions";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
        user: JSON.parse(localStorage.getItem('currentUser')) || [],
        fetchError: null,
        status: '',
    },
    reducers: {
        clearUser: (state) => {
            state.user = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetAllUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetAllUser.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.status = 'success';
         
        });
        builder.addCase(fetchGetAllUser.rejected, (state, action) => {
            state.status = 'failed';
            state.fetchError = action.error.message;
        });
        builder.addCase(fetchLoginUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = action.payload;
           
        });
        builder.addCase(fetchLoginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.fetchError = action.error.message;
        })
    }
});

export const {clearUser} = userSlice.actions;
export default userSlice.reducer;
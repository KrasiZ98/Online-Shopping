import { createSlice } from '@reduxjs/toolkit';
import { fetchAllProducsts, fetchProductById } from './actions/despatchActions';

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        product: [],
        fetchError: null,
        status: '',
        filterProducts: [],
        favoriteProduct: JSON.parse(localStorage.getItem("favoriteProduct")) || [],
    },
    reducers: {
        exportFromNav: (state, action) => {
            state.filterProducts = action.payload;
        },
        addFavoriteCard: (state, action) => {
            const newFavoriteProduct = [...state.favoriteProduct, action.payload];
            localStorage.setItem('favoriteProduct', JSON.stringify(newFavoriteProduct));
          

            return {
                ...state,
                favoriteProduct: newFavoriteProduct,
            };
        },
        deleteFavoriteCard: (state, action) => {
            const productId = action.payload;
            const updatedFavoriteProduct = state.favoriteProduct.filter((product) => product.id !== productId);
            localStorage.setItem('favoriteProduct', JSON.stringify(updatedFavoriteProduct));
          
            return {
                ...state,
                favoriteProduct: updatedFavoriteProduct,
            };

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducsts.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchAllProducsts.fulfilled, (state, actions) => {
            state.status = 'success';
            state.products = actions.payload;
        });
        builder.addCase(fetchAllProducsts.rejected, (state, actions) => {
            state.status = 'failed';
            state.fetchError = actions.error.message;
        });
        builder.addCase(fetchProductById.pending, (state, actions) => {
            state.status = 'loading';
        });
        builder.addCase(fetchProductById.fulfilled, (state, actions) => {
            state.status = 'success';
            state.product = actions.payload;
        });
        builder.addCase(fetchProductById.rejected, (state, actions) => {
            state.status = 'failed';
            state.fetchError = actions.error.message;
        });
    }
});

export const {
    exportFromNav,
    addFavoriteCard,
    deleteFavoriteCard }
    = productSlice.actions
export default productSlice.reducer;
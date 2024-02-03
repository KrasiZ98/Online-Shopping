import './details.css';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchProductById } from '../../redux/actions/despatchActions';
import { addFavoriteCard } from '../../redux/productSlice';
export const Details = () => {

    const dispatch = useDispatch();
    const { id: productId } = useParams();
    const state = useSelector((state) => state.products);
    const user = useSelector((state) => state.user.user);


    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch]);

    if (state.status === "loading") {
        return <h1>Loading...</h1>
    }



    function addFavoriteProduct() {
        dispatch(addFavoriteCard(state.product));
    }

  

    return (
        <>
            {user.email && state.favoriteProduct.find(x => x.id === state.product.id) === undefined ?
                <button
                    onClick={addFavoriteProduct}
                    className='add-button'>
                    Add To Cart
                </button>
                : <button

                    className='added-button'>
                    You Add This Product
                </button>}
            <section className='details-page'>
                <div className='product-details'>


                    <div className='product-info'>
                        <div className='product-image'>
                            <img src={state.product.thumbnail} alt="Product Image" />
                        </div>
                        <div className='info'>
                            <h2>Title: {state.product.title}</h2>
                            <h2>Price: {state.product.price}$</h2>
                            <h2>Discount: {state.product.discountPercentage}$</h2>
                            <h2>Brand: {state.product.brand}</h2>
                            <h2>Rating: {state.product.rating}</h2>
                            <h2>Stock: {state.product.stock}</h2>
                        </div>

                    </div>

                    <div className='images'>
                        {state.product && state.product.images && state.product.images.map((img, index) => (
                            <div key={index}>
                                <img className='imgs' src={img} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

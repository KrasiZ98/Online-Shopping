import './favorite.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { deleteFavoriteCard } from '../../redux/productSlice';

export const Favorite = () => {

    const dispatch = useDispatch();

    const favoriteProduct = useSelector((state) => state.products.favoriteProduct);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);

    const [quantities, setQuantities] = useState(() => {
        const initialQuantities = favoriteProduct.reduce((acc, product) => {
            acc[product.id] = 1;
            return acc;
        }, {});

        return JSON.parse(localStorage.getItem('quantities')) || initialQuantities;
    })


    useEffect(() => {

        let total = 0;
        let discounted = 0;

        if (favoriteProduct.length > 0) {


            favoriteProduct.forEach((product) => {
                const totalPriceForProduct = product.price * quantities[product.id];
                const discountAmount = (product.price * product.discountPercentage) / 100;

                total += totalPriceForProduct;
                discounted += totalPriceForProduct - discountAmount;


            });
        } else {
            if (Object.keys(quantities).length > 0) {
                setQuantities({});
            }
        }

        setTotalPrice(total.toFixed(2));
        setDiscountPrice(discounted.toFixed(2));


    }, [favoriteProduct, quantities]);


    function increaseQuantity(productId) {
        setQuantities((prevQuantities) => {
            const updatedQuantities = {
                ...prevQuantities,
                [productId]: (prevQuantities[productId] || 1) + 1,
            };

            localStorage.setItem('quantities', JSON.stringify(updatedQuantities));

            return updatedQuantities;
        });
    }

    function decreaseQuantity(productId) {
        setQuantities((prevQuantities) => {
            if (prevQuantities[productId] > 1) {
                const updatedQuantities = {
                    ...prevQuantities,
                    [productId]: prevQuantities[productId] - 1,
                };

                localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
                return updatedQuantities;
            }

            return prevQuantities;
        })
    }


    function handleDelete(productId) {
        const productExists = favoriteProduct.some(product => product.id === productId);

        if (productExists) {
            dispatch(deleteFavoriteCard(productId));
        }
    }

  
    return (
        <>

            <section className='favorite-page'>
                <div className='favorite-product'>
                    {favoriteProduct.length > 0 ?
                        favoriteProduct.map((product) => (
                            <div key={product.id} className='favorite-card'>
                                <div className='fav-info'>
                                    <div className='fav-image'>
                                        <img src={product.thumbnail} alt="Favorite Product Image" />
                                    </div>

                                    <div className='fav-detaiils'>
                                        <p>Title: {product.title}</p>
                                        <p>Category: {product.category}</p>
                                        <p>Disc: ${product.discountPercentage}</p>
                                    </div>

                                    <div className='fav-details'>
                                        <p>Price ${product.price}</p>
                                        <p>Rating: {product.rating}</p>
                                        <p>Stock: {product.stock}</p>
                                    </div>

                                    <div className='actions'>
                                        <button className='qty-btn'>
                                            <FaArrowAltCircleLeft
                                                onClick={() => increaseQuantity(product.id)}
                                                className='icon-qty' />
                                            {quantities[product.id]}
                                            <FaArrowAltCircleRight
                                                onClick={() => decreaseQuantity(product.id)}
                                                className='icon-qty' />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className='delete-btn'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )) : <h1>Noo Product</h1>}
                </div>
            </section>
            <div className='price'>
                <h2>Total Price ${totalPrice}</h2>
                <h2>Discount Price ${discountPrice}</h2>
            </div>
        </>
    )
}

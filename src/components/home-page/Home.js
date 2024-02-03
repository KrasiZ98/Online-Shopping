import './home.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducsts } from '../../redux/actions/despatchActions';
import { Link } from 'react-router-dom';


export const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const search = useSelector((state) => state.products.search)
    const allProducts = products?.products?.products
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [filterProducts, setFilterProducts] = useState(allProducts);

    useEffect(() => {
        dispatch(fetchAllProducsts());
    }, [dispatch]);


    const allCategories = [...new Set(products?.products?.products?.map(x => x.category))]
    const categories = allCategories.map(x => x.includes('-') ? x.split("-").join(" ") : x)


    useEffect(() => {
        if (!filterProducts?.length && allProducts) {
            setFilterProducts(allProducts);
        }
    }, [filterProducts, allProducts]);




    function onSearch(value) {
      
        if (value) {
            const filteredProducts = allProducts.filter((product) => {
                return product.category.includes('-')
                    ? product.category.split('-').join()
                    : product.category.toLowerCase().includes(value.toLowerCase());
            });

            setFilterProducts(filteredProducts)
        } else {
            setFilterProducts(filterProducts)
        }
    }


    useEffect(() => {
        if (products.status === 'success') {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        }
    }, [products.status]);


    if (showSuccessMessage) {
        setTimeout(() => {
            return <h1>Data success fetch</h1>
        }, 3000);
    }

    if (products.fetchError) {
        return <h1 style={{ color: "red" }}>{products.fetchError}</h1>
    }

    return (
        <>
            <section className='category'>
                {categories && categories.map((category, index) => (
                    <button key={index} onClick={() => onSearch(category)}>{category}</button>
                ))}
            </section>
            <section className='home-page'>
                <div className='card-wrrap'>
                    {filterProducts ?
                        filterProducts.map((product) => (
                            <div key={product.id} className='card'>
                                <div className='image'>
                                    <img src={product.thumbnail} alt="Product Image" />
                                </div>
                                <div className='products-info'>
                                    <p>Title: {product.title}</p>
                                    <p>price: {product.price}$</p>
                                    <Link to={`/details/${product.id}`}>See more</Link>
                                </div>
                            </div>

                        )) : <h1>Loading..</h1>}
                </div>
            </section>
        </>
    )
}

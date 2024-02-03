import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export const FilterProducts = () => {
    const products = useSelector((state) => state.products.filterProducts);

    return (
        <section className='home-page'>
        <div className='card-wrrap'>
            {products && products.length > 0 ?
                products.map((product) => (
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

                )) : <h1>No Available Items</h1>}
        </div>
    </section>
    )
}

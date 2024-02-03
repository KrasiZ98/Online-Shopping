import './navigation.css';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineLogin } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { PiShoppingCartBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { exportFromNav } from '../../redux/productSlice';
import { clearUserStorage, fetchAllProducsts, fetchGetAllUser } from '../../redux/actions/despatchActions';
import { RiLogoutCircleLine } from "react-icons/ri";

export const Navigation = () => {

    const [search, setSarch] = useState('');
    const products = useSelector((state) => state.products);

    const state = useSelector((state) => state.user);
    const allProducts = products.products.products;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllProducsts());
    }, [dispatch]);


    useEffect(() => {
        dispatch(fetchGetAllUser());
    }, [dispatch])


    function onClick() {
        if (search) {
            const filtered = allProducts.filter((product) => {
                return product.title.toLowerCase().includes(search.toLowerCase());
            });
            setSarch('');
            dispatch(exportFromNav(filtered));
            navigate('/filter-products');
        } else {
            return;
        }
    }

    function handleLogout() {
        dispatch(clearUserStorage());
    }


    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>
                    <h1>
                        <strong className='online'>Online</strong>
                        <strong className='shopp'>Shopp</strong>
                    </h1>
                </Link>
            </div>

            <div className='search'>
                <input type="text" name="search"
                    onChange={(e) => setSarch(e.target.value)} />
                <IoSearchOutline className='search-icon'
                    onClick={onClick}
                />
            </div>

            <nav>
                <ul>
                    {state.user.email ?
                        <>
                            <li>
                                <Link to='/profile'>
                                    <CiUser
                                        className='user-icon' />
                                </Link>
                            </li>
                            <li>
                                {products.favoriteProduct.length > 0 ?
                                    <Link className='fav-link'  to='/favorite-products'>
                                        <PiShoppingCartBold
                                            className='shopp-icon' />
                                            <span >{products.favoriteProduct.length}</span>
                                            
                                    </Link>
                                    :
                                    <Link to='/favorite-products'>
                                        <PiShoppingCartBold
                                            className='shopp-icon' />
                                    </Link>
                                }

                            </li>

                            <li>
                                <Link onClick={() => handleLogout()}>
                                    <RiLogoutCircleLine
                                        className='logout-icon' />
                                </Link>
                            </li>
                        </>
                        :
                        <Link to='/login'>
                            <AiOutlineLogin
                                className='login-icon' />
                        </Link>
                    }


                </ul>
            </nav>
        </header>
    )
}


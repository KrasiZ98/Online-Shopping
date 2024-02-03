import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetAllUser, fetchLoginUser } from '../../redux/actions/despatchActions';

export const Login = () => {

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user.userData);
    const state = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchGetAllUser());
    }, [dispatch])


    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });

    const [formError, setFormError] = useState('');

    function handleChange(e) {
        setFormValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmtit(event) {
        event.preventDefault();

        if (Object.values(formValue).some((value) => value === '')) {
            setFormError('Write empty blanks.');
            setTimeout(() => {
                setFormError('');
            }, 4000);

        } else {
            const filteredUser = userData.users.find((user) =>
                user.email === formValue.email);
            if (filteredUser && filteredUser.password === formValue.password) {
                const userId = filteredUser.id;
                dispatch(fetchLoginUser(userId));
                navigate('/');
            } else {
                setFormError("Email or Password don't macth.");
                setTimeout(() => {
                    setFormError('');
                }, 4000);
            }
        }

    }

    function openNewTab() {
        window.open('https://dummyjson.com/users');
    }

    return (
        <>

            {formError && <h3 className='error'>{formError}</h3>}
            <section className='login-page'>
                <div className='loign-form'>
                    <form onSubmit={handleSubmtit}>
                        <h1>Login</h1>

                        <div className='form-group'>
                            <input type="text" name='email' placeholder='email...'
                                onChange={handleChange} value={formValue.email} />
                        </div>

                        <div className='form-group'>
                            <input type="password" name='password' placeholder='password...'
                                onChange={handleChange} value={formValue.password} />
                        </div>

                        <button className='login-btn'>Login</button>
                        <h4>Users From Dummy Json <Link onClick={openNewTab} to='#'>
                            Available Users
                        </Link></h4>
                    </form>
                </div>

            </section>
        </>
    )
}

import './profile.css'
import React from 'react'
import { useSelector } from 'react-redux'

export const Profile = () => {
    const user = useSelector((state) => state.user.user);
  
    return (
        <section className='profile-page'>

            <div className='profile'>

                <div className='profile-image'>
                    <img src={user.image} alt="Profile Image" />


                </div>

                <div className='profile-user-info'>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>Domain: {user.domain}</p>
                    <div className='profile-address'>
                        <span>Address:</span>
                        <p>{user.address.address}</p>
                        <p>{user.address.city}</p>
                        <p>{user.address.address}</p>
                        <p>Lat: {user.address.coordinates.lat}</p>
                        <p>Lng: {user.address.coordinates.lng}</p>
                    </div>
                    <p>Phone: {user.phone}</p>
                </div>
            </div>

        </section>
    )
}

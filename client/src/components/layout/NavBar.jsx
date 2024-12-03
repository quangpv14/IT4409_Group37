import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logout } from '../auth/Logout';

export const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false);
    const handleAccountClick = () => {
        setShowAccount(!showAccount)
    }
    const [userName, setUserName] = useState(localStorage.getItem("name"));
    const isLoggedIn = localStorage.getItem("token");
    useEffect(() => {
        setUserName(localStorage.getItem("name"));
    }, [isLoggedIn]);

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow p-1 sticky-top'>
            <div className='container-fluid'>
                <Link to={"/"} className='navbar-brand'>
                    <span className='text-uppercase' style={{ fontWeight: '700', fontSize: '1em', color: '#007bff' }}>Booking.com</span>
                </Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse'
                    data-bs-target='#navbarScroll' aria-controls='navbarScroll'
                    aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarScroll'>
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-srcoll'>
                        <li className='nav-item'>
                            <NavLink className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')} aria-current='page'>Hotels & Homes</NavLink>
                        </li>

                    </ul>
                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>About</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>Contact</NavLink>
                        </li>
                        {!isLoggedIn && (
                            <li className='nav-item'>
                                <NavLink to='/rental-register' style={{ color: '#000000' }}
                                    className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>Rental Registration</NavLink>
                            </li>
                        )}
                        <li className='nav-item'>
                            <NavLink to='/help' className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>Help & Support</NavLink>
                        </li>
                        <li className='nav-item dropdown'>
                            <a className={`text-reset nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href='' role='button' data-bs-toggle='dropdown' aria-expanded='false' onClick={handleAccountClick}>{""}
                                <i className="bi bi-person-circle"></i> {userName ? userName : 'Account'}</a>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby='navbarDropdown'>
                                {isLoggedIn ? (
                                    <Logout />
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            Login
                                        </Link>
                                        <Link className="dropdown-item" to={"/register"}>
                                            Sign up
                                        </Link>

                                    </li>

                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

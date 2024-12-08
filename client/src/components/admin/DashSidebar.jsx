import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaHotel, FaBed } from 'react-icons/fa';
import { AiOutlinePieChart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";

import { AuthContext } from '../auth/AuthProvider';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/userSlice';

const DashSidebar = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = localStorage.getItem("name");

    const handleLogout = () => {
        auth.handleLogout();
        dispatch(clearUser());
        navigate("/login", { state: { message: "You have been logged out!" } })
        window.location.reload();
    };

    return (
        <div style={{ height: '100%' }}>
            <div style={{ height: '91%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '65px', backgroundColor: '#cecece' }}>
                    <Link to={"/"} className='navbar-brand'>
                        <span className='text-uppercase' style={{ fontWeight: '700', fontSize: '1.5em', color: '#007bff' }}>Booking.com</span>
                    </Link>
                </div>

                <Nav variant="pills" className="flex-column">
                    <Nav.Item className='nav-comp'>
                        <Link to="?tab=dashboard" className="nav-link nav-comp" style={{ width: '100%' }}>
                            <AiOutlinePieChart style={{ marginRight: '10px' }} />
                            Dashboard
                        </Link>
                    </Nav.Item>
                    <hr style={{ margin: '0px' }}></hr>
                    <Nav.Item className='nav-comp'>
                        <Link to="?tab=hotel-management" className="nav-link nav-comp" style={{ width: '100%' }}>
                            <FaHotel style={{ marginRight: '10px' }} />
                            Hotel Management
                        </Link>
                    </Nav.Item>
                    <hr style={{ margin: '0px' }}></hr>
                    <Nav.Item className='nav-comp'>
                        <Link to="?tab=room-management" className="nav-link nav-comp" style={{ width: '100%' }}>
                            <FaBed style={{ marginRight: '10px' }} />
                            Room Management
                        </Link>
                    </Nav.Item>
                    <hr style={{ margin: '0px' }}></hr>
                </Nav>
            </div>
            <hr style={{ margin: '0px' }}></hr>
            <div style={{ width: '100%' }} className='info-admin'>
                <div style={{ width: '30%', justifyContent: 'center' }} className='nav-comp'>
                    <div>
                        <button
                            onClick={handleLogout}
                            style={{
                                height: '40px',
                                width: '40px',
                                borderRadius: '50%',
                                padding: '2px',
                                border: 'solid 0.2px gray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <CgLogOut style={{ height: '24px', width: '24px', color: 'gray' }} />
                        </button>
                    </div>
                </div>
                <div style={{ width: '70%', justifyContent: 'right', marginRight: '15px' }} className='nav-comp'>
                    <div>{name ? name : 'Admin'}</div>
                    <FaUserCircle style={{ height: '40px', width: '40px', marginLeft: '10px' }} />
                </div>
            </div>
        </div>
    );
};

export default DashSidebar;

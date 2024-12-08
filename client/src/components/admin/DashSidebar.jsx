import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { FaTachometerAlt, FaHotel, FaBed, FaUserCircle } from 'react-icons/fa';
import { AiOutlinePieChart } from "react-icons/ai";
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../auth/AuthProvider';

const DashSidebar = () => {  
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        auth.handleLogout();
        dispatch(clearUser());
        navigate("/login", { state: { message: "You have been logged out!" } })
        window.location.reload();
    }
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '65px', backgroundColor: '#cecece' }}>
                <Link to={"/"} className='navbar-brand'>
                    <span className='text-uppercase' style={{ fontWeight: '700', fontSize: '1.5em', color: '#007bff' }}>Booking.com</span>
                </Link>
            </div>

            <Nav variant="pills" className="flex-column">
                <Nav.Item>
                    <Link to="?tab=dashboard" className="nav-link">
                        <AiOutlinePieChart style={{ marginRight: '10px' }} />
                        Dashboard
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="?tab=hotel-management" className="nav-link">
                        <FaHotel style={{ marginRight: '10px' }} />
                        Hotel Management
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="?tab=room-management" className="nav-link">
                        <FaBed style={{ marginRight: '10px' }} />
                        Room Management
                    </Link>
                </Nav.Item>
            </Nav>

            {/* Logout button */}
            <div className="p-3" style={{ position: 'relative' }}>
                <Button
                    variant="danger"
                    onClick={handleLogOut}
                    style={{
                        width: '80%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px', /* Tăng khoảng cách */
                        marginTop: '550px'
                    }}
                >
                    <FaUserCircle />
                    Log Out
                </Button>
            </div>
        </div>
    );
};

export default DashSidebar;

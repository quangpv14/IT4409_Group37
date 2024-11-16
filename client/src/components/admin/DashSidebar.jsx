import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaHotel, FaBed } from 'react-icons/fa';
import { AiOutlinePieChart } from "react-icons/ai";


const DashSidebar = () => {
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
        </div>
    );
};

export default DashSidebar;

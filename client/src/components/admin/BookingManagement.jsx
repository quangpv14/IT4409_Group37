import React, { useEffect, useState } from "react";
import { Container, Pagination } from 'react-bootstrap';
import { fectchBooking, fectchAllBooking } from "../utils/ApiFunctions";
import { FiSearch } from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [error, setError] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const email = localStorage.getItem("email");

    useEffect(() => {
        const fetchAllBooking = async (page) => {
            setLoading(true);
            try {
                const params = { email: email, page, size: pageSize };
                const response = await fectchAllBooking(params);
                setBookings(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError("Failed to fetch. Please try again later.");
                setTimeout(() => setError(""), 2000);
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllBooking(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEdit = (order) => {
        setSelectedOrder(order);
    };

    const renderPagination = () => {
        const items = [];
        for (let i = 0; i < totalPages; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i + 1}
                </Pagination.Item>
            );
        }
        return <Pagination>{items}</Pagination>;
    };

    return (
        <div style={{ height: '100vh', marginRight: '30px' }}>
            {loading && <div className="loading-overlay">Loading...</div>}
            {error && <p className="alert alert-danger profile-alert">{error}</p>}
            <h1 style={{ textAlign: 'center' }}>Booking Manager</h1>

            <div className="hotel-function">
                <div className="search-area">
                    {/* Search Input with Placeholder */}
                    <input type="text" placeholder="Search ..."
                        className="hotel-search"
                    />
                    {/* Search Button with React Icon */}
                    <button className="btn btn-search" style={{ marginLeft: '5px' }}>
                        <FiSearch size={18} />
                        Search
                    </button>
                </div>
            </div>

            <div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ backgroundColor: "#003366", color: "white", border: "1px solid #ccc" }}>
                        <tr>
                            <th style={{ border: "1px solid #ccc" }}>No</th>
                            <th style={{ border: "1px solid #ccc" }}>Booking Date</th>
                            <th style={{ border: "1px solid #ccc" }}>Customer Name</th>
                            <th style={{ border: "1px solid #ccc" }}>Check-in</th>
                            <th style={{ border: "1px solid #ccc" }}>Check-out</th>
                            <th style={{ border: "1px solid #ccc" }}>Total Cost</th>
                            <th style={{ border: "1px solid #ccc", textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.length > 0 ? (
                            bookings?.map((order, index) => (
                                <tr
                                    key={order.id}
                                    style={{
                                        backgroundColor: index % 2 === 0 ? "#cecece" : "#fff",
                                        border: "1px solid gray",
                                    }}
                                >
                                    <td style={{ border: "1px solid gray", textAlign: "center" }}>{index + 1}</td>
                                    <td style={{ maxWidth: "220px" }} className="ellipse-text"> {order.bookingDate}</td>
                                    <td
                                        style={{ maxWidth: "260px" }} className="ellipse-text"
                                        title={order.customerName} // Tooltip to show full text
                                    >
                                        {order.customerName}
                                    </td>
                                    <td style={{ border: "1px solid gray", minWidth: "100px" }}>{order.checkinDate}</td>
                                    <td style={{ border: "1px solid gray", minWidth: "100px" }}>{order.checkoutDate}</td>
                                    <td style={{ border: "1px solid gray", minWidth: "100px" }}>{order.totalCost} VND</td>
                                    <td style={{ border: "1px solid gray", textAlign: "center", padding: "2px" }}>
                                        {/* Edit Button */}
                                        <button
                                            style={{
                                                backgroundColor: "#007BFF", // Blue color
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                padding: "2px 3px",
                                                marginRight: "5px",
                                                cursor: "pointer",
                                            }}

                                            onClick={() => handleEdit(order)}
                                        >
                                            <FaEdit style={{ marginBottom: '3px' }} />
                                        </button>

                                    </td>
                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "10px", fontStyle: "italic", color: "gray" }}>
                                    {loading ? '' : 'No bookings available.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {bookings?.length > 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {renderPagination()}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}


export default BookingManagement;

import React, { useState, useEffect } from 'react';
import { bookHistory } from '../utils/ApiFunctions';
import { useSelector } from 'react-redux';
const BookingHistory = () => {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const email = localStorage.getItem("email");
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBookingHistory = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await bookHistory(email);
                setHistory(response.data);
            } catch (error) {
                setError('Failed to fetch history. Please try again.');
                setTimeout(() => setError(""), 2000);
            } finally {
                setLoading(false);
            }
        };


        fetchBookingHistory(email);

    }, [email]);

    return (
        <div style={{ height: '100vh' }}>

            <style>
                {`
                    .booking-history-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                        font-size: 16px;
                        text-align: left;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .booking-history-table th,
                    .booking-history-table td {
                        border: 1px solid #ddd;
                        padding: 12px;
                    }
                    .booking-history-table th {
                        background-color: #f4f4f4;
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                    .booking-history-table tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    .booking-history-table tr:hover {
                        background-color: #f1f1f1;
                    }
                    .loading-overlay {
                        text-align: center;
                        margin: 20px 0;
                    }
                    .alert {
                        color: red;
                        text-align: center;
                    }
                    .no-history {
                        color: gray;
                    }
                `}
            </style>

            <h1 style={{ marginTop: '30px', textAlign: 'center' }}>Booking History</h1>

            {loading && <div className="loading-overlay">Loading...</div>}

            {error && <p className="alert alert-danger profile-alert">{error}</p>}

            {!loading && !error && history.length === 0 && (
                <p className="no-history" style={{ textAlign: 'center' }}>No booking history found.</p>
            )}
            <div style={{ padding: '0px 120px' }}>
                {!loading && history.length > 0 && (
                    <table className="booking-history-table">
                        <thead>
                            <tr>
                                <th>Hotel Name</th>
                                <th>Room Type</th>
                                <th>Check-in Date</th>
                                <th>Check-out Date</th>
                                <th>Booking Date</th>
                                <th>Total Cost (VND)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nameHotel}</td>
                                    <td>{item.roomType}</td>
                                    <td>{new Date(item.checkinDate).toLocaleDateString()}</td>
                                    <td>{new Date(item.checkoutDate).toLocaleDateString()}</td>
                                    <td>{new Date(item.bookingDate).toLocaleDateString()}</td>
                                    <td>{item.totalCost.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default BookingHistory;

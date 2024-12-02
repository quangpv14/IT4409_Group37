import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HotelDetails = () => {
    const { hotelId } = useParams(); // Lấy hotelId từ URL
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        // Gọi API để lấy thông tin chi tiết khách sạn
        const fetchHotelDetails = async () => {
            try {
                const response = await axios.get(`/hotel/${hotelId}`);
                setHotel(response.data);
            } catch (error) {
                console.error('Error fetching hotel details:', error);
            }
        };

        fetchHotelDetails();
    }, [hotelId]);

    if (!hotel) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{hotel.name}</h1>
            <p>{hotel.address}</p>

        </div>
    );
};

export default HotelDetails;

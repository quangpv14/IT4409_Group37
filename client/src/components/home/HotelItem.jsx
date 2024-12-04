import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const HotelItem = ({ hotel }) => {
    const navigate = useNavigate();
    if (!hotel) {
        return null; // Không hiển thị gì nếu dữ liệu bị thiếu
    }
    const imageUrl = hotel.paths && hotel.paths.length > 0 ? hotel.paths[0] : hotel.image;

    const handleViewDetails = () => {
        navigate(`/hotel/${hotel.id}`); // Điều hướng đến trang thông tin khách sạn với hotelId
    };

    return (
        <Card style={{ width: '14.1rem', height: '20rem' }} className="mb-3">
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {imageUrl ? (
                    <Card.Img variant="top" src={imageUrl} alt={`${hotel.name}`} style={{ height: '180px' }} />
                ) : (
                    <span style={{ color: '#6c757d' }}>No Image Available</span>
                )}
            </div>
            <Card.Body>
                <Card.Title>{hotel.name}</Card.Title>
                <Card.Text style={{ height: '32px', marginBottom: '10px' }}>
                    {hotel.address.split(',').slice(-2).join(',').trim()}
                </Card.Text>
                <Button variant="primary" onClick={handleViewDetails}>View Details</Button>
            </Card.Body>
        </Card>
    );
};

export default HotelItem;
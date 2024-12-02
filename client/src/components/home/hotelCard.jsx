import React from 'react';
import { Card, Button } from 'react-bootstrap';

const HotelCard = ({ hotel }) => {
  if (!hotel) {
    return null; // Không hiển thị gì nếu dữ liệu bị thiếu
  }
  const imageUrl = hotel.paths && hotel.paths.length > 0 ? hotel.paths[0] : hotel.image;

  return (
    <Card style={{ width: '18rem', height: '23rem'}} className="mb-3">
        <div
        style={{
          width: '100%',
          height: '185px',
          backgroundColor: '#e9ecef',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
                {imageUrl ? (
        <Card.Img variant="top" src={imageUrl} alt={`${hotel.name}`} />  
      ) : (
        <span style={{ color: '#6c757d' }}>No Image Available</span>
      )}
      </div>
      <Card.Body>
        <Card.Title>{hotel.name}</Card.Title>
        <Card.Text>{hotel.address}</Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;
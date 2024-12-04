import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const TrendingDestinations = () => {
    const navigate = useNavigate();
    const destinations = [
        {
            name: 'Ho Chi Minh City',
            imageUrl: 'https://cf.bstatic.com/xdata/images/city/600x600/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=',
        },
        {
            name: 'Danang',
            imageUrl: 'https://cf.bstatic.com/xdata/images/city/600x600/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=',
        },
        {
            name: 'Hanoi',
            imageUrl: 'https://cf.bstatic.com/xdata/images/city/600x600/981517.jpg?k=2268f51ad34ab94115ea9e42155bc593aa8d48ffaa6fc58432a8760467dc4ea6&o=',
        },
        {
            name: 'Dalat',
            imageUrl: 'https://cf.bstatic.com/xdata/images/city/600x600/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&o=',
        },
    ];

    const handleImageClick = (param) => {
        //navigate(`/destination/${param}`); 
        navigate(`/about`);
    };
    return (
        <Container style={{ padding: '20px 10px' }}>
            <h4 style={{ marginBottom: '10px' }}>Trending destinations</h4>
            <p style={{ marginBottom: '20px' }}>
                The most popular options for travelers from Vietnam
            </p>
            <Row>
                {destinations.map((destination, index) => (
                    <Col key={index} xs={12} sm={6}>
                        <Card style={{ width: '100%', marginBottom: '20px' }}>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <Card.Img
                                    src={destination.imageUrl}
                                    alt={destination.name}
                                    style={{ height: '250px', objectFit: 'cover' }}
                                    onClick={() => handleImageClick(destination.name)}
                                />
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        color: '#fff',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        fontWeight: 'bold'
                                    }}

                                >
                                    {destination.name}
                                    <img
                                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png'
                                        alt=''
                                        style={{
                                            marginLeft: '8px',
                                            marginBottom: '4px',
                                            width: '26px',
                                            height: '16px',
                                        }}
                                    />
                                </span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TrendingDestinations;

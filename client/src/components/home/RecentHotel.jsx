import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import HotelItem from './HotelItem';
import { getHotelsByAdmin } from "../utils/ApiFunctions";
import { useSelector } from 'react-redux';

const RecentHotel = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { email } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data = await getHotelsByAdmin(email);
                if (Array.isArray(data)) {
                    setHotels(data);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (err) {
                setError("Failed to fetch hotels. Please try again later.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" />
                <p>Loading hotels...</p>
            </Container>
        );
    }


    return (
        <Container style={{ padding: '0px' }}>
            <Row >
                {hotels.map((hotel, index) => (
                    <Col key={index} xs={12} sm={6} md={3}>
                        <HotelItem hotel={hotel} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default RecentHotel;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import HotelItem from './HotelItem';
import { getHotelsByAdmin, getDestinations } from "../utils/ApiFunctions";
import { useSelector } from 'react-redux';

const RecentHotel = ({ hotel }) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { email } = useSelector((state) => state.user);
    const address = hotel.address?.split(',').slice(-2, -1)[0]?.trim();
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const params = { keyword: address, page: 0, size: 5 };
                const data = await getDestinations(params);
                let lstHotels = data.data.content;
                setHotels(lstHotels.filter(x => x.id !== hotel.id).slice(0, 4));
            } catch (err) {
                setError("Failed to fetch hotels. Please try again later.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [address, hotel.id]);

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

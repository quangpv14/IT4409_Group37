import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Pagination, Spinner, Alert } from 'react-bootstrap';
import { getDestinations } from '../utils/ApiFunctions';
import HotelCard from './hotelCard';

const DestinationPage = () => {
    const { address } = useParams();
    const [destinations, setDestinations] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDestinations = async (page = 0) => {
        setLoading(true);
        setError("");
        try {
            const params = { keyword: address, page, size: 4 };
            const data = await getDestinations(params);
            setDestinations(data.data.content);
            setTotalPages(data.data.totalPages);
        } catch (err) {
            setError("Failed to fetch destinations. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDestinations(currentPage);
    }, [address, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (error) {
        return (
            <Container className="text-center">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <div style={{ height: '100vh' }}>
            {loading && <div className="loading-overlay">Loading...</div>}
            <Container>
                <div style={{ display: 'flex', paddingTop: '30px' }}>
                    <div style={{ color: '#0d6efd' }}>Home / Destination / </div>
                    <div>Search results</div>
                </div>
                <div style={{ display: 'flex', paddingTop: '10px', }}>
                    <div style={{ fontSize: '24px', fontWeight: '600' }}>Destinations for {address}</div>
                    <div style={{
                        border: 'solid 0.5px #cecece', borderRadius: '15px',
                        width: 'fit-content', padding: '1px 6px', marginLeft: 'auto'
                    }}>
                        Sắp xếp theo: lựa chọn hàng đầu của chúng tôi
                    </div>
                </div>

                {/* Kiểm tra nếu không có kết quả */}
                {destinations.length > 0 ? (
                    <div>
                        <Row style={{ paddingTop: '20px' }}>
                            {destinations.map((destination, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                                    <HotelCard hotel={destination} />
                                </Col>
                            ))}
                        </Row>
                        <Pagination className="justify-content-center mt-4">
                            {[...Array(totalPages).keys()].map((page) => (
                                <Pagination.Item
                                    key={page}
                                    active={page === currentPage}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', paddingTop: '20px', fontSize: '18px', color: '#555' }}>
                        {loading ? "..." : 'Not found results.'}
                    </div>

                )}

            </Container>
        </div>
    );
};

export default DestinationPage;

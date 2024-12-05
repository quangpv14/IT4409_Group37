import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Pagination } from 'react-bootstrap';
import HotelCard from './hotelCard';
import { getHotelsByAdmin, findHotels } from "../utils/ApiFunctions";
import { useSelector } from 'react-redux';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { email } = useSelector((state) => state.user);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);


  // useEffect(() => {
  //   const fetchHotels = async () => {
  //     try {
  //       const data = await getHotelsByAdmin(email);
  //       if (Array.isArray(data)) {
  //         setHotels(data);
  //       } else {
  //         throw new Error("Invalid data format");
  //       }
  //     } catch (err) {
  //       setError("Failed to fetch hotels. Please try again later.");
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHotels();
  // }, []);

  useEffect(() => {
    const fetchAllHotels = async (page) => {
      setLoading(true);
      try {
        const params = { page, size: pageSize };
        const response = await findHotels(params);
        setHotels(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Failed to fetch hotels. Please try again later.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllHotels(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  // if (loading) {
  //   return (
  //     <Container className="text-center">
  //       <Spinner animation="border" />
  //       <p>Loading hotels...</p>
  //     </Container>
  //   );
  // }

  if (error) {
    return (
      <Container className="text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      {loading && <div className="loading-overlay">Loading...</div>}

      <Container>
        <Row>
          {hotels.map((hotel, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <HotelCard hotel={hotel} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            {renderPagination()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HotelList;

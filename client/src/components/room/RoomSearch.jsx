import React, { useState } from 'react'
import moment from 'moment';
import { getAvailableRooms } from '../utils/ApiFunctions';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Pagination } from 'react-bootstrap';
import HotelCard from '../home/hotelCard';

export const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkIn: "",
        checkOut: "",
    })
    const [errorMessage1, setErrorMessage1] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisplay, setIsDisplay] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [totalElement, setTotalElement] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [checkinDate, setCheckinDate] = useState("");
    const [checkoutDate, setCheckoutDate] = useState("");

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        const checkIn = moment(searchQuery.checkIn);
        const checkOut = moment(searchQuery.checkOut);
        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage1("Please enter valid dates");
            setTimeout(() => setErrorMessage1(""), 2000);
            return
        }
        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage1("Checkin date must come before checkout date");
            setTimeout(() => setErrorMessage1(""), 2000);
            return;
        }

        let params = {
            page: currentPage,
            size: pageSize,
            keyword: searchQuery.destination,
            checkin: checkIn,
            checkout: checkOut,
        };
        setIsLoading(true);

        try {
            const response = await getAvailableRooms(params);
            setAvailableRooms(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElement(response.data.totalElements);

        } catch (error) {
            setErrorMessage(error.message ? error.message : "Something wrong.");
            setTimeout(() => setErrorMessage(""), 2000);
        } finally {
            setIsLoading(false);
        }

        setIsDisplay(true);
    };

    const renderPagination = () => {
        if (totalPages > 1) {
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
        }
        return null;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const checkIn = moment(searchQuery.checkIn);
        const checkOut = moment(searchQuery.checkOut);
        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage1("Please enter valid dates");
            setTimeout(() => setErrorMessage1(""), 2000);
            return
        }
        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage1("Checkin date must come before checkout date");
            setTimeout(() => setErrorMessage1(""), 2000);
            return;
        }

        let params = {
            page: currentPage,
            size: pageSize,
            keyword: searchQuery.destination,
            checkin: checkIn,
            checkout: checkOut,
        };
        setIsLoading(true);

        try {
            const response = await getAvailableRooms(params);
            setAvailableRooms(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElement(response.data.totalElements);
        } catch (error) {
            setErrorMessage(error.message ? error.message : "Something wrong.");
            setTimeout(() => setErrorMessage(""), 2000);
        } finally {
            setIsLoading(false);
        }

        setIsDisplay(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCheckinDate(e.target.value);
        setCheckoutDate(e.target.value);
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkIn = moment(searchQuery.checkIn);
        const checkOut = moment(searchQuery.checkOut);
        if (checkIn.isValid() && checkOut.isValid()) {
            setErrorMessage("");
        }
    }

    const clearSearch = () => {
        setSearchQuery({
            checkIn: "",
            checkOut: "",
            roomType: ""
        })
        setAvailableRooms([]);
    }

    return (
        <>
            <div>
                {isLoading && <div className="loading-overlay">Loading...</div>}
                {errorMessage1 && <p className="alert alert-warning profile-alert" style={{ width: '400px' }}>{errorMessage1}</p>}
                {errorMessage && <p className="alert alert-danger profile-alert" style={{ width: '400px' }}>{errorMessage}</p>}
                <Container className='mt-5 mb-5 py-5 shadow'>
                    <Form onSubmit={handleSearch}>
                        <Row className='justify-content-center'>

                            <Col xs={12} md={3}>
                                <FormGroup controlId='destination'>
                                    <FormLabel>Destination</FormLabel>
                                    <FormControl type='text' name='destination' value={searchQuery.destination} onChange={handleInputChange}
                                        style={{ marginTop: '5px' }} placeholder='Destination' />
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={3}>
                                <FormGroup controlId='checkIn'>
                                    <FormLabel>Check-in date</FormLabel>
                                    <FormControl type='date' name='checkIn' value={searchQuery.checkIn} onChange={handleInputChange}
                                        min={moment().format("YYYY-MM-DD")} style={{ marginTop: '5px' }} />
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={3}>
                                <FormGroup controlId='checkOut'>
                                    <FormLabel>Check-out date</FormLabel>
                                    <FormControl type='date' name='checkOut' value={searchQuery.checkOut} onChange={handleInputChange}
                                        min={moment().format("YYYY-MM-DD")} style={{ marginTop: '5px' }} />
                                </FormGroup>
                            </Col>

                            <Col xs={12} md={3}>
                                <FormGroup controlId='search'>
                                    <FormLabel style={{ marginLeft: '6px' }}>Find</FormLabel>
                                    <div className='d-flex'>
                                        &nbsp;<Button style={{ height: "50px", width: '100px' }} type='submit' onClick={handleSearch}>Search</Button>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Container>

                <div>
                    {isDisplay ? (

                        availableRooms.length > 0 ? (
                            <>
                                <h4>Available Hotels</h4>
                                <Container style={{ padding: '0px' }}>
                                    <Row>
                                        {availableRooms.map((hotel, index) => (
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
                            </>
                        ) : (
                            <p className="text-center">
                                No hotels available for the selected dates.
                            </p>
                        )
                    ) : (
                        <p className="text-center"></p>
                    )}
                </div>
            </div>
        </>
    )
}

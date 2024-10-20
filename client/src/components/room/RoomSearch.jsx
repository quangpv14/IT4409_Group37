import React, { useState } from 'react'
import moment from 'moment';
import { getAvailableRooms } from '../utils/ApiFunctions';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';


export const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkIn: "",
        checkOut: "",
        roomType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const checkIn = moment(searchQuery.checkIn)
        const checkOut = moment(searchQuery.checkOut)
        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage("Please enter valid dates")
            return
        }
        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage("Check-in date must come before check-out date ")
            return
        }
        setIsLoading(true)
        getAvailableRooms(searchQuery.checkIn, searchQuery.checkOut, searchQuery.roomType).then((response) => {
            setAvailableRooms(response.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkIn = moment(searchQuery.checkIn)
        const checkOut = moment(searchQuery.checkOut)
        if (checkIn.isValid() && checkOut.isValid()) {
            setErrorMessage("")
        }
    }

    const clearSearch = () => {
        setSearchQuery({
            checkIn: "",
            checkOut: "",
            roomType: ""
        })
        setAvailableRooms([])
    }

    return (
        <>
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
                            <FormGroup controlId='checkOut'>
                                <FormLabel></FormLabel>
                                <div className='d-flex'>
                                    &nbsp;<Button style={{ height: "50px", width: '100px' }} type='submit'>Search</Button>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHotel } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";

const DashboardComp = () => {
  return (
    <Container fluid>
      <div className="bg-primary text-white text-center py-3 mb-4" style={{ borderRadius: '8px' }}>
        <h3>Dashboard Overview</h3>
      </div>

            <Row className="g-4">
                <Col className='g-4'>
                    <Col md={3}>
                    <Card className="text-center" >
                        <Card.Body >

                        </Card.Body>
                    </Card>
                    </Col>
                    {/* Card 1: Total Hotels */}
                    <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                        <FaHotel size={50} className="text-primary mb-3" />
                        <Card.Title>Total Hotels:</Card.Title>
                        <Card.Text>
                            <span className="fs-1">6</span>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                </Col>                 

                <Col className='g-4'>
                    <Col md={3}>
                    <Card className="text-center" >
                        <Card.Body >

                        </Card.Body>
                    </Card>
                    </Col>
                    {/* Card 2: Total Rooms */}
                    <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                        <FaBed size={50} className="text-success mb-3" />
                        <Card.Title>Total Rooms:</Card.Title>
                        <Card.Text>
                            <span className="fs-1">6</span>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                </Col>

                <Col className='g-4'>
                    <Col md={4}>
                    <Card className="text-center" >
                        <Card.Body >

                        </Card.Body>
                    </Card>
                    </Col>
                    {/* Card 3: Total Amount */}
                    <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                        <GrMoney size={50} className="text-warning mb-3" />
                        <Card.Title>Total Amount:</Card.Title>
                        <Card.Text>
                            <span className="fs-1">6,000,000 VND</span>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                </Col>
      </Row>
    </Container>
  );
};

export default DashboardComp;

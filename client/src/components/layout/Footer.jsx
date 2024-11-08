import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-light border-top py-4 rounded-3 bg-footer" style={{
            borderTop: '2px solid rgba(6, 148, 162, 1)'
        }}>
            <Container style={{ maxWidth: '1500px' }}>
                <Row className="justify-content-between">
                    <Col md={4} className="mb-3">
                        <h5>
                            <Link to="/" className="text-decoration-none text-dark">
                                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-2 py-1 text-black">
                                    Booking
                                </span>
                                .com
                            </Link>
                        </h5>
                    </Col>
                    <Col md={2} className="mb-3">
                        <h6>About</h6>
                        <ul className="list-unstyled">
                            <li><Link to="#" className="text-muted">Careers</Link></li>
                            <li><Link to="#" className="text-muted">Services</Link></li>
                        </ul>
                    </Col>
                    <Col md={2} className="mb-3">
                        <h6>Help Center</h6>
                        <ul className="list-unstyled">
                            <li><Link to="#" className="text-muted">Github</Link></li>
                            <li><Link to="#" className="text-muted">Twitter</Link></li>
                        </ul>
                    </Col>
                    <Col md={2} className="mb-3">
                        <h6>Legal</h6>
                        <ul className="list-unstyled">
                            <li><Link to="#" className="text-muted">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-muted">Terms &amp; Conditions</Link></li>
                        </ul>
                    </Col>
                </Row>
                <hr />
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                        <p className="mb-0 text-muted">
                            © {currentYear} Booking.com
                        </p>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <Link to="#" className="text-muted me-3"><BsFacebook /></Link>
                        <Link to="#" className="text-muted me-3"><BsInstagram /></Link>
                        <Link to="#" className="text-muted me-3"><BsTwitter /></Link>
                        <Link to="#" className="text-muted me-3"><BsGithub /></Link>
                        <Link to="#" className="text-muted"><BsDribbble /></Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

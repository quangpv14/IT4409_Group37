import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

export const Help = () => {
    const [activeTab, setActiveTab] = useState('stays');
    const [activeItem, setActiveItem] = useState(null);

    const faqData = {
        stays: [
            { title: 'Cancellations', description: 'Details about cancellations.' },
            { title: 'Payment', description: 'Details about payment methods and issues.' },
            { title: 'Booking details', description: 'Booking details and processes.' },
            { title: 'Communications', description: 'How to communicate with the property.' },
            { title: 'Room types', description: 'Details about different room types.' },
            { title: 'Check-in & Check-out', description: 'Information about check-in and check-out procedures.' },
        ],
        'car-rentals': [
            { title: 'Reservation process', description: 'Details about reserving a car.' },
            { title: 'Insurance', description: 'Information about car rental insurance.' },
            { title: 'Pickup and return', description: 'Pickup and return processes for rentals.' },
            { title: 'Fuel policies', description: 'Details about fuel policies for rentals.' },
            { title: 'Rental terms', description: 'General rental terms and conditions.' },
            { title: 'Additional services', description: 'Additional services such as GPS, car seat rentals.' },
        ],
        flights: [
            { title: 'Booking process', description: 'How to book a flight.' },
            { title: 'Flight changes', description: 'Changing or canceling your flight.' },
            { title: 'Baggage', description: 'Baggage policies for flights.' },
            { title: 'Seat selection', description: 'How to select seats during booking.' },
            { title: 'Flight delays', description: 'What to do if your flight is delayed.' },
            { title: 'Refunds', description: 'How to request a flight refund.' },
        ],
        'airport-taxis': [
            { title: 'Booking', description: 'How to book an airport taxi.' },
            { title: 'Pricing', description: 'Pricing details for airport taxis.' },
            { title: 'Cancellations', description: 'Cancellation policies for airport taxis.' },
            { title: 'Payment options', description: 'Available payment options for taxi services.' },
            { title: 'Taxi schedules', description: 'Information about taxi availability and schedules.' },
            { title: 'Service areas', description: 'Details on the areas covered by the airport taxi service.' },
        ],
        insurance: [
            { title: 'Travel insurance', description: 'Information about travel insurance.' },
            { title: 'Coverage', description: 'Details on coverage offered by insurance.' },
            { title: 'Claims', description: 'How to file an insurance claim.' },
            { title: 'Exclusions', description: 'What is not covered by the insurance policy.' },
            { title: 'Policy details', description: 'Detailed breakdown of the insurance policy.' },
            { title: 'Renewals', description: 'How to renew your insurance policy.' },
        ],
        other: [
            { title: 'Lost items', description: 'What to do if you lose an item.' },
            { title: 'Complaints', description: 'How to file a complaint.' },
            { title: 'Customer support', description: 'How to contact customer support.' },
            { title: 'Refunds', description: 'How to request a refund.' },
            { title: 'General inquiries', description: 'General inquiries about services.' },
            { title: 'Feedback', description: 'How to provide feedback on services.' },
        ],
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setActiveItem(null); // Reset active item when switching tabs
    };

    return (
        <Container style={{ height: '90vh', paddingTop: '40px' }}>
            <h3>Frequently Asked Questions</h3>
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'stays' ? 'active' : ''}`}
                    onClick={() => handleTabClick('stays')}
                >
                    Stays
                </button>
                <button
                    className={`tab-button ${activeTab === 'car-rentals' ? 'active' : ''}`}
                    onClick={() => handleTabClick('car-rentals')}
                >
                    Car rentals
                </button>
                <button
                    className={`tab-button ${activeTab === 'flights' ? 'active' : ''}`}
                    onClick={() => handleTabClick('flights')}
                >
                    Flights
                </button>
                <button
                    className={`tab-button ${activeTab === 'airport-taxis' ? 'active' : ''}`}
                    onClick={() => handleTabClick('airport-taxis')}
                >
                    Airport taxis
                </button>
                <button
                    className={`tab-button ${activeTab === 'insurance' ? 'active' : ''}`}
                    onClick={() => handleTabClick('insurance')}
                >
                    Insurance
                </button>
                <button
                    className={`tab-button ${activeTab === 'other' ? 'active' : ''}`}
                    onClick={() => handleTabClick('other')}
                >
                    Other
                </button>
            </div>

            <div className="faq-content">
                {faqData[activeTab].map((item, index) => (
                    <div key={index} className="faq-item">
                        <button
                            className={`faq-title ${activeItem === index ? 'active' : ''}`}
                            onClick={() => setActiveItem(activeItem === index ? null : index)} // Toggle description visibility
                        >
                            <span>{item.title}</span>
                            <span style={{ float: 'right', fontStyle: 'italic', fontSize: '14px' }}>{item.description}</span>
                        </button>
                    </div>
                ))}
            </div>
        </Container>
    );
};

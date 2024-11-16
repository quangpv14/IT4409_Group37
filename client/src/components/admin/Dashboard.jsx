import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import DashSidebar from './DashSidebar';
import DashHotelManagement from './DashHotelManagement';
import DashRoomManagement from './DashRoomManagement';
import DashboardComp from './DashboardComp';

export const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const validTabs = ['dashboard', 'hotel-management', 'room-management'];
  const currentTab = validTabs.includes(tab) ? tab : 'dashboard';

  return (
    <Container fluid className="max-h-screen">
      <Row style={{ height: '100vh' }}>
        <Col md={3} className="bg-light" style={{ width: '20%', padding: '0px' }}>
          {/* Sidebar */}
          <DashSidebar />
        </Col>
        <Col md={9} style={{ width: '80%' }}>

          {/* Content */}
          {currentTab === 'dashboard' && <DashboardComp />}
          {currentTab === 'hotel-management' && <DashHotelManagement />}
          {currentTab === 'room-management' && <DashRoomManagement />}
        </Col>
      </Row>
    </Container>
  );
}

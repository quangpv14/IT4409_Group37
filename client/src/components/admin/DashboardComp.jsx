import React, { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHotel, FaBed } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';

const DashboardComp = () => {

  const containerStyle = {
    alignItems: "flex-start", // Căn các nội dung bắt đầu từ trên cùng
    justifyContent: "space-between", // Chia đều hai cột
    gap: "16px", // Khoảng cách giữa các cột
  };

  const iconContainerStyle = {
    border: '1px solid #ccc', // Viền cho khung icon
    borderRadius: '50%', // Biến khung thành hình tròn
    padding: '25px', // Khoảng cách bên trong khung icon
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1', // Màu nền khung icon
    marginRight: '10px', // Khoảng cách giữa icon và văn bản
  };

  const iconStyle = {
    fontSize: '40px', // Tăng kích thước icon
  };

  const pStyle = {
    fontSize: "18px",
    margin: "0",
  };

  const textContainerStyle = {
    //border: '1px solid #ccc', // Viền cho khung văn bản
    borderRadius: '8px',
    padding: '10px', // Khoảng cách bên trong
    backgroundColor: '#f9f9f9',
    flex: 1, // Giãn ra để chiếm không gian còn lại
  };

  const outerContainerStyle = {
    border: "1px solid #ccc", // Viền cho thẻ lớn
    borderRadius: "8px", // Góc tròn
    padding: "20px 8px", // Khoảng cách bên trong
    backgroundColor: "#f9f9f9", // Màu nền nhẹ
  };

  const flexRowStyle = {
    display: 'flex',
    alignItems: 'center', // Đưa icon và thẻ `<p>` cùng dòng
    gap: '10px', // Khoảng cách giữa icon và văn bản
  };

  return (
    <Container fluid style={containerStyle}>
      <div className="text-black text-center py-3" style={{ borderRadius: '8px', height: '65px' }}>
        <h3>Dashboard Overview</h3>
      </div>
      <div>
        <Row className="justify-content-center">
          {/* Card 1: Total Hotels */}
          <Col xs={12} sm={6} md={4}>
            <div style={outerContainerStyle} >
              <div style={flexRowStyle}>
                <div style={{ iconContainerStyle }}>
                  <FaHotel style={iconStyle} className="text-primary" />
                </div>
                <div style={textContainerStyle}>
                  <p style={pStyle}>Managed Hotel Inventory: 6</p>
                </div>
              </div>
            </div>

          </Col>
          {/* Card 2: Total Rooms */}
          <Col xs={12} sm={6} md={4}>
            <div style={outerContainerStyle} >
              <div style={flexRowStyle}>
                <div style={{ iconContainerStyle }}>
                  <FaBed style={iconStyle} className="text-success" />
                </div>
                <div style={textContainerStyle}>
                  <p style={pStyle}>Managed Room Inventory: 6</p>
                </div>
              </div>
            </div>
          </Col>
          {/* Card 3: Total Amount */}
          <Col xs={12} sm={6} md={4}>
            <div style={outerContainerStyle}>
              <div style={flexRowStyle}>
                <div style={{ iconContainerStyle }}>
                  <GrMoney style={iconStyle} className="text-warning" />
                </div>
                <div style={textContainerStyle}>
                  <p style={pStyle}>Total Amount: 6000000 VND</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

    </Container>
  );
};

export default DashboardComp;

import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import { FaHotel, FaBed } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import {
  fectchBooking, fectchAllBooking, getHotelsByAdmin,
  fetchRooms, fectchTotalAmount
} from "../utils/ApiFunctions";
import { FiSearch } from 'react-icons/fi';

const DashboardComp = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [error, setError] = useState("");
  const [hotelManagers, setHotelManagers] = useState([]);
  const [roomManagers, setRoomManagers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalRoom, setTotalRoom] = useState(0);
  const email = localStorage.getItem("email");

  useEffect(() => {
    // Gọi hàm getAllHotels khi component mount
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const data = await getHotelsByAdmin(email);
        setHotelManagers(data);

      } catch (err) {
        setError('Failed to fetch hotels');
        setTimeout(() => setError(""), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [email]);

  useEffect(() => {
    // Gọi hàm getAllHotels khi component mount
    const fetchTotalAmount = async () => {
      setLoading(true);
      try {
        let params = { email: email };
        const amount = await fectchTotalAmount(params);
        setTotalAmount(amount.data);

      } catch (err) {
        setError('Failed to fetch data');
        setTimeout(() => setError(""), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, [email]);



  useEffect(() => {
    let hotelIds = hotelManagers?.map((hotel) => hotel.id) || [];
    let params = {
      hotelIds: hotelIds,
      page: 0,
      size: pageSize,
      keyword: '',
    };
    if (hotelIds.length > 0) {
      const getRooms = async () => {
        //setLoading(true);
        try {
          const response = await fetchRooms(params);
          setRoomManagers(response.data.content);
          setTotalRoom(response.data.numberOfElements);
        } catch (error) {
          console.log("Error fetching rooms:", error);
        }
      };

      getRooms();
    }

  }, [hotelManagers]);

  useEffect(() => {
    const fetchAllBooking = async (page) => {
      setLoading(true);
      try {
        const params = { email: email, page, size: pageSize };
        const response = await fectchBooking(params);
        setBookings(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Failed to fetch. Please try again later.");
        setTimeout(() => setError(""), 2000);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooking(currentPage);
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
    <div>
      {loading && <div className="loading-overlay">Loading...</div>}
      {error && <p className="alert alert-danger profile-alert">{error}</p>}

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
                    <p style={pStyle}>Managed Hotel Inventory: {hotelManagers?.length > 0 ? hotelManagers.length : 0}</p>
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
                    <p style={pStyle}>Managed Room Inventory: {totalRoom}</p>
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
                    <p style={pStyle}>Total Amount: {totalAmount ? totalAmount.totalAmount : 0} VND</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div style={{ marginTop: '15px' }}>
          <div><h4>Bookings for Today</h4></div>
          <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#003366", color: "white", border: "1px solid #ccc" }}>
                <tr>
                  <th style={{ border: "1px solid #ccc" }}>No</th>
                  <th style={{ border: "1px solid #ccc" }}>Customer Name</th>
                  <th style={{ border: "1px solid #ccc" }}>Check-in</th>
                  <th style={{ border: "1px solid #ccc" }}>Check-out</th>
                  <th style={{ border: "1px solid #ccc" }}>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings?.map((order, index) => (
                    <tr
                      key={order.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#cecece" : "#fff",
                        border: "1px solid gray",
                      }}
                    >
                      <td style={{ border: "1px solid gray", textAlign: "center" }}>{index + 1}</td>
                      <td
                        style={{ maxWidth: "260px" }} className="ellipse-text"
                        title={order.customerName} // Tooltip to show full text
                      >
                        {order.customerName}
                      </td>
                      <td style={{ border: "1px solid gray", minWidth: "100px" }}>{order.checkinDate}</td>
                      <td style={{ border: "1px solid gray", minWidth: "100px" }}>{order.checkoutDate}</td>
                      <td style={{ border: "1px solid gray", minWidth: "100px" }}>{order.totalCost} VND</td>

                    </tr>
                  ))

                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "10px", fontStyle: "italic", color: "gray" }}>
                      {loading ? '' : 'No bookings for today.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {bookings?.length > 0 ? (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {renderPagination()}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardComp;

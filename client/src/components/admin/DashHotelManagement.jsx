import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

const DashHotelManagement = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    checkin: "",
    checkout: "",
    parking: false,
    keepLuggage: false,
    freeWifi: false,
    laundryService: false,
    roomService: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      address: "",
      description: "",
      checkin: "",
      checkout: "",
      parking: false,
      keepLuggage: false,
      freeWifi: false,
      laundryService: false,
      roomService: false,
    });
    setShowCreateDialog(true);
  };

  const handleEdit = (hotel) => {
    setFormData(hotel);
    setSelectedHotel(hotel);
    setShowEditDialog(true);
  };

  const submitToServer = () => {
    console.log("Submitting Data:", formData);
    console.log("Submitting Data:", formData);
    console.log("Submitting Data:", formData);
    console.log("Submitting Data:", formData);
    // setShowCreateDialog(false);
    // setShowEditDialog(false);
    // setShowSuccessDialog(true); 
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
  };

  const handleDelete = (hotel) => {
    setSelectedHotel(hotel);
    setShowDeleteDialog(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setShowDeleteDialog(false);
    setSelectedHotel(null);
  };

  // Hàm xóa khách sạn
  const confirmDelete = (hotel) => {

    setShowDeleteDialog(false);  // Đóng modal sau khi xóa
    setSelectedHotel(null);  // Reset selectedHotel
  };

  //const [hotelManagers, setHotelManagers] = useState([]);
  const hotelManagers = [
    {
      id: 1,
      name: "Hotel Paradise",
      address: "123 Ocean View Street, Miami",
      description: "A luxurious hotel by the beach with breathtaking views.",
      checkin: "14:00",
      checkout: "12:00",
      parking: true,
      keep_luggage: true,
      free_wifi: true,
      laundry_service: false,
      room_service: true,
    },
    {
      id: 2,
      name: "Mountain Retreat",
      address: "456 Alpine Road, Denver",
      description: "A peaceful getaway in the mountains.",
      checkin: "15:00",
      checkout: "11:00",
      parking: true,
      keep_luggage: false,
      free_wifi: true,
      laundry_service: true,
      room_service: false,
    },
    {
      id: 3,
      name: "City Central Hotel",
      address: "789 Downtown Avenue, New York",
      description: "A modern hotel located in the heart of the city.",
      checkin: "13:00",
      checkout: "10:00",
      parking: false,
      keep_luggage: true,
      free_wifi: true,
      laundry_service: true,
      room_service: true,
    },
    {
      id: 4,
      name: "Safari Lodge",
      address: "101 Savanna Road, Nairobi",
      description: "Experience the wild with luxury at this safari lodge.",
      checkin: "16:00",
      checkout: "11:00",
      parking: true,
      keep_luggage: true,
      free_wifi: false,
      laundry_service: true,
      room_service: false,
    },
    {
      id: 5,
      name: "Tropical Haven",
      address: "202 Island Lane, Honolulu",
      description: "A relaxing tropical resort surrounded by nature.",
      checkin: "14:00",
      checkout: "12:00",
      parking: true,
      keep_luggage: true,
      free_wifi: true,
      laundry_service: true,
      room_service: true,
    },
  ];

  // Lấy dữ liệu từ API
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/hotel-managers")
  //     .then((response) => {
  //       setHotelManagers(response.data); // Lưu dữ liệu vào state
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi gọi API:", error);
  //     });
  // }, []);

  return (
    <div style={{ height: '100vh', marginRight: '30px' }}>
      <h1 style={{ textAlign: 'center' }}>Hotel Manager</h1>
      <div className="hotel-function">
        <div className="search-area">
          {/* Search Input with Placeholder */}
          <input type="text" placeholder="Search hotels..."
            className="hotel-search"
          />
          {/* Search Button with React Icon */}
          <button className="btn btn-search" style={{ marginLeft: '5px' }}>
            <FiSearch size={18} />
            Search
          </button>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {/* Create Hotel Button */}
          <button className="btn btn-create" onClick={handleCreate}>
            Create Hotel
          </button>
        </div>

      </div>
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#003366", color: "white", border: "1px solid #ccc" }}>
            <tr>
              <th style={{ border: "1px solid #ccc" }}>No</th>
              <th style={{ border: "1px solid #ccc" }}>Hotel Name</th>
              <th style={{ border: "1px solid #ccc" }}>Address</th>
              <th style={{ border: "1px solid #ccc" }}>Description</th>
              <th style={{ border: "1px solid #ccc" }}>Check-in</th>
              <th style={{ border: "1px solid #ccc" }}>Check-out</th>
              <th style={{ border: "1px solid #ccc" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotelManagers.map((hotel, index) => (
              <tr
                key={hotel.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#cecece" : "#fff",
                  border: "1px solid gray",
                }}
              >
                <td style={{ border: "1px solid gray", textAlign: "center" }}>{index + 1}</td>
                <td style={{ border: "1px solid gray" }}>{hotel.name}</td>
                <td style={{ border: "1px solid gray" }}>{hotel.address}</td>
                <td
                  style={{
                    border: "1px solid gray",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px", // Adjust as needed
                  }}
                  title={hotel.description} // Tooltip to show full text
                >
                  {hotel.description}
                </td>
                <td style={{ border: "1px solid gray" }}>{hotel.checkin}</td>
                <td style={{ border: "1px solid gray" }}>{hotel.checkout}</td>
                <td style={{ border: "1px solid gray", textAlign: "center", padding: "2px" }}>
                  {/* Edit Button */}
                  <button
                    style={{
                      backgroundColor: "#007BFF", // Blue color
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "2px 3px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}

                    onClick={() => handleEdit(hotel)}
                  >
                    <FaEdit style={{ marginBottom: '3px' }} />
                  </button>
                  {/* Delete Button */}
                  <button
                    style={{
                      backgroundColor: "#FF4136", // Red color
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "2px 3px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(hotel)}
                  >
                    <FaTrashAlt style={{ marginBottom: '1px' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show the create or edit dialog */}
      {(showCreateDialog || showEditDialog) && (
        <Modal size='lg' backdrop="static" show={showCreateDialog || showEditDialog} onHide={() => {
          setShowCreateDialog(false);
          setShowEditDialog(false);
        }}>
          <Modal.Header closeButton>
            <Modal.Title>{showCreateDialog ? "Create Hotel" : `Edit Hotel: ${selectedHotel?.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formHotelName" style={{ marginBottom: '0.5rem' }}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter hotel name"
                />
              </Form.Group>

              <Form.Group controlId="formHotelAddress" style={{ marginBottom: '0.5rem' }}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter hotel address"
                />
              </Form.Group>

              <Form.Group controlId="formHotelDescription" style={{ marginBottom: '0.5rem' }}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  style={{ minHeight: '100px' }}
                />
              </Form.Group>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <Form.Group controlId="formHotelCheckin " style={{ flex: 1 }} >
                <Form.Label>Check-in</Form.Label>
                <Form.Control
                  type="text"
                  name="checkin"
                  value={formData.checkin}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formHotelCheckout" style={{ flex: 1 }} >
                <Form.Label>Check-out</Form.Label>
                <Form.Control
                  type="text"
                  name="checkout"
                  value={formData.checkout}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              </div>

              {/* Checkbox options */}
              {['parking', 'keepLuggage', 'freeWifi', 'laundryService', 'roomService'].map((service) => (
                <Form.Group key={service} controlId={`formHotel${service}`}>
                  <Form.Check
                    type="checkbox"
                    label={service.charAt(0).toUpperCase() + service.slice(1).replace(/([A-Z])/g, ' $1')}
                    name={service}
                    checked={formData[service]}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={submitToServer}>
              Submit
            </Button>
            <Button variant="secondary" onClick={() => {
              setShowCreateDialog(false);
              setShowEditDialog(false);
            }}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="dialog" style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", background: "#fff", marginTop: "20px" }}>
          <h2>{selectedHotel ? "Update Successful!" : "Hotel Created Successfully!"}</h2>
          <button
            onClick={handleSuccessDialogClose}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            OK
          </button>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteDialog} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the hotel <strong>{selectedHotel?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => confirmDelete(selectedHotel)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashHotelManagement;

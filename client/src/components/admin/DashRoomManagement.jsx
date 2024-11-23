import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

const DashRoomManagement = () => {
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
    price: "",
    roomType: "",
    hotelId: ""
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
      description: "",
      price: "",
      roomType: "",
      hotelId: "",
    });
    setShowCreateDialog(true);
  };

  const handleEdit = (room) => {
    setFormData(room);
    setSelectedRoom(room);
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

  const handleDelete = (room) => {
    setSelectedRoom(room);
    setShowDeleteDialog(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setShowDeleteDialog(false);
    setSelectedRoom(null);
  };

  // Hàm xóa phòng
  const confirmDelete = (room) => {

    setShowDeleteDialog(false);  // Đóng modal sau khi xóa
    setSelectedRoom(null);  // Reset selectedRoom
  };

  //const [roomManagers, setRoomManagers] = useState([]);
  const roomManagers = [
    {
      id: 1,
      description: "A luxurious suite with a stunning sea view.",
      price: 250,
      roomType: "Suite",
      hotelId: 101,
    },
    {
      id: 2,
      description: "A comfortable single room in the city center.",
      price: 80,
      roomType: "Single",
      hotelId: 102,
    },
    {
      id: 3,
      description: "A spacious double room with modern amenities.",
      price: 150,
      roomType: "Double",
      hotelId: 103,
    },
    {
      id: 4,
      description: "A budget-friendly room with basic facilities.",
      price: 50,
      roomType: "Economy",
      hotelId: 104,
    },
    {
      id: 5,
      description: "A premium king-sized suite with all-inclusive services.",
      price: 400,
      roomType: "King Suite",
      hotelId: 105,
    },
  ];

  // Lấy dữ liệu từ API
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/room-managers")
  //     .then((response) => {
  //       setRoomManagers(response.data); // Lưu dữ liệu vào state
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi gọi API:", error);
  //     });
  // }, []);

  return (
    <div style={{ height: '100vh', marginRight: '30px' }}>
      <h1 style={{ textAlign: 'center' }}>Room Manager</h1>
      <div className="room-function" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        <div className="search-area" >
          {/* Search Input with Placeholder */}
          <input type="text" placeholder="Search rooms..."
            className="room-search"
            style={{ flex: 1, padding: '0.5rem', borderRadius: '90px', border: '1px solid #ccc' }}
          />
          {/* Search Button with React Icon */}
          <button className="btn btn-search" style={{ marginLeft: '5px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }}>
            <FiSearch size={18} />
            <span style={{ marginLeft: '5px' }}>Search</span>
          </button>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {/* Create Room Button */}
          <button className="btn btn-create" onClick={handleCreate}>
            Create Room
          </button>
        </div>
      </div>

      <div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#003366", color: "white", border: "1px solid #ccc" }}>
            <tr>
              <th style={{ border: "1px solid #ccc" }}>Id</th>
              <th style={{ border: "1px solid #ccc" }}>Description</th>
              <th style={{ border: "1px solid #ccc" }}>Price</th>
              <th style={{ border: "1px solid #ccc" }}>Room type</th>
              <th style={{ border: "1px solid #ccc" }}>Hotel Id</th>
            </tr>
          </thead>
          <tbody>
            {roomManagers.map((room, index) => (
              <tr
                key={room.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#cecece" : "#fff",
                  border: "1px solid gray",
                }}
              >
                <td style={{ border: "1px solid gray", textAlign: "center" }}>{index + 1}</td>
                <td style={{ border: "1px solid gray" }}>{room.description}</td>
                <td style={{ border: "1px solid gray" }}>{room.price}</td>
                <td style={{ border: "1px solid gray" }}>{room.roomType}</td>
                <td style={{ border: "1px solid gray" }}>{room.hotelId}</td>
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

                    onClick={() => handleEdit(room)}
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
                    onClick={() => handleDelete(room)}
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
            <Modal.Title>{showCreateDialog ? "Create Room" : `Edit Room: ${selectedRoom?.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formDescription" style={{ marginBottom: '0.5rem' }}>
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

              <Form.Group controlId="formPrice" style={{ marginBottom: '0.5rem' }}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter Price"
                />
              </Form.Group>

              <Form.Group controlId="formRoomType" style={{ marginBottom: '0.5rem' }}>
                <Form.Label>Room type</Form.Label>
                <Form.Control
                  type="text"
                  name="room_type"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  placeholder="Enter room type"
                />
              </Form.Group>

              <Form.Group controlId="formHotelId " style={{ flex: 1 }} >
                <Form.Label>Hotel Id</Form.Label>
                <Form.Control
                  type="text"
                  name="HotelId"
                  value={formData.hotelId}
                  onChange={handleInputChange}
                  placeholder="Enter hotel Id"
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: "none" }}>
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
          <h2>{selectedRoom ? "Update Successful!" : "Room Created Successfully!"}</h2>
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
          Are you sure you want to delete the room <strong>{selectedRoom?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => confirmDelete(selectedRoom)}>
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

export default DashRoomManagement;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoCheckmarkCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { app, storage } from '../../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { createRoom, updateRoom, getRoomsByAdmin } from "../utils/ApiFunctions";
import { createHotel, updateHotel, getHotelsByAdmin } from "../utils/ApiFunctions";

const DashRoomManagement = () => {
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);
    const [roomManagers, setRoomManagers] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const { email, isAdmin } = useSelector((state) => state.user);
    const [images, setImages] = useState([]); // Lưu trữ file ảnh được chọn
    const [progressPercents, setProgressPercents] = useState([]); // Lưu tiến độ của từng ảnh
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState("");

  const [formData, setFormData] = useState({
    hotelId: "",
    roomType: "",
    description: "",
    price: "",
  });

  const handleFileChange = (e) => {
    setMessage("");
    setErrorMessage("");
    const selectedFiles = Array.from(e.target.files);
    setImages(Array.from(e.target.files)); // Chuyển các file ảnh thành một mảng
    if (images.length > 5) {
      setErrorMessage("You can upload a maximum of 5 images.");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }
    setProgressPercents(Array.from(e.target.files).map(() => 0));
  };

  const handleUploadImages = () => {
    images.forEach((image, index) => {
      const storageRef = ref(storage, `files/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgressPercents((prev) => {
            const newProgress = [...prev];
            newProgress[index] = progress;
            return newProgress;
          });
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prevData) => ({
              ...prevData,
              paths: [...(prevData.paths || []), downloadURL],
            }));
          });
        }
      );
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCreate = () => {
    setFormData({
      hotelId: "",
      description: "",
      price: "",
      roomType: "",
    });
    setShowCreateDialog(true);
  };

  const handleEdit = (room) => {
    setFormData(room);
    setSelectedRoom(room);
    setShowEditDialog(true);
  };

  const submitToServer = () => {
    if (formData.name === "" || formData.address === "" || formData.description === "" || formData.checkin === "" ||
      formData.checkout === "" || formData.paths.length === 0) {
      setErrorMessage("Please fill in all the information!");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (showCreateDialog) {
      createRoom(formData)
        .then((response) => {
          setShowCreateDialog(false);
          setShowEditDialog(false);
          setShowSuccessDialog(true);
        })
        .catch((error) => {
          setShowErrorDialog(true);
        });
    } else if (showEditDialog) {
      updateRoom(selectedRoom.id, formData)
        .then((response) => {
          setShowCreateDialog(false);
          setShowEditDialog(false);
          setShowErrorDialog(true);
        })
        .catch((error) => {
          setShowErrorDialog(true);
        });
    }

    console.log("Submitting Data:", formData);
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    setShowCreateDialog(false);
    setShowEditDialog(false);
  };

  const handleErrorDialogClose = () => {
    setShowErrorDialog(false);
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
  // const roomManagers = [
  //   {
  //     id: 1,
  //     description: "A luxurious suite with a stunning sea view.",
  //     price: 250,
  //     roomType: "Suite",
  //     hotelId: 101,
  //   },
  //   {
  //     id: 2,
  //     description: "A comfortable single room in the city center.",
  //     price: 80,
  //     roomType: "Single",
  //     hotelId: 102,
  //   },
  //   {
  //     id: 3,
  //     description: "A spacious double room with modern amenities.",
  //     price: 150,
  //     roomType: "Double",
  //     hotelId: 103,
  //   },
  //   {
  //     id: 4,
  //     description: "A budget-friendly room with basic facilities.",
  //     price: 50,
  //     roomType: "Economy",
  //     hotelId: 104,
  //   },
  //   {
  //     id: 5,
  //     description: "A premium king-sized suite with all-inclusive services.",
  //     price: 400,
  //     roomType: "King Suite",
  //     hotelId: 105,
  //   },
  // ];

  // Lấy dữ liệu từ API
  useEffect(() => {
    // Gọi hàm getAllRooms khi component mount
    const fetchData = async () => {
      try {
        // Lấy danh sách phòng
        const data = await getRoomsByAdmin(email);
        setRoomManagers(data);

        // Lấy danh sách khách sạn
        const hotelData = await getHotelsByAdmin(email);
        setHotels(hotelData);
      } catch (err) {
        setErrorLoading('Failed to fetch hotels');
        setTimeout(() => setErrorLoading(""), 2000);
      }
    };
    fetchData();
  }, []);

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
              <th style={{ border: "1px solid #ccc" }}>No</th>
              <th style={{ border: "1px solid #ccc" }}>Hotel Id</th>
              <th style={{ border: "1px solid #ccc" }}>Price</th>
              <th style={{ border: "1px solid #ccc" }}>Description</th>
              <th style={{ border: "1px solid #ccc" }}>Room type</th>
              <th style={{ border: "1px solid #ccc" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roomManagers?.map((room, index) => (
              <tr
                key={room.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#cecece" : "#fff",
                  border: "1px solid gray",
                }}
              >
                <td style={{ border: "1px solid gray", textAlign: "center" }}>{index + 1}</td>
                <td style={{ border: "1px solid gray" }}>{room.id}</td>
                <td style={{ border: "1px solid gray" }}>{room.price}</td>
                <td style={{ border: "1px solid gray" }}>{room.description}</td>
                <td style={{ border: "1px solid gray" }}>{room.roomType}</td>
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
            {showCreateDialog && (
            <Form.Group controlId="formChooseHotel " style={{ flex: 1 }} >
            <Form.Label>Choose Hotel</Form.Label>
            <Form.Control
              as="select"
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
              required
            >
              <option value="">
                select a hotel
              </option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
            </Form.Control>
            </Form.Group>
          )}

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

              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Choose images</Form.Label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Control type="file" multiple onChange={handleFileChange} />
                  <Button
                    variant="secondary"
                    onClick={handleUploadImages}
                    style={{ marginLeft: '5px' }}
                  >
                    Upload
                  </Button>
                </div>

              </Form.Group>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {formData.paths?.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt="uploaded file"
                    style={{
                      width: "130px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      padding: "5px",
                      background: "#f0f0f0",
                    }}
                  />
                ))}
              </div>

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

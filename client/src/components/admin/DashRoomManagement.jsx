import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { app, storage } from '../../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { createRoom, updateRoom, getRoomsByAdmin, fetchRooms } from "../utils/ApiFunctions";
import { createHotel, updateHotel, getHotelsByAdmin } from "../utils/ApiFunctions";

const DashRoomManagement = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [roomManagers, setRoomManagers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { email, isAdmin } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [progressPercents, setProgressPercents] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(-1);

  const [page, setPage] = useState(0); // Trang hiện tại
  const [size, setSize] = useState(10); // Số lượng phòng mỗi trang
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang

  const [formData, setFormData] = useState({
    number: 101,
    roomType: "",
    description: "",
    price: 199000,
    paths: [],
    hotelName: "",
    hotelId: "",
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
    setSelectedHotelId("");
    setFormData({
      number: 101,
      description: "",
      price: 199000,
      roomType: "",
      paths: [],
    });
    setShowCreateDialog(true);
  };

  const handleEdit = (room) => {
    setFormData(room);
    setSelectedRoom(room);
    setShowEditDialog(true);
  };

  const submitToServer = () => {
    console.log(selectedHotelId);
    if (formData.roomType === "" || formData.description === "" || formData.paths.length === 0) {
      setErrorMessage("Please fill in all the information!");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (showCreateDialog) {
      setLoading(true);
      createRoom(selectedHotelId, formData)
        .then((response) => {
          setShowSuccessDialog(true);
        })
        .catch((error) => {
          setErrorMessage("An error has occurred. Please try again later.");
          setTimeout(() => setErrorMessage(""), 2000);
          return;
        }).finally(() => setLoading(false));
    } else if (showEditDialog) {
      setLoading(true);
      updateRoom(selectedRoom.id, formData)
        .then((response) => {
          setShowSuccessDialog(true);
        })
        .catch((error) => {
          setErrorMessage("An error has occurred. Please try again later.");
          setTimeout(() => setErrorMessage(""), 2000);
          return;
        }).finally(() => setLoading(false));
    }

  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    setShowCreateDialog(false);
    setShowEditDialog(false);
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

  // Lấy dữ liệu từ API
  useEffect(() => {
    // Gọi hàm getAllRooms khi component mount
    const fetchData = async () => {
      setLoading(true);
      try {

        // Lấy danh sách khách sạn
        const hotelData = await getHotelsByAdmin(email);
        setHotels(hotelData);
      } catch (err) {
        setErrorLoading('Failed to fetch hotels');
        setTimeout(() => setErrorLoading(""), 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Gọi API khi trang thay đổi hoặc size thay đổi

  useEffect(() => {
    let hotelIds = hotels?.map((hotel) => hotel.id) || [];
    let params = {
      hotelIds: hotelIds,
      page: page,
      size: 1,
      keyword: '',
    };
    if (hotelIds.length > 0) {
      const getRooms = async () => {
        setLoading(true);
        try {
          const response = await fetchRooms(params);
          setRoomManagers(response.data.content);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.log("Error fetching rooms:", error);
        } finally {
          setLoading(false);
        }
      };

      getRooms();
    }

  }, [hotels]);

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  return (
    <div style={{ height: '100vh', marginRight: '30px' }}>
      {loading && <div className="loading-overlay">Loading...</div>}
      {errorLoading && <p className="alert alert-danger profile-alert">{errorLoading}</p>}
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
              <th style={{ border: "1px solid #ccc" }}>Room Number</th>
              <th style={{ border: "1px solid #ccc" }}>Hotel Name</th>
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
                <td style={{ border: "1px solid gray", maxWidth: '45px', minWidth: '45px' }}>{room.number}</td>
                <td style={{ maxWidth: "220px" }} className="ellipse-text">{room.hotelName}</td>
                <td style={{ border: "1px solid gray", minWidth: '100px' }}>{room.price} VND</td>
                <td style={{ maxWidth: "220px" }} className="ellipse-text">{room.description}</td>
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

        {/* Phần phân trang */}
        {totalPages > 0 && (
          <div style={{ marginTop: '15px', justifyContent: 'center' }} className="search-area">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}
              style={{ background: "none", border: "none", cursor: page === 0 ? "not-allowed" : "pointer" }}>
              <MdArrowBackIos size={16} color={page === 0 ? "gray" : "black"} />
            </button>
            <span> {page + 1} / {totalPages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}
              style={{ background: "none", border: "none", cursor: page === totalPages - 1 ? "not-allowed" : "pointer" }}
            >
              <MdArrowForwardIos size={16} color={page === totalPages - 1 ? "gray" : "black"} />
            </button>
          </div>
        )}
      </div>

      {/* Show the create or edit dialog */}
      {(showCreateDialog || showEditDialog) && (
        <Modal size='lg' backdrop="static" show={showCreateDialog || showEditDialog} onHide={() => {
          setShowCreateDialog(false);
          setShowEditDialog(false);
          setSelectedHotelId("");
        }}>
          <Modal.Header closeButton style={{ padding: '12px' }}>
            <Modal.Title>{showCreateDialog ? "Create Room" : `Edit Room`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {errorMessage && <p className="alert alert-danger profile-alert" style={{ top: '50px' }}>{errorMessage}</p>}
                {message && <p className="alert alert-success profile-alert" style={{ top: '50px' }} >{message}</p>}
                <div style={{ width: '50%' }}>
                  <Form.Group controlId="formChooseHotel " style={{ flex: 1 }} >
                    <Form.Label>Choose the hotel</Form.Label>
                    {showCreateDialog ? (
                      <Form.Control
                        as="select"
                        value={selectedHotelId}
                        onChange={(e) => setSelectedHotelId(e.target.value)}
                        required
                      >
                        <option value="">Select a hotel</option>
                        {hotels.map((hotel) => (
                          <option key={hotel.id} value={hotel.id}>
                            {hotel.name}
                          </option>
                        ))}
                      </Form.Control>
                    ) : (
                      <Form.Control
                        as="input"
                        value={hotels.find((hotel) => hotel.id === selectedRoom.hotelId)?.name || ""}
                        readOnly
                        style={{
                          backgroundColor: "#e9ecef",
                          border: "1px solid #ced4da",
                          cursor: "not-allowed",
                        }}
                      />
                    )}
                  </Form.Group>
                </div>
                <div style={{ width: '50%' }}>
                  <Form.Group controlId="formRoomNumber" style={{ marginBottom: '0.5rem' }}>
                    <Form.Label>Room number</Form.Label>
                    <Form.Control
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="Enter room number"
                    />
                  </Form.Group>
                </div>
              </div>

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

              <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
                {formData.paths?.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt="uploaded file"
                    style={{
                      width: "234px",
                      height: "130px",
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
                  name="roomType"
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
      <Modal centered size="sm" show={showSuccessDialog} backdrop="static" onHide={handleSuccessDialogClose}>
        <Modal.Header style={{ height: '50px', color: 'white', backgroundColor: '#28a745' }}>
          <Modal.Title className="user-info">
            <IoCheckmarkCircle style={{ marginRight: '10px' }} />
            Success
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ marginTop: '8px' }}>{showEditDialog ? "Room update successfully!" : "Room created successfully!"}</h6>
        </Modal.Body>
        <Modal.Footer style={{ padding: '0px', backgroundColor: '#EEEEEE' }}>
          <div className="btn-center" style={{ padding: '1px 0px', backgroundColor: '#f5f5f6' }}>
            <button
              onClick={handleSuccessDialogClose}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "3px 13px",
                borderRadius: "5px",
                border: '0px',
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </Modal.Footer>
      </Modal>

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

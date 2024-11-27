import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoCheckmarkCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';
import { app, storage } from '../../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { createHotel, updateHotel, getHotelsByAdmin } from "../utils/ApiFunctions";

const DashHotelManagement = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [hotelManagers, setHotelManagers] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const { email, isAdmin } = useSelector((state) => state.user);
  const [images, setImages] = useState([]); // Lưu trữ file ảnh được chọn
  const [progressPercents, setProgressPercents] = useState([]); // Lưu tiến độ của từng ảnh
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    paths: [],
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
      paths: [],
    });
    setShowCreateDialog(true);
  };

  const handleEdit = (hotel) => {
    setFormData(hotel);
    setSelectedHotel(hotel);
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
      createHotel(formData)
        .then((response) => {
          setShowCreateDialog(false);
          setShowEditDialog(false);
          setShowSuccessDialog(true);
        })
        .catch((error) => {
          setShowErrorDialog(true);
        });
    } else if (showEditDialog) {
      updateHotel(selectedHotel.id, formData)
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

  const handleDelete = (hotel) => {
    setSelectedHotel(hotel);
    setShowDeleteDialog(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setShowDeleteDialog(false);
    setSelectedHotel(null);
  };

  const confirmDelete = (hotel) => {
    setShowDeleteDialog(false);
    setSelectedHotel(null);
  };

  // const hotelManagers = [
  //   {
  //     id: 1,
  //     name: "Hotel Paradise",
  //     address: "123 Ocean View Street, Miami",
  //     description: "A luxurious hotel by the beach with breathtaking views.",
  //     checkin: "14:00",
  //     checkout: "12:00",
  //     parking: true,
  //     keep_luggage: true,
  //     free_wifi: true,
  //     laundry_service: false,
  //     room_service: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Mountain Retreat",
  //     address: "456 Alpine Road, Denver",
  //     description: "A peaceful getaway in the mountains.",
  //     checkin: "15:00",
  //     checkout: "11:00",
  //     parking: true,
  //     keep_luggage: false,
  //     free_wifi: true,
  //     laundry_service: true,
  //     room_service: false,
  //   },
  //   {
  //     id: 3,
  //     name: "City Central Hotel",
  //     address: "789 Downtown Avenue, New York",
  //     description: "A modern hotel located in the heart of the city.",
  //     checkin: "13:00",
  //     checkout: "10:00",
  //     parking: false,
  //     keep_luggage: true,
  //     free_wifi: true,
  //     laundry_service: true,
  //     room_service: true,
  //   },
  //   {
  //     id: 4,
  //     name: "Safari Lodge",
  //     address: "101 Savanna Road, Nairobi",
  //     description: "Experience the wild with luxury at this safari lodge.",
  //     checkin: "16:00",
  //     checkout: "11:00",
  //     parking: true,
  //     keep_luggage: true,
  //     free_wifi: false,
  //     laundry_service: true,
  //     room_service: false,
  //   },
  //   {
  //     id: 5,
  //     name: "Tropical Haven",
  //     address: "202 Island Lane, Honolulu",
  //     description: "A relaxing tropical resort surrounded by nature.",
  //     checkin: "14:00",
  //     checkout: "12:00",
  //     parking: true,
  //     keep_luggage: true,
  //     free_wifi: true,
  //     laundry_service: true,
  //     room_service: true,
  //   },
  // ];

  useEffect(() => {
    // Gọi hàm getAllHotels khi component mount
    const fetchHotels = async () => {
      try {
        const data = await getHotelsByAdmin(email);
        setHotelManagers(data);
      } catch (err) {
        setErrorLoading('Failed to fetch hotels');
        setTimeout(() => setErrorLoading(""), 2000);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div style={{ height: '100vh', marginRight: '30px' }}>
      {errorLoading && <p className="alert alert-danger profile-alert">{errorLoading}</p>}
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
            {hotelManagers?.map((hotel, index) => (
              <tr
                key={hotel.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#cecece" : "#fff",
                  border: "1px solid gray",
                }}
              >
                <td style={{ border: "1px solid gray", textAlign: "center" }}>{index + 1}</td>
                <td style={{ maxWidth: "220px" }} className="ellipse-text">{hotel.name}</td>
                <td style={{ maxWidth: "410px" }} className="ellipse-text">{hotel.address}</td>
                <td
                  style={{ maxWidth: "200px" }} className="ellipse-text"
                  title={hotel.description} // Tooltip to show full text
                >
                  {hotel.description}
                </td>
                <td style={{ border: "1px solid gray", minWidth: "120px" }}>{hotel.checkin}</td>
                <td style={{ border: "1px solid gray", minWidth: "80px" }}>{hotel.checkout}</td>
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
          <Modal.Header closeButton style={{ padding: '12px' }}>
            <Modal.Title>{showCreateDialog ? "Create Hotel" : `Edit Hotel: ${selectedHotel?.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: '16px 20px 0' }}>
            {errorMessage && <p className="alert alert-danger profile-alert" style={{ top: '50px' }}>{errorMessage}</p>}
            {message && <p className="alert alert-success profile-alert" style={{ top: '50px' }} >{message}</p>}
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
                {['parking', 'keepLuggage', 'freeWifi', 'laundryService', 'roomService'].map((service) => (
                  <Form.Group key={service} controlId={`formHotel${service}`} style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                    <Form.Check
                      type="checkbox"
                      label={service.charAt(0).toUpperCase() + service.slice(1).replace(/([A-Z])/g, ' $1')}
                      name={service}
                      checked={formData[service]}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                ))}
              </div>
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

      <Modal centered size="sm" show={showSuccessDialog} backdrop="static" onHide={handleSuccessDialogClose}>
        <Modal.Header style={{ height: '50px', color: 'white', backgroundColor: '#28a745' }}>
          <Modal.Title className="user-info">
            <IoCheckmarkCircle style={{ marginRight: '10px' }} />
            Success
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ marginTop: '8px' }}>{selectedHotel ? "Hotel update successful!" : "Hotel created successfully!"}</h6>
        </Modal.Body>
        <Modal.Footer style={{ padding: '0px' }}>
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
      <Modal show={showDeleteDialog} backdrop="static" onHide={handleCloseModal}>
        <Modal.Header closeButton style={{ padding: '8px' }}>
          <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the hotel <strong>{selectedHotel?.name}</strong>?
        </Modal.Body>
        <Modal.Footer style={{ padding: '1px' }}>
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

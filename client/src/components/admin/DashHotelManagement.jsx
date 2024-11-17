import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const DashHotelManagement = () => {
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
          <button className="btn btn-create">
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
                  >
                    <FaTrashAlt style={{ marginBottom: '1px' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashHotelManagement;

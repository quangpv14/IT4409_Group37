import React, { useEffect, useState } from "react";
import axios from "axios";

const DashHotelManagement = () => {
  //const [hotelManagers, setHotelManagers] = useState([]);
  const hotelManagers = [
    {
      id: 1,
      email: "john.doe@example.com",
      identification: "A123456789",
      phone_number: "123-456-7890",
      name: "John Doe",
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      identification: "B987654321",
      phone_number: "987-654-3210",
      name: "Jane Smith",
    },
    {
      id: 3,
      email: "alice.brown@example.com",
      identification: "C456123789",
      phone_number: "456-123-7890",
      name: "Alice Brown",
    },
    {
      id: 4,
      email: "bob.johnson@example.com",
      identification: "D789123456",
      phone_number: "789-123-4560",
      name: "Bob Johnson",
    },
    {
      id: 5,
      email: "emma.wilson@example.com",
      identification: "E321654987",
      phone_number: "321-654-9870",
      name: "Emma Wilson",
    },
  ];
  
  
  // let này lên chatgpt bảo nó tạo cho 1 list user có các thuộc tính là id, email, identification, phoneNumber
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
    <div>
      <h1>Hotel Manager</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#003366", color: "white", border: "1px solid #ccc" }}>
          <tr>
            <th style={{ border: "1px solid #ccc" }}>STT</th>
            <th style={{ border: "1px solid #ccc" }}>Email</th>
            <th style={{ border: "1px solid #ccc" }}>Tên Người Dùng</th>
            <th style={{ border: "1px solid #ccc" }}>Số Điện Thoại</th>
            <th style={{ border: "1px solid #ccc" }}>CCCD</th>
          </tr>
        </thead>
        <tbody>
          {hotelManagers.map((manager, index) => (
            <tr
              key={manager.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#cecece" : "#fff",
                border: "1px solid #ccc",
              }}
            >
              <td style={{ border: "1px solid #ccc", textAlign: "center" }}>{index + 1}</td>
              <td style={{ border: "1px solid #ccc" }}>{manager.email}</td>
              <td style={{ border: "1px solid #ccc" }}>{manager.name}</td>
              <td style={{ border: "1px solid #ccc" }}>{manager.phone_number}</td>
              <td style={{ border: "1px solid #ccc" }}>{manager.identification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashHotelManagement;

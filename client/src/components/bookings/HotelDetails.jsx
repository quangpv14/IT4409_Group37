import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../utils/ApiFunctions";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      setError(""); // Xóa lỗi trước khi fetch
      try {
        const data = await getHotelById(hotelId);
        setHotel(data);
      } catch (err) {
        setError("Không thể tải thông tin khách sạn. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Không tìm thấy thông tin khách sạn.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        {hotel.name || "N/A"}
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        <strong>Địa chỉ:</strong> {hotel.address || "Không có thông tin"}
      </p>

        <div>
        {/* Bố cục lưới hiển thị hình ảnh */}
        <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {/* Hình lớn */}
        <div style={{ gridColumn: "1 / span 2" }}>
          <img
            src={hotel.paths[0]}
            alt={hotel.name || "Hotel"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Hình nhỏ hơn */}
        {hotel.paths.slice(1, 5).map((path, index) => (
          <img
            key={index}
            src={path}
            alt={`Image ${index + 1}`}
            style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ flex: 1 }} >
            <p>Check-in</p>
          </div>
          <div style={{ flex: 1 }} >
            <p>Check-out</p>
          </div>
        </div>
        {/* Phần mô tả */}
        <div style={{ lineHeight: "1.8" }}>
            <p>
            <strong>Mô tả:</strong> {hotel.description || "Không có thông tin mô tả."}
            </p>
            <p>
            <strong>Tiện nghi:</strong>
            </p>
            {hotel.amenities && hotel.amenities.length > 0 ? (
            <ul style={{ paddingLeft: "20px" }}>
                {hotel.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
                ))}
            </ul>
            ) : (
            <p>Không có tiện nghi nào được liệt kê.</p>
            )}
            <table>
            <thead>
                <tr>
                <th>Loại phòng</th>
                <th>Số lượng khách</th>
                <th>Giá hôm nay</th>
                <th>Các lựa chọn</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Phòng Giường Đôi</td>
                <td>2 người lớn, 0 trẻ em</td>
                <td>VND 500.000</td>
                <td>
                    <ul>
                    <li>Bao gồm chỗ đậu xe + nhận phòng + internet tốc độ cao</li>
                    <li>Không cần thanh toán trước</li>
                    <li>Hủy miễn phí trước 6 tháng 12, 2024</li>
                    </ul>
                </td>
                </tr>
                <tr>
                <td>Phòng Vdi Phòng</td>
                <td>2 người lớn, 0 trẻ em</td>
                <td>VND 450.000</td>
                <td>
                    <ul>
                    <li>Bao gồm chỗ đậu xe + nhận phòng + internet tốc độ cao</li>
                    <li>Không cần thanh toán trước</li>
                    <li>Hủy miễn phí trước 6 tháng 12, 2024</li>
                    </ul>
                </td>
                </tr>
            </tbody>
            </table>

            <div>
                {/* Các tiện nghi */}
                <div>
                    <h2>Các tiện nghi</h2>
                    <ul>
                    <li>Xe đưa đón sân bay</li>
                    <li>Phòng không hút thuốc</li>
                    <li>Chỗ đỗ xe miễn phí</li>
                    <li>WiFi miễn phí</li>
                    <li>Lễ tân 24 giờ</li>
                    <li>Sân thượng / hiên</li>
                    <li>Giặt ủi</li>
                    </ul>
                </div>

                {/* Phòng tắm */}
                <div>
                    <h2>Phòng tắm</h2>
                    <ul>
                    <li>Giấy vệ sinh</li>
                    <li>Khăn tắm</li>
                    <li>Phòng tắm phụ</li>
                    <li>Chậu rửa vệ sinh (bidet)</li>
                    <li>Toilet phụ</li>
                    <li>Dép</li>
                    <li>Nhà vệ sinh</li>
                    <li>Đồ vệ sinh cá nhân miễn phí</li>
                    <li>Máy sấy tóc</li>
                    <li>Vòi sen</li>
                    </ul>
                </div>

                {/* Phòng ngủ */}
                <div>
                    <h2>Phòng ngủ</h2>
                    <ul>
                    <li>Tủ hoặc phòng để quần áo</li>
                    </ul>
                </div>

                {/* Ngoài trời */}
                <div>
                    <h2>Ngoài trời</h2>
                    <ul>
                    <li>Bàn ghế ngoài trời</li>
                    <li>Khu vực ăn uống ngoài trời</li>
                    <li>Sân thượng / hiên</li>
                    </ul>
                </div>

                {/* Nhà bếp */}
                <div>
                    <h2>Nhà bếp</h2>
                    <ul>
                    <li>Bếp chung</li>
                    <li>Bếp nấu</li>
                    <li>Máy sấy quần áo</li>
                    <li>Ấm đun nước</li>
                    <li>Máy giặt</li>
                    </ul>
                </div>
            </div>

            {/* Quy tắc chung */}
            <div>
            <h2>Quy tắc chung</h2>
            <p>Hanoi Train Street Cozy Inn nhận yêu cầu đặc biệt - gửi yêu cầu trong bước kế tiếp!</p>
            <div>
                <h3>Nhận phòng</h3>
                <p>Từ 14:00 - 23:00</p>
            </div>
            <div>
                <h3>Trả phòng</h3>
                <p>Từ 08:00 - 12:00</p>
            </div>
            <div>
                <h3>Hủy đặt phòng/ Trả trước</h3>
                <p>Các chính sách hủy và thanh toán trước sẽ khác nhau tùy vào từng chỗ nghỉ. Vui lòng kiểm tra các điều khoản được áp dụng cho mỗi lựa chọn của bạn.</p>
            </div>
            <div>
                <h3>Trẻ em và giường</h3>
                <p>Phụ phí cho trẻ em.</p>
                <p>Để xem thông tin giá và tình trạng phòng chính xác, vui lòng thêm tuổi và số lượng trẻ em trong nhóm của bạn khi tìm kiếm.</p>
            </div>
            <div>
                <h3>Chính sách nội (cùi) và giường phụ</h3>
                <p>Chỗ nghỉ này không cung cấp/cùi và giường phụ.</p>
            </div>
            <div>
                <h3>Không giới hạn độ tuổi</h3>
                <p>Không có yêu cầu về độ tuổi khi nhận phòng.</p>
            </div>
            <div>
                <h3>Vật nuôi</h3>
                <p>Vật nuôi không được phép.</p>
            </div>
            <div>
                <h3>Chỉ thanh toán bằng tiền mặt</h3>
                <p>Chỗ nghỉ này chỉ chấp nhận thanh toán bằng tiền mặt.</p>
            </div>
            <div>
                <h3>Tiệc tùng</h3>
                <p>Không cho phép tổ chức tiệc tùng/sự kiện.</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;

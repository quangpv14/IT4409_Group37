import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById, getRoomsOfHotel } from "../utils/ApiFunctions";
import { FaLocationDot } from "react-icons/fa6";

const HotelDetails = () => {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [lstRoom, setLstRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHotelDetails = async () => {
            setLoading(true);
            setError(""); // Xóa lỗi trước khi fetch
            try {
                const data = await getHotelById(hotelId);
                setHotel(data);
                const dataRoom = await getRoomsOfHotel(hotelId);
                setLstRoom(dataRoom);
            } catch (err) {
                setError("Không thể tải thông tin khách sạn. Vui lòng thử lại sau.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [hotelId]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px", minHeight: '100vh' }}>
                {loading && <div className="loading-overlay">Loading...</div>}
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px", minHeight: '100vh' }}>
                <p style={{ color: "red" }}>{error}</p>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px", minHeight: '100vh' }}>
                <p>Không tìm thấy thông tin khách sạn.</p>
            </div>
        );
    }

    return (

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 120px" }}>
            <h5 style={{ textAlign: "left", marginBottom: "10px" }}>
                {hotel.name || "N/A"}
            </h5>
            <p style={{ textAlign: "left", marginBottom: "10px", fontSize: '14px' }}>
                <FaLocationDot style={{ marginBottom: '5px', marginRight: '5px', color: 'blue' }} />
                <strong>Địa chỉ:</strong> {hotel.address || "Không có thông tin"}
            </p>

            {/* Bố cục lưới hiển thị hình ảnh */}
            <div>
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
            </div>


            {/* Phần mô tả */}
            <div style={{ lineHeight: "1.8" }}>
                <h5>Description</h5>
                <div style={{ display: 'flex', width: "100%" }}>
                    <div style={{ width: '80%' }}>
                        <p style={{ marginRight: '30px', minHeight: '116px', backgroundColor: '#f5f5f5' }}>
                            {hotel.description || "Không có thông tin mô tả."}
                        </p>
                    </div>
                    <div style={{ width: '20%' }}>
                        <div style={{ gap: '1rem', marginLeft: '5px', height: '115px', backgroundColor: '#f0f6ff' }}>
                            <div style={{ flex: 1 }} >
                                <div style={{ fontWeight: '500', marginLeft: '10px' }}>Check-in:</div>
                                <div style={{ marginLeft: '25px' }}>{hotel.checkin || "Từ 12:00 đến 14:00"}</div>
                            </div>
                            <div style={{ flex: 1 }} >
                                <div style={{ fontWeight: '500', marginLeft: '10px' }}>Check-out:</div>
                                <div style={{ marginLeft: '25px' }}>{hotel.checkout || "Trước 12:00"}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <table>
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
                </table> */}
            </div>

            <div style={{ lineHeight: "1.8" }}>
                <h5>Most popular facilities</h5>
                <div style={{ display: 'flex', width: "100%" }}>
                    {/* private Boolean parking; hiển thị o day
    private Boolean keepLuggage;
    private Boolean freeWifi;
    private Boolean laundryService;
    private Boolean roomService; */}
                </div>
            </div>

            {/* Phần hiển thị room*/}
            <div style={{ lineHeight: "1.8" }}>
                <h5>Availability</h5>
                <div style={{ display: 'flex', width: "100%" }}>
                    {hotel.amenities && hotel.amenities.length > 0 ? (
                        <ul style={{ paddingLeft: "20px" }}>
                            {hotel.amenities.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có phòng nào.</p>
                    )}
                    {/* chỗ này hiển thị table như ở màn dashHotelManager nhưng chỉ lấy đúng theo thiết kế file excel */}
                </div>
            </div>


            {/* Các tiện nghi */}
            <div>
                <h5>Facilities of Hotel</h5>
                <div>
                    <h6>Các tiện nghi</h6>
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
                    <h6>Phòng tắm</h6>
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
                    <h6>Phòng ngủ</h6>
                    <ul>
                        <li>Tủ hoặc phòng để quần áo</li>
                    </ul>
                </div>

                {/* Ngoài trời */}
                <div>
                    <h6>Ngoài trời</h6>
                    <ul>
                        <li>Bàn ghế ngoài trời</li>
                        <li>Khu vực ăn uống ngoài trời</li>
                        <li>Sân thượng / hiên</li>
                    </ul>
                </div>

                {/* Nhà bếp */}
                <div>
                    <h6>Nhà bếp</h6>
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
                <h5>House rules</h5>
                <p>Hanoi Train Street Cozy Inn nhận yêu cầu đặc biệt - gửi yêu cầu trong bước kế tiếp!</p>
                <div>
                    <h5>Nhận phòng</h5>
                    <p>Từ 14:00 - 23:00</p>
                </div>
                <div>
                    <h5>Trả phòng</h5>
                    <p>Từ 08:00 - 12:00</p>
                </div>
                <div>
                    <h5>Hủy đặt phòng/ Trả trước</h5>
                    <p>Các chính sách hủy và thanh toán trước sẽ khác nhau tùy vào từng chỗ nghỉ. Vui lòng kiểm tra các điều khoản được áp dụng cho mỗi lựa chọn của bạn.</p>
                </div>
                <div>
                    <h5>Trẻ em và giường</h5>
                    <p>Phụ phí cho trẻ em.</p>
                    <p>Để xem thông tin giá và tình trạng phòng chính xác, vui lòng thêm tuổi và số lượng trẻ em trong nhóm của bạn khi tìm kiếm.</p>
                </div>
                <div>
                    <h5>Chính sách nội (cùi) và giường phụ</h5>
                    <p>Chỗ nghỉ này không cung cấp/cùi và giường phụ.</p>
                </div>
                <div>
                    <h5>Không giới hạn độ tuổi</h5>
                    <p>Không có yêu cầu về độ tuổi khi nhận phòng.</p>
                </div>
                <div>
                    <h5>Vật nuôi</h5>
                    <p>Vật nuôi không được phép.</p>
                </div>
                <div>
                    <h5>Chỉ thanh toán bằng tiền mặt</h5>
                    <p>Chỗ nghỉ này chỉ chấp nhận thanh toán bằng tiền mặt.</p>
                </div>
                <div>
                    <h5>Tiệc tùng</h5>
                    <p>Không cho phép tổ chức tiệc tùng/sự kiện.</p>
                </div>
            </div>
        </div>

    );
};

export default HotelDetails;

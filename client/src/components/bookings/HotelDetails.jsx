import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById, getRoomsOfHotel } from "../utils/ApiFunctions";
import { FaLocationDot } from "react-icons/fa6";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { GoSignIn, GoSignOut } from "react-icons/go";
import { BsInfoCircle } from "react-icons/bs";
import { MdFamilyRestroom } from "react-icons/md";
import { IoManOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { LuPartyPopper } from "react-icons/lu";
import RecentHotel from '../home/RecentHotel';
import { Button } from 'react-bootstrap';

const HotelDetails = () => {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [lstRoom, setLstRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeButton, setActiveButton] = useState("overview");
    useEffect(() => {
        window.scrollTo(0, 0);
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

    const liStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3px',
        fontSize: '16px',
        color: '#333',
    };

    const liStyle1 = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3px',
        fontSize: '16px',
        color: '#333',
        width: '25%'
    };

    const iconStyle = {
        marginRight: '8px',
    };

    const listItemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        fontSize: '16px',
        color: '#333',
        padding: '5px 0px'
    };

    const checkIconStyle = {
        marginRight: '8px',
    };

    const outerContainerStyle = {
        border: "1px solid #ccc", // Viền cho thẻ lớn
        borderRadius: "8px", // Góc tròn
        padding: "16px", // Khoảng cách bên trong
        margin: "16px 0", // Khoảng cách bên ngoài
        backgroundColor: "#f9f9f9", // Màu nền nhẹ
    };

    const dividerStyle = {
        height: "1px", // Độ dày vách ngăn
        backgroundColor: "#ddd", // Màu vách ngăn
        margin: "16px 0", // Khoảng cách trên và dưới
    };

    const containerStyle = {
        display: "flex",
        alignItems: "flex-start", // Căn các nội dung bắt đầu từ trên cùng
        justifyContent: "space-between", // Chia đều hai cột
        gap: "16px", // Khoảng cách giữa các cột
    };

    const IconStyle = {
        marginRight: '8px',
    };

    const h6Style = {
        flex: "1", // Chiếm toàn bộ cột bên trái
        margin: "0", // Loại bỏ margin
    };

    const pStyle = {
        flex: "2", // Chiếm toàn bộ cột bên phải
        margin: "0", // Loại bỏ margin
    };

    const pContainerStyle = {
        flex: "2", // Cột bên phải
        display: "flex",
        flexDirection: "column", // Đặt các <p> theo chiều dọc
        gap: "8px", // Khoảng cách giữa các <p>
    };

    const HotelListStyle = {
        display: "flex", // Hiển thị ảnh theo dạng hàng ngang hoặc cột
        flexWrap: "wrap", // Tự động xuống dòng nếu không đủ chỗ
        gap: "16px", // Khoảng cách giữa các ảnh
        justifyContent: "center", // Căn giữa ảnh trong container
        alignItems: "center", // Căn giữa theo trục dọc
    };

    const facilities = [
        { name: "Parking", isAvailable: hotel.parking },
        { name: "Keep Luggage", isAvailable: hotel.keepLuggage },
        { name: "Free Wifi", isAvailable: hotel.freeWifi },
        { name: "Laundry Service", isAvailable: hotel.laundryService },
        { name: "Room Service", isAvailable: hotel.roomService },
    ];

    const buttonStyle = {
        padding: '10px 20px',
        borderRight: 'solid 1px gray',
        cursor: 'pointer',
        fontSize: '14px',
        width: '16.66%',
        border: 'white'
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top;
            window.scrollTo({
                top: top - 70,
                behavior: 'smooth',
            });

            setActiveButton(id);
        }
    };

    return (
        <div>
            <div style={{ width: '100%' }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-around',
                    marginBottom: '10px',
                    marginTop: '50px',
                    padding: "0px 205px"
                }}>
                    <button onClick={() => scrollToSection('overview')}
                        className={`buttonStyle ${activeButton === 'overview' ? 'active' : ''}`}>Overview</button>
                    <button onClick={() => scrollToSection('description')}
                        className={`buttonStyle ${activeButton === 'description' ? 'active' : ''}`}>Description</button>
                    <button onClick={() => scrollToSection('popular')}
                        className={`buttonStyle ${activeButton === 'popular' ? 'active' : ''}`}>Popular</button>
                    <button onClick={() => scrollToSection('room')}
                        className={`buttonStyle ${activeButton === 'room' ? 'active' : ''}`}>Available</button>
                    <button onClick={() => scrollToSection('facility')}
                        className={`buttonStyle ${activeButton === 'facility' ? 'active' : ''}`}>Facility</button>
                    <button onClick={() => scrollToSection('rule')}
                        className={`buttonStyle ${activeButton === 'rule' ? 'active' : ''}`}>Rule</button>
                </div>
            </div>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 120px" }}>
                <div >
                    <h5 style={{ textAlign: "left", marginBottom: "10px" }} id='overview'>
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
                    <div></div>
                </div>

                {/* Phần mô tả */}
                <div id='description'>
                    <h5 style={{ marginBottom: '16px' }}>Description</h5>
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
                </div>

                <div id='popular'>
                    <h5 style={{ marginBottom: '16px' }}>Most popular facilities</h5>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: "100%",
                        padding: "14px 5px",
                        backgroundColor: '#f5f5f5'
                    }}>
                        {facilities.map((facility, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <span
                                    style={{
                                        color: facility.isAvailable ? 'green' : 'red',
                                        marginRight: '8px',
                                        fontSize: '18px',
                                    }}
                                >
                                    {facility.isAvailable ? <FaCheck style={{ marginBottom: '5px' }} /> : ''}
                                </span>
                                <span>{facility.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <hr style={{ marginTop: '30px' }}></hr>
                {/* Phần hiển thị room*/}
                <div id='room'>
                    <h5 style={{ marginBottom: '16px' }}>Availability</h5>
                    <div style={{ display: 'flex', width: "100%" }}>
                        <table style={{ width: "960px", borderCollapse: "collapse" }}>
                            <thead style={{ backgroundColor: "#003366", color: "white", border: "1px solid #ccc" }}>
                                <tr>
                                    <th style={{ border: "1px solid #ccc" }}>Accommodation Type</th>
                                    <th style={{ border: "1px solid #ccc" }}>Price Today</th>
                                    <th style={{ border: "1px solid #ccc" }}>Option</th>
                                    <th style={{ border: "1px solid #ccc" }}>Book</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lstRoom && lstRoom.length > 0 ? (
                                    lstRoom.map((room, index) => (
                                        <tr
                                            key={room.id}
                                        >
                                            <td style={{ border: "1px solid gray", maxWidth: '400px' }}>
                                                <div style={{ display: 'flex', width: '380px' }}>
                                                    {/* Image */}
                                                    <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <img
                                                            src={room.imagePaths[0]}
                                                            alt={`Room ${room.number}`}
                                                            style={{ width: "100%", height: "120px", objectFit: "cover", padding: "4px" }}
                                                        />
                                                    </div>
                                                    <div style={{ width: '60%' }}>
                                                        <div style={{ fontSize: "18px", color: '#003366', fontWeight: '700' }}>{`Number room: ${room.number}`}</div>
                                                        <div style={{ fontSize: "14px", height: '68px' }}>{room.description}</div>
                                                        {/* Room number */}

                                                        {/* Room type */}
                                                        <div style={{ fontSize: "16px" }}>{room.roomType}</div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td style={{
                                                border: "1px solid gray",
                                                maxWidth: "150px",
                                                minWidth: "100px",

                                            }}>
                                                <div style={{ display: 'inline-block', marginLeft: '4px' }}>
                                                    <div style={{ fontWeight: 'bold' }}>{room.price} VND</div>
                                                    <div style={{ fontSize: '12px' }}>Taxes and fees included</div>
                                                </div>
                                            </td>
                                            <td style={{ border: "1px solid gray", maxWidth: "280px" }}>
                                                <div style={{ fontSize: '12px' }}>
                                                    <ul>
                                                        <li>Includes a great breakfast</li>
                                                        <li>No credit card required</li>
                                                        <li>No prepayment required – pay at the property</li>
                                                    </ul>

                                                </div>
                                            </td>
                                            <td style={{ border: "1px solid gray", width: '150px', maxWidth: "160px" }}>
                                                <div>
                                                    <Button style={{
                                                        height: "40px",
                                                        width: '100px',
                                                        borderRadius: '5px',
                                                        fontSize: '14px',
                                                        marginLeft: '25px'
                                                    }}
                                                        type='submit'>
                                                        I will book
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <div colSpan="4" style={{ padding: "10px", color: "#666" }}>
                                        No rooms available for booking
                                    </div>
                                )}

                            </tbody>
                        </table>

                    </div>
                </div>


                {/* Các tiện nghi */}
                <div style={{ lineHeight: '1.6', marginTop: '20px' }} id='facility'>
                    <h5 style={{ fontSize: '1.5em', paddingBottom: '6px' }}>
                        Facilities of the hotel
                    </h5>

                    <div>
                        <h6 style={{
                            fontSize: '1.2em',
                            marginTop: '10px',
                            marginBottom: '12px',
                        }}>General Facilities</h6>
                        <div style={{
                            listStyle: 'none',
                            padding: '10px 2px',
                            margin: '0',
                            backgroundColor: '#f5f5f5'
                        }}>
                            <div style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between'
                            }}>
                                <div style={liStyle1}>
                                    <FaCheck style={iconStyle} /> Airport shuttle
                                </div>
                                <div style={liStyle1}>
                                    <FaCheck style={iconStyle} /> Non-smoking rooms
                                </div>
                                <div style={liStyle1}>
                                    <FaCheck style={iconStyle} /> Free parking
                                </div>
                                <div style={liStyle1}>
                                    <FaCheck style={iconStyle} /> Free WiFi
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                                marginTop: '15px'
                            }}>
                                <div style={liStyle1}>
                                    <FaCheck style={iconStyle} /> 24-hour front desk
                                </div>
                                <div style={liStyle1}>
                                    <FaCheck style={iconStyle} /> Terrace
                                </div>
                                <div style={liStyle1}>
                                    <FaCheck style={iconStyle} /> Laundry
                                </div>
                                <div style={liStyle1}>
                                    <FaCheck style={iconStyle} /> Room service
                                </div>
                            </div>


                        </div>
                    </div>

                    <div style={{
                        lineHeight: '1.6',
                        width: '100%',
                        display: 'flex'
                    }}>
                        {/* Bathroom */}
                        <div style={{ width: '33.33%' }} >
                            <h6 style={{
                                fontSize: '1.2em',
                                marginTop: '20px',
                                marginBottom: '12px',
                            }}>
                                Bathroom
                            </h6>
                            <ul style={{
                                listStyle: 'none',
                                padding: '0',
                                margin: '0',
                                flexWrap: 'wrap',
                            }}>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Toilet paper
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Towels
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Additional bathroom
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Bidet
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Additional toilet
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Slippers
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Toilet
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Free toiletries
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Hairdryer
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Shower
                                </li>
                            </ul>
                        </div>

                        <div style={{ width: '33.33%' }}>
                            {/* Bedroom */}
                            <div style={{ marginLeft: '70px' }}>
                                <h6 style={{
                                    fontSize: '1.2em',
                                    marginTop: '20px',
                                    marginBottom: '12px',
                                }}>
                                    Bedroom
                                </h6>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: '0',
                                    margin: '0',
                                    flexWrap: 'wrap',
                                }}>
                                    <li style={listItemStyle}>
                                        <FaCheck style={checkIconStyle} /> Wardrobe or closet
                                    </li>
                                    <li style={listItemStyle}>
                                        <FaCheck style={checkIconStyle} /> Bed
                                    </li>
                                    <li style={listItemStyle}>
                                        <FaCheck style={checkIconStyle} /> Nightstand
                                    </li>
                                    <li style={listItemStyle}>
                                        <FaCheck style={checkIconStyle} /> Desk
                                    </li>
                                    <li style={listItemStyle}>
                                        <FaCheck style={checkIconStyle} /> Lamp
                                    </li>
                                </ul>
                            </div>

                            {/* Outdoors */}
                            <div style={{
                                marginLeft: '70px',
                            }}>
                                <h6 style={{
                                    fontSize: '1.2em',
                                    marginTop: '20px',
                                    marginBottom: '12px',
                                }}>
                                    Outdoors
                                </h6>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: '0',
                                    margin: '0',
                                    flexWrap: 'wrap',
                                }}>
                                    <li style={listItemStyle}>
                                        <FaCheck style={checkIconStyle} /> Outdoor furniture
                                    </li>
                                    <li style={listItemStyle}>
                                        <FaCheck style={checkIconStyle} /> Outdoor dining area
                                    </li>
                                    <li style={listItemStyle}>
                                        <FaCheck style={checkIconStyle} /> Terrace
                                    </li>
                                    <li style={listItemStyle}>
                                        <FaCheck style={checkIconStyle} /> Garden
                                    </li>
                                </ul>
                            </div>
                        </div>


                        {/* Kitchen */}
                        <div style={{ width: '33.33%' }}>
                            <h6 style={{
                                fontSize: '1.2em',
                                marginTop: '20px',
                                marginBottom: '12px',
                                marginLeft: '145px',
                            }}>
                                Kitchen
                            </h6>
                            <ul style={{
                                listStyle: 'none',
                                padding: '0',
                                margin: '0',
                                marginLeft: '145px',
                            }}>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Shared kitchen
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Stovetop
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Clothes dryer
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Kettle
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Washing machine
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Oven
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Refrigerator
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Microwave
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Coffee machine
                                </li>
                                <li style={listItemStyle}>
                                    <FaCheck style={checkIconStyle} /> Toaster
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>


                {/* Quy tắc chung */}
                <div id='rule'>
                    <h5 style={{ marginBottom: '14px' }}>House rules</h5>
                    <p>Get special requests - add in the next step!</p>
                    <div style={outerContainerStyle}>

                        <div style={containerStyle}>
                            <h6 style={h6Style}>
                                <GoSignIn style={IconStyle} />Nhận phòng
                            </h6>
                            <p style={pStyle}>Từ 12:00 - 23:00</p>
                        </div>
                        <div style={dividerStyle}></div>

                        <div style={containerStyle}>
                            <h6 style={h6Style}>
                                <GoSignOut style={IconStyle} />Trả phòng
                            </h6>
                            <p style={pStyle}>Từ 08:00 - 12:00</p>
                        </div>
                        <div style={dividerStyle}></div>

                        <div style={containerStyle}>
                            <h6 style={h6Style}>
                                <BsInfoCircle style={IconStyle} />Hủy đặt phòng/ Trả trước
                            </h6>
                            <p style={pStyle}>Các chính sách hủy và thanh toán trước sẽ khác nhau tùy vào từng chỗ nghỉ. Vui lòng kiểm tra các điều khoản được áp dụng cho mỗi lựa chọn của bạn.</p>
                        </div>
                        <div style={dividerStyle}></div>

                        <div style={containerStyle}>
                            <h6 style={h6Style}>
                                <MdFamilyRestroom style={IconStyle} />Trẻ em và giường
                            </h6>
                            <div style={pContainerStyle}>
                                <p style={pStyle}> <strong>Chính sách cho trẻ em.</strong> </p>
                                <p style={pStyle}>Để xem thông tin giá và tình trạng phòng chính xác, vui lòng thêm tuổi và số lượng trẻ em trong nhóm của bạn khi tìm kiếm.</p>
                                <p style={pStyle}> Chính sách nôi (cũi) và giường phụ </p>
                                <p style={pStyle}>Chỗ nghỉ này không cung cấp nôi/cũi và giường phụ.</p>
                            </div>
                        </div>
                        <div style={dividerStyle}></div>

                        <div style={containerStyle}>
                            <h6 style={h6Style}>
                                <IoManOutline style={IconStyle} />Không giới hạn độ tuổi
                            </h6>
                            <p style={pStyle}>Không có yêu cầu về độ tuổi khi nhận phòng.</p>
                        </div>
                        <div style={dividerStyle}></div>

                        <div style={containerStyle}>
                            <h6 style={h6Style}>
                                <MdOutlinePets style={IconStyle} />Vật nuôi
                            </h6>
                            <p style={pStyle}>Vật nuôi không được phép.</p>
                        </div>
                        <div style={dividerStyle}></div>

                        <div style={containerStyle}>
                            <h6 style={h6Style}>
                                <CiCreditCard1 style={IconStyle} />Chỉ thanh toán bằng tiền mặt
                            </h6>
                            <p style={pStyle}>Chỗ nghỉ này chỉ chấp nhận thanh toán bằng tiền mặt.</p>
                        </div>
                        <div style={dividerStyle}></div>

                        <div style={containerStyle}>
                            <h6 style={h6Style}>
                                <LuPartyPopper style={IconStyle} />Tiệc tùng
                            </h6>
                            <p style={pStyle}>Không cho phép tổ chức tiệc tùng/sự kiện.</p>
                        </div>
                    </div>
                </div>
                <h5 style={{ marginBottom: '16px' }}>Recent attractions</h5>
                <section>
                    <RecentHotel />
                </section>
            </div>
        </div >
    );
};

export default HotelDetails;

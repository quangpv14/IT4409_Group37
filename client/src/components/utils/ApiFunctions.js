import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const api_admin = axios.create({
    baseURL: "http://localhost:8000"
})

export const getHearder = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}


/** This function get Available Rooms */
export async function getAvailableRooms(checkIn, checkOut, roomType) {
}

/** This function register hotel */
export async function signUpHotel(dataReq) {
    try {
        const response = await api_admin.post('/auth/register', dataReq, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error ${error.message}`);
        }
    }
}


/** This function register user */
export async function signUp(dataReq) {
    try {
        const response = await api.post('/auth/register', dataReq, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error ${error.message}`);
        }
    }
}


/** This function login user */
export async function signIn(login) {
    try {
        const response = await api.post('/auth/login', login);
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return response.error;
        }
    } catch (error) {
        return error;
    }
}

/** This function login admin */
export async function signInAdmin(login) {
    try {
        const response = await api_admin.post('/auth/login', login);
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return response.error;
        }
    } catch (error) {
        return error;
    }
}

/** This function get User Profile */
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`/api/users/profile/${userId}`, {
            headers: getHearder()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getUser(email, token) {
    try {
        const response = await api.get(`/api/customer/${email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser(updatedUser, token) {
    try {
        const response = await api.put(`/api/customer/update`, updatedUser, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Function to create a hotel
export const createHotel = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await api_admin.post('/hotel/register', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Function to update hotel details
export const updateHotel = async (hotelId, data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await api_admin.put(`/hotel/update/${hotelId}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getHotelsByAdmin = async (email) => {
    try {
        const response = await api_admin.get(`/hotel/findall/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
};

// Function to create a room
export const createRoom = async (id, data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await api_admin.post(`/rooms/create/${Number(id)}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Function to update room details
export const updateRoom = async (roomId, data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await api_admin.put(`/rooms/update/${roomId}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Function to update room details
export const deleteRoom = async (roomId, hotelId) => {
    const token = localStorage.getItem("token");
    try {
        const response = await api_admin.delete(`/hotel/${hotelId}/rooms/delete/${roomId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchRooms = async (param) => {
    const token = localStorage.getItem("token");
    try {
        const response = await api_admin.post("/hotel/rooms", param, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        throw error;
    }
};


export const getRoomsByAdmin = async (email) => {
    try {
        const response = await api_admin.get(`/room/findall/${email}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching rooms:', error);
    }
};

export const getRoomsOfHotel = async (hotelId) => {
    try {
        const response = await api_admin.get(`/hotel/get-all-room/${hotelId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching rooms:', error);
    }
};

export const getHotelById = async (id) => {
    try {
        const response = await api_admin.get(`/hotel/${id}`);
        console.log('API response:', response); // Kiểm tra phản hồi
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching hotel details:", error.message);
        throw new Error("Failed to fetch hotel details. Please try again later.");
    }
};


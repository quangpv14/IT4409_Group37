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

/** This function register user */
export async function signUp(dataReq) {
    try {
        const response = await api.post('/auth/register', dataReq, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
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
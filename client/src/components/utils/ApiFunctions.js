import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const getHearder = () => {
    const token = localStorage.getItem("token")
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

}

/** This function login user */
export async function signIn(login) {

}


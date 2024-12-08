import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, getUser, getAdminProfile, updateAdmin } from "../utils/ApiFunctions";
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { name, isAuthenticated, isAdmin } = useSelector((state) => state.user);
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUser = async () => {
            setLoading(true);
            try {
                if (!isAdmin) {
                    const userData = await getUser(email, token);
                    setUser(userData);
                }
                else {
                    const adminData = await getAdminProfile(email);
                    setUser(adminData);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [email])

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account?"
        )
    }

    const handleUpdateAccount = async () => {
        setMessage("");
        setErrorMessage("");
        const updatedUser = { ...user };
        if (!/^\d{10,11}$/.test(updatedUser.phoneNumber)) {
            setErrorMessage("Phone number must be 10-11 digits.");
            setTimeout(() => setErrorMessage(""), 2000);
            return;
        }

        try {
            if (!isAdmin) {
                setLoading(true);
                const response = await updateUser(updatedUser, token);

                try {
                    const userData = await getUser(email, token);
                    setMessage("Account updated successfully!");
                    setUser(userData);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(true);
                const response = await updateAdmin(updatedUser, token);


                try {
                    const data = await getAdminProfile(email);
                    setMessage("Account updated successfully!");
                    setUser(data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }


        } catch (error) {
            setErrorMessage('An error occurred. Please try again!');
        } finally {
            setLoading(false);
        }

        setTimeout(() => {
            setErrorMessage("");
            setMessage("");
        }, 3000)
    }

    return (
        <div className="container" style={{ height: '90vh' }}>
            {errorMessage && <p className="alert alert-danger profile-alert">{errorMessage}</p>}
            {message && <p className="alert alert-success profile-alert">{message}</p>}
            {loading && <div className="loading-overlay">Loading...</div>}
            {user ? (
                <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                    <h4 className="card-title text-center">Profile Information</h4>
                    <div className="card-body">
                        <div className="col-md-10 mx-auto">
                            <div className="card mb-3 shadow">
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <div className="d-flex justify-content-center align-items-center mb-4">
                                            <img
                                                src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                                                alt="Profile"
                                                className="rounded-circle"
                                                style={{ width: "120px", height: "120px", objectFit: "cover", margin: '10px' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-10">
                                        <div className="card-body">
                                            <div className="form-group user-info" style={{ padding: '15px 0px' }}>
                                                <label className="user-label fw-bold">Full name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={user.name || ""}
                                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group user-info" style={{ padding: '15px 0px' }}>
                                                <label className="user-label fw-bold">Email:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={user.email || ""}
                                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group user-info" style={{ padding: '15px 0px' }}>
                                                <label className="user-label fw-bold">Phone number:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={user.phoneNumber || ""}
                                                    onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group user-info" style={{ padding: '15px 0px' }}>
                                                <label className="user-label fw-bold">CCCD:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={user.identification || ""}
                                                    onChange={(e) => setUser({ ...user, identification: e.target.value })}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <div className="mx-2">
                                    <button className="btn btn-primary btn-sm" onClick={handleUpdateAccount} style={{ height: '35px' }}>
                                        Update account
                                    </button>
                                </div>

                                <div className="mx-2">
                                    <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount} style={{ height: '35px' }}>
                                        Close account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    )
}

export default Profile
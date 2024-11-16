import React, { useState } from 'react';
import { signUp } from '../utils/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        identification: "",
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInPutChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!/^\d{10,11}$/.test(register.phoneNumber)) {
            setErrorMessage("Phone number must be 10-11 digits.");
            setTimeout(() => setErrorMessage(""), 2000);
            return;
        }

        if (register.password !== register.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setTimeout(() => setErrorMessage(""), 2000);
            return;
        }
        const formData = {
            name: `${register.firstName} ${register.lastName}`.trim(),
            email: register.email,
            password: register.password,
            confirmPassword: register.confirmPassword,
            phoneNumber: register.phoneNumber,
            identification: register.identification,
        };

        try {
            const response = await signUp(formData);
            if (response && response.status === 201) {
                // Successful sign-up
                setSuccessMessage("Sign-up successful!");  // Show success message
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                // Handle case where status is not 201, if needed
                setErrorMessage("Something went wrong, please try again.");
            }
            setErrorMessage("");

        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(`Error: Something went wrong, please try again.`);
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 3000)
    }

    return (
        <section className='section-sign-up'>
            <div className='sign-up'>
                <div style={{ width: '30%' }}></div>
                <div style={{ width: '40%', height: '100%' }}>
                    <div className='sign-up-container'>
                        <h2>Sign Up</h2>
                        <p>Register now to create your account and start using the platform.</p>
                        <hr></hr>
                        <form onSubmit={handleSignUp}>
                            <div style={{ display: 'flex' }}>
                                <div className='mb-2 row'>
                                    <label htmlFor="firstName" className='col-form-label'>First Name</label>
                                    <div style={{ width: '90%' }}>
                                        <input type="text" id='firstName' name='firstName' className='form-control'
                                            required value={register.firstName} onChange={handleInPutChange} placeholder='Enter your first name' />
                                    </div>
                                </div>

                                <div className='mb-2 row'>
                                    <label htmlFor="lastName" className='col-form-label'>Last Name</label>
                                    <div>
                                        <input type="text" id='lastName' name='lastName' className='form-control'
                                            required value={register.lastName} onChange={handleInPutChange} placeholder='Enter your last name' />
                                    </div>
                                </div>
                            </div>

                            <div className='mb-2 row'>
                                <label htmlFor="phoneNumber" className='col-form-label'>Phone Number</label>
                                <div>
                                    <input type="text" id='phoneNumber' name='phoneNumber' className='form-control'
                                        required value={register.phoneNumber} onChange={handleInPutChange} placeholder='Enter your phone number' />
                                </div>
                            </div>

                            <div className='mb-2 row'>
                                <label htmlFor="email" className='col-form-label'>Email</label>
                                <div>
                                    <input type="email" id='email' name='email' className='form-control'
                                        required value={register.email} onChange={handleInPutChange} placeholder='Enter your email' />
                                </div>
                            </div>

                            <div className='mb-2 row'>
                                <label htmlFor="password" className='col-form-label'>Password</label>
                                <div>
                                    <input type="password" id='password' name='password' className='form-control'
                                        required value={register.password} onChange={handleInPutChange} placeholder='Enter your password' />
                                </div>
                            </div>
                            <div className='mb-2 row'>
                                <label htmlFor="password" className='col-form-label'>Confirm Password</label>
                                <div>
                                    <input type="password" id='confirmPassword' name='confirmPassword' className='form-control'
                                        required value={register.confirmPassword} onChange={handleInPutChange} placeholder='Enter your confirm password' />
                                </div>
                            </div>
                            <div className='row btn-sign-up'>
                                <button type='submit' className='btn btn-primary' style={{ marginRight: "10px" }}>
                                    Sign Up
                                </button>
                            </div>
                            <div style={{ marginTop: "13px" }}>
                                <span>Already have an account ?
                                    <Link to={"/login"} style={{ marginLeft: "5px" }}>Sign in</Link>
                                </span>
                            </div>
                            <div style={{ marginTop: '30px' }}>
                                <p style={{ marginTop: '10px', fontSize: '14px', textAlign: 'center' }}>
                                    By logging in, I agree to <a href="#" target="_blank">Terms of Use</a> and <a href="#" target="_blank" >Privacy Policy</a>.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="area-error">
                    <div>
                        {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
                        {successMessage && <p className='alert alert-success'>{successMessage}</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}
import React, { useState } from 'react';
import { signUp } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';

export const RentalRegister = () => {

    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        identification: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInPutChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Validate phone number and identification
        if (!/^\d{10,11}$/.test(register.phoneNumber)) {
            setErrorMessage("Phone number must be 10-11 digits.");
            setTimeout(() => setErrorMessage(""), 2000);
            return;
        }

        if (!/^\d{12}$/.test(register.identification)) {
            setErrorMessage("Identification must be exactly 12 digits.");
            setTimeout(() => setErrorMessage(""), 2000);
            return;
        }

        if (register.password !== register.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setTimeout(() => setErrorMessage(""), 2000);
            return;
        }

        const formData = {
            name: register.name,
            email: register.email,
            password: register.password,
            phoneNumber: register.phoneNumber,
            identification: register.identification,
        };

        // try {
        //     const result = await signUp(formData);
        //     setSuccessMessage(result);
        //     setErrorMessage("");
        // } catch (error) {
        //     setSuccessMessage("");
        //     setErrorMessage(`Error: ${error.message}`);
        // }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 5000)
    }

    return (
        <section className='section-sign-up'>
            <div className='sign-up'>
                <div style={{ width: '30%' }}></div>
                <div style={{ width: '40%', height: '100%' }}>
                    <div className='sign-up-container'>
                        <h2>House rental registration</h2>
                        <p style={{ fontSize: '15px' }}>Welcome guests from around the world – Start your journey with us!</p>
                        <hr></hr>
                        <form onSubmit={handleSignUp}>
                            <div className='mb-2 row'>
                                <label htmlFor="name" className='col-form-label'>Full Name</label>
                                <div>
                                    <input type="text" id='name' name='name' className='form-control'
                                        required value={register.name} onChange={handleInPutChange} placeholder='Enter your full name' />
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
                                <label htmlFor="identification" className='col-form-label'>Identification</label>
                                <div>
                                    <input type="text" id='identification' name='identification' className='form-control'
                                        required value={register.identification} onChange={handleInPutChange} placeholder='Enter your identification' />
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
    );
} 
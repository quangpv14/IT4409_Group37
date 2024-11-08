import React, { useState } from 'react'
import { signUp } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'

export const SignUp = () => {
    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleInPutChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const result = await signUp(register)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegister({ firstName: "", lastName: "", email: "", password: "" })
        } catch (error) {
            setSuccessMessage("")
            setErrorMessage(`Error ${error.message}`)
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }

    return (
        <section className='sign-up'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {successMessage && <p className='alert alert-success'>{successMessage}</p>}
            <div className='sign-up-container'>
                <h2>Sign Up</h2>
                <p>Register now to create your account and start using the platform.</p>
                <hr></hr>
                <form onSubmit={handleSignUp}>
                    <div className='mb-2 row'>
                        <label htmlFor="firstName" className='col-form-label'>First Name</label>
                        <div>
                            <input type="text" id='firstName' name='firstName' className='form-control'
                                required value={register.firstName} onChange={handleInPutChange} placeholder='Enter your first name' />
                        </div>
                    </div>

                    <div className='mb-2 row'>
                        <label htmlFor="lastName" className='col-form-label'>Last Name</label>
                        <div>
                            <input type="text" id='lastName' name='lastName' className='form-control'
                                required value={register.lastName} onChange={handleInPutChange} placeholder='Enter your last name'/>
                        </div>
                    </div>

                    <div className='mb-2 row'>
                        <label htmlFor="email" className='col-form-label'>Email</label>
                        <div>
                            <input type="email" id='email' name='email' className='form-control'
                                required value={register.email} onChange={handleInPutChange} placeholder='Enter your email'/>
                        </div>
                    </div>

                    <div className='mb-2 row'>
                        <label htmlFor="password" className='col-form-label'>Password</label>
                        <div>
                            <input type="password" id='password' name='password' className='form-control'
                                required value={register.password} onChange={handleInPutChange} placeholder='Enter your password'/>
                        </div>
                    </div>
                    <div className='mb-2 row'>
                        <label htmlFor="password" className='col-form-label'>Password</label>
                        <div>
                            <input type="password" id='confirmpassword' name='confirmpassword' className='form-control'
                                required value={register.confirmpassword} onChange={handleInPutChange} placeholder='Enter your confirm password'/>
                        </div>
                    </div>
                    <div className='row btn-sign-up'>
                        <button type='submit' className='btn btn-primary' style={{ marginRight: "10px" }}>
                            Sign Up
                        </button>
                    </div>
                    <div style={{ marginTop: "13px" }}>
                        <span>Already have an account ?
                            <Link to={"/login"}  style={{ marginLeft: "5px" }}>Sign in</Link>
                        </span>
                    </div>
                    <div style={{ marginTop:'30px' }}>
                        <p style={{ marginTop: '10px', fontSize: '14px', textAlign: 'center' }}>
                            By logging in, I agree to <a href="#" target="_blank">Terms of Use</a> and <a href="#" target="_blank" >Privacy Policy</a>.
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
}
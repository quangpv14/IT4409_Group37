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
    }

    const handleSignUp = async (e) => {

    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {successMessage && <p className='alert alert-success'>{successMessage}</p>}

            <form onSubmit={handleSignUp}>

                <div className='mb-3'>
                    <button type='submit' className='btn btn-danger' style={{ marginRight: "10px" }}>
                        Sign Up
                    </button>
                    <span style={{ marginLeft: "10px" }}>Already have an account ?
                        <Link to={"/login"}>Sign In</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

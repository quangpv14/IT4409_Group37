import React, { useContext, useState } from 'react';
import { signIn } from '../utils/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


export const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const { handleLogin } = useContext(AuthContext);



    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

            <form >

                <div className='mb-3'>
                    <button type='submit' className='btn btn-danger' style={{ marginRight: "10px" }}>
                        Sign In
                    </button>
                    <span style={{ marginLeft: "10px" }}>Don't have an account ?
                        <Link to={"/register"}>Sign Up</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

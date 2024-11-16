import React, { useContext, useState } from 'react';
import { signIn, signInAdmin } from '../utils/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

export const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const { handleLogin } = useContext(AuthContext)

    const handleInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = isAdminLogin
            ? await signInAdmin(login)
            : await signIn(login);
        if (response.status === 200 && response.data) {
            const data = response.data.data;
            const { token, email, name, roles } = data;
            const role = roles || [];

            console.log(response.message);
            dispatch(setUser({ token, email, name, role }));
            handleLogin(token, name, role);

            if (isAdminLogin) {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
            window.location.reload();
        } else {
            const errorMessage = response?.response?.status === 401 ?
                'Email hoặc password không chính xác . Vui lòng thử lại!' :
                "Đã có lỗi xảy ra. Vui lòng thử lại!";
            setErrorMessage(errorMessage);
        }

        setTimeout(() => {
            setErrorMessage("");
        }, 4000)
    }

    return (
        <section className='section-sign-in'>
            <div className='sign-in'>
                <div style={{ width: '30%' }}></div>
                <div className='content-sign-in'>
                    <div className='sign-in-container'>
                        <h2>Sign In</h2>
                        <p>For your safety, please log in to access the information</p>
                        <hr></hr>
                        <form onSubmit={handleSubmit}>
                            <div className='row mb-3'>
                                <label htmlFor="email" className='col-sm-2 col-form-label'>Email</label>
                                <div>
                                    <input type="email" id='email' name='email' className='form-control' required
                                        value={login.email} onChange={handleInputChange} placeholder='Enter your email' />
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label htmlFor="password" className='col-sm-2 col-form-label'>Password</label>
                                <div>
                                    <input type="password" id='password' name='password' className='form-control' required
                                        value={login.password} onChange={handleInputChange} placeholder='Enter your password' />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className='cb-sign-in'>
                                    <input
                                        className=""
                                        type="checkbox"
                                        id="adminLogin"
                                        name="adminLogin"
                                        onChange={(e) => setIsAdminLogin(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="adminLogin" style={{ marginLeft: '5px' }}>
                                        Sign in as an administrator
                                    </label>
                                </div>
                            </div>
                            <div className='row btn-sign-in'>
                                <button type='submit' className='btn btn-primary' style={{ marginRight: "10px" }}>
                                    Sign In
                                </button>
                            </div>
                            <div style={{ marginTop: "13px" }}>
                                <span>Don't have an account ?
                                    <Link to={"/register"} style={{ marginLeft: "5px" }}>Sign up</Link>
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
                        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}
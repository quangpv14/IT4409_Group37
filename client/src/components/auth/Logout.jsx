import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/userSlice';

export const Logout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { email, name, isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth.handleLogout();
    dispatch(clearUser());
    navigate("/login", { state: { message: "You have been logged out!" } })
    window.location.reload();
  }

  return (
    <>
      {isAdmin && (
        <div>
          <li>
            <Link className="dropdown-item" to={"/dashboard"}>
              Dashboard
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
        </div>
      )}
      <li>
        <Link className="dropdown-item" to={"/profile"}>
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <button className="dropdown-item" onClick={handleLogout}>
        Logout
      </button>
    </>
  )
}

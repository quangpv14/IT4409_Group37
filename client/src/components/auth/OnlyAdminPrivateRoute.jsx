import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from "./AuthProvider";
import { Forbidden } from "./Forbidden";

export default function OnlyAdminPrivateRoute() {
    const { email, isAdmin } = useSelector((state) => state.user);

    return isAdmin ? (
        <Outlet />
    ) : (
        <Forbidden />
    );
}
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user, loading, error, token } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(logoutAction());
        navigate('/');
    };

    return {
        isAuthenticated,
        user,
        loading,
        error,
        token,
        logout
    };
};

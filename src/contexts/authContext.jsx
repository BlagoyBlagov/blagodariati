import { useNavigate } from "react-router-dom";
import { createContext } from "react";

import * as request from '../lib/request';
import * as authService from '../services/authService';
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values);
        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);
        navigate('/');
    };

    const registerSubmitHandler = async (values) => {
        const userData = {
            ...values,
            location: localStorage.getItem('locationData')
        };
        const result = await authService.register(userData);
        
        localStorage.removeItem('locationData');

        const { password, 'confirm-password': confirmPassword, ...resultWithoutPasswords } = result;

        setAuth(resultWithoutPasswords);
        
        localStorage.setItem('accessToken', resultWithoutPasswords.accessToken);
        await authService.registerUserData();

        console.log(resultWithoutPasswords);
        navigate('/');
    };

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
        navigate('/');
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.firstName + ' ' + auth.lastName || auth.email,
        avatar: auth.imageUrl,
        userType: auth.userType,
        location: auth.location,
        email: auth.email,
        userId: auth._id,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
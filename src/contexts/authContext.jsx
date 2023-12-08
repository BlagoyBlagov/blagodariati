import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";

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
        
        try {
            const result = await authService.login(values);
            setAuth(result);
            // Да изтрия паролите
            localStorage.setItem('accessToken', result.accessToken);
            navigate('/');
            return null;
        } catch (error) {
            return error.message;
        }
    };

    const registerSubmitHandler = async (values) => {
        const userData = {
            ...values,
            location: localStorage.getItem('locationData') ? localStorage.getItem('locationData') : {}
        };

        try {

            if(!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData['confirm-password']) {
                throw new Error('Моля попълнете полетата със "*"');
            }
            if(userData.password !== userData['confirm-password']) {
                throw new Error('Паролите не съвпадат!');
            }

            const result = await authService.register(userData);
        
            const { password, 'confirm-password': confirmPassword, ...resultWithoutPasswords } = result;
            setAuth(resultWithoutPasswords);
            
            localStorage.removeItem('locationData');
            localStorage.setItem('accessToken', resultWithoutPasswords.accessToken);
            await authService.registerUserData();

            navigate('/');
            return null;
        } catch (error) {
            return error.message;
        }

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
        avatar: auth.imageUrl || '/images/User-avatar.png',
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
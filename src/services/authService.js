import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030'

export const login = async (values) => {
    const result = await request.post(`${baseUrl}/users/login`, values);
    return result;
}

export const register = async (values) => {
    const result = await request.post(`${baseUrl}/users/register`, values);
    return result;
}

export const registerUserData = async () => {
    await request.post(`${baseUrl}/data/userData`, {in: ''});
};


export const logout = () => request.get(`${baseUrl}/logout`);
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


// export const register = async (data) => {
    // try {
    //     const response = await fetch(`${baseUrl}/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     });
    //     if(response.status === 200) {
    //         const result = await response.json();
    //         const token = result.accessToken;
            
    //         await fetch(`${baseUrl}/data/userData`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'X-Authorization': token,
    //             },
    //             body: JSON.stringify({in: ''}),
    //         });
    //     }
        
    // } catch(error) {
    //     // console.log(error);
    // }
    
// };

export const logout = () => request.get(`${baseUrl}/logout`);
const baseUrl = 'http://localhost:3030';
import Cookies from 'js-cookie';

export const login = async (data) => {
    
    const response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    
    if(response.status === 200) {
        const result = await response.json();
        Cookies.set('_accessToken', result.accessToken);
        // delete result.accessToken;
        // Cookies.set('_userData', JSON.stringify(result));

        return true;
    } else {
        console.log(response.code);
        return false;
    }

};

export const register = async (data) => {

    const { email, password } = data;
    const { firstName, lastName } = data;
    
    const response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });

    const result = await response.json();

    if(response.status === 200) {
        Cookies.set('_accessToken', result.accessToken);
        
        const userData = await fetch(`${baseUrl}/data/userData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': result.accessToken,
            },
            body: JSON.stringify({firstName, lastName, phoneNumber: '0888787877', location: 'София', imageUrl: 'https://fit.bbweb.dev/wp-content/uploads/listing-uploads/logo/2023/09/profile.jpg'}),
        });

        const userDataResult = await userData.json();

        Cookies.set('_userData', JSON.stringify(userDataResult));
    }

};

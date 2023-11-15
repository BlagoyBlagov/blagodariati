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

    const result = await response.json();

    if(response.status === 200) {
        Cookies.set('_accessToken', result.accessToken);
        delete result.accessToken;
        Cookies.set('_userData', JSON.stringify(result));

        return true;
    } else {
        console.log(result.message);
        return false;
    }

};

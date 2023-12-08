import * as request from '../lib/request';
const baseUrl = 'http://localhost:3030';

export const counter = async (ownerId) => {
    const response = await fetch(`${baseUrl}/data/posts?where=_ownerId${encodeURIComponent(`="${ownerId}"`)}&count`);
    const result = await response.json();
    return result;
};


export const getUserById = async (userId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`,
        load: `data=_ownerId:users`,
    });
    const result = await request.get(`${baseUrl}?${query}`);
    return result;
};
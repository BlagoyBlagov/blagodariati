import * as request from '../lib/request';
const baseUrl = 'http://localhost:3030/data/posts';

export const getPosts = async () => {
    
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
    });
    const result = await request.get(`${baseUrl}?${query}`, false);
    return result;
}
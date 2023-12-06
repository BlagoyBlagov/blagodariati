import * as request from '../lib/request';
const baseUrl = 'http://localhost:3030/data/posts';

export const getAll = async () => {
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
    });
    const result = await request.get(`${baseUrl}?${query}`, false);
    return result;
}

export const getOne = async (postId) => {
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
    });
    const result = await request.get(`${baseUrl}/${postId}?${query}`);
    return result;
}

export const createPost = async (data) => {
    const result = await request.post(baseUrl, data);
    return result;
}

export const deletePost = async (postId) => {
    await request.remove(`${baseUrl}/${postId}`);
}
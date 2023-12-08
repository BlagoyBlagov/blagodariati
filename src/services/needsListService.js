import * as request from '../lib/request';
const baseUrl = 'http://localhost:3030/data/posts';


export const getAll = async (limit) => {
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
        ...(limit ? { offset: 0, pageSize: limit } : {}),
    });

    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc&${query}`);
    return result;
};

export const getAllByUser = async (userId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`,
        load: `owner=_ownerId:users`,
    });
    const result = await request.get(`${baseUrl}?${query}`);
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

export const updatePost = async (postId, data) => {
    const result = await request.put(`${baseUrl}/${postId}`, data);
    return result;
}

export const deletePost = async (postId) => {
    await request.remove(`${baseUrl}/${postId}`);
} 
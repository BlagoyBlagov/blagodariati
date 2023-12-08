import * as request from '../lib/request';
const baseUrl = 'http://localhost:3030/data/likes';

export const likePost = async (postId) => {
    // console.log(postId);
    const result = await request.post(baseUrl, postId);
    return result;
}

export const getLikesByPost = async (postId) => {
    const query = new URLSearchParams({
        where: `postId="${postId}"`,
    });
    const result = await request.get(`${baseUrl}?${query}`);
    return result;
}
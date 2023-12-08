import * as request from '../lib/request';
const baseUrl = 'http://localhost:3030/data/posts';


export const getAll = async (limit, searchData) => {
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
        ...(limit ? { offset: 0, pageSize: limit } : {}),
    });

    let buildSearchQuery = '';
    if(searchData && searchData.search || searchData && searchData.category_id) {
        buildSearchQuery = '&where=';
        if(searchData.search && searchData.category_id) {
            buildSearchQuery += `description%20LIKE%20"${searchData.search}"%20AND%20_needId%20LIKE%20"${searchData.category_id}"`;
        } else if(searchData.search) {
            buildSearchQuery += `description%20LIKE%20"${searchData.search}"`;
        } else if(searchData.category_id) {
            buildSearchQuery += `_needId%20LIKE%20"${searchData.category_id}"`;
        }
    }
    
    // const search = `where=_needId%20LIKE%20"2ac967df-0941-4ff9-87c7-a58bd5d352c0"`;
    // const search = `where=_description%20LIKE%20"Известен факт е, че"%20AND%20"`;

    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc${buildSearchQuery}&${query}`);
   
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
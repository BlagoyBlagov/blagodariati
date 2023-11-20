const baseUrl = 'http://localhost:3030';

export const counter = async (ownerId) => {
    const response = await fetch(`${baseUrl}/data/posts?where=_ownerId${encodeURIComponent(`="${ownerId}"`)}&count`);
    const result = await response.json();
    return result;
};
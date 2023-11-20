const baseUrl = 'http://localhost:3030';

// const getUsersInfo = async () => {
//     const response = await fetch(`${baseUrl}/data/userData`);
//     const result = await response.json();
//     return result;
// };

const getAllPosts = async () => {
    const response = await fetch(`${baseUrl}/data/posts?sortBy=${encodeURIComponent(`_createdOn desc`)}`);
    const result = await response.json();
    return Object.values(result);
};

const getNeeds = async () => {
    const response = await fetch(`${baseUrl}/data/needs`);
    const result = await response.json();
    return result;
};

export const getAdsAndUsers = async () => {
    try {
        const [posts, needs] = await Promise.all([getAllPosts(), getNeeds()]);

        const userPromises = posts.map(async (postData) => {
            const userResponse = await fetch(`${baseUrl}/data/userData/?where=_ownerId${encodeURIComponent(`="${postData._ownerId}"`)}`);
            const userData = await userResponse.json();
            return userData[0]; 
        });

        const usersInfo = await Promise.all(userPromises);

        const adsWithUserInfo = posts.map((postData) => {
            const need = needs.find((need) => need._id === postData._needId);
            const userInfo = usersInfo.find((user) => user._ownerId === postData._ownerId);

            const post = {
                ...postData,
                needFrom: need ? need.name : '',
                needIcon: need ? need.icon : '',
                userId: userInfo ? userInfo._id : '',
                userNames: userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : '',
                imageUrl: userInfo ? userInfo.imageUrl : '',
            };

            return post;
        });

        return adsWithUserInfo;
    } catch (error) {
        console.error('Error in getAdsAndUsers:', error);
        throw error;
    }
};

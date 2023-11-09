const baseUrl = 'http://localhost:3030';

const getAllAds = async () => {
    const response = await fetch(`${baseUrl}/data/ads`);
    const result = await response.json();
    return Object.values(result);
};

const getUsersInfo = async () => {
    const response = await fetch(`${baseUrl}/data/allUsers`);
    const result = await response.json();
    return result;
};

const getNeeds = async () => {
    const response = await fetch(`${baseUrl}/jsonstore/needs`);
    const result = await response.json();
    return result;
};

export const getAdsAndUsers = async () => {
    const [ads, needs] = await Promise.all([getAllAds(), getNeeds()]);

    const user = ads.map(async (ad) => {
        const userResponse = await fetch(`${baseUrl}/data/getUsers/${ad._ownerId}`);
        const userData = await userResponse.json();
        return { userId: ad._ownerId, ...userData };
    });

    const usersInfo = await Promise.all(user);

    const adsWithUserInfo = ads.map((ad) => {
        const need = needs[ad._needId];
        const userInfo = usersInfo.find(user => user.userId === ad._ownerId);

        ad.needFrom = need.name;
        ad.userNames = userInfo.firstName + ' ' + userInfo.lastName;
        ad.imageUrl = userInfo.imageUrl;

        return ad;
    });

    return adsWithUserInfo;
};
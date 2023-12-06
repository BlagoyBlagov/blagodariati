import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/profile.module.css';
import CountPosts from './CountPosts';

const baseUrl = 'http://localhost:3030/data/userData';

const Profile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`,
        load: `data=_ownerId:users`,
    });

    // console.log(`${baseUrl}?${query}`);

    useEffect(() => {
        fetch(`${baseUrl}?${query}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Not found');
                }
                return res.json();
            })
            .then(([user]) => {
                if (!user || !user.data) {
                    throw new Error('Invalid user data');
                }
                const userData = {
                    ...user.data,
                    location: JSON.parse(user.data.location)
                }
                setUser(userData);
            })
            .catch((err) => {
                navigate('/');
            });
    }, [userId]);


    const userLocation = user.location ? user.location.location : '';
    // console.log(userLocation);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className={styles["user-profile"]}>
                        <div className={styles["user-avatar"]}>
                            <img src={user?.imageUrl || '/images/User-avatar.png'} alt="" />
                        </div>
                        <div className={styles["user-info"]}>
                            <small className='text-success'>потребител</small>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <span><i className="fa-solid fa-location-dot"></i> {userLocation}</span>
                        </div>
                        <div className={styles["user-stats"]}>
                            <span>Публикации</span>
                            <CountPosts ownerId={user._id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

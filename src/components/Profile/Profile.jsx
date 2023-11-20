import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/profile.module.css';
import CountPosts from './CountPosts';

const Profile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [countPosts, setCountPosts] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3030/data/userData/${userId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Not found');
                }
                return res.json();
            })
            .then(setUser)
            .catch((err) => {
                navigate('/');
            });
    }, [userId]);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className={styles["user-profile"]}>
                        <div className={styles["user-avatar"]}>
                            <img src={user.imageUrl} alt="" />
                        </div>
                        <div className={styles["user-info"]}>
                            <small className='text-success'>потребител</small>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <span><i className="fa-solid fa-location-dot"></i> Благоевград</span>
                        </div>
                        <div className={styles["user-stats"]}>
                            <span>Публикации</span>
                            <CountPosts ownerId={user._ownerId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

import { Link } from 'react-router-dom';
import styles from './styles/posts.module.css';
import { formatTimestamp } from '../utils/formatTimestamp';
import { needs } from '../staticDb/needs';
import { truncateText } from '../utils/truncateText';

const NeedsList = ({
    _id,
    description,
    publishDate,
    userNames,
    imageUrl,
    ownerId,
    location,
    needId,
}) => {

    const userImageUrl = imageUrl ? imageUrl : '/images/User-avatar.png';

    return (

        <>
            <div className="col-md-3 mb-3 d-flex align-items-stretch">
                <div className={`p-3 mb-2 card ${styles['card']}`} style={{ backgroundImage: `url(${needs[needId].icon})` }}>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center w-90">
                            <div className={styles['icon']}>
                                <Link to={`/profile/${ownerId}`}><img src={userImageUrl} alt={userNames} /></Link>
                            </div>
                            <div className={`ms-2 ${styles['c-details']}`}>
                                <Link to={`/profile/${ownerId}`}><h6 className="mb-0">{userNames}</h6></Link>
                                {/* <span>{location}</span> */}
                                <span>{formatTimestamp(publishDate)}</span>
                            </div>
                        </div>
                        <div className={styles['badge']}> <span>{needs[needId].name}</span> </div>
                    </div>
                    <div className="mt-3">
                        <p>{truncateText(description)}</p>
                    </div>
                    <div className="mt-3">
                        <div className="mt-3">
                            <Link to={`/details/${_id}`} className="btn btn-primary btn-sm">Виж повече</Link>
                            {/* <span className={styles['text1']}>
                                    <span className={styles['text2']}>Нужда от </span>
                                    <Link to={`/needs/${needId}`}>{needs[needId].name}</Link>
                                </span> */}
                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}

export default NeedsList;
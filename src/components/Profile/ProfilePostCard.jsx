import { Link } from 'react-router-dom';
import styles from '../styles/posts.module.css'
import { formatTimestamp } from '../../utils/formatTimestamp';
import { needs } from '../../staticDb/needs';
import { truncateText } from '../../utils/truncateText';


const ProfilePostCard = ({
    _id,
    description,
    publishDate,
    imageUrl,
    needId,
}) => {

    return (
        <>
            <div className="col-md-3 mb-3 d-flex align-items-stretch">
                <div className={`p-3 mb-2 card ${styles['card']}`} style={{ backgroundImage: `url(${needs[needId].icon})` }}>
                    
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                            <div className={`${styles['c-details']}`}>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePostCard;
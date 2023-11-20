import { Link } from 'react-router-dom';
import styles from './styles/userList.module.css';
import { formatTimestamp } from '../utils/formatTimestamp';


const NeedsList = ({
    needId,
    needFrom,
    needIcon,
    description,
    userNames,
    publishDate,
    imageUrl,
    ownerId,
    userId,
}) => {

    const date = new Date(publishDate);
    const formattedDate = formatTimestamp(date);

    return (

        <>


    <div className="col-md-3 mb-3 d-flex align-items-stretch">
        <div className={`p-3 mb-2 card ${styles['card']}`} style={{backgroundImage: `url(${needIcon})`}}>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div className={styles['icon']}>
                        <Link to={`/profile/${userId}`}><img src={imageUrl} alt={userNames} /></Link>
                        </div>
                        <div className={`ms-2 ${styles['c-details']}`}>
                            <Link to={`/profile/${userId}`}><h6 className="mb-0">{userNames}</h6></Link>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                    <div className={styles['badge']}> <span>активен</span> </div>
                </div>
                <div className="mt-5">
                    <p>{description}</p>
                </div>
                <div className="mt-5">
                    <div className="mt-3"> <span className={styles['text1']}>32 Applied <span className={styles['text2']}>of 50 capacity</span></span> </div>
                </div>
            </div>
    </div>



        {/* <div className="d-flex text-body-secondary pb-3">
            <div className={`flex-shrink-0 me-2 rounded ${styles['user-avatar']}`}>
                <img src={imageUrl} alt="" />
            </div>
            <div className="mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div>
                            <strong className="text-gray-dark me-1"><Link to={`/profile/${userId}`}>{userNames}</Link></strong> 
                            <small className=" me-1">има нужда от</small>
                            <strong><Link to={`#${needId}`}>{needFrom}</Link></strong>
                        </div>
                        <p className="d-block pt-1 mb-0">{description}</p>
                    </div>
                    <Link to={`#${needId}`} className="btn btn-yellow btn-sm">Виж повече</Link>
                </div>
            </div>
        </div> */}
        </>


        
    )
}

export default NeedsList;
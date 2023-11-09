// import styles from './styles/userList.module.css';

const NeedsList = ({
    needId,
    needFrom,
    description,
    userNames,
    publishDate,
    imageUrl,
    ownerId,
}) => {

    return (
        <div className="d-flex text-body-secondary pb-3">
            <div className={`flex-shrink-0 me-2 rounded ${styles['user-avatar']}`}>
                <img src={imageUrl} alt="" />
            </div>
            <div className="mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div>
                            <strong className="text-gray-dark me-1"><a href={`#${ownerId}`}>{userNames}</a></strong> 
                            <small className=" me-1">има нужда от</small>
                            <strong><a href={`#${needId}`}>{needFrom}</a></strong>
                        </div>
                        <p className="d-block pt-1 mb-0">{description}</p>
                    </div>
                    <a href={`#${needId}`} className="btn btn-primary btn-sm">Виж повече</a>
                </div>
            </div>
        </div>
    )
}

export default NeedsList;
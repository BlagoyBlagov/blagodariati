import { useState, useEffect } from "react";
import * as needsListService from "../services/needsListService";
import NeedsList from './NeedsList';
import styles from './styles/posts.module.css';

const Home = () => {

    const [needs, setNeeds] = useState([]);

    useEffect(() => {
        needsListService.getAll()
        .then(result => {
            setNeeds(result);
            // console.log(result);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <img className={`me-3 ${styles['heart-icon']}`} src="/images/icon-1.png" alt="" width="53" />
                <div className="lh-1">
                <h1 className="h6 mb-0 text-white lh-1">Последни публикации</h1>
                <small></small>
                </div>
            </div>

            <div className="row">
                {needs
                .map(need => (
                    <NeedsList
                        key={need._id}
                        _id={need._id}

                        description={need.description}
                        publishDate={need._createdOn}

                        ownerId={need._ownerId}
                        userNames={`${need.owner.firstName} ${need.owner.lastName}`}
                        imageUrl={need.owner.imageUrl}
                        location={need.owner.location}

                        needId={need._needId}
                    />
                ))}
            </div>


        </>
    );
}

export default Home;
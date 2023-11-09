import { useState, useEffect } from "react";
import * as needsListService from "../services/needsListService";
import NeedsList from './NeedsList';
import styles from './styles/userList.module.css';

const Home = () => {

    const [needs, setNeeds] = useState([]);

    useEffect(() => {
        needsListService.getAdsAndUsers()
        .then(result => {
            setNeeds(result);
            console.log(result);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <img className={`me-3 ${styles['heart-icon']}`} src="./assets/images/icon-1.png" alt="" width="53" />
                <div className="lh-1">
                <h1 className="h6 mb-0 text-white lh-1">Последни публикации</h1>
                <small></small>
                </div>
            </div>

            <div className="my-3 p-3 bg-body rounded shadow-sm">
    

                {needs
                .map((need, index) => ({ ...need, index }))
                .sort((a, b) => b.index - a.index)
                .map(need => (
                    <NeedsList
                        key={need._id}
                        needId={need._id}
                        needFrom={need.needFrom}
                        description={need.description}
                        userNames={need.userNames}
                        publishDate={need.publishDate}
                        imageUrl={need.imageUrl}
                        ownerId={need._ownerId}
                    />
                ))}

            </div>


        </>
    );
}

export default Home;
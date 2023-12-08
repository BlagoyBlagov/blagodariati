import { useState, useEffect } from "react";
import * as needsListService from "../services/needsListService";
import NeedsList from './NeedsList';
import styles from './styles/posts.module.css';

const Home = () => {

    const [posts, setPosts] = useState([]);

    const postLimit = 4;

    useEffect(() => {
        needsListService.getAll(postLimit)
        .then(result => {
            setPosts(result);
            // console.log(result);
        })
        .catch(err => console.log(err));
    }, []);


    return (
        <>
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <img className={`me-3 ${styles['heart-icon']}`} src="/images/icon-1.png" alt="" width="53" />
                <div className="lh-1">
                <h1 className="h6 mb-0 text-white lh-1">Последни {postLimit} публикации</h1>
                <small></small>
                </div>
            </div>

            <div className="row">
                {posts
                .map(post => (
                    <NeedsList
                        key={post._id}
                        _id={post._id}

                        description={post.description}
                        publishDate={post._createdOn}

                        ownerId={post._ownerId}
                        userNames={`${post.owner.firstName} ${post.owner.lastName}`}
                        imageUrl={post.owner.imageUrl}
                        location={post.owner.location}

                        needId={post._needId}
                    />
                ))}

            {posts.length === 0 && (
                <h2>Няма публикации</h2>
            )}
            </div>


        </>
    );
}

export default Home;
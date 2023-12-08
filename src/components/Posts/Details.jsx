import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as postService from '../../services/needsListService';

import { needs } from '../../staticDb/needs';

import styles from '../styles/posts.module.css';
import { formatTimestamp } from '../../utils/formatTimestamp';
import AuthContext from '../../contexts/authContext';
import { likePost, getLikesByPost } from '../../services/likeService';


const Details = () => {

    const { postId } = useParams();
    const navigate = useNavigate();
    const { userId, isAuthenticated } = useContext(AuthContext);

    const [post, setPost] = useState({});
    const [hasLikedPost, setHasLikedPost] = useState(false);
    const [likeCounts, setLikeCounts] = useState(0);

    useEffect(() => {
        postService.getOne(postId)
            .then(setPost)
            .catch((err) => {
                navigate('/');
                // redirect to 404
            });
    }, [postId]);

    const userNames = post.owner ? post.owner.firstName + ' ' +post.owner.lastName : '';

    const deleteButtonClickHandler = async () => {
        await postService.deletePost(postId);
        navigate('/');
    }

    // useEffect(() => {
    //     if (post && post.postLikes) {
    //       const liked = post.postLikes.some((like) => {
    //         return like._ownerId === userId && like.postId === post._id;
    //       });
    
    //       setHasLikedPost(liked);
    //     }
    // }, [post, userId]);


    useEffect(() => {
        getLikesByPost(postId)
        .then(result => {
            const liked = result.some((like) => {
                return like._ownerId === userId && like.postId === post._id;
            });
            setLikeCounts(result.length);
            setHasLikedPost(liked);
        });
    }, [post, userId, hasLikedPost, likeCounts])

    const likeClickHandler = async () => {
        try {
          await likePost({ postId });
          setHasLikedPost(true);
        } catch (error) {
          console.error(error);
        }
    };

    const postLikesCount = (post.postLikes ? post.postLikes.filter((like) => like.postId === postId) : []).length;

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-8 my-3 d-flex align-items-stretch">
                    <div className={`p-3 mb-2 card ${styles['card']}`} style={{ backgroundImage: `url(${needs[post._needId]?.icon || ''})` }}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className={styles['icon']}>
                                    <Link to={`/profile/${post._ownerId}`}><img src={post.owner?.imageUrl || '/images/User-avatar.png'} alt={userNames} /></Link>
                                </div>
                                <div className={`ms-2 ${styles['c-details']}`}>
                                    <Link to={`/profile/${post._ownerId}`}><h6 className="mb-0">{userNames}</h6></Link>
                                    {/* <span>{location}</span> */}
                                    <span>{formatTimestamp(post._createdOn)}</span>
                                </div>
                            </div>
                            <div className={styles['badge']}> <span>{needs[post._needId]?.name || ''}</span> </div>
                        </div>
                        <div className="mt-3">
                            {/* <p>{post.description}</p> */}
                            {post.description && 
                                post.description.split('\n')
                                .filter(line => line.trim() !== '')
                                .map((line, index) => (
                                <p className="mb-1" key={index}>{line}</p>
                            ))}
                        </div>  


                        <div className="mt-3">
                            {isAuthenticated && (
                                <>
                                <button className="btn btn-link">{likeCounts} харесвания</button>
                                <button 
                                className={`btn btn-sm btn-${hasLikedPost ? 'success' : 'secondary'} me-2`} 
                                onClick={likeClickHandler}>{hasLikedPost ? 'Харесано' : 'Харесай'}
                                </button>
                                </>
                            )}
                            {userId === post._ownerId && (
                                <>
                                    <Link to={`/details/${post._id}/edit`} className="btn btn-sm btn-primary me-2">Редактирай</Link> 
                                    <button type="button" className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deletePostModal">Изтрий</button>
                                </>
                            )}
                        </div>
                
                        {userId === post._ownerId && (
                                <div className="modal fade" id="deletePostModal" tabIndex={-1} aria-labelledby="deletePostModal" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="deletePostModal">Изтриване</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div className="modal-body">Сигурни ли сте че искате да изтриете публикацията?</div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Откажи</button>
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteButtonClickHandler}>Изтриване</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;
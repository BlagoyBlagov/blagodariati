import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as postService from '../../services/needsListService';

import { needs } from '../../staticDb/needs';

import styles from '../styles/posts.module.css';
import { formatTimestamp } from '../../utils/formatTimestamp';
import AuthContext from '../../contexts/authContext';

const baseUrl = 'http://localhost:3030/data/posts';

const Details = () => {

    const { postId } = useParams();
    const navigate = useNavigate();
    const { userId, isAuthenticated } = useContext(AuthContext);

    const [post, setPost] = useState({});


    const query = new URLSearchParams({
        load: `owner=_ownerId:users`,
    });

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
                                .map((line, index, array) => (
                                <p className="mb-1" key={index}>{line}</p>
                            ))}
                        </div>  


                        {userId === post._ownerId && (
                            <>
                                <div className="mt-3">
                                    <button className="btn btn-sm btn-secondary me-2">Харесай</button>
                                    <Link to={`/details/${post._id}/edit`} className="btn btn-sm btn-primary me-2">Редактирай</Link> 
                                    <button type="button" className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deletePostModal">Изтрий</button>
                                </div>

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

                            </>
                        )}

                        {/* {isAuthenticated && (
                            <>
                            <div className="mt-3">
                                <label htmlFor="description" className="form-label">Коментирай</label>
                                <textarea className="form-control" 
                                rows="3" 
                                id="comment"
                                name="comment"></textarea>
                            </div>
                            </>
                        )} */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;
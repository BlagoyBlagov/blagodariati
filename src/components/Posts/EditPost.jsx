import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { needs } from '../../staticDb/needs';

import * as postService from '../../services/needsListService';

const editPost = () => {

    const navigate = useNavigate();
    const { postId } = useParams();
    
    const [post, setPost] = useState({
        _needId: '',
        description: '',
    });

    useEffect(() => {
        postService.getOne(postId)
            .then(setPost);
    }, [postId]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(post);
    }

    const onChange = (e) => {
        setPost(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };


    return (
        <>
            <div className="py-5 text-center">
                <h2>Редактиране</h2>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius magnam exercitationem incidunt eos dolore? Molestias recusandae, expedita quos quod soluta sit qui amet optio reiciendis vitae accusamus delectus eaque iure!</p>
            </div>

            <div className="row g-5">
                <div className="offset-md-2 col-md-7 col-lg-8">
                    <form onSubmit={onSubmit}>
                        <div className="row g-3">

                            <div className="col-12">
                                <select className="form-select" name='_needId' onChange={onChange}>
                                    <option value="">--- Ибзерете категория ---</option>
                                    {Object.values(needs).map((need) => (
                                        <option key={need._id} value={need._id} selected={post._needId === need._id ? 'selected': ''}>
                                        {need.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="col-12">
                                <label htmlFor="description" className="form-label">Опишете от какво имате нужда</label>
                                <textarea className="form-control" 
                                rows="6" 
                                id="description"
                                name="description"
                                value={post.description}
                                onChange={onChange}></textarea>
                            </div>

                        </div>

                        <hr className="my-4" />
                        
                        <button className="w-100 btn btn-primary btn-lg" type="submit">Обнови</button>
                    </form>
                </div>
            </div>
            </>
    );


}

export default editPost;
import { useNavigate } from 'react-router-dom';
import * as postService from '../../services/needsListService';
import { needs } from '../../staticDb/needs';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/authContext';

const createPost = () => {

    const navigate = useNavigate();

    const { isAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState(null);
    
    const formInitValues = {
        _needId: '',
        description: '',
    };

    const [formValues, setFormValues] = useState(formInitValues);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValues((state) => ({
            ...state,
            [name]: value,
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if(!formValues._needId || !formValues.description) {
                throw new Error('Попълнете всички полета');
            }
            await postService.createPost(formValues);
            setFormValues(formInitValues)
            navigate('/');
        } catch(error) {
            setError(error.message);
            // console.log(error.message);
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <div className="py-5 text-center">
                <h2>Публикуване</h2>
            </div>

            <div className="row g-5">
                <div className="offset-md-2 col-md-7 col-lg-8">

                    {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div>}

                    <form onSubmit={onSubmit}>
                        <div className="row g-3">

                            <div className="col-12">
                                <select className="form-select" name="_needId" onChange={onChange}>
                                    <option value="">--- Ибзерете категория ---</option>
                                    {Object.values(needs).map((need) => (
                                        <option key={need._id} value={need._id}>
                                        {need.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="col-12">
                                <label htmlFor="description" className="form-label">Опишете от какво имате нужда</label>
                                <textarea className="form-control" id="description" rows="6" name="description" value={formValues.description} onChange={onChange}></textarea>
                            </div>

                        </div>

                        <hr className="my-4" />
                        
                        <button className="w-100 btn btn-primary btn-lg" type="submit">Публикувай</button>
                    </form>
                </div>
            </div>
            </>
    );


}

export default createPost;
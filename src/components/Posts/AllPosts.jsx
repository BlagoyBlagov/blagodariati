import { useState, useEffect } from "react";
import * as needsListService from "../../services/needsListService";
import NeedsList from './NeedsList';
import postsStyles from '../styles/posts.module.css';
import searchBoxStyles from '../styles/searchBox.module.css';
import { useNavigate } from "react-router-dom";
import { needs } from "../../staticDb/needs";


const AllPosts = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const searchInitValues = {
        search: '',
        category_id: '',
    };
    const [searchValues, setSearchValues] = useState(searchInitValues);
    // const [searchParams, setSearchParams] = useState({});

    const { category_id } = searchValues;

    useEffect(() => {
        needsListService.getAll('', { category_id })
        .then(result => {
            setPosts(result);
        })
        .catch(err => console.log(err));
    }, [searchValues]);

    // отпада за сега
    // const searchHandler = (e) => {
    //     e.preventDefault();

    //     setSearchParams({
    //         description: searchValues.search,
    //         category_id: searchValues.category_id
    //     })

    //     const queryParams = {};
    //     if (searchValues.search) queryParams.search = searchValues.search;
    //     if (searchValues.category_id) queryParams.category_id = searchValues.category_id;
    //     navigate(`/all?${new URLSearchParams(queryParams)}`);
    // };

    const onChange = (e) => {
        const { name, value } = e.target;
        setSearchValues((state) => ({
            ...state,
            [name]: value,
        }));
    }


    return (
        <>
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <img className={`me-3 ${postsStyles['heart-icon']}`} src="/images/icon-1.png" alt="" width="53" />
                <div className="lh-1">
                <h1 className="h6 mb-0 text-white lh-1">Всички публикации</h1>
                <small></small>
                </div>
            </div>

            <form className={searchBoxStyles['search-box']}>
                <div className="row g-3">
                    <div className={`col-auto ${postsStyles['filter-text']}`}>
                        Филтрирай
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" aria-label="Категория" name="category_id" value={searchValues.category_id} onChange={onChange}>
                            <option value="">Категория</option>
                            {Object.values(needs).map((need) => (
                                <option key={need._id} value={need._id}>
                                {need.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>

            <div className="row">
                {posts
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

            {posts.length === 0 && (
                <h2>Няма публикации</h2>
            )}
            </div>


        </>
    );
}

export default AllPosts;
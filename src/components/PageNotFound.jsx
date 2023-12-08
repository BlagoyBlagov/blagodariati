import { Link } from 'react-router-dom';
import pageNotFoundStyles from './styles/pageNotFound.module.css'

const PageNotFound = () => {

    return (
            <div className={pageNotFoundStyles['notfound-box']}>
                <h1>404</h1>
                <h3>Страницата не е намерена</h3>
                <Link to="/" className="btn btn-primary">Върни се в началото</Link>
            </div>
    );
}

export default PageNotFound;
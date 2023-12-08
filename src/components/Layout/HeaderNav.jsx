import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

const HeaderNav = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);

    const {
        isAuthenticated,
        username,
    } = useContext(AuthContext);

    return (
        <header>
            <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary" aria-label="Main navigation">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="/images/blagodaria_ti_logo_small_colored.png" alt="" /> Благодаря Ти
                    </Link>

                <button onClick={handleSidebarToggle} className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className={`justify-content-end navbar-collapse offcanvas-collapse ${isSidebarOpen ? 'open' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link active" to="/">Начало</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/all">Всички публикации</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#">Хора в нужда</Link></li>
                        {isAuthenticated && (<li className="nav-item"><Link className="nav-link" to="/create">Публиквай</Link></li>)}
                    </ul>

                    {isAuthenticated && (
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" to="/">{username}</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/logout">Изход</Link></li>
                        </ul>
                    )}

                    {!isAuthenticated && (
                        <>
                        <Link className="btn btn btn-outline-secondary me-2" to="login">Вход</Link>
                        <Link className="btn btn-yellow" to="register">Регистрация</Link>
                        </>
                    )}
                </div>
                </div>
            </nav>
            
        </header>
    )
}

export default HeaderNav;
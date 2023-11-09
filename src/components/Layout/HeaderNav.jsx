import React, { useState } from 'react';

const HeaderNav = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);

    return (
        <header>
            <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary" aria-label="Main navigation">
                <div className="container">
                <a className="navbar-brand" href="/">
                    <img src="images/blagodaria_ti_logo_small.png" alt="" />
                    Благодаря Ти
                </a>
                <button onClick={handleSidebarToggle} className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className={`justify-content-end navbar-collapse offcanvas-collapse ${isSidebarOpen ? 'open' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active" href="/">Начало</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Хора в нужда</a></li>
                    </ul>
                    <button className="btn btn-outline-dark me-2">Вход</button>
                    <button className="btn btn-primary">Регистрация</button>
                </div>
                </div>
            </nav>
            
        </header>
    )
}

export default HeaderNav;
import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm position-relative">
            <div className="container">
                {/* Centering the heading */}
                <div className="position-left start-50 translate-middle-x">
                    <Link className="navbar-brand fw-bold" to="/">🗞️InsightStream</Link>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        
                        {/* Search bar near Home */}
                        <li className="nav-item">
                            <form className="d-flex">
                                
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="🔍Search"
                                    aria-label="Search"
                                />
                            </form>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle bg-transparent border-0" data-bs-toggle="dropdown">
                                Categories
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/entertainment">Entertainment</Link></li>
                                <li><Link className="dropdown-item" to="/business">Business</Link></li>
                                <li><Link className="dropdown-item" to="/health">Health</Link></li>
                                <li><Link className="dropdown-item" to="/science">Science</Link></li>
                                <li><Link className="dropdown-item" to="/sports">Sports</Link></li>
                                <li><Link className="dropdown-item" to="/technology">Technology</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

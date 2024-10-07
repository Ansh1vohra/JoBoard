import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userImg from './Images/UserIcon.png';
import Logo from './Images/logoNew.png';

export default function Header({ signIn, setSignIn, userName, recSignIn, setRecSignIn }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const loginBtn = document.getElementById('loginBtn');
        const menuBtn = document.getElementById('menuBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (recSignIn) {
            loginBtn.classList.add('visually-hidden');
            menuBtn.classList.add('visually-hidden');
            logoutBtn.classList.remove('visually-hidden');
        } else if (signIn) {
            loginBtn.classList.add('visually-hidden');
            menuBtn.classList.remove('visually-hidden');
            logoutBtn.classList.add('visually-hidden');
        } else {
            loginBtn.classList.remove('visually-hidden');
            menuBtn.classList.add('visually-hidden');
            logoutBtn.classList.add('visually-hidden');
        }
    }, [signIn, recSignIn]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSignOut = () => {
        localStorage.setItem("SignIn", false);
        localStorage.setItem("RecSignIn", false);
        setSignIn(false);
        setRecSignIn(false);
        closeMenu();
        navigate('/');
    };

    return (
        <nav className="Head sticky-top">
            <div className='d-flex align-items-center gap-3'>
                <Link to="/" className='navbar-brand d-flex align-items-center gap-1' >
                    <img src={Logo} alt="Logo" width="37px" />
                    <div className="logo">JoBoard</div>
                </Link>
                <div className="navList">
                    <Link className="nav-link" to="/jobs">Jobs</Link>
                    <Link className="nav-link" to="/internships">Internships</Link>
                    <Link className="nav-link" to="/about">About</Link>
                </div>
            </div>
            <button
                className="bg-transparent visually-hidden userMenu"
                id="menuBtn"
                type="button"
                onClick={toggleMenu}
            >
                <img src={userImg} alt="User Icon" width="40px" />
            </button>
            <Link to="/signin" id="loginBtn">
                <button type="button" className="btn btn-outline-light">Sign-In</button>
            </Link>
            <button type="button" id="logoutBtn" className="btn btn-outline-light visually-hidden" onClick={handleSignOut}>Sign-Out</button>
            <div className={`custom-offcanvas ${isMenuOpen ? 'open' : ''}`}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Howdy {userName}!</h5>
                    <button type="button" className="btn-close" onClick={closeMenu} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='d-flex flex-column gap-3'>
                        <Link className="sideMenuLink" to="/application-history" onClick={closeMenu}>My Applications</Link>
                        {/* <Link className="sideMenuLink" to="/profile" onClick={closeMenu}>Profile</Link> */}
                        <Link className="sideMenuLink" to="/jobs" onClick={closeMenu}>Jobs</Link>
                        <Link className="sideMenuLink" to="/internships" onClick={closeMenu}>Internships</Link>
                        <Link className="sideMenuLink" to="/about" onClick={closeMenu}>About</Link>
                        <div className="sideMenuLink" onClick={handleSignOut}>Sign-Out</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

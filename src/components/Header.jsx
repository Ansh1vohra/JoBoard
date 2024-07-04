import './Header.css';
import { Link,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import userImg from './Images/UserIcon.png'

export default function Header({ signIn, setSignIn, userName }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const LoginBtn = document.getElementById('LoginBtn');
        const menuBtn = document.getElementById('menuBtn');
        if (signIn) {
            LoginBtn.classList.add('visually-hidden');
            menuBtn.classList.remove('visually-hidden');
        } else {
            LoginBtn.classList.remove('visually-hidden');
            menuBtn.classList.add('visually-hidden');
        }
    }, [signIn]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="Head sticky-top">
            <div className='d-flex align-items-center gap-3'>
                <Link className="navbar-brand" to="/">
                    <logo>JoBoard</logo>
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
            ><img src={userImg} alt="User Icon" width="40px" /> 
            </button>
            <Link to="/SignIn" id="LoginBtn">
                <button type="button"
                    className="btn btn-outline-light"
                >Sign-In
                </button>
            </Link>
            {/* SideMenu Code from Now! */}
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
                        <div className="sideMenuLink" onClick={() => {
                            localStorage.setItem("SignIn", false);
                            setSignIn(false);
                            closeMenu();
                            navigate('/signin');
                        }}>Sign-Out</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

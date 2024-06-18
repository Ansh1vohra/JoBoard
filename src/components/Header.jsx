import './components.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (

        <nav className="navbar navbar-expand-lg Head" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">JoBoard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/internships">Interships</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/jobs">Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    <Link to="/SignIn"><button type="button" className="btn btn-outline-light">Sign-In</button></Link>
                </div>
            </div>
        </nav>
    )
}
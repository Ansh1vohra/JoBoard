import './Home.css';
import homeSVG from './Images/homeSVGnew.png';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <main className="homeContent">
            <div className="content">
                <h1>Launch Your Dream Career!</h1>
                <p className="p-3">Experience a seamless job search process with JoBoard. Our platform is designed to connect job seekers with employers looking for top talent. Start your journey towards a fulfilling career today.</p>
                <div className="d-flex gap-2">
                    <Link to="/hire"><button type="button" className="btn btn-outline-dark btn-lg">Recruit Now</button></Link>
                    <Link to="/internships"><button type="button" className="btn btn-outline-dark btn-lg">Find Internships</button></Link>
                    <Link to="/jobs"><button type="button" className="btn btn-outline-dark btn-lg">Find Jobs</button></Link>
                </div>
            </div>
            <div className="image">
                <img src={homeSVG} alt="Home" />
            </div>
        </main>
    );
}

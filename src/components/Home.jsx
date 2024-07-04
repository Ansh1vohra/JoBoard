import './Home.css';
import homeSVG from './Images/homeSVGnew.png';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <main className="homeContent">
                <div className="content">
                    <h1>Launch Your Dream Career!</h1>
                    <p className="p-3">Experience a seamless job search process with JoBoard. Our platform is designed to connect job seekers with employers looking for top talent. Start your journey towards a fulfilling career today.</p>
                    <div className="d-flex gap-2">
                        {/* <Link to="/hire"><button type="button" className="btn btn-outline-dark btn-lg">Recruit Now</button></Link> */}
                        <Link to="/internships"><button type="button" className="btn btn-outline-dark btn-lg">Find Internships</button></Link>
                        <Link to="/jobs"><button type="button" className="btn btn-outline-dark btn-lg">Find Jobs</button></Link>
                    </div>
                </div>
                <div className="image">
                    <img src={homeSVG} alt="Home" />
                </div>
            </main>
            <div className="testimonials">
                    <h4>What Our Users Say</h4>
                    <div className="testimonial">
                        <p>"JoBoard helped me find my dream job in just two weeks! The platform is easy to use and the support team is fantastic."</p>
                        <span>- Jane Doe</span>
                    </div>
                    <div className="testimonial">
                        <p>"As a recruiter, JoBoard has been invaluable in finding top talent quickly and efficiently."</p>
                        <span>- John Smith</span>
                    </div>
                </div>
                <div className="howItWorks">
                    <h2>How It Works</h2>
                    <p>JoBoard simplifies the job search process for both job seekers and employers. Here's how:</p>
                    <ul>
                        <li>Sign up and create your profile.</li>
                        <li>Search for jobs or internships that match your skills and interests.</li>
                        <li>Apply directly through our platform.</li>
                        <li>Employers review applications and contact candidates for interviews.</li>
                    </ul>
                </div>
        </div>
    );
}

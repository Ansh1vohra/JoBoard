import "./Footer.css"
import {Link} from 'react-router-dom';

export default function Footer(){
    return(
        <footer className='footer'>
            <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/terms">Terms and Conditions</Link></li>
                    <li><Link to="/hire/login">Hire</Link></li>
                    <li><Link to="/internships">Find Internships</Link></li>
                    <li><Link to="/jobs">Find Jobs</Link></li>
                </ul>
            </div>
            <div className="footer-contact">
                <h4>Contact Us</h4>
                <p>Email: anshvohra1@gmail.com</p>
                <p>Phone: 7015150092</p>
            </div>
            <div className="footer-social">
                <h4>Follow Us</h4>
                <a href="https://github.com/Ansh1vohra" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/ansh1vohra/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://twitter.com/Ansh1Vohra" target="_blank" rel="noopener noreferrer">Twitter(X)</a>
            </div>
        </footer>
    )
}
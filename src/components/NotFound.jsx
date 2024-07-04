import { Link } from "react-router-dom";
import './Home.css'
import img from './Images/404.png'

export default function NotFound(){
    return(
        <main className="aboutContent">
            {/* <h1>404</h1> */}
            {/* <p className="text-danger fs-4">Page Not Found!</p> */}
            <img src={img} alt="404 Not Found!" style={{maxWidth:'90vw'}} />
            <Link to="/"> 
                <button className="btn btn-dark btn-lg">
                    Go back to Home
                </button>
            </Link>
        </main>
    )
}
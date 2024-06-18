import "./Hire.css";
import HireImg from "./Images/hire.png";
import {Link} from 'react-router-dom';

export default function Signin(){
    return(
        <div className="hireContainer">
            <form>
                <p>Get Internship/Job That Suits You!</p>
                <button 
                    type="button" 
                    className="btn btn-outline-dark m-3 d-flex align-items-center justify-content-center gap-3"
                    >Continue With Google
                    <img src="https://firebasestorage.googleapis.com/v0/b/anshvohra.appspot.com/o/Images%2FGoogle__G__logo.svg.png?alt=media&token=650cee41-f0da-4949-bdc9-1f7aed4241ce" alt="Google Logo" width={'30px'}></img>
                </button>
                <hr />
                <p >or</p>
                <div class="form-floating m-2">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
                    <label for="floatingInput">Email address</label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-outline-dark m-3"
                    >Continue
                </button>
                <Link to="/hire/login" style={{textAlign:'center',textDecoration:'none'}}>Want to Recruit?</Link>
            </form>
            <img src={HireImg} alt="Hire" className="hireImage" />
        </div>
    )
}
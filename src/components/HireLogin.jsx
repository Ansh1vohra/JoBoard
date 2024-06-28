import "./Hire.css";
import HireImg from "./Images/hire.png";
import {Link, useNavigate} from 'react-router-dom';

export default function Signin(){
    const navi = useNavigate();

    function redirectDash(e){
        e.preventDefault();
        navi("/hire/dashboard");
    }
    return(
        <div className="hireContainer">
            <form className="formSignIn" onSubmit={redirectDash}>
                <p>Log-In To Recruit!</p>
                <div class="form-floating m-2">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating m-2">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                    <label for="floatingPassword">Password</label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-outline-dark m-3"
                    >Log-In
                </button>
                <Link to="/hire" style={{textAlign:'center',textDecoration:'none'}}>Haven't Registered Yet? Click Here to Register.</Link>
            </form>
            <img src={HireImg} alt="Hire" className="hireImage" />
        </div>
    )
}
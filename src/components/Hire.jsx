import "./Hire.css";
import HireImg from "./Images/hire.png";
import {Link } from 'react-router-dom';

export default function Hire(){
    return(
        <div className="hireContainer">
            <img src={HireImg} alt="Hire" className="hireImage" />
            <form>
                <p style={{ textAlign: 'center',fontSize: '22px;',fontWeight:'600'}}>Hire Amazing Talent Here!</p>
                <div class="form-floating m-2">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
                    <label for="floatingInput">Email of Company</label>
                </div>
                <div class="form-floating m-2">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating m-2">
                    <input type="text" className="form-control" id="floatingName" placeholder="Name" required />
                    <label for="floatingName">Name of Company</label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-outline-dark m-3"
                    >Continue
                </button>
                <Link to="/hire/login" style={{textAlign:'center',textDecoration:'none'}}>Already Registered? Click Here to Login</Link>
            </form>
        </div>
    )
}
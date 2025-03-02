import "./Hire.css";
import { useState, useEffect } from "react";
import HireImg from "./Images/hire.png";
import { Link, useNavigate } from 'react-router-dom';

export default function HireLogin({ recSignIn, setRecSignIn }) {
    const navigate = useNavigate();
    const [companyMail, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (recSignIn) {
            navigate('/hire/dashboard');
        }
    }, [recSignIn, navigate]);

    async function redirectDash(e) {
        e.preventDefault();
        try {
            const response = await fetch('https://jo-board.vercel.app/api/company/verifyUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: companyMail,
                    password: password
                })
            });
            const data = await response.json();
            const errorElement = document.getElementById('errorMsg');
            if (response.status === 404 || response.status === 401) {
                errorElement.classList.remove('visually-hidden');
                errorElement.innerText = data.message;
            } else if (response.ok) {
                localStorage.setItem('SignIn', true);
                localStorage.setItem('RecSignIn', true);
                localStorage.setItem('UserMail',companyMail);
                setRecSignIn(true);
                navigate("/hire/dashboard");
            } else {
                console.error("Failed to validate user");
            }
        } catch (error) {
            console.error("Error Validating User:", error);
        }
    }

    return (
        <div className="hireContainer">
            <form className="formSignIn" onSubmit={redirectDash}>
                <p>Log-In To Recruit!</p>
                <div className="form-floating m-2">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com" 
                        value={companyMail}
                        onChange={
                            (e) => setEmail(e.target.value)
                        }
                        required 
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating m-2">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword" 
                        placeholder="Password"
                        value={password}
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                        required 
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-outline-dark m-3"
                >Log-In
                </button>
                <Link to="/hire" style={{textAlign:'center',textDecoration:'none'}}>
                    Haven't Registered Yet? Click Here to Register.
                </Link>
                <p 
                    className="text-danger visually-hidden" 
                    id="errorMsg">
                    User not Found!
                </p>
            </form>
            <img 
                src={HireImg} 
                alt="Hire" 
                className="hireImage" 
            />
        </div>
    );
}

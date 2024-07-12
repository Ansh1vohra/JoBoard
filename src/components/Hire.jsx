import "./Hire.css";
import HireImg from "./Images/hire.png";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Hire() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [OTP, setOTP] = useState('');
    const [generatedOTP, setGeneratedOTP] = useState('');
    const errorMsg = document.getElementById('errorMessage');

    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const hideCont1 = async () => {
        if (email && companyName && password) {
            const otpGen = generateOTP();
            setGeneratedOTP(otpGen);
            try {
                const response = await fetch('http://localhost:5000/api/company/sendOTP', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        OTP: otpGen
                    })
                });
                const data = await response.json();
                if (response.status === 409) {
                    errorMsg.classList.remove('visually-hidden');
                    errorMsg.innerText=data.message+'\nThis mail have already Registered, Try Signing In Just by clicking link above';
                } else if (response.ok) {
                    document.getElementById('formCont1').classList.add('visually-hidden');
                    document.getElementById('formCont2').classList.remove('visually-hidden');
                    errorMsg.classList.add('visually-hidden');
                    console.log(data.message);
                } else {
                    errorMsg.classList.remove('visually-hidden');
                    errorMsg.innerText='Failed to Send OTP';
                }
            } catch (error) {
                errorMsg.classList.remove('visually-hidden');
                errorMsg.innerText='Failed to Send OTP';
            }
        } else {
            // alert("Enter all the details");
            if (!email){
                errorMsg.classList.remove('visually-hidden');
                errorMsg.innerText='We can not proceed without e-mail';
            }
            else if (!password){
                errorMsg.classList.remove('visually-hidden');
                errorMsg.innerText='Please Enter a Password';
            }
            else if (!companyName){
                errorMsg.classList.remove('visually-hidden');
                errorMsg.innerText='Please let us know what we can call you!';
            }
            else{
                errorMsg.classList.remove('visually-hidden');
                errorMsg.innerText='Error : can Not Proceed';
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!OTP){
            errorMsg.classList.remove('visually-hidden');
            errorMsg.innerText='Enter OTP';
        }
        if (OTP === generatedOTP) {
            try {
                const response = await fetch('http://localhost:5000/api/company/createCompanyUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        companyMail: email,
                        companyName: companyName,
                        password: password,
                    })
                });

                if (response.ok) {
                    // localStorage.setItem('RecruiterSignIn', true);
                    navigate('/hire/login');
                } else {
                    console.error("Failed to create company user");
                }
            } catch (error) {
                console.error("Error creating company user:", error);
            }
        } else {
            errorMsg.innerText='Wrong OTP!';
        }
    }

    return (
        <div className="hireContainer">
            <img src={HireImg} alt="Hire" className="hireImage" />
            <form className="formSignIn">
                <p style={{ textAlign: 'center', fontSize: '22px', fontWeight: '600' }}>Hire Amazing Talent Here!</p>
                <div className="formContainer" id="formCont1">
                    <div className="form-floating m-2">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label htmlFor="floatingInput">Email of Company</label>
                    </div>
                    <div className="form-floating m-2">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating m-2">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder="Name"
                            onChange={(e) => setCompanyName(e.target.value)}
                            required />
                        <label htmlFor="floatingName">Name of Company</label>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-dark m-3"
                        onClick={hideCont1}
                    >Continue
                    </button>
                </div>
                <div className="formContainer visually-hidden" id="formCont2">
                    <div className="form-floating m-2">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingOTP"
                            placeholder="OTP"
                            onChange={(e) => setOTP(e.target.value)}
                            required />
                        <label htmlFor="floatingOTP">OTP</label>
                    </div>
                    <button
                        type='button'
                        className="btn btn-outline-dark m-3"
                        onClick={handleSubmit}
                    >Submit</button>
                </div>
                <Link to="/hire/login" style={{ textAlign: 'center', textDecoration: 'none' }}>Already Registered? Click Here to Login</Link>
                <p 
                    id="errorMessage"
                    className="text-danger visually-hidden"
                >Error: e-mail not found.</p>
            </form>
        </div>
    );
}

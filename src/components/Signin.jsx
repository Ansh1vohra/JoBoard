import "./Hire.css";
import HireImg from "./Images/hire.png";
import googleLogo from './Images/googleLogo.png';
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import firebaseConfig from '../firebaseInit';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";


export default function Signin({signIn,setSignIn,UserName,setUserName}){
    const [e_mail,setEmail] = useState('');
    const [otp,setOTP] = useState('');
    const [otpGen,setOTPgen] = useState('');
    const navigate = useNavigate();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const defaultImgURL = "https://firebasestorage.googleapis.com/v0/b/avjoboard.appspot.com/o/Images%2FUserIcon.png?alt=media&token=c27b2c25-e2a6-4f9f-a4b6-55a980f38894";
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }   
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        const spinner = document.getElementById("Gspinner");
        try {
            //adding spinner to the button
            if (spinner) {
                spinner.classList.remove("visually-hidden");
                document.getElementById("Gbtn").classList.add("disabled");
                document.getElementById("GbtnIn").classList.add("visually-hidden");
            } else {
                console.error("Spinner Element not found");
            }
            //Authenticating Here
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            if (user) {
                
                // Send user details to the Database
                const dbUpdate=await fetch('https://jo-board.vercel.app/api/users/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        Authtype: "Google",
                        OTP:'000000'
                    })
                });
                
                if (dbUpdate){
                    localStorage.setItem('SignIn', true);
                    setSignIn(true);
                    setUserName(user.displayName);
                    localStorage.setItem('UserName',user.displayName);
                    localStorage.setItem('UserMail',user.email);
                }
            }

            console.log(user);
            navigate("../");
        } catch (error) {
            localStorage.setItem('SignIn',false);
            setSignIn(false);
            setUserName("");
            localStorage.setItem('UserName',"");
            localStorage.setItem('UserMail',"");
            spinner.classList.add("visually-hidden");
            document.getElementById("Gbtn").classList.remove("disabled");
            document.getElementById("GbtnIn").classList.remove("visually-hidden");
            console.error("Error signing in with Google: ", error);
        }
    };

    function generateName(eml){
        const atIndex = eml.indexOf('@');
        if (atIndex !== -1) {
            return eml.substring(0, atIndex);
        }
    }
    const sendOTP= async (e)=>{
        e.preventDefault();
        document.getElementById('emailForm').classList.add("visually-hidden");
        document.getElementById('OTPForm').classList.remove("visually-hidden");
        const userName = generateName(e_mail);
        const otpGenerated = generateOTP();
        setOTPgen(otpGenerated);
        setUserName(userName);
        localStorage.setItem('UserName',userName);
        await fetch('https://jo-board.vercel.app/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: e_mail,
                displayName: userName,
                photoURL: defaultImgURL,
                Authtype: "OTP",
                OTP:otpGenerated
            })
        });
        await fetch('https://jo-board.vercel.app/api/users/sendOTP',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:e_mail,
                OTP:otpGenerated
            })
        })
    }

    const verifyOTP = (event)=>{
        event.preventDefault();
        if (otp === otpGen){
            localStorage.setItem('SignIn',true);
            setSignIn(true);
            localStorage.setItem('UserMail',e_mail);
            navigate("../");
        }else{
            document.getElementById('loginFail').classList.remove('visually-hidden');
            localStorage.setItem('SignIn',false);
            setSignIn(false);
            localStorage.setItem('UserMail',"");
        }
    }

    return(
        <div className="hireContainer">
            <div className="formSignIn">
                <p>Get Internship/Job That Suits You!</p>
                <button 
                    type="button" 
                    className="btn btn-outline-dark m-2 d-flex align-items-center justify-content-center gap-3"
                    id="Gbtn"
                    onClick={handleGoogleSignIn}
                    ><div 
                    className="d-flex flex-row gap-2 align-items-center"
                    id="GbtnIn">
                        Continue With Google
                        <img src={googleLogo} alt="Google Logo" width={'30px'}></img>
                    </div>
                    <div class="spinner-border visually-hidden" role="status" id="Gspinner"></div>
                </button>
                <hr />
                <span>or</span>
                <form id="emailForm" className="d-flex flex-column" onSubmit={sendOTP}>
                    <div className="form-floating m-2" id="emailInputCont">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="emailInput" 
                            placeholder="name@example.com" 
                            required
                            value={e_mail}
                            onChange={(e) => setEmail(e.target.value)}
                         />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-outline-dark m-2"
                        id="ContinueBtn"
                        >Continue
                    </button>
                </form>
                <form 
                    id="OTPForm" 
                    className="visually-hidden"
                    onSubmit={verifyOTP}
                >
                    <div className="form-floating m-2" id="OTPInputCont" >
                        <input 
                            className="form-control" 
                            id="OTPInput" placeholder="Enter OTP" 
                            required
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)} 
                        />
                        <label for="floatingInput">OTP</label>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn btn-outline-dark m-2"
                        id="SubmitBtn"
                        >Submit
                    </button>
                    <p className='border border-5 border-danger-subtle p-1 m-2 text-danger-subtle visually-hidden' id="loginFail">Wrong OTP, Enter Again!</p>
                </form>
                <Link to="/hire/login" style={{textAlign:'center',textDecoration:'none'}}>Want to Recruit?</Link>
            </div>
            <img src={HireImg} alt="Hire" className="hireImage" />
            
        </div>
    )
}
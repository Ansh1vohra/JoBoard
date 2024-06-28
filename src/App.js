import {Routes,Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Internships from "./components/Internships";
import InternDetails from "./components/InternDetails";
import Jobs from "./components/Jobs";
import Signin from "./components/Signin";
import Hire from "./components/Hire";
import HireLogin from "./components/HireLogin";
import HireDashborad from "./components/HireDashboard";
import About from "./components/About";
import Footer from './components/Footer';

function App() {
  const status = localStorage.getItem("SignIn");
  const [signIn, setSignIn] = useState(() => {
    return status === "true";
  });
  const [userName,setUserName] = useState(localStorage.getItem('UserName') || '');
  console.log(userName);

  useEffect(() => {
    localStorage.setItem("SignIn", signIn);
  }, [signIn]);
  return (
    <div className="Content">
      <Header 
      signIn={signIn}
      setSignIn={setSignIn}
      userName = {userName}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/intern-details" element={<InternDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/SignIn" element={
          <Signin
            signIn={signIn} 
            setSignIn={setSignIn}
            UserName = {userName}
            setUserName = {setUserName}
          />
        } />
        <Route path="/hire" element={<Hire />} />
        <Route path="/hire/login" element={<HireLogin />} />
        <Route path="/hire/dashboard" element={<HireDashborad />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

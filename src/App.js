import {Routes,Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Internships from "./components/Internships";
import InternDetails from "./components/InternDetails";
import Jobs from "./components/Jobs";
import ApplicationForm from './components/ApplicationForm';
import ApplicationHistory from './components/ApplicationHistory';
import Hire from "./components/Hire";
import HireLogin from "./components/HireLogin";
import HireDashborad from "./components/HireDashboard";
import About from "./components/About";
import Terms from "./components/Terms";
import Footer from './components/Footer';
import NotFound from './components/NotFound';

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
        <Route path="/job-details/:id" element={<InternDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/SignIn" element={
          <Signin
            signIn={signIn} 
            setSignIn={setSignIn}
            UserName = {userName}
            setUserName = {setUserName}
          />
        } />
        <Route path='/job-details/:id/apply' element={
          <ApplicationForm 
            signIn={signIn}
          />
        } />
        <Route path="/application-history" element={<ApplicationHistory />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/hire/login" element={<HireLogin />} />
        <Route path="/hire/dashboard" element={<HireDashborad />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

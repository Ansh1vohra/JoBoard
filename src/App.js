import {Routes,Route} from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Internships from "./components/Internships";
import Jobs from "./components/Jobs";
import Signin from "./components/Signin";
import Hire from "./components/Hire";
import HireLogin from "./components/HireLogin";
import HireDashborad from "./components/HireDashboard";
import About from "./components/About";

function App() {
  return (
    <div className="Content">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/SignIn" element={<Signin />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/hire/login" element={<HireLogin />} />
        <Route path="/hire/dashboard" element={<HireDashborad />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

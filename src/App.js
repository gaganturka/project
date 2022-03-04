import logo from './logo.svg';
import './App.css';
import AppointmentDetails from './components/Frontend/AppointmentDetails';
import ErrorPage from './components/Frontend/ErrorPage';
import ExpListing from './components/Frontend/ExpListing';
import ExpProfile from './components/Frontend/ExpProfile';
import Home from './components/Frontend/Home';
import Wallet from './components/Frontend/Wallet';
import UserDashBoard from './components/Frontend/UserDashBoard';
import Terms from './components/Frontend/Terms';
import Privacy from './components/Frontend/Privacy';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Frontend/Header';
function App() {
  return (
    <>
     <Router>
        <Header/>
                  <Routes>
              <Route exact path="/expertlisting" key="expertlisting"  element={<ExpListing/>} />
       
              <Route exact path="/" key="home" element={<Home/>} />
                
              <Route exact path="/privacypolicy" key="privacy"  element={<Privacy/>} />
       
              <Route exact path="/termsandconditions" key="termsandconditions" element={<Terms/>} />
                
              <Route  path="/errorpage" key="errorpage" element={<ErrorPage/>}/>

              </Routes>
          </Router>

    </>
  );
}

export default App;

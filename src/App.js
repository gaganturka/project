import './App.css';
import FavExp from './components/Frontend/FavExperts'
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
import Membership from './components/Frontend/Membership';
import ContactUs from './components/Frontend/ContactUs';
import PremiumExpert from './components/Frontend/PremiumExpert';
import ManageMembership from './components/Frontend/ManageMembership';
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
               

              <Route  path="/appointmentdetails" key="appointmentdetails" element={<AppointmentDetails/>}/>
              <Route  path="/expprofile" key="expprofile" element={<ExpProfile/>}/>
              <Route  path="/wallet" key="wallet" element={<Wallet/>}/>
              <Route  path="/userdashboard" key="userdashboard" element={<UserDashBoard/>}/>
              <Route  path="/favexperts" key="favexperts" element={<FavExp/>}/>
               <Route  path="/membership" key="membership" element={<Membership/>}/>
               <Route  path="/contactus" key="contactus" element={<ContactUs/>}/>
               <Route  path="/premiumexpert" key="premiumexpert" element={<PremiumExpert/>}/>
               <Route  path="/managemembership" key="managemembership" element={<ManageMembership/>}/>

              </Routes>
          </Router>

    </>
  );
}

export default App;

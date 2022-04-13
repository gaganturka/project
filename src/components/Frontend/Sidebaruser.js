import React, { useEffect, useState } from 'react'
import {Link,useLocation} from 'react-router-dom'
import homeAction from '../../actions/home.action'

const Sidebar = () => {
   const location=useLocation();
   const [userDetails,setUserDetails]=useState([]);
   const getBorhanUserDetails = async () => {
      // console.log(decodedToken,"hi its decoded");
      homeAction.getBorhanUserDetails((err,res)=>{
         if(err){
           console.log(err,"helllooo")
         }else{
         //   setGetCategories(res.data);
         //   console.log(res.data,"user details daata ");
           setUserDetails(  res.data  );
         //   setGetProfilePic(res.data.profilePic)
         }
       });

  };
   useEffect(() => {
      getBorhanUserDetails();
  }, [])
  
  return (
     
      <>
          <div className="sidebar-toggle">
            <button className="btn sidebar-mb-toggle-btn"><img src="./assets/img/expand-sidebar.png" alt="" /> User Menu</button>
         </div>
         <div className="sidebar-wrapper">
            <div className="flex-shrink-0">
               <div className="user-img-sidebar">
                  <img src={`${userDetails.profilePic==="" ?"./assets/img/mathew-wade.png":userDetails.profilePic}`} className="img img-fluid" alt="" />
                  <h3>{userDetails.firstName } {" "} {userDetails.lastName}</h3>
               </div>
               <ul className="list-unstyled ps-0">
                  <li className={`${location.pathname==='/userdashboard'?'active':''}`}><Link to="/userdashboard" className=""><img src="./assets/img/profile-icon.png"
                     className="img img-fluid" alt="" /> My Profile</Link></li>
                  <li className={`${location.pathname==='/appointmentdetails'?'active':''}`}><Link to="/appointmentdetails" className=""><img src="./assets/img/appointment-icon.png"
                     className="img img-fluid" alt="" /> Appointment details</Link></li>
                  <li className={`${location.pathname==='/wallet'?'active':''}`}><Link to="/wallet" className=""><img src="./assets/img/wallet-icon.png" className="img img-fluid"
                     alt="" /> Wallet</Link></li>
                  <li className=""><Link to="javascript:;" className=""><img src="./assets/img/saved-cards-icon.png" className="img img-fluid"
                     alt="" /> Saved cards</Link></li>
                     <li className={`${location.pathname==='/managemembership'?'active':''}`}><Link to="/managemembership" className=""><img src="./assets/img/vuesax-linear-chart-white.png" className="img img-fluid"
                        alt="" /> Manage Membership</Link></li>
                  <li className=""><Link to="/" className="" onClick={()=>{localStorage.removeItem('token')}}><img src="./assets/img/logout-icon.png" className="img img-fluid"
                     alt="" /> Logout</Link></li>
               </ul>
            </div>
         </div>
      </>
  )
}

export default Sidebar
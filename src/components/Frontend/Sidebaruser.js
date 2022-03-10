import React from 'react'
import {Link,useLocation} from 'react-router-dom'

const Sidebar = () => {
   const location=useLocation();
  return (
     
      <>
          <div className="sidebar-toggle">
            <button className="btn sidebar-mb-toggle-btn"><img src="./assets/img/expand-sidebar.png" alt="" /> User Menu</button>
         </div>
         <div className="sidebar-wrapper">
            <div className="flex-shrink-0">
               <div className="user-img-sidebar">
                  <img src="./assets/img/mathew-wade.png" className="img img-fluid" alt="" />
                  <h3>Mathew Wade</h3>
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
                     <li className={`${location.pathname==='/favexperts'?'active':''}`}><Link to="/favexperts" className=""><img src="./assets/img/favorite-icon.png" className="img img-fluid"
                        alt="" /> Favorite experts</Link></li>
                  <li className=""><Link to="/" className=""><img src="./assets/img/logout-icon.png" className="img img-fluid"
                     alt="" /> Logout</Link></li>
               </ul>
            </div>
         </div>
      </>
  )
}

export default Sidebar
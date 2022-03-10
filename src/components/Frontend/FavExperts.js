import React from 'react'

import {Link} from 'react-router-dom'
import Sidebar from './Sidebaruser';
const FavExp =()=>{

    return(
        <>
              <section className="admin-wrapper">
       <Sidebar/>
         <div className="admin-content-wrapper">
            <div className="row">
               <div className="col-lg-3">
                  <div className="exp-listing-box">
                     <div className="exp-listing-img">
                        <img src="./assets/img/exp-img-1.png" className="img img-fluid" alt="" />
                     </div>
                     <div className="exp-listing-content">
                        <h1>Heather Nikolaus</h1>
                        <h4>Business & Finance Expert</h4>
                        <Link to="/expprofile"><button className="btn mt-2" type="button">Book Appointment</button></Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-3">
                  <div className="exp-listing-box">
                     <div className="exp-listing-img">
                        <img src="./assets/img/exp-img-2.png" className="img img-fluid" alt="" />
                     </div>
                     <div className="exp-listing-content">
                        <h1>Heather Nikolaus</h1>
                        <h4>Business & Finance Expert</h4>
                        <Link to="/expprofile"><button className="btn mt-2" type="button">Book Appointment</button></Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-3">
                  <div className="exp-listing-box">
                     <div className="exp-listing-img">
                        <img src="./assets/img/exp-img-3.png" className="img img-fluid" alt="" />
                     </div>
                     <div className="exp-listing-content">
                        <h1>Heather Nikolaus</h1>
                        <h4>Business & Finance Expert</h4>
                        <Link to="/expprofile"><button className="btn mt-2" type="button">Book Appointment</button></Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-3">
                  <div className="exp-listing-box">
                     <div className="exp-listing-img">
                        <img src="./assets/img/exp-img-1.png" className="img img-fluid" alt="" />
                     </div>
                     <div className="exp-listing-content">
                        <h1>Heather Nikolaus</h1>
                        <h4>Business & Finance Expert</h4>
                        <Link to="/expprofile"><button className="btn mt-2" type="button">Book Appointment</button></Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-3">
                  <div className="exp-listing-box">
                     <div className="exp-listing-img">
                        <img src="./assets/img/exp-img-2.png" className="img img-fluid" alt="" />
                     </div>
                     <div className="exp-listing-content">
                        <h1>Heather Nikolaus</h1>
                        <h4>Business & Finance Expert</h4>
                        <Link to="/expprofile"><button className="btn mt-2" type="button">Book Appointment</button></Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-3">
                  <div className="exp-listing-box">
                     <div className="exp-listing-img">
                        <img src="./assets/img/exp-img-3.png" className="img img-fluid" alt="" />
                     </div>
                     <div className="exp-listing-content">
                        <h1>Heather Nikolaus</h1>
                        <h4>Business & Finance Expert</h4>
                        <Link to="/expprofile"><button className="btn mt-2" type="button">Book Appointment</button></Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-3">
                  <div className="exp-listing-box">
                     <div className="exp-listing-img">
                        <img src="./assets/img/exp-img-1.png" className="img img-fluid" alt="" />
                     </div>
                     <div className="exp-listing-content">
                        <h1>Heather Nikolaus</h1>
                        <h4>Business & Finance Expert</h4>
                        <Link to="/expprofile"><button className="btn mt-2" type="button">Book Appointment</button></Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-3">
                  <div className="exp-listing-box">
                     <div className="exp-listing-img">
                        <img src="./assets/img/exp-img-2.png" className="img img-fluid" alt="" />
                     </div>
                     <div className="exp-listing-content">
                        <h1>Heather Nikolaus</h1>
                        <h4>Business & Finance Expert</h4>
                        <Link to="/expprofile"><button className="btn mt-2" type="button">Book Appointment</button></Link>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
    
        </>
    );
}

export default FavExp
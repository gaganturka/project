import React from 'react'
import Header from './Header';
const UserDashBoard = () => {
  return (
      <>
      <section className="admin-wrapper">
         <div className="sidebar-toggle">
            <button className="btn sidebar-mb-toggle-btn"><img src="./assets/img/expand-sidebar.png" alt=""/> User Menu</button>
         </div>
         <div className="sidebar-wrapper">
            <div className="flex-shrink-0">
               <div className="user-img-sidebar">
                  <img src="./assets/img/mathew-wade.png" className="img img-fluid" alt=""/>
                  <h3>Mathew Wade</h3>
               </div>
               <ul className="list-unstyled ps-0">
                  <li className="active"><a href="user-dashboard.html" className=""><img src="./assets/img/profile-icon.png"
                     className="img img-fluid" alt=""/> My Profile</a></li>
                  <li className=""><a href="appointment-details.html" className=""><img src="./assets/img/appointment-icon.png"
                     className="img img-fluid" alt=""/> Appointment details</a></li>
                  <li className=""><a href="wallet.html" className=""><img src="./assets/img/wallet-icon.png" className="img img-fluid"
                     alt=""/> Wallet</a></li>
                  <li className=""><a href="javascript:;" className=""><img src="./assets/img/saved-cards-icon.png" className="img img-fluid"
                     alt=""/> Saved cards</a></li>
                     <li className=""><a href="fav-experts.html" className=""><img src="./assets/img/favorite-icon.png" className="img img-fluid"
                        alt=""/> Favorite experts</a></li>
                  <li className=""><a href="javascript:;" className=""><img src="./assets/img/logout-icon.png" className="img img-fluid"
                     alt=""/> Logout</a></li>
               </ul>
            </div>
         </div>
         <div className="admin-content-wrapper">
            <div className="row">
               <div className="col-lg-6">
                  <div className="user-personal-details">
                     <div className="update-pp-wrp">
                        <div className="upt-pp-img">
                           <img src="./assets/img/mathew-wade.png" className="img img-fluid" alt=""/>
                        </div>
                        <div className="update-pp-content">
                           <div>
                              <p>Update Profile Picture </p>
                           </div>
                           <div className="upt-edit-icon">
                              <a href="javascript:;"><img src="./assets/img/edit-white-icon.png" className="img img-fluid" alt=""/></a>
                           </div>
                        </div>
                     </div>
                     <div className="update-per-details-wrp">
                        <form action="">
                           <div className="row">
                              <div className="col-lg-6">
                                 <div className="">
                                    <label for="">First name</label>
                                    <input type="text" className="form-control" placeholder="" value="Marsh"/>
                                 </div>
                              </div>
                              <div className="col-lg-6">
                                 <div className="">
                                    <label for="">Last name</label>
                                    <input type="text" className="form-control" placeholder="" value="Josheph"/>
                                 </div>
                              </div>
                              <div className="col-lg-12">
                                 <div className="">
                                    <label for="">Email ID</label>
                                    <input type="email" className="form-control" placeholder="" value="MarshJoph12@gmail.com"/>
                                 </div>
                              </div>
                              <div className="col-lg-12">
                                 <div className="">
                                    <label for="">Date of Birth</label>
                                    <div className="input-date">
                                       <input type="date" className="form-control" placeholder="" value=""/>
                                       <img src="./assets/img/cal-icon.png" className="img img-fluid" alt=""/>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-lg-12">
                                 <div className="">
                                    <label for="">Registered email</label>
                                    <div className="add-new-input">
                                       <input type="text" className="form-control" placeholder="" value="abcd@gmail.com"/>
                                       <a href="javascript:;">Add new</a>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-lg-12">
                                 <div className="">
                                    <label for="">Registered Mobile number</label>
                                    <div className="add-new-input">
                                       <input type="text" className="form-control" placeholder="" value="9922349876"/>
                                       <a href="javascript:;">Add new</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <button className="btn btn-grey-common" type="submit">Save Changes</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      
      </>
  )
}

export default UserDashBoard
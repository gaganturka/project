import React from 'react'
import Header from './Header'

const AppointmentDetails = () => {
  return (
    <>
      <section className="admin-wrapper">
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
                  <li className=""><a href="user-dashboard.html" className=""><img src="./assets/img/profile-icon.png"
                     className="img img-fluid" alt="" /> My Profile</a></li>
                  <li className="active"><a href="appointment-details.html" className=""><img src="./assets/img/appointment-icon.png"
                     className="img img-fluid" alt="" /> Appointment details</a></li>
                  <li className=""><a href="wallet.html" className=""><img src="./assets/img/wallet-icon.png" className="img img-fluid"
                     alt="" /> Wallet</a></li>
                  <li className=""><a href="javascript:;" className=""><img src="./assets/img/saved-cards-icon.png" className="img img-fluid"
                     alt="" /> Saved cards</a></li>
                     <li className=""><a href="fav-experts.html" className=""><img src="./assets/img/favorite-icon.png" className="img img-fluid"
                        alt="" /> Favorite experts</a></li>
                  <li className=""><a href="index.html" className=""><img src="./assets/img/logout-icon.png" className="img img-fluid"
                     alt="" /> Logout</a></li>
               </ul>
            </div>
         </div>
         <div className="admin-content-wrapper">
            <div className="row">
               <div className="col-lg-12">
                  <div className="user-appoinment-details">
                     <div className="appointment-tabs">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                           <li className="nav-item" role="presentation">
                              <button className="nav-link active" id="pills-all-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all   "
                                 aria-selected="true">All</button>
                           </li>
                           <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-upcoming-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-upcoming" type="button" role="tab" aria-controls="pills-upcoming"
                                 aria-selected="false">Upcoming</button>
                           </li>
                           <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-reschedule-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-reschedule" type="button" role="tab"
                                 aria-controls="pills-reschedule" aria-selected="false">Reschedule</button>
                           </li>
                           <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-completed-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-completed" type="button" role="tab" aria-controls="pills-completed"
                                 aria-selected="false">Completed</button>
                           </li>
                           <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-cancelled-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-cancelled" type="button" role="tab" aria-controls="pills-cancelled"
                                 aria-selected="false">Cancelled</button>
                           </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                           <div className="tab-pane fade show active" id="pills-all" role="tabpanel"
                              aria-labelledby="pills-all-tab">
                              <div className="common-table-wrapper">
                                 <div className="table-responsive">
                                    <table className="table">
                                       <tbody>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal" className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal"  className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Reconnect</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn btn-outline-danger" type="button">Cancelled</button>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                           <div className="tab-pane fade" id="pills-upcoming" role="tabpanel"
                              aria-labelledby="pills-upcoming-tab">
                              <div className="common-table-wrapper">
                                 <div className="table-responsive">
                                    <table className="table">
                                       <tbody>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal" className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal"  className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Reconnect</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn btn-outline-danger" type="button">Cancelled</button>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                           <div className="tab-pane fade" id="pills-reschedule" role="tabpanel"
                              aria-labelledby="pills-contact-tab">
                              <div className="common-table-wrapper">
                                 <div className="table-responsive">
                                    <table className="table">
                                       <tbody>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal" className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal"  className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Reconnect</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn btn-outline-danger" type="button">Cancelled</button>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                           <div className="tab-pane fade" id="pills-completed" role="tabpanel"
                              aria-labelledby="pills-completed-tab">
                              <div className="common-table-wrapper">
                                 <div className="table-responsive">
                                    <table className="table">
                                       <tbody>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal" className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal"  className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Reconnect</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn btn-outline-danger" type="button">Cancelled</button>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                           <div className="tab-pane fade" id="pills-cancelled" role="tabpanel"
                              aria-labelledby="pills-cancelled-tab">
                              <div className="common-table-wrapper">
                                 <div className="table-responsive">
                                    <table className="table">
                                       <tbody>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal" className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Cancel</button>
                                                   <button data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal"  className="btn" type="button">Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button">Reconnect</button>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div> 
                                                   <div>
                                                      <h5>Meghan Smith</h5>
                                                      <p>Legal Expert</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>September 10th</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <h6>Video call</h6>
                                                <h6>03:30 PM</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn btn-outline-danger" type="button">Cancelled</button>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      {/* <!-- appointment details Modal --> */}
      <div className="modal fade authentication-modal" id="appointmentDetailsModal" tabindex="-1" aria-labelledby="appointmentDetailsModal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-12">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="appointment-deatils-box">
                                    <h1>Appointment details</h1>
                                    <div className="row">
                                       <div className="col-lg-12">
                                          <div className="appointment-details-modal-wrp">
                                             <div className="app-user-wrp">
                                                <div>
                                                   <img src="./assets/img/megan-smith.png" alt="" />
                                                </div>
                                                <div>
                                                   <h4>Meghan Smith</h4>
                                                   <h6>Legal Expert</h6>
                                                </div>
                                             </div>
                                             <div className="">
                                                <p>Date</p>
                                                <h3>September 10th</h3>
                                             </div>
                                             <div className="">
                                                <p>Time</p>
                                                <h3>03:30 PM</h3>
                                             </div>
                                             <div className="">
                                                <p>Mode</p>
                                                <h3>Video call</h3>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="row mb-4">
                                       <div className="col-lg-7">
                                          <div className="app-agenda-box">
                                             <a href="javascript:;">Edit</a>
                                             <h3>Appointment Agenda</h3>
                                             <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum pas</p>
                                          </div>
                                       </div>
                                       <div className="col-lg-5">
                                          <div className="app-agenda-box">
                                             <h3>Available Balance</h3>
                                             <h2>04 h 30 min</h2>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="modal-footer-btn-group">
                                       <button className="btn" data-bs-dismiss="modal" type="button">Cancel</button>
                                       <button className="btn" type="button">Reschedule</button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </>
  )
}

export default AppointmentDetails
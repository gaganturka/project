import React from 'react'
import Header from './Header'

const Wallet = () => {
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
                <li className=""><a href="user-dashboard.html" className=""><img src="./assets/img/profile-icon.png" className="img img-fluid" alt="" /> My Profile</a></li>
                <li className=""><a href="appointment-details.html" className=""><img src="./assets/img/appointment-icon.png" className="img img-fluid" alt="" /> Appointment details</a></li>
                <li className="active"><a href="wallet.html" className=""><img src="./assets/img/wallet-icon.png" className="img img-fluid" alt="" /> Wallet</a></li>
                <li className=""><a href="javascript:;" className=""><img src="./assets/img/saved-cards-icon.png" className="img img-fluid" alt="" /> Saved cards</a></li>
                <li className=""><a href="fav-experts.html" className=""><img src="./assets/img/favorite-icon.png" className="img img-fluid"
                   alt="" /> Favorite experts</a></li>
                <li className=""><a href="javascript:;" className=""><img src="./assets/img/logout-icon.png" className="img img-fluid" alt="" /> Logout</a></li>
             </ul>
          </div>
       </div>
       <div className="admin-content-wrapper">
          <div className="row">
             <div className="col-lg-12">
                <div className="wallet-recharge-wrp">
                   <div className="wallet-recharge-content">
                      <div> 
                         <img src="./assets/img/wallet-icon.png" alt="" />
                      </div>
                      <div>
                         <h3>04 h 30 mins</h3>
                         <h6>Available Wallet time</h6>
                      </div>
                   </div>
                   <div className="wallet-rec-button">
                      <button className="btn" type="button">Recharge</button>
                   </div>
                </div>
             </div>
          </div>
          <div className="row">
             <div className="col-lg-12">
                <div className="common-table-wrapper">
                   <div className="table-responsive">
                      <table className="table">
                         <thead>
                            <th>Name <img src="./assets/img/sort-icon.png" alt="" /></th>
                            <th>Date <img src="./assets/img/sort-icon.png" alt="" /></th>
                            <th>Amount <img src="./assets/img/sort-icon.png" alt="" /></th>
                            <th>Status <img src="./assets/img/sort-icon.png" alt="" /></th>
                            <th> &nbsp; </th>
                         </thead>
                         <tbody>
                            <tr>
                               <td>
                                  <h5>Meghan Smith</h5>
                               </td>
                               <td>
                                  <h6>12 Jan 2021</h6>
                               </td>
                               <td>
                                  <h6>SR 590</h6>
                               </td>
                               <td>
                                  <h6>Paid</h6>
                               </td>
                               <td>
                                  <div className="action-btn-group">
                                     <button className="btn" type="button"> <img src="./assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="./assets/img/export-icon.png" alt="" /> </button>
                                  </div>
                               </td>
                            </tr>
                            <tr>
                               <td>
                                  <h5>Meghan Smith</h5>
                               </td>
                               <td>
                                  <h6>12 Jan 2021</h6>
                               </td>
                               <td>
                                  <h6>SR 590</h6>
                               </td>
                               <td>
                                  <h6>Paid</h6>
                               </td>
                               <td>
                                  <div className="action-btn-group">
                                     <button className="btn" type="button"> <img src="./assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="./assets/img/export-icon.png" alt="" /> </button>
                                  </div>
                               </td>
                            </tr>
                            <tr>
                               <td>
                                  <h5>Meghan Smith</h5>
                               </td>
                               <td>
                                  <h6>12 Jan 2021</h6>
                               </td>
                               <td>
                                  <h6>SR 590</h6>
                               </td>
                               <td>
                                  <h6>Paid</h6>
                               </td>
                               <td>
                                  <div className="action-btn-group">
                                     <button className="btn" type="button"> <img src="./assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="./assets/img/export-icon.png" alt="" /> </button>
                                  </div>
                               </td>
                            </tr>
                            <tr>
                               <td>
                                  <h5>Meghan Smith</h5>
                               </td>
                               <td>
                                  <h6>12 Jan 2021</h6>
                               </td>
                               <td>
                                  <h6>SR 590</h6>
                               </td>
                               <td>
                                  <h6>Paid</h6>
                               </td>
                               <td>
                                  <div className="action-btn-group">
                                     <button className="btn" type="button"> <img src="./assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="./assets/img/export-icon.png" alt="" /> </button>
                                  </div>
                               </td>
                            </tr>
                            <tr>
                               <td>
                                  <h5>Meghan Smith</h5>
                               </td>
                               <td>
                                  <h6>12 Jan 2021</h6>
                               </td>
                               <td>
                                  <h6>SR 590</h6>
                               </td>
                               <td>
                                  <h6>Pending</h6>
                               </td>
                               <td>
                                  <div className="action-btn-group">
                                     <button className="btn" type="button"> <img src="./assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="./assets/img/export-icon.png" alt="" /> </button>
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
    </section>
   </> 
  )
}

export default Wallet
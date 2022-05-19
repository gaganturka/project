import {React,useEffect,useContext} from 'react'
import Sidebar from './Sidebaruser'
import { useNavigate } from 'react-router-dom';
import {AuthContext } from '../../context/AuthContext'
const Wallet = () => {
   const history=useNavigate();
   const {isLoggedIn,setIsLoggedIn,loggedInBorhanUserInfo,setLoggedInBorhanUserInfo}=useContext(AuthContext)
  
   useEffect(() => {
      if(isLoggedIn===true)
      {
      }
      else{
       history('/')
      }
   }, [])
  return (
    <>
    <section className="admin-wrapper">
     <Sidebar/>
       <div className="admin-content-wrapper">
          <div className="row">
             <div className="col-lg-12">
                <div className="wallet-recharge-wrp">
                   <div className="wallet-recharge-content">
                      <div> 
                         <img src="/assets/img/wallet-icon.png" alt="" />
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
                            <th>Name <img src="/assets/img/sort-icon.png" alt="" /></th>
                            <th>Date <img src="/assets/img/sort-icon.png" alt="" /></th>
                            <th>Amount <img src="/assets/img/sort-icon.png" alt="" /></th>
                            <th>Status <img src="/assets/img/sort-icon.png" alt="" /></th>
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
                                     <button className="btn" type="button"> <img src="/assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="/assets/img/export-icon.png" alt="" /> </button>
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
                                     <button className="btn" type="button"> <img src="/assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="/assets/img/export-icon.png" alt="" /> </button>
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
                                     <button className="btn" type="button"> <img src="/assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="/assets/img/export-icon.png" alt="" /> </button>
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
                                     <button className="btn" type="button"> <img src="/assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="/assets/img/export-icon.png" alt="" /> </button>
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
                                     <button className="btn" type="button"> <img src="/assets/img/blue-icon.png" alt="" /> </button>
                                     <button className="btn" type="button"> <img src="/assets/img/export-icon.png" alt="" /> </button>
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
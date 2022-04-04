import React, { useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Sidebar from './Sidebaruser'
const UserDashBoard = () => {
   const history=useNavigate();
   useEffect(() => {
      if(localStorage.getItem('token'))
      {}
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
                              <Link to="javascript:;"><img src="./assets/img/edit-white-icon.png" className="img img-fluid" alt=""/></Link>
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
                                       <Link to="javascript:;">Add new</Link>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-lg-12">
                                 <div className="">
                                    <label for="">Registered Mobile number</label>
                                    <div className="add-new-input">
                                       <input type="text" className="form-control" placeholder="" value="9922349876"/>
                                       <Link to="javascript:;">Add new</Link>
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
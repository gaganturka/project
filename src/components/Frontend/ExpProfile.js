import {React,useState} from 'react'
import {Modal,ModalBody} from 'reactstrap'
import Footer from './Footer';

const ExpProfile = () => {
   const [bookappointmentmodal,setbookappointmentmodal]=useState(false);
   const [scheduleappointmentmodal,setscheduleappointmentmodal]=useState(false);
  return (
    <>
      <section className="breadcrumb-section">
         <div className="container">
            <div className="row">
               <div className="col-lg-7">
                  <div className="breadcrumb-content">
                     <h1>Experts</h1>
                     <ul>
                        <li><a href="javascript:;">Home</a> <span><i className="fa fa-angle-right"></i></span></li>
                        <li><a href="javascript:;">Categories</a> <span><i className="fa fa-angle-right"></i></span></li>
                        <li><a href="javascript:;">Sub Category</a> <span><i className="fa fa-angle-right"></i></span></li>
                        <li className="active"><a href="javascript:;">Expert Listing</a></li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="breadcrumb-search">
                     <div className="position-relative">
                        <input type="text" className="form-control" placeholder="Search any....."/>
                        <button className="btn"><img src="./assets/img/search-icon.png" className="img img-fluid" alt=""/></button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="exp-profile-wrp">
         <div className="container">
            <div className="row">
               <div className="col-lg-10 m-auto">
                  <div className="exp-profile-box">
                     <div className="exp-profile-detail-row">
                        <ul>
                           <li>
                              <div className="exp-user-dt">
                                 <div>
                                    <img src="./assets/img/pratice-area-thumb.png" className="img img-fluid" alt=""/>
                                 </div>
                                 <div>
                                    <h4>Heather Nikolaus</h4>
                                    <p>( Business & Finance Expert )</p>
                                 </div>
                              </div>
                           </li>
                           <li>
                              <div>
                                 <h4>7+</h4>
                                 <p>Years of Experience</p>
                              </div>
                           </li>
                           <li>
                              <div>
                                 <h4>4.3</h4>
                                 <div className="star-rating-text">
                                    <div className="star-rating">
                                       <span className="fa fa-star checked"></span>
                                       <span className="fa fa-star checked"></span>
                                       <span className="fa fa-star checked"></span>
                                       <span className="fa fa-star checked"></span>
                                    </div>
                                    <p>Rating</p>
                                 </div>
                              </div>
                           </li>
                           <li>
                              <div>
                                 <h4>230 h</h4>
                                 <p>Session done</p>
                              </div>
                           </li>
                           <li>
                              <div className="exp-intro">
                                 <div>
                                    <img src="./assets/img/volume-icon.png" className="img img-fluid" alt=""/>
                                 </div>
                                 <div>
                                    <p>Expert Intro</p>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div className="exp-communicate-btn-row">
                        <div><button className="btn" type="button"><img src="./assets/img/video-call-icon.png" className="img img-fluid" alt=""/> Video Call</button></div>
                        <div><button className="btn" type="button"><img src="./assets/img/audio-call-icon.png" className="img img-fluid" alt=""/> Audio Call</button></div>
                        {/* <!-- <div><button className="btn" type="button"><img src="./img/chat-icon.png" className="img img-fluid" alt=""> Chat</button></div> --> */}
                     </div>
                     <div className="continue-booking-btn">
                        {/* <button data-bs-target="#bookAppointmentModal" data-bs-toggle="modal" className="btn" type="button"> Continue to Book Appointment </button> */}
                         <button className="btn" onClick={()=>{setbookappointmentmodal(true)}} type="button" >Continue to Book Appointment
                         <Modal
                         className="authentication-modal modal-dialog modal-dialog-centered modal-xl"
                                                              isOpen={
                                                                 bookappointmentmodal
                                                              }
                                                              toggle={
                                                                ()=>{setbookappointmentmodal(false)}
                                                              }
                                                            >
                                                            <ModalBody>
                                                               <div className="modal-content">
               <div className="modal-body">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setbookappointmentmodal(false)}></button>
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-12">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="book-appointment-box">
                                    <h1>Book an Appointment</h1>
                                    <div className="book-app-box">
                                       <div className="row">
                                          <div className="col-lg-4">
                                             <div className="form-group">
                                                <label for="">Select Appointment type</label>
                                                <select className="form-select" aria-label="example">
                                                   <option selected>Video Call</option>
                                                   <option value="1">Face to Face</option>
                                                   <option value="2">Audio Call</option>
                                                </select>
                                             </div>
                                          </div>
                                          <div className="col-lg-4">
                                             <div className="form-group">
                                                <label for="">Select call Duration time</label>
                                                <select className="form-select" aria-label="example">
                                                   <option selected>30 Mintues</option>
                                                   <option value="1">40 Mintues</option>
                                                   <option value="2">50 Mintues</option>
                                                   <option value="3">60 Mintues</option>
                                                </select>
                                             </div>
                                          </div>
                                          <div className="col-lg-4">
                                             <div className="form-group">
                                                <label for="">Available Wallet time</label>
                                                <h4><a href="javascript:;">06 Hours 30 Mins</a></h4>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="book-appointment-box">
                                    <h1>Add your details</h1>
                                    <div className="book-app-box">
                                       <div className="row">
                                          {/* <!-- <div className="col-lg-4">
                                             <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Name"/>
                                             </div>
                                          </div>
                                          <div className="col-lg-4">
                                             <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Email"/>
                                             </div>
                                          </div> --> */}
                                          <div className="col-lg-12">
                                             <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Question to Ask ?"/>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="continue-booking-btn p-0 mb-4">
                                    {/* <button data-bs-target="#scheduleAppointmentModal"  data-bs-dismiss="modal" data-bs-toggle="modal" className="btn" type="button"> Continue to Book Appointment </button> */}
                                    <button className="btn"  onClick={()=>{setscheduleappointmentmodal(true)}} >Continue to Book Appointment
                                    <Modal
                                                             className="authentication-modal modal-dialog modal-dialog-centered modal-xl"

                                                              isOpen={
                                                                 scheduleappointmentmodal
                                                              }
                                                              
                                                              toggle={
                                                               ()=>{setscheduleappointmentmodal(false);setbookappointmentmodal(false);}
                                                              }
                                                            >
                                                            <div className="modal-content">
               <div className="modal-body">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={     ()=>{setscheduleappointmentmodal(false)} }></button>
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-12">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="book-appointment-box">
                                    <h1>Schedule an Appointment</h1>
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <div className="book-app-box">
                                             <div className="schedule-calendar">
                                                <img src="./assets/img/calendar.png" className="img img-fluid" alt=""/>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-lg-6">
                                          <div className="book-app-box">
                                             <div className="select-time-slot">
                                                <img src="./assets/img/time-slot.png" className="img img-fluid" alt=""/>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="continue-booking-btn p-0 mb-4">
                                    <button className="btn" type="button"  onClick={()=>{setscheduleappointmentmodal(false);setbookappointmentmodal(false);}}> Proceed and Pay </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
                                                            </Modal>
                                   </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            </ModalBody>
                                                            </Modal>
                                                            </button>
                     </div>
                     <div className="exp-wallet-amount">
                        <p>Burhan Wallet Amount - <a href="javascript:;">06 h 30 min remaining</a></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="newsletter-wrp">
         <div className="container">
            <div className="row">
               <div className="col-lg-6">
                  <div className="newsletter-feild-box">
                     <form>
                        <div className="position-relative">
                           <input type="email" className="form-control" placeholder="Enter your email address....."/>
                           <button className="btn" type="submit">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="newsletter-content">
                     <div className="">
                        <h1>Newsletter</h1>
                        <p>Be the first to know about exciting new offers and special events and much more.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <Footer/>
     
    </>
  )
}

export default ExpProfile
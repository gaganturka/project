import React from 'react'
import Header from './Header'

const ExpProfile = () => {
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
                        <button data-bs-target="#bookAppointmentModal" data-bs-toggle="modal" className="btn" type="button"> Continue to Book Appointment </button>
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
      <footer className="footer-wrp">
         <div className="footer-print">
            <img src="./assets/img/footer-print.png" className="img img-fluid" alt=""/>
         </div>
         <div className="container">
            <div className="row">
               <div className="col-lg col-sm col-6">
                  <div className="footer-link-list">
                     <h3>Website</h3>
                     <ul>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg col-sm col-6">
                  <div className="footer-link-list">
                     <h3>Website</h3>
                     <ul>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg col-sm col-6">
                  <div className="footer-link-list">
                     <h3>Website</h3>
                     <ul>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg col-sm col-6">
                  <div className="footer-link-list">
                     <h3>Website</h3>
                     <ul>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg col-sm col-6">
                  <div className="footer-link-list">
                     <h3>Website</h3>
                     <ul>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                        <li><a href="javascript:;">Link</a></li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="footer-bottom">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="text-center">
                        <p>Terms of service and Privacy Policy <a href="javascript:;">@Borhan</a></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
      {/* <!-- Book an appointment Modal --> */}
      <div className="modal fade authentication-modal" id="bookAppointmentModal" tabindex="-1" aria-labelledby="bookAppointmentModal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    <button data-bs-target="#scheduleAppointmentModal"  data-bs-dismiss="modal" data-bs-toggle="modal" className="btn" type="button"> Continue to Book Appointment </button>
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
      {/* <!-- Schedule an appointment Modal --> */}
      <div className="modal fade authentication-modal" id="scheduleAppointmentModal" tabindex="-1" aria-labelledby="scheduleAppointmentModal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    <button className="btn" type="button"  data-bs-dismiss="modal"> Proceed and Pay </button>
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

      {/* <!-- Get Started Modal --> */}
      <div className="modal fade authentication-modal" id="getstartedmodal" tabindex="-1" aria-labelledby="getstartedmodal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-artwork">
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-modal-logo"> 
                                    <img src="./assets/img/main-logo.png" className="img img-fluid" alt=""/>
                                 </div>
                                 <h2>Get Started</h2>
                                 <div className="get-started-buttons">
                                    <div>
                                       <button data-bs-target="#sendOTPmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn" type="button">Borhan User</button>
                                    </div>
                                    <div>
                                       <button data-bs-target="#createExpAccmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn" type="button">Expert</button>
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
      {/* <!-- Send OTP Modal --> */}
      <div className="modal fade authentication-modal" id="sendOTPmodal" tabindex="-1" aria-labelledby="sendOTPmodal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-artwork">
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-modal-logo"> 
                                    <img src="./assets/img/main-logo.png" className="img img-fluid" alt=""/>
                                 </div>
                                 <h2>Please Sign in to Borhan</h2>
                                 <div className="auth-input-wrp">
                                    <label for="">Enter Mobile Number</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                    <button role="button" data-bs-target="#verifyOTPmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn auth-main-btn" type="button">Send OTP</button>
                                 </div>
                                 <p>Or Sign in with</p>
                                 <ul>
                                    <li className="pe-2"><button className="btn"> <img src="./assets/img/login-with-google.png" className="img img-fluid" alt=""/>Log in with Gmail</button></li>
                                    <li className="ps-2"><button className="btn"> <img src="./assets/img/login-with-facebook.png" className="img img-fluid" alt=""/>Log in with Facebook</button></li>
                                 </ul>
                                 <h5>Don’t have account ? <a role="button" data-bs-target="#createAccmodal" data-bs-toggle="modal" data-bs-dismiss="modal" href="javascript:;">Create now</a></h5>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      {/* <!-- Verify OTP Modal --> */}
      <div className="modal fade authentication-modal" id="verifyOTPmodal" tabindex="-1" aria-labelledby="verifyOTPmodal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-artwork">
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-modal-logo"> 
                                    <img src="./assets/img/main-logo.png" className="img img-fluid" alt=""/>
                                 </div>
                                 <h2>Please Sign in to Borhan</h2>
                                 <div className="auth-input-wrp">
                                    <label for="">Please enter the OTP sent to <span>9090909090</span></label>
                                    <input type="text" className="form-control" placeholder=""/>
                                    <a className="w-100" href="user-dashboard.html"> <button className="btn auth-main-btn" type="button">Verify</button></a>
                                 </div>
                                 <h5>Not Received your code ? <a href="javascript:;"> Resend code</a></h5>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      {/* <!-- Create Account Modal --> */}
      <div className="modal fade authentication-modal" id="createAccmodal" tabindex="-1" aria-labelledby="createAccmodal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-artwork">
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-profile-pic-wrp">
                                    <img src="./assets/img/profile-picture-icon.png" className="img img-fluid" alt=""/>
                                    <h6>Profile Picture</h6>
                                 </div>
                                 <div className="auth-input-wrp">
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <label for="">First Name</label>
                                          <input type="text" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-6">
                                          <label for="">Last Name</label>
                                          <input type="text" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Email ID</label>
                                          <input type="email" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Date of Birth</label>
                                          <input type="date" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Gender</label>
                                          <div className="gender-buttons">
                                             {/* <!-- add active class for active the tab --> */}
                                             <button className="btn me-2" type="button">Male</button> 
                                             <button className="btn ms-2" type="button">Female</button>
                                          </div>
                                       </div>
                                    </div>
                                    <button className="btn auth-main-btn" type="button">Create Account</button>
                                 </div>
                                 <h5>By signing up , you agree to <a href="javascript:;">terms and condition</a> and Borhan <a href="javascript:;">policy</a></h5>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      {/* <!-- Create Expert Account Modal --> */}
      <div className="modal fade authentication-modal" id="createExpAccmodal" tabindex="-1" aria-labelledby="createExpAccmodal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-artwork">
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-profile-pic-wrp">
                                    <img src="./assets/img/profile-picture-icon.png" className="img img-fluid" alt=""/>
                                    <h6>Profile Picture</h6>
                                 </div>
                                 <div className="auth-input-wrp">
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <label for="">First Name</label>
                                          <input type="text" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-6">
                                          <label for="">Last Name</label>
                                          <input type="text" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Email ID</label>
                                          <input type="email" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Date of Birth</label>
                                          <input type="date" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Gender</label>
                                          <div className="gender-buttons">
                                             {/* <!-- add active class for active the tab --> */}
                                             <button className="btn me-2" type="button">Male</button> 
                                             <button className="btn ms-2" type="button">Female</button>
                                          </div>
                                       </div>
                                    </div>
                                    <button data-bs-target="#createExp2Accmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn auth-main-btn" type="button">Continue</button>
                                 </div>
                                 <h5>By signing up , you agree to <a href="javascript:;">terms and condition</a> and Borhan <a href="javascript:;">policy</a></h5>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      {/* <!-- Create Expert Account Modal --> */}
      <div className="modal fade authentication-modal" id="createExp2Accmodal" tabindex="-1" aria-labelledby="createExp2Accmodal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-artwork">
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-input-wrp">
                                    <div className="row">
                                       <div className="col-lg-12">
                                          <label for="">Bio</label>
                                          <input type="text" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12 pt-2">
                                          <label for="">You can Record Audio and Video Bio ( Optional )</label> 
                                          <div className="record-buttons">
                                             <button className="btn" type="button"><img src="./assets/img/audio-record-icon.png" className="img img-fluid" alt=""/> Audio record</button>
                                             <button className="btn" type="button"><img src="./assets/img/video-record-icon.png" className="img img-fluid" alt=""/> Video record</button>
                                          </div>
                                       </div>
                                       <div className="col-lg-12 pt-2">
                                          <label for="">Upload Documents</label>
                                          <div className="upload-doc-field">
                                             <input type="file" className="form-input-file"/>
                                             <div className="artifical-doc-feild">
                                                <img src="./assets/img/upload-document-icon.png" className="img img-fluid" alt=""/>
                                             </div>
                                          </div>
                                          <a href="javascript:;">Documents List</a>
                                       </div>
                                    </div>
                                    <button className="btn auth-main-btn" type="button">Create Account</button>
                                 </div>
                                  <h5>By signing up , you agree to <a href="javascript:;">terms and condition</a> and Borhan <a href="javascript:;">policy</a></h5>
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

export default ExpProfile
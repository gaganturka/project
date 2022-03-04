import React from 'react'
import Header from './Header'

const ErrorPage = () => {
  return (
    <>
      <section className="page-error-wrp">
         <div className="error-img">
            <img src="./assets/img/404-img.png" className="img img-fluid" alt="" />
         </div>
         <div className="page-not-found-content">
            <div className="container">
               <h3>Page Not Found</h3>
               <p>You didn’t break the internet but we can’t find what are you looking for</p>
               <a href="javascript:;"><button className="btn" type="button">Return Home</button></a>
            </div>
         </div>
      </section>

      {/* <!-- Get Started Modal --> */}
      <div className="modal fade authentication-modal" id="getstartedmodal" tabindex="-1" aria-labelledby="getstartedmodal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-artwork">
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt="" />
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-modal-logo"> 
                                    <img src="./assets/img/main-logo.png" className="img img-fluid" alt="" />
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
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt="" />
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-modal-logo"> 
                                    <img src="./assets/img/main-logo.png" className="img img-fluid" alt="" />
                                 </div>
                                 <h2>Please Sign in to Borhan</h2>
                                 <div className="auth-input-wrp">
                                    <label for="">Enter Mobile Number</label>
                                    <input type="text" className="form-control" placeholder="" />
                                    <button role="button" data-bs-target="#verifyOTPmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn auth-main-btn" type="button">Send OTP</button>
                                 </div>
                                 <p>Or Sign in with</p>
                                 <ul>
                                    <li className="pe-2"><button className="btn"> <img src="./assets/img/login-with-google.png" className="img img-fluid" alt="" />Log in with Gmail</button></li>
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
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt="" />
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-profile-pic-wrp">
                                    <img src="./assets/img/profile-picture-icon.png" className="img img-fluid" alt="" />
                                    <h6>Profile Picture</h6>
                                 </div>
                                 <div className="auth-input-wrp">
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <label for="">First Name</label>
                                          <input type="text" className="form-control" placeholder="" />
                                       </div>
                                       <div className="col-lg-6">
                                          <label for="">Last Name</label>
                                          <input type="text" className="form-control" placeholder="" />
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Email ID</label>
                                          <input type="email" className="form-control" placeholder="" />
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Date of Birth</label>
                                          <input type="date" className="form-control" placeholder="" />
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
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt="" />
                           </div>
                        </div>
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-profile-pic-wrp">
                                    <img src="./assets/img/profile-picture-icon.png" className="img img-fluid" alt="" />
                                    <h6>Profile Picture</h6>
                                 </div>
                                 <div className="auth-input-wrp">
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <label for="">First Name</label>
                                          <input type="text" className="form-control" placeholder="" />
                                       </div>
                                       <div className="col-lg-6">
                                          <label for="">Last Name</label>
                                          <input type="text" className="form-control" placeholder="" />
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Email ID</label>
                                          <input type="email" className="form-control" placeholder="" />
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Date of Birth</label>
                                          <input type="date" className="form-control" placeholder="" />
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
                                          <input type="text" className="form-control" placeholder="" />
                                       </div>
                                       <div className="col-lg-12 pt-2">
                                          <label for="">You can Record Audio and Video Bio ( Optional )</label>
                                          <div className="record-buttons">
                                             <button className="btn" type="button"><img src="./assets/img/audio-record-icon.png" className="img img-fluid" alt="" /> Audio record</button>
                                             <button className="btn" type="button"><img src="./assets/img/video-record-icon.png" className="img img-fluid" alt="" /> Video record</button>
                                          </div>
                                       </div>
                                       <div className="col-lg-12 pt-2">
                                          <label for="">Upload Documents</label>
                                          <div className="upload-doc-field">
                                             <input type="file" className="form-input-file "/>
                                             <div className="artifical-doc-feild">
                                                <img src="./assets/img/upload-document-icon.png" className="img img-fluid" alt="" />
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

export default ErrorPage
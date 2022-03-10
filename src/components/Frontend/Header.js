import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-awesome-modal";
const Header = () => {
  let location = useLocation();
  const [getstartedmodal, setgetstartedmodal] = useState(false);
  const [getotpmodal, setgetotpmodal] = useState(false);
  const [verifyotpmodal, setverifyotpmodal] = useState(false);
  const [createaccountmodal, setcreateaccountmodal] = useState(false);
  const [createexpertaccount1, setcreateexpertaccount1] = useState(false);
  const [createexpertaccount2,setcreateexpertaccount2]=useState(false);
  const [credential, setcredential] = useState({
    firstname: "",
    lastname:"",
    email: "",
    password: "",
    confirmpassword: "",
    dateofbirth:"",

  });

  const onSubmitcreateuser=async(e)=>{
    
      e.preventDefault();
      const { firstname,lastname, email, password,confirmpassword,dateofbirth } = credential;
  
      const response = await fetch("http://localhost:5000/admin/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ firstname,lastname, email, password,confirmpassword,dateofbirth }),
      });
      const json = await response.json();
   
      // console.log(json);
      // if (json.success) {
      //   //save the auth token and redirect it
      //   localStorage.setItem("token", json.authtoken);
      //   history("/");
      //   props.showAlert("Account successfully created", "success");
      // } else {
      //   props.showAlert("Invalid details", "danger");
    //   // }
    // };
  
  }
  const onchange=(e)=>{
    setcredential({...credential,[e.target.name]:e.target.value})
  }
  const resetModal = () => {
     
    setgetstartedmodal(false);
    setgetotpmodal(false);
    setverifyotpmodal(false);
    setcreateaccountmodal(false);
    setcreateexpertaccount1(false);
    setcreateexpertaccount2(false);
  };

  const closeModal = () => {
    resetModal();
    setTimeout(() =>{resetModal();},1000)
  };
  return (
    <>
      <div className="navigation admin-nav nav-shadow">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                className="logo-img"
                src="./assets/img/main-logo.png"
                alt=""
              />
            </Link>
            <Link className="login-out-nav-btn" to="javascript:;">
              Log in / Sign Up
            </Link>
            <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className={`nav-item ${
                      location.pathname === "/" ? "active" : ""
                    }`}>
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/expertlisting" ? "active" : ""
                    }`}
                    to="/expertlisting"
                  >
                    Experts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/termsandconditions"
                        ? "active"
                        : ""
                    }`}
                    to="/termsandconditions"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/privacypolicy" ? "active" : ""
                    }`}
                    to="/privacypolicy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/errorpage" ? "active" : ""
                    }`}
                    to="/errorpage"
                  >
                    404
                  </Link>
                </li>
                <li className="nav-item">
                  <input
                    type="button"
                    value="Login/Signup"
                    className="nav-link login-nav-btn"
                    onClick={() => {
                      setgetstartedmodal(true);
                      
                    }}
                  />
                {getstartedmodal? <Modal
                    visible={getstartedmodal}
                    effect="fadeInUp"
                    onClickAway={closeModal}
                  >
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="auth-modal-wrp">
                          <div className="row">
                            <div className="col-lg-6 p-0">
                              <div className="auth-modal-artwork">
                                <img
                                  src="./assets/img/human-right-artwok.png"
                                  className="img img-fluid"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 p-0">
                              <div className="auth-modal-content">
                                <div className="w-100">
                                  <div className="auth-modal-logo">
                                    <img
                                      src="./assets/img/main-logo.png"
                                      className="img img-fluid"
                                      alt=""
                                    />
                                  </div>
                                  <h2>Get Started</h2>
                                  <div className="get-started-buttons">
                                    <div>
                                      <button
                                      
                                        className="btn"
                                        type="button"
                                        value="Borhan User"
                                        onClick={() => {
                                           
                                          setgetotpmodal(true);
                                        }}
                                      >Borhan User
                                       {getotpmodal? <Modal
                                          visible={getotpmodal}
                                          effect="fadeInUp"
                                          onClickAway={closeModal}
                                        >
                                          <div className="modal-content">
                                            <div className="modal-body">
                                              <div className="auth-modal-wrp">
                                                <div className="row">
                                                  <div className="col-lg-6 p-0">
                                                    <div className="auth-modal-artwork">
                                                      <img
                                                        src="./assets/img/human-right-artwok.png"
                                                        className="img img-fluid"
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6 p-0">
                                                    <div className="auth-modal-content">
                                                      <div className="w-100">
                                                        <div className="auth-modal-logo">
                                                          <img
                                                            src="./assets/img/main-logo.png"
                                                            className="img img-fluid"
                                                            alt=""
                                                          />
                                                        </div>
                                                        <h2>
                                                          Please Sign in to
                                                          Borhan
                                                        </h2>
                                                        <div className="auth-input-wrp">
                                                          <label for="">
                                                            Enter Mobile Number
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder=""
                                                          />
                                                          <input
                                                            role="button"
                                                            
                                                            className="btn auth-main-btn"
                                                            type="button"
                                                            onClick={() => {
                                                              setverifyotpmodal(
                                                                true
                                                              );
                                                            }}
                                                            value="Send OTP"
                                                         />
                                                           {verifyotpmodal? <Modal
                                                              visible={
                                                                verifyotpmodal
                                                              }
                                                              effect="fadeInUp"
                                                              onClickAway={
                                                                closeModal
                                                              }
                                                            >
                                                              <div className="modal-content">
                                                                <div className="modal-body">
                                                                  <div className="auth-modal-wrp">
                                                                    <div className="row">
                                                                      <div className="col-lg-6 p-0">
                                                                        <div className="auth-modal-artwork">
                                                                          <img
                                                                            src="./assets/img/human-right-artwok.png"
                                                                            className="img img-fluid"
                                                                            alt=""
                                                                          />
                                                                        </div>
                                                                      </div>
                                                                      <div className="col-lg-6 p-0">
                                                                        <div className="auth-modal-content">
                                                                          <div className="w-100">
                                                                            <div className="auth-modal-logo">
                                                                              <img
                                                                                src="./assets/img/main-logo.png"
                                                                                className="img img-fluid"
                                                                                alt=""
                                                                              />
                                                                            </div>
                                                                            <h2>
                                                                              Please
                                                                              Sign
                                                                              in
                                                                              to
                                                                              Borhan
                                                                            </h2>
                                                                            <div className="auth-input-wrp">
                                                                              <label for="">
                                                                                Please
                                                                                enter
                                                                                the
                                                                                OTP
                                                                                sent
                                                                                to{" "}
                                                                                <span>
                                                                                  9090909090
                                                                                </span>
                                                                              </label>
                                                                              <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder=""
                                                                              />
                                                                              <Link
                                                                                className="w-100"
                                                                                to="/userdashboard"
                                                                              >
                                                                                {" "}
                                                                                <button
                                                                                  className="btn auth-main-btn"
                                                                                  type="button"
                                                                                  onClick={closeModal}
                                                                                >
                                                                                  Verify
                                                                                </button>
                                                                              </Link>
                                                                            </div>
                                                                            <h5>
                                                                              Not
                                                                              Received
                                                                              your
                                                                              code
                                                                              ?{" "}
                                                                              <Link to="javascript:;">
                                                                                {" "}
                                                                                Resend
                                                                                code
                                                                              </Link>
                                                                            </h5>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </Modal>:""}

                                                        </div>
                                                        <p>Or Sign in with</p>
                                                        <ul>
                                                          <li className="pe-2">
                                                            <button className="btn">
                                                              {" "}
                                                              <img
                                                                src="./assets/img/login-with-google.png"
                                                                className="img img-fluid"
                                                                alt=""
                                                              />
                                                              Log in with Gmail
                                                            </button>
                                                          </li>
                                                          <li className="ps-2">
                                                            <button className="btn">
                                                              {" "}
                                                              <img
                                                                src="./assets/img/login-with-facebook.png"
                                                                className="img img-fluid"
                                                                alt=""
                                                              />
                                                              Log in with
                                                              Facebook
                                                            </button>
                                                          </li>
                                                        </ul>
                                                        <h5>
                                                          Don’t have account ?{" "}
                                                          <a
                                                            role="button"
                                                            
                                                            onClick={() => {
                                                              setcreateaccountmodal(
                                                                true
                                                              );
                                                            }}
                                                            value="Create now"
                                                          >
                                                           Create now
                                                          {createaccountmodal? <Modal
                                                              visible={
                                                                createaccountmodal
                                                              }
                                                              effect="fadeInUp"
                                                              onClickAway={
                                                                closeModal
                                                              }
                                                            >
                                                              <div className="modal-content">
                                                                <div className="modal-body">
                                                                  <div className="auth-modal-wrp">
                                                                    <div className="row">
                                                                      <div className="col-lg-6 p-0">
                                                                        <div className="auth-modal-artwork">
                                                                          <img
                                                                            src="./assets/img/human-right-artwok.png"
                                                                            className="img img-fluid"
                                                                            alt=""
                                                                          />
                                                                        </div>
                                                                      </div>
                                                                      <div className="col-lg-6 p-0">
                                                                        <div className="auth-modal-content">
                                                                          <div className="w-100">
                                                                            <div className="auth-profile-pic-wrp">
                                                                              <img
                                                                                src="./assets/img/profile-picture-icon.png"
                                                                                className="img img-fluid"
                                                                                alt=""
                                                                              />
                                                                              <h6>
                                                                                Profile
                                                                                Picture
                                                                              </h6>
                                                                            </div>
                                                                            <div className="auth-input-wrp">
                                                                              <div className="row">
                                                                                <div className="col-lg-6">
                                                                                  <label for="">
                                                                                    First
                                                                                    Name
                                                                                  </label>
                                                                                  <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    name="firstname"
                                                                                    onChange={onchange}
                                                                                  />
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                  <label for="">
                                                                                    Last
                                                                                    Name
                                                                                  </label>
                                                                                  <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    name="lastname"
                                                                                    onChange={onchange}
                                                                                  />
                                                                                </div>
                                                                                <div className="col-lg-12">
                                                                                  <label for="">
                                                                                    Email
                                                                                    ID
                                                                                  </label>
                                                                                  <input
                                                                                    type="email"
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    name="email"
                                                                                    onChange={onchange}
                                                                                  />
                                                                                </div>
                                                                                <div className="col-lg-12">
                                                                                  <label for="">
                                                                                    Password
                                                                                  </label>
                                                                                  <input
                                                                                    type="password"
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    name="password"
                                                                                    onChange={onchange}
                                                                                  />
                                                                                </div><div className="col-lg-12">
                                                                                  <label for="">
                                                                                    Confirm Password
                                                                                  </label>
                                                                                  <input
                                                                                    type="password"
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    name="confirmpassword"
                                                                                    onChange={onchange}
                                                                                  />
                                                                                </div>
                                                                                <div className="col-lg-12">
                                                                                  <label for="">
                                                                                    Date
                                                                                    of
                                                                                    Birth
                                                                                  </label>
                                                                                  <input
                                                                                    type="date"
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                    name="dateofbirth"
                                                                                    onChange={onchange}
                                                                                  />
                                                                                </div>
                                                                               
                                                                              </div>
                                                                              <button
                                                                                className="btn auth-main-btn"
                                                                                type="submit"
                                                                                onClick={()=>{onSubmitcreateuser();
                                                                                closeModal();
                                                                                }}
                                                                              >
                                                                                Create
                                                                                Account
                                                                              </button>
                                                                            </div>
                                                                            <h5>
                                                                              By
                                                                              signing
                                                                              up
                                                                              ,
                                                                              you
                                                                              agree
                                                                              to{" "}
                                                                              <Link to="javascript:;">
                                                                                terms
                                                                                and
                                                                                condition
                                                                              </Link>{" "}
                                                                              and
                                                                              Borhan{" "}
                                                                              <Link to="javascript:;">
                                                                                policy
                                                                              </Link>
                                                                            </h5>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </Modal>:""}
                                                            </a>
                                                        </h5>

                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Modal>:""}
                                        </button>
                                    </div>
                                    <div>
                                      <button
                                        
                                        className="btn"
                                        type="button"
                                        onClick={() => {
                                          setcreateexpertaccount1(true);
                                        }}
                                        value="Expert"
                                      >
                                        Expert
                                       {createexpertaccount1? <Modal
                                          visible={createexpertaccount1}
                                          effect="fadeInUp"
                                          onClickAway={closeModal}
                                        >
                                       
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
                                                                                  <label for="">
                                                                                    Password
                                                                                  </label>
                                                                                  <input
                                                                                    type="password"
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                  />
                                                                                </div>
                                                              <div className="col-lg-12">
                                                                                  <label for="">
                                                                                    Confirm Password
                                                                                  </label>
                                                                                  <input
                                                                                    type="password"
                                                                                    className="form-control"
                                                                                    placeholder=""
                                                                                  />
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
                                    {/* <button data-bs-target="#createExp2Accmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn auth-main-btn" type="button">Continue</button> */}
                                     <button type="button" value="Continue" className="btn auth-main-btn" onClick={()=>{setcreateexpertaccount2(true)}}>
                                     Continue{createexpertaccount2? <Modal
                                          visible={createexpertaccount2}
                                          effect="fadeInUp"
                                          onClickAway={closeModal}
                                        >
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
                                          <Link to="javascript:;">Documents List</Link>
                                       </div>
                                    </div>
                                    <button className="btn auth-main-btn" type="button" onClick={closeModal} >Create Account</button>
                                 </div>
                                 <h5>By signing up , you agree to <Link to="javascript:;">terms and condition</Link> and Borhan <Link to="javascript:;">policy</Link></h5>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
                                        </Modal>:""}
                                        </button>
                                 </div>
                                 <h5>By signing up , you agree to <Link to="javascript:;">terms and condition</Link> and Borhan <Link to="javascript:;">policy</Link></h5>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
                                        </Modal>:""}
                                        </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>:""}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;

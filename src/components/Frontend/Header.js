import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {Modal,ModalBody} from "reactstrap";
import superagent from "superagent";
const Header = () => {
  let location = useLocation();

  const [files,setFile]=useState("");
  const [credential, setcredential] = useState({
    firstname: "",
    lastname:"",
    email: "",
    mobileno:"",
    

  });
  const [openmodal,setopenmodal]=useState(false);
  const [modalstateno,setmodalstateno]=useState(1);
  const [accounttype,setaccounttype]=useState(0);
    const toggle=()=>{
      setopenmodal(false)
      setmodalstateno(1);
    }
    
  const onSubmitcreateuser=async(e)=>{
    console.log("this is method ")
    
      // e.preventDefault();
      const { firstname,lastname, email,mobileno} = credential;
      //  const profilepic=new FormData();
      // formdata.append("firstname",firstname);
      // formdata.append("lastname",lastname);
      // formdata.append("email",email);
      // formdata.append("mobileno",mobileno);
      //  console.log("tis is file",files);
      //   profilepic.append("file",files[0].name);

       superagent
       .post("http://localhost:5000/admin/createuser")
       .set("Authorization", "...")
       .accept("application/json")
       .field("firstname", firstname)
       .field("lastname", lastname)
       .field("mobileno",mobileno)
       .field("email",email)
      .attach("file", files[0])
       .then((result) => {
         //  console.log(“result”, result.statusCode);
         if (result.statusCode === 200) {
          
          //  window.location.reload();
           //   this.setState({  });
         }
       })
      // const response = await fetch("http://localhost:5000/admin/createuser", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // 'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: JSON.stringify({firstname,lastname,email,mobileno, profilepic }),
      // });
      // const json = await response.json();
   
      // console.log(json);
      // // if (json.success) {
      //   //save the auth token and redirect it
      //   localStorage.setItem("token", json.authtoken);
      //   history("/");
      //   props.showAlert("Account successfully created", "success");
      // } else {
        // props.showAlert("Invalid details", "danger");
      // }
    // };
  
  }
  const onchange=(e)=>{
    setcredential({...credential,[e.target.name]:e.target.value})
  }
 

  const closeModal = () => {
    // resetModal();
    // setTimeout(() =>{resetModal();},1000)
  };
  return (
    <>
      <div className="navigation ">
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
                      setopenmodal(true);
                      
                    }}
                  />
                <Modal isOpen={openmodal} toggle={()=>{toggle()}} className="authentication-modal modal-dialog modal-dialog-centered modal-xl" > 
                <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-artwork">
                              <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                           </div>
                        </div>
                        {
                          modalstateno == 1
                          ? <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-modal-logo"> 
                                    <img src="./assets/img/main-logo.png" className="img img-fluid" alt=""/>
                                 </div>
                                 <h2>Please Sign in to Borhan</h2>
                                 <div className="auth-input-wrp">
                                    <label for="">Enter Mobile Number</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                    <button role="button" data-bs-target="#verifyOTPmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn auth-main-btn" type="button" onClick={()=>{setmodalstateno(2)}}>Send OTP</button>
                                 </div>
                                 <p>Or Sign in with</p>
                                 <ul>
                                    <li className="pe-2"><button className="btn"> <img src="./assets/img/login-with-google.png" className="img img-fluid" alt=""/>Log in with Gmail</button></li>
                                    <li className="ps-2"><button className="btn"> <img src="./assets/img/login-with-facebook.png" className="img img-fluid" alt=""/>Log in with Facebook</button></li>
                                 </ul>
                                 <h5>Don’t have account ? <a role="button" data-bs-target="#createAccmodal" data-bs-toggle="modal" data-bs-dismiss="modal" href="javascript:;" onClick={()=>{setmodalstateno(3)}}>Create now</a></h5>
                              </div>
                           </div>
                        </div>
                        :  null
                        }
                        {
                          modalstateno == 2
                          ?
                          <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-modal-logo"> 
                                    <img src="./assets/img/main-logo.png" className="img img-fluid" alt=""/>
                                 </div>
                                 <h2>Please Sign in to Borhan</h2>
                                 <div className="auth-input-wrp">
                                    <label for="">Please enter the OTP sent to <span>9090909090</span></label>
                                    <input type="text" className="form-control" placeholder="" />
                                    <Link className="w-100" to="/userdashboard"> <button className="btn auth-main-btn" type="button" onClick={()=>{setopenmodal(false);setmodalstateno(1)}}>Verify</button></Link>
                                 </div>
                                 <h5>Not Received your code ? <a href="javascript:;"> Resend code</a></h5>
                              </div>
                           </div>
                        </div>
                          :null
                        }

                        {
                          modalstateno == 3 ?
                          <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-modal-logo"> 
                                    <img src="./assets/img/main-logo.png" className="img img-fluid" alt=""/>
                                 </div>
                                 <h2>Get Started</h2>
                                 <div className="get-started-buttons">
                                    <div>
                                       <button  className="btn" type="button" onClick={()=>{setmodalstateno(4)}}>Borhan User</button>
                                    </div>
                                    <div>
                                       <button className="btn" type="button" onClick={()=>{setmodalstateno(5)}}>Expert/Freelancer</button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                          :null
                        }
                        {
                          modalstateno==4 ?
                          <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-profile-pic-wrp">
                                    <img src="./assets/img/profile-picture-icon.png" className="img img-fluid" alt=""/>
                                    <input name="files" type="file"
                                     onChange={(e)=>setFile(e.target.files)} 

                                     />
                                    <h6>Profile Picture</h6>
                                 </div>
                                 <div className="auth-input-wrp">
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <label for="">First Name</label>
                                          <input type="text" onChange={onchange} className="form-control" name="firstname" placeholder=""/>
                                       </div>
                                       <div className="col-lg-6">
                                          <label for="">Last Name</label>
                                          <input type="text" onChange={onchange} className="form-control" name="lastname" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Email ID</label>
                                          <input type="email" className="form-control" onChange={onchange} name="email" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Mobile No.</label>
                                          <input type="string" className="form-control" name="mobileno" onChange={onchange} placeholder=""/>
                                       </div>
                                       
                                    </div>
                                    <button type="submit" className="btn auth-main-btn"   onClick={()=>{setmodalstateno(2);onSubmitcreateuser()}}>Create Account</button>
                                 </div>
                                 <h5>By signing up , you agree to <a href="javascript:;">terms and condition</a> and Borhan <a href="javascript:;">policy</a></h5>
                              </div>
                           </div>
                        </div>
                          :null
                        }

                        {
                          modalstateno==5?
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
                                          <label for="">Mobile No.</label>
                                          <input type="string" className="form-control" placeholder=""/>
                                       </div>
                                       <div className="col-lg-12">
                                          <label for="">Account Type</label>
                                          <div className="gender-buttons">
                                             {/* <!-- add active class for active the tab --> */}
                                             <button className={`btn me-2 ${accounttype===1?"active":""}`} type="button" onClick={()=>{setaccounttype(1)}}>Expert</button> 
                                             <button className={`btn ms-2 ${accounttype===2?"active":""} `} type="button" onClick={()=>{setaccounttype(2)}}>Freelancer</button>
                                          </div>
                                       </div>
                                    </div>
                                    <button className="btn auth-main-btn" type="button" onClick={()=>{setmodalstateno(6)}}>Continue</button>
                                 </div>
                                 <h5>By signing up , you agree to <a href="javascript:;">terms and condition</a> and Borhan <a href="javascript:;">policy</a></h5>
                              </div>
                           </div>
                        </div>
                          :null
                        }

                        {
                          modalstateno==6?
                       
                        <div className="col-lg-6 p-0">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="auth-input-wrp">
                                    <div className="row">
                                    <div class="col-lg-6">
                                      <label>Category</label>
                                      <select class="form-control">
                                        <option selected value="0">Select</option>
                                        <option selected value="1">Category 1</option>
                                        <option selected value="2">Category 2</option>
                                        <option selected value="3">Category 3</option>
                                      </select>
                                    </div>
                                    <div class="col-lg-6">
                                      <label>Pratice Area</label>
                                      <select class="form-control">
                                        <option selected value="0">Select</option>
                                        <option selected value="1">Category 1</option>
                                        <option selected value="2">Category 2</option>
                                        <option selected value="3">Category 3</option>
                                      </select>
                                    </div>
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
                                    <button className="btn auth-main-btn" type="button" onClick={()=>{setmodalstateno(2)}}>Create Account</button>
                                 </div>
                                  <h5>By signing up , you agree to <a href="javascript:;">terms and condition</a> and Borhan <a href="javascript:;">policy</a></h5>
                              </div>
                           </div>
                        </div>
                     
                          :null
                        }
                     </div>
                  </div>
                </Modal>
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

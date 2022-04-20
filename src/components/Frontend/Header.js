import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import loginAction from "../../actions/login.action";
import categoriesAction from "../../actions/categories.action";
import config from '../../config/configg';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Agent from "../../actions/superAgent";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FacebookLogin from 'react-facebook-login';
const Header = () => {
  let location = useLocation();
  // let CLIENT_ID=""
  const CLIENT_ID ="192073990165-k8uk1edbbhb0lm03lqb7ikvf3ibqotr5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

  const history = useNavigate();
  const [videoName,setVideoName]=useState("");
  const [audioName,setAudioName]=useState("");
  const [accountType, setaccountType] = useState("expert");
  const [files, setFile] = useState("");
  const [getPracticeArea, setGetPracticeArea] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedPracticeArea, setSelectedPracticeArea] = useState(0);
  const [flagUser,setflagUser]=useState(false)
  const [fflagUser,setfflagUser]=useState(false)


  const [logincredential, setlogincredential] = useState({
    mobileNo: "",
    otp: "",
  });
  const [getDocument, setGetDocument] = useState([
    { fileName: "", fileType: "", link: "", mimeType: "" },
  ]);
  const [getProfilePic, setGetProfilePic] = useState("");
  const [getAudioFilePath, setGetAudioFilePath] = useState("");
  const [getVideoFilePath, setGetVideoFilePath] = useState("");
  const [usercredential, setusercredential] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    profilePic: "",
    otp: "",
  });
  const [expertcredential, setexpertcredential] = useState({
    category: "",
    practiceArea: "",
    bio: "",
    audioFilePath: "",
    videoFilePath: "",
    document: [
      {
        fileName: "",
        fileType: "",
        link: "",
        mimeType: "",
      },
    ],
    firstName: "",
    email: "",
    mobileNo: "",
    lastName: "",
    profilePic: "",
    otp: "",
  });
  const [openmodal, setopenmodal] = useState(false);
  const [borhanApp, setBorhanApp] = useState(false);
  const [modalstateno, setmodalstateno] = useState(1);
  const [profileViewerState,setProfileViewerState]=useState(0);
  const [profileViewerModal,setProfileViewerModal]=useState(false);
  const toggle = () => {
    setopenmodal(false);
    setmodalstateno(1);
  };
  const loginG = () => {
    // let timer: NodeJS.Timeout | null = null;
    const googleLoginURL = "http://localhost:5000/auth/google";
    const newWindow = window.open(
      googleLoginURL,
      "_self",
      
    );

 };
 const  responseFacebook= (response)=> {
  console.log(response);
}
 const responseGoogleSuccess =async (response) => {
  console.log(response);
  let userInfo = {
    name: response.profileObj.name,
    emailId: response.profileObj.email,
  };
  let data=response.profileObj;
  console.log(data,"ksdhcbsdbc")
  loginAction.googleLoginSignup(data,(err,res)=>{
    if(err){
      alert("err")
    }else{
      alert("login success")
      window.location.reload();
      localStorage.setItem("token", res.data.token);  
      }
  })


};

// Error Handler
const responseGoogleError = (response) => {
  console.log(response);
};

// Logout Session and Update State
const logout = (response) => {
  console.log(response);
  let userInfo = {
    name: "",
    emailId: "",
  };
  // this.setState({ userInfo, isLoggedIn: false });
};
 useEffect(() => {
  if (localStorage.getItem("token")||Agent.getLoginType()) {
    console.log(Agent.getLoginType())
    setflagUser(true);
  } 
 const getUser = () => {
  fetch("http://localhost:5000/auth/login/success", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("authentication has been failed!");
    })
    .then((resObject) => {
      console.log(resObject.user)
    })
    .catch((err) => {
      console.log(err);
    });
};
getUser();
}, []);
  const fetchAllCategories = async () => {

    categoriesAction.fetchAllCategories((err,res)=>{
      if(err){
        console.log(err,"helllooo")
      }else{
        setGetCategories(res.data);
        console.log(res.data," daata ");
      }
    });
    
  };
  const fetchAllPracticeArea = async () => {
    categoriesAction.fetchAllPracticeArea((err,res)=>{
      if(err){

      }else{
        console.log(res.data," daata ");
        setGetPracticeArea(res.data);
      }
    });
   
  };
  useEffect(() => {
    fetchAllCategories();
    fetchAllPracticeArea();
  }, []);

  const onSubmitCreateBorhanUser = async (e) => {
    // e.preventDefault();
    const { firstName, lastName, email, mobileNo, profilePic, otp } =
      usercredential;
      if(!firstName&&!lastName&&!email&&!mobileNo&&!otp){
        alert("fill ")
        return
      }
    const response = await fetch(`${config.BACKEND_URL}/admin/createborhanuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        mobileNo,
        profilePic: getProfilePic,
        otp,
      }),
    });
    const json = await response.json();
    if (json.statusCode === 200) {
      localStorage.setItem("token", json.data);
      setopenmodal(false);
      setmodalstateno(1);

      history("/userdashboard");
    }
  };
  const onSubmitCreateExpert = async () => {
    const {
      category,
      practiceArea,
      bio,
      audioFilePath,
      videoFilePath,
      document,
      firstName,
      email,
      mobileNo,
      lastName,
      profilePic,
      otp,
    } = expertcredential;
    
    
    if(!firstName&&!lastName&&!email&&!mobileNo&&!otp&&!profilePic){
      alert("fill ")
      return
    }
    let dataToSend={
      firstName,
      lastName,
      email,
      mobileNo,
      profilePic: getProfilePic,
      document: getDocument,
      category: selectedCategory,
      practiceArea: selectedPracticeArea,
      bio,
      audioFilePath: getAudioFilePath,
      videoFilePath: getVideoFilePath,
      accountType: accountType,
      otp,
    };

    let response ;
    await loginAction.CreateExpert(dataToSend,(err,res)=>{
      if(err){
        console.log(err,"here is error");
      }else{
        response=res;
        console.log(response,'here is res ')
        if (response.statusCode === 200) {
          // localStorage.setItem("token", response.data);
          // history("/userdashboard");
          setopenmodal(false);
          setmodalstateno(1);
    
        }
      }
    })
   
  };
  const onSubmitLogin = async () => {
    let dataToSend={
      mobileNo: logincredential.mobileNo,
      otp: logincredential.otp,
    };
    if(!logincredential.mobileNo&&!logincredential.otp){
      alert("fill ")
      return
    }
    
    let json; 
    loginAction.onLogin(dataToSend,(err,res)=>{
      if(err){
      console.log(err);
      }else{
        json=res;
        
    if (json.statusCode === 200) {
      setopenmodal(false);
      setmodalstateno(1);
      localStorage.setItem("token", json.data);
      history("/userdashboard");
      

    }
      }
    })

  };

  const uploadFilesUsingMulter = async (e, i) => {
    console.log("iiiihiihiohiin", "aloha0", e.target.files[0]);
    var formData = new FormData();
    formData.append("files", e.target.files[0]);
    const axiosRes = await axios({
      method: "post",
      url: `${config.BACKEND_URL}/admin/uploadfile`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    console.log(i, "idkkkkk", axiosRes);
    if (i === 1) {
      setGetProfilePic(axiosRes.data.data[0].path);
    } else if (i === 2) {
      setGetAudioFilePath(axiosRes.data.data[0].path);
      setAudioName(e.target.files[0].name)
    } else if (i === 3) {
      setGetVideoFilePath(axiosRes.data.data[0].path);
      setVideoName(e.target.files[0].name)
    } else if (i === 4) {
      setGetDocument([
        {
          fileName: axiosRes.data.data[0].filename,
          fileType: axiosRes.data.data[0].filename,
          link: axiosRes.data.data[0].path,
          mimeType: axiosRes.data.data[0].mimetype,
        },
      ]);
    }
  };

  const onChangeUser = (e) => {
    setusercredential({ ...usercredential, [e.target.name]: e.target.value });
  };
  const onChangeExpert = (e) => {
    setexpertcredential({
      ...expertcredential,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeLogin = (e) => {
    setlogincredential({ ...logincredential, [e.target.name]: e.target.value });
  };
  const closeModal = () => {
    // resetModal();
    // setTimeout(() =>{resetModal();},1000)
  };
  const generateOtpExpert = async () => {
    if(!expertcredential.mobileNo){
      alert("fill");
    }
    const response = await fetch(`${config.BACKEND_URL}/admin/generateotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
      },
      body: JSON.stringify({
        mobileNo: expertcredential.mobileNo,
      }),
    });
    const json = await response.json();
  };
  const generateOtpUser = async () => {
    const response = await fetch(`${config.BACKEND_URL}/admin/generateotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobileNo: usercredential.mobileNo,
      }),
    });
    const json = await response.json();
  };
  const otpFinder = async () => {
    const response = await fetch(
      `${config.BACKEND_URL}/admin/otpsendertofrontend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify({
          mobileNo: logincredential.mobileNo,
        }),
      }
    );
    const json = await response.json();
  };
  const profileViewer=()=>{
    if(flagUser)
    {
      history("/userdashboard");
      setProfileViewerModal(false);
    }
    else{
      
    setProfileViewerModal(true);
    }
    
  }
  const bookAnAppoitmentHeaderViewer=()=>{
    if(localStorage.getItem('token')!==null)
    {
      history("/expertlisting");
      setopenmodal(false);
    }
    else{
      
    setopenmodal(true);
    }
    
  }

//  const  validationFunction=()=>{
//    if(expertcredential.firstName  "^[a-zA-Z0-9_]*$")
//  }
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
                <li
                  className={`nav-item ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
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
                      location.pathname === "/membership" ? "active" : ""
                    }`}
                    to="/membership"
                  >
                    Membership
                   
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                   onClick={()=>{setBorhanApp(true)}}
                    className={`nav-link `}
                    
                    // to="/privacypolicy"
                  >
                    <img
                      src="./assets/img/Icon awesome-mobile-alt.png"
                      class="brohan-app-icon"
                    />{" "}
                    Borhan App
                    
                  </a>
                </li>
             {!flagUser? <li className="nav-item">
                  <a
                    className={`nav-link ${
                      location.pathname === "/userdashboard" ? "active" : ""
                    }`}
                    // to="/userdashboard"
                    onClick={profileViewer}
                  >
                   Login
                    
             
                    
                  </a></li>: <li className="nav-item">
                  <a
                    className={`nav-link ${
                      location.pathname === "/userdashboard" ? "active" : ""
                    }`}
                    // to="/userdashboard"
                    onClick={profileViewer}
                  >
                    Profile
 
                  </a>
                </li>}
                <li className="nav-item">
                  <input
                    type="button"
                    value="Book an appointment"
                    className="nav-link login-nav-btn"
                    onClick={() => {
                      bookAnAppoitmentHeaderViewer();
                    }}
                  />
                  
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Modal
      isOpen={profileViewerModal}
      toggle={() => {
       setProfileViewerModal(false);
       setmodalstateno(1);
      }}
      className="authentication-modal modal-dialog modal-dialog-centered modal-xl"
    >
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
          {modalstateno == 1 ? (
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
                  <h2>Please Sign in to Borhan</h2>
                  <div className="auth-input-wrp">
                    <label for="">Enter Mobile Number</label>
                    <input
                      type="text"
                      name="mobileNo"
                      onChange={onChangeLogin}
                      className="form-control"
                      placeholder=""
                      maxlength="10"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                    />
                    <button
                      role="button"
                      data-bs-target="#verifyOTPmodal"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                      className="btn auth-main-btn"
                      type="button"
                      onClick={() => {
                        setmodalstateno(2);
                        otpFinder();
                      }}
                    >
                      Send OTP
                    </button>
                  </div>
                  <p>Or Sign in with</p>
                  <ul>
                    <li className="pe-2">
                    <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign In with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              // isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
                    </li>
                    <li className="ps-2">
                    {fflagUser==true?
                    <FacebookLogin
                     appId="585451125985997"
                     autoLoad={true}
                     fields="name,email,picture"
                     cssClass="btn"
                     scope="public_profile,user_friends,user_actions.books"
                     callback={responseFacebook}
                    
                    />:<button className="btn" onClick={e=>{
                      e.preventDefault();
                      setfflagUser(true)
                    }}>
                    {" "}
                    <img
                      src="./assets/img/login-with-facebook.png"
                      className="img img-fluid"
                      alt=""
                    />
                    Log in with Facebook
                  </button>}
                    </li>
                  </ul>
                  <h5>
                    Don’t have account ?{" "}
                    <a
                      role="button"
                      data-bs-target="#createAccmodal"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                      href="javascript:;"
                      onClick={() => {
                        setmodalstateno(3);
                      }}
                    >
                      Create now
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          ) : null}
          {modalstateno == 2 ? (
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
                  <h2>Please Sign in to Borhan</h2>
                  <div className="auth-input-wrp">
                    <label for="">
                      Please enter the OTP sent to{" "}
                      <span>9090909090</span>
                    </label>
                    <input
                      type="text"
                      name="otp"
                      onChange={onChangeLogin}
                      className="form-control"
                      placeholder=""
                    />
                    <button
                      className="btn auth-main-btn"
                      type="submit"
                      onClick={() => {
                        setProfileViewerModal(false);
                        setmodalstateno(1);
                        onSubmitLogin();
                      }}
                    >
                      Verify
                    </button>
                  </div>
                  <h5>
                    Not Received your code ?{" "}
                    <a href="javascript:;"> Resend code</a>
                  </h5>
                </div>
              </div>
            </div>
          ) : null}

          {modalstateno == 3 ? (
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
                        onClick={() => {
                          setmodalstateno(4);
                        }}
                      >
                        Borhan User
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => {
                          setmodalstateno(5);
                        }}
                      >
                        Expert/Freelancer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {modalstateno == 4 ? (
            <div className="col-lg-6 p-0">
              <div className="auth-modal-content">
                <div className="w-100">
                  <div className="auth-profile-pic-wrp">
                  <div className="profile-pic-chooose">
                                
                                  <img
                                    src={`${getProfilePic==""? "./assets/img/profile-picture-icon.png": getProfilePic}`}
                                    className="img img-fluid"
                                    alt=""
                                  />
                                  <h6>Profile Picture</h6>
                                  <input
                                    name="profilePic"
                                    className="hide-input"
                                    type="file"
                                    onChange={(e) => {
                                      uploadFilesUsingMulter(e, 1);
                                    }}
                                  />
                                  </div>
                  </div>
                  <div className="auth-input-wrp">
                    <div className="row">
                      <div className="col-lg-6">
                        <label for="">First Name</label>
                        <input
                          type="text"
                          onChange={onChangeUser}
                          className="form-control"
                          name="firstName"
                          placeholder=""
                        />
                      </div>
                      <div className="col-lg-6">
                        <label for="">Last Name</label>
                        <input
                          type="text"
                          onChange={onChangeUser}
                          className="form-control"
                          name="lastName"
                          placeholder=""
                        />
                      </div>
                      <div className="col-lg-12">
                        <label for="">Email ID</label>
                        <input
                          type="email"
                          className="form-control"
                          onChange={onChangeUser}
                          name="email"
                          placeholder=""
                        />
                      </div>
                      <div className="col-lg-12">
                        <label for="">Mobile No.</label>
                        <input
                          type="string"
                          className="form-control"
                          name="mobileNo"
                          onChange={()=>{onChangeUser();}}
                          placeholder=""
                          maxlength="10"
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn auth-main-btn"
                      onClick={() => {
                        
                        setmodalstateno(7);
                        generateOtpUser();
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                  <h5>
                    By signing up , you agree to{" "}
                    <a href="javascript:;">terms and condition</a>{" "}
                    and Borhan <a href="javascript:;">policy</a>
                  </h5>
                </div>
              </div>
            </div>
          ) : null}

          {modalstateno == 5 ? (
            <div className="col-lg-6 p-0">
              <div className="auth-modal-content">
                <div className="w-100">
                  <div className="auth-profile-pic-wrp">
                  <div className="profile-pic-chooose">
                                
                                <img
                                  src={`${getProfilePic==""? "./assets/img/profile-picture-icon.png": getProfilePic}`}
                                  className="img img-fluid"
                                  alt=""
                                />
                                <h6>Profile Picture</h6>
                                <input
                                  name="profilePic"
                                  className="hide-input"
                                  type="file"
                                  onChange={(e) => {
                                    uploadFilesUsingMulter(e, 1);
                                  }}
                                />
                                </div>
                  </div>
                  <div className="auth-input-wrp">
                    <div className="row">
                      <div className="col-lg-6">
                        <label for="">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          onChange={onChangeExpert}
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-lg-6">
                        <label for="">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          onChange={onChangeExpert}
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-lg-12">
                        <label for="">Email ID</label>
                        <input
                          type="email"
                          name="email"
                          onChange={onChangeExpert}
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-lg-12">
                        <label for="">Mobile No.</label>
                        <input
                          type="string"
                          name="mobileNo"
                          onChange={onChangeExpert}
                          className="form-control"
                          placeholder=""
                          maxlength="10"
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <div className="col-lg-12">
                        <label for="">Account Type</label>
                        <div className="gender-buttons">
                          {/* <!-- add active class for active the tab --> */}
                          <button
                            className={`btn me-2 ${
                              accountType === "expert"
                                ? "active"
                                : ""
                            }`}
                            type="button"
                            onClick={() => {
                              setaccountType("expert");
                            }}
                          >
                            Expert
                          </button>
                          <button
                            className={`btn ms-2 ${
                              accountType === "freelancer"
                                ? "active"
                                : ""
                            } `}
                            type="button"
                            onClick={() => {
                              setaccountType("freelancer");
                            }}
                          >
                            Freelancer
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn auth-main-btn"
                      type="button"
                      onClick={() => {
                        setmodalstateno(6);
                      }}
                    >
                      Continue
                    </button>
                  </div>
                  <h5>
                    By signing up , you agree to{" "}
                    <a href="javascript:;">terms and condition</a>{" "}
                    and Borhan <a href="javascript:;">policy</a>
                  </h5>
                </div>
              </div>
            </div>
          ) : null}

          {modalstateno == 6 ? (
            <div className="col-lg-6 p-0">
              <div className="auth-modal-content">
                <div className="w-100">
                  <div className="auth-input-wrp">
                    <div className="row">
                      <div class="col-lg-6">
                        <label>Category</label>
                        <select
                          class="form-control"
                          onChange={(e) => {
                            setSelectedCategory(e.target.value);
                          }}
                        >
                          <option selected value="0">
                            Select
                          </option>
                          {/* <option selected value="1">Category 1</option>
                          <option selected value="2">Category 2</option>
                          <option selected value="3">Category 3</option> */}
                          {getCategories &&
                            getCategories.map((obj, index) => {
                              return (
                                <option value={`${obj._id}`}>
                                  {obj.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div class="col-lg-6">
                        <label>Pratice Area</label>
                        <select
                          class="form-control"
                          onChange={(e) => {
                            setSelectedPracticeArea(
                              e.target.value
                            );
                          }}
                        >
                          {/* <option selected value="0">Select</option>
                          <option selected value="1">Category 1</option>
                          <option selected value="2">Category 2</option>
                          <option selected value="3">Category 3</option> */}
                          <option selected value="0">
                            Select
                          </option>
                          {getPracticeArea &&
                            getPracticeArea.map((obj, index) => {
                              return (
                                <option value={`${obj._id}`}>
                                  {obj.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="col-lg-12">
                        <label for="">Bio</label>
                        <input
                          type="text"
                          name="bio"
                          onChange={onChangeExpert}
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-lg-12 pt-2">
                                      <label for="">
                                        You can Record Audio and Video Bio (
                                        Optional )
                                      </label>
                                      <div className="record-buttons">
                                        <div className="btn-audio">
                                         <button className="btn" type="button">
                                          <img
                                            src="./assets/img/audio-record-icon.png"
                                            className="img img-fluid"
                                            alt=""
                                          />
                                      
                                          Audio record
                                        </button>
                                        <input
                                            type="file"
                                            name="audio"
                                            onChange={(e) =>
                                              uploadFilesUsingMulter(e, 2)
                                            }
                                            className="form-input-file audio-file"
                                          />   {" "}
                                          
                                       <div className=" display-value">
                                       {audioName}
                                       </div>
                                       </div>
                                       <div className="btn-video">
                                       <button className="btn" type="button">
                                          <img
                                            src="./assets/img/video-record-icon.png"
                                            className="img img-fluid"
                                            alt=""
                                          />
                                        Video record
                                        </button>
                                        {console.log(videoName,"videeeeeeeeoooooo   ",audioName )}
                                        <input
                                            type="file"
                                            name="video"
                                            onChange={(e) =>
                                              uploadFilesUsingMulter(e, 3)
                                            }
                                            className="form-input-file video-file"
                                          />{" "}
                                         
                                         <div className=" display-value">
                                       {videoName}
                                       </div></div> 
                                      </div>
                                      
                                    </div>
                      <div className="col-lg-12 pt-2">
                        <label for="">Upload Documents</label>
                        <div className="upload-doc-field">
                          <input
                            type="file"
                            name="document"
                            onChange={(e) =>
                              uploadFilesUsingMulter(e, 4)
                            }
                            className="form-input-file"
                          />
                          <div className="artifical-doc-feild">
                            <img
                              src="./assets/img/upload-document-icon.png"
                              className="img img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                        <a href="javascript:;">Documents List</a>
                      </div>
                    </div>
                    <button
                      className="btn auth-main-btn"
                      type="submit"
                      onClick={() => {
                        setmodalstateno(8);
                        generateOtpExpert();
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                  <h5>
                    By signing up , you agree to{" "}
                    <a href="javascript:;">terms and condition</a>{" "}
                    and Borhan <a href="javascript:;">policy</a>
                  </h5>
                </div>
              </div>
            </div>
          ) : null}
          {modalstateno == 7 ? (
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
                  <h2>Please Sign up to Borhan</h2>
                  <div className="auth-input-wrp">
                    <label for="">
                      Please enter the OTP sent to{" "}
                      <span>9090909090</span>
                    </label>
                    <input
                      type="text"
                      name="otp"
                      onChange={onChangeUser}
                      className="form-control"
                      placeholder=""
                    />

                    <button
                      className="btn auth-main-btn"
                      type="submit"
                      onClick={() => {
                        setProfileViewerModal(false);
                        setmodalstateno(1);
                        onSubmitCreateBorhanUser();
                      }}
                    >
                      Verify
                    </button>
                  </div>
                  <h5>
                    Not Received your code ?{" "}
                    <a href="javascript:;"> Resend code</a>
                  </h5>
                </div>
              </div>
            </div>
          ) : null}
          {modalstateno == 8 ? (
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
                  <h2>Please Sign in to Borhan</h2>
                  <div className="auth-input-wrp">
                    <label for="">
                      Please enter the OTP sent to{" "}
                      <span>9090909090</span>
                    </label>
                    <input
                      type="text"
                      name="otp"
                      onChange={onChangeExpert}
                      className="form-control"
                      placeholder=""
                    />

                    <button
                      className="btn auth-main-btn"
                      type="submit"
                      onClick={() => {
                        setopenmodal(false);
                        setmodalstateno(1);
                        onSubmitCreateExpert();
                      }}
                    >
                      Verify
                    </button>
                  </div>
                  <h5>
                    Not Received your code ?{" "}
                    <a href="javascript:;"> Resend code</a>
                  </h5>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
      <Modal
                    isOpen={openmodal}
                    toggle={() => {
                      toggle();
                    }}
                    className="authentication-modal modal-dialog modal-dialog-centered modal-xl"
                  >
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
                        {modalstateno == 1 ? (
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
                                <h2>Please Sign in to Borhan</h2>
                                <div className="auth-input-wrp">
                                  <label for="">Enter Mobile Number</label>
                                  <input
                                    maxlength="10"
                                    onKeyPress={(event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }}
                                    type="text"
                                    name="mobileNo"
                                    onChange={onChangeLogin}
                                    className="form-control"
                                    placeholder=""
                                    
                                  />
                                  <button
                                    role="button"
                                    data-bs-target="#verifyOTPmodal"
                                    data-bs-toggle="modal"
                                    data-bs-dismiss="modal"
                                    className="btn auth-main-btn"
                                    type="button"
                                    onClick={() => {
                                      setmodalstateno(2);
                                      otpFinder();
                                    }}
                                  >
                                    Send OTP
                                  </button>
                                </div>
                                <p>Or Sign in with</p>
                                <ul>
                                  <li className="pe-2">
                                  <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign In with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
                                  </li>
                                  <li className="ps-2">
                                  <FacebookLogin
                     appId="585451125985997"
                     autoLoad={true}
                     fields="name,email,picture"
                     cssClass="btn"
                     scope="public_profile,user_friends,user_actions.books"
                     callback={responseFacebook}
                    
                    />
                                  </li>
                                </ul>
                                <h5>
                                  Don’t have account ?{" "}
                                  <a
                                    role="button"
                                    data-bs-target="#createAccmodal"
                                    data-bs-toggle="modal"
                                    data-bs-dismiss="modal"
                                    href="javascript:;"
                                    onClick={() => {
                                      setmodalstateno(3);
                                    }}
                                  >
                                    Create now
                                  </a>
                                </h5>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {modalstateno == 2 ? (
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
                                <h2>Please Sign in to Borhan</h2>
                                <div className="auth-input-wrp">
                                  <label for="">
                                    Please enter the OTP sent to{" "}
                                    <span>9090909090</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="otp"
                                    onChange={onChangeLogin}
                                    className="form-control"
                                    placeholder=""
                                  />
                                  <button
                                    className="btn auth-main-btn"
                                    type="submit"
                                    onClick={() => {
                                      
                                      onSubmitLogin();
                                    }}
                                  >
                                    Verify
                                  </button>
                                </div>
                                <h5>
                                  Not Received your code ?{" "}
                                  <a href="javascript:;"> Resend code</a>
                                </h5>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {modalstateno == 3 ? (
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
                                      onClick={() => {
                                        setmodalstateno(4);
                                      }}
                                    >
                                      Borhan User
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      className="btn"
                                      type="button"
                                      onClick={() => {
                                        setmodalstateno(5);
                                      }}
                                    >
                                      Expert/Freelancer
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {modalstateno == 4 ? (
                          <div className="col-lg-6 p-0">
                            <div className="auth-modal-content">
                              <div className="w-100">
                                <div className="auth-profile-pic-wrp">
                                <div className="profile-pic-chooose">
                                
                                  <img
                                    src={`${getProfilePic==""? "./assets/img/profile-picture-icon.png": getProfilePic}`}
                                    className="img img-fluid"
                                    alt=""
                                  />
                                  <h6>Profile Picture</h6>
                                  <input
                                    name="profilePic"
                                    className="hide-input"
                                    type="file"
                                    onChange={(e) => {
                                      uploadFilesUsingMulter(e, 1);
                                    }}
                                  />
                                  </div>
                                </div>
                                <div className="auth-input-wrp">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <label for="">First Name</label>
                                      <input
                                        type="text"
                                        onChange={onChangeUser}
                                        className="form-control"
                                        name="firstName"
                                        placeholder=""
                                      />
                                    </div>
                                    <div className="col-lg-6">
                                      <label for="">Last Name</label>
                                      <input
                                        type="text"
                                        onChange={onChangeUser}
                                        className="form-control"
                                        name="lastName"
                                        placeholder=""
                                      />
                                    </div>
                                    <div className="col-lg-12">
                                      <label for="">Email ID</label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        onChange={onChangeUser}
                                        name="email"
                                        placeholder=""
                                      />
                                    </div>
                                    <div className="col-lg-12">
                                      <label for="">Mobile No.</label>
                                      <input
                                        type="string"
                                        className="form-control"
                                        name="mobileNo"
                                        onChange={onChangeUser}
                                        placeholder=""
                                        maxlength="10"
                                    onKeyPress={(event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }}
                                      />
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn auth-main-btn"
                                    onClick={() => {
                                      setmodalstateno(7);
                                      generateOtpUser();
                                    }}
                                  >
                                    Create Account
                                  </button>
                                </div>
                                <h5>
                                  By signing up , you agree to{" "}
                                  <a href="javascript:;">terms and condition</a>{" "}
                                  and Borhan <a href="javascript:;">policy</a>
                                </h5>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {modalstateno == 5 ? (
                          <div className="col-lg-6 p-0">
                            <div className="auth-modal-content">
                              <div className="w-100">
                                <div className="auth-profile-pic-wrp">
                                <div className="profile-pic-chooose">
                                
                                  <img
                                    src={`${getProfilePic==""? "./assets/img/profile-picture-icon.png": getProfilePic}`}
                                    className="img img-fluid"
                                    alt=""
                                  />
                                  <h6>Profile Picture</h6>
                                  <input
                                    name="profilePic"
                                    className="hide-input"
                                    type="file"
                                    onChange={(e) => {
                                      uploadFilesUsingMulter(e, 1);
                                    }}
                                  />
                                  </div>
                                </div>
                                <div className="auth-input-wrp">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <label for="">First Name</label>
                                      <input
                                        type="text"
                                        name="firstName"
                                        onChange={onChangeExpert}
                                        className="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div className="col-lg-6">
                                      <label for="">Last Name</label>
                                      <input
                                        type="text"
                                        name="lastName"
                                        onChange={onChangeExpert}
                                        className="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div className="col-lg-12">
                                      <label for="">Email ID</label>
                                      <input
                                        type="email"
                                        name="email"
                                        onChange={onChangeExpert}
                                        className="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div className="col-lg-12">
                                      <label for="">Mobile No.</label>
                                      <input
                                        type="string"
                                        name="mobileNo"
                                        onChange={onChangeExpert}
                                        className="form-control"
                                        placeholder=""
                                        maxlength="10"
                                        onKeyPress={(event) => {
                                          if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                          }
                                        }}
                                      />
                                    </div>
                                    <div className="col-lg-12">
                                      <label for="">Account Type</label>
                                      <div className="gender-buttons">
                                        {/* <!-- add active class for active the tab --> */}
                                        <button
                                          className={`btn me-2 ${
                                            accountType === "expert"
                                              ? "active"
                                              : ""
                                          }`}
                                          type="button"
                                          onClick={() => {
                                            setaccountType("expert");
                                          }}
                                        >
                                          Expert
                                        </button>
                                        <button
                                          className={`btn ms-2 ${
                                            accountType === "freelancer"
                                              ? "active"
                                              : ""
                                          } `}
                                          type="button"
                                          onClick={() => {
                                            setaccountType("freelancer");
                                          }}
                                        >
                                          Freelancer
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    className="btn auth-main-btn"
                                    type="button"
                                    onClick={() => {
                                      setmodalstateno(6);
                                    }}
                                  >
                                    Continue
                                  </button>
                                </div>
                                <h5>
                                  By signing up , you agree to{" "}
                                  <a href="javascript:;">terms and condition</a>{" "}
                                  and Borhan <a href="javascript:;">policy</a>
                                </h5>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {modalstateno == 6 ? (
                          <div className="col-lg-6 p-0">
                            <div className="auth-modal-content">
                              <div className="w-100">
                                <div className="auth-input-wrp">
                                  <div className="row">
                                    <div class="col-lg-6">
                                      <label>Category</label>
                                      <select
                                        class="form-control"
                                        onChange={(e) => {
                                          setSelectedCategory(e.target.value);
                                        }}
                                      >
                                        <option selected value="0">
                                          Select
                                        </option>
                                        {/* <option selected value="1">Category 1</option>
                                        <option selected value="2">Category 2</option>
                                        <option selected value="3">Category 3</option> */}
                                        {getCategories &&
                                          getCategories.map((obj, index) => {
                                            return (
                                              <option value={`${obj._id}`}>
                                                {obj.name}
                                              </option>
                                            );
                                          })}
                                      </select>
                                    </div>
                                    <div class="col-lg-6">
                                      <label>Pratice Area</label>
                                      <select
                                        class="form-control"
                                        onChange={(e) => {
                                          setSelectedPracticeArea(
                                            e.target.value
                                          );
                                        }}
                                      >
                                        {/* <option selected value="0">Select</option>
                                        <option selected value="1">Category 1</option>
                                        <option selected value="2">Category 2</option>
                                        <option selected value="3">Category 3</option> */}
                                        <option selected value="0">
                                          Select
                                        </option>
                                        {getPracticeArea &&
                                          getPracticeArea.map((obj, index) => {
                                            return (
                                              <option value={`${obj._id}`}>
                                                {obj.name}
                                              </option>
                                            );
                                          })}
                                      </select>
                                    </div>
                                    <div className="col-lg-12">
                                      <label for="">Bio</label>
                                      <input
                                        type="text"
                                        name="bio"
                                        onChange={onChangeExpert}
                                        className="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    <div className="col-lg-12 pt-2">
                                      <label for="">
                                        You can Record Audio and Video Bio (
                                        Optional )
                                      </label>
                                      <div className="record-buttons">
                                        <div className="btn-audio">
                                         <button className="btn" type="button">
                                          <img
                                            src="./assets/img/audio-record-icon.png"
                                            className="img img-fluid"
                                            alt=""
                                          />
                                      
                                          Audio record
                                        </button>
                                        <input
                                            type="file"
                                            name="audio"
                                            onChange={(e) =>
                                              uploadFilesUsingMulter(e, 2)
                                            }
                                            className="form-input-file audio-file"
                                          />   {" "}
                                          <div className=" display-value">
                                       {audioName}
                                       </div>
                                       </div>
                                       <div className="btn-video">
                                       <button className="btn" type="button">
                                          <img
                                            src="./assets/img/video-record-icon.png"
                                            className="img img-fluid"
                                            alt=""
                                          />
                                        Video record
                                        </button>
                                        <input
                                            type="file"
                                            name="video"
                                            onChange={(e) =>
                                              uploadFilesUsingMulter(e, 3)
                                            }
                                            className="form-input-file video-file"
                                          />{" "}
                                          <div className=" display-value">
                                       {videoName}
                                       </div>
                                         </div> 
                                      </div>
                                    </div>
                                    <div className="col-lg-12 pt-2">
                                      <label for="">Upload Documents</label>
                                      <div className="upload-doc-field">
                                        <input
                                          type="file"
                                          name="document"
                                          onChange={(e) =>
                                            uploadFilesUsingMulter(e, 4)
                                          }
                                          className="form-input-file"
                                        />
                                        <div className="artifical-doc-feild">
                                          <img
                                            src="./assets/img/upload-document-icon.png"
                                            className="img img-fluid"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <a href="javascript:;">Documents List</a>
                                    </div>
                                  </div>
                                  <button
                                    className="btn auth-main-btn"
                                    type="submit"
                                    onClick={() => {
                                      setmodalstateno(8);
                                      generateOtpExpert();
                                    }}
                                  >
                                    Create Account
                                  </button>
                                </div>
                                <h5>
                                  By signing up , you agree to{" "}
                                  <a href="javascript:;">terms and condition</a>{" "}
                                  and Borhan <a href="javascript:;">policy</a>
                                </h5>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {modalstateno == 7 ? (
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
                                <h2>Please Sign up to Borhan</h2>
                                <div className="auth-input-wrp">
                                  <label for="">
                                    Please enter the OTP sent to{" "}
                                    <span>9090909090</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="otp"
                                    onChange={onChangeUser}
                                    className="form-control"
                                    placeholder=""
                                  />

                                  <button
                                    className="btn auth-main-btn"
                                    type="submit"
                                    onClick={() => {
                                      
                                      onSubmitCreateBorhanUser();
                                    }}
                                  >
                                    Verify
                                  </button>
                                </div>
                                <h5>
                                  Not Received your code ?{" "}
                                  <a href="javascript:;"> Resend code</a>
                                </h5>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {modalstateno == 8 ? (
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
                                <h2>Please Sign in to Borhan</h2>
                                <div className="auth-input-wrp">
                                  <label for="">
                                    Please enter the OTP sent to{" "}
                                    <span>9090909090</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="otp"
                                    onChange={onChangeExpert}
                                    className="form-control"
                                    placeholder=""
                                  />

                                  <button
                                    className="btn auth-main-btn"
                                    type="submit"
                                    onClick={() => {
                                      
                                      onSubmitCreateExpert();
                                    }}
                                  >
                                    Verify
                                  </button>
                                </div>
                                <h5>
                                  Not Received your code ?{" "}
                                  <a href="javascript:;"> Resend code</a>
                                </h5>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Modal>
      <Modal
                      isOpen={borhanApp}
                      toggle={() => {
                          setBorhanApp(false);
                      }}
                      className="authentication-modal getapp modal-dialog modal-dialog-centered modal-xl"
                    >
                      <div class="auth-modal-wrp">
                        <div class="row">
                          <div class="col-xl-6 col-lg-12 col-md-12 p-5 text-center-md">
                            <div class="logo-img text-center">
                              <img
                                src="./assets/img/favicon.png"
                                class="img-fluid text-center"
                              />
                            </div>
                            <h4 class="mt-5 download-app-tagline pb-3">
                              Download Borhan App
                            </h4>
                            <h6 class="pt-2"> Easy, Smart, Useful</h6>
                            <p class="mt-t">
                              <small class="text-muted">
                                Connect to experts at your fingertips
                              </small>
                            </p>
                            <div class="row get-app-links ">
                              <div class="col-lg-6 mt-3">
                                <a href="">
                                  <img
                                    src="./assets/img/google-play-store-btn.png"
                                    class="img-fluid"
                                  />
                                </a>
                              </div>
                              <div class="col-lg-6 mt-3">
                                <a href="">
                                  <img
                                    src="./assets/img/app-store-btn.png"
                                    class="img-fluid"
                                  />
                                </a>
                              </div>
                            </div>
                            <p class="mt-3 small-text">
                              Enter your valid Mobile number to get download
                              link via SMS.
                            </p>
                            <div class="input-group mt-3 mb-2">
                              <input
                                type="text"
                                class="form-control"
                                id="phone-number"
                                placeholder="Type your 10 digit mobile number"
                                maxlength="10"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                              />
                              <button
                                type="button"
                                class="btn bg-dark text-white send-number"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                          <div class="col-xl-6   p-0 get-app-banner">
                            <div id="container text-center">
                              <img src="./assets/img/get-app-banner.png" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
    </>
  );
};

export default Header;

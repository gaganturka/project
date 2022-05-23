import React, { useContext,useRef } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import loginAction from "../../actions/login.action";
import categoriesAction from "../../actions/categories.action";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config/configg';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Agent from "../../actions/superAgent";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import { AuthContext } from "../../context/AuthContext";
import { RecaptchaVerifier, signInWithPhoneNumber, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase'
const Header = () => {
  let ref=useRef(null)
  let location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // let CLIENT_ID=""
  const CLIENT_ID = "192073990165-k8uk1edbbhb0lm03lqb7ikvf3ibqotr5.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  const [firebaseMobileUid,setFirebaseMobileUid]=useState("");
  const history = useNavigate();
  const [videoName, setVideoName] = useState("");
  const [audioName, setAudioName] = useState("");
  const [accountType, setaccountType] = useState("expert");
  const [files, setFile] = useState("");
  const [getPracticeArea, setGetPracticeArea] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedPracticeArea, setSelectedPracticeArea] = useState(0);
  const [flagUser, setflagUser] = useState(false)
  const [fflagUser, setfflagUser] = useState(false)
  const [otpFirebase, setOtpFirebase] = useState('');

  const [logincredential, setlogincredential] = useState({
    mobileNo: "",

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

  });
  const [openmodal, setopenmodal] = useState(false);
  const [borhanApp, setBorhanApp] = useState(false);
  const [modalstateno, setmodalstateno] = useState(1);
  const [profileViewerState, setProfileViewerState] = useState(0);
  const [profileViewerModal, setProfileViewerModal] = useState(false);
  const toggle = () => {
    setopenmodal(false);
    setmodalstateno(1);
  };
  let recaptchaWrapperRef ;

  const signinWithGoogleUsingFirebase = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log("firebaseGoogle Result", result)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("firebasetokengoogle", token)
        // The signed-in user info.
        const user = result.user;
        console.log("usergooglefirebase", user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const signinWithFacebookUsingFirebase = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        console.log("facebook result", result)
        const user = result.user;
        console.log("userwithFacebookFire", user)
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log("firebasefacebookcredentials", credential);
        // responseFacebook(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });

  }

  const ConfigureRecaptcha = async () => {
    // console.log("mdadf",mobileNo)
    window.recaptchaVerifier = await new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.

      }
    }, auth);

  }
  const generateOtpUsingFirebase = async (e, mobileNo) => {

    e.preventDefault();
    if (recaptchaWrapperRef) {
      recaptchaWrapperRef.innerHTML = `<div id="sign-in-button"></div>`
    }
   if(mobileNo.length<10||mobileNo.length>10){
      // toast('Phone Number Invalid')
      return;
   }
      await ConfigureRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    console.log(appVerifier, "appverifier")
    let number = "+91" + mobileNo;
    console.log("mobile is ", number)
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        recaptchaWrapperRef.innerHTML = `<div id="sign-in-button"></div>`
        appVerifier.clear();
        // window.recaptchaVerifier=null;
        if(modalstateno===1)
        setmodalstateno(2);
        else if(modalstateno==4)
        setmodalstateno(7);
        else if(modalstateno===6)
        setmodalstateno(8);
        toast("OTP sent successfully");
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // window.recaptchaVerifier=null;
        console.log(error, 'firebasegenerateotperror')
        recaptchaWrapperRef.innerHTML = `<div id="sign-in-button"></div>`
        appVerifier.clear();
        toast("INVALID Mobile Number")
        // alert("Otp you have entered is  wrong kindly re-enter the correct otp");
        // ...
      });
  }
  // const resendOtpUsingFirebase = async (e, mobileNo) => {
  //   e.preventDefault();
  //   let appVerifier = window.recaptchaVerifier;

  //   let number = mobileNo;
  //   console.log("mobile is ", number)
  //   signInWithPhoneNumber(auth, number, appVerifier)
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //       // window.recaptchaVerifier.clear();
  //       // ...
  //     }).catch((error) => {

  //       // window.recaptchaVerifier.clear();
  //       // Error; SMS not sent
  //       console.log(error, 'firebasegenerateotperror')
  //       // alert("Otp you have entered is  wrong kindly re-enter the correct otp");
  //       // ...
  //     });
  // }
  const verifyOtpUsingFirebase = async () => {
    let confirmationResult = window.confirmationResult;
    window.recaptchaVerifier=null;
    confirmationResult.confirm(otpFirebase).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log("otp firebase user mai kya hai", user)
      setFirebaseMobileUid(user?.uid);
      
      if (modalstateno == 2) {
        onSubmitLogin(user?.uid);
      }
      else if (modalstateno === 7) {
        onSubmitCreateBorhanUser(user?.uid);
      }
      else if (modalstateno === 8) {
        onSubmitCreateExpert(user?.uid)
      }
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error)
      toast("Otp you have entered is  wrong kindly re-enter the correct otp");

    });
  }

  const responseFacebook = (response) => {
    console.log(response);
    let createData = {
      email: response.email,
      firstName: response.displayName.split(' ')[0],
      facebookId: response.uid,
      lastName: response.displayName.split(' ')[1],
      profilePic: response.photoURL ? response.photoURL : "",
      mobileNo: response.phoneNumber,
      isEmailVerified: response.emailVerified,
    }
    console.log(createData, "ksdhcbsdbc")
    // loginAction.facebookLoginSignup(createData,(err,res)=>{
    //   if(err){
    //     alert("err")
    //   }else{
    //     alert("login success")
    //     window.location.reload();
    //     localStorage.setItem("token", res.data.token);  
    //     }
    // })

  }
  const responseGoogleSuccess = async (response) => {
    console.log(response);
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
    };
    let data = response.profileObj;
    console.log(data, "ksdhcbsdbc")
    loginAction.googleLoginSignup(data, (err, res) => {
      if (err) {
        alert("err")
      } else {
        alert("login success")
        window.location.reload();
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
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
    // if (localStorage.getItem("token")||Agent.getLoginType()) {
    if (isLoggedIn === true) {
      console.log(Agent.getLoginType())
      setflagUser(true);
    }

  }, [isLoggedIn]);
  const fetchAllCategories = async () => {

    categoriesAction.fetchAllCategories((err, res) => {
      if (err) {
        console.log(err, "helllooo")
      } else {
        setGetCategories(res.data);
        console.log(res.data, " daata ");
      }
    });

  };
  const fetchAllPracticeArea = async () => {
    categoriesAction.fetchAllPracticeArea((err, res) => {
      if (err) {

      } else {
        console.log(res.data, " daata ");
        setGetPracticeArea(res.data);
      }
    });

  };
  useEffect(() => {
    fetchAllCategories();
    fetchAllPracticeArea();
  }, []);

  const onSubmitCreateBorhanUser = async (uid) => {
    // e.preventDefault();
    const { firstName, lastName, email, mobileNo, profilePic, otp } =
      usercredential;
    if (!firstName && !lastName && !email && !mobileNo && !otp) {
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
        firebaseUid:uid,
      }),
    });
    const json = await response.json();
    if (json.statusCode === 200) {
      localStorage.setItem("token", json.data);

      setopenmodal(false);
      setProfileViewerModal(false);
      setmodalstateno(1);
      setIsLoggedIn(true)

      history("/userdashboard");
    }
  };
  const onSubmitCreateExpert = async (uid) => {
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


    if (!firstName && !lastName && !email && !mobileNo && !otp && !profilePic) {
      alert("fill ")
      return
    }
    let dataToSend = {
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
      firebaseUid:uid,
    };

    let response;
    await loginAction.CreateExpert(dataToSend, (err, res) => {
      if (err) {
        console.log(err, "here is error");
      } else {
        response = res;
        console.log(response, 'here is res ')
        if (response.statusCode === 200) {
          // localStorage.setItem("token", response.data);
          // history("/userdashboard");

          setopenmodal(false);
          setProfileViewerModal(false);
          setmodalstateno(1);
        }
      }
    })

  };
  const onSubmitLogin = async (uid) => {
    let dataToSend = {
      mobileNo: logincredential.mobileNo,
      deviceType:"1",
      deviceToken:"",
      firebaseUid:uid,
    };
    if (!logincredential.mobileNo) {
      alert("fill ")
      return
    }

    let json;
    loginAction.onLogin(dataToSend, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        json = res;

        if (json.statusCode === 200) {
          setopenmodal(false);
          setProfileViewerModal(false);
          setmodalstateno(1);
          localStorage.setItem("token", json.data);

          setIsLoggedIn(true);
          history("/userdashboard");
          // window.location.reload();


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
    // console.log(e,'dcjhsdhjsdhbd');
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
  
  const profileViewer = () => {
    if (flagUser) {
      history("/userdashboard");
      setopenmodal(false);
    }
    else {

      setopenmodal(true);
    }

  }
  const bookAnAppoitmentHeaderViewer = () => {
    // if(localStorage.getItem('token')!==null)
    if (isLoggedIn === true) {
      history("/expertlisting");
      setopenmodal(false);
    }
    else {

      setopenmodal(true);
    }

  }

  //  const  validationFunction=()=>{
  //    if(expertcredential.firstName  "^[a-zA-Z0-9_]*$")
  //  }
  return (
    <>
    
    <ToastContainer/>
      <div id="recaptcha-container" ref={ref => recaptchaWrapperRef = ref}>
                <div id="sign-in-button"></div>
             </div>
      <div className="navigation ">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                className="logo-img"
                src="/assets/img/main-logo.png"
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
                  className={`nav-item ${location.pathname === "/" ? "active" : ""
                    }`}
                >
                  <Link
                    className={`nav-link ${location.pathname === "/" ? "active" : ""
                      }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/expertlisting" ? "active" : ""
                      }`}
                    to="/expertlisting"
                  >
                    Experts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link

                    className={`nav-link ${location.pathname === "/membership" ? "active" : ""
                      }`}
                    to="/membership"
                  >
                    Membership

                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => { setBorhanApp(true) }}
                    className={`nav-link `}

                  // to="/privacypolicy"
                  >
                    <img
                      src="/assets/img/Icon awesome-mobile-alt.png"
                      class="brohan-app-icon"
                    />{" "}
                    Borhan App

                  </a>
                </li>
                {!flagUser ? <li className="nav-item">
                  <a
                    className={`nav-link ${location.pathname === "/userdashboard" ? "active" : ""
                      }`}
                    // to="/userdashboard"
                    onClick={profileViewer}
                  >
                    Login



                  </a></li> : <li className="nav-item">
                  <a
                    className={`nav-link ${location.pathname === "/userdashboard" ? "active" : ""
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
                  src="/assets/img/human-right-artwok.png"
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
                        src="/assets/img/main-logo.png"
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
                        value={logincredential.mobileNo}
                        onChange={onChangeLogin}
                        className="form-control"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                       maxLength="10"
                      />
                      {/* <PhoneInput
                        country={'in'}

                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        type="text"
                        name="mobileNo"
                        value={logincredential.mobileNo}
                        onChange={(phone) => { console.log("kya hai phone mai ", phone, "   ", logincredential.mobileNo); setlogincredential({ ...logincredential, ["mobileNo"]: phone }) }}
                        className="form-control"

                      /> */}
                      <button
                        role="button"
                        data-bs-target="#verifyOTPmodal"
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                        className="btn auth-main-btn"
                        type="button"
                        onClick={(e) => {
                          
                          generateOtpUsingFirebase(e, logincredential.mobileNo)
                        }}
                      >
                        Send OTP
                      </button>
                    </div>
                    {/* <p>Or Sign in with</p> */}
                    <ul>
                      <li className="pe-2">
                        {/* <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign In with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            /> */}
                        {/* <button onClick={signinWithGoogleUsingFirebase}>login/signup with google firebase</button> */}

                      </li>
                      <li className="ps-2">
                        {/* <FacebookLogin
                     appId="585451125985997"
                     autoLoad={true}
                     fields="name,email,picture"
                     cssClass="btn"
                     scope="public_profile,email,user_friends"

                     callback={responseFacebook}
                    
                    /> */}
                        {/* <button onClick={signinWithFacebookUsingFirebase}>login/signup with facebook firebase</button> */}

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
                        src="/assets/img/main-logo.png"
                        className="img img-fluid"
                        alt=""
                      />
                    </div>
                    <h2>Please Sign in to Borhan</h2>
                    <div className="auth-input-wrp">
                      <label for="">
                        Please enter the OTP sent to{" "}
                        <span>{logincredential.mobileNo}</span>
                      </label>

                      <input
                        type="text"
                        name="otp"
                        onChange={(e) => { setOtpFirebase(e.target.value) }}
                        className="form-control"
                        placeholder=""
                      />
                      <button
                        className="btn auth-main-btn"
                        type="submit"
                        onClick={() => {
                          verifyOtpUsingFirebase();
                        }}
                      >
                        Verify
                      </button>
                    </div>
                    <h5>
                      Not Received your code ?{" "}
                      <a onClick={(e) => generateOtpUsingFirebase(e, logincredential.mobileNo)}> Resend code</a>
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
                        src="/assets/img/main-logo.png"
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
                          src={`${getProfilePic == "" ? "/assets/img/profile-picture-icon.png" : getProfilePic}`}
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
                        onClick={(e) => {
                          generateOtpUsingFirebase(e, usercredential.mobileNo);
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
                          src={`${getProfilePic == "" ? "/assets/img/profile-picture-icon.png" : getProfilePic}`}
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
                              className={`btn me-2 ${accountType === "expert"
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
                              className={`btn ms-2 ${accountType === "freelancer"
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
                                  src="/assets/img/audio-record-icon.png"
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
                                  src="/assets/img/video-record-icon.png"
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
                                src="/assets/img/upload-document-icon.png"
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
                        onClick={(e) => {
                          
                          generateOtpUsingFirebase(e, expertcredential.mobileNo);
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
                        src="/assets/img/main-logo.png"
                        className="img img-fluid"
                        alt=""
                      />
                    </div>
                    <h2>Please Sign up to Borhan</h2>
                    <div className="auth-input-wrp">
                      <label for="">
                        Please enter the OTP sent to{" "}
                        <span>{usercredential.mobileNo}</span>
                      </label>
                      <input
                        type="text"
                        name="otp"
                        onChange={(e) => { setOtpFirebase(e.target.value) }}
                        className="form-control"
                        placeholder=""
                      />

                      <button
                        className="btn auth-main-btn"
                        type="submit"
                        onClick={() => {
                          verifyOtpUsingFirebase();
                        }}
                      >
                        Verify
                      </button>
                    </div>
                    <h5>
                      Not Received your code ?{" "}
                      <a onClick={generateOtpUsingFirebase}> Resend code</a>
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
                        src="/assets/img/main-logo.png"
                        className="img img-fluid"
                        alt=""
                      />
                    </div>
                    <h2>Please Sign in to Borhan</h2>
                    <div className="auth-input-wrp">
                      <label for="">
                        Please enter the OTP sent to{" "}
                        <span>{expertcredential.mobileNo}</span>
                      </label>
                      <input
                        type="text"
                        name="otp"
                        onChange={(e) => { setOtpFirebase(e.target.value) }}
                        className="form-control"
                        placeholder=""
                      />

                      <button
                        className="btn auth-main-btn"
                        type="submit"
                        onClick={() => {
                          verifyOtpUsingFirebase();
                        }}
                      >
                        Verify
                      </button>
                    </div>
                    <h5>
                      Not Received your code ?{" "}
                      <a onClick={generateOtpUsingFirebase}> Resend code</a>
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
                  src="/assets/img/favicon.png"
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
                      src="/assets/img/google-play-store-btn.png"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="col-lg-6 mt-3">
                  <a href="">
                    <img
                      src="/assets/img/app-store-btn.png"
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
                <img src="/assets/img/get-app-banner.png" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;

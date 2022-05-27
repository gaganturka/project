import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebaruser";
import homeAction from "../../actions/home.action";
import config from "../../config/configg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Cookies from 'universal-cookie';
import Agent from "../../actions/superAgent";
import { AuthContext } from "../../context/AuthContext";
const UserDashBoard = () => {
  // const [loggedInBorhanUserInfo, setLoggedInBorhanUserInfo] = useState([]);
  const history = useNavigate();
  const {isLoggedIn,setIsLoggedIn,loggedInBorhanUserInfo,setLoggedInBorhanUserInfo}=useContext(AuthContext)
  const [dummy,setDummy]=useState(0);
  const [getProfilePic, setGetProfilePic] = useState("");
  const [isEditable,setIsEditable]=useState(false);
  useEffect(() => {
    // let k=Agent.getLoginType();
    // console.log(k,"mddcs,dc sdmc sdcsdcsdcsdcdcscs   s csd m")
    // if (localStorage.getItem("token")||k) {
      if(isLoggedIn===true){
        setGetProfilePic(loggedInBorhanUserInfo.profilePic)
      // // getBorhanUserDetails();
      // setDummy(1);
    } 
    else {

      history("/");
    }
  }, [loggedInBorhanUserInfo]);

  // const getBorhanUserDetails = async () => {
  //   // console.log(decodedToken,"hi its decoded");
  //   homeAction.getBorhanUserDetails((err, res) => {
  //     if (err) {
  //       console.log(err, "helllooo");
  //     } else {
  //       //   setGetCategories(res.data);
  //       console.log(res.data, "user details daata ");
  //       setLoggedInBorhanUserInfo(res.data);
  //       setGetProfilePic(res.data.profilePic);
  //     }
  //   });
  // };
  const onSubmitEditExpert = async (e) => {
      e.preventDefault();
    let dataToSend = {
      firstName: loggedInBorhanUserInfo.firstName,
      lastName: loggedInBorhanUserInfo.lastName,
      email: loggedInBorhanUserInfo.email,
      mobileNo: loggedInBorhanUserInfo.mobileNo,
      profilePic: getProfilePic,
    };
    let json;
    homeAction.editBorhanUserDetails(dataToSend, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        json = res;
         toast('Profile has been updated successfully')
        //  if (json.statusCode === 200) {
        //    localStorage.setItem("token", json.data);
        //    history("/userdashboard");
        //  }
        setTimeout(()=>{
         window.location.reload()
        },100)
      }
    });
  };

  const onChangeBorhanUser = (e) => {
    setLoggedInBorhanUserInfo({ ...loggedInBorhanUserInfo, [e.target.name]: e.target.value });
  };
  const uploadFilesUsingMulter = async (e, i) => {
    // console.log("iiiihiihiohiin", "aloha0", e.target.files[0]);
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
    }
  };

  const handleEditableProfile=()=>{
    if(!isEditable)
    toast('Profile can now be edited');
 
    setIsEditable(!isEditable);
   
  }
  return (
    <>
    <ToastContainer/>
      {/* {console.log(decodedToken,"dedc decoded")} */}
      <section className="admin-wrapper">
        <Sidebar />
        <div className="admin-content-wrapper">
          <div className="row">
            <div className="col-lg-6">
              <div className="user-personal-details">
                <div className="update-pp-wrp">
                  <div className="upt-pp-img">
                    <div className="update-profile"></div>
                    <img
                      src={`${
                        getProfilePic === ""
                          ? "/assets/img/mathew-wade.png"
                          : getProfilePic
                      }`}
                      className="img img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="update-pp-content">
                    <input
                      name="profilePic"
                      type="file"
                      className="profile-pic-input"
                      onChange={(e) => {
                        uploadFilesUsingMulter(e, 1);
                      }}
                    />
                    <p>Update Profile Picture </p>

                    <div className="upt-edit-icon" >
                      <a onClick={handleEditableProfile}>
                        <img
                          src="/assets/img/edit-white-icon.png"
                          className="img img-fluid"
                          alt=""

                          
                        />
                        </a>
                    </div>
                  </div>
                </div>
                <div className="update-per-details-wrp">
                  <form action="">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="">
                          <label for="">First name</label>
                         {isEditable?<input
                            type="text"
                            name="firstName"
                            value={loggedInBorhanUserInfo?.firstName}
                            onChange={(e) => {
                              onChangeBorhanUser(e);
                            }}
                            className="form-control "
                            placeholder=""
                            
                          />:
                          <input
                            type="text"
                            name="firstName"
                            value={loggedInBorhanUserInfo?.firstName}
                            onChange={(e) => {
                              onChangeBorhanUser(e);
                            }}
                            className="form-control "
                            placeholder=""
                            disabled
                          />}
                          
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="">
                          <label for="">Last name</label>
                          {isEditable?<input
                            type="text"
                            name="lastName"
                            value={loggedInBorhanUserInfo?.lastName}
                            onChange={(e) => {
                              onChangeBorhanUser(e);
                            }}
                            className="form-control"
                            placeholder=""
                          />:<input
                          type="text"
                          name="lastName"
                          value={loggedInBorhanUserInfo?.lastName}
                          onChange={(e) => {
                            onChangeBorhanUser(e);
                          }}
                          className="form-control"
                          placeholder=""
                          disabled
                        />}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="">
                          <label for="">Registered Email ID</label>
                          {isEditable?
                          <input
                          type="email"
                          className="form-control"
                          value={loggedInBorhanUserInfo?.email}
                          name="email"
                          onChange={(e) => {
                            onChangeBorhanUser(e);
                          }}
                          placeholder=""
                        />:
                        <input
                            type="email"
                            className="form-control"
                            value={loggedInBorhanUserInfo?.email}
                            name="email"
                            onChange={(e) => {
                              onChangeBorhanUser(e);
                            }}
                            placeholder=""
                            disabled
                          />}
                        </div>
                      </div>
                      {/* <div className="col-lg-12">
                                 <div className="">
                                    <label for="">Date of Birth</label>
                                    <div className="input-date">
                                       <input type="date" className="form-control" placeholder="" value=""/>
                                       <img src="/assets/img/cal-icon.png" className="img img-fluid" alt=""/>
                                    </div>
                                 </div>
                              </div> */}
                      {/* <div className="col-lg-12">
                        <div className="">
                          <label for="">Registered email</label>
                          <div className="add-new-input">
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              value="abcd@gmail.com"
                            />
                            <Link to="javascript:;">Add new</Link>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <div className="">
                          <label for="">Registered Mobile number</label>
                          <div className="add-new-input">
                            <input
                              type="text"
                              name="mobileNo"
                              value={loggedInBorhanUserInfo?.mobileNo}
                              onChange={(e) => {
                                onChangeBorhanUser(e);
                              }}
                              className="form-control"
                              placeholder=""
                              disabled
                            />
                            {/* <Link to="javascript:;">Add new</Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-grey-common"
                      type="submit"
                      onClick={(e) => {
                        onSubmitEditExpert(e);
                      }}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashBoard;

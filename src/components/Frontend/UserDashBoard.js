import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Sidebar from './Sidebaruser'
import homeAction from '../../actions/home.action'
import config from '../../config/configg'
import axios from 'axios'
const UserDashBoard = () => {
   const [userDetails,setUserDetails]=useState([]);
   const [getProfilePic,setGetProfilePic]=useState("");
   const history=useNavigate();
   useEffect(() => {
      if(localStorage.getItem('token'))
      {
         getBorhanUserDetails()
      }
      else{
       history('/')
      }
   }, [])
   
   const getBorhanUserDetails = async () => {
      // console.log(decodedToken,"hi its decoded");
      homeAction.getBorhanUserDetails((err,res)=>{
         if(err){
           console.log(err,"helllooo")
         }else{
         //   setGetCategories(res.data);
           console.log(res.data,"user details daata ");
           setUserDetails(
         res.data
           );
           setGetProfilePic(res.data.profilePic)
         }
       });

  };
  const onSubmitEditExpert = async (e) => {
   //   e.preventDefault();   
   let dataToSend={
      firstName: userDetails.firstName,
         lastName: userDetails.lastName,
         email: userDetails.email,
         mobileNo: userDetails.mobileNo,
         profilePic: getProfilePic,
    };
    let json; 
    homeAction.editBorhanUserDetails(dataToSend,(err,res)=>{
      if(err){
      console.log(err);
      }else{
        json=res;
        
   //  if (json.statusCode === 200) {
   //    localStorage.setItem("token", json.data);
   //    history("/userdashboard");
   //  }
      }
    })

 };

 const onChangeBorhanUser=(e)=>
 {
    setUserDetails({...userDetails,[e.target.name]:e.target.value}) 
        

  }
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

  return (
      <>
      {/* {console.log(decodedToken,"dedc decoded")} */}
      <section className="admin-wrapper">
      <Sidebar/>
         <div className="admin-content-wrapper">
            <div className="row">
               <div className="col-lg-6">
                  <div className="user-personal-details">
                     <div className="update-pp-wrp">
                        <div className="upt-pp-img">
                        <div className="update-profile"></div>
                           <img src={`${getProfilePic===""?"./assets/img/mathew-wade.png":getProfilePic}`} className="img img-fluid" alt=""/>
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
                                    <input type="text" name="firstName" value={userDetails?.firstName} onChange={(e)=>{onChangeBorhanUser(e)}} className="form-control" placeholder="" />
                                 </div>
                              </div>
                              <div className="col-lg-6">
                                 <div className="">
                                    <label for="">Last name</label>
                                    <input type="text" name="lastName" value={userDetails?.lastName} onChange={(e)=>{onChangeBorhanUser(e)}} className="form-control" placeholder="" />
                                 </div>
                              </div>
                              <div className="col-lg-12">
                                 <div className="">
                                    <label for="">Email ID</label>
                                    <input type="email" className="form-control" value={userDetails?.email} name="email" onChange={(e)=>{onChangeBorhanUser(e)}} placeholder="" />
                                 </div>
                              </div>
                              {/* <div className="col-lg-12">
                                 <div className="">
                                    <label for="">Date of Birth</label>
                                    <div className="input-date">
                                       <input type="date" className="form-control" placeholder="" value=""/>
                                       <img src="./assets/img/cal-icon.png" className="img img-fluid" alt=""/>
                                    </div>
                                 </div>
                              </div> */}
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
                                       <input type="text" name="mobileNo" value={userDetails?.mobileNo} onChange={(e)=>{onChangeBorhanUser(e)}} className="form-control" placeholder="" />
                                       <Link to="javascript:;">Add new</Link>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <button className="btn btn-grey-common" type="submit" onClick={(e)=>{onSubmitEditExpert(e)}}>Save Changes</button>
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
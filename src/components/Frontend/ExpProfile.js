import {React,useState,useEffect} from 'react'
import {Modal,ModalBody} from 'reactstrap'
import Footer from './Footer';
import Calendar from 'react-calendar'
import { useParams } from "react-router-dom"
import expextAction from "../../actions/expertlisting.action";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
const ExpProfile = () => {
   const params = useParams();
   const [bookappointmentmodal,setbookappointmentmodal]=useState(false);
   const [scheduleappointmentmodal,setscheduleappointmentmodal]=useState(false);
   const [expert,setExpert]=useState(null);
   const [typeCall,setTypeCall]=useState(1);
   const [categorie,setCategorie]=useState("");
   const [practiceArea,setPracticeArea]=useState("");
   const [Duration,setDuration]=useState("");
   const [question,SetQuestion]=useState("")
   const [startAppointmentTime,SetStartAppointmentTime]=useState(null)
   const [appointmentTime,SetAppointmentTime]=useState("17:00:00")

   const [endAppointmentTime,SetEndAppointmentTime]=useState(null)

   const [dateSlot,SetDateSlot]=useState(null) 

   
  const [appointmentType, setAppointmentType] = useState(null);
  useEffect(() => {

   fetchExpert();
  },[]);
  useEffect(()=>{
   onSelectTime()
  },[dateSlot])
 //moment().format('MMMM Do YYYY, h:mm:ss a');
   const Datehandel=(e)=>{
      // api hit 
      e=moment(e).format('YYYY-MM-DD');
      console.log(e,"date to selected")
      SetDateSlot(e);
  
   //    console.log(e)
   //    let localdate =e+' 17:00:00'; 
   //    console.log(localdate,"here is ");
   //    let dateValue = new Date(localdate);
   //    console.log(dateValue,Duration,"jbscdnjcsdbjcsdbvvh")
   //    var afterSomeMinutes = new Date( dateValue.getTime() + 10 * 60000);
   //    console.log(afterSomeMinutes,"kjbjbjh")
   //    // '2020-01-01 12:00:00'

   //     console.log(moment(localdate),'locaDate')
   //    //Moment<2020-01-01T12:00:00+08:00>
   //   console.log(moment.utc(moment(localdate)).format(),'locaDatesdccsd')

   //   SetDateSlot(moment.utc(moment(localdate)).format());
   // onSelectTime();
   }
   const onSelectTime=()=>{
      
      // e=moment(e).format('YYYY-MM-DD');
      // console.log(e,"date to selected")
      // console.log(e)
      if(Duration)
      {let localdate =dateSlot+' 17:00:00'; 
      console.log(localdate,"here is ");
      console.log(moment(localdate),'locaDate')
      console.log(moment.utc(moment(localdate)).format(),'start time')
      SetStartAppointmentTime(moment.utc(moment(localdate)).format());


      let dateValue = new Date(localdate);
      console.log(dateValue,Duration,"jbscdnjcsdbjcsdbvvh")
      var afterSomeMinutes = new Date( dateValue.getTime() + Duration * 60000);
      console.log(afterSomeMinutes,"here is ");
      console.log(moment(afterSomeMinutes),'locaDate')
      console.log(moment.utc(moment(afterSomeMinutes)).format(),'end time')
      SetEndAppointmentTime(moment.utc(moment(afterSomeMinutes)).format());
      }
   }
   const fetchExpert=async ()=>{
      let id = params.id;
      await expextAction.getSingleExport(id,(err,res)=>{
         if(err){
 
         }else{
            console.log(res)
            setExpert(res.data);
            console.log(expert)
         }
      })
   }
   const bookAppointment =()=>{
      let id = params.id;
   let calltype="";
      if(typeCall==1){
         calltype="video";
      }else if(typeCall==2){
         calltype="audio";
   }else{
      return
   }
   let dataToSend={
      question:question,
      duration:Duration,
      appointmentTime:appointmentTime,
      appointmentDate:dateSlot,
      practiceArea:"625fef06f962a2761cd19e74",
      expertId:id,
      appointmentType:calltype,
      appointDateandTime:startAppointmentTime,
      status:"pending",
      startAppointmentTime:startAppointmentTime,
      endAppointmentTime:endAppointmentTime,
   }
   console.log(dataToSend,"data playload")
expextAction.bookAnAppoitment(dataToSend,(err,res)=>{
   if(err){

   }else{
      // 
      console.log(res,"here is resoser in exprofile.js")
   }
})


}
const handlemodal=(e)=>{
    
      setscheduleappointmentmodal(true)

}

const handlemodal1=()=>{
   
   if(startAppointmentTime==null||appointmentTime==null||endAppointmentTime==null){
      alert("fill form first ")
      return 
   }
   console.log("hello")
   bookAppointment();
   setscheduleappointmentmodal(false);
   setbookappointmentmodal(false);
}
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
               {/* <div className="col-lg-5">
                  <div className="breadcrumb-search">
                     <div className="position-relative">
                        <input type="text" className="form-control" placeholder="Search any....."/>
                        <button className="btn"><img src="./assets/img/search-icon.png" className="img img-fluid" alt=""/></button>
                     </div>
                  </div>
               </div> */}
            </div>
         </div>
      </section>
     { expert!=null?
     
   

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
                                    <h4>{expert.userId && expert.userId.firstName}{" "} {expert.userId.lastName} Nikolaus</h4>
                                    <p>( Business & Finance Expert )</p>
                                 </div>
                              </div>
                           </li>
                           <li>
                              <div>
                                 <h4>{expert.experience}+</h4>
                                 <p>Years of Experience</p>
                              </div>
                           </li>
                           <li>
                              <div>
                                 <h4>{expert.rating.avgRating}</h4>
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
                                 <h4>{expert.noOfSessionsDone} h</h4>
                                 <p>Session done</p>
                              </div>
                           </li>
                           <li>
                              <div className="exp-intro">
                              <img src="./assets/img/volume-icon.png" className="img img-fluid" alt=""/>
                                 </div>
                                 <div>

                              {/* <audio controls>
              <source src="horse.ogg" type="audio/ogg" />
                  <source src="horse.mp3" type="audio/mpeg"/>
                     Your browser does not support the audio tag.
</audio> */}
                                 <div>

            
                                    <p>Expert Intro</p>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div className="exp-communicate-btn-row">
                     
                        <div><button className={`btn  ${
                      typeCall == 1 ? "bg-success" : ""
                    }`} type="button "  onClick={e=>{
                     e.preventDefault();
                     setTypeCall(1)
                  }}>
                       
                       
                       <img src="./assets/img/video-call-icon.png" className="img img-fluid" alt=""/>
                        Video Call</button>
                        </div>
                    <div><button className={`btn  ${
                      typeCall == 2 ? "bg-success" : ""
                    }`} type="button" onClick={e=>{
                     e.preventDefault();
                     setTypeCall(2)
                  }}>
                       
                       
                       <img src="./assets/img/video-call-icon.png" className="img img-fluid" alt=""/> Audio Call</button></div>

                        {/* <!-- <div><button className="btn" type="button"><img src="./img/chat-icon.png" className="img img-fluid" alt=""> Chat</button></div> --> */}
                     </div>
                     <div className="continue-booking-btn">
                        {/* <button data-bs-target="#bookAppointmentModal" data-bs-toggle="modal" className="btn" type="button"> Continue to Book Appointment </button> */}
                         <button className="btn" onClick={(e)=>{
                            e.preventDefault();
                            setbookappointmentmodal(true)
                           }
                           }
                             type="button" >Continue to Book Appointment
                         
                                                            </button>
                     </div>
                     <div className="exp-wallet-amount">
                        <p>Burhan Wallet Amount - <a href="javascript:;">06 h 30 min remaining</a></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>: "" }
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
                                                      <Calendar
                                                      onClick={e=>{
                                                         // e.preventDefault();

                                                         console.log(e);
                                                      }}
                                                      onChange={e=>{
                                                         // e.preventDefault()
                                                         Datehandel(e);
                                                                                                            }}/>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-lg-6">
                                          <div className="book-app-box">
                                             <div className="select-time-slot">
                                             <h1>Schedule an Appointment</h1>
                                                <img src="./assets/img/time-slot.png" className="img img-fluid" alt=""/>
                                                <div className='row '>
                                                   <div className='col-lg-6 btn-appointment1 '>
                                                   <button className="btn btn-white bg-white btn-appointment">1.PM</button>
                                                   </div>
                                                   <div className='col-lg-6 btn-appointment1'>
                                                   <button className="btn btn-white bg-white btn-appointment">1.PM</button>
                                                      </div>
                                                      <div className='col-lg-6 btn-appointment1'>
                                                   <button className="btn btn-white bg-white btn-appointment" disabled>1.PM</button>
                                                      </div>
                                                      <div className='col-lg-6 btn-appointment1'>
                                                   <button className="btn btn-white bg-white btn-appointment">1.PM</button>
                                                      </div>
                                                      <div className='col-lg-6 btn-appointment1'>
                                                   <button className="btn btn-white bg-white btn-appointment">1.PM</button>
                                                      </div>
                                                      <div className='col-lg-6 btn-appointment1'>
                                                   <button className="btn btn-white bg-white btn-appointment">1.PM</button>
                                                      </div>
                                                      <div className='col-lg-6 btn-appointment1'>
                                                   <button className="btn btn-white bg-white btn-appointment">1.PM</button>
                                                      </div>
                                                      <div className='col-lg-6 btn-appointment1'>
                                                   <button className="btn btn-white bg-white btn-appointment">1.PM</button>
                                                      </div>
                                                </div>
                                                
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="continue-booking-btn p-0 mb-4">
                                    <button className="btn" type="button"  onClick={(e)=>{
                                        e.preventDefault();
                                    
                                       handlemodal1()
                                       }}> Proceed and Pay </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
                                                            </Modal>
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
                                                <select className="form-select" aria-label="example" onChange={e=>{
                                                   setTypeCall(e.target.value)
                                                }}>
                                                   <option selected value="Video Call">Video Call</option>
                                                   <option value="Face to Face">Face to Face</option>
                                                   <option value="Audio Call">Audio Call</option>
                                                </select>
                                             </div>
                                          </div>
                                          <div className="col-lg-4">
                                             <div className="form-group">
                                                <label for="">Select call Duration time</label>
                                                <select className="form-select " aria-label="example" onChange={e=>{
                                                   console.log(e.target.value);
                                                   setDuration(e.target.value);
                                                }}>
                                                   <option selected value="30">30 Mintues</option>
                                                   <option value="40">40 Mintues</option>
                                                   <option value="50">50 Mintues</option>
                                                   <option value="60">60 Mintues</option>
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
                                                <input type="text" className="form-control" onChange={(e)=>{
                                                       
                                                   SetQuestion(e.target.value);
                                                }} placeholder="Question to Ask ?"/>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="continue-booking-btn p-0 mb-4">
                                    {/* <button data-bs-target="#scheduleAppointmentModal"  data-bs-dismiss="modal" data-bs-toggle="modal" className="btn" type="button"> Continue to Book Appointment </button> */}
                                    <button className="btn"  onClick={(e)=>{
                                       e.preventDefault();
                                       handlemodal();
                                    }
                                       } >Continue to Book Appointment
                                    
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
     
    </>
  )
}

export default ExpProfile
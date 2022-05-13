import {React,useState,useEffect} from 'react'
import {Modal,ModalBody} from 'reactstrap'
import Footer from './Footer';
import Calendar from 'react-calendar'
import { useParams } from "react-router-dom"
import expextAction from "../../actions/expertlisting.action";
import 'react-calendar/dist/Calendar.css';
import NewsletterSubscribed from './NewsletterSubscribed';
import moment from "moment";
import { isDisabled } from '@testing-library/user-event/dist/utils';
import videopng from "../../img/video-call-icon.png";
import audiopng from "../../img/audio-call-icon.png";
import chatpng from "../../img/chat-icon.png";
import appointmentAction from '../../actions/appointment.action';

const ExpProfile = () => {
   // moment(currentTime).format("hh:mm"))
   const params = useParams();
   const [bookappointmentmodal,setbookappointmentmodal]=useState(false);
   const [scheduleappointmentmodal,setscheduleappointmentmodal]=useState(false);
   const [expert,setExpert]=useState(null);
   const [typeCall,setTypeCall]=useState(1);
   const [categorie,setCategorie]=useState("");
   const [practiceArea,setPracticeArea]=useState("");
   const [Duration,setDuration]=useState(null);
   const [question,SetQuestion]=useState("")
   const [startAppointmentTime,SetStartAppointmentTime]=useState(null)
   const [appointmentTime,SetAppointmentTime]=useState("")
   const [timeList,setTimeList]=useState([]);
   const [endAppointmentTime,SetEndAppointmentTime]=useState(null)
   const [timeSlotId,setTimeSlotId]=useState("");
   const [dateSlot,SetDateSlot]=useState(null) 

   
  const [appointmentType, setAppointmentType] = useState(null);
  const scrollToTop = () => {
   window.scrollTo({
     top: 10,
     behavior: "smooth",
   });
 };
  useEffect(() => {
   
   fetchExpert();
   scrollToTop();
   let date=new Date();
   date=moment(date).format('YYYY-MM-DD');
   SetDateSlot(date)
  },[]);
  useEffect(()=>{
     fetchTime();
  },[dateSlot,Duration])
 //moment().format('MMMM Do YYYY, h:mm:ss a');
 const setinterval1=(e)=>{

     let start=  moment(e.startAppointmentTime).format('hh:mm');
     let end=  moment(e.endAppointmentTime).format('hh:mm');
   //   console.log(start+"-"+end);
     return start+"-"+end
 }
 const fetchTime=()=>{
    console.log(Duration,dateSlot,"sdclkndcs")
   let id = params.id;

   if(!Duration&&!dateSlot){
      return ;
   }
   let payload={
      expertId:id,
      appointmentDate:dateSlot,
      duration:Duration
   }
   expextAction.getAvailableTimeForUser(payload,(err,res)=>{
      if(err){

      }else{
         console.log(res);
         setTimeList(res.data);

      }
   })

 }
   const Datehandel=(e)=>{
      // api hit 
     
      e=moment(e).format('YYYY-MM-DD');
      console.log(e,"date to selected")
      SetDateSlot(e);
      // fetchTime();

   }
   const onSelectTime=(start,end)=>{
      
      // e=moment(e).format('YYYY-MM-DD');
      // console.log(e,"date to selected")
      // console.log(e)
      if(1)
      {
      let localdate =dateSlot+' '+start; 
      console.log(localdate,"here is ");
      console.log(moment(localdate),'locaDate')
      console.log(moment.utc(moment(localdate)).format(),'start time')
      SetStartAppointmentTime(start);


      let afterSomeMinutes =dateSlot+' '+end; 
      console.log(afterSomeMinutes,end,"here is ");
      console.log(moment(afterSomeMinutes),'locaDate')
      console.log(moment.utc(moment(afterSomeMinutes)).format(),'end time')
      SetEndAppointmentTime(end);

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
      duration:Duration,
      timeSlotId:timeSlotId,
      appointmentTime:startAppointmentTime,
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
      alert(" Successfull appointment ")
      console.log(res,"here is resposnse in exprofile.js")
   }
})


}
const handlemodal=()=>{
   let id = params.id;
   let playload={
      expertId:id,
      question:question
   }
   appointmentAction.bookChatAppointment(playload,(err,res)=>{
      if(err){

      }else{
         alert("Successfull appointment call ")
         console.log(res,"here is resposnse in exprofile.js")
      }
   })
}
const newHandle=()=>{
   if(typeCall===3){
      setbookappointmentmodal(true);
      return
   }else{
      setscheduleappointmentmodal(true);
   }
}
const handlemodal1=()=>{
   
   if(startAppointmentTime==null||dateSlot==null){
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
                              <img src={videopng} className="img img-fluid" alt=""/>
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
                      typeCall == 1 ? "bg-dark text-white" : ""
                    }`} type="button "  onClick={e=>{
                     e.preventDefault();
                     setTypeCall(1)
                  }}>
                       
                       
                       <img src={videopng} className="img img-fluid" alt=""/>
                        Video Call</button>
                        </div>
                        <div>
                       <button className={`btn  ${typeCall == 2 ? "bg-dark text-white" : "" }`} type="button" onClick={e=>{
                     e.preventDefault();
                     setTypeCall(2)
                  }}>
                       
                       
                       <img src={audiopng} className="img img-fluid" alt=""/> Audio Call</button></div>
                    <div>
                       <button className={`btn  ${ typeCall == 3 ? "bg-dark text-white" : ""  }`} type="button" onClick={e=>{
                          e.preventDefault();
                         setTypeCall(3)
                          }}>
                       
                       
                       <img src={chatpng} className="img img-fluid" alt=""/> Chat</button></div>
                     </div>
                     <div className="continue-booking-btn">
                         <button className="btn" onClick={(e)=>{ e.preventDefault(); newHandle();
                           }
                           }
                             type="button" >Continue to Book Appointment  </button>
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
      <Modal className="authentication-modal modal-dialog modal-dialog-centered modal-xl"
         isOpen={
           scheduleappointmentmodal
            } 
             toggle={()=>{
                       setscheduleappointmentmodal(false); setbookappointmentmodal(false);}
                      } >
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

                                          <h1> Appointment Time</h1>
                                          <div className="col-lg-6">
                                             <div className="form-group">
                                                {/* <label for="">Select call Duration time</label> */}
                                                <select className="form-select " aria-label="example" onChange={e=>{
                                                   console.log(e.target.value);
                                                   setDuration(e.target.value);
                                                }}>
                                                   <option selected value={15}>15 Mintues</option>
                                                   <option value={30}>30 Mintues</option>
                                                   <option value={45}>45 Mintues</option>
                                                   <option value={60}>60 Mintues</option>
                                                </select>
                                             </div>
                                          </div>
                                             <div className="select-time-slot">
                                             
                                                <img src="./assets/img/time-slot.png" className="img img-fluid" alt=""/>
                                                <div className='row '>
                                                   {
                                                      timeList.length>0?timeList.map((e,index)=>{
                                                         return (
                                                            <div className='col-lg-6 btn-appointment1 '>
                                                        {e.avialble?<button className="btn btn-white bg-white btn-appointment"   onClick={(val)=>{
                                                            val.preventDefault();
                                                            onSelectTime(e.startAppointmentTime,e.endAppointmentTime)
                                                            setTimeSlotId(e._id);
                                                            alert(e._id,"selected time id")
                                                         }}>
                                                            {setinterval1(e)}
                                                            </button>:
                                                            <button className="btn btn-white bg-white btn-appointment" disabled>
                                                            {setinterval1(e)}
                                                            </button>
                                                            }
                                                         </div>)
                                                      }):""
                                                   }
                                                   
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
              <Modal className="authentication-modal modal-dialog modal-dialog-centered modal-xl"
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
                                 {/* <div className="book-appointment-box">
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
                                                   <option selected value={15}>15 Mintues</option>
                                                   <option value={30}>30 Mintues</option>
                                                   <option value={45}>45 Mintues</option>
                                                   <option value={60}>60 Mintues</option>
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
                                 </div> */}
                                 <div className="book-appointment-box">
                                    <h1>Add your details</h1>
                                    <div className="book-app-box">
                                       <div className="row">
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
                                       // fetchTime()
                                    }
                                       } >Request For Chat
                                    
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
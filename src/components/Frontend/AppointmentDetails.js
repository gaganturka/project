import {React,useState,useEffect,useContext} from 'react'
import { Modal, ModalBody, ModalFooter, } from "reactstrap";
import {Link,useNavigate} from 'react-router-dom'
import Sidebar from './Sidebaruser'
import {AuthContext} from '../../context/AuthContext';
import appointmentAction from '../../actions/appointment.action'
import moment from 'moment'
import ReactPaginate from 'react-paginate';
const AppointmentDetails = () => {
   const [sizePerPage,setSizePerPage]=useState(5);
   const [pages,setPages]=useState(5);
   const [currentPage,setCurrentPage]=useState(1);
   const [reschedulemodal,setreschedulemodal]=useState(false);
   const {isLoggedIn,setIsLoggedIn,loggedInBorhanUserInfo,setLoggedInBorhanUserInfo}=useContext(AuthContext);
    const [filterType,setFilterType]=useState("All");
    const [dummy,setDummy]=useState(0);
    const [appointmentList,setAppointmentList]=useState([]);
    const [rescheduleModalDetails,setRescheduleModalDetails]=useState();
   const history=useNavigate();
   useEffect(() => {
      if(isLoggedIn===true)
      {
         GetAppointments();
      }
      else{
       history('/')
      }
   }, [filterType,currentPage])
   const CancelAppointment = async (obj) => {
      let dataToSend={
        id:obj._id
      }
         appointmentAction.cancelAppointment(dataToSend,(err,res)=>{
           if(err)
           {
             console.log(err," appointments error")
           }else
           {
             console.log("successfully cancelled",res.data)
            }
       });
    }
    const RescheduleAppointment = async (obj) => {
      let dataToSend={
        id:obj._id
      }
         appointmentAction.rescheduleAppointment(dataToSend,(err,res)=>{
           if(err)
           {
             console.log(err,"reschedule appointments error")
           }else
           {
             console.log("successfully reschedule",res.data)
            }
       });
    }

       const handlePageClick = (data) => {
         let current = data.selected + 1;
         console.log(current, "currentpage");
         setCurrentPage(current);
       };
       const GetAppointments = async () => {
         let dataToSend={
            filterType:filterType, 
            limit: sizePerPage,
             page: currentPage,
         }
            appointmentAction.getAppointments(dataToSend,(err,res)=>{
              if(err){
                console.log(err," appointments error")
              }else{
                setAppointmentList(res.data.list);
                
                setPages(
                  parseInt(res.data.count % sizePerPage) == 0
                    ? parseInt(res.data.count / sizePerPage)
                    : parseInt(res.data.count / sizePerPage + 1)
                );
            setDummy(0);
                console.log(res.data," Apoointments are");
              }
            });
            
          };
         
  return (
     
    <>
      <section className="admin-wrapper">
         <Sidebar/>
         <div className="admin-content-wrapper">
            <div className="row">
               <div className="col-lg-12">
                  <div className="user-appoinment-details">
                     <div className="appointment-tabs">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                           <li className="nav-item" role="presentation">
                              <button className="nav-link active" id="pills-all-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all   "
                                 aria-selected="true" onClick={()=>{setFilterType("All")}}>All</button>
                           </li>
                           <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-upcoming-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-upcoming" type="button" role="tab" aria-controls="pills-upcoming"
                                 aria-selected="false" onClick={()=>{setFilterType("Upcoming")}}>Upcoming</button>
                           </li>
                           <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-reschedule-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-reschedule" type="button" role="tab"
                                 aria-controls="pills-reschedule" aria-selected="false" onClick={()=>{setFilterType("Reschedule")}}>Reschedule</button>
                           </li>
                           <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-completed-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-completed" type="button" role="tab" aria-controls="pills-completed"
                                 aria-selected="false" onClick={()=>{setFilterType("Completed")}}>Completed</button>
                           </li>
                           <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-cancelled-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-cancelled" type="button" role="tab" aria-controls="pills-cancelled"
                                 aria-selected="false" onClick={()=>{setFilterType("Cancelled")}}>Cancelled</button>
                           </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                           <div className="tab-pane fade show active " id="pills-all" role="tabpanel"
                              aria-labelledby="pills-all-tab">
                              <div className="common-table-wrapper">
                                 <div className="table-responsive">
                                    <table className="table">
                                       <tbody>
                                       {console.log("appoii",appointmentList)}
                                          {
                                           appointmentList.length>0 && appointmentList.map((obj,index)=>{
                                              return(
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="./assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                   <div>
                                                      <h5>{obj?.expertId?.userId?.firstName}</h5>
                                                      <p>{obj?.expertId?.practiceArea[0]?.name}</p>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <h6>{moment(obj.appointmentDate).format("MMM Do YY")}</h6>
                                                <h6>{obj.appointmentTime}</h6>
                                             </td>
                                             <td>
                                                <h6>{obj.appointmentType}</h6>
                                                <h6>{moment(obj.startAppointmentTime).format("MMM Do YY h:mm:ss a")}</h6>
                                             </td>
                                             <td>
                                                <div className="table-btn-group">
                                                   <button className="btn" type="button" onClick={()=>{CancelAppointment(obj)}} >Cancel</button>
                                                   <button 
                                                   // data-bs-target="#appointmentDetailsModal"  data-bs-dismiss="modal" data-bs-toggle="modal" 
                                                   className="btn" type="button" onClick={()=>{setreschedulemodal(true);setRescheduleModalDetails(obj)}}>Reschedule</button>
                                                </div>
                                             </td>
                                          </tr>)
                                           })
                                          }
                                          
                                       </tbody>
                                    </table>
                                    
      <ReactPaginate
                          previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={"..."}
                          pageCount={pages}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={3}
                          onPageChange={handlePageClick}
                          containerClassName={
                            "pagination justify-content-center"
                          }
                          forcePage={currentPage - 1}
                          pageClassName={"page-item"}
                          pageLinkClassName={"page-link"}
                          previousClassName={"page-item"}
                          previousLinkClassName={"page-link"}
                          nextClassName={"page-item"}
                          nextLinkClassName={"page-link"}
                          breakClassName={"page-item"}
                          breakLinkClassName={"page-link"}
                          activeClassName={"active"}
                        />
                                 </div>
                              </div>
                           </div>
                          
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>


      
      {/* <!-- appointment details Modal --> */}
      <div className="modal fade authentication-modal" id="appointmentDetailsModal" tabindex="-1" aria-labelledby="appointmentDetailsModal" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
               <div className="modal-body">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-12">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="appointment-deatils-box">
                                    <h1>Appointment details</h1>
                                    <div className="row">
                                       <div className="col-lg-12">
                                          <div className="appointment-details-modal-wrp">
                                             <div className="app-user-wrp">
                                                <div>
                                                   <img src="./assets/img/megan-smith.png" alt="" />
                                                </div>
                                                <div>
                                                   <h4>Meghan Smith</h4>
                                                   <h6>Legal Expert</h6>
                                                </div>
                                             </div>
                                             <div className="">
                                                <p>Date</p>
                                                <h3>September 10th</h3>
                                             </div>
                                             <div className="">
                                                <p>Time</p>
                                                <h3>03:30 PM</h3>
                                             </div>
                                             <div className="">
                                                <p>Mode</p>
                                                <h3>Video call</h3>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="row mb-4">
                                       <div className="col-lg-7">
                                          <div className="app-agenda-box">
                                             <Link to="javascript:;">Edit</Link>
                                             <h3>Appointment Agenda</h3>
                                             <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum pas</p>
                                          </div>
                                       </div>
                                       <div className="col-lg-5">
                                          <div className="app-agenda-box">
                                             <h3>Available Balance</h3>
                                             <h2>04 h 30 min</h2>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="modal-footer-btn-group">
                                       <button className="btn" data-bs-dismiss="modal" type="button">Cancel</button>
                                       <button className="btn" type="button">Reschedule</button>
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
      {reschedulemodal?<Modal isOpen={reschedulemodal}
                                                   toggle={()=>{setreschedulemodal(false)}}
                                                         className="authentication-modal modal-dialog modal-dialog-centered modal-xl"
                                                         id="appointmentDetailsModal"         
                                          >
                                           <ModalBody >
                                           
               <button type="button" className="btn-close" onClick={()=>{setreschedulemodal(false)}}></button>
             
                  <div className="auth-modal-wrp">
                     <div className="row">
                        <div className="col-lg-12">
                           <div className="auth-modal-content">
                              <div className="w-100">
                                 <div className="appointment-deatils-box">
                                    <h1>Appointment details</h1>
                                    <div className="row">
                                       <div className="col-lg-12">
                                          <div className="appointment-details-modal-wrp">
                                             <div className="app-user-wrp">
                                                <div>
                                                   <img src="./assets/img/megan-smith.png" alt="" />
                                                </div>
                                                <div>
                                                   <h4>{rescheduleModalDetails?.expertId?.userId?.firstName}</h4>
                                                   <h6>{rescheduleModalDetails?.expertId?.practiceArea[0].name}</h6>
                                                </div>
                                             </div>
                                             <div className="">
                                                <p>Date</p>
                                                <h3>September 10th</h3>
                                             </div>
                                             <div className="">
                                                <p>Time</p>
                                                <h3>03:30 PM</h3>
                                             </div>
                                             <div className="">
                                                <p>Mode</p>
                                                <h3>Video call</h3>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="row mb-4">
                                       <div className="col-lg-7">
                                          <div className="app-agenda-box">
                                             <Link to="javascript:;">Edit</Link>
                                             <h3>Appointment Agenda</h3>
                                             <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum pas</p>
                                          </div>
                                       </div>
                                       <div className="col-lg-5">
                                          <div className="app-agenda-box">
                                             <h3>Available Balance</h3>
                                             <h2>04 h 30 min</h2>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="modal-footer-btn-group">
                                       <button className="btn" data-bs-dismiss="modal" type="button" onClick={()=>{setreschedulemodal(false);
                                       setTimeout(()=>{setreschedulemodal(false)},100)}}>Cancel</button>
                                       <button className="btn" type="button" onClick={()=>{setreschedulemodal(false);
                                       RescheduleAppointment(rescheduleModalDetails)
                                       setTimeout(()=>{setreschedulemodal(false)},100)}}>Reschedule</button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               
            </ModalBody>
                                          </Modal>:""}
    </>
  )
}

export default AppointmentDetails
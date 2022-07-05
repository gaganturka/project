import {React,useState,useEffect,useContext} from 'react'
import { Modal, ModalBody, ModalFooter, } from "reactstrap";
import {Link,useNavigate} from 'react-router-dom'
import Sidebar from './Sidebaruser'
import {AuthContext} from '../../context/AuthContext';
import appointmentAction from '../../actions/appointment.action'
import moment from 'moment'
import ReactPaginate from 'react-paginate';
const ChatSupport = () => {
   const [sizePerPage,setSizePerPage]=useState(5);
   const [pages,setPages]=useState(5);
   const [currentPage,setCurrentPage]=useState(1);
   const [reschedulemodal,setreschedulemodal]=useState(false);
   const {isLoggedIn,setIsLoggedIn,loggedInBorhanUserInfo,setLoggedInBorhanUserInfo}=useContext(AuthContext);
    const [filterType,setFilterType]=useState("All");
    const [dummy,setDummy]=useState(0);
    const [appointmentList,setAppointmentList]=useState([]);
    const [rescheduleModalDetails,setRescheduleModalDetails]=useState();
    const [list,setList]=useState([]);

   const history=useNavigate();
   useEffect(() => {
      if(isLoggedIn===true)
      {
         GetAppointments();
      }
      else{
       history('/')
      }
   }, [filterType,currentPage,dummy])
   useEffect(()=>{
    fetch();
   },[])
  const fetch=()=>{
    appointmentAction.getChatAppointment("",(err,res)=>{
      if(err){

      }else{
        console.log(res,"here is ")
        let data=res.data;
        console.log(data,"here is data")
        setAppointmentList(data)
      }
    })
   }

       const handlePageClick = (data) => {
         let current = data.selected + 1;
         console.log(current, "currentpage");
         setCurrentPage(current);
       };
       const GetAppointments = async () => {
        //  let dataToSend={
        //     filterType:filterType, 
        //     limit: sizePerPage,
        //      page: currentPage,
        //  }
        //     appointmentAction.getAppointments(dataToSend,(err,res)=>{
        //       if(err){
        //         console.log(err," appointments error")
        //       }else{
        //         setAppointmentList(res.data.list);
                
        //         setPages(
        //           parseInt(res.data.count % sizePerPage) == 0
        //             ? parseInt(res.data.count / sizePerPage)
        //             : parseInt(res.data.count / sizePerPage + 1)
        //         );
        //     setDummy(0);
        //         console.log(res.data," Apoointments are");
        //       }
        //     });
            
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
                         <h1>Expert Chat Support</h1>
                        {/* <ul className="nav nav-pills" id="pills-tab" role="tablist">
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
                        </ul> */}
                        <div className="tab-content" id="pills-tabContent">
                           <div className="tab-pane fade show active " id="pills-all" role="tabpanel"
                              aria-labelledby="pills-all-tab">
                              <div className="common-table-wrapper">
                                 <div className="table-responsive">
                                    <table className="table">
                                       <tbody>
                                          {
                                           appointmentList&& appointmentList.map((obj,index)=>{
                                              return(
                                          <tr>
                                             <td>
                                                <div className="table-user">
                                                   <div> 
                                                      <img src="/assets/img/megan-smith.png" className="" alt="" />
                                                   </div>
                                                                <div>
                                                      <h5>{obj.expertData.firstName}</h5>
                                                      <p> <p>Construction Legal </p></p>

                                                      {/* <p>{obj?.expertId?.practiceArea[0]?.name}  <p>Construction Legal </p></p> */}
                                                   </div>
                                                </div>
                                             </td>
                                            
                                          
                                             <td>
                                                <div className="table-btn-group">
                                                <button
                                              className="chatroom"
                                              type="button"
                                              onClick={events=>{
                                                history(`/room/${obj._id}`)
                                              }}
                                            >
                                              <i className="fa fa-angle-right"></i>
                                            </button>                                                </div>
                                             </td>
                                          </tr>)
                                           })
                                          }
                                             <tr>
                                        <td className='td-disable'>
                                          <div className="table-user">
                                            <div>
                                              <img
                                                src="/assets/img/megan-smith.png"
                                                className=""
                                                alt=""
                                              />
                                            </div>
                                            <div>
                                              <h5>Meghan Smiath</h5>
                                              <p>Construction Legal </p>
                                            </div>
                                          </div>
                                        </td>

                                        <td>
                                          <div className="table-btn-group">
                                            <label>Requested</label>
                                          </div>
                                        </td>
                                      </tr>
                                          
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


      
     

    </>
  )
}

export default ChatSupport
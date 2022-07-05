import {React,useEffect,useState} from 'react'

import {Link,useNavigate} from 'react-router-dom'
// import { Toast } from 'reactstrap';
import expertlistingAction from '../../actions/expertlisting.action';
import Sidebar from './Sidebaruser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import categoriesAction from '../../actions/categories.action';

const FavExp =()=>{
   const history=useNavigate();
   const [FavExperts,setFavExperts]=useState([]);
   const [getPracticeArea,setGetPracticeArea]=useState([]);
   const getFavouriteExperts= ()=>{

      expertlistingAction.getUsersFavoriteExperts( (err, res) => {
         if (err) {
         //   alert("")err
         toast('something went wrong');
         } else {
           
        setFavExperts(res.data);
      //   console.log('data of fav',res.data)
          }
       })
   }
   useEffect(() => {
      if(localStorage.getItem('token'))
      {
         getFavouriteExperts();
         fetchAllPracticeArea();
      }
      else{
       history('/')
      }
   }, [])
   const fetchAllPracticeArea = async () => {
      categoriesAction.fetchAllPracticeArea((err, res) => {
        if (err) {
  
        } else {
          console.log(res.data, " daata ");
          setGetPracticeArea(res.data);
        }
      });
  
    };
  
    return(
        <>
              <section className="admin-wrapper">
       <Sidebar/>
         <div className="admin-content-wrapper">
            <div className="row">

               {FavExperts.map((obj,index)=>{
                  
                  return(
                     <div className="col-lg-3">
                  <div className="exp-listing-box">
                     <div className="exp-listing-img">
                        <img src="/assets/img/exp-img-1.png" className="img img-fluid" alt="" />
                     </div>
                     <div className="exp-listing-content">
                        <h1>{obj?.expertUserId?.firstName}</h1>
                        <h4>{getPracticeArea.length>0&&getPracticeArea.map((object,index)=>{
                           if(object?._id===obj?.expertId?.practiceArea[0])
                           {
                              return(<>{object.name}</>)
                           }
                        })}</h4>
                        <Link to={`/expprofile/${obj.expertId._id}`}><button className="btn mt-2" type="button">Book Appointment</button></Link>
                     </div>
                  </div>
               </div>
                  )
               })
               }
               


            </div>
         </div>
      </section>
      <ToastContainer/>
        </>
    );
}

export default FavExp
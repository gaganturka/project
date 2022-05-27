import {React,useState,useEffect, useContext} from 'react'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import config from '../../config/configg';
import expListingAction from '../../actions/expertlisting.action'
import {Link} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import StarRatings from 'react-star-ratings'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import categoriesAction from "../../actions/categories.action";
import FetchCategoriesList from './FetchCategoriesList';
import FetchPracticeAreaList from './FetchPracticeAreaList';
import { CategoryAndPracticeContext } from '../../context/CategoryAndPracticeContext';
import {useLocation} from "react-router-dom";
import NewsletterSubscribed from './NewsletterSubscribed';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ExpListing = () => {
   const {isAuthModalOpen,setIsAuthModalOpen,isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
   const search = useLocation().search;
   const selectedPractice = new URLSearchParams(search).get('selectedPractice');
   const selectedCategories = new URLSearchParams(search).get('selectedCategories');
   const history=useNavigate();
   const [selectedExpertSorting,setSelectedExpertSorting]=useState("1");
   const [selectedPracticeArea, setSelectedPracticeArea] = useState(selectedPractice===null?"":selectedPractice);
   const [selectedCategory, setSelectedCategory] = useState(selectedCategories===null?"":selectedCategories);
   const [getCategories,setGetCategories]=useState([]);
   const [getPracticeArea,setGetPracticeArea]=useState([]);
   const [dummy,setDummy]=useState(false);
   const [expertList,setExpertList]=useState([]);
   const [premiumExpertList,setPremiumExpertList]=useState([]);
   const [currentPage,setCurrentPage]=useState(1);
   const [pages,setPages]=useState(10);
   const [sizePerPage,setSizePerPage]=useState(8);
   const [countExperts,setCountExperts]=useState(0);
   const fetchAllCategories = async () => {
      const response = await fetch(
        `${config.BACKEND_URL}/admin/getCategoriesData`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const jsonnn = await response.json();
      console.log("satyamtomar", jsonnn);
    setGetCategories(jsonnn.data);
    setDummy(true)
      console.log("llllllllllll", getCategories);
    };



    useEffect(() => {
      fetchAllCategories();
      fetchAllPracticeArea();
      fetchAllOnlineFilteredExperts(currentPage);
      fetchAllOnlinePremiumExperts();
      setDummy(1);
    }, [selectedCategory,selectedPracticeArea,selectedExpertSorting,currentPage])
   

    const fetchAllPracticeArea = async () => {
      categoriesAction.fetchAllPracticeArea((err,res)=>{
        if(err){
  
        }else{
          console.log(res.data," daata ");
          setGetPracticeArea(res.data);
        }
      });
     
    };
   
    const fetchAllOnlineFilteredExperts = async (current) => {
   let dataToSend={
      limit:sizePerPage,
      page:current,
      category:selectedCategory,
      practiceArea:selectedPracticeArea,
      sortBy:selectedExpertSorting,
   }
      expListingAction.fetchAllOnlineFilteredExperts(dataToSend,(err,res)=>{
        if(err){
          console.log(err," fetchAllFilteredExpertsOnline error")
        }else{
          setExpertList(res.data.list);
          setCountExperts(res.data.count)
          setPages(
            parseInt(res.data.count % sizePerPage) == 0
              ? parseInt(res.data.count / sizePerPage)
              : parseInt(res.data.count / sizePerPage + 1)
          );
      setDummy(0);
          console.log(res.data," online experts filtered");
        }
      });
      
    };

   
    const fetchAllOnlinePremiumExperts = async () => {
      let dataToSend={
         limit:sizePerPage,
         page:currentPage,
         category:selectedCategory,
         practiceArea:selectedPracticeArea,
         sortBy:selectedExpertSorting,
      }
         expListingAction.fetchAllOnlinePremiumExperts(dataToSend,(err,res)=>{
            console.log(err,"nnds")
           if(err){
             console.log(err," fetchAllPremiumExpertsOnline error")
           }else{
              console.log(res.data.list,"dcjknsdjds")
             setPremiumExpertList(res.data.list);
             console.log("online premium exp",res.data.list)
             setDummy(0);
           }
         });
         
       };



    const handlePageClick = (data) => {
      let current = data.selected + 1;
      console.log(current, "currentpage");
      setCurrentPage(current);

      fetchAllOnlinePremiumExperts(current)
      // if (filterType == 0) fetchAllExperts(current, searchedTerm);
      // else if (filterType == 1) onClickShowExperts(current, searchedTerm);
      // else if (filterType == 2) onClickShowFreelancers(current, searchedTerm);
    };

    const handleBookAppointment =(obj)=>{
      
      if(isLoggedIn===true)
      {
         history(`/expprofile/${obj._id}`)
      }
      else
      {
         setIsAuthModalOpen(true);
      }
    }

    const handleFavourite=(obj)=>{
       let dataToSend={
          expertId:obj._id,
          expertUserId:obj.userId._id,
       };
      if(isLoggedIn===true)
      {
            if(obj.isFavorite===true)
            {
               dataToSend.favourite=2;
            }
            else
            {
               dataToSend.favourite=1;
            }
         expListingAction.setExpertFavorite(dataToSend,(err,res)=>{
            if(err)
            {
               console.log(err,'handleFavourite error')
            }
            else{
               let payload={
                  limit:sizePerPage,
                  page:currentPage,
                  category:selectedCategory,
                  practiceArea:selectedPracticeArea,
                  sortBy:selectedExpertSorting,
               }
                  expListingAction.fetchAllOnlineFilteredExperts(payload,(err,res)=>{
                    if(err){
                      console.log(err," fetchAllFilteredExpertsOnline error")
                    }else{
                       if(obj.isFavorite)
                       {
                          toast('Expert removed from favorite');
                       }
                       else
                       {
                          toast('Expert added to favorite');
                       }
                      setExpertList(res.data.list);
                      setCountExperts(res.data.count)
                      setPages(
                        parseInt(res.data.count % sizePerPage) == 0
                          ? parseInt(res.data.count / sizePerPage)
                          : parseInt(res.data.count / sizePerPage + 1)
                      );
                  setDummy(0);
                      console.log(res.data," online experts filtered");
                    }
                  });
              
            }
         })
      }
      else{
         setIsAuthModalOpen(true)
      }
    }
  return (

   <>
      <ToastContainer/>
      
      <section className="breadcrumb-section">
         <div className="container">
            <div className="row">
               <div className="col-lg-7">
                  <div className="breadcrumb-content">
                     <h1>Experts</h1>
                     <ul>
                        <li><Link to="/">Home</Link> <span><i className="fa fa-angle-right"></i></span></li>
                        {console.log("kya hai bhai is category mai",selectedCategories)}
                        {(selectedCategories===null || selectedCategories==="") ?"":<li><Link to="/">Categories</Link> <span><i className="fa fa-angle-right"></i></span></li>}
                        {(selectedPractice===null || selectedPractice==="") ?"":<li><Link to="/">Sub Category</Link> <span><i className="fa fa-angle-right"></i></span></li>}
                        
                        <li className="active"><Link to="/expertlisting">Expert Listing</Link></li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="breadcrumb-search">
                     <div className="position-relative">
                        <input type="text" className="form-control" placeholder="Search any....."/>
                        <button className="btn"><img src="/assets/img/search-icon.png" className="img img-fluid" alt=""/></button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="our-experts-wrp pre-exp-listing">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="common-head">
                     <h3>Premium expert</h3>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-12">
               <OwlCarousel
                 className="health-owl"
                 items={10}
                 loop={true}
                 rewind={true}
                 // nav={true}
                 margin={10}
                 // rewind={true}
                 responsive={{
                   0: {
                     items: 1,
                     nav: true,
                   },
                   600: {
                     items: 3,
                     nav: true,
                   },
                   1000: {
                     items: 5,
                   },
                 }}
                >
                      
                  {premiumExpertList.length>0 &&premiumExpertList.map((obj,index)=>{
                     return(
                        <div className="item">
                        <div className="expert-box-wrp blue-bg">
                           <div className="position-relative">
                              <img src={`${obj?.userId?.profilePic===""?"/assets/img/expert-thumb.png":obj?.userId?.profilePic}`} className="img img-fluid" alt=""/>
                             
                           </div>
                           <div className="p-3">
                              <h5>{obj?.userId?.firstName}</h5>
                              <h6>{obj?.practiceArea[0]?.name}</h6>
                              <Link to={`/expprofile/${obj._id}`}><button className="btn">View Profile</button></Link>
                           </div>
                        </div>
                     </div>
                     )
                     })
                  } 
                </OwlCarousel>
                 
               </div>
            </div>
         </div>
      </section>
      <section className="pratice-area-wrp">
         <div className="container">
            <div className="row">

               <div className="col-lg-12">
               <OwlCarousel
                  className="health-owl pratice-area-owl"
                  items={10}
                  loop={true}
                  rewind={true}
                  // nav={true}
                  margin={10}
                  // rewind={true}
                  responsive={{
                    0: {
                      items: 1,
                      nav: true,
                    },
                    600: {
                      items: 3,
                      nav: true,
                    },
                    1000: {
                      items: 5,
                    },
                  }}
                >
                {

                   getCategories.length>0 &&
                            getCategories.map((obj, index) => {
                              return (
                                 <div className="item" key={index}>
                        <div className="pratice-area-box">
                           <div>
                           <img src={`${obj?.url?.original}`} className="img img-fluid" alt=""/>
                        </div>
                           <div>
                              <h4>{obj?.name}  </h4>
                           </div>
                        </div>
                     </div>
                              );
                            })}
                
                
               </OwlCarousel>
                    
                  
               </div>
            </div>
         </div>
      </section>
      <section className="pratice-area-listing">
         <div className="container">
            <div className="filter-listing">
               <div className="row">
                  <div className="col-lg-4">
                     <h3>Filter your search</h3>
                  </div>
                  <div className="col-lg-8">
                     <ul>
                        {/* <li>
                           <select className="form-select">
                              <option selected>Top Rated</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select>
                        </li> */}
                        <li>
                           {/* <select className="form-select">
                              <option selected value={0}>Filter Category</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select> */}
                           <FetchCategoriesList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} getCategories={getCategories} setGetCategories={setGetCategories} />
                        </li>
                        <li>
                           {/* <select className="form-select">
                              <option selected>Filter Name</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select> */}
                           <FetchPracticeAreaList getPracticeArea={getPracticeArea} setGetPracticeArea={setGetPracticeArea} setSelectedPracticeArea={setSelectedPracticeArea} selectedPracticeArea={selectedPracticeArea} />
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="exp-listing-con">
               <div className="exp-listing-con-filter">
                  <div className="row">
                     <div className="col-lg-6">
                        <p>Results - <b>{countExperts}</b></p>
                     </div>
                     <div className="col-lg-6">
                        <div className="rec-filter-select">
                           <span>Sort by  </span>  
                           <select className="form-select" value={selectedExpertSorting} onChange={(e)=>{setSelectedExpertSorting(e.target.value);}}>
                              <option value="1">Rating</option>
                              <option value="2">Hours of Sessions Done</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="exp-listing-wrp">
                  <div className="row">
                      {expertList && expertList.map((obj,index)=>{
                         return(<div className="col-lg-3">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src={`${obj?.userId?.profilePic ===''?"/assets/img/exp-img-1.png":obj?.userId?.profilePic}`} className="img img-fluid" alt=""/>
                              <span className="star ">
                                 <span className={`star-icon fa fa-star ${obj.isFavorite?'text-warning':''}`} onClick={()=>handleFavourite(obj)}></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>{obj?.userId?.firstName} {obj?.userId?.lastName}</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="/assets/img/chat-btn-icon.png" alt=""/></div>
                                 </div>
                                </div>
                              <h4>{obj?.practiceArea[0]?.name}</h4>
                              <h4>{obj?.experience} Year Experience</h4>
                              <div className="star-rating-text">
                                 <h4>4.2</h4>
                                 <div className="star-rating">
                                    {/* <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span> */}
                                    <StarRatings
                                     rating={ obj?.rating?.avgRating}
                                     starRatedColor={"yellow"}
                                     numberOfStars={ 5 }
                                     starDimension="20px"
                                     starSpacing="2px"
                           />
                               {"     "}
                               {obj?.rating?.avgRating}
                                 </div>
                              </div>
                              <p>{obj.bio}</p>
                              <ul>
                                 <li>
                                    <h3><img src="/assets/img/clock-icon.png" className="img img-fluid" alt=""/> {obj.noOfHoursOfSessionsDone} h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="/assets/img/eye-icon.png" className="img img-fluid" alt="" /> {obj.noOfSessionsDone}</h3>
                                 </li>
                              </ul>
                              
                              {/* <Link to={`/expprofile/${obj._id}`}> */}
                                 <button className="btn" type="button" onClick={()=>handleBookAppointment(obj)} >Book Appointment</button>
                                 {/* </Link> */}
                           </div>
                        </div>
                     </div>)
                      })
                     }
                     
                  </div>
               </div>
               {/* <div className="common-pagination">
                  <div>
                     <ul>
                        <li><Link to="javascript:;"><i className="fa fa-angle-left"></i></Link></li>
                        <li className="active"><Link to="javascript:;">1</Link></li>
                        <li><Link to="javascript:;">2</Link></li>
                        <li><Link to="javascript:;">3</Link></li>
                        <li><Link to="javascript:;">...</Link></li>
                        <li><Link to="javascript:;">7</Link></li>
                        <li><Link to="javascript:;"><i className="fa fa-angle-right"></i></Link></li>
                     </ul>
                  </div>
               </div> */}
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
                          pageClassName={"page-item "}
                          pageLinkClassName={"page-link "}
                          previousClassName={"page-item "}
                          previousLinkClassName={"page-link "}
                          nextClassName={"page-item "}
                          nextLinkClassName={"page-link "}
                          breakClassName={"page-item "}
                          breakLinkClassName={"page-link "}
                          activeClassName={"active "}
                        />
            </div>
         </div>
      </section>
     
      {/* <section className="newsletter-wrp">
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
      </section> */}
      <NewsletterSubscribed/>
      <Footer/>

   </>
  )
}

export default ExpListing
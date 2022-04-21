import {React,useState,useEffect} from 'react'
import Footer from './Footer'
import {Link } from 'react-router-dom'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import config from  '../../config/configg';
import expertlistingAction from '../../actions/expertlisting.action';
import FetchCategoriesList from './FetchCategoriesList';
import FetchPracticeAreaList from './FetchPracticeAreaList';
import ReactPaginate from 'react-paginate'
import StarRatings from 'react-star-ratings';
import categoriesAction from '../../actions/categories.action';
const PremiumExpert = () => {
    const [getCategories,setGetCategories]=useState([]);
   const [dummy,setDummy]=useState(false);
   const [expertList,setExpertList]=useState([]);
   const [currentPage,setCurrentPage]=useState(1);
   const [pages,setPages]=useState(10);
   const [sizePerPage,setSizePerPage]=useState(8);
   const [countExperts,setCountExperts]=useState(0);
   const [selectedExpertSorting,setSelectedExpertSorting]=useState("1");
   const [selectedPracticeArea, setSelectedPracticeArea] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("");
   const [getPracticeArea,setGetPracticeArea]=useState([]);
  

   const fetchAllPracticeArea = async () => {
      categoriesAction.fetchAllPracticeArea((err,res)=>{
        if(err){
  
        }else{
          console.log(res.data," daata ");
          setGetPracticeArea(res.data);
        }
      });
     
    };
   
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
      // console.log("satyamtomar", jsonnn);
    setGetCategories(jsonnn.data);
    setDummy(true)
    
      // console.log("llllllllllll", getCategories);
    };
    useEffect(() => {
      fetchAllCategories();
      fetchAllPracticeArea();
      setDummy(false)
      // setTimeout(()=>{
      //   setDummy(false)
      // },500)
      fetchAllOnlineFilteredExperts();
       }, [selectedCategory,selectedPracticeArea,selectedExpertSorting])
   
    const fetchAllOnlineFilteredExperts = async () => {
      let dataToSend={
         limit:sizePerPage,
         page:currentPage,
         category:selectedCategory,
         practiceArea:selectedPracticeArea,
         sortBy:selectedExpertSorting,
      }
         expertlistingAction.fetchAllOnlineFilteredPremiumExperts(dataToSend,(err,res)=>{
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
       const handlePageClick = (data) => {
         let current = data.selected + 1;
         console.log(current, "currentpage");
         setCurrentPage(current);
         // if (filterType == 0) fetchAllExperts(current, searchedTerm);
         // else if (filterType == 1) onClickShowExperts(current, searchedTerm);
         // else if (filterType == 2) onClickShowFreelancers(current, searchedTerm);
       };
  return (
      <>
      {
         
      }
      <section class="breadcrumb-section p-5">
         <div class="container">
            <div class="row">
               <div class="col-lg-7">
                  <div class="breadcrumb-content">
                     <h1>Our Premium Expert</h1>
                  </div>
               </div>
               <div class="col-lg-5">
                  <div class="breadcrumb-search">
                     <div class="position-relative">
                        <input type="text" class="form-control" placeholder="Search any....."/>
                        <button class="btn"><img src="./assets/img/search-icon.png" class="img img-fluid" alt="" /></button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section class="pratice-area-wrp">
         <div class="container">
            <div class="row">
                <h3>Practice Area</h3>
               <div class="col-lg-12 mt-3">
                  <div class="owl-carousel owl-theme pratice-area-owl d-block">
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

getPracticeArea.length>0 &&
         getPracticeArea.map((obj, index) => {
            console.log("obj",obj)
           return (
              <div className="item" key={index}>
     <div className="pratice-area-box">
        <div>
           <img src={`${obj.url.original}`} className="img img-fluid" alt=""/>
        </div>
        <div>
           <h4>{obj.name}  </h4>
        </div>
     </div>
  </div>
           );
         })}

 
                     </OwlCarousel>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section class="pratice-area-listing">
         <div class="container">
            <div class="filter-listing">
               <div class="row">
                  <div class="col-lg-4">
                     <h3>Filter your search</h3>
                  </div>
                  <div class="col-lg-8">
                     <ul>
                        <li>
                           {/* <select class="form-select">
                              <option selected>Top Rated</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select> */}
                           <FetchCategoriesList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} getCategories={getCategories} setGetCategories={setGetCategories} />
              
                        </li>
                        <li>
                           {/* <select class="form-select">
                              <option selected>Filter Name</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select> */}
                           <FetchPracticeAreaList getPracticeArea={getPracticeArea} setGetPracticeArea={setGetPracticeArea} setSelectedPracticeArea={setSelectedPracticeArea} selectedPracticeArea={selectedPracticeArea} />
                       
                        </li>
                        <li>
                           {/* <select class="form-select">
                              <option selected>Filter Name</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>0
                              <option value="3">Three</option>
                           </select> */}
                           <select className="form-select" value={selectedExpertSorting} onChange={(e)=>{setSelectedExpertSorting(e.target.value);}}>
                              <option value="1">Sort By: Rating</option>
                              <option value="2">Sort By: Hours of Sessions Done</option>
                           </select>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div class="exp-listing-con">
               <div class="exp-listing-con-filter">
                
               </div>
               <div class="exp-listing-wrp">
                <div class="row">
                   {/* <div class="col-lg-4 p-4">
                      <div class="exp-listing-box">
                         <div class="exp-listing-img">
                            <img src="./assets/img/exp-img-1.png" class="img img-fluid" alt="" />
                            <span class="star">
                                
                             </span>
                         </div>
                         <div class="exp-listing-content">
                            <div class="row">
                               <div class="col-12">
                                  <h1>Heather Nikolaus</h1>
                               </div>
                              </div>
                            <h4>Business & Finance Expert</h4>
                            <h4>7+ Year Experience</h4>
                            <div class="star-rating-text">
                               <h4>4.2</h4>
                               <div class="star-rating">
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                               </div>
                            </div>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                            <ul>
                               <li>
                                  <h3><img src="./assets/img/clock-icon.png" class="img img-fluid" alt="" /> 230 h</h3>
                               </li>
                               <li>
                                  <h3><img src="./assets/img/eye-icon.png" class="img img-fluid" alt="" /> 1280</h3>
                               </li>
                            </ul>
                            <Link to="/expprofile"><button class="btn" type="button">Book Appointment</button></Link>
                         </div>
                      </div>
                   </div> */}
                  
                   {expertList && expertList.map((obj,index)=>{
                         return(<div className="col-lg-4 p-4">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src={`${obj?.userId?.profilePic ===''?"./assets/img/exp-img-1.png":obj?.userId?.profilePic}`} className="img img-fluid" alt=""/>
                              <span className="star">
                                 <span className="star-icon fa fa-star"></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>{obj?.userId?.firstName} {obj?.userId?.lastName}</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="./assets/img/chat-btn-icon.png" alt=""/></div>
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
                                    <h3><img src="./assets/img/clock-icon.png" className="img img-fluid" alt=""/> {obj.noOfHoursOfSessionsDone} h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="./assets/img/eye-icon.png" className="img img-fluid" alt="" /> {obj.noOfSessionsDone}</h3>
                                 </li>
                              </ul>
                              <Link to="/expprofile"><button className="btn" type="button">Book Appointment</button></Link>
                           </div>
                        </div>
                     </div>)
                      })
                     }
                  
           
                </div>
             </div>
               {/* <div class="common-pagination">
                  <div>
                     <ul>
                        <li><a href="javascript:;"><i class="fa fa-angle-left"></i></a></li>
                        <li class="active"><a href="javascript:;">1</a></li>
                        <li><a href="javascript:;">2</a></li>
                        <li><a href="javascript:;">3</a></li>
                        <li><a href="javascript:;">...</a></li>
                        <li><a href="javascript:;">7</a></li>
                        <li><a href="javascript:;"><i class="fa fa-angle-right"></i></a></li>
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
      </section>
     
      <section class="newsletter-wrp">
         <div class="container">
            <div class="row">
               <div class="col-lg-6">
                  <div class="newsletter-feild-box">
                     <form>
                        <div class="position-relative">
                           <input type="email" class="form-control" placeholder="Enter your email address....."/>
                           <button class="btn" type="submit">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
               <div class="col-lg-6">
                  <div class="newsletter-content">
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
      </>
  )
}

export default PremiumExpert
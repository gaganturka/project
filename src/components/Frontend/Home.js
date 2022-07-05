import { React, useState, useRef, useEffect, useContext } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import homeAction from "../../actions/home.action";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import StarRatings from "react-star-ratings";
import categoriesAction from "../../actions/categories.action";
import expListingAction from '../../actions/expertlisting.action.js'
import FetchCategoriesList from "./FetchCategoriesList";
import useComponentVisible from "./useComponentVisible";
import { CategoryAndPracticeContext } from "../../context/CategoryAndPracticeContext";
import _ from 'lodash';
import NewsletterSubscribed from "./NewsletterSubscribed";
const Home = () => {
  const [legalPracticeArea,setLegalPracticeArea]=useState([]);
  const [dummy, setDummy] = useState(0);
  const [expertsOnline, setExpertsOnline] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [getPracticeArea, setGetPracticeArea] = useState([]);
  const [filteredPracticeArea, setFilteredPracticeArea] = useState([]);
  const [topExpertsList,setTopExpertsList]=useState([]);
  // const [selectedCategories, setSelectedCategories]=useState("");
 const [testimonies,setTestimonies]=useState([]);
   // const [selectedPractice, setSelectedPractice]=useState("");
  const { ref, isComponentVisible } = useComponentVisible(false);
  const {
    selectedCategories,
    setSelectedCategories,
    selectedPractice,
    setSelectedPractice,
  } = useContext(CategoryAndPracticeContext);
  const history = useNavigate();
  const [searchedTermPractice, setSearchedTermPractice] = useState("");

  // const [getCategories,setGetCategories]=useState([]);

  const handleEnter = (event) => {
    console.log("event", event.which);
    if (event) {
      event.preventDefault();
    }

    console.log(
      selectedCategories,
      "selected cat",
      selectedPractice,
      "selected prac"
    );
    if (
      event.which === 13 &&
      searchedTermPractice.length > 0 &&
      selectedPractice !== ""
    ) {
      //   this.handlesearch();
      history(
        `/expertlisting?selectedPractice=${selectedPractice}&selectedCategories=${selectedCategories}`
      );
    }
    // else {
    // //   this.handleChange(event);
    // }
  };
  const fetchAllPracticeAreaInGroups = async () => {
    categoriesAction.fetchAllPracticeAreaInGroups((err,res)=>{
      if(err){

      }else{
        console.log(res.data," daata ");
        // const data=await _.chunk(res.data, 2);
        setLegalPracticeArea(res.data);
      }
    });
   
  };
  const fetchAllExpertsOnline = async () => {
    homeAction.fetchAllExpertsOnline((err, res) => {
      if (err) {
        console.log(err, " fetchAllExpertsOnline error");
      } else {
        setExpertsOnline(res.data);

        setDummy(0);
        console.log(res.data, " online experts ");
      }
    });
  };
  const fetchAllCategories = async () => {
    categoriesAction.fetchAllCategories((err, res) => {
      if (err) {
        console.log(err, "helllooo");
      } else {
        setGetCategories(res.data);
        console.log(res.data, " daata ");
      }
    });
  };
  const fetchSearchedPracticeArea = async () => {
    const dataToSend = {
      searchedTerm: searchedTermPractice,
    };
    homeAction.fetchSearchedPracticeArea(dataToSend, (err, res) => {
      if (err) {
      } else {
        
        setFilteredPracticeArea(res.data);
        setDummy(0);
        console.log(res.data, " data ");
      }
    });
  };

  useEffect(() => {
    fetchAllExpertsOnline();
    setDummy(1);
    fetchAllCategories();
    fetchSearchedPracticeArea();
    fetchTopExperts();
    fetchTestimonies();
    fetchAllPracticeAreaInGroups();
  }, [searchedTermPractice]);
  const handleClick = (e) => {
    console.log(e, "console kya hai is button ka ");
    if (e.type == "click") {
      e.preventDefault();
    }
    //  history('/expertlisting')
    console.log(searchedTermPractice, "afjkaekaeiidfna   ", selectedPractice);
    if (searchedTermPractice.length > 0 && selectedPractice !== "") {
      history(
        `/expertlisting?selectedPractice=${selectedPractice}&selectedCategories=${selectedCategories}`
      );
    }
  };
  // const [expertcarousel,setexpertcarousel]=useState(null);
  const fetchTopExperts = async () => {
   // let dataToSend={
   //    limit:sizePerPage,
   //    page:currentPage,
   //    category:selectedCategory,
   //    practiceArea:selectedPracticeArea,
   //    sortBy:selectedExpertSorting,
   // }
      expListingAction.fetchTopExperts((err,res)=>{
        if(err){
          console.log(err," fetchTopExperts error")
        }else{
          setTopExpertsList(res.data.list);

          setDummy(0);
          console.log(res.data, " fetchedTopExperts ");
          
        }
      });
      
    };

    
  // const [expertcarousel,setexpertcarousel]=useState(null);
  const fetchTestimonies = async () => {
   // let dataToSend={
   //    limit:sizePerPage,
   //    page:currentPage,
   //    category:selectedCategory,
   //    practiceArea:selectedPracticeArea,
   //    sortBy:selectedExpertSorting,
   // }
      homeAction.fetchTestimonies((err,res)=>{
        if(err){
          console.log(err," fetchTestimonies error")
        }else{
          setTestimonies(res.data);

          setDummy(0);
          console.log(res.data, " fetchedTestimonies ");
          
        }
      });
      
    };

  return (
    <>
    {console.log(setLegalPracticeArea,"loogggoogogggg")}
      <section className="main-bn-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="main-bn-content">
                <h1>Why to worry when, Justice At Your Doorstep</h1>
                <h6>
                  Get Free Legal Advice Online with one of best Advocates from
                  any place of world In just few steps , Borhan has 1000+ happy
                  customer.
                </h6>
              </div>
              <div className="main-bn-feilds">
                <div className="">
                  <ul>
                    <li>
                      {/* <select className="form-select" aria-label="Default select example">
                               <option selected>Select Category</option>
                               <option value="1">One</option>
                               <option value="2">Two</option>
                           
                               <option value="3">Three</option>
                            </select> */}
                      <FetchCategoriesList
                        selectedCategory={selectedCategories}
                        setSelectedCategory={setSelectedCategories}
                        getCategories={getCategories}
                        setGetCategories={setGetCategories}
                      />
                    </li>
                    <li>
                      <div className="" ref={ref}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Practice Area"
                          value={searchedTermPractice}
                          onChange={(e) => {
                            setSearchedTermPractice(e.target.value);
                          }}
                          onKeyUp={(event) => {
                            handleEnter(event);
                          }}
                        />
                        {isComponentVisible && (
                          <div className="search-practice-area">
                            <ul className="blocklist">
                              {filteredPracticeArea &&
                                filteredPracticeArea.map((obj, index) => {
                                  return (
                                    <li
                                      onClick={(e) => {
                                        setSelectedPractice(e.target.className);
                                        setSearchedTermPractice(e.target.id);
                                      }}
                                      id={`${obj?.name}`}
                                      className={`${obj._id}`}
                                    >
                                      {obj?.name}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        )}
                        <button
                          className="btn"
                          onClick={(e) => {
                            handleClick(e);
                          }}
                        >
                          <img
                            src="/assets/img/search-icon.png"
                            className="img img-fluid"
                            alt=""
                          />
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
                <p>
                  Popular :&nbsp;&nbsp;{" "}
                  <span>
                    {" "}
                    Legal, Construction , Love & Relationship , Marriage ,
                    Education
                  </span>
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="main-bn-img">
                <img
                  src="/assets/img/man-img.png"
                  className="img img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="pratice-area-wrp">
         <div class="container">
            <div class="row">
                <h3>Legal Practice Area</h3>
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
         {legalPracticeArea && legalPracticeArea.map((obj,index)=>{
           return(
            <div className="item"
              //  key={index}
               >
     <div className="pratice-area-box legal-practice-area">
        <div className="col">
        <div className="">
        <div className="img-content">
           <img src=
           {`${obj[0]?.url?.original}`}
            className="img img-fluid" alt=""/>
        </div>
        
        <div >
        
           <h4>
           {/* {obj?.name}  */}
           
           {obj[0]?.name} </h4>
        </div>
     </div>
     <div >
        <div className="img-content">
           <img src=
           {`${obj[1]?.url?.original}`}
            className="img img-fluid" alt=""/>
        </div>
        
        <div >
        
           <h4>
           {obj[1]?.name} 
           
            </h4>
        </div>
     </div>
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
         </div>
      </section>
      {/* <section className="legal-area-wrp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="legal-stats">
                <ul>
                  <li className="w-50">
                    <div className="lp-box-wrp lp-white-bg no-shadow">
                      <div className="text-start">
                        <h3>Legal Practice Area’s</h3>
                        <p>
                          {" "}
                          Get Free Legal Advice Online with one of best
                          Advocates from any place{" "}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="">
                    <Link to="javascript:;">
                      <div className="lp-box-wrp lp-green-bg">
                        <div className="text-center">
                          <img
                            src="/assets/img/banking-sector-icon.png"
                            className="img img-fluid"
                            alt=""
                          />
                          <h5>Banking sector</h5>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link to="javascript:;">
                      <div className="lp-box-wrp lp-white-bg">
                        <div className="text-center">
                          <img
                            src="/assets/img/crime-la-icon.png"
                            className="img img-fluid"
                            alt=""
                          />
                          <h5>Crime law</h5>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link to="javascript:;">
                      <div className="lp-box-wrp lp-green-bg">
                        <div className="text-center">
                          <img
                            src="/assets/img/case-services-icon.png"
                            className="img img-fluid"
                            alt=""
                          />
                          <h5>Case services</h5>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-hide">
                    <div className="lp-box-wrp-empty"></div>
                  </li>
                  <li className="">
                    <Link to="javascript:;">
                      <div className="lp-box-wrp lp-white-bg">
                        <div className="text-center">
                          <img
                            src="/assets/img/consumer-matter-icon.png"
                            className="img img-fluid"
                            alt=""
                          />
                          <h5>Consumer matter</h5>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <div className="lp-box-wrp lp-green-bg">
                      <Link to="javascript:;">
                        <div className="text-center">
                          <img
                            src="/assets/img/banking-services-icon.png"
                            className="img img-fluid"
                            alt=""
                          />
                          <h5>Banking services</h5>
                        </div>
                      </Link>
                    </div>
                  </li>
                  <li className="">
                    <Link to="javascript:;">
                      <div className="lp-box-wrp lp-white-bg">
                        <div className="text-center">
                          <img
                            src="/assets/img/company-matter-icon.png"
                            className="img img-fluid"
                            alt=""
                          />
                          <h5>Company matter</h5>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link to="javascript:;">
                      <div className="lp-box-wrp lp-green-bg">
                        <div className="text-center">
                          <img
                            src="/assets/img/recovery-matter-icon.png"
                            className="img img-fluid"
                            alt=""
                          />
                          <h5>Recovery matter</h5>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link to="javascript:;">
                      <div className="lp-box-wrp lp-white-bg">
                        <div className="text-center">
                          <img
                            src="/assets/img/view-more-icon.png"
                            className="img img-fluid"
                            alt=""
                          />
                          <h5>View more</h5>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="our-experts-wrp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common-head">
                <h3>Our Experts are online , Connect now</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 ">
              <OwlCarousel
                className="health-owl"
                items={20}
                nav={true}
                loop={true}
                margin={10}
                rewind={true}
                prevArrow={false}
                nextArrow={false}
                responsive={{
                  0: {
                    items: 1,
                    nav: true,
                    //  nav: true,
                    //  dots:true,
                  },
                  600: {
                    items: 4,
                    nav: true,
                    //  nav: true,
                    //  dots:true,
                  },
                  1000: {
                    items: 5,
                    nav: true,
                    //  nav:true,
                    //  dots:true,
                  },
                }}
              >
                {/* <div className="item">
                      <div className="expert-box-wrp">
                         <div className="position-relative">
                            <img src="/assets/img/expert-thumb.png" className="img img-fluid" alt=""/>
                            <span className="active-dot"></span>
                         </div>
                         <div className="p-3">
                            <div className="star-rating">
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star"></span>
                               <span className="fa fa-star"></span>
                            </div>
                            <h5>Heather Nikolaus</h5>
                            <h6>Business & Finance Expert</h6>
                            <p>20 Yrs Experience</p>
                            <button className="btn">Connect Now</button>
                         </div>
                      </div>
                   </div> */}
                
                {expertsOnline &&
                  expertsOnline.map((obj, index) => {
                    return (
                      <div className="item" key={index}>
                        <div className="expert-box-wrp">
                          <div className="position-relative">
                            <img
                              src={`${
                                obj?.userId?.profilePic === ""
                                  ? "/assets/img/expert-thumb.png"
                                  : obj?.userId?.profilePic
                              }`}
                              className="img img-fluid"
                              alt=""
                            />
                            <span className="active-dot"></span>
                          </div>
                          <div className="p-3">
                            <div className="star-rating">
                              {/* <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star"></span>
                               <span className="fa fa-star"></span> */}
                              <StarRatings
                                rating={obj?.rating?.avgRating}
                                starRatedColor={"yellow"}
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                              />
                              {"     "}
                              {obj?.rating?.avgRating}
                            </div>
                            <h5>
                              {obj?.userId?.firstName} {obj?.userId?.lastName}
                            </h5>
                            <h6>{obj?.practiceArea[0]?.name}</h6>
                            <p>{obj?.experience} years experience</p>
                            <button className="btn">Connect Now</button>
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
      <section className="top-legal-wrp ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common-head">
                <h3>Our Top Legal Expert</h3>
                <p>
                  Get Free Legal Advice Online with one of best Advocates from
                  any place{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <OwlCarousel
                className="health-owl top-legal-owl"
                items={10}
                loop={true}
                nav={true}
                rewind={true}
                margin={10}
                nextArrow={false}
                prevArrow={false}
                autoplay={true}
                dots={true}
                pagination={true}
                autoplayTimeout={3000}
                // rewind={true}
                responsive={{
                  0: {
                    items: 1,
                    nav: true,
                  },
                  600: {
                    items: 2,
                    nav: true,
                  },
                  1000: {
                    items: 4,
                    nav: true,
                  },
                }}
              >
              {console.log(topExpertsList,"top experts list")}
               {topExpertsList.length>0 && topExpertsList.map((obj,index)=>{

                 
                 return(
                  <div className="item">
               <div className="top-legal-box-wrp ">
                  <div className="top-legal-user-img">
                     <img src="/assets/img/legal-expert-1.png" alt="" />
                  </div>
                  <div>
                     <h4>{obj?.userId?.firstName}</h4>
                     <p>
                     <img
                        src={`${obj?.userId?.profilePic===""?"/assets/img/location-arrow-icon.png":obj?.userId?.profilePic}`}
                        alt=""
                     />{" "}
                     Ruwi Muscat(location)
                     </p>
                     <div className="star-rating ">
                     {/* <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
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
                           {obj?.rating?.avgRating}
                     </div>
                     <p>{obj?.experience} Yrs Experience</p>
                     <p>{obj?.practiceArea[0]?.name}</p>
                  </div>
               </div>
               </div>
                 )
               }
               )}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
      <section className="work-gets-done-wrp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common-head">
                <h3>See how work gets done</h3>
                <p>
                  Get Free Legal Advice Online with one of best Advocates from
                  any place{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="hwg-box">
                <div className="">
                  <img
                    src="/assets/img/signup-in-second.png"
                    className="img img-fluid"
                    alt=""
                  />
                </div>
                <h4>Signup in second</h4>
                <p>
                  Get Free Legal Advice Online with one of best Advocates from
                  any place{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hwg-box">
                <div className="">
                  <img
                    src="/assets/img/select-book.png"
                    className="img img-fluid"
                    alt=""
                  />
                </div>
                <h4>Select and Book</h4>
                <p>
                  Get Free Legal Advice Online with one of best Advocates from
                  any place{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hwg-box">
                <div className="">
                  <img
                    src="/assets/img/video-call.png"
                    className="img img-fluid"
                    alt=""
                  />
                </div>
                <h4>Video call</h4>
                <p>
                  Get Free Legal Advice Online with one of best Advocates from
                  any place{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="membership-plan-wrp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common-head">
                <h3>Choose Membership Plans</h3>
                <p>Get Discounts on Bookings + Access to the Recordings</p>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="membership-plan-box">
                <div className="side-indicator"></div>
                <h3>Basic</h3>
                <h5>
                  <img
                    src="/assets/img/clock-green.png"
                    className="img img-fluid"
                    alt=""
                  />{" "}
                  10h / month
                </h5>
                <h4>
                  {" "}
                  <span></span> OMR 8
                </h4>
                <h4>
                  <b>5.5 OMR</b>
                </h4>
                <h6>Billed Monthly</h6>
                <p>As one payment of 5.5 $</p>
                <button className="btn" type="button">
                  Buy Basic
                </button>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="membership-plan-box active">
                <div className="bv-tag">Best Value</div>
                <div className="side-indicator"></div>
                <h3>Premium</h3>
                <h5>
                  <img
                    src="/assets/img/clock-yellow.png"
                    className="img img-fluid"
                    alt=""
                  />{" "}
                  22h / month
                </h5>
                <h4>
                  {" "}
                  <span></span> OMR 100
                </h4>
                <h4>
                  <b>60 OMR</b>
                </h4>
                <h6>Billed Annual</h6>
                <p>As one payment of 60 $</p>
                <button className="btn" type="button">
                  Buy Premium
                </button>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="membership-plan-box">
                <div className="side-indicator"></div>
                <h3>Advance</h3>
                <h5>
                  <img
                    src="/assets/img/clock-green.png"
                    className="img img-fluid"
                    alt=""
                  />{" "}
                  22h / month
                </h5>
                <h4>
                  {" "}
                  <span></span> OMR 8
                </h4>
                <h4>
                  <b>5.5 OMR</b>
                </h4>
                <h6>Billed Monthly</h6>
                <p>As one payment of 5.5 $</p>
                <button className="btn" type="button">
                  Buy Advance
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mem-plan-layer">
          <img
            src="/assets/img/membership-plan-bg.png"
            className="img img-fluid"
            alt=""
          />
        </div>
      </section>
      <section className="premium-expert-wrp">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="premium-expert-img">
                <img
                  src="/assets/img/premium-expert.png"
                  className="img img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="premium-expert-content">
                <div>
                  <h1>World best Premium Experts</h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                  </p>
                  <button className="btn text-dark" type="button">
                    <Link to="/premiumexpert" class="text-dark">
                      View all Premium Expert
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="client-feature-wrp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common-head text-center">
                <h3>What our clients have to say Features</h3>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-12">
              <OwlCarousel
                className="health-owl client-feature-owl"
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
                    items: 1,
                    nav: true,
                  },
                  1000: {
                    items: 1,
                    nav: true,
                  },
                }}
              >
                

                {
                   testimonies &&testimonies.map((obj,index)=>{
                      return(
                        <div className="item">
                  <div className="client-feature-box">
                    <div className="client-feature-img">
                      <img
                        src={`${obj?.image === "" ? "/assets/img/legal-expert-1.png":obj?.image}`}
                        className="img img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="client-feature-content">
                      <p>
                        {obj?.feedback}
                      </p>
                      <h5>{obj?.name}</h5>
                    </div>
                  </div>
                </div>
                      )
                   })
                }
              </OwlCarousel>
              {/* <div className="owl-carousel owl-theme client-feature-owl">
                   <div className="item">
                      <div className="client-feature-box">
                         <div className="client-feature-img">
                            <img src="/assets/img/legal-expert-1.png" className="img img-fluid" alt=""/>
                         </div>
                         <div className="client-feature-content">
                            <p>A wonderful platform for clearing your doubts on all the Legal Matters, all the Legal
                               Practitioners registered with the platform are really helpful. Got answer to my query
                               within minutes of posting the question.
                            </p>
                            <h5>Afnan Zari</h5>
                         </div>
                      </div>
                   </div>
                   <div className="item">
                      <div className="client-feature-box">
                         <div className="client-feature-img">
                            <img src="/assets/img/legal-expert-1.png" className="img img-fluid" alt=""/>
                         </div>
                         <div className="client-feature-content">
                            <p>A wonderful platform for clearing your doubts on all the Legal Matters, all the Legal
                               Practitioners registered with the platform are really helpful. Got answer to my query
                               within minutes of posting the question.
                            </p>
                            <h5>Afnan Zari</h5>
                         </div>
                      </div>
                   </div>
                   <div className="item">
                      <div className="client-feature-box">
                         <div className="client-feature-img">
                            <img src="/assets/img/legal-expert-1.png" className="img img-fluid" alt=""/>
                         </div>
                         <div className="client-feature-content">
                            <p>A wonderful platform for clearing your doubts on all the Legal Matters, all the Legal
                               Practitioners registered with the platform are really helpful. Got answer to my query
                               within minutes of posting the question.
                            </p>
                            <h5>Afnan Zari</h5>
                         </div>
                      </div>
                   </div>
                </div> */}
            </div>
          </div>
        </div>
      </section>
      <NewsletterSubscribed/>
      <Footer />
    </>
  );
};

export default Home;

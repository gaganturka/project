import {React,useState,useEffect} from 'react'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import config from '../../config/configg';

import {Link} from 'react-router-dom'
import Footer from './Footer';
const ExpListing = () => {
   const [getCategories,setGetCategories]=useState([]);
   const [dummy,setDummy]=useState(false);
   const [expertList,setExpertList]=useState([]);
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
    }, [])
    
  return (
   <>
        
      <section className="breadcrumb-section">
         <div className="container">
            <div className="row">
               <div className="col-lg-7">
                  <div className="breadcrumb-content">
                     <h1>Experts</h1>
                     <ul>
                        <li><Link to="javascript:;">Home</Link> <span><i className="fa fa-angle-right"></i></span></li>
                        <li><Link to="javascript:;">Categories</Link> <span><i className="fa fa-angle-right"></i></span></li>
                        <li><Link to="javascript:;">Sub Category</Link> <span><i className="fa fa-angle-right"></i></span></li>
                        <li className="active"><Link to="javascript:;">Expert Listing</Link></li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="breadcrumb-search">
                     <div className="position-relative">
                        <input type="text" className="form-control" placeholder="Search any....."/>
                        <button className="btn"><img src="./assets/img/search-icon.png" className="img img-fluid" alt=""/></button>
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
                   <div className="item">
                        <div className="expert-box-wrp blue-bg">
                           <div className="position-relative">
                              <img src="./assets/img/expert-thumb.png" className="img img-fluid" alt=""/>
                             
                           </div>
                           <div className="p-3">
                              <h5>Heather Nikolaus</h5>
                              <h6>Business & Finance Expert</h6>
                              <Link to="/expprofile"><button className="btn">View Profile</button></Link>
                           </div>
                        </div>
                     </div>
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
                {console.log(getCategories,"ashishsirissayinggodblessyouall")}
                {

                   getCategories.length &&
                            getCategories.map((obj, index) => {
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
                    
                  {/* <div className="owl-carousel owl-theme pratice-area-owl">
                     <div className="item">
                        <div className="pratice-area-box">
                           <div>
                              <img src="./assets/img/pratice-area-thumb.png" className="img img-fluid" alt=""/>
                           </div>
                           <div>
                              <h4>Banking Related service</h4>
                           </div>
                        </div>
                     </div>
                     <div className="item">
                        <div className="pratice-area-box">
                           <div>
                              <img src="./assets/img/pratice-area-thumb.png" className="img img-fluid" alt=""/>
                           </div>
                           <div>
                              <h4>Banking Related service</h4>
                           </div>
                        </div>
                     </div>
                     <div className="item">
                        <div className="pratice-area-box">
                           <div>
                              <img src="./assets/img/pratice-area-thumb.png" className="img img-fluid" alt=""/>
                           </div>
                           <div>
                              <h4>Banking Related service</h4>
                           </div>
                        </div>
                     </div>
                     <div className="item">
                        <div className="pratice-area-box">
                           <div>
                              <img src="./assets/img/pratice-area-thumb.png" className="img img-fluid" alt=""/>
                           </div>
                           <div>
                              <h4>Banking Related service</h4>
                           </div>
                        </div>
                     </div>
                     <div className="item">
                        <div className="pratice-area-box">
                           <div>
                              <img src="./assets/img/pratice-area-thumb.png" className="img img-fluid" alt=""/>
                           </div>
                           <div>
                              <h4>Banking Related service</h4>
                           </div>
                        </div>
                     </div>
                     <div className="item">
                        <div className="pratice-area-box">
                           <div>
                              <img src="./assets/img/pratice-area-thumb.png" className="img img-fluid" alt=""/>
                           </div>
                           <div>
                              <h4>Banking Related service</h4>
                           </div>
                        </div>
                     </div>
                  </div> */}
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
                        <li>
                           <select className="form-select">
                              <option selected>Top Rated</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select>
                        </li>
                        <li>
                           <select className="form-select">
                              <option selected>Filter Name</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select>
                        </li>
                        <li>
                           <select className="form-select">
                              <option selected>Filter Name</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="exp-listing-con">
               <div className="exp-listing-con-filter">
                  <div className="row">
                     <div className="col-lg-6">
                        <p>Results - <b>127</b></p>
                     </div>
                     <div className="col-lg-6">
                        <div className="rec-filter-select">
                           <span>Sort by  </span>  
                           <select className="form-select">
                              <option selected>Recommendations</option>
                              <option value="1">Recommendations</option>
                              <option value="2">Recommendations</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="exp-listing-wrp">
                  <div className="row">

                     <div className="col-lg-3">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src="./assets/img/exp-img-1.png" className="img img-fluid" alt=""/>
                              <span className="star">
                                 <span className="star-icon fa fa-star"></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>Heather Nikolaus</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="./assets/img/chat-btn-icon.png" alt=""/></div>
                                 </div>
                                </div>
                              <h4>Business & Finance Expert</h4>
                              <h4>7+ Year Experience</h4>
                              <div className="star-rating-text">
                                 <h4>4.2</h4>
                                 <div className="star-rating">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                 </div>
                              </div>
                              <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                              <ul>
                                 <li>
                                    <h3><img src="./assets/img/clock-icon.png" className="img img-fluid" alt=""/> 230 h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="./assets/img/eye-icon.png" className="img img-fluid" alt="" /> 1280</h3>
                                 </li>
                              </ul>
                              <Link to="/expprofile"><button className="btn" type="button">Book Appointment</button></Link>
                           </div>
                        </div>
                     </div>
                     {/* <div className="col-lg-3">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src="./assets/img/exp-img-2.png" className="img img-fluid" alt=""/>
                              <span className="star">
                                 <span className="star-icon fa fa-star"></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>Heather Nikolaus</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="./assets/img/chat-btn-icon.png" alt="" /></div>
                                 </div>
                                </div>
                              <h4>Business & Finance Expert</h4>
                              <h4>7+ Year Experience</h4>
                              <div className="star-rating-text">
                                 <h4>4.2</h4>
                                 <div className="star-rating">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                 </div>
                              </div>
                              <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                              <ul>
                                 <li>
                                    <h3><img src="./assets/img/clock-icon.png" className="img img-fluid" alt=""/> 230 h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="./img/eye-icon.png" className="img img-fluid" alt=""/> 1280</h3>
                                 </li>
                              </ul>
                              <Link to="/expprofile"><button className="btn" type="button">Book Appointment</button></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src="./assets/img/exp-img-3.png" className="img img-fluid" alt=""/>
                              <span className="star">
                                 <span className="star-icon fa fa-star"></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>Heather Nikolaus</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="./assets/img/chat-btn-icon.png" alt=""/></div>
                                 </div>
                                </div>
                              <h4>Business & Finance Expert</h4>
                              <h4>7+ Year Experience</h4>
                              <div className="star-rating-text">
                                 <h4>4.2</h4>
                                 <div className="star-rating">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                 </div>
                              </div>
                              <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                              <ul>
                                 <li>
                                    <h3><img src="./assets/img/clock-icon.png" className="img img-fluid" alt=""/> 230 h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="./assets/img/eye-icon.png" className="img img-fluid" alt=""/> 1280</h3>
                                 </li>
                              </ul>
                              <Link to="/expprofile"><button className="btn" type="button">Book Appointment</button></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src="./assets/img/exp-img-1.png" className="img img-fluid" alt=""/>
                              <span className="star">
                                 <span className="star-icon fa fa-star"></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>Heather Nikolaus</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="./assets/img/chat-btn-icon.png" alt=""/></div>
                                 </div>
                                </div>
                              <h4>Business & Finance Expert</h4>
                              <h4>7+ Year Experience</h4>
                              <div className="star-rating-text">
                                 <h4>4.2</h4>
                                 <div className="star-rating">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                 </div>
                              </div>
                              <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                              <ul>
                                 <li>
                                    <h3><img src="./assets/img/clock-icon.png" className="img img-fluid" alt=""/> 230 h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="./assets/img/eye-icon.png" className="img img-fluid" alt=""/> 1280</h3>
                                 </li>
                              </ul>
                              <Link to="/expprofile"><button className="btn" type="button">Book Appointment</button></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src="./assets/img/exp-img-2.png" className="img img-fluid" alt=""/>
                              <span className="star">
                                 <span className="star-icon fa fa-star"></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>Heather Nikolaus</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="./img/chat-btn-icon.png" alt=""/></div>
                                 </div>
                                </div>
                              <h4>Business & Finance Expert</h4>
                              <h4>7+ Year Experience</h4>
                              <div className="star-rating-text">
                                 <h4>4.2</h4>
                                 <div className="star-rating">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                 </div>
                              </div>
                              <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                              <ul>
                                 <li>
                                    <h3><img src="./assets/img/clock-icon.png" className="img img-fluid" alt=""/> 230 h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="./assets/img/eye-icon.png" className="img img-fluid" alt=""/> 1280</h3>
                                 </li>
                              </ul>
                              <Link to="/expprofile"><button className="btn" type="button">Book Appointment</button></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src="./assets/img/exp-img-3.png" className="img img-fluid" alt=""/>
                              <span className="star">
                                 <span className="star-icon fa fa-star"></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>Heather Nikolaus</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="./assets/img/chat-btn-icon.png" alt=""/></div>
                                 </div>
                                </div>
                              <h4>Business & Finance Expert</h4>
                              <h4>7+ Year Experience</h4>
                              <div className="star-rating-text">
                                 <h4>4.2</h4>
                                 <div className="star-rating">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span> 
                                 </div>
                              </div>
                              <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                              <ul>
                                 <li>
                                    <h3><img src="./assets/img/clock-icon.png" className="img img-fluid" alt=""/>230 h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="./assets/img/eye-icon.png" className="img img-fluid" alt=""/>1280</h3>
                                 </li>
                              </ul>
                              <Link to="/expprofile"><button className="btn" type="button">Book Appointment</button></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src="./assets/img/exp-img-1.png" className="img img-fluid" alt=""/>
                              <span className="star">
                                 <span className="star-icon fa fa-star"></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>Heather Nikolaus</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="./assets/img/chat-btn-icon.png" alt=""/></div>
                                 </div>
                                </div>
                              <h4>Business & Finance Expert</h4>
                              <h4>7+ Year Experience</h4>
                              <div className="star-rating-text">
                                 <h4>4.2</h4>
                                 <div className="star-rating">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                 </div>
                              </div>
                              <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                              <ul>
                                 <li>
                                    <h3><img src="./assets/img/clock-icon.png" className="img img-fluid" alt=""/> 230 h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="./assets/img/eye-icon.png" className="img img-fluid" alt=""/> 1280</h3>
                                 </li>
                              </ul>
                              <Link to="/expprofile"><button className="btn" type="button">Book Appointment</button></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3">
                        <div className="exp-listing-box">
                           <div className="exp-listing-img">
                              <img src="./assets/img/exp-img-2.png" className="img img-fluid" alt=""/>
                              <span className="star">
                                 <span className="star-icon fa fa-star"></span>
                               </span>
                           </div>
                           <div className="exp-listing-content">
                              <div className="row">
                                 <div className="col-10">
                                    <h1>Heather Nikolaus</h1>
                                 </div>
                                 <div className="col-2">
                                    <div className="req-chat-icon"><img src="./assets/img/chat-btn-icon.png" alt=""/></div>
                                 </div>
                                </div>
                              <h4>Business & Finance Expert</h4>
                              <h4>7+ Year Experience</h4>
                              <div className="star-rating-text">
                                 <h4>4.2</h4>
                                 <div className="star-rating">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                 </div>
                              </div>
                              <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                              <ul>
                                 <li>
                                    <h3><img src="./assets/img/clock-icon.png" className="img img-fluid" alt=""/>230 h</h3>
                                 </li>
                                 <li>
                                    <h3><img src="./assets/img/eye-icon.png" className="img img-fluid" alt=""/>1280</h3>
                                 </li>
                              </ul>
                              <Link to="/expprofile"><button className="btn" type="button">Book Appointment</button></Link>
                           </div>
                        </div>
                     </div> */}
                  </div>
               </div>
               <div className="common-pagination">
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
               </div>
            </div>
         </div>
      </section>
     
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

   </>
  )
}

export default ExpListing
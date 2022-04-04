import {React,useState,useEffect} from 'react'
import Footer from './Footer'
import {Link } from 'react-router-dom'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const PremiumExpert = () => {
    const [getCategories,setGetCategories]=useState([]);
   const [dummy,setDummy]=useState(false);

   const fetchAllCategories = async () => {
      const response = await fetch(
        `http://localhost:5000/admin/getCategoriesData`,
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
                  <div class="owl-carousel owl-theme pratice-area-owl">
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

getCategories.length &&
         getCategories.map((obj, index) => {
           return (
              <div className="item" key={index}>
     <div className="pratice-area-box">
        <div>
           <img src={`http://localhost:5000/public/images/${obj.url.original}`} className="img img-fluid" alt=""/>
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
                           <select class="form-select">
                              <option selected>Top Rated</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select>
                        </li>
                        <li>
                           <select class="form-select">
                              <option selected>Filter Name</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                           </select>
                        </li>
                        <li>
                           <select class="form-select">
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
            <div class="exp-listing-con">
               <div class="exp-listing-con-filter">
                
               </div>
               <div class="exp-listing-wrp">
                <div class="row">
                   <div class="col-lg-4 p-4">
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
                   </div>
                   <div class="col-lg-4 p-4">
                      <div class="exp-listing-box">
                         <div class="exp-listing-img">
                            <img src="./assets/img/exp-img-2.png" class="img img-fluid" alt="" />
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
                   </div>
                   <div class="col-lg-4 p-4">
                      <div class="exp-listing-box">
                         <div class="exp-listing-img">
                            <img src="./assets/img/exp-img-3.png" class="img img-fluid" alt="" />
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
                   </div>
                   <div class="col-lg-4 p-4">
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
                 </div>
                 <div class="col-lg-4 p-4">
                    <div class="exp-listing-box">
                       <div class="exp-listing-img">
                          <img src="./assets/img/exp-img-2.png" class="img img-fluid" alt="" />
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
                 </div>
                 <div class="col-lg-4 p-4">
                    <div class="exp-listing-box">
                       <div class="exp-listing-img">
                          <img src="./assets/img/exp-img-3.png" class="img img-fluid" alt="" />
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
                 </div>
                 <div class="col-lg-4 p-4">
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
                 </div>
                 <div class="col-lg-4 p-4">
                    <div class="exp-listing-box">
                       <div class="exp-listing-img">
                          <img src="./assets/img/exp-img-2.png" class="img img-fluid" alt="" />
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
                 </div>
                 <div class="col-lg-4 p-4">
                    <div class="exp-listing-box">
                       <div class="exp-listing-img">
                          <img src="./assets/img/exp-img-3.png" class="img img-fluid" alt="" />
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
                 </div>
                 <div class="col-lg-4 p-4">
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
                 </div>
                 <div class="col-lg-4 p-4">
                    <div class="exp-listing-box">
                       <div class="exp-listing-img">
                          <img src="./assets/img/exp-img-2.png" class="img img-fluid" alt="" />
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
                 </div>
                 <div class="col-lg-4 p-4">
                    <div class="exp-listing-box">
                       <div class="exp-listing-img">
                          <img src="./assets/img/exp-img-3.png" class="img img-fluid" alt="" />
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
                 </div>
                 <div class="col-lg-4 p-4">
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
                 </div>
                 <div class="col-lg-4 p-4">
                    <div class="exp-listing-box">
                       <div class="exp-listing-img">
                          <img src="./assets/img/exp-img-2.png" class="img img-fluid" alt="" />
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
                 </div>
                 <div class="col-lg-4 p-4">
                    <div class="exp-listing-box">
                       <div class="exp-listing-img">
                          <img src="./assets/img/exp-img-3.png" class="img img-fluid" alt="" />
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
                 </div>
                
                  
           
                </div>
             </div>
               <div class="common-pagination">
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
               </div>
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
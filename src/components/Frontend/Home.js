import React from 'react'
import Header from './Header'

const index = () => {
  return (
      <>
    <section className="main-bn-wrapper">
       <div className="container">
          <div className="row">
             <div className="col-lg-7">
                <div className="main-bn-content">
                   <h1>Why to worry when, Justice At Your Doorstep</h1>
                   <h6>Get Free Legal Advice Online with one of best Advocates from any place of world
                      In just few steps , Borhan has 1000+ happy customer.
                   </h6>
                </div>
                <div className="main-bn-feilds">
                   <div className="">
                      <ul>
                         <li>
                            <select className="form-select" aria-label="Default select example">
                               <option selected>Select Category</option>
                               <option value="1">One</option>
                               <option value="2">Two</option>
                               <option value="3">Three</option>
                            </select>
                         </li>
                         <li>
                            <div className="">
                               <input type="text" className="form-control" placeholder="Search Practice Area"/>
                               <button className="btn"><img src="./assets/img/search-icon.png" className="img img-fluid"
                                  alt=""/></button>
                            </div>
                         </li>
                      </ul>
                   </div>
                   <p>Popular :&nbsp;&nbsp; <span> Legal, Construction , Love & Relationship , Marriage ,
                      Education</span>
                   </p>
                </div>
             </div>
             <div className="col-lg-5">
                <div className="main-bn-img">
                   <img src="./assets/img/man-img.png" className="img img-fluid" alt=""/>
                </div>
             </div>
          </div>
       </div>
    </section>
    <section className="legal-area-wrp">
       <div className="container">
          <div className="row">
             <div className="col-lg-12">
                <div className="legal-stats">
                   <ul>
                      <li className="w-50">
                         <div className="lp-box-wrp lp-white-bg no-shadow">
                            <div className="text-start">
                               <h3>Legal Practice Area’s</h3>
                               <p> Get Free Legal Advice Online with one of best Advocates from any place </p>
                            </div>
                         </div>
                      </li>
                      <li className="">
                         <a href="javascript:;">
                            <div className="lp-box-wrp lp-green-bg">
                               <div className="text-center">
                                  <img src="./assets/img/banking-sector-icon.png" className="img img-fluid" alt=""/>
                                  <h5>Banking sector</h5>
                               </div>
                            </div>
                         </a>
                      </li>
                      <li className="">
                         <a href="javascript:;">
                            <div className="lp-box-wrp lp-white-bg">
                               <div className="text-center">
                                  <img src="./assets/img/crime-la-icon.png" className="img img-fluid" alt=""/>
                                  <h5>Crime law</h5>
                               </div>
                            </div>
                         </a>
                      </li>
                      <li className="">
                         <a href="javascript:;">
                            <div className="lp-box-wrp lp-green-bg">
                               <div className="text-center">
                                  <img src="./assets/img/case-services-icon.png" className="img img-fluid" alt=""/>
                                  <h5>Case services</h5>
                               </div>
                            </div>
                         </a>
                      </li>
                      <li className="mb-hide">
                         <div className="lp-box-wrp-empty">
                         </div>
                      </li>
                      <li className="">
                         <a href="javascript:;">
                            <div className="lp-box-wrp lp-white-bg">
                               <div className="text-center">
                                  <img src="./assets/img/consumer-matter-icon.png" className="img img-fluid" alt=""/>
                                  <h5>Consumer matter</h5>
                               </div>
                            </div>
                         </a>
                      </li>
                      <li className="">
                         <div className="lp-box-wrp lp-green-bg">
                            <a href="javascript:;">
                               <div className="text-center">
                                  <img src="./assets/img/banking-services-icon.png" className="img img-fluid" alt=""/>
                                  <h5>Banking services</h5>
                               </div>
                            </a>
                         </div>
                      </li>
                      <li className="">
                         <a href="javascript:;">
                            <div className="lp-box-wrp lp-white-bg">
                               <div className="text-center">
                                  <img src="./assets/img/company-matter-icon.png" className="img img-fluid" alt=""/>
                                  <h5>Company matter</h5>
                               </div>
                            </div>
                         </a>
                      </li>
                      <li className="">
                         <a href="javascript:;">
                            <div className="lp-box-wrp lp-green-bg">
                               <div className="text-center">
                                  <img src="./assets/img/recovery-matter-icon.png" className="img img-fluid" alt=""/>
                                  <h5>Recovery matter</h5>
                               </div>
                            </div>
                         </a>
                      </li>
                      <li className="">
                         <a href="javascript:;">
                            <div className="lp-box-wrp lp-white-bg">
                               <div className="text-center">
                                  <img src="./assets/img/view-more-icon.png" className="img img-fluid" alt=""/>
                                  <h5>View more</h5>
                               </div>
                            </div>
                         </a>
                      </li>
                   </ul>
                </div>
             </div>
          </div>
       </div>
    </section>
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
             <div className="col-lg-12">
                <div className="owl-carousel owl-theme our-experts-owl">
                   <div className="item">
                      <div className="expert-box-wrp">
                         <div className="position-relative">
                            <img src="./assets/img/expert-thumb.png" className="img img-fluid" alt=""/>
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
                   </div>
                   <div className="item">
                      <div className="expert-box-wrp">
                         <div className="position-relative">
                            <img src="./assets/img/expert-thumb.png" className="img img-fluid" alt=""/>
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
                   </div>
                   <div className="item">
                      <div className="expert-box-wrp">
                         <div className="position-relative">
                            <img src="./assets/img/expert-thumb.png" className="img img-fluid" alt=""/>
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
                   </div>
                   <div className="item">
                      <div className="expert-box-wrp">
                         <div className="position-relative">
                            <img src="./assets/img/expert-thumb.png" className="img img-fluid" alt=""/>
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
                   </div>
                   <div className="item">
                      <div className="expert-box-wrp">
                         <div className="position-relative">
                            <img src="./assets/img/expert-thumb.png" className="img img-fluid" alt=""/>
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
                   </div>
                   <div className="item">
                      <div className="expert-box-wrp">
                         <div className="position-relative">
                            <img src="./assets/img/expert-thumb.png" className="img img-fluid" alt=""/>
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
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
    <section className="top-legal-wrp">
       <div className="container">
          <div className="row">
             <div className="col-lg-12">
                <div className="common-head">
                   <h3>Our Top Legal Expert</h3>
                   <p>Get Free Legal Advice Online with one of best Advocates from any place </p>
                </div>
             </div>
          </div>
          <div className="row">
             <div className="col-lg-12">
                <div className="owl-carousel owl-theme top-legal-owl">
                   <div className="item">
                      <div className="top-legal-box-wrp">
                         <div className="top-legal-user-img">
                            <img src="./assets/img/legal-expert-1.png" alt=""/>
                         </div>
                         <div>
                            <h4>Heather Nikolaus</h4>
                            <p><img src="./assets/img/location-arrow-icon.png" alt=""/> Ruwi Muscat</p>
                            <div className="star-rating">
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                            </div>
                            <p>20 Yrs Experience</p>
                            <p>Cheque Bouce , Civil law , Criminal law</p>
                         </div>
                      </div>
                   </div>
                   <div className="item">
                      <div className="top-legal-box-wrp">
                         <div className="top-legal-user-img">
                            <img src="./assets/img/legal-expert-2.png" alt=""/>
                         </div>
                         <div>
                            <h4>Heather Nikolaus</h4>
                            <p><img src="./assets/img/location-arrow-icon.png" alt=""/> Ruwi Muscat</p>
                            <div className="star-rating">
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                            </div>
                            <p>20 Yrs Experience</p>
                            <p>Cheque Bouce , Civil law , Criminal law</p>
                         </div>
                      </div>
                   </div>
                   <div className="item">
                      <div className="top-legal-box-wrp">
                         <div className="top-legal-user-img">
                            <img src="./assets/img/legal-expert-3.png" alt=""/>
                         </div>
                         <div>
                            <h4>Heather Nikolaus</h4>
                            <p><img src="./assets/img/location-arrow-icon.png" alt=""/> Ruwi Muscat</p>
                            <div className="star-rating">
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                            </div>
                            <p>20 Yrs Experience</p>
                            <p>Cheque Bouce , Civil law , Criminal law</p>
                         </div>
                      </div>
                   </div>
                   <div className="item">
                      <div className="top-legal-box-wrp">
                         <div className="top-legal-user-img">
                            <img src="./assets/img/legal-expert-4.png" alt=""/>
                         </div>
                         <div>
                            <h4>Heather Nikolaus</h4>
                            <p><img src="./assets/img/location-arrow-icon.png" alt=""/> Ruwi Muscat</p>
                            <div className="star-rating">
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                            </div>
                            <p>20 Yrs Experience</p>
                            <p>Cheque Bouce , Civil law , Criminal law</p>
                         </div>
                      </div>
                   </div>
                   <div className="item">
                      <div className="top-legal-box-wrp">
                         <div className="top-legal-user-img">
                            <img src="./assets/img/legal-expert-1.png" alt=""/>
                         </div>
                         <div>
                            <h4>Heather Nikolaus</h4>
                            <p><img src="./assets/img/location-arrow-icon.png" alt=""/> Ruwi Muscat</p>
                            <div className="star-rating">
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                            </div>
                            <p>20 Yrs Experience</p>
                            <p>Cheque Bouce , Civil law , Criminal law</p>
                         </div>
                      </div>
                   </div>
                   <div className="item">
                      <div className="top-legal-box-wrp">
                         <div className="top-legal-user-img">
                            <img src="./assets/img/legal-expert-2.png" alt=""/>
                         </div>
                         <div>
                            <h4>Heather Nikolaus</h4>
                            <p><img src="./assets/img/location-arrow-icon.png" alt=""/> Ruwi Muscat</p>
                            <div className="star-rating">
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                            </div>
                            <p>20 Yrs Experience</p>
                            <p>Cheque Bouce , Civil law , Criminal law</p>
                         </div>
                      </div>
                   </div>
                   <div className="item">
                      <div className="top-legal-box-wrp">
                         <div className="top-legal-user-img">
                            <img src="./assets/img/legal-expert-3.png" alt=""/>
                         </div>
                         <div>
                            <h4>Heather Nikolaus</h4>
                            <p><img src="./assets/img/location-arrow-icon.png" alt=""/> Ruwi Muscat</p>
                            <div className="star-rating">
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                               <span className="fa fa-star checked"></span>
                            </div>
                            <p>20 Yrs Experience</p>
                            <p>Cheque Bouce , Civil law , Criminal law</p>
                         </div>
                      </div>
                   </div>
                </div>
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
                   <p>Get Free Legal Advice Online with one of best Advocates from any place </p>
                </div>
             </div>
          </div>
          <div className="row">
             <div className="col-lg-4">
                <div className="hwg-box">
                   <div className="">
                      <img src="./assets/img/signup-in-second.png" className="img img-fluid" alt=""/>
                   </div>
                   <h4>Signup in second</h4>
                   <p>Get Free Legal Advice Online with one of best Advocates from any place </p>
                </div>
             </div>
             <div className="col-lg-4">
                <div className="hwg-box">
                   <div className="">
                      <img src="./assets/img/select-book.png" className="img img-fluid" alt=""/>
                   </div>
                   <h4>Select and Book</h4>
                   <p>Get Free Legal Advice Online with one of best Advocates from any place </p>
                </div>
             </div>
             <div className="col-lg-4">
                <div className="hwg-box">
                   <div className="">
                      <img src="./assets/img/video-call.png" className="img img-fluid" alt=""/>
                   </div>
                   <h4>Video call</h4>
                   <p>Get Free Legal Advice Online with one of best Advocates from any place </p>
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
                   <h5><img src="./assets/img/clock-green.png" className="img img-fluid" alt=""/> 10h / month</h5>
                   <h4> <span></span> OMR 8</h4>
                   <h4><b>5.5 OMR</b></h4>
                   <h6>Billed Monthly</h6>
                   <p>As one payment of 5.5 $</p>
                   <button className="btn" type="button">Buy Basic</button>
                </div>
             </div>
             <div className="col-lg-4">
                <div className="membership-plan-box active">
                   <div className="bv-tag">Best Value</div>
                   <div className="side-indicator"></div>
                   <h3>Premium</h3>
                   <h5><img src="./assets/img/clock-yellow.png" className="img img-fluid" alt=""/> 22h / month</h5>
                   <h4> <span></span> OMR 100</h4>
                   <h4><b>60 OMR</b></h4>
                   <h6>Billed Annual</h6>
                   <p>As one payment of 60 $</p>
                   <button className="btn" type="button">Buy Premium</button>
                </div>
             </div>
             <div className="col-lg-4">
                <div className="membership-plan-box">
                   <div className="side-indicator"></div>
                   <h3>Advance</h3>
                   <h5><img src="./assets/img/clock-green.png" className="img img-fluid" alt=""/> 22h / month</h5>
                   <h4> <span></span> OMR 8</h4>
                   <h4><b>5.5 OMR</b></h4>
                   <h6>Billed Monthly</h6>
                   <p>As one payment of 5.5 $</p>
                   <button className="btn" type="button">Buy Advance</button>
                </div>
             </div>
          </div>
       </div>
       <div className="mem-plan-layer"><img src="./assets/img/membership-plan-bg.png" className="img img-fluid" alt=""/></div>
    </section>
    <section className="premium-expert-wrp">
       <div className="container">
          <div className="row">
             <div className="col-lg-6">
                <div className="premium-expert-img">
                   <img src="./assets/img/premium-expert.png" className="img img-fluid" alt=""/>
                </div>
             </div>
             <div className="col-lg-6">
                <div className="premium-expert-content">
                   <div>
                      <h1>World best Premium Experts</h1>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                         the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley
                         of type and scrambled it to make a
                      </p>
                      <button className="btn" type="button">View all Premium Expert</button>
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
                <div className="owl-carousel owl-theme client-feature-owl">
                   <div className="item">
                      <div className="client-feature-box">
                         <div className="client-feature-img">
                            <img src="./assets/img/legal-expert-1.png" className="img img-fluid" alt=""/>
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
                            <img src="./assets/img/legal-expert-1.png" className="img img-fluid" alt=""/>
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
                            <img src="./assets/img/legal-expert-1.png" className="img img-fluid" alt=""/>
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
    <footer className="footer-wrp">
       <div className="footer-print">
          <img src="./assets/img/footer-print.png" className="img img-fluid" alt=""/>
       </div>
       <div className="container">
          <div className="row">
             <div className="col-lg col-sm col-6">
                <div className="footer-link-list">
                   <h3>Website</h3>
                   <ul>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                   </ul>
                </div>
             </div>
             <div className="col-lg col-sm col-6">
                <div className="footer-link-list">
                   <h3>Website</h3>
                   <ul>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                   </ul>
                </div>
             </div>
             <div className="col-lg col-sm col-6">
                <div className="footer-link-list">
                   <h3>Website</h3>
                   <ul>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                   </ul>
                </div>
             </div>
             <div className="col-lg col-sm col-6">
                <div className="footer-link-list">
                   <h3>Website</h3>
                   <ul>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                   </ul>
                </div>
             </div>
             <div className="col-lg col-sm col-6">
                <div className="footer-link-list">
                   <h3>Website</h3>
                   <ul>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                      <li><a href="javascript:;">Link</a></li>
                   </ul>
                </div>
             </div>
          </div>
          <div className="footer-bottom">
             <div className="row">
                <div className="col-lg-12">
                   <div className="text-center">
                      <p>Terms of service and Privacy Policy <a href="javascript:;">@Borhan</a></p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </footer>
    {/* <!-- Get Started Modal --> */}
    <div className="modal fade authentication-modal" id="getstartedmodal" tabindex="-1" aria-labelledby="getstartedmodal" aria-hidden="true">
       <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
             <div className="modal-body">
                <div className="auth-modal-wrp">
                   <div className="row">
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-artwork">
                            <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                         </div>
                      </div>
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-content">
                            <div className="w-100">
                               <div className="auth-modal-logo"> 
                                  <img src="./assets/img/main-logo.png" className="img img-fluid" alt=""/>
                               </div>
                               <h2>Get Started</h2>
                               <div className="get-started-buttons">
                                  <div>
                                     <button data-bs-target="#sendOTPmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn" type="button">Borhan User</button>
                                  </div>
                                  <div>
                                     <button data-bs-target="#createExpAccmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn" type="button">Expert</button>
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
    {/* <!-- Send OTP Modal --> */}
    <div className="modal fade authentication-modal" id="sendOTPmodal" tabindex="-1" aria-labelledby="sendOTPmodal" aria-hidden="true">
       <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
             <div className="modal-body">
                <div className="auth-modal-wrp">
                   <div className="row">
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-artwork">
                            <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                         </div>
                      </div>
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-content">
                            <div className="w-100">
                               <div className="auth-modal-logo"> 
                                  <img src="./assets/img/main-logo.png" className="img img-fluid" alt=""/>
                               </div>
                               <h2>Please Sign in to Borhan</h2>
                               <div className="auth-input-wrp">
                                  <label for="">Enter Mobile Number</label>
                                  <input type="text" className="form-control" placeholder=""/>
                                  <button role="button" data-bs-target="#verifyOTPmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn auth-main-btn" type="button">Send OTP</button>
                               </div>
                               <p>Or Sign in with</p>
                               <ul>
                                  <li className="pe-2"><button className="btn"> <img src="./assets/img/login-with-google.png" className="img img-fluid" alt=""/>Log in with Gmail</button></li>
                                  <li className="ps-2"><button className="btn"> <img src="./assets/img/login-with-facebook.png" className="img img-fluid" alt=""/>Log in with Facebook</button></li>
                               </ul>
                               <h5>Don’t have account ? <a role="button" data-bs-target="#createAccmodal" data-bs-toggle="modal" data-bs-dismiss="modal" href="javascript:;">Create now</a></h5>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    {/* <!-- Verify OTP Modal --> */}
    <div className="modal fade authentication-modal" id="verifyOTPmodal" tabindex="-1" aria-labelledby="verifyOTPmodal" aria-hidden="true">
       <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
             <div className="modal-body">
                <div className="auth-modal-wrp">
                   <div className="row">
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-artwork">
                            <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                         </div>
                      </div>
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-content">
                            <div className="w-100">
                               <div className="auth-modal-logo"> 
                                  <img src="./assets/img/main-logo.png" className="img img-fluid" alt=""/>
                               </div>
                               <h2>Please Sign in to Borhan</h2>
                               <div className="auth-input-wrp">
                                  <label for="">Please enter the OTP sent to <span>9090909090</span></label>
                                  <input type="text" className="form-control" placeholder=""/>
                                  <a className="w-100" href="user-dashboard.html"> <button className="btn auth-main-btn" type="button">Verify</button></a>
                               </div>
                               <h5>Not Received your code ? <a href="javascript:;"> Resend code</a></h5>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    {/* <!-- Create Account Modal --> */}
    <div className="modal fade authentication-modal" id="createAccmodal" tabindex="-1" aria-labelledby="createAccmodal" aria-hidden="true">
       <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
             <div className="modal-body">
                <div className="auth-modal-wrp">
                   <div className="row">
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-artwork">
                            <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                         </div>
                      </div>
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-content">
                            <div className="w-100">
                               <div className="auth-profile-pic-wrp">
                                  <img src="./assets/img/profile-picture-icon.png" className="img img-fluid" alt=""/>
                                  <h6>Profile Picture</h6>
                               </div>
                               <div className="auth-input-wrp">
                                  <div className="row">
                                     <div className="col-lg-6">
                                        <label for="">First Name</label>
                                        <input type="text" className="form-control" placeholder=""/>
                                     </div>
                                     <div className="col-lg-6">
                                        <label for="">Last Name</label>
                                        <input type="text" className="form-control" placeholder=""/>
                                     </div>
                                     <div className="col-lg-12">
                                        <label for="">Email ID</label>
                                        <input type="email" className="form-control" placeholder=""/>
                                     </div>
                                     <div className="col-lg-12">
                                        <label for="">Date of Birth</label>
                                        <input type="date" className="form-control" placeholder=""/>
                                     </div>
                                     <div className="col-lg-12">
                                        <label for="">Gender</label>
                                        <div className="gender-buttons">
                                           {/* <!-- add active class for active the tab --> */}
                                           <button className="btn me-2" type="button">Male</button> 
                                           <button className="btn ms-2" type="button">Female</button>
                                        </div>
                                     </div>
                                  </div>
                                  <button className="btn auth-main-btn" type="button">Create Account</button>
                               </div>
                               <h5>By signing up , you agree to <a href="javascript:;">terms and condition</a> and Borhan <a href="javascript:;">policy</a></h5>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    {/* <!-- Create Expert Account Modal --> */}
    <div className="modal fade authentication-modal" id="createExpAccmodal" tabindex="-1" aria-labelledby="createExpAccmodal" aria-hidden="true">
       <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
             <div className="modal-body">
                <div className="auth-modal-wrp">
                   <div className="row">
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-artwork">
                            <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                         </div>
                      </div>
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-content">
                            <div className="w-100">
                               <div className="auth-profile-pic-wrp">
                                  <img src="./assets/img/profile-picture-icon.png" className="img img-fluid" alt=""/>
                                  <h6>Profile Picture</h6>
                               </div>
                               <div className="auth-input-wrp">
                                  <div className="row">
                                     <div className="col-lg-6">
                                        <label for="">First Name</label>
                                        <input type="text" className="form-control" placeholder=""/>
                                     </div>
                                     <div className="col-lg-6">
                                        <label for="">Last Name</label>
                                        <input type="text" className="form-control" placeholder=""/>
                                     </div>
                                     <div className="col-lg-12">
                                        <label for="">Email ID</label>
                                        <input type="email" className="form-control" placeholder=""/>
                                     </div>
                                     <div className="col-lg-12">
                                        <label for="">Date of Birth</label>
                                        <input type="date" className="form-control" placeholder=""/>
                                     </div>
                                     <div className="col-lg-12">
                                        <label for="">Gender</label>
                                        <div className="gender-buttons">
                                           {/* <!-- add active class for active the tab --> */}
                                           <button className="btn me-2" type="button">Male</button> 
                                           <button className="btn ms-2" type="button">Female</button>
                                        </div>
                                     </div>
                                  </div>
                                  <button data-bs-target="#createExp2Accmodal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn auth-main-btn" type="button">Continue</button>
                               </div>
                               <h5>By signing up , you agree to <a href="javascript:;">terms and condition</a> and Borhan <a href="javascript:;">policy</a></h5>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    {/* <!-- Create Expert Account Modal --> */}
    <div className="modal fade authentication-modal" id="createExp2Accmodal" tabindex="-1" aria-labelledby="createExp2Accmodal" aria-hidden="true">
       <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
             <div className="modal-body">
                <div className="auth-modal-wrp">
                   <div className="row">
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-artwork">
                            <img src="./assets/img/human-right-artwok.png" className="img img-fluid" alt=""/>
                         </div>
                      </div>
                      <div className="col-lg-6 p-0">
                         <div className="auth-modal-content">
                            <div className="w-100">
                               <div className="auth-input-wrp">
                                  <div className="row">
                                     <div className="col-lg-12">
                                        <label for="">Bio</label>
                                        <input type="text" className="form-control" placeholder=""/>
                                     </div>
                                     <div className="col-lg-12 pt-2">
                                        <label for="">You can Record Audio and Video Bio ( Optional )</label>
                                        <div className="record-buttons">
                                           <button className="btn" type="button"><img src="./assets/img/audio-record-icon.png" className="img img-fluid" alt=""/> Audio record</button>
                                           <button className="btn" type="button"><img src="./assets/img/video-record-icon.png" className="img img-fluid" alt=""/> Video record</button>
                                        </div>
                                     </div>
                                     <div className="col-lg-12 pt-2">
                                        <label for="">Upload Documents</label>
                                        <div className="upload-doc-field">
                                           <input type="file" className="form-input-file"/>
                                           <div className="artifical-doc-feild">
                                              <img src="./assets/img/upload-document-icon.png" className="img img-fluid" alt=""/>
                                           </div>
                                        </div>
                                        <a href="javascript:;">Documents List</a>
                                     </div>
                                  </div>
                                  <button className="btn auth-main-btn" type="button">Create Account</button>
                               </div>
                               <h5>By signing up , you agree to <a href="javascript:;">terms and condition</a> and Borhan <a href="javascript:;">policy</a></h5>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    
</>

  )
}

export default index
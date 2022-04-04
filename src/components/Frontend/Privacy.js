import React from 'react'

import {Link} from 'react-router-dom'
import Footer from './Footer'
const Privacy = () => {
  return (
      <>
      <section className="breadcrumb-section">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="breadcrumb-content">
                     <ul>
                        <li><Link to="javascript:;">Home</Link> <span><i className="fa fa-angle-right"></i></span></li>
                        <li className="active"><Link to="javascript:;">Privacy Policy</Link></li>
                     </ul>
                     <h2>Privacy policy . . . . </h2>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="common-content-page">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div>
                     <p>Your privacy is very important to us. Below is our privacy and information use policy. If you do not agree with our Privacy Policy, do not use this Website/App.</p>
                     <br/>
                     <p>We use technologies like cookies (small files stored on your browser), web beacons, or unique device identifiers to identify your computer or device so we can deliver a better experience. Our systems also log information like your browser, operating system and IP address</p>
                     <br/>
                     <p>We also may collect personally identifiable information that you provide to us, such as your email address, contacts. If authorized by you, we may also access profile and other information from services like Facebook/Google. We may keep your data indefinitely.</p>
                     <br/>
                     <p>Our systems may associate this personal information with your activities in the course of providing service to you (such as pages you view or things you click on or search for).</p>
                     <br/>
                     <p>In order to serve you, we may share your personal and anonymous information with other companies, including vendors and contractors. Their use of information is limited to these purposes, and subject to agreements that require them to keep the information confidential. Our vendors provide assurance that they take reasonable steps to safeguard the data they hold on our behalf, although data security cannot be guaranteed.</p>
                     <br/>
                     <p>Analytics companies may access anonymous data (such as your IP address or device ID) to help us understand how our services are used. They use this data solely on our behalf. They do not share it except in aggregate form; no data is shared as to any individual user.</p>
                     <br/>
                     <p>We do not share personally identifiable information such as your email address, contacts with other companies.</p>
                     <br/>
                     <p>Ad companies may use and collect anonymous data about your interests to customize content and advertising here and in other sites and applications. Interest and location data may be linked to your device, but is not linked to your identity.</p>
                     <br/>
                     <p>We take reasonable steps to secure your personally identifiable information against unauthorized access or disclosure. However, no security or encryption method can be guaranteed to protect information from hackers or human error.</p>
                     <br/>
                     <p>Information we collect may be stored or processed on computers/devices located in any country where we do business.</p>
                     <br/>
                     <p>To operate the service, we also may make identifiable and anonymous information available to third parties in these limited circumstances:</p>
                     <ul>
                        <li>
                           <p>With your express consent</p>
                        </li>
                        <li>
                           <p>when we have a good faith belief it is required by law</p>
                        </li>
                        <li>
                           <p>when we have a good faith belief it is necessary to protect our rights or property, or </p>
                        </li>
                        <li>
                           <p>to any successor or purchaser in a merger, acquisition, liquidation, dissolution or sale of assets. Your consent will not be required for disclosure in these cases, but we will attempt to notify you, to the extent permitted by law to do so
                           </p>
                        </li>
                     </ul>
                     <br/>
                     <p>This privacy policy was last updated on 31 December, 2017. Our privacy policy may change from time to time. If the change materially affects registered users, we will send a notice to you by email.</p>
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

export default Privacy
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <>
            <footer class="footer-wrp">
         <div class="footer-print">
            <img src="/assets/img/footer-print.png" class="img img-fluid" alt=""/>
         </div>
         <div class="container">
            <div class="row">
               <div class="col-lg-4">
                  <div class="footer-link-list">
                     <h3>Borhan</h3>
                     <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="javascript:;"><img src="/assets/img/Icon awesome-mobile-alt-white.png" class="footer-link-icon"/>iOS App Download</a></li>
                        <li><a href="javascript:;"><img src="/assets/img/Icon awesome-mobile-alt-white.png" class="footer-link-icon"/>Android App Download</a></li>
                     </ul>
                  </div>
               </div>
               <div class="col-lg-4">
                  <div class="footer-link-list">
                     <h3 >Support</h3>
                     <ul>
                        <li><Link to="javascript:;">About Us</Link></li>
                        <li><Link to="/contactus">Contact Us</Link></li>
                        <li><Link to="/privacypolicy">Privacy Policy</Link></li>
                        <li><Link to="/termsandconditions">Terms Of Use</Link></li>
                     </ul>
                  </div>
               </div>
               <div class="col-lg-4">
                  <div class="footer-link-list reach-us">
                     <h3 class="w-100">Reach us at</h3>
                     <ul class="social-media-icons">
                        <li><a href="javascript:;"><img src="/assets/img/facebook-logo-2019.png"/></a></li>
                        <li><a href="javascript:;"><img src="/assets/img/instagram-icon.png"/></a></li>
                        <li><a href="javascript:;"><img src="/assets/img/linkedin-icon.png"/></a></li>
                        <li><a href="javascript:;"><img src="/assets/img/twitter-icon.png"/></a></li>
                     </ul>
                  </div>
               </div>
            </div>
            <div class="footer-bottom">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="text-center">
                        <p>Terms of service and Privacy Policy <a href="javascript:;">@Borhan</a></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
      </>
  )
}

export default Footer
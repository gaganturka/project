import React from 'react'
import Footer from './Footer'
import NewsletterSubscribed from './NewsletterSubscribed'

const ContactUs = () => {
  return (
      <>
          <section class="contact-us mt-5">
	<div class="container">
	  <div class="row">
		<div class="col-xl-7 col-lg-7 col-md-12">
		  <h2>Contact Us</h2>
			<p class="contact-tagline text-muted">Looking to speak with a member of our sales team or a customer service representative? Contact MyCase today.</p>
			<form action="/action_page.php" class="contact-form">
  				<div class="mt-4 ">
    				<input type="text" class="form-control" id="firstname" placeholder="First Name" name="firstname" />
  						</div>
  				<div class="mb-3 mt-4">
    				<input type="text" class="form-control" id="lastname" placeholder="Last Name" name="lastname" />
  					</div>
				<div class="mb-3 mt-4">
    				<input type="email" class="form-control" id="email" placeholder="Email" name="Email" />
  					</div>
				<div class="mb-3 mt-4">
    				<input type="text" class="form-control" id="firmname" placeholder="Firm Name" name="firmname" />
  					</div>
				<div class="mb-3 mt-4">
    				<input type="text" class="form-control" id="phone" placeholder="Phone Number" name="phone"/>
  					</div>
					<div class="mb-3 mt-4">
  					<button type="submit" class="btn contact-me">Contact Me</button>
				</div>
				</form>
		  </div>
		  <div class="col-xl-5 col-lg-5 col-md-12">
			  <img src="./assets/img/Contact us-rafiki.png" class="img-fluid contact-form-img "/>
		  </div>
		</div>
	  </div>
	 <div class="container more-contact-details">
	  <div class="row">
		<div class="col-lg-3 col-md-6 mt-2">
		 <div class="contact-details-inner">
		  <h5>Borhan</h5>
		  <ul class="pt-3 list-address">
			  <li><p class="text-secondary">9201 Spectrum Center Blvd., </p></li>
			  <li><p class="text-secondary">Suite 100 San Diego, CA 92123</p></li>
			</ul>  
		  </div>
		</div>	
		  <div class="col-lg-3 col-md-6 mt-2">
		  <div class=" contact-details-inner">
		  <h5>Send Us A Message</h5>
			<ul class="pt-3 list-address">
			  <li><p class="text-primary">Sale@borhan.com</p></li>
				<li><p class="text-primary">Support@borhan.com</p></li>
			  </ul>  
		  </div>
		  </div>
		  <div class="col-lg-3 col-md-6 mt-2">
		   <div class=" contact-details-inner">
		   <h5>Give Us A Call</h5>
			<ul class="pt-3 list-address">
			  <li><p><a href="tel:181787888799" class="text-primary">181-7878887-99</a></p></li>
				<li><p class="text-secondary">Monday-Friday</p></li>
				<li><p class="text-secondary">6AM-5PM Pacific Time</p></li>
			  </ul>  
			  </div></div>
		  <div class="col-lg-3 col-md-6 mt-2">
		  <div class="contact-details-inner">
		   <h5 class="text-center">Download Borhan app</h5> 
		   <ul class="pt-3 list-address text-center">
			  <li><a href=""><img src="./assets/img/app-store-btn.png"/></a></li>
			  <li class="mt-2"><a href=""><img src="./assets/img/google-play-store-btn.png"/></a></li>
			</ul>  
		  </div>
		 </div>
	  </div>
	  </div>
	</section>
 
	 <NewsletterSubscribed/>
     <Footer/>
      </>
  )
}

export default ContactUs
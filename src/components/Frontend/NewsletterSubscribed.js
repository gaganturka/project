import React, { useState } from 'react'
import homeAction from '../../actions/home.action'
const NewsletterSubscribed = () => {
    const [subscribedEmail,setSubscribedEmail]=useState("");
    const SubscribeNewsletter = async () => {
        const dataToSend={
            email:subscribedEmail,
        }
        homeAction.newsletterSubscribed(dataToSend,(err, res) => {
          if (err) {
            console.log(err, " fetchAllExpertsOnline error");
          } else {
            // setExpertsOnline(res.data);
    
            // setDummy(0);
            console.log(res.data, " is subscribed ");
          }
        });
      };
  return (
      <>
          <section className="newsletter-wrp">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter-feild-box">
                <form>
                  <div className="position-relative">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address....."
                      value={subscribedEmail}
                      onChange={(e)=>{
                      setSubscribedEmail(e.target.value)}}
                    />
                    <button className="btn" type="submit" onClick={(e)=>{e.preventDefault();SubscribeNewsletter()}}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="newsletter-content">
                <div className="">
                  <h1>Newsletter</h1>
                  <p>
                    Be the first to know about exciting new offers and special
                    events and much more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
      </>
  )
}

export default NewsletterSubscribed
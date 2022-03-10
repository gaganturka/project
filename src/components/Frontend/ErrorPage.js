import React from 'react'

import {Link} from 'react-router-dom'
const ErrorPage = () => {
  return (
    <>
      <section className="page-error-wrp">
         <div className="error-img">
            <img src="./assets/img/404-img.png" className="img img-fluid" alt="" />
         </div>
         <div className="page-not-found-content">
            <div className="container">
               <h3>Page Not Found</h3>
               <p>You didn’t break the internet but we can’t find what are you looking for</p>
               <Link to="javascript:;"><button className="btn" type="button">Return Home</button></Link>
            </div>
         </div>
      </section>

    </>
  )
}

export default ErrorPage
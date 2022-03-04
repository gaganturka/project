import React from 'react'
import {Link} from 'react-router-dom';
const Header = () => {
  return (
      <>
    
         <div className="navigation admin-nav nav-shadow">
            <nav className="navbar navbar-expand-lg navbar-light">
               <div className="container">
                  <Link className="navbar-brand" to="/"><img className="logo-img" src="./assets/img/main-logo.png" alt=""/></Link>
                  <Link className="login-out-nav-btn" to="javascript:;">Log in / Sign Up</Link>
                  <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="navbar-collapse collapse" id="navbarNav">
                     <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                           <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/expertlisting">Experts</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/termsandconditions">Terms & Conditions</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/privacypolicy">Privacy Policy</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/errorpage">404</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link login-nav-btn"
                              to="/">Logout</Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </nav>
         </div>
      </>
  )
}

export default Header
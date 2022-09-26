import React from 'react'
import Sidebar from './Sidebaruser'

const ManageMembership = () => {
  return (
      <>
          <section className="admin-wrapper">
           <Sidebar/>
          <div class="admin-content-wrapper">
            <div class="row">
               <div class="col-lg-12">
                  <div class="common-table-wrapper ">
                     <div class="table-responsive membership-table-wrapper">
                        <table class="table manage-membership-table">
                           <thead>
                              <th><h5> Borhan Advance Pro</h5></th>
                              <th></th>
                           </thead>
                           <tbody>
                              <tr >
                                 <td>
                                    <h5>Plan name</h5>
                                 </td>
                                 <td>
                                    <h6>Advance pro</h6>
                                 </td>
                              </tr>
							  <tr>
								<td>
								   <h5>Plan Information</h5>
								</td>
								<td>
								   <h6>Advance pro plan with Audio & Video call Support</h6>
								</td>
							 </tr>
							 <tr>
								<td>
								   <h5>Date of purchase</h5>
								</td>
								<td>
								   <h6>02/03/2022</h6>
								</td>
							 </tr>
							 <tr>
								<td>
								   <h5>Next Billing Date</h5>
								</td>
								<td>
								   <h6>01/03/2023</h6>
								</td>
							 </tr>
							 <tfoot>
								<th><h5> Plan For Upgrades</h5></th>
								<th></th>
							 </tfoot>
                           </tbody>
                        </table>
                     </div>
                  </div>
				  <div class="container-fluid">
					<div class="row d-flex justify-content-end">
					   <div class="col-xl-3 col-lg-5 ">
						 <div class="membership-plan-box">
							<div class="side-indicator"></div>
							<h3>Advance</h3>
							<h5><img src="/assets/img/clock-green.png" class="img img-fluid" alt=""/> 22h / month</h5>
							<h4> <span></span> OMR 8</h4>
							<h4><b>5.5 OMR</b></h4>
							<h6>Billed Monthly</h6>
							<p>As one payment of 5.5 $</p>
							<button class="btn" type="button">Buy Advance</button>
						 </div>
					  </div>
					   <div class="col-xl-3 col-lg-5 ">
						  <div class="membership-plan-box active">
							 <div class="bv-tag">Best Value</div>
							 <div class="side-indicator"></div>
							 <h3>Premium</h3>
							 <h5><img src="/assets/img/clock-yellow.png" class="img img-fluid" alt=""/> 22h / month</h5>
							 <h4> <span></span> OMR 100</h4>
							 <h4><b>60 OMR</b></h4>
							 <h6>Billed Annual</h6>
							 <p>As one payment of 60 $</p>
							 <button class="btn" type="button">Buy Premium</button>
						  </div>
					   </div>
					  
					</div>
				 </div>
               </div>
            </div>
         </div>
          </section>
      </>
  )
}

export default ManageMembership
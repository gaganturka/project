import Agent from "./superAgent";
import config from '../config/configg';
import { ServerError } from '../utils/helpers';
const BACKEND_URL = config.BACKEND_URL;

function fetchAllOnlineFilteredExperts( payload,cb) {
    Agent
      .fire('post', `${BACKEND_URL}/website/getFilteredOnlineExperts`)
      .send(payload)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  function getSingleExport(id, cb) {
    Agent.fire("get", `${BACKEND_URL}/website/getSingleExpert?id=${id}`)
    
    .end((err, res) => {
        var error =
          err || res.error
            ? ServerError(res)
            : res.body && res.body.error
            ? ServerError(res)
            : null;
        if (typeof cb === "function") return cb(error, res && res.body);
      });
  }
  

  function fetchAllOnlineFilteredPremiumExperts( payload,cb) {
    Agent
      .fire('post', `${BACKEND_URL}/website/getFilteredOnlinePremiumExperts`)
      .send(payload)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  function fetchAllOnlinePremiumExperts(data,cb) {
    Agent
      .fire('get', `${BACKEND_URL}/website/getOnlinePremiumExperts`)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  
  function bookAnAppoitment( payload,cb) {
    Agent
      .fire('post', `${BACKEND_URL}/website/bookAppointment`)
      .send(payload)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
    }
function getQuesAndAns( cb) {
    Agent
      .fire('get', `${BACKEND_URL}/website/getQuesAndAns`)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }

//   const editBorhanUserDetails=(payload,cb)=>{
//     Agent
//     .fire('put', `${BACKEND_URL}/website/editBorhanUserDetails`)
//     .send(payload)
//     .end((err, res) => {
//       var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
//       if (typeof cb === 'function') return cb(error, res && res.body);
//     });
//   }
function fetchTopExperts( cb) {
  Agent
    .fire('get', `${BACKEND_URL}/website/getTopExperts`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
function getAvailableTimeForUser(payload,cb) {
  Agent
    .fire('get', `${BACKEND_URL}/website/getAvailableTimeForUser`)
    .query(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
function setExpertFavorite( payload,cb) {
  Agent
    .fire('post', `${BACKEND_URL}/website/setFavExpert`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
export default {
    fetchAllOnlineFilteredExperts,
    bookAnAppoitment,
    getSingleExport,
    fetchAllOnlineFilteredPremiumExperts,
    fetchAllOnlinePremiumExperts,
    getQuesAndAns,
    fetchTopExperts,
    getAvailableTimeForUser,
    setExpertFavorite
  }
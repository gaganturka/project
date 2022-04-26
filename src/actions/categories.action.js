import Agent from "./superAgent";
import config from '../config/configg';
import { ServerError } from '../utils/helpers';
const BACKEND_URL = config.BACKEND_URL;

function fetchAllCategories( cb) {
    Agent
      .fire('get', `${BACKEND_URL}/admin/getCategoriesData`)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  
function fetchAllPracticeArea(cb) {
    Agent
      .fire('get', `${BACKEND_URL}/admin/getPracticeAreaData`)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  function fetchAllPracticeAreaInGroups(cb) {
    Agent
      .fire('get', `${BACKEND_URL}/admin/getPracticeAreaDataInGroups`)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }

  
export default {
    fetchAllCategories,
    fetchAllPracticeArea,
    fetchAllPracticeAreaInGroups,
    
  }
import Agent from "./superAgent";
import config from '../config/configg';
import { ServerError } from '../utils/helpers';
const BACKEND_URL = config.BACKEND_URL;
  
function getAppointments( payload,cb) {
    Agent
      .fire('post', `${BACKEND_URL}/website/getAppointments`)
      .send(payload)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
    }
    function cancelAppointment( payload,cb) {
        Agent
          .fire('delete', `${BACKEND_URL}/website/cancelAppointment/${payload.id}`)
          
          .end((err, res) => {
            var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
            if (typeof cb === 'function') return cb(error, res && res.body);
          });
        }
        function rescheduleAppointment( payload,cb) {
            Agent
              .fire('put', `${BACKEND_URL}/website/rescheduleAppointment/${payload.id}`)
              
              .end((err, res) => {
                var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
                if (typeof cb === 'function') return cb(error, res && res.body);
              });
            }
export default {
    getAppointments,
    rescheduleAppointment,
    cancelAppointment,
  }
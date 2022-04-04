import Agent from "./superAgent";
import config from '../config/configg';
import { ServerError } from '../utils/helpers';
const BACKEND_URL = config.BACKEND_URL;

function CreateExpert(payload, cb) {
    Agent
      .fire('post', `${BACKEND_URL}/admin/createexpertuser`)
      .send(payload)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  const onLogin=(payload,cb)=>{
    Agent
    .fire('post', `${BACKEND_URL}/admin/login`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
  }

  
export default {
    CreateExpert,
    onLogin
  }
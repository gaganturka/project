import http from 'superagent';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

let AuthIntercept = require('superagent-intercept')((err, res) => {
    if (res && res.body && (res.body.statusCode === 401 || res.body.statusCode === 403)) {
         removeSession();
         window.location = '/';
         return
    }
});

let removeSession = () => {
    cookie.remove('x-access-token', { path: '/' });
    cookie.remove('token', { path: '/' });
}

const getToken = () => {
    let token = localStorage.getItem('token');
    console.log(token);
    return token
}

const getLoginType = () => {
    let loginType = cookie.get('token', { path: '/' });
    return loginType
}

const fire = (method, url, shouldSendHeader=false) => {
    let token = getToken();
    let loginType = getLoginType();
    console.log()
    let defaultHeaders = {}
    if (token) {
        defaultHeaders['authorization'] = token;
    }
    if (loginType) {
        defaultHeaders['loginType'] = loginType;
    }
    if(shouldSendHeader) {
        defaultHeaders['Authorization'] = `Basic bG1zOmxtcw==`;
    }

    return http[method](url).set(defaultHeaders).use(AuthIntercept);
}




let Agent = {
    fire,
    getToken,
    removeSession,
}
export default Agent;

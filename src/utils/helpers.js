import isArray  from 'lodash/isArray';
// import moment from "moment";

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
const validatePhoneNo = (phone) => {
  var re = /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/;
  return re.test(phone);
}

const validatePassword = (password) => {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{10,}/;
  return re.test(password);
}

const isSame = (str1, str2) => {
  return str1 === str2 
}

const _serverError = (res) => {
  const ex = (res && res.body) || (res && JSON.stringify(res.text)) || {};
  if (ex.validation) {
    const keys = ex.validation.keys; // failed validations keys
    const errMap = {};

    // error message is contained in "[]" but in order the keys are, so split it up
    ex.message.match(/[^[\]]+(?=])/g)
      .forEach(function (msg, idx) {
        errMap[keys[idx]] = isArray(msg) ? msg.join('. ') : msg;
      });

    ex.message = 'Validation Error';
    ex.validation = errMap;
  } 
  return ex;
};

const objectToFormData = function (obj, form, namespace) {

  let fd = form || new FormData();
  let formKey;

  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {

      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (typeof obj[property] === 'object' && !(obj[property] instanceof Blob) && !(obj[property] instanceof File) && !(obj[property] instanceof Array)) {
        objectToFormData(obj[property], fd, property);

      } else if (obj[property] instanceof Array) {
        // if it's a array
        for (var i = 0; i < obj[property].length; i++) {
            // formData.append('array_php_side[]', obj[property][i]);
            fd.append(formKey + '[]', obj[property][i]);
        }
      
      } else {
        // if it's a string or a File object or blob
        fd.append(formKey, obj[property]);
      }

    }
  }
  return fd
}


const intersperse = function(arr, sep) {
    if (arr.length === 0) {
        return [];
    }

    return arr.slice(1).reduce(function(xs, x, i) {
        return xs.concat([sep, ' ', x]);
    }, [arr[0]]);
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
const debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

let sortByKeys = (unordered)=> {
  const ordered = {};
  Object.keys(unordered).sort().forEach(function(key) {
    ordered[key] = unordered[key];
  });
  return ordered;
}

const arrayContainsArray = (superset, subset) => {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
const getParams = (url, decodeURI= true) => {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split(/=(.+)/);
		params[pair[0]] = decodeURI ? decodeURIComponent(pair[1]) : pair[1];
	}
	return params;
};


// const formatDateWithoutTime = (date) => {
//   if(!date) {
//     return date
//   }

//   return moment(date).format("LL")
// }

const validPinCode = (pinCode) => {
  let regxExp = /^\d{6}$/;
  return regxExp.test(pinCode)
}
const validPostiveHours = (hours) => {
  let regxExp = /^\d$/;
  return regxExp.test(hours)
}

const validPostiveInteger = (no) => {
  let regxExp = /^\d{1,5}$/;
  return regxExp.test(no)
}

const validPostiveMinutes = (minutes) => {
  let regxExp = /^\d{1,2}$/;
  return regxExp.test(minutes)
}

const validGstRate = (pinCode) => {
  // let regxExp =/\b[\+-]?[0-9]*[\.]?[0-9]+([eE][\+-]?[0-9]+)?\b/gm;
  let regxExp =/^(\d*\.)?\d+$/gm;

  return regxExp.test(pinCode)
}
const validlatitude = (latitude) => {
  let regxExp =/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/gm;
  return regxExp.test(latitude)
}

const validlongitude = (longitude) => {
  let regxExp =/^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}$/gm;
  return regxExp.test(longitude)
}

const mobileCheck = function() {
  let check = false;
  if (/Mobi/.test(navigator.userAgent)) {
      check = true
  };
  return check
};

const converToLocalString = (number) => {
  return new Number(number).toLocaleString("en")
}

const chunkArray = (myArray, chunk_size) => {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index+chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
  }

  return tempArray;
}

const getRandomNumberWithinRange = (maxNumber, length) => {
  var arr = [];
  while(arr.length < length){
      var r = Math.floor(Math.random() * maxNumber) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  return arr
}

function splitToChunks(array, parts) {
  let result = [];
  for (let i = parts; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

export { _serverError as ServerError };

export {  validateEmail };

export {  objectToFormData };

export {  intersperse };

export {  debounce };

export {  validatePassword };

export {  sortByKeys };

export { isSame };

export { arrayContainsArray }; 

export { asyncForEach }

export { getParams }

// export { formatDateWithoutTime }

export { validPinCode }

export {validGstRate}

export {validlatitude}

export {validlongitude}

export {validPostiveHours}

export {validPostiveMinutes}

export {validatePhoneNo}

export {validPostiveInteger}

export {mobileCheck}

export { converToLocalString }
export { chunkArray }// Pass argment size of an array
export { getRandomNumberWithinRange }
export { splitToChunks } // Pass argment no of array should create


const isValid = function(value){
    if(typeof value == 'undefind' || typeof(value) == null) {
        return false
    }

    if(typeof value == String && value.trim().length == 0){
        return false
    }

    if(typeof value == Number && value.trim().length == 0){
        return false
    }

    return true
}

const queryParam = (value) => {
   if(Object.keys(value).length != 0){
    return false
   }
   return true
}

const isValidString = (value) => {
    return /^[a-zA-Z -]+$/.test(value)
}

const isValidObject = (value) => {
    if(Object.keys(value).length == 0){
        return false
    }
    return true
}

const isValidTime = (value) => {
return /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/.test(value)
}

const isValidPW = (value) => {
    return /^[a-zA-Z0-9'@&#.\s]{8,15}$/.test(value.trim())
}


module.exports.isValid = isValid
module.exports.queryParam = queryParam
module.exports.isValidString = isValidString
module.exports.isValidObject = isValidObject
module.exports.isValidTime = isValidTime
module.exports.isValidPW = isValidPW
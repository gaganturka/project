
const postSchema =  {
    image : {
        type : string,
        required : true,
    },
    commentNumber : {
        type : Number
    },
    likesNumber : {
        type : Number
    },
    commentBy : {
        type : string
    },
    likeBy : {
        type : string
    },
    comments : {
        type : Object
    },
    userId : {
        type : mongooseId
    }
} // timestamp


const commentSchema = {
    comment : {
        type : string
    },
    userId : {
        type : mongooseId
    },
    commentBy : {
        type : string
    }
}

const likeSchema = {
    like : {
        type : string,
        enum : {like}
    },
    userId : {
        type : mongooseId
    },
    likeBy : {
        type : string
    }
}

//export...



//requiring Schema
function isValid(data)   {
     if(data === undefined || null){
        return false
     }
     else if(data == string && data.trim().length == 0){
        return false
     }
     return true

}

function userId(id){
    if(id != mongooseId){
        return false
    }
    return true
}

const uploadImage = function(req, res){
    const body = req.body

    if(Object.keys(body) > 0){
        return false
    }

    const{userId , image} = body

    if(!userId(userId)){
        res.status(400).send({status : false, message : 'invalid userId'})
    }


    if(image){
        if(!isValid(image)){
            re
        }
    }
    
}
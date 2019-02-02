const jwt = require('jsonwebtoken');

module.exports =  (req, res, next) => {
    // check the request has Authorization header
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false; // set user has not authenticated
        return next();
    }

    // check if the jwt token is pass
    const token = authHeader.split(' ')[1]; // Authorization: Bearer fjdkjfkjfkjfgkfjdhgkjdfhgh

    if(!token || token == ''){
        req.isAuth = false; // set user has not authenticated
        return next();
    }
    let decodedData;

    try {
       decodedData = jwt.verify(token, process.env.SECRET_KEY)
    }catch(err){
        req.isAuth = false; // set user has not authenticated
        return next();
    }
    if(!decodedData){
        req.isAuth = false; // set user has not authenticated
        return next();
    }

    req.isAuth = true
    req.userId = decodedData.userId

    next();
}
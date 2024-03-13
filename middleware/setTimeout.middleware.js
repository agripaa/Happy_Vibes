module.exports = function timeout(req, res, next){
    res.setTimeout(5000, function(){
        console.log('Request has timed out.');
            res.status(408).json({status: 408, msg: "Request Time out"})
        });
    next();
}
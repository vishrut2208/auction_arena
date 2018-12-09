const express = require('express')
const app = express()

app.set('superSecret', 'super007');


function token_authorization(req,res,next){
    // var token = req.body.token || req.query.token || req.headers['X-Custom-Token'] || null;
    
    var token = req.headers['x-custom-token']; 
    console.log(token)
    // decode token
    if (token) {
        // verifies secret and checks exp
        if(token == app.get('superSecret')){
            console.log("After Token")
            next();
        }else{
            res.send({ 
                success: false, 
                error: 'You cannot access the server'
            });
            return;
        }
    } else {
        console.log("Token Not provided")
        res.send({ 
            success: false, 
            error: 'You do not have the permission to access the server. No token provided.'
        });
        return;
    }
}

module.exports = {
    token_authorization
}

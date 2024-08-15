const User = require('../model/user.model');
const authentification = require('../util/authentification');
const validation = require('../util/validation');

function getLogin(req, res){    
    res.render('customer/auth/login');
}

async function login(req,res,next){
    console.log(req.body);
    if(!validation.emailAreConfirmed(req.body.email,req.body['confirm-email'] || !validation.userCredentialsAreValid(req.body.email,req.body.password,req.body.phone,req.body.name,req.body.state,req.body.city))){
        console.log('unable to save the user')
        return
    }

    const user = await new User(req.body.email,req.body.password,req.body.name,req.body.phone,req.body.state,req.body.city);

    try{
        const existingUser = user.userExistAlready();
        if(existingUser){
            console.log('am offline')
            return;
        }

    }catch(error){
        next(error);
        return;
    }

    user.signup();
    res.redirect('/login');
}


function getSignUp(req, res){
    res.render('customer/auth/signup');
}

function signup(req, res){

}



function logout(req, res){

}



module.exports = {
    getLogin:getLogin,
    login:login,
    getSignUp:getSignUp,
    signup:signup
}  
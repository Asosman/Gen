const User = require('../model/user.model');
const authentification = require('../util/authentification');
const validation = require('../util/validation');
const flashSessionData = require('../util/session-flashData');

function getLogin(req, res){    
    let sessionData = flashSessionData.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email:'',
            password:''
        }
    }

    res.render('customer/auth/login',{inputData:sessionData});
}

async function login(req, res, next){
    const user = new User(req.body.email,req.body.password);
    
    let existingUser;
    
    try{
        existingUser = await user.getUserWithThesameEmail();
        console.log(existingUser);
    }catch(error){
        next(error);
    }

    if(!existingUser){
        flashSessionData.flashSessionData(req,
            {
                errorMessage:'could not find a user',
                email:req.body.email,
                password:req.body.password
            },
            function(){
                res.redirect('/login');
            }
        )
        return;
    }

    let passwordIsEqual
    try{
         passwordIsEqual =  user.passwordAreEqual(existingUser.password);
    }catch(error){
        next(error);
    }

    if(!passwordIsEqual){
        flashSessionData.flashSessionData(
            req,
            {
                errorMessage:'Invalid email or password',
                email:req.body.email,
                password:req.body.password
            },
            function(){
                res.redirect('/login')
            }
        )
        return;
    }
    authentification.createUserSession(req,existingUser,function(){
        res.redirect('/');
    })    

}

function getSignUp(req, res){
    let sessionData = flashSessionData.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email:'',
            confirmEmail:'',
            password:'',
            name:'',
            phone:'',
            state:'',
            city:''
        }
    }
    res.render('customer/auth/signup',{inputData:sessionData});
}

async function signup(req,res,next){
    console.log(req.body);
    const inputData = {
        email:req.body.email,
        confirmEmail:req.body['confirm-email'],
        password: req.body.password,
        name:req.body.name,
        phone:req.body.phone,
        state:req.body.state,
        city:req.body.city
    }

    if(!validation.emailAreConfirmed(req.body.email,req.body['confirm-email'])){
        flashSessionData.flashSessionData(req,
            {
                errorMessage:'email is not thesame',
                ...inputData
            },
            function(){
                res.redirect('/signup');
            }
        )
        return
    }

    if(!validation.userCredentialsAreValid(req.body.email,req.body.password,req.body.phone,req.body.name,req.body.state,req.body.city)){
        flashSessionData.flashSessionData(req,
            {
                errorMessage:'check your credentials',
                ...inputData
            },
            function(){
                res.redirect('/signup');
            }
        )
        return
    }

    
    const user = await new User(req.body.email,req.body.password,req.body.name,req.body.phone,req.body.state,req.body.city);

    try{
        const existingUser = await user.userExistAlready();
        if(existingUser){
          flashSessionData.flashSessionData(
            req,
            {
                errorMessage:'Account already Exists ',
                ...inputData
            },
            function(){
                res.redirect('/signup');
            }
          )
            return;
        }
    }catch(error){
        next(error);
        return;
    }
    await user.signup();
    res.redirect('/login');
}

function logout(req, res){
    authentification.destroyUserSession(req);
}



module.exports = {
    getLogin:getLogin,
    login:login,
    getSignUp:getSignUp,
    signup:signup,
    logout:logout
}  
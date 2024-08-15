function isEmpty(value){
    return value && value.trim()== '';
}

function userEmailPasswordValid(email,password, phone){
    return email && email.includes('@') && password && password.trim() > 5 && phone.trim() === 11  ;
}

function emailAreConfirmed(email, confirmEmail){
    return email && confirmEmail;
}

function userCredentialsAreValid(email, password, phone, name,state,city){
   return userEmailPasswordValid(email,password,phone) && isEmpty(name) && isEmpty(state) && isEmpty(city)
}

module.exports ={
    emailAreConfirmed: emailAreConfirmed,
    userCredentialsAreValid:userCredentialsAreValid
}
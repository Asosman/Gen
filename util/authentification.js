function createUserSession(req,existingUser, action){
    req.session.uid = existingUser._id.toString();
    req.session.isAdmin = existingUser.isAdmin;
    req.session.save(action);
}

function destroyUserSession(){
    req.session.uid = null;
}


module.exports = {
    createUserSession:createUserSession,
    destroyUserSession:destroyUserSession
}
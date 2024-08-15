function getSessionData(req){
    const sessionData = req.session.flashData;

    req.session.flashData = null;

    return sessionData;
}

function flashSessionData(req, data, action){
    req.session.flashData = data;
    console.log(data);
    req.session.save(action)
}

module.exports = {
    getSessionData : getSessionData,
    flashSessionData: flashSessionData
}
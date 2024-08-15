const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');


function createSession(){
    return{
        secret:'super-secret',
        resave:false,
        saveUninitialized:false,
        store:createStore(),
        cookie:{
            maxAge:2 * 24 *60 *60 * 1000
        }
    }
}


function createStore(){
    const mongodBStore = mongodbStore(session);

    const store = mongodBStore({
        URI:'mongo://localhost:27017',
        databaseName:'Gen',
        collection:'session'
    })
    return store;
}

module.exports = createSession
const bcrypt = require('bcryptjs');
const db = require('../data/database');
const {ObjectId} = require('mongodb');


class User{
    constructor(email,password,name,phone,state,city){
        this.email= email;
        this.password = password;
        this.name = name;
        this.address = {
            phoneNumber:phone,
            city:city,
            state:state
        }
    }


static async findUserById(id){
    const uid = new ObjectId(id);
    return db.getDb().collection('user').findOne({_id:uid},{projection:{password:0}})
}


 passwordAreEqual(hashedPassword){
    return bcrypt.compare(this.password,hashedPassword);
 }

 getUserWithThesameEmail(){
  return db.getDb().collection('user').findOne({email:this.email});   
 }
 
 async userExistAlready(){
    const existingUser = await this.getUserWithThesameEmail();
    if(existingUser){
        return true;
    }else{
        return false;
    }
 }
 async signup(){
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const result = await db.getDb().collection('user').insertOne({
        email:this.email,
        password:hashedPassword,
        name:this.name,
        address:this.address
    })
 }

}

module.exports = User;
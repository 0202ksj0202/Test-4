var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    "password": {type: String, unique: true},
    "email": String
});

var uri = "mongodb+srv://0202ksj0202:hisimon023@cluster0.azqb5hp.mongodb.net/?retryWrites=true&w=majority";

let User;

function startDB(){
    return new Promise(function(resolve, reject){
        let db = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function(error){
            if (error){
                console.log("Cannot connect to DB");
                reject(error);

            }
            else{
                User = db.model("test4", userSchema);
                console.log("DB connection Successful");
                resolve();
            }
        });
    });
};

function register(user){
    return new Promise(function(resolve, reject){
        if(user.email.trim().length === 0 || user.password.trim().length === 0){
          reject("Error: email or password cannot be empty.");
        }
        else{
            bcrypt.hash(user.password, 10).then(hash=>{
                user.password = hash;
                let finalUsers = new User(user);
                finalUsers.save(err => {
                    if(err){
                        if(err.code == 11000){
                            reject("Error: (user’s email) already exists");
                        }
                        else{
                            reject("Error: cannot create the user.");
                        }
                    }
                    resolve();
                })
            }).catch(err =>{
                reject(err);
            });
        }
    });
};

function signIn(user){

};

module.exports = {
    startDB,
    register,
    signIn
};
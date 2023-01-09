
const mongoose = require('mongoose')

//Create schema
const userSchema = new mongoose.Schema({

    name : {type: String},
    email : {type: String, unique: true},
    password: {type: String},
    mobile: {type: Number},
    age: {type: Number},
    address: {type: String},
    token:{type: String}
},
    { 
        timestamps: true 
    });


module.exports = mongoose.model('Users',userSchema)
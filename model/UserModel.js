const mongoose = require('mongoose')

function ValidateEmail (e) {
    let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return EmailPattern.test(e)
}

let usershema = new mongoose.Schema({

    name: {type: String, required: true},

    email: {type: String, required: true, validator: {validate: ValidateEmail, message: "Enter valid email"} },

    mobile: {type: String, required: true}


}, {collection:'users', versionKey: false})

let UserModel = mongoose.model('users', usershema)

module.exports = {UserModel}
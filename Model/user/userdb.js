const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max:255
    },
    username:{
        type: String,
        required: true,
        unique: true,
        min: 6,
        max:255
    },
    password:{
        type: String,
        required: [true,"Please add the user password"],
        min: 6,
        max:1024
    },
    position:{
        type: String,
        min: 6,
        max:255,
        default:'Employee'
    },
    dateOfBirth: {
        type: Date,
        required: [true,"Please add your birthdata"],
        trim: true,
    },
    role:{
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    date:{
        type: Date,
        default:Date.now
    }
    
})

const Userdb = mongoose.model('userdb',schema);

module.exports = Userdb;
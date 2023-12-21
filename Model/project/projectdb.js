const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true,
        unique: true,
        min: 6,
        max:255
    },
    description:{
        type: String,
        required: true,
        min: 6,
        max:255
    },
    status:{
        type: String,
        enum : ['Not Working','In Progress','Finished'],
        default: 'Not Working'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userdb'
    },
    date:{
        type: Date,
        default:Date.now
    }
    
})

const Projectdb = mongoose.model('projectdb',schema);

module.exports = Projectdb;